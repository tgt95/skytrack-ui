# Dialog

> A high-quality, unstyled React dialog component that opens on top of the entire page.

- Package version: `0.1.5`
- Public export: `skytrack-ui/dialog`
- Implementation: [`src/components/ui/dialog.tsx`](../src/components/ui/dialog.tsx)
- Public type declaration: [`dist-lib/components/ui/dialog.d.ts`](../dist-lib/components/ui/dialog.d.ts)
- Showcase demo id: `dialog`
- Closest demo: [`src/demos/dialog.demo.tsx`](../src/demos/dialog.demo.tsx)

## Overview

The Dialog component presents a modal window that overlays the entire application view. It requires the operator to focus on an active task—such as entering drone payload credentials, configuring automated geofencing rules, or editing aircraft telemetry parameters—before returning to the primary interface.

Built on `@base-ui/react/dialog`, it supports nested stacked dialogs with automatic scaling and brightness tinting, scrollable viewports, and detached triggers via `createHandle`. Note: Demo metadata in `dialog.demo.tsx` has title labeled "Typography" (a known template copy-paste discrepancy in demo metadata), with description matching Dialog.

**Live demo variant:** `Default`

```tsx
import {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogBackdrop,
  DialogPopup,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

export function DialogExample() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant='outline'>Configure geofence</Button>} />
      <DialogPortal>
        <DialogBackdrop />
        <DialogPopup>
          <DialogHeader>
            <DialogTitle>Geofence boundaries</DialogTitle>
            <DialogDescription>
              Set maximum ceiling altitude and lateral buffer radius for autonomous flight.
            </DialogDescription>
          </DialogHeader>
          <div className='py-2 text-sm text-muted-foreground'>Ceiling: 120m AGL · Buffer: 50m radius.</div>
          <DialogFooter>
            <DialogClose render={<Button variant='outline'>Cancel</Button>} />
            <Button>Save geofence</Button>
          </DialogFooter>
        </DialogPopup>
      </DialogPortal>
    </Dialog>
  )
}
```

## Usage

Use Dialog for focused workflows, detailed settings forms, multi-input configurations, and intermediate steps that benefit from complete user attention without navigating away.

Do not use Dialog for simple confirmation prompts involving irreversible destructive actions (use `skytrack-ui/alert-dialog`). Do not use Dialog for passive notifications (use `skytrack-ui/toast` or `skytrack-ui/alert`). For complex or wide inspector forms on mobile devices, consider using `skytrack-ui/drawer` instead.

**Live demo variant:** `Close confirmation`

## Anatomy

Render in strict nested order:

1. `Dialog`: Root coordination provider (`BaseDialog.Root`).
2. `DialogTrigger`: Interactive trigger button (`data-slot='dialog-trigger'`).
3. `DialogPortal`: Renders children into `document.body` with `z-50` (`data-slot='dialog-portal'`).
4. `DialogBackdrop`: Dark overlay scrim with fade animation (`data-slot='dialog-backdrop'`).
5. `DialogViewport` (optional): Scroll container for long dialogs (`data-slot='dialog-viewport'`).
6. `DialogPopup`: Centered dialog container with scale and opacity animations (`data-slot='dialog-popup'`).
7. `DialogHeader`: Header layout grouping title and description (`data-slot='dialog-header'`).
8. `DialogTitle`: Accessible title heading (`data-slot='dialog-title'`).
9. `DialogDescription`: Accessible contextual explanation (`data-slot='dialog-description'`).
10. `DialogFooter`: Action button alignment row (`data-slot='dialog-footer'`).
11. `DialogClose`: Dismiss button bound to close handler (`data-slot='dialog-close'`).

**Live demo variant:** `Open from a menu`

## Variants & states

Supported configurations:

- Controlled / Uncontrolled: Controlled via `open` and `onOpenChange`, or uncontrolled via `defaultOpen`.
- Nested Dialogs: Automatically handles stacking with CSS variable `--nested-dialogs`, scaling back parent popups by 10% and applying tinting.
- Scrolling: Supports viewport scrolling for content taller than the screen (`DialogViewport`).
- Detached Triggers: Trigger dialogs from outside the component tree using `createHandle`.

**Live demo variant:** `Nested dialogs`

## Accessibility

- Built on `@base-ui/react/dialog`:
- Implements `role='dialog'` with `aria-modal='true'`.
- `DialogTitle` is automatically linked via `aria-labelledby`, and `DialogDescription` via `aria-describedby`.
- Traps focus within the popup while open; dismisses on `Escape` key or backdrop click.
- Returns focus automatically to the trigger element upon closing.

**Live demo variant:** `Custom focus management`

## API & examples

Import named parts from `skytrack-ui/dialog` (or `@/components/ui/dialog` locally).

| Component       | Target Props                                                                                                            | Description                             |
| --------------- | ----------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| `Dialog`        | `open?: boolean`, `onOpenChange?: (open: boolean, details?: DialogChangeEventDetails) => void`, `defaultOpen?: boolean` | Root state manager                      |
| `DialogTrigger` | `render?: ReactElement`, standard button props                                                                          | Element that opens dialog               |
| `DialogPopup`   | `className?: string`, standard div props                                                                                | Modal container card                    |
| `DialogClose`   | `render?: ReactElement`, `variant?: ButtonVariant`, `size?: ControlSize`                                                | Dismiss trigger button                  |
| `createHandle`  | `() => DialogHandle`                                                                                                    | Creates ref handle for external trigger |

Tokens: Uses `--background`, `--foreground`, `--border`, `--radius`, and `--nested-dialogs`.

**Live demo variant:** `Controlled mode with multiple triggers`

## Evidence and limits

- Package/version checked: `0.1.5`.
- Export: [`package.json`](../package.json) — `./dialog`.
- Source, public declarations, and closest demo: linked above.
- Limits or unverified behavior: None found in inspected source. In `dialog.demo.tsx`, demo title is string 'Typography' while demo ID and content correctly represent Dialog.
