import * as React from 'react'
import { PreviewCard as BasePreviewCard } from '@base-ui/react/preview-card'
import { cn } from '@/lib/utils'
import { PopupArrowGlyph } from '@/lib/popup-arrow'

/** Native Base UI props for `PreviewCardTrigger`; styling comes from the call site. */
export type PreviewCardTriggerProps = React.ComponentProps<typeof BasePreviewCard.Trigger>

/**
 * Preview Card — a link that shows a destination preview on hover or focus.
 * `PreviewCard` (Root) renders no element of its own, so it is re-exported as-is.
 */
const PreviewCard = BasePreviewCard.Root

/** Creates a handle that lets detached triggers control this preview card. */
const createHandle = BasePreviewCard.createHandle

type PreviewCardChangeEventDetails = Parameters<
  NonNullable<React.ComponentProps<typeof BasePreviewCard.Root>['onOpenChange']>
>[1]

function PreviewCardTrigger({ className, ...props }: React.ComponentProps<typeof BasePreviewCard.Trigger>) {
  return <BasePreviewCard.Trigger data-slot='preview-card-trigger' className={className} {...props} />
}

function PreviewCardPortal({ className, ...props }: React.ComponentProps<typeof BasePreviewCard.Portal>) {
  return <BasePreviewCard.Portal data-slot='preview-card-portal' className={cn('z-50', className)} {...props} />
}

function PreviewCardBackdrop({ className, ...props }: React.ComponentProps<typeof BasePreviewCard.Backdrop>) {
  return (
    <BasePreviewCard.Backdrop
      data-slot='preview-card-backdrop'
      className={cn(
        'fixed inset-0 z-50 bg-black/20 transition-opacity duration-150',
        'data-starting-style:opacity-0 data-ending-style:opacity-0 data-closed:pointer-events-none',
        className
      )}
      {...props}
    />
  )
}

function PreviewCardPositioner({ className, ...props }: React.ComponentProps<typeof BasePreviewCard.Positioner>) {
  return (
    <BasePreviewCard.Positioner
      data-slot='preview-card-positioner'
      className={cn(
        'z-50 h-[var(--positioner-height)] w-[var(--positioner-width)] max-w-[var(--available-width)]',
        className
      )}
      {...props}
    />
  )
}

function PreviewCardPopup({ className, ...props }: React.ComponentProps<typeof BasePreviewCard.Popup>) {
  return (
    <BasePreviewCard.Popup
      data-slot='preview-card-popup'
      className={cn(
        'relative z-50 w-[var(--popup-width,auto)] max-w-80 origin-[var(--transform-origin)] rounded-(--radius) border border-border bg-popover text-popover-foreground shadow-md',
        'transition-[scale,opacity] duration-100 ease-out',
        'data-starting-style:scale-95 data-starting-style:opacity-0',
        'data-ending-style:scale-95 data-ending-style:opacity-0',
        'data-instant:transition-none',
        className
      )}
      {...props}
    />
  )
}

function PreviewCardArrow({ className, children, ...props }: React.ComponentProps<typeof BasePreviewCard.Arrow>) {
  return (
    <BasePreviewCard.Arrow
      data-slot='preview-card-arrow'
      className={cn(
        'pointer-events-none absolute z-10 flex h-2.5 w-5 items-center justify-center',
        'data-[side=top]:bottom-[-9px] data-[side=top]:rotate-180',
        'data-[side=bottom]:top-[-9px]',
        'data-[side=left]:right-[-9px] data-[side=left]:rotate-90',
        'data-[side=right]:left-[-9px] data-[side=right]:-rotate-90',
        className
      )}
      {...props}
    >
      {children ?? <PopupArrowGlyph />}
    </BasePreviewCard.Arrow>
  )
}

function PreviewCardViewport({ className, ...props }: React.ComponentProps<typeof BasePreviewCard.Viewport>) {
  return (
    <BasePreviewCard.Viewport
      data-slot='preview-card-viewport'
      className={cn('relative h-full w-full overflow-clip', className)}
      {...props}
    />
  )
}

export {
  PreviewCard,
  createHandle,
  PreviewCardTrigger,
  PreviewCardPortal,
  PreviewCardBackdrop,
  PreviewCardPositioner,
  PreviewCardPopup,
  PreviewCardArrow,
  PreviewCardViewport
}

export type { PreviewCardChangeEventDetails }
