/**
 * Cached JSON reads for the generated market data. The cache is keyed by mtime
 * and size, so the daily generator writing a new file is picked up on the next
 * request without restarting the Host.
 */
import { readFile, stat } from "node:fs/promises";
import { join } from "node:path";

const cache = new Map();

async function readJson(file) {
  const info = await stat(file);
  const hit = cache.get(file);
  if (hit !== undefined && hit.mtimeMs === info.mtimeMs && hit.size === info.size) {
    return { value: hit.value, mtimeMs: hit.mtimeMs, size: info.size };
  }
  const value = JSON.parse(await readFile(file, "utf8"));
  cache.set(file, { value, mtimeMs: info.mtimeMs, size: info.size });
  return { value, mtimeMs: info.mtimeMs, size: info.size };
}

export function createStore(projectDir) {
  const marketFile = join(projectDir, "app", "data", "market-data.json");
  const monthlyFile = join(projectDir, "app", "data", "monthly-signals.json");

  return {
    projectDir,
    marketFile,
    monthlyFile,

    async readMarket() {
      return readJson(marketFile);
    },

    async readMonthly() {
      return readJson(monthlyFile);
    },

    /** Cheap freshness probe used by the status endpoint. */
    async probe() {
      const result = { market: null, monthly: null };
      try {
        const info = await stat(marketFile);
        result.market = { mtimeMs: info.mtimeMs, size: info.size };
      } catch {
        // Missing snapshot is reported by the signals endpoint with a 503.
      }
      try {
        const info = await stat(monthlyFile);
        result.monthly = { mtimeMs: info.mtimeMs, size: info.size };
      } catch {
        // Same as above.
      }
      return result;
    },
  };
}
