import { useCallback, useMemo, useState } from "react";
import {
  ALL_ZONES,
  TIMEZONE_LIST,
  convertTimezone,
  friendlyTzName,
} from "../lib/timezones";
import type { Locale } from "../lib/messages";
import { msg } from "../lib/messages";

type Props = { locale: Locale };

export function TimezoneConverter({ locale }: Props) {
  const m = (k: Parameters<typeof msg>[1]) => msg(locale, k);

  const localTz = useMemo(
    () => Intl.DateTimeFormat().resolvedOptions().timeZone,
    [],
  );
  const [fromTz, setFromTz] = useState(localTz);
  const [toTz, setToTz] = useState("America/Sao_Paulo");
  const [dateTime, setDateTime] = useState(() => {
    const now = new Date();
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}`;
  });
  const [search, setSearch] = useState("");

  const result = useMemo(
    () => convertTimezone(dateTime, fromTz, toTz),
    [dateTime, fromTz, toTz],
  );

  const filteredZones = useMemo(() => {
    if (!search.trim()) return null;
    const q = search.toLowerCase();
    return ALL_ZONES.filter((z) => z.toLowerCase().includes(q));
  }, [search]);

  const onSwap = useCallback(() => {
    setFromTz(toTz);
    setToTz(fromTz);
  }, [fromTz, toTz]);

  const tzSelect = (
    id: string,
    label: string,
    value: string,
    onChange: (v: string) => void,
  ) => (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium text-slate-200">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="font-[inherit] text-sm py-2.5 px-3 rounded-lg border border-slate-700 bg-slate-900 text-slate-200 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20"
      >
        {TIMEZONE_LIST.map((group) => (
          <optgroup key={group.label} label={group.label}>
            {group.zones.map((z) => (
              <option key={z} value={z}>
                {friendlyTzName(z)}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
    </div>
  );

  return (
    <div>
      <h2 className="text-[clamp(1.3rem,3.5vw,1.6rem)] font-bold tracking-tight mb-1">
        {m("tzTitle")}
      </h2>
      <p className="text-slate-400 text-[0.95rem] mb-6">{m("tzLede")}</p>

      <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-6 shadow-2xl">
        <div className="mb-4">
          <input
            type="text"
            placeholder={m("tzSearchPlaceholder")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-sm py-2 px-3 rounded-lg border border-slate-700 bg-slate-900 text-slate-200 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20"
          />
          {filteredZones && filteredZones.length > 0 && (
            <div className="mt-1 max-h-32 overflow-y-auto bg-slate-900 border border-slate-700 rounded-lg">
              {filteredZones.slice(0, 10).map((z) => (
                <button
                  key={z}
                  type="button"
                  onClick={() => {
                    setFromTz(z);
                    setSearch("");
                  }}
                  className="block w-full text-left text-sm py-1.5 px-3 text-slate-300 hover:bg-slate-800 cursor-pointer"
                >
                  {friendlyTzName(z)}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          {tzSelect("tz-from", m("tzFrom"), fromTz, setFromTz)}
          {tzSelect("tz-to", m("tzTo"), toTz, setToTz)}
        </div>

        <div className="flex flex-col gap-1 mb-4">
          <label
            htmlFor="tz-dt"
            className="text-sm font-medium text-slate-200"
          >
            {m("tzDateTime")}
          </label>
          <input
            type="datetime-local"
            id="tz-dt"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
            className="w-full font-mono text-sm py-2.5 px-3 rounded-lg border border-slate-700 bg-slate-900 text-slate-200 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20"
          />
        </div>

        <button
          type="button"
          onClick={onSwap}
          className="font-semibold text-sm py-2 px-3.5 rounded-lg cursor-pointer bg-transparent text-amber-400 border border-slate-700 hover:bg-amber-400/10 mb-4"
        >
          {m("tzSwap")}
        </button>

        {result && (
          <div className="mt-4 pt-4 border-t border-slate-700">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">
              {m("tzResult")}
            </h3>
            <div className="grid gap-2.5">
              {[
                {
                  label: m("tzFrom"),
                  value: `${result.sourceFormatted} (${result.sourceOffset})`,
                },
                {
                  label: m("tzTo"),
                  value: `${result.targetFormatted} (${result.targetOffset})`,
                },
                { label: m("tzDifference"), value: result.diffFormatted },
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
      </div>
    </div>
  );
}
