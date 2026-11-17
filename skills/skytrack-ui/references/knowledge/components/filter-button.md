# Filter Button

> A Button trigger that opens a multi-select filter popup.

- Package version: `0.1.6`
- Public export: `skytrack-ui/filter-button`
- Implementation: [`src/components/ui/filter-button.tsx`](../../../../../src/components/ui/filter-button.tsx)
- Public type declaration: `src/components/ui/filter-button.tsx` (the dist-lib declaration appears on the next lib build; no build ran for this task)
- Showcase demo id: `filter-button`
- Closest demo: [`src/demos/filter-button.demo.tsx`](../../../../../src/demos/filter-button.demo.tsx)

## Overview

Filter Button combines a styled Button trigger with a Popover that lists checkbox options. It owns the open/close behavior and the controlled selected values; it owns nothing about the trigger's visible content.

`children` is the complete trigger content exactly as supplied: a label, a count Badge, an icon, or any combination. The component never generates a label or count. When `value` contains one or more selections, a split X button appears beside the trigger and clears this filter's values. The trigger renders through the `PopoverTrigger` render slot over a real `Button`, so popup state, `aria-expanded`, and outside-click handling stay owned by `skytrack-ui/popover` and no button is nested inside another. Button `variant` (default `outline`), `size` (default `sm`), `disabled`, `className`, and supported accessibility props pass through. `clearLabel` overrides the X button's accessible name; it defaults to `Clear ${title}`.

**Live demo variant:** `Default`

```tsx
import * as React from 'react'
import { Badge } from '@/components/ui/badge'
import { FilterButton } from '@/components/ui/filter-button'

const OPTIONS = [
  { value: 'planned', label: 'Planned' },
  { value: 'active', label: 'Active' },
  { value: 'closed', label: 'Closed' }
]

export function StatusFilterButton() {
  const [value, setValue] = React.useState<string[]>([])

  return (
    <FilterButton title='Filter by status' value={value} onValueChange={setValue} options={OPTIONS}>
      Status
      {value.length > 0 && <Badge count={value.length} status='processing' size='sm' />}
    </FilterButton>
  )
}
```

## Usage

- Use Filter Button for multi-select filtering over a result set, such as table, list, or search filters.
- Supply the whole trigger content through `children`. A count Badge that reflects `value.length` is a common choice; add it only when it helps.
- Keep `title` short and specific, such as “Filter by status”; it is the popup heading and default accessible label for the clear X action.
- Option labels accept any ReactNode, so colored status Badges work as labels.
- Do not use Filter Button for single-select filtering; use `skytrack-ui/select` or `skytrack-ui/combobox`, or a `skytrack-ui/radio` group.
- The X clears this filter only; provide a separate toolbar action when users need to clear several filter dimensions at once.
- Do not use it as a general settings popover; `skytrack-ui/popover` owns that role with full content control.

**Live demo variant:** `Caller trigger content`

## Anatomy

### Composition Tree

```text
<FilterButton title value onValueChange options variant size disabled clearLabel>
├─ (trigger)  children as provided            (PopoverTrigger render slot over Button)
├─ (clear X)  shown only when value is nonempty; clears this filter
└─ <PopoverPopup>
   ├─ <PopoverTitle>{title}</PopoverTitle>
   └─ option rows: <label> <CheckboxRoot /> <span>{option.label}</span> </label>
```

1. `FilterButton`: Composes Popover, PopoverTrigger, Button, and a conditional clear Button.
2. Trigger: a `Button` with the given `variant`, `size`, `className`, `disabled`, and any forwarded accessibility props. `children` render unchanged.
3. `PopoverPopup`: `w-64` popup with a required `PopoverTitle` heading (`aria-labelledby` points at it).
4. Option rows: native `label` wrapping a `CheckboxRoot` and the option label, so each checkbox is named by its label and the whole row is clickable.

**Live demo variant:** `Sizes`

## Variants & states

`variant` accepts the six Button variants (default `outline`); `size` accepts the Button control sizes `xs`, `sm`, `default`, `lg` (default `sm`). Hover, focus-visible, and disabled states come from Button unchanged.

Popup states: options check and uncheck through the controlled `value`; `disabled` options render disabled checkboxes and cannot join the selection. The popup positions below the trigger with a 4 px offset and closes on outside click or Escape.

**Live demo variant:** `Variants`

## Accessibility

- The popup heading is a `PopoverTitle`; Base UI sets the popup's `aria-labelledby` to it, so screen readers announce the popup by `title`.
- Each option is a checkbox named by its label text (or the text inside a rich label). Keyboard users tab through the checkboxes and toggle with Space.
- The conditional X is a separate button with an accessible name from `clearLabel` or `title`; it clears only this filter.
- The trigger keeps the popover's `aria-expanded` and popup focus management; do not add `aria-haspopup` manually.
- When the result set changes after filtering, announce the change through the surrounding table or list status region; the trigger itself does not announce the selection.
- Disabled options are exposed as disabled and stay out of the selection.

**Live demo variant:** `Disabled options`

## API & examples

Import from `skytrack-ui/filter-button` (or `@/components/ui/filter-button` locally): `FilterButton`.

| Prop            | Target  | Type                                       | Default          |
| --------------- | ------- | ------------------------------------------ | ---------------- |
| `children`      | Trigger | `React.ReactNode` (required)               | —                |
| `title`         | Popup   | `string` (required)                        | —                |
| `value`         | Popup   | `string[]` (required)                      | —                |
| `onValueChange` | Popup   | `(value: string[]) => void` (required)     | —                |
| `options`       | Popup   | `{ value, label, disabled? }[]` (required) | —                |
| `variant`       | Buttons | Button variants                            | `'outline'`      |
| `size`          | Buttons | `'xs' \| 'sm' \| 'default' \| 'lg'`        | `'sm'`           |
| `disabled`      | Buttons | `boolean`                                  | `false`          |
| `className`     | Trigger | `string`                                   | `undefined`      |
| `clearLabel`    | Clear X | `string`                                   | `Clear ${title}` |

`FilterButton` accepts the remaining `Button` props, including accessibility attributes, and forwards them to the trigger through the Popover render slot. The value model is fully controlled: `value` and `onValueChange` are both required, so there is no uncontrolled mode and no generated content anywhere in the component.

**Live demo variant:** `Default`

## Evidence and limits

- Package/version checked: `0.1.6`.
- Export: [`package.json`](../../../../../package.json) — `./filter-button` (dist-lib artifacts build separately; no build ran in this task).
- Source and closest demo: linked above.
- Limits or unverified behavior: the popup is always bottom/start positioned at a fixed `w-64` width; other placements or widths need a direct `skytrack-ui/popover` composition. Trigger counts remain caller-owned; the X clears this filter only, so clearing several filter dimensions still needs a separate toolbar action. Rich labels keep their own contrast; verify Badge labels against the popup background.
