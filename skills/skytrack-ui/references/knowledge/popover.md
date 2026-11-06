# Popover

> A high-quality, unstyled React popover component that displays an accessible popup anchored to a button.

- Package version: `0.1.5`
- Public export: `skytrack-ui/popover`
- Implementation: [`src/components/ui/popover.tsx`](../../../../src/components/ui/popover.tsx)
- Public type declaration: [`dist-lib/components/ui/popover.d.ts`](../../../../dist-lib/components/ui/popover.d.ts)
- Showcase demo id: `popover`
- Closest demo: [`src/demos/popover.demo.tsx`](../../../../src/demos/popover.demo.tsx)

## Overview

The Popover component renders rich interactive content—such as filter configurations, flight coordinate calculators, quick settings panels, or pilot profiles—inside a transient card anchored directly to a trigger element.

Built on `@base-ui/react/popover`, it handles automatic viewport boundary collision detection, directional arrows, controlled/uncontrolled state, backdrop clicks, and detached triggers via `createHandle`.

**Live demo variant:** `Default`

```tsx
import {
  Popover,
  PopoverTrigger,
  PopoverPortal,
  PopoverPositioner,
  PopoverPopup,
  PopoverTitle,
  PopoverDescription
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'

export function PopoverExample() {
  return (
    <Popover>
      <PopoverTrigger render={<Button variant='outline'>Inspect sensor</Button>} />
      <PopoverPortal>
        <PopoverPositioner side='bottom' align='start' sideOffset={8}>
          <PopoverPopup className='w-72'>
            <PopoverTitle>Multispectral Sensor 4K</PopoverTitle>
            <PopoverDescription>Status: Operational · Calibration: 99.4% · Exposure mode: Auto</PopoverDescription>
          </PopoverPopup>
        </PopoverPositioner>
      </PopoverPortal>
    </Popover>
  )
}
```

## Usage

Use Popover for rich, self-contained interactive tools, complex disclosure forms, and coordinate pickers anchored to a specific control.

Do not use Popover for simple text tips on hover (use `skytrack-ui/tooltip`), hover previews of external links (use `skytrack-ui/preview-card`), or simple command action lists (use `skytrack-ui/menu`). Popover content should stay focused and not replicate an entire full-screen workflow.

**Live demo variant:** `Opening on hover`

## Anatomy

Render in strict nested order:

1. `Popover`: Root coordination provider (`BasePopover.Root`).
2. `PopoverTrigger`: Interactive element triggering popup presentation (`data-slot='popover-trigger'`).
3. `PopoverPortal`: Teleports popup into document root with `z-50` (`data-slot='popover-portal'`).
4. `PopoverBackdrop` (optional): Dimming backdrop overlay (`data-slot='popover-backdrop'`).
5. `PopoverPositioner`: Manages collision geometry and anchoring (`data-slot='popover-positioner'`).
6. `PopoverPopup`: Styled popover surface container (`data-slot='popover-popup'`).
7. Content primitives: `PopoverTitle`, `PopoverDescription`, `PopoverClose`, `PopoverArrow`.

**Live demo variant:** `Content`

## Variants & states

Supported features:

- Trigger modes: Click to toggle (default), or hover activation via `openOnHover`.
- Positioning: Supports `side` (`'top'`, `'bottom'`, `'left'`, `'right'`), `align` (`'start'`, `'center'`, `'end'`), and `sideOffset`.
- Detached triggers: Controls popover from anywhere via `createHandle`.
- Animation: Smooth scale and opacity transitions via Base UI CSS states (`data-starting-style`, `data-ending-style`).

**Live demo variant:** `Position and Size`

## Accessibility

- Built on `@base-ui/react/popover`:
- Implements ARIA `role='dialog'` on the popup.
- Trigger button is automatically linked via `aria-haspopup='dialog'` and `aria-expanded`.
- Keyboard navigation: Closes on `Escape` key, automatically returning focus to the trigger element.
- Click outside or tabbing outside automatically dismisses the popover.

**Live demo variant:** `Detached triggers`

## API & examples

Import named parts from `skytrack-ui/popover` (or `@/components/ui/popover` locally).

| Component           | Target Props                                                                                                   | Description                    |
| ------------------- | -------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| `Popover`           | `open?: boolean`, `onOpenChange?: (open: boolean) => void`, `openOnHover?: boolean`                            | Root state manager             |
| `PopoverTrigger`    | `render?: ReactElement`, standard button props                                                                 | Anchoring trigger              |
| `PopoverPositioner` | `side?: 'top' \| 'bottom' \| 'left' \| 'right'`, `align?: 'start' \| 'center' \| 'end'`, `sideOffset?: number` | Positioning coordinates        |
| `PopoverPopup`      | `className?: string`, standard div props                                                                       | Styled popover card            |
| `createHandle`      | `() => PopoverHandle`                                                                                          | Ref handle for remote triggers |

Tokens: Uses `--popover`, `--popover-foreground`, `--border`, and `--radius`.

**Live demo variant:** `Controlled mode with multiple triggers`

## Evidence and limits

- Package/version checked: `0.1.5`.
- Export: [`package.json`](../../../../package.json) — `./popover`.
- Source, public declarations, and closest demo: linked above.
- Limits or unverified behavior: None found in inspected source. When `openOnHover` is enabled, ensure keyboard users can still activate the popover via focus or Enter.
