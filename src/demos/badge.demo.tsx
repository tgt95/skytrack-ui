import type { ReactNode } from 'react'
import { Bell } from '@phosphor-icons/react'
import { Badge } from '@/components/ui/badge'
import type { DemoMeta } from '@/showcase/demo'

function Box({ children }: { children: ReactNode }) {
  return <div className='grid size-10 place-items-center rounded-md bg-muted text-muted-foreground'>{children}</div>
}

export const demo: DemoMeta = {
  id: 'badge',
  title: 'Badge',
  description:
    'A small count, dot or status indicator. Anchor it to a child, or render it standalone as a plain status pill.',
  group: 'Data Display',
  variants: [
    {
      name: 'Basic',
      render: () => (
        <Badge count={5} status='error'>
          <Bell size={24} />
        </Badge>
      )
    },
    {
      name: 'Overflow',
      render: () => (
        <Badge count={100} status='error'>
          <Bell size={24} />
        </Badge>
      )
    },
    {
      name: 'Dot',
      render: () => (
        <Badge dot status='error'>
          <Bell size={24} />
        </Badge>
      )
    },
    {
      name: 'ShowZero',
      render: () => (
        <>
          <Badge count={0}  status='error' showZero>
            <Bell size={24} />
          </Badge>
          <Badge count={0} status='error'>
            <Bell size={24} />
          </Badge>
        </>
      )
    },
    {
      name: 'Status',
      render: () => (
        <>
          <Badge count={9} status='success'>
            <Box>
              <Bell size={20} />
            </Box>
          </Badge>
          <Badge count={9} status='processing'>
            <Box>
              <Bell size={20} />
            </Box>
          </Badge>
          <Badge count={91} status='outline'>
            <Box>
              <Bell size={20} />
            </Box>
          </Badge>
          <Badge count={9} status='error'>
            <Box>
              <Bell size={20} />
            </Box>
          </Badge>
          <Badge count={9} status='warning'>
            <Box>
              <Bell size={20} />
            </Box>
          </Badge>
        </>
      )
    },
    {
      name: 'Standalone',
      render: () => (
        <>
          <Badge count={1} status='success' />
          <Badge count={99} status='warning' />
          <Badge dot status='processing' />
        </>
      )
    },
    {
      name: 'Sizes',
      render: () => (
        <>
          <Badge count={9} size='sm'>
            <Bell size={20} />
          </Badge>
          <Badge count={9}>
            <Bell size={20} />
          </Badge>
        </>
      )
    }
  ]
}
