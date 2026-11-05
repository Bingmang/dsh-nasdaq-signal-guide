/**
 * Signal math shared by the HTTP endpoints.
 *
 * This is a direct port of `app/api/signals/route.ts` from the web app so the
 * panel and the deployed site agree on every number. The only intentional
 * difference is that the live upstream refresh is cached per Shanghai day and
 * is best-effort: any failure falls back to the snapshot data, exactly like the
 * original route.
 */

export const MARKET_TIME_ZONE = "Asia/Shanghai";
export const EARLIEST_DATE = "2000-01-03";

const FRED = "https://fred.stlouisfed.org/graph/fredgraph.csv";
const CAPE_URL = "https://www.multpl.com/shiller-pe/table/by-month";
const UPSTREAM_TIMEOUT_MS = 2500;
const LIVE_CACHE_MS = 5 * 60 * 1000;

export class SignalError extends Error {
  constructor(message, status = 400) {
    super(message);
    this.name = "SignalError";
    this.status = status;
  }
}

export function shanghaiDate(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: MARKET_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const value = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${value.year}-${value.month}-${value.day}`;
}

export function previousMonthStart(date) {
  const [year, month] = date.split("-").map(Number);
  const previous = new Date(Date.UTC(year, month - 2, 1));
  return previous.toISOString().slice(0, 10);
}

function unpack(packed) {
  const points = [];
  for (const entry of Array.isArray(packed) ? packed : []) {
    const date = entry?.[0];
    const value = Number(entry?.[1]);
    if (typeof date === "string" && Number.isFinite(value) && value > 0) points.push({ date, value });
  }
  return points;
}

function latestAt(points, date) {
  let latest;
  for (const point of points) {
    if (point.date > date) break;
    latest = point;
  }
  return latest;
}

function buildStrategyPrice(ndx, qqqAdjusted) {
  const splice = qqqAdjusted[0]?.date;
  if (!splice) throw new SignalError("QQQ 历史价格不可用", 502);
  const result = [];
  let value = 100;
  let previous;
  for (const point of ndx) {
    if (point.date < "1990-01-01" || point.date >= splice) continue;
    if (previous) value *= point.value / previous.value;
    result.push({ date: point.date, value });
    previous = point;
  }
  previous = undefined;
  for (const point of qqqAdjusted) {
    if (point.date < splice) continue;
    if (previous) value *= point.value / previous.value;
    result.push({ date: point.date, value });
    previous = point;
  }
  return result;
}

function expandingPercentile(values, current) {
  let less = 0;
  let equal = 0;
  for (const value of values) {
    if (value < current) less += 1;
    else if (value === current) equal += 1;
  }
  return ((less + (equal + 1) / 2) / values.length) * 100;
}

function dailyObservation(ndx, qqqAdjusted, vix, cape, selectedDate) {
  const price = buildStrategyPrice(ndx, qqqAdjusted);
  const selectedIndex = price.findLastIndex((point) => point.date <= selectedDate);
  if (selectedIndex < 4) throw new SignalError("所选日期前没有足够的交易数据");
  const selected = price[selectedIndex];
  const history = price.slice(0, selectedIndex + 1);
  let peakValue = Number.NEGATIVE_INFINITY;
  for (const point of history) if (point.value > peakValue) peakValue = point.value;
  let peak = selected;
  for (let index = history.length - 1; index >= 0; index -= 1) {
    if (history[index].value === peakValue) {
      peak = history[index];
      break;
    }
  }
  const recent = history.slice(-25);
  const trailingStart = new Date(`${selected.date}T00:00:00Z`);
  trailingStart.setUTCFullYear(trailingStart.getUTCFullYear() - 1);
  const trailingStartDate = trailingStart.toISOString().slice(0, 10);
  let high52Week = Number.NEGATIVE_INFINITY;
  for (const point of history) if (point.date >= trailingStartDate && point.value > high52Week) high52Week = point.value;
  const vixNow = latestAt(vix, selected.date);
  const capeNow = latestAt(cape, selected.date);
  if (!vixNow || !capeNow) throw new SignalError("所选日期的信号数据不完整");

  const capeValues = [];
  for (const point of history.slice(4)) {
    const value = latestAt(cape, point.date)?.value;
    if (value) capeValues.push(value);
  }
  const percentile = expandingPercentile(capeValues, capeNow.value);
  const drawdownPct = (selected.value / peakValue - 1) * 100;
  const distance52WeekPct = (selected.value / high52Week - 1) * 100;
  let recentHigh = Number.NEGATIVE_INFINITY;
  for (const point of recent) if (point.value > recentHigh) recentHigh = point.value;
  const quickDropPct = (selected.value / recentHigh - 1) * 100;
  const cheap = percentile < 20;
  const high = percentile > 70;
  const bubble = percentile > 85;
  const deep = drawdownPct <= -20;
  const panic = vixNow.value >= 40;
  const quiet = vixNow.value < 12;
  const nearHigh = drawdownPct >= -5;
  const quickCrash = quickDropPct <= -12;
  const lowCount = [cheap, deep, panic].filter(Boolean).length;
  const code = lowCount >= 2 ? "big-bottom" : lowCount === 1 ? "small-bottom" : high && nearHigh ? "high-near-high" : "normal";
  const contribution = code === "big-bottom" ? "3×" : code === "small-bottom" ? "2×" : code === "high-near-high" ? "0×" : "1×";
  const contributionDetail = code === "big-bottom"
    ? "当天若检查：基础月供外再注入 2× 新现金"
    : code === "small-bottom"
      ? "当天若检查：基础月供外再注入 1× 新现金"
      : code === "high-near-high"
        ? "当天若检查：暂停新增投入"
        : "当天若检查：按基础月供投入";
  const target = code === "big-bottom" ? "参考买入 TQQQ" : code === "high-near-high" ? "参考暂停买入" : "参考买入 QQQ";
  const targetDetail = "这是所选当天的信号参考；策略仍只在每月首个交易日实际执行一次";
  const accent = code === "big-bottom" ? "green" : code === "high-near-high" ? "amber" : "blue";

  return {
    asOfDate: selected.date,
    cape: { value: capeNow.value, percentile, date: capeNow.date, cheap, high, bubble },
    trend: {
      ndx5: latestAt(ndx, selected.date)?.value ?? selected.value,
      drawdownPct,
      distance52WeekPct,
      peakDate: peak.date,
      quickDropPct,
      deep,
      quickCrash,
      nearHigh,
    },
    vix: { value5: vixNow.value, date: vixNow.date, panic, quiet },
    lowCount,
    decision: { code, contribution, contributionDetail, target, targetDetail, accent },
  };
}

function parseCsv(text) {
  const rows = text.trim().split(/\r?\n/).slice(1);
  const points = [];
  for (const line of rows) {
    const [date, raw] = line.split(",");
    const clean = raw?.trim();
    const value = clean && clean !== "." ? Number(clean) : Number.NaN;
    if (date && Number.isFinite(value) && value > 0) points.push({ date, value });
  }
  return points;
}

const MONTHS = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 };

function parseCape(html) {
  const points = [];
  const row = /<td[^>]*>\s*([A-Z][a-z]{2}\s+\d{1,2},\s+\d{4})\s*<\/td>\s*<td[^>]*>\s*(?:(?:&#x[0-9A-Fa-f]+;)|(?:&nbsp;)|\s)*([0-9]+(?:\.[0-9]+)?)\s*<\/td>/g;
  let match;
  while ((match = row.exec(html))) {
    const dateMatch = match[1].match(/([A-Z][a-z]{2})\s+(\d{1,2}),\s+(\d{4})/);
    if (!dateMatch) continue;
    const date = `${dateMatch[3]}-${String(MONTHS[dateMatch[1]] + 1).padStart(2, "0")}-${dateMatch[2].padStart(2, "0")}`;
    points.push({ date, value: Number(match[2]) });
  }
  return points.sort((a, b) => a.date.localeCompare(b.date));
}

function mergePoints(base, incoming) {
  const merged = new Map(base.map((point) => [point.date, point.value]));
  for (const point of incoming) merged.set(point.date, point.value);
  return Array.from(merged, ([date, value]) => ({ date, value })).sort((a, b) => a.date.localeCompare(b.date));
}

async function fetchText(url) {
  const controller = new AbortController();
  let timer;
  const hardTimeout = new Promise((_, reject) => {
    timer = setTimeout(() => {
      controller.abort();
      reject(new SignalError("上游请求超时", 502));
    }, UPSTREAM_TIMEOUT_MS);
  });
  try {
    return await Promise.race([
      fetch(url, {
        headers: { "user-agent": "Mozilla/5.0 NasdaqSignalResearch/1.0" },
        signal: controller.signal,
      }).then(async (response) => {
        if (!response.ok) throw new SignalError(`HTTP ${response.status}`, 502);
        return response.text();
      }),
      hardTimeout,
    ]);
  } finally {
    if (timer) clearTimeout(timer);
  }
}

const liveCache = new Map();

async function refreshLive(today, liveStart) {
  const cached = liveCache.get(today);
  if (cached !== undefined && Date.now() - cached.at < LIVE_CACHE_MS) return cached.value;
  const [ndxLive, vixLive, capeLive] = await Promise.allSettled([
    fetchText(`${FRED}?id=NASDAQ100&cosd=${liveStart}&coed=${today}`).then(parseCsv),
    fetchText(`${FRED}?id=VIXCLS&cosd=${liveStart}&coed=${today}`).then(parseCsv),
    fetchText(CAPE_URL).then(parseCape),
  ]);
  const value = {
    ndx: ndxLive.status === "fulfilled" ? ndxLive.value : undefined,
    vix: vixLive.status === "fulfilled" ? vixLive.value : undefined,
    cape: capeLive.status === "fulfilled" ? capeLive.value : undefined,
  };
  liveCache.set(today, { at: Date.now(), value });
  return value;
}

/**
 * Build the JSON payload consumed by the panel.
 * @param {{ selectedDate: string, marketData: any, monthlySignals: any, live?: boolean }} input
 */
export async function buildSignals({ selectedDate, marketData, monthlySignals, live = true }) {
  const today = shanghaiDate();
  const currentMonth = today.slice(0, 7);
  if (!/^20\d{2}-(0[1-9]|1[0-2])-([0-2]\d|3[01])$/.test(selectedDate) || selectedDate < EARLIEST_DATE || selectedDate > today) {
    throw new SignalError(`日期须在 ${EARLIEST_DATE} 至 ${today} 之间（Asia/Shanghai）`);
  }
  if (!marketData || !monthlySignals) throw new SignalError("行情数据尚未生成", 503);

  const month = selectedDate.slice(0, 7);
  let ndx = unpack(marketData.ndx);
  let vix = unpack(marketData.vix);
  let cape = unpack(marketData.cape);
  const qqqAdjusted = unpack(marketData.qqqAdjusted ?? marketData.qqq);

  const modes = { ndx: "snapshot", vix: "snapshot", cape: "snapshot" };
  if (live && month === currentMonth) {
    try {
      const refreshed = await refreshLive(today, previousMonthStart(today));
      if (refreshed.ndx?.length) {
        ndx = mergePoints(ndx, refreshed.ndx);
        modes.ndx = "live";
      }
      if (refreshed.vix?.length) {
        vix = mergePoints(vix, refreshed.vix);
        modes.vix = "live";
      }
      if (refreshed.cape && refreshed.cape.length > 100) {
        cape = mergePoints(cape, refreshed.cape);
        modes.cape = "live";
      }
    } catch {
      // Snapshot-only mode is a valid outcome; freshness labels reflect it.
    }
  }

  const rule = (monthlySignals.points ?? []).find((point) => point.month === month);
  if (!rule) throw new SignalError("该月的策略快照尚未生成");

  const executionDate = rule.date;
  const cheap = rule.cape < 20;
  const high = rule.cape > 70;
  const bubble = rule.cape > 85;
  const deep = rule.drawdownFromPeak <= -20;
  const panic = rule.vix >= 40;
  const quickCrash = rule.quickDrop <= -12;
  const nearHigh = rule.drawdownFromPeak >= -5;

  const contributionValue = rule.contributionCode === "big-bottom" ? "3×" : rule.contributionCode === "small-bottom" ? "2×" : rule.contributionCode === "high-near-high" ? "0×" : "1×";
  const contributionDetail = rule.contributionCode === "big-bottom"
    ? "基础月供外再注入 2× 新现金"
    : rule.contributionCode === "small-bottom"
      ? "基础月供外再注入 1× 新现金"
      : rule.contributionCode === "high-near-high"
        ? "取消当月基础投入，不转入弹药仓"
        : "按基础月供注入新现金";
  const target = rule.contributionCode === "big-bottom"
    ? "买入 TQQQ"
    : rule.contributionCode === "high-near-high"
      ? "无新现金买入"
      : "买入 QQQ";
  const targetDetail = rule.contributionCode === "big-bottom"
    ? "新现金当月直买 TQQQ；QQQ 换仓坡道从下月开始"
    : rule.contributionCode === "small-bottom"
      ? "基础月供与额外 1× 新现金一并买入 QQQ"
      : rule.contributionCode === "high-near-high"
        ? "取消当月基础投入，不转入弹药仓"
        : "按基础月供正常定投 QQQ";
  const accent = rule.code === "big-bottom" ? "green" : rule.code === "high-near-high" ? "amber" : "blue";

  const decision = {
    code: rule.code,
    title: rule.title,
    summary: `${rule.rampTitle}；${rule.riskTitle}；${rule.contribution}。`,
    contribution: contributionValue,
    contributionDetail,
    target,
    targetDetail,
    ammo: rule.ammoTitle,
    ammoDetail: rule.ammoDetail,
    rampTitle: rule.rampTitle,
    riskTitle: rule.riskTitle,
    riskTriggered: rule.riskCode !== "none",
    accent,
  };

  const sources = {
    ndx: { label: "趋势价格", provider: "FRED NDX + Yahoo QQQ", mode: modes.ndx, asOf: ndx[ndx.length - 1].date, url: "https://fred.stlouisfed.org/series/NASDAQ100" },
    vix: { label: "VIX", provider: "FRED / Cboe", mode: modes.vix, asOf: vix[vix.length - 1].date, url: "https://fred.stlouisfed.org/series/VIXCLS" },
    cape: { label: "Shiller CAPE", provider: "Multpl / Robert Shiller", mode: modes.cape, asOf: cape[cape.length - 1].date, url: "https://www.econ.yale.edu/~shiller/data.htm" },
    snapshotGeneratedAt: marketData.generatedAt,
  };

  const observation = dailyObservation(ndx, qqqAdjusted, vix, cape, selectedDate);

  return {
    month,
    executionDate,
    dataUpdatedThrough: ndx[ndx.length - 1].date,
    cape: { value: rule.capeValue, percentile: rule.cape, date: rule.capeDate, cheap, high, bubble },
    trend: {
      ndx5: rule.ndx,
      close: rule.ndx,
      drawdownPct: rule.drawdownFromPeak,
      runningDrawdownPct: rule.drawdownFromPeak,
      distance52WeekPct: rule.distance52Week,
      athDrawdownPct: rule.drawdownFromPeak,
      peakDate: rule.peakDate,
      high52WeekDate: null,
      quickDropPct: rule.quickDrop,
      deep,
      quickCrash,
      nearHigh,
    },
    vix: { value5: rule.vix, panic, quiet: rule.quiet },
    lowCount: rule.lowCount,
    prolongedHot: rule.riskCode === "prolonged-hot",
    hotMonths: rule.coolMonths,
    prolongedReason: rule.coolMonths ? "VIX < 12 或 CAPE > 85%（两者可交替累计）" : null,
    decision,
    observation,
    sources,
  };
}

export function buildHistory(monthlySignals) {
  return {
    generatedAt: monthlySignals?.generatedAt ?? null,
    points: Array.isArray(monthlySignals?.points) ? monthlySignals.points : [],
  };
}
