import * as React from 'react'
import type { VariantProps } from 'class-variance-authority'
import { Button, buttonVariants } from '@/components/ui/button'
import { CheckboxRoot } from '@/components/ui/checkbox'
import { XIcon } from '@phosphor-icons/react'
import type { ControlSize } from '@/lib/control-sizes'
import { SplitButton } from '@/components/ui/split-button'
import {
  Popover,
  PopoverPortal,
  PopoverPositioner,
  PopoverPopup,
  PopoverTitle,
  PopoverTrigger,
  type PopoverTriggerProps
} from '@/components/ui/popover'

/** One selectable option in the filter popup. */
export type FilterButtonOption = {
  value: string
  /** Complete option content; may be text or rich content such as a colored Badge. */
  label: React.ReactNode
  disabled?: boolean
}

export type FilterButtonProps = Omit<PopoverTriggerProps, 'children' | 'render'> &
  Omit<VariantProps<typeof buttonVariants>, 'size' | 'variant'> & {
    /**
     * Complete trigger content exactly as supplied by the caller: label, count
     * badge, icon. The component never generates or appends trigger content, so
     * the visible control value stays caller-owned.
     */
    children: React.ReactNode
    /** Heading inside the popup. Also names the popup for assistive technology. */
    title: string
    /** Button variant shared by the trigger and clear segment. */
    variant?: NonNullable<VariantProps<typeof buttonVariants>['variant']>
    /** Accessible name for the conditional clear button. Defaults to `Clear ${title}`. */
    clearLabel?: string
    /** Button control size. */
    size?: ControlSize
    /** Controlled selected option values. */
    value: string[]
    onValueChange: (value: string[]) => void
    options: FilterButtonOption[]
  }

/**
 * Opens a multi-select filter popup from a styled Button trigger.
 * The trigger renders the caller's `children` through the Popover trigger
 * render slot, so popup state stays owned by `skytrack-ui/popover` and no
 * button is nested inside another. When values are selected, a SplitButton-style
 * X segment clears this filter's values.
 */
function FilterButton({
  title,
  clearLabel,
  value,
  onValueChange,
  options,
  variant = 'outline',
  size = 'default',
  children,
  className,
  disabled,
  ...props
}: FilterButtonProps) {
  const toggleOption = (optionValue: string, checked: boolean) => {
    onValueChange(checked ? [...value, optionValue] : value.filter((current) => current !== optionValue))
  }

  const trigger = (
    <PopoverTrigger
      render={<Button type='button' variant={variant} size={size} data-split-button-part='action' />}
      className={className}
      disabled={disabled}
      {...props}
    >
      {children}
    </PopoverTrigger>
  )

  const clearSize: Record<ControlSize, 'icon-xs' | 'icon-sm' | 'icon' | 'icon-lg'> = {
    xs: 'icon-xs',
    sm: 'icon-sm',
    default: 'icon',
    lg: 'icon-lg'
  }

  return (
    <Popover>
      {value.length > 0 ? (
        <SplitButton variant={variant} size={size} disabled={disabled} role='group' aria-label={title}>
          {trigger}
          <Button
            type='button'
            variant={variant}
            size={clearSize[size]}
            disabled={disabled}
            data-split-button-part='trigger'
            aria-label={clearLabel ?? `Clear ${title}`}
            title={clearLabel ?? `Clear ${title}`}
            onClick={() => onValueChange([])}
          >
            <XIcon aria-hidden='true' />
          </Button>
        </SplitButton>
      ) : (
        trigger
      )}
      <PopoverPortal>
        <PopoverPositioner side='bottom' align='start' sideOffset={4}>
          <PopoverPopup className='min-w-64 p-2'>
            <div className='text-xs sub-heading px-2 pt-1 pb-1'>{title}</div>
            <div className='flex flex-col gap-0.5'>
              {options.map((option) => {
                const checked = value.includes(option.value)

                return (
                  <label
                    key={option.value}
                    className='flex cursor-pointer select-none items-center gap-2 rounded-(--radius) px-2 py-1.5 hover:bg-accent'
                  >
                    <CheckboxRoot
                      checked={checked}
                      disabled={option.disabled}
                      onCheckedChange={(nextChecked) => toggleOption(option.value, nextChecked === true)}
                    />
                    <span className='min-w-0 text-sm'>{option.label}</span>
                  </label>
                )
              })}
            </div>
          </PopoverPopup>
        </PopoverPositioner>
      </PopoverPortal>
    </Popover>
  )
}

export { FilterButton }
