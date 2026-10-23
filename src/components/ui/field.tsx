import * as React from 'react'
import { Field } from '@base-ui/react/field'
import { cn } from '@/lib/utils'
import { focusRing } from '@/components/ui/button'

function FieldRoot({ className, ...props }: React.ComponentProps<typeof Field.Root>) {
  return (
    <Field.Root
      data-slot='field'
      className={cn(
        'group/field flex w-full flex-col items-start gap-2',
        'data-[disabled]:opacity-50',
        className as string
      )}
      {...props}
    />
  )
}

function FieldLabel({ className, ...props }: React.ComponentProps<typeof Field.Label>) {
  return (
    <Field.Label
      data-slot='field-label'
      className={cn(
        'text-sm leading-none font-medium text-foreground select-none',
        'group-data-[disabled]/field:cursor-not-allowed group-data-[disabled]/field:opacity-50',
        className as string
      )}
      {...props}
    />
  )
}

function FieldControl({ className, ...props }: React.ComponentProps<typeof Field.Control>) {
  return (
    <Field.Control
      data-slot='field-control'
      className={cn(
        'flex h-9 w-full min-w-0 self-stretch rounded-md border border-input bg-background px-3 py-1 text-sm text-foreground shadow-xs transition-colors',
        'placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground',
        'data-[filled]:border-foreground/40',
        'data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50',
        'data-[invalid]:border-destructive data-[invalid]:ring-destructive/20',
        focusRing,
        className as string
      )}
      {...props}
    />
  )
}

function FieldDescription({ className, ...props }: React.ComponentProps<typeof Field.Description>) {
  return (
    <Field.Description
      data-slot='field-description'
      className={cn('text-sm leading-normal text-muted-foreground', className as string)}
      {...props}
    />
  )
}

function FieldError({ className, ...props }: React.ComponentProps<typeof Field.Error>) {
  return (
    <Field.Error
      data-slot='field-error'
      className={cn('text-sm leading-normal font-medium text-destructive', className as string)}
      {...props}
    />
  )
}

type FieldValidityProps = Omit<React.ComponentProps<typeof Field.Validity>, 'className'> & {
  className?: string
}

function FieldValidity({ className, children, ...props }: FieldValidityProps) {
  return (
    <Field.Validity {...props}>
      {(state) => (
        <span data-slot='field-validity' className={cn('text-sm leading-normal text-muted-foreground', className)}>
          {children(state)}
        </span>
      )}
    </Field.Validity>
  )
}

function FieldItem({ className, ...props }: React.ComponentProps<typeof Field.Item>) {
  return (
    <Field.Item
      data-slot='field-item'
      className={cn('flex items-center gap-2 self-stretch', 'data-[disabled]:opacity-50', className as string)}
      {...props}
    />
  )
}

/** Convenience layout part: tight vertical stack for related fields. */
function FieldGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot='field-group' className={cn('flex flex-col gap-4', className)} {...props} />
}

/** Convenience layout part: horizontal row for a control and its message. */
function FieldRow({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot='field-row' className={cn('flex items-center gap-3', className)} {...props} />
}

export {
  Field,
  FieldRoot,
  FieldLabel,
  FieldControl,
  FieldDescription,
  FieldError,
  FieldValidity,
  FieldItem,
  FieldGroup,
  FieldRow
}
