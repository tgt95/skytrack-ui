# Date Picker

> A date selection control composed from Popover and Calendar.

- Package version: `0.1.5`
- Public export: `skytrack-ui/date-picker`
- Implementation: [`src/components/ui/date-picker.tsx`](../src/components/ui/date-picker.tsx)
- Public type declaration: generated declaration `dist-lib/components/ui/date-picker.d.ts` is absent in this checkout; source type declarations are exported in [`src/components/ui/date-picker.tsx`](../src/components/ui/date-picker.tsx).
- Showcase demo id: `date-picker`
- Closest demo: [`src/demos/date-picker.demo.tsx`](../src/demos/date-picker.demo.tsx)

## Overview

The Date Picker component combines a popover trigger button with an embedded DayPicker calendar view. It provides an intuitive single-date selection workflow, displaying the chosen date in a localized medium format and closing automatically upon selection.

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

DatePicker composes the following parts:

1. `Popover` (Overlay container managing open state)
2. `PopoverTrigger` (Renders the outlined button with `CalendarBlankIcon` and formatted date text)
3. `PopoverPortal` (Portals calendar overlay to avoid clipping in modal dialogs or containers)
4. `PopoverPositioner` (Positions popup aligned to bottom-start with a 4px offset)
5. `PopoverPopup` (Container panel styled with border and background tokens)
6. `Calendar` (Underlying single-mode calendar from `skytrack-ui/calendar`)

Consuming applications invoke `DatePicker` as a unified component with customization props.

**Live demo variant:** `DEFAULT`

## Variants & states

Supported configurations include:

- Controlled mode: via `value` (`Date`) and `onValueChange` callback.
- Uncontrolled mode: via `defaultValue`.
- States: open, closed, placeholder displayed, date selected, and `disabled`.
- Custom calendar props: passed through `calendarProps` for min/max dates, disabled date predicates, or month navigation.

**Live demo variant:** `CALENDAR`

## Accessibility

The trigger button includes appropriate accessible names via `aria-label` or `aria-labelledby`, and manages `aria-expanded` and `aria-haspopup='dialog'`. The popup calendar complies with ARIA grid conventions, allowing full keyboard navigation across days and months via arrow keys, PageUp/PageDown, Home, and End.

**Live demo variant:** `DEFAULT`

## API & examples

Import `DatePicker` and type `DatePickerProps` from `skytrack-ui/date-picker` or `@/components/ui/date-picker`. Common props include `value`, `defaultValue`, `onValueChange`, `placeholder`, `disabled`, `className`, `buttonClassName`, `calendarClassName`, and `calendarProps`.

**Live demo variant:** `DEFAULT`

## Evidence and limits

- Package/version checked: `0.1.5`.
- Export: [`package.json`](../package.json) — `./date-picker`.
- Source, public declarations, and closest demo: linked above.
- Limits or unverified behavior: The generated declaration `dist-lib/components/ui/date-picker.d.ts` is absent in this release; rely on source types from `src/components/ui/date-picker.tsx`. Currently DatePicker supports single date selection only; date ranges require composing Calendar directly.
