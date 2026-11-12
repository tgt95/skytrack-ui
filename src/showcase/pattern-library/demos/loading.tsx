import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Progress, ProgressIndicator, ProgressLabel, ProgressTrack, ProgressValue } from '@/components/ui/progress'
import { SAMPLE_ITEMS, DemoFrame, UseCaseSection } from './shared'

export function LoadingDemo() {
  const [progress, setProgress] = useState(0)
  const [loading, setLoading] = useState(false)
  const [inlineStatus, setInlineStatus] = useState('Ready to check connection.')
  const [pageLoading, setPageLoading] = useState(false)
  const [visibleCount, setVisibleCount] = useState(2)
  return (
    <DemoFrame>
      <UseCaseSection
        title='Show measured task progress'
        scenario='A route preparation task has measurable steps, so show the percentage completed.'
      >
        <Progress value={progress}>
          <ProgressLabel>Route preparation</ProgressLabel>
          <ProgressValue />
          <ProgressTrack>
            <ProgressIndicator />
          </ProgressTrack>
        </Progress>
        <Button size='sm' onClick={() => setProgress((current) => (current >= 100 ? 0 : Math.min(100, current + 25)))}>
          {progress >= 100 ? 'Start again' : 'Advance · 25%'}
        </Button>
      </UseCaseSection>
      <UseCaseSection
        title='Keep an inline check responsive'
        scenario='Aircraft connection duration is unknown, so indicate activity beside the rest of the page.'
      >
        <div aria-busy={loading} className='space-y-3'>
          {loading ? (
            <Progress value={null}>
              <ProgressLabel>Checking aircraft connection</ProgressLabel>
              <ProgressTrack>
                <ProgressIndicator />
              </ProgressTrack>
            </Progress>
          ) : (
            <p role='status' className='text-muted-foreground'>
              {inlineStatus}
            </p>
          )}
          <div className='flex flex-wrap gap-2'>
            <Button
              size='sm'
              variant='outline'
              disabled={loading}
              onClick={() => {
                setInlineStatus('')
                setLoading(true)
              }}
            >
              Check aircraft connection
            </Button>
            {loading && (
              <>
                <Button size='sm' variant='outline' disabled>
                  Cancel check
                </Button>
                <Button
                  size='sm'
                  onClick={() => {
                    setLoading(false)
                    setInlineStatus('Connection check completed in this sample.')
                  }}
                >
                  Complete sample check
                </Button>
              </>
            )}
          </div>
        </div>
      </UseCaseSection>
      <UseCaseSection
        title='Block the page while a save completes'
        scenario='Use page-level busy feedback only when the user cannot continue elsewhere during a mission configuration save.'
      >
        <div aria-busy={pageLoading} className='relative min-h-24 border border-border p-4'>
          <p className='font-medium'>Mission configuration</p>
          <p className='text-muted-foreground'>Route and aircraft assignments</p>
          {pageLoading && (
            <div className='absolute inset-0 grid place-items-center bg-background/90'>
              <Progress value={null} className='w-56'>
                <ProgressLabel>Saving configuration</ProgressLabel>
                <ProgressTrack>
                  <ProgressIndicator />
                </ProgressTrack>
              </Progress>
            </div>
          )}
        </div>
        <Button size='sm' variant='outline' onClick={() => setPageLoading((current) => !current)}>
          {pageLoading ? 'Finish save' : 'Preview page-level loading'}
        </Button>
        <p className='text-sm text-muted-foreground'>
          Demo control only: a real blocking save would also prevent interaction with the rest of the page.
        </p>
      </UseCaseSection>
      <UseCaseSection
        title='Load a collection in batches'
        scenario='Show an initial set of missions, then let the user request more when ready.'
      >
        <ul className='divide-y divide-border border-y border-border'>
          {SAMPLE_ITEMS.slice(0, visibleCount).map((item) => (
            <li key={item.name} className='py-2'>
              {item.name}
            </li>
          ))}
        </ul>
        {visibleCount < SAMPLE_ITEMS.length ? (
          <Button size='sm' variant='outline' onClick={() => setVisibleCount(SAMPLE_ITEMS.length)}>
            Load next sample batch
          </Button>
        ) : (
          <p role='status' className='text-muted-foreground'>
            All sample items revealed.
          </p>
        )}
        <p className='text-sm text-muted-foreground'>
          This sample reveals the next records immediately; it does not fetch data or simulate a network delay.
        </p>
      </UseCaseSection>
      <UseCaseSection
        title='Reserve the shape of a list while its first data loads'
        scenario='When the page structure is known but its records are not, use a restrained placeholder to reduce layout shift.'
      >
        <div
          aria-label='Illustrative loading skeleton for flight plans'
          aria-busy='true'
          className='max-w-xl space-y-3'
          role='region'
        >
          {[1, 2, 3].map((row) => (
            <div key={row} className='flex items-center gap-3 border-b border-border py-3'>
              <span aria-hidden='true' className='size-8 animate-pulse rounded-(--radius) bg-muted' />
              <span aria-hidden='true' className='h-4 flex-1 animate-pulse rounded-(--radius) bg-muted' />
              <span aria-hidden='true' className='h-4 w-20 animate-pulse rounded-(--radius) bg-muted' />
            </div>
          ))}
        </div>
        <p className='text-muted-foreground'>
          Local illustration: this library does not ship a Skeleton component; mark the containing region busy while it
          loads.
        </p>
      </UseCaseSection>
      <p className='text-muted-foreground'>
        Examples are local illustrations. The library has no Skeleton component; this demo uses its supported Progress
        composition.
      </p>
    </DemoFrame>
  )
}
