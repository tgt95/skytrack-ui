import * as React from 'react'
import { CalendarBlankIcon } from '@phosphor-icons/react'
import { dateMatchModifiers, type DateRange, type DayPickerProps } from 'react-day-picker'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import { Popover, PopoverPortal, PopoverPositioner, PopoverPopup, PopoverTrigger } from '@/components/ui/popover'
import {
  DATE_RANGE_SEPARATOR,
  hasDateRangeSeparator,
  isCompleteDateText,
  parseDateInput,
  parseDateRangeInput
} from '@/lib/date-input'
import { useDateField, type DateField } from '@/lib/date-field'
import { focusRing } from '@/lib/focus-ring'
import { endOfISOWeek, formatWeekLabel, parseWeekInput, startOfISOWeek } from '@/lib/iso-week'
import { usePickerNumberOfMonths } from '@/lib/use-picker-months'
import { cn } from '@/lib/utils'

type DistributiveOmit<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never

/** Calendar props shared by the pickers; `mode`, selection and nav layout stay internal. */
type PickerCalendarProps<Mode extends 'single' | 'range'> = DistributiveOmit<
  Extract<DayPickerProps, { mode: Mode }>,
  'mode' | 'selected' | 'onSelect' | 'captionLayout' | 'navLayout'
>

/**
 * Base UI flips `align` from start to end when a popup is wider than its trigger and the
 * viewport is tight, which pushes the calendar away from the input's left edge. Shifting keeps
 * the popup's left edge on the input and only nudges it when it would leave the viewport.
 */
const calendarCollisionAvoidance: React.ComponentProps<typeof PopoverPositioner>['collisionAvoidance'] = {
  align: 'shift'
}

/**
 * Base UI anchors a popup to the element it renders, which for an adorned Input is the inner
 * text box, not the visible field. Anchor to the `input-root` wrapper so the calendar starts on
 * the field's left edge instead of the text area after the icon.
 */
function resolveFieldAnchor(element: HTMLElement | null) {
  return element?.closest('[data-slot="input-root"]') ?? element
}

/** Locale the fields format with, and therefore the locale typed dates are read in. */
const DATE_LOCALE = new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).resolvedOptions().locale

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
  /** Accessible name for the calendar button that opens the popover. */
  calendarButtonLabel?: string
  calendarProps?: PickerCalendarProps<'single'>
}

export type DateRangePickerProps = {
  id?: string
  'aria-label'?: string
  'aria-labelledby'?: string
  value?: DateRange
  defaultValue?: DateRange
  onValueChange?: (value: DateRange | undefined) => void
  placeholder?: string
  disabled?: boolean
  className?: string
  buttonClassName?: string
  calendarClassName?: string
  /** Accessible name for the calendar button that opens the popover. */
  calendarButtonLabel?: string
  calendarProps?: PickerCalendarProps<'range'>
}

export type DateWeekPickerProps = {
  id?: string
  'aria-label'?: string
  'aria-labelledby'?: string
  /** Any date inside the selected week; the value is normalized to that week's Monday. */
  value?: Date
  defaultValue?: Date
  onValueChange?: (value: Date | undefined) => void
  placeholder?: string
  disabled?: boolean
  className?: string
  buttonClassName?: string
  calendarClassName?: string
  /** Accessible name for the calendar button that opens the popover. */
  calendarButtonLabel?: string
  calendarProps?: PickerCalendarProps<'range'>
}

type DatePickerFieldProps = {
  slot: string
  inputRef: React.RefObject<HTMLInputElement | null>
  field: DateField
  value: string
  placeholder: string
  disabled: boolean
  empty: boolean
  /** Name used when the caller supplied no label of its own. */
  accessibleName: string
  id?: string
  ariaLabel?: string
  ariaLabelledby?: string
  calendarButtonLabel: string
  open: boolean
  onOpenChange: (open: boolean) => void
  className?: string
  inputClassName?: string
  popupClassName?: string
  children: React.ReactNode
}

/**
 * The text field every picker shares: an editable input plus a separate calendar button that
 * opens the popover. The button is a real `<button>` (not the input wearing `role="button"`),
 * and the input keeps native text-box semantics so typing works the same in all three pickers.
 */
function DatePickerField({
  slot,
  inputRef,
  field,
  value,
  placeholder,
  disabled,
  empty,
  accessibleName,
  id,
  ariaLabel,
  ariaLabelledby,
  calendarButtonLabel,
  open,
  onOpenChange,
  className,
  inputClassName,
  popupClassName,
  children
}: DatePickerFieldProps) {
  const anchor = React.useCallback(() => resolveFieldAnchor(inputRef.current), [inputRef])

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <div data-slot={slot} className={cn('w-full', className)}>
        <Input
          ref={inputRef}
          disabled={disabled}
          id={id}
          type='text'
          value={value}
          placeholder={placeholder}
          autoComplete='off'
          spellCheck={false}
          data-empty={empty}
          data-invalid={field.invalid ? '' : undefined}
          aria-invalid={field.invalid || undefined}
          aria-label={ariaLabel ?? (id || ariaLabelledby ? undefined : accessibleName)}
          aria-labelledby={ariaLabelledby}
          className={cn('w-full', inputClassName)}
          startAdornment={
            <PopoverTrigger
              render={
                <button
                  type='button'
                  disabled={disabled}
                  aria-label={calendarButtonLabel}
                  className={cn(
                    '-ms-1 inline-flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-(--radius) text-muted-foreground transition-colors',
                    'hover:text-foreground disabled:pointer-events-none disabled:opacity-50',
                    focusRing
                  )}
                />
              }
            >
              <CalendarBlankIcon aria-hidden='true' />
            </PopoverTrigger>
          }
          {...field.handlers}
        />
      </div>
      <PopoverPortal>
        <PopoverPositioner
          anchor={anchor}
          side='bottom'
          align='start'
          sideOffset={4}
          collisionAvoidance={calendarCollisionAvoidance}
        >
          <PopoverPopup className={cn('w-auto max-w-none p-0', popupClassName)}>{children}</PopoverPopup>
        </PopoverPositioner>
      </PopoverPortal>
    </Popover>
  )
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
    calendarButtonLabel = 'Open calendar',
    calendarProps
  } = props
  const [internalValue, setInternalValue] = React.useState<Date | undefined>(defaultValue)
  const [open, setOpen] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const isControlled = Object.prototype.hasOwnProperty.call(props, 'value')
  const selectedDate = isControlled ? value : internalValue
  const formatter = React.useMemo(() => new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }), [])
  const formatDate = React.useCallback((date: Date | undefined) => (date ? formatter.format(date) : ''), [formatter])
  const numberOfMonths = usePickerNumberOfMonths(calendarProps)

  const commitValue = (nextValue: Date | undefined) => {
    if (!isControlled) setInternalValue(nextValue)
    onValueChange?.(nextValue)
  }

  const field = useDateField<Date>({
    value: selectedDate,
    format: formatDate,
    parse: (text) => parseDateInput(text, DATE_LOCALE),
    commit: commitValue,
    isUnavailable: (date) => calendarProps?.disabled != null && dateMatchModifiers(date, calendarProps.disabled),
    onCommitFromKeyboard: () => setOpen(false),
    onRequestOpen: () => setOpen(true)
  })

  return (
    <DatePickerField
      slot='date-picker'
      inputRef={inputRef}
      field={field}
      value={field.inputValue}
      placeholder={placeholder}
      disabled={disabled}
      empty={!selectedDate}
      accessibleName={selectedDate ? `Selected date: ${formatDate(selectedDate)}` : placeholder}
      id={id}
      ariaLabel={ariaLabel}
      ariaLabelledby={ariaLabelledby}
      calendarButtonLabel={calendarButtonLabel}
      open={open}
      onOpenChange={setOpen}
      className={className}
      inputClassName={buttonClassName}
    >
      <Calendar
        mode='single'
        selected={selectedDate}
        onSelect={(nextValue) => {
          commitValue(nextValue)
          field.reset()
          setOpen(false)
        }}
        className={calendarClassName}
        {...calendarProps}
        numberOfMonths={numberOfMonths}
      />
    </DatePickerField>
  )
}

function DateRangePicker(props: DateRangePickerProps) {
  const {
    value,
    defaultValue,
    onValueChange,
    id,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    placeholder = 'Pick a date range',
    disabled = false,
    className,
    buttonClassName,
    calendarClassName,
    calendarButtonLabel = 'Open calendar',
    calendarProps
  } = props
  const [internalValue, setInternalValue] = React.useState<DateRange | undefined>(defaultValue)
  const [open, setOpen] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const isControlled = Object.prototype.hasOwnProperty.call(props, 'value')
  const selectedRange = isControlled ? value : internalValue
  const formatDate = React.useCallback(
    (date: Date) => new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(date),
    []
  )
  const numberOfMonths = usePickerNumberOfMonths(calendarProps)

  const formatRange = (range: DateRange | undefined) => {
    if (!range?.from) return ''
    if (range.to) return `${formatDate(range.from)}${DATE_RANGE_SEPARATOR}${formatDate(range.to)}`
    return `${formatDate(range.from)}${DATE_RANGE_SEPARATOR}Select end date`
  }

  const isUnavailableDate = (date: Date) =>
    calendarProps?.disabled != null && dateMatchModifiers(date, calendarProps.disabled)

  const commitValue = (nextValue: DateRange | undefined) => {
    if (!isControlled) setInternalValue(nextValue)
    onValueChange?.(nextValue)
  }

  const field = useDateField<DateRange>({
    value: selectedRange,
    format: formatRange,
    parse: (text) => parseDateRangeInput(text, DATE_LOCALE),
    commit: commitValue,
    // A range is unavailable when it is inside out or either end sits on a disabled day.
    isUnavailable: (range) => {
      if (!range.from) return true
      if (range.to != null && range.to.getTime() < range.from.getTime()) return true
      return isUnavailableDate(range.from) || (range.to != null && isUnavailableDate(range.to))
    },
    // Typing a complete start date appends the en dash so the end date follows naturally.
    completeText: (text, caretAtEnd) => {
      if (!caretAtEnd || hasDateRangeSeparator(text) || !isCompleteDateText(text, DATE_LOCALE)) return text
      return `${text.trim()}${DATE_RANGE_SEPARATOR}`
    },
    onCommitFromKeyboard: () => setOpen(false),
    onRequestOpen: () => setOpen(true)
  })

  return (
    <DatePickerField
      slot='date-range-picker'
      inputRef={inputRef}
      field={field}
      value={field.inputValue}
      placeholder={placeholder}
      disabled={disabled}
      empty={!selectedRange?.from}
      accessibleName={formatRange(selectedRange) || placeholder}
      id={id}
      ariaLabel={ariaLabel}
      ariaLabelledby={ariaLabelledby}
      calendarButtonLabel={calendarButtonLabel}
      open={open}
      onOpenChange={setOpen}
      className={className}
      inputClassName={buttonClassName}
      popupClassName='max-w-none'
    >
      <Calendar
        mode='range'
        selected={selectedRange}
        onSelect={(nextRange) => {
          const isFirstDay =
            !selectedRange?.from &&
            nextRange?.from &&
            nextRange.to &&
            nextRange.from.toDateString() === nextRange.to.toDateString()
          const normalizedRange = isFirstDay ? { from: nextRange.from } : nextRange

          commitValue(normalizedRange)
          field.reset()
          if (normalizedRange?.from && normalizedRange.to) setOpen(false)
        }}
        className={calendarClassName}
        {...calendarProps}
        numberOfMonths={numberOfMonths}
      />
    </DatePickerField>
  )
}

function DateWeekPicker(props: DateWeekPickerProps) {
  const {
    value,
    defaultValue,
    onValueChange,
    id,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    placeholder = 'Pick a week',
    disabled = false,
    className,
    buttonClassName,
    calendarClassName,
    calendarButtonLabel = 'Open calendar',
    calendarProps
  } = props
  const [internalValue, setInternalValue] = React.useState<Date | undefined>(defaultValue)
  const [open, setOpen] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const isControlled = Object.prototype.hasOwnProperty.call(props, 'value')
  const selectedDate = isControlled ? value : internalValue
  const weekStart = selectedDate ? startOfISOWeek(selectedDate) : undefined
  const weekEnd = weekStart ? endOfISOWeek(weekStart) : undefined
  const formatWeek = React.useCallback(
    (date: Date | undefined) => (date ? formatWeekLabel(startOfISOWeek(date)) : ''),
    []
  )
  const numberOfMonths = usePickerNumberOfMonths(calendarProps)

  const commitValue = (nextValue: Date | undefined) => {
    if (!isControlled) setInternalValue(nextValue)
    onValueChange?.(nextValue)
  }

  const field = useDateField<Date>({
    value: selectedDate,
    format: formatWeek,
    parse: (text) => parseWeekInput(text, DATE_LOCALE),
    commit: commitValue,
    // Whole weeks are the unit here, so a disabled day anywhere in the week rejects it.
    isUnavailable: (date) => {
      if (calendarProps?.disabled == null) return false
      const start = startOfISOWeek(date)
      return (
        dateMatchModifiers(start, calendarProps.disabled) ||
        dateMatchModifiers(endOfISOWeek(start), calendarProps.disabled)
      )
    },
    onCommitFromKeyboard: () => setOpen(false),
    onRequestOpen: () => setOpen(true)
  })

  return (
    <DatePickerField
      slot='date-week-picker'
      inputRef={inputRef}
      field={field}
      value={field.inputValue}
      placeholder={placeholder}
      disabled={disabled}
      empty={!weekStart}
      accessibleName={weekStart ? `Selected ${formatWeek(weekStart)}` : placeholder}
      id={id}
      ariaLabel={ariaLabel}
      ariaLabelledby={ariaLabelledby}
      calendarButtonLabel={calendarButtonLabel}
      open={open}
      onOpenChange={setOpen}
      className={className}
      inputClassName={buttonClassName}
      popupClassName='max-w-none'
    >
      <Calendar
        {...calendarProps}
        mode='range'
        selected={weekStart && weekEnd ? { from: weekStart, to: weekEnd } : undefined}
        weekStartsOn={1}
        onSelect={(_range, triggerDate) => {
          if (!triggerDate) return
          commitValue(startOfISOWeek(triggerDate))
          field.reset()
          setOpen(false)
        }}
        className={calendarClassName}
        numberOfMonths={numberOfMonths}
      />
    </DatePickerField>
  )
}

export { DatePicker, DateRangePicker, DateWeekPicker }
