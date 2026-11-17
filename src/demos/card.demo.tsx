import { ExportIcon } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardHeading,
  CardTitle,
  CardToolbar
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { DemoMeta } from '@/showcase/demo'

function CardExample({ size }: { size: 'sm' | 'md' | 'lg' }) {
  const titleId = `card-title-${size}`
  return (
    <Card size={size} aria-labelledby={titleId} className='w-full max-w-xl'>
      <CardHeader>
        <CardHeading>
          <CardTitle id={titleId}>Mission result</CardTitle>
          <CardToolbar aria-label='Mission actions'>
            <Button size={size === 'lg' ? 'lg' : 'sm'} variant='outline'>
              <ExportIcon />
              Export
            </Button>
            <Button size={size === 'lg' ? 'lg' : 'sm'} variant='ghost'>
              More
            </Button>
          </CardToolbar>
        </CardHeading>
        <CardDescription>Latest completed mission summary</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='flex flex-wrap items-center gap-3'>
          <Badge count='Succeeded' status='success' />
          <span>Run duration: 18 min</span>
        </div>
      </CardContent>
      <CardFooter className='border-t border-border pt-3'>
        <span className='text-sm text-muted-foreground'>Updated 4 minutes ago</span>
      </CardFooter>
    </Card>
  )
}

function FixedHeaderExample() {
  return (
    <div className='grid w-full gap-4 lg:grid-cols-2'>
      <Card aria-labelledby='card-short-title'>
        <CardHeader>
          <CardHeading>
            <CardTitle id='card-short-title'>Overview</CardTitle>
            <CardToolbar>
              <Button size='sm' variant='outline'>
                Edit
              </Button>
            </CardToolbar>
          </CardHeading>
          <CardDescription>Short description</CardDescription>
        </CardHeader>
        <CardContent>Header stays aligned with the neighboring card.</CardContent>
      </Card>
      <Card aria-labelledby='card-long-title'>
        <CardHeader>
          <CardHeading>
            <CardTitle id='card-long-title'>Long mission insight title that stays on one line</CardTitle>
            <CardToolbar>
              <Button size='sm' variant='outline'>
                Open
              </Button>
            </CardToolbar>
          </CardHeading>
          <CardDescription>Long descriptions clamp below the title row</CardDescription>
        </CardHeader>
        <CardContent>Title and toolbar remain aligned.</CardContent>
      </Card>
    </div>
  )
}

export const demo: DemoMeta = {
  id: 'card',
  title: 'Card',
  description: 'Reusable content surface with a consistent title, description, toolbar, and size-based padding.',
  group: 'Layout',
  variants: [
    { name: 'Default', render: () => <CardExample size='md' /> },
    {
      name: 'Sizes',
      render: () => (
        <div className='grid w-full gap-4 xl:grid-cols-3'>
          <CardExample size='sm' />
          <CardExample size='md' />
          <CardExample size='lg' />
        </div>
      )
    },
    { name: 'Fixed header alignment', render: () => <FixedHeaderExample /> }
  ]
}
