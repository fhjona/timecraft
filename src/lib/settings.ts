// User settings with localStorage persistence

import type { HolidayCountry } from "./holidays";

export type TimeFormat = "12h" | "24h";
export type FirstDayOfWeek = "mon" | "sun";
export type DateFormat = "DD/MM/YYYY" | "MM/DD/YYYY" | "YYYY-MM-DD";
export type FontSize = "sm" | "md" | "lg";
export type DefaultTab = "span" | "timezone" | "countdown" | "holidays" | "worktime" | "batch";

export type Settings = {
  timeFormat: TimeFormat;
  firstDayOfWeek: FirstDayOfWeek;
  dateFormat: DateFormat;
  defaultCountry: HolidayCountry;
  overtimeThreshold: number; // hours
  showWeekNumbers: boolean;
  countdownNotifications: boolean;
  defaultTab: DefaultTab;
  fontSize: FontSize;
};

export const APP_VERSION = "1.3";

const STORAGE_KEY = "timecraft-settings";

export const DEFAULT_SETTINGS: Settings = {
  timeFormat: "24h",
  firstDayOfWeek: "mon",
  dateFormat: "DD/MM/YYYY",
  defaultCountry: "NO",
  overtimeThreshold: 7.5,
  showWeekNumbers: false,
  countdownNotifications: false,
  defaultTab: "span",
  fontSize: "md",
};

export function exportData(): string {
  const data: Record<string, unknown> = {};
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (key.startsWith("timecraft-") || key.startsWith("countdown-") || key === "date-span-locale")) {
        const val = localStorage.getItem(key);
        if (val !== null) data[key] = val;
      }
    }
  } catch { /* ignore */ }
  return JSON.stringify({ version: APP_VERSION, exportedAt: new Date().toISOString(), data }, null, 2);
}

export function importData(json: string): boolean {
  try {
    const parsed = JSON.parse(json);
    if (!parsed.data || typeof parsed.data !== "object") return false;
    for (const [key, value] of Object.entries(parsed.data)) {
      if (typeof value === "string") {
        localStorage.setItem(key, value);
      }
    }
    return true;
  } catch {
    return false;
  }
}

export function loadSettings(): Settings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...DEFAULT_SETTINGS, ...parsed };
    }
  } catch { /* ignore */ }
  return DEFAULT_SETTINGS;
}

export function saveSettings(settings: Settings) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch { /* ignore */ }
}
