import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const cardVariants = cva(
  'group/card flex min-w-0 flex-col gap-4 rounded-(--radius) not-[.border-none]:border not-[.border-none]:border-border bg-card shadow-xs',
  {
    variants: {
      size: {
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8'
      }
    },
    defaultVariants: { size: 'md' }
  }
)

type CardElement = 'div' | 'section' | 'article'
type CardOwnProps = VariantProps<typeof cardVariants> & { className?: string; as?: CardElement }

export type CardProps<T extends CardElement = 'section'> = CardOwnProps &
  Omit<React.ComponentPropsWithoutRef<T>, keyof CardOwnProps>

/** Content surface with a fixed-height heading row and size-based padding. */
function Card<T extends CardElement = 'section'>({ as, size = 'md', className, ...props }: CardProps<T>) {
  const Element = as ?? 'section'
  return (
    <Element data-slot='card' data-size={size ?? 'md'} className={cn(cardVariants({ size }), className)} {...props} />
  )
}

export type CardHeaderProps = React.ComponentProps<'header'>

/** Header stacks a fixed-height title/toolbar row above the description. */
function CardHeader({ className, ...props }: CardHeaderProps) {
  return <header data-slot='card-header' className={cn('flex min-w-0 flex-col gap-0', className)} {...props} />
}

export type CardHeadingProps = React.ComponentProps<'div'>

/** Fixed-height row for the title and optional toolbar. */
function CardHeading({ className, ...props }: CardHeadingProps) {
  return (
    <div
      data-slot='card-heading'
      className={cn('flex h-10 min-w-0 items-center justify-between gap-3', className)}
      {...props}
    />
  )
}

export type CardTitleProps = React.ComponentProps<'h2'> & {
  /** Choose the heading level that matches the page outline. */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

function CardTitle({ as: Heading = 'h2', className, ...props }: CardTitleProps) {
  return <Heading data-slot='card-title' className={cn('m-0 line-clamp-1 h4', className)} {...props} />
}

export type CardDescriptionProps = React.ComponentProps<'p'>

function CardDescription({ className, ...props }: CardDescriptionProps) {
  return (
    <div
      data-slot='card-description'
      className={cn('mt-0.5 line-clamp-1 text-sm text-muted-foreground group-data-[size=lg]/card:text-base', className)}
      {...props}
    />
  )
}

export type CardToolbarProps = React.ComponentProps<'div'>

function CardToolbar({ className, ...props }: CardToolbarProps) {
  return (
    <div
      data-slot='card-toolbar'
      role='group'
      className={cn(
        'flex max-w-1/2 min-w-0 shrink-0 items-center gap-2 overflow-x-auto group-data-[size=lg]/card:[&_[data-slot=button]]:!h-10',
        className
      )}
      {...props}
    />
  )
}

export type CardContentProps = React.ComponentProps<'div'>

function CardContent({ className, ...props }: CardContentProps) {
  return <div data-slot='card-content' className={cn('min-w-0', className)} {...props} />
}

export type CardFooterProps = React.ComponentProps<'footer'>

function CardFooter({ className, ...props }: CardFooterProps) {
  return <footer data-slot='card-footer' className={cn('flex min-w-0 items-center gap-2', className)} {...props} />
}

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardHeading, CardTitle, CardToolbar }
