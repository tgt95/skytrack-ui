import * as React from 'react'
import { NumberField as BaseNumberField } from '@base-ui/react/number-field'
import { CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'
import { focusRing } from '@/lib/focus-ring'
import {
  CONTROL_HEIGHT_CLASSES,
  CONTROL_FONT_SIZE_CLASSES,
  CONTROL_PADDING_X_CLASSES,
  CONTROL_CHILD_SVG_CLASSES,
  type ControlSize
} from '@/lib/control-sizes'

type NumberFieldContextValue = {
  size: ControlSize
}

const NumberFieldContext = React.createContext<NumberFieldContextValue>({ size: 'default' })

type NumberFieldProps = Omit<React.ComponentProps<typeof BaseNumberField.Root>, 'size'> & {
  size?: ControlSize
}

function NumberField({ className, size, ...props }: NumberFieldProps) {
  const contextValue = React.useMemo(() => (size ? { size } : undefined), [size])
  const root = (
    <BaseNumberField.Root
      data-slot='number-field'
      className={cn('flex flex-col items-start gap-1', className)}
      {...props}
    />
  )

  if (contextValue) {
    return <NumberFieldContext.Provider value={contextValue}>{root}</NumberFieldContext.Provider>
  }
  return root
}

type NumberFieldGroupProps = Omit<React.ComponentProps<typeof BaseNumberField.Group>, 'size'> & {
  size?: ControlSize
}

function NumberFieldGroup({ className, size, ...props }: NumberFieldGroupProps) {
  const rootContext = React.useContext(NumberFieldContext)
  const resolvedSize = size ?? rootContext.size ?? 'default'
  const groupContextValue = React.useMemo(() => ({ size: resolvedSize }), [resolvedSize])

  return (
    <NumberFieldContext.Provider value={groupContextValue}>
      <BaseNumberField.Group
        data-slot='number-field-group'
        data-size={resolvedSize}
        className={cn(
          'inline-flex items-stretch rounded-(--radius)',
          CONTROL_HEIGHT_CLASSES[resolvedSize],
          CONTROL_CHILD_SVG_CLASSES[resolvedSize],
          className
        )}
        {...props}
      />
    </NumberFieldContext.Provider>
  )
}

type NumberFieldInputProps = Omit<React.ComponentProps<typeof BaseNumberField.Input>, 'size'> & {
  size?: ControlSize
}

function NumberFieldInput({ className, size, ...props }: NumberFieldInputProps) {
  const context = React.useContext(NumberFieldContext)
  const resolvedSize = size ?? context.size ?? 'default'

  return (
    <BaseNumberField.Input
      data-slot='number-field-input'
      data-size={resolvedSize}
      className={cn(
        'w-16 border border-input bg-background text-center tabular-nums transition-colors',
        CONTROL_HEIGHT_CLASSES[resolvedSize],
        CONTROL_FONT_SIZE_CLASSES[resolvedSize],
        CONTROL_PADDING_X_CLASSES[resolvedSize],
        'rounded-(--radius)',
        'in-data-[slot=number-field-group]:h-full',
        'in-data-[slot=number-field-group]:rounded-none',
        'in-data-[slot=number-field-group]:first:rounded-s-(--radius)',
        'in-data-[slot=number-field-group]:last:rounded-e-(--radius)',
        'focus-visible:z-10',
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
  'flex h-full aspect-square cursor-pointer shrink-0 items-center justify-center border border-input bg-background text-foreground transition-colors select-none',
  'hover:bg-accent hover:text-accent-foreground',
  'active:bg-secondary',
  'data-disabled:pointer-events-none data-disabled:opacity-50 data-readonly:bg-muted',
  focusRing
)

type NumberFieldStepperProps = Omit<React.ComponentProps<typeof BaseNumberField.Decrement>, 'size'> & {
  size?: ControlSize
}

function NumberFieldDecrement({ className, children, size, ...props }: NumberFieldStepperProps) {
  const context = React.useContext(NumberFieldContext)
  const resolvedSize = size ?? context.size ?? 'default'

  return (
    <BaseNumberField.Decrement
      data-slot='number-field-decrement'
      data-size={resolvedSize}
      className={cn(
        stepperClasses,
        CONTROL_CHILD_SVG_CLASSES[resolvedSize],
        'border-e-0 first:rounded-s-(--radius) focus-visible:z-10 focus-visible:border-e',
        className
      )}
      {...props}
    >
      {children ?? <CaretLeftIcon />}
    </BaseNumberField.Decrement>
  )
}

type NumberFieldIncrementProps = Omit<React.ComponentProps<typeof BaseNumberField.Increment>, 'size'> & {
  size?: ControlSize
}

function NumberFieldIncrement({ className, children, size, ...props }: NumberFieldIncrementProps) {
  const context = React.useContext(NumberFieldContext)
  const resolvedSize = size ?? context.size ?? 'default'

  return (
    <BaseNumberField.Increment
      data-slot='number-field-increment'
      data-size={resolvedSize}
      className={cn(
        stepperClasses,
        CONTROL_CHILD_SVG_CLASSES[resolvedSize],
        'border-s-0 last:rounded-e-(--radius) focus-visible:z-10 focus-visible:border-s',
        className
      )}
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
