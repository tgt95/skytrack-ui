import { useState } from 'react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogClose,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogPopup,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogBackdrop,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPopup,
  DialogPortal,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { FieldError, FieldLabel, FieldRoot } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Progress, ProgressIndicator, ProgressLabel, ProgressTrack, ProgressValue } from '@/components/ui/progress'
import { DemoFrame, UseCaseSection } from './shared'

export function DialogsDemo() {
  const [routeDialogOpen, setRouteDialogOpen] = useState(false)
  const [routeName, setRouteName] = useState('')
  const [validation, setValidation] = useState(false)
  const [result, setResult] = useState('No route change has been confirmed.')
  const [nonModalResult, setNonModalResult] = useState('The mission list stays available while details are open.')
  const [decisionResult, setDecisionResult] = useState('Choose a dialog action to see its local outcome.')
  const [taskProgress, setTaskProgress] = useState(0)

  return (
    <DemoFrame>
      <UseCaseSection
        title='Modal · confirm a route change'
        scenario='Block the mission page only while the pilot reviews and confirms a consequential change.'
      >
        <p className='rounded-(--radius) border border-border p-3'>
          Current mission: North coast survey · scheduled 14:30
        </p>
        <Dialog open={routeDialogOpen} onOpenChange={setRouteDialogOpen}>
          <DialogTrigger render={<Button>Review route change</Button>} />
          <DialogPortal>
            <DialogBackdrop />
            <DialogPopup>
              <DialogHeader>
                <DialogTitle>Confirm the route change</DialogTitle>
                <DialogDescription>Check the destination before replacing the scheduled route.</DialogDescription>
              </DialogHeader>
              <FieldRoot invalid={validation && !routeName.trim()}>
                <FieldLabel>New route name</FieldLabel>
                <Input
                  value={routeName}
                  onChange={(event) => setRouteName(event.target.value)}
                  onBlur={() => setValidation(true)}
                  placeholder='Enter a route name'
                />
                <FieldError match={validation && !routeName.trim()}>Please enter a route name to continue.</FieldError>
              </FieldRoot>
              <DialogFooter>
                <DialogClose variant='outline'>Cancel</DialogClose>
                <Button
                  onClick={() => {
                    setValidation(true)
                    if (routeName.trim()) {
                      setResult('Route change confirmed locally: ' + routeName.trim())
                      setRouteDialogOpen(false)
                    }
                  }}
                >
                  Confirm route
                </Button>
              </DialogFooter>
            </DialogPopup>
          </DialogPortal>
        </Dialog>
        <p role='status' aria-live='polite' className='text-muted-foreground'>
          {result}
        </p>
      </UseCaseSection>

      <UseCaseSection
        title='Non-modal · inspect a route while keeping the page available'
        scenario='Keep the mission list interactive while the user opens supplementary details.'
      >
        <div className='flex flex-wrap items-center gap-3'>
          <Dialog modal={false}>
            <DialogTrigger render={<Button variant='outline'>Open route details</Button>} />
            <DialogPortal>
              <DialogPopup>
                <DialogHeader>
                  <DialogTitle>Route details</DialogTitle>
                  <DialogDescription>The mission page remains available while these notes are open.</DialogDescription>
                </DialogHeader>
                <p>North coast survey · 4 waypoints · last updated 10:42</p>
                <DialogFooter>
                  <DialogClose variant='outline'>Close details</DialogClose>
                </DialogFooter>
              </DialogPopup>
            </DialogPortal>
          </Dialog>
          <Button
            variant='ghost'
            onClick={() => setNonModalResult('Another mission was selected while route details stayed open.')}
          >
            Select another mission
          </Button>
        </div>
        <p role='status' aria-live='polite' className='text-sm text-muted-foreground'>
          {nonModalResult}
        </p>
      </UseCaseSection>

      <UseCaseSection
        title='Button groups · one, two, or three decisions'
        scenario='Keep only the actions needed for this decision, then give the main outcome the clearest emphasis.'
      >
        <div className='grid gap-4 md:grid-cols-3'>
          <div className='space-y-2'>
            <h5 className='text-base font-medium text-(--foreground)'>Information only</h5>
            <Dialog>
              <DialogTrigger
                render={
                  <Button size='sm' variant='outline'>
                    View notice
                  </Button>
                }
              />
              <DialogPortal>
                <DialogBackdrop />
                <DialogPopup>
                  <DialogHeader>
                    <DialogTitle>Weather check complete</DialogTitle>
                    <DialogDescription>
                      This sample shows a completed review state only; it does not define how weather should be
                      interpreted.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose onClick={() => setDecisionResult('Notice acknowledged.')}>Acknowledge</DialogClose>
                  </DialogFooter>
                </DialogPopup>
              </DialogPortal>
            </Dialog>
          </div>
          <div className='space-y-2'>
            <h5 className='text-base font-medium text-(--foreground)'>Cancel or continue</h5>
            <Dialog>
              <DialogTrigger
                render={
                  <Button size='sm' variant='outline'>
                    Review unsaved edit
                  </Button>
                }
              />
              <DialogPortal>
                <DialogBackdrop />
                <DialogPopup>
                  <DialogHeader>
                    <DialogTitle>Save route edits?</DialogTitle>
                    <DialogDescription>There are unsaved changes to the North coast survey.</DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose variant='outline' onClick={() => setDecisionResult('Unsaved route edits discarded.')}>
                      Discard
                    </DialogClose>
                    <DialogClose onClick={() => setDecisionResult('Route edits saved in this local example.')}>
                      Save changes
                    </DialogClose>
                  </DialogFooter>
                </DialogPopup>
              </DialogPortal>
            </Dialog>
          </div>
          <div className='space-y-2'>
            <h5 className='text-base font-medium text-(--foreground)'>Required response</h5>
            <AlertDialog>
              <AlertDialogTrigger
                render={
                  <Button size='sm' variant='destructive'>
                    Cancel mission setup
                  </Button>
                }
              />
              <AlertDialogPortal>
                <AlertDialogBackdrop />
                <AlertDialogPopup>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Keep, save, or leave mission setup?</AlertDialogTitle>
                    <AlertDialogDescription>Choose what to do with the unsaved route details.</AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogClose onClick={() => setDecisionResult('Mission setup remains open.')}>
                      Keep editing
                    </AlertDialogClose>
                    <AlertDialogClose onClick={() => setDecisionResult('Route draft saved in this local example.')}>
                      Save draft
                    </AlertDialogClose>
                    <AlertDialogClose
                      variant='destructive'
                      onClick={() => setDecisionResult('Mission setup left; sample details discarded.')}
                    >
                      Leave setup
                    </AlertDialogClose>
                  </AlertDialogFooter>
                </AlertDialogPopup>
              </AlertDialogPortal>
            </AlertDialog>
          </div>
        </div>
        <p role='status' aria-live='polite' className='text-sm text-muted-foreground'>
          {decisionResult}
        </p>
      </UseCaseSection>

      <UseCaseSection
        title='Show progress after confirming a longer task'
        scenario='If a confirmed route check takes time, communicate progress and completion after the dialog closes.'
      >
        {taskProgress === 0 ? (
          <Dialog>
            <DialogTrigger render={<Button>Review route check</Button>} />
            <DialogPortal>
              <DialogBackdrop />
              <DialogPopup>
                <DialogHeader>
                  <DialogTitle>Validate route permissions?</DialogTitle>
                  <DialogDescription>
                    The check may take a while. Confirm to close this dialog and follow progress on the page.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose variant='outline'>Cancel</DialogClose>
                  <DialogClose onClick={() => setTaskProgress(50)}>Start validation</DialogClose>
                </DialogFooter>
              </DialogPopup>
            </DialogPortal>
          </Dialog>
        ) : taskProgress === 100 ? (
          <Alert variant='success'>
            <AlertTitle>Route ready</AlertTitle>
            <AlertDescription>Validation finished in this local example.</AlertDescription>
          </Alert>
        ) : (
          <div className='space-y-3'>
            <Progress value={taskProgress}>
              <ProgressLabel>Validating route permissions</ProgressLabel>
              <ProgressValue />
              <ProgressTrack>
                <ProgressIndicator />
              </ProgressTrack>
            </Progress>
            <Button size='sm' onClick={() => setTaskProgress(100)}>
              Complete validation
            </Button>
          </div>
        )}
      </UseCaseSection>

      <p className='text-muted-foreground'>
        All dialogs are user-triggered local examples. No mission is changed or submitted.
      </p>
    </DemoFrame>
  )
}
