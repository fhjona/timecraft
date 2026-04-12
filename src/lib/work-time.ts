// Work time calculator with breaks and overtime

export type WorkTimeInput = {
  startTime: string; // HH:MM
  endTime: string; // HH:MM
  breakMinutes: number;
  overtimeThresholdHours: number; // e.g. 7.5 for Norway
};

export type WorkTimeResult = {
  grossMinutes: number;
  breakMinutes: number;
  netMinutes: number;
  netHours: number;
  netFormatted: string; // "7h 30m"
  overtimeMinutes: number;
  overtimeFormatted: string;
  regularMinutes: number;
  regularFormatted: string;
};

function timeToMinutes(t: string): number | null {
  const m = t.match(/^(\d{1,2}):(\d{2})$/);
  if (!m) return null;
  return +m[1] * 60 + +m[2];
}

function formatHM(totalMin: number): string {
  const h = Math.floor(Math.abs(totalMin) / 60);
  const m = Math.abs(totalMin) % 60;
  const sign = totalMin < 0 ? "-" : "";
  if (h === 0) return `${sign}${m}m`;
  if (m === 0) return `${sign}${h}h`;
  return `${sign}${h}h ${m}m`;
}

export function calcWorkTime(input: WorkTimeInput): WorkTimeResult | null {
  const startMin = timeToMinutes(input.startTime);
  const endMin = timeToMinutes(input.endTime);
  if (startMin === null || endMin === null) return null;

  let grossMinutes = endMin - startMin;
  if (grossMinutes < 0) grossMinutes += 24 * 60; // overnight shift

  const netMinutes = Math.max(0, grossMinutes - input.breakMinutes);
  const thresholdMin = input.overtimeThresholdHours * 60;
  const overtimeMinutes = Math.max(0, netMinutes - thresholdMin);
  const regularMinutes = netMinutes - overtimeMinutes;

  return {
    grossMinutes,
    breakMinutes: input.breakMinutes,
    netMinutes,
    netHours: netMinutes / 60,
    netFormatted: formatHM(netMinutes),
    overtimeMinutes,
    overtimeFormatted: formatHM(overtimeMinutes),
    regularMinutes,
    regularFormatted: formatHM(regularMinutes),
  };
}

export type WeekSummary = {
  totalNet: number;
  totalOvertime: number;
  totalNetFormatted: string;
  totalOvertimeFormatted: string;
  days: (WorkTimeResult & { label: string })[];
};

export function calcWeekSummary(
  entries: (WorkTimeInput & { label: string })[],
): WeekSummary {
  const days: (WorkTimeResult & { label: string })[] = [];
  let totalNet = 0;
  let totalOvertime = 0;

  for (const e of entries) {
    const r = calcWorkTime(e);
    if (r) {
      days.push({ ...r, label: e.label });
      totalNet += r.netMinutes;
      totalOvertime += r.overtimeMinutes;
    }
  }

  return {
    totalNet,
    totalOvertime,
    totalNetFormatted: formatHM(totalNet),
    totalOvertimeFormatted: formatHM(totalOvertime),
    days,
  };
}
