import * as React from 'react'
import { Slider as BaseSlider } from '@base-ui/react/slider'
import { cn } from '@/lib/utils'

function Slider({ className, thumbAlignment = 'edge', ...props }: React.ComponentProps<typeof BaseSlider.Root>) {
  const widthClass = props.orientation === 'vertical' ? 'w-auto' : 'w-full'

  return (
    <BaseSlider.Root
      data-slot='slider'
      thumbAlignment={thumbAlignment}
      className={cn('flex flex-col gap-2 data-[disabled]:opacity-50', widthClass, className as string)}
      {...props}
    />
  )
}

function SliderLabel({ className, ...props }: React.ComponentProps<typeof BaseSlider.Label>) {
  return (
    <BaseSlider.Label
      data-slot='slider-label'
      className={cn('text-sm font-medium text-foreground', className as string)}
      {...props}
    />
  )
}

function SliderValue({ className, ...props }: React.ComponentProps<typeof BaseSlider.Value>) {
  return (
    <BaseSlider.Value
      data-slot='slider-value'
      className={cn('text-sm tabular-nums text-muted-foreground', className as string)}
      {...props}
    />
  )
}

function SliderControl({ className, ...props }: React.ComponentProps<typeof BaseSlider.Control>) {
  return (
    <BaseSlider.Control
      data-slot='slider-control'
      className={cn(
        'flex w-full cursor-pointer items-center touch-none select-none',
        'data-[orientation=vertical]:h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col',
        'data-[disabled]:pointer-events-none',
        className as string
      )}
      {...props}
    />
  )
}

function SliderTrack({ className, ...props }: React.ComponentProps<typeof BaseSlider.Track>) {
  return (
    <BaseSlider.Track
      data-slot='slider-track'
      className={cn(
        'h-1.5 w-full rounded-full bg-muted select-none',
        'data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5',
        className as string
      )}
      {...props}
    />
  )
}

function SliderIndicator({ className, ...props }: React.ComponentProps<typeof BaseSlider.Indicator>) {
  return (
    <BaseSlider.Indicator
      data-slot='slider-indicator'
      className={cn('select-none bg-primary', className as string)}
      {...props}
    />
  )
}

function SliderThumb({ className, ...props }: React.ComponentProps<typeof BaseSlider.Thumb>) {
  return (
    <BaseSlider.Thumb
      data-slot='slider-thumb'
      className={cn(
        'block size-4 cursor-pointer shrink-0 rounded-(--radius) border border-primary bg-background shadow-sm',
        'data-[dragging]:shadow-md',
        'data-[disabled]:border-muted-foreground',
        'outline-none focus-within:ring-[3px] focus-within:ring-ring/50 focus-within:border-ring',
        className as string
      )}
      {...props}
    />
  )
}

export { Slider, SliderLabel, SliderValue, SliderControl, SliderTrack, SliderIndicator, SliderThumb }
