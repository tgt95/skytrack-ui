import * as React from 'react'
import { ToggleGroup as BaseToggleGroup } from '@base-ui/react/toggle-group'
import { cn } from '@/lib/utils'

type ToggleGroupContextValue = {
  variant?: 'default' | 'outline' | 'segmented' | 'brand' | null
  size?: 'xs' | 'sm' | 'default' | 'lg' | 'icon' | 'icon-xs' | 'icon-sm' | 'icon-lg' | null
}

export const ToggleGroupContext = React.createContext<ToggleGroupContextValue | null>(null)

type ToggleGroupProps = React.ComponentProps<typeof BaseToggleGroup> & ToggleGroupContextValue

function ToggleGroup({ className, variant, size, ...props }: ToggleGroupProps) {
  return (
    <ToggleGroupContext.Provider value={{ variant, size }}>
      <BaseToggleGroup
        data-slot='toggle-group'
        className={cn(
          'flex items-center rounded-(--radius) border border-border',
          variant === 'segmented' && 'gap-1 bg-background p-0.5',
          variant === 'outline' && '[&>[data-slot=toggle]]:border-0',
          'data-[orientation=vertical]:flex-col',
          className
        )}
        {...props}
      />
    </ToggleGroupContext.Provider>
  )
}

export { ToggleGroup }
