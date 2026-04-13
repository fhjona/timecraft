import { useCallback, useEffect, useState } from "react";
import { computeSpan, toLocalInput } from "../lib/date-span";
import type { Locale } from "../lib/messages";
import { msg } from "../lib/messages";

type Props = { locale: Locale };

export function DateSpanCalculator({ locale }: Props) {
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

  useEffect(() => {
    const now = new Date();
    setStart(toLocalInput(now));
    setEnd("");
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

  // Re-compute when locale changes
  useEffect(() => {
    if (showResults && start && end) {
      const r = computeSpan(start, end, locale);
      if (r.ok) {
        setForward(r.forward);
        setStats(r.stats);
      }
    }
  }, [locale]);

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
    <div>
      <h2 className="text-[clamp(1.3rem,3.5vw,1.6rem)] font-bold tracking-tight mb-1">
        {m("title")}
      </h2>
      <p className="text-slate-400 text-[0.95rem] mb-6">{m("lede")}</p>

      <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-6 shadow-2xl">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            run();
          }}
        >
          <fieldset className="border-none m-0 p-0">
            <legend className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">
              {m("legend")}
            </legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="start" className="text-sm font-medium text-slate-200">
                  {m("labelStart")}
                </label>
                <input
                  type="datetime-local"
                  id="start"
                  name="start"
                  required
                  value={start}
                  onChange={(e) => setStart(e.target.value)}
                  className="w-full font-mono text-sm py-2.5 px-3 rounded-lg border border-slate-700 bg-slate-900 text-slate-200 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="end" className="text-sm font-medium text-slate-200">
                  {m("labelEnd")}
                </label>
                <input
                  type="datetime-local"
                  id="end"
                  name="end"
                  required
                  value={end}
                  onChange={(e) => setEnd(e.target.value)}
                  className="w-full font-mono text-sm py-2.5 px-3 rounded-lg border border-slate-700 bg-slate-900 text-slate-200 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20"
                />
              </div>
            </div>
          </fieldset>
          <div className="mt-5 flex flex-wrap gap-2.5 items-center">
            <button
              type="submit"
              className="font-semibold text-sm py-2.5 px-5 rounded-lg border-none cursor-pointer bg-gradient-to-b from-amber-400 to-orange-500 text-slate-950 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-amber-400 focus-visible:outline-offset-2"
            >
              {m("btnCalc")}
            </button>
            <button
              type="button"
              onClick={onSwap}
              className="font-semibold text-sm py-2 px-3.5 rounded-lg cursor-pointer bg-transparent text-amber-400 border border-slate-700 hover:bg-amber-400/10 focus-visible:outline-2 focus-visible:outline-amber-400 focus-visible:outline-offset-2"
            >
              {m("btnSwap")}
            </button>
          </div>
        </form>

        {showResults && stats && (
          <div className="mt-7 pt-6 border-t border-slate-700">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4">
              {m("resultHeading")}
            </h2>
            <p className="inline-flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-400/10 border border-emerald-400/25 py-1 px-2.5 rounded-full mb-4">
              {forward ? m("dirForward") : m("dirBackward")}
            </p>
            <div className="grid gap-2.5">
              {[
                { label: m("statCalendar"), value: stats.calendarLine },
                { label: m("statDaysDec"), value: stats.totalDays },
                { label: m("statHours"), value: stats.totalHours },
                { label: m("statMinutes"), value: stats.totalMinutes },
                { label: m("statSeconds"), value: stats.totalSeconds },
              ].map((row, i, arr) => (
                <div
                  key={row.label}
                  className={`flex justify-between items-baseline gap-4 py-2 text-[0.95rem] ${
                    i < arr.length - 1 ? "border-b border-slate-700" : ""
                  }`}
                >
                  <span className="text-slate-400">{row.label}</span>
                  <strong className="font-mono font-medium text-sm text-right">
                    {row.value}
                  </strong>
                </div>
              ))}
            </div>
          </div>
        )}

        {!showResults && !hasError && (
          <p className="text-slate-400 text-sm mt-4">{m("placeholder")}</p>
        )}
        {hasError && (
          <p className="text-red-300 text-sm mt-3">{m("errNeedBoth")}</p>
        )}
      </div>
    </div>
  );
}
