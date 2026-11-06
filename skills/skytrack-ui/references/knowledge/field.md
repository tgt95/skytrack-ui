# Field

> A component that provides labeling and validation for form controls.

- Package version: `0.1.5`
- Public export: `skytrack-ui/field`
- Implementation: [`src/components/ui/field.tsx`](../../../../src/components/ui/field.tsx)
- Public type declaration: [`dist-lib/components/ui/field.d.ts`](../../../../dist-lib/components/ui/field.d.ts) (matches source version `0.1.5`)
- Showcase demo id: `field`
- Closest demo: [`src/demos/field.demo.tsx`](../../../../src/demos/field.demo.tsx)

## Overview

The Field component suite associates form controls with accessible labels, descriptions, and dynamic validation messages. Built on Base UI Field, it coordinates ARIA relationships, error states, and layout styling across native and composite input controls.

**Live demo variant:** `Default`

```tsx
import { FieldControl, FieldDescription, FieldError, FieldLabel, FieldRoot } from '@/components/ui/field'

export function FieldDemo() {
  return (
    <FieldRoot className='w-64'>
      <FieldLabel>Callsign</FieldLabel>
      <FieldControl placeholder='e.g. SKY402' />
      <FieldDescription>Assigned ATC flight identifier</FieldDescription>
      <FieldError>Callsign must be uppercase alphanumeric.</FieldError>
    </FieldRoot>
  )
}
```

## Usage

Use Field as the standard wrapper around any form input (Text Input, NumberField, DatePicker, Combobox, Autocomplete, Textarea) to establish consistent spacing, accessible labeling, help text, and error indicators. For field groupings under a shared title, use `Fieldset` or layout helpers `FieldGroup` and `FieldRow`.

**Live demo variant:** `With Input`

## Anatomy

Field exports the following parts:

1. `FieldRoot` (Root container managing field context and validation states)
2. `FieldLabel` (Label element automatically tied to the control)
3. `FieldControl` (Standard input element supporting control sizes)
4. `FieldDescription` (Auxiliary hint text referenced via `aria-describedby`)
5. `FieldError` (Validation error message, revealed only when field is invalid)
6. `FieldValidity` (Render-prop utility providing granular validity state access)
7. `FieldItem` (Row container for aligning inline controls like checkboxes or radios with labels)
8. `FieldGroup` (Vertical layout container for stacking related fields with 16px gap)
9. `FieldRow` (Horizontal layout container for aligning control and inline action)

**Live demo variant:** `Field.Item`

## Variants & states

Supported states include:

- `size`: Available in `xs`, `sm`, `default`, and `lg` on `FieldControl`.
- `data-invalid`: Triggered when form or control validation fails, rendering destructive borders and displaying `FieldError`.
- `data-disabled`: Propagates to labels and inputs with muted opacity and `cursor-not-allowed`.
- `data-filled`: Applied when the control contains a non-empty value.

**Live demo variant:** `Validity`

## Accessibility

`FieldRoot` automatically links labels to controls via `id` / `for` and associates `FieldDescription` and `FieldError` using `aria-describedby` and `aria-errormessage`. When invalid, controls receive `aria-invalid='true'` automatically. `FieldError` has an implicit live announcement role for screen readers.

**Live demo variant:** `Disabled`

## API & examples

Import `FieldRoot`, `FieldLabel`, `FieldControl`, `FieldDescription`, `FieldError`, `FieldValidity`, `FieldItem`, `FieldGroup`, and `FieldRow` from `skytrack-ui/field` or `@/components/ui/field`. All parts accept function classNames returning state-aware styles.

**Live demo variant:** `Custom validation (onChange, debounced)`

## Evidence and limits

- Package/version checked: `0.1.5`.
- Export: [`package.json`](../../../../package.json) — `./field`.
- Source, public declarations, and closest demo: linked above.
- Limits or unverified behavior: When replacing `FieldControl` with custom third-party inputs, ensure the input forwards ref and accepts standard ARIA attributes provided by Base UI Field.
