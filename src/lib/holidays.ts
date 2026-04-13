// Holiday calculation for multiple countries
// Includes Easter-based moveable feasts

export type HolidayCountry = "NO" | "BR" | "SE" | "DK" | "US" | "UK" | "DE" | "FR" | "ES" | "PT" | "IT" | "NL" | "FI" | "PL" | "MX" | "AR" | "CO" | "CL";

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

/** Nth weekday of month (e.g. 3rd Monday) */
function nthWeekday(year: number, month: number, weekday: number, n: number): Date {
  const first = new Date(year, month, 1);
  let day = 1 + ((weekday - first.getDay() + 7) % 7);
  day += (n - 1) * 7;
  return new Date(year, month, day);
}

/** Last weekday of month */
function lastWeekday(year: number, month: number, weekday: number): Date {
  const last = new Date(year, month + 1, 0);
  const diff = (last.getDay() - weekday + 7) % 7;
  return new Date(year, month, last.getDate() - diff);
}

// ── NORWAY ──
function norwegianHolidays(year: number): Holiday[] {
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

// ── BRAZIL ──
function brazilianHolidays(year: number): Holiday[] {
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

// ── SWEDEN ──
function swedishHolidays(year: number): Holiday[] {
  const easter = easterSunday(year);
  // Midsommarafton: Friday between June 19-25
  const june19 = new Date(year, 5, 19);
  const midsommarDay = addDays(june19, (5 - june19.getDay() + 7) % 7);
  const midsommarEve = addDays(midsommarDay, -1);
  // Alla helgons dag: Saturday between Oct 31 - Nov 6
  const oct31 = new Date(year, 9, 31);
  const allaHelgon = addDays(oct31, (6 - oct31.getDay() + 7) % 7);
  return [
    { date: `${year}-01-01`, name: "Ny\u00e5rsdagen" },
    { date: `${year}-01-06`, name: "Trettondedag jul" },
    { date: fmt(addDays(easter, -2)), name: "L\u00e5ngfredagen" },
    { date: fmt(easter), name: "P\u00e5skdagen" },
    { date: fmt(addDays(easter, 1)), name: "Annandag p\u00e5sk" },
    { date: `${year}-05-01`, name: "F\u00f6rsta maj" },
    { date: fmt(addDays(easter, 39)), name: "Kristi himmelsf\u00e4rdsdag" },
    { date: fmt(addDays(easter, 49)), name: "Pingstdagen" },
    { date: `${year}-06-06`, name: "Sveriges nationaldag" },
    { date: fmt(midsommarEve), name: "Midsommarafton" },
    { date: fmt(midsommarDay), name: "Midsommardagen" },
    { date: fmt(allaHelgon), name: "Alla helgons dag" },
    { date: `${year}-12-24`, name: "Julafton" },
    { date: `${year}-12-25`, name: "Juldagen" },
    { date: `${year}-12-26`, name: "Annandag jul" },
    { date: `${year}-12-31`, name: "Ny\u00e5rsafton" },
  ];
}

// ── DENMARK ──
function danishHolidays(year: number): Holiday[] {
  const easter = easterSunday(year);
  return [
    { date: `${year}-01-01`, name: "Nyt\u00e5rsdag" },
    { date: fmt(addDays(easter, -3)), name: "Sk\u00e6rtorsdag" },
    { date: fmt(addDays(easter, -2)), name: "Langfredag" },
    { date: fmt(easter), name: "P\u00e5skedag" },
    { date: fmt(addDays(easter, 1)), name: "2. p\u00e5skedag" },
    { date: fmt(addDays(easter, 26)), name: "Store bededag" },
    { date: fmt(addDays(easter, 39)), name: "Kristi himmelfartsdag" },
    { date: fmt(addDays(easter, 49)), name: "Pinsedag" },
    { date: fmt(addDays(easter, 50)), name: "2. pinsedag" },
    { date: `${year}-06-05`, name: "Grundlovsdag" },
    { date: `${year}-12-24`, name: "Juleaften" },
    { date: `${year}-12-25`, name: "1. juledag" },
    { date: `${year}-12-26`, name: "2. juledag" },
  ];
}

// ── USA ──
function usHolidays(year: number): Holiday[] {
  return [
    { date: `${year}-01-01`, name: "New Year's Day" },
    { date: fmt(nthWeekday(year, 0, 1, 3)), name: "Martin Luther King Jr. Day" },
    { date: fmt(nthWeekday(year, 1, 1, 3)), name: "Presidents' Day" },
    { date: fmt(lastWeekday(year, 4, 1)), name: "Memorial Day" },
    { date: `${year}-06-19`, name: "Juneteenth" },
    { date: `${year}-07-04`, name: "Independence Day" },
    { date: fmt(nthWeekday(year, 8, 1, 1)), name: "Labor Day" },
    { date: fmt(nthWeekday(year, 9, 1, 2)), name: "Columbus Day" },
    { date: `${year}-11-11`, name: "Veterans Day" },
    { date: fmt(nthWeekday(year, 10, 4, 4)), name: "Thanksgiving Day" },
    { date: `${year}-12-25`, name: "Christmas Day" },
  ];
}

// ── UK ──
function ukHolidays(year: number): Holiday[] {
  const easter = easterSunday(year);
  // Early May bank holiday (1st Monday May)
  // Spring bank holiday (last Monday May)
  // Summer bank holiday (last Monday August)
  return [
    { date: `${year}-01-01`, name: "New Year's Day" },
    { date: fmt(addDays(easter, -2)), name: "Good Friday" },
    { date: fmt(addDays(easter, 1)), name: "Easter Monday" },
    { date: fmt(nthWeekday(year, 4, 1, 1)), name: "Early May Bank Holiday" },
    { date: fmt(lastWeekday(year, 4, 1)), name: "Spring Bank Holiday" },
    { date: fmt(lastWeekday(year, 7, 1)), name: "Summer Bank Holiday" },
    { date: `${year}-12-25`, name: "Christmas Day" },
    { date: `${year}-12-26`, name: "Boxing Day" },
  ];
}

// ── GERMANY ──
function germanHolidays(year: number): Holiday[] {
  const easter = easterSunday(year);
  return [
    { date: `${year}-01-01`, name: "Neujahr" },
    { date: fmt(addDays(easter, -2)), name: "Karfreitag" },
    { date: fmt(easter), name: "Ostersonntag" },
    { date: fmt(addDays(easter, 1)), name: "Ostermontag" },
    { date: `${year}-05-01`, name: "Tag der Arbeit" },
    { date: fmt(addDays(easter, 39)), name: "Christi Himmelfahrt" },
    { date: fmt(addDays(easter, 49)), name: "Pfingstsonntag" },
    { date: fmt(addDays(easter, 50)), name: "Pfingstmontag" },
    { date: `${year}-10-03`, name: "Tag der Deutschen Einheit" },
    { date: `${year}-12-25`, name: "1. Weihnachtstag" },
    { date: `${year}-12-26`, name: "2. Weihnachtstag" },
  ];
}

// ── FRANCE ──
function frenchHolidays(year: number): Holiday[] {
  const easter = easterSunday(year);
  return [
    { date: `${year}-01-01`, name: "Jour de l'an" },
    { date: fmt(addDays(easter, 1)), name: "Lundi de P\u00e2ques" },
    { date: `${year}-05-01`, name: "F\u00eate du Travail" },
    { date: `${year}-05-08`, name: "Victoire 1945" },
    { date: fmt(addDays(easter, 39)), name: "Ascension" },
    { date: fmt(addDays(easter, 50)), name: "Lundi de Pentec\u00f4te" },
    { date: `${year}-07-14`, name: "F\u00eate nationale" },
    { date: `${year}-08-15`, name: "Assomption" },
    { date: `${year}-11-01`, name: "Toussaint" },
    { date: `${year}-11-11`, name: "Armistice" },
    { date: `${year}-12-25`, name: "No\u00ebl" },
  ];
}

// ── SPAIN ──
function spanishHolidays(year: number): Holiday[] {
  const easter = easterSunday(year);
  return [
    { date: `${year}-01-01`, name: "A\u00f1o Nuevo" },
    { date: `${year}-01-06`, name: "Epifan\u00eda del Se\u00f1or" },
    { date: fmt(addDays(easter, -2)), name: "Viernes Santo" },
    { date: `${year}-05-01`, name: "D\u00eda del Trabajador" },
    { date: `${year}-08-15`, name: "Asunci\u00f3n de la Virgen" },
    { date: `${year}-10-12`, name: "Fiesta Nacional de Espa\u00f1a" },
    { date: `${year}-11-01`, name: "Todos los Santos" },
    { date: `${year}-12-06`, name: "D\u00eda de la Constituci\u00f3n" },
    { date: `${year}-12-08`, name: "Inmaculada Concepci\u00f3n" },
    { date: `${year}-12-25`, name: "Navidad" },
  ];
}

// ── PORTUGAL ──
function portugueseHolidays(year: number): Holiday[] {
  const easter = easterSunday(year);
  return [
    { date: `${year}-01-01`, name: "Ano Novo" },
    { date: fmt(addDays(easter, -47)), name: "Carnaval" },
    { date: fmt(addDays(easter, -2)), name: "Sexta-feira Santa" },
    { date: fmt(easter), name: "P\u00e1scoa" },
    { date: `${year}-04-25`, name: "Dia da Liberdade" },
    { date: `${year}-05-01`, name: "Dia do Trabalhador" },
    { date: fmt(addDays(easter, 60)), name: "Corpo de Deus" },
    { date: `${year}-06-10`, name: "Dia de Portugal" },
    { date: `${year}-08-15`, name: "Assun\u00e7\u00e3o de Nossa Senhora" },
    { date: `${year}-10-05`, name: "Implanta\u00e7\u00e3o da Rep\u00fablica" },
    { date: `${year}-11-01`, name: "Todos os Santos" },
    { date: `${year}-12-01`, name: "Restaura\u00e7\u00e3o da Independ\u00eancia" },
    { date: `${year}-12-08`, name: "Imaculada Concei\u00e7\u00e3o" },
    { date: `${year}-12-25`, name: "Natal" },
  ];
}

// ── ITALY ──
function italianHolidays(year: number): Holiday[] {
  const easter = easterSunday(year);
  return [
    { date: `${year}-01-01`, name: "Capodanno" },
    { date: `${year}-01-06`, name: "Epifania" },
    { date: fmt(easter), name: "Pasqua" },
    { date: fmt(addDays(easter, 1)), name: "Luned\u00ec dell'Angelo" },
    { date: `${year}-04-25`, name: "Festa della Liberazione" },
    { date: `${year}-05-01`, name: "Festa del Lavoro" },
    { date: `${year}-06-02`, name: "Festa della Repubblica" },
    { date: `${year}-08-15`, name: "Ferragosto" },
    { date: `${year}-11-01`, name: "Tutti i Santi" },
    { date: `${year}-12-08`, name: "Immacolata Concezione" },
    { date: `${year}-12-25`, name: "Natale" },
    { date: `${year}-12-26`, name: "Santo Stefano" },
  ];
}

// ── NETHERLANDS ──
function dutchHolidays(year: number): Holiday[] {
  const easter = easterSunday(year);
  return [
    { date: `${year}-01-01`, name: "Nieuwjaarsdag" },
    { date: fmt(addDays(easter, -2)), name: "Goede Vrijdag" },
    { date: fmt(easter), name: "Eerste Paasdag" },
    { date: fmt(addDays(easter, 1)), name: "Tweede Paasdag" },
    { date: `${year}-04-27`, name: "Koningsdag" },
    { date: `${year}-05-05`, name: "Bevrijdingsdag" },
    { date: fmt(addDays(easter, 39)), name: "Hemelvaartsdag" },
    { date: fmt(addDays(easter, 49)), name: "Eerste Pinksterdag" },
    { date: fmt(addDays(easter, 50)), name: "Tweede Pinksterdag" },
    { date: `${year}-12-25`, name: "Eerste Kerstdag" },
    { date: `${year}-12-26`, name: "Tweede Kerstdag" },
  ];
}

// ── FINLAND ──
function finnishHolidays(year: number): Holiday[] {
  const easter = easterSunday(year);
  // Midsommar: Saturday between June 20-26
  const june20 = new Date(year, 5, 20);
  const midsommar = addDays(june20, (6 - june20.getDay() + 7) % 7);
  // Alla helgons dag: Saturday between Oct 31 - Nov 6
  const oct31 = new Date(year, 9, 31);
  const allaHelgon = addDays(oct31, (6 - oct31.getDay() + 7) % 7);
  return [
    { date: `${year}-01-01`, name: "Uudenvuodenp\u00e4iv\u00e4" },
    { date: `${year}-01-06`, name: "Loppiainen" },
    { date: fmt(addDays(easter, -2)), name: "Pitk\u00e4perjantai" },
    { date: fmt(easter), name: "P\u00e4\u00e4si\u00e4isp\u00e4iv\u00e4" },
    { date: fmt(addDays(easter, 1)), name: "2. p\u00e4\u00e4si\u00e4isp\u00e4iv\u00e4" },
    { date: `${year}-05-01`, name: "Vappu" },
    { date: fmt(addDays(easter, 39)), name: "Helatorstai" },
    { date: fmt(addDays(easter, 49)), name: "Helluntaip\u00e4iv\u00e4" },
    { date: fmt(addDays(midsommar, -1)), name: "Juhannusaatto" },
    { date: fmt(midsommar), name: "Juhannusp\u00e4iv\u00e4" },
    { date: fmt(allaHelgon), name: "Pyh\u00e4inp\u00e4iv\u00e4" },
    { date: `${year}-12-06`, name: "Itsen\u00e4isyysp\u00e4iv\u00e4" },
    { date: `${year}-12-24`, name: "Jouluaatto" },
    { date: `${year}-12-25`, name: "Joulup\u00e4iv\u00e4" },
    { date: `${year}-12-26`, name: "Tapaninp\u00e4iv\u00e4" },
  ];
}

// ── POLAND ──
function polishHolidays(year: number): Holiday[] {
  const easter = easterSunday(year);
  return [
    { date: `${year}-01-01`, name: "Nowy Rok" },
    { date: `${year}-01-06`, name: "\u015awi\u0119to Trzech Kr\u00f3li" },
    { date: fmt(easter), name: "Wielkanoc" },
    { date: fmt(addDays(easter, 1)), name: "Poniedzia\u0142ek Wielkanocny" },
    { date: `${year}-05-01`, name: "\u015awi\u0119to Pracy" },
    { date: `${year}-05-03`, name: "\u015awi\u0119to Konstytucji" },
    { date: fmt(addDays(easter, 49)), name: "Zes\u0142anie Ducha \u015awi\u0119tego" },
    { date: fmt(addDays(easter, 60)), name: "Bo\u017ce Cia\u0142o" },
    { date: `${year}-08-15`, name: "Wniebowzi\u0119cie NMP" },
    { date: `${year}-11-01`, name: "Wszystkich \u015awi\u0119tych" },
    { date: `${year}-11-11`, name: "\u015awi\u0119to Niepodleg\u0142o\u015bci" },
    { date: `${year}-12-25`, name: "Bo\u017ce Narodzenie" },
    { date: `${year}-12-26`, name: "Drugi dzie\u0144 Bo\u017cego Narodzenia" },
  ];
}

// ── MEXICO ──
function mexicanHolidays(year: number): Holiday[] {
  return [
    { date: `${year}-01-01`, name: "A\u00f1o Nuevo" },
    { date: fmt(nthWeekday(year, 1, 1, 1)), name: "D\u00eda de la Constituci\u00f3n" },
    { date: fmt(nthWeekday(year, 2, 1, 3)), name: "Natalicio de Benito Ju\u00e1rez" },
    { date: `${year}-05-01`, name: "D\u00eda del Trabajo" },
    { date: `${year}-09-16`, name: "D\u00eda de la Independencia" },
    { date: fmt(nthWeekday(year, 10, 1, 3)), name: "Revoluci\u00f3n Mexicana" },
    { date: `${year}-12-25`, name: "Navidad" },
  ];
}

// ── ARGENTINA ──
function argentineHolidays(year: number): Holiday[] {
  const easter = easterSunday(year);
  return [
    { date: `${year}-01-01`, name: "A\u00f1o Nuevo" },
    { date: fmt(addDays(easter, -48)), name: "Carnaval" },
    { date: fmt(addDays(easter, -47)), name: "Carnaval" },
    { date: `${year}-03-24`, name: "D\u00eda de la Memoria" },
    { date: fmt(addDays(easter, -2)), name: "Viernes Santo" },
    { date: `${year}-04-02`, name: "D\u00eda del Veterano (Malvinas)" },
    { date: `${year}-05-01`, name: "D\u00eda del Trabajador" },
    { date: `${year}-05-25`, name: "Revoluci\u00f3n de Mayo" },
    { date: `${year}-06-20`, name: "D\u00eda de la Bandera" },
    { date: `${year}-07-09`, name: "D\u00eda de la Independencia" },
    { date: `${year}-12-08`, name: "Inmaculada Concepci\u00f3n" },
    { date: `${year}-12-25`, name: "Navidad" },
  ];
}

// ── COLOMBIA ──
function colombianHolidays(year: number): Holiday[] {
  const easter = easterSunday(year);
  return [
    { date: `${year}-01-01`, name: "A\u00f1o Nuevo" },
    { date: `${year}-01-06`, name: "D\u00eda de los Reyes Magos" },
    { date: `${year}-03-19`, name: "D\u00eda de San Jos\u00e9" },
    { date: fmt(addDays(easter, -3)), name: "Jueves Santo" },
    { date: fmt(addDays(easter, -2)), name: "Viernes Santo" },
    { date: `${year}-05-01`, name: "D\u00eda del Trabajo" },
    { date: fmt(addDays(easter, 39)), name: "Ascensi\u00f3n del Se\u00f1or" },
    { date: fmt(addDays(easter, 60)), name: "Corpus Christi" },
    { date: `${year}-07-20`, name: "D\u00eda de la Independencia" },
    { date: `${year}-08-07`, name: "Batalla de Boyac\u00e1" },
    { date: `${year}-12-08`, name: "Inmaculada Concepci\u00f3n" },
    { date: `${year}-12-25`, name: "Navidad" },
  ];
}

// ── CHILE ──
function chileanHolidays(year: number): Holiday[] {
  const easter = easterSunday(year);
  return [
    { date: `${year}-01-01`, name: "A\u00f1o Nuevo" },
    { date: fmt(addDays(easter, -2)), name: "Viernes Santo" },
    { date: fmt(addDays(easter, -1)), name: "S\u00e1bado Santo" },
    { date: `${year}-05-01`, name: "D\u00eda del Trabajo" },
    { date: `${year}-05-21`, name: "D\u00eda de las Glorias Navales" },
    { date: `${year}-06-20`, name: "D\u00eda de los Pueblos Ind\u00edgenas" },
    { date: `${year}-08-15`, name: "Asunci\u00f3n de la Virgen" },
    { date: `${year}-09-18`, name: "Fiestas Patrias" },
    { date: `${year}-09-19`, name: "D\u00eda de las Glorias del Ej\u00e9rcito" },
    { date: `${year}-10-12`, name: "Encuentro de Dos Mundos" },
    { date: `${year}-11-01`, name: "Todos los Santos" },
    { date: `${year}-12-08`, name: "Inmaculada Concepci\u00f3n" },
    { date: `${year}-12-25`, name: "Navidad" },
  ];
}

// ── DISPATCHER ──

const HOLIDAY_MAP: Record<HolidayCountry, (year: number) => Holiday[]> = {
  NO: norwegianHolidays,
  BR: brazilianHolidays,
  SE: swedishHolidays,
  DK: danishHolidays,
  US: usHolidays,
  UK: ukHolidays,
  DE: germanHolidays,
  FR: frenchHolidays,
  ES: spanishHolidays,
  PT: portugueseHolidays,
  IT: italianHolidays,
  NL: dutchHolidays,
  FI: finnishHolidays,
  PL: polishHolidays,
  MX: mexicanHolidays,
  AR: argentineHolidays,
  CO: colombianHolidays,
  CL: chileanHolidays,
};

export const COUNTRY_LIST: { code: HolidayCountry; name: string }[] = [
  { code: "NO", name: "Norge / Norway" },
  { code: "SE", name: "Sverige / Sweden" },
  { code: "DK", name: "Danmark / Denmark" },
  { code: "FI", name: "Suomi / Finland" },
  { code: "BR", name: "Brasil / Brazil" },
  { code: "PT", name: "Portugal" },
  { code: "US", name: "USA" },
  { code: "UK", name: "United Kingdom" },
  { code: "DE", name: "Deutschland / Germany" },
  { code: "FR", name: "France" },
  { code: "ES", name: "Espa\u00f1a / Spain" },
  { code: "IT", name: "Italia / Italy" },
  { code: "NL", name: "Nederland / Netherlands" },
  { code: "PL", name: "Polska / Poland" },
  { code: "MX", name: "M\u00e9xico / Mexico" },
  { code: "AR", name: "Argentina" },
  { code: "CO", name: "Colombia" },
  { code: "CL", name: "Chile" },
];

export function getHolidays(country: HolidayCountry, year: number): Holiday[] {
  return HOLIDAY_MAP[country](year);
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
