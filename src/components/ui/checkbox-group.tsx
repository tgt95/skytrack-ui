import * as React from 'react'
import { CheckboxGroup as BaseCheckboxGroup } from '@base-ui/react/checkbox-group'
import { cn } from '@/lib/utils'

function CheckboxGroup({ className, ...props }: React.ComponentProps<typeof BaseCheckboxGroup>) {
  return (
    <BaseCheckboxGroup
      data-slot='checkbox-group'
      className={cn(
        'flex flex-col items-start gap-2 text-sm text-foreground',
        className as string
      )}
      {...props}
    />
  )
}

export { CheckboxGroup }
