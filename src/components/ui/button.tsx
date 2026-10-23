import * as React from 'react'
import { Button as BaseButton } from '@base-ui/react/button'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

/** Shared focus ring + disabled styles. Reuse in every interactive component. */
export const focusRing = 'outline-none focus-visible:ring-[3px] focus-visible:ring-ring/15 focus-visible:border-ring'

export const buttonVariants = cva(
  cn(
    'inline-flex cursor-pointer shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors select-none',
    'disabled:pointer-events-none disabled:opacity-50 data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    focusRing
  ),
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90 focus-visible:ring-destructive/30',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:hover:bg-input/50',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
        link: 'text-primary underline-offset-4 hover:underline'
      },
      size: {
        default: 'h-10 px-4 py-2 has-[>svg]:px-3',
        xs: 'h-6 gap-1.5 px-3 text-xs has-[>svg]:px-2.5',
        sm: 'h-8 gap-1.5 px-3 text-xs has-[>svg]:px-2.5',
        lg: 'h-12 px-6 has-[>svg]:px-4',
        xl: 'h-14 px-7 text-base has-[>svg]:px-5',
        icon: 'size-10',
        'icon-xs': 'size-6',
        'icon-sm': 'size-8',
        'icon-lg': 'size-12',
        'icon-xl': 'size-14'
      }
    },
    defaultVariants: { variant: 'default', size: 'default' }
  }
)

export type ButtonProps = React.ComponentProps<typeof BaseButton> & VariantProps<typeof buttonVariants>

function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <BaseButton data-slot='button' className={cn(buttonVariants({ variant, size }), className as string)} {...props} />
  )
}

export { Button }
