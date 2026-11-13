import { useState } from 'react'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { DateRange } from 'react-day-picker'
import { afterEach, beforeAll, describe, expect, it } from 'vitest'
import { DatePicker, DateRangePicker, DateWeekPicker, type DateRangePickerProps } from '@/components/ui/date-picker'
import { installBrowserStubs } from './test-support/demo-harness'

/**
 * Behaviour of the date fields' text entry: the whole point of the editable-input
 * pattern is that a person can either open the calendar or type the value, so the
 * typing path needs its own coverage.
 *
 * These render the components directly instead of the demo, because the demo marks
 * every date before today as disabled and the assertions need fixed dates.
 */
beforeAll(installBrowserStubs)

afterEach(cleanup)

function iso(date: Date | undefined) {
  if (!date) return undefined
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

function RangeHarness({
  initialRange,
  calendarProps
}: {
  initialRange?: DateRange
  calendarProps?: DateRangePickerProps['calendarProps']
}) {
  const [range, setRange] = useState<DateRange | undefined>(initialRange)
  return (
    <>
      <DateRangePicker aria-label='Travel dates' value={range} onValueChange={setRange} calendarProps={calendarProps} />
      <output data-testid='range'>{range?.from ? `${iso(range.from)}/${iso(range.to) ?? ''}` : ''}</output>
    </>
  )
}

function WeekHarness({ initialDate }: { initialDate?: Date }) {
  const [date, setDate] = useState<Date | undefined>(initialDate)
  return (
    <>
      <DateWeekPicker aria-label='Travel week' value={date} onValueChange={setDate} />
      <output data-testid='week'>{iso(date) ?? ''}</output>
    </>
  )
}

const rangeInput = () => screen.getByRole('textbox', { name: 'Travel dates' }) as HTMLInputElement
const weekInput = () => screen.getByRole('textbox', { name: 'Travel week' }) as HTMLInputElement
const rangeValue = () => screen.getByTestId('range').textContent
const weekValue = () => screen.getByTestId('week').textContent

describe('date range field', () => {
  it('adds the en dash as soon as a typed start date is complete', async () => {
    const user = userEvent.setup()
    render(<RangeHarness />)

    await user.type(rangeInput(), '11 Nov 2026')

    expect(rangeInput().value).toBe('11 Nov 2026 – ')
  })

  it('does not add the dash while the year is still being typed', async () => {
    const user = userEvent.setup()
    render(<RangeHarness />)

    await user.type(rangeInput(), '11/11/2')

    expect(rangeInput().value).toBe('11/11/2')
  })

  it('commits both ends when the end date follows the start date', async () => {
    const user = userEvent.setup()
    render(<RangeHarness />)

    await user.type(rangeInput(), '11 Nov 2026')
    await user.type(rangeInput(), '15 Nov 2026')
    await user.keyboard('{Enter}')

    expect(rangeValue()).toBe('2026-11-11/2026-11-15')
    expect(rangeInput().value).toBe('Nov 11, 2026 – Nov 15, 2026')
  })

  it('keeps a start date that has no end date yet', async () => {
    const user = userEvent.setup()
    render(<RangeHarness />)

    await user.type(rangeInput(), '11 Nov 2026')
    await user.keyboard('{Enter}')

    expect(rangeValue()).toBe('2026-11-11/')
    expect(rangeInput().value).toBe('Nov 11, 2026 – Select end date')
  })

  it('rejects a range whose end date comes first', async () => {
    const user = userEvent.setup()
    render(<RangeHarness initialRange={{ from: new Date(2026, 10, 11), to: new Date(2026, 10, 15) }} />)

    await user.clear(rangeInput())
    await user.type(rangeInput(), '15 Nov 2026')
    await user.type(rangeInput(), '11 Nov 2026')

    expect(rangeInput().getAttribute('aria-invalid')).toBe('true')

    await user.keyboard('{Enter}')

    // Nothing committed; the field keeps the typed text until it loses focus.
    expect(rangeValue()).toBe('2026-11-11/2026-11-15')

    await user.tab()

    expect(rangeInput().value).toBe('Nov 11, 2026 – Nov 15, 2026')
    expect(rangeInput().getAttribute('aria-invalid')).toBeNull()
  })

  it('rejects a day the calendar marks as disabled', async () => {
    const user = userEvent.setup()
    render(<RangeHarness calendarProps={{ disabled: { before: new Date(2026, 10, 10) } }} />)

    await user.type(rangeInput(), '01 Nov 2026')
    await user.keyboard('{Enter}')

    expect(rangeValue()).toBe('')
    expect(rangeInput().getAttribute('aria-invalid')).toBe('true')

    await user.tab()

    expect(rangeInput().value).toBe('')
    expect(rangeInput().getAttribute('aria-invalid')).toBeNull()
  })

  it('clears the value when the field is emptied', async () => {
    const user = userEvent.setup()
    render(<RangeHarness initialRange={{ from: new Date(2026, 10, 11), to: new Date(2026, 10, 15) }} />)

    await user.clear(rangeInput())
    await user.keyboard('{Enter}')

    expect(rangeValue()).toBe('')
    expect(rangeInput().value).toBe('')
  })

  it('reverts unreadable text on blur instead of keeping it', async () => {
    const user = userEvent.setup()
    render(<RangeHarness initialRange={{ from: new Date(2026, 10, 11), to: new Date(2026, 10, 15) }} />)

    await user.clear(rangeInput())
    await user.type(rangeInput(), 'sometime in November')
    await user.tab()

    expect(rangeInput().value).toBe('Nov 11, 2026 – Nov 15, 2026')
    expect(rangeValue()).toBe('2026-11-11/2026-11-15')
  })

  it('opens the calendar from a real button while the field stays a text box', async () => {
    const user = userEvent.setup()
    render(<RangeHarness />)

    const calendarButton = screen.getByRole('button', { name: 'Open calendar' })

    // The input must not carry the button role: that is the axe `aria-allowed-role`
    // finding this pattern replaced.
    expect(rangeInput().tagName).toBe('INPUT')
    expect(screen.queryByRole('button', { name: 'Travel dates' })).toBeNull()

    await user.click(calendarButton)

    expect(calendarButton.getAttribute('aria-expanded')).toBe('true')
  })
})

describe('date week field', () => {
  it('accepts the week label it displays', async () => {
    const user = userEvent.setup()
    render(<WeekHarness />)

    await user.type(weekInput(), '2026, Week 45')
    await user.keyboard('{Enter}')

    expect(weekValue()).toBe('2026-11-02')
    expect(weekInput().value).toBe('2026, Week 45')
  })

  it('snaps a typed date to the Monday of its week', async () => {
    const user = userEvent.setup()
    render(<WeekHarness />)

    await user.type(weekInput(), '11 Nov 2026')
    await user.keyboard('{Enter}')

    expect(weekValue()).toBe('2026-11-09')
    expect(weekInput().value).toBe('2026, Week 46')
  })

  it('rejects a week number the year does not have', async () => {
    const user = userEvent.setup()
    render(<WeekHarness initialDate={new Date(2026, 10, 2)} />)

    await user.clear(weekInput())
    await user.type(weekInput(), '2021, Week 53')
    await user.keyboard('{Enter}')

    expect(weekValue()).toBe('2026-11-02')
    expect(weekInput().getAttribute('aria-invalid')).toBe('true')

    await user.tab()

    expect(weekInput().value).toBe('2026, Week 45')
  })

  it('opens the calendar from a real button', async () => {
    const user = userEvent.setup()
    const { container } = render(<WeekHarness />)
    const calendarButton = screen.getByRole('button', { name: 'Open calendar' })

    expect(container.querySelector('input[role="button"]')).toBeNull()

    await user.click(calendarButton)

    expect(calendarButton.getAttribute('aria-expanded')).toBe('true')
  })
})

describe('single date field', () => {
  it('commits a typed date and reverts unreadable text', async () => {
    const user = userEvent.setup()

    function Harness() {
      const [date, setDate] = useState<Date | undefined>(new Date(2026, 10, 11))
      return (
        <>
          <DatePicker aria-label='Flight date' value={date} onValueChange={setDate} />
          <output data-testid='date'>{iso(date) ?? ''}</output>
        </>
      )
    }

    render(<Harness />)
    const input = screen.getByRole('textbox', { name: 'Flight date' }) as HTMLInputElement

    await user.clear(input)
    await user.type(input, '15 Nov 2026')
    await user.keyboard('{Enter}')

    expect(screen.getByTestId('date').textContent).toBe('2026-11-15')
    expect(input.value).toBe('Nov 15, 2026')

    await user.clear(input)
    await user.type(input, '31 Nov 2026')
    await user.tab()

    expect(screen.getByTestId('date').textContent).toBe('2026-11-15')
    expect(input.value).toBe('Nov 15, 2026')
  })
})
