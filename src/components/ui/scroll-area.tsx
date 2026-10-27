import * as React from 'react'
import { ScrollArea as BaseScrollArea } from '@base-ui/react/scroll-area'
import { cn } from '@/lib/utils'
import { focusRing } from '@/components/ui/button'

function ScrollArea({ className, ...props }: React.ComponentProps<typeof BaseScrollArea.Root>) {
  return (
    <BaseScrollArea.Root
      data-slot='scroll-area'
      className={cn('relative overflow-hidden', className as string)}
      {...props}
    />
  )
}

function ScrollAreaViewport({ className, ...props }: React.ComponentProps<typeof BaseScrollArea.Viewport>) {
  return (
    <BaseScrollArea.Viewport
      data-slot='scroll-area-viewport'
      className={cn('size-full overflow-hidden outline-none', focusRing, className as string)}
      {...props}
    />
  )
}

function ScrollAreaContent({ className, ...props }: React.ComponentProps<typeof BaseScrollArea.Content>) {
  return (
    <BaseScrollArea.Content
      data-slot='scroll-area-content'
      className={cn('flex flex-col gap-4 p-4 text-sm leading-relaxed', className as string)}
      {...props}
    />
  )
}

function ScrollAreaScrollbar({ className, ...props }: React.ComponentProps<typeof BaseScrollArea.Scrollbar>) {
  return (
    <BaseScrollArea.Scrollbar
      data-slot='scroll-area-scrollbar'
      className={cn(
        'm-1 flex justify-center rounded-(--radius) bg-border/60 opacity-0 transition-opacity duration-150 select-none',
        'pointer-events-none data-[hovering]:pointer-events-auto data-[hovering]:opacity-100',
        'data-[scrolling]:pointer-events-auto data-[scrolling]:opacity-100 data-[scrolling]:duration-0',
        'data-[orientation=vertical]:w-2 data-[orientation=horizontal]:h-2',
        className as string
      )}
      {...props}
    />
  )
}

function ScrollAreaThumb({ className, ...props }: React.ComponentProps<typeof BaseScrollArea.Thumb>) {
  return (
    <BaseScrollArea.Thumb
      data-slot='scroll-area-thumb'
      className={cn(
        'cursor-pointer rounded-(--radius) bg-border',
        'data-[orientation=vertical]:w-full data-[orientation=horizontal]:h-full',
        className as string
      )}
      {...props}
    />
  )
}

function ScrollAreaCorner({ className, ...props }: React.ComponentProps<typeof BaseScrollArea.Corner>) {
  return (
    <BaseScrollArea.Corner
      data-slot='scroll-area-corner'
      className={cn('rounded-(--radius) bg-background', className as string)}
      {...props}
    />
  )
}

export { ScrollArea, ScrollAreaViewport, ScrollAreaContent, ScrollAreaScrollbar, ScrollAreaThumb, ScrollAreaCorner }
