# Tooltip

> A high-quality, unstyled React tooltip component that appears when an element is hovered or focused, showing a hint for sighted users.

- Package version: `0.1.5`
- Public export: `skytrack-ui/tooltip`
- Implementation: [`src/components/ui/tooltip.tsx`](../../../../../src/components/ui/tooltip.tsx)
- Public type declaration: [`dist-lib/components/ui/tooltip.d.ts`](../../../../../dist-lib/components/ui/tooltip.d.ts) (matches source version `0.1.5`)
- Showcase demo id: `tooltip`
- Closest demo: [`src/demos/tooltip.demo.tsx`](../../../../../src/demos/tooltip.demo.tsx)

## Overview

The Tooltip component displays a brief, non-interactive visual hint when an element is hovered or focused. Built on Base UI Tooltip primitives, it manages open delay timing, instant re-open transitions across grouped triggers, collision-aware floating positioning, and entrance/exit animations.

**Live demo variant:** `Default`

```tsx
import {
  Tooltip,
  TooltipPopup,
  TooltipPortal,
  TooltipPositioner,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'

export function TooltipDemo() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger render={<Button variant='outline'>Hold short</Button>} />
        <TooltipPortal>
          <TooltipPositioner side='top' align='center' sideOffset={4}>
            <TooltipPopup>Stop before runway boundary line</TooltipPopup>
          </TooltipPositioner>
        </TooltipPortal>
      </Tooltip>
    </TooltipProvider>
  )
}
```

## Usage

Use Tooltip to clarify icon-only buttons, truncate text previews, or provide short helper descriptions for compact UI controls. Do not place critical information or interactive controls (links, buttons) inside a tooltip; use `Popover` or `Dialog` instead. Avoid tooltips on touch-only mobile interfaces where hover does not exist.

**Live demo variant:** `Content`

## Anatomy

### Composition Tree

```text
<TooltipProvider delayDuration={200}>
└─ <Tooltip open={open} onOpenChange={setOpen}>
   ├─ <TooltipTrigger render={<Button ... />} />
   └─ <TooltipPortal>
      └─ <TooltipPositioner side='top' align='center'>
         └─ <TooltipPopup>
            ├─ <TooltipArrow /> (optional)
            └─ Tooltip text
```

Tooltip is composed of the following exported parts:

1. `TooltipProvider` (Root provider managing open delay timers and shared group context)
2. `Tooltip` (Root container managing open state for an individual trigger)
3. `TooltipTrigger` (Interactive anchor element triggering the tooltip on hover or focus)
4. `TooltipPortal` (Portals tooltip popup to body to avoid overflow clipping)
5. `TooltipPositioner` (Positions popup relative to the anchor)
6. `TooltipPopup` (Visual popup bubble styled with dark background, rounded radius, and small text)
7. `TooltipArrow` (Optional pointing arrow aligned with trigger)
8. `TooltipViewport` (Optional viewport bounds constraint)

The helper `createHandle` is also exported to enable detached triggers.

**Live demo variant:** `Default`

## Variants & states

Supported configurations:

- Placement: `side` (`top`, `bottom`, `left`, `right`) and `align` (`start`, `center`, `end`) on `TooltipPositioner`.
- Timing: `delay` and `closeDelay` configured on `TooltipProvider` or `Tooltip`.
- Animation: Smooth scale and opacity transitions via `data-starting-style` and `data-ending-style`.
- Instant group re-open: Once one tooltip in a provider opens, hovering peer tooltips opens instantly via `data-instant`.

**Live demo variant:** `Position and Size`

## Accessibility

`TooltipTrigger` automatically associates the tooltip content with the trigger element using `aria-describedby`. The tooltip appears on keyboard focus as well as mouse hover, and pressing `Escape` dismisses the tooltip immediately without moving focus.

**Live demo variant:** `Multiple triggers`

## API & examples

Import components from `skytrack-ui/tooltip` or `@/components/ui/tooltip`. Key props on `Tooltip`: `open`, `defaultOpen`, `onOpenChange`, `delay`, and `closeDelay`. `TooltipPositioner` accepts `side`, `align`, `sideOffset`, and `alignOffset`.

**Live demo variant:** `Detached triggers`

## Evidence and limits

- Package/version checked: `0.1.5`.
- Export: [`package.json`](../../../../../package.json) — `./tooltip`.
- Source, public declarations, and closest demo: linked above.
- Limits or unverified behavior: Tooltips are strictly non-interactive and dismiss on mouse leave or escape; interactive floating panels require `Popover`.
