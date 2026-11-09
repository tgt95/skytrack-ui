# Toast

> Generates toast notifications.

- Package version: `0.1.5`
- Public export: `skytrack-ui/toast`
- Implementation: [`src/components/ui/toast.tsx`](../../../../../src/components/ui/toast.tsx)
- Public type declaration: [`dist-lib/components/ui/toast.d.ts`](../../../../../dist-lib/components/ui/toast.d.ts)
- Showcase demo id: `toast`
- Closest demo: [`src/demos/toast.demo.tsx`](../../../../../src/demos/toast.demo.tsx)

## Overview

The Toast component displays brief, non-blocking notification banners that confirm background operations, export completions, or minor system alerts. It supports stacked cards with expand-on-hover behavior, promise lifecycle updates, and action dismissal buttons.

Toasts require wrapping interactive areas in `ToastProvider` and rendering mapped `ToastRoot` items within a `ToastViewport`.

**Live demo variant:** `Default`

```tsx
import * as React from 'react'
import {
  ToastProvider,
  ToastPortal,
  ToastViewport,
  ToastRoot,
  ToastContent,
  ToastTitle,
  ToastDescription,
  ToastClose,
  useToastManager
} from '@/components/ui/toast'
import { Button } from '@/components/ui/button'

function CreateToastButton() {
  const { add } = useToastManager()

  return (
    <Button
      variant='outline'
      onClick={() =>
        add({
          title: 'Flight log saved',
          description: 'Telemetry archive synced with mission control.'
        })
      }
    >
      Save flight log
    </Button>
  )
}

function ToastList() {
  const { toasts } = useToastManager()

  return (
    <>
      {toasts.map((toast) => (
        <ToastRoot key={toast.id} toast={toast}>
          <ToastContent>
            <div className='flex min-w-0 flex-1 flex-col gap-1'>
              <ToastTitle />
              <ToastDescription />
            </div>
            <ToastClose>Dismiss</ToastClose>
          </ToastContent>
        </ToastRoot>
      ))}
    </>
  )
}

export function ToastExample() {
  return (
    <ToastProvider>
      <CreateToastButton />
      <ToastPortal>
        <ToastViewport className='fixed right-4 bottom-4 z-50 flex flex-col gap-2'>
          <ToastList />
        </ToastViewport>
      </ToastPortal>
    </ToastProvider>
  )
}
```

## Usage

Use Toast for brief, transient status updates confirming that an action succeeded, failed, or was queued, where the operator does not need to take immediate blocking action.

Do not use Toast for critical safety warnings, airspace collision alarms, or confirmations requiring explicit approval before proceeding (use `skytrack-ui/alert-dialog` or `skytrack-ui/alert`). Avoid queuing dozens of toasts simultaneously; configure appropriate auto-dismiss timeouts.

**Live demo variant:** `Undo action`

## Anatomy

### Composition Tree

**Stacked viewport (default):**

```text
<ToastProvider>
└─ <ToastPortal>
   └─ <ToastViewport>
      └─ <ToastRoot toast={toast} layout='stacked|flat'>
         └─ <ToastContent>
            ├─ <div className='flex min-w-0 flex-1 flex-col gap-1'>
            │  ├─ <ToastTitle />
            │  └─ <ToastDescription />
            ├─ <ToastAction />
            └─ <ToastClose />  (renders Button; variant='outline', size: 'icon' if icon-only or 'default' if text)
```

**Anchored to trigger:**

```text
<ToastProvider>
└─ <ToastPortal>
   └─ <ToastPositioner>
      └─ <ToastRoot toast={toast}>
         ├─ <ToastArrow />
         └─ <ToastContent>
            ├─ <ToastTitle /> / <ToastDescription />
            └─ <ToastClose />
```

Render in layered composition:

1. `ToastProvider`: React context provider managing toast queue state (`BaseToast.Provider`).
2. `ToastPortal`: Teleports toast viewport to document root (`data-slot='toast-portal'`).
3. `ToastViewport`: Fixed container positioning toast cards on screen (`data-slot='toast-viewport'`).
4. `ToastRoot`: Individual animated toast card with stacking transforms (`data-slot='toast-root'`).
5. `ToastContent`: Card body layout flex container (`data-slot='toast-content'`).
6. `ToastTitle`: Heading announcing notification topic (`data-slot='toast-title'`).
7. `ToastDescription`: Supporting explanation text (`data-slot='toast-description'`).
8. `ToastAction`: Interactive button inside toast (e.g. "Undo").
9. `ToastClose`: Dismiss button rendering `Button` with `XIcon` by default (`data-slot='toast-close'`). Defaults to `variant='outline'`; `size='icon'` when icon-only, or `size='default'` when text children are passed.

**Live demo variant:** `Anchored toasts`

## Variants & states

Supported features in `src/components/ui/toast.tsx`:

- Types: Driven by `toast.type` (`'success'`, `'error'`, `'warning'`, `'loading'`), applying corresponding accent border colors and tinted background gradients via `toastRootVariants`.
- Stacking: Supports stacked arrangement with CSS transform variables (`--toast-index`, `--toast-height`), expanding full stack on hover (`data-expanded`).
- Promises: `add({ promise, loading, success, error })` automatically updates toast contents across lifecycle stages.
- Anchored: Can anchor toasts to specific UI elements using `ToastPositioner` and `ToastArrow`.

**Live demo variant:** `Promise`

## Accessibility

- Built on `@base-ui/react/toast`:
- Employs ARIA live regions provided by Base UI to announce incoming notifications to assistive technology.
- Action and dismiss buttons receive focus rings and support standard keyboard interaction (`Enter` / `Space`).
- Dismiss button includes accessible label text.
- Reduced motion: UNVERIFIED in component source (`toastRootVariants` does not include `motion-reduce:transition-none`); consumers should supply `motion-reduce:transition-none` when required by accessibility policy.

**Live demo variant:** `Deduplicated toast`

## API & examples

Import named parts and hooks from `skytrack-ui/toast` (or `@/components/ui/toast` locally): `ToastProvider`, `ToastPortal`, `ToastViewport`, `ToastPositioner`, `ToastRoot`, `ToastContent`, `ToastTitle`, `ToastDescription`, `ToastAction`, `ToastClose`, `useToastManager`, `createToastManager`.

| Export               | Type      | Description                                      |
| -------------------- | --------- | ------------------------------------------------ |
| `ToastProvider`      | Component | Context provider holding toast queue             |
| `ToastViewport`      | Component | Viewport container positioning toast stack       |
| `ToastRoot`          | Component | Animated card container receiving `toast` object |
| `useToastManager`    | Hook      | Returns `{ add, close, update, toasts }`         |
| `createToastManager` | Function  | Standalone manager instance creator              |

Tokens: Uses `--popover`, `--border`, `--success`, `--destructive`, `--warning`, and `--radius`.

**Live demo variant:** `Custom position`

## Evidence and limits

- Package/version checked: `0.1.5`.
- Export: [`package.json`](../../../../../package.json) — `./toast`.
- Source, public declarations, and closest demo: linked above.
- Limits or unverified behavior: Component source does not implement `motion-reduce:transition-none`; consumers should supply motion overrides via `className` if strict reduced-motion adherence is required.
