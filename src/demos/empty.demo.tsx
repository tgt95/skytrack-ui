import { MagnifyingGlassIcon, PlusIcon, CrosshairIcon } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Empty, EmptyContent, EmptyDescription, EmptyMedia, EmptyTitle } from '@/components/ui/empty'
import type { DemoMeta } from '@/showcase/demo'

const SIZES = [
  { size: 'sm', label: 'Small' },
  { size: 'default', label: 'Default' },
  { size: 'lg', label: 'Large' }
] as const

export const demo: DemoMeta = {
  id: 'empty',
  title: 'Empty',
  description: 'A placeholder for a region with no records, results, or content, with optional media and actions.',
  group: 'Data Display',
  variants: [
    {
      name: 'With actions',
      render: () => (
        <Empty className='mx-auto max-w-md'>
          <EmptyMedia />
          <EmptyTitle>No missions scheduled</EmptyTitle>
          <EmptyDescription>Create a mission or import an existing flight plan to start planning.</EmptyDescription>
          <EmptyContent>
            <Button size='sm'>
              <PlusIcon /> New mission
            </Button>
            <Button size='sm' variant='outline'>
              Import flight plan
            </Button>
          </EmptyContent>
        </Empty>
      )
    },
    {
      name: 'Simple',
      render: () => (
        <Empty variant='simple' size='sm' className='mx-auto max-w-sm'>
          <EmptyMedia />
          <EmptyTitle>No unread alerts</EmptyTitle>
          <EmptyDescription>New alerts appear here as soon as a mission reports one.</EmptyDescription>
        </Empty>
      )
    },
    {
      name: 'Custom media',
      render: () => (
        <Empty className='mx-auto max-w-md'>
          <EmptyMedia>
            <CrosshairIcon weight='duotone' aria-hidden='true' className='size-12 text-muted-foreground' />
          </EmptyMedia>
          <EmptyTitle>No tracking data</EmptyTitle>
          <EmptyDescription>Connect a ground station to see live positions for this mission.</EmptyDescription>
          <EmptyContent>
            <Button size='sm' variant='outline'>
              Manage connections
            </Button>
          </EmptyContent>
        </Empty>
      )
    },
    {
      name: 'Sizes',
      render: () => (
        <div className='grid w-full grid-cols-1 gap-4 sm:grid-cols-3'>
          {SIZES.map(({ size, label }) => (
            <div key={size} className='flex flex-col gap-2 border border-border p-3'>
              <span className='text-xs sub-heading'>{label}</span>
              <Empty size={size} variant='simple'>
                <EmptyMedia />
                <EmptyTitle>No waypoints</EmptyTitle>
                <EmptyDescription>Add a waypoint to build the route.</EmptyDescription>
              </Empty>
            </div>
          ))}
        </div>
      )
    },
    {
      name: 'Inline in panel',
      render: () => (
        <div className='w-full max-w-xl border border-border'>
          <div className='flex items-center justify-between gap-3 border-border border-b p-3'>
            <span className='text-xs sub-heading'>Search results</span>
            <Button size='xs' variant='ghost'>
              Clear search
            </Button>
          </div>
          <Empty size='sm' className='py-10'>
            <EmptyMedia>
              <MagnifyingGlassIcon aria-hidden='true' className='size-5 text-muted-foreground' />
            </EmptyMedia>
            <EmptyTitle>No matches for “KAJ”</EmptyTitle>
            <EmptyDescription>Check the identifier or search by mission name instead.</EmptyDescription>
          </Empty>
        </div>
      )
    }
  ]
}
