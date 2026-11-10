import * as React from 'react'
import { Select as BaseSelect } from '@base-ui/react/select'
import { CaretDownIcon, CaretUpIcon, CheckIcon } from '@phosphor-icons/react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { focusRing } from '@/lib/focus-ring'
import { CONTROL_SIZE_CLASSES } from '@/lib/control-sizes'

/** Props of the `Select` root, generic over the value type and `multiple` mode. */
export type SelectRootProps<Value, Multiple extends boolean | undefined = false> = BaseSelect.Root.Props<
  Value,
  Multiple
>

function Select<Value, Multiple extends boolean | undefined = false>(props: SelectRootProps<Value, Multiple>) {
  return <BaseSelect.Root {...props} />
}

function SelectLabel({ className, ...props }: React.ComponentProps<typeof BaseSelect.Label>) {
  return (
    <BaseSelect.Label
      data-slot='select-label'
      className={cn('cursor-default text-sm font-medium leading-none text-foreground', className)}
      {...props}
    />
  )
}

export const selectTriggerVariants = cva(
  cn(
    'flex w-full cursor-pointer items-center justify-between rounded-(--radius) border border-input bg-background text-foreground shadow-xs transition-colors',
    'data-placeholder:text-muted-foreground',
    'hover:not-data-disabled:bg-accent hover:not-data-disabled:text-accent-foreground',
    'active:not-data-disabled:bg-accent',
    'data-pressed:bg-accent data-pressed:text-accent-foreground',
    'data-disabled:cursor-not-allowed data-disabled:opacity-50 disabled:pointer-events-none disabled:opacity-50',
    'data-invalid:border-destructive data-invalid:ring-destructive/20',
    focusRing
  ),
  {
    variants: {
      size: {
        ...CONTROL_SIZE_CLASSES
      }
    },
    defaultVariants: { size: 'default' }
  }
)

type SelectTriggerProps = React.ComponentProps<typeof BaseSelect.Trigger> & VariantProps<typeof selectTriggerVariants>

function SelectTrigger({ className, size, ...props }: SelectTriggerProps) {
  return (
    <BaseSelect.Trigger
      data-slot='select-trigger'
      data-size={size ?? 'default'}
      className={cn(selectTriggerVariants({ size }), className)}
      {...props}
    />
  )
}

function SelectValue({ className, ...props }: React.ComponentProps<typeof BaseSelect.Value>) {
  return (
    <BaseSelect.Value
      data-slot='select-value'
      className={cn('truncate text-left data-placeholder:text-muted-foreground', className)}
      {...props}
    />
  )
}

function SelectIcon({ className, children, ...props }: React.ComponentProps<typeof BaseSelect.Icon>) {
  return (
    <BaseSelect.Icon
      data-slot='select-icon'
      className={cn('flex shrink-0 items-center justify-center text-muted-foreground', className)}
      {...props}
    >
      {children ?? <CaretDownIcon />}
    </BaseSelect.Icon>
  )
}

function SelectPortal({ className, ...props }: React.ComponentProps<typeof BaseSelect.Portal>) {
  return <BaseSelect.Portal data-slot='select-portal' className={cn(className)} {...props} />
}

function SelectBackdrop({ className, ...props }: React.ComponentProps<typeof BaseSelect.Backdrop>) {
  return (
    <BaseSelect.Backdrop
      data-slot='select-backdrop'
      className={cn(
        'fixed inset-0 z-50 bg-black/20 transition-opacity data-starting-style:opacity-0 data-ending-style:opacity-0',
        className
      )}
      {...props}
    />
  )
}

function SelectPositioner({
  className,
  side = 'bottom',
  align = 'start',
  sideOffset = 4,
  alignItemWithTrigger = false,
  ...props
}: React.ComponentProps<typeof BaseSelect.Positioner>) {
  return (
    <BaseSelect.Positioner
      data-slot='select-positioner'
      side={side}
      align={align}
      sideOffset={sideOffset}
      alignItemWithTrigger={alignItemWithTrigger}
      className={cn('z-50 outline-hidden', className)}
      {...props}
    />
  )
}

function SelectPopup({ className, ...props }: React.ComponentProps<typeof BaseSelect.Popup>) {
  return (
    <BaseSelect.Popup
      data-slot='select-popup'
      className={cn(
        'max-h-[var(--available-height)] min-w-[var(--anchor-width)] origin-[var(--transform-origin)] overflow-x-hidden overflow-y-auto rounded-(--radius) border border-border bg-popover text-popover-foreground shadow-md',
        'transition-[transform,scale,opacity] duration-150 ease-out',
        'data-starting-style:scale-95 data-starting-style:opacity-0',
        'data-ending-style:scale-95 data-ending-style:opacity-0',
        className
      )}
      {...props}
    />
  )
}

function SelectList({ className, ...props }: React.ComponentProps<typeof BaseSelect.List>) {
  return (
    <BaseSelect.List
      data-slot='select-list'
      className={cn(
        'max-h-[var(--available-height)] scroll-py-1 overflow-y-auto overscroll-contain py-1 outline-hidden',
        className
      )}
      {...props}
    />
  )
}

function SelectItem({ className, children, ...props }: React.ComponentProps<typeof BaseSelect.Item>) {
  return (
    <BaseSelect.Item
      data-slot='select-item'
      className={cn(
        'relative grid cursor-pointer grid-cols-[1rem_1fr] items-center gap-2 rounded-(--radius) px-2 py-1.5 text-sm select-none',
        'data-highlighted:bg-accent data-highlighted:text-accent-foreground',
        'data-disabled:pointer-events-none data-disabled:opacity-50',
        focusRing,
        className
      )}
      {...props}
    >
      {children ?? (
        <>
          <SelectItemIndicator />
          <SelectItemText />
        </>
      )}
    </BaseSelect.Item>
  )
}

function SelectItemText({ className, ...props }: React.ComponentProps<typeof BaseSelect.ItemText>) {
  return (
    <BaseSelect.ItemText data-slot='select-item-text' className={cn('col-start-2 truncate', className)} {...props} />
  )
}

function SelectItemIndicator({ className, children, ...props }: React.ComponentProps<typeof BaseSelect.ItemIndicator>) {
  return (
    <BaseSelect.ItemIndicator
      data-slot='select-item-indicator'
      className={cn(
        'col-start-1 flex items-center justify-center',
        'transition-transform data-starting-style:scale-50 data-ending-style:scale-50',
        className
      )}
      {...props}
    >
      {children ?? <CheckIcon className='size-4' />}
    </BaseSelect.ItemIndicator>
  )
}

function SelectArrow({ className, children, ...props }: React.ComponentProps<typeof BaseSelect.Arrow>) {
  return (
    <BaseSelect.Arrow
      data-slot='select-arrow'
      className={cn('flex size-4 items-center justify-center text-muted-foreground', className)}
      {...props}
    >
      {children ?? <CaretDownIcon className='size-4 rotate-180' />}
    </BaseSelect.Arrow>
  )
}

function SelectScrollUpArrow({ className, children, ...props }: React.ComponentProps<typeof BaseSelect.ScrollUpArrow>) {
  return (
    <BaseSelect.ScrollUpArrow
      data-slot='select-scroll-up-arrow'
      className={cn(
        'top-0 z-10 flex h-4 w-full cursor-default items-center justify-center bg-popover text-muted-foreground',
        className
      )}
      {...props}
    >
      {children ?? <CaretUpIcon className='size-3' />}
    </BaseSelect.ScrollUpArrow>
  )
}

function SelectScrollDownArrow({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseSelect.ScrollDownArrow>) {
  return (
    <BaseSelect.ScrollDownArrow
      data-slot='select-scroll-down-arrow'
      className={cn(
        'bottom-0 z-10 flex h-4 w-full cursor-default items-center justify-center bg-popover text-muted-foreground',
        className
      )}
      {...props}
    >
      {children ?? <CaretDownIcon className='size-3' />}
    </BaseSelect.ScrollDownArrow>
  )
}

function SelectGroup({ className, ...props }: React.ComponentProps<typeof BaseSelect.Group>) {
  return <BaseSelect.Group data-slot='select-group' className={cn(className)} {...props} />
}

function SelectGroupLabel({ className, ...props }: React.ComponentProps<typeof BaseSelect.GroupLabel>) {
  return (
    <BaseSelect.GroupLabel
      data-slot='select-group-label'
      className={cn('px-2 py-1.5 text-xs leading-5 font-medium text-muted-foreground select-none', className)}
      {...props}
    />
  )
}

function SelectSeparator({ className, ...props }: React.ComponentProps<typeof BaseSelect.Separator>) {
  return (
    <BaseSelect.Separator
      data-slot='select-separator'
      className={cn('-mx-1 my-1 h-px bg-border', className)}
      {...props}
    />
  )
}

export {
  Select,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  SelectIcon,
  SelectPortal,
  SelectBackdrop,
  SelectPositioner,
  SelectPopup,
  SelectList,
  SelectItem,
  SelectItemText,
  SelectItemIndicator,
  SelectArrow,
  SelectScrollUpArrow,
  SelectScrollDownArrow,
  SelectGroup,
  SelectGroupLabel,
  SelectSeparator
}
