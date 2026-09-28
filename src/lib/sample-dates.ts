/**
 * Date helpers for the illustrative mockups.
 *
 * Sample screens that show a calendar or a date strip are built relative to
 * the visitor's today (see useToday), so they never go stale. The labels are
 * assembled from fixed English names rather than Intl, so the output does not
 * vary with the visitor's browser locale.
 */

const WEEKDAYS_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/** Keeps an empty label's line box, so date-neutral output does not shift. */
export const BLANK = " ";

export function addDays(date: Date, days: number): Date {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

/** The Monday on or before `date`. */
export function startOfWeek(date: Date): Date {
  return addDays(date, -((date.getDay() + 6) % 7));
}

/** "September 2026" */
export function monthLabel(date: Date): string {
  return `${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
}

/** "Mon" */
export function weekdayLabel(date: Date): string {
  return WEEKDAYS_SHORT[date.getDay()];
}

/** "Wed 14 May" */
export function shortDateLabel(date: Date): string {
  return `${weekdayLabel(date)} ${date.getDate()} ${MONTHS[date.getMonth()].slice(0, 3)}`;
}
