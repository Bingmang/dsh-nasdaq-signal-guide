/**
 * Automatic data sync.
 *
 * Runs the web app's own generators (`scripts/generate-market-data.mjs` and
 * `scripts/generate-monthly-signals.mjs`) on a daily Shanghai-time schedule and
 * once after startup when the last successful sync is stale. The generated JSON
 * is read from disk by the panel, so no rebuild of the web app is involved.
 */
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { basename, join } from "node:path";

const TIME_ZONE_OFFSET_MS = 8 * 60 * 60 * 1000;
const SCRIPT_TIMEOUT_MS = 3 * 60 * 1000;
const STARTUP_STALE_MS = 18 * 60 * 60 * 1000;
const STARTUP_DELAY_MS = 8 * 1000;
const MAX_OUTPUT = 6000;

const SCRIPTS = ["scripts/generate-market-data.mjs", "scripts/generate-monthly-signals.mjs"];

function nextRunAt(hour, minute, now = Date.now()) {
  const shanghai = new Date(now + TIME_ZONE_OFFSET_MS);
  const year = shanghai.getUTCFullYear();
  const month = shanghai.getUTCMonth();
  const day = shanghai.getUTCDate();
  let target = Date.UTC(year, month, day, hour, minute) - TIME_ZONE_OFFSET_MS;
  if (target <= now) target += 24 * 60 * 60 * 1000;
  return target;
}

function tail(text) {
  const clean = String(text ?? "").trim();
  return clean.length > MAX_OUTPUT ? clean.slice(-MAX_OUTPUT) : clean;
}

async function resolveNode(log) {
  const candidates = [process.env.NASDAQ_SIGNAL_NODE, process.execPath, "/opt/homebrew/bin/node", "/usr/local/bin/node", "/usr/bin/node"];
  for (const candidate of candidates) {
    if (typeof candidate !== "string" || candidate === "") continue;
    if (basename(candidate) !== "node") continue;
    if (existsSync(candidate)) return candidate;
  }
  const shell = process.env.SHELL || "/bin/zsh";
  const found = await new Promise((resolveFound) => {
    try {
      const child = spawn(shell, ["-lc", "command -v node"], { stdio: ["ignore", "pipe", "ignore"] });
      let output = "";
      child.stdout?.on("data", (chunk) => {
        output += chunk.toString();
      });
      child.on("error", () => resolveFound(null));
      child.on("close", () => {
        const first = output.split(/\r?\n/).map((line) => line.trim()).find(Boolean);
        resolveFound(first && existsSync(first) ? first : null);
      });
    } catch {
      resolveFound(null);
    }
  });
  if (found) return found;
  log.warn?.("nasdaq-signal-guide: no node binary found; relying on PATH for the data sync");
  return "node";
}

export class DataUpdater {
  constructor(options) {
    this.projectDir = options.projectDir;
    this.hour = options.hour ?? 9;
    this.minute = options.minute ?? 10;
    this.log = options.logger;
    this.stateFile = join(this.projectDir, ".sites-runtime", "nasdaq-signal-guide-state.json");
    this.state = {
      lastAttemptAt: null,
      lastSuccessAt: null,
      lastError: null,
      lastOutput: null,
    };
    this.running = false;
    this.current = null;
    this.timer = null;
    this.startupTimer = null;
    this.child = null;
    this.disposed = false;
    this.nextRunAt = null;
    this.nodePath = null;
  }

  async start() {
    await this.loadState();
    if (this.disposed) return;
    this.nextRunAt = nextRunAt(this.hour, this.minute);
    this.schedule();
    this.log.info?.(
      `nasdaq-signal-guide: data sync scheduled daily at ${String(this.hour).padStart(2, "0")}:${String(this.minute).padStart(2, "0")} Asia/Shanghai`,
    );
    const stale = this.state.lastSuccessAt === null || Date.now() - Date.parse(this.state.lastSuccessAt) > STARTUP_STALE_MS;
    if (stale) {
      this.startupTimer = setTimeout(() => {
        this.startupTimer = null;
        this.run("startup").catch((error) => {
          this.log.warn?.(`nasdaq-signal-guide: startup sync failed: ${String(error?.message ?? error)}`);
        });
      }, STARTUP_DELAY_MS);
      if (typeof this.startupTimer.unref === "function") this.startupTimer.unref();
    }
  }

  schedule() {
    if (this.disposed) return;
    this.nextRunAt = nextRunAt(this.hour, this.minute);
    const delay = Math.max(1000, this.nextRunAt - Date.now());
    this.timer = setTimeout(() => {
      this.timer = null;
      this.run("schedule")
        .catch((error) => {
          this.log.warn?.(`nasdaq-signal-guide: scheduled sync failed: ${String(error?.message ?? error)}`);
        })
        .finally(() => {
          this.schedule();
        });
    }, delay);
    if (typeof this.timer.unref === "function") this.timer.unref();
  }

  dispose() {
    this.disposed = true;
    if (this.timer !== null) clearTimeout(this.timer);
    if (this.startupTimer !== null) clearTimeout(this.startupTimer);
    this.timer = null;
    this.startupTimer = null;
    if (this.child !== null) {
      try {
        this.child.kill("SIGTERM");
      } catch {
        // The child may already have exited.
      }
      this.child = null;
    }
  }

  snapshot() {
    return {
      running: this.running,
      lastAttemptAt: this.state.lastAttemptAt,
      lastSuccessAt: this.state.lastSuccessAt,
      lastError: this.state.lastError,
      lastOutput: this.state.lastOutput,
      nextRunAt: this.nextRunAt === null ? null : new Date(this.nextRunAt).toISOString(),
      schedule: { hour: this.hour, minute: this.minute, timeZone: "Asia/Shanghai" },
      projectDir: this.projectDir,
    };
  }

  async loadState() {
    try {
      const parsed = JSON.parse(await readFile(this.stateFile, "utf8"));
      this.state = {
        lastAttemptAt: typeof parsed.lastAttemptAt === "string" ? parsed.lastAttemptAt : null,
        lastSuccessAt: typeof parsed.lastSuccessAt === "string" ? parsed.lastSuccessAt : null,
        lastError: typeof parsed.lastError === "string" ? parsed.lastError : null,
        lastOutput: typeof parsed.lastOutput === "string" ? parsed.lastOutput : null,
      };
    } catch {
      // First run, or a discarded runtime directory.
    }
  }

  async saveState() {
    try {
      await mkdir(join(this.projectDir, ".sites-runtime"), { recursive: true });
      await writeFile(this.stateFile, JSON.stringify(this.state, null, 2));
    } catch (error) {
      this.log.warn?.(`nasdaq-signal-guide: cannot persist sync state: ${String(error?.message ?? error)}`);
    }
  }

  run(reason = "manual") {
    if (this.running && this.current !== null) return this.current;
    this.running = true;
    this.current = this.execute(reason).finally(() => {
      this.running = false;
      this.current = null;
    });
    return this.current;
  }

  async execute(reason) {
    this.state.lastAttemptAt = new Date().toISOString();
    this.state.lastError = null;
    this.log.info?.(`nasdaq-signal-guide: syncing market data (${reason})`);
    const started = Date.now();
    try {
      if (this.nodePath === null) this.nodePath = await resolveNode(this.log);
      const outputs = [];
      for (const script of SCRIPTS) {
        const output = await this.runScript(this.nodePath, script);
        outputs.push(`$ node ${script}\n${output}`.trim());
      }
      this.state.lastSuccessAt = new Date().toISOString();
      this.state.lastOutput = tail(outputs.join("\n\n"));
      this.state.lastError = null;
      await this.saveState();
      this.log.info?.(`nasdaq-signal-guide: data sync finished in ${Math.round((Date.now() - started) / 1000)}s`);
      return { ok: true, output: this.state.lastOutput };
    } catch (error) {
      this.state.lastError = error instanceof Error ? error.message : String(error);
      await this.saveState();
      this.log.warn?.(`nasdaq-signal-guide: data sync failed: ${this.state.lastError}`);
      throw error;
    }
  }

  runScript(nodePath, script) {
    return new Promise((resolveOutput, rejectOutput) => {
      this.log.info?.(`nasdaq-signal-guide: running ${script}`);
      let child;
      try {
        child = spawn(nodePath, [script], {
          cwd: this.projectDir,
          env: { ...process.env, WRANGLER_LOG_PATH: ".wrangler/wrangler.log" },
          stdio: ["ignore", "pipe", "pipe"],
        });
      } catch (error) {
        rejectOutput(new Error(`cannot start ${nodePath}: ${String(error?.message ?? error)}`));
        return;
      }
      this.child = child;
      let stdout = "";
      let stderr = "";
      const timer = setTimeout(() => {
        try {
          child.kill("SIGKILL");
        } catch {
          // Ignore: the close handler reports the timeout.
        }
        rejectOutput(new Error(`${script} timed out after ${SCRIPT_TIMEOUT_MS / 1000}s`));
      }, SCRIPT_TIMEOUT_MS);
      if (typeof timer.unref === "function") timer.unref();
      child.stdout?.on("data", (chunk) => {
        stdout += chunk.toString();
        if (stdout.length > MAX_OUTPUT * 2) stdout = stdout.slice(-MAX_OUTPUT);
      });
      child.stderr?.on("data", (chunk) => {
        stderr += chunk.toString();
        if (stderr.length > MAX_OUTPUT * 2) stderr = stderr.slice(-MAX_OUTPUT);
      });
      child.on("error", (error) => {
        clearTimeout(timer);
        this.child = null;
        rejectOutput(new Error(`cannot run ${script}: ${String(error?.message ?? error)}`));
      });
      child.on("close", (code, signal) => {
        clearTimeout(timer);
        this.child = null;
        if (code === 0) {
          resolveOutput(stdout.trim());
          return;
        }
        const detail = [stderr.trim(), stdout.trim()].filter(Boolean).join("\n");
        rejectOutput(new Error(`${script} exited with ${signal ?? code}${detail === "" ? "" : `: ${tail(detail)}`}`));
      });
    });
  }
}

export { nextRunAt };
