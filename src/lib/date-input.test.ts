import { describe, expect, it } from 'vitest'
import {
  getNumericDatePartOrder,
  hasDateRangeSeparator,
  isCompleteDateText,
  parseDateInput,
  parseDateRangeInput
} from './date-input'

function iso(date: Date | undefined) {
  if (!date) return undefined
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

describe('getNumericDatePartOrder', () => {
  it('reads month-first for en-US and day-first for en-GB', () => {
    expect(getNumericDatePartOrder('en-US')).toEqual(['month', 'day', 'year'])
    expect(getNumericDatePartOrder('en-GB')).toEqual(['day', 'month', 'year'])
  })
})

describe('parseDateInput', () => {
  it('parses ISO dates', () => {
    expect(iso(parseDateInput('2026-11-11'))).toBe('2026-11-11')
    expect(iso(parseDateInput(' 2026-1-5 '))).toBe('2026-01-05')
  })

  it('follows the locale order for ambiguous numeric dates', () => {
    expect(iso(parseDateInput('03/04/2026', 'en-US'))).toBe('2026-03-04')
    expect(iso(parseDateInput('03/04/2026', 'en-GB'))).toBe('2026-04-03')
    expect(iso(parseDateInput('03.04.2026', 'en-GB'))).toBe('2026-04-03')
    expect(iso(parseDateInput('03-04-2026', 'en-GB'))).toBe('2026-04-03')
  })

  it('uses an unambiguous day or month value over the locale order', () => {
    expect(iso(parseDateInput('25/12/2026', 'en-US'))).toBe('2026-12-25')
    expect(iso(parseDateInput('12/25/2026', 'en-GB'))).toBe('2026-12-25')
  })

  it('accepts two-digit and year-first numeric dates', () => {
    expect(iso(parseDateInput('11/11/26', 'en-US'))).toBe('2026-11-11')
    expect(iso(parseDateInput('2026/11/11', 'en-US'))).toBe('2026-11-11')
  })

  it('parses month-name dates', () => {
    expect(iso(parseDateInput('Nov 11, 2026'))).toBe('2026-11-11')
    expect(iso(parseDateInput('11 Nov 2026'))).toBe('2026-11-11')
    expect(iso(parseDateInput('November 11, 2026'))).toBe('2026-11-11')
  })

  it('rejects empty, partial, and impossible dates', () => {
    expect(parseDateInput('')).toBeUndefined()
    expect(parseDateInput('   ')).toBeUndefined()
    expect(parseDateInput('11/11')).toBeUndefined()
    expect(parseDateInput('2026-02-31')).toBeUndefined()
    expect(parseDateInput('tomorrow')).toBeUndefined()
    expect(parseDateInput('31 Nov 2026')).toBeUndefined()
  })

  it('returns local midnight so calendar comparison stays stable', () => {
    const date = parseDateInput('2026-11-11')
    expect(date?.getHours()).toBe(0)
    expect(date?.getMinutes()).toBe(0)
  })
})

describe('isCompleteDateText', () => {
  it('accepts whole dates that carry a four-digit year', () => {
    expect(isCompleteDateText('2026-11-11')).toBe(true)
    expect(isCompleteDateText('11/11/2026', 'en-US')).toBe(true)
    expect(isCompleteDateText('11 Nov 2026')).toBe(true)
    expect(isCompleteDateText('Nov 11, 2026')).toBe(true)
  })

  it('rejects partial text so a typed year is not cut short', () => {
    expect(isCompleteDateText('')).toBe(false)
    expect(isCompleteDateText('11/11/2')).toBe(false)
    expect(isCompleteDateText('11/11/26')).toBe(false)
    expect(isCompleteDateText('11 Nov')).toBe(false)
    expect(isCompleteDateText('31 Nov 2026')).toBe(false)
  })
})

describe('hasDateRangeSeparator', () => {
  it('recognises the separators a person might type', () => {
    expect(hasDateRangeSeparator('11 Nov 2026 – 15 Nov 2026')).toBe(true)
    expect(hasDateRangeSeparator('11 Nov 2026—15 Nov 2026')).toBe(true)
    expect(hasDateRangeSeparator('11 Nov 2026 - 15 Nov 2026')).toBe(true)
  })

  it('leaves single dates and bare hyphens alone', () => {
    expect(hasDateRangeSeparator('11 Nov 2026')).toBe(false)
    expect(hasDateRangeSeparator('2026-11-11')).toBe(false)
  })
})

describe('parseDateRangeInput', () => {
  it('parses both halves of a typed range', () => {
    const range = parseDateRangeInput('11 Nov 2026 – 15 Nov 2026')
    expect(iso(range?.from)).toBe('2026-11-11')
    expect(iso(range?.to)).toBe('2026-11-15')
  })

  it('accepts an em dash and a padded hyphen', () => {
    expect(iso(parseDateRangeInput('11 Nov 2026 — 15 Nov 2026')?.to)).toBe('2026-11-15')
    expect(iso(parseDateRangeInput('11 Nov 2026 - 15 Nov 2026')?.to)).toBe('2026-11-15')
  })

  it('treats a single date or a half-finished range as a start date only', () => {
    expect(parseDateRangeInput('11 Nov 2026')).toEqual({ from: parseDateInput('11 Nov 2026') })
    expect(parseDateRangeInput('11 Nov 2026 – ')).toEqual({ from: parseDateInput('11 Nov 2026') })
  })

  it('keeps a reversed range so the picker can reject it as unavailable', () => {
    const range = parseDateRangeInput('15 Nov 2026 – 11 Nov 2026')
    expect(iso(range?.from)).toBe('2026-11-15')
    expect(iso(range?.to)).toBe('2026-11-11')
  })

  it('rejects text whose halves are not dates', () => {
    expect(parseDateRangeInput('')).toBeUndefined()
    expect(parseDateRangeInput(' – 15 Nov 2026')).toBeUndefined()
    expect(parseDateRangeInput('11 Nov 2026 – next week')).toBeUndefined()
  })
})
