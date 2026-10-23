import * as React from 'react'
import { Radio } from '@base-ui/react/radio'
import { RadioGroup as BaseRadioGroup } from '@base-ui/react/radio-group'
import { cn } from '@/lib/utils'
import { focusRing } from '@/components/ui/button'

function RadioRoot({ className, children, ...props }: React.ComponentProps<typeof Radio.Root>) {
  return (
    <Radio.Root
      data-slot='radio'
      className={cn(
        'flex size-4 cursor-pointer shrink-0 items-center justify-center rounded-full border border-input bg-background p-0 text-primary-foreground transition-colors',
        'data-[checked]:border-primary data-[checked]:bg-primary',
        'data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50',
        'data-[readonly]:cursor-default',
        'data-[invalid]:border-destructive data-[invalid]:ring-destructive/20',
        focusRing,
        className as string
      )}
      {...props}
    >
      {children ?? <RadioIndicator className='before:size-2 before:rounded-full before:bg-current' />}
    </Radio.Root>
  )
}

function RadioIndicator({ className, ...props }: React.ComponentProps<typeof Radio.Indicator>) {
  return (
    <Radio.Indicator
      data-slot='radio-indicator'
      className={cn(
        'flex items-center justify-center text-current',
        'transition-all data-[starting-style]:scale-50 data-[starting-style]:opacity-0 data-[ending-style]:scale-50 data-[ending-style]:opacity-0',
        className as string
      )}
      {...props}
    />
  )
}

function RadioGroup({ className, ...props }: React.ComponentProps<typeof BaseRadioGroup>) {
  return (
    <BaseRadioGroup
      data-slot='radio-group'
      className={cn(
        'flex flex-col items-start gap-2 text-sm text-foreground',
        className as string
      )}
      {...props}
    />
  )
}

export { RadioRoot, RadioIndicator, RadioGroup }
