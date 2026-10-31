# Calendar

> A month view for choosing dates and understanding their place in a schedule.

- Package version: `0.1.5`
- Public export: `skytrack-ui/calendar`
- Implementation: [`src/components/ui/calendar.tsx`](../../src/components/ui/calendar.tsx)
- Public type declaration: Target `./dist-lib/components/ui/calendar.d.ts` declared in [`package.json`](../../package.json) is absent from this checkout; exported types verified in [`src/components/ui/calendar.tsx`](../../src/components/ui/calendar.tsx).
- Showcase demo id: `date-picker`
- Closest demo: [`src/demos/date-picker.demo.tsx`](../../src/demos/date-picker.demo.tsx); no dedicated demo exists for Calendar; closest composition is the `CALENDAR` variant in `date-picker.demo.tsx`.
- Official guidance: [Carbon Design System Date Picker Usage](https://carbondesignsystem.com/components/date-picker/usage/)

## Usage

Use Calendar when people need an always-visible month view to review dates, compare availability, or choose a date in context.

- **Fit:** Dedicated scheduling dashboards and date range reservation panels.
- **Avoid:** Compact forms where space is constrained (use Date Picker), or distant dates like birthdates where direct typing is faster (use Input).
- **Best alternative:** For compact forms, use Date Picker.

**Live demo variant:** `CALENDAR`

## Types

Calendar supports three primary selection modes:

- **Single Date:** Selecting an individual project date.
- **Multiple Dates:** Picking non-consecutive patrol days.
- **Date Range:** Highlighting continuous maintenance windows with a connected background pill.

**Live demo variant:** `CALENDAR`

## Behavior

Clicking an enabled day selects or toggles it. In range mode, clicking start and end dates automatically connects intermediate days with a subtle background bar.

- **Navigation:** Chevron buttons increment or decrement the visible month.

| Do                                                | Don't                                                                        | Why                                                           |
| ------------------------------------------------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------- |
| Highlight today and make unavailable dates clear. | Let people choose unavailable dates and show an error only after submission. | Clear availability prevents avoidable errors and corrections. |

**Live demo variant:** `CALENDAR`

## Layout

Calendar acts as a major visual surface, usually placed inside a dedicated scheduling card or split-view workspace.

- **Grid:** Structured 7-column grid with 32–36px day cells balancing desktop density with touch precision.
- **Mobile viewports:** Scales to fill card width while preserving square day cells. Navigation buttons provide at least 44px tap targets.

**Live demo variant:** `CALENDAR`

## Accessibility

Make the selected date and date context available to assistive technology. Arrow keys move between dates, PageUp and PageDown change month, and Enter or Space selects.

**Live demo variant:** `CALENDAR`

## Content

Header displays month and four-digit year (e.g., "November 2026"). Day columns use 2-letter abbreviations ("Mo", "Tu", "We", "Th", "Fr", "Sa", "Su").

- **Formatting:** Format selected date feedback clearly (e.g., "Selected: Fri, Nov 14, 2026").

**Live demo variant:** `CALENDAR`
