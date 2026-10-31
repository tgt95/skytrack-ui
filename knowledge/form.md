# Form

> A native form element with consolidated error handling.

- Package version: `0.1.5`
- Public export: `skytrack-ui/form`
- Implementation: [`src/components/ui/form.tsx`](../src/components/ui/form.tsx)
- Public type declaration: [`dist-lib/components/ui/form.d.ts`](../dist-lib/components/ui/form.d.ts) (matches source version `0.1.5`)
- Showcase demo id: `form`
- Closest demo: [`src/demos/form.demo.tsx`](../src/demos/form.demo.tsx)

## Overview

The Form component wraps a native HTML `<form>` element with Base UI consolidated validation and error handling. It coordinates child fields, manages server or client-side form submissions, and supports standard schema validation libraries such as Zod.

**Live demo variant:** `Default`

```tsx
import { Form } from '@/components/ui/form'
import { FieldControl, FieldError, FieldLabel, FieldRoot } from '@/components/ui/field'
import { Button } from '@/components/ui/button'

export function FormDemo() {
  return (
    <Form
      className='w-full max-w-sm'
      onSubmit={(event) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        console.log('Flight plan submitted:', Object.fromEntries(formData))
      }}
    >
      <FieldRoot name='callsign'>
        <FieldLabel>Callsign</FieldLabel>
        <FieldControl placeholder='SKY204' required />
        <FieldError />
      </FieldRoot>
      <Button type='submit'>Submit Flight Plan</Button>
    </Form>
  )
}
```

## Usage

Use Form whenever data entry requires transactional submission, batch validation, or server function handling. It provides native submission semantics and consolidated invalid-field focusing. Do not use Form for simple search query inputs or isolated live filter controls; those should update state reactively without form submission.

**Live demo variant:** `Submit form values as a JavaScript object`

## Anatomy

Form consists of:

1. `Form` (Native `<form>` element with Base UI form state management and vertical layout)
2. Nested `FieldRoot` controls (from `skytrack-ui/field`)
3. Submit trigger (typically `Button type='submit'`)

Consuming applications place child fields directly within `Form`.

**Live demo variant:** `Default`

## Variants & states

Supported states and capabilities:

- Consolidated errors: Coordinates validation across all child fields via `errors` prop.
- Layout: Pre-styled with `flex w-full flex-col gap-4`.
- Validation integration: Integrates with Zod schemas, server actions, or imperative validation refs (`actionsRef`).

**Live demo variant:** `Schema validation`

## Accessibility

Renders a standard semantic HTML `<form>` element. Upon failed submission, Base UI Form automatically shifts keyboard focus to the first invalid field in DOM order, allowing screen reader and keyboard users to rapidly resolve input errors.

**Live demo variant:** `Imperative validation (actionsRef)`

## API & examples

Import `Form` from `skytrack-ui/form` or `@/components/ui/form`. `Form` accepts all native HTML form props (`onSubmit`, `action`, `method`, `noValidate`) plus Base UI error handling props (`errors`, `onClearErrors`).

**Live demo variant:** `Using with Zod`

## Evidence and limits

- Package/version checked: `0.1.5`.
- Export: [`package.json`](../package.json) — `./form`.
- Source, public declarations, and closest demo: linked above.
- Limits or unverified behavior: Form relies on Base UI Form for client-side validation consolidation; async server validation responses must be passed to the `errors` prop map.
