# Number Field

> A numeric input with increment and decrement controls.

- Package version: `0.1.5`
- Public export: `skytrack-ui/number-field`
- Implementation: [`src/components/ui/number-field.tsx`](../src/components/ui/number-field.tsx)
- Public type declaration: [`dist-lib/components/ui/number-field.d.ts`](../dist-lib/components/ui/number-field.d.ts) (matches source version `0.1.5`)
- Showcase demo id: `number-field`
- Closest demo: [`src/demos/number-field.demo.tsx`](../src/demos/number-field.demo.tsx)

## Overview

The Number Field component provides a specialized numeric entry input flanked by increment and decrement stepper controls. Built on Base UI NumberField, it supports bounded values, customized step intervals, keyboard increment adjustments, and optional scrub areas for rapid scrub-adjust interactions.

**Live demo variant:** `Demo`

```tsx
import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput
} from '@/components/ui/number-field'
import { FieldLabel, FieldRoot } from '@/components/ui/field'

export function NumberFieldDemo() {
  return (
    <FieldRoot className='w-48'>
      <FieldLabel>Cruising altitude (FL)</FieldLabel>
      <NumberField defaultValue={320} min={100} max={450} step={10}>
        <NumberFieldGroup size='default'>
          <NumberFieldDecrement />
          <NumberFieldInput />
          <NumberFieldIncrement />
        </NumberFieldGroup>
      </NumberField>
    </FieldRoot>
  )
}
```

## Usage

Use Number Field when users need to enter and fine-tune precise numerical values (such as altitudes, quantities, dimensions, coordinates, or timeouts). When the user is selecting an approximate value from a continuous range, consider `Slider`. When values represent dates or times, use `DatePicker` or specialized time controls.

**Live demo variant:** `Min, max and step`

## Anatomy

Number Field exports the following parts:

1. `NumberField` (Root provider managing numeric value, min, max, step, and state)
2. `NumberFieldGroup` (Flex container uniting input and stepper buttons into a continuous control border)
3. `NumberFieldInput` (Text input formatted for tabular numerical display)
4. `NumberFieldDecrement` (Button decrementing the current value by `step`)
5. `NumberFieldIncrement` (Button incrementing the current value by `step`)
6. `NumberFieldScrubArea` & `NumberFieldScrubAreaCursor` (Optional drag-scrubber surface)

The minimal valid composition includes `NumberField`, `NumberFieldGroup`, `NumberFieldDecrement`, `NumberFieldInput`, and `NumberFieldIncrement`.

**Live demo variant:** `Demo`

## Variants & states

Supported variants and options:

- `size`: Available in `xs`, `sm`, `default`, and `lg` on `NumberFieldGroup` and `NumberFieldInput`.
- `disabled`: Disables input and stepper buttons.
- `readOnly`: Allows value selection without permitting mutations.
- `min`, `max`, `step`, and `largeStep`: Boundaries and step increments.
- Tabular figures: Inputs utilize `tabular-nums` to ensure stable digit alignment during increments.

**Live demo variant:** `Button-aligned sizes`

## Accessibility

Renders with `role='spinbutton'`, exposing `aria-valuenow`, `aria-valuemin`, and `aria-valuemax`. Keyboard interaction allows adjusting values using `ArrowUp` and `ArrowDown` (by `step`), `PageUp` and `PageDown` (by `largeStep`), and `Home`/`End` (to min/max boundaries). Stepper buttons are accessible via mouse, touch, or click.

**Live demo variant:** `Disabled`

## API & examples

Import components from `skytrack-ui/number-field` or `@/components/ui/number-field`. Key root props: `value`, `defaultValue`, `onValueChange`, `min`, `max`, `step`, `largeStep`, `disabled`, and `readOnly`.

**Live demo variant:** `Controlled`

## Evidence and limits

- Package/version checked: `0.1.5`.
- Export: [`package.json`](../package.json) — `./number-field`.
- Source, public declarations, and closest demo: linked above.
- Limits or unverified behavior: When using `size='xs'`, stepper buttons are typically rendered in an inline horizontal group or adjusted for compact toolbars.
