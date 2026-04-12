import type { Locale, MessagePack, UnitKind } from "./messages";
import { MESSAGES, msg } from "./messages";

export function parseLocal(iso: string): Date | null {
  if (!iso) return null;
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? null : d;
}

export function toLocalInput(d: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export type CalendarParts = {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

/** Calendar difference from a (earlier) to b (later), local calendar. */
export function calendarComponents(a: Date, b: Date): CalendarParts {
  let y = b.getFullYear() - a.getFullYear();
  let m = b.getMonth() - a.getMonth();
  let d = b.getDate() - a.getDate();
  let h = b.getHours() - a.getHours();
  let min = b.getMinutes() - a.getMinutes();
  let s = b.getSeconds() - a.getSeconds();

  if (s < 0) {
    s += 60;
    min -= 1;
  }
  if (min < 0) {
    min += 60;
    h -= 1;
  }
  if (h < 0) {
    h += 24;
    d -= 1;
  }
  if (d < 0) {
    const prevMonth = new Date(b.getFullYear(), b.getMonth(), 0);
    d += prevMonth.getDate();
    m -= 1;
  }
  if (m < 0) {
    m += 12;
    y -= 1;
  }
  return { years: y, months: m, days: d, hours: h, minutes: min, seconds: s };
}

function unitLabel(locale: Locale, kind: UnitKind, n: number): string {
  const pack: MessagePack = MESSAGES[locale];
  const pair = pack.units[kind];
  return pair[n === 1 ? 0 : 1];
}

export function formatCalendar(c: CalendarParts, locale: Locale): string {
  const parts: string[] = [];
  const u = (kind: UnitKind, n: number) => `${n} ${unitLabel(locale, kind, n)}`;
  if (c.years) parts.push(u("year", c.years));
  if (c.months) parts.push(u("month", c.months));
  if (c.days) parts.push(u("day", c.days));
  if (c.hours) parts.push(u("hour", c.hours));
  if (c.minutes) parts.push(u("minute", c.minutes));
  if (c.seconds) parts.push(u("second", c.seconds));
  if (parts.length === 0) return msg(locale, "sameMoment");
  return parts.join(", ");
}

export type SpanStats = {
  calendarLine: string;
  totalDays: string;
  totalHours: string;
  totalMinutes: string;
  totalSeconds: string;
};

export function computeSpan(
  startStr: string,
  endStr: string,
  locale: Locale,
):
  | { ok: false }
  | { ok: true; forward: boolean; stats: SpanStats } {
  const start = parseLocal(startStr);
  const end = parseLocal(endStr);
  if (!start || !end) return { ok: false };

  const forward = end >= start;
  const a = forward ? start : end;
  const b = forward ? end : start;
  const ms = b.getTime() - a.getTime();

  const totalSeconds = Math.floor(ms / 1000);
  const totalMinutes = Math.floor(ms / 60000);
  const totalHours = Math.floor(ms / 3600000);
  const totalDays = ms / 86400000;

  const cal = calendarComponents(a, b);

  return {
    ok: true,
    forward,
    stats: {
      calendarLine: formatCalendar(cal, locale),
      totalDays: totalDays.toLocaleString(locale, { maximumFractionDigits: 4 }),
      totalHours: totalHours.toLocaleString(locale),
      totalMinutes: totalMinutes.toLocaleString(locale),
      totalSeconds: totalSeconds.toLocaleString(locale),
    },
  };
}
