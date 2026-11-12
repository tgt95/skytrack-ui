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
import { CheckboxRoot } from '@/components/ui/checkbox'
import { CheckboxGroup } from '@/components/ui/checkbox-group'
import {
  Dialog,
  DialogBackdrop,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPopup,
  DialogPortal,
  DialogTitle
} from '@/components/ui/dialog'
import { FieldControl, FieldItem, FieldLabel, FieldRoot } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioRoot } from '@/components/ui/radio'
import {
  Select,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectLabel,
  SelectList,
  SelectPopup,
  SelectPortal,
  SelectPositioner,
  SelectTrigger,
  SelectValue,
  SelectIcon
} from '@/components/ui/select'
import {
  Tooltip,
  TooltipPopup,
  TooltipPortal,
  TooltipPositioner,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { DemoFrame, UseCaseSection } from './shared'
import { ArrowClockwiseIcon, ArrowRightIcon, CopyIcon, PencilSimpleIcon, XIcon } from '@phosphor-icons/react'

export function CommonActionsDemo() {
  const [items, setItems] = useState(['North coast survey'])
  const availablePlans = [
    { label: 'River mapping', value: 'River mapping' },
    { label: 'Solar array scan', value: 'Solar array scan' }
  ]
  const [selectedPlanToAdd, setSelectedPlanToAdd] = useState(availablePlans[0].value)
  const [addImportance, setAddImportance] = useState<'primary' | 'secondary'>('primary')
  const [query, setQuery] = useState('Coast')
  const [selectedStatuses, setSelectedStatuses] = useState(['ready', 'review'])
  const [defaultedStatus, setDefaultedStatus] = useState('Ready')
  const [savedRouteName, setSavedRouteName] = useState('North coast survey')
  const [cancelDraftName, setCancelDraftName] = useState('North coast survey')
  const [cancelOpen, setCancelOpen] = useState(false)
  const [cancelFeedback, setCancelFeedback] = useState('The saved route name is unchanged.')
  const [copyState, setCopyState] = useState<'ready' | 'copied' | 'unavailable'>('ready')
  const [closed, setClosed] = useState(false)
  const [step, setStep] = useState(1)
  const [editing, setEditing] = useState(false)
  const [draftName, setDraftName] = useState('North coast survey')
  const [removed, setRemoved] = useState(false)
  const [draftDeleted, setDraftDeleted] = useState(false)
  const [savedViewDeleted, setSavedViewDeleted] = useState(false)
  const [planDeleted, setPlanDeleted] = useState(false)
  const [planConfirmation, setPlanConfirmation] = useState('')
  const [editFeedback, setEditFeedback] = useState('')
  const [refreshFailed, setRefreshFailed] = useState(true)
  const [refreshed, setRefreshed] = useState(false)
  const [resetFeedback, setResetFeedback] = useState('')
  const [resetAppliedFilters, setResetAppliedFilters] = useState({ query: 'Coast', statuses: ['ready'] })
  const [resetDraftQuery, setResetDraftQuery] = useState('Coast')
  const [resetDraftStatuses, setResetDraftStatuses] = useState(['ready', 'review'])

  const copyMissionId = async () => {
    try {
      if (!navigator.clipboard) throw new Error('Clipboard access is unavailable.')
      await navigator.clipboard.writeText('mission-2048')
      setCopyState('copied')
    } catch {
      setCopyState('unavailable')
    }
  }

  const applyResetFilters = () => {
    setResetAppliedFilters({ query: resetDraftQuery, statuses: resetDraftStatuses })
    setResetFeedback('Filters applied. Reset will return to this saved selection.')
  }

  const reset = () => {
    setResetDraftQuery(resetAppliedFilters.query)
    setResetDraftStatuses(resetAppliedFilters.statuses)
    setResetFeedback('Unapplied filter changes discarded. The last applied selection is restored.')
  }

  return (
    <DemoFrame>
      <UseCaseSection
        title='Add'
        scenario='A coordinator adds an existing mission to a shared review collection; the mission itself is unchanged.'
      >
        <div className='grid w-full gap-4 sm:grid-cols-2'>
          <section className='flex min-w-0 flex-wrap items-end gap-2' aria-labelledby='available-missions-title'>
            <div className='w-full space-y-2'>
              <p className='text-sm font-medium'>How important is Add on this page?</p>
              <div className='flex flex-wrap gap-2' role='group' aria-label='Add action importance'>
                <Button
                  size='sm'
                  variant={addImportance === 'primary' ? 'secondary' : 'outline'}
                  aria-pressed={addImportance === 'primary'}
                  onClick={() => setAddImportance('primary')}
                >
                  Main task
                </Button>
                <Button
                  size='sm'
                  variant={addImportance === 'secondary' ? 'secondary' : 'outline'}
                  aria-pressed={addImportance === 'secondary'}
                  onClick={() => setAddImportance('secondary')}
                >
                  Secondary task
                </Button>
              </div>
              <p className='text-sm text-muted-foreground'>
                {addImportance === 'primary'
                  ? 'When adding is the main page task, give it the single primary button; keep other actions secondary.'
                  : 'When adding is secondary here, lower its emphasis so the page’s main action stays clearest.'}
              </p>
            </div>
            <FieldRoot className='min-w-48 flex-1'>
              <h5 id='available-missions-title' className='text-sm font-medium'>
                Add an existing mission
              </h5>
              <Select<string>
                items={availablePlans}
                value={selectedPlanToAdd}
                onValueChange={(value) => value && setSelectedPlanToAdd(value)}
              >
                <SelectLabel>Choose a mission</SelectLabel>
                <SelectTrigger className='w-full'>
                  <SelectValue />
                  <SelectIcon />
                </SelectTrigger>
                <SelectPortal>
                  <SelectPositioner side='bottom' align='start' sideOffset={4}>
                    <SelectPopup>
                      <SelectList>
                        {availablePlans.map((plan) => (
                          <SelectItem key={plan.value} value={plan.value}>
                            <SelectItemIndicator />
                            <SelectItemText>{plan.label}</SelectItemText>
                          </SelectItem>
                        ))}
                      </SelectList>
                    </SelectPopup>
                  </SelectPositioner>
                </SelectPortal>
              </Select>
            </FieldRoot>
            <Button
              variant={addImportance === 'primary' ? 'default' : 'outline'}
              disabled={items.includes(selectedPlanToAdd)}
              onClick={() => setItems((current) => [...current, selectedPlanToAdd])}
            >
              {items.includes(selectedPlanToAdd) ? 'Already added' : 'Add mission'}
            </Button>
          </section>
          <section className='space-y-2' aria-labelledby='review-collection-title'>
            <h5 id='review-collection-title' className='font-medium'>
              Team review collection
            </h5>
            <ul className='list-disc ps-5 text-muted-foreground'>
              {items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className='text-sm text-muted-foreground'>
              Adding links an existing mission here; it does not create a new one.
            </p>
          </section>
        </div>
      </UseCaseSection>

      <UseCaseSection
        title='Cancel'
        scenario='A pilot closes a route-edit dialog and discards the unsaved name, leaving the saved route unchanged.'
      >
        <p>Saved route: {savedRouteName}</p>
        <Button
          variant='outline'
          onClick={() => {
            setCancelDraftName(savedRouteName)
            setCancelOpen(true)
          }}
        >
          Edit route name
        </Button>
        <p role='status' aria-live='polite' className='text-sm text-muted-foreground'>
          {cancelFeedback}
        </p>
        <Dialog open={cancelOpen} onOpenChange={setCancelOpen}>
          <DialogPortal>
            <DialogBackdrop />
            <DialogPopup>
              <DialogHeader>
                <DialogTitle>Edit route name</DialogTitle>
                <DialogDescription>Cancel closes this dialog and discards the unsaved name.</DialogDescription>
              </DialogHeader>
              <FieldRoot>
                <FieldLabel>Route name</FieldLabel>
                <Input value={cancelDraftName} onChange={(event) => setCancelDraftName(event.target.value)} />
              </FieldRoot>
              <DialogFooter>
                <DialogClose
                  variant='outline'
                  onClick={() => {
                    setCancelDraftName(savedRouteName)
                    setCancelFeedback(`Edit canceled. Saved route: ${savedRouteName}.`)
                  }}
                >
                  Cancel edit
                </DialogClose>
                <Button
                  onClick={() => {
                    setSavedRouteName(cancelDraftName)
                    setCancelOpen(false)
                    setCancelFeedback(`Route name saved in this sample: ${cancelDraftName}.`)
                  }}
                >
                  Save route name
                </Button>
              </DialogFooter>
            </DialogPopup>
          </DialogPortal>
        </Dialog>
      </UseCaseSection>

      <UseCaseSection
        title='Clear'
        scenario='Clear removes active multi-select choices or search text; for a single-choice control, it restores the defined default.'
      >
        <div className='grid gap-4 md:grid-cols-2'>
          <FieldRoot>
            <FieldLabel nativeLabel={false} render={<span>Mission status filters</span>} />
            <CheckboxGroup
              aria-label='Mission status filters'
              value={selectedStatuses}
              onValueChange={setSelectedStatuses}
            >
              {[
                ['ready', 'Ready'],
                ['review', 'In review'],
                ['complete', 'Complete']
              ].map(([value, label]) => (
                <FieldItem key={value}>
                  <FieldLabel className='flex items-center gap-2 font-normal'>
                    <CheckboxRoot value={value} /> {label}
                  </FieldLabel>
                </FieldItem>
              ))}
            </CheckboxGroup>
            <Button size='sm' variant='outline' onClick={() => setSelectedStatuses([])}>
              Clear selections
            </Button>
          </FieldRoot>
          <FieldRoot>
            <FieldLabel>Search missions</FieldLabel>
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              endAdornment={
                query && (
                  <Button size='icon-xs' variant='ghost' aria-label='Clear search' onClick={() => setQuery('')}>
                    <XIcon />
                  </Button>
                )
              }
            />
            <p className='text-muted-foreground'>
              {query ? 'Showing matches for “' + query + '”.' : 'Showing all missions.'}
            </p>
          </FieldRoot>
        </div>
        <FieldRoot className='mt-4'>
          <FieldLabel nativeLabel={false} render={<span>Single status filter · default is Ready</span>} />
          <RadioGroup
            value={defaultedStatus}
            onValueChange={(value) => setDefaultedStatus(String(value))}
            aria-label='Single status filter with Ready as the default'
            className='flex flex-wrap gap-x-5 gap-y-2'
          >
            {['Ready', 'In review', 'Complete'].map((option) => (
              <label key={option} className='flex cursor-pointer items-center gap-2'>
                <RadioRoot value={option} />
                <span>{option}</span>
              </label>
            ))}
          </RadioGroup>
          <Button
            size='sm'
            variant='outline'
            disabled={defaultedStatus === 'Ready'}
            onClick={() => setDefaultedStatus('Ready')}
          >
            Clear to default
          </Button>
          <p role='status' aria-live='polite' className='text-sm text-muted-foreground'>
            Status filter: {defaultedStatus}.
          </p>
        </FieldRoot>
      </UseCaseSection>

      <UseCaseSection title='Close' scenario='A user dismisses a non-blocking update after reading it.'>
        {closed ? (
          <Button variant='outline' onClick={() => setClosed(false)}>
            Show update again
          </Button>
        ) : (
          <Alert variant='info' className='relative pe-12'>
            <AlertTitle>Route review reminder</AlertTitle>
            <AlertDescription>Review the route before scheduling.</AlertDescription>
            <Button
              size='icon-xs'
              variant='ghost'
              className='absolute right-2 top-2'
              aria-label='Close route review reminder'
              onClick={() => setClosed(true)}
            >
              <XIcon />
            </Button>
          </Alert>
        )}
      </UseCaseSection>

      <UseCaseSection title='Copy' scenario='Copy a stable flight-plan ID and confirm when it is on the clipboard.'>
        <div className='flex flex-wrap items-center gap-3'>
          <code tabIndex={0} aria-label='Flight plan ID to copy' className='rounded-(--radius) bg-muted px-2 py-1'>
            mission-2048
          </code>
          <TooltipProvider>
            <Tooltip open={copyState === 'copied'}>
              <TooltipTrigger
                aria-label='Copy flight plan ID'
                onClick={copyMissionId}
                render={
                  <Button size='icon' variant='ghost'>
                    <CopyIcon aria-hidden='true' />
                  </Button>
                }
              />
              <TooltipPortal>
                <TooltipPositioner sideOffset={8}>
                  <TooltipPopup>{copyState === 'copied' ? 'Copied' : 'Copy ID'}</TooltipPopup>
                </TooltipPositioner>
              </TooltipPortal>
            </Tooltip>
          </TooltipProvider>
          <span role='status' className='text-muted-foreground'>
            {copyState === 'copied'
              ? 'Flight plan ID copied to the clipboard.'
              : copyState === 'unavailable'
                ? 'Clipboard access is unavailable. Select the ID and copy it manually.'
                : 'Copy mission-2048, then paste it into another field to verify.'}
          </span>
        </div>
      </UseCaseSection>

      <UseCaseSection
        title='Delete'
        scenario='Choose confirmation strength based on how much data the action destroys.'
      >
        <div className='grid min-w-0 grid-cols-1 gap-4 @xs:grid-cols-2 @lg:grid-cols-3'>
          <div className='min-w-0 space-y-2'>
            <h5 className='text-base font-medium text-(--foreground)'>Low impact · delete a draft row</h5>
            {draftDeleted ? (
              <p role='status'>Draft row deleted without a confirmation step. Reload to reset this sample.</p>
            ) : (
              <div className='flex items-center gap-2'>
                <span>Unsent draft row</span>
                <Button size='sm' variant='outline' onClick={() => setDraftDeleted(true)}>
                  Delete draft row
                </Button>
              </div>
            )}
          </div>
          <div className='min-w-0 space-y-2'>
            <h5 className='text-base font-medium text-(--foreground)'>Moderate impact · delete a saved view</h5>
            {savedViewDeleted ? (
              <p role='status'>Saved view deleted; its missions remain. Reload to reset this sample.</p>
            ) : (
              <AlertDialog>
                <AlertDialogTrigger
                  render={
                    <Button size='sm' variant='outline'>
                      Delete saved view
                    </Button>
                  }
                />
                <AlertDialogPortal>
                  <AlertDialogBackdrop />
                  <AlertDialogPopup>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete “Coastal survey” view?</AlertDialogTitle>
                      <AlertDialogDescription>
                        The saved view will be removed. Its underlying missions remain.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogClose>Cancel</AlertDialogClose>
                      <AlertDialogClose variant='destructive' onClick={() => setSavedViewDeleted(true)}>
                        Delete view
                      </AlertDialogClose>
                    </AlertDialogFooter>
                  </AlertDialogPopup>
                </AlertDialogPortal>
              </AlertDialog>
            )}
          </div>
          <div className='min-w-0 space-y-2'>
            <h5 className='text-base font-medium text-(--foreground)'>High impact · permanently delete a plan</h5>
            {planDeleted ? (
              <p role='status'>Flight plan permanently deleted in this sample. Reload to reset it.</p>
            ) : (
              <AlertDialog>
                <AlertDialogTrigger
                  render={
                    <Button size='sm' variant='destructive'>
                      Delete flight plan
                    </Button>
                  }
                />
                <AlertDialogPortal>
                  <AlertDialogBackdrop />
                  <AlertDialogPopup>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete flight plan permanently?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This deletes North coast survey, including its route and notes. This cannot be undone in this
                        sample.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <FieldRoot>
                      <FieldLabel>Type North coast survey to confirm</FieldLabel>
                      <FieldControl
                        render={
                          <Input
                            value={planConfirmation}
                            onChange={(event) => setPlanConfirmation(event.target.value)}
                            aria-label='Type North coast survey to confirm'
                          />
                        }
                      />
                    </FieldRoot>
                    <AlertDialogFooter>
                      <AlertDialogClose>Cancel</AlertDialogClose>
                      <AlertDialogClose
                        variant='destructive'
                        disabled={planConfirmation !== 'North coast survey'}
                        onClick={() => {
                          setPlanDeleted(true)
                        }}
                      >
                        Delete permanently
                      </AlertDialogClose>
                    </AlertDialogFooter>
                  </AlertDialogPopup>
                </AlertDialogPortal>
              </AlertDialog>
            )}
          </div>
        </div>
      </UseCaseSection>

      <UseCaseSection title='Edit' scenario='A coordinator changes a route name inline and saves it.'>
        {editing ? (
          <div className='flex flex-wrap items-end gap-2'>
            <FieldRoot className='min-w-56 flex-1'>
              <FieldLabel>Flight plan name</FieldLabel>
              <Input value={draftName} onChange={(event) => setDraftName(event.target.value)} />
            </FieldRoot>
            <Button
              size='sm'
              onClick={() => {
                setEditing(false)
                setEditFeedback(`Saved name: ${draftName}`)
              }}
            >
              Save
            </Button>
            <Button
              size='sm'
              variant='outline'
              onClick={() => {
                setEditing(false)
                setDraftName('North coast survey')
                setEditFeedback('Edit canceled; the saved name was restored.')
              }}
            >
              Cancel
            </Button>
          </div>
        ) : (
          <div className='flex items-center gap-3'>
            <span>{draftName}</span>
            <Button size='sm' variant='outline' onClick={() => setEditing(true)}>
              <PencilSimpleIcon aria-hidden='true' />
              Edit name
            </Button>
          </div>
        )}
        {editFeedback && (
          <p role='status' className='text-sm text-muted-foreground'>
            {editFeedback}
          </p>
        )}
      </UseCaseSection>

      <UseCaseSection title='Errors' scenario='When refreshing fails, explain what happened and offer a retry.'>
        {refreshFailed ? (
          <Alert variant='destructive'>
            <AlertTitle>Could not refresh flight plans</AlertTitle>
            <AlertDescription className='flex flex-wrap items-center justify-between gap-3'>
              Check the connection, then try again.
              <Button size='sm' variant='outline' onClick={() => setRefreshFailed(false)}>
                Retry
              </Button>
            </AlertDescription>
          </Alert>
        ) : (
          <Alert variant='success' role='status'>
            <AlertTitle>Flight plans refreshed</AlertTitle>
            <AlertDescription>The retry succeeded in this local example.</AlertDescription>
          </Alert>
        )}
      </UseCaseSection>

      <UseCaseSection title='Next' scenario='A user advances through a short mission setup flow.'>
        <div className='flex items-center gap-3'>
          <span>Step {step} of 3 · Flight area</span>
          <Button variant='outline' disabled={step >= 3} onClick={() => setStep((value) => Math.min(3, value + 1))}>
            Next step
            <ArrowRightIcon aria-hidden='true' />
          </Button>
        </div>
      </UseCaseSection>

      <UseCaseSection title='Refresh' scenario='A user requests the latest mission list without changing filters.'>
        <div className='flex flex-wrap items-center gap-3'>
          <Button variant='outline' onClick={() => setRefreshed(true)}>
            <ArrowClockwiseIcon aria-hidden='true' />
            Refresh missions
          </Button>
          <span role='status' className='text-muted-foreground'>
            {refreshed ? 'Sample mission list refreshed just now; filters were kept.' : 'Last refreshed 5 minutes ago.'}
          </span>
        </div>
      </UseCaseSection>

      <UseCaseSection
        title='Remove'
        scenario='Remove a mission from a shared collection while keeping its original data.'
      >
        {removed ? (
          <div className='space-y-2'>
            <p role='status'>Removed from “Team review”.</p>
            <p className='text-muted-foreground'>The mission remains in the owner’s workspace.</p>
            <Button size='sm' variant='outline' onClick={() => setRemoved(false)}>
              Undo removal
            </Button>
          </div>
        ) : (
          <div className='flex items-center justify-between gap-3 rounded-(--radius) border border-border p-3'>
            <span>North coast survey</span>
            <Button size='sm' variant='outline' onClick={() => setRemoved(true)}>
              Remove from shared list
            </Button>
          </div>
        )}
      </UseCaseSection>

      <UseCaseSection
        title='Reset'
        scenario='Discard pending filter edits and return to the last applied settings, not factory defaults.'
      >
        <div className='grid gap-4 sm:grid-cols-2'>
          <FieldRoot>
            <FieldLabel nativeLabel={false} render={<span>Mission status filters · pending</span>} />
            <CheckboxGroup
              aria-label='Pending mission status filters'
              value={resetDraftStatuses}
              onValueChange={setResetDraftStatuses}
            >
              {[
                ['ready', 'Ready'],
                ['review', 'In review'],
                ['complete', 'Complete']
              ].map(([value, label]) => (
                <FieldItem key={value}>
                  <FieldLabel className='flex items-center gap-2 font-normal'>
                    <CheckboxRoot value={value} /> {label}
                  </FieldLabel>
                </FieldItem>
              ))}
            </CheckboxGroup>
          </FieldRoot>
          <FieldRoot>
            <FieldLabel>Mission search · pending</FieldLabel>
            <Input value={resetDraftQuery} onChange={(event) => setResetDraftQuery(event.target.value)} />
          </FieldRoot>
        </div>
        <div className='space-y-2 rounded-(--radius) border border-border p-3'>
          <p className='font-medium'>Last applied mission view</p>
          <p className='text-muted-foreground'>
            {resetAppliedFilters.statuses.join(', ') || 'No status'} · {resetAppliedFilters.query || 'All missions'}
          </p>
          <p className='text-sm text-muted-foreground'>Pending values above do not change this view until Apply.</p>
        </div>
        <div className='flex flex-wrap gap-2'>
          <Button size='sm' onClick={applyResetFilters}>
            Apply filters
          </Button>
          <Button size='sm' variant='ghost' onClick={reset}>
            Reset to last applied
          </Button>
        </div>
        {resetFeedback && (
          <p role='status' className='text-sm text-muted-foreground'>
            {resetFeedback}
          </p>
        )}
      </UseCaseSection>

      <p role='status' aria-live='polite' className='text-muted-foreground'>
        These controls change only the preview; they do not update real mission data.
      </p>
    </DemoFrame>
  )
}
