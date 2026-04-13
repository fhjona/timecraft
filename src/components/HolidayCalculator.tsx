import { useCallback, useState } from "react";
import type { HolidayCountry, Holiday } from "../lib/holidays";
import { calcBusinessDays } from "../lib/holidays";
import type { Locale } from "../lib/messages";
import { msg } from "../lib/messages";

type Props = { locale: Locale };

export function HolidayCalculator({ locale }: Props) {
  const m = (k: Parameters<typeof msg>[1]) => msg(locale, k);
  const now = new Date();
  const year = now.getFullYear();

  const [country, setCountry] = useState<HolidayCountry>("BR");
  const [from, setFrom] = useState(`${year}-01-01`);
  const [to, setTo] = useState(`${year}-12-31`);
  const [customHolidays, setCustomHolidays] = useState<Holiday[]>([]);
  const [newCustomDate, setNewCustomDate] = useState("");
  const [newCustomName, setNewCustomName] = useState("");
  const [result, setResult] = useState<ReturnType<typeof calcBusinessDays> | null>(null);

  const run = useCallback(() => {
    if (!from || !to) return;
    setResult(calcBusinessDays(country, from, to, customHolidays));
  }, [country, from, to, customHolidays]);

  const addCustom = () => {
    if (!newCustomDate || !newCustomName.trim()) return;
    setCustomHolidays((prev) => [
      ...prev,
      { date: newCustomDate, name: newCustomName.trim() },
    ]);
    setNewCustomDate("");
    setNewCustomName("");
  };

  const removeCustom = (idx: number) => {
    setCustomHolidays((prev) => prev.filter((_, i) => i !== idx));
  };

  return (
    <div>
      <h2 className="text-[clamp(1.3rem,3.5vw,1.6rem)] font-bold tracking-tight mb-1">
        {m("holTitle")}
      </h2>
      <p className="text-slate-400 text-[0.95rem] mb-6">{m("holLede")}</p>

      <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-6 shadow-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="hol-country" className="text-sm font-medium text-slate-200">
              {m("holCountry")}
            </label>
            <select
              id="hol-country"
              value={country}
              onChange={(e) => setCountry(e.target.value as HolidayCountry)}
              className="font-[inherit] text-sm py-2.5 px-3 rounded-lg border border-slate-700 bg-slate-900 text-slate-200 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20"
            >
              <option value="NO">{m("holCountryNO")}</option>
              <option value="BR">{m("holCountryBR")}</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="hol-year" className="text-sm font-medium text-slate-200">
              {m("holYear")}
            </label>
            <input
              type="number"
              id="hol-year"
              value={year}
              readOnly
              className="w-full text-sm py-2.5 px-3 rounded-lg border border-slate-700 bg-slate-900 text-slate-400 focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="hol-from" className="text-sm font-medium text-slate-200">
              {m("holFrom")}
            </label>
            <input
              type="date"
              id="hol-from"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="w-full font-mono text-sm py-2.5 px-3 rounded-lg border border-slate-700 bg-slate-900 text-slate-200 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="hol-to" className="text-sm font-medium text-slate-200">
              {m("holTo")}
            </label>
            <input
              type="date"
              id="hol-to"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="w-full font-mono text-sm py-2.5 px-3 rounded-lg border border-slate-700 bg-slate-900 text-slate-200 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20"
            />
          </div>
        </div>

        {/* Custom holidays */}
        <div className="mb-4 p-3 bg-slate-900/50 rounded-lg border border-slate-700">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">
            {m("holCustomTitle")}
          </p>
          <div className="flex flex-wrap gap-2 mb-2">
            <input
              type="date"
              value={newCustomDate}
              onChange={(e) => setNewCustomDate(e.target.value)}
              className="text-sm py-1.5 px-2 rounded border border-slate-700 bg-slate-900 text-slate-200 focus:outline-none focus:border-amber-400"
            />
            <input
              type="text"
              placeholder={m("holCustomName")}
              value={newCustomName}
              onChange={(e) => setNewCustomName(e.target.value)}
              className="text-sm py-1.5 px-2 rounded border border-slate-700 bg-slate-900 text-slate-200 flex-1 min-w-[8rem] focus:outline-none focus:border-amber-400"
            />
            <button
              type="button"
              onClick={addCustom}
              className="text-sm py-1.5 px-3 rounded bg-emerald-600 text-white font-medium cursor-pointer hover:bg-emerald-500"
            >
              +
            </button>
          </div>
          {customHolidays.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {customHolidays.map((h, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1 text-xs bg-slate-800 border border-slate-600 rounded-full py-0.5 px-2 text-slate-300"
                >
                  {h.date} {h.name}
                  <button
                    type="button"
                    onClick={() => removeCustom(i)}
                    className="text-red-400 hover:text-red-300 cursor-pointer ml-0.5"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={run}
          className="font-semibold text-sm py-2.5 px-5 rounded-lg border-none cursor-pointer bg-gradient-to-b from-amber-400 to-orange-500 text-slate-950 hover:brightness-105"
        >
          {m("holCalc")}
        </button>

        {result && (
          <div className="mt-6 pt-5 border-t border-slate-700">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">
              {m("resultHeading")}
            </h3>
            <div className="grid gap-2.5 mb-4">
              {[
                { label: m("holTotalDays"), value: result.totalDays.toLocaleString(locale) },
                { label: m("holWeekends"), value: result.weekendDays.toLocaleString(locale) },
                { label: m("holHolidays"), value: result.holidayCount.toLocaleString(locale) },
                { label: m("holBusinessDays"), value: result.businessDays.toLocaleString(locale) },
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

            {result.holidays.length > 0 ? (
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">
                  {m("holHolidayList")}
                </p>
                <div className="grid gap-1">
                  {result.holidays.map((h, i) => (
                    <div
                      key={i}
                      className="flex justify-between text-sm py-1 text-slate-300"
                    >
                      <span className="font-mono text-slate-400">{h.date}</span>
                      <span>{h.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-slate-400 text-sm">{m("holNoHolidays")}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
