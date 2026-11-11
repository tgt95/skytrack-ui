# Date Picker

> A compact date field with a calendar for choosing a date.

- Package version: `0.1.5`
- Public export: `skytrack-ui/date-picker`
- Implementation: [`src/components/ui/date-picker.tsx`](../../../../../src/components/ui/date-picker.tsx)
- Public type declaration: Target `./dist-lib/components/ui/date-picker.d.ts` declared in [`package.json`](../../../../../package.json) is absent from this checkout; exported types verified in [`src/components/ui/date-picker.tsx`](../../../../../src/components/ui/date-picker.tsx).
- Showcase demo id: `date-picker`
- Closest demo: [`src/demos/date-picker.demo.tsx`](../../../../../src/demos/date-picker.demo.tsx)

## Usage

Use Date Picker when people need to choose a date and benefit from seeing a calendar, such as setting a start date or filtering a record history.

- **Fit:** Form fields requiring date entry with visual day-of-week context, and distant dates that are faster to type.
- **Avoid:** Screens dedicated primarily to timeline planning or multi-day schedule browsing where an inline calendar is preferred (use Calendar).
- **Best alternative:** For always-visible month grids, use Calendar.

**Live demo variant:** `DEFAULT`

## Types

Use an input-triggered single-date field for form entry, an inline calendar when date navigation is the main task, a range picker when both a start and end date belong to the same task, and a week picker when people plan in whole ISO weeks such as sprint or reporting periods.

**Live demo variant:** `DATE RANGE`

## Behavior

Clicking the calendar button inside the field opens the calendar popover positioned directly beneath the input, aligned to its left edge. Pressing `ArrowDown` in the field opens the same popover.

- **Direct entry:** People can type a date instead of picking one. Accepted text includes `2026-11-11`, `11/11/2026`, and `11 Nov 2026`; `Enter` or leaving the field commits it. Unparseable or unavailable dates show an invalid state and revert on blur.
- **Selection:** Selecting a day immediately updates the field value and closes the popover.
- **Date range:** Keep the calendar open after choosing the start date; close after the end date is selected. A completed range updates the field and helper text together.
- **Week:** Clicking any day selects that whole Monday-start ISO week and closes the popover. The field reads `2026, Week 47`. Style the week like a range: the first and last day of the week are the range endpoints and carry the primary background, the days in between carry the muted range background.
- **Keyboard dismissal:** Pressing `Escape` or clicking outside dismisses the popover without altering the date. `Escape` inside the field restores the last committed date.

| Do                                                        | Don't                                                                           | Why                                                                       |
| --------------------------------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| Mark unavailable dates clearly and prevent choosing them. | Let people choose unavailable dates and show an error only after they continue. | Early feedback helps people choose a valid date without extra correction. |

**Live demo variant:** `DATE RANGE`

## Layout

Place it in a form with a visible label and relevant supporting or error text.

- **Trigger:** Make the selected date and the calendar-opening affordance easy to recognize.
- **Popover alignment:** Left-align the calendar popover with the input trigger. It keeps that left edge as it grows wider than the field and only nudges to stay inside the viewport; it flips upward automatically near bottom viewport edges.
- **Mobile:** Popovers center responsively on small viewports or open as bottom sheets for comfortable thumb reach.

**Live demo variant:** `DEFAULT`

## Accessibility

Label the date field and communicate the selected date. When the calendar opens, focus the selected or current date. Arrow keys move between dates; Enter or Space selects.

**Live demo variant:** `DEFAULT`

## Content

Format selected dates clearly according to local conventions (e.g., "Oct 31, 2026" or "2026-10-31").

- **Placeholder:** When empty, display a helpful placeholder like "Select project start date...".
- **Helper text:** Clarify important date limits or timezone assumptions beside the field.

**Live demo variant:** `CALENDAR`
