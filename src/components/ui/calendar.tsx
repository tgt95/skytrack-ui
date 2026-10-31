import * as React from 'react'
import { CaretDownIcon, CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react'
import {
  DayPicker,
  UI,
  useDayPicker,
  type ClassNames,
  type DayButtonProps,
  type DayPickerProps,
  type MonthCaptionProps,
  type NextMonthButtonProps,
  type PreviousMonthButtonProps
} from 'react-day-picker'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Menu,
  MenuGroup,
  MenuGroupLabel,
  MenuPopup,
  MenuPortal,
  MenuPositioner,
  MenuRadioGroup,
  MenuRadioItem,
  MenuRadioItemIndicator,
  MenuTrigger
} from '@/components/ui/menu'

const calendarClassNames: Partial<ClassNames> = {
  [UI.Months]: 'flex flex-col gap-4 sm:flex-row',
  [UI.Month]: 'relative space-y-4',
  [UI.MonthCaption]: 'flex h-9 items-center justify-center gap-1',
  [UI.CaptionLabel]: 'text-sm font-medium',
  [UI.Nav]: 'flex items-center justify-between',
  [UI.PreviousMonthButton]: 'absolute start-0 top-0 size-9 p-0',
  [UI.NextMonthButton]: 'absolute end-0 top-0 size-9 p-0',
  [UI.MonthGrid]: 'w-full border-collapse',
  [UI.Weekdays]: 'flex',
  [UI.Weekday]: 'w-9 rounded-md text-center text-xs font-normal text-muted-foreground',
  [UI.Weeks]: 'mt-2 flex flex-col gap-1',
  [UI.Week]: 'flex w-full',
  [UI.Day]: 'relative size-9 p-0 text-center text-sm focus-within:z-10',
  [UI.DayButton]: 'size-9 p-0 font-normal aria-selected:bg-primary aria-selected:text-primary-foreground',
  [UI.Footer]: 'pt-2 text-center text-sm text-muted-foreground',
  today: 'bg-accent text-accent-foreground',
  outside: 'text-muted-foreground opacity-50',
  disabled: 'pointer-events-none opacity-50',
  selected: 'bg-primary text-primary-foreground',
  range_middle: 'aria-selected:bg-accent aria-selected:text-accent-foreground',
  hidden: 'invisible'
}

function createMonthDate(year: number, month: number) {
  const date = new Date(0)
  date.setFullYear(year, month, 1)
  date.setHours(12, 0, 0, 0)
  return date
}

function monthIndex(date: Date) {
  return date.getFullYear() * 12 + date.getMonth()
}

function isMonthInRange(date: Date, startMonth?: Date, endMonth?: Date) {
  const value = monthIndex(date)
  return (!startMonth || value >= monthIndex(startMonth)) && (!endMonth || value <= monthIndex(endMonth))
}

function MonthSelector({ monthDate }: { monthDate: Date }) {
  const { dayPickerProps, goToMonth, labels } = useDayPicker()
  const [open, setOpen] = React.useState(false)
  const year = monthDate.getFullYear()
  const selectedMonth = monthDate.getMonth()
  const locale = dayPickerProps.locale?.code
  const formatter = new Intl.DateTimeFormat(locale, { month: 'long' })
  const months = Array.from({ length: 12 }, (_, month) => ({
    value: month,
    label: formatter.format(createMonthDate(year, month))
  }))

  return (
    <Menu open={open} onOpenChange={setOpen}>
      <MenuTrigger
        render={
          <Button
            type='button'
            variant='ghost'
            size='default'
            aria-label={labels.labelMonthDropdown()}
            disabled={dayPickerProps.disableNavigation}
            className='min-w-0 justify-center gap-1 px-2'
          />
        }
      >
        {formatter.format(monthDate)}
        <CaretDownIcon aria-hidden='true' className='size-3.5' />
      </MenuTrigger>
      <MenuPortal>
        <MenuPositioner side='bottom' align='center' sideOffset={4}>
          <MenuPopup className='max-h-64 min-w-36'>
            <MenuGroup>
              <MenuGroupLabel>Month</MenuGroupLabel>
              <MenuRadioGroup
                value={String(selectedMonth)}
                onValueChange={(value) => {
                  goToMonth(createMonthDate(year, Number(value)))
                  setOpen(false)
                }}
              >
                {months.map(({ value, label }) => (
                  <MenuRadioItem
                    key={value}
                    value={String(value)}
                    inset
                    disabled={
                      dayPickerProps.disableNavigation ||
                      !isMonthInRange(createMonthDate(year, value), dayPickerProps.startMonth, dayPickerProps.endMonth)
                    }
                  >
                    <MenuRadioItemIndicator />
                    {label}
                  </MenuRadioItem>
                ))}
              </MenuRadioGroup>
            </MenuGroup>
          </MenuPopup>
        </MenuPositioner>
      </MenuPortal>
    </Menu>
  )
}

function YearSelector({ monthDate }: { monthDate: Date }) {
  const { dayPickerProps, goToMonth, labels } = useDayPicker()
  const [open, setOpen] = React.useState(false)
  const optionListRef = React.useRef<HTMLDivElement>(null)
  const year = monthDate.getFullYear()
  const month = monthDate.getMonth()
  const locale = dayPickerProps.locale?.code
  const formatter = new Intl.DateTimeFormat(locale, { year: 'numeric' })
  const firstYear = Math.min(dayPickerProps.startMonth?.getFullYear() ?? year - 100, year)
  const lastYear = Math.max(dayPickerProps.endMonth?.getFullYear() ?? year + 100, year)
  const years = Array.from({ length: lastYear - firstYear + 1 }, (_, index) => firstYear + index)

  React.useEffect(() => {
    if (!open) return
    const frame = window.requestAnimationFrame(() => {
      optionListRef.current?.querySelector<HTMLElement>('[data-current-year]')?.scrollIntoView({ block: 'center' })
    })
    return () => window.cancelAnimationFrame(frame)
  }, [open, year])

  return (
    <Menu open={open} onOpenChange={setOpen}>
      <MenuTrigger
        render={
          <Button
            type='button'
            variant='ghost'
            size='default'
            aria-label={labels.labelYearDropdown()}
            disabled={dayPickerProps.disableNavigation}
            className='min-w-0 justify-center gap-1 px-2'
          />
        }
      >
        {formatter.format(monthDate)}
        <CaretDownIcon aria-hidden='true' className='size-3.5' />
      </MenuTrigger>
      <MenuPortal>
        <MenuPositioner side='bottom' align='center' sideOffset={4}>
          <MenuPopup className='max-h-64 min-w-28'>
            <MenuGroup>
              <MenuGroupLabel>Year</MenuGroupLabel>
              <div ref={optionListRef}>
                <MenuRadioGroup
                  value={String(year)}
                  onValueChange={(value) => {
                    goToMonth(createMonthDate(Number(value), month))
                    setOpen(false)
                  }}
                >
                  {years.map((optionYear) => (
                    <MenuRadioItem
                      key={optionYear}
                      value={String(optionYear)}
                      inset
                      data-current-year={optionYear === year ? '' : undefined}
                      disabled={
                        dayPickerProps.disableNavigation ||
                        (dayPickerProps.startMonth != null && optionYear < dayPickerProps.startMonth.getFullYear()) ||
                        (dayPickerProps.endMonth != null && optionYear > dayPickerProps.endMonth.getFullYear())
                      }
                    >
                      <MenuRadioItemIndicator />
                      {formatter.format(createMonthDate(optionYear, 0))}
                    </MenuRadioItem>
                  ))}
                </MenuRadioGroup>
              </div>
            </MenuGroup>
          </MenuPopup>
        </MenuPositioner>
      </MenuPortal>
    </Menu>
  )
}

function CalendarMonthCaption({ calendarMonth, className, children, ...props }: MonthCaptionProps) {
  const monthDate = calendarMonth.date

  return (
    <div {...props} className={cn(className, 'flex h-9 items-center justify-center gap-1')}>
      <span className='sr-only'>{children}</span>
      <MonthSelector monthDate={monthDate} />
      <YearSelector monthDate={monthDate} />
    </div>
  )
}

function CalendarPreviousMonthButton({ className, ...props }: PreviousMonthButtonProps) {
  return (
    <Button
      type='button'
      variant='ghost'
      size='default'
      className={className}
      disabled={props['aria-disabled'] === true || props['aria-disabled'] === 'true'}
      {...props}
    />
  )
}

function CalendarNextMonthButton({ className, ...props }: NextMonthButtonProps) {
  return (
    <Button
      type='button'
      variant='ghost'
      size='default'
      className={className}
      disabled={props['aria-disabled'] === true || props['aria-disabled'] === 'true'}
      {...props}
    />
  )
}

function CalendarDayButton({ day, modifiers, ...props }: DayButtonProps) {
  const buttonRef = React.useRef<HTMLButtonElement>(null)

  React.useEffect(() => {
    if (modifiers.focused) buttonRef.current?.focus()
  }, [modifiers.focused])

  void day

  return <Button ref={buttonRef} variant='ghost' size='default' {...props} />
}

type DistributiveOmit<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never

export type CalendarProps = DistributiveOmit<DayPickerProps, 'captionLayout' | 'navLayout'> & {
  className?: string
}

function Calendar({ className, classNames, components, ...props }: CalendarProps) {
  return (
    <DayPicker
      data-slot='calendar'
      navLayout='around'
      captionLayout='label'
      className={cn('w-fit rounded-(--radius) p-3', className)}
      classNames={{ ...calendarClassNames, ...classNames }}
      components={{
        ...components,
        Chevron:
          components?.Chevron ??
          (({ orientation, className: iconClassName }) =>
            orientation === 'left' ? (
              <CaretLeftIcon aria-hidden='true' className={cn('size-4', iconClassName)} />
            ) : (
              <CaretRightIcon aria-hidden='true' className={cn('size-4', iconClassName)} />
            )),
        MonthCaption: components?.MonthCaption ?? CalendarMonthCaption,
        PreviousMonthButton: components?.PreviousMonthButton ?? CalendarPreviousMonthButton,
        NextMonthButton: components?.NextMonthButton ?? CalendarNextMonthButton,
        DayButton: components?.DayButton ?? CalendarDayButton
      }}
      {...props}
    />
  )
}

export { Calendar }
