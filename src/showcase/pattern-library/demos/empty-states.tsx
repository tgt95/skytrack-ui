import { useState } from 'react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { FieldLabel, FieldRoot } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Progress, ProgressIndicator, ProgressLabel, ProgressTrack, ProgressValue } from '@/components/ui/progress'
import { SAMPLE_ITEMS, DemoFrame, UseCaseSection } from './shared'

export function EmptyStatesDemo() {
  const [firstPlanCreated, setFirstPlanCreated] = useState(false)
  const [guidePlanCreated, setGuidePlanCreated] = useState(false)
  const [query, setQuery] = useState('unmatched route')
  const [loadFailed, setLoadFailed] = useState(true)
  const [completedSteps, setCompletedSteps] = useState(1)
  const [showAll, setShowAll] = useState(false)
  const [onboardingDismissed, setOnboardingDismissed] = useState(false)
  const [starterContentCleared, setStarterContentCleared] = useState(false)
  const availablePlans = ['North coast survey', 'River mapping', 'Runway inspection']
  const matchingPlans = availablePlans.filter((plan) => plan.toLowerCase().includes(query.trim().toLowerCase()))

  return (
    <DemoFrame>
      <UseCaseSection
        title='No data · create the first plan'
        scenario='A new workspace has no saved flight plans, so give the dispatcher one clear starting action.'
      >
        {firstPlanCreated ? (
          <div className='space-y-3'>
            <Alert variant='success'>
              <AlertTitle>First plan created</AlertTitle>
              <AlertDescription>North coast survey is now in the sample list.</AlertDescription>
            </Alert>
            <ul className='divide-y divide-border border-y border-border' aria-label='Sample flight plans'>
              <li className='py-2'>North coast survey · Draft</li>
            </ul>
          </div>
        ) : (
          <section aria-labelledby='no-flight-plans-title' className='space-y-3 border border-dashed border-border p-6'>
            <h5 id='no-flight-plans-title' className='text-base font-medium text-(--foreground)'>
              Start your first flight plan
            </h5>
            <p className='text-muted-foreground'>Add a plan to begin organizing missions in this workspace.</p>
            <Button onClick={() => setFirstPlanCreated(true)}>Create flight plan</Button>
          </section>
        )}
      </UseCaseSection>
      <UseCaseSection
        title='No results · recover a search'
        scenario='When a search has no matches, preserve the query and make it easy to revise or clear.'
      >
        <FieldRoot>
          <FieldLabel>Search flight plans</FieldLabel>
          <Input value={query} onChange={(event) => setQuery(event.target.value)} />
        </FieldRoot>
        {query && matchingPlans.length === 0 ? (
          <Alert role='status'>
            <AlertTitle>No plans match “{query}”</AlertTitle>
            <AlertDescription>Revise your search or clear it to see all flight plans.</AlertDescription>
            <Button variant='outline' onClick={() => setQuery('')}>
              Clear search
            </Button>
          </Alert>
        ) : (
          <div role='status' className='space-y-2'>
            <p>
              {query
                ? `${matchingPlans.length} matching flight plan${matchingPlans.length === 1 ? '' : 's'}.`
                : 'Showing all flight plans.'}
            </p>
            <ul className='divide-y divide-border border-y border-border' aria-label='Matching flight plans'>
              {(query ? matchingPlans : availablePlans).map((plan) => (
                <li key={plan} className='py-2'>
                  {plan}
                </li>
              ))}
            </ul>
          </div>
        )}
      </UseCaseSection>
      <UseCaseSection
        title='Error · recover an unavailable collection'
        scenario='Explain that loading failed, say what to do next, and keep a retry action nearby.'
      >
        {loadFailed ? (
          <Alert variant='destructive'>
            <AlertTitle>Flight plans could not load</AlertTitle>
            <AlertDescription>Check your connection, then try again.</AlertDescription>
            <Button variant='outline' onClick={() => setLoadFailed(false)}>
              Retry
            </Button>
          </Alert>
        ) : (
          <Alert variant='success'>
            <AlertTitle>Flight plans loaded</AlertTitle>
            <AlertDescription>The retry recovered the sample collection.</AlertDescription>
          </Alert>
        )}
      </UseCaseSection>
      <UseCaseSection
        title='Inline documentation · explain the next step'
        scenario='Keep a concise instruction beside the empty workspace instead of sending the user away to search for help.'
      >
        <Alert variant='info'>
          <AlertTitle>Prepare your first flight plan</AlertTitle>
          <AlertDescription>
            Start with a mission name, define the route, then assign an available aircraft.
          </AlertDescription>
          <Button variant='outline' onClick={() => setGuidePlanCreated(true)}>
            Create a plan
          </Button>
          {guidePlanCreated && (
            <ul role='status' aria-live='polite' className='border-t border-border pt-2 text-sm text-muted-foreground'>
              <li>North coast survey · Draft · created from this guide</li>
            </ul>
          )}
        </Alert>
      </UseCaseSection>
      <UseCaseSection
        title='Onboarding · guide a first task'
        scenario='Show short setup steps with visible progress so a new dispatcher can continue in manageable stages.'
      >
        {onboardingDismissed ? (
          <div role='status' className='space-y-2'>
            <p>Setup guide dismissed. The workspace is ready when you want to begin.</p>
            <Button size='sm' variant='outline' onClick={() => setOnboardingDismissed(false)}>
              Show setup guide
            </Button>
          </div>
        ) : (
          <div className='space-y-3'>
            <Progress value={(completedSteps / 3) * 100}>
              <ProgressLabel>Workspace setup</ProgressLabel>
              <ProgressValue />
              <ProgressTrack>
                <ProgressIndicator />
              </ProgressTrack>
            </Progress>
            <p role='status'>{completedSteps} of 3 setup steps complete.</p>
            <ol className='list-decimal space-y-1 ps-5'>
              <li>Connect an aircraft</li>
              <li>Review the safety checklist</li>
              <li>Create a flight plan</li>
            </ol>
            <div className='flex flex-wrap gap-2'>
              <Button size='sm' onClick={() => setCompletedSteps((value) => (value >= 3 ? 1 : value + 1))}>
                {completedSteps >= 3 ? 'Restart setup' : 'Complete next step'}
              </Button>
              <Button size='sm' variant='outline' onClick={() => setOnboardingDismissed(true)}>
                Dismiss guide
              </Button>
            </div>
          </div>
        )}
      </UseCaseSection>
      <UseCaseSection
        title='Starter content · orient the user with an example'
        scenario='A sample collection can teach the structure of the workflow before real records are available.'
      >
        {starterContentCleared ? (
          <div role='status' className='space-y-2'>
            <p>Sample content cleared. No flight plans are in this example collection.</p>
            <Button size='sm' variant='outline' onClick={() => setStarterContentCleared(false)}>
              Restore sample content
            </Button>
          </div>
        ) : (
          <div className='space-y-2'>
            <ul className='divide-y divide-border border-y border-border' aria-label='Starter flight plans'>
              {SAMPLE_ITEMS.slice(0, showAll ? SAMPLE_ITEMS.length : 2).map((item) => (
                <li key={item.name} className='flex items-center justify-between gap-3 py-2'>
                  <span>{item.name}</span>
                  <Badge count={item.type} status='outline' />
                </li>
              ))}
            </ul>
            <div className='flex flex-wrap gap-2'>
              <Button size='sm' variant='outline' onClick={() => setShowAll((value) => !value)}>
                {showAll ? 'Show fewer examples' : 'Show more examples'}
              </Button>
              <Button size='sm' variant='outline' onClick={() => setStarterContentCleared(true)}>
                Clear sample content
              </Button>
            </div>
          </div>
        )}
      </UseCaseSection>
    </DemoFrame>
  )
}
