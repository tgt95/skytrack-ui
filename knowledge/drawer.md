# Drawer

> A high-quality, unstyled React drawer component with swipe-to-dismiss gestures.

- Package version: `0.1.5`
- Public export: `skytrack-ui/drawer`
- Implementation: [`src/components/ui/drawer.tsx`](../src/components/ui/drawer.tsx)
- Public type declaration: [`dist-lib/components/ui/drawer.d.ts`](../dist-lib/components/ui/drawer.d.ts)
- Showcase demo id: `drawer`
- Closest demo: [`src/demos/drawer.demo.tsx`](../src/demos/drawer.demo.tsx)

## Overview

The Drawer component provides an overlay panel anchored to the viewport edge that supports touch and pointer drag-to-dismiss gestures. In SkyTrack, it powers mobile navigation trays, responsive mission inspector sheets, filter sidebars, and rapid telemetry action sheets.

Built on `@base-ui/react/drawer`, it supports four docking sides (bottom, top, left, right), customizable snap points, backdrop indent effects, and virtual-keyboard-aware scrolling.

**Live demo variant:** `Default`

```tsx
import {
  Drawer,
  DrawerTrigger,
  DrawerPortal,
  DrawerBackdrop,
  DrawerPopup,
  DrawerContent,
  DrawerTitle,
  DrawerDescription,
  DrawerClose
} from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'

export function DrawerExample() {
  return (
    <Drawer>
      <DrawerTrigger render={<Button variant='outline'>View flight telemetry</Button>} />
      <DrawerPortal>
        <DrawerBackdrop />
        <DrawerPopup side='bottom' className='max-h-[85vh]'>
          <DrawerContent>
            <DrawerTitle>Real-time telemetry</DrawerTitle>
            <DrawerDescription>Detailed sensor feeds and motor temperatures for Drone #4.</DrawerDescription>
            <div className='py-4 text-sm text-muted-foreground'>
              Altitude: 45m · Ground speed: 12 m/s · Battery: 88%
            </div>
            <div className='flex justify-end gap-2'>
              <DrawerClose>Close feed</DrawerClose>
            </div>
          </DrawerContent>
        </DrawerPopup>
      </DrawerPortal>
    </Drawer>
  )
}
```

## Usage

Use Drawer for secondary inspection panes, mobile-friendly forms, action sheets, and detail views where swipe gestures enhance accessibility on tablets and phones.

Do not use Drawer for critical modal interruptions requiring immediate irreversible confirmation (use `skytrack-ui/alert-dialog`). On wide desktop screens where content must remain continuously visible alongside a map, prefer dedicated sidebars or split layouts over transient drawers.

**Live demo variant:** `Mobile navigation`

## Anatomy

Render in strict structural order:

1. `Drawer`: Root controller (`BaseDrawer.Root`).
2. `DrawerTrigger`: Interactive trigger opening the drawer (`data-slot='drawer-trigger'`).
3. `DrawerPortal`: Teleports overlay into document root (`data-slot='drawer-portal'`).
4. `DrawerBackdrop`: Backdrop overlay dimming underlying page content (`data-slot='drawer-backdrop'`).
5. `DrawerPopup`: Edge-docked container supporting swipe gestures and snap animations (`data-slot='drawer-popup'`).
6. `DrawerContent`: Main body container wrapping titles, descriptions, and custom layouts (`data-slot='drawer-content'`).
7. `DrawerTitle`: Accessible title heading (`data-slot='drawer-title'`).
8. `DrawerDescription`: Descriptive subtitle (`data-slot='drawer-description'`).
9. Standard layout elements: Optional `<div>` wrappers for scrollable content and action buttons.
10. `DrawerClose`: Close trigger button styled via `buttonVariants` (`data-slot='drawer-close'`).

**Live demo variant:** `Position`

## Variants & states

The `side` prop on `DrawerPopup` configures docking orientation:

- `bottom` (default): Bottom sheet sliding upward with drag pill handle; ideal for mobile workflows.
- `top`: Top-down banner drawer.
- `left`: Left-docked navigation sidebar drawer.
- `right`: Right-docked inspector panel drawer.

Gestures & Snapping:

- Configure `snapPoints` on the `Drawer` root: numbers from `0` to `1` are viewport-height fractions, numbers above `1` are pixels, and strings may use `px` or `rem` units.
- Control the selected position with the root's `snapPoint` and `onSnapPointChange` props.
- Use `defaultSnapPoint` for an uncontrolled initial position or `snapToSequentialPoints` to disable velocity-based point skipping.
- Add `DrawerSwipeArea` when the interaction needs an edge area for opening the drawer.
- Indent Effect: Integrates with `DrawerIndent` to shrink parent page background during presentation.

**Live demo variant:** `Snap points`

## Accessibility

- Built on `@base-ui/react/drawer`:
- Implements `role='dialog'` with `aria-modal='true'`.
- `DrawerTitle` and `DrawerDescription` are linked via `aria-labelledby` and `aria-describedby`.
- Full keyboard support: `Escape` closes the drawer; Tab navigation is trapped within the active popup.
- Restores focus to the trigger element on dismissal.

**Live demo variant:** `Close confirmation`

## API & examples

Import named parts from `skytrack-ui/drawer` (or `@/components/ui/drawer` locally): `Drawer`, `DrawerProvider`, `DrawerVirtualKeyboardProvider`, `createHandle`, `DrawerTrigger`, `DrawerSwipeArea`, `DrawerPortal`, `DrawerBackdrop`, `DrawerViewport`, `DrawerPopup`, `DrawerContent`, `DrawerTitle`, `DrawerDescription`, `DrawerClose`, `DrawerIndent`, `DrawerIndentBackground`.

| Component       | Target Props                                                                                                                | Description                                                          |
| --------------- | --------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| `Drawer`        | `open?`, `onOpenChange?`, `snapPoints?`, `snapPoint?`, `defaultSnapPoint?`, `onSnapPointChange?`, `snapToSequentialPoints?` | Root state manager; inherits the prop types from `BaseDrawer.Root`   |
| `DrawerPopup`   | `side?: 'bottom' \| 'top' \| 'left' \| 'right'`                                                                             | Positioned popup surface; inherits the props from `BaseDrawer.Popup` |
| `DrawerContent` | `className?: string`, `children?: ReactNode`                                                                                | Body container wrapping title, description, and controls             |
| `DrawerClose`   | `variant?: VariantProps<typeof buttonVariants>['variant']`, `size?: ControlSize`                                            | Dismiss button styled via buttonVariants                             |
| `createHandle`  | `() => DrawerHandle`                                                                                                        | Creates control handle for external buttons                          |

Tokens: Popup styles use `--background`, `--foreground`, `--border`, and `--radius`.

**Live demo variant:** `Action sheet with separate destructive action`

## Evidence and limits

- Package/version checked: `0.1.5`.
- Export: [`package.json`](../package.json) — `./drawer`.
- Source, public declarations, and closest demo: linked above.
- Limits or unverified behavior: None found in inspected source. Swipe velocity and gesture thresholds are managed internally by Base UI drawer physics.
