import { useCallback, useState } from "react";
import { toLocalInput } from "../lib/date-span";
import type { Locale } from "../lib/messages";
import { msg } from "../lib/messages";

type Props = { locale: Locale };

type OffsetUnit = "days" | "weeks" | "months" | "years";

type OffsetEntry = {
  id: string;
  amount: number;
  unit: OffsetUnit;
  result?: string;
};

function unitLabel(locale: Locale, unit: OffsetUnit): string {
  const key = `batch${unit.charAt(0).toUpperCase() + unit.slice(1)}` as Parameters<typeof msg>[1];
  return msg(locale, key);
}

function applyOffset(base: Date, amount: number, unit: OffsetUnit): Date {
  const d = new Date(base);
  switch (unit) {
    case "days":
      d.setDate(d.getDate() + amount);
      break;
    case "weeks":
      d.setDate(d.getDate() + amount * 7);
      break;
    case "months":
      d.setMonth(d.getMonth() + amount);
      break;
    case "years":
      d.setFullYear(d.getFullYear() + amount);
      break;
  }
  return d;
}

function parseFormula(formula: string): { amount: number; unit: OffsetUnit }[] | null {
  // Supports: "+30d", "-2w", "+3m", "+1y", "+30d +2m"
  const parts = formula.trim().split(/\s+/);
  const result: { amount: number; unit: OffsetUnit }[] = [];
  for (const p of parts) {
    const m = p.match(/^([+-]?\d+)(d|w|m|y)$/i);
    if (!m) return null;
    const amount = parseInt(m[1], 10);
    const u = m[2].toLowerCase();
    const unitMap: Record<string, OffsetUnit> = {
      d: "days",
      w: "weeks",
      m: "months",
      y: "years",
    };
    result.push({ amount, unit: unitMap[u] });
  }
  return result.length > 0 ? result : null;
}

export function BatchCalculator({ locale }: Props) {
  const m = (k: Parameters<typeof msg>[1]) => msg(locale, k);

  const [baseDate, setBaseDate] = useState(() => {
    const now = new Date();
    return toLocalInput(now).split("T")[0];
  });

  const [offsets, setOffsets] = useState<OffsetEntry[]>([
    { id: "1", amount: 30, unit: "days" },
    { id: "2", amount: 90, unit: "days" },
    { id: "3", amount: 6, unit: "months" },
  ]);

  const [formula, setFormula] = useState("");
  const [formulaResult, setFormulaResult] = useState<string | null>(null);

  const addOffset = () => {
    setOffsets((prev) => [
      ...prev,
      { id: Date.now().toString(36), amount: 7, unit: "days" },
    ]);
  };

  const removeOffset = (id: string) => {
    setOffsets((prev) => prev.filter((o) => o.id !== id));
  };

  const updateOffset = (id: string, field: "amount" | "unit", value: number | string) => {
    setOffsets((prev) =>
      prev.map((o) => (o.id === id ? { ...o, [field]: value } : o)),
    );
  };

  const calcAll = useCallback(() => {
    const base = new Date(baseDate + "T00:00:00");
    if (isNaN(base.getTime())) return;

    setOffsets((prev) =>
      prev.map((o) => {
        const d = applyOffset(base, o.amount, o.unit);
        return { ...o, result: d.toLocaleDateString(locale) };
      }),
    );
  }, [baseDate, locale]);

  const runFormula = useCallback(() => {
    const base = new Date(baseDate + "T00:00:00");
    if (isNaN(base.getTime())) return;

    const parsed = parseFormula(formula);
    if (!parsed) {
      setFormulaResult(null);
      return;
    }

    let d = new Date(base);
    for (const p of parsed) {
      d = applyOffset(d, p.amount, p.unit);
    }
    setFormulaResult(d.toLocaleDateString(locale));
  }, [baseDate, formula, locale]);

  const formulaPlaceholder =
    locale === "nb"
      ? "f.eks. +30d +2m -1y"
      : locale === "pt-BR"
        ? "ex. +30d +2m -1y"
        : "e.g. +30d +2m -1y";

  const formulaLabel =
    locale === "nb"
      ? "Formel"
      : locale === "pt-BR"
        ? "F\u00f3rmula"
        : locale === "sv"
          ? "Formel"
          : locale === "da"
            ? "Formel"
            : "Formula";

  const formulaHelp =
    locale === "nb"
      ? "Bruk d=dager, w=uker, m=m\u00e5neder, y=\u00e5r. F.eks: +30d +2m"
      : locale === "pt-BR"
        ? "Use d=dias, w=semanas, m=meses, y=anos. Ex: +30d +2m"
        : "Use d=days, w=weeks, m=months, y=years. E.g: +30d +2m";

  return (
    <div>
      <h2 className="text-[clamp(1.3rem,3.5vw,1.6rem)] font-bold tracking-tight mb-1">
        {m("batchTitle")}
      </h2>
      <p className="text-slate-400 text-[0.95rem] mb-6">{m("batchLede")}</p>

      <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-6 shadow-2xl">
        <div className="flex flex-col gap-1 mb-5">
          <label htmlFor="batch-base" className="text-sm font-medium text-slate-200">
            {m("batchBaseDate")}
          </label>
          <input
            type="date"
            id="batch-base"
            value={baseDate}
            onChange={(e) => setBaseDate(e.target.value)}
            className="w-full font-mono text-sm py-2.5 px-3 rounded-lg border border-slate-700 bg-slate-900 text-slate-200 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20"
          />
        </div>

        {/* Offset rows */}
        <div className="grid gap-2 mb-4">
          {offsets.map((o) => (
            <div key={o.id} className="flex flex-wrap items-center gap-2">
              <input
                type="number"
                value={o.amount}
                onChange={(e) => updateOffset(o.id, "amount", +e.target.value)}
                className="w-20 font-mono text-sm py-1.5 px-2 rounded border border-slate-700 bg-slate-900 text-slate-200 focus:outline-none focus:border-amber-400"
              />
              <select
                value={o.unit}
                onChange={(e) => updateOffset(o.id, "unit", e.target.value)}
                className="text-sm py-1.5 px-2 rounded border border-slate-700 bg-slate-900 text-slate-200 focus:outline-none focus:border-amber-400"
              >
                {(["days", "weeks", "months", "years"] as OffsetUnit[]).map((u) => (
                  <option key={u} value={u}>
                    {unitLabel(locale, u)}
                  </option>
                ))}
              </select>
              {o.result && (
                <span className="font-mono text-sm text-emerald-400">
                  &rarr; {o.result}
                </span>
              )}
              <button
                type="button"
                onClick={() => removeOffset(o.id)}
                className="text-xs text-red-400 hover:text-red-300 cursor-pointer ml-auto"
              >
                {m("batchRemove")}
              </button>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          <button
            type="button"
            onClick={addOffset}
            className="text-sm py-2 px-3.5 rounded-lg cursor-pointer bg-transparent text-amber-400 border border-slate-700 hover:bg-amber-400/10"
          >
            {m("batchAddOffset")}
          </button>
          <button
            type="button"
            onClick={calcAll}
            className="font-semibold text-sm py-2.5 px-5 rounded-lg border-none cursor-pointer bg-gradient-to-b from-amber-400 to-orange-500 text-slate-950 hover:brightness-105"
          >
            {m("batchCalc")}
          </button>
        </div>

        {/* Formula mode */}
        <div className="pt-5 border-t border-slate-700">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">
            {formulaLabel}
          </h3>
          <p className="text-xs text-slate-500 mb-3">{formulaHelp}</p>
          <div className="flex flex-wrap gap-2">
            <input
              type="text"
              placeholder={formulaPlaceholder}
              value={formula}
              onChange={(e) => setFormula(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") runFormula();
              }}
              className="flex-1 min-w-[12rem] font-mono text-sm py-2 px-3 rounded-lg border border-slate-700 bg-slate-900 text-slate-200 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20"
            />
            <button
              type="button"
              onClick={runFormula}
              className="font-semibold text-sm py-2 px-4 rounded-lg border-none cursor-pointer bg-gradient-to-b from-emerald-400 to-emerald-600 text-slate-950 hover:brightness-105"
            >
              =
            </button>
          </div>
          {formulaResult && (
            <p className="mt-3 font-mono text-lg text-emerald-400">
              &rarr; {formulaResult}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
