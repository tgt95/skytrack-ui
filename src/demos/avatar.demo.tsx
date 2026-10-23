import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import type { DemoMeta } from '@/showcase/demo'

export const demo: DemoMeta = {
  id: 'avatar',
  title: 'Avatar',
  description: 'A high-quality, unstyled React avatar component that is easy to customize.',
  group: 'Data Display',
  variants: [
    {
      name: 'Image and fallback',
      render: () => (
        <div className='flex gap-4'>
          <Avatar>
            <AvatarImage
              src='https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=128&h=128&dpr=2&q=80'
              width='48'
              height='48'
              alt=''
            />
            <AvatarFallback delay={600}>LT</AvatarFallback>
          </Avatar>
          <Avatar>LT</Avatar>
        </div>
      )
    },
    {
      name: 'Fallback only',
      render: () => (
        <div className='flex gap-4'>
          <Avatar>
            <AvatarFallback>AB</AvatarFallback>
          </Avatar>
          <Avatar className='size-12'>
            <AvatarFallback>SK</AvatarFallback>
          </Avatar>
          <Avatar className='size-6'>
            <AvatarFallback className='text-xs'>T</AvatarFallback>
          </Avatar>
        </div>
      )
    }
  ]
}
