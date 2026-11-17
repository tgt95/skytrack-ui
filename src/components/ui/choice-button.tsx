import * as React from 'react'
import { Radio } from '@base-ui/react/radio'
import { CheckIcon } from '@phosphor-icons/react'
import { RadioGroup } from '@/components/ui/radio'
import { cn } from '@/lib/utils'
import { focusRing } from '@/lib/focus-ring'
import { CONTROL_ICON_SIZE_CLASSES, CONTROL_SIZE_CLASSES, type ControlSize } from '@/lib/control-sizes'

export type ChoiceGroupProps = React.ComponentProps<typeof RadioGroup>

/**
 * Single-choice group for `ChoiceButton` options. Owns the one selected value
 * (`value` / `onValueChange`, or `defaultValue`) and the keyboard radio
 * navigation from `skytrack-ui/radio`. Give it an accessible name through
 * `aria-label` or a visible label referenced by `aria-labelledby`.
 */
function ChoiceGroup({ className, ...props }: ChoiceGroupProps) {
  return (
    <RadioGroup
      data-slot='choice-group'
      className={cn('flex flex-row flex-wrap items-start gap-2', className)}
      {...props}
    />
  )
}

export type ChoiceButtonProps = React.ComponentProps<typeof Radio.Root> & {
  /** Choice content, usually a short label. */
  children: React.ReactNode
  /** Shared control size. */
  size?: ControlSize
  /** Visual treatment for the checked choice. */
  selectedVariant?: 'default' | 'subtle'
  /** Show the decorative checkmark while checked. */
  showCheckmark?: boolean
}

/**
 * One chip-like choice inside a `ChoiceGroup`. Radio semantics stay owned by
 * Base UI Radio semantics with shared control sizes and configurable checked
 * appearance. Render one instance per option inside `ChoiceGroup` and pass its
 * `value`.
 */
function ChoiceButton({
  className,
  children,
  size = 'default',
  selectedVariant = 'default',
  showCheckmark = true,
  ...props
}: ChoiceButtonProps) {
  return (
    <Radio.Root
      data-slot='choice-button'
      data-size={size}
      className={cn(
        'flex cursor-pointer select-none items-center whitespace-nowrap rounded-(--radius) border border-input bg-background font-medium text-foreground transition-colors',
        CONTROL_SIZE_CLASSES[size],
        'hover:bg-accent hover:text-accent-foreground',
        selectedVariant === 'subtle'
          ? 'data-checked:border-primary data-checked:bg-secondary data-checked:text-foreground data-checked:hover:bg-secondary/80 data-checked:hover:text-foreground'
          : 'data-checked:border-primary data-checked:bg-primary data-checked:text-(--foreground-inverse) data-checked:hover:bg-primary/90 data-checked:hover:text-(--foreground-inverse)',
        'data-disabled:cursor-not-allowed data-disabled:opacity-50',
        focusRing,
        className
      )}
      {...props}
    >
      {showCheckmark ? (
        <Radio.Indicator className='flex items-center justify-center'>
          <CheckIcon className={CONTROL_ICON_SIZE_CLASSES[size]} weight='bold' />
        </Radio.Indicator>
      ) : null}
      {children}
    </Radio.Root>
  )
}

export { ChoiceGroup, ChoiceButton }
