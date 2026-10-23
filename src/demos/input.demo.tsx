import { Input } from '@/components/ui/input'
import { ApplePodcastsLogoIcon } from '@phosphor-icons/react'
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
        <label className='flex flex-col items-start gap-1 text-sm font-medium text-foreground'>
          Name
          <Input placeholder='e.g. Colm Tuite' className='w-40' />
        </label>
      )
    },
    {
      name: 'States',
      render: () => (
        <>
          <Input className='w-40' placeholder='Default' />
          <Input className='w-40' placeholder='Filled' defaultValue='Filled' />
          <Input className='w-40' placeholder='Disabled' disabled />
          <Input className='w-40' placeholder='Invalid' defaultValue='nope' />
        </>
      )
    },
    {
      name: 'Types',
      render: () => (
        <>
          <Input type='email' placeholder='Email' className='w-40' />
          <Input type='password' placeholder='Password' className='w-40' />
          <Input type='number' placeholder='Quantity' className='w-40' />
          <Input type='date' className='w-40' />
        </>
      )
    },
    {
      name: 'Adornment',
      render: () => (
        <>
          <Input startAdornment={<span>$</span>} placeholder='Prefix' className='w-40' />
          <Input endAdornment={<span>VNĐ</span>} placeholder='Suffix' className='w-40' />
          <Input startAdornment={<ApplePodcastsLogoIcon />} placeholder='With Icon' className='w-40' />
        </>
      )
    }
  ]
}
