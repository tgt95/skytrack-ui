# Collapsible

> A high-quality, unstyled React collapsible component that displays a panel controlled by a button.

- Package version: `0.1.5`
- Public export: `skytrack-ui/collapsible`
- Implementation: [`src/components/ui/collapsible.tsx`](../../../../src/components/ui/collapsible.tsx)
- Public type declaration: [`dist-lib/components/ui/collapsible.d.ts`](../../../../dist-lib/components/ui/collapsible.d.ts)
- Showcase demo id: `collapsible`
- Closest demo: [`src/demos/collapsible.demo.tsx`](../../../../src/demos/collapsible.demo.tsx)

## Overview

The Collapsible component enables users to toggle the visibility of a single secondary content panel using an interactive trigger button. It is ideal for progressive disclosure in dense inspector panels, such as showing advanced drone sensor parameters, raw API keys, or optional flight payload settings.

Built on `@base-ui/react/collapsible`, it features smooth height animations driven by CSS custom properties and full keyboard accessibility.

**Live demo variant:** `Default`

```tsx
import { Collapsible, CollapsibleTrigger, CollapsiblePanel } from '@/components/ui/collapsible'
import { Button } from '@/components/ui/button'

export function CollapsibleExample() {
  return (
    <Collapsible className='w-full max-w-sm'>
      <CollapsibleTrigger
        render={
          <Button variant='outline' className='w-full justify-between'>
            Advanced radio settings
          </Button>
        }
      />
      <CollapsiblePanel className='border border-t-0 border-border p-3 text-sm text-muted-foreground'>
        Frequency hopping: Enabled (915 MHz ISM band). Power output: 27 dBm.
      </CollapsiblePanel>
    </Collapsible>
  )
}
```

## Usage

Use Collapsible for single, standalone sections of supplementary information that most operators do not need immediately upon opening a screen.

Do not use Collapsible when multiple mutually exclusive or stacked panels are required (use `skytrack-ui/accordion`). Do not place critical mission-blocking safety warnings or primary validation errors inside a collapsed panel.

**Live demo variant:** `Hidden until found`

## Anatomy

Render in strict nested order:

1. `Collapsible`: Root state container (`data-slot='collapsible'`).
2. `CollapsibleTrigger`: Toggle button element (`data-slot='collapsible-trigger'`). Supports custom renderers via `render` prop.
3. `CollapsiblePanel`: Animated disclosure panel (`data-slot='collapsible-panel'`). Animates height via `--collapsible-panel-height`.

**Live demo variant:** `Default`

## Variants & states

Supported states:

- Open / Closed: Controlled via `open` and `onOpenChange`, or uncontrolled via `defaultOpen`.
- Disabled: Via `disabled` prop on `Collapsible` or `CollapsibleTrigger`.
- `hiddenUntilFound`: Uses browser's native `hidden='until-found'` attribute, enabling users to find text within collapsed content using in-page search (`⌘F` / `Ctrl+F`).
- Animated transitions: Uses Base UI `data-starting-style:h-0` and `data-ending-style:h-0` with 150ms ease-out transitions.

**Live demo variant:** `Hidden until found`

## Accessibility

- Built on `@base-ui/react/collapsible`:
- The trigger button automatically receives `aria-expanded` and connects to the panel via `aria-controls`.
- Panels have `role='region'` when labeled.
- Keyboard: `Enter` or `Space` toggles the panel.
- Focus: Remains on the trigger during toggle, preventing unexpected focus jumps.

**Live demo variant:** `Default`

## API & examples

Import `Collapsible`, `CollapsibleTrigger`, and `CollapsiblePanel` from `skytrack-ui/collapsible` (or `@/components/ui/collapsible` locally).

| Prop                   | Target             | Type                      | Default     |
| ---------------------- | ------------------ | ------------------------- | ----------- |
| `open` / `defaultOpen` | `Collapsible`      | `boolean`                 | `undefined` |
| `onOpenChange`         | `Collapsible`      | `(open: boolean) => void` | `undefined` |
| `disabled`             | `Collapsible`      | `boolean`                 | `false`     |
| `hiddenUntilFound`     | `CollapsiblePanel` | `boolean`                 | `false`     |

Tokens: Uses `--border`, `--muted-foreground`, and `--collapsible-panel-height`.

**Live demo variant:** `Hidden until found`

## Evidence and limits

- Package/version checked: `0.1.5`.
- Export: [`package.json`](../../../../package.json) — `./collapsible`.
- Source, public declarations, and closest demo: linked above.
- Limits or unverified behavior: None found in inspected source. Designed for single panels; use `accordion` for multi-item sets.
