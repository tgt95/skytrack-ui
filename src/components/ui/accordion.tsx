import * as React from 'react'
import { Accordion as BaseAccordion } from '@base-ui/react/accordion'
import { CaretDownIcon } from '@phosphor-icons/react'
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

function AccordionTrigger({ className, children, ...props }: React.ComponentProps<typeof BaseAccordion.Trigger>) {
  return (
    <BaseAccordion.Trigger
      data-slot='accordion-trigger'
      className={cn(
        'flex w-full flex-1 cursor-pointer items-center justify-between gap-4 rounded-(--radius) py-4 text-left text-sm font-medium text-foreground transition-colors select-none',
        'hover:underline',
        'disabled:pointer-events-none disabled:opacity-50 data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        '[&[data-panel-open]>svg]:rotate-180',
        "[&>svg]:pointer-events-none [&>svg]:shrink-0 [&>svg:not([class*='size-'])]:size-4",
        focusRing,
        className as string
      )}
      {...props}
    >
      {children}
      <CaretDownIcon
        aria-hidden='true'
        className='size-4 shrink-0 text-muted-foreground transition-transform duration-200'
      />
    </BaseAccordion.Trigger>
  )
}

function accordionContent(dataSlot: string, { className, ...props }: React.ComponentProps<typeof BaseAccordion.Panel>) {
  return (
    <BaseAccordion.Panel
      data-slot={dataSlot}
      className={cn(
        'h-[var(--accordion-panel-height)] overflow-hidden text-sm transition-[height] duration-200 ease-out',
        'data-[ending-style]:h-0 data-[starting-style]:h-0',
        className as string
      )}
      {...props}
    />
  )
}

function AccordionContent(props: React.ComponentProps<typeof BaseAccordion.Panel>) {
  return accordionContent('accordion-content', props)
}

function AccordionPanel(props: React.ComponentProps<typeof BaseAccordion.Panel>) {
  return accordionContent('accordion-panel', props)
}

export { Accordion, AccordionItem, AccordionHeader, AccordionTrigger, AccordionContent, AccordionPanel }
