import type { MonthDay } from '~/types'

export const SITE_TIME_ZONE = 'America/Sao_Paulo'

/** Calendar date of an instant in a given time zone. */
export function dateInTimeZone(now: Date, timeZone = SITE_TIME_ZONE) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(now)
  const get = (type: Intl.DateTimeFormatPartTypes) => Number(parts.find((part) => part.type === type)?.value)
  return { year: get('year'), month: get('month'), day: get('day') }
}

/** Whole days until the next 25 December (0 on Christmas day). */
export function daysUntilChristmas(now: Date, timeZone = SITE_TIME_ZONE): number {
  const { year, month, day } = dateInTimeZone(now, timeZone)
  const today = Date.UTC(year, month - 1, day)
  let christmas = Date.UTC(year, 11, 25)
  if (today > christmas) christmas = Date.UTC(year + 1, 11, 25)
  return Math.round((christmas - today) / 86_400_000)
}

/** True while today (in the site's time zone) falls inside the window, inclusive. */
export function isChristmasSeason(
  now: Date,
  window: { start: MonthDay; end: MonthDay },
  timeZone = SITE_TIME_ZONE,
): boolean {
  const { month, day } = dateInTimeZone(now, timeZone)
  const today = month * 100 + day
  return today >= window.start.month * 100 + window.start.day && today <= window.end.month * 100 + window.end.day
}

/** YYYY-MM-DD for today in the site's time zone (for <input type="date" min>). */
export function todayISO(now: Date, timeZone = SITE_TIME_ZONE): string {
  const { year, month, day } = dateInTimeZone(now, timeZone)
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}
