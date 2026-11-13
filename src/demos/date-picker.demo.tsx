import * as React from 'react'
import type { DateRange } from 'react-day-picker'
import { Calendar } from '@/components/ui/calendar'
import { DatePicker, DateRangePicker, DateWeekPicker } from '@/components/ui/date-picker'
import { FieldDescription, FieldLabel, FieldRoot } from '@/components/ui/field'
import type { DemoMeta } from '@/showcase/demo'

function DatePickerField() {
  const id = React.useId()
  const [date, setDate] = React.useState<Date>()
  return (
    <FieldRoot className='w-full max-w-64'>
      <FieldLabel htmlFor={id}>Flight date</FieldLabel>
      <DatePicker id={id} value={date} onValueChange={setDate} placeholder='Select a date' />
      <FieldDescription aria-live='polite'>
        {date
          ? `Selected ${new Intl.DateTimeFormat(undefined, { dateStyle: 'long' }).format(date)}`
          : 'Pick a day or type a date'}
      </FieldDescription>
    </FieldRoot>
  )
}

function StandaloneCalendar() {
  const [date, setDate] = React.useState<Date>()
  return <Calendar mode='single' selected={date} onSelect={setDate} />
}

function DateRangeField() {
  const id = React.useId()
  const [range, setRange] = React.useState<DateRange>()
  const today = React.useMemo(() => {
    const date = new Date()
    date.setHours(0, 0, 0, 0)
    return date
  }, [])
  const description = range?.from
    ? range.to
      ? `${new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(range.from)} – ${new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(range.to)}`
      : 'Choose an end date'
    : 'Pick or type a start and end date'

  return (
    <FieldRoot className='flex w-72 flex-col gap-2'>
      <FieldLabel htmlFor={id}>Planning window</FieldLabel>
      <DateRangePicker
        id={id}
        value={range}
        onValueChange={setRange}
        placeholder='Select date range'
        calendarProps={{ disabled: { before: today }, numberOfMonths: 2 }}
      />
      <FieldDescription aria-live='polite'>{description}</FieldDescription>
    </FieldRoot>
  )
}

function DateWeekField() {
  const id = React.useId()
  const [week, setWeek] = React.useState<Date>()
  return (
    <FieldRoot className='w-full max-w-64'>
      <FieldLabel htmlFor={id}>Sprint week</FieldLabel>
      <DateWeekPicker id={id} value={week} onValueChange={setWeek} placeholder='Select a week' />
      <FieldDescription aria-live='polite'>
        {week
          ? `Week of ${new Intl.DateTimeFormat(undefined, { dateStyle: 'long' }).format(week)}`
          : 'Pick or type an ISO week'}
      </FieldDescription>
    </FieldRoot>
  )
}

export const demo: DemoMeta = {
  id: 'date-picker',
  title: 'Date Picker',
  description: 'A date selection control composed from Popover and Calendar.',
  group: 'Forms',
  variants: [
    { name: 'DEFAULT', render: () => <DatePickerField /> },
    { name: 'CALENDAR', render: () => <StandaloneCalendar /> },
    { name: 'DATE RANGE', render: () => <DateRangeField /> },
    { name: 'WEEK', render: () => <DateWeekField /> }
  ]
}
