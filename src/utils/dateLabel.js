/* Pure-JS date helpers. No external dependencies.
   Uses built-in Intl.DateTimeFormat for Greek labels. */

const WEEKDAY_FMT = new Intl.DateTimeFormat("el-GR", { weekday: "short" });
const DAY_MONTH_FMT = new Intl.DateTimeFormat("el-GR", { day: "numeric", month: "short" });

/**
 * "Σήμερα, 15 Απρ" if today, else "Τρι, 15 Απρ"
 */
export function formatDateLabel(date) {
  const dayMonth = DAY_MONTH_FMT.format(date);
  if (isSameDay(date, new Date())) return `Σήμερα, ${dayMonth}`;
  const weekday = WEEKDAY_FMT.format(date);
  return `${weekday}, ${dayMonth}`;
}

/** Midnight today, local time */
export function startOfToday() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

export function addDays(date, n) {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
}

export function subMonths(date, n) {
  const d = new Date(date);
  d.setMonth(d.getMonth() - n);
  return d;
}

export function isSameDay(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

/** YYYY-MM-DD in LOCAL time (what <input type="date"> expects) */
export function toISODate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** Parse YYYY-MM-DD as a local Date (avoids UTC surprises) */
export function fromISODate(s) {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d);
}
