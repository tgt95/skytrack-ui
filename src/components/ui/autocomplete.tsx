import * as React from 'react'
import { Autocomplete as BaseAutocomplete } from '@base-ui/react/autocomplete'
import { CaretDownIcon, MagnifyingGlassIcon, XIcon } from '@phosphor-icons/react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { focusRing } from '@/components/ui/button'

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
    'w-full min-w-0 border-0 bg-transparent text-sm text-foreground outline-hidden',
    'placeholder:text-muted-foreground'
  ),
  {
    variants: {
      /** `group` = input inside `AutocompleteInputGroup`, `standalone` = bordered input. */
      context: {
        group: 'h-full px-1',
        standalone:
          'h-9 rounded-md border border-input bg-background px-3 shadow-xs focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50'
      },
      size: {
        default: '',
        sm: 'h-8 text-xs'
      }
    },
    defaultVariants: { context: 'standalone', size: 'default' }
  }
)

type AutocompleteInputProps = React.ComponentProps<typeof BaseAutocomplete.Input> &
  VariantProps<typeof autocompleteInputVariants>

function AutocompleteInput({ className, context, size, ...props }: AutocompleteInputProps) {
  return (
    <BaseAutocomplete.Input
      data-slot='autocomplete-input'
      className={cn(autocompleteInputVariants({ context, size }), className as string)}
      {...props}
    />
  )
}

export const autocompleteInputGroupVariants = cva(
  cn(
    'relative flex w-full items-center gap-1 rounded-md border border-input bg-background text-foreground shadow-xs transition-colors',
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
      }
    },
    defaultVariants: { size: 'default' }
  }
)

type AutocompleteInputGroupProps = React.ComponentProps<typeof BaseAutocomplete.InputGroup> &
  VariantProps<typeof autocompleteInputGroupVariants>

function AutocompleteInputGroup({ className, size, ...props }: AutocompleteInputGroupProps) {
  return (
    <BaseAutocomplete.InputGroup
      data-slot='autocomplete-input-group'
      className={cn(autocompleteInputGroupVariants({ size }), className as string)}
      {...props}
    />
  )
}

function AutocompleteTrigger({ className, children, ...props }: React.ComponentProps<typeof BaseAutocomplete.Trigger>) {
  return (
    <BaseAutocomplete.Trigger
      data-slot='autocomplete-trigger'
      className={cn(
        'flex size-6 cursor-pointer shrink-0 items-center justify-center rounded-sm border-0 bg-transparent p-0 text-muted-foreground transition-colors',
        'hover:bg-accent hover:text-accent-foreground',
        'data-[pressed]:bg-accent data-[pressed]:text-accent-foreground',
        'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        focusRing,
        className as string
      )}
      {...props}
    >
      {children ?? <CaretDownIcon className='size-4' />}
    </BaseAutocomplete.Trigger>
  )
}

/** Standalone trigger used by the input-inside-popup pattern. */
function AutocompleteTriggerButton({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseAutocomplete.Trigger>) {
  return (
    <BaseAutocomplete.Trigger
      data-slot='autocomplete-trigger-button'
      className={cn(
        'flex h-9 w-full cursor-pointer items-center justify-between gap-2 whitespace-nowrap rounded-md border border-input bg-background px-3 text-sm text-foreground shadow-xs transition-colors',
        'data-[placeholder]:text-muted-foreground',
        'hover:not-data-[disabled]:bg-accent hover:not-data-[disabled]:text-accent-foreground',
        'data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50',
        focusRing,
        className as string
      )}
      {...props}
    >
      {children ?? <MagnifyingGlassIcon className='size-4 shrink-0 text-muted-foreground' />}
    </BaseAutocomplete.Trigger>
  )
}

function AutocompleteIcon({ className, children, ...props }: React.ComponentProps<typeof BaseAutocomplete.Icon>) {
  return (
    <BaseAutocomplete.Icon
      data-slot='autocomplete-icon'
      className={cn('flex size-4 shrink-0 items-center justify-center text-muted-foreground', className as string)}
      {...props}
    >
      {children ?? <CaretDownIcon className='size-4' />}
    </BaseAutocomplete.Icon>
  )
}

function AutocompleteClear({ className, children, ...props }: React.ComponentProps<typeof BaseAutocomplete.Clear>) {
  return (
    <BaseAutocomplete.Clear
      data-slot='autocomplete-clear'
      className={cn(
        'flex size-6 cursor-pointer shrink-0 items-center justify-center rounded-sm border-0 bg-transparent p-0 text-muted-foreground transition-colors',
        'hover:bg-accent hover:text-accent-foreground',
        'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        focusRing,
        className as string
      )}
      {...props}
    >
      {children ?? <XIcon className='size-4' />}
    </BaseAutocomplete.Clear>
  )
}

/** Renders the current input value. Renders no element of its own. */
function AutocompleteValue(props: React.ComponentProps<typeof BaseAutocomplete.Value>) {
  return <BaseAutocomplete.Value {...props} />
}

function AutocompletePortal({ className, ...props }: React.ComponentProps<typeof BaseAutocomplete.Portal>) {
  return <BaseAutocomplete.Portal data-slot='autocomplete-portal' className={cn(className as string)} {...props} />
}

function AutocompleteBackdrop({ className, ...props }: React.ComponentProps<typeof BaseAutocomplete.Backdrop>) {
  return (
    <BaseAutocomplete.Backdrop
      data-slot='autocomplete-backdrop'
      className={cn(
        'fixed inset-0 z-50 bg-black/20 transition-opacity data-[starting-style]:opacity-0 data-[ending-style]:opacity-0',
        className as string
      )}
      {...props}
    />
  )
}

function AutocompletePositioner({ className, ...props }: React.ComponentProps<typeof BaseAutocomplete.Positioner>) {
  return (
    <BaseAutocomplete.Positioner
      data-slot='autocomplete-positioner'
      className={cn('z-50 outline-hidden', className as string)}
      {...props}
    />
  )
}

function AutocompletePopup({ className, ...props }: React.ComponentProps<typeof BaseAutocomplete.Popup>) {
  return (
    <BaseAutocomplete.Popup
      data-slot='autocomplete-popup'
      className={cn(
        'w-[var(--anchor-width)] max-w-[var(--available-width)] origin-[var(--transform-origin)] rounded-md border border-border bg-popover text-popover-foreground shadow-md',
        'transition-[transform,scale,opacity] duration-150 ease-out',
        'data-[starting-style]:scale-95 data-[starting-style]:opacity-0',
        'data-[ending-style]:scale-95 data-[ending-style]:opacity-0',
        className as string
      )}
      {...props}
    />
  )
}

function AutocompleteArrow({ className, children, ...props }: React.ComponentProps<typeof BaseAutocomplete.Arrow>) {
  return (
    <BaseAutocomplete.Arrow
      data-slot='autocomplete-arrow'
      className={cn('flex size-4 items-center justify-center text-muted-foreground', className as string)}
      {...props}
    >
      {children ?? <CaretDownIcon className='size-3 rotate-180' />}
    </BaseAutocomplete.Arrow>
  )
}

function AutocompleteStatus({ className, ...props }: React.ComponentProps<typeof BaseAutocomplete.Status>) {
  return (
    <BaseAutocomplete.Status
      data-slot='autocomplete-status'
      className={cn('empty:hidden', className as string)}
      {...props}
    />
  )
}

function AutocompleteEmpty({ className, children, ...props }: React.ComponentProps<typeof BaseAutocomplete.Empty>) {
  return (
    <BaseAutocomplete.Empty
      data-slot='autocomplete-empty'
      className={cn('px-2 py-3 text-sm leading-none text-muted-foreground empty:hidden', className as string)}
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
        'max-h-[min(22.5rem,var(--available-height))] scroll-py-1 overflow-y-auto overscroll-contain py-1 outline-hidden data-[empty]:p-0',
        className as string
      )}
      {...props}
    />
  )
}

function AutocompleteRow({ className, ...props }: React.ComponentProps<typeof BaseAutocomplete.Row>) {
  return <BaseAutocomplete.Row data-slot='autocomplete-row' className={cn(className as string)} {...props} />
}

function AutocompleteItem({ className, children, ...props }: React.ComponentProps<typeof BaseAutocomplete.Item>) {
  return (
    <BaseAutocomplete.Item
      data-slot='autocomplete-item'
      className={cn(
        'flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm select-none',
        'data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground',
        'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        focusRing,
        className as string
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
      className={cn('block pb-1 last:pb-0', className as string)}
      {...props}
    />
  )
}

function AutocompleteGroupLabel({ className, ...props }: React.ComponentProps<typeof BaseAutocomplete.GroupLabel>) {
  return (
    <BaseAutocomplete.GroupLabel
      data-slot='autocomplete-group-label'
      className={cn('px-2 py-1.5 text-xs leading-5 font-medium text-muted-foreground select-none', className as string)}
      {...props}
    />
  )
}

function AutocompleteSeparator({ className, ...props }: React.ComponentProps<typeof BaseAutocomplete.Separator>) {
  return (
    <BaseAutocomplete.Separator
      data-slot='autocomplete-separator'
      className={cn('-mx-1 my-1 h-px bg-border', className as string)}
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
