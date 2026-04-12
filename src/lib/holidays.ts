// Holiday calculation for Norway and Brazil
// Includes Easter-based moveable feasts

export type HolidayCountry = "NO" | "BR";

export type Holiday = {
  date: string; // YYYY-MM-DD
  name: string;
};

/** Computus – Anonymous Gregorian algorithm for Easter Sunday */
function easterSunday(year: number): Date {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month - 1, day);
}

function addDays(d: Date, n: number): Date {
  const r = new Date(d);
  r.setDate(r.getDate() + n);
  return r;
}

function fmt(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function norwegianHolidays(year: number): Holiday[] {
  const easter = easterSunday(year);
  return [
    { date: `${year}-01-01`, name: "Nytt\u00e5rsdag" },
    { date: fmt(addDays(easter, -3)), name: "Skj\u00e6rtorsdag" },
    { date: fmt(addDays(easter, -2)), name: "Langfredag" },
    { date: fmt(easter), name: "1. p\u00e5skedag" },
    { date: fmt(addDays(easter, 1)), name: "2. p\u00e5skedag" },
    { date: `${year}-05-01`, name: "Arbeidernes dag" },
    { date: `${year}-05-17`, name: "Grunnlovsdag" },
    { date: fmt(addDays(easter, 39)), name: "Kristi himmelfartsdag" },
    { date: fmt(addDays(easter, 49)), name: "1. pinsedag" },
    { date: fmt(addDays(easter, 50)), name: "2. pinsedag" },
    { date: `${year}-12-25`, name: "1. juledag" },
    { date: `${year}-12-26`, name: "2. juledag" },
  ];
}

export function brazilianHolidays(year: number): Holiday[] {
  const easter = easterSunday(year);
  return [
    { date: `${year}-01-01`, name: "Confraterniza\u00e7\u00e3o Universal" },
    { date: fmt(addDays(easter, -49)), name: "Carnaval (segunda)" },
    { date: fmt(addDays(easter, -48)), name: "Carnaval (ter\u00e7a)" },
    { date: fmt(addDays(easter, -47)), name: "Quarta-feira de Cinzas" },
    { date: fmt(addDays(easter, -2)), name: "Paix\u00e3o de Cristo" },
    { date: fmt(easter), name: "P\u00e1scoa" },
    { date: `${year}-04-21`, name: "Tiradentes" },
    { date: `${year}-05-01`, name: "Dia do Trabalho" },
    { date: fmt(addDays(easter, 60)), name: "Corpus Christi" },
    { date: `${year}-09-07`, name: "Independ\u00eancia do Brasil" },
    { date: `${year}-10-12`, name: "Nossa Senhora Aparecida" },
    { date: `${year}-11-02`, name: "Finados" },
    { date: `${year}-11-15`, name: "Proclama\u00e7\u00e3o da Rep\u00fablica" },
    { date: `${year}-12-25`, name: "Natal" },
  ];
}

export function getHolidays(country: HolidayCountry, year: number): Holiday[] {
  return country === "NO"
    ? norwegianHolidays(year)
    : brazilianHolidays(year);
}

export function getHolidaysInRange(
  country: HolidayCountry,
  from: string,
  to: string,
  customHolidays: Holiday[] = [],
): Holiday[] {
  const fromD = new Date(from);
  const toD = new Date(to);
  const yearStart = fromD.getFullYear();
  const yearEnd = toD.getFullYear();
  const all: Holiday[] = [];
  for (let y = yearStart; y <= yearEnd; y++) {
    all.push(...getHolidays(country, y));
  }
  all.push(...customHolidays);
  return all
    .filter((h) => h.date >= from && h.date <= to)
    .sort((a, b) => a.date.localeCompare(b.date));
}

export type BusinessDayResult = {
  totalDays: number;
  weekendDays: number;
  holidayCount: number;
  businessDays: number;
  holidays: Holiday[];
};

export function calcBusinessDays(
  country: HolidayCountry,
  from: string,
  to: string,
  customHolidays: Holiday[] = [],
): BusinessDayResult {
  const holidays = getHolidaysInRange(country, from, to, customHolidays);
  const holidaySet = new Set(holidays.map((h) => h.date));

  const fromD = new Date(from);
  const toD = new Date(to);
  let totalDays = 0;
  let weekendDays = 0;
  let holidayCount = 0;

  const cur = new Date(fromD);
  while (cur <= toD) {
    totalDays++;
    const dow = cur.getDay();
    const dateStr = fmt(cur);
    if (dow === 0 || dow === 6) {
      weekendDays++;
    } else if (holidaySet.has(dateStr)) {
      holidayCount++;
    }
    cur.setDate(cur.getDate() + 1);
  }

  return {
    totalDays,
    weekendDays,
    holidayCount,
    businessDays: totalDays - weekendDays - holidayCount,
    holidays,
  };
}
