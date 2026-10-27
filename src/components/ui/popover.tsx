import * as React from 'react'
import { Popover as BasePopover } from '@base-ui/react/popover'
import { cn } from '@/lib/utils'
import { focusRing } from '@/components/ui/button'

/** Native Base UI props for `PopoverTrigger`; styling comes from the call site. */
export type PopoverTriggerProps = React.ComponentProps<typeof BasePopover.Trigger>

/**
 * Popover — a popup anchored to a trigger.
 * `Popover` (Root) renders no element of its own, so it is re-exported as-is.
 */
const Popover = BasePopover.Root

/** Creates a handle that lets detached triggers control this popover. */
const createHandle = BasePopover.createHandle

type PopoverChangeEventDetails = Parameters<
  NonNullable<React.ComponentProps<typeof BasePopover.Root>['onOpenChange']>
>[1]

function PopoverTrigger({ className, ...props }: React.ComponentProps<typeof BasePopover.Trigger>) {
  return (
    <BasePopover.Trigger
      data-slot='popover-trigger'
      className={className}
      {...props}
    />
  )
}

function PopoverPortal({ className, ...props }: React.ComponentProps<typeof BasePopover.Portal>) {
  return <BasePopover.Portal data-slot='popover-portal' className={cn('z-50', className as string)} {...props} />
}

function PopoverBackdrop({ className, ...props }: React.ComponentProps<typeof BasePopover.Backdrop>) {
  return (
    <BasePopover.Backdrop
      data-slot='popover-backdrop'
      className={cn(
        'fixed inset-0 z-50 bg-black/20 transition-opacity duration-150',
        'data-[starting-style]:opacity-0 data-[ending-style]:opacity-0 data-[closed]:pointer-events-none',
        className as string
      )}
      {...props}
    />
  )
}

function PopoverPositioner({ className, ...props }: React.ComponentProps<typeof BasePopover.Positioner>) {
  return (
    <BasePopover.Positioner
      data-slot='popover-positioner'
      className={cn(
        'z-50 h-[var(--positioner-height)] w-[var(--positioner-width)] max-w-[var(--available-width)]',
        className as string
      )}
      {...props}
    />
  )
}

function PopoverPopup({ className, ...props }: React.ComponentProps<typeof BasePopover.Popup>) {
  return (
    <BasePopover.Popup
      data-slot='popover-popup'
      className={cn(
        'relative z-50 flex w-[var(--popup-width,auto)] max-w-80 origin-[var(--transform-origin)] flex-col gap-1 rounded-(--radius) border border-border bg-popover p-4 text-popover-foreground shadow-md outline-none',
        'transition-[scale,opacity] duration-100 ease-out',
        'data-[starting-style]:scale-95 data-[starting-style]:opacity-0',
        'data-[ending-style]:scale-95 data-[ending-style]:opacity-0',
        'data-[instant]:transition-none',
        className as string
      )}
      {...props}
    />
  )
}

function PopoverArrowGlyph(props: React.ComponentProps<'svg'>) {
  return (
    <svg width='20' height='10' viewBox='0 0 20 10' fill='none' aria-hidden='true' focusable='false' {...props}>
      {/* body: container color, covers the popup border segment behind it (arrow paints above
          the popup's own border since it is a positioned child with z-10) */}
      <path d='M1 9 L10 1 L19 9 Z' fill='currentColor' stroke='none' className='text-popover' />
      {/* outer slanted edges only: border color, no base line; round joins keep the apex from
          spiking into an asymmetric miter tip at 1x */}
      <path
        d='M1 9 L10 1 L19 9'
        fill='none'
        stroke='currentColor'
        strokeWidth={1}
        strokeLinejoin='round'
        strokeLinecap='round'
        className='text-border'
      />
    </svg>
  )
}

function PopoverArrow({ className, children, ...props }: React.ComponentProps<typeof BasePopover.Arrow>) {
  return (
    <BasePopover.Arrow
      data-slot='popover-arrow'
      className={cn(
        'pointer-events-none absolute z-10 flex h-2.5 w-5 items-center justify-center',
        'data-[side=top]:bottom-[-9px] data-[side=top]:rotate-180',
        'data-[side=bottom]:top-[-9px]',
        'data-[side=left]:right-[-14px] data-[side=left]:rotate-90',
        'data-[side=right]:left-[-14px] data-[side=right]:-rotate-90',
        className as string
      )}
      {...props}
    >
      {children ?? <PopoverArrowGlyph />}
    </BasePopover.Arrow>
  )
}

function PopoverTitle({ className, ...props }: React.ComponentProps<typeof BasePopover.Title>) {
  return (
    <BasePopover.Title
      data-slot='popover-title'
      className={cn('text-lg heading font-medium text-popover-foreground', className as string)}
      {...props}
    />
  )
}

function PopoverDescription({ className, ...props }: React.ComponentProps<typeof BasePopover.Description>) {
  return (
    <BasePopover.Description
      data-slot='popover-description'
      className={cn('text-sm text-muted-foreground', className as string)}
      {...props}
    />
  )
}

function PopoverClose({ className, ...props }: React.ComponentProps<typeof BasePopover.Close>) {
  return (
    <BasePopover.Close
      data-slot='popover-close'
      className={cn(
        'absolute top-2 right-2 inline-flex size-6 cursor-pointer items-center justify-center rounded-(--radius) text-muted-foreground transition-colors',
        'hover:bg-accent hover:text-accent-foreground',
        'disabled:pointer-events-none disabled:opacity-50 data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        focusRing,
        className as string
      )}
      {...props}
    />
  )
}

function PopoverViewport({ className, ...props }: React.ComponentProps<typeof BasePopover.Viewport>) {
  return (
    <BasePopover.Viewport
      data-slot='popover-viewport'
      className={cn('relative h-full w-full overflow-clip', className as string)}
      {...props}
    />
  )
}

export {
  Popover,
  createHandle,
  PopoverTrigger,
  PopoverPortal,
  PopoverBackdrop,
  PopoverPositioner,
  PopoverPopup,
  PopoverArrow,
  PopoverTitle,
  PopoverDescription,
  PopoverClose,
  PopoverViewport
}

export type { PopoverChangeEventDetails }
