import * as React from 'react'
import { MagnifyingGlassIcon, XIcon } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Input, type InputProps } from '@/components/ui/input'
import { cn } from '@/lib/utils'

export type SearchProps = Omit<InputProps, 'type' | 'startAdornment' | 'endAdornment' | 'value' | 'defaultValue'> & {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  onClear?: () => void
  appearance?: 'default' | 'fluid'
}

function Search({
  value: valueProp,
  defaultValue = '',
  onValueChange,
  onClear,
  appearance = 'default',
  disabled,
  className,
  onChange,
  ...props
}: SearchProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue)
  const isControlled = valueProp !== undefined
  const value = isControlled ? valueProp : internalValue

  const setValue = (nextValue: string) => {
    if (!isControlled) setInternalValue(nextValue)
    onValueChange?.(nextValue)
  }

  return (
    <Input
      {...props}
      type='text'
      role='searchbox'
      disabled={disabled}
      data-appearance={appearance}
      value={value}
      onChange={(event) => {
        onChange?.(event)
        setValue(event.currentTarget.value)
      }}
      startAdornment={<MagnifyingGlassIcon aria-hidden='true' />}
      endAdornment={
        value ? (
          <Button
            type='button'
            variant='ghost'
            size='icon-xs'
            disabled={disabled}
            aria-label='Clear search'
            onClick={() => {
              setValue('')
              onClear?.()
            }}
          >
            <XIcon aria-hidden='true' />
          </Button>
        ) : undefined
      }
      className={cn('w-full', appearance === 'fluid' && 'min-h-16 items-start bg-muted/30 py-2', className)}
    />
  )
}

export { Search }
