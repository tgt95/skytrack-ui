import * as React from 'react'
import { AlertDialog as BaseAlertDialog } from '@base-ui/react/alert-dialog'
import type { VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

/** Variant and size props for `AlertDialogClose`. */
export type AlertDialogButtonProps = VariantProps<typeof buttonVariants>

/**
 * Alert Dialog — a dialog that requires a user response to proceed.
 * `AlertDialog` (Root) renders no element of its own, so it is re-exported as-is.
 */
const AlertDialog = BaseAlertDialog.Root

/** Creates a handle that lets detached triggers control this alert dialog. */
const createHandle = BaseAlertDialog.createHandle

type AlertDialogChangeEventDetails = Parameters<
  NonNullable<React.ComponentProps<typeof BaseAlertDialog.Root>['onOpenChange']>
>[1]

function AlertDialogTrigger({
  className,
  ...props
}: React.ComponentProps<typeof BaseAlertDialog.Trigger>) {
  return (
    <BaseAlertDialog.Trigger
      data-slot='alert-dialog-trigger'
      className={className}
      {...props}
    />
  )
}

function AlertDialogPortal({ className, ...props }: React.ComponentProps<typeof BaseAlertDialog.Portal>) {
  return (
    <BaseAlertDialog.Portal data-slot='alert-dialog-portal' className={cn('z-50', className as string)} {...props} />
  )
}

function AlertDialogBackdrop({ className, ...props }: React.ComponentProps<typeof BaseAlertDialog.Backdrop>) {
  return (
    <BaseAlertDialog.Backdrop
      data-slot='alert-dialog-backdrop'
      className={cn(
        'fixed inset-0 z-50 min-h-dvh bg-black/20 transition-opacity duration-150',
        'supports-[-webkit-touch-callout:none]:absolute',
        'data-[starting-style]:opacity-0 data-[ending-style]:opacity-0',
        className as string
      )}
      {...props}
    />
  )
}

/** Convenience alias matching the shadcn naming. */
function AlertDialogOverlay({ className, ...props }: React.ComponentProps<typeof BaseAlertDialog.Backdrop>) {
  return <AlertDialogBackdrop data-slot='alert-dialog-overlay' className={className} {...props} />
}

function AlertDialogViewport({ className, ...props }: React.ComponentProps<typeof BaseAlertDialog.Viewport>) {
  return (
    <BaseAlertDialog.Viewport
      data-slot='alert-dialog-viewport'
      className={cn('fixed inset-0 z-50 overflow-y-auto overscroll-contain', className as string)}
      {...props}
    />
  )
}

function AlertDialogPopup({ className, ...props }: React.ComponentProps<typeof BaseAlertDialog.Popup>) {
  return (
    <BaseAlertDialog.Popup
      data-slot='alert-dialog-popup'
      className={cn(
        'fixed top-1/2 left-1/2 z-50 flex w-full max-w-[calc(100vw-2rem)] -translate-x-1/2 -translate-y-1/2 flex-col gap-4 rounded-lg border border-border bg-background p-6 text-foreground shadow-lg sm:max-w-lg',
        'transition-[scale,opacity] duration-100 ease-out',
        'data-[starting-style]:scale-95 data-[starting-style]:opacity-0',
        'data-[ending-style]:scale-95 data-[ending-style]:opacity-0',
        'motion-reduce:transition-none',
        className as string
      )}
      {...props}
    />
  )
}

function AlertDialogHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot='alert-dialog-header' className={cn('flex flex-col gap-2 text-left', className)} {...props} />
}

function AlertDialogFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='alert-dialog-footer'
      className={cn('flex flex-col-reverse gap-2 sm:flex-row sm:justify-end', className)}
      {...props}
    />
  )
}

function AlertDialogTitle({ className, ...props }: React.ComponentProps<typeof BaseAlertDialog.Title>) {
  return (
    <BaseAlertDialog.Title
      data-slot='alert-dialog-title'
      className={cn('text-lg leading-none font-semibold', className as string)}
      {...props}
    />
  )
}

function AlertDialogDescription({ className, ...props }: React.ComponentProps<typeof BaseAlertDialog.Description>) {
  return (
    <BaseAlertDialog.Description
      data-slot='alert-dialog-description'
      className={cn('text-sm text-muted-foreground', className as string)}
      {...props}
    />
  )
}

function AlertDialogClose({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof BaseAlertDialog.Close> & AlertDialogButtonProps) {
  return (
    <BaseAlertDialog.Close
      data-slot='alert-dialog-close'
      className={cn(buttonVariants({ variant: variant ?? 'outline', size }), className as string)}
      {...props}
    />
  )
}

export {
  AlertDialog,
  createHandle,
  AlertDialogTrigger,
  AlertDialogPortal,
  AlertDialogBackdrop,
  AlertDialogOverlay,
  AlertDialogViewport,
  AlertDialogPopup,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogClose
}

export type { AlertDialogChangeEventDetails }
