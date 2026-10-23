import * as React from 'react'
import { Collapsible as BaseCollapsible } from '@base-ui/react/collapsible'
import { cn } from '@/lib/utils'
import { focusRing } from '@/components/ui/button'

function Collapsible({ className, ...props }: React.ComponentProps<typeof BaseCollapsible.Root>) {
  return (
    <BaseCollapsible.Root
      data-slot='collapsible'
      className={cn('flex w-64 flex-col', className as string)}
      {...props}
    />
  )
}

function CollapsibleTrigger({ className, ...props }: React.ComponentProps<typeof BaseCollapsible.Trigger>) {
  return (
    <BaseCollapsible.Trigger
      data-slot='collapsible-trigger'
      className={cn(
        'group flex h-8 cursor-pointer items-center justify-between gap-2 border border-border bg-background pl-3 pr-2 text-sm font-normal whitespace-nowrap text-foreground select-none',
        'hover:bg-accent hover:text-accent-foreground active:bg-muted',
        'disabled:pointer-events-none disabled:opacity-50 data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        focusRing,
        className as string
      )}
      {...props}
    />
  )
}

function CollapsiblePanel({ className, ...props }: React.ComponentProps<typeof BaseCollapsible.Panel>) {
  return (
    <BaseCollapsible.Panel
      data-slot='collapsible-panel'
      className={cn(
        'flex h-[var(--collapsible-panel-height)] flex-col justify-end overflow-hidden text-sm transition-[height] duration-150 ease-out',
        "[&[hidden]:not([hidden='until-found'])]:hidden data-[ending-style]:h-0 data-[starting-style]:h-0",
        className as string
      )}
      {...props}
    />
  )
}

export { Collapsible, CollapsibleTrigger, CollapsiblePanel }
