import { describe, expect, it } from 'vitest'
import { endOfISOWeek, formatWeekLabel, getISOWeek, parseWeekInput, startOfISOWeek } from './iso-week'

function iso(date: Date | undefined) {
  if (!date) return undefined
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

describe('startOfISOWeek', () => {
  it('snaps every day of a week to that Monday', () => {
    expect(iso(startOfISOWeek(new Date(2026, 10, 2)))).toBe('2026-11-02')
    expect(iso(startOfISOWeek(new Date(2026, 10, 5)))).toBe('2026-11-02')
    expect(iso(startOfISOWeek(new Date(2026, 10, 8)))).toBe('2026-11-02')
  })

  it('treats Sunday as the last day of the week', () => {
    expect(iso(startOfISOWeek(new Date(2026, 10, 8)))).toBe('2026-11-02')
    expect(iso(startOfISOWeek(new Date(2026, 10, 9)))).toBe('2026-11-09')
  })

  it('keeps January days that belong to the previous ISO week-year', () => {
    expect(iso(startOfISOWeek(new Date(2026, 0, 1)))).toBe('2025-12-29')
  })
})

describe('endOfISOWeek', () => {
  it('returns the Sunday six days after the Monday', () => {
    expect(iso(endOfISOWeek(new Date(2026, 10, 2)))).toBe('2026-11-08')
  })
})

describe('getISOWeek', () => {
  it('numbers weeks per ISO-8601', () => {
    expect(getISOWeek(new Date(2026, 10, 2))).toEqual({ weekYear: 2026, week: 45 })
    expect(getISOWeek(new Date(2026, 0, 1))).toEqual({ weekYear: 2026, week: 1 })
    expect(getISOWeek(new Date(2025, 11, 29))).toEqual({ weekYear: 2026, week: 1 })
  })

  it('knows that 2020 has a week 53', () => {
    expect(getISOWeek(new Date(2020, 11, 31))).toEqual({ weekYear: 2020, week: 53 })
  })
})

describe('formatWeekLabel', () => {
  it('renders the label the week field shows', () => {
    expect(formatWeekLabel(new Date(2026, 10, 2))).toBe('2026, Week 45')
  })
})

describe('parseWeekInput', () => {
  it('parses the label it displays', () => {
    expect(iso(parseWeekInput('2026, Week 45'))).toBe('2026-11-02')
    expect(iso(parseWeekInput('2026 week 45'))).toBe('2026-11-02')
    expect(iso(parseWeekInput('  2026, Week 45  '))).toBe('2026-11-02')
  })

  it('snaps any typed date to its Monday', () => {
    expect(iso(parseWeekInput('2026-11-11'))).toBe('2026-11-09')
    expect(iso(parseWeekInput('11 Nov 2026'))).toBe('2026-11-09')
  })

  it('round-trips a label back to the same week', () => {
    const start = parseWeekInput('2026, Week 45')
    expect(start && formatWeekLabel(start)).toBe('2026, Week 45')
  })

  it('rejects week numbers that do not exist', () => {
    expect(parseWeekInput('2026, Week 0')).toBeUndefined()
    expect(parseWeekInput('2026, Week 54')).toBeUndefined()
    expect(parseWeekInput('2021, Week 53')).toBeUndefined()
  })

  it('rejects empty and non-date text', () => {
    expect(parseWeekInput('')).toBeUndefined()
    expect(parseWeekInput('   ')).toBeUndefined()
    expect(parseWeekInput('next week')).toBeUndefined()
  })
})
