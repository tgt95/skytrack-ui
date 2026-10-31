import * as React from 'react'
import { Calendar } from '@/components/ui/calendar'
import { DatePicker } from '@/components/ui/date-picker'
import { FieldDescription, FieldLabel, FieldRoot } from '@/components/ui/field'
import type { DemoMeta } from '@/showcase/demo'

function DatePickerField() {
  const id = React.useId()
  const [date, setDate] = React.useState<Date>()
  return (
    <FieldRoot className='flex w-64 flex-col gap-2'>
      <FieldLabel htmlFor={id}>Flight date</FieldLabel>
      <DatePicker id={id} value={date} onValueChange={setDate} placeholder='Select a date' />
      <FieldDescription aria-live='polite'>
        {date
          ? `Selected ${new Intl.DateTimeFormat(undefined, { dateStyle: 'long' }).format(date)}`
          : 'No date selected'}
      </FieldDescription>
    </FieldRoot>
  )
}

function StandaloneCalendar() {
  const [date, setDate] = React.useState<Date>()
  return <Calendar mode='single' selected={date} onSelect={setDate} />
}

export const demo: DemoMeta = {
  id: 'date-picker',
  title: 'Date Picker',
  description: 'A date selection control composed from Popover and Calendar.',
  group: 'Forms',
  variants: [
    { name: 'DEFAULT', render: () => <DatePickerField /> },
    { name: 'CALENDAR', render: () => <StandaloneCalendar /> }
  ]
}
