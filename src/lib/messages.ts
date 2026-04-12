export type Locale = "en" | "nb" | "pt-BR" | "sv" | "da";

export type UnitKind =
  | "year"
  | "month"
  | "day"
  | "hour"
  | "minute"
  | "second";

export type MessagePack = {
  // General
  pageTitle: string;
  // Nav tabs
  navSpan: string;
  navTimezone: string;
  navAge: string;
  navCountdown: string;
  navBatch: string;
  navHolidays: string;
  // Date span calculator
  title: string;
  lede: string;
  langLabel: string;
  legend: string;
  labelStart: string;
  labelEnd: string;
  btnCalc: string;
  btnSwap: string;
  resultHeading: string;
  placeholder: string;
  errNeedBoth: string;
  dirForward: string;
  dirBackward: string;
  statCalendar: string;
  statDaysDec: string;
  statHours: string;
  statMinutes: string;
  statSeconds: string;
  sameMoment: string;
  // Timezone
  tzTitle: string;
  tzLede: string;
  tzFrom: string;
  tzTo: string;
  tzDateTime: string;
  tzConvert: string;
  tzResult: string;
  tzOffset: string;
  tzDifference: string;
  tzSwap: string;
  tzSearchPlaceholder: string;
  // Age
  ageTitle: string;
  ageLede: string;
  ageBirthdate: string;
  ageCalc: string;
  ageYou: string;
  ageExact: string;
  ageLived: string;
  ageDays: string;
  ageHours: string;
  ageMinutes: string;
  ageSeconds: string;
  ageMilestones: string;
  ageMilestoneIn: string;
  ageMilestonePassed: string;
  ageNextBirthday: string;
  ageDaysUntil: string;
  // Countdown
  cdTitle: string;
  cdLede: string;
  cdName: string;
  cdNamePlaceholder: string;
  cdTargetDate: string;
  cdAdd: string;
  cdNoItems: string;
  cdDelete: string;
  cdDaysLeft: string;
  cdDaysAgo: string;
  cdToday: string;
  cdHoursShort: string;
  cdMinShort: string;
  cdSecShort: string;
  // Batch
  batchTitle: string;
  batchLede: string;
  batchBaseDate: string;
  batchAddOffset: string;
  batchRemove: string;
  batchCalc: string;
  batchOffsetLabel: string;
  batchResult: string;
  batchDays: string;
  batchWeeks: string;
  batchMonths: string;
  batchYears: string;
  batchResultDate: string;
  batchOffset: string;
  // Holidays
  holTitle: string;
  holLede: string;
  holCountry: string;
  holCountryNO: string;
  holCountryBR: string;
  holYear: string;
  holFrom: string;
  holTo: string;
  holCalc: string;
  holTotalDays: string;
  holWeekends: string;
  holHolidays: string;
  holBusinessDays: string;
  holHolidayList: string;
  holNoHolidays: string;
  // Units
  units: Record<UnitKind, [string, string]>;
};

export const SUPPORTED: Locale[] = ["en", "nb", "pt-BR", "sv", "da"];

export const MESSAGES: Record<Locale, MessagePack> = {
  en: {
    pageTitle: "Date & time span",
    navSpan: "Date span",
    navTimezone: "Timezones",
    navAge: "Age",
    navCountdown: "Countdown",
    navBatch: "Batch",
    navHolidays: "Holidays",
    title: "Date & time span",
    lede: "Pick a start and end moment. See the gap in calendar units and as a precise duration.",
    langLabel: "Language",
    legend: "Range",
    labelStart: "From",
    labelEnd: "To",
    btnCalc: "Calculate",
    btnSwap: "Swap dates",
    resultHeading: "Result",
    placeholder: "Set both dates and press Calculate.",
    errNeedBoth: "Please choose both date and time.",
    dirForward: "From \u2192 To (forward in time)",
    dirBackward: "To is before From \u2014 showing absolute span",
    statCalendar: "Calendar-style",
    statDaysDec: "Total days (decimal)",
    statHours: "Total hours",
    statMinutes: "Total minutes",
    statSeconds: "Total seconds",
    sameMoment: "Same moment",
    tzTitle: "Timezone converter",
    tzLede: "Convert date & time between timezones. DST is handled automatically.",
    tzFrom: "From timezone",
    tzTo: "To timezone",
    tzDateTime: "Date & time",
    tzConvert: "Convert",
    tzResult: "Converted time",
    tzOffset: "UTC offset",
    tzDifference: "Time difference",
    tzSwap: "Swap",
    tzSearchPlaceholder: "Search timezone\u2026",
    ageTitle: "Age calculator",
    ageLede: "Enter your birthdate to see your exact age and upcoming milestones.",
    ageBirthdate: "Birthdate",
    ageCalc: "Calculate",
    ageYou: "You are",
    ageExact: "Exact age",
    ageLived: "You have lived",
    ageDays: "days",
    ageHours: "hours",
    ageMinutes: "minutes",
    ageSeconds: "seconds",
    ageMilestones: "Milestones",
    ageMilestoneIn: "in",
    ageMilestonePassed: "passed",
    ageNextBirthday: "Next birthday",
    ageDaysUntil: "days left",
    cdTitle: "Countdown",
    cdLede: "Save countdowns to important dates and watch them tick live.",
    cdName: "Name",
    cdNamePlaceholder: "e.g. Vacation, birthday\u2026",
    cdTargetDate: "Target date",
    cdAdd: "Add countdown",
    cdNoItems: "No countdowns yet. Add one above!",
    cdDelete: "Delete",
    cdDaysLeft: "days left",
    cdDaysAgo: "days ago",
    cdToday: "Today!",
    cdHoursShort: "h",
    cdMinShort: "m",
    cdSecShort: "s",
    batchTitle: "Batch calculation",
    batchLede: "Calculate multiple date offsets from a single base date.",
    batchBaseDate: "Base date",
    batchAddOffset: "Add offset",
    batchRemove: "Remove",
    batchCalc: "Calculate all",
    batchOffsetLabel: "Offset",
    batchResult: "Results",
    batchDays: "days",
    batchWeeks: "weeks",
    batchMonths: "months",
    batchYears: "years",
    batchResultDate: "Result date",
    batchOffset: "Offset",
    holTitle: "Holidays & business days",
    holLede: "Calculate business days excluding weekends and public holidays.",
    holCountry: "Country",
    holCountryNO: "Norway",
    holCountryBR: "Brazil",
    holYear: "Year",
    holFrom: "From",
    holTo: "To",
    holCalc: "Calculate",
    holTotalDays: "Total days",
    holWeekends: "Weekend days",
    holHolidays: "Public holidays",
    holBusinessDays: "Business days",
    holHolidayList: "Holidays in range",
    holNoHolidays: "No holidays in this range.",
    units: {
      year: ["year", "years"],
      month: ["month", "months"],
      day: ["day", "days"],
      hour: ["hour", "hours"],
      minute: ["minute", "minutes"],
      second: ["second", "seconds"],
    },
  },
  nb: {
    pageTitle: "Dato- og tidsintervall",
    navSpan: "Datoberegner",
    navTimezone: "Tidssoner",
    navAge: "Alder",
    navCountdown: "Nedtelling",
    navBatch: "Batch",
    navHolidays: "Helligdager",
    title: "Dato- og tidsintervall",
    lede: "Velg start og slutt. Se avstanden i kalenderenheter og som n\u00f8yaktig varighet.",
    langLabel: "Spr\u00e5k",
    legend: "Periode",
    labelStart: "Fra",
    labelEnd: "Til",
    btnCalc: "Beregn",
    btnSwap: "Bytt datoer",
    resultHeading: "Resultat",
    placeholder: "Angi begge datoene og trykk Beregn.",
    errNeedBoth: "Velg b\u00e5de dato og klokkeslett.",
    dirForward: "Fra \u2192 Til (fremover i tid)",
    dirBackward: "Til er f\u00f8r Fra \u2014 viser absolutt intervall",
    statCalendar: "Som kalender",
    statDaysDec: "Totalt dager (desimal)",
    statHours: "Timer totalt",
    statMinutes: "Minutter totalt",
    statSeconds: "Sekunder totalt",
    sameMoment: "Samme tidspunkt",
    tzTitle: "Tidssonekonvertering",
    tzLede: "Konverter dato og tid mellom tidssoner. Sommer-/vintertid h\u00e5ndteres automatisk.",
    tzFrom: "Fra tidssone",
    tzTo: "Til tidssone",
    tzDateTime: "Dato og tid",
    tzConvert: "Konverter",
    tzResult: "Konvertert tid",
    tzOffset: "UTC-forskyvning",
    tzDifference: "Tidsforskjell",
    tzSwap: "Bytt",
    tzSearchPlaceholder: "S\u00f8k tidssone\u2026",
    ageTitle: "Alderskalkulator",
    ageLede: "Skriv inn f\u00f8dselsdato for \u00e5 se n\u00f8yaktig alder og kommende milepæler.",
    ageBirthdate: "F\u00f8dselsdato",
    ageCalc: "Beregn",
    ageYou: "Du er",
    ageExact: "N\u00f8yaktig alder",
    ageLived: "Du har levd",
    ageDays: "dager",
    ageHours: "timer",
    ageMinutes: "minutter",
    ageSeconds: "sekunder",
    ageMilestones: "Milep\u00e6ler",
    ageMilestoneIn: "om",
    ageMilestonePassed: "passert",
    ageNextBirthday: "Neste bursdag",
    ageDaysUntil: "dager igjen",
    cdTitle: "Nedtelling",
    cdLede: "Lagre nedtellinger til viktige datoer og se dem tikke i sanntid.",
    cdName: "Navn",
    cdNamePlaceholder: "f.eks. Ferie, bursdag\u2026",
    cdTargetDate: "M\u00e5ldato",
    cdAdd: "Legg til nedtelling",
    cdNoItems: "Ingen nedtellinger enn\u00e5. Legg til en ovenfor!",
    cdDelete: "Slett",
    cdDaysLeft: "dager igjen",
    cdDaysAgo: "dager siden",
    cdToday: "I dag!",
    cdHoursShort: "t",
    cdMinShort: "m",
    cdSecShort: "s",
    batchTitle: "Batch-beregning",
    batchLede: "Beregn flere datoforskyvninger fra \u00e9n basisdato.",
    batchBaseDate: "Basisdato",
    batchAddOffset: "Legg til forskyvning",
    batchRemove: "Fjern",
    batchCalc: "Beregn alle",
    batchOffsetLabel: "Forskyvning",
    batchResult: "Resultater",
    batchDays: "dager",
    batchWeeks: "uker",
    batchMonths: "m\u00e5neder",
    batchYears: "\u00e5r",
    batchResultDate: "Resultatdato",
    batchOffset: "Forskyvning",
    holTitle: "Helligdager og virkedager",
    holLede: "Beregn virkedager uten helger og helligdager.",
    holCountry: "Land",
    holCountryNO: "Norge",
    holCountryBR: "Brasil",
    holYear: "\u00c5r",
    holFrom: "Fra",
    holTo: "Til",
    holCalc: "Beregn",
    holTotalDays: "Totalt dager",
    holWeekends: "Helgedager",
    holHolidays: "Helligdager",
    holBusinessDays: "Virkedager",
    holHolidayList: "Helligdager i perioden",
    holNoHolidays: "Ingen helligdager i denne perioden.",
    units: {
      year: ["\u00e5r", "\u00e5r"],
      month: ["m\u00e5ned", "m\u00e5neder"],
      day: ["dag", "dager"],
      hour: ["time", "timer"],
      minute: ["minutt", "minutter"],
      second: ["sekund", "sekunder"],
    },
  },
  "pt-BR": {
    pageTitle: "Intervalo de data e hora",
    navSpan: "Intervalo",
    navTimezone: "Fusos",
    navAge: "Idade",
    navCountdown: "Contagem",
    navBatch: "Lote",
    navHolidays: "Feriados",
    title: "Intervalo de data e hora",
    lede: "Escolha in\u00edcio e fim. Veja o intervalo em unidades de calend\u00e1rio e como dura\u00e7\u00e3o exata.",
    langLabel: "Idioma",
    legend: "Intervalo",
    labelStart: "De",
    labelEnd: "At\u00e9",
    btnCalc: "Calcular",
    btnSwap: "Inverter datas",
    resultHeading: "Resultado",
    placeholder: "Defina ambas as datas e pressione Calcular.",
    errNeedBoth: "Escolha data e hora nos dois campos.",
    dirForward: "De \u2192 At\u00e9 (avan\u00e7o no tempo)",
    dirBackward: "At\u00e9 \u00e9 antes de De \u2014 intervalo absoluto",
    statCalendar: "Estilo calend\u00e1rio",
    statDaysDec: "Dias totais (decimal)",
    statHours: "Horas totais",
    statMinutes: "Minutos totais",
    statSeconds: "Segundos totais",
    sameMoment: "Mesmo instante",
    tzTitle: "Conversor de fuso hor\u00e1rio",
    tzLede: "Converta data e hora entre fusos hor\u00e1rios. Hor\u00e1rio de ver\u00e3o \u00e9 tratado automaticamente.",
    tzFrom: "Fuso de origem",
    tzTo: "Fuso de destino",
    tzDateTime: "Data e hora",
    tzConvert: "Converter",
    tzResult: "Hora convertida",
    tzOffset: "Deslocamento UTC",
    tzDifference: "Diferen\u00e7a de hor\u00e1rio",
    tzSwap: "Inverter",
    tzSearchPlaceholder: "Buscar fuso\u2026",
    ageTitle: "Calculadora de idade",
    ageLede: "Insira sua data de nascimento para ver sua idade exata e marcos futuros.",
    ageBirthdate: "Data de nascimento",
    ageCalc: "Calcular",
    ageYou: "Voc\u00ea tem",
    ageExact: "Idade exata",
    ageLived: "Voc\u00ea viveu",
    ageDays: "dias",
    ageHours: "horas",
    ageMinutes: "minutos",
    ageSeconds: "segundos",
    ageMilestones: "Marcos",
    ageMilestoneIn: "em",
    ageMilestonePassed: "passado",
    ageNextBirthday: "Pr\u00f3ximo anivers\u00e1rio",
    ageDaysUntil: "dias restantes",
    cdTitle: "Contagem regressiva",
    cdLede: "Salve contagens regressivas para datas importantes e acompanhe em tempo real.",
    cdName: "Nome",
    cdNamePlaceholder: "ex. F\u00e9rias, anivers\u00e1rio\u2026",
    cdTargetDate: "Data alvo",
    cdAdd: "Adicionar contagem",
    cdNoItems: "Nenhuma contagem ainda. Adicione uma acima!",
    cdDelete: "Excluir",
    cdDaysLeft: "dias restantes",
    cdDaysAgo: "dias atr\u00e1s",
    cdToday: "Hoje!",
    cdHoursShort: "h",
    cdMinShort: "m",
    cdSecShort: "s",
    batchTitle: "C\u00e1lculo em lote",
    batchLede: "Calcule m\u00faltiplos deslocamentos de data a partir de uma data base.",
    batchBaseDate: "Data base",
    batchAddOffset: "Adicionar deslocamento",
    batchRemove: "Remover",
    batchCalc: "Calcular todos",
    batchOffsetLabel: "Deslocamento",
    batchResult: "Resultados",
    batchDays: "dias",
    batchWeeks: "semanas",
    batchMonths: "meses",
    batchYears: "anos",
    batchResultDate: "Data resultado",
    batchOffset: "Deslocamento",
    holTitle: "Feriados e dias \u00fateis",
    holLede: "Calcule dias \u00fateis excluindo fins de semana e feriados.",
    holCountry: "Pa\u00eds",
    holCountryNO: "Noruega",
    holCountryBR: "Brasil",
    holYear: "Ano",
    holFrom: "De",
    holTo: "At\u00e9",
    holCalc: "Calcular",
    holTotalDays: "Dias totais",
    holWeekends: "Dias de fim de semana",
    holHolidays: "Feriados",
    holBusinessDays: "Dias \u00fateis",
    holHolidayList: "Feriados no per\u00edodo",
    holNoHolidays: "Nenhum feriado neste per\u00edodo.",
    units: {
      year: ["ano", "anos"],
      month: ["m\u00eas", "meses"],
      day: ["dia", "dias"],
      hour: ["hora", "horas"],
      minute: ["minuto", "minutos"],
      second: ["segundo", "segundos"],
    },
  },
  sv: {
    pageTitle: "Datum- och tidsintervall",
    navSpan: "Datumber\u00e4knare",
    navTimezone: "Tidszoner",
    navAge: "\u00c5lder",
    navCountdown: "Nedr\u00e4kning",
    navBatch: "Batch",
    navHolidays: "Helgdagar",
    title: "Datum- och tidsintervall",
    lede: "V\u00e4lj start och slut. Se skillnaden i kalendernheter och som exakt varaktighet.",
    langLabel: "Spr\u00e5k",
    legend: "Intervall",
    labelStart: "Fr\u00e5n",
    labelEnd: "Till",
    btnCalc: "Ber\u00e4kna",
    btnSwap: "Byt datum",
    resultHeading: "Resultat",
    placeholder: "Ange b\u00e5da datum och tryck Ber\u00e4kna.",
    errNeedBoth: "V\u00e4lj b\u00e5de datum och tid.",
    dirForward: "Fr\u00e5n \u2192 Till (fram\u00e5t i tiden)",
    dirBackward: "Till \u00e4r f\u00f6re Fr\u00e5n \u2014 visar absolut intervall",
    statCalendar: "Kalenderstil",
    statDaysDec: "Totalt dagar (decimal)",
    statHours: "Timmar totalt",
    statMinutes: "Minuter totalt",
    statSeconds: "Sekunder totalt",
    sameMoment: "Samma \u00f6gonblick",
    tzTitle: "Tidszonkonverterare",
    tzLede: "Konvertera datum och tid mellan tidszoner. Sommar-/vintertid hanteras automatiskt.",
    tzFrom: "Fr\u00e5n tidszon",
    tzTo: "Till tidszon",
    tzDateTime: "Datum och tid",
    tzConvert: "Konvertera",
    tzResult: "Konverterad tid",
    tzOffset: "UTC-offset",
    tzDifference: "Tidsskillnad",
    tzSwap: "Byt",
    tzSearchPlaceholder: "S\u00f6k tidszon\u2026",
    ageTitle: "Ber\u00e4kna \u00e5lder",
    ageLede: "Ange f\u00f6delsedatum f\u00f6r att se din exakta \u00e5lder och kommande milstolpar.",
    ageBirthdate: "F\u00f6delsedatum",
    ageCalc: "Ber\u00e4kna",
    ageYou: "Du \u00e4r",
    ageExact: "Exakt \u00e5lder",
    ageLived: "Du har levt",
    ageDays: "dagar",
    ageHours: "timmar",
    ageMinutes: "minuter",
    ageSeconds: "sekunder",
    ageMilestones: "Milstolpar",
    ageMilestoneIn: "om",
    ageMilestonePassed: "passerad",
    ageNextBirthday: "N\u00e4sta f\u00f6delsedag",
    ageDaysUntil: "dagar kvar",
    cdTitle: "Nedr\u00e4kning",
    cdLede: "Spara nedr\u00e4kningar till viktiga datum och se dem ticka i realtid.",
    cdName: "Namn",
    cdNamePlaceholder: "t.ex. Semester, f\u00f6delsedag\u2026",
    cdTargetDate: "M\u00e5ldatum",
    cdAdd: "L\u00e4gg till nedr\u00e4kning",
    cdNoItems: "Inga nedr\u00e4kningar \u00e4n. L\u00e4gg till en ovan!",
    cdDelete: "Ta bort",
    cdDaysLeft: "dagar kvar",
    cdDaysAgo: "dagar sedan",
    cdToday: "Idag!",
    cdHoursShort: "t",
    cdMinShort: "m",
    cdSecShort: "s",
    batchTitle: "Batchber\u00e4kning",
    batchLede: "Ber\u00e4kna flera datumf\u00f6rskjutningar fr\u00e5n ett basdatum.",
    batchBaseDate: "Basdatum",
    batchAddOffset: "L\u00e4gg till f\u00f6rskjutning",
    batchRemove: "Ta bort",
    batchCalc: "Ber\u00e4kna alla",
    batchOffsetLabel: "F\u00f6rskjutning",
    batchResult: "Resultat",
    batchDays: "dagar",
    batchWeeks: "veckor",
    batchMonths: "m\u00e5nader",
    batchYears: "\u00e5r",
    batchResultDate: "Resultatdatum",
    batchOffset: "F\u00f6rskjutning",
    holTitle: "Helgdagar och arbetsdagar",
    holLede: "Ber\u00e4kna arbetsdagar exklusive helger och helgdagar.",
    holCountry: "Land",
    holCountryNO: "Norge",
    holCountryBR: "Brasilien",
    holYear: "\u00c5r",
    holFrom: "Fr\u00e5n",
    holTo: "Till",
    holCalc: "Ber\u00e4kna",
    holTotalDays: "Totalt dagar",
    holWeekends: "Helgdagar",
    holHolidays: "Allm\u00e4nna helgdagar",
    holBusinessDays: "Arbetsdagar",
    holHolidayList: "Helgdagar i perioden",
    holNoHolidays: "Inga helgdagar i denna period.",
    units: {
      year: ["\u00e5r", "\u00e5r"],
      month: ["m\u00e5nad", "m\u00e5nader"],
      day: ["dag", "dagar"],
      hour: ["timme", "timmar"],
      minute: ["minut", "minuter"],
      second: ["sekund", "sekunder"],
    },
  },
  da: {
    pageTitle: "Dato- og tidsinterval",
    navSpan: "Datoberegner",
    navTimezone: "Tidszoner",
    navAge: "Alder",
    navCountdown: "Nedt\u00e6lling",
    navBatch: "Batch",
    navHolidays: "Helligdage",
    title: "Dato- og tidsinterval",
    lede: "V\u00e6lg start og slut. Se afstanden i kalenderenheder og som pr\u00e6cis varighed.",
    langLabel: "Sprog",
    legend: "Interval",
    labelStart: "Fra",
    labelEnd: "Til",
    btnCalc: "Beregn",
    btnSwap: "Byt datoer",
    resultHeading: "Resultat",
    placeholder: "Angiv begge datoer og tryk Beregn.",
    errNeedBoth: "V\u00e6lg b\u00e5de dato og klokkesl\u00e6t.",
    dirForward: "Fra \u2192 Til (fremad i tid)",
    dirBackward: "Til er f\u00f8r Fra \u2014 viser absolut interval",
    statCalendar: "Som kalender",
    statDaysDec: "Dage i alt (decimal)",
    statHours: "Timer i alt",
    statMinutes: "Minutter i alt",
    statSeconds: "Sekunder i alt",
    sameMoment: "Samme tidspunkt",
    tzTitle: "Tidszonekonvertering",
    tzLede: "Konverter dato og tid mellem tidszoner. Sommer-/vintertid h\u00e5ndteres automatisk.",
    tzFrom: "Fra tidszone",
    tzTo: "Til tidszone",
    tzDateTime: "Dato og tid",
    tzConvert: "Konverter",
    tzResult: "Konverteret tid",
    tzOffset: "UTC-forskydning",
    tzDifference: "Tidsforskel",
    tzSwap: "Byt",
    tzSearchPlaceholder: "S\u00f8g tidszone\u2026",
    ageTitle: "Aldersberegner",
    ageLede: "Indtast f\u00f8dselsdato for at se din pr\u00e6cise alder og kommende milep\u00e6le.",
    ageBirthdate: "F\u00f8dselsdato",
    ageCalc: "Beregn",
    ageYou: "Du er",
    ageExact: "Pr\u00e6cis alder",
    ageLived: "Du har levet",
    ageDays: "dage",
    ageHours: "timer",
    ageMinutes: "minutter",
    ageSeconds: "sekunder",
    ageMilestones: "Milep\u00e6le",
    ageMilestoneIn: "om",
    ageMilestonePassed: "passeret",
    ageNextBirthday: "N\u00e6ste f\u00f8dselsdag",
    ageDaysUntil: "dage tilbage",
    cdTitle: "Nedt\u00e6lling",
    cdLede: "Gem nedt\u00e6llinger til vigtige datoer og se dem tikke i realtid.",
    cdName: "Navn",
    cdNamePlaceholder: "f.eks. Ferie, f\u00f8dselsdag\u2026",
    cdTargetDate: "M\u00e5ldato",
    cdAdd: "Tilf\u00f8j nedt\u00e6lling",
    cdNoItems: "Ingen nedt\u00e6llinger endnu. Tilf\u00f8j en ovenfor!",
    cdDelete: "Slet",
    cdDaysLeft: "dage tilbage",
    cdDaysAgo: "dage siden",
    cdToday: "I dag!",
    cdHoursShort: "t",
    cdMinShort: "m",
    cdSecShort: "s",
    batchTitle: "Batchberegning",
    batchLede: "Beregn flere datoforskydninger fra \u00e9n basisdato.",
    batchBaseDate: "Basisdato",
    batchAddOffset: "Tilf\u00f8j forskydning",
    batchRemove: "Fjern",
    batchCalc: "Beregn alle",
    batchOffsetLabel: "Forskydning",
    batchResult: "Resultater",
    batchDays: "dage",
    batchWeeks: "uger",
    batchMonths: "m\u00e5neder",
    batchYears: "\u00e5r",
    batchResultDate: "Resultatdato",
    batchOffset: "Forskydning",
    holTitle: "Helligdage og hverdage",
    holLede: "Beregn hverdage uden weekender og helligdage.",
    holCountry: "Land",
    holCountryNO: "Norge",
    holCountryBR: "Brasilien",
    holYear: "\u00c5r",
    holFrom: "Fra",
    holTo: "Til",
    holCalc: "Beregn",
    holTotalDays: "Dage i alt",
    holWeekends: "Weekenddage",
    holHolidays: "Helligdage",
    holBusinessDays: "Hverdage",
    holHolidayList: "Helligdage i perioden",
    holNoHolidays: "Ingen helligdage i denne periode.",
    units: {
      year: ["\u00e5r", "\u00e5r"],
      month: ["m\u00e5ned", "m\u00e5neder"],
      day: ["dag", "dage"],
      hour: ["time", "timer"],
      minute: ["minut", "minutter"],
      second: ["sekund", "sekunder"],
    },
  },
};

export type MessageKey = Exclude<keyof MessagePack, "units">;

export function msg(locale: Locale, key: MessageKey): string {
  const pack = MESSAGES[locale];
  const v = pack[key];
  if (typeof v === "string") return v;
  return MESSAGES.en[key] as string;
}
