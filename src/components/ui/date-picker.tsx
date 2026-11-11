import * as React from 'react'
import { CalendarBlankIcon } from '@phosphor-icons/react'
import { dateMatchModifiers, type DateRange, type DayPickerProps } from 'react-day-picker'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import { Popover, PopoverPortal, PopoverPositioner, PopoverPopup, PopoverTrigger } from '@/components/ui/popover'
import { parseDateInput } from '@/lib/date-input'
import { focusRing } from '@/lib/focus-ring'
import { cn } from '@/lib/utils'

type DistributiveOmit<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never

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

/** Monday that starts the ISO-8601 week containing `date`. */
function startOfISOWeek(date: Date) {
  const start = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  start.setDate(start.getDate() - ((start.getDay() + 6) % 7))
  return start
}

/** Sunday that ends the ISO-8601 week starting on `weekStart`. */
function endOfISOWeek(weekStart: Date) {
  const end = new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate())
  end.setDate(end.getDate() + 6)
  return end
}

/** ISO-8601 week-year and week number for a date, e.g. `2026, Week 45`. */
function getISOWeek(date: Date) {
  const thursday = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  const dayNumber = thursday.getDay() || 7
  thursday.setDate(thursday.getDate() + 4 - dayNumber)
  const weekYear = thursday.getFullYear()
  const yearStart = new Date(weekYear, 0, 1)
  const week = Math.ceil(((thursday.getTime() - yearStart.getTime()) / 86_400_000 + 1) / 7)
  return { weekYear, week }
}

function formatWeekLabel(date: Date) {
  const { weekYear, week } = getISOWeek(date)
  return `${weekYear}, Week ${week}`
}

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
  calendarProps?: DistributiveOmit<
    Extract<DayPickerProps, { mode: 'single' }>,
    'mode' | 'selected' | 'onSelect' | 'captionLayout' | 'navLayout'
  >
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
  calendarProps?: DistributiveOmit<
    Extract<DayPickerProps, { mode: 'range' }>,
    'mode' | 'selected' | 'onSelect' | 'captionLayout' | 'navLayout'
  >
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
  calendarProps?: DistributiveOmit<
    Extract<DayPickerProps, { mode: 'range' }>,
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
    calendarButtonLabel = 'Open calendar',
    calendarProps
  } = props
  const [internalValue, setInternalValue] = React.useState<Date | undefined>(defaultValue)
  const [open, setOpen] = React.useState(false)
  // `draft` is the text the user is typing; `null` means the field shows the formatted value.
  const [draft, setDraft] = React.useState<string | null>(null)
  const [invalid, setInvalid] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const anchor = React.useCallback(() => resolveFieldAnchor(inputRef.current), [])
  const selectAllOnMouseUpRef = React.useRef(false)
  const isControlled = Object.prototype.hasOwnProperty.call(props, 'value')
  const selectedDate = isControlled ? value : internalValue
  const formatter = React.useMemo(() => new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }), [])
  const locale = formatter.resolvedOptions().locale
  const formattedValue = selectedDate ? formatter.format(selectedDate) : ''
  const inputValue = draft ?? formattedValue

  const commitValue = (nextValue: Date | undefined) => {
    if (!isControlled) setInternalValue(nextValue)
    onValueChange?.(nextValue)
  }

  const isUnavailableDate = (date: Date | undefined) =>
    date == null || (calendarProps?.disabled != null && dateMatchModifiers(date, calendarProps.disabled))

  const commitDraft = () => {
    if (draft === null) return true

    // Unchanged text (including a locale display format the parser cannot read) keeps the value.
    if (draft === formattedValue) {
      setDraft(null)
      setInvalid(false)
      return true
    }

    const text = draft.trim()
    if (!text) {
      commitValue(undefined)
      setDraft(null)
      setInvalid(false)
      return true
    }

    const parsed = parseDateInput(text, formatter.resolvedOptions().locale)
    if (isUnavailableDate(parsed)) {
      setInvalid(true)
      return false
    }

    commitValue(parsed)
    setDraft(null)
    setInvalid(false)
    return true
  }

  const handleSelect = (nextValue: Date | undefined) => {
    commitValue(nextValue)
    setDraft(null)
    setInvalid(false)
    setOpen(false)
  }

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    setDraft(formattedValue)
    setInvalid(false)
    selectAllOnMouseUpRef.current = true
    event.currentTarget.select()
  }

  const handleMouseUp = (event: React.MouseEvent<HTMLInputElement>) => {
    if (!selectAllOnMouseUpRef.current) return
    event.preventDefault()
    selectAllOnMouseUpRef.current = false
  }

  const handleBlur = () => {
    selectAllOnMouseUpRef.current = false
    if (commitDraft()) return
    // Unparseable text reverts to the last committed date instead of staying in the field.
    setDraft(null)
    setInvalid(false)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      if (commitDraft()) setOpen(false)
      return
    }

    if (event.key === 'Escape') {
      if (draft !== null) {
        setDraft(null)
        setInvalid(false)
      }
      return
    }

    if (event.key === 'ArrowDown' && !open) {
      event.preventDefault()
      setOpen(true)
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div data-slot='date-picker' className={cn('w-full', className)}>
        <Input
          ref={inputRef}
          disabled={disabled}
          id={id}
          type='text'
          value={inputValue}
          placeholder={placeholder}
          autoComplete='off'
          spellCheck={false}
          data-empty={!selectedDate}
          data-invalid={invalid ? '' : undefined}
          aria-invalid={invalid || undefined}
          aria-label={
            ariaLabel ??
            (id || ariaLabelledby ? undefined : selectedDate ? `Selected date: ${formattedValue}` : placeholder)
          }
          aria-labelledby={ariaLabelledby}
          className={cn('w-full', buttonClassName)}
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
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={(event) => {
            const nextDraft = event.target.value
            setDraft(nextDraft)
            setInvalid(nextDraft.trim().length > 0 && isUnavailableDate(parseDateInput(nextDraft, locale)))
          }}
          onKeyDown={handleKeyDown}
          onMouseUp={handleMouseUp}
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
    calendarProps
  } = props
  const [internalValue, setInternalValue] = React.useState<DateRange | undefined>(defaultValue)
  const [open, setOpen] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const anchor = React.useCallback(() => resolveFieldAnchor(inputRef.current), [])
  const isControlled = Object.prototype.hasOwnProperty.call(props, 'value')
  const selectedRange = isControlled ? value : internalValue
  const formatDate = React.useCallback(
    (date: Date) => new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(date),
    []
  )
  const label = selectedRange?.from
    ? selectedRange.to
      ? `${formatDate(selectedRange.from)} – ${formatDate(selectedRange.to)}`
      : `${formatDate(selectedRange.from)} – Select end date`
    : placeholder

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div data-slot='date-range-picker' className={cn('w-full', className)}>
        <PopoverTrigger
          nativeButton={false}
          render={
            <Input
              ref={inputRef}
              disabled={disabled}
              id={id}
              value={selectedRange?.from ? label : ''}
              placeholder={placeholder}
              readOnly
              startAdornment={<CalendarBlankIcon aria-hidden='true' />}
              data-empty={!selectedRange?.from}
              aria-label={ariaLabel ?? (id || ariaLabelledby ? undefined : label)}
              aria-labelledby={ariaLabelledby}
              className={cn('w-full', buttonClassName)}
            />
          }
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
          <PopoverPopup className='w-auto max-w-none p-0'>
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

                if (!isControlled) setInternalValue(normalizedRange)
                onValueChange?.(normalizedRange)
                if (normalizedRange?.from && normalizedRange.to) setOpen(false)
              }}
              className={calendarClassName}
              {...calendarProps}
            />
          </PopoverPopup>
        </PopoverPositioner>
      </PopoverPortal>
    </Popover>
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
    calendarProps
  } = props
  const [internalValue, setInternalValue] = React.useState<Date | undefined>(defaultValue)
  const [open, setOpen] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const anchor = React.useCallback(() => resolveFieldAnchor(inputRef.current), [])
  const isControlled = Object.prototype.hasOwnProperty.call(props, 'value')
  const selectedDate = isControlled ? value : internalValue
  const weekStart = selectedDate ? startOfISOWeek(selectedDate) : undefined
  const weekEnd = weekStart ? endOfISOWeek(weekStart) : undefined
  const label = weekStart ? formatWeekLabel(weekStart) : ''

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div data-slot='date-week-picker' className={cn('w-full', className)}>
        <PopoverTrigger
          nativeButton={false}
          render={
            <Input
              ref={inputRef}
              disabled={disabled}
              id={id}
              value={label}
              placeholder={placeholder}
              readOnly
              startAdornment={<CalendarBlankIcon aria-hidden='true' />}
              data-empty={!weekStart}
              aria-label={
                ariaLabel ?? (id || ariaLabelledby ? undefined : weekStart ? `Selected ${label}` : placeholder)
              }
              aria-labelledby={ariaLabelledby}
              className={cn('w-full', buttonClassName)}
            />
          }
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
          <PopoverPopup className='w-auto max-w-none p-0'>
            <Calendar
              {...calendarProps}
              mode='range'
              selected={weekStart && weekEnd ? { from: weekStart, to: weekEnd } : undefined}
              weekStartsOn={1}
              onSelect={(_range, triggerDate) => {
                if (!triggerDate) return
                const nextWeek = startOfISOWeek(triggerDate)
                if (!isControlled) setInternalValue(nextWeek)
                onValueChange?.(nextWeek)
                setOpen(false)
              }}
              className={calendarClassName}
            />
          </PopoverPopup>
        </PopoverPositioner>
      </PopoverPortal>
    </Popover>
  )
}

export { DatePicker, DateRangePicker, DateWeekPicker }
