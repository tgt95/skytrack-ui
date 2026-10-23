import * as React from 'react'
import { Form as BaseForm } from '@base-ui/react/form'
import { cn } from '@/lib/utils'

function Form({ className, ...props }: React.ComponentProps<typeof BaseForm>) {
  return <BaseForm data-slot='form' className={cn('flex w-full flex-col gap-4', className as string)} {...props} />
}

export { Form }
