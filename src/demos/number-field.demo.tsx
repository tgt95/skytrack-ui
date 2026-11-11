import { useId, useState } from 'react'
import { Button } from '@/components/ui/button'
import { FieldRoot, FieldLabel } from '@/components/ui/field'
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
    <FieldRoot className='w-64 items-center'>
      <NumberField id={id} defaultValue={100}>
        <NumberFieldScrubArea className='flex items-center gap-1'>
          <FieldLabel className='cursor-ew-resize'>Amount</FieldLabel>
          <NumberFieldScrubAreaCursor>
            <ArrowsHorizontalIcon />
          </NumberFieldScrubAreaCursor>
        </NumberFieldScrubArea>
        <NumberFieldGroup>
          <NumberFieldDecrement aria-label='Decrease amount' />
          <NumberFieldInput />
          <NumberFieldIncrement aria-label='Increase amount' />
        </NumberFieldGroup>
      </NumberField>
    </FieldRoot>
  )
}

function ArrowsHorizontalIcon() {
  return (
    <svg width='14' height='10' viewBox='0 0 24 14' fill='currentColor' aria-hidden style={{ display: 'block' }}>
      <path d='M19.5 5.5L6.49737 5.51844V2L1 6.9999L6.5 12L6.49737 8.5L19.5 8.5V12L25 6.9999L19.5 2V5.5Z' />
    </svg>
  )
}

function ControlledNumberField() {
  const [value, setValue] = useState<number | null>(5)
  return (
    <FieldRoot className='w-64 gap-2'>
      <NumberField value={value} onValueChange={(next) => setValue(next)} min={0} max={10}>
        <NumberFieldScrubArea className='flex items-center gap-1'>
          <FieldLabel>Seats</FieldLabel>
          <NumberFieldScrubAreaCursor>
            <ArrowsHorizontalIcon />
          </NumberFieldScrubAreaCursor>
        </NumberFieldScrubArea>
        <NumberFieldGroup>
          <NumberFieldDecrement aria-label='Decrease seats' />
          <NumberFieldInput />
          <NumberFieldIncrement aria-label='Increase seats' />
        </NumberFieldGroup>
      </NumberField>
      <p className='m-0 text-sm text-muted-foreground'>Controlled value: {value === null ? 'empty' : value}</p>
    </FieldRoot>
  )
}

function SteppedNumberField() {
  const id = useId()
  return (
    <FieldRoot className='w-64'>
      <NumberField id={id} defaultValue={400} min={100} max={900} step={100} largeStep={200}>
        <FieldLabel>Playback speed</FieldLabel>
        <NumberFieldGroup>
          <NumberFieldDecrement aria-label='Decrease playback speed' />
          <NumberFieldInput className='w-24 text-center' />
          <NumberFieldIncrement aria-label='Increase playback speed' />
        </NumberFieldGroup>
      </NumberField>
    </FieldRoot>
  )
}

function XsNumberField() {
  return (
    <div className='flex flex-col items-start gap-2'>
      <span className='text-xs text-muted-foreground'>24px · xs</span>
      <NumberField defaultValue={12.5} min={0} max={100} step={0.5} className='w-24'>
        <NumberFieldInput size='xs' aria-label='XS value' />
      </NumberField>
    </div>
  )
}

function ButtonAlignedNumberFields() {
  return (
    <>
      {(['xs', 'sm', 'default', 'lg'] as const).map((size) => (
        <div key={size} className='flex items-center gap-2'>
          <Button size={size}>{size}</Button>
          <NumberField defaultValue={12} min={0} max={100} className='w-20'>
            <NumberFieldGroup size={size}>
              <NumberFieldInput size={size} aria-label={`${size} number field`} />
            </NumberFieldGroup>
          </NumberField>
        </div>
      ))}
    </>
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
      <FieldRoot className='w-64' name='amount'>
        <NumberField id={id} defaultValue={42} required>
          <FieldLabel>Amount</FieldLabel>
          <NumberFieldGroup>
            <NumberFieldDecrement aria-label='Decrease amount' />
            <NumberFieldInput />
            <NumberFieldIncrement aria-label='Increase amount' />
          </NumberFieldGroup>
        </NumberField>
      </FieldRoot>
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
    { name: 'XS inline', render: () => <XsNumberField /> },
    { name: 'Button-aligned sizes', render: () => <ButtonAlignedNumberFields /> },
    {
      name: 'Disabled',
      render: () => (
        <FieldRoot className='w-64' disabled>
          <NumberField defaultValue={100} disabled>
            <FieldLabel>Amount</FieldLabel>
            <NumberFieldGroup>
              <NumberFieldDecrement aria-label='Decrease amount' />
              <NumberFieldInput />
              <NumberFieldIncrement aria-label='Increase amount' />
            </NumberFieldGroup>
          </NumberField>
        </FieldRoot>
      )
    },
    {
      name: 'Read only',
      render: () => (
        <FieldRoot className='w-64'>
          <NumberField defaultValue={100} readOnly>
            <FieldLabel>Amount</FieldLabel>
            <NumberFieldGroup>
              <NumberFieldDecrement aria-label='Decrease amount' />
              <NumberFieldInput />
              <NumberFieldIncrement aria-label='Increase amount' />
            </NumberFieldGroup>
          </NumberField>
        </FieldRoot>
      )
    },
    { name: 'Form integration', render: () => <FormNumberField /> }
  ]
}
