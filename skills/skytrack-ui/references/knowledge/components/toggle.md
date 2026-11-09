# Toggle

> A high-quality, unstyled React toggle component that displays a two-state button that can be on or off.

- Package version: `0.1.5`
- Public export: `skytrack-ui/toggle`
- Implementation: [`src/components/ui/toggle.tsx`](../../../../../src/components/ui/toggle.tsx)
- Public type declaration: [`dist-lib/components/ui/toggle.d.ts`](../../../../../dist-lib/components/ui/toggle.d.ts) (matches source version `0.1.5`)
- Showcase demo id: `toggle`
- Closest demo: [`src/demos/toggle.demo.tsx`](../../../../../src/demos/toggle.demo.tsx)

## Overview

The Toggle component renders a two-state button that can be toggled on or off. Built on Base UI Toggle primitives, it provides visual pressed states, outline or brand variants, multiple size options, and seamless standalone or grouped operation.

**Live demo variant:** `Default`

```tsx
import { Toggle } from '@/components/ui/toggle'
import { BellIcon } from '@phosphor-icons/react'

export function ToggleDemo() {
  return (
    <Toggle aria-label='Toggle audio alerts' variant='outline' size='default'>
      <BellIcon className='size-4' />
      <span>Audio Alerts</span>
    </Toggle>
  )
}
```

## Usage

Use Toggle for pressing a single button to switch a feature, view filter, or formatting option on or off (e.g. mute audio, favorite, bookmark, bold text). For multiple mutually exclusive or collective options, wrap toggles inside `ToggleGroup` or `Toolbar`. For standalone form settings, consider `Switch` or `Checkbox`.

**Live demo variant:** `With text`

## Anatomy

### Composition Tree

```text
<Toggle pressed={pressed} onPressedChange={setPressed} variant='default|outline|segmented|brand' size='default|xs|sm|lg'>
  ├─ <Icon /> (optional)
  └─ Label
</Toggle>
```

Toggle is an atomic component:

1. `Toggle` (Interactive button element managing pressed state and visual variants)

When nested inside a `ToggleGroup`, `Toggle` automatically inherits `variant` and `size` from the parent context.

**Live demo variant:** `Default`

## Variants & states

Supported variants and options:

- `variant`: `default` (ghost hover), `outline` (bordered button), `segmented` (inset pill button), and `brand` (primary background when pressed).
- `size`: `default` (36px height), `xs` (24px), `sm` (32px), `lg` (40px), and square icon sizes `icon`, `icon-xs`, `icon-sm`, `icon-lg`.
- `pressed`: Managed via `pressed` / `defaultPressed` / `onPressedChange`.
- `disabled`: Applied via standard HTML button `disabled` attribute.

**Live demo variant:** `Outline`

## Accessibility

Renders a standard `<button>` with `aria-pressed` set to `'true'` or `'false'`. If the toggle contains only an icon without visible text, an accessible name must be provided via `aria-label`. Operates with standard keyboard navigation (`Space` and `Enter` toggle pressed state).

**Live demo variant:** `Disabled`

## API & examples

Import `Toggle` and `toggleVariants` from `skytrack-ui/toggle` or `@/components/ui/toggle`. Primary props: `pressed`, `defaultPressed`, `onPressedChange`, `variant`, `size`, and `disabled`.

**Live demo variant:** `Sizes`

## Evidence and limits

- Package/version checked: `0.1.5`.
- Export: [`package.json`](../../../../../package.json) — `./toggle`.
- Source, public declarations, and closest demo: linked above.
- Limits or unverified behavior: When used outside `ToggleGroup`, `variant` defaults to `default` (ghost style).
