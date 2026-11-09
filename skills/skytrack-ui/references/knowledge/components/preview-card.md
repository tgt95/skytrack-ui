# Preview Card

> A high-quality, unstyled React preview card component for a link that shows a destination preview without interrupting keyboard or screen reader navigation.

- Package version: `0.1.5`
- Public export: `skytrack-ui/preview-card`
- Implementation: [`src/components/ui/preview-card.tsx`](../../../../../src/components/ui/preview-card.tsx)
- Public type declaration: [`dist-lib/components/ui/preview-card.d.ts`](../../../../../dist-lib/components/ui/preview-card.d.ts)
- Showcase demo id: `preview-card`
- Closest demo: [`src/demos/preview-card.demo.tsx`](../../../../../src/demos/preview-card.demo.tsx)

## Overview

The Preview Card presents a rich visual preview card when hovering or focusing a navigational link or reference. In SkyTrack, it reveals flight mission route snapshots, pilot profiles, drone hardware specs, or airspace restriction summaries without requiring the operator to navigate away from the current screen.

Built on `@base-ui/react/preview-card`, it protects keyboard accessibility: screen readers and keyboard users can activate the underlying link naturally without being trapped inside the preview popup.

**Live demo variant:** `Default`

```tsx
import {
  PreviewCard,
  PreviewCardTrigger,
  PreviewCardPortal,
  PreviewCardPositioner,
  PreviewCardPopup
} from '@/components/ui/preview-card'

export function PreviewCardExample() {
  return (
    <PreviewCard>
      <PreviewCardTrigger href='#drone-4' className='text-sm font-medium text-foreground underline underline-offset-4'>
        Matrice 350 RTK
      </PreviewCardTrigger>
      <PreviewCardPortal>
        <PreviewCardPositioner side='bottom' align='start' sideOffset={8}>
          <PreviewCardPopup className='w-64 p-4'>
            <div className='text-sm font-semibold text-foreground'>Drone #AC-1042</div>
            <p className='mt-1 text-xs text-muted-foreground'>
              Payload: LiDAR Zenmuse L2 · Max flight time: 55 min · Firmware: v02.04
            </p>
          </PreviewCardPopup>
        </PreviewCardPositioner>
      </PreviewCardPortal>
    </PreviewCard>
  )
}
```

## Usage

Use Preview Card for hyperlinks pointing to complex entities (drones, pilots, mission routes, work orders) where a quick visual summary helps operators decide whether to click through.

Do not use Preview Card for interactive forms or commands requiring buttons (use `skytrack-ui/popover`). Do not use Preview Card for short, non-interactive text labels describing a button (use `skytrack-ui/tooltip`).

**Live demo variant:** `Content`

## Anatomy

### Composition Tree

```text
<PreviewCard openOnHover>
├─ <PreviewCardTrigger href='...'>Hover link</PreviewCardTrigger>
└─ <PreviewCardPortal>
   └─ <PreviewCardPositioner>
      └─ <PreviewCardPopup>
         ├─ <PreviewCardArrow /> (optional)
         └─ Preview content
```

Render in strict nested order:

1. `PreviewCard`: Root coordinator (`BasePreviewCard.Root`).
2. `PreviewCardTrigger`: Anchor element initiating the preview on hover or focus (`data-slot='preview-card-trigger'`).
3. `PreviewCardPortal`: Teleports preview card into document root (`data-slot='preview-card-portal'`).
4. `PreviewCardBackdrop` (optional): Subtle overlay scrim (`data-slot='preview-card-backdrop'`).
5. `PreviewCardPositioner`: Manages anchor collision and side offsets (`data-slot='preview-card-positioner'`).
6. `PreviewCardPopup`: Styled surface container with shadow and border (`data-slot='preview-card-popup'`).
7. `PreviewCardArrow` (optional): Visual pointer tip pointing to trigger (`data-slot='preview-card-arrow'`).

**Live demo variant:** `Animating the Preview Card`

## Variants & states

Supported features:

- Delay Timers: Built-in open and close hover delays prevent preview flickers during casual mouse passes.
- Positioning: Supports `side` (`'top'`, `'bottom'`, `'left'`, `'right'`), `align` (`'start'`, `'center'`, `'end'`), and `sideOffset`.
- Detached Triggers: Can connect remote triggers via `createHandle`.
- Smooth Animations: 150ms ease-out opacity and scale transitions via Base UI CSS states.

**Live demo variant:** `Position and Size`

## Accessibility

- Built on `@base-ui/react/preview-card`:
- Does not trap keyboard focus: pressing `Tab` continues normal document tab navigation without entering the card.
- Pressing `Enter` on `PreviewCardTrigger` immediately navigates to the destination `href`.
- Closes on `Escape` key without changing page focus.
- Touch devices: Long-press or click toggles preview appropriately without breaking link navigation.

**Live demo variant:** `Detached triggers`

## API & examples

Import named parts from `skytrack-ui/preview-card` (or `@/components/ui/preview-card` locally).

| Component               | Target Props                                                                                            | Description                        |
| ----------------------- | ------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| `PreviewCard`           | `open?: boolean`, `onOpenChange?: (open: boolean) => void`, `openDelay?: number`, `closeDelay?: number` | Root state manager                 |
| `PreviewCardTrigger`    | `href?: string`, standard anchor props                                                                  | Navigational trigger element       |
| `PreviewCardPositioner` | `side?: 'top' \| 'bottom' \| 'left' \| 'right'`, `sideOffset?: number`                                  | Anchoring geometry                 |
| `PreviewCardPopup`      | `className?: string`, standard div props                                                                | Styled preview card surface        |
| `createHandle`          | `() => PreviewCardHandle`                                                                               | Control handle for remote triggers |

Tokens: Uses `--popover`, `--popover-foreground`, `--border`, and `--radius`.

**Live demo variant:** `Controlled mode with multiple triggers`

## Evidence and limits

- Package/version checked: `0.1.5`.
- Export: [`package.json`](../../../../../package.json) — `./preview-card`.
- Source, public declarations, and closest demo: linked above.
- Limits or unverified behavior: None found in inspected source. Designed for preview information; interactive controls should not be placed inside PreviewCardPopup.
