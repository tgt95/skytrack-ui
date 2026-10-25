import * as React from 'react'
import { Dialog as BaseDialog } from '@base-ui/react/dialog'
import type { VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

/** Variant and size props for `DialogClose`. */
export type DialogButtonProps = VariantProps<typeof buttonVariants>

/**
 * Dialog — a popup that opens on top of the entire page.
 * `Dialog` (Root) renders no element of its own, so it is re-exported as-is.
 */
const Dialog = BaseDialog.Root

/** Creates a handle that lets detached triggers control this dialog. */
const createHandle = BaseDialog.createHandle

type DialogChangeEventDetails = Parameters<NonNullable<React.ComponentProps<typeof BaseDialog.Root>['onOpenChange']>>[1]

function DialogTrigger({
  className,
  ...props
}: React.ComponentProps<typeof BaseDialog.Trigger>) {
  return (
    <BaseDialog.Trigger
      data-slot='dialog-trigger'
      className={className}
      {...props}
    />
  )
}

function DialogPortal({ className, ...props }: React.ComponentProps<typeof BaseDialog.Portal>) {
  return <BaseDialog.Portal data-slot='dialog-portal' className={cn('z-50', className as string)} {...props} />
}

function DialogBackdrop({ className, ...props }: React.ComponentProps<typeof BaseDialog.Backdrop>) {
  return (
    <BaseDialog.Backdrop
      data-slot='dialog-backdrop'
      className={cn(
        'fixed inset-0 z-50 min-h-dvh bg-black/70 transition-opacity duration-150',
        'supports-[-webkit-touch-callout:none]:absolute',
        'data-[starting-style]:opacity-0 data-[ending-style]:opacity-0',
        className as string
      )}
      {...props}
    />
  )
}

/** Convenience alias matching the shadcn naming. */
function DialogOverlay({ className, ...props }: React.ComponentProps<typeof BaseDialog.Backdrop>) {
  return <DialogBackdrop data-slot='dialog-overlay' className={className} {...props} />
}

function DialogViewport({ className, ...props }: React.ComponentProps<typeof BaseDialog.Viewport>) {
  return (
    <BaseDialog.Viewport
      data-slot='dialog-viewport'
      className={cn('fixed inset-0 z-50 overflow-y-auto overscroll-contain', className as string)}
      {...props}
    />
  )
}

function DialogPopup({ className, ...props }: React.ComponentProps<typeof BaseDialog.Popup>) {
  return (
    <BaseDialog.Popup
      data-slot='dialog-popup'
      className={cn(
        'fixed top-[calc(50%+var(--nested-dialogs,0)*1.25rem)] left-1/2 z-50 flex w-full max-w-[calc(100vw-2rem)] -translate-x-1/2 -translate-y-1/2 scale-[calc(1-0.1*var(--nested-dialogs,0))] flex-col gap-4 rounded-lg border border-border bg-background p-6 text-foreground shadow-lg sm:max-w-lg',
        'after:pointer-events-none after:absolute after:inset-0 after:bg-foreground/5 after:opacity-0 after:transition-opacity after:duration-100',
        'data-[nested-dialog-open]:after:opacity-100',
        'transition-[top,scale,opacity] duration-100 ease-out',
        'data-[starting-style]:top-[calc(50%+0.25rem+var(--nested-dialogs,0)*1.25rem)] data-[starting-style]:scale-[calc(0.96-0.1*var(--nested-dialogs,0))] data-[starting-style]:opacity-0',
        'data-[ending-style]:top-[calc(50%+0.25rem+var(--nested-dialogs,0)*1.25rem)] data-[ending-style]:scale-[calc(0.96-0.1*var(--nested-dialogs,0))] data-[ending-style]:opacity-0',
        'motion-reduce:transition-none',
        className as string
      )}
      {...props}
    />
  )
}

function DialogHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot='dialog-header' className={cn('flex flex-col gap-1.5 text-left', className)} {...props} />
}

function DialogFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='dialog-footer'
      className={cn('flex flex-col-reverse gap-3 sm:flex-row sm:justify-end', className)}
      {...props}
    />
  )
}

function DialogTitle({ className, ...props }: React.ComponentProps<typeof BaseDialog.Title>) {
  return (
    <BaseDialog.Title
      data-slot='dialog-title'
      className={cn('text-base leading-none font-semibold', className as string)}
      {...props}
    />
  )
}

function DialogDescription({ className, ...props }: React.ComponentProps<typeof BaseDialog.Description>) {
  return (
    <BaseDialog.Description
      data-slot='dialog-description'
      className={cn('text-sm text-muted-foreground', className as string)}
      {...props}
    />
  )
}

function DialogClose({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof BaseDialog.Close> & DialogButtonProps) {
  return (
    <BaseDialog.Close
      data-slot='dialog-close'
      className={cn(buttonVariants({ variant: variant ?? 'outline', size }), className as string)}
      {...props}
    />
  )
}

export {
  Dialog,
  createHandle,
  DialogTrigger,
  DialogPortal,
  DialogBackdrop,
  DialogOverlay,
  DialogViewport,
  DialogPopup,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose
}

export type { DialogChangeEventDetails }
