import * as React from 'react'
import { Meter as BaseMeter } from '@base-ui/react/meter'
import { cn } from '@/lib/utils'

function Meter({ className, ...props }: React.ComponentProps<typeof BaseMeter.Root>) {
  return (
    <BaseMeter.Root
      data-slot='meter'
      className={cn('grid w-60 max-w-full grid-cols-2 gap-y-2', className as string)}
      {...props}
    />
  )
}

function MeterLabel({ className, ...props }: React.ComponentProps<typeof BaseMeter.Label>) {
  return (
    <BaseMeter.Label
      data-slot='meter-label'
      className={cn('text-sm font-normal text-foreground', className as string)}
      {...props}
    />
  )
}

function MeterValue({ className, ...props }: React.ComponentProps<typeof BaseMeter.Value>) {
  return (
    <BaseMeter.Value
      data-slot='meter-value'
      className={cn('text-right text-sm text-foreground', className as string)}
      {...props}
    />
  )
}

function MeterTrack({ className, ...props }: React.ComponentProps<typeof BaseMeter.Track>) {
  return (
    <BaseMeter.Track
      data-slot='meter-track'
      className={cn('col-span-2 h-3 overflow-hidden bg-muted', className as string)}
      {...props}
    />
  )
}

function MeterIndicator({ className, ...props }: React.ComponentProps<typeof BaseMeter.Indicator>) {
  return (
    <BaseMeter.Indicator
      data-slot='meter-indicator'
      className={cn('bg-primary transition-[width] duration-500', className as string)}
      {...props}
    />
  )
}

export { Meter, MeterLabel, MeterValue, MeterTrack, MeterIndicator }
