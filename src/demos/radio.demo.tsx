import { useId, useState } from 'react'
import { RadioRoot, RadioGroup } from '@/components/ui/radio'
import { FieldRoot, FieldLabel, FieldItem } from '@/components/ui/field'
import { FieldsetRoot, FieldsetLegend } from '@/components/ui/fieldset'
import { Form } from '@/components/ui/form'
import type { DemoMeta } from '@/showcase/demo'

function BasicRadioGroup() {
  const id = useId()
  return (
    <RadioGroup aria-labelledby={id} defaultValue='fuji-apple'>
      <div className='text-sm font-semibold' id={id}>
        Best apple
      </div>
      <label className='flex items-center gap-2 text-sm'>
        <RadioRoot value='fuji-apple' />
        Fuji
      </label>
      <label className='flex items-center gap-2 text-sm'>
        <RadioRoot value='gala-apple' />
        Gala
      </label>
      <label className='flex items-center gap-2 text-sm'>
        <RadioRoot value='granny-smith-apple' />
        Granny Smith
      </label>
    </RadioGroup>
  )
}

function ControlledRadioGroup() {
  const id = useId()
  const [value, setValue] = useState('ssd')

  return (
    <RadioGroup aria-labelledby={id} value={value} onValueChange={(next) => setValue(String(next))}>
      <div className='text-sm font-semibold' id={id}>
        Storage type
      </div>
      <label className='flex items-center gap-2 text-sm'>
        <RadioRoot value='ssd' />
        SSD
      </label>
      <label className='flex items-center gap-2 text-sm'>
        <RadioRoot value='hdd' />
        HDD
      </label>
      <p className='text-sm text-muted-foreground'>Selected: {value}</p>
    </RadioGroup>
  )
}

export const demo: DemoMeta = {
  id: 'radio',
  title: 'Radio Group',
  description: 'Provides shared state to a series of radio buttons.',
  group: 'Forms',
  variants: [
    { name: 'Default', render: () => <BasicRadioGroup /> },
    {
      name: 'Labeling a radio group',
      render: () => (
        <>
          <div id='storage-type-label' className='text-sm font-semibold'>
            Storage type
          </div>
          <RadioGroup aria-labelledby='storage-type-label' defaultValue='ssd'>
            <label className='flex items-center gap-2 text-sm'>
              <RadioRoot value='ssd' />
              SSD
            </label>
            <label className='flex items-center gap-2 text-sm'>
              <RadioRoot value='hdd' />
              HDD
            </label>
          </RadioGroup>
        </>
      )
    },
    {
      name: 'Rendering as a native button',
      render: () => (
        <>
          <div id='storage-type' className='text-sm font-semibold'>
            Storage type
          </div>
          <RadioGroup defaultValue='ssd' aria-labelledby='storage-type'>
            <div className='flex items-center gap-2 text-sm'>
              <label htmlFor='storage-type-ssd' className='text-foreground'>
                SSD
              </label>
              <RadioRoot value='ssd' id='storage-type-ssd' nativeButton render={<button />} />
            </div>
            <div className='flex items-center gap-2 text-sm'>
              <label htmlFor='storage-type-hdd' className='text-foreground'>
                HDD
              </label>
              <RadioRoot value='hdd' id='storage-type-hdd' nativeButton render={<button />} />
            </div>
          </RadioGroup>
        </>
      )
    },
    {
      name: 'Render callback',
      render: () => (
        <>
          <div id='storage-type-cb' className='text-sm font-semibold'>
            Storage type
          </div>
          <RadioGroup defaultValue='ssd' aria-labelledby='storage-type-cb'>
            <RadioRoot
              value='ssd'
              nativeButton
              render={(buttonProps) => (
                <label className='flex items-center gap-2 text-sm text-foreground'>
                  <button {...buttonProps} />
                  SSD
                </label>
              )}
            />
            <RadioRoot
              value='hdd'
              nativeButton
              render={(buttonProps) => (
                <label className='flex items-center gap-2 text-sm text-foreground'>
                  <button {...buttonProps} />
                  HDD
                </label>
              )}
            />
          </RadioGroup>
        </>
      )
    },
    {
      name: 'Form integration',
      render: () => (
        <Form className='w-64'>
          <FieldRoot name='storageType'>
            <FieldsetRoot render={<RadioGroup />}>
              <FieldsetLegend>Storage type</FieldsetLegend>
              <FieldItem>
                <FieldLabel className='flex items-center gap-2'>
                  <RadioRoot value='ssd' />
                  SSD
                </FieldLabel>
              </FieldItem>
              <FieldItem>
                <FieldLabel className='flex items-center gap-2'>
                  <RadioRoot value='hdd' />
                  HDD
                </FieldLabel>
              </FieldItem>
            </FieldsetRoot>
          </FieldRoot>
        </Form>
      )
    },
    { name: 'Controlled', render: () => <ControlledRadioGroup /> },
    {
      name: 'Disabled and read-only',
      render: () => (
        <>
          <RadioGroup aria-label='Disabled group' disabled defaultValue='ssd'>
            <label className='flex items-center gap-2 text-sm'>
              <RadioRoot value='ssd' />
              SSD
            </label>
            <label className='flex items-center gap-2 text-sm'>
              <RadioRoot value='hdd' />
              HDD
            </label>
          </RadioGroup>
          <RadioGroup aria-label='Read-only group' readOnly defaultValue='ssd'>
            <label className='flex items-center gap-2 text-sm'>
              <RadioRoot value='ssd' />
              SSD
            </label>
            <label className='flex items-center gap-2 text-sm'>
              <RadioRoot value='hdd' />
              HDD
            </label>
          </RadioGroup>
        </>
      )
    }
  ]
}
