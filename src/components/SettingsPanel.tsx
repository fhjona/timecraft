import { useRef } from "react";
import type { Locale } from "../lib/messages";
import type { Settings } from "../lib/settings";
import { APP_VERSION, exportData, importData } from "../lib/settings";
import { COUNTRY_LIST } from "../lib/holidays";

type Props = {
  locale: Locale;
  settings: Settings;
  onChange: (s: Settings) => void;
  onClose: () => void;
};

type Labels = {
  title: string;
  timeFormat: string;
  firstDay: string;
  mon: string;
  sun: string;
  dateFormat: string;
  defaultCountry: string;
  overtimeThreshold: string;
  reset: string;
  close: string;
  privacyTitle: string;
  privacyInfo: string;
  clearData: string;
  clearConfirm: string;
  privacyLink: string;
  // New sections
  displayTitle: string;
  showWeekNumbers: string;
  fontSize: string;
  fontSizeSm: string;
  fontSizeMd: string;
  fontSizeLg: string;
  behaviorTitle: string;
  defaultTab: string;
  countdownNotifications: string;
  backupTitle: string;
  exportBtn: string;
  importBtn: string;
  importSuccess: string;
  importFail: string;
  aboutTitle: string;
  aboutVersion: string;
  aboutBy: string;
};

function labels(locale: Locale): Labels {
  const L: Record<string, Partial<Labels> & Pick<Labels, "title">> = {
    en: {
      title: "Settings",
      timeFormat: "Time format",
      firstDay: "First day of week",
      mon: "Monday",
      sun: "Sunday",
      dateFormat: "Date format",
      defaultCountry: "Default country (holidays)",
      overtimeThreshold: "Default overtime threshold (hours)",
      reset: "Reset to defaults",
      close: "Close",
      privacyTitle: "Privacy",
      privacyInfo: "All data stays on your device. Nothing is sent to any server.",
      clearData: "Delete all data",
      clearConfirm: "Delete all countdowns, custom holidays and settings?",
      privacyLink: "View privacy policy",
      displayTitle: "Display",
      showWeekNumbers: "Show week numbers",
      fontSize: "Font size",
      fontSizeSm: "Small",
      fontSizeMd: "Medium",
      fontSizeLg: "Large",
      behaviorTitle: "Behavior",
      defaultTab: "Default tab on startup",
      countdownNotifications: "Countdown notifications",
      backupTitle: "Backup & restore",
      exportBtn: "Export data",
      importBtn: "Import data",
      importSuccess: "Data imported. Reloading\u2026",
      importFail: "Invalid backup file.",
      aboutTitle: "About",
      aboutVersion: "Version",
      aboutBy: "Made by Fjona",
    },
    nb: {
      title: "Innstillinger",
      timeFormat: "Tidsformat",
      firstDay: "Første ukedag",
      mon: "Mandag",
      sun: "Søndag",
      dateFormat: "Datoformat",
      defaultCountry: "Standardland (helligdager)",
      overtimeThreshold: "Standard overtidsgrense (timer)",
      reset: "Tilbakestill",
      close: "Lukk",
      privacyTitle: "Personvern",
      privacyInfo: "Alle data blir på enheten din. Ingenting sendes til noen server.",
      clearData: "Slett alle data",
      clearConfirm: "Slett alle nedtellinger, egne fridager og innstillinger?",
      privacyLink: "Vis personvernerklæring",
      displayTitle: "Visning",
      showWeekNumbers: "Vis ukenummer",
      fontSize: "Skriftstørrelse",
      fontSizeSm: "Liten",
      fontSizeMd: "Medium",
      fontSizeLg: "Stor",
      behaviorTitle: "Oppførsel",
      defaultTab: "Standardfane ved oppstart",
      countdownNotifications: "Nedtellingsvarsler",
      backupTitle: "Sikkerhetskopi",
      exportBtn: "Eksporter data",
      importBtn: "Importer data",
      importSuccess: "Data importert. Laster inn på nytt\u2026",
      importFail: "Ugyldig sikkerhetskopi.",
      aboutTitle: "Om",
      aboutVersion: "Versjon",
      aboutBy: "Laget av Fjona",
    },
    "pt-BR": {
      title: "Configurações",
      timeFormat: "Formato de hora",
      firstDay: "Primeiro dia da semana",
      mon: "Segunda",
      sun: "Domingo",
      dateFormat: "Formato de data",
      defaultCountry: "País padrão (feriados)",
      overtimeThreshold: "Limite padrão de horas extras",
      reset: "Restaurar padrões",
      close: "Fechar",
      privacyTitle: "Privacidade",
      privacyInfo: "Todos os dados permanecem no seu dispositivo. Nada é enviado a nenhum servidor.",
      clearData: "Excluir todos os dados",
      clearConfirm: "Excluir todas as contagens, feriados personalizados e configurações?",
      privacyLink: "Ver política de privacidade",
    },
    sv: {
      title: "Inställningar",
      timeFormat: "Tidsformat",
      firstDay: "Första veckodagen",
      mon: "Måndag",
      sun: "Söndag",
      dateFormat: "Datumformat",
      defaultCountry: "Standardland (helgdagar)",
      overtimeThreshold: "Standardgräns för övertid",
      reset: "Återställ",
      close: "Stäng",
    },
    da: {
      title: "Indstillinger",
      timeFormat: "Tidsformat",
      firstDay: "Første ugedag",
      mon: "Mandag",
      sun: "Søndag",
      dateFormat: "Datoformat",
      defaultCountry: "Standardland (helligdage)",
      overtimeThreshold: "Standardgrænse for overarbejde",
      reset: "Nulstil",
      close: "Luk",
    },
    es: {
      title: "Ajustes",
      timeFormat: "Formato de hora",
      firstDay: "Primer día de la semana",
      mon: "Lunes",
      sun: "Domingo",
      dateFormat: "Formato de fecha",
      defaultCountry: "País predeterminado",
      overtimeThreshold: "Umbral de horas extra",
      reset: "Restablecer",
      close: "Cerrar",
    },
    de: {
      title: "Einstellungen",
      timeFormat: "Zeitformat",
      firstDay: "Erster Wochentag",
      mon: "Montag",
      sun: "Sonntag",
      dateFormat: "Datumsformat",
      defaultCountry: "Standardland",
      overtimeThreshold: "Überstunden-Schwelle",
      reset: "Zurücksetzen",
      close: "Schließen",
    },
    fr: {
      title: "Paramètres",
      timeFormat: "Format horaire",
      firstDay: "Premier jour de la semaine",
      mon: "Lundi",
      sun: "Dimanche",
      dateFormat: "Format de date",
      defaultCountry: "Pays par défaut",
      overtimeThreshold: "Seuil d'heures supp.",
      reset: "Réinitialiser",
      close: "Fermer",
    },
    it: {
      title: "Impostazioni",
      timeFormat: "Formato ora",
      firstDay: "Primo giorno della settimana",
      mon: "Lunedì",
      sun: "Domenica",
      dateFormat: "Formato data",
      defaultCountry: "Paese predefinito",
      overtimeThreshold: "Soglia straordinari",
      reset: "Ripristina",
      close: "Chiudi",
    },
    pl: {
      title: "Ustawienia",
      timeFormat: "Format czasu",
      firstDay: "Pierwszy dzień tygodnia",
      mon: "Poniedziałek",
      sun: "Niedziela",
      dateFormat: "Format daty",
      defaultCountry: "Kraj domyślny",
      overtimeThreshold: "Próg nadgodzin",
      reset: "Resetuj",
      close: "Zamknij",
    },
    tr: {
      title: "Ayarlar",
      timeFormat: "Saat formatı",
      firstDay: "Haftanın ilk günü",
      mon: "Pazartesi",
      sun: "Pazar",
      dateFormat: "Tarih formatı",
      defaultCountry: "Varsayılan ülke",
      overtimeThreshold: "Fazla mesai eşiği",
      reset: "Sıfırla",
      close: "Kapat",
    },
    ja: {
      title: "設定",
      timeFormat: "時刻形式",
      firstDay: "週の最初の日",
      mon: "月曜日",
      sun: "日曜日",
      dateFormat: "日付形式",
      defaultCountry: "デフォルトの国",
      overtimeThreshold: "残業しきい値",
      reset: "リセット",
      close: "閉じる",
    },
    ko: {
      title: "설정",
      timeFormat: "시간 형식",
      firstDay: "주의 첫 요일",
      mon: "월요일",
      sun: "일요일",
      dateFormat: "날짜 형식",
      defaultCountry: "기본 국가",
      overtimeThreshold: "초과 근무 임계값",
      reset: "재설정",
      close: "닫기",
    },
  };
  // Merge with English defaults so all locales have complete labels
  return { ...(L.en as Labels), ...(L[locale] || {}) };
}

export function SettingsPanel({ locale, settings, onChange, onClose }: Props) {
  const L = labels(locale);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const update = <K extends keyof Settings>(key: K, value: Settings[K]) => {
    onChange({ ...settings, [key]: value });
  };

  const handleExport = () => {
    const json = exportData();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `timecraft-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result;
      if (typeof content !== "string") return;
      if (importData(content)) {
        alert(L.importSuccess);
        location.reload();
      } else {
        alert(L.importFail);
      }
    };
    reader.readAsText(file);
  };

  const toggleNotifications = async (enabled: boolean) => {
    if (enabled && "Notification" in window) {
      const result = await Notification.requestPermission();
      if (result !== "granted") {
        update("countdownNotifications", false);
        return;
      }
    }
    update("countdownNotifications", enabled);
  };

  const reset = () => {
    onChange({
      timeFormat: "24h",
      firstDayOfWeek: "mon",
      dateFormat: "DD/MM/YYYY",
      defaultCountry: "NO",
      overtimeThreshold: 7.5,
      showWeekNumbers: false,
      countdownNotifications: false,
      defaultTab: "span",
      fontSize: "md",
    });
  };

  const clearAllData = () => {
    if (!confirm(L.clearConfirm)) return;
    try {
      localStorage.clear();
      location.reload();
    } catch { /* ignore */ }
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-white">{L.title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 text-xl cursor-pointer"
          >
            &times;
          </button>
        </div>

        <div className="grid gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-400">{L.timeFormat}</label>
            <div className="flex gap-2">
              {(["24h", "12h"] as const).map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => update("timeFormat", v)}
                  className={`flex-1 text-sm py-2 px-3 rounded-lg cursor-pointer transition-all ${
                    settings.timeFormat === v
                      ? "bg-amber-400 text-slate-950 font-semibold"
                      : "bg-slate-800 text-slate-400 border border-slate-700 hover:text-slate-200"
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-400">{L.firstDay}</label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => update("firstDayOfWeek", "mon")}
                className={`flex-1 text-sm py-2 px-3 rounded-lg cursor-pointer transition-all ${
                  settings.firstDayOfWeek === "mon"
                    ? "bg-amber-400 text-slate-950 font-semibold"
                    : "bg-slate-800 text-slate-400 border border-slate-700 hover:text-slate-200"
                }`}
              >
                {L.mon}
              </button>
              <button
                type="button"
                onClick={() => update("firstDayOfWeek", "sun")}
                className={`flex-1 text-sm py-2 px-3 rounded-lg cursor-pointer transition-all ${
                  settings.firstDayOfWeek === "sun"
                    ? "bg-amber-400 text-slate-950 font-semibold"
                    : "bg-slate-800 text-slate-400 border border-slate-700 hover:text-slate-200"
                }`}
              >
                {L.sun}
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="set-date-format" className="text-sm font-medium text-slate-400">
              {L.dateFormat}
            </label>
            <select
              id="set-date-format"
              value={settings.dateFormat}
              onChange={(e) => update("dateFormat", e.target.value as Settings["dateFormat"])}
              className="font-[inherit] text-sm py-2 px-3 rounded-lg border border-slate-700 bg-slate-800 text-slate-200 cursor-pointer focus:outline-none focus:border-amber-400"
            >
              <option value="DD/MM/YYYY">DD/MM/YYYY (31/12/2026)</option>
              <option value="MM/DD/YYYY">MM/DD/YYYY (12/31/2026)</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD (2026-12-31)</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="set-country" className="text-sm font-medium text-slate-400">
              {L.defaultCountry}
            </label>
            <select
              id="set-country"
              value={settings.defaultCountry}
              onChange={(e) => update("defaultCountry", e.target.value as Settings["defaultCountry"])}
              className="font-[inherit] text-sm py-2 px-3 rounded-lg border border-slate-700 bg-slate-800 text-slate-200 cursor-pointer focus:outline-none focus:border-amber-400"
            >
              {COUNTRY_LIST.map((c) => (
                <option key={c.code} value={c.code}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="set-overtime" className="text-sm font-medium text-slate-400">
              {L.overtimeThreshold}
            </label>
            <input
              id="set-overtime"
              type="number"
              step="0.5"
              min="0"
              max="24"
              value={settings.overtimeThreshold}
              onChange={(e) => update("overtimeThreshold", +e.target.value)}
              className="font-mono text-sm py-2 px-3 rounded-lg border border-slate-700 bg-slate-800 text-slate-200 focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* Display section */}
          <div className="pt-4 mt-2 border-t border-slate-700">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-400 mb-3">
              {L.displayTitle}
            </h3>
            <div className="flex flex-col gap-3">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-sm text-slate-200">{L.showWeekNumbers}</span>
                <input
                  type="checkbox"
                  checked={settings.showWeekNumbers}
                  onChange={(e) => update("showWeekNumbers", e.target.checked)}
                  className="w-5 h-5 accent-amber-400 cursor-pointer"
                />
              </label>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-slate-400">{L.fontSize}</label>
                <div className="flex gap-2">
                  {([["sm", L.fontSizeSm], ["md", L.fontSizeMd], ["lg", L.fontSizeLg]] as const).map(([v, label]) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => update("fontSize", v)}
                      className={`flex-1 text-sm py-2 px-2 rounded-lg cursor-pointer transition-all ${
                        settings.fontSize === v
                          ? "bg-amber-400 text-slate-950 font-semibold"
                          : "bg-slate-800 text-slate-400 border border-slate-700 hover:text-slate-200"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Behavior section */}
          <div className="pt-4 mt-2 border-t border-slate-700">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-400 mb-3">
              {L.behaviorTitle}
            </h3>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label htmlFor="set-default-tab" className="text-sm font-medium text-slate-400">
                  {L.defaultTab}
                </label>
                <select
                  id="set-default-tab"
                  value={settings.defaultTab}
                  onChange={(e) => update("defaultTab", e.target.value as Settings["defaultTab"])}
                  className="font-[inherit] text-sm py-2 px-3 rounded-lg border border-slate-700 bg-slate-800 text-slate-200 cursor-pointer focus:outline-none focus:border-amber-400"
                >
                  <option value="span">Date span</option>
                  <option value="timezone">Timezones</option>
                  <option value="countdown">Countdown</option>
                  <option value="holidays">Holidays</option>
                  <option value="worktime">Work time</option>
                  <option value="batch">Batch</option>
                </select>
              </div>
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-sm text-slate-200">{L.countdownNotifications}</span>
                <input
                  type="checkbox"
                  checked={settings.countdownNotifications}
                  onChange={(e) => toggleNotifications(e.target.checked)}
                  className="w-5 h-5 accent-amber-400 cursor-pointer"
                />
              </label>
            </div>
          </div>

          {/* Backup section */}
          <div className="pt-4 mt-2 border-t border-slate-700">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-400 mb-3">
              {L.backupTitle}
            </h3>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleExport}
                className="flex-1 text-sm py-2 px-3 rounded-lg cursor-pointer bg-slate-800 text-amber-400 border border-slate-700 hover:bg-slate-700"
              >
                {L.exportBtn}
              </button>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex-1 text-sm py-2 px-3 rounded-lg cursor-pointer bg-slate-800 text-amber-400 border border-slate-700 hover:bg-slate-700"
              >
                {L.importBtn}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="application/json"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleImport(file);
                }}
              />
            </div>
          </div>

          {/* Privacy section */}
          <div className="pt-4 mt-2 border-t border-slate-700">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-400 mb-2">
              {L.privacyTitle}
            </h3>
            <p className="text-sm text-slate-400 mb-3 leading-relaxed">
              {L.privacyInfo}
            </p>
            <div className="flex flex-col gap-2">
              <a
                href="https://github.com/fhjona/timecraft/blob/main/privacy_policy.md"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-amber-400 hover:text-amber-300 underline"
              >
                {L.privacyLink} &#8599;
              </a>
              <button
                type="button"
                onClick={clearAllData}
                className="text-sm py-2 px-3 rounded-lg cursor-pointer bg-transparent text-red-400 border border-red-400/30 hover:bg-red-400/10"
              >
                {L.clearData}
              </button>
            </div>
          </div>

          <div className="flex gap-2 mt-2">
            <button
              type="button"
              onClick={reset}
              className="flex-1 text-sm py-2 px-3 rounded-lg cursor-pointer bg-transparent text-slate-400 border border-slate-700 hover:bg-slate-800"
            >
              {L.reset}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 text-sm py-2 px-3 rounded-lg cursor-pointer bg-gradient-to-b from-amber-400 to-orange-500 text-slate-950 font-semibold hover:brightness-110"
            >
              {L.close}
            </button>
          </div>

          {/* About section */}
          <div className="pt-4 mt-2 border-t border-slate-700 text-center">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-400 mb-2">
              {L.aboutTitle}
            </h3>
            <p className="text-sm text-slate-400">
              <span className="text-amber-400 font-semibold">TimeCraft</span>
              {" \u00b7 "}
              {L.aboutVersion} {APP_VERSION}
            </p>
            <p className="text-sm text-slate-500 mt-1">{L.aboutBy}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
