import { useState } from 'react'
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
import { FieldLabel, FieldRoot } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { DemoFrame, UseCaseSection } from './shared'

export function RemoveDemo() {
  const [highImpactOpen, setHighImpactOpen] = useState(false)
  const [mediumDeleteOpen, setMediumDeleteOpen] = useState(false)
  const [mediumRemoveOpen, setMediumRemoveOpen] = useState(false)
  const [highDeleted, setHighDeleted] = useState(false)
  const [mediumDeleted, setMediumDeleted] = useState(false)
  const [lowDeleted, setLowDeleted] = useState(false)
  const [mediumRemoved, setMediumRemoved] = useState(false)
  const [lowRemoved, setLowRemoved] = useState(false)
  const [confirmationName, setConfirmationName] = useState('')
  const [highDeleteResult, setHighDeleteResult] = useState('No deletion has been confirmed.')
  const [mediumDeleteResult, setMediumDeleteResult] = useState('No saved filter has been deleted.')
  const [lowDraftResult, setLowDraftResult] = useState('The draft remains in the sample list.')
  const [mediumRemoveResult, setMediumRemoveResult] = useState('The item remains in the team collection.')
  const [lowRemoveResult, setLowRemoveResult] = useState('The saved item remains in this sample view.')
  const resourceName = 'North coast survey'

  return (
    <DemoFrame>
      <UseCaseSection
        title='High-impact deletion · require the resource name'
        scenario='For an irreversible action with significant loss, identify the resource and require an exact name match before enabling Delete.'
      >
        <div className='flex flex-wrap items-center justify-between gap-3 border-y border-border py-3'>
          <span>{resourceName} · shared route</span>
          {highDeleted ? (
            <span className='text-muted-foreground'>
              Deleted in this sample · reload the page to restart the example.
            </span>
          ) : (
            <AlertDialog open={highImpactOpen} onOpenChange={setHighImpactOpen}>
              <AlertDialogTrigger
                render={
                  <Button variant='destructive' onClick={() => setConfirmationName('')}>
                    Delete permanently
                  </Button>
                }
              />
              <AlertDialogPortal>
                <AlertDialogBackdrop />
                <AlertDialogPopup>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete {resourceName} permanently?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This sample action represents permanent deletion and cannot be undone. Type the resource name to
                      enable Delete.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <FieldRoot>
                    <FieldLabel>Resource name</FieldLabel>
                    <Input value={confirmationName} onChange={(event) => setConfirmationName(event.target.value)} />
                  </FieldRoot>
                  <AlertDialogFooter>
                    <AlertDialogClose onClick={() => setConfirmationName('')}>Cancel</AlertDialogClose>
                    <Button
                      variant='destructive'
                      disabled={confirmationName.trim() !== resourceName}
                      onClick={() => {
                        setHighDeleteResult(`${resourceName} deleted in this local example.`)
                        setHighDeleted(true)
                        setHighImpactOpen(false)
                        setConfirmationName('')
                      }}
                    >
                      Delete
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogPopup>
              </AlertDialogPortal>
            </AlertDialog>
          )}
        </div>
        <p role='status' aria-live='polite' className='text-muted-foreground'>
          {highDeleteResult}
        </p>
      </UseCaseSection>

      <UseCaseSection
        title='Medium-impact deletion · confirm the consequence'
        scenario='For a smaller but irreversible loss, explain what will be deleted and require a deliberate confirmation.'
      >
        <div className='flex flex-wrap items-center justify-between gap-3'>
          <span>Saved filter · “Coastal survey”</span>
          {mediumDeleted ? (
            <span className='text-muted-foreground'>
              Deleted in this sample · reload the page to restart the example.
            </span>
          ) : (
            <AlertDialog open={mediumDeleteOpen} onOpenChange={setMediumDeleteOpen}>
              <AlertDialogTrigger render={<Button variant='outline'>Delete saved filter</Button>} />
              <AlertDialogPortal>
                <AlertDialogBackdrop />
                <AlertDialogPopup>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete “Coastal survey” filter?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This saved filter will be removed and cannot be restored. Mission records remain unchanged.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogClose>Cancel</AlertDialogClose>
                    <Button
                      variant='destructive'
                      onClick={() => {
                        setMediumDeleteResult(
                          'Saved filter deleted in this local example; mission records remain unchanged.'
                        )
                        setMediumDeleted(true)
                        setMediumDeleteOpen(false)
                      }}
                    >
                      Delete filter
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogPopup>
              </AlertDialogPortal>
            </AlertDialog>
          )}
        </div>
        <p role='status' aria-live='polite' className='text-muted-foreground'>
          {mediumDeleteResult}
        </p>
      </UseCaseSection>

      <UseCaseSection
        title='Low-impact deletion · undo a draft deletion'
        scenario='When deleting a low-risk draft is easy to reverse or recreate, skip the confirmation and keep an immediate Undo action beside the result.'
      >
        <div className='flex flex-wrap items-center justify-between gap-3'>
          {lowDeleted ? (
            <>
              <span>Draft deleted from the sample list.</span>
              <Button
                variant='outline'
                onClick={() => {
                  setLowDeleted(false)
                  setLowDraftResult('Draft restored to the sample list.')
                }}
              >
                Undo
              </Button>
            </>
          ) : (
            <>
              <span>{resourceName} · unsent draft</span>
              <Button
                variant='outline'
                onClick={() => {
                  setLowDeleted(true)
                  setLowDraftResult('Draft deleted from the sample list; Undo is available.')
                }}
              >
                Delete draft
              </Button>
            </>
          )}
        </div>
        <p role='status' aria-live='polite' className='text-muted-foreground'>
          {lowDraftResult}
        </p>
      </UseCaseSection>

      <UseCaseSection
        title='Medium-impact removal · preserve the original data'
        scenario='For a non-destructive but consequential unlink, explain the impact and confirm before removing access.'
      >
        <div className='flex flex-wrap items-center justify-between gap-3'>
          <span>{resourceName} · team collection</span>
          {mediumRemoved ? (
            <span className='text-muted-foreground'>
              Removed from the team collection · reload to restart this sample.
            </span>
          ) : (
            <AlertDialog open={mediumRemoveOpen} onOpenChange={setMediumRemoveOpen}>
              <AlertDialogTrigger render={<Button variant='outline'>Remove from team</Button>} />
              <AlertDialogPortal>
                <AlertDialogBackdrop />
                <AlertDialogPopup>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Remove from the team collection?</AlertDialogTitle>
                    <AlertDialogDescription>
                      The item will leave this collection, but the owner&apos;s original resource remains available.
                      This removal cannot be undone from the sample view.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogClose>Cancel</AlertDialogClose>
                    <Button
                      variant='destructive'
                      onClick={() => {
                        setMediumRemoveResult('Removed from the sample collection; the owner’s resource remains.')
                        setMediumRemoved(true)
                        setMediumRemoveOpen(false)
                      }}
                    >
                      Remove
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogPopup>
              </AlertDialogPortal>
            </AlertDialog>
          )}
        </div>
        <p role='status' aria-live='polite' className='text-muted-foreground'>
          {mediumRemoveResult}
        </p>
      </UseCaseSection>

      <UseCaseSection
        title='Low-impact removal · unlink and undo'
        scenario='For a reversible unlink, remove it without a warning and keep an Undo action close to the result.'
      >
        <div className='flex flex-wrap items-center gap-3'>
          {lowRemoved ? (
            <>
              <span>Item removed from this sample view.</span>
              <Button
                variant='ghost'
                onClick={() => {
                  setLowRemoved(false)
                  setLowRemoveResult('Saved item restored to this sample view.')
                }}
              >
                Undo
              </Button>
            </>
          ) : (
            <Button
              variant='outline'
              onClick={() => {
                setLowRemoved(true)
                setLowRemoveResult('Removed from this sample view; the source item is unchanged.')
              }}
            >
              Remove saved item
            </Button>
          )}
          <span role='status' aria-live='polite' className='text-muted-foreground'>
            {lowRemoveResult}
          </span>
        </div>
      </UseCaseSection>
      <p className='text-muted-foreground'>All outcomes are local illustrations; no real item or permission changes.</p>
    </DemoFrame>
  )
}
