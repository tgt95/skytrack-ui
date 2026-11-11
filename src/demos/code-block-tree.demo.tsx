import type { DemoMeta } from '@/showcase/demo'
import { FileArrowDownIcon } from '@phosphor-icons/react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CodeBlockTree } from '@/components/ui/code-block-tree'

const missionJson = {
  mission: {
    id: 'survey-west-17',
    status: 'complete',
    route: [
      { waypoint: 'home', altitudeM: 0 },
      { waypoint: 'survey-1', altitudeM: 42 },
      { waypoint: 'survey-2', altitudeM: 42 }
    ],
    review: {
      accepted: true,
      note: 'Image coverage verified',
      emptyObject: {},
      emptyArray: []
    }
  },
  sampleCount: 0,
  missingValue: null
}

export const demo: DemoMeta = {
  id: 'code-block-tree',
  title: 'Code Block Tree',
  description:
    'Inspect nested JSON with syntax highlighting, per-node disclosure, line numbers, and custom JSX rendering.',
  group: 'Data Display',
  variants: [
    {
      name: 'Nested JSON',
      render: () => (
        <CodeBlockTree
          className='w-full max-w-3xl'
          value={missionJson}
          title='mission-report.json'
          toolbarActions={
            <Button size='sm' variant='ghost'>
              <FileArrowDownIcon aria-hidden='true' />
              Download
            </Button>
          }
        />
      )
    },
    {
      name: 'Custom JSX',
      render: () => (
        <CodeBlockTree
          className='w-full max-w-3xl'
          value={missionJson}
          title='custom-jsx-mission.json'
          renderNode={(ctx) => {
            if (ctx.key === 'status') {
              return (
                <span className='inline-flex items-center gap-1.5'>
                  <span className='text-muted-foreground'>"status":</span>
                  <Badge count={String(ctx.value)} status='success' size='sm' />
                </span>
              )
            }
            if (ctx.key === 'accepted' && ctx.value === true) {
              return (
                <span className='inline-flex items-center gap-1.5'>
                  <span className='text-muted-foreground'>"accepted":</span>
                  <Badge count='verified' status='success' size='sm' />
                </span>
              )
            }
            return ctx.defaultContent
          }}
        />
      )
    },
    {
      name: 'Line numbers hidden',
      render: () => (
        <CodeBlockTree
          className='w-full max-w-3xl'
          value={missionJson}
          title='mission-report.json'
          defaultLineNumbers={false}
        />
      )
    },
    {
      name: 'Invalid JSON',
      render: () => <CodeBlockTree className='w-full max-w-3xl' value='{"mission": ' title='broken-report.json' />
    },
    {
      name: 'Empty value',
      render: () => <CodeBlockTree className='w-full max-w-3xl' title='empty.json' />
    }
  ]
}
