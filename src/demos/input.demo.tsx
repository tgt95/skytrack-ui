import { Input } from '@/components/ui/input'
import { FieldRoot, FieldLabel } from '@/components/ui/field'
import { ApplePodcastsLogoIcon } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import type { DemoMeta } from '@/showcase/demo'

export const demo: DemoMeta = {
  id: 'input',
  title: 'Input',
  description: 'A native input element that automatically works with Field.',
  group: 'Forms',
  variants: [
    {
      name: 'Default',
      render: () => (
        <FieldRoot className='w-40'>
          <FieldLabel>Name</FieldLabel>
          <Input placeholder='e.g. Colm Tuite' className='w-40' />
        </FieldRoot>
      )
    },
    {
      name: 'States',
      render: () => (
        <>
          <Input className='w-40' placeholder='Default' aria-label='Default input' />
          <Input className='w-40' placeholder='Filled' defaultValue='Filled' aria-label='Filled input' />
          <Input className='w-40' placeholder='Disabled' aria-label='Disabled input' disabled />
          <Input className='w-40' placeholder='Invalid' defaultValue='nope' aria-label='Invalid input' />
        </>
      )
    },
    {
      name: 'Sizes',
      render: () => (
        <>
          {(['xs', 'sm', 'default', 'lg'] as const).map((size) => (
            <div key={size} className='flex items-center gap-2'>
              <Button size={size}>{size}</Button>
              <Input size={size} className='w-40' aria-label={`${size} input`} placeholder='Input' />
            </div>
          ))}
        </>
      )
    },
    {
      name: 'Types',
      render: () => (
        <>
          <Input type='email' placeholder='Email' aria-label='Email' className='w-40' />
          <Input type='password' placeholder='Password' aria-label='Password' className='w-40' />
          <Input type='number' placeholder='Quantity' aria-label='Quantity' className='w-40' />
          <Input type='date' aria-label='Date' className='w-40' />
        </>
      )
    },
    {
      name: 'Adornment',
      render: () => (
        <>
          <Input
            startAdornment={<span>$</span>}
            placeholder='Prefix'
            aria-label='Amount with prefix'
            className='w-40'
          />
          <Input
            endAdornment={<span>VNĐ</span>}
            placeholder='Suffix'
            aria-label='Amount with suffix'
            className='w-40'
          />
          <Input
            startAdornment={<ApplePodcastsLogoIcon />}
            placeholder='With Icon'
            aria-label='Input with icon'
            className='w-40'
          />
        </>
      )
    }
  ]
}
