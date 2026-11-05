/** Browser-side helpers shared by the panel components. */
export const EARLIEST_DATE = "2000-01-03";
export const TIME_ZONE = "Asia/Shanghai";

export function fmt(template, params) {
  if (typeof template !== "string") return "";
  if (params === undefined) return template;
  return template.replace(/\{(\w+)\}/g, (match, key) => (params[key] === undefined || params[key] === null ? match : String(params[key])));
}

export function shanghaiToday(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const value = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${value.year}-${value.month}-${value.day}`;
}

export function dateLabel(value) {
  if (typeof value !== "string") return "";
  const [year, month, day] = value.split("-");
  if (!year || !month) return "";
  return day ? `${year}.${month}.${day}` : `${year}.${month}`;
}

export function dateTimeLabel(iso) {
  if (typeof iso !== "string") return "";
  const time = Date.parse(iso);
  if (!Number.isFinite(time)) return "";
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: TIME_ZONE,
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(new Date(time));
  const value = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${value.month}-${value.day} ${value.hour}:${value.minute}`;
}

export function timeLabel(iso) {
  const label = dateTimeLabel(iso);
  return label === "" ? "" : label.slice(6);
}

export function daysBetween(fromDate, toDate) {
  if (!fromDate || !toDate) return 0;
  const from = Date.parse(`${fromDate}T00:00:00Z`);
  const to = Date.parse(`${toDate}T00:00:00Z`);
  if (!Number.isFinite(from) || !Number.isFinite(to)) return 0;
  return Math.round((to - from) / 86400000);
}

export function pct(value, digits = 1) {
  const number = Number(value);
  if (!Number.isFinite(number)) return "—";
  return `${number > 0 ? "+" : ""}${number.toFixed(digits)}%`;
}

function endpointUrl(endpoint) {
  const base = typeof document !== "undefined" && typeof document.baseURI === "string" ? document.baseURI : "http://localhost/";
  return new URL(`nasdaq-signal-guide/${endpoint}`, base).toString();
}

/** Same-origin JSON call to the plugin's Host route. */
export async function callApi(endpoint, payload) {
  const response = await fetch(endpointUrl(endpoint), {
    method: "POST",
    headers: { "content-type": "application/json", "x-dsh-nasdaq-signal-guide": "1" },
    body: JSON.stringify(payload === undefined ? {} : payload),
    credentials: "same-origin",
    cache: "no-store",
  });
  let body;
  try {
    body = await response.json();
  } catch {
    throw new Error(`HTTP ${response.status}`);
  }
  if (!response.ok || body === null || typeof body !== "object" || body.ok !== true) {
    const message = body?.error?.message;
    throw new Error(typeof message === "string" && message !== "" ? message : `HTTP ${response.status}`);
  }
  return body.value;
}
