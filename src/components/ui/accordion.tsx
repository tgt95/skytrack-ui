import * as React from 'react'
import { Accordion as BaseAccordion } from '@base-ui/react/accordion'
import { CaretDown } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'
import { focusRing } from '@/components/ui/button'

function Accordion({ className, ...props }: React.ComponentProps<typeof BaseAccordion.Root>) {
  return (
    <BaseAccordion.Root data-slot='accordion' className={cn('flex w-full flex-col', className as string)} {...props} />
  )
}

function AccordionItem({ className, ...props }: React.ComponentProps<typeof BaseAccordion.Item>) {
  return (
    <BaseAccordion.Item
      data-slot='accordion-item'
      className={cn('border-b border-border last:border-b-0', className as string)}
      {...props}
    />
  )
}

function AccordionHeader({ className, ...props }: React.ComponentProps<typeof BaseAccordion.Header>) {
  return <BaseAccordion.Header data-slot='accordion-header' className={cn('flex', className as string)} {...props} />
}

type AccordionTriggerProps = React.ComponentProps<typeof BaseAccordion.Trigger> & {
  variant?: 'default' | 'compact'
}

function AccordionTrigger({ className, children, variant = 'default', ...props }: AccordionTriggerProps) {
  return (
    <BaseAccordion.Trigger
      data-slot='accordion-trigger'
      className={cn(
        'flex cursor-pointer flex-1 items-center justify-between transition-colors select-none',
        variant === 'compact'
          ? 'min-h-[34px] gap-2 rounded-none py-1 text-left text-[11px] font-semibold text-muted-foreground hover:no-underline [&>svg]:size-3'
          : 'gap-4 rounded-md py-4 text-left text-sm font-medium hover:underline',
        'disabled:pointer-events-none disabled:opacity-50 data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        '[&[data-panel-open]>svg]:rotate-180',
        "[&>svg]:pointer-events-none [&>svg]:shrink-0 [&>svg:not([class*='size-'])]:size-4",
        focusRing,
        className as string
      )}
      {...props}
    >
      {children}
      <CaretDown className='text-muted-foreground transition-transform duration-200' />
    </BaseAccordion.Trigger>
  )
}

function AccordionPanel({ className, ...props }: React.ComponentProps<typeof BaseAccordion.Panel>) {
  return (
    <BaseAccordion.Panel
      data-slot='accordion-panel'
      className={cn(
        'h-[var(--accordion-panel-height)] overflow-hidden text-sm transition-[height] duration-200 ease-out',
        'data-[ending-style]:h-0 data-[starting-style]:h-0',
        className as string
      )}
      {...props}
    />
  )
}

export { Accordion, AccordionItem, AccordionHeader, AccordionTrigger, AccordionPanel }
