import React, { useEffect, useMemo, useState } from "react";
import { EARLIEST_DATE, dateLabel, fmt, shanghaiToday } from "./util.js";

function monthParts(value) {
  const [year, month] = value.split("-").map(Number);
  return { year, month };
}

function shiftMonth(value, delta) {
  const { year, month } = monthParts(value);
  const date = new Date(Date.UTC(year, month - 1 + delta, 1));
  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}`;
}

function calendarDays(value) {
  const { year, month } = monthParts(value);
  const firstWeekday = (new Date(Date.UTC(year, month - 1, 1)).getUTCDay() + 6) % 7;
  const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();
  return Array.from({ length: 42 }, (_, index) => {
    const day = index - firstWeekday + 1;
    if (day < 1 || day > daysInMonth) return null;
    return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  });
}

export function DateControl({ t, selectedDate, loading, notice, onSelect }) {
  const today = shanghaiToday();
  const currentMonth = today.slice(0, 7);
  const [open, setOpen] = useState(false);
  const [viewMonth, setViewMonth] = useState(selectedDate.slice(0, 7));

  useEffect(() => {
    if (open) setViewMonth(selectedDate.slice(0, 7));
  }, [open, selectedDate]);

  useEffect(() => {
    if (!open) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  const years = useMemo(() => {
    const last = Number(today.slice(0, 4));
    return Array.from({ length: Math.max(1, last - 1999) }, (_, index) => 2000 + index);
  }, [today]);
  const weekdays = t("weekdays").split(",");
  const days = calendarDays(viewMonth);
  const view = monthParts(viewMonth);

  const choose = (date) => {
    if (date < EARLIEST_DATE || date > today) return;
    setOpen(false);
    onSelect(date);
  };

  return (
    <div className={"nsg-date" + (open ? " is-open" : "")}>
      <span>{t("viewMonth")}</span>
      <button
        type="button"
        className="nsg-date-trigger"
        aria-label={t("openCalendar")}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => {
          setViewMonth(selectedDate.slice(0, 7));
          setOpen((value) => !value);
        }}
      >
        <strong>{dateLabel(selectedDate)}</strong>
        <i aria-hidden="true">▾</i>
      </button>
      <small className={loading ? "loading" : ""}>{loading ? t("loading") : notice}</small>
      {open ? (
        <>
          <button type="button" className="nsg-cal-scrim" aria-label={t("closeCalendar")} onClick={() => setOpen(false)} />
          <div className="nsg-cal" role="dialog" aria-label={t("selectDate")}>
            <div className="nsg-cal-toolbar">
              <button
                type="button"
                aria-label={t("prevMonth")}
                disabled={viewMonth <= "2000-01"}
                onClick={() => setViewMonth((value) => shiftMonth(value, -1))}
              >
                ‹
              </button>
              <div>
                <select
                  aria-label={t("yearUnit") || "year"}
                  value={view.year}
                  onChange={(event) => setViewMonth(`${event.target.value}-${String(view.month).padStart(2, "0")}`)}
                >
                  {years.map((year) => (
                    <option value={year} key={year}>
                      {year}
                      {t("yearUnit")}
                    </option>
                  ))}
                </select>
                <select
                  aria-label={t("monthUnit") || "month"}
                  value={view.month}
                  onChange={(event) => setViewMonth(`${view.year}-${String(event.target.value).padStart(2, "0")}`)}
                >
                  {Array.from({ length: 12 }, (_, index) => index + 1).map((month) => (
                    <option value={month} key={month}>
                      {month}
                      {t("monthUnit")}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="button"
                aria-label={t("nextMonth")}
                disabled={viewMonth >= currentMonth}
                onClick={() => setViewMonth((value) => shiftMonth(value, 1))}
              >
                ›
              </button>
            </div>
            <div className="nsg-cal-weekdays" aria-hidden="true">
              {weekdays.map((weekday, index) => (
                <span key={`${weekday}-${index}`}>{weekday}</span>
              ))}
            </div>
            <div className="nsg-cal-grid">
              {days.map((date, index) => (date ? (
                <button
                  type="button"
                  key={date}
                  className={date === selectedDate ? "selected" : date === today ? "today" : ""}
                  disabled={date < EARLIEST_DATE || date > today}
                  aria-label={dateLabel(date)}
                  aria-pressed={date === selectedDate}
                  onClick={() => choose(date)}
                >
                  {Number(date.slice(-2))}
                </button>
              ) : (
                <span key={`empty-${index}`} />
              )))}
            </div>
            <div className="nsg-cal-footer">
              <span>{t("calendarHint")}</span>
              <button type="button" onClick={() => choose(today)}>
                {t("backToToday")}
              </button>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
