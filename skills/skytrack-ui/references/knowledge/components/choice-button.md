# Choice Button

> Chip-like radio choices in a group; checked appearance, shared size, and checkmark are configurable.

- Package version: `0.1.6`
- Public export: `skytrack-ui/choice-button`
- Implementation: [`src/components/ui/choice-button.tsx`](../../../../../src/components/ui/choice-button.tsx)
- Public type declaration: `src/components/ui/choice-button.tsx` (the dist-lib declaration appears on the next lib build; no build ran for this task)
- Showcase demo id: `choice-button`
- Closest demo: [`src/demos/choice-button.demo.tsx`](../../../../../src/demos/choice-button.demo.tsx)

## Overview

Choice Group and Choice Button wrap Base UI Radio with a chip treatment for single-choice selections. `ChoiceGroup` owns the one selected value (`value` / `onValueChange`, or `defaultValue`) and Base UI's keyboard radio navigation; each `ChoiceButton` renders one option with real radio semantics.

The checked choice shows a `CheckIcon` by default and uses a filled primary surface. Set `selectedVariant='subtle'` for a primary border with a secondary surface, or `showCheckmark={false}` to hide the decorative icon. The unchecked choice stays an outlined chip.

**Live demo variant:** `Default`

```tsx
import * as React from 'react'
import { ChoiceButton, ChoiceGroup } from '@/components/ui/choice-button'

export function PriorityChoice() {
  const [value, setValue] = React.useState('normal')

  return (
    <ChoiceGroup aria-label='Mission priority' value={value} onValueChange={(next) => setValue(String(next))}>
      <ChoiceButton value='low'>Low</ChoiceButton>
      <ChoiceButton value='normal'>Normal</ChoiceButton>
      <ChoiceButton value='high'>High</ChoiceButton>
    </ChoiceGroup>
  )
}
```

## Usage

- Use Choice Button when a short set of mutually exclusive choices should read as compact chips rather than dot radios; for the dot treatment use `skytrack-ui/radio`.
- Render `ChoiceButton` only inside `ChoiceGroup`; the group owns single-choice behavior and the keyboard model.
- Give the group an accessible name: `aria-label`, or a visible label referenced through `aria-labelledby`.
- Selecting a checked choice keeps it selected; radio groups have no unselect action. If people must be able to clear the answer, use `skytrack-ui/checkbox` or `skytrack-ui/toggle` instead.
- Do not use Choice Button for multi-select; `skytrack-ui/checkbox-group` owns that role.

**Live demo variant:** `Default value`

## Anatomy

### Composition Tree

```text
<ChoiceGroup aria-label value onValueChange | defaultValue>
└─ <ChoiceButton value>        (one per option)
   ├─ <Radio.Indicator>        (optional CheckIcon, checked only)
   └─ children as provided
```

1. `ChoiceGroup`: A `RadioGroup` (`data-slot='choice-group'`) with a default horizontal wrap layout; `className` reshapes it, for example `flex-col items-stretch` for a stacked column.
2. `ChoiceButton`: A Base UI `Radio.Root` (`data-slot='choice-button'`) using shared `ControlSize` classes: `xs`, `sm`, `default`, and `lg`.
3. Indicator: a `Radio.Indicator` holding `CheckIcon size-3.5`; shown while checked by default and omitted when `showCheckmark={false}`.

**Live demo variant:** `Vertical group`

## Variants & states

Choice Button has a checked/unchecked axis and a checked appearance option. The default checked style uses `bg-primary`, inverse foreground, and `border-primary`; `selectedVariant='subtle'` uses `bg-secondary`, foreground, and `border-primary`. Unchecked state keeps `border-input` on `bg-background`. Sizes use shared control classes: `xs` 24 px, `sm` 32 px, `default` 40 px, and `lg` 48 px. Disabled options dim to 50% opacity and cannot be selected.

**Live demo variant:** `Default`

## Accessibility

- Base UI Radio provides `role='radio'`, `aria-checked`, arrow-key movement inside the group, Space/Enter selection, and a single tab stop for the group; do not add ARIA by hand.
- The checked choice announces as checked. Arrow keys move the selection without moving focus out of the group.
- Keep each label inside `ChoiceButton` children; the button's accessible name comes from its content.
- Disabled options are exposed as disabled and are skipped by selection.
- The checkmark is decorative; the checked state is conveyed by `aria-checked`, not by the icon.

**Live demo variant:** `Disabled choice`

## API & examples

Import from `skytrack-ui/choice-button` (or `@/components/ui/choice-button` locally): `ChoiceGroup`, `ChoiceButton`.

| Prop              | Target         | Type                                        | Default     |
| ----------------- | -------------- | ------------------------------------------- | ----------- |
| `value`           | `ChoiceGroup`  | `string` (controlled)                       | —           |
| `onValueChange`   | `ChoiceGroup`  | `(value: string, details) => void`          | —           |
| `defaultValue`    | `ChoiceGroup`  | `string`                                    | —           |
| `aria-label`      | `ChoiceGroup`  | `string` (or `aria-labelledby`)             | —           |
| `className`       | `ChoiceGroup`  | `string`                                    | `undefined` |
| `value`           | `ChoiceButton` | `string` (required)                         | —           |
| `disabled`        | `ChoiceButton` | `boolean`                                   | `false`     |
| `size`            | `ChoiceButton` | `ControlSize` (`xs`, `sm`, `default`, `lg`) | `default`   |
| `selectedVariant` | `ChoiceButton` | `'default' \| 'subtle'`                     | `default`   |
| `showCheckmark`   | `ChoiceButton` | `boolean`                                   | `true`      |
| `children`        | `ChoiceButton` | `React.ReactNode` (required)                | —           |
| `className`       | `ChoiceButton` | `string`                                    | `undefined` |

`ChoiceGroup` accepts `RadioGroup` props; `ChoiceButton` accepts Base UI `Radio.Root` props (`readOnly`, `required`, `nativeInput` among them). `ChoiceButton` used outside `ChoiceGroup` renders an unchecked chip with no selection behavior, so always compose the two.

**Live demo variant:** `Vertical group`

## Evidence and limits

- Package/version checked: `0.1.6`.
- Export: [`package.json`](../../../../../package.json) — `./choice-button` (dist-lib artifacts build separately; no build ran in this task).
- Source and closest demo: linked above.
- Limits or unverified behavior: there is no size axis and no per-option description slot; a rich `children` node carries secondary text but must keep its own styling. The package does not measure theme contrast for the filled checked surface.
