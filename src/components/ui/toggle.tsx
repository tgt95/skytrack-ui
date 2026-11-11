import * as React from 'react'
import { Toggle as BaseToggle } from '@base-ui/react/toggle'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { focusRing } from '@/lib/focus-ring'
import { ToggleGroupContext } from '@/components/ui/toggle-group'
import { toggleVariantConfig } from '@/lib/toggle-variants'

export const toggleVariants = cva(
  cn(
    'inline-flex cursor-pointer items-center justify-center rounded-(--radius) font-medium whitespace-nowrap transition-colors select-none',
    'disabled:pointer-events-none disabled:opacity-50 data-disabled:pointer-events-none data-disabled:opacity-50',
    'data-pressed:bg-accent data-pressed:text-accent-foreground',
    '[&_svg]:pointer-events-none [&_svg]:shrink-0',
    focusRing
  ),
  toggleVariantConfig
)

type ToggleProps = React.ComponentProps<typeof BaseToggle> & VariantProps<typeof toggleVariants>

function Toggle({ className, variant, size, ...props }: ToggleProps) {
  const group = React.useContext(ToggleGroupContext)
  return (
    <BaseToggle
      data-slot='toggle'
      className={cn(toggleVariants({ variant: variant ?? group?.variant, size: size ?? group?.size }), className)}
      {...props}
    />
  )
}

export { Toggle }
