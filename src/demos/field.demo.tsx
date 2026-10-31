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
import { CheckboxRoot } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
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
        <Form className='w-64' onSubmit={(event) => event.preventDefault()}>
          <FieldRoot name='name'>
            <FieldLabel className={(state) => (state.valid === false ? 'text-destructive' : undefined)}>
              Name
            </FieldLabel>
            <FieldControl required placeholder='Required' />
            <FieldError match='valueMissing'>Please enter your name</FieldError>
            <FieldDescription>Visible on your profile</FieldDescription>
          </FieldRoot>
          <Button type='submit'>Submit</Button>
        </Form>
      )
    },
    {
      name: 'Custom validation (onChange, debounced)',
      render: () => <DebouncedField />
    },
    {
      name: 'Validity',
      render: () => (
        <FieldRoot name='age' className='w-64' validationMode='onChange'>
          <FieldLabel>Age</FieldLabel>
          <FieldControl type='number' required min={0} max={120} placeholder='Enter age' />
          <FieldValidity>
            {(state) => {
              if (state.validity.valueMissing) {
                return <span className='text-muted-foreground'>An age is required.</span>
              }
              if (state.validity.rangeOverflow) {
                return <span className='text-destructive'>Pick an age below 120.</span>
              }
              if (state.validity.rangeUnderflow) {
                return <span className='text-destructive'>Age must be 0 or higher.</span>
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
          <FieldRoot name='contactUpdates'>
            <FieldItem>
              <FieldLabel className='flex items-center gap-2 font-normal'>
                <CheckboxRoot value='email' />
                Email me product updates
              </FieldLabel>
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
