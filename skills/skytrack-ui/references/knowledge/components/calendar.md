# Calendar

> A standalone month-grid calendar for selecting dates.

- Package version: `0.1.5`
- Public export: `skytrack-ui/calendar`
- Implementation: [`src/components/ui/calendar.tsx`](../../../../../src/components/ui/calendar.tsx)
- Public type declaration: Target `./dist-lib/components/ui/calendar.d.ts` declared in [`package.json`](../../../../../package.json) is absent from this checkout; exported types verified in [`src/components/ui/calendar.tsx`](../../../../../src/components/ui/calendar.tsx).
- Showcase demo id: `date-picker`
- Closest demo: [`src/demos/date-picker.demo.tsx`](../../../../../src/demos/date-picker.demo.tsx); no dedicated demo exists for calendar, closest composition is the `CALENDAR` variant in `date-picker.demo.tsx`.

## Overview

The Calendar component provides an accessible month-grid calendar view for selecting single dates, multiple dates, or date ranges. It is tailored for scheduling drone flights, setting maintenance intervals, filtering telemetry historical logs, and reviewing airspace availability windows.

Composed on top of `react-day-picker` and integrated with SkyTrack design system buttons and menu dropdowns, it supports custom month/year navigation, keyboard traversal, and locale-aware formatting.

**Live demo variant:** `CALENDAR`

```tsx
import * as React from 'react'
import { Calendar } from '@/components/ui/calendar'

export function CalendarExample() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <Calendar
      mode='single'
      selected={date}
      onSelect={setDate}
      className='rounded-(--radius) border border-border p-3'
    />
  )
}
```

## Usage

Use Calendar when operators need a standalone calendar grid to pick flight windows, visualize scheduled operations across days, or define date boundaries.

Do not use Calendar when screen space is limited or when date selection occurs inside a compact form field; instead, use `skytrack-ui/date-picker`, which embeds Calendar inside a popover. Do not use Calendar for time-of-day selection without companion time inputs.

**Live demo variant:** `CALENDAR`

## Anatomy

### Composition Tree

```text
<Calendar mode='single|multiple|range' value={...} onValueChange={...}>
  (Renders internal month header/captions, prev/next buttons, weekday row, and day grid cells)
</Calendar>
```

The Calendar renders a full tabular date structure (`data-slot='calendar'`):

1. Month Header & Caption: Displays the current month and year label, or interactive `MonthSelector` and `YearSelector` menu dropdowns when enabled.
2. Navigation Buttons: Previous and Next month buttons using `CaretLeftIcon` and `CaretRightIcon` styled with `Button` outline variant.
3. Weekday Row: Semantic table header (`thead`) listing localized abbreviated day names (Mon, Tue, Wed, etc.).
4. Month Grid: Table body (`tbody`) containing week rows (`tr`) and day cells (`td`).
5. Day Button: Individual cell button with hover, today indicator, range highlights, and selection tokens.

**Live demo variant:** `CALENDAR`

## Variants & states

Selection modes via `mode` prop:

- `single`: Selects one discrete `Date`.
- `multiple`: Selects an array of dates (`Date[]`).
- `range`: Selects a start and end interval (`DateRange`).

Visual states:

- Selected: Primary solid background (`bg-primary text-primary-foreground`).
- Range Middle: Accent background (`aria-selected:bg-accent`) connecting range endpoints.
- Today: Subtle outline or accent highlight indicating the current date.
- Outside: Faded opacity (`text-muted-foreground opacity-50`) for days from adjacent months.
- Disabled: Non-interactive days (`pointer-events-none opacity-50`).

**Live demo variant:** `CALENDAR`

## Accessibility

- Full keyboard navigation: `ArrowLeft`, `ArrowRight`, `ArrowUp`, and `ArrowDown` navigate across days; `PageUp` and `PageDown` advance or reverse by month; `Home` and `End` jump to the week boundaries.
- Uses standard WAI-ARIA grid semantics: `role='grid'`, `role='row'`, `role='gridcell'`.
- Day buttons announce localized day names, month, year, and selection status via `aria-selected` and `aria-label`.

**Live demo variant:** `CALENDAR`

## API & examples

Import `Calendar` and `type CalendarProps` from `skytrack-ui/calendar` (or `@/components/ui/calendar` locally).

| Prop                      | Type                                                                                                                         | Default     | Description                            |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ----------- | -------------------------------------- |
| `mode`                    | `'single' \| 'multiple' \| 'range' \| 'default'`                                                                             | `'single'`  | Selection mode behavior                |
| `selected`                | `Date \| Date[] \| DateRange \| undefined`                                                                                   | `undefined` | Selected date value(s) matching mode   |
| `onSelect`                | `((date: Date \| undefined) => void) \| ((dates: Date[] \| undefined) => void) \| ((range: DateRange \| undefined) => void)` | `undefined` | Selection change handler matching mode |
| `startMonth` / `endMonth` | `Date`                                                                                                                       | `undefined` | Bounds for navigability                |
| `disabled`                | `Matcher \| Matcher[]`                                                                                                       | `undefined` | Dates barred from selection            |

Note: `captionLayout` and `navLayout` are omitted from `CalendarProps` and preset to `'label'` and `'around'`. Uses `--border`, `--accent`, `--primary`, and `--muted-foreground` tokens.

**Live demo variant:** `CALENDAR`

## Evidence and limits

- Package/version checked: `0.1.5`.
- Export: [`package.json`](../../../../../package.json) — `./calendar`.
- Source, public declarations, and closest demo: linked above.
- Limits or unverified behavior: Target declaration `./dist-lib/components/ui/calendar.d.ts` is absent in `dist-lib`; source types verified in `src/components/ui/calendar.tsx`. No standalone `calendar.demo.tsx` exists; demo verified via `date-picker.demo.tsx` variant `CALENDAR`.
