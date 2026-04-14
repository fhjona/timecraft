// User settings with localStorage persistence

import type { HolidayCountry } from "./holidays";

export type TimeFormat = "12h" | "24h";
export type FirstDayOfWeek = "mon" | "sun";
export type DateFormat = "DD/MM/YYYY" | "MM/DD/YYYY" | "YYYY-MM-DD";

export type Settings = {
  timeFormat: TimeFormat;
  firstDayOfWeek: FirstDayOfWeek;
  dateFormat: DateFormat;
  defaultCountry: HolidayCountry;
  overtimeThreshold: number; // hours
};

const STORAGE_KEY = "timecraft-settings";

export const DEFAULT_SETTINGS: Settings = {
  timeFormat: "24h",
  firstDayOfWeek: "mon",
  dateFormat: "DD/MM/YYYY",
  defaultCountry: "NO",
  overtimeThreshold: 7.5,
};

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
