// Timezone conversion with DST support using the Intl API

export type TzConversionResult = {
  sourceFormatted: string;
  targetFormatted: string;
  sourceOffset: string;
  targetOffset: string;
  diffHours: number;
  diffFormatted: string;
};

/** Common timezone list grouped by region */
export const TIMEZONE_LIST: { label: string; zones: string[] }[] = [
  {
    label: "Americas",
    zones: [
      "America/New_York",
      "America/Chicago",
      "America/Denver",
      "America/Los_Angeles",
      "America/Anchorage",
      "Pacific/Honolulu",
      "America/Toronto",
      "America/Vancouver",
      "America/Mexico_City",
      "America/Sao_Paulo",
      "America/Manaus",
      "America/Belem",
      "America/Recife",
      "America/Cuiaba",
      "America/Rio_Branco",
      "America/Fortaleza",
      "America/Bahia",
      "America/Noronha",
      "America/Buenos_Aires",
      "America/Bogota",
      "America/Lima",
      "America/Santiago",
      "America/Caracas",
      "America/Montevideo",
      "America/Asuncion",
      "America/La_Paz",
      "America/Guayaquil",
    ],
  },
  {
    label: "Europe",
    zones: [
      "Europe/London",
      "Europe/Paris",
      "Europe/Berlin",
      "Europe/Madrid",
      "Europe/Rome",
      "Europe/Amsterdam",
      "Europe/Brussels",
      "Europe/Zurich",
      "Europe/Vienna",
      "Europe/Stockholm",
      "Europe/Oslo",
      "Europe/Copenhagen",
      "Europe/Helsinki",
      "Europe/Warsaw",
      "Europe/Prague",
      "Europe/Bucharest",
      "Europe/Athens",
      "Europe/Istanbul",
      "Europe/Moscow",
      "Europe/Lisbon",
    ],
  },
  {
    label: "Asia & Pacific",
    zones: [
      "Asia/Dubai",
      "Asia/Kolkata",
      "Asia/Bangkok",
      "Asia/Singapore",
      "Asia/Hong_Kong",
      "Asia/Shanghai",
      "Asia/Seoul",
      "Asia/Tokyo",
      "Australia/Sydney",
      "Australia/Melbourne",
      "Pacific/Auckland",
      "Asia/Karachi",
      "Asia/Dhaka",
      "Asia/Jakarta",
      "Asia/Taipei",
    ],
  },
  {
    label: "Africa & Middle East",
    zones: [
      "Africa/Cairo",
      "Africa/Lagos",
      "Africa/Johannesburg",
      "Africa/Nairobi",
      "Africa/Casablanca",
      "Asia/Jerusalem",
      "Asia/Riyadh",
      "Asia/Tehran",
    ],
  },
];

export const ALL_ZONES: string[] = TIMEZONE_LIST.flatMap((g) => g.zones);

function formatInZone(date: Date, tz: string): string {
  return date.toLocaleString("en-GB", {
    timeZone: tz,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

function getUtcOffset(date: Date, tz: string): number {
  const str = date.toLocaleString("en-US", {
    timeZone: tz,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  const tzDate = new Date(str);
  const utcStr = date.toLocaleString("en-US", {
    timeZone: "UTC",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  const utcDate = new Date(utcStr);
  return (tzDate.getTime() - utcDate.getTime()) / 60000;
}

function formatOffset(minutes: number): string {
  const sign = minutes >= 0 ? "+" : "-";
  const abs = Math.abs(minutes);
  const h = Math.floor(abs / 60);
  const m = abs % 60;
  return `UTC${sign}${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

export function convertTimezone(
  dateStr: string,
  fromTz: string,
  toTz: string,
): TzConversionResult | null {
  if (!dateStr || !fromTz || !toTz) return null;

  // Build a date in the source timezone
  // dateStr is "YYYY-MM-DDTHH:MM" from datetime-local
  const parts = dateStr.match(/(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/);
  if (!parts) return null;

  // Use Intl.DateTimeFormat to find UTC equivalent of the source time
  const [, yr, mo, dy, hr, mn] = parts;
  const fakeUtc = new Date(
    Date.UTC(+yr, +mo - 1, +dy, +hr, +mn, 0),
  );
  const sourceOffsetMin = getUtcOffset(fakeUtc, fromTz);
  // The actual UTC instant
  const utcMs = fakeUtc.getTime() - sourceOffsetMin * 60000;
  const utcDate = new Date(utcMs);

  const targetOffsetMin = getUtcOffset(utcDate, toTz);
  const sourceActualOffset = getUtcOffset(utcDate, fromTz);

  const diffMin = targetOffsetMin - sourceActualOffset;
  const diffH = diffMin / 60;

  return {
    sourceFormatted: formatInZone(utcDate, fromTz),
    targetFormatted: formatInZone(utcDate, toTz),
    sourceOffset: formatOffset(sourceActualOffset),
    targetOffset: formatOffset(targetOffsetMin),
    diffHours: diffH,
    diffFormatted:
      diffH === 0
        ? "0h"
        : `${diffH > 0 ? "+" : ""}${diffH % 1 === 0 ? diffH : diffH.toFixed(1)}h`,
  };
}

export function friendlyTzName(tz: string): string {
  return tz.replace(/_/g, " ").replace(/\//g, " / ");
}
