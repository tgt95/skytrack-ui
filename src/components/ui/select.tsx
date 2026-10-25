import * as React from 'react'
import { Select as BaseSelect } from '@base-ui/react/select'
import { CaretDownIcon, CaretUpIcon, CaretUpDownIcon, CheckIcon } from '@phosphor-icons/react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { focusRing } from '@/components/ui/button'

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
      className={cn('cursor-default text-sm font-medium leading-none text-foreground', className as string)}
      {...props}
    />
  )
}

export const selectTriggerVariants = cva(
  cn(
    'flex w-full cursor-pointer items-center justify-between gap-2 whitespace-nowrap rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground shadow-xs transition-colors',
    'data-[placeholder]:text-muted-foreground',
    'hover:not-data-[disabled]:bg-accent hover:not-data-[disabled]:text-accent-foreground',
    'active:not-data-[disabled]:bg-accent',
    'data-[pressed]:bg-accent data-[pressed]:text-accent-foreground',
    'data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 disabled:pointer-events-none disabled:opacity-50',
    'data-[invalid]:border-destructive data-[invalid]:ring-destructive/20',
    '*:data-[slot=select-value]:truncate',
    focusRing
  ),
  {
    variants: {
      size: {
        default: 'min-h-9 py-1',
        sm: 'min-h-8 text-xs'
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
      className={cn(selectTriggerVariants({ size }), className as string)}
      {...props}
    />
  )
}

function SelectValue({ className, ...props }: React.ComponentProps<typeof BaseSelect.Value>) {
  return (
    <BaseSelect.Value
      data-slot='select-value'
      className={cn('truncate text-left data-[placeholder]:text-muted-foreground', className as string)}
      {...props}
    />
  )
}

function SelectIcon({ className, children, ...props }: React.ComponentProps<typeof BaseSelect.Icon>) {
  return (
    <BaseSelect.Icon
      data-slot='select-icon'
      className={cn('flex size-4 shrink-0 items-center justify-center text-muted-foreground', className as string)}
      {...props}
    >
      {children ?? <CaretUpDownIcon className='size-4' />}
    </BaseSelect.Icon>
  )
}

function SelectPortal({ className, ...props }: React.ComponentProps<typeof BaseSelect.Portal>) {
  return <BaseSelect.Portal data-slot='select-portal' className={cn(className as string)} {...props} />
}

function SelectBackdrop({ className, ...props }: React.ComponentProps<typeof BaseSelect.Backdrop>) {
  return (
    <BaseSelect.Backdrop
      data-slot='select-backdrop'
      className={cn(
        'fixed inset-0 z-50 bg-black/20 transition-opacity data-[starting-style]:opacity-0 data-[ending-style]:opacity-0',
        className as string
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
      className={cn('z-50 outline-hidden', className as string)}
      {...props}
    />
  )
}

function SelectPopup({ className, ...props }: React.ComponentProps<typeof BaseSelect.Popup>) {
  return (
    <BaseSelect.Popup
      data-slot='select-popup'
      className={cn(
        'max-h-[var(--available-height)] min-w-[var(--anchor-width)] origin-[var(--transform-origin)] overflow-x-hidden overflow-y-auto rounded-md border border-border bg-popover text-popover-foreground shadow-md',
        'transition-[transform,scale,opacity] duration-150 ease-out',
        'data-[starting-style]:scale-95 data-[starting-style]:opacity-0',
        'data-[ending-style]:scale-95 data-[ending-style]:opacity-0',
        className as string
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
        className as string
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
        'relative grid cursor-pointer grid-cols-[1rem_1fr] items-center gap-2 rounded-sm px-2 py-1.5 text-sm select-none',
        'data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground',
        'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        focusRing,
        className as string
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
    <BaseSelect.ItemText
      data-slot='select-item-text'
      className={cn('col-start-2 truncate', className as string)}
      {...props}
    />
  )
}

function SelectItemIndicator({ className, children, ...props }: React.ComponentProps<typeof BaseSelect.ItemIndicator>) {
  return (
    <BaseSelect.ItemIndicator
      data-slot='select-item-indicator'
      className={cn(
        'col-start-1 flex items-center justify-center',
        'transition-transform data-[starting-style]:scale-50 data-[ending-style]:scale-50',
        className as string
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
      className={cn('flex size-4 items-center justify-center text-muted-foreground', className as string)}
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
        className as string
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
        className as string
      )}
      {...props}
    >
      {children ?? <CaretDownIcon className='size-3' />}
    </BaseSelect.ScrollDownArrow>
  )
}

function SelectGroup({ className, ...props }: React.ComponentProps<typeof BaseSelect.Group>) {
  return <BaseSelect.Group data-slot='select-group' className={cn(className as string)} {...props} />
}

function SelectGroupLabel({ className, ...props }: React.ComponentProps<typeof BaseSelect.GroupLabel>) {
  return (
    <BaseSelect.GroupLabel
      data-slot='select-group-label'
      className={cn('px-2 py-1.5 text-xs leading-5 font-medium text-muted-foreground select-none', className as string)}
      {...props}
    />
  )
}

function SelectSeparator({ className, ...props }: React.ComponentProps<typeof BaseSelect.Separator>) {
  return (
    <BaseSelect.Separator
      data-slot='select-separator'
      className={cn('-mx-1 my-1 h-px bg-border', className as string)}
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
