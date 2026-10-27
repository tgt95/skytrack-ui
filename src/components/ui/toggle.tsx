import * as React from 'react'
import { Toggle as BaseToggle } from '@base-ui/react/toggle'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { focusRing } from '@/components/ui/button'
import { ToggleGroupContext } from '@/components/ui/toggle-group'

export const toggleVariants = cva(
  cn(
    'inline-flex cursor-pointer items-center justify-center gap-2 rounded-(--radius) text-sm font-medium whitespace-nowrap transition-colors select-none',
    'disabled:pointer-events-none disabled:opacity-50 data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
    'data-[pressed]:bg-accent data-[pressed]:text-accent-foreground',
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    focusRing
  ),
  {
    variants: {
      variant: {
        default: 'bg-transparent hover:bg-muted hover:text-foreground',
        outline: 'border border-input bg-transparent hover:bg-accent',
        segmented:
          'flex-1 justify-center rounded-(--radius) bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground data-[pressed]:bg-card data-[pressed]:text-foreground data-[pressed]:shadow-sm',
        brand:
          'bg-transparent hover:bg-muted hover:text-foreground data-[pressed]:bg-primary data-[pressed]:text-primary-foreground'
      },
      size: {
        default: 'h-9 px-3',
        xs: 'h-6 px-2 text-xs',
        sm: 'h-8 px-2 text-xs',
        lg: 'h-10 px-4'
      }
    },
    defaultVariants: { variant: 'default', size: 'default' }
  }
)

type ToggleProps = React.ComponentProps<typeof BaseToggle> & VariantProps<typeof toggleVariants>

function Toggle({ className, variant, size, ...props }: ToggleProps) {
  const group = React.useContext(ToggleGroupContext)
  return (
    <BaseToggle
      data-slot='toggle'
      className={cn(
        toggleVariants({ variant: variant ?? group?.variant, size: size ?? group?.size }),
        className as string
      )}
      {...props}
    />
  )
}

export { Toggle }
