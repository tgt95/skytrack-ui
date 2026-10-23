import { useId, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  NumberField,
  NumberFieldGroup,
  NumberFieldInput,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldScrubArea,
  NumberFieldScrubAreaCursor
} from '@/components/ui/number-field'
import type { DemoMeta } from '@/showcase/demo'

function BasicNumberField() {
  const id = useId()
  return (
    <NumberField id={id} defaultValue={100}>
      <NumberFieldScrubArea className='flex items-center gap-1'>
        <label htmlFor={id} className='cursor-ew-resize text-sm font-medium'>
          Amount
        </label>
        <NumberFieldScrubAreaCursor>
          <ArrowsHorizontal />
        </NumberFieldScrubAreaCursor>
      </NumberFieldScrubArea>
      <NumberFieldGroup>
        <NumberFieldDecrement aria-label='Decrease amount' />
        <NumberFieldInput aria-label='Amount' />
        <NumberFieldIncrement aria-label='Increase amount' />
      </NumberFieldGroup>
    </NumberField>
  )
}

function ArrowsHorizontal() {
  return (
    <svg width='14' height='10' viewBox='0 0 24 14' fill='currentColor' aria-hidden style={{ display: 'block' }}>
      <path d='M19.5 5.5L6.49737 5.51844V2L1 6.9999L6.5 12L6.49737 8.5L19.5 8.5V12L25 6.9999L19.5 2V5.5Z' />
    </svg>
  )
}

function ControlledNumberField() {
  const [value, setValue] = useState<number | null>(5)
  return (
    <div className='flex flex-col gap-2'>
      <NumberField value={value} onValueChange={(next) => setValue(next)} min={0} max={10}>
        <NumberFieldScrubArea className='flex items-center gap-1'>
          <span className='text-sm font-medium'>Seats</span>
          <NumberFieldScrubAreaCursor>
            <ArrowsHorizontal />
          </NumberFieldScrubAreaCursor>
        </NumberFieldScrubArea>
        <NumberFieldGroup>
          <NumberFieldDecrement aria-label='Decrease seats' />
          <NumberFieldInput aria-label='Seats' />
          <NumberFieldIncrement aria-label='Increase seats' />
        </NumberFieldGroup>
      </NumberField>
      <p className='m-0 text-sm text-muted-foreground'>Controlled value: {value === null ? 'empty' : value}</p>
    </div>
  )
}

function SteppedNumberField() {
  const id = useId()
  return (
    <NumberField id={id} defaultValue={400} min={100} max={900} step={100} largeStep={200}>
      <label htmlFor={id} className='text-sm font-medium'>
        Playback speed
      </label>
      <NumberFieldGroup>
        <NumberFieldDecrement aria-label='Decrease playback speed' />
        <NumberFieldInput aria-label='Playback speed' className='w-24 text-center' />
        <NumberFieldIncrement aria-label='Increase playback speed' />
      </NumberFieldGroup>
    </NumberField>
  )
}

function CompactNumberField() {
  return (
    <NumberField defaultValue={12.5} min={0} max={100} step={0.5} className='w-24'>
      <NumberFieldInput size='compact' aria-label='Compact value' />
    </NumberField>
  )
}

function XsNumberField() {
  return (
    <NumberField defaultValue={12.5} min={0} max={100} step={0.5} className='w-24'>
      <NumberFieldInput size='xs' aria-label='Extra small value' />
    </NumberField>
  )
}

function FormNumberField() {
  const id = useId()
  return (
    <form
      className='flex flex-col gap-2'
      onSubmit={(event) => {
        event.preventDefault()
      }}
    >
      <NumberField id={id} name='amount' defaultValue={42} required>
        <label htmlFor={id} className='text-sm font-medium'>
          Amount
        </label>
        <NumberFieldGroup>
          <NumberFieldDecrement aria-label='Decrease amount' />
          <NumberFieldInput aria-label='Amount' />
          <NumberFieldIncrement aria-label='Increase amount' />
        </NumberFieldGroup>
      </NumberField>
      <Button type='submit' variant='outline'>
        Submit
      </Button>
    </form>
  )
}

export const demo: DemoMeta = {
  id: 'number-field',
  title: 'Number Field',
  description: 'A numeric input with increment and decrement controls.',
  group: 'Forms',
  variants: [
    { name: 'Demo', render: () => <BasicNumberField /> },
    { name: 'Controlled', render: () => <ControlledNumberField /> },
    { name: 'Min, max and step', render: () => <SteppedNumberField /> },
    { name: 'Compact inline', render: () => <CompactNumberField /> },
    { name: 'XS inline', render: () => <XsNumberField /> },
    {
      name: 'Disabled',
      render: () => (
        <NumberField defaultValue={100} disabled>
          <span className='text-sm font-medium'>Amount</span>
          <NumberFieldGroup>
            <NumberFieldDecrement aria-label='Decrease amount' />
            <NumberFieldInput aria-label='Amount' />
            <NumberFieldIncrement aria-label='Increase amount' />
          </NumberFieldGroup>
        </NumberField>
      )
    },
    {
      name: 'Read only',
      render: () => (
        <NumberField defaultValue={100} readOnly>
          <span className='text-sm font-medium'>Amount</span>
          <NumberFieldGroup>
            <NumberFieldDecrement aria-label='Decrease amount' />
            <NumberFieldInput aria-label='Amount' />
            <NumberFieldIncrement aria-label='Increase amount' />
          </NumberFieldGroup>
        </NumberField>
      )
    },
    { name: 'Form integration', render: () => <FormNumberField /> }
  ]
}
