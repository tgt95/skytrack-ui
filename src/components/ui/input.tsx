import * as React from 'react'
import { Input as BaseInput } from '@base-ui/react/input'
import { cn } from '@/lib/utils'
import { focusRing } from '@/components/ui/button'

type InputAdornmentProps = React.ComponentProps<'span'> & {
  position: 'start' | 'end'
}

/**
 * Sits in flow beside the input, the way MUI's `InputAdornment` does: the input is
 * `flex-1 min-w-0` so it shrinks and scrolls its text, and the adornment is `shrink-0`.
 * Nothing is absolutely positioned and no fixed padding is reserved, so a wide
 * adornment (a currency suffix, a long unit) never overlaps the value.
 */
function InputAdornment({ className, position, ...props }: InputAdornmentProps) {
  return (
    <span
      data-slot='input-adornment'
      data-position={position}
      className={cn(
        'flex h-10 shrink-0 items-center text-muted-foreground',
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className as string
      )}
      {...props}
    />
  )
}

type InputProps = React.ComponentProps<typeof BaseInput> & {
  startAdornment?: React.ReactNode
  endAdornment?: React.ReactNode
}

function Input({ className, startAdornment, endAdornment, ...props }: InputProps) {
  if (startAdornment == null && endAdornment == null) {
    return (
      <BaseInput
        data-slot='input'
        className={cn(
          'flex h-10 w-full min-w-0 rounded-md border border-input bg-background px-3 py-1 text-sm text-foreground shadow-xs transition-colors',
          'placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground',
          'file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground',
          'data-[filled]:border-foreground/40',
          'data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50',
          'data-[invalid]:border-destructive data-[invalid]:ring-destructive/20',
          focusRing,
          className as string
        )}
        {...props}
      />
    )
  }
  return (
    <span
      data-slot='input-root'
      className={cn(
        'flex w-full items-center rounded-md border border-input bg-background transition-colors',
        // The border, background and focus ring live on the wrapper so the adornment
        // sits inside the box, matching MUI. `focus-within` replaces the input's own
        // `focus-visible` ring, and `has-*` carries the state styling from the input's
        // data attributes (Base UI only sets those when inside a Field.Root).
        'focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/15',
        'has-[[data-filled]]:border-foreground/40',
        'has-[[data-invalid]]:border-destructive has-[[data-invalid]]:ring-destructive/20',
        'has-[[data-disabled]]:cursor-not-allowed has-[[data-disabled]]:opacity-50',
        className as string
      )}
    >
      {startAdornment != null && (
        <InputAdornment position='start' className='pl-3'>
          {startAdornment}
        </InputAdornment>
      )}
      <BaseInput
        data-slot='input'
        className={cn(
          'flex h-10 min-w-0 flex-1 rounded-md bg-transparent px-3 py-1 text-sm text-foreground outline-hidden transition-colors',
          'placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground',
          'file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground',
          startAdornment != null && 'pl-2',
          endAdornment != null && 'pr-2'
        )}
        {...props}
      />
      {endAdornment != null && (
        <InputAdornment position='end' className='pr-3'>
          {endAdornment}
        </InputAdornment>
      )}
    </span>
  )
}

export { Input, InputAdornment }
export type { InputProps, InputAdornmentProps }
