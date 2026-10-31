# Input

> A native input element that automatically works with Field.

- Package version: `0.1.5`
- Public export: `skytrack-ui/input`
- Implementation: [`src/components/ui/input.tsx`](../src/components/ui/input.tsx)
- Public type declaration: [`dist-lib/components/ui/input.d.ts`](../dist-lib/components/ui/input.d.ts) (matches source version `0.1.5`)
- Showcase demo id: `input`
- Closest demo: [`src/demos/input.demo.tsx`](../src/demos/input.demo.tsx)

## Overview

The Input component renders an accessible single-line text entry field styled with SkyTrack design tokens. Built on Base UI Input, it seamlessly integrates with `FieldRoot` for automated labeling and error handling, and supports flexible prefix and suffix adornments without layout clipping.

**Live demo variant:** `Default`

```tsx
import { Input, InputAdornment } from '@/components/ui/input'
import { MagnifyingGlassIcon } from '@phosphor-icons/react'

export function InputDemo() {
  return (
    <Input
      placeholder='Search callsigns, routes, or pilots...'
      size='default'
      startAdornment={
        <InputAdornment position='start'>
          <MagnifyingGlassIcon />
        </InputAdornment>
      }
      className='w-full max-w-sm'
    />
  )
}
```

## Usage

Use Input for general alphanumeric text entry (names, email addresses, URLs, search strings, codes). For formatted numerical inputs with increment/decrement stepper controls, use `NumberField`. For multi-line text input, use a textarea. For selections among predefined options, use `Select`, `Combobox`, or `Autocomplete`.

**Live demo variant:** `Types`

## Anatomy

Input is composed of:

1. `Input` (Base UI input element or wrapper container when adornments are supplied)
2. `InputAdornment` (Inline prefix or suffix icon/text container with `shrink-0` flex alignment)

When `startAdornment` or `endAdornment` are provided, `Input` automatically renders a flex wrapper so the internal input shrinks without text overlapping the adornments.

**Live demo variant:** `Adornment`

## Variants & states

Supported variants and interaction states:

- `size`: `xs` (24px height), `sm` (32px), `default` (36px), and `lg` (40px).
- `data-disabled`: Dimmed opacity and disabled cursor.
- `data-invalid`: Highlighted with destructive red border and focus ring.
- Native HTML types: `text`, `search`, `password`, `email`, `tel`, `url`, `file`.

**Live demo variant:** `States`

## Accessibility

`Input` renders a native HTML `<input>` element with full keyboard and assistive technology compatibility. When nested inside `FieldRoot`, it automatically receives `aria-labelledby`, `aria-describedby`, and `aria-invalid` from context. Adornment icons are styled with `pointer-events-none` to prevent interfering with clicks into the text area.

**Live demo variant:** `Default`

## API & examples

Import `Input` and `InputAdornment` from `skytrack-ui/input` or `@/components/ui/input`. Core props on `Input` include `size`, `startAdornment`, `endAdornment`, `disabled`, `required`, and all native HTML input attributes.

**Live demo variant:** `Sizes`

## Evidence and limits

- Package/version checked: `0.1.5`.
- Export: [`package.json`](../package.json) — `./input`.
- Source, public declarations, and closest demo: linked above.
- Limits or unverified behavior: When adornments are present, `className` applies to the outer container; function `className` is forwarded to the inner input element.
