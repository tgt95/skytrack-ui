import * as React from 'react'
import { Progress as BaseProgress } from '@base-ui/react/progress'
import { cn } from '@/lib/utils'

function Progress({ className, ...props }: React.ComponentProps<typeof BaseProgress.Root>) {
  return (
    <BaseProgress.Root
      data-slot='progress'
      className={cn('grid max-w-full grid-cols-2 gap-y-2', className as string)}
      {...props}
    />
  )
}

function ProgressLabel({ className, ...props }: React.ComponentProps<typeof BaseProgress.Label>) {
  return (
    <BaseProgress.Label
      data-slot='progress-label'
      className={cn('text-sm font-normal text-foreground', className as string)}
      {...props}
    />
  )
}

function ProgressValue({ className, ...props }: React.ComponentProps<typeof BaseProgress.Value>) {
  return (
    <BaseProgress.Value
      data-slot='progress-value'
      className={cn('text-right text-sm text-foreground', className as string)}
      {...props}
    />
  )
}

function ProgressTrack({ className, ...props }: React.ComponentProps<typeof BaseProgress.Track>) {
  return (
    <BaseProgress.Track
      data-slot='progress-track'
      className={cn('col-span-2 h-1 overflow-hidden bg-muted', className as string)}
      {...props}
    />
  )
}

function ProgressIndicator({ className, ...props }: React.ComponentProps<typeof BaseProgress.Indicator>) {
  return (
    <BaseProgress.Indicator
      data-slot='progress-indicator'
      className={cn('h-full bg-primary transition-[width] duration-500', 'data-[indeterminate]:w-full', className as string)}
      {...props}
    />
  )
}

export { Progress, ProgressLabel, ProgressValue, ProgressTrack, ProgressIndicator }
