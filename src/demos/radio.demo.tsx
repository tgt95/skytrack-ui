import { useId, useState } from 'react'
import { RadioRoot, RadioGroup } from '@/components/ui/radio'
import { FieldRoot, FieldLabel, FieldItem } from '@/components/ui/field'
import { FieldsetRoot, FieldsetLegend } from '@/components/ui/fieldset'
import { Form } from '@/components/ui/form'
import type { DemoMeta } from '@/showcase/demo'

function BasicRadioGroup() {
  const id = useId()
  return (
    <FieldRoot className='w-full gap-2'>
      <FieldLabel nativeLabel={false} render={<div />} id={id} className='font-semibold'>
        Best apple
      </FieldLabel>
      <RadioGroup aria-labelledby={id} defaultValue='fuji-apple'>
        <FieldItem>
          <FieldLabel className='flex items-center gap-2 font-normal'>
            <RadioRoot value='fuji-apple' />
            Fuji
          </FieldLabel>
        </FieldItem>
        <FieldItem>
          <FieldLabel className='flex items-center gap-2 font-normal'>
            <RadioRoot value='gala-apple' />
            Gala
          </FieldLabel>
        </FieldItem>
        <FieldItem>
          <FieldLabel className='flex items-center gap-2 font-normal'>
            <RadioRoot value='granny-smith-apple' />
            Granny Smith
          </FieldLabel>
        </FieldItem>
      </RadioGroup>
    </FieldRoot>
  )
}

function ControlledRadioGroup() {
  const id = useId()
  const [value, setValue] = useState('ssd')

  return (
    <FieldRoot className='w-full gap-2'>
      <FieldLabel nativeLabel={false} render={<div />} id={id} className='font-semibold'>
        Storage type
      </FieldLabel>
      <RadioGroup aria-labelledby={id} value={value} onValueChange={(next) => setValue(String(next))}>
        <FieldItem>
          <FieldLabel className='flex items-center gap-2 font-normal'>
            <RadioRoot value='ssd' />
            SSD
          </FieldLabel>
        </FieldItem>
        <FieldItem>
          <FieldLabel className='flex items-center gap-2 font-normal'>
            <RadioRoot value='hdd' />
            HDD
          </FieldLabel>
        </FieldItem>
      </RadioGroup>
      <p className='text-sm text-muted-foreground'>Selected: {value}</p>
    </FieldRoot>
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
        <FieldRoot className='w-full gap-2'>
          <FieldLabel nativeLabel={false} render={<div />} id='storage-type-label' className='font-semibold'>
            Storage type
          </FieldLabel>
          <RadioGroup aria-labelledby='storage-type-label' defaultValue='ssd'>
            <FieldItem>
              <FieldLabel className='flex items-center gap-2 font-normal'>
                <RadioRoot value='ssd' />
                SSD
              </FieldLabel>
            </FieldItem>
            <FieldItem>
              <FieldLabel className='flex items-center gap-2 font-normal'>
                <RadioRoot value='hdd' />
                HDD
              </FieldLabel>
            </FieldItem>
          </RadioGroup>
        </FieldRoot>
      )
    },
    {
      name: 'Rendering as a native button',
      render: () => (
        <FieldRoot className='w-full gap-2'>
          <FieldLabel nativeLabel={false} render={<div />} id='storage-type' className='font-semibold'>
            Storage type
          </FieldLabel>
          <RadioGroup defaultValue='ssd' aria-labelledby='storage-type'>
            <FieldItem>
              <FieldLabel nativeLabel={false} render={<span />}>
                SSD
              </FieldLabel>
              <RadioRoot value='ssd' id='storage-type-ssd' nativeButton render={<button />} />
            </FieldItem>
            <FieldItem>
              <FieldLabel nativeLabel={false} render={<span />}>
                HDD
              </FieldLabel>
              <RadioRoot value='hdd' id='storage-type-hdd' nativeButton render={<button />} />
            </FieldItem>
          </RadioGroup>
        </FieldRoot>
      )
    },
    {
      name: 'Render callback',
      render: () => (
        <FieldRoot className='w-full gap-2'>
          <FieldLabel nativeLabel={false} render={<div />} id='storage-type-cb' className='font-semibold'>
            Storage type
          </FieldLabel>
          <RadioGroup defaultValue='ssd' aria-labelledby='storage-type-cb'>
            <FieldItem>
              <RadioRoot value='ssd' nativeButton render={(buttonProps) => <button {...buttonProps} />} />
              <FieldLabel nativeLabel={false} render={<span />} className='font-normal'>
                SSD
              </FieldLabel>
            </FieldItem>
            <FieldItem>
              <RadioRoot value='hdd' nativeButton render={(buttonProps) => <button {...buttonProps} />} />
              <FieldLabel nativeLabel={false} render={<span />} className='font-normal'>
                HDD
              </FieldLabel>
            </FieldItem>
          </RadioGroup>
        </FieldRoot>
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
          <FieldRoot className='w-full'>
            <RadioGroup aria-label='Disabled group' disabled defaultValue='ssd'>
              <FieldItem>
                <FieldLabel className='flex items-center gap-2 font-normal'>
                  <RadioRoot value='ssd' />
                  SSD
                </FieldLabel>
              </FieldItem>
              <FieldItem>
                <FieldLabel className='flex items-center gap-2 font-normal'>
                  <RadioRoot value='hdd' />
                  HDD
                </FieldLabel>
              </FieldItem>
            </RadioGroup>
          </FieldRoot>
          <FieldRoot className='w-full'>
            <RadioGroup aria-label='Read-only group' readOnly defaultValue='ssd'>
              <FieldItem>
                <FieldLabel className='flex items-center gap-2 font-normal'>
                  <RadioRoot value='ssd' />
                  SSD
                </FieldLabel>
              </FieldItem>
              <FieldItem>
                <FieldLabel className='flex items-center gap-2 font-normal'>
                  <RadioRoot value='hdd' />
                  HDD
                </FieldLabel>
              </FieldItem>
            </RadioGroup>
          </FieldRoot>
        </>
      )
    }
  ]
}
