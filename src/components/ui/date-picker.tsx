import * as React from 'react'
import { CalendarBlankIcon } from '@phosphor-icons/react'
import type { DayPickerProps } from 'react-day-picker'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverPortal, PopoverPositioner, PopoverPopup, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

type DistributiveOmit<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never

export type DatePickerProps = {
  id?: string
  'aria-label'?: string
  'aria-labelledby'?: string
  value?: Date
  defaultValue?: Date
  onValueChange?: (value: Date | undefined) => void
  placeholder?: string
  disabled?: boolean
  className?: string
  buttonClassName?: string
  calendarClassName?: string
  calendarProps?: DistributiveOmit<
    Extract<DayPickerProps, { mode: 'single' }>,
    'mode' | 'selected' | 'onSelect' | 'captionLayout' | 'navLayout'
  >
}

function DatePicker(props: DatePickerProps) {
  const {
    value,
    defaultValue,
    onValueChange,
    id,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    placeholder = 'Pick a date',
    disabled = false,
    className,
    buttonClassName,
    calendarClassName,
    calendarProps
  } = props
  const [internalValue, setInternalValue] = React.useState<Date | undefined>(defaultValue)
  const [open, setOpen] = React.useState(false)
  const isControlled = Object.prototype.hasOwnProperty.call(props, 'value')
  const selectedDate = isControlled ? value : internalValue

  const handleSelect = (nextValue: Date | undefined) => {
    if (!isControlled) setInternalValue(nextValue)
    onValueChange?.(nextValue)
    setOpen(false)
  }

  const label = selectedDate
    ? new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(selectedDate)
    : placeholder

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div data-slot='date-picker' className={cn('w-full sm:w-64', className)}>
        <PopoverTrigger
          render={
            <Button
              variant='outline'
              disabled={disabled}
              id={id}
              data-empty={!selectedDate}
              aria-label={
                ariaLabel ?? (id || ariaLabelledby ? undefined : selectedDate ? `Selected date: ${label}` : placeholder)
              }
              aria-labelledby={ariaLabelledby}
              className={cn(
                'w-full justify-start text-left font-normal data-[empty=true]:text-muted-foreground',
                buttonClassName
              )}
            />
          }
        >
          <CalendarBlankIcon aria-hidden='true' />
          <span className='truncate'>{label}</span>
        </PopoverTrigger>
      </div>
      <PopoverPortal>
        <PopoverPositioner side='bottom' align='start' sideOffset={4}>
          <PopoverPopup className='w-auto p-0'>
            <Calendar
              mode='single'
              selected={selectedDate}
              onSelect={handleSelect}
              className={calendarClassName}
              {...calendarProps}
            />
          </PopoverPopup>
        </PopoverPositioner>
      </PopoverPortal>
    </Popover>
  )
}

export { DatePicker }
