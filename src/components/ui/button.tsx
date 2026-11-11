import * as React from 'react'
import { Button as BaseButton } from '@base-ui/react/button'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { buttonVariantConfig } from '@/lib/button-variants'
import { focusRing } from '@/lib/focus-ring'

/** Keep existing button-subpath imports working while shared controls use the common module. */
export { focusRing }
export { CONTROL_SIZE_CLASSES as controlSizeClasses } from '@/lib/control-sizes'
export type { ControlSize } from '@/lib/control-sizes'

export const buttonVariants = cva(
  cn(
    'inline-flex cursor-pointer shrink-0 items-center justify-center whitespace-nowrap rounded-(--radius) font-medium transition-colors select-none',
    'disabled:pointer-events-none disabled:opacity-50 data-disabled:pointer-events-none data-disabled:opacity-50',
    '[&_svg]:pointer-events-none [&_svg]:shrink-0',
    focusRing
  ),
  buttonVariantConfig
)

export type ButtonProps = React.ComponentProps<typeof BaseButton> & VariantProps<typeof buttonVariants>

function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <BaseButton
      data-slot='button'
      data-size={size ?? 'default'}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export { Button }
