# Fieldset

> A native fieldset element with an easily stylable legend.

- Package version: `0.1.5`
- Public export: `skytrack-ui/fieldset`
- Implementation: [`src/components/ui/fieldset.tsx`](../../../../src/components/ui/fieldset.tsx)
- Public type declaration: [`dist-lib/components/ui/fieldset.d.ts`](../../../../dist-lib/components/ui/fieldset.d.ts) (matches source version `0.1.5`)
- Showcase demo id: `fieldset`
- Closest demo: [`src/demos/fieldset.demo.tsx`](../../../../src/demos/fieldset.demo.tsx)

## Overview

The Fieldset component groups logically related form controls and labels under a semantic HTML `fieldset` with a stylable `legend`. Built on Base UI Fieldset, it simplifies grouping flight parameters, credential sets, and billing addresses while providing native group semantics to assistive technology.

**Live demo variant:** `Default`

```tsx
import { FieldsetRoot, FieldsetLegend } from '@/components/ui/fieldset'
import { FieldControl, FieldLabel, FieldRoot } from '@/components/ui/field'

export function FieldsetDemo() {
  return (
    <FieldsetRoot className='max-w-md'>
      <FieldsetLegend>Pilot credentials</FieldsetLegend>
      <FieldRoot>
        <FieldLabel>License number</FieldLabel>
        <FieldControl placeholder='ATP-8839201' />
      </FieldRoot>
      <FieldRoot>
        <FieldLabel>Issuing authority</FieldLabel>
        <FieldControl placeholder='FAA / EASA' />
      </FieldRoot>
    </FieldsetRoot>
  )
}
```

## Usage

Use Fieldset when multiple form fields belong to a distinct conceptual unit, such as "Aircraft Specifications", "Emergency Contacts", or "Notification Rules". Do not use Fieldset for single standalone inputs; use `FieldRoot` alone instead. For full-screen section breaks with navigation, use page headings rather than nested fieldsets.

**Live demo variant:** `Legend without divider`

## Anatomy

Fieldset consists of:

1. `FieldsetRoot` (Native `<fieldset>` element providing group context and vertical flex layout)
2. `FieldsetLegend` (Native `<legend>` element styled as a prominent section title)
3. Nested `FieldRoot` controls or custom input rows

The minimal valid composition requires `FieldsetRoot` and `FieldsetLegend`.

**Live demo variant:** `Default`

## Variants & states

Supported states and styling:

- Native disabled inheritance: Setting `disabled` on `FieldsetRoot` automatically disables all nested native inputs and applies `data-disabled:opacity-50`.
- Spacing: Defaults to `flex flex-col gap-4`. Can be customized with responsive grid classes for multi-column form layouts.

**Live demo variant:** `Default`

## Accessibility

Renders semantic HTML `<fieldset>` and `<legend>` elements. Screen readers announce the legend text when users navigate into any form control contained within the fieldset, giving essential context to the user without duplicating labels on individual inputs.

**Live demo variant:** `Legend without divider`

## API & examples

Import `FieldsetRoot` and `FieldsetLegend` from `skytrack-ui/fieldset` or `@/components/ui/fieldset`. `FieldsetRoot` accepts all standard React HTML fieldset props (such as `disabled`, `form`, `name`), and `FieldsetLegend` accepts standard legend props.

**Live demo variant:** `Default`

## Evidence and limits

- Package/version checked: `0.1.5`.
- Export: [`package.json`](../../../../package.json) — `./fieldset`.
- Source, public declarations, and closest demo: linked above.
- Limits or unverified behavior: None found in inspected source; relies on standard browser fieldset disabled-tree propagation.
