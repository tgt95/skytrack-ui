import * as React from 'react'
import { Tooltip as BaseTooltip } from '@base-ui/react/tooltip'
import type { VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

/** Shared variant/size props for `TooltipTrigger`. */
export type TooltipTriggerProps = VariantProps<typeof buttonVariants>

/**
 * Tooltip — a visual hint that appears when an element is hovered or focused.
 * `TooltipProvider` and `Tooltip` (Root) render no element of their own, so they
 * are re-exported as-is.
 */
const TooltipProvider = BaseTooltip.Provider
const Tooltip = BaseTooltip.Root

/** Creates a handle that lets detached triggers control this tooltip. */
const createHandle = BaseTooltip.createHandle

type TooltipChangeEventDetails = Parameters<
  NonNullable<React.ComponentProps<typeof BaseTooltip.Root>['onOpenChange']>
>[1]

function TooltipTrigger({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof BaseTooltip.Trigger> & TooltipTriggerProps) {
  return (
    <BaseTooltip.Trigger
      data-slot='tooltip-trigger'
      className={cn(
        // buttonVariants({ variant: variant ?? "outline", size: size ?? "icon-sm" }),
        'cursor-pointer',
        'data-[popup-open]:bg-accent data-[popup-open]:text-accent-foreground',
        className as string
      )}
      {...props}
    />
  )
}

function TooltipPortal({ className, ...props }: React.ComponentProps<typeof BaseTooltip.Portal>) {
  return <BaseTooltip.Portal data-slot='tooltip-portal' className={cn('z-50', className as string)} {...props} />
}

function TooltipPositioner({ className, ...props }: React.ComponentProps<typeof BaseTooltip.Positioner>) {
  return (
    <BaseTooltip.Positioner
      data-slot='tooltip-positioner'
      className={cn(
        'z-50 h-[var(--positioner-height)] w-[var(--positioner-width)] max-w-[var(--available-width)]',
        className as string
      )}
      {...props}
    />
  )
}

function TooltipPopup({ className, ...props }: React.ComponentProps<typeof BaseTooltip.Popup>) {
  return (
    <BaseTooltip.Popup
      data-slot='tooltip-popup'
      className={cn(
        'z-50 flex w-[var(--popup-width,auto)] max-w-64 origin-[var(--transform-origin)] items-center rounded-md bg-foreground px-3 py-1.5 text-xs text-background',
        'transition-[scale,opacity] duration-100 ease-out',
        'data-[starting-style]:scale-90 data-[starting-style]:opacity-0',
        'data-[ending-style]:scale-90 data-[ending-style]:opacity-0',
        'data-[instant]:transition-none',
        className as string
      )}
      {...props}
    />
  )
}

/**
 * The arrow glyph: a true isoceles triangle, not a clipped rotated square.
 *
 * Drawn in the same 10x10 user-space box as the arrow element (`size-2.5`), so
 * 1 user unit === 1 CSS pixel and the four rotations below need no per-side
 * nudging. `y=5` is the popup border, because each side offsets the arrow box by
 * exactly half its own size (`[-5px]`), which centres the box on that border:
 *
 * - base at `y=6` — 10px wide, sitting 1px *inside* the popup so the junction
 *   overlaps the popup edge and cannot show a seam;
 * - apex at `y=1` — 5px out from the base, 1px clear of the box edge, so no
 *   overflow clip can ever truncate the tip into a blunt edge.
 *
 * For `side=top|left|right` the box is rotated about its centre, which mirrors
 * those two offsets to the correct border; the base stays 1px inside and the
 * apex stays 5px out in every orientation.
 *
 * `fill="currentColor"` + `text-foreground` resolves to the same `--foreground`
 * token as the popup's `bg-foreground`, in both themes.
 */
function TooltipArrowGlyph(props: React.ComponentProps<'svg'>) {
  return (
    <svg width='10' height='10' viewBox='0 0 10 10' fill='currentColor' aria-hidden='true' focusable='false' {...props}>
      <path d='M0 6h10L5 1Z' />
    </svg>
  )
}

function TooltipArrow({ className, children, ...props }: React.ComponentProps<typeof BaseTooltip.Arrow>) {
  return (
    <BaseTooltip.Arrow
      data-slot='tooltip-arrow'
      className={cn(
        'pointer-events-none absolute z-10 block size-2.5 text-foreground',
        'data-[side=bottom]:top-[-5px]',
        'data-[side=top]:bottom-[-5px] data-[side=top]:rotate-180',
        'data-[side=left]:right-[-5px] data-[side=left]:rotate-90',
        'data-[side=right]:left-[-5px] data-[side=right]:-rotate-90',
        className as string
      )}
      {...props}
    >
      {children ?? <TooltipArrowGlyph />}
    </BaseTooltip.Arrow>
  )
}

function TooltipViewport({ className, ...props }: React.ComponentProps<typeof BaseTooltip.Viewport>) {
  return (
    <BaseTooltip.Viewport
      data-slot='tooltip-viewport'
      className={cn('relative h-full w-full overflow-clip', className as string)}
      {...props}
    />
  )
}

export {
  TooltipProvider,
  Tooltip,
  createHandle,
  TooltipTrigger,
  TooltipPortal,
  TooltipPositioner,
  TooltipPopup,
  TooltipArrow,
  TooltipViewport
}

export type { TooltipChangeEventDetails }
