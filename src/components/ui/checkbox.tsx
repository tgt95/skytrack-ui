import * as React from 'react'
import { Checkbox } from '@base-ui/react/checkbox'
import { Check, Minus } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'
import { focusRing } from '@/components/ui/button'

function CheckboxRoot({ className, children, ...props }: React.ComponentProps<typeof Checkbox.Root>) {
  return (
    <Checkbox.Root
      data-slot='checkbox'
      className={cn(
        'flex size-4 cursor-pointer shrink-0 items-center justify-center rounded-md border border-input bg-background p-0 text-primary-foreground transition-colors',
        'data-[checked]:border-primary data-[checked]:bg-primary',
        'data-[indeterminate]:border-primary data-[indeterminate]:bg-primary',
        'data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50',
        'data-[invalid]:border-destructive data-[invalid]:ring-destructive/20',
        focusRing,
        className as string
      )}
      {...props}
    >
      {children ?? (
        <CheckboxIndicator>
          <Check className='hidden size-3 group-data-[checked]/indicator:block' weight='bold' />
          <Minus className='hidden size-3 group-data-[indeterminate]/indicator:block' weight='bold' />
        </CheckboxIndicator>
      )}
    </Checkbox.Root>
  )
}

function CheckboxIndicator({ className, children, ...props }: React.ComponentProps<typeof Checkbox.Indicator>) {
  return (
    <Checkbox.Indicator
      data-slot='checkbox-indicator'
      className={cn(
        'group/indicator flex items-center justify-center text-current',
        'transition-all data-[starting-style]:scale-75 data-[starting-style]:opacity-0 data-[ending-style]:scale-75 data-[ending-style]:opacity-0',
        className as string
      )}
      {...props}
    >
      {children}
    </Checkbox.Indicator>
  )
}

export { CheckboxRoot, CheckboxIndicator }
