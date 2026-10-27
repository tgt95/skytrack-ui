import * as React from 'react'
import { ToggleGroup as BaseToggleGroup } from '@base-ui/react/toggle-group'
import { cn } from '@/lib/utils'

type ToggleGroupContextValue = {
  variant?: 'default' | 'outline' | 'segmented' | 'brand' | null
  size?: 'xs' | 'sm' | 'default' | 'lg' | null
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
          'data-[orientation=vertical]:flex-col',
          className as string
        )}
        {...props}
      />
    </ToggleGroupContext.Provider>
  )
}

export { ToggleGroup }
