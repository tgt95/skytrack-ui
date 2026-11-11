import * as React from 'react'
import { ToggleGroup as BaseToggleGroup } from '@base-ui/react/toggle-group'
import { cn } from '@/lib/utils'
import { CONTROL_HEIGHT_CLASSES } from '@/lib/control-sizes'

type ToggleGroupContextValue = {
  variant?: 'default' | 'outline' | 'segmented' | 'brand' | null
  size?: 'xs' | 'sm' | 'default' | 'lg' | 'icon' | 'icon-xs' | 'icon-sm' | 'icon-lg' | null
}

export const ToggleGroupContext = React.createContext<ToggleGroupContextValue | null>(null)

type ToggleGroupSize = NonNullable<ToggleGroupContextValue['size']>

const toggleGroupHeightClasses: Record<ToggleGroupSize, string> = {
  xs: CONTROL_HEIGHT_CLASSES.xs,
  sm: CONTROL_HEIGHT_CLASSES.sm,
  default: CONTROL_HEIGHT_CLASSES.default,
  lg: CONTROL_HEIGHT_CLASSES.lg,
  icon: CONTROL_HEIGHT_CLASSES.default,
  'icon-xs': CONTROL_HEIGHT_CLASSES.xs,
  'icon-sm': CONTROL_HEIGHT_CLASSES.sm,
  'icon-lg': CONTROL_HEIGHT_CLASSES.lg
}

type ToggleGroupProps = React.ComponentProps<typeof BaseToggleGroup> & ToggleGroupContextValue

function ToggleGroup({ className, variant, size, ...props }: ToggleGroupProps) {
  return (
    <ToggleGroupContext.Provider value={{ variant, size }}>
      <BaseToggleGroup
        data-slot='toggle-group'
        className={cn(
          'flex items-center rounded-(--radius) border border-border',
          toggleGroupHeightClasses[size ?? 'default'],
          variant === 'segmented' && 'gap-1 bg-background p-0.5',
          variant === 'outline' && '[&>[data-slot=toggle]]:border-0',
          'data-[orientation=vertical]:flex-col data-[orientation=vertical]:h-auto',
          className
        )}
        {...props}
      />
    </ToggleGroupContext.Provider>
  )
}

export { ToggleGroup }
