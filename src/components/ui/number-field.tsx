import * as React from 'react'
import { NumberField as BaseNumberField } from '@base-ui/react/number-field'
import { CaretLeft, CaretRight } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'
import { focusRing } from '@/components/ui/button'

function NumberField({ className, ...props }: React.ComponentProps<typeof BaseNumberField.Root>) {
  return (
    <BaseNumberField.Root
      data-slot='number-field'
      className={cn('flex flex-col items-start gap-1', className as string)}
      {...props}
    />
  )
}

function NumberFieldGroup({ className, ...props }: React.ComponentProps<typeof BaseNumberField.Group>) {
  return (
    <BaseNumberField.Group
      data-slot='number-field-group'
      className={cn('flex h-9 items-stretch', className as string)}
      {...props}
    />
  )
}

type NumberFieldInputProps = Omit<React.ComponentProps<typeof BaseNumberField.Input>, 'size'> & {
  size?: 'default' | 'compact' | 'xs'
}

function NumberFieldInput({ className, size = 'default', ...props }: NumberFieldInputProps) {
  return (
    <BaseNumberField.Input
      data-slot='number-field-input'
      className={cn(
        size === 'compact'
          ? 'h-[26px] w-full min-w-0 border border-border bg-background px-1 text-right text-xs tabular-nums transition-colors'
          : size === 'xs'
            ? 'h-6 w-full min-w-0 border border-border bg-background px-1 text-right text-xs tabular-nums transition-colors'
            : 'h-full w-16 border border-input bg-background px-3 text-left text-sm tabular-nums transition-colors',
        'placeholder:text-muted-foreground',
        'data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[readonly]:bg-muted',
        'data-[invalid]:border-destructive',
        focusRing,
        className as string
      )}
      {...props}
    />
  )
}

const stepperClasses = cn(
  'flex h-full w-9 cursor-pointer shrink-0 items-center justify-center border border-input bg-background text-foreground transition-colors select-none',
  'hover:bg-accent hover:text-accent-foreground',
  'active:bg-secondary',
  'data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[readonly]:bg-muted',
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
      className={cn(stepperClasses, 'border-e-0', className as string)}
      {...props}
    >
      {children ?? <CaretLeft />}
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
      className={cn(stepperClasses, 'border-s-0', className as string)}
      {...props}
    >
      {children ?? <CaretRight />}
    </BaseNumberField.Increment>
  )
}

function NumberFieldScrubArea({ className, ...props }: React.ComponentProps<typeof BaseNumberField.ScrubArea>) {
  return (
    <BaseNumberField.ScrubArea
      data-slot='number-field-scrub-area'
      className={cn(
        'group cursor-ew-resize select-none',
        'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        className as string
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
        'pointer-events-none flex items-center opacity-0 transition-opacity data-[scrubbing]:opacity-100',
        className as string
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
