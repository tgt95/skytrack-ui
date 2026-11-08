import * as React from 'react'
import { NumberField as BaseNumberField } from '@base-ui/react/number-field'
import { CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'
import { focusRing } from '@/lib/focus-ring'
import { CONTROL_SIZE_CLASSES, type ControlSize } from '@/lib/control-sizes'

function NumberField({ className, ...props }: React.ComponentProps<typeof BaseNumberField.Root>) {
  return (
    <BaseNumberField.Root
      data-slot='number-field'
      className={cn('flex flex-col items-start gap-1', className)}
      {...props}
    />
  )
}

type NumberFieldGroupProps = React.ComponentProps<typeof BaseNumberField.Group> & { size?: ControlSize }

function NumberFieldGroup({ className, size = 'default', ...props }: NumberFieldGroupProps) {
  return (
    <BaseNumberField.Group
      data-slot='number-field-group'
      data-size={size}
      className={cn('flex items-stretch', CONTROL_SIZE_CLASSES[size], className)}
      {...props}
    />
  )
}

type NumberFieldInputProps = Omit<React.ComponentProps<typeof BaseNumberField.Input>, 'size'> & {
  size?: ControlSize
}

function NumberFieldInput({ className, size = 'default', ...props }: NumberFieldInputProps) {
  return (
    <BaseNumberField.Input
      data-slot='number-field-input'
      data-size={size}
      className={cn(
        size === 'default'
          ? cn(CONTROL_SIZE_CLASSES.default, 'w-16 border border-input bg-background px-3 text-left tabular-nums')
          : cn(
              CONTROL_SIZE_CLASSES[size],
              'w-full min-w-0 border border-input bg-background px-1 text-right tabular-nums'
            ),
        'placeholder:text-muted-foreground',
        'data-disabled:cursor-not-allowed data-disabled:opacity-50 data-readonly:bg-muted',
        'data-invalid:border-destructive',
        focusRing,
        className
      )}
      {...props}
    />
  )
}

const stepperClasses = cn(
  'flex h-full w-9 cursor-pointer shrink-0 items-center justify-center border border-input bg-background text-foreground transition-colors select-none',
  'hover:bg-accent hover:text-accent-foreground',
  'active:bg-secondary',
  'data-disabled:pointer-events-none data-disabled:opacity-50 data-readonly:bg-muted',
  focusRing
)

function NumberFieldDecrement({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseNumberField.Decrement>) {
  return (
    <BaseNumberField.Decrement
      data-slot='number-field-decrement'
      className={cn(stepperClasses, 'border-e-0', className)}
      {...props}
    >
      {children ?? <CaretLeftIcon />}
    </BaseNumberField.Decrement>
  )
}

function NumberFieldIncrement({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseNumberField.Increment>) {
  return (
    <BaseNumberField.Increment
      data-slot='number-field-increment'
      className={cn(stepperClasses, 'border-s-0', className)}
      {...props}
    >
      {children ?? <CaretRightIcon />}
    </BaseNumberField.Increment>
  )
}

function NumberFieldScrubArea({ className, ...props }: React.ComponentProps<typeof BaseNumberField.ScrubArea>) {
  return (
    <BaseNumberField.ScrubArea
      data-slot='number-field-scrub-area'
      className={cn(
        'group cursor-ew-resize select-none',
        'data-disabled:pointer-events-none data-disabled:opacity-50',
        className
      )}
      {...props}
    />
  )
}

function NumberFieldScrubAreaCursor({
  className,
  ...props
}: React.ComponentProps<typeof BaseNumberField.ScrubAreaCursor>) {
  return (
    <BaseNumberField.ScrubAreaCursor
      data-slot='number-field-scrub-area-cursor'
      // Base UI portals this span to document.body (see NumberFieldScrubAreaCursor.js:61),
      // so it sits outside the scrub area's `group` scope. Gate visibility on its own
      // `data-scrubbing` attribute instead of a group selector.
      className={cn(
        'pointer-events-none flex items-center opacity-0 transition-opacity data-scrubbing:opacity-100',
        className
      )}
      {...props}
    />
  )
}

export {
  NumberField,
  NumberFieldGroup,
  NumberFieldInput,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldScrubArea,
  NumberFieldScrubAreaCursor
}
