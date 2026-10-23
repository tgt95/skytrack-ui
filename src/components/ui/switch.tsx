import * as React from 'react'
import { Switch as BaseSwitch } from '@base-ui/react/switch'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { focusRing } from '@/components/ui/button'

export const switchVariants = cva(
  cn(
    'inline-flex cursor-pointer shrink-0 items-center rounded-full border border-input bg-muted p-0.5 transition-colors',
    'data-checked:bg-primary data-checked:border-primary',
    'disabled:cursor-not-allowed disabled:opacity-50 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50',
    focusRing
  ),
  {
    variants: {
      size: {
        default: 'h-5 w-9',
        sm: 'h-4 w-7'
      }
    },
    defaultVariants: { size: 'default' }
  }
)

export const switchThumbVariants = cva('block rounded-full bg-background shadow transition-transform', {
  variants: {
    size: {
      default: 'size-3.5 data-checked:translate-x-4',
      sm: 'size-3 data-unchecked:translate-x-[-0.8px] data-checked:translate-x-[calc(var(--spacing)*2.7)]'
    }
  },
  defaultVariants: { size: 'default' }
})

type SwitchProps = React.ComponentProps<typeof BaseSwitch.Root> & VariantProps<typeof switchVariants>
type SwitchSize = VariantProps<typeof switchVariants>['size']
const SwitchSizeContext = React.createContext<SwitchSize>('default')

function Switch({ className, size, ...props }: SwitchProps) {
  return (
    <SwitchSizeContext.Provider value={size ?? 'default'}>
      <BaseSwitch.Root data-slot='switch' className={cn(switchVariants({ size }), className as string)} {...props} />
    </SwitchSizeContext.Provider>
  )
}

type SwitchThumbProps = React.ComponentProps<typeof BaseSwitch.Thumb> & VariantProps<typeof switchThumbVariants>

function SwitchThumb({ className, size, ...props }: SwitchThumbProps) {
  const inheritedSize = React.useContext(SwitchSizeContext)
  return (
    <BaseSwitch.Thumb
      data-slot='switch-thumb'
      className={cn(switchThumbVariants({ size: size ?? inheritedSize }), className as string)}
      {...props}
    />
  )
}

export { Switch, SwitchThumb }
