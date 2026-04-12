export type Locale = "en" | "nb" | "pt-BR" | "sv" | "da";

export type UnitKind =
  | "year"
  | "month"
  | "day"
  | "hour"
  | "minute"
  | "second";

export type MessagePack = {
  pageTitle: string;
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
  units: Record<UnitKind, [string, string]>;
};

export const SUPPORTED: Locale[] = ["en", "nb", "pt-BR", "sv", "da"];

export const MESSAGES: Record<Locale, MessagePack> = {
  en: {
    pageTitle: "Date & time span",
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
    dirForward: "From → To (forward in time)",
    dirBackward: "To is before From — showing absolute span",
    statCalendar: "Calendar-style",
    statDaysDec: "Total days (decimal)",
    statHours: "Total hours",
    statMinutes: "Total minutes",
    statSeconds: "Total seconds",
    sameMoment: "Same moment",
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
    title: "Dato- og tidsintervall",
    lede: "Velg start og slutt. Se avstanden i kalenderenheter og som nøyaktig varighet.",
    langLabel: "Språk",
    legend: "Periode",
    labelStart: "Fra",
    labelEnd: "Til",
    btnCalc: "Beregn",
    btnSwap: "Bytt datoer",
    resultHeading: "Resultat",
    placeholder: "Angi begge datoene og trykk Beregn.",
    errNeedBoth: "Velg både dato og klokkeslett.",
    dirForward: "Fra → Til (fremover i tid)",
    dirBackward: "Til er før Fra — viser absolutt intervall",
    statCalendar: "Som kalender",
    statDaysDec: "Totalt dager (desimal)",
    statHours: "Timer totalt",
    statMinutes: "Minutter totalt",
    statSeconds: "Sekunder totalt",
    sameMoment: "Samme tidspunkt",
    units: {
      year: ["år", "år"],
      month: ["måned", "måneder"],
      day: ["dag", "dager"],
      hour: ["time", "timer"],
      minute: ["minutt", "minutter"],
      second: ["sekund", "sekunder"],
    },
  },
  "pt-BR": {
    pageTitle: "Intervalo de data e hora",
    title: "Intervalo de data e hora",
    lede: "Escolha início e fim. Veja o intervalo em unidades de calendário e como duração exata.",
    langLabel: "Idioma",
    legend: "Intervalo",
    labelStart: "De",
    labelEnd: "Até",
    btnCalc: "Calcular",
    btnSwap: "Inverter datas",
    resultHeading: "Resultado",
    placeholder: "Defina ambas as datas e pressione Calcular.",
    errNeedBoth: "Escolha data e hora nos dois campos.",
    dirForward: "De → Até (avanço no tempo)",
    dirBackward: "Até é antes de De — intervalo absoluto",
    statCalendar: "Estilo calendário",
    statDaysDec: "Dias totais (decimal)",
    statHours: "Horas totais",
    statMinutes: "Minutos totais",
    statSeconds: "Segundos totais",
    sameMoment: "Mesmo instante",
    units: {
      year: ["ano", "anos"],
      month: ["mês", "meses"],
      day: ["dia", "dias"],
      hour: ["hora", "horas"],
      minute: ["minuto", "minutos"],
      second: ["segundo", "segundos"],
    },
  },
  sv: {
    pageTitle: "Datum- och tidsintervall",
    title: "Datum- och tidsintervall",
    lede: "Välj start och slut. Se skillnaden i kalendernheter och som exakt varaktighet.",
    langLabel: "Språk",
    legend: "Intervall",
    labelStart: "Från",
    labelEnd: "Till",
    btnCalc: "Beräkna",
    btnSwap: "Byt datum",
    resultHeading: "Resultat",
    placeholder: "Ange båda datum och tryck Beräkna.",
    errNeedBoth: "Välj både datum och tid.",
    dirForward: "Från → Till (framåt i tiden)",
    dirBackward: "Till är före Från — visar absolut intervall",
    statCalendar: "Kalenderstil",
    statDaysDec: "Totalt dagar (decimal)",
    statHours: "Timmar totalt",
    statMinutes: "Minuter totalt",
    statSeconds: "Sekunder totalt",
    sameMoment: "Samma ögonblick",
    units: {
      year: ["år", "år"],
      month: ["månad", "månader"],
      day: ["dag", "dagar"],
      hour: ["timme", "timmar"],
      minute: ["minut", "minuter"],
      second: ["sekund", "sekunder"],
    },
  },
  da: {
    pageTitle: "Dato- og tidsinterval",
    title: "Dato- og tidsinterval",
    lede: "Vælg start og slut. Se afstanden i kalenderenheder og som præcis varighed.",
    langLabel: "Sprog",
    legend: "Interval",
    labelStart: "Fra",
    labelEnd: "Til",
    btnCalc: "Beregn",
    btnSwap: "Byt datoer",
    resultHeading: "Resultat",
    placeholder: "Angiv begge datoer og tryk Beregn.",
    errNeedBoth: "Vælg både dato og klokkeslæt.",
    dirForward: "Fra → Til (fremad i tid)",
    dirBackward: "Til er før Fra — viser absolut interval",
    statCalendar: "Som kalender",
    statDaysDec: "Dage i alt (decimal)",
    statHours: "Timer i alt",
    statMinutes: "Minutter i alt",
    statSeconds: "Sekunder i alt",
    sameMoment: "Samme tidspunkt",
    units: {
      year: ["år", "år"],
      month: ["måned", "måneder"],
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
