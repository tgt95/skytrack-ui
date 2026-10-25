import { HeartIcon, TextBIcon, TextItalicIcon } from '@phosphor-icons/react'
import { Toggle } from '@/components/ui/toggle'
import type { DemoMeta } from '@/showcase/demo'

export const demo: DemoMeta = {
  id: 'toggle',
  title: 'Toggle',
  description:
    'A high-quality, unstyled React toggle component that displays a two-state button that can be on or off.',
  group: 'Actions',
  variants: [
    {
      name: 'Default',
      render: () => (
        <Toggle aria-label='Favorite' defaultPressed>
          <HeartIcon weight='fill' />
        </Toggle>
      )
    },
    {
      name: 'Outline',
      render: () => (
        <Toggle aria-label='Favorite' variant='outline' defaultPressed>
          <HeartIcon weight='fill' />
        </Toggle>
      )
    },
    {
      name: 'Sizes',
      render: () => (
        <div className='flex items-center gap-2'>
          <Toggle aria-label='Favorite' size='sm' defaultPressed>
            <HeartIcon weight='fill' />
          </Toggle>
          <Toggle aria-label='Favorite' defaultPressed>
            <HeartIcon weight='fill' />
          </Toggle>
          <Toggle aria-label='Favorite' size='lg' defaultPressed>
            <HeartIcon weight='fill' />
          </Toggle>
        </div>
      )
    },
    {
      name: 'With text',
      render: () => (
        <div className='flex items-center gap-2'>
          <Toggle aria-label='Toggle bold' defaultPressed>
            <TextBIcon />
            Bold
          </Toggle>
          <Toggle aria-label='Toggle italic' variant='outline'>
            <TextItalicIcon />
            Italic
          </Toggle>
        </div>
      )
    },
    {
      name: 'Disabled',
      render: () => (
        <>
          <Toggle aria-label='Favorite' disabled>
            <HeartIcon />
          </Toggle>
          <Toggle aria-label='Favorite' disabled defaultPressed>
            <HeartIcon weight='fill' />
          </Toggle>
        </>
      )
    }
  ]
}
