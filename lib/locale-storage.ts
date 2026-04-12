import type { Locale } from "./messages";
import { SUPPORTED } from "./messages";

export const STORAGE_KEY = "date-span-locale";

export function guessLocaleFromNavigator(): Locale {
  if (typeof window === "undefined") return "en";
  const raw = (navigator.language || "en").replace("_", "-");
  const lower = raw.toLowerCase();
  if (SUPPORTED.includes(raw as Locale)) return raw as Locale;
  if (lower === "pt-br" || lower.startsWith("pt")) return "pt-BR";
  if (lower === "nb" || lower === "no" || lower.startsWith("nb-") || lower.startsWith("no-"))
    return "nb";
  if (lower.startsWith("nn")) return "nb";
  if (lower.startsWith("sv")) return "sv";
  if (lower.startsWith("da")) return "da";
  if (lower.startsWith("en")) return "en";
  return "en";
}

export function loadStoredLocale(): Locale | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && SUPPORTED.includes(stored as Locale)) return stored as Locale;
  } catch {
    /* ignore */
  }
  return null;
}

export function saveLocale(locale: Locale) {
  try {
    localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    /* ignore */
  }
}
