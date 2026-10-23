import { Separator } from '@/components/ui/separator'
import type { DemoMeta } from '@/showcase/demo'

const links = ['Home', 'Pricing', 'Blog', 'Support']

export const demo: DemoMeta = {
  id: 'separator',
  title: 'Separator',
  description: 'A separator element accessible to screen readers.',
  group: 'Layout',
  variants: [
    {
      name: 'Vertical',
      render: () => (
        <div className='flex items-center gap-4 text-nowrap'>
          {links.map((l) => (
            <a key={l} href='#' className='text-sm text-foreground hover:underline underline-offset-2'>
              {l}
            </a>
          ))}
          <Separator orientation='vertical' className='h-4' />
          <a href='#' className='text-sm text-foreground hover:underline underline-offset-2'>
            Log in
          </a>
          <a href='#' className='text-sm text-foreground hover:underline underline-offset-2'>
            Sign up
          </a>
        </div>
      )
    },
    {
      name: 'Horizontal',
      render: () => (
        <div className='flex w-60 flex-col gap-4 text-sm'>
          <div>SkyTrack Pro</div>
          <Separator />
          <div>Cloud analytics</div>
        </div>
      )
    }
  ]
}
