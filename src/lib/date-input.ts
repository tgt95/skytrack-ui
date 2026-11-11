type DatePartOrder = 'day' | 'month' | 'year'

const ISO_PATTERN = /^(\d{4})-(\d{1,2})-(\d{1,2})$/
const NUMERIC_PATTERN = /^\d{1,4}[/.-]\d{1,2}[/.-]\d{1,4}$/
const MONTH_NAME_PATTERN = /[a-z]{3,}/i
const FOUR_DIGIT_YEAR_PATTERN = /\d{4}/

function createLocalDate(year: number, month: number, day: number): Date | undefined {
  if (!Number.isInteger(year) || !Number.isInteger(month) || !Number.isInteger(day)) return undefined
  if (month < 1 || month > 12 || day < 1 || day > 31) return undefined

  const date = new Date(0)
  date.setFullYear(year, month - 1, day)
  date.setHours(0, 0, 0, 0)

  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) return undefined
  return date
}

function normalizeYear(year: number): number {
  if (year >= 100) return year
  return year <= 68 ? 2000 + year : 1900 + year
}

/**
 * Reads the day/month/year order a locale uses for numeric dates, so typed dates such as
 * `03/04/2026` are interpreted the same way the locale displays them.
 */
export function getNumericDatePartOrder(locale?: string): DatePartOrder[] {
  const parts = new Intl.DateTimeFormat(locale, { year: 'numeric', month: 'numeric', day: 'numeric' })
    .formatToParts(new Date(2001, 1, 3))
    .map((part) => part.type)
    .filter((type): type is DatePartOrder => type === 'day' || type === 'month' || type === 'year')

  return parts.length === 3 ? parts : ['day', 'month', 'year']
}

function parseNumericDate(text: string, order: DatePartOrder[]): Date | undefined {
  if (!NUMERIC_PATTERN.test(text)) return undefined

  const [first, second, third] = text.split(/[/.-]/)
  let year: number
  let firstValue: number
  let secondValue: number

  if (first.length === 4) {
    year = Number(first)
    firstValue = Number(second)
    secondValue = Number(third)
  } else {
    year = normalizeYear(Number(third))
    firstValue = Number(first)
    secondValue = Number(second)
  }

  const [dayOrder] = order.filter((part) => part !== 'year')
  let day = dayOrder === 'day' ? firstValue : secondValue
  let month = dayOrder === 'day' ? secondValue : firstValue

  // An unambiguous value overrides the locale order: 25/12 and 12/25 both read clearly.
  if (firstValue > 12 && secondValue <= 12) {
    day = firstValue
    month = secondValue
  } else if (secondValue > 12 && firstValue <= 12) {
    day = secondValue
    month = firstValue
  }

  return createLocalDate(year, month, day)
}

function getMonthNames(locale?: string): string[][] {
  return Array.from({ length: 12 }, (_, month) => {
    const date = new Date(2001, month, 1)
    const long = new Intl.DateTimeFormat(locale, { month: 'long' }).format(date)
    const short = new Intl.DateTimeFormat(locale, { month: 'short' }).format(date)
    return [long, short]
  })
}

function normalizeMonthName(name: string) {
  return name.replace(/\./g, '').trim().toLowerCase()
}

function parseMonthNameDate(text: string, locale?: string): Date | undefined {
  if (!MONTH_NAME_PATTERN.test(text) || !FOUR_DIGIT_YEAR_PATTERN.test(text)) return undefined

  const dayFirst = /^(\d{1,2})\s+([A-Za-z]+)\.?,?\s+(\d{4})$/.exec(text)
  const monthFirst = /^([A-Za-z]+)\.?\s+(\d{1,2}),?\s+(\d{4})$/.exec(text)
  if (!dayFirst && !monthFirst) return undefined

  const day = Number(dayFirst?.[1] ?? monthFirst?.[2])
  const monthName = dayFirst?.[2] ?? monthFirst?.[1] ?? ''
  const year = Number(dayFirst?.[3] ?? monthFirst?.[3])
  const normalizedName = normalizeMonthName(monthName)
  const monthIndex = getMonthNames(locale).findIndex((names) =>
    names.some((name) => normalizeMonthName(name) === normalizedName)
  )

  if (monthIndex === -1) return undefined
  return createLocalDate(year, monthIndex + 1, day)
}

/**
 * Parses a date typed into a Date Picker field. Accepts ISO (`2026-11-11`), numeric dates in
 * either the locale order or an unambiguous day-first/month-first order (`11/11/2026`,
 * `11-11-2026`, `11.11.2026`), and month-name dates (`11 Nov 2026`, `Nov 11, 2026`).
 * Returns `undefined` when the text is empty or is not a real calendar date.
 */
export function parseDateInput(value: string, locale?: string): Date | undefined {
  const text = value.trim()
  if (!text) return undefined

  const isoMatch = ISO_PATTERN.exec(text)
  if (isoMatch) return createLocalDate(Number(isoMatch[1]), Number(isoMatch[2]), Number(isoMatch[3]))

  if (NUMERIC_PATTERN.test(text)) {
    return parseNumericDate(text, getNumericDatePartOrder(locale))
  }

  return parseMonthNameDate(text, locale)
}
