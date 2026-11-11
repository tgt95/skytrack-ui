# Date Picker

> A date selection control composed from Popover and Calendar.

- Package version: `0.1.5`
- Public export: `skytrack-ui/date-picker`
- Implementation: [`src/components/ui/date-picker.tsx`](../../../../../src/components/ui/date-picker.tsx)
- Public type declaration: generated declaration `dist-lib/components/ui/date-picker.d.ts` is absent in this checkout; source type declarations are exported in [`src/components/ui/date-picker.tsx`](../../../../../src/components/ui/date-picker.tsx).
- Showcase demo id: `date-picker`
- Closest demo: [`src/demos/date-picker.demo.tsx`](../../../../../src/demos/date-picker.demo.tsx)

## Overview

The Date Picker component combines an editable date Input with a calendar button that opens an embedded DayPicker calendar view. People can pick a day from the calendar or type a date into the field. `DatePicker` supports a single date; `DateRangePicker` supports a start/end range, remains open until the range is complete, and is pick-only; `DateWeekPicker` selects a whole Monday-start ISO week, highlights all seven days, and is pick-only.

**Live demo variant:** `DEFAULT`

```tsx
import * as React from 'react'
import { DatePicker } from '@/components/ui/date-picker'
import { FieldDescription, FieldLabel, FieldRoot } from '@/components/ui/field'

export function DatePickerDemo() {
  const [date, setDate] = React.useState<Date>()

  return (
    <FieldRoot className='w-64'>
      <FieldLabel>Departure date</FieldLabel>
      <DatePicker value={date} onValueChange={setDate} placeholder='Pick flight date' />
      <FieldDescription>
        {date
          ? `Selected: ${new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(date)}`
          : 'Choose a calendar day'}
      </FieldDescription>
    </FieldRoot>
  )
}
```

## Usage

Use Date Picker for choosing specific dates in scheduling, flight planning, filter ranges, or birthday inputs. If the user needs to view a full monthly grid permanently embedded on the page, use the standalone `Calendar` component directly. If only a month, year, or freeform text entry is needed, standard Input or Select may be more appropriate.

**Live demo variant:** `DEFAULT`

## Anatomy

### Composition Tree

```text
<DatePicker value={date} onValueChange={setDate}>
└─ <Popover>
   ├─ <Input startAdornment={<PopoverTrigger render={<button />}><CalendarBlankIcon /></PopoverTrigger>} ... />
   └─ <PopoverPortal>
      └─ <PopoverPositioner anchor={inputRef} align='start'>
         └─ <PopoverPopup>
            └─ <Calendar value={date} onValueChange={setDate} />
```

DatePicker composes the following parts:

1. `Popover` (Overlay container managing open state)
2. `PopoverTrigger` (Renders a small icon button inside the Input's `startAdornment`; the Input itself stays a normal text field so people can type)
3. `PopoverPortal` (Portals calendar overlay to avoid clipping in modal dialogs or containers)
4. `PopoverPositioner` (Anchored to the Input element, aligned to its left edge, with a 4px offset and `collisionAvoidance={{ align: 'shift' }}` so the calendar never flips to right-alignment when it is wider than the field)
5. `PopoverPopup` (Container panel styled with border and background tokens)
6. `Calendar` (Underlying single or range calendar from `skytrack-ui/calendar`)

Consuming applications invoke `DatePicker` as a unified component with customization props.

**Live demo variant:** `DEFAULT`

## Variants & states

Supported configurations include:

- Controlled mode: via `value` (`Date`) and `onValueChange` callback.
- Uncontrolled mode: via `defaultValue`.
- States: open, closed, placeholder displayed, date selected, invalid typed text (`aria-invalid`), and `disabled`.
- Direct entry: typing a date and pressing `Enter` or leaving the field commits it. Accepted text is ISO (`2026-11-11`), numeric dates in the locale order or an unambiguous day-first/month-first order (`11/11/2026`, `11-11-2026`, `11.11.2026`), and month-name dates (`11 Nov 2026`, `Nov 11, 2026`). Impossible or disabled dates are rejected; unparseable text reverts to the last committed date on blur.
- Custom calendar props: passed through `calendarProps` for min/max dates, disabled date predicates, or month navigation. The `disabled` matcher also rejects typed dates.
- Range mode: use `DateRangePicker` with a `DateRange` value; the popup closes after both endpoints are selected.
- Week mode: use `DateWeekPicker`. Clicking any day selects the ISO-8601 week that contains it and closes the popup. The value is the Monday that starts that week, and the field reads `2026, Week 47`. Weeks always start on Monday regardless of locale. The calendar renders the week as a range, so the selection looks the same as the date range picker: Monday and Sunday carry the primary background as the range start and end, and the days between carry the muted range-middle background.

**Live demo variant:** `CALENDAR`

## Accessibility

The field is a normal text input named by `aria-label` or `aria-labelledby`, with a separate `Open calendar` icon button (`calendarButtonLabel`) that exposes `aria-expanded` and `aria-haspopup='dialog'`. An empty selection shows `placeholder`; a selected date is written as the input's formatted value. Focus selects the whole value so typing replaces it, `ArrowDown` opens the calendar, `Enter` commits typed text, and `Escape` restores the last committed date. Invalid typed text sets `aria-invalid`. The popup calendar complies with ARIA grid conventions, allowing full keyboard navigation across days and months via arrow keys, PageUp/PageDown, Home, and End.

**Live demo variant:** `DEFAULT`

## API & examples

Import `DatePicker`, `DateRangePicker`, `DateWeekPicker`, `DatePickerProps`, `DateRangePickerProps`, and `DateWeekPickerProps` from `skytrack-ui/date-picker` or `@/components/ui/date-picker`. All three controls support `value`, `defaultValue`, `onValueChange`, `placeholder`, `disabled`, `className`, `buttonClassName`, `calendarClassName`, and `calendarProps`; `DatePicker` also accepts `calendarButtonLabel` for the icon button's accessible name. `buttonClassName` keeps its historical name but now styles the `Input` (it is applied to the input's wrapper). Single values use `Date`; range values use `DateRange` from `react-day-picker`; week values use the `Date` that starts the selected ISO week (the component normalizes any date in that week to its Monday).

**Live demo variant:** `DEFAULT`

## Evidence and limits

- Package/version checked: `0.1.5`.
- Export: [`package.json`](../../../../../package.json) — `./date-picker`.
- Source, public declarations, and closest demo: linked above.
- Limits or unverified behavior: The generated declaration `dist-lib/components/ui/date-picker.d.ts` is absent in this checkout; rely on source types from `src/components/ui/date-picker.tsx`. Time picking is not part of these controls and needs a separate time-entry composition.
