import * as React from 'react'
import { Fieldset } from '@base-ui/react/fieldset'
import { cn } from '@/lib/utils'

function FieldsetRoot({ className, ...props }: React.ComponentProps<typeof Fieldset.Root>) {
  return (
    <Fieldset.Root
      data-slot='fieldset'
      className={cn('flex w-full flex-col gap-4', 'data-[disabled]:opacity-50', className as string)}
      {...props}
    />
  )
}

function FieldsetLegend({ className, ...props }: React.ComponentProps<typeof Fieldset.Legend>) {
  return (
    <Fieldset.Legend
      data-slot='fieldset-legend'
      className={cn('text-base leading-none font-semibold text-foreground', className as string)}
      {...props}
    />
  )
}

export { FieldsetRoot, FieldsetLegend }
