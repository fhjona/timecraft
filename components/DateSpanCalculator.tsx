"use client";

import { useCallback, useEffect, useState } from "react";
import { computeSpan, toLocalInput } from "@/lib/date-span";
import type { Locale } from "@/lib/messages";
import { msg } from "@/lib/messages";
import {
  guessLocaleFromNavigator,
  loadStoredLocale,
  saveLocale,
} from "@/lib/locale-storage";

function htmlLang(locale: Locale): string {
  return locale === "pt-BR" ? "pt-BR" : locale;
}

export function DateSpanCalculator() {
  const [locale, setLocale] = useState<Locale>("en");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [forward, setForward] = useState(true);
  const [stats, setStats] = useState<
    | null
    | {
        calendarLine: string;
        totalDays: string;
        totalHours: string;
        totalMinutes: string;
        totalSeconds: string;
      }
  >(null);

  const applyLocale = useCallback((next: Locale) => {
    setLocale(next);
    saveLocale(next);
    if (typeof document !== "undefined") {
      document.documentElement.lang = htmlLang(next);
      document.title = msg(next, "pageTitle");
    }
  }, []);

  useEffect(() => {
    const stored = loadStoredLocale();
    applyLocale(stored ?? guessLocaleFromNavigator());
  }, [applyLocale]);

  useEffect(() => {
    const now = new Date();
    const weekAgo = new Date(now);
    weekAgo.setDate(weekAgo.getDate() - 7);
    setStart(toLocalInput(weekAgo));
    setEnd(toLocalInput(now));
  }, []);

  const run = useCallback(() => {
    const result = computeSpan(start, end, locale);
    if (!result.ok) {
      setHasError(true);
      setShowResults(false);
      setStats(null);
      return;
    }
    setHasError(false);
    setShowResults(true);
    setForward(result.forward);
    setStats(result.stats);
  }, [start, end, locale]);

  const onLocaleChange = (next: Locale) => {
    applyLocale(next);
    if (showResults && start && end) {
      const r = computeSpan(start, end, next);
      if (r.ok) {
        setForward(r.forward);
        setStats(r.stats);
      }
    }
  };

  const onSwap = () => {
    const s = start;
    setStart(end);
    setEnd(s);
    if (s && end) {
      const r = computeSpan(end, s, locale);
      if (r.ok) {
        setHasError(false);
        setShowResults(true);
        setForward(r.forward);
        setStats(r.stats);
      }
    }
  };

  const m = (key: Parameters<typeof msg>[1]) => msg(locale, key);

  return (
    <div className="wrap">
      <header>
        <div className="lang-row">
          <label htmlFor="locale">{m("langLabel")}</label>
          <select
            id="locale"
            name="locale"
            aria-label={m("langLabel")}
            value={locale}
            onChange={(e) => onLocaleChange(e.target.value as Locale)}
          >
            <option value="en">English</option>
            <option value="nb">Norsk (bokmål)</option>
            <option value="pt-BR">Português (Brasil)</option>
            <option value="sv">Svenska</option>
            <option value="da">Dansk</option>
          </select>
        </div>
        <h1>{m("title")}</h1>
        <p className="lede">{m("lede")}</p>
      </header>

      <div className="card">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            run();
          }}
        >
          <fieldset className="fieldset-reset">
            <legend>{m("legend")}</legend>
            <div className="row two">
              <div className="inner row">
                <label htmlFor="start">{m("labelStart")}</label>
                <input
                  type="datetime-local"
                  id="start"
                  name="start"
                  required
                  value={start}
                  onChange={(e) => setStart(e.target.value)}
                />
              </div>
              <div className="inner row">
                <label htmlFor="end">{m("labelEnd")}</label>
                <input
                  type="datetime-local"
                  id="end"
                  name="end"
                  required
                  value={end}
                  onChange={(e) => setEnd(e.target.value)}
                />
              </div>
            </div>
          </fieldset>
          <div className="actions">
            <button type="submit">{m("btnCalc")}</button>
            <button type="button" className="swap" onClick={onSwap}>
              {m("btnSwap")}
            </button>
          </div>
        </form>

        {showResults && stats && (
          <div className="results">
            <h2>{m("resultHeading")}</h2>
            <p className="pill">
              {forward ? m("dirForward") : m("dirBackward")}
            </p>
            <div className="grid">
              <div className="stat">
                <span>{m("statCalendar")}</span>
                <strong>{stats.calendarLine}</strong>
              </div>
              <div className="stat">
                <span>{m("statDaysDec")}</span>
                <strong>{stats.totalDays}</strong>
              </div>
              <div className="stat">
                <span>{m("statHours")}</span>
                <strong>{stats.totalHours}</strong>
              </div>
              <div className="stat">
                <span>{m("statMinutes")}</span>
                <strong>{stats.totalMinutes}</strong>
              </div>
              <div className="stat">
                <span>{m("statSeconds")}</span>
                <strong>{stats.totalSeconds}</strong>
              </div>
            </div>
          </div>
        )}

        {!showResults && !hasError && (
          <p className="empty">{m("placeholder")}</p>
        )}
        {hasError && <p className="error">{m("errNeedBoth")}</p>}
      </div>
    </div>
  );
}
