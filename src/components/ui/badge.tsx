import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

export const badgeVariants = cva('', {
  variants: {
    status: {
      default: 'bg-muted text-foreground', // AntD default badge is red
      success: 'bg-success text-white',
      warning: 'bg-warning text-white',
      error: 'bg-destructive text-white',
      processing: 'bg-primary text-primary-foreground',
      secondary: 'bg-secondary text-secondary-foreground',
      outline: 'border border-input bg-background text-foreground'
    },
    size: {
      default: 'h-5 min-w-5 px-1.5 text-xs',
      sm: 'h-4 min-w-4 px-1 text-[11px]'
    }
  },
  defaultVariants: { status: 'default', size: 'default' }
})

export type BadgeProps = React.ComponentProps<'span'> &
  VariantProps<typeof badgeVariants> & {
    /** Count rendered inside the pill. Omit it when using `dot`. */
    count?: React.ReactNode
    /** A numeric count above this renders as `{maxCount}+`. Default 99. */
    maxCount?: number
    /** Render a count of 0 instead of hiding the badge. Default false. */
    showZero?: boolean
    /** Render a 6px status dot instead of the count. Ignores `count` and `size`. */
    dot?: boolean
  }

/** Numeric counts above `maxCount` collapse to `{maxCount}+`; anything else passes through. */
function formatCount(count: React.ReactNode, maxCount: number): React.ReactNode {
  if (typeof count === 'number' && count > maxCount) return `${maxCount}+`
  return count
}

/**
 * Count / dot / status badge.
 * Two modes: anchor (`<Badge count={n}><Icon/></Badge>`) vs label pill (`<Badge count='text' />`).
 *
 * `className` targets the PILL (the count or dot), never the anchor wrapper — size the
 * anchor through `children`. With no `children` the pill renders standalone (inline, not
 * absolutely positioned); with `children` it is anchored to the child's top-end corner.
 * Any other span props (`id`, `aria-label`, handlers, ...) land on the pill.
 */
function Badge({
  className,
  status,
  size,
  count,
  maxCount = 99,
  showZero = false,
  dot = false,
  children,
  ...props
}: BadgeProps) {
  const value = formatCount(count, maxCount)
  const visible = dot || (value != null && (showZero || value !== 0))
  if (!visible) return <>{children}</> // no badge: render the anchor alone, zero DOM change
  const pill = (
    <span
      data-slot='badge-count'
      className={cn(
        'relative inline-flex items-center justify-center  leading-none font-medium tabular-nums',
        // Dot keeps the status color but drops the size variant so `size-1.5` wins.
        dot ? cn('size-1.5 p-0 rounded-full', badgeVariants({ status, size: null })) : cn('rounded-xl', badgeVariants({ status, size })),
        className as string
      )}
      {...props}
    >
      {dot ? null : value}
      {status === 'processing' && !dot ? (
        <span aria-hidden className='absolute inset-0 animate-ping rounded-xl bg-primary/40' />
      ) : null}
    </span>
  )
  if (children == null) return pill // standalone: inline pill, NOT absolute
  return (
    // anchored: supra top-end, RTL-safe logical props
    <span data-slot='badge' className='relative inline-flex shrink-0'>
      {children}
      <span className='absolute top-0 end-0 translate-x-1/2 -translate-y-1/2'>{pill}</span>
    </span>
  )
}

export { Badge }
