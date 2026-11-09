# Slider

> An input for selecting a value (or a range) from a bounded set.

- Package version: `0.1.5`
- Public export: `skytrack-ui/slider`
- Implementation: [`src/components/ui/slider.tsx`](../../../../../src/components/ui/slider.tsx)
- Public type declaration: [`dist-lib/components/ui/slider.d.ts`](../../../../../dist-lib/components/ui/slider.d.ts) (matches source version `0.1.5`)
- Showcase demo id: `slider`
- Closest demo: [`src/demos/slider.demo.tsx`](../../../../../src/demos/slider.demo.tsx)

## Overview

The Slider component allows users to choose a single numeric value or a range from a continuous or discrete interval. Built on Base UI Slider, it features accessible keyboard adjustments, touch-friendly scrub physics, horizontal or vertical orientations, and configurable thumb alignment.

**Live demo variant:** `Demo`

```tsx
import {
  Slider,
  SliderControl,
  SliderIndicator,
  SliderLabel,
  SliderThumb,
  SliderTrack,
  SliderValue
} from '@/components/ui/slider'

export function SliderDemo() {
  return (
    <Slider defaultValue={65} min={0} max={100} step={5} className='w-64'>
      <div className='flex justify-between'>
        <SliderLabel>Telemetry refresh rate</SliderLabel>
        <SliderValue />
      </div>
      <SliderControl>
        <SliderTrack>
          <SliderIndicator />
          <SliderThumb />
        </SliderTrack>
      </SliderControl>
    </Slider>
  )
}
```

## Usage

Use Slider when users need to adjust subjective or continuous values (volume, brightness, zoom level, percentage thresholds, time scrubbing) where precise numerical typing is secondary. When exact numerical precision is essential, pair or replace with `NumberField`.

**Live demo variant:** `Labeling a slider`

## Anatomy

### Composition Tree

```text
<Slider value={value} onValueChange={setValue} min={0} max={100} step={1}>
├─ <div className='flex justify-between'>
│  ├─ <SliderLabel>Altitude</SliderLabel>
│  └─ <SliderValue />
└─ <SliderControl>
   ├─ <SliderTrack>
   │  └─ <SliderIndicator />
   └─ <SliderThumb />
</Slider>
```

Slider is composed of the following parts:

1. `Slider` (Root provider managing value, bounds, and layout)
2. `SliderLabel` (Accessible text label)
3. `SliderValue` (Formatted numeric readout styled with tabular figures)
4. `SliderControl` (Touch and mouse interaction area)
5. `SliderTrack` (Background channel rail)
6. `SliderIndicator` (Active highlighted segment of the track)
7. `SliderThumb` (Draggable handle element)

For dual-handle range sliders, pass multiple `SliderThumb` elements inside the track.

**Live demo variant:** `Demo`

## Variants & states

Supported variants and options:

- `orientation`: `horizontal` (default) or `vertical`.
- `thumbAlignment`: `edge` (stops thumb at track boundary) or `center`.
- `min`, `max`, `step`: Define the continuous or discrete range.
- Range mode: Array values (e.g. `[20, 80]`) render multi-thumb ranges.
- `disabled`: Dimmed appearance with `pointer-events-none`.

**Live demo variant:** `Range slider`

## Accessibility

`SliderThumb` renders with `role='slider'`, managing `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, and `aria-orientation`. Keyboard navigation allows modifying values with `ArrowLeft`/`ArrowDown` (decrement), `ArrowRight`/`ArrowUp` (increment), `PageDown`/`PageUp` (larger step jumps), and `Home`/`End` (minimum/maximum bounds).

**Live demo variant:** `Disabled`

## API & examples

Import from `skytrack-ui/slider` or `@/components/ui/slider`. Core props on `Slider`: `value`, `defaultValue`, `onValueChange`, `min`, `max`, `step`, `orientation`, `thumbAlignment`, and `disabled`.

**Live demo variant:** `Controlled`

## Evidence and limits

- Package/version checked: `0.1.5`.
- Export: [`package.json`](../../../../../package.json) — `./slider`.
- Source, public declarations, and closest demo: linked above.
- Limits or unverified behavior: When `orientation='vertical'` is selected, ensure a fixed height (e.g. `h-44`) is set on the container to display the vertical rail.
