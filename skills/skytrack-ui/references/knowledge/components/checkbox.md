# Checkbox

> An easily stylable checkbox component.

- Package version: `0.1.5`
- Public export: `skytrack-ui/checkbox`
- Implementation: [`src/components/ui/checkbox.tsx`](../../../../../src/components/ui/checkbox.tsx)
- Public type declaration: [`dist-lib/components/ui/checkbox.d.ts`](../../../../../dist-lib/components/ui/checkbox.d.ts) (matches source version `0.1.5`)
- Showcase demo id: `checkbox`
- Closest demo: [`src/demos/checkbox.demo.tsx`](../../../../../src/demos/checkbox.demo.tsx)

## Overview

The Checkbox component allows users to toggle an option between checked, unchecked, and indeterminate states. Built on Base UI Checkbox primitives, it renders a custom-styled control with seamless keyboard navigation, form participation, and high-contrast indicators.

**Live demo variant:** `Default`

```tsx
import { CheckboxRoot } from '@/components/ui/checkbox'
import { FieldLabel, FieldRoot } from '@/components/ui/field'

export function CheckboxDemo() {
  return (
    <FieldRoot className='flex-row items-center gap-2'>
      <FieldLabel className='flex items-center gap-2 font-normal'>
        <CheckboxRoot defaultChecked />
        Enable flight status alerts
      </FieldLabel>
    </FieldRoot>
  )
}
```

## Usage

Use Checkbox for binary selections (on/off, agree/disagree) or multi-selection scenarios where each option operates independently. If users must choose exactly one option from a mutually exclusive set, use RadioGroup instead. For instant settings that take immediate effect without form submission, Switch is often preferred. Always pair Checkbox with a visible label.

**Live demo variant:** `Labeling a checkbox`

## Anatomy

### Composition Tree

```text
<CheckboxRoot checked={checked} onCheckedChange={setChecked}>
└─ <CheckboxIndicator /> (automatically renders CheckIcon/MinusIcon when empty)
```

Checkbox is composed of:

1. `CheckboxRoot` (Interactive toggle button root managing checked, indeterminate, and disabled state)
2. `CheckboxIndicator` (Child indicator rendering check or minus icons)

If no children are passed to `CheckboxRoot`, it automatically renders `CheckboxIndicator` with `CheckIcon` (for checked state) and `MinusIcon` (for indeterminate state).

**Live demo variant:** `Default`

## Variants & states

Supported states include:

- `checked`: Styled with primary background and white checkmark icon.
- `unchecked`: Default neutral border with transparent center.
- `indeterminate`: Displays a horizontal dash (`MinusIcon`), typically used for parent group headers where only some child items are selected.
- `disabled`: Muted with reduced opacity and cursor not-allowed.
- `invalid`: Styled with destructive border colors when integrated with form validation.

Controlled and uncontrolled modes are supported via `checked`/`onCheckedChange` and `defaultChecked`.

**Live demo variant:** `Indeterminate`

## Accessibility

`CheckboxRoot` renders an accessible button element with `role='checkbox'`. It accurately reflects `aria-checked` (`true`, `false`, or `'mixed'`) and `aria-disabled`. Full keyboard support is provided: pressing `Space` toggles the checkbox state, and `Tab` moves focus between elements. When paired with `FieldLabel` from `skytrack-ui/field`, the label text is programmatically associated with the input.

**Live demo variant:** `Disabled`

## API & examples

Import `CheckboxRoot` and `CheckboxIndicator` from `skytrack-ui/checkbox` or `@/components/ui/checkbox`. Key props on `CheckboxRoot` include `checked`, `defaultChecked`, `indeterminate`, `onCheckedChange`, `disabled`, `required`, and `name`. When used in native HTML forms, `CheckboxRoot` renders an invisible input to ensure standard submission works without extra code.

**Live demo variant:** `Form integration`

## Evidence and limits

- Package/version checked: `0.1.5`.
- Export: [`package.json`](../../../../../package.json) — `./checkbox`.
- Source, public declarations, and closest demo: linked above.
- Limits or unverified behavior: None found in inspected source; standalone checkboxes do not enforce grouping logic—use `CheckboxGroup` for collective array state.
