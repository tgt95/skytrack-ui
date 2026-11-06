# Switch

> A high-quality, unstyled React switch component that indicates whether a setting is on or off.

- Package version: `0.1.5`
- Public export: `skytrack-ui/switch`
- Implementation: [`src/components/ui/switch.tsx`](../../../../src/components/ui/switch.tsx)
- Public type declaration: [`dist-lib/components/ui/switch.d.ts`](../../../../dist-lib/components/ui/switch.d.ts) (matches source version `0.1.5`)
- Showcase demo id: `switch`
- Closest demo: [`src/demos/switch.demo.tsx`](../../../../src/demos/switch.demo.tsx)

## Overview

The Switch component renders an interactive toggle that immediately activates or deactivates a binary setting. Built on Base UI Switch primitives, it features smooth thumb slide animations, focus rings, size variants, and full accessibility.

**Live demo variant:** `Labeling a switch`

```tsx
import { Switch, SwitchThumb } from '@/components/ui/switch'
import { FieldLabel, FieldRoot } from '@/components/ui/field'

export function SwitchDemo() {
  return (
    <FieldRoot className='flex-row items-center gap-3'>
      <Switch id='transponder' size='default'>
        <SwitchThumb />
      </Switch>
      <FieldLabel htmlFor='transponder'>Transponder mode C</FieldLabel>
    </FieldRoot>
  )
}
```

## Usage

Use Switch for standalone preferences and instantaneous settings that take immediate effect without clicking a "Submit" or "Save" button (e.g., dark mode toggle, airplane mode, push notifications). For choices within a larger form that require submission, prefer `Checkbox`.

**Live demo variant:** `Labeling a switch`

## Anatomy

Switch consists of:

1. `Switch` (Button track container managing checked state and context)
2. `SwitchThumb` (Sliding circular thumb indicator)

The minimal composition requires `Switch` enclosing a `SwitchThumb`.

**Live demo variant:** `Labeling a switch`

## Variants & states

Supported variants and states:

- `size`: `default` (`h-5 w-9`, thumb `size-3.5`) and `sm` (`h-4 w-7`, thumb `size-3`).
- `checked` / `unchecked`: transitions thumb position with CSS transform; track transitions to primary background when checked.
- `disabled`: Dimmed opacity and `cursor-not-allowed`.

**Live demo variant:** `Sizes`

## Accessibility

Renders with `role='switch'` and manages `aria-checked` (`true` or `false`). Full keyboard support is provided: pressing `Space` or `Enter` toggles the switch. Always provide an accessible name by pairing with `FieldLabel` via `htmlFor`/`id` or supplying `aria-label`.

**Live demo variant:** `Disabled`

## API & examples

Import `Switch` and `SwitchThumb` from `skytrack-ui/switch` or `@/components/ui/switch`. Core props on `Switch`: `checked`, `defaultChecked`, `onCheckedChange`, `size`, `disabled`, `required`, and `name`.

**Live demo variant:** `Form integration`

## Evidence and limits

- Package/version checked: `0.1.5`.
- Export: [`package.json`](../../../../package.json) — `./switch`.
- Source, public declarations, and closest demo: linked above.
- Limits or unverified behavior: When rendering custom thumb sizes, the size prop should be passed to `Switch` so it propagates automatically through `SwitchSizeContext` to `SwitchThumb`.
