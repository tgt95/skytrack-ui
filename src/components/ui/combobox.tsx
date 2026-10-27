import * as React from 'react'
import { Combobox as BaseCombobox } from '@base-ui/react/combobox'
import { CaretDownIcon, CaretUpDownIcon, CheckIcon, XIcon } from '@phosphor-icons/react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { focusRing } from '@/components/ui/button'

/** Props of the `Combobox` root, generic over value type, `multiple` mode and item type. */
export type ComboboxRootProps<
  Value,
  Multiple extends boolean | undefined = false,
  Item = Value
> = BaseCombobox.Root.Props<Value, Multiple, Item>

function Combobox<Value, Multiple extends boolean | undefined = false, Item = Value>(
  props: ComboboxRootProps<Value, Multiple, Item>
) {
  return <BaseCombobox.Root {...props} />
}

function ComboboxLabel({ className, ...props }: React.ComponentProps<typeof BaseCombobox.Label>) {
  return (
    <BaseCombobox.Label
      data-slot='combobox-label'
      className={cn('cursor-default text-sm leading-none font-medium text-foreground', className as string)}
      {...props}
    />
  )
}

export const comboboxInputGroupVariants = cva(
  cn(
    'relative flex w-full items-center gap-1 rounded-(--radius) border border-input bg-background text-foreground shadow-xs transition-colors',
    'focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50',
    'has-[button]:px-1',
    'data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50',
    'data-[invalid]:border-destructive data-[invalid]:ring-destructive/20'
  ),
  {
    variants: {
      size: {
        default: 'min-h-9 px-2 py-1',
        sm: 'min-h-8 px-2 py-0.5 text-xs'
      },
      shape: {
        input: '',
        chips: 'flex-wrap items-center'
      }
    },
    defaultVariants: { size: 'default', shape: 'input' }
  }
)

type ComboboxInputGroupProps = React.ComponentProps<typeof BaseCombobox.InputGroup> &
  VariantProps<typeof comboboxInputGroupVariants>

function ComboboxInputGroup({ className, size, shape, ...props }: ComboboxInputGroupProps) {
  return (
    <BaseCombobox.InputGroup
      data-slot='combobox-input-group'
      className={cn(comboboxInputGroupVariants({ size, shape }), className as string)}
      {...props}
    />
  )
}

function ComboboxInput({ className, ...props }: React.ComponentProps<typeof BaseCombobox.Input>) {
  return (
    <BaseCombobox.Input
      data-slot='combobox-input'
      className={cn(
        'h-full min-w-0 flex-1 border-0 bg-transparent px-1 text-sm outline-hidden',
        'placeholder:text-muted-foreground',
        className as string
      )}
      {...props}
    />
  )
}

function ComboboxTrigger({ className, children, ...props }: React.ComponentProps<typeof BaseCombobox.Trigger>) {
  return (
    <BaseCombobox.Trigger
      data-slot='combobox-trigger'
      className={cn(
        'flex size-6 cursor-pointer shrink-0 items-center justify-center rounded-(--radius) border-0 bg-transparent p-0 text-muted-foreground transition-colors',
        'hover:bg-accent hover:text-accent-foreground',
        'data-[pressed]:bg-accent data-[pressed]:text-accent-foreground',
        'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        focusRing,
        className as string
      )}
      {...props}
    >
      {children ?? <CaretDownIcon className='size-4' />}
    </BaseCombobox.Trigger>
  )
}

/** Standalone trigger used by the input-inside-popup pattern. */
function ComboboxTriggerButton({
  className,
  size,
  children,
  ...props
}: React.ComponentProps<typeof BaseCombobox.Trigger> & VariantProps<typeof comboboxInputGroupVariants>) {
  return (
    <BaseCombobox.Trigger
      data-slot='combobox-trigger-button'
      className={cn(
        'flex w-full cursor-pointer items-center justify-between gap-2 whitespace-nowrap rounded-(--radius) border border-input bg-background px-3 text-sm text-foreground shadow-xs transition-colors',
        'data-[placeholder]:text-muted-foreground',
        'hover:not-data-[disabled]:bg-accent hover:not-data-[disabled]:text-accent-foreground',
        'data-[pressed]:bg-accent data-[pressed]:text-accent-foreground',
        'data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50',
        size === 'sm' ? 'h-8 text-xs' : 'h-9',
        focusRing,
        className as string
      )}
      {...props}
    >
      {children ?? <CaretUpDownIcon className='size-4 shrink-0 text-muted-foreground' />}
    </BaseCombobox.Trigger>
  )
}

function ComboboxIcon({ className, children, ...props }: React.ComponentProps<typeof BaseCombobox.Icon>) {
  return (
    <BaseCombobox.Icon
      data-slot='combobox-icon'
      className={cn('flex size-4 shrink-0 items-center justify-center text-muted-foreground', className as string)}
      {...props}
    >
      {children ?? <CaretUpDownIcon className='size-4' />}
    </BaseCombobox.Icon>
  )
}

function ComboboxClear({ className, children, ...props }: React.ComponentProps<typeof BaseCombobox.Clear>) {
  return (
    <BaseCombobox.Clear
      data-slot='combobox-clear'
      className={cn(
        'flex size-6 cursor-pointer shrink-0 items-center justify-center rounded-(--radius) border-0 bg-transparent p-0 text-muted-foreground transition-colors',
        'hover:bg-accent hover:text-accent-foreground',
        'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        focusRing,
        className as string
      )}
      {...props}
    >
      {children ?? <XIcon className='size-4' />}
    </BaseCombobox.Clear>
  )
}

/** Renders the selected label (or a render function). Renders no element of its own. */
function ComboboxValue(props: React.ComponentProps<typeof BaseCombobox.Value>) {
  return <BaseCombobox.Value {...props} />
}

function ComboboxChips({ className, ...props }: React.ComponentProps<typeof BaseCombobox.Chips>) {
  return (
    <BaseCombobox.Chips
      data-slot='combobox-chips'
      className={cn('flex w-full flex-wrap items-center gap-1', className as string)}
      {...props}
    />
  )
}

function ComboboxChip({ className, ...props }: React.ComponentProps<typeof BaseCombobox.Chip>) {
  return (
    <BaseCombobox.Chip
      data-slot='combobox-chip'
      className={cn(
        'flex min-h-6 cursor-pointer items-center gap-1 overflow-hidden rounded-(--radius) bg-secondary py-0 pr-1 pl-1.5 text-sm leading-none text-secondary-foreground select-none',
        'data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground',
        'data-[focused]:bg-accent data-[focused]:text-accent-foreground',
        className as string
      )}
      {...props}
    />
  )
}

function ComboboxChipRemove({ className, children, ...props }: React.ComponentProps<typeof BaseCombobox.ChipRemove>) {
  return (
    <BaseCombobox.ChipRemove
      data-slot='combobox-chip-remove'
      className={cn(
        'flex size-4 cursor-pointer shrink-0 items-center justify-center rounded-(--radius) border-0 bg-transparent p-0 text-current transition-colors hover:bg-accent',
        focusRing,
        className as string
      )}
      {...props}
    >
      {children ?? <XIcon className='size-3' />}
    </BaseCombobox.ChipRemove>
  )
}

function ComboboxPortal({ className, ...props }: React.ComponentProps<typeof BaseCombobox.Portal>) {
  return <BaseCombobox.Portal data-slot='combobox-portal' className={cn(className as string)} {...props} />
}

function ComboboxBackdrop({ className, ...props }: React.ComponentProps<typeof BaseCombobox.Backdrop>) {
  return (
    <BaseCombobox.Backdrop
      data-slot='combobox-backdrop'
      className={cn(
        'fixed inset-0 z-50 bg-black/20 transition-opacity data-[starting-style]:opacity-0 data-[ending-style]:opacity-0',
        className as string
      )}
      {...props}
    />
  )
}

function ComboboxPositioner({ className, ...props }: React.ComponentProps<typeof BaseCombobox.Positioner>) {
  return (
    <BaseCombobox.Positioner
      data-slot='combobox-positioner'
      className={cn('z-50 outline-hidden', className as string)}
      {...props}
    />
  )
}

function ComboboxPopup({ className, ...props }: React.ComponentProps<typeof BaseCombobox.Popup>) {
  return (
    <BaseCombobox.Popup
      data-slot='combobox-popup'
      className={cn(
        'w-[var(--anchor-width)] max-w-[var(--available-width)] origin-[var(--transform-origin)] rounded-(--radius) border border-border bg-popover text-popover-foreground shadow-md',
        'transition-[transform,scale,opacity] duration-150 ease-out',
        'data-[starting-style]:scale-95 data-[starting-style]:opacity-0',
        'data-[ending-style]:scale-95 data-[ending-style]:opacity-0',
        className as string
      )}
      {...props}
    />
  )
}

function ComboboxArrow({ className, children, ...props }: React.ComponentProps<typeof BaseCombobox.Arrow>) {
  return (
    <BaseCombobox.Arrow
      data-slot='combobox-arrow'
      className={cn('flex size-4 items-center justify-center text-muted-foreground', className as string)}
      {...props}
    >
      {children ?? <CaretDownIcon className='size-3 rotate-180' />}
    </BaseCombobox.Arrow>
  )
}

function ComboboxStatus({ className, ...props }: React.ComponentProps<typeof BaseCombobox.Status>) {
  return (
    <BaseCombobox.Status data-slot='combobox-status' className={cn('empty:hidden', className as string)} {...props} />
  )
}

function ComboboxEmpty({ className, children, ...props }: React.ComponentProps<typeof BaseCombobox.Empty>) {
  return (
    <BaseCombobox.Empty
      data-slot='combobox-empty'
      className={cn('px-2 py-3 text-sm leading-none text-muted-foreground empty:hidden', className as string)}
      {...props}
    >
      {children === undefined ? 'No results found.' : children}
    </BaseCombobox.Empty>
  )
}

function ComboboxList({ className, ...props }: React.ComponentProps<typeof BaseCombobox.List>) {
  return (
    <BaseCombobox.List
      data-slot='combobox-list'
      className={cn(
        'max-h-[min(22.5rem,var(--available-height))] scroll-py-1 overflow-y-auto overscroll-contain py-1 outline-hidden data-[empty]:p-0',
        className as string
      )}
      {...props}
    />
  )
}

function ComboboxRow({ className, ...props }: React.ComponentProps<typeof BaseCombobox.Row>) {
  return <BaseCombobox.Row data-slot='combobox-row' className={cn(className as string)} {...props} />
}

function ComboboxItem({ className, children, ...props }: React.ComponentProps<typeof BaseCombobox.Item>) {
  return (
    <BaseCombobox.Item
      data-slot='combobox-item'
      className={cn(
        'relative grid cursor-pointer grid-cols-[1rem_1fr] items-center gap-2 rounded-(--radius) px-2 py-1.5 text-sm select-none',
        'data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground',
        'data-[selected]:font-medium',
        'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        focusRing,
        className as string
      )}
      {...props}
    >
      {children}
    </BaseCombobox.Item>
  )
}

function ComboboxItemIndicator({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseCombobox.ItemIndicator>) {
  return (
    <BaseCombobox.ItemIndicator
      data-slot='combobox-item-indicator'
      className={cn(
        'col-start-1 flex items-center justify-center',
        'transition-transform data-[starting-style]:scale-50 data-[ending-style]:scale-50',
        className as string
      )}
      {...props}
    >
      {children ?? <CheckIcon className='size-4' />}
    </BaseCombobox.ItemIndicator>
  )
}

function ComboboxGroup({ className, ...props }: React.ComponentProps<typeof BaseCombobox.Group>) {
  return (
    <BaseCombobox.Group
      data-slot='combobox-group'
      className={cn('block pb-1 last:pb-0', className as string)}
      {...props}
    />
  )
}

function ComboboxGroupLabel({ className, ...props }: React.ComponentProps<typeof BaseCombobox.GroupLabel>) {
  return (
    <BaseCombobox.GroupLabel
      data-slot='combobox-group-label'
      className={cn('px-2 py-1.5 text-xs leading-5 font-medium text-muted-foreground select-none', className as string)}
      {...props}
    />
  )
}

function ComboboxSeparator({ className, ...props }: React.ComponentProps<typeof BaseCombobox.Separator>) {
  return (
    <BaseCombobox.Separator
      data-slot='combobox-separator'
      className={cn('-mx-1 my-1 h-px bg-border', className as string)}
      {...props}
    />
  )
}

/** Renders the filtered items of the enclosing group/list. Renders no element of its own. */
function ComboboxCollection(props: React.ComponentProps<typeof BaseCombobox.Collection>) {
  return <BaseCombobox.Collection {...props} />
}

export {
  Combobox,
  ComboboxLabel,
  ComboboxInputGroup,
  ComboboxInput,
  ComboboxTrigger,
  ComboboxTriggerButton,
  ComboboxIcon,
  ComboboxClear,
  ComboboxValue,
  ComboboxChips,
  ComboboxChip,
  ComboboxChipRemove,
  ComboboxPortal,
  ComboboxBackdrop,
  ComboboxPositioner,
  ComboboxPopup,
  ComboboxArrow,
  ComboboxStatus,
  ComboboxEmpty,
  ComboboxList,
  ComboboxRow,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxGroup,
  ComboboxGroupLabel,
  ComboboxSeparator,
  ComboboxCollection
}

/** Re-exported Base UI helpers so demos never need the raw package. */
export const useComboboxFilter = BaseCombobox.useFilter
export const useComboboxFilteredItems = BaseCombobox.useFilteredItems
export const createComboboxItems = BaseCombobox.createItems
