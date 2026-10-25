import * as React from 'react'
import { Collapsible as BaseCollapsible } from '@base-ui/react/collapsible'
import { cn } from '@/lib/utils'

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
      className={className}
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
