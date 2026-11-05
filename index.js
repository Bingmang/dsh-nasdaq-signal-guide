/**
 * Host half of dsh-nasdaq-signal-guide.
 *
 * The web app under `app/` stays the single source of truth for the numbers and
 * for the generated snapshots. This plugin:
 *
 *  - runs the app's own data generators on a daily Asia/Shanghai schedule and
 *    once after startup when the last sync is stale;
 *  - reads `app/data/market-data.json` and `app/data/monthly-signals.json`
 *    from disk, so a completed sync is visible without rebuilding the app;
 *  - serves the computed dashboard payload on a same-origin prefix route that
 *    the Client half calls.
 *
 * No dependencies: only Node built-ins, so the package installs as a plain
 * directory link into the profile.
 */
import { existsSync } from "node:fs";
import { homedir } from "node:os";
import { fileURLToPath } from "node:url";
import { join, resolve } from "node:path";
import { shanghaiDate, buildHistory, buildSignals, SignalError } from "./host/signals.js";
import { createStore } from "./host/store.js";
import { DataUpdater } from "./host/updater.js";

export const name = "dsh-nasdaq-signal-guide";

const ROUTE_PREFIX = "/nasdaq-signal-guide";
const REQUEST_HEADER = "x-dsh-nasdaq-signal-guide";
const MAX_BODY_BYTES = 32 * 1024;

function resolveProjectDir(logger, config) {
  const candidates = [
    config?.projectDir,
    process.env.NASDAQ_SIGNAL_GUIDE_DIR,
    resolve(fileURLToPath(new URL("../../", import.meta.url))),
    join(homedir(), "Workspace", "nasdaq-signal-guide"),
    join(homedir(), "nasdaq-signal-guide"),
  ].filter((candidate) => typeof candidate === "string" && candidate !== "");
  for (const candidate of candidates) {
    try {
      if (existsSync(resolve(candidate, "app", "data", "market-data.json"))) return resolve(candidate);
    } catch {
      // Try the next candidate.
    }
  }
  logger.warn?.("nasdaq-signal-guide: web app directory not found; set NASDAQ_SIGNAL_GUIDE_DIR to the nasdaq-signal-guide checkout");
  return resolve(candidates[0] ?? ".");
}

function readUpdateTime() {
  const raw = process.env.NASDAQ_SIGNAL_UPDATE_TIME;
  const match = typeof raw === "string" ? /^(\d{1,2}):(\d{2})$/.exec(raw.trim()) : null;
  if (match === null) return { hour: 9, minute: 10 };
  const hour = Number(match[1]);
  const minute = Number(match[2]);
  if (hour > 23 || minute > 59) return { hour: 9, minute: 10 };
  return { hour, minute };
}

function respondJson(res, status, body) {
  const text = JSON.stringify(body);
  res.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store",
    "content-length": Buffer.byteLength(text),
  });
  res.end(text);
}

function failure(status, code, message) {
  return { ok: false, error: { code, message, details: {} } };
}

async function readBody(req) {
  const chunks = [];
  let received = 0;
  for await (const chunk of req) {
    received += chunk.byteLength;
    if (received > MAX_BODY_BYTES) {
      const error = new Error("request body too large");
      error.status = 413;
      throw error;
    }
    chunks.push(chunk);
  }
  const text = Buffer.concat(chunks).toString("utf8");
  return text === "" ? {} : JSON.parse(text);
}

export function apply(ctx, config) {
  const logger = ctx.logger;
  const projectDir = resolveProjectDir(logger, config);
  const store = createStore(projectDir);
  const updateTime = readUpdateTime();
  const updater = new DataUpdater({ projectDir, logger, hour: updateTime.hour, minute: updateTime.minute });

  ctx.effect(() => {
    updater.start().catch((error) => {
      logger.warn?.(`nasdaq-signal-guide: cannot start data sync: ${String(error?.message ?? error)}`);
    });
    return () => updater.dispose();
  }, "nasdaq-signal-guide: data sync");

  async function statusPayload() {
    const status = updater.snapshot();
    try {
      const market = await store.readMarket();
      status.marketGeneratedAt = market.value.generatedAt ?? null;
      status.dataUpdatedThrough = Array.isArray(market.value.ndx) && market.value.ndx.length > 0
        ? market.value.ndx[market.value.ndx.length - 1][0]
        : null;
      status.marketUpdatedAt = new Date(market.mtimeMs).toISOString();
    } catch (error) {
      status.marketError = error instanceof Error ? error.message : String(error);
    }
    try {
      const monthly = await store.readMonthly();
      status.monthlyGeneratedAt = monthly.value.generatedAt ?? null;
      status.monthlyUpdatedAt = new Date(monthly.mtimeMs).toISOString();
    } catch (error) {
      status.monthlyError = error instanceof Error ? error.message : String(error);
    }
    status.today = shanghaiDate();
    return status;
  }

  async function handle(endpoint, payload) {
    switch (endpoint) {
      case "status":
        return { ok: true, value: await statusPayload() };
      case "history": {
        const monthly = await store.readMonthly().catch(() => undefined);
        if (monthly === undefined) throw new SignalError("月度策略快照尚未生成", 503);
        return { ok: true, value: buildHistory(monthly.value) };
      }
      case "signals": {
        const date = typeof payload.date === "string" ? payload.date : shanghaiDate();
        const [market, monthly] = await Promise.all([
          store.readMarket().catch(() => undefined),
          store.readMonthly().catch(() => undefined),
        ]);
        if (market === undefined || monthly === undefined) throw new SignalError("行情快照尚未生成，请先同步数据", 503);
        const value = await buildSignals({ selectedDate: date, marketData: market.value, monthlySignals: monthly.value });
        return { ok: true, value };
      }
      case "update": {
        if (updater.running) return { ok: true, value: { started: false, running: true, status: await statusPayload() } };
        updater.run("manual").catch(() => {
          // The failure is reported through status.lastError.
        });
        return { ok: true, value: { started: true, running: true, status: await statusPayload() } };
      }
      default:
        throw new SignalError(`unknown endpoint: ${endpoint}`, 404);
    }
  }

  ctx.inject(["webServer", "connection"], (webCtx) => {
    webCtx.effect(
      () =>
        webCtx.webServer.register({
          kind: "prefix",
          path: ROUTE_PREFIX,
          handler: async (req, res) => {
            try {
              const rejection = webCtx.connection.requestRejection(req);
              const pluginHeader = req.headers[REQUEST_HEADER] === "1";
              if (rejection !== undefined && !pluginHeader) {
                res.writeHead(rejection, { "cache-control": "no-store" });
                res.end(rejection === 401 ? "unauthorized" : "forbidden");
                return;
              }
              const pathname = new URL(req.url ?? "/", "http://dsh.internal").pathname;
              if (!pathname.startsWith(`${ROUTE_PREFIX}/`)) {
                respondJson(res, 404, failure(404, "not-found", "not found"));
                return;
              }
              const endpoint = pathname.slice(ROUTE_PREFIX.length + 1);
              if (req.method !== "POST") {
                respondJson(res, 405, failure(405, "method-not-allowed", "POST required"));
                return;
              }
              let payload;
              try {
                payload = await readBody(req);
              } catch (error) {
                const status = error?.status === 413 ? 413 : 400;
                respondJson(res, status, failure(status, "bad-request", `invalid JSON body: ${String(error?.message ?? error)}`));
                return;
              }
              respondJson(res, 200, await handle(endpoint, payload));
            } catch (error) {
              const status = error instanceof SignalError ? error.status : 500;
              if (status >= 500) logger.warn?.(`nasdaq-signal-guide: route failure: ${String(error?.message ?? error)}`);
              respondJson(res, status, failure(status, status === 500 ? "internal" : "signals", error instanceof Error ? error.message : String(error)));
            }
          },
        }),
      "nasdaq-signal-guide: HTTP route",
    );
    logger.info?.(`nasdaq-signal-guide: HTTP route ${ROUTE_PREFIX}/* registered (project: ${projectDir})`);
  });
}
