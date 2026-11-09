# Meter

> A high-quality, unstyled React meter component that provides a graphical display of a numeric value.

- Package version: `0.1.5`
- Public export: `skytrack-ui/meter`
- Implementation: [`src/components/ui/meter.tsx`](../../../../../src/components/ui/meter.tsx)
- Public type declaration: [`dist-lib/components/ui/meter.d.ts`](../../../../../dist-lib/components/ui/meter.d.ts)
- Showcase demo id: `meter`
- Closest demo: [`src/demos/meter.demo.tsx`](../../../../../src/demos/meter.demo.tsx)

## Overview

The Meter component displays a graphical gauge representing a numeric scalar value within a known fixed range. In SkyTrack, it communicates physical drone metrics—such as battery charge level, disk storage consumption, payload link signal quality, and motor thermal limits.

Unlike progress indicators that track task completion toward 100%, a meter depicts a quantity or capacity measurement.

**Live demo variant:** `Storage used`

```tsx
import { Meter, MeterLabel, MeterValue, MeterTrack, MeterIndicator } from '@/components/ui/meter'

export function MeterExample() {
  return (
    <Meter value={74} max={100} className='w-64'>
      <MeterLabel>Battery level</MeterLabel>
      <MeterValue />
      <MeterTrack>
        <MeterIndicator />
      </MeterTrack>
    </Meter>
  )
}
```

## Usage

Use Meter for read-only measurements of resource capacity, hardware sensors, battery charge, or signal strength where upper and lower boundaries are known.

Do not use Meter to show the progress of an asynchronous process, file upload, or multi-step wizard (use `skytrack-ui/progress`). Do not use Meter as an interactive input slider (use `skytrack-ui/slider`).

**Live demo variant:** `Battery level`

## Anatomy

### Composition Tree

```text
<Meter value={75} min={0} max={100}>
├─ <MeterLabel>Storage used</MeterLabel>
├─ <MeterValue>75%</MeterValue>
└─ <MeterTrack>
   └─ <MeterIndicator />
</Meter>
```

Render in strict two-column grid order:

1. `Meter`: Root 2-column grid container (`data-slot='meter'`).
2. `MeterLabel`: Text description of the measurement (`data-slot='meter-label'`), placed in the top-left cell.
3. `MeterValue`: Formatted textual representation of current value (`data-slot='meter-value'`), right-aligned in top-right cell.
4. `MeterTrack`: Full-width background track (`data-slot='meter-track'`), spanning both columns (`col-span-2 h-3 bg-muted`).
5. `MeterIndicator`: Filled portion representing the value (`data-slot='meter-indicator'`), styled with `bg-primary` and 500ms width transitions.

**Live demo variant:** `Storage used`

## Variants & states

Supported props on `Meter`:

- `value`: Current numerical magnitude.
- `min` (default 0) & `max` (default 100): Fixed metric boundaries.
- `format`: NumberFormat options object (e.g. `{ style: 'percent' }` or `{ style: 'unit', unit: 'gigabyte' }`).
- Semantic indicator colors can be customized with theme tokens, such as `bg-success` for a healthy battery and `bg-destructive` for a critical battery, through `MeterIndicator`.

**Live demo variant:** `Battery level`

## Accessibility

- Built on `@base-ui/react/meter`:
- Renders with ARIA `role='meter'`.
- Automatically connects `aria-valuenow`, `aria-valuemin`, and `aria-valuemax`.
- `MeterLabel` is automatically linked via `aria-labelledby`, and `MeterValue` supplies `aria-valuetext` when formatted.
- High contrast between track and indicator ensures clear readability in sunlight.

**Live demo variant:** `Storage used`

## API & examples

Import named parts from `skytrack-ui/meter` (or `@/components/ui/meter` locally).

| Component        | Target Props                                                                         | Description                           |
| ---------------- | ------------------------------------------------------------------------------------ | ------------------------------------- |
| `Meter`          | `value: number`, `min?: number`, `max?: number`, `format?: Intl.NumberFormatOptions` | Root component                        |
| `MeterLabel`     | `children: ReactNode`                                                                | Gauge title                           |
| `MeterValue`     | —                                                                                    | Automatically renders formatted value |
| `MeterTrack`     | `className?: string`                                                                 | Gauge background bar                  |
| `MeterIndicator` | `className?: string`                                                                 | Gauge progress fill bar               |

Tokens: Uses `--primary`, `--muted`, `--foreground`, and `--radius`.

**Live demo variant:** `Battery level`

## Evidence and limits

- Package/version checked: `0.1.5`.
- Export: [`package.json`](../../../../../package.json) — `./meter`.
- Source, public declarations, and closest demo: linked above.
- Limits or unverified behavior: None found in inspected source. Meter is read-only; user input should use `slider`.
