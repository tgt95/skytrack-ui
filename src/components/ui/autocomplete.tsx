import * as React from 'react'
import { Autocomplete as BaseAutocomplete } from '@base-ui/react/autocomplete'
import { CaretDownIcon, MagnifyingGlassIcon, XIcon } from '@phosphor-icons/react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { focusRing } from '@/lib/focus-ring'
import { CONTROL_SIZE_CLASSES, type ControlSize } from '@/lib/control-sizes'

/**
 * Props of the `Autocomplete` root, generic over the item value type.
 * Accepts a flat item list or a grouped one (`{ value, items }[]`).
 */
export type AutocompleteRootProps<ItemValue> = BaseAutocomplete.Root.Props<ItemValue>

type AutocompleteGroup<Item> = { [key: string]: unknown; items: readonly Item[] }

function Autocomplete<ItemValue>(props: AutocompleteRootProps<ItemValue>) {
  // Base UI declares two overloads (grouped vs flat `items`). This wrapper accepts
  // either shape, so the argument is forwarded to the implementation signature.
  const RootImpl = BaseAutocomplete.Root as (p: AutocompleteRootProps<ItemValue>) => React.JSX.Element
  return <RootImpl {...props} />
}

export const autocompleteInputVariants = cva(
  cn(
    'w-full min-w-0 border-0 bg-transparent text-foreground outline-hidden',
    'placeholder:text-muted-foreground'
  ),
  {
    variants: {
      /** `group` = input inside `AutocompleteInputGroup`, `standalone` = bordered input. */
      context: {
        group: 'h-full px-0 text-inherit',
        standalone:
          'rounded-(--radius) border border-input bg-background shadow-xs focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50'
      },
      size: {
        xs: 'text-xs',
        sm: 'text-sm',
        default: 'text-sm',
        lg: 'text-base'
      }
    },
    compoundVariants: (['xs', 'sm', 'default', 'lg'] as const).map((size) => ({
      context: 'standalone' as const,
      size,
      class: CONTROL_SIZE_CLASSES[size]
    })),
    defaultVariants: { context: 'standalone', size: 'default' }
  }
)

type AutocompleteInputProps = Omit<React.ComponentProps<typeof BaseAutocomplete.Input>, 'size'> &
  VariantProps<typeof autocompleteInputVariants>

function AutocompleteInput({ className, context, size, ...props }: AutocompleteInputProps) {
  return (
    <BaseAutocomplete.Input
      data-slot='autocomplete-input'
      data-size={size ?? 'default'}
      className={cn(autocompleteInputVariants({ context, size }), className)}
      {...props}
    />
  )
}

export const autocompleteInputGroupVariants = cva(
  cn(
    'relative flex w-full items-center rounded-(--radius) border border-input bg-background text-foreground shadow-xs transition-colors',
    'focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50',
    'data-disabled:cursor-not-allowed data-disabled:opacity-50',
    'data-invalid:border-destructive data-invalid:ring-destructive/20'
  ),
  {
    variants: {
      size: {
        xs: 'min-h-6',
        sm: 'min-h-8',
        default: 'min-h-10',
        lg: 'min-h-12'
      }
    },
    compoundVariants: (['xs', 'sm', 'default', 'lg'] as const).map((size) => ({
      size,
      class: CONTROL_SIZE_CLASSES[size]
    })),
    defaultVariants: { size: 'default' }
  }
)

type AutocompleteInputGroupProps = React.ComponentProps<typeof BaseAutocomplete.InputGroup> &
  VariantProps<typeof autocompleteInputGroupVariants>

function AutocompleteInputGroup({ className, size, ...props }: AutocompleteInputGroupProps) {
  return (
    <BaseAutocomplete.InputGroup
      data-slot='autocomplete-input-group'
      data-size={size ?? 'default'}
      className={cn(autocompleteInputGroupVariants({ size }), className)}
      {...props}
    />
  )
}

function AutocompleteTrigger({ className, children, ...props }: React.ComponentProps<typeof BaseAutocomplete.Trigger>) {
  return (
    <BaseAutocomplete.Trigger
      data-slot='autocomplete-trigger'
      className={cn(
        'flex cursor-pointer shrink-0 items-center justify-center rounded-(--radius) border-0 bg-transparent p-0 text-muted-foreground transition-colors',
        'hover:bg-accent hover:text-accent-foreground',
        'data-pressed:bg-accent data-pressed:text-accent-foreground',
        'data-disabled:pointer-events-none data-disabled:opacity-50',
        focusRing,
        className
      )}
      {...props}
    >
      {children ?? <CaretDownIcon />}
    </BaseAutocomplete.Trigger>
  )
}

/** Standalone trigger used by the input-inside-popup pattern. */
function AutocompleteTriggerButton({
  className,
  size = 'default',
  children,
  ...props
}: Omit<React.ComponentProps<typeof BaseAutocomplete.Trigger>, 'size'> & { size?: ControlSize }) {
  return (
    <BaseAutocomplete.Trigger
      data-slot='autocomplete-trigger-button'
      data-size={size}
      className={cn(
        'flex w-full cursor-pointer items-center justify-between whitespace-nowrap rounded-(--radius) border border-input bg-background text-foreground shadow-xs transition-colors',
        CONTROL_SIZE_CLASSES[size],
        'data-placeholder:text-muted-foreground',
        'hover:not-data-disabled:bg-accent hover:not-data-disabled:text-accent-foreground',
        'data-disabled:cursor-not-allowed data-disabled:opacity-50',
        focusRing,
        className
      )}
      {...props}
    >
      {children ?? <MagnifyingGlassIcon className='shrink-0 text-muted-foreground' />}
    </BaseAutocomplete.Trigger>
  )
}

function AutocompleteIcon({ className, children, ...props }: React.ComponentProps<typeof BaseAutocomplete.Icon>) {
  return (
    <BaseAutocomplete.Icon
      data-slot='autocomplete-icon'
      className={cn('flex shrink-0 items-center justify-center text-muted-foreground', className)}
      {...props}
    >
      {children ?? <CaretDownIcon />}
    </BaseAutocomplete.Icon>
  )
}

function AutocompleteClear({ className, children, ...props }: React.ComponentProps<typeof BaseAutocomplete.Clear>) {
  return (
    <BaseAutocomplete.Clear
      data-slot='autocomplete-clear'
      className={cn(
        'flex cursor-pointer shrink-0 items-center justify-center rounded-(--radius) border-0 bg-transparent p-0 text-muted-foreground transition-colors',
        'hover:bg-accent hover:text-accent-foreground',
        'data-disabled:pointer-events-none data-disabled:opacity-50',
        focusRing,
        className
      )}
      {...props}
    >
      {children ?? <XIcon />}
    </BaseAutocomplete.Clear>
  )
}

/** Renders the current input value. Renders no element of its own. */
function AutocompleteValue(props: React.ComponentProps<typeof BaseAutocomplete.Value>) {
  return <BaseAutocomplete.Value {...props} />
}

function AutocompletePortal({ className, ...props }: React.ComponentProps<typeof BaseAutocomplete.Portal>) {
  return <BaseAutocomplete.Portal data-slot='autocomplete-portal' className={cn(className)} {...props} />
}

function AutocompleteBackdrop({ className, ...props }: React.ComponentProps<typeof BaseAutocomplete.Backdrop>) {
  return (
    <BaseAutocomplete.Backdrop
      data-slot='autocomplete-backdrop'
      className={cn(
        'fixed inset-0 z-50 bg-black/20 transition-opacity data-starting-style:opacity-0 data-ending-style:opacity-0',
        className
      )}
      {...props}
    />
  )
}

function AutocompletePositioner({ className, ...props }: React.ComponentProps<typeof BaseAutocomplete.Positioner>) {
  return (
    <BaseAutocomplete.Positioner
      data-slot='autocomplete-positioner'
      className={cn('z-50 outline-hidden', className)}
      {...props}
    />
  )
}

function AutocompletePopup({ className, ...props }: React.ComponentProps<typeof BaseAutocomplete.Popup>) {
  return (
    <BaseAutocomplete.Popup
      data-slot='autocomplete-popup'
      className={cn(
        'w-[var(--anchor-width)] max-w-[var(--available-width)] origin-[var(--transform-origin)] rounded-(--radius) border border-border bg-popover text-popover-foreground shadow-md',
        'transition-[transform,scale,opacity] duration-150 ease-out',
        'data-starting-style:scale-95 data-starting-style:opacity-0',
        'data-ending-style:scale-95 data-ending-style:opacity-0',
        className
      )}
      {...props}
    />
  )
}

function AutocompleteArrow({ className, children, ...props }: React.ComponentProps<typeof BaseAutocomplete.Arrow>) {
  return (
    <BaseAutocomplete.Arrow
      data-slot='autocomplete-arrow'
      className={cn('flex size-4 items-center justify-center text-muted-foreground', className)}
      {...props}
    >
      {children ?? <CaretDownIcon className='size-3 rotate-180' />}
    </BaseAutocomplete.Arrow>
  )
}

function AutocompleteStatus({ className, ...props }: React.ComponentProps<typeof BaseAutocomplete.Status>) {
  return (
    <BaseAutocomplete.Status data-slot='autocomplete-status' className={cn('empty:hidden', className)} {...props} />
  )
}

function AutocompleteEmpty({ className, children, ...props }: React.ComponentProps<typeof BaseAutocomplete.Empty>) {
  return (
    <BaseAutocomplete.Empty
      data-slot='autocomplete-empty'
      className={cn('px-2 py-3 text-sm leading-none text-muted-foreground empty:hidden', className)}
      {...props}
    >
      {children === undefined ? 'No results found.' : children}
    </BaseAutocomplete.Empty>
  )
}

function AutocompleteList({ className, ...props }: React.ComponentProps<typeof BaseAutocomplete.List>) {
  return (
    <BaseAutocomplete.List
      data-slot='autocomplete-list'
      className={cn(
        'max-h-[min(22.5rem,var(--available-height))] scroll-py-1 overflow-y-auto overscroll-contain py-1 outline-hidden data-empty:p-0',
        className
      )}
      {...props}
    />
  )
}

function AutocompleteRow({ className, ...props }: React.ComponentProps<typeof BaseAutocomplete.Row>) {
  return <BaseAutocomplete.Row data-slot='autocomplete-row' className={cn(className)} {...props} />
}

function AutocompleteItem({ className, children, ...props }: React.ComponentProps<typeof BaseAutocomplete.Item>) {
  return (
    <BaseAutocomplete.Item
      data-slot='autocomplete-item'
      className={cn(
        'flex cursor-pointer items-center gap-2 rounded-(--radius) px-2 py-1.5 text-sm select-none',
        'data-highlighted:bg-accent data-highlighted:text-accent-foreground',
        'data-disabled:pointer-events-none data-disabled:opacity-50',
        focusRing,
        className
      )}
      {...props}
    >
      {children}
    </BaseAutocomplete.Item>
  )
}

function AutocompleteGroup({ className, ...props }: React.ComponentProps<typeof BaseAutocomplete.Group>) {
  return (
    <BaseAutocomplete.Group
      data-slot='autocomplete-group'
      className={cn('block pb-1 last:pb-0', className)}
      {...props}
    />
  )
}

function AutocompleteGroupLabel({ className, ...props }: React.ComponentProps<typeof BaseAutocomplete.GroupLabel>) {
  return (
    <BaseAutocomplete.GroupLabel
      data-slot='autocomplete-group-label'
      className={cn('px-2 py-1.5 text-xs leading-5 font-medium text-muted-foreground select-none', className)}
      {...props}
    />
  )
}

function AutocompleteSeparator({ className, ...props }: React.ComponentProps<typeof BaseAutocomplete.Separator>) {
  return (
    <BaseAutocomplete.Separator
      data-slot='autocomplete-separator'
      className={cn('-mx-1 my-1 h-px bg-border', className)}
      {...props}
    />
  )
}

/** Renders the filtered items of the enclosing group/list. Renders no element of its own. */
function AutocompleteCollection(props: React.ComponentProps<typeof BaseAutocomplete.Collection>) {
  return <BaseAutocomplete.Collection {...props} />
}

/** Re-exported Base UI helpers so demos never need the raw package. */
export const useAutocompleteFilter = BaseAutocomplete.useFilter
export const useAutocompleteFilteredItems = BaseAutocomplete.useFilteredItems

export {
  Autocomplete,
  AutocompleteInputGroup,
  AutocompleteInput,
  AutocompleteTrigger,
  AutocompleteTriggerButton,
  AutocompleteIcon,
  AutocompleteClear,
  AutocompleteValue,
  AutocompletePortal,
  AutocompleteBackdrop,
  AutocompletePositioner,
  AutocompletePopup,
  AutocompleteArrow,
  AutocompleteStatus,
  AutocompleteEmpty,
  AutocompleteList,
  AutocompleteRow,
  AutocompleteItem,
  AutocompleteGroup,
  AutocompleteGroupLabel,
  AutocompleteSeparator,
  AutocompleteCollection
}
