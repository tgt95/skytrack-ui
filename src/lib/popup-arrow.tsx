import * as React from 'react'

/** Shared border-aware arrow used by popup surfaces with the same geometry. */
export function PopupArrowGlyph(props: React.ComponentProps<'svg'>) {
  return (
    <svg width='20' height='10' viewBox='0 0 20 10' fill='none' aria-hidden='true' focusable='false' {...props}>
      <path d='M1 9 L10 1 L19 9 Z' fill='currentColor' stroke='none' className='text-popover' />
      <path
        d='M1 9 L10 1 L19 9'
        fill='none'
        stroke='currentColor'
        strokeWidth={1}
        strokeLinejoin='round'
        strokeLinecap='round'
        className='text-border'
      />
    </svg>
  )
}
