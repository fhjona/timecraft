import { useState } from "react";
import { calcWorkTime, calcWeekSummary } from "../lib/work-time";
import type { Locale } from "../lib/messages";
import { msg } from "../lib/messages";

type Props = { locale: Locale };

const WEEKDAYS: Record<string, string[]> = {
  en: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  nb: ["Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag"],
  "pt-BR": ["Segunda", "Ter\u00e7a", "Quarta", "Quinta", "Sexta"],
  sv: ["M\u00e5ndag", "Tisdag", "Onsdag", "Torsdag", "Fredag"],
  da: ["Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag"],
};

type DayEntry = {
  id: string;
  label: string;
  startTime: string;
  endTime: string;
  breakMinutes: number;
};

export function WorkTimeCalculator({ locale }: Props) {
  const m = (k: Parameters<typeof msg>[1]) => msg(locale, k);
  const days = WEEKDAYS[locale] || WEEKDAYS.en;

  const [threshold, setThreshold] = useState(7.5);
  const [entries, setEntries] = useState<DayEntry[]>([
    { id: "1", label: days[0], startTime: "08:00", endTime: "16:00", breakMinutes: 30 },
  ]);

  const updateEntry = (id: string, field: keyof DayEntry, value: string | number) => {
    setEntries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, [field]: value } : e)),
    );
  };

  const addDay = () => {
    const idx = entries.length < 5 ? entries.length : entries.length % 5;
    setEntries((prev) => [
      ...prev,
      {
        id: Date.now().toString(36),
        label: days[idx],
        startTime: "08:00",
        endTime: "16:00",
        breakMinutes: 30,
      },
    ]);
  };

  const removeDay = (id: string) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  };

  const summary = calcWeekSummary(
    entries.map((e) => ({
      label: e.label,
      startTime: e.startTime,
      endTime: e.endTime,
      breakMinutes: e.breakMinutes,
      overtimeThresholdHours: threshold,
    })),
  );

  return (
    <div>
      <h2 className="text-[clamp(1.3rem,3.5vw,1.6rem)] font-bold tracking-tight mb-1">
        {m("wtTitle")}
      </h2>
      <p className="text-slate-400 text-[0.95rem] mb-6">{m("wtLede")}</p>

      <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-6 shadow-2xl">
        <div className="flex items-center gap-3 mb-5">
          <label className="text-sm font-medium text-slate-200">{m("wtThreshold")}</label>
          <input
            type="number"
            step="0.5"
            min="0"
            max="24"
            value={threshold}
            onChange={(e) => setThreshold(+e.target.value)}
            className="w-20 font-mono text-sm py-2 px-2 rounded-lg border border-slate-700 bg-slate-900 text-slate-200 focus:outline-none focus:border-amber-400"
          />
        </div>

        <div className="grid gap-3 mb-4">
          {entries.map((entry) => {
            const r = calcWorkTime({
              startTime: entry.startTime,
              endTime: entry.endTime,
              breakMinutes: entry.breakMinutes,
              overtimeThresholdHours: threshold,
            });
            return (
              <div
                key={entry.id}
                className="bg-slate-900/60 border border-slate-700 rounded-lg p-3"
              >
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <input
                    type="text"
                    value={entry.label}
                    onChange={(e) => updateEntry(entry.id, "label", e.target.value)}
                    className="w-24 text-sm font-medium py-1 px-2 rounded border border-slate-700 bg-slate-800 text-slate-200 focus:outline-none focus:border-amber-400"
                  />
                  <input
                    type="time"
                    value={entry.startTime}
                    onChange={(e) => updateEntry(entry.id, "startTime", e.target.value)}
                    className="font-mono text-sm py-1 px-2 rounded border border-slate-700 bg-slate-800 text-slate-200 focus:outline-none focus:border-amber-400"
                  />
                  <span className="text-slate-500">&ndash;</span>
                  <input
                    type="time"
                    value={entry.endTime}
                    onChange={(e) => updateEntry(entry.id, "endTime", e.target.value)}
                    className="font-mono text-sm py-1 px-2 rounded border border-slate-700 bg-slate-800 text-slate-200 focus:outline-none focus:border-amber-400"
                  />
                  <input
                    type="number"
                    min="0"
                    value={entry.breakMinutes}
                    onChange={(e) => updateEntry(entry.id, "breakMinutes", +e.target.value)}
                    className="w-16 font-mono text-sm py-1 px-2 rounded border border-slate-700 bg-slate-800 text-slate-200 focus:outline-none focus:border-amber-400"
                    title={m("wtBreak")}
                  />
                  <span className="text-xs text-slate-500">min</span>
                  {entries.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeDay(entry.id)}
                      className="text-xs text-red-400 hover:text-red-300 cursor-pointer ml-auto"
                    >
                      &times;
                    </button>
                  )}
                </div>
                {r && (
                  <div className="flex flex-wrap gap-3 text-xs text-slate-400">
                    <span>
                      {m("wtNet")}: <strong className="text-slate-200">{r.netFormatted}</strong>
                    </span>
                    {r.overtimeMinutes > 0 && (
                      <span className="text-amber-400">
                        {m("wtOvertime")}: <strong>{r.overtimeFormatted}</strong>
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex gap-2 mb-6">
          <button
            type="button"
            onClick={addDay}
            className="text-sm py-2 px-3.5 rounded-lg cursor-pointer bg-transparent text-amber-400 border border-slate-700 hover:bg-amber-400/10"
          >
            {m("wtAddDay")}
          </button>
        </div>

        <div className="pt-5 border-t border-slate-700">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">
            {m("wtWeekSummary")}
          </h3>
          <div className="grid gap-2.5">
            {[
              { label: m("wtNet"), value: summary.totalNetFormatted },
              { label: m("wtOvertime"), value: summary.totalOvertimeFormatted },
            ].map((row, i, arr) => (
              <div
                key={row.label}
                className={`flex justify-between items-baseline gap-4 py-2 text-[0.95rem] ${
                  i < arr.length - 1 ? "border-b border-slate-700" : ""
                }`}
              >
                <span className="text-slate-400">{row.label}</span>
                <strong className="font-mono font-medium text-sm">{row.value}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
