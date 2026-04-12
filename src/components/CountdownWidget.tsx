import { useCallback, useEffect, useState } from "react";
import type { Locale } from "../lib/messages";
import { msg } from "../lib/messages";

type Props = { locale: Locale };

type CountdownItem = {
  id: string;
  name: string;
  target: string; // ISO date string YYYY-MM-DDTHH:MM
};

const STORAGE_KEY = "countdown-items";

function loadItems(): CountdownItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return [];
}

function saveItems(items: CountdownItem[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch { /* ignore */ }
}

function timeDiff(target: Date, now: Date) {
  const ms = target.getTime() - now.getTime();
  const abMs = Math.abs(ms);
  const totalSeconds = Math.floor(abMs / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { ms, days, hours, minutes, seconds, isPast: ms < 0, isToday: days === 0 && ms >= 0 && ms < 86400000 };
}

export function CountdownWidget({ locale }: Props) {
  const m = (k: Parameters<typeof msg>[1]) => msg(locale, k);

  const [items, setItems] = useState<CountdownItem[]>(loadItems);
  const [newName, setNewName] = useState("");
  const [newTarget, setNewTarget] = useState("");
  const [now, setNow] = useState(new Date());

  // Live tick every second
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  // Persist
  useEffect(() => {
    saveItems(items);
  }, [items]);

  const addItem = useCallback(() => {
    if (!newName.trim() || !newTarget) return;
    setItems((prev) => [
      ...prev,
      { id: Date.now().toString(36), name: newName.trim(), target: newTarget },
    ]);
    setNewName("");
    setNewTarget("");
  }, [newName, newTarget]);

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div>
      <h2 className="text-[clamp(1.3rem,3.5vw,1.6rem)] font-bold tracking-tight mb-1">
        {m("cdTitle")}
      </h2>
      <p className="text-slate-400 text-[0.95rem] mb-6">{m("cdLede")}</p>

      <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-6 shadow-2xl">
        {/* Add form */}
        <div className="flex flex-wrap gap-2 mb-6">
          <input
            type="text"
            placeholder={m("cdNamePlaceholder")}
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="flex-1 min-w-[10rem] text-sm py-2 px-3 rounded-lg border border-slate-700 bg-slate-900 text-slate-200 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20"
          />
          <input
            type="datetime-local"
            value={newTarget}
            onChange={(e) => setNewTarget(e.target.value)}
            className="font-mono text-sm py-2 px-3 rounded-lg border border-slate-700 bg-slate-900 text-slate-200 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20"
          />
          <button
            type="button"
            onClick={addItem}
            className="font-semibold text-sm py-2.5 px-5 rounded-lg border-none cursor-pointer bg-gradient-to-b from-amber-400 to-orange-500 text-slate-950 hover:brightness-105"
          >
            {m("cdAdd")}
          </button>
        </div>

        {/* Countdown cards */}
        {items.length === 0 ? (
          <p className="text-slate-400 text-sm">{m("cdNoItems")}</p>
        ) : (
          <div className="grid gap-3">
            {items.map((item) => {
              const targetDate = new Date(item.target);
              const diff = timeDiff(targetDate, now);
              return (
                <div
                  key={item.id}
                  className="bg-slate-900/60 border border-slate-700 rounded-lg p-4"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-slate-200">{item.name}</h3>
                      <p className="text-xs text-slate-500 font-mono">
                        {targetDate.toLocaleString(locale)}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="text-xs text-red-400 hover:text-red-300 cursor-pointer border border-red-400/30 rounded px-2 py-0.5"
                    >
                      {m("cdDelete")}
                    </button>
                  </div>
                  <div className="flex items-baseline gap-3 flex-wrap">
                    {diff.isToday ? (
                      <span className="text-2xl font-bold text-emerald-400">
                        {m("cdToday")}
                      </span>
                    ) : (
                      <>
                        <span className="text-2xl font-bold text-amber-400 font-mono">
                          {diff.days}
                        </span>
                        <span className="text-sm text-slate-400">
                          {diff.isPast ? m("cdDaysAgo") : m("cdDaysLeft")}
                        </span>
                      </>
                    )}
                    <span className="text-sm font-mono text-slate-500">
                      {String(diff.hours).padStart(2, "0")}
                      {m("cdHoursShort")}{" "}
                      {String(diff.minutes).padStart(2, "0")}
                      {m("cdMinShort")}{" "}
                      {String(diff.seconds).padStart(2, "0")}
                      {m("cdSecShort")}
                    </span>
                  </div>
                  {/* Progress bar */}
                  {!diff.isPast && (
                    <div className="mt-3 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-amber-500 to-orange-400 rounded-full transition-all duration-1000"
                        style={{
                          width: `${Math.max(0, Math.min(100, 100 - (diff.days / 365) * 100))}%`,
                        }}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
