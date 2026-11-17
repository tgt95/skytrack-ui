import * as React from 'react'
import { FolderDashedIcon } from '@phosphor-icons/react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

export type EmptySize = 'sm' | 'default' | 'lg'
export type EmptyVariant = 'default' | 'simple'

const EmptyContext = React.createContext<{ size: EmptySize; variant: EmptyVariant } | null>(null)

function useEmptyContext() {
  return React.useContext(EmptyContext) ?? { size: 'default' as const, variant: 'default' as const }
}

export const emptyVariants = cva('flex w-full flex-col items-center justify-center text-center text-pretty', {
  variants: {
    size: {
      sm: 'gap-2 p-4',
      default: 'gap-4 p-6',
      lg: 'gap-6 p-8'
    }
  },
  defaultVariants: { size: 'default' }
})

export type EmptyProps = React.ComponentProps<'div'> &
  VariantProps<typeof emptyVariants> & {
    /** `simple` drops the media tile and shows a larger bare mark for compact regions. */
    variant?: EmptyVariant
  }

/** Placeholder for a region with no records, results, or content. */
function Empty({ size = 'default', variant = 'default', className, children, ...props }: EmptyProps) {
  const groupedChildren = React.useMemo(() => {
    const items = React.Children.toArray(children)
    const result: React.ReactNode[] = []
    let buffer: React.ReactElement[] = []

    const flush = () => {
      if (buffer.length > 0) {
        const gapClass = size === 'sm' ? 'gap-0.5' : 'gap-1'
        result.push(
          <div key={`empty-title-description-${result.length}`} className={`flex flex-col ${gapClass}`}>
            {buffer}
          </div>
        )
        buffer = []
      }
    }

    items.forEach((child) => {
      if (React.isValidElement(child) && (child.type === EmptyTitle || child.type === EmptyDescription)) {
        buffer.push(child)
      } else {
        flush()
        result.push(child)
      }
    })
    flush()

    return result
  }, [children, size])

  return (
    <EmptyContext.Provider value={{ size: size ?? 'default', variant }}>
      <div
        data-slot='empty'
        data-size={size ?? 'default'}
        data-variant={variant}
        className={cn(emptyVariants({ size }), className)}
        {...props}
      >
        {groupedChildren}
      </div>
    </EmptyContext.Provider>
  )
}

const emptyMediaVariants = cva(
  'flex shrink-0 items-center justify-center text-muted-foreground [&_img]:object-contain',
  {
    variants: {
      variant: {
        default: 'rounded-(--radius) bg-muted dark:bg-muted/40 p-3 [&>svg]:size-6',
        simple: 'p-0 [&>svg]:size-8'
      },
      size: {
        sm: '',
        default: '',
        lg: ''
      }
    },
    compoundVariants: [
      { variant: 'default', size: 'sm', class: 'p-2 [&>svg]:size-5' },
      { variant: 'default', size: 'lg', class: 'p-4 [&>svg]:size-7' },
      { variant: 'simple', size: 'sm', class: '[&>svg]:size-6' },
      { variant: 'simple', size: 'lg', class: '[&>svg]:size-12' }
    ],
    defaultVariants: { variant: 'default', size: 'default' }
  }
)

export type EmptyMediaProps = React.ComponentProps<'div'> & {
  /** Icon rendered as the decorative default mark when no children are provided. Accepts a component or an element. Defaults to `FolderDashedIcon`. */
  icon?: React.ComponentType<{ className?: string }> | React.ReactElement
}

/** Visual slot. With no children it renders a decorative default mark. */
function EmptyMedia({ className, children, icon = FolderDashedIcon, ...props }: EmptyMediaProps) {
  const { size, variant } = useEmptyContext()

  if (children != null) {
    return (
      <div
        data-slot='empty-media'
        className={cn('flex shrink-0 items-center justify-center text-muted-foreground', className)}
        {...props}
      >
        {children}
      </div>
    )
  }

  const mark =
    React.isValidElement(icon) ? (
      icon
    ) : (
      React.createElement(icon as React.ComponentType<{ className?: string; 'aria-hidden'?: boolean | 'true' | 'false' }>, {
        'aria-hidden': 'true'
      })
    )

  return (
    <div
      data-slot='empty-media'
      aria-hidden='true'
      className={cn(emptyMediaVariants({ variant, size }), className)}
      {...props}
    >
      {mark}
    </div>
  )
}

const emptyTitleVariants = cva('font-medium text-foreground text-balance', {
  variants: {
    size: {
      sm: 'text-sm',
      default: 'text-base',
      lg: 'text-lg'
    }
  },
  defaultVariants: { size: 'default' }
})

export type EmptyTitleProps = React.ComponentProps<'div'>

/** Short headline naming what is missing. Rendered as a styled `div`, not a heading element. */
function EmptyTitle({ className, ...props }: EmptyTitleProps) {
  const { size } = useEmptyContext()

  return <div data-slot='empty-title' className={cn(emptyTitleVariants({ size }), className)} {...props} />
}

const emptyDescriptionVariants = cva('text-muted-foreground text-balance', {
  variants: {
    size: {
      sm: 'text-sm',
      default: 'text-sm',
      lg: 'text-sm'
    }
  },
  defaultVariants: { size: 'default' }
})

export type EmptyDescriptionProps = React.ComponentProps<'div'>

/** Supporting text that explains why the region is empty and what to do next. */
function EmptyDescription({ className, ...props }: EmptyDescriptionProps) {
  const { size } = useEmptyContext()

  return <div data-slot='empty-description' className={cn(emptyDescriptionVariants({ size }), className)} {...props} />
}

export type EmptyContentProps = React.ComponentProps<'div'>

/** Action row below the copy, usually SkyTrack Buttons or links. */
function EmptyContent({ className, ...props }: EmptyContentProps) {
  return (
    <div
      data-slot='empty-content'
      className={cn('flex max-w-full flex-wrap items-center justify-center gap-2', className)}
      {...props}
    />
  )
}

export { Empty, EmptyMedia, EmptyTitle, EmptyDescription, EmptyContent }
