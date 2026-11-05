import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CSS } from "./styles.js";
import { DateControl } from "./calendar.jsx";
import { HistoryChart } from "./history-chart.jsx";
import { callApi, dateLabel, dateTimeLabel, daysBetween, EARLIEST_DATE, fmt, pct, shanghaiToday } from "./util.js";

function stateClass(active, warning = false) {
  if (active) return "on";
  if (warning) return "warn";
  return "calm";
}

export function Panel(props) {
  const t = props.t;
  const today = useMemo(() => shanghaiToday(), []);
  const currentMonth = today.slice(0, 7);

  const [selectedDate, setSelectedDate] = useState(today);
  const [signals, setSignals] = useState(null);
  const [history, setHistory] = useState(null);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [syncing, setSyncing] = useState(false);
  const [refreshToken, setRefreshToken] = useState(0);

  const rootRef = useRef(null);
  const requestRef = useRef(0);
  const lastSuccessRef = useRef(undefined);
  const historyFallbackRef = useRef(null);
  const fallbackTriedRef = useRef(false);
  const syncStartedAtRef = useRef(0);

  const loadSignals = useCallback((date) => {
    const requestId = requestRef.current + 1;
    requestRef.current = requestId;
    setLoading(true);
    setError(null);
    return callApi("signals", { date })
      .then((value) => {
        if (requestRef.current !== requestId) return false;
        setSignals(value);
        return true;
      })
      .catch((cause) => {
        if (requestRef.current !== requestId) return false;
        const message = cause instanceof Error ? cause.message : String(cause);
        const fallback = historyFallbackRef.current;
        if (date.slice(0, 7) === currentMonth && fallback !== null && fallback !== date && !fallbackTriedRef.current) {
          fallbackTriedRef.current = true;
          setSelectedDate(fallback);
          return false;
        }
        setError(message);
        return false;
      })
      .finally(() => {
        if (requestRef.current === requestId) setLoading(false);
      });
  }, [currentMonth]);

  useEffect(() => {
    loadSignals(selectedDate);
  }, [loadSignals, selectedDate, refreshToken]);

  useEffect(() => {
    let cancelled = false;
    callApi("history")
      .then((value) => {
        if (cancelled) return;
        setHistory(value);
        const last = Array.isArray(value?.points) && value.points.length > 0 ? value.points[value.points.length - 1] : null;
        historyFallbackRef.current = last === null ? null : last.date;
      })
      .catch(() => {
        if (!cancelled) setHistory(null);
      });
    return () => {
      cancelled = true;
    };
  }, [refreshToken]);

  // Status heartbeat: once a minute, faster while the Host reports a run.
  useEffect(() => {
    let cancelled = false;
    let timer = null;
    const tick = () => {
      callApi("status")
        .then((next) => {
          if (cancelled) return;
          setStatus(next);
          const previous = lastSuccessRef.current;
          lastSuccessRef.current = next.lastSuccessAt ?? null;
          if (previous !== undefined && previous !== null && next.lastSuccessAt !== null && next.lastSuccessAt !== previous) {
            // A sync finished. If the panel had fallen back to the previous
            // month because the current month was not generated yet, return to
            // today now that the data exists.
            if (fallbackTriedRef.current) {
              fallbackTriedRef.current = false;
              setSelectedDate(today);
            }
            setRefreshToken((value) => value + 1);
          }
          timer = setTimeout(tick, next.running ? 1500 : 60000);
        })
        .catch(() => {
          if (!cancelled) timer = setTimeout(tick, 60000);
        });
    };
    tick();
    return () => {
      cancelled = true;
      if (timer !== null) clearTimeout(timer);
    };
  }, [today]);

  // A manual sync is tracked separately so a slow start (spawn, network) does
  // not stop the fast status polling before the Host reports the run.
  useEffect(() => {
    if (!syncing) return undefined;
    let cancelled = false;
    let timer = null;
    const deadline = Date.now() + 120000;
    const startedAt = syncStartedAtRef.current;
    const tick = async () => {
      try {
        const next = await callApi("status");
        if (cancelled) return;
        setStatus(next);
        const attempted = typeof next.lastAttemptAt === "string" && Date.parse(next.lastAttemptAt) >= startedAt - 1500;
        if (next.running || (!attempted && Date.now() < deadline)) {
          timer = setTimeout(tick, 1200);
          return;
        }
        if (attempted) {
          // Ensure the panel reloads even when the run finished between two
          // heartbeat ticks.
          lastSuccessRef.current = next.lastSuccessAt ?? lastSuccessRef.current;
          setRefreshToken((value) => value + 1);
        }
        setSyncing(false);
      } catch {
        if (!cancelled) timer = setTimeout(tick, 2000);
      }
    };
    timer = setTimeout(tick, 800);
    return () => {
      cancelled = true;
      if (timer !== null) clearTimeout(timer);
    };
  }, [syncing]);

  const syncNow = useCallback(() => {
    syncStartedAtRef.current = Date.now();
    setSyncing(true);
    setError(null);
    callApi("update")
      .then((result) => {
        if (result?.status) setStatus(result.status);
      })
      .catch((cause) => {
        setError(cause instanceof Error ? cause.message : String(cause));
        setSyncing(false);
      });
  }, []);

  const selectDate = useCallback((date) => {
    if (typeof date !== "string" || date < EARLIEST_DATE || date > today) return;
    if (date === selectedDate) return;
    fallbackTriedRef.current = false;
    setSelectedDate(date);
    if (rootRef.current !== null) rootRef.current.scrollTo({ top: 0, behavior: "smooth" });
  }, [selectedDate, today]);

  return (
    <PanelView
      t={t}
      signals={signals}
      history={history}
      status={status}
      selectedDate={selectedDate}
      loading={loading}
      error={error}
      syncing={syncing}
      today={today}
      rootRef={rootRef}
      onSelectDate={selectDate}
      onSync={syncNow}
      onRefresh={() => setRefreshToken((value) => value + 1)}
    />
  );
}

export function PanelView(props) {
  const { t, signals, history, status, selectedDate, loading, error, syncing, today, rootRef, onSelectDate, onSync, onRefresh } = props;
  const currentMonth = today.slice(0, 7);
  const observation = signals?.observation ?? null;
  const accent = observation?.decision?.accent ?? "blue";
  const dataThrough = signals?.dataUpdatedThrough ?? status?.dataUpdatedThrough ?? null;
  const staleDays = dataThrough === null ? 0 : Math.max(0, daysBetween(dataThrough, today));
  const running = syncing || status?.running === true;

  const syncLabel = running
    ? t("syncing")
    : status?.lastError
      ? t("syncFailed")
      : status?.lastSuccessAt
        ? fmt(t("lastSync"), { when: dateTimeLabel(status.lastSuccessAt) })
        : t("neverSynced");
  const nextLabel = status?.nextRunAt && !running ? fmt(t("nextSync"), { when: dateTimeLabel(status.nextRunAt) }) : "";
  const notice = signals === null
    ? ""
    : signals.month === currentMonth
      ? fmt(t("liveSources"), {
        n: [signals.sources?.ndx, signals.sources?.vix, signals.sources?.cape].filter((source) => source?.mode === "live").length,
        date: dateLabel(signals.executionDate),
      })
      : fmt(t("snapshotNotice"), { date: dateLabel(signals.executionDate) });

  const headline = (contribution) => contribution === "0×"
    ? t("pause")
    : contribution === "1×"
      ? t("oneX")
      : contribution === "2×"
        ? t("twoX")
        : t("threeX");

  const zoneLabel = (next) => {
    if (next.lowCount === 3) return t("zone3");
    if (next.lowCount === 2) return t("zone2");
    if (next.lowCount === 1) return t("zone1");
    if (next.cape.high && next.trend.nearHigh) return t("zoneHigh");
    return t("zoneNormal");
  };

  const signalCards = useMemo(() => {
    if (observation === null || signals === null) return [];
    const cape = observation.cape;
    const trend = observation.trend;
    const vix = observation.vix;
    return [
      {
        code: "01",
        label: t("valuation"),
        name: t("capePercentile"),
        value: `${Number(cape.percentile).toFixed(1)}%`,
        detail: cape.cheap ? t("cheap") : cape.bubble ? t("bubble") : cape.high ? t("overvalued") : t("neutral"),
        state: stateClass(cape.cheap, cape.high),
        threshold: t("thresholdCape"),
        meter: Math.min(100, Math.max(0, Number(cape.percentile))),
        source: signals.sources.cape,
        sourceDate: cape.date,
      },
      {
        code: "02",
        label: t("trend"),
        name: t("drawdownFromPeak"),
        value: pct(trend.drawdownPct),
        detail: trend.deep ? t("deepDrop") : trend.nearHigh ? t("nearHigh") : t("normalDrop"),
        state: stateClass(trend.deep),
        threshold: t("thresholdDrawdown"),
        meter: Math.min(100, Math.abs(Number(trend.drawdownPct)) * 3),
        source: signals.sources.ndx,
        sourceDate: observation.asOfDate,
      },
      {
        code: "03",
        label: t("panic"),
        name: t("vixValue"),
        value: Number(vix.value5).toFixed(1),
        detail: vix.panic ? t("extremeFear") : vix.quiet ? t("tooCalm") : t("calm"),
        state: stateClass(vix.panic, vix.quiet),
        threshold: t("thresholdVix"),
        meter: Math.min(100, Number(vix.value5) * 2),
        source: signals.sources.vix,
        sourceDate: vix.date,
      },
    ];
  }, [observation, signals, t]);

  const trace = useMemo(() => {
    if (signals === null) return [];
    const decision = signals.decision;
    return [
      { title: t("step1"), text: decision.rampTitle, hit: typeof decision.rampTitle === "string" && decision.rampTitle.startsWith("先按") },
      { title: t("step2"), text: decision.riskTitle, hit: decision.riskTriggered === true },
      { title: t("step3"), text: decision.ammoDetail, hit: signals.lowCount > 0 || String(decision.ammo ?? "").includes("1/6") },
      { title: t("step4"), text: `${decision.contribution} · ${decision.contributionDetail}`, hit: true },
    ];
  }, [signals, t]);

  const methodItems = [
    ["method1Title", "method1"],
    ["method2Title", "method2"],
    ["method3Title", "method3"],
    ["method4Title", "method4"],
    ["method5Title", "method5"],
    ["method6Title", "method6"],
  ];
  const syncErrorRecent = status?.lastError && status?.lastAttemptAt && Date.now() - Date.parse(status.lastAttemptAt) < 86400000;

  return (
    <section className="nsg-page" data-accent={accent} ref={rootRef}>
      <style>{CSS}</style>
      <div className="nsg-shell">
        <div className="nsg-topbar">
          <div className="nsg-brand">
            <span className="nsg-brand-mark" aria-hidden="true">N³</span>
            <div>
              <h1>{t("title")}</h1>
              <p>{t("subtitle")}</p>
            </div>
          </div>
          <div className="nsg-topbar-actions">
            {dataThrough !== null ? (
              <span className={"nsg-pill" + (staleDays >= 3 ? " stale" : "")} title={status?.lastError ?? undefined}>
                <i />
                {fmt(t("dataThrough"), { date: dateLabel(dataThrough) })}
                {staleDays > 0 ? ` · ${fmt(t("daysAgo"), { n: staleDays })}` : ""}
              </span>
            ) : null}
            <DateControl t={t} selectedDate={selectedDate} loading={loading} notice={notice} onSelect={onSelectDate} />
            <button type="button" className="nsg-btn primary" onClick={onSync} disabled={running}>
              {running ? <span className="nsg-spin" aria-hidden="true" /> : null}
              {running ? t("syncing") : t("syncNow")}
            </button>
            <button type="button" className="nsg-btn" onClick={() => onRefresh()} title={t("refresh")}>
              ↻
            </button>
          </div>
        </div>
        <div className="nsg-sync-note" role="status">
          {syncLabel}
          {nextLabel === "" ? "" : ` · ${nextLabel}`}
          {status?.lastSuccessAt ? "" : ` · ${fmt(t("autoSync"), { time: `${String(status?.schedule?.hour ?? 9).padStart(2, "0")}:${String(status?.schedule?.minute ?? 10).padStart(2, "0")}` })}`}
        </div>

        {signals !== null && signals.month !== currentMonth ? (
          <div className="nsg-banner info">
            <div>{fmt(t("beforeMonthNotice"), { month: dateLabel(signals.executionDate) })}</div>
          </div>
        ) : null}
        {error !== null ? (
          <div className="nsg-banner" role="alert">
            <div><strong>{t("loadFailed")}</strong>{error}</div>
            <button type="button" className="nsg-btn" onClick={() => onRefresh()}>{t("retry")}</button>
          </div>
        ) : null}
        {syncErrorRecent ? (
          <div className="nsg-banner" role="alert">
            <div><strong>{t("syncFailed")}</strong>{status.lastError}</div>
            <button type="button" className="nsg-btn" onClick={onSync} disabled={running}>{t("retry")}</button>
          </div>
        ) : null}

        {signals === null || observation === null ? (
          <div className="nsg-empty">{loading ? t("loading") : t("loadFailed")}</div>
        ) : (
          <>
            <section className={"nsg-hero" + (loading ? " loading" : "")} aria-live="polite">
              <div className="nsg-hero-main">
                <div className="nsg-meta">
                  <span className="nsg-live"><i />{t("daySignal")} · {dateLabel(observation.asOfDate)}</span>
                  <span>{fmt(t("monthExecution"), { date: dateLabel(signals.executionDate) })}</span>
                </div>
                <p className="nsg-kicker">{t("dayReference")}</p>
                <div className="nsg-headline">
                  <strong>{observation.decision.contribution}</strong>
                  <div>
                    <h2>{headline(observation.decision.contribution)}</h2>
                    <p>{observation.decision.contributionDetail}</p>
                  </div>
                </div>
                <div className="nsg-actions">
                  <article>
                    <span><i>01</i>{t("todayReference")}</span>
                    <strong>{observation.decision.target}</strong>
                    <small>{observation.decision.targetDetail}</small>
                  </article>
                  <article>
                    <span><i>02</i>{t("executedThisMonth")}</span>
                    <strong>{signals.decision.target}</strong>
                    <small>{dateLabel(signals.executionDate)} · {signals.decision.targetDetail}</small>
                  </article>
                </div>
              </div>
              <aside className="nsg-score">
                <div className="nsg-orb">
                  <span>{t("lowResonance")}</span>
                  <strong>{observation.lowCount}<small>/3</small></strong>
                  <em>{t("signalsOn")}</em>
                </div>
                <p><i className="nsg-accent-dot" />{zoneLabel(observation)}</p>
              </aside>
            </section>

            <section className="nsg-section">
              <div className="nsg-section-head">
                <div>
                  <p className="nsg-eyebrow">{t("signalEyebrow")}</p>
                  <h2>{t("signalTitle")}</h2>
                </div>
                <p>{t("signalNote")}</p>
              </div>
              <div className="nsg-signal-grid">
                {signalCards.map((card) => (
                  <article className={"nsg-signal " + card.state} key={card.code}>
                    <div className="nsg-signal-top"><span>{card.code} / {card.label}</span><i /></div>
                    <p className="nsg-signal-name">{card.name}</p>
                    <strong>{card.value}</strong>
                    <h3>{card.detail}</h3>
                    <div className="nsg-meter"><span style={{ width: `${card.meter}%` }} /></div>
                    <small>{card.threshold}</small>
                    <div className="nsg-signal-source">
                      <span>{card.source.provider} · {dateLabel(card.sourceDate)}</span>
                      <em className={"nsg-mode " + card.source.mode}>{card.source.mode === "live" ? t("live") : t("snapshot")}</em>
                    </div>
                  </article>
                ))}
              </div>
              <div className="nsg-secondary">
                <div>
                  <span>{t("distance52w")}</span>
                  <strong>{pct(observation.trend.distance52WeekPct ?? observation.trend.drawdownPct)}</strong>
                  <small>{t("backgroundOnly")}</small>
                </div>
                <div>
                  <span>{t("quickDrop25")}</span>
                  <strong>{pct(observation.trend.quickDropPct)}</strong>
                  <small>{observation.trend.quickCrash ? t("quickCrashTriggered") : t("threshold12")}</small>
                </div>
                <div>
                  <span>{t("cooldown")}</span>
                  <strong>{signals.hotMonths >= 6 ? fmt(t("cooldownFull"), { n: signals.hotMonths }) : fmt(t("cooldownProgress"), { n: signals.hotMonths })}</strong>
                  <small>{t("cooldownRule")}</small>
                </div>
                <div>
                  <span>{t("capeMonth")}</span>
                  <strong>{dateLabel(observation.cape.date)}</strong>
                  <small>{t("monthlyDataNote")}</small>
                </div>
              </div>
            </section>

            <HistoryChart t={t} points={history?.points ?? []} selectedDate={selectedDate} onSelectDate={onSelectDate} />

            <section className="nsg-rule">
              <div>
                <p className="nsg-eyebrow">{t("traceEyebrow")}</p>
                <h2>{t("traceTitle")}</h2>
                <p className="nsg-rule-note">{t("traceNote")}</p>
              </div>
              <ol className="nsg-steps">
                {trace.map((item, index) => (
                  <li className={item.hit ? "hit" : ""} key={item.title}>
                    <b>{index + 1}</b>
                    <div><strong>{item.title}</strong><span>{item.text}</span></div>
                  </li>
                ))}
              </ol>
            </section>

            <details className="nsg-method">
              <summary>{t("methodTitle")}</summary>
              <div className="nsg-method-grid">
                {methodItems.map(([titleKey, bodyKey]) => (
                  <p key={titleKey}><span>{t(titleKey)}</span>{t(bodyKey)}</p>
                ))}
              </div>
            </details>

            <section className="nsg-section">
              <div className="nsg-section-head">
                <div>
                  <p className="nsg-eyebrow">{t("sourcesTitle")}</p>
                  <h2>{fmt(t("generatedAt"), { when: dateTimeLabel(signals.sources.snapshotGeneratedAt) })}</h2>
                </div>
                <p>{t("sourcesNote")}</p>
              </div>
              <div className="nsg-sources">
                {[signals.sources.ndx, signals.sources.vix, signals.sources.cape].map((source) => (
                  <a href={source.url} target="_blank" rel="noreferrer" key={source.label}>
                    <span>{source.label}</span>
                    <strong>{source.provider}</strong>
                    <small>{fmt(t("dataThrough"), { date: dateLabel(source.asOf) })}</small>
                    <em className={"nsg-mode " + source.mode}>{source.mode === "live" ? t("live") : t("snapshot")}</em>
                  </a>
                ))}
                <a href="https://finance.yahoo.com/quote/QQQ/history/" target="_blank" rel="noreferrer">
                  <span>{t("sourceQQQ")}</span>
                  <strong>Yahoo Finance</strong>
                  <small>{t("sourceQQQNote")}</small>
                  <em className="nsg-mode">{t("daily")}</em>
                </a>
              </div>
            </section>

            <section className="nsg-credit">
              <div><strong>{t("credit")}</strong> · {t("creditOriginal")}</div>
              <div className="nsg-credit-links">
                <a href="https://x.com/app_sail/status/2070037504674173060" target="_blank" rel="noreferrer">{t("creditRead")} ↗</a>
                <a href="https://x.com/app_sail" target="_blank" rel="noreferrer">{t("creditAuthor")} ↗</a>
              </div>
            </section>

            <footer className="nsg-footer">
              <span>{t("footer")}</span>
              <a href="#top" onClick={(event) => { event.preventDefault(); if (rootRef.current !== null) rootRef.current.scrollTo({ top: 0, behavior: "smooth" }); }}>{t("backToTop")} ↑</a>
            </footer>
          </>
        )}
      </div>
    </section>
  );
}
