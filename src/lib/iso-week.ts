import { parseDateInput } from './date-input'

/** Monday that starts the ISO-8601 week containing `date`. */
export function startOfISOWeek(date: Date) {
  const start = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  start.setDate(start.getDate() - ((start.getDay() + 6) % 7))
  return start
}

/** Sunday that ends the ISO-8601 week starting on `weekStart`. */
export function endOfISOWeek(weekStart: Date) {
  const end = new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate())
  end.setDate(end.getDate() + 6)
  return end
}

/** ISO-8601 week-year and week number for a date, e.g. `2026, Week 45`. */
export function getISOWeek(date: Date) {
  const thursday = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  const dayNumber = thursday.getDay() || 7
  thursday.setDate(thursday.getDate() + 4 - dayNumber)
  const weekYear = thursday.getFullYear()
  const yearStart = new Date(weekYear, 0, 1)
  const week = Math.ceil(((thursday.getTime() - yearStart.getTime()) / 86_400_000 + 1) / 7)
  return { weekYear, week }
}

/** Week label shown in the week picker, e.g. `2026, Week 45`. */
export function formatWeekLabel(date: Date) {
  const { weekYear, week } = getISOWeek(date)
  return `${weekYear}, Week ${week}`
}

const WEEK_LABEL_PATTERN = /^(\d{4})\s*,?\s*week\s*(\d{1,2})$/i

/** Monday that starts the given ISO week-year and week number. */
function startOfISOWeekFromWeekNumber(weekYear: number, week: number) {
  // ISO week 1 is the week containing 4 January, so anchor there and step in whole weeks.
  const weekOne = startOfISOWeek(new Date(weekYear, 0, 4))
  const start = new Date(weekOne.getFullYear(), weekOne.getMonth(), weekOne.getDate())
  start.setDate(start.getDate() + (week - 1) * 7)
  return start
}

/**
 * Parses typed text in the week picker. Accepts either the week label it displays
 * (`2026, Week 45`, `2026 week 45`) or any date, which is normalised to the Monday of
 * its ISO week. Returns `undefined` for empty text, impossible dates, week numbers
 * outside 1–53, and week numbers that do not exist in that ISO week-year.
 */
export function parseWeekInput(value: string, locale?: string): Date | undefined {
  const text = value.trim()
  if (!text) return undefined

  const label = WEEK_LABEL_PATTERN.exec(text)
  if (label) {
    const weekYear = Number(label[1])
    const week = Number(label[2])
    if (!Number.isInteger(week) || week < 1 || week > 53) return undefined

    const start = startOfISOWeekFromWeekNumber(weekYear, week)
    return getISOWeek(start).weekYear === weekYear && getISOWeek(start).week === week ? start : undefined
  }

  const date = parseDateInput(text, locale)
  return date ? startOfISOWeek(date) : undefined
}
