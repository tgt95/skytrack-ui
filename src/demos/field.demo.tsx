import { useState } from 'react'
import {
  FieldRoot,
  FieldLabel,
  FieldControl,
  FieldDescription,
  FieldError,
  FieldValidity,
  FieldItem,
  FieldGroup
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import type { DemoMeta } from '@/showcase/demo'

function DebouncedField() {
  const [value, setValue] = useState('')

  return (
    <FieldRoot
      name='username'
      className='w-64'
      validationMode='onChange'
      validationDebounceTime={500}
      validate={(next) => {
        if (typeof next === 'string' && next.length > 0 && next.length < 3) {
          return 'Use at least 3 characters'
        }
        return undefined
      }}
    >
      <FieldLabel>Username</FieldLabel>
      <FieldControl value={value} onValueChange={(next) => setValue(next as string)} />
      <FieldError />
    </FieldRoot>
  )
}

export const demo: DemoMeta = {
  id: 'field',
  title: 'Field',
  description: 'A component that provides labeling and validation for form controls.',
  group: 'Forms',
  variants: [
    {
      name: 'Default',
      render: () => (
        <FieldRoot className='w-64'>
          <FieldLabel>Name</FieldLabel>
          <FieldControl required placeholder='Required' />
          <FieldError match='valueMissing'>Please enter your name</FieldError>
          <FieldDescription>Visible on your profile</FieldDescription>
        </FieldRoot>
      )
    },
    {
      name: 'Custom validation (onChange, debounced)',
      render: () => <DebouncedField />
    },
    {
      name: 'Validity',
      render: () => (
        <FieldRoot name='age' className='w-64'>
          <FieldLabel>Age</FieldLabel>
          <FieldControl type='number' placeholder='Enter age' />
          <FieldValidity>
            {(state) => {
              if (state.validity.valueMissing) {
                return <span className='text-muted-foreground'>An age is required.</span>
              }
              if (state.validity.rangeOverflow) {
                return <span className='text-muted-foreground'>Pick a smaller number.</span>
              }
              if (state.errors.length > 0) {
                return <span className='text-destructive'>{state.errors.join(', ')}</span>
              }
              return <span className='text-muted-foreground'>Looks good.</span>
            }}
          </FieldValidity>
        </FieldRoot>
      )
    },
    {
      name: 'Disabled',
      render: () => (
        <FieldRoot disabled className='w-64'>
          <FieldLabel>Name</FieldLabel>
          <FieldControl placeholder='Disabled' />
          <FieldDescription>Editing is not available.</FieldDescription>
        </FieldRoot>
      )
    },
    {
      name: 'Field.Item',
      render: () => (
        <FieldGroup className='w-64'>
          <FieldRoot>
            <FieldItem>
              <FieldLabel>Contact</FieldLabel>
              <FieldControl placeholder='you@example.com' />
              <span className='text-sm text-muted-foreground'>@skytrack.io</span>
            </FieldItem>
          </FieldRoot>
        </FieldGroup>
      )
    },
    {
      name: 'With Input',
      render: () => (
        <FieldRoot name='callsign' className='w-64'>
          <FieldLabel>Callsign</FieldLabel>
          <Input placeholder='e.g. SkyTrack One' />
          <FieldDescription>Shown on shared reports.</FieldDescription>
        </FieldRoot>
      )
    }
  ]
}
