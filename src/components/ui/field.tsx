import * as React from 'react'
import { Field } from '@base-ui/react/field'
import type {
  FieldControlState,
  FieldDescriptionState,
  FieldErrorState,
  FieldItemState,
  FieldLabelState,
  FieldRootState
} from '@base-ui/react/field'
import { cn } from '@/lib/utils'
import { focusRing } from '@/lib/focus-ring'
import { CONTROL_SIZE_CLASSES, type ControlSize } from '@/lib/control-sizes'

function mergeFieldClassName<State>(
  baseClassNames: string[],
  className: string | ((state: State) => string | undefined) | undefined
) {
  return (state: State) => cn(...baseClassNames, typeof className === 'function' ? className(state) : className)
}

function FieldRoot({ className, ...props }: React.ComponentProps<typeof Field.Root>) {
  return (
    <Field.Root
      data-slot='field'
      className={mergeFieldClassName<FieldRootState>(
        ['group/field flex w-full flex-col items-start gap-1', 'data-disabled:opacity-50'],
        className
      )}
      {...props}
    />
  )
}

function FieldLabel({ className, ...props }: React.ComponentProps<typeof Field.Label>) {
  return (
    <Field.Label
      data-slot='field-label'
      className={mergeFieldClassName<FieldLabelState>(
        [
          'text-sm font-medium text-foreground',
          'group-data-disabled/field:cursor-not-allowed group-data-disabled/field:opacity-50'
        ],
        className
      )}
      {...props}
    />
  )
}

type FieldControlProps = Omit<React.ComponentProps<typeof Field.Control>, 'size'> & { size?: ControlSize }

function FieldControl({ className, size = 'default', ...props }: FieldControlProps) {
  return (
    <Field.Control
      data-slot='field-control'
      data-size={size}
      className={mergeFieldClassName<FieldControlState>(
        [
          'flex w-full min-w-0 self-stretch rounded-(--radius) border border-input bg-background py-1 text-foreground shadow-xs transition-colors',
          CONTROL_SIZE_CLASSES[size],
          'placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground',
          'data-filled:border-foreground/40',
          'data-disabled:cursor-not-allowed data-disabled:opacity-50',
          'data-invalid:border-destructive data-invalid:ring-destructive/20',
          focusRing
        ],
        className
      )}
      {...props}
    />
  )
}

function FieldDescription({ className, ...props }: React.ComponentProps<typeof Field.Description>) {
  return (
    <Field.Description
      data-slot='field-description'
      className={mergeFieldClassName<FieldDescriptionState>(
        ['text-sm leading-normal text-muted-foreground'],
        className
      )}
      {...props}
    />
  )
}

function FieldError({ className, ...props }: React.ComponentProps<typeof Field.Error>) {
  return (
    <Field.Error
      data-slot='field-error'
      className={mergeFieldClassName<FieldErrorState>(
        ['text-sm leading-normal font-medium text-destructive'],
        className
      )}
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
      className={mergeFieldClassName<FieldItemState>(
        ['flex items-center gap-2 self-stretch data-disabled:opacity-50'],
        className
      )}
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
