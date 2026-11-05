import React, { useMemo, useState } from "react";
import { dateLabel, fmt, pct } from "./util.js";

const RANGE_MONTHS = { "5y": 60, "10y": 120, all: Number.POSITIVE_INFINITY };
const RANGE_KEYS = ["5y", "10y", "all"];

const COLOR_VAR = {
  "big-bottom": "var(--nsg-success)",
  "small-bottom": "var(--nsg-brand)",
  normal: "var(--nsg-idle)",
  "high-near-high": "var(--nsg-warn)",
  "prolonged-hot": "color-mix(in srgb, var(--nsg-warn) 65%, var(--nsg-error))",
  "quick-crash": "var(--nsg-error)",
};

const chart = { width: 1000, height: 340, left: 96, right: 96, top: 24, bottom: 44 };
const plotWidth = chart.width - chart.left - chart.right;
const plotHeight = chart.height - chart.top - chart.bottom;
const yFor = (score) => chart.top + ((3 - score) / 3) * plotHeight;
const priceLabel = (value) => `$${Number(value).toFixed(2)}`;

export function HistoryChart({ t, points, selectedDate, onSelectDate }) {
  const [range, setRange] = useState("5y");
  const [focusedDate, setFocusedDate] = useState("");
  const visible = useMemo(() => {
    const list = Array.isArray(points) ? points : [];
    const limit = RANGE_MONTHS[range];
    return limit === Number.POSITIVE_INFINITY ? list : list.slice(-limit);
  }, [points, range]);

  const legendLabels = {
    "big-bottom": t("legendBig"),
    "small-bottom": t("legendSmall"),
    normal: t("legendNormal"),
    "high-near-high": t("legendHigh"),
    "prolonged-hot": t("legendProlonged"),
    "quick-crash": t("legendCrash"),
  };
  const levels = [
    { score: 3, label: "3× TQQQ" },
    { score: 2, label: "2× QQQ" },
    { score: 1, label: "1× QQQ" },
    { score: 0, label: t("pause") },
  ];

  if (visible.length < 2) {
    return (
      <section className="nsg-section">
        <div className="nsg-section-head">
          <div>
            <p className="nsg-eyebrow">{t("historyEyebrow")}</p>
            <h2>{t("historyTitle")}</h2>
          </div>
        </div>
        <div className="nsg-empty">{t("historyFailed")}</div>
      </section>
    );
  }

  const storedFocusIndex = visible.findIndex((point) => point.date === focusedDate);
  const selectedMonthIndex = visible.findIndex((point) => point.month === selectedDate.slice(0, 7));
  const focusedIndex = storedFocusIndex >= 0 ? storedFocusIndex : selectedMonthIndex >= 0 ? selectedMonthIndex : visible.length - 1;
  const focused = visible[focusedIndex] ?? visible[visible.length - 1];
  const xFor = (index) => chart.left + (index / Math.max(1, visible.length - 1)) * plotWidth;
  const linePath = visible.map((point, index) => `${index ? "L" : "M"}${xFor(index).toFixed(2)},${yFor(point.score).toFixed(2)}`).join(" ");
  const areaPath = `${linePath} L${xFor(visible.length - 1).toFixed(2)},${chart.height - chart.bottom} L${chart.left},${chart.height - chart.bottom} Z`;
  const logs = visible.map((point) => Math.log(Number(point.qqq) || 1));
  const minLog = Math.min(...logs);
  const maxLog = Math.max(...logs);
  const logSpan = Math.max(0.0001, maxLog - minLog);
  const qqqY = (value) => chart.top + (1 - (Math.log(Number(value) || 1) - minLog) / logSpan) * plotHeight;
  const qqqPath = visible.map((point, index) => `${index ? "L" : "M"}${xFor(index).toFixed(2)},${qqqY(point.qqq).toFixed(2)}`).join(" ");
  const qqqMin = Math.min(...visible.map((point) => Number(point.qqq) || 0));
  const qqqMax = Math.max(...visible.map((point) => Number(point.qqq) || 0));
  const tickIndexes = Array.from(new Set([0, 0.25, 0.5, 0.75, 1].map((ratio) => Math.round((visible.length - 1) * ratio))));
  const codes = Array.from(new Set(visible.map((point) => point.code)));

  const moveFocus = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    if (bounds.width <= 0) return;
    const ratio = Math.min(1, Math.max(0, (event.clientX - bounds.left) / bounds.width));
    const index = Math.round(ratio * (visible.length - 1));
    const point = visible[index];
    if (point !== undefined) setFocusedDate(point.date);
  };

  return (
    <section className="nsg-section">
      <div className="nsg-section-head">
        <div>
          <p className="nsg-eyebrow">{t("historyEyebrow")}</p>
          <h2>{t("historyTitle")}</h2>
        </div>
        <div className="nsg-history-ranges" role="group" aria-label={t("historyTitle")}>
          {RANGE_KEYS.map((key) => (
            <button
              type="button"
              key={key}
              className={range === key ? "active" : ""}
              aria-pressed={range === key}
              onClick={() => {
                setRange(key);
                setFocusedDate("");
              }}
            >
              {t(key === "5y" ? "range5y" : key === "10y" ? "range10y" : "rangeAll")}
            </button>
          ))}
        </div>
      </div>

      <div className="nsg-history">
        <div className="nsg-chart-meta">
          <span>{t("chartTier")}</span>
          <small>{fmt(t("chartPoints"), { n: visible.length })}</small>
        </div>
        <svg className="nsg-chart" viewBox={`0 0 ${chart.width} ${chart.height}`} role="img" aria-label={t("chartAria")}>
          {levels.map((level) => (
            <g className="nsg-y-label" key={level.score}>
              <line x1={chart.left} x2={chart.width - chart.right} y1={yFor(level.score)} y2={yFor(level.score)} />
              <text x={chart.left - 12} y={yFor(level.score) + 4} textAnchor="end">{level.label}</text>
            </g>
          ))}
          <path className="nsg-qqq-line" d={qqqPath} />
          <text className="nsg-qqq-axis" x={chart.width - chart.right + 10} y={chart.top + 4}>QQQ {priceLabel(qqqMax)}</text>
          <text className="nsg-qqq-axis" x={chart.width - chart.right + 10} y={chart.height - chart.bottom}>QQQ {priceLabel(qqqMin)}</text>
          <path className="nsg-area" d={areaPath} />
          <path className="nsg-line" d={linePath} />
          {visible.map((point, index) => (
            <circle
              className={`nsg-dot ${point.code}`}
              key={point.date}
              cx={xFor(index)}
              cy={yFor(point.score)}
              r={point.date === focused.date ? 5 : visible.length > 150 ? 1.6 : 2.4}
              opacity={point.date === focused.date ? 1 : 0.75}
            />
          ))}
          <line className="nsg-focus-line" x1={xFor(focusedIndex)} x2={xFor(focusedIndex)} y1={chart.top} y2={chart.height - chart.bottom} />
          <circle className="nsg-focus-halo" cx={xFor(focusedIndex)} cy={yFor(focused.score)} r="10" fill="none" stroke={COLOR_VAR[focused.code] ?? "var(--nsg-brand)"} />
          {tickIndexes.map((index) => (
            <text
              className="nsg-x-label"
              x={xFor(index)}
              y={chart.height - 14}
              textAnchor={index === 0 ? "start" : index === visible.length - 1 ? "end" : "middle"}
              key={index}
            >
              {visible[index].month.replace("-", ".")}
            </text>
          ))}
          <rect className="nsg-hit-area" x={chart.left} y={chart.top} width={plotWidth} height={plotHeight} onPointerMove={moveFocus} onPointerDown={moveFocus} />
        </svg>
        <div className="nsg-legend">
          <span className="qqq"><b />{t("legendQQQ")}</span>
          {codes.map((code) => (
            <span key={code}><i style={{ background: COLOR_VAR[code] }} />{legendLabels[code] ?? code}</span>
          ))}
        </div>

        <div className="nsg-history-detail">
          <div className="nsg-history-head">
            <div className="nsg-history-summary">
              <div className="nsg-history-date">
                <span>{dateLabel(focused.date)}</span>
                <em>{fmt(t("lowSignals"), { n: focused.lowCount })}</em>
              </div>
              <div className="nsg-history-action">
                <strong style={{ color: COLOR_VAR[focused.code] }}>{focused.label}</strong>
                <h3>{focused.title}</h3>
              </div>
            </div>
            <button type="button" className="nsg-btn" onClick={() => onSelectDate(focused.date)}>{t("viewDecision")}</button>
          </div>
          <div className="nsg-history-body">
            <div className="nsg-exec">
              <span>{t("executionOrder")}</span>
              <b><i>1</i>{focused.rampTitle}</b>
              <b><i>2</i>{focused.riskTitle}</b>
              <b><i>3</i>{focused.ammoTitle}</b>
              <b><i>4</i>{focused.contribution}</b>
            </div>
            <div className="nsg-ammo">
              <span>{t("ammoAction")}</span>
              <b>{focused.ammoTitle}</b>
              <small>{focused.ammoDetail}</small>
            </div>
          </div>
          <div className="nsg-history-values">
            <div><span>{t("qqqActual")}</span><b>{priceLabel(focused.qqq)}</b><small>{t("qqqActualNote")}</small></div>
            <div><span>{t("capePercentileShort")}</span><b>{Number(focused.cape).toFixed(1)}%</b><small>{focused.cape > 85 ? t("bubble") : focused.cape > 70 ? t("overvalued") : focused.cape < 20 ? t("cheap") : t("neutral")}</small></div>
            <div><span>{t("drawdownShort")}</span><b>{pct(focused.drawdownFromPeak)}</b><small>{focused.drawdownFromPeak <= -20 ? t("deepDrop") : dateLabel(focused.peakDate)}</small></div>
            <div><span>{t("vixMonthStart")}</span><b>{Number(focused.vix).toFixed(1)}</b><small>{focused.vix >= 40 ? t("extremeFear") : focused.vix < 12 ? t("tooCalm") : t("calm")}</small></div>
          </div>
        </div>
        <p className="nsg-note">{t("historyNote")}</p>
      </div>
    </section>
  );
}
