import { useState } from 'react'
import { Alert, AlertAction, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Collapsible, CollapsiblePanel, CollapsibleTrigger } from '@/components/ui/collapsible'
import { DemoFrame, UseCaseSection } from './shared'

export function InAppLearningDemo() {
  const [welcomeState, setWelcomeState] = useState<'welcome' | 'dismissed' | 'started' | 'completed'>('welcome')
  const [completedSteps, setCompletedSteps] = useState<string[]>([])
  const [tipsCompleted, setTipsCompleted] = useState(false)
  const [updatesVisible, setUpdatesVisible] = useState(true)
  const steps = ['Open a sample mission', 'Review the detail layout', 'Return to the mission list']

  return (
    <DemoFrame>
      <UseCaseSection
        title='Welcome a first-time user'
        scenario='Orient a new workspace member with a short welcome and one clear way to begin or dismiss the introduction.'
      >
        {welcomeState === 'welcome' ? (
          <Alert>
            <AlertTitle>Welcome to Mission planning</AlertTitle>
            <AlertDescription>Learn where to find missions, saved views, and workspace help.</AlertDescription>
            <AlertAction>
              <Button size='sm' onClick={() => setWelcomeState('started')}>
                Get started
              </Button>
              <Button size='sm' variant='outline' onClick={() => setWelcomeState('dismissed')}>
                Dismiss intro
              </Button>
            </AlertAction>
          </Alert>
        ) : welcomeState === 'started' ? (
          <Alert variant='info'>
            <AlertTitle>Getting started · step 1 of 3</AlertTitle>
            <AlertDescription>Open the Missions workspace to find and review a flight plan.</AlertDescription>
            <AlertAction>
              <Button size='sm' onClick={() => setWelcomeState('completed')}>
                Continue setup
              </Button>
              <Button size='sm' variant='outline' onClick={() => setWelcomeState('welcome')}>
                Back to welcome
              </Button>
            </AlertAction>
          </Alert>
        ) : (
          <Alert variant='success'>
            <AlertTitle>{welcomeState === 'dismissed' ? 'Introduction dismissed' : 'Setup guide complete'}</AlertTitle>
            <AlertDescription>You can revisit the guide from Workspace help.</AlertDescription>
            <AlertAction>
              <Button size='sm' variant='outline' onClick={() => setWelcomeState('welcome')}>
                Show welcome
              </Button>
            </AlertAction>
          </Alert>
        )}
      </UseCaseSection>

      <UseCaseSection
        title='Help users get started with a short checklist'
        scenario='Break an unfamiliar task into visible first steps and show progress as each item is completed.'
      >
        <p aria-live='polite' className='text-muted-foreground'>
          {completedSteps.length} of {steps.length} steps complete
        </p>
        <ul className='space-y-2'>
          {steps.map((step) => {
            const complete = completedSteps.includes(step)
            return (
              <li key={step} className='flex flex-wrap items-center justify-between gap-3 border-b border-border py-2'>
                <span>
                  {step} {complete && <Badge count='Done' status='success' />}
                </span>
                <Button
                  size='sm'
                  variant='outline'
                  aria-pressed={complete}
                  onClick={() =>
                    setCompletedSteps((current) =>
                      complete ? current.filter((item) => item !== step) : [...current, step]
                    )
                  }
                >
                  {complete ? 'Undo step' : 'Mark complete'}
                </Button>
              </li>
            )
          })}
        </ul>
      </UseCaseSection>

      <UseCaseSection
        title='Show in-context guidance beside a task'
        scenario='Offer a short explanation where a person encounters a new control, with a way to complete or reopen the tip.'
      >
        {tipsCompleted ? (
          <Alert variant='success'>
            <AlertTitle>Tip completed</AlertTitle>
            <AlertDescription>This sample tip can be revisited from the help menu.</AlertDescription>
            <AlertAction>
              <Button size='sm' variant='outline' onClick={() => setTipsCompleted(false)}>
                Reopen tip
              </Button>
            </AlertAction>
          </Alert>
        ) : (
          <Collapsible defaultOpen>
            <CollapsibleTrigger className='flex w-full items-center justify-between gap-3 border border-border px-4 py-3 text-left'>
              Mission list tip <span aria-hidden='true'>⌄</span>
            </CollapsibleTrigger>
            <CollapsiblePanel>
              <div className='space-y-3 border border-t-0 border-border px-4 py-3'>
                <p>Use the search field to find a mission by name, then open the row for its details.</p>
                <Button onClick={() => setTipsCompleted(true)}>Mark tip complete</Button>
              </div>
            </CollapsiblePanel>
          </Collapsible>
        )}
      </UseCaseSection>

      <UseCaseSection
        title='Keep global help available across the workspace'
        scenario='Place learning resources in a predictable help location instead of repeating a full introduction on every page.'
      >
        <Collapsible>
          <CollapsibleTrigger className='flex w-full items-center justify-between gap-3 border border-border px-4 py-3 text-left'>
            Workspace help and guidance <span aria-hidden='true'>⌄</span>
          </CollapsibleTrigger>
          <CollapsiblePanel>
            <ul className='list-disc space-y-1 border border-t-0 border-border px-8 py-3'>
              <li>Getting started guide</li>
              <li>Keyboard and navigation help</li>
              <li>Contact the workspace administrator</li>
            </ul>
          </CollapsiblePanel>
        </Collapsible>
      </UseCaseSection>

      <UseCaseSection
        title='Explain what changed in a product update'
        scenario='Show a concise release note that users can dismiss and find again from the help area.'
      >
        {updatesVisible ? (
          <Alert variant='info'>
            <AlertTitle>New: saved mission views</AlertTitle>
            <AlertDescription>Save a filter combination and reopen it from the mission list.</AlertDescription>
            <AlertAction>
              <Button size='sm' variant='outline' onClick={() => setUpdatesVisible(false)}>
                Dismiss update
              </Button>
            </AlertAction>
          </Alert>
        ) : (
          <Button variant='outline' onClick={() => setUpdatesVisible(true)}>
            Reopen update
          </Button>
        )}
      </UseCaseSection>

      <p className='text-muted-foreground'>
        This interaction is a local illustration; its wording and interface are not product onboarding policy.
      </p>
    </DemoFrame>
  )
}
