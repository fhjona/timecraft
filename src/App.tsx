import { useCallback, useEffect, useState } from "react";
import { DateSpanCalculator } from "./components/DateSpanCalculator";
import { TimezoneConverter } from "./components/TimezoneConverter";
import { HolidayCalculator } from "./components/HolidayCalculator";
import { CountdownWidget } from "./components/CountdownWidget";
import { WorkTimeCalculator } from "./components/WorkTimeCalculator";
import { BatchCalculator } from "./components/BatchCalculator";
import type { Locale } from "./lib/messages";
import { msg } from "./lib/messages";
import {
  guessLocaleFromNavigator,
  loadStoredLocale,
  saveLocale,
} from "./lib/locale-storage";

type Tab = "span" | "timezone" | "holidays" | "countdown" | "worktime" | "batch";

function htmlLang(locale: Locale): string {
  return locale === "pt-BR" ? "pt-BR" : locale;
}

const App = () => {
  const [locale, setLocale] = useState<Locale>("en");
  const [tab, setTab] = useState<Tab>("span");

  const applyLocale = useCallback((next: Locale) => {
    setLocale(next);
    saveLocale(next);
    document.documentElement.lang = htmlLang(next);
    document.title = msg(next, "pageTitle");
  }, []);

  useEffect(() => {
    const stored = loadStoredLocale();
    applyLocale(stored ?? guessLocaleFromNavigator());
  }, [applyLocale]);

  const m = (k: Parameters<typeof msg>[1]) => msg(locale, k);

  const worktimeLabel =
    locale === "nb"
      ? "Arbeidstid"
      : locale === "pt-BR"
        ? "Horas"
        : locale === "sv"
          ? "Arbetstid"
          : locale === "da"
            ? "Arbejdstid"
            : "Work time";

  const tabs: { id: Tab; label: string }[] = [
    { id: "span", label: m("navSpan") },
    { id: "timezone", label: m("navTimezone") },
    { id: "countdown", label: m("navCountdown") },
    { id: "holidays", label: m("navHolidays") },
    { id: "worktime", label: worktimeLabel },
    { id: "batch", label: m("navBatch") },
  ];

  const tagline =
    locale === "nb"
      ? "Alle tidsverkt\u00f8yene dine, samlet p\u00e5 ett sted."
      : locale === "pt-BR"
        ? "Todas as suas ferramentas de tempo em um s\u00f3 lugar."
        : locale === "sv"
          ? "Alla dina tidsverktyg samlade p\u00e5 ett st\u00e4lle."
          : locale === "da"
            ? "Alle dine tidsv\u00e6rkt\u00f8jer samlet \u00e9t sted."
            : "All your time tools in one place.";

  return (
    <div className="max-w-[580px] mx-auto p-[clamp(1rem,4vw,2.5rem)]">
      {/* Language selector - top right */}
      <div className="flex justify-end mb-2">
        <select
          id="locale"
          name="locale"
          aria-label={m("langLabel")}
          value={locale}
          onChange={(e) => applyLocale(e.target.value as Locale)}
          className="font-[inherit] text-xs py-1.5 px-2 rounded-lg border border-slate-700 bg-slate-800/60 text-slate-400 cursor-pointer focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20"
        >
          <option value="en">English</option>
          <option value="nb">Norsk</option>
          <option value="pt-BR">Portugu\u00eas</option>
          <option value="sv">Svenska</option>
          <option value="da">Dansk</option>
        </select>
      </div>

      {/* Banner */}
      <header className="relative mb-6 rounded-2xl overflow-hidden bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-purple-500/10 border border-slate-700/60 p-5 pb-4">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(251,191,36,0.08),transparent_60%)]" />
        <div className="relative text-center mb-3">
          <h1 className="text-2xl font-bold tracking-tight text-white mb-1">
            <span className="text-amber-400">Time</span>Craft
          </h1>
          <p className="text-xs text-slate-400">{tagline}</p>
        </div>

        {/* Tab navigation inside banner */}
        <nav className="relative flex flex-wrap justify-center gap-1.5 mt-4">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`text-sm py-2 px-4 rounded-full cursor-pointer transition-all ${
                tab === t.id
                  ? "bg-amber-400 text-slate-950 font-semibold shadow-lg shadow-amber-400/20"
                  : "bg-slate-800/60 text-slate-400 hover:text-slate-200 hover:bg-slate-700/60"
              }`}
            >
              {t.label}
            </button>
          ))}
        </nav>
      </header>

      {/* Tab content */}
      {tab === "span" && <DateSpanCalculator locale={locale} />}
      {tab === "timezone" && <TimezoneConverter locale={locale} />}
      {tab === "countdown" && <CountdownWidget locale={locale} />}
      {tab === "holidays" && <HolidayCalculator locale={locale} />}
      {tab === "worktime" && <WorkTimeCalculator locale={locale} />}
      {tab === "batch" && <BatchCalculator locale={locale} />}
    </div>
  );
};

export default App;
