import { useState } from 'react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DemoFrame, UseCaseSection } from './shared'

export function OrderSummaryDemo() {
  const [showCapabilities, setShowCapabilities] = useState(false)
  const [detailsPreviewed, setDetailsPreviewed] = useState(false)

  return (
    <DemoFrame>
      <UseCaseSection
        title='Review a platform service summary'
        scenario='Summarize service scope and operating state so a team can decide whether it needs to inspect more detail.'
      >
        <div className='space-y-3'>
          <dl className='grid grid-cols-[minmax(0,1fr)_auto] gap-x-6 gap-y-3'>
            <dt>Workspace</dt>
            <dd className='text-right'>North Coast Operations</dd>
            <dt>Mission planning</dt>
            <dd className='text-right'>
              <Badge count='Available' status='success' />
            </dd>
            <dt>Telemetry</dt>
            <dd className='text-right'>
              <Badge count='Connected' status='success' />
            </dd>
            <dt>Storage</dt>
            <dd className='text-right'>82% used</dd>
          </dl>
          {showCapabilities && (
            <ul className='list-disc space-y-1 border-t border-border pt-3 ps-5 text-muted-foreground'>
              <li>Plan and schedule survey missions</li>
              <li>Review live aircraft telemetry</li>
              <li>Share mission records with the operations team</li>
            </ul>
          )}
          <div className='flex flex-wrap gap-2'>
            <Button variant='outline' onClick={() => setShowCapabilities((value) => !value)}>
              {showCapabilities ? 'Hide capabilities' : 'Show capabilities'}
            </Button>
            <Button onClick={() => setDetailsPreviewed(true)}>Preview service details</Button>
          </div>
          {detailsPreviewed && (
            <Alert variant='info'>
              <AlertTitle>Service details previewed in this sample</AlertTitle>
              <AlertDescription>No external service page was opened or changed.</AlertDescription>
            </Alert>
          )}
        </div>
        <p className='text-muted-foreground'>
          Local interpretation: this sample summarizes service scope and status. Previewing details only reveals this
          local confirmation; it does not open or change a service.
        </p>
      </UseCaseSection>
    </DemoFrame>
  )
}
