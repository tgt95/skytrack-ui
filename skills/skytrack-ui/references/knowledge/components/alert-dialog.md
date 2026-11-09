# Alert Dialog

> A high-quality, unstyled React alert dialog component that requires a user response to proceed.

- Package version: `0.1.5`
- Public export: `skytrack-ui/alert-dialog`
- Implementation: [`src/components/ui/alert-dialog.tsx`](../../../../../src/components/ui/alert-dialog.tsx)
- Public type declaration: [`dist-lib/components/ui/alert-dialog.d.ts`](../../../../../dist-lib/components/ui/alert-dialog.d.ts)
- Showcase demo id: `alert-dialog`
- Closest demo: [`src/demos/alert-dialog.demo.tsx`](../../../../../src/demos/alert-dialog.demo.tsx)

## Overview

The Alert Dialog interrupts the operator's workflow to convey critical, high-consequence information and demands an explicit affirmative or cancellation decision before action proceeds. It is designed for destructive or irreversible actions—such as aborting an active mission, deleting flight logs, or resetting drone calibration.

Unlike standard dialogs, clicking the backdrop does not dismiss an Alert Dialog, ensuring operators deliberately confirm or cancel.

**Live demo variant:** `Default`

```tsx
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogPortal,
  AlertDialogBackdrop,
  AlertDialogPopup,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogClose
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'

export function AlertDialogExample() {
  return (
    <AlertDialog>
      <AlertDialogTrigger render={<Button variant='destructive'>Abort mission</Button>} />
      <AlertDialogPortal>
        <AlertDialogBackdrop />
        <AlertDialogPopup>
          <AlertDialogTitle>Abort autonomous flight?</AlertDialogTitle>
          <AlertDialogDescription>
            This commands the drone to immediately enter Return-To-Home mode and halts mapping.
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogClose>Resume flight</AlertDialogClose>
            <AlertDialogClose variant='destructive'>Confirm abort</AlertDialogClose>
          </AlertDialogFooter>
        </AlertDialogPopup>
      </AlertDialogPortal>
    </AlertDialog>
  )
}
```

## Usage

Use Alert Dialog for high-risk actions where accidental confirmation causes irreversible data loss, safety violations, or hardware aborts.

Do not use Alert Dialog for non-destructive forms, detailed inspection sheets (use `skytrack-ui/dialog` or `skytrack-ui/drawer`), or passive status messages (use `skytrack-ui/alert` or `skytrack-ui/toast`). Keep the title focused on the question ("Discard changes?") and pair with clear, explicit action labels instead of generic "OK" or "Yes".

**Live demo variant:** `Close confirmation`

## Anatomy

### Composition Tree

```text
<AlertDialog open={open} onOpenChange={setOpen}>
├─ <AlertDialogTrigger render={<Button ... />} />
└─ <AlertDialogPortal>
   ├─ <AlertDialogBackdrop />
   └─ <AlertDialogPopup>
      ├─ <AlertDialogHeader>
      │  ├─ <AlertDialogTitle />
      │  └─ <AlertDialogDescription />
      └─ <AlertDialogFooter>
         ├─ <AlertDialogClose render={<Button variant='outline'>Cancel</Button>} />
         └─ <Button variant='destructive'>Confirm</Button>
```

Render in strict nested order:

1. `AlertDialog`: Root state provider managing open state and focus trap (`data-slot='alert-dialog'`).
2. `AlertDialogTrigger`: Interactive element triggering modal presentation (`data-slot='alert-dialog-trigger'`).
3. `AlertDialogPortal`: Renders the modal overlay into document root (`data-slot='alert-dialog-portal'`).
4. `AlertDialogBackdrop`: Full-screen scrim (`data-slot='alert-dialog-backdrop'`) with fade animation.
5. `AlertDialogPopup`: Centered modal container (`data-slot='alert-dialog-popup'`).
6. `AlertDialogHeader`: Optional header layout container for title and description (`data-slot='alert-dialog-header'`).
7. `AlertDialogTitle`: Accessible heading (`data-slot='alert-dialog-title'`).
8. `AlertDialogDescription`: Contextual body text (`data-slot='alert-dialog-description'`).
9. `AlertDialogFooter`: Layout container aligning actions (`data-slot='alert-dialog-footer'`).
10. `AlertDialogClose`: Action and dismissal button styled via `buttonVariants` (`data-slot='alert-dialog-close'`, default `variant='outline'`, supports `variant='destructive'`).

**Live demo variant:** `Open from a menu`

## Variants & states

Controlled state is managed via `open` and `onOpenChange`. Uncontrolled state uses `defaultOpen`.

Visual states:

- Backdrop: Renders with `bg-black/20` backdrop scrim, animating opacity on open/close.
- Popup: Centered layout with scale/fade animations via Base UI transition states (`data-starting-style`, `data-ending-style`).
- Action buttons support all `buttonVariants` (`destructive`, `default`, `outline`, `secondary`, `ghost`).

**Live demo variant:** `Controlled mode with multiple triggers`

## Accessibility

Built upon `@base-ui/react/alert-dialog`:

- Implements ARIA modal role: `role='alertdialog'`, automatically connected to `AlertDialogTitle` via `aria-labelledby` and `AlertDialogDescription` via `aria-describedby`.
- Traps focus completely within the popup while open; prevents outside interaction.
- Keyboard: `Escape` cancels the dialog. Tab loops through footer action buttons.
- On dismiss, returns focus to the initiating trigger element.

**Live demo variant:** `Detached triggers`

## API & examples

Import named parts from `skytrack-ui/alert-dialog` (or `@/components/ui/alert-dialog` locally): `AlertDialog`, `createHandle`, `AlertDialogTrigger`, `AlertDialogPortal`, `AlertDialogBackdrop`, `AlertDialogOverlay`, `AlertDialogViewport`, `AlertDialogPopup`, `AlertDialogHeader`, `AlertDialogFooter`, `AlertDialogTitle`, `AlertDialogDescription`, `AlertDialogClose`.

| Prop                   | Target             | Type                                                               | Default     |
| ---------------------- | ------------------ | ------------------------------------------------------------------ | ----------- |
| `open` / `defaultOpen` | `AlertDialog`      | `boolean`                                                          | `undefined` |
| `onOpenChange`         | `AlertDialog`      | `(open: boolean, details?: AlertDialogChangeEventDetails) => void` | `undefined` |
| `variant`              | `AlertDialogClose` | `VariantProps<typeof buttonVariants>['variant']`                   | `'outline'` |
| `size`                 | `AlertDialogClose` | `ControlSize \| 'icon' \| 'icon-xs' \| 'icon-sm' \| 'icon-lg'`     | `'default'` |

Popups use tokens `--card`, `--foreground`, `--border`, and `--radius-lg`.

**Live demo variant:** `Multiple triggers`

## Evidence and limits

- Package/version checked: `0.1.5`.
- Export: [`package.json`](../../../../../package.json) — `./alert-dialog`.
- Source, public declarations, and closest demo: linked above.
- Limits or unverified behavior: By design, alert-dialog disables closing on outside pointer clicks. Dismissal requires explicit interaction with trigger actions or the Escape key.
