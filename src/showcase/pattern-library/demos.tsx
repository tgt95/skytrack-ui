import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import {
  ArrowClockwiseIcon,
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  BellIcon,
  CaretDownIcon,
  CheckCircleIcon,
  CopyIcon,
  FileTextIcon,
  MagnifyingGlassIcon,
  PencilSimpleIcon,
  WarningCircleIcon,
  XIcon
} from '@phosphor-icons/react'
import { Alert, AlertAction, AlertDescription, AlertTitle } from '@/components/ui/alert'
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
import {
  Attachment,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle
} from '@/components/ui/attachment'
import { Badge } from '@/components/ui/badge'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { CheckboxGroup } from '@/components/ui/checkbox-group'
import { CheckboxRoot } from '@/components/ui/checkbox'
import { Collapsible, CollapsiblePanel, CollapsibleTrigger } from '@/components/ui/collapsible'
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
import {
  Drawer,
  DrawerBackdrop,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerPopup,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
  DrawerViewport
} from '@/components/ui/drawer'
import { Dropzone } from '@/components/ui/dropzone'
import { FieldControl, FieldDescription, FieldError, FieldItem, FieldLabel, FieldRoot } from '@/components/ui/field'
import { FieldsetLegend, FieldsetRoot } from '@/components/ui/fieldset'
import { InlineEdit, InlineEditInput, InlineEditTrigger } from '@/components/ui/inline-edit'
import { Input } from '@/components/ui/input'
import { Menu, MenuItem, MenuPopup, MenuPortal, MenuPositioner, MenuTrigger } from '@/components/ui/menu'
import {
  Popover,
  PopoverDescription,
  PopoverPortal,
  PopoverPositioner,
  PopoverPopup,
  PopoverTitle,
  PopoverTrigger
} from '@/components/ui/popover'
import { Progress, ProgressIndicator, ProgressLabel, ProgressTrack, ProgressValue } from '@/components/ui/progress'
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
  ToastClose,
  ToastContent,
  ToastDescription,
  ToastPortal,
  ToastProvider,
  ToastRoot,
  ToastTitle,
  ToastViewport,
  useToastManager
} from '@/components/ui/toast'
import { Toggle } from '@/components/ui/toggle'
import { ToggleGroup } from '@/components/ui/toggle-group'
import {
  Tooltip,
  TooltipPopup,
  TooltipPortal,
  TooltipPositioner,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { Toolbar, ToolbarButton, ToolbarSeparator } from '@/components/ui/toolbar'
import type { PatternId } from './catalog'
import { PATTERN_PAGE_CONTENT, type PatternPageDraft, type SectionNode } from './page-content'

const SAMPLE_ITEMS = [
  { name: 'North coast survey', type: 'Planning' },
  { name: 'Runway inspection', type: 'Review' },
  { name: 'River mapping', type: 'Planning' },
  { name: 'Solar array scan', type: 'Complete' }
]

const FILTER_ITEMS = [
  { name: 'North coast survey', status: 'Ready', category: 'Planning' },
  { name: 'Runway inspection', status: 'In review', category: 'Review' },
  { name: 'River mapping', status: 'Ready', category: 'Planning' },
  { name: 'Solar array scan', status: 'Complete', category: 'Complete' }
]

const PatternDemoContext = createContext<{ patternId: PatternId; page: PatternPageDraft } | null>(null)

function findSectionHeading(sections: SectionNode[], sectionId: string): string | undefined {
  for (const section of sections) {
    if (section.id === sectionId) return section.heading
    const childHeading = findSectionHeading(section.children ?? [], sectionId)
    if (childHeading) return childHeading
  }
  return undefined
}

function DemoFrame({ children }: { children: ReactNode }) {
  return <div className='min-w-0 space-y-4'>{children}</div>
}

function UseCaseSection({ title, scenario, children }: { title: string; scenario: string; children: ReactNode }) {
  const context = useContext(PatternDemoContext)
  const demo = context?.page.demos.find((item) => item.title === title)
  const [portal, setPortal] = useState<{ demoId: string; target: HTMLElement } | null>(null)

  useEffect(() => {
    if (!demo) return
    const target = document.querySelector<HTMLElement>(`[data-pattern-demo-slot="${demo.id}"]`)
    setPortal(target ? { demoId: demo.id, target } : null)
  }, [context?.patternId, demo?.id])

  if (!context || !demo) {
    throw new Error(`Missing source-mapped demo copy for ${context?.patternId ?? 'unknown pattern'}: ${title}`)
  }

  const sourceSectionHeading = findSectionHeading(context.page.sections, demo.sectionId)

  const content = (
    <section
      id={`pattern-example-${demo.id}`}
      data-pattern-example
      data-pattern-example-id={demo.id}
      className='grid min-w-0 scroll-mt-24 gap-4 border-t border-border py-4 first:border-0 first:pt-0'
    >
      <header className='min-w-0 space-y-1'>
        {sourceSectionHeading !== title && <h4 className='text-lg font-medium text-(--foreground)'>{title}</h4>}
        <p className='text-base text-muted-foreground'>{demo.scenario || scenario}</p>
      </header>
      <dl data-pattern-teaching-copy className='grid min-w-0 gap-4 md:grid-cols-3'>
        <div className='min-w-0 space-y-1'>
          <dt className='text-lg font-medium text-(--foreground)'>What it means</dt>
          <dd className='text-muted-foreground'>{demo.teaching.meaning}</dd>
        </div>
        <div className='min-w-0 space-y-1'>
          <dt className='text-lg font-medium text-(--foreground)'>How to choose</dt>
          <dd className='text-muted-foreground'>{demo.teaching.decision}</dd>
        </div>
        <div className='min-w-0 space-y-1'>
          <dt className='text-lg font-medium text-(--foreground)'>Before you ship</dt>
          <dd className='text-muted-foreground'>{demo.teaching.consider}</dd>
        </div>
      </dl>
      <div data-pattern-demo-card className='min-w-0 overflow-hidden rounded-(--radius) border border-border bg-card'>
        <div className='flex items-center justify-between gap-3 border-b border-border px-4 py-2'>
          <span className='text-xs font-semibold sub-heading uppercase tracking-wider text-muted-foreground'>
            {demo.interactive ? 'Interactive example' : 'Visual example'}
          </span>
          <span className='text-xs font-semibold sub-heading uppercase tracking-wider text-muted-foreground'>
            {demo.interactive ? 'Try it' : 'Reference'}
          </span>
        </div>
        <div className='@container flex min-h-80 min-w-0 flex-wrap items-center justify-center gap-4 p-4 sm:p-6'>
          <div className='min-w-0 w-full space-y-4'>
            {demo.interactive && (
              <p data-pattern-demo-instruction className='border-b border-border pb-3 text-sm text-muted-foreground'>
                Use a control below, then look for the sample result in this example. Changes stay in this preview.
              </p>
            )}
            {!demo.interactive && (
              <p data-pattern-demo-instruction className='border-b border-border pb-3 text-sm text-muted-foreground'>
                Visual reference only. The sample shows this pattern’s state or layout without a live interaction.
              </p>
            )}
            {children}
          </div>
        </div>
      </div>
    </section>
  )

  return portal?.demoId === demo.id ? createPortal(content, portal.target, demo.id) : null
}

function CommonActionsDemo() {
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

  const copyMissionId = async () => {
    try {
      if (!navigator.clipboard) throw new Error('Clipboard access is unavailable.')
      await navigator.clipboard.writeText('mission-2048')
      setCopyState('copied')
    } catch {
      setCopyState('unavailable')
    }
  }

  const reset = () => {
    setQuery('Coast')
    setSelectedStatuses(['ready', 'review'])
    setResetFeedback('Filters restored to their sample defaults.')
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
          <Button size='sm' variant='outline' onClick={() => setDefaultedStatus('Ready')}>
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
        scenario='Reset restores filter defaults after the user has made several selections.'
      >
        <div className='flex flex-wrap items-center gap-3'>
          <Badge count={selectedStatuses.length + ' statuses'} status='outline' />
          <span className='text-muted-foreground'>Search: {query || 'All missions'}</span>
          <Button size='sm' variant='ghost' onClick={reset}>
            Reset filters
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

function DialogsDemo() {
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
              <FieldRoot>
                <FieldLabel>New route name</FieldLabel>
                <Input
                  value={routeName}
                  onChange={(event) => setRouteName(event.target.value)}
                  placeholder='Enter a route name'
                />
                {validation && !routeName.trim() && <FieldError>Please enter a route name to continue.</FieldError>}
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

function DisabledStatesDemo() {
  return (
    <DemoFrame>
      <UseCaseSection
        title='Default disabled · missing prerequisite'
        scenario='Launch is unavailable until an aircraft is connected; keep the reason beside the action.'
      >
        <FieldRoot className='max-w-md'>
          <FieldLabel>Flight plan</FieldLabel>
          <Input value='North coast survey' readOnly />
          <Button disabled>Launch mission</Button>
          <FieldDescription>Connect an aircraft before launch is available.</FieldDescription>
        </FieldRoot>
      </UseCaseSection>

      <UseCaseSection
        title='Disabled with a warning · unsaved prerequisite'
        scenario='Unsaved route edits block the primary scheduling action; explain what needs to happen before the user can continue.'
      >
        <div className='w-full max-w-xl space-y-3'>
          <Alert variant='warning'>
            <AlertTitle>Save the route before continuing</AlertTitle>
            <AlertDescription>The current route has unsaved changes. Save them before scheduling.</AlertDescription>
          </Alert>
          <Button disabled className='w-full sm:w-auto'>
            Continue to scheduling
          </Button>
        </div>
      </UseCaseSection>

      <UseCaseSection
        title='Read-only · value is available for review'
        scenario='Keep the value selectable and understandable when the user cannot edit it.'
      >
        <div className='grid gap-3 md:grid-cols-2'>
          <FieldRoot>
            <FieldLabel>Workspace role</FieldLabel>
            <Input value='Viewer' readOnly />
            <FieldDescription>You can review this value but cannot change it.</FieldDescription>
          </FieldRoot>
          <FieldRoot>
            <FieldLabel>Aircraft registration</FieldLabel>
            <Input value='N204ST' readOnly />
            <FieldDescription>Assigned by the fleet administrator.</FieldDescription>
          </FieldRoot>
        </div>
      </UseCaseSection>

      <UseCaseSection
        title='Hidden · action is outside this role’s permissions'
        scenario='Do not show an action the user cannot access; explain the role boundary in context.'
      >
        <div className='space-y-2 rounded-(--radius) border border-border p-3'>
          <p className='font-medium'>Sharing controls</p>
          <p className='text-muted-foreground'>
            This Viewer account does not have access to team sharing actions. Ask a workspace administrator for access.
          </p>
          <p className='text-xs text-muted-foreground'>The Share action is omitted for this role.</p>
        </div>
      </UseCaseSection>

      <p className='text-muted-foreground'>
        Disabled explains a temporary blocker; read-only keeps information available; hidden removes an unavailable
        action from this view.
      </p>
    </DemoFrame>
  )
}

function DisclosuresDemo() {
  const [profileNotice, setProfileNotice] = useState('Choose a profile action to preview its result.')
  const [creationNotice, setCreationNotice] = useState('Choose a create action to preview its result.')
  const [pendingCategories, setPendingCategories] = useState<string[]>(['Planning'])
  const [appliedCategories, setAppliedCategories] = useState<string[]>(['Planning'])
  const [routeNotesOpen, setRouteNotesOpen] = useState(false)
  const filteredMissions =
    appliedCategories.length === 0
      ? FILTER_ITEMS
      : FILTER_ITEMS.filter((mission) => appliedCategories.includes(mission.category))

  return (
    <DemoFrame>
      <UseCaseSection
        title='Profile menu · account actions'
        scenario='Keep profile-level actions close to the person and their current workspace.'
      >
        <Menu>
          <MenuTrigger render={<Button variant='outline'>Tuan Trinh · Account</Button>} />
          <MenuPortal>
            <MenuPositioner side='bottom' align='start' sideOffset={4}>
              <MenuPopup>
                <MenuItem onClick={() => setProfileNotice('Profile settings opened in the local example.')}>
                  Profile settings
                </MenuItem>
                <MenuItem onClick={() => setProfileNotice('Account security opened in the local example.')}>
                  Account security
                </MenuItem>
                <MenuItem onClick={() => setProfileNotice('Signed out of this local sample.')}>Sign out</MenuItem>
              </MenuPopup>
            </MenuPositioner>
          </MenuPortal>
        </Menu>
        <p role='status' aria-live='polite' className='text-sm text-muted-foreground'>
          {profileNotice}
        </p>
      </UseCaseSection>

      <UseCaseSection
        title='Settings and filter menu · change a view'
        scenario='Stage related display filters in a compact popover, apply them together, and inspect the updated mission list.'
      >
        <div className='space-y-3'>
          <Popover>
            <PopoverTrigger
              render={<Button variant='outline'>Mission filters · {appliedCategories.length} applied</Button>}
            />
            <PopoverPortal>
              <PopoverPositioner side='bottom' align='start' sideOffset={4}>
                <PopoverPopup className='w-72 gap-3'>
                  <div className='space-y-1'>
                    <PopoverTitle>Filter missions</PopoverTitle>
                    <PopoverDescription>Choose categories, then apply them together.</PopoverDescription>
                  </div>
                  <CheckboxGroup
                    aria-label='Mission categories'
                    value={pendingCategories}
                    onValueChange={(value) => setPendingCategories(value as string[])}
                  >
                    {['Planning', 'Review', 'Complete'].map((category) => (
                      <label key={category} className='flex cursor-pointer items-center gap-2'>
                        <CheckboxRoot value={category} aria-label={category} />
                        {category}
                      </label>
                    ))}
                  </CheckboxGroup>
                  <div className='flex justify-between gap-2 border-t border-border pt-3'>
                    <Button
                      size='sm'
                      variant='ghost'
                      onClick={() => {
                        setPendingCategories([])
                        setAppliedCategories([])
                      }}
                    >
                      Reset
                    </Button>
                    <Button size='sm' onClick={() => setAppliedCategories(pendingCategories)}>
                      Apply filters
                    </Button>
                  </div>
                </PopoverPopup>
              </PopoverPositioner>
            </PopoverPortal>
          </Popover>
          <p role='status' aria-live='polite' className='text-sm text-muted-foreground'>
            {appliedCategories.length
              ? `${filteredMissions.length} missions match: ${appliedCategories.join(', ')}.`
              : `Showing all ${FILTER_ITEMS.length} sample missions.`}
          </p>
          <ul aria-label='Filtered sample missions' className='divide-y divide-border border-y border-border'>
            {filteredMissions.map((mission) => (
              <li key={mission.name} className='flex flex-wrap items-center justify-between gap-2 py-2'>
                <span>{mission.name}</span>
                <Badge count={mission.category} status='outline' />
              </li>
            ))}
          </ul>
        </div>
      </UseCaseSection>

      <UseCaseSection
        title='Combo button · primary action plus alternatives'
        scenario='Keep the most common creation action visible and place related alternatives in its adjacent menu.'
      >
        <div className='inline-flex items-stretch'>
          <Button className='rounded-e-none' onClick={() => setCreationNotice('Created a blank local flight plan.')}>
            Create flight plan
          </Button>
          <Menu>
            <MenuTrigger
              render={
                <Button variant='outline' aria-label='More create options' className='rounded-s-none border-s-0'>
                  <CaretDownIcon />
                </Button>
              }
            />
            <MenuPortal>
              <MenuPositioner side='bottom' align='end' sideOffset={4}>
                <MenuPopup>
                  <MenuItem onClick={() => setCreationNotice('Created a flight plan from the local template.')}>
                    From template
                  </MenuItem>
                  <MenuItem onClick={() => setCreationNotice('Started importing a sample route.')}>
                    Import route
                  </MenuItem>
                </MenuPopup>
              </MenuPositioner>
            </MenuPortal>
          </Menu>
        </div>
        <p role='status' aria-live='polite' className='text-sm text-muted-foreground'>
          {creationNotice}
        </p>
      </UseCaseSection>

      <UseCaseSection
        title='Inline disclosure · supporting details'
        scenario='Reveal secondary route-note metadata beside the mission while keeping the primary record easy to scan.'
      >
        <Collapsible open={routeNotesOpen} onOpenChange={setRouteNotesOpen}>
          <CollapsibleTrigger className='flex w-full items-center justify-between gap-3 border border-border px-4 py-3 text-left'>
            Route notes <span aria-hidden='true'>{routeNotesOpen ? '−' : '+'}</span>
          </CollapsibleTrigger>
          <CollapsiblePanel>
            <div className='space-y-2 border border-t-0 border-border px-4 py-3'>
              <p>Survey area: North coast · route revision: 3</p>
              <p className='text-muted-foreground'>Last updated 10:42 · sample metadata only.</p>
            </div>
          </CollapsiblePanel>
        </Collapsible>
      </UseCaseSection>
    </DemoFrame>
  )
}

function EmptyStatesDemo() {
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

function FilteringDemo() {
  const [status, setStatus] = useState('All')
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [mode, setMode] = useState<'instant' | 'batch'>('instant')
  const [appliedTypes, setAppliedTypes] = useState<string[]>([])
  const activeTypes = mode === 'instant' ? selectedTypes : appliedTypes
  const statusResults = FILTER_ITEMS.filter((item) => status === 'All' || item.status === status)
  const categoryResults = FILTER_ITEMS.filter((item) => !activeTypes.length || activeTypes.includes(item.category))

  return (
    <DemoFrame>
      <UseCaseSection
        title='Choose one status · instant results'
        scenario='A dispatcher selects one status and sees the mission list update immediately.'
      >
        <RadioGroup
          value={status}
          onValueChange={(value) => setStatus(String(value))}
          aria-label='Filter missions by status'
          className='flex flex-wrap gap-x-5 gap-y-2'
        >
          {['All', 'Ready', 'In review', 'Complete'].map((option) => (
            <label key={option} className='flex cursor-pointer items-center gap-2'>
              <RadioRoot value={option} />
              <span>{option}</span>
            </label>
          ))}
        </RadioGroup>
        <p role='status' aria-live='polite' className='text-muted-foreground'>
          {statusResults.length} {statusResults.length === 1 ? 'mission' : 'missions'} shown for {status.toLowerCase()}.
        </p>
        <ul className='divide-y divide-border border-y border-border'>
          {statusResults.map((item) => (
            <li key={item.name} className='flex justify-between gap-3 py-2'>
              <span>{item.name}</span>
              <Badge count={item.status} status='outline' className='rounded-(--radius)' />
            </li>
          ))}
        </ul>
      </UseCaseSection>
      <UseCaseSection
        title='Combine categories · apply or update instantly'
        scenario='A coordinator selects several plan types and can review pending filters before applying them.'
      >
        <div className='flex flex-wrap items-center gap-2'>
          <Button
            size='sm'
            variant={mode === 'instant' ? 'secondary' : 'outline'}
            aria-pressed={mode === 'instant'}
            onClick={() => setMode('instant')}
          >
            Instant
          </Button>
          <Button
            size='sm'
            variant={mode === 'batch' ? 'secondary' : 'outline'}
            aria-pressed={mode === 'batch'}
            onClick={() => setMode('batch')}
          >
            Batch
          </Button>
        </div>
        <FieldRoot>
          <FieldLabel nativeLabel={false} render={<span>Filter by plan category</span>} />
          <CheckboxGroup
            value={selectedTypes}
            onValueChange={(value) => setSelectedTypes(value as string[])}
            aria-label='Filter by plan category'
            className='flex flex-wrap gap-x-5 gap-y-2'
          >
            {['Planning', 'Review', 'Complete'].map((option) => (
              <label key={option} className='flex cursor-pointer items-center gap-2'>
                <CheckboxRoot value={option} aria-label={option} />
                <span>{option}</span>
              </label>
            ))}
          </CheckboxGroup>
        </FieldRoot>
        <div className='flex flex-wrap gap-2'>
          {mode === 'batch' && (
            <Button size='sm' onClick={() => setAppliedTypes(selectedTypes)}>
              Apply filters
            </Button>
          )}
          <Button size='sm' variant='outline' onClick={() => setSelectedTypes([])}>
            Clear selections
          </Button>
          <Button
            size='sm'
            variant='ghost'
            onClick={() => {
              setSelectedTypes([])
              setAppliedTypes([])
              setMode('instant')
            }}
          >
            Reset all filters
          </Button>
        </div>
        <p role='status' aria-live='polite' className='text-muted-foreground'>
          {categoryResults.length} {categoryResults.length === 1 ? 'mission' : 'missions'} shown
          {mode === 'batch' ? ` · ${selectedTypes.length} pending selection(s)` : ' · instant update'}.
        </p>
        {categoryResults.length ? (
          <ul className='divide-y divide-border border-y border-border'>
            {categoryResults.map((item) => (
              <li key={item.name} className='flex justify-between gap-3 py-2'>
                <span>{item.name}</span>
                <Badge count={item.category} status='outline' className='rounded-(--radius)' />
              </li>
            ))}
          </ul>
        ) : (
          <Alert role='status'>
            <AlertTitle>No matching plans</AlertTitle>
            <AlertDescription>Clear the selected categories to restore the complete sample list.</AlertDescription>
          </Alert>
        )}
      </UseCaseSection>
    </DemoFrame>
  )
}

function FluidStylesDemo() {
  return (
    <DemoFrame>
      <UseCaseSection
        title='Match action width to the task'
        scenario='Compare a content-sized secondary action with a full-width primary action in a mission setup.'
      >
        <div className='grid gap-4 sm:grid-cols-2'>
          <div className='space-y-2 border border-border p-3'>
            <p className='font-medium'>Productive form</p>
            <Input placeholder='Workspace name' aria-label='Workspace name' readOnly />
            <Button variant='outline' disabled>
              Continue
            </Button>
          </div>
          <div className='flex flex-col justify-between gap-3 border border-border p-3'>
            <div>
              <p className='font-medium'>Expressive call to action</p>
              <p className='text-muted-foreground'>Use in a spacious, high-emphasis moment.</p>
            </div>
            <Button className='w-full' disabled>
              Explore missions
            </Button>
          </div>
        </div>
        <p className='text-sm text-muted-foreground'>
          Compare the content-sized action with the button that fills its container.
        </p>
      </UseCaseSection>
      <UseCaseSection
        title='Align related actions in a compact panel'
        scenario='Keep Save draft and Preview the same width when they share a small action area.'
      >
        <div className='grid max-w-sm grid-cols-2 gap-3'>
          <Button variant='outline' disabled>
            Save draft
          </Button>
          <Button variant='outline' disabled>
            Preview
          </Button>
        </div>
        <p className='text-sm text-muted-foreground'>The related actions share the same width in this compact panel.</p>
      </UseCaseSection>
      <UseCaseSection
        title='Let a fluid form follow its available width'
        scenario='A workspace setup form should fill its parent column instead of relying on a fixed control width.'
      >
        <FieldRoot className='w-full max-w-none'>
          <FieldLabel>Workspace name</FieldLabel>
          <Input className='w-full' placeholder='e.g. Coastal operations' readOnly />
          <FieldDescription>
            The component has no special fluid prop; apply the supported width utility in context.
          </FieldDescription>
        </FieldRoot>
      </UseCaseSection>
      <UseCaseSection
        title='Attach a simple form to its container edges'
        scenario='A quick workspace invite uses a compact, edge-to-edge group; use this for one-step tasks, not dense multi-section forms.'
      >
        <div className='w-full max-w-md overflow-hidden border border-border'>
          <label className='block space-y-1 border-b border-border p-2 text-sm'>
            <span>Teammate email</span>
            <Input
              className='rounded-none border-0 px-0'
              aria-label='Teammate email'
              value='dispatcher@example.com'
              readOnly
            />
          </label>
          <label className='block space-y-1 border-b border-border p-2 text-sm'>
            <span>Mission role</span>
            <Input className='rounded-none border-0 px-0' aria-label='Mission role' value='Pilot' readOnly />
          </label>
          <Button className='w-full rounded-none' disabled>
            Send invitation
          </Button>
        </div>
      </UseCaseSection>
      <UseCaseSection
        title='Choose a fluid container or fixed side panel'
        scenario='Use a responsive modal-like region for short tasks, while a side panel keeps a stable width alongside the workspace.'
      >
        <div className='grid gap-3 sm:grid-cols-2'>
          <div className='w-full border border-border p-3'>
            <p className='font-medium'>Fluid task area</p>
            <p className='text-muted-foreground'>Follows the available column width.</p>
          </div>
          <div className='w-full max-w-xs border border-border p-3'>
            <p className='font-medium'>Fixed-width panel</p>
            <p className='text-muted-foreground'>Keeps a bounded reading and form width.</p>
          </div>
        </div>
      </UseCaseSection>
    </DemoFrame>
  )
}

function FormsDemo() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [notes, setNotes] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [nameTouched, setNameTouched] = useState(false)
  const [emailTouched, setEmailTouched] = useState(false)
  const [validationEmail, setValidationEmail] = useState('')
  const [validationTouched, setValidationTouched] = useState(false)
  const [validationSubmitted, setValidationSubmitted] = useState(false)
  const [serverRejected, setServerRejected] = useState(false)
  const [longFormStep, setLongFormStep] = useState(1)
  const [longFormValues, setLongFormValues] = useState({
    purpose: '',
    requestedDate: '',
    aircraft: '',
    checklistOwner: ''
  })
  const [checks, setChecks] = useState(['weather', 'airspace'])
  const invalidName = (submitted || nameTouched) && !name.trim()
  const invalidEmail = (submitted || emailTouched) && !email.includes('@')
  const invalidValidationEmail = (validationSubmitted || validationTouched) && !validationEmail.includes('@')

  return (
    <DemoFrame>
      <UseCaseSection
        title='Collect mission contact details'
        scenario='Ask for required contact information first, distinguish optional notes, and explain field expectations.'
      >
        <form
          className='grid min-w-0 gap-4 md:max-w-2xl'
          onSubmit={(event) => {
            event.preventDefault()
            setSubmitted(true)
          }}
        >
          <FieldsetRoot>
            <FieldsetLegend>Mission contact</FieldsetLegend>
            <div className='grid gap-4'>
              <FieldRoot invalid={invalidName}>
                <FieldLabel>Contact name</FieldLabel>
                <Input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  onBlur={() => setNameTouched(true)}
                  aria-invalid={invalidName}
                  placeholder='Name'
                />
                <FieldError match={invalidName}>Enter a contact name.</FieldError>
              </FieldRoot>
              <FieldRoot invalid={invalidEmail}>
                <FieldLabel>Email address</FieldLabel>
                <Input
                  type='email'
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  onBlur={() => setEmailTouched(true)}
                  aria-invalid={invalidEmail}
                  placeholder='name@example.com'
                />
                <FieldDescription>Use an address that can receive mission updates.</FieldDescription>
                <FieldError match={invalidEmail}>Enter a valid email address.</FieldError>
              </FieldRoot>
            </div>
            <FieldRoot>
              <FieldLabel>Access notes (optional)</FieldLabel>
              <Input
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                placeholder='Add relevant access details'
              />
              <FieldDescription>Only include information needed for this mission.</FieldDescription>
            </FieldRoot>
          </FieldsetRoot>
          <div className='flex flex-wrap items-center gap-3'>
            <Button type='submit'>Save contact details</Button>
            {submitted && !invalidName && !invalidEmail && (
              <p role='status'>Contact details are valid. Nothing was submitted.</p>
            )}
          </div>
        </form>
      </UseCaseSection>
      <UseCaseSection
        title='Validate and recover from missing information'
        scenario='Enter an invalid email and leave the field to see its inline error; correct it or clear it, then compare a simulated server rejection.'
      >
        <div className='grid min-w-0 gap-4 md:max-w-xl'>
          <FieldRoot invalid={invalidValidationEmail}>
            <FieldLabel>Notification email</FieldLabel>
            <Input
              type='email'
              value={validationEmail}
              onChange={(event) => {
                setValidationEmail(event.target.value)
                setServerRejected(false)
              }}
              onBlur={() => setValidationTouched(true)}
              aria-invalid={invalidValidationEmail}
              placeholder='pilot@example.com'
            />
            <FieldDescription>Used only to illustrate client-side email validation.</FieldDescription>
            <FieldError match={invalidValidationEmail}>Enter an email address that includes @.</FieldError>
          </FieldRoot>
          <div className='flex flex-wrap items-center gap-3'>
            <Button type='button' onClick={() => setValidationSubmitted(true)}>
              Validate email
            </Button>
            <Button
              type='button'
              variant='outline'
              onClick={() => {
                setValidationEmail('')
                setValidationSubmitted(false)
                setValidationTouched(false)
                setServerRejected(false)
              }}
            >
              Clear email
            </Button>
            <Button type='button' variant='outline' onClick={() => setServerRejected(true)}>
              Simulate server rejection
            </Button>
          </div>
          {validationSubmitted && !invalidValidationEmail && (
            <p role='status'>Email format is valid. No request was sent.</p>
          )}
          {serverRejected && (
            <Alert variant='destructive'>
              <AlertTitle>Service could not save this sample</AlertTitle>
              <AlertDescription>Check mission access or try again later. No request was sent.</AlertDescription>
            </Alert>
          )}
        </div>
      </UseCaseSection>
      <UseCaseSection
        title='Break a long mission request into steps'
        scenario='Keep a detailed request manageable by grouping mission details and safety checks into separate steps.'
      >
        <Progress value={longFormStep * 50}>
          <ProgressLabel>Mission request</ProgressLabel>
          <ProgressValue />
          <ProgressTrack>
            <ProgressIndicator />
          </ProgressTrack>
        </Progress>
        {longFormStep === 1 ? (
          <FieldsetRoot>
            <FieldsetLegend>Mission details</FieldsetLegend>
            <FieldRoot>
              <FieldLabel>Purpose</FieldLabel>
              <Input
                value={longFormValues.purpose}
                onChange={(event) => setLongFormValues((values) => ({ ...values, purpose: event.target.value }))}
                placeholder='Coastal mapping'
              />
            </FieldRoot>
            <FieldRoot>
              <FieldLabel>Requested date</FieldLabel>
              <Input
                type='date'
                value={longFormValues.requestedDate}
                onChange={(event) => setLongFormValues((values) => ({ ...values, requestedDate: event.target.value }))}
              />
            </FieldRoot>
          </FieldsetRoot>
        ) : (
          <FieldsetRoot>
            <FieldsetLegend>Safety review</FieldsetLegend>
            <FieldRoot>
              <FieldLabel>Aircraft</FieldLabel>
              <Input
                value={longFormValues.aircraft}
                onChange={(event) => setLongFormValues((values) => ({ ...values, aircraft: event.target.value }))}
                placeholder='Choose an aircraft'
              />
            </FieldRoot>
            <FieldRoot>
              <FieldLabel>Launch checklist</FieldLabel>
              <Input
                value={longFormValues.checklistOwner}
                onChange={(event) => setLongFormValues((values) => ({ ...values, checklistOwner: event.target.value }))}
                placeholder='Confirm checklist owner'
              />
            </FieldRoot>
          </FieldsetRoot>
        )}
        <div className='flex flex-wrap justify-end gap-2'>
          <Button type='button' variant='outline' disabled={longFormStep === 1} onClick={() => setLongFormStep(1)}>
            Previous stage
          </Button>
          <Button type='button' onClick={() => setLongFormStep(longFormStep === 1 ? 2 : 1)}>
            {longFormStep === 1 ? 'Continue to safety' : 'Review request'}
          </Button>
        </div>
      </UseCaseSection>
      <UseCaseSection
        title='Select optional checks for a mission request'
        scenario='Let the planner choose any applicable review steps, while clear labels and helper text explain what each option changes.'
      >
        <FieldRoot>
          <FieldLabel nativeLabel={false} render={<span>Additional reviews</span>} />
          <CheckboxGroup aria-label='Additional mission reviews' value={checks} onValueChange={setChecks}>
            <FieldItem>
              <FieldLabel className='flex items-center gap-2 font-normal'>
                <CheckboxRoot value='weather' /> Weather window review
              </FieldLabel>
            </FieldItem>
            <FieldItem>
              <FieldLabel className='flex items-center gap-2 font-normal'>
                <CheckboxRoot value='airspace' /> Airspace coordination
              </FieldLabel>
            </FieldItem>
            <FieldItem>
              <FieldLabel className='flex items-center gap-2 font-normal'>
                <CheckboxRoot value='observer' /> Observer assignment
              </FieldLabel>
            </FieldItem>
          </CheckboxGroup>
          <FieldDescription>
            These example options demonstrate multi-select behavior; they do not define which reviews a mission
            requires.
          </FieldDescription>
        </FieldRoot>
      </UseCaseSection>
    </DemoFrame>
  )
}

function GlobalHeaderDemo() {
  const [configuration, setConfiguration] = useState<'header' | 'panel'>('header')
  const [organization, setOrganization] = useState<'workspace' | 'mission'>('workspace')
  const [headerMessage, setHeaderMessage] = useState('Current location: Missions / North coast survey')
  const [schemeMessage, setSchemeMessage] = useState('Choose a destination to preview this navigation scheme.')
  return (
    <DemoFrame>
      <UseCaseSection
        title='Global header with local mission navigation'
        scenario='Compare a workspace-wide header alone with the same header beside mission-specific destinations and a breadcrumb.'
      >
        <div className='flex flex-wrap gap-2'>
          <Button
            size='sm'
            variant={configuration === 'header' ? 'secondary' : 'outline'}
            aria-pressed={configuration === 'header'}
            onClick={() => setConfiguration('header')}
          >
            Header only
          </Button>
          <Button
            size='sm'
            variant={configuration === 'panel' ? 'secondary' : 'outline'}
            aria-pressed={configuration === 'panel'}
            onClick={() => setConfiguration('panel')}
          >
            Header + left panel
          </Button>
        </div>
        <div className='overflow-hidden rounded-(--radius) border border-border'>
          <header className='flex flex-wrap items-center justify-between gap-3 border-b border-border bg-card px-4 py-3'>
            <strong>SkyTrack Mission workspace</strong>
            <nav aria-label='Global navigation' className='flex flex-wrap gap-1'>
              <Button size='sm' variant='ghost' onClick={() => setHeaderMessage('Opened global Home.')}>
                Home
              </Button>
              <Button size='sm' variant='ghost' onClick={() => setHeaderMessage('Opened global Missions.')}>
                Missions
              </Button>
              <Menu>
                <MenuTrigger
                  render={
                    <Button size='sm' variant='outline'>
                      Utilities
                    </Button>
                  }
                />
                <MenuPortal>
                  <MenuPositioner side='bottom' align='end' sideOffset={4}>
                    <MenuPopup>
                      <MenuItem onClick={() => setHeaderMessage('Notifications panel opened.')}>
                        Notifications · 2
                      </MenuItem>
                      <MenuItem onClick={() => setHeaderMessage('System settings opened.')}>System settings</MenuItem>
                      <MenuItem onClick={() => setHeaderMessage('Product switcher opened.')}>Switch product</MenuItem>
                    </MenuPopup>
                  </MenuPositioner>
                </MenuPortal>
              </Menu>
            </nav>
          </header>
          <div className='flex min-h-40'>
            {configuration === 'panel' && (
              <nav
                aria-label='Mission navigation'
                className='w-44 shrink-0 space-y-1 border-e border-border bg-muted/30 p-3'
              >
                <p className='sub-heading mb-2'>Missions</p>
                <Button
                  size='sm'
                  variant='secondary'
                  className='w-full justify-start'
                  onClick={() => setHeaderMessage('Viewing mission overview.')}
                >
                  Overview
                </Button>
                <Button
                  size='sm'
                  variant='ghost'
                  className='w-full justify-start'
                  onClick={() => setHeaderMessage('Viewing flight plans.')}
                >
                  Flight plans
                </Button>
                <Button
                  size='sm'
                  variant='ghost'
                  className='w-full justify-start'
                  onClick={() => setHeaderMessage('Viewing aircraft.')}
                >
                  Aircraft
                </Button>
              </nav>
            )}
            <div className='min-w-0 flex-1 space-y-3 p-4'>
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink
                      render={
                        <a
                          href='#workspace'
                          onClick={(event) => {
                            event.preventDefault()
                            setHeaderMessage('Opened the local workspace overview preview.')
                          }}
                        />
                      }
                    >
                      Workspace
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink
                      render={
                        <a
                          href='#missions'
                          onClick={(event) => {
                            event.preventDefault()
                            setHeaderMessage('Opened the local mission-list preview.')
                          }}
                        />
                      }
                    >
                      Missions
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>North coast survey</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
              <Toolbar className='w-full justify-between'>
                <ToolbarButton onClick={() => setHeaderMessage('Opened the local mission overview.')}>
                  Overview
                </ToolbarButton>
                <ToolbarSeparator />
                <ToolbarButton onClick={() => setHeaderMessage('Opened the local mission settings.')}>
                  Settings
                </ToolbarButton>
              </Toolbar>
            </div>
          </div>
        </div>
        <p aria-live='polite' className='text-muted-foreground'>
          {headerMessage} · Global utilities stay consistent; local navigation changes with the product context.
        </p>
      </UseCaseSection>
      <UseCaseSection
        title='Organize destinations around workspace or current mission'
        scenario='Choose whether navigation groups broad workspace areas first or puts the active mission workflow first.'
      >
        <div className='flex flex-wrap gap-2'>
          <Button
            size='sm'
            variant={organization === 'workspace' ? 'secondary' : 'outline'}
            aria-pressed={organization === 'workspace'}
            onClick={() => setOrganization('workspace')}
          >
            Workspace first
          </Button>
          <Button
            size='sm'
            variant={organization === 'mission' ? 'secondary' : 'outline'}
            aria-pressed={organization === 'mission'}
            onClick={() => setOrganization('mission')}
          >
            Mission first
          </Button>
        </div>
        <nav aria-label='Selected navigation scheme' className='flex flex-wrap gap-1 border border-border p-2'>
          {(organization === 'workspace'
            ? ['Home', 'Projects', 'Team', 'Settings']
            : ['Overview', 'Flight plans', 'Aircraft', 'Settings']
          ).map((item) => (
            <Button
              key={item}
              size='sm'
              variant={item === (organization === 'workspace' ? 'Projects' : 'Overview') ? 'secondary' : 'ghost'}
              onClick={() => setSchemeMessage(`Opened ${item} in the ${organization}-first scheme.`)}
            >
              {item}
            </Button>
          ))}
        </nav>
        <p role='status' aria-live='polite' className='text-sm text-muted-foreground'>
          {schemeMessage}
        </p>
      </UseCaseSection>
    </DemoFrame>
  )
}

function LoadingDemo() {
  const [progress, setProgress] = useState(0)
  const [loading, setLoading] = useState(false)
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
        {loading ? (
          <Progress value={null}>
            <ProgressLabel>Checking aircraft connection</ProgressLabel>
            <ProgressTrack>
              <ProgressIndicator />
            </ProgressTrack>
          </Progress>
        ) : (
          <p role='status' className='text-muted-foreground'>
            Ready to check connection
          </p>
        )}
        <Button size='sm' variant='outline' onClick={() => setLoading((current) => !current)}>
          {loading ? 'Finish sample loading' : 'Show inline loading'}
        </Button>
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
            Load more
          </Button>
        ) : (
          <p role='status' className='text-muted-foreground'>
            All sample items loaded.
          </p>
        )}
      </UseCaseSection>
      <UseCaseSection
        title='Reserve the shape of a list while its first data loads'
        scenario='When the page structure is known but its records are not, use a restrained placeholder to reduce layout shift.'
      >
        <div aria-label='Illustrative loading skeleton for flight plans' className='max-w-xl space-y-3' role='img'>
          {[1, 2, 3].map((row) => (
            <div key={row} className='flex items-center gap-3 border-b border-border py-3'>
              <span className='size-8 animate-pulse rounded-(--radius) bg-muted' />
              <span className='h-4 flex-1 animate-pulse rounded-(--radius) bg-muted' />
              <span className='h-4 w-20 animate-pulse rounded-(--radius) bg-muted' />
            </div>
          ))}
        </div>
        <p className='text-muted-foreground'>
          Local Tailwind illustration: this library does not ship a Skeleton component.
        </p>
      </UseCaseSection>
      <p className='text-muted-foreground'>
        Examples are local illustrations. The library has no Skeleton component; this demo uses its supported Progress
        composition.
      </p>
    </DemoFrame>
  )
}

function LoginDemo() {
  const [step, setStep] = useState<'email' | 'password' | 'verification'>('email')
  const [layout, setLayout] = useState<'centered' | 'split'>('centered')
  const [loginError, setLoginError] = useState(false)
  const [workEmail, setWorkEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('This form does not authenticate or send credentials.')
  return (
    <DemoFrame>
      <UseCaseSection
        title='Choose a sign-in layout'
        scenario='Use a centered form for a focused entry point or a split layout when a short product introduction supports the task.'
      >
        <div className='flex flex-wrap gap-2'>
          {(['centered', 'split'] as const).map((value) => (
            <Button
              key={value}
              size='sm'
              variant={layout === value ? 'secondary' : 'outline'}
              aria-pressed={layout === value}
              onClick={() => setLayout(value)}
            >
              {value === 'centered' ? 'Centered form' : 'Split welcome'}
            </Button>
          ))}
        </div>
        <div
          role='region'
          aria-label='Sign-in layout preview'
          className={`grid w-full gap-3 rounded-(--radius) border border-border p-4 ${layout === 'centered' ? 'mx-auto max-w-sm justify-items-center text-center' : 'sm:grid-cols-2 sm:items-start'}`}
        >
          {layout === 'split' && (
            <div className='space-y-2'>
              <p className='text-muted-foreground'>SkyTrack workspace</p>
              <p>Plan and review missions with your team.</p>
            </div>
          )}
          <div className='w-full space-y-2'>
            <p className='font-medium'>Log in</p>
            <Input aria-label='Preview work email' placeholder='Work email' readOnly />
            <Button disabled className='w-full'>
              Continue
            </Button>
          </div>
        </div>
        <p role='status' aria-live='polite' className='text-sm text-muted-foreground'>
          {layout === 'centered'
            ? 'Centered form preview: focused entry without extra introduction.'
            : 'Split welcome preview: a short product introduction sits beside the sign-in form.'}
        </p>
      </UseCaseSection>
      <UseCaseSection
        title='Authenticate progressively and recover from an error'
        scenario='Request work email first, then show the password or organization SSO path, an optional verification step, and clear recovery actions.'
      >
        <div className='mx-auto grid w-full max-w-md gap-4 rounded-(--radius) border border-border p-5'>
          <div>
            <p className='text-muted-foreground'>SkyTrack workspace</p>
            <h4 className='font-medium'>Log in</h4>
            <p className='text-muted-foreground'>
              {step === 'email'
                ? 'Enter your work email to continue.'
                : step === 'password'
                  ? 'Enter the password for this sample account.'
                  : 'Enter the one-time verification code.'}
            </p>
          </div>
          <form
            className='grid gap-4 md:max-w-md'
            onSubmit={(event) => {
              event.preventDefault()
              if (step === 'email') {
                setStep('password')
                setLoginError(false)
                setMessage('The preview moved to the password step without checking whether this account exists.')
              } else if (step === 'password') {
                setStep('verification')
                setPassword('')
                setMessage('Illustrative verification step shown. No credentials were checked and no sign-in occurred.')
              } else {
                setStep('email')
                setPassword('')
                setMessage('The sample flow ended. No sign-in was attempted.')
              }
            }}
          >
            {loginError && (
              <Alert variant='destructive'>
                <AlertDescription>Incorrect ID or password. Try again.</AlertDescription>
              </Alert>
            )}
            {step === 'email' ? (
              <FieldRoot>
                <FieldLabel>Work email</FieldLabel>
                <FieldControl
                  render={
                    <Input
                      type='email'
                      autoComplete='username'
                      placeholder='name@example.com'
                      aria-label='Work email'
                      value={workEmail}
                      onChange={(event) => {
                        setWorkEmail(event.target.value)
                        setLoginError(false)
                      }}
                    />
                  }
                />
              </FieldRoot>
            ) : (
              <div className='space-y-1 rounded-(--radius) border border-border p-3'>
                <p className='text-xs text-muted-foreground'>Work email</p>
                <p className='break-all'>{workEmail || 'pilot@example.com'}</p>
              </div>
            )}
            {step === 'password' && (
              <>
                <FieldRoot>
                  <FieldLabel>Password</FieldLabel>
                  <FieldControl
                    render={
                      <Input
                        type='password'
                        autoComplete='current-password'
                        placeholder='Enter a password'
                        aria-label='Password'
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                      />
                    }
                  />
                </FieldRoot>
                <Button
                  type='button'
                  variant='ghost'
                  onClick={() => setMessage('Password recovery link selected; no email was sent.')}
                >
                  Forgot password?
                </Button>
              </>
            )}
            {step === 'verification' && (
              <div className='space-y-3'>
                <Badge count='Illustrative · MFA guidance not standardized' status='outline' />
                <FieldRoot>
                  <FieldLabel>Verification code</FieldLabel>
                  <FieldControl
                    render={
                      <Input
                        inputMode='numeric'
                        autoComplete='one-time-code'
                        placeholder='123 456'
                        aria-label='Verification code'
                      />
                    }
                  />
                </FieldRoot>
              </div>
            )}
            <Button type='submit'>
              {step === 'email' ? 'Continue' : step === 'password' ? 'Continue to verification' : 'Finish preview'}
            </Button>
          </form>
          {step !== 'email' && (
            <Button
              size='sm'
              variant='outline'
              onClick={() => {
                setStep('email')
                setPassword('')
                setLoginError(false)
                setMessage('Returned to the work email step.')
              }}
            >
              Change email
            </Button>
          )}
          {step === 'password' && (
            <Button
              size='sm'
              variant='ghost'
              onClick={() => {
                setPassword('')
                setStep('email')
                setLoginError(true)
                setMessage('The sample returned to work email entry after a credential error; password was cleared.')
              }}
            >
              Preview credential error
            </Button>
          )}
          {step === 'email' && (
            <div className='border-t border-border pt-3'>
              <p className='mb-2 text-muted-foreground'>Alternative method</p>
              <Button
                variant='outline'
                className='w-full'
                onClick={() => setMessage('Organization SSO selected. No authentication occurred.')}
              >
                Continue with organization SSO
              </Button>
            </div>
          )}
        </div>
        <p role='status' aria-live='polite' className='text-sm text-muted-foreground'>
          {message}
        </p>
      </UseCaseSection>
    </DemoFrame>
  )
}

function ToastItems() {
  const { toasts } = useToastManager()
  return toasts.map((toast) => (
    <ToastRoot key={toast.id} toast={toast}>
      <ToastContent>
        <div className='grid min-w-0 flex-1 gap-1'>
          <ToastTitle />
          <ToastDescription />
        </div>
        <ToastClose aria-label='Dismiss notification' />
      </ToastContent>
    </ToastRoot>
  ))
}

function NotificationsDemo() {
  const toastManager = useToastManager()
  const [panelOpen, setPanelOpen] = useState(false)
  const [updateVisible, setUpdateVisible] = useState(true)
  const [actionMessage, setActionMessage] = useState('Choose an action to preview its local result.')
  const statuses = [
    { type: 'info', label: 'Information', message: 'A sample mission summary is ready.' },
    { type: 'success', label: 'Success', message: 'Sample changes saved.' },
    { type: 'warning', label: 'Warning', message: 'Some mission details are incomplete in this sample.' },
    { type: 'error', label: 'Error', message: 'Sync failed. Check connection and retry.' }
  ] as const
  return (
    <DemoFrame>
      <UseCaseSection
        title='Keep important status in context'
        scenario='A flight-plan page needs persistent feedback that remains visible while the user reviews the record.'
      >
        <div className='grid gap-2 md:grid-cols-2'>
          {statuses.map(({ type, label, message }) => (
            <Alert key={type} variant={type === 'error' ? 'destructive' : type}>
              <AlertTitle>{label}</AlertTitle>
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          ))}
        </div>
      </UseCaseSection>
      <UseCaseSection
        title='Keep field guidance visible on page load'
        scenario='When a pilot opens mission setup, show a short informational note above the collection field it explains; keep it visible without a dismiss or action button.'
      >
        <div className='mx-auto w-full max-w-xl space-y-2'>
          <Alert variant='info' role='note' aria-label='Page-load callout'>
            <AlertDescription>Choose a collection to keep this mission with the right review team.</AlertDescription>
          </Alert>
          <FieldRoot>
            <FieldLabel>Review collection</FieldLabel>
            <FieldControl render={<Input value='Coastal operations' readOnly aria-label='Review collection' />} />
            <FieldDescription>The callout stays beside the field it explains.</FieldDescription>
          </FieldRoot>
        </div>
      </UseCaseSection>
      <UseCaseSection
        title='Confirm a completed action briefly'
        scenario='After saving a flight plan, show a short-lived message that does not interrupt the next task.'
      >
        <div className='flex flex-wrap gap-2'>
          {statuses
            .filter(({ type }) => type === 'success' || type === 'info')
            .map(({ type, label, message }) => (
              <Button
                key={type}
                size='sm'
                variant='outline'
                onClick={() => toastManager.add({ type, title: label, description: message })}
              >
                Show {label.toLowerCase()} toast
              </Button>
            ))}
        </div>
      </UseCaseSection>
      <UseCaseSection
        title='Review accumulated notifications in a panel'
        scenario='A pilot opens the notification center to distinguish task reminders from system-generated updates.'
      >
        <p className='text-xs text-muted-foreground'>Experimental preview · panel contents are sample notifications.</p>
        <Button variant='outline' aria-expanded={panelOpen} onClick={() => setPanelOpen((open) => !open)}>
          {panelOpen ? 'Close notifications · 3 unread' : 'Notifications · 3 unread'}
        </Button>
        {panelOpen && (
          <div
            role='region'
            aria-label='Notification center'
            className='max-w-xl divide-y divide-border border border-border'
          >
            <div className='space-y-1 p-3'>
              <div className='flex flex-wrap items-center gap-2'>
                <p className='font-medium'>Task · Draft review pending</p>
                <Badge count='Unread' status='processing' />
                <Badge count='Information' status='outline' />
              </div>
              <p className='text-muted-foreground'>A sample task is waiting for review.</p>
            </div>
            <div className='space-y-1 p-3'>
              <div className='flex flex-wrap items-center gap-2'>
                <p className='font-medium'>System · Map data refreshed</p>
                <Badge count='Unread' status='processing' />
                <Badge count='Success' status='success' />
              </div>
              <p className='text-muted-foreground'>The latest coverage is available for route planning.</p>
            </div>
            <div className='space-y-1 p-3'>
              <div className='flex flex-wrap items-center gap-2'>
                <p className='font-medium'>Priority · Notification access updated</p>
                <Badge count='Unread' status='processing' />
                <Badge count='Warning' status='warning' />
              </div>
              <p className='text-muted-foreground'>A workspace access setting changed in this sample.</p>
            </div>
          </div>
        )}
      </UseCaseSection>
      <UseCaseSection
        title='Offer a next step or acknowledge a critical notice'
        scenario='Compare a contextual action, a dismissible service update, and a modal for a service interruption.'
      >
        <Alert variant='warning'>
          <AlertTitle>Action needed</AlertTitle>
          <AlertDescription>A sample mission record is missing an optional description.</AlertDescription>
          <AlertAction>
            <Button
              size='sm'
              variant='ghost'
              onClick={() => setActionMessage('Description editor preview opened; no record was changed.')}
            >
              Edit description
            </Button>
          </AlertAction>
        </Alert>
        {updateVisible ? (
          <div className='space-y-2'>
            <p className='text-xs text-muted-foreground'>
              Experimental preview · banner guidance is still being explored.
            </p>
            <Alert variant='info' className='items-center'>
              <AlertDescription>
                <strong>Service update:</strong> A sample feature update is available.
              </AlertDescription>
              <AlertAction>
                <Button size='sm' variant='ghost' onClick={() => setUpdateVisible(false)}>
                  Dismiss
                </Button>
              </AlertAction>
            </Alert>
          </div>
        ) : (
          <Button size='sm' variant='outline' onClick={() => setUpdateVisible(true)}>
            Show service update
          </Button>
        )}
        <p role='status' aria-live='polite' className='text-muted-foreground'>
          {actionMessage}
        </p>
        <Dialog>
          <DialogTrigger render={<Button variant='outline'>Show blocking maintenance notice</Button>} />
          <DialogPortal>
            <DialogBackdrop />
            <DialogPopup>
              <DialogHeader>
                <DialogTitle>Sample service interruption</DialogTitle>
                <DialogDescription>
                  This modal illustrates a blocking service notice. No real service status is represented.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose>Acknowledge</DialogClose>
              </DialogFooter>
            </DialogPopup>
          </DialogPortal>
        </Dialog>
      </UseCaseSection>
    </DemoFrame>
  )
}

function NotificationsDemoWithProvider() {
  return (
    <ToastProvider>
      <NotificationsDemo />
      <ToastPortal>
        <ToastViewport>
          <ToastItems />
        </ToastViewport>
      </ToastPortal>
    </ToastProvider>
  )
}

function OverflowDemo() {
  const [expanded, setExpanded] = useState(false)
  const description =
    'North coast survey covers the shoreline from the east access road to the protected wetland boundary. Review the complete route notes before assigning the flight plan.'
  return (
    <DemoFrame>
      <UseCaseSection
        title='Expand a long route note'
        scenario='Keep an overview readable, then let the pilot reveal the full description on demand.'
      >
        <p className={expanded ? '' : 'line-clamp-2'}>{description}</p>
        <Button size='sm' variant='ghost' aria-expanded={expanded} onClick={() => setExpanded((value) => !value)}>
          {expanded ? 'Show less' : 'Show more'}
        </Button>
      </UseCaseSection>
      <UseCaseSection
        title='Fit identifiers and links in compact layouts'
        scenario='Mission IDs and long URLs must fit a record row while their full values remain discoverable.'
      >
        <dl className='grid min-w-0 gap-3 sm:grid-cols-3'>
          <div className='min-w-0'>
            <dt className='text-muted-foreground'>End-line</dt>
            <dd className='truncate' title='mission-north-coast-survey-2026-0048'>
              mission-north-coast-survey-2026-0048
            </dd>
          </div>
          <div className='min-w-0'>
            <dt className='text-muted-foreground'>Mid-line</dt>
            <dd className='truncate' title='flight-plan-4829017356-revision-a'>
              flight-plan-4829017356-revision-a
            </dd>
          </div>
          <div className='min-w-0'>
            <dt className='text-muted-foreground'>Front-line</dt>
            <dd className='truncate text-right' dir='rtl'>
              <bdi dir='ltr' title='https://skytrack.example.com/missions/north-coast-survey'>
                https://skytrack.example.com/missions/north-coast-survey
              </bdi>
            </dd>
          </div>
        </dl>
      </UseCaseSection>
      <UseCaseSection
        title='Collapse long breadcrumb paths'
        scenario='Keep the current mission location visible while moving earlier workspace levels into an overflow menu.'
      >
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <Menu>
                <MenuTrigger
                  render={
                    <Button size='sm' variant='ghost' aria-label='Show earlier locations'>
                      …
                    </Button>
                  }
                />
                <MenuPortal>
                  <MenuPositioner side='bottom' align='start' sideOffset={4}>
                    <MenuPopup>
                      <MenuItem>Organization</MenuItem>
                      <MenuItem>Workspace</MenuItem>
                    </MenuPopup>
                  </MenuPositioner>
                </MenuPortal>
              </Menu>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink render={<a href='#missions' />}>Missions</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>North coast survey</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </UseCaseSection>
    </DemoFrame>
  )
}

function ReadOnlyDemo() {
  const [value, setValue] = useState('workspace-2048')
  return (
    <DemoFrame>
      <UseCaseSection
        title='Review mission settings without changing them'
        scenario='Compare editable, read-only, and prerequisite-blocked values in a flight approval record.'
      >
        <p className='text-muted-foreground'>
          Read-only values remain part of the workflow and can be reviewed or copied. Disabled values cannot be operated
          because a condition blocks them.
        </p>
        <div className='grid min-w-0 gap-4 md:grid-cols-2'>
          <FieldRoot>
            <FieldLabel>Workspace ID · editable</FieldLabel>
            <Input value={value} onChange={(event) => setValue(event.target.value)} />
            <FieldDescription>This enabled control can be changed.</FieldDescription>
          </FieldRoot>
          <FieldRoot>
            <FieldLabel>Workspace ID · read-only</FieldLabel>
            <Input value={value} readOnly />
            <FieldDescription>Focus, select, and copy; editing is unavailable in this context.</FieldDescription>
          </FieldRoot>
          <FieldRoot>
            <FieldLabel>Launch approval · disabled</FieldLabel>
            <Input value='Waiting for review' disabled />
            <FieldDescription>Unavailable until the approval prerequisite is complete.</FieldDescription>
          </FieldRoot>
        </div>
      </UseCaseSection>
      <UseCaseSection
        title='Review selected options and bound values'
        scenario='A reviewer can inspect the assigned aircraft, enabled safety checks, and planned date while controls remain non-operable.'
      >
        <div className='grid min-w-0 gap-4 md:grid-cols-2'>
          <FieldRoot>
            <FieldLabel>Assigned aircraft · read-only</FieldLabel>
            <Input value='SkyTrack Scout 04' readOnly />
            <FieldDescription>The selected value remains visible for approval.</FieldDescription>
          </FieldRoot>
          <FieldRoot>
            <FieldLabel>Launch window · read-only</FieldLabel>
            <Input type='text' value='Nov 5, 2026' readOnly />
            <FieldDescription>The saved date stays readable; this view does not offer a date picker.</FieldDescription>
          </FieldRoot>
          <label className='flex items-center gap-2'>
            <CheckboxRoot checked readOnly aria-label='Weather review completed' />
            <span>Weather review completed · read-only</span>
          </label>
        </div>
      </UseCaseSection>
      <UseCaseSection
        title='Keep an empty selection informative'
        scenario='A restricted reviewer can see that an optional mission note has no value without mistaking a disabled control for read-only content.'
      >
        <FieldRoot className='max-w-md'>
          <p className='text-sm font-medium'>Mission note · read-only</p>
          <p className='text-foreground'>No note provided</p>
        </FieldRoot>
      </UseCaseSection>
    </DemoFrame>
  )
}

function SearchDemo() {
  const [query, setQuery] = useState('')
  const [mode, setMode] = useState<'basic' | 'active' | 'focused'>('active')
  const [scope, setScope] = useState('All')
  const [submittedQuery, setSubmittedQuery] = useState('')
  const [searchFocused, setSearchFocused] = useState(false)
  const [recoveryQuery, setRecoveryQuery] = useState('')
  const [previewQuery, setPreviewQuery] = useState('')
  const [previewActiveIndex, setPreviewActiveIndex] = useState(0)
  const [previewOpen, setPreviewOpen] = useState(false)
  const [searchLoading, setSearchLoading] = useState(false)
  const scopedItems = SAMPLE_ITEMS.filter((item) => scope === 'All' || item.type === scope)
  const results = scopedItems.filter((item) =>
    item.name.toLowerCase().includes((mode === 'basic' ? submittedQuery : query).toLowerCase())
  )
  const recoveryResults = SAMPLE_ITEMS.filter((item) => item.name.toLowerCase().includes(recoveryQuery.toLowerCase()))
  const previewResults = SAMPLE_ITEMS.filter((item) => item.name.toLowerCase().includes(previewQuery.toLowerCase()))
  const previewOptions = previewResults.slice(0, 3)
  return (
    <DemoFrame>
      <UseCaseSection
        title='Find missions and narrow the result set'
        scenario='Compare submitted search, live filtering, and category-scoped search with recent suggestions and result feedback.'
      >
        <div className='flex flex-wrap gap-2'>
          {(['basic', 'active', 'focused'] as const).map((value) => (
            <Button
              key={value}
              size='sm'
              variant={mode === value ? 'secondary' : 'outline'}
              aria-pressed={mode === value}
              onClick={() => {
                setMode(value)
                setSubmittedQuery('')
              }}
            >
              {value[0].toUpperCase() + value.slice(1)}
            </Button>
          ))}
        </div>
        {mode === 'focused' && (
          <FieldRoot className='max-w-xs'>
            <FieldLabel>Search scope</FieldLabel>
            <Select<string> value={scope} onValueChange={(value) => value && setScope(value)}>
              <SelectTrigger>
                <SelectValue />
                <SelectIcon />
              </SelectTrigger>
              <SelectPortal>
                <SelectPositioner side='bottom' align='start' sideOffset={4}>
                  <SelectPopup>
                    <SelectList>
                      {['All', 'Planning', 'Review', 'Complete'].map((value) => {
                        const count =
                          value === 'All'
                            ? SAMPLE_ITEMS.length
                            : SAMPLE_ITEMS.filter((item) => item.type === value).length
                        return (
                          <SelectItem key={value} value={value}>
                            <SelectItemIndicator />
                            <SelectItemText>
                              {value} · {count}
                            </SelectItemText>
                          </SelectItem>
                        )
                      })}
                    </SelectList>
                  </SelectPopup>
                </SelectPositioner>
              </SelectPortal>
            </Select>
          </FieldRoot>
        )}
        <form
          className='flex flex-wrap gap-2'
          onSubmit={(event) => {
            event.preventDefault()
            setSubmittedQuery(query)
          }}
        >
          <Input
            value={query}
            onChange={(event) => {
              setQuery(event.target.value)
              if (mode !== 'basic') setSubmittedQuery(event.target.value)
            }}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            placeholder={
              mode === 'focused' ? `Search ${scope === 'All' ? 'missions' : scope.toLowerCase()}` : 'Search missions'
            }
            aria-label='Search missions'
            startAdornment={<MagnifyingGlassIcon aria-hidden='true' />}
            endAdornment={
              query ? (
                <Button
                  size='icon-xs'
                  variant='ghost'
                  aria-label='Clear search'
                  onClick={() => {
                    setQuery('')
                    setSubmittedQuery('')
                  }}
                >
                  <XIcon />
                </Button>
              ) : null
            }
          />
          {mode === 'basic' && <Button type='submit'>Search</Button>}
        </form>
        {searchFocused && !query && (
          <div className='flex flex-wrap items-center gap-2'>
            <span className='text-muted-foreground'>Recent searches:</span>
            {['North coast', 'Runway inspection'].map((recent) => (
              <Button
                key={recent}
                size='sm'
                variant='ghost'
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => {
                  setQuery(recent)
                  setSubmittedQuery(recent)
                  setSearchFocused(false)
                }}
              >
                {recent}
              </Button>
            ))}
          </div>
        )}
        {mode === 'focused' && query && scope !== 'All' && (
          <Button size='sm' variant='ghost' onClick={() => setScope('All')}>
            Search all missions for “{query}”
          </Button>
        )}
        <div className='space-y-2'>
          <p role='status' aria-live='polite' className='text-muted-foreground'>
            {mode === 'basic' && !submittedQuery
              ? 'Submit a query to see the results page preview.'
              : `${results.length} ${results.length === 1 ? 'mission' : 'missions'} match`}
            {mode === 'focused' ? ` · ${scope} scope` : ''}
          </p>
          {mode === 'basic' && !submittedQuery ? null : results.length ? (
            <ul className='list-disc ps-5'>
              {results.map((item) => (
                <li key={item.name}>{item.name}</li>
              ))}
            </ul>
          ) : (
            <Alert role='status'>
              <AlertTitle>No missions found</AlertTitle>
              <AlertDescription>Try another term, widen the scope, or clear the search.</AlertDescription>
            </Alert>
          )}
          {mode === 'basic' && submittedQuery && (
            <p className='text-xs text-muted-foreground'>Basic search opens a separate results view in this sample.</p>
          )}
        </div>
      </UseCaseSection>
      <UseCaseSection
        title='Review result count and recover from no matches'
        scenario='Show a live match count, then clear an unmatched term to recover the complete sample list.'
      >
        <FieldRoot className='max-w-md'>
          <FieldLabel>Search the sample catalog</FieldLabel>
          <Input
            value={recoveryQuery}
            onChange={(event) => setRecoveryQuery(event.target.value)}
            placeholder='Try an unmatched term'
          />
        </FieldRoot>
        <p aria-live='polite' className='text-muted-foreground'>
          {recoveryResults.length} {recoveryResults.length === 1 ? 'mission' : 'missions'} found in this example.
        </p>
        {recoveryResults.length ? (
          <ul className='list-disc ps-5'>
            {recoveryResults.map((item) => (
              <li key={item.name}>{item.name}</li>
            ))}
          </ul>
        ) : (
          <Alert role='status'>
            <AlertTitle>No missions found</AlertTitle>
            <AlertDescription>Clear the term to restore the complete sample list.</AlertDescription>
          </Alert>
        )}
        {recoveryQuery && (
          <Button size='sm' variant='outline' onClick={() => setRecoveryQuery('')}>
            Clear search
          </Button>
        )}
      </UseCaseSection>
      <UseCaseSection
        title='Preview matches before opening the full result set'
        scenario='For a short mission list, filter matches as the user types and show suggestions in place.'
      >
        <FieldRoot className='max-w-md'>
          <FieldLabel>Find a mission preview</FieldLabel>
          <Input
            value={previewQuery}
            onChange={(event) => {
              setPreviewQuery(event.target.value)
              setPreviewActiveIndex(0)
              setPreviewOpen(Boolean(event.target.value))
            }}
            onFocus={() => setPreviewOpen(Boolean(previewQuery))}
            onKeyDown={(event) => {
              if (event.key === 'ArrowDown' && previewOptions.length) {
                event.preventDefault()
                setPreviewActiveIndex((index) => (index + 1) % previewOptions.length)
              } else if (event.key === 'ArrowUp' && previewOptions.length) {
                event.preventDefault()
                setPreviewActiveIndex((index) => (index - 1 + previewOptions.length) % previewOptions.length)
              } else if (event.key === 'Enter' && previewOpen && previewOptions[previewActiveIndex]) {
                event.preventDefault()
                setPreviewQuery(previewOptions[previewActiveIndex].name)
                setPreviewOpen(false)
              } else if (event.key === 'Escape') {
                setPreviewOpen(false)
              }
            }}
            role='combobox'
            aria-expanded={previewOpen}
            aria-controls={previewOpen ? 'mission-search-suggestions' : undefined}
            aria-activedescendant={previewOpen ? `mission-search-option-${previewActiveIndex}` : undefined}
            placeholder='Type a mission name'
          />
        </FieldRoot>
        {previewOpen && (
          <ul
            id='mission-search-suggestions'
            role='listbox'
            aria-label='Mission suggestions'
            aria-live='polite'
            className='divide-y divide-border border-y border-border'
          >
            {previewOptions.map((item, index) => (
              <li
                key={item.name}
                id={`mission-search-option-${index}`}
                role='option'
                aria-selected={previewActiveIndex === index}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => {
                  setPreviewQuery(item.name)
                  setPreviewOpen(false)
                }}
                className={`flex cursor-pointer items-center justify-between gap-3 py-2 ${previewActiveIndex === index ? 'bg-muted' : ''}`}
              >
                <span>{item.name}</span>
                <Badge variant='outline'>{item.type}</Badge>
              </li>
            ))}
            {!previewResults.length && <li className='py-2 text-muted-foreground'>No matching preview yet.</li>}
          </ul>
        )}
      </UseCaseSection>
      <UseCaseSection
        title='Signal a slow search and support right-to-left entry'
        scenario='For a resource-intensive query, communicate that the request is still running; keep the search icon and text-entry order usable in right-to-left interfaces.'
      >
        <FieldRoot className='max-w-md'>
          <Input
            dir='rtl'
            aria-label='Search missions in right-to-left layout'
            placeholder='ابحث عن مهمة'
            startAdornment={<MagnifyingGlassIcon aria-hidden='true' />}
          />
        </FieldRoot>
        {searchLoading && (
          <Progress value={null}>
            <ProgressLabel>Searching the mission archive</ProgressLabel>
            <ProgressTrack>
              <ProgressIndicator />
            </ProgressTrack>
          </Progress>
        )}
        <Button size='sm' variant='outline' onClick={() => setSearchLoading((current) => !current)}>
          {searchLoading ? 'Finish sample search' : 'Preview slow search'}
        </Button>
      </UseCaseSection>
    </DemoFrame>
  )
}

function StatusIndicatorsDemo() {
  return (
    <DemoFrame>
      <UseCaseSection
        title='Show connection and attention states'
        scenario='A mission overview uses distinct symbols and text labels so status is not communicated by color alone.'
      >
        <ul className='grid gap-2'>
          <li className='flex items-center gap-2'>
            <CheckCircleIcon className='size-5 text-success' aria-hidden='true' />
            <span>Aircraft connection · Connected</span>
          </li>
          <li className='flex items-center gap-2'>
            <WarningCircleIcon className='size-5 text-warning' aria-hidden='true' />
            <span>Route review · Action needed</span>
          </li>
        </ul>
      </UseCaseSection>
      <UseCaseSection
        title='Scan operational readiness in a compact list'
        scenario='Use a shape plus a readable label to distinguish ready, review, and blocked items.'
      >
        <ul className='grid gap-2'>
          <li className='flex items-center gap-2'>
            <span aria-hidden='true' className='size-4 rounded-full border-2 border-success' />
            <span>Ready</span>
          </li>
          <li className='flex items-center gap-2'>
            <span aria-hidden='true' className='size-4 rotate-45 border-2 border-warning' />
            <span>Needs review</span>
          </li>
          <li className='flex items-center gap-2'>
            <span aria-hidden='true' className='size-4 border-2 border-destructive' />
            <span>Blocked</span>
          </li>
        </ul>
      </UseCaseSection>
      <UseCaseSection
        title='Summarize unread work in navigation'
        scenario='Show a queue count, an unread item, and the meaningful zero state.'
      >
        <div className='grid grid-cols-3 gap-4 text-center'>
          <div className='grid justify-items-center gap-1'>
            <span
              role='img'
              aria-label='Notifications icon with four unread items'
              className='relative inline-flex size-12 items-center justify-center rounded-(--radius) border border-border'
            >
              <BellIcon aria-hidden='true' className='size-5' />
              <Badge count={4} status='error' className='absolute -end-1 -top-1' />
            </span>
            <span className='text-sm text-muted-foreground'>4 unread</span>
          </div>
          <div className='grid justify-items-center gap-1'>
            <span
              role='img'
              aria-label='Reports icon with a new-item dot'
              className='relative inline-flex size-10 items-center justify-center rounded-(--radius) border border-border'
            >
              <FileTextIcon aria-hidden='true' className='size-4' />
              <Badge dot status='processing' className='absolute -end-1 -top-1' />
            </span>
            <span className='text-sm text-muted-foreground'>New report</span>
          </div>
          <div className='grid justify-items-center gap-1'>
            <span
              role='img'
              aria-label='Review queue icon with no unread badge'
              className='inline-flex size-10 items-center justify-center rounded-(--radius) border border-border'
            >
              <CheckCircleIcon aria-hidden='true' className='size-4' />
            </span>
            <span className='text-sm text-muted-foreground'>0 unread · badge hidden</span>
          </div>
        </div>
      </UseCaseSection>
      <UseCaseSection
        title='Compare operational trends over time'
        scenario='Make the comparison period explicit when reporting mission completion or aircraft health changes.'
      >
        <div className='grid gap-2 sm:grid-cols-2'>
          <p className='flex items-center gap-2'>
            <ArrowUpIcon className='size-4 text-success' aria-hidden='true' />
            <strong>+12%</strong>
            <span className='text-muted-foreground'>sample task completion vs. prior period</span>
          </p>
          <p className='flex items-center gap-2'>
            <ArrowDownIcon className='size-4 text-destructive' aria-hidden='true' />
            <strong>−4%</strong>
            <span className='text-muted-foreground'>sample service availability vs. prior period</span>
          </p>
        </div>
      </UseCaseSection>
      <p className='text-muted-foreground'>
        Sample data only. Color is never the only signal; these labels and percentages do not define operational
        thresholds or flight guidance.
      </p>
    </DemoFrame>
  )
}

function highlightMatches(text: string, query: string): ReactNode {
  if (!query) return text
  const haystack = text.toLowerCase()
  const needle = query.toLowerCase()
  const result: ReactNode[] = []
  let start = 0
  let match = haystack.indexOf(needle, start)
  let key = 0
  while (match !== -1) {
    if (match > start) result.push(text.slice(start, match))
    result.push(
      <mark key={`match-${key++}`} className='bg-primary/20 text-foreground'>
        {text.slice(match, match + query.length)}
      </mark>
    )
    start = match + query.length
    match = haystack.indexOf(needle, start)
  }
  if (start < text.length) result.push(text.slice(start))
  return result
}

function TextToolbarDemo() {
  const [editorText, setEditorText] = useState(
    'North coast mission brief\nSample notes: route summary, assigned asset, and linked reference.'
  )
  const [findQuery, setFindQuery] = useState('')
  const [findDraft, setFindDraft] = useState(
    'River mapping review\nConfirm the planned survey boundary before the team briefing.'
  )
  const [attachment, setAttachment] = useState(false)
  const [link, setLink] = useState('')
  const [linkOpen, setLinkOpen] = useState(false)
  const [embeddedLink, setEmbeddedLink] = useState('')
  const [message, setMessage] = useState('Unsaved local draft preview.')
  const [formats, setFormats] = useState<string[]>(['bold'])
  const [textStyle, setTextStyle] = useState<'body' | 'heading' | 'quote'>('body')
  const matches = findQuery ? findDraft.toLowerCase().split(findQuery.toLowerCase()).length - 1 : 0
  const matchLabel = `${matches} ${matches === 1 ? 'match' : 'matches'}`
  return (
    <DemoFrame>
      <UseCaseSection
        title='Format a mission brief and manage its draft'
        scenario='A coordinator styles a route note, uses compact toolbar menus, attaches a reference file, and saves a local draft preview.'
      >
        <Toolbar className='w-full flex-wrap border border-border p-2'>
          <ToggleGroup
            multiple
            value={formats}
            onValueChange={(value) => setFormats(value as string[])}
            aria-label='Text formatting'
          >
            <ToolbarButton render={<Toggle />} value='bold' aria-label='Bold'>
              B
            </ToolbarButton>
            <ToolbarButton render={<Toggle />} value='italic' aria-label='Italic'>
              I
            </ToolbarButton>
            <ToolbarButton render={<Toggle />} value='underline' aria-label='Underline'>
              U
            </ToolbarButton>
          </ToggleGroup>
          <ToolbarSeparator />
          <Menu>
            <ToolbarButton render={<MenuTrigger />}>Text style</ToolbarButton>
            <MenuPortal>
              <MenuPositioner side='bottom' align='start' sideOffset={4}>
                <MenuPopup>
                  <MenuItem
                    onClick={() => {
                      setTextStyle('heading')
                      setMessage('Heading style applied to the local draft preview.')
                    }}
                  >
                    Heading
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setTextStyle('body')
                      setMessage('Body style applied to the local draft preview.')
                    }}
                  >
                    Body
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setTextStyle('quote')
                      setMessage('Quote style applied to the local draft preview.')
                    }}
                  >
                    Quote
                  </MenuItem>
                </MenuPopup>
              </MenuPositioner>
            </MenuPortal>
          </Menu>
          <Menu>
            <ToolbarButton render={<MenuTrigger />}>More</ToolbarButton>
            <MenuPortal>
              <MenuPositioner side='bottom' align='start' sideOffset={4}>
                <MenuPopup>
                  <MenuItem onClick={() => setLinkOpen(true)}>Embed link</MenuItem>
                  <MenuItem onClick={() => setAttachment(true)}>Attach file</MenuItem>
                  <MenuItem onClick={() => setMessage('Draft saved in this local example.')}>Save draft</MenuItem>
                </MenuPopup>
              </MenuPositioner>
            </MenuPortal>
          </Menu>
        </Toolbar>
        {linkOpen && (
          <div className='flex flex-wrap gap-2'>
            <Input
              value={link}
              onChange={(event) => setLink(event.target.value)}
              aria-label='Embed link'
              placeholder='Paste a link to embed'
            />
            <Button
              size='sm'
              variant='outline'
              onClick={() => {
                if (!link.trim()) {
                  setMessage('Enter a link before embedding it.')
                  return
                }
                setEmbeddedLink(link.trim())
                setLinkOpen(false)
                setMessage('Link added to the local draft preview.')
              }}
            >
              Add link
            </Button>
          </div>
        )}
        <div className='space-y-2'>
          <p className='text-sm text-muted-foreground'>Formatted draft preview · local sample</p>
          <div
            role='region'
            aria-label='Formatted draft preview'
            className={`min-h-16 whitespace-pre-wrap rounded-(--radius) border border-border bg-muted/30 p-3 ${textStyle === 'heading' ? 'text-xl font-medium' : textStyle === 'quote' ? 'border-s-2 ps-3 italic' : ''}`}
            style={{
              fontWeight: formats.includes('bold') ? 600 : 400,
              fontStyle: formats.includes('italic') ? 'italic' : 'normal',
              textDecoration: formats.includes('underline') ? 'underline' : 'none'
            }}
          >
            {editorText}
          </div>
          {embeddedLink && <p className='text-sm'>Reference: {embeddedLink}</p>}
          <FieldRoot>
            <FieldLabel>Edit draft text</FieldLabel>
            <FieldControl
              render={<textarea />}
              className='min-h-20 resize-y py-3'
              value={editorText}
              onChange={(event) => setEditorText(event.target.value)}
            />
          </FieldRoot>
          {attachment && (
            <Attachment state='done' className='w-full'>
              <AttachmentMedia>PDF</AttachmentMedia>
              <AttachmentContent>
                <AttachmentTitle>mission-brief.pdf</AttachmentTitle>
                <AttachmentDescription>
                  Attached sample ·{' '}
                  <Button
                    size='icon-xs'
                    variant='ghost'
                    aria-label='Remove attachment'
                    onClick={() => setAttachment(false)}
                  >
                    ×
                  </Button>
                </AttachmentDescription>
              </AttachmentContent>
            </Attachment>
          )}
        </div>
        <p role='status' aria-live='polite' className='text-muted-foreground'>
          Local sample only. {message}
        </p>
      </UseCaseSection>
      <UseCaseSection
        title='Find and edit wording in context'
        scenario='Search within the brief, see the match count, and update the wording in this example.'
      >
        <Alert variant='warning'>
          <AlertTitle>Experimental example</AlertTitle>
          <AlertDescription>
            The maintained guidance marks in-editor keyword search as not ready for production. This preview only
            demonstrates a local match count.
          </AlertDescription>
        </Alert>
        <Input
          value={findQuery}
          onChange={(event) => setFindQuery(event.target.value)}
          startAdornment={<MagnifyingGlassIcon aria-hidden='true' />}
          endAdornment={
            findQuery ? (
              <div className='flex items-center gap-1'>
                <Badge count={matchLabel} size='sm' />
                <Button size='icon-xs' variant='ghost' aria-label='Clear find text' onClick={() => setFindQuery('')}>
                  <XIcon />
                </Button>
              </div>
            ) : null
          }
          placeholder='Find text in draft'
          aria-label='Find text in draft'
          id='text-toolbar-search-secondary'
        />
        <div className='space-y-2'>
          <p className='text-sm text-muted-foreground'>Draft editor · edits stay in this preview</p>
          <FieldRoot>
            <FieldLabel>Draft text</FieldLabel>
            <FieldControl
              render={<textarea />}
              className='min-h-24 resize-y py-3'
              value={findDraft}
              onChange={(event) => setFindDraft(event.target.value)}
            />
          </FieldRoot>
          <p role='status' aria-live='polite' className='text-sm text-muted-foreground'>
            {findQuery ? `${matchLabel} in this draft.` : 'Enter a word to see how many times it appears.'}
          </p>
        </div>
        <div
          role='region'
          aria-label='Edited draft preview'
          className='min-h-16 whitespace-pre-wrap rounded-(--radius) border border-border bg-muted/30 p-3'
        >
          {highlightMatches(findDraft, findQuery)}
        </div>
      </UseCaseSection>
    </DemoFrame>
  )
}

function ChatbotsDemo() {
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState<Array<{ role: 'user' | 'assistant'; text: string }>>([])
  const [navigationPreviewOpen, setNavigationPreviewOpen] = useState(false)
  const [connectionError, setConnectionError] = useState(false)
  const [retryResult, setRetryResult] = useState('No message has been retried.')
  const [humanHandoff, setHumanHandoff] = useState(false)
  const sendMessage = (value: string) => {
    const question = value.trim()
    if (!question) return
    const normalized = question.toLowerCase()
    const answer = normalized.includes('weather')
      ? 'This local sample has no authorized weather policy, so it cannot provide flight guidance.'
      : normalized.includes('route') || normalized.includes('mission')
        ? 'Open Missions to review the route, assigned aircraft, and schedule.'
        : 'I can help you find mission records. I cannot provide flight or weather guidance; open Missions or contact your flight operations team.'
    setSent((items) => [...items, { role: 'user', text: question }, { role: 'assistant', text: answer }])
    setMessage('')
  }
  return (
    <DemoFrame>
      <UseCaseSection
        title='Ask for help with mission planning'
        scenario='A pilot asks how to find route details; the scripted helper explains its limits and points to the mission record.'
      >
        <div role='log' aria-live='polite' className='space-y-2'>
          <p>
            <strong>Mission helper:</strong> I can help you find mission information. I cannot provide flight or weather
            guidance. Choose a prompt or type a question.
          </p>
          {sent.map((item, index) => (
            <p key={`${item.role}-${index}`}>
              <strong>{item.role === 'user' ? 'You' : 'Mission helper'}:</strong> {item.text}
            </p>
          ))}
        </div>
        <div className='flex flex-wrap gap-2'>
          <Button size='sm' variant='outline' onClick={() => sendMessage('How do I review a mission route?')}>
            Review route
          </Button>
          <Button size='sm' variant='outline' onClick={() => sendMessage('What should I check about weather?')}>
            Check weather
          </Button>
        </div>
        <form
          className='flex flex-col gap-2 sm:flex-row'
          onSubmit={(event) => {
            event.preventDefault()
            sendMessage(message)
          }}
        >
          <Input
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            aria-label='Message the local demo'
            placeholder='Ask about mission planning'
          />
          <Button type='submit'>Send</Button>
        </form>
        <Button size='sm' variant='ghost' onClick={() => setSent([])}>
          Clear conversation
        </Button>
      </UseCaseSection>
      <UseCaseSection
        title='Continue through standard navigation'
        scenario='When a question is outside the helper’s scope, direct the user back to the Missions workspace.'
      >
        <Button variant='outline' onClick={() => setNavigationPreviewOpen(true)}>
          Preview Missions workspace
        </Button>
        {navigationPreviewOpen && (
          <section
            role='region'
            aria-label='Missions workspace preview'
            className='max-w-xl space-y-2 rounded-(--radius) border border-border p-4'
          >
            <h4 className='font-medium'>Missions</h4>
            <p>North coast survey · Ready for review</p>
            <p className='text-sm text-muted-foreground'>
              Local destination preview only; product navigation did not occur.
            </p>
          </section>
        )}
        <p className='text-muted-foreground'>
          Scripted local responses only; unknown questions get a scope clarification. No chatbot service is connected.
        </p>
      </UseCaseSection>
      <UseCaseSection
        title='Recover when a message cannot be sent'
        scenario='If the assistant connection drops, make the failed state clear and offer a retry instead of leaving the user uncertain.'
      >
        {connectionError ? (
          <Alert variant='destructive'>
            <AlertTitle>Message not sent</AlertTitle>
            <AlertDescription>
              “How can I review my route?” was not sent. Check the connection, then retry the message.
            </AlertDescription>
            <AlertAction>
              <Button
                size='sm'
                variant='outline'
                onClick={() => {
                  setConnectionError(false)
                  setRetryResult('Message sent after reconnect: “How can I review my route?”')
                }}
              >
                Retry message
              </Button>
            </AlertAction>
          </Alert>
        ) : (
          <Button
            size='sm'
            variant='outline'
            onClick={() => {
              setRetryResult('No message has been retried.')
              setConnectionError(true)
            }}
          >
            Simulate connection error
          </Button>
        )}
        <p role='status' aria-live='polite' className='text-sm text-muted-foreground'>
          {retryResult}
        </p>
      </UseCaseSection>
      <UseCaseSection
        title='Hand off a complex request to a person'
        scenario='When the scripted helper cannot resolve an issue, show the change in conversation context and preserve a clear route back to the product.'
      >
        {humanHandoff ? (
          <Alert>
            <AlertTitle>Support conversation started</AlertTitle>
            <AlertDescription>A support teammate can continue from the mission details you shared.</AlertDescription>
          </Alert>
        ) : (
          <Button size='sm' variant='outline' onClick={() => setHumanHandoff(true)}>
            Continue with support
          </Button>
        )}
        <Button size='sm' variant='ghost' onClick={() => setHumanHandoff(false)}>
          Return to mission helper
        </Button>
      </UseCaseSection>
    </DemoFrame>
  )
}

function InAppLearningDemo() {
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

function CreateFlowsDemo() {
  const [mode, setMode] = useState<'inline' | 'modal'>('inline')
  const [open, setOpen] = useState(false)
  const [panelOpen, setPanelOpen] = useState(false)
  const [fullPageOpen, setFullPageOpen] = useState(false)
  const [discardOpen, setDiscardOpen] = useState(false)
  const [createProgress, setCreateProgress] = useState(0)
  const [name, setName] = useState('North coast survey')
  const [created, setCreated] = useState('')
  const [sidePanelResult, setSidePanelResult] = useState('')
  const [fullPageResult, setFullPageResult] = useState('')
  const [selectedCollectionMission, setSelectedCollectionMission] = useState('North coast survey')
  const create = () => {
    if (!name.trim()) return
    setCreated(name.trim())
    setOpen(false)
  }
  const quickFields = (
    <FieldRoot>
      <FieldLabel>Mission name</FieldLabel>
      <Input value={name} onChange={(event) => setName(event.target.value)} required />
    </FieldRoot>
  )
  const fields = (
    <>
      <FieldRoot>
        <FieldLabel>Mission name</FieldLabel>
        <Input value={name} onChange={(event) => setName(event.target.value)} required />
      </FieldRoot>
      <FieldRoot>
        <FieldLabel>Purpose</FieldLabel>
        <Input defaultValue='Coastal mapping' />
      </FieldRoot>
    </>
  )
  return (
    <DemoFrame>
      <UseCaseSection
        title={mode === 'inline' ? 'Create a quick mission inline' : 'Create a mission in a focused dialog'}
        scenario={
          mode === 'inline'
            ? 'Create a new one-field mission while keeping the collection visible; use this compact route when no extra context is needed.'
            : 'Use a modal for a short task that needs focused attention but not a full page.'
        }
      >
        <div className='flex flex-wrap gap-2'>
          <Button
            size='sm'
            variant={mode === 'inline' ? 'secondary' : 'outline'}
            aria-pressed={mode === 'inline'}
            onClick={() => setMode('inline')}
          >
            Inline
          </Button>
          <Button
            size='sm'
            variant={mode === 'modal' ? 'secondary' : 'outline'}
            aria-pressed={mode === 'modal'}
            onClick={() => setMode('modal')}
          >
            Modal
          </Button>
        </div>
        {mode === 'inline' ? (
          <section className='space-y-3 rounded-(--radius) border border-border p-4'>
            <div>
              <h4 className='font-medium'>Quick create</h4>
              <p className='text-muted-foreground'>One short step; keep the user in context.</p>
            </div>
            {quickFields}
            <div className='flex gap-2'>
              <Button onClick={create} disabled={!name.trim()}>
                Create mission
              </Button>
              <Button variant='outline' onClick={() => setName('')}>
                Clear
              </Button>
            </div>
          </section>
        ) : (
          <>
            <Button onClick={() => setOpen(true)}>Create mission</Button>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogPortal>
                <DialogBackdrop />
                <DialogPopup>
                  <DialogHeader>
                    <DialogTitle>New mission</DialogTitle>
                    <DialogDescription>Use a focused modal for this short creation task.</DialogDescription>
                  </DialogHeader>
                  {fields}
                  <DialogFooter>
                    <DialogClose variant='outline'>Cancel</DialogClose>
                    <Button onClick={create} disabled={!name.trim()}>
                      Create mission
                    </Button>
                  </DialogFooter>
                </DialogPopup>
              </DialogPortal>
            </Dialog>
          </>
        )}
        {created && (
          <Alert variant='success'>
            <AlertTitle>Mission created</AlertTitle>
            <AlertDescription>{created} · local sample only.</AlertDescription>
          </Alert>
        )}
        <p className='text-muted-foreground'>
          Creating a new resource is different from adding an existing one. Side-panel, tearsheet, and full-page
          surfaces suit more complex creation flows.
        </p>
      </UseCaseSection>
      <UseCaseSection
        title='Create a complex mission in a side panel'
        scenario='Keep the collection visible beside a longer creation task; this uses the library Drawer as the side-panel surface.'
      >
        <div className='grid min-w-0 gap-4 md:grid-cols-[minmax(0,1fr)_minmax(18rem,0.8fr)]'>
          <section aria-label='Mission collection' className='min-w-0 space-y-3 border border-border p-4'>
            <div>
              <h5 className='text-base font-medium text-(--foreground)'>Mission collection</h5>
              <p className='text-sm text-muted-foreground'>
                Select or review a mission while the create panel is open.
              </p>
            </div>
            <div className='grid gap-2'>
              {['North coast survey', 'River mapping'].map((mission) => (
                <Button
                  key={mission}
                  size='sm'
                  variant={selectedCollectionMission === mission ? 'secondary' : 'ghost'}
                  className='justify-start'
                  aria-pressed={selectedCollectionMission === mission}
                  onClick={() => setSelectedCollectionMission(mission)}
                >
                  {mission}
                </Button>
              ))}
            </div>
            {!panelOpen && (
              <Button variant='outline' onClick={() => setPanelOpen(true)}>
                Create a mission
              </Button>
            )}
          </section>
          {panelOpen && (
            <aside aria-label='New mission side panel' className='min-w-0 space-y-3 border border-border p-4'>
              <div>
                <h5 className='text-base font-medium text-(--foreground)'>New mission</h5>
                <p className='text-sm text-muted-foreground'>
                  Create beside {selectedCollectionMission}; the collection stays usable.
                </p>
              </div>
              {fields}
              <div className='flex flex-wrap gap-2'>
                <Button variant='outline' onClick={() => setPanelOpen(false)}>
                  Cancel
                </Button>
                <Button
                  disabled={!name.trim()}
                  onClick={() => {
                    setSidePanelResult(`${name.trim()} prepared in the local preview; no mission was saved.`)
                    setPanelOpen(false)
                  }}
                >
                  Create mission
                </Button>
              </div>
            </aside>
          )}
        </div>
        {sidePanelResult && (
          <p role='status' aria-live='polite' className='text-sm text-muted-foreground'>
            {sidePanelResult}
          </p>
        )}
      </UseCaseSection>
      <UseCaseSection
        title='Give a multi-step creation task a full-page canvas'
        scenario='Use the whole workspace when route setup needs a broader safety and map context; this is a local layout illustration, not a routed page component.'
      >
        {fullPageOpen ? (
          <section className='space-y-3 border border-border p-4'>
            <p className='sub-heading'>NEW MISSION · FULL-PAGE LAYOUT PREVIEW</p>
            <h5 className='text-base font-medium text-(--foreground)'>Configure flight area</h5>
            {fields}
            <div className='flex flex-wrap gap-2'>
              <Button variant='outline' onClick={() => setDiscardOpen(true)}>
                Leave with unsaved changes
              </Button>
              <Button
                disabled={!name.trim()}
                onClick={() => {
                  setFullPageResult(`${name.trim() || 'Untitled mission'} marked created in this local example.`)
                  setFullPageOpen(false)
                }}
              >
                Create mission
              </Button>
            </div>
            <AlertDialog open={discardOpen} onOpenChange={setDiscardOpen}>
              <AlertDialogPortal>
                <AlertDialogBackdrop />
                <AlertDialogPopup>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Discard this mission draft?</AlertDialogTitle>
                    <AlertDialogDescription>Your unsaved sample changes will be discarded.</AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogClose>Keep editing</AlertDialogClose>
                    <Button
                      variant='destructive'
                      onClick={() => {
                        setFullPageOpen(false)
                        setDiscardOpen(false)
                      }}
                    >
                      Discard draft
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogPopup>
              </AlertDialogPortal>
            </AlertDialog>
          </section>
        ) : (
          <Button variant='outline' onClick={() => setFullPageOpen(true)}>
            Preview full-page creation
          </Button>
        )}
        {fullPageResult && (
          <p role='status' aria-live='polite' className='text-sm text-muted-foreground'>
            {fullPageResult}
          </p>
        )}
      </UseCaseSection>
      <UseCaseSection
        title='Use a narrow tearsheet for a compact create task'
        scenario='Show the focused, narrow side sheet layout for a short task while keeping a sense of the collection behind it.'
      >
        <div className='mx-auto flex min-h-72 w-full max-w-sm flex-col border border-border bg-background shadow-sm'>
          <div className='space-y-1 border-b border-border p-4'>
            <h5 className='text-base font-medium text-(--foreground)'>New mission · narrow tearsheet</h5>
            <p className='text-muted-foreground'>Compact task layout illustration</p>
          </div>
          <div className='flex-1 space-y-3 p-4'>
            <FieldRoot>
              <FieldLabel>Mission name</FieldLabel>
              <Input defaultValue='Coastal survey' readOnly />
            </FieldRoot>
            <FieldRoot>
              <FieldLabel>Collection</FieldLabel>
              <Input defaultValue='North region' readOnly />
            </FieldRoot>
          </div>
          <div className='flex flex-wrap justify-end gap-2 border-t border-border p-4'>
            <Button size='sm' variant='outline' disabled>
              Cancel
            </Button>
            <Button size='sm' disabled>
              Create
            </Button>
          </div>
        </div>
        <p className='text-muted-foreground'>
          Tearsheet is not a shipped `skytrack-ui` component; this static preview illustrates its layout only.
        </p>
      </UseCaseSection>
      <UseCaseSection
        title='Use a wide tearsheet when the task needs more room'
        scenario='Provide a wider sheet layout for related fields and contextual review while preserving a responsive single-column form.'
      >
        <div className='mx-auto grid min-h-72 w-full max-w-4xl grid-cols-1 border border-border bg-background shadow-sm md:grid-cols-[minmax(0,1fr)_minmax(14rem,0.7fr)]'>
          <div className='flex min-w-0 flex-col'>
            <div className='space-y-1 border-b border-border p-4'>
              <h5 className='text-base font-medium text-(--foreground)'>Configure mission · wide tearsheet</h5>
              <p className='text-muted-foreground'>Expanded create layout illustration</p>
            </div>
            <div className='grid flex-1 gap-3 p-4 sm:grid-cols-2'>
              <FieldRoot>
                <FieldLabel>Mission name</FieldLabel>
                <Input defaultValue='Coastal survey' readOnly />
              </FieldRoot>
              <FieldRoot>
                <FieldLabel>Collection</FieldLabel>
                <Input defaultValue='North region' readOnly />
              </FieldRoot>
              <FieldRoot className='sm:col-span-2'>
                <FieldLabel>Description</FieldLabel>
                <Input defaultValue='Map the coastal sample area' readOnly />
              </FieldRoot>
            </div>
          </div>
          <aside className='space-y-2 border-t border-border bg-muted/30 p-4 md:border-t-0 md:border-l'>
            <h5 className='text-base font-medium text-(--foreground)'>Review</h5>
            <p className='text-muted-foreground'>
              Name and collection are shown together before the local sample is created.
            </p>
          </aside>
          <div className='flex flex-wrap justify-end gap-2 border-t border-border p-4 md:col-span-2'>
            <Button size='sm' variant='outline' disabled>
              Cancel
            </Button>
            <Button size='sm' disabled>
              Create
            </Button>
          </div>
        </div>
        <p className='text-muted-foreground'>
          Tearsheet is not a shipped `skytrack-ui` component; this responsive layout is illustrative.
        </p>
      </UseCaseSection>
      <UseCaseSection
        title='Show completion and a brief loading state'
        scenario='After the user submits a create flow, communicate that local preparation is in progress and then show completion.'
      >
        <Progress value={createProgress}>
          <ProgressLabel>Preparing mission record · local sample</ProgressLabel>
          <ProgressValue />
          <ProgressTrack>
            <ProgressIndicator />
          </ProgressTrack>
        </Progress>
        {createProgress >= 100 ? (
          <Alert variant='success'>
            <AlertTitle>Draft ready</AlertTitle>
            <AlertDescription>No mission was saved outside this demo.</AlertDescription>
          </Alert>
        ) : (
          <Button size='sm' onClick={() => setCreateProgress((value) => Math.min(100, value + 50))}>
            {createProgress === 0 ? 'Submit sample mission' : 'Continue preparation'}
          </Button>
        )}
        <Button size='sm' variant='ghost' onClick={() => setCreateProgress(0)}>
          Reset sample
        </Button>
      </UseCaseSection>
    </DemoFrame>
  )
}

function EditDemo() {
  const [name, setName] = useState('North coast survey')
  const [draft, setDraft] = useState(name)
  const [mode, setMode] = useState<'inline' | 'high-impact'>('inline')
  const [open, setOpen] = useState(false)
  const [highImpactConfirmOpen, setHighImpactConfirmOpen] = useState(false)
  const [editPanelOpen, setEditPanelOpen] = useState(false)
  const [panelImpact, setPanelImpact] = useState<'low' | 'high'>('low')
  const [panelReviewing, setPanelReviewing] = useState(false)
  const [editPageOpen, setEditPageOpen] = useState(false)
  const [fullPageConfirmOpen, setFullPageConfirmOpen] = useState(false)
  const [inlineStatus, setInlineStatus] = useState('')
  const [modalStatus, setModalStatus] = useState('')
  const [panelStatus, setPanelStatus] = useState('')
  const [pageStatus, setPageStatus] = useState('')
  return (
    <DemoFrame>
      <UseCaseSection
        title={mode === 'inline' ? 'Make a low-impact inline change' : 'Review a higher-impact edit before saving'}
        scenario={
          mode === 'inline'
            ? 'Update a short mission label directly in its record.'
            : 'Show the current value and change summary before committing a consequential route update.'
        }
      >
        <div className='flex flex-wrap gap-2'>
          <Button
            size='sm'
            variant={mode === 'inline' ? 'secondary' : 'outline'}
            aria-pressed={mode === 'inline'}
            onClick={() => setMode('inline')}
          >
            Low-impact · inline
          </Button>
          <Button
            size='sm'
            variant={mode === 'high-impact' ? 'secondary' : 'outline'}
            aria-pressed={mode === 'high-impact'}
            onClick={() => {
              setDraft(name)
              setMode('high-impact')
            }}
          >
            High-impact · modal
          </Button>
        </div>
        {mode === 'inline' ? (
          <section className='space-y-3 rounded-(--radius) border border-border p-4'>
            <div>
              <h4 className='font-medium'>Quick value edit</h4>
              <p className='text-muted-foreground'>Use for a short, low-impact change in context.</p>
            </div>
            <InlineEdit
              value={name}
              onValueChange={(value) => {
                setName(value)
                setInlineStatus('Mission name updated in this sample.')
              }}
              label='Mission name'
            >
              <InlineEditTrigger
                render={
                  <Button variant='ghost' className='h-auto justify-start whitespace-normal px-2 py-1 text-left' />
                }
              />
              <InlineEditInput />
            </InlineEdit>
          </section>
        ) : (
          <section className='space-y-3 rounded-(--radius) border border-border p-4'>
            <div>
              <h4 className='font-medium'>Review before saving</h4>
              <p className='text-muted-foreground'>Use a focused surface for higher-impact edits.</p>
            </div>
            <p>
              Current mission: <strong>{name}</strong>
            </p>
            <Button onClick={() => setOpen(true)}>Edit mission details</Button>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogPortal>
                <DialogBackdrop />
                <DialogPopup>
                  <DialogHeader>
                    <DialogTitle>Edit mission</DialogTitle>
                    <DialogDescription>Review the proposed change before saving.</DialogDescription>
                  </DialogHeader>
                  <FieldRoot>
                    <FieldLabel>Mission name</FieldLabel>
                    <Input value={draft} onChange={(event) => setDraft(event.target.value)} />
                  </FieldRoot>
                  <FieldRoot>
                    <FieldLabel>Assigned flight area · read-only</FieldLabel>
                    <Input value='North coast' readOnly />
                    <FieldDescription>This assignment is managed by mission operations.</FieldDescription>
                  </FieldRoot>
                  <p className='text-muted-foreground'>
                    Change summary: {name} → {draft}
                  </p>
                  <DialogFooter>
                    <DialogClose variant='outline'>Cancel</DialogClose>
                    <Button
                      onClick={() => {
                        setOpen(false)
                        setHighImpactConfirmOpen(true)
                      }}
                    >
                      Review change
                    </Button>
                  </DialogFooter>
                </DialogPopup>
              </DialogPortal>
            </Dialog>
            <AlertDialog open={highImpactConfirmOpen} onOpenChange={setHighImpactConfirmOpen}>
              <AlertDialogPortal>
                <AlertDialogBackdrop />
                <AlertDialogPopup>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Confirm this higher-impact edit</AlertDialogTitle>
                    <AlertDialogDescription>
                      This changes the mission name dispatchers use to identify it in review lists. This sample has no
                      undo; no live mission is modified.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <p>
                    Mission name: {name} → {draft}
                  </p>
                  <AlertDialogFooter>
                    <AlertDialogClose onClick={() => setOpen(true)}>Keep editing</AlertDialogClose>
                    <Button
                      variant='destructive'
                      onClick={() => {
                        setName(draft)
                        setModalStatus('Mission name saved in this sample after confirmation.')
                        setHighImpactConfirmOpen(false)
                      }}
                    >
                      Confirm edit
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogPopup>
              </AlertDialogPortal>
            </AlertDialog>
          </section>
        )}
        {inlineStatus && mode === 'inline' && (
          <p role='status' aria-live='polite' className='text-muted-foreground'>
            {inlineStatus}
          </p>
        )}
        {modalStatus && mode === 'high-impact' && (
          <Alert variant='success'>
            <AlertTitle>Change confirmed</AlertTitle>
            <AlertDescription>{modalStatus}</AlertDescription>
          </Alert>
        )}
        <p className='text-muted-foreground'>
          The examples cover inline, modal, side-panel, and full-page layouts. Changes stay in local state.
        </p>
      </UseCaseSection>
      <UseCaseSection
        title='Keep a broader edit in a side panel'
        scenario='Keep the mission list in context; save low-impact edits directly or review a warning stage for high-impact changes.'
      >
        <div className='flex flex-wrap gap-2' role='group' aria-label='Side-panel edit impact'>
          <Button
            size='sm'
            variant={panelImpact === 'low' ? 'secondary' : 'outline'}
            aria-pressed={panelImpact === 'low'}
            onClick={() => setPanelImpact('low')}
          >
            Low impact
          </Button>
          <Button
            size='sm'
            variant={panelImpact === 'high' ? 'secondary' : 'outline'}
            aria-pressed={panelImpact === 'high'}
            onClick={() => setPanelImpact('high')}
          >
            High impact
          </Button>
        </div>
        <Drawer open={editPanelOpen} onOpenChange={setEditPanelOpen} swipeDirection='right'>
          <DrawerTrigger
            onClick={() => {
              setDraft(name)
              setPanelReviewing(false)
            }}
          >
            Open mission edit panel
          </DrawerTrigger>
          <DrawerPortal>
            <DrawerBackdrop />
            <DrawerViewport side='right'>
              <DrawerPopup side='right'>
                <DrawerContent>
                  <DrawerTitle>Edit mission details</DrawerTitle>
                  <DrawerDescription>
                    The mission list stays visible behind this drawer for reference.{' '}
                    {panelImpact === 'low'
                      ? 'Save this low-impact edit directly.'
                      : 'Review the consequences before saving.'}
                  </DrawerDescription>
                  {panelReviewing ? (
                    <>
                      <Alert variant='warning'>
                        <AlertTitle>Review before saving</AlertTitle>
                        <AlertDescription>
                          This changes how dispatchers identify the plan in review lists. This sample has no Undo.
                        </AlertDescription>
                      </Alert>
                      <p>
                        Mission name: {name} → {draft}
                      </p>
                      <div className='flex flex-wrap gap-2'>
                        <Button variant='outline' onClick={() => setPanelReviewing(false)}>
                          Back to edit
                        </Button>
                        <Button
                          onClick={() => {
                            setName(draft)
                            setPanelStatus('Higher-impact mission name saved in this side-panel example after review.')
                            setPanelReviewing(false)
                            setEditPanelOpen(false)
                          }}
                        >
                          Confirm and save
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <FieldRoot>
                        <FieldLabel>Mission name</FieldLabel>
                        <Input value={draft} onChange={(event) => setDraft(event.target.value)} />
                      </FieldRoot>
                      <FieldRoot>
                        <FieldLabel>Flight area · read-only</FieldLabel>
                        <Input value='North coast' readOnly />
                      </FieldRoot>
                      <div className='flex flex-wrap gap-2'>
                        <DrawerClose>Cancel</DrawerClose>
                        {panelImpact === 'low' ? (
                          <Button
                            onClick={() => {
                              setName(draft)
                              setPanelStatus('Mission name saved directly in this low-impact side-panel example.')
                              setEditPanelOpen(false)
                            }}
                          >
                            Save changes
                          </Button>
                        ) : (
                          <Button onClick={() => setPanelReviewing(true)}>Review change</Button>
                        )}
                      </div>
                    </>
                  )}
                </DrawerContent>
              </DrawerPopup>
            </DrawerViewport>
          </DrawerPortal>
        </Drawer>
        {panelStatus && (
          <p role='status' aria-live='polite' className='text-muted-foreground'>
            {panelStatus}
          </p>
        )}
      </UseCaseSection>
      <UseCaseSection
        title='Use a full-page canvas for a complex revision'
        scenario='Review a consequential full-page mission edit, then confirm its summary before saving; this is an in-place layout preview.'
      >
        {editPageOpen ? (
          <section className='max-w-2xl space-y-3 border border-border p-4'>
            <p className='sub-heading'>EDIT MISSION · FULL-PAGE LAYOUT PREVIEW</p>
            <FieldRoot>
              <FieldLabel>Mission name</FieldLabel>
              <Input value={draft} onChange={(event) => setDraft(event.target.value)} />
            </FieldRoot>
            <p className='text-muted-foreground'>
              Change summary: {name} → {draft}
            </p>
            <div className='flex gap-2'>
              <Button variant='outline' onClick={() => setEditPageOpen(false)}>
                Cancel preview
              </Button>
              <Button onClick={() => setFullPageConfirmOpen(true)}>Save revision</Button>
            </div>
          </section>
        ) : (
          <Button variant='outline' onClick={() => setEditPageOpen(true)}>
            Preview full-page edit
          </Button>
        )}
        {pageStatus && (
          <p role='status' aria-live='polite' className='text-muted-foreground'>
            {pageStatus}
          </p>
        )}
        <AlertDialog open={fullPageConfirmOpen} onOpenChange={setFullPageConfirmOpen}>
          <AlertDialogPortal>
            <AlertDialogBackdrop />
            <AlertDialogPopup>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirm full-page revision</AlertDialogTitle>
                <AlertDialogDescription>
                  This changes how dispatchers identify the plan in review lists. This sample has no Undo; no live
                  mission is modified.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <p>
                Mission name: {name} → {draft}
              </p>
              <AlertDialogFooter>
                <AlertDialogClose>Keep editing</AlertDialogClose>
                <Button
                  onClick={() => {
                    setName(draft)
                    setPageStatus('Mission name saved in this full-page example after confirmation.')
                    setFullPageConfirmOpen(false)
                    setEditPageOpen(false)
                  }}
                >
                  Confirm and save
                </Button>
              </AlertDialogFooter>
            </AlertDialogPopup>
          </AlertDialogPortal>
        </AlertDialog>
      </UseCaseSection>
    </DemoFrame>
  )
}

function ExportDemo() {
  const toastManager = useToastManager()
  const [format, setFormat] = useState('CSV')
  const [location, setLocation] = useState('Downloads')
  const [preparing, setPreparing] = useState(false)
  const [progressError, setProgressError] = useState(false)
  const [downloadStatus, setDownloadStatus] = useState('Choose the standard report action; no file will be generated.')
  const [configurationStatus, setConfigurationStatus] = useState(
    'Choose format and destination; no file will be generated.'
  )
  const [progressStatus, setProgressStatus] = useState('Export preparation has not started.')
  const [completionStatus, setCompletionStatus] = useState('No success notification has been shown.')
  const [fileName, setFileName] = useState('mission-report')
  const [exportError, setExportError] = useState('')
  const [destinationError, setDestinationError] = useState(false)
  return (
    <DemoFrame>
      <UseCaseSection
        title='Download a standard report with its intuitive name'
        scenario='When the user needs the default report and no format or destination choice, offer a direct download action without an extra form.'
      >
        <Button
          onClick={() =>
            setDownloadStatus(
              'mission-summary.csv is shown as the default filename. This preview does not create or download a file.'
            )
          }
        >
          Preview standard download
        </Button>
        <p role='status' aria-live='polite' className='text-muted-foreground'>
          {downloadStatus}
        </p>
      </UseCaseSection>
      <UseCaseSection
        title='Customize a report before export'
        scenario='When users can change the filename, format, or destination, show a focused configuration flow with a sensible default.'
      >
        <FieldRoot>
          <FieldLabel>File name</FieldLabel>
          <Input
            value={fileName}
            onChange={(event) => {
              setFileName(event.target.value)
              setExportError('')
            }}
            endAdornment={<span>.{format.toLowerCase()}</span>}
          />
          <FieldDescription>Use an intuitive default name; edit it before preparing the sample.</FieldDescription>
          <FieldError match={Boolean(exportError)}>{exportError}</FieldError>
        </FieldRoot>
        <FieldRoot>
          <FieldLabel>Export format</FieldLabel>
          <div className='flex flex-wrap gap-2'>
            {['CSV', 'JSON', 'GeoJSON'].map((option) => (
              <Button
                key={option}
                variant={format === option ? 'secondary' : 'outline'}
                aria-pressed={format === option}
                onClick={() => {
                  setFormat(option)
                  setDestinationError(false)
                  setConfigurationStatus(`${option} selected for the local example.`)
                }}
              >
                {option}
              </Button>
            ))}
          </div>
        </FieldRoot>
        <FieldRoot>
          <FieldLabel>Destination</FieldLabel>
          <div className='flex flex-wrap gap-2'>
            {['Downloads', 'Mission files'].map((option) => (
              <Button
                key={option}
                size='sm'
                variant={location === option ? 'secondary' : 'outline'}
                aria-pressed={location === option}
                onClick={() => {
                  setLocation(option)
                  setDestinationError(false)
                  setConfigurationStatus(`${option} selected as the local export destination.`)
                }}
              >
                {option}
              </Button>
            ))}
          </div>
          <FieldDescription>Choose where the exported report would be saved in a real workflow.</FieldDescription>
        </FieldRoot>
        <div className='flex flex-wrap gap-2'>
          <Button
            onClick={() =>
              !fileName.trim()
                ? setExportError('Enter a file name before exporting.')
                : (setExportError(''),
                  setDestinationError(false),
                  setConfigurationStatus(
                    `${fileName}.${format.toLowerCase()} prepared for ${location}. No download occurred.`
                  ))
            }
          >
            Prepare {format} preview
          </Button>
          <Button
            variant='outline'
            onClick={() => {
              setDestinationError(true)
              setConfigurationStatus('Export failed in the local sample.')
            }}
          >
            Show export error
          </Button>
        </div>
        {destinationError && (
          <Alert variant='destructive'>
            <AlertTitle>Export failed</AlertTitle>
            <AlertDescription>The sample destination is unavailable. Choose another option or retry.</AlertDescription>
            <AlertAction>
              <Button
                size='sm'
                variant='outline'
                onClick={() => {
                  setDestinationError(false)
                  setConfigurationStatus(
                    `Retry completed in the sample: ${fileName}.${format.toLowerCase()} is prepared. No file was created.`
                  )
                }}
              >
                Retry
              </Button>
            </AlertAction>
          </Alert>
        )}
        <p role='status' aria-live='polite' className='text-muted-foreground'>
          {configurationStatus}
        </p>
      </UseCaseSection>
      <UseCaseSection
        title='Track preparation and recover from an export failure'
        scenario='Show progress only while preparation runs, then communicate completion or a recoverable destination error.'
      >
        <div aria-busy={preparing} className='grid max-w-xl gap-2'>
          {preparing && (
            <Progress value={null}>
              <ProgressLabel>Preparing export</ProgressLabel>
              <ProgressTrack>
                <ProgressIndicator />
              </ProgressTrack>
            </Progress>
          )}
          <Button
            size='sm'
            variant='outline'
            onClick={() => {
              if (preparing) {
                setPreparing(false)
                setProgressStatus('Export preparation complete. No file was created.')
              } else {
                setProgressError(false)
                setPreparing(true)
                setProgressStatus(`Preparing ${format} export in this preview.`)
              }
            }}
          >
            {preparing ? 'Finish preparation' : 'Start preparation'}
          </Button>
          <Button
            size='sm'
            variant='ghost'
            disabled={preparing}
            onClick={() => {
              setProgressError(true)
              setProgressStatus('A destination error is being previewed.')
            }}
          >
            Preview destination error
          </Button>
        </div>
        {progressError && (
          <Alert variant='destructive'>
            <AlertTitle>Export preparation failed</AlertTitle>
            <AlertDescription>The sample destination is unavailable. Retry to preview recovery.</AlertDescription>
            <AlertAction>
              <Button
                size='sm'
                variant='outline'
                onClick={() => {
                  setProgressError(false)
                  setPreparing(true)
                  setProgressStatus('Retrying export preparation in this preview.')
                }}
              >
                Retry preparation
              </Button>
            </AlertAction>
          </Alert>
        )}
        <p role='status' aria-live='polite' className='text-muted-foreground'>
          {progressStatus}
        </p>
      </UseCaseSection>
      <UseCaseSection
        title='Confirm export completion without implying a download'
        scenario='After a successful export, show a passive completion message and a separate brief notification; make the local-only result explicit.'
      >
        <Alert variant='success'>
          <AlertTitle>Export prepared</AlertTitle>
          <AlertDescription>
            {fileName}.{format.toLowerCase()} is ready in this sample. No file was created or saved.
          </AlertDescription>
        </Alert>
        <Button
          size='sm'
          variant='outline'
          onClick={() => {
            setCompletionStatus('Success notification preview shown; no file was downloaded.')
            toastManager.add({
              type: 'success',
              title: 'Export ready',
              description: `${fileName}.${format.toLowerCase()} was prepared in this sample. No file was created.`
            })
          }}
        >
          Preview success notification
        </Button>
        <p role='status' aria-live='polite' className='text-muted-foreground'>
          {completionStatus}
        </p>
      </UseCaseSection>
    </DemoFrame>
  )
}

function ExportDemoWithProvider() {
  return (
    <ToastProvider>
      <ExportDemo />
      <ToastPortal>
        <ToastViewport>
          <ToastItems />
        </ToastViewport>
      </ToastPortal>
    </ToastProvider>
  )
}

function ApiKeyDemo() {
  const [creationNotice, setCreationNotice] = useState(
    'Name the key and choose its access before generating the sample.'
  )
  const [managementNotice, setManagementNotice] = useState('Existing key settings have not changed.')
  const [name, setName] = useState('Mission planning integration')
  const [restricted, setRestricted] = useState(false)
  const [generated, setGenerated] = useState(false)
  const [oneTimeResultDismissed, setOneTimeResultDismissed] = useState(false)
  const [visible, setVisible] = useState(false)
  const [copied, setCopied] = useState(false)
  const [retrieval, setRetrieval] = useState<'product' | 'platform' | 'once'>('once')
  const [existingName, setExistingName] = useState('Mission planning integration')
  const [existingRestricted, setExistingRestricted] = useState(true)
  const [editingExisting, setEditingExisting] = useState(false)
  const sampleKey = 'sk_demo_7f3a••••••••••••9b2c'
  return (
    <DemoFrame>
      <UseCaseSection
        title='Create and manage an API key safely'
        scenario='Name a sample key, restrict its permissions when needed, then reveal or hide the illustrative value.'
      >
        <FieldRoot>
          <FieldLabel>Key name</FieldLabel>
          <Input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder='e.g. Mission planning integration'
          />
          <FieldDescription>Use a descriptive name so you can identify this key later.</FieldDescription>
        </FieldRoot>
        <FieldRoot>
          <FieldLabel>Access</FieldLabel>
          <div className='flex flex-wrap gap-2'>
            <Button
              type='button'
              size='sm'
              variant={!restricted ? 'secondary' : 'outline'}
              aria-pressed={!restricted}
              onClick={() => setRestricted(false)}
            >
              General access
            </Button>
            <Button
              type='button'
              size='sm'
              variant={restricted ? 'secondary' : 'outline'}
              aria-pressed={restricted}
              onClick={() => setRestricted(true)}
            >
              Restricted access
            </Button>
          </div>
          <FieldDescription>
            {restricted
              ? 'Limit the sample key to mission read access.'
              : 'The sample key represents general workspace access.'}
          </FieldDescription>
        </FieldRoot>
        <FieldRoot>
          <FieldLabel>How can this key be retrieved later?</FieldLabel>
          <div className='flex flex-wrap gap-2'>
            {(
              [
                ['product', 'In this product'],
                ['platform', 'Another platform'],
                ['once', 'Shown once']
              ] as const
            ).map(([value, label]) => (
              <Button
                key={value}
                size='sm'
                variant={retrieval === value ? 'secondary' : 'outline'}
                aria-pressed={retrieval === value}
                onClick={() => {
                  setRetrieval(value)
                  setOneTimeResultDismissed(false)
                }}
              >
                {label}
              </Button>
            ))}
          </div>
          <FieldDescription>
            {retrieval === 'product'
              ? 'The sample management page can display this key again later.'
              : retrieval === 'platform'
                ? 'Provide a link to the separate platform where the key can be retrieved.'
                : 'The sample value is shown only in the result view. Its preview copy action does not use the clipboard.'}
          </FieldDescription>
          {retrieval === 'product' && (
            <Button
              size='sm'
              variant='outline'
              onClick={() => setCreationNotice('Key management page preview selected; no external page opened.')}
            >
              Preview key management
            </Button>
          )}
          {retrieval === 'platform' && (
            <Button
              size='sm'
              variant='outline'
              onClick={() =>
                setCreationNotice('Separate-platform instructions preview selected; no external service opened.')
              }
            >
              Preview retrieval instructions
            </Button>
          )}
        </FieldRoot>
        {restricted && (
          <div className='flex flex-wrap gap-2' aria-label='Restricted permissions'>
            <Badge count='Missions · Read' status='outline' />
            <Badge count='Billing · No access' status='outline' />
            <Badge count='Team · No access' status='outline' />
          </div>
        )}
        <Alert variant='warning'>
          <AlertTitle>{retrieval === 'once' ? 'One-time key preview' : 'Key retrieval details'}</AlertTitle>
          <AlertDescription>
            {retrieval === 'once'
              ? 'This sample shows a one-time retrieval warning. It does not create a real credential; a product should explain safe storage and recovery.'
              : retrieval === 'product'
                ? 'This sample says the key can be retrieved later in the product.'
                : 'This sample says the key can be retrieved in a separate platform and should link to its instructions.'}
          </AlertDescription>
        </Alert>
        <Button
          disabled={!name.trim()}
          onClick={() => {
            setGenerated(true)
            setOneTimeResultDismissed(false)
            setVisible(false)
            setCopied(false)
            setCreationNotice('Sample key value generated for this preview. No credential was created.')
          }}
        >
          {generated ? 'Generate another sample key' : 'Generate key'}
        </Button>
        {generated && !oneTimeResultDismissed && (
          <section className='space-y-3 rounded-(--radius) border border-border p-4'>
            <div>
              <h4 className='font-medium'>{name || 'API key'}</h4>
              <p className='text-muted-foreground'>
                {restricted ? 'Restricted · Missions read-only' : 'General workspace access'}
              </p>
            </div>
            <code className='block break-all rounded-(--radius) border border-border bg-muted p-3'>
              {visible ? 'sk_demo_7f3a9d41b820c67f9b2c' : sampleKey}
            </code>
            <div className='flex flex-wrap gap-2'>
              <Button size='sm' variant='outline' onClick={() => setVisible((value) => !value)}>
                {visible ? 'Hide key' : 'Reveal key'}
              </Button>
              <Button
                size='sm'
                onClick={() => {
                  setCopied(true)
                  setCreationNotice('Sample copy feedback shown. Clipboard was not accessed.')
                }}
              >
                {copied ? 'Copy preview shown' : 'Preview copy feedback'}
              </Button>
            </div>
            <Menu>
              <MenuTrigger
                render={
                  <Button size='sm' variant='ghost'>
                    Manage key
                  </Button>
                }
              />
              <MenuPortal>
                <MenuPositioner side='bottom' align='start' sideOffset={4}>
                  <MenuPopup>
                    <MenuItem
                      onClick={() => setCreationNotice('Key rotation preview selected; no credential was changed.')}
                    >
                      Preview key rotation
                    </MenuItem>
                    <MenuItem onClick={() => setCreationNotice('Revoke preview selected; no credential was revoked.')}>
                      Preview key revocation
                    </MenuItem>
                  </MenuPopup>
                </MenuPositioner>
              </MenuPortal>
            </Menu>
            <p className='text-muted-foreground'>
              Generated view: reveal, hide, and copy feedback are local illustrations only; no credential or clipboard
              access.
            </p>
            {retrieval === 'once' && (
              <Button size='sm' variant='ghost' onClick={() => setOneTimeResultDismissed(true)}>
                Leave key result
              </Button>
            )}
          </section>
        )}
        {generated && oneTimeResultDismissed && (
          <Alert variant='warning'>
            <AlertTitle>One-time result closed</AlertTitle>
            <AlertDescription>
              This example hides the value after you leave. If it were a real one-time key, recovery would require a new
              key and any affected integration would need updating.
            </AlertDescription>
          </Alert>
        )}
        <p role='status' aria-live='polite' className='text-muted-foreground'>
          {creationNotice}
        </p>
      </UseCaseSection>
      <UseCaseSection
        title='Manage or edit an existing key without changing its secret'
        scenario='A workspace administrator reviews named keys, opens management actions, and edits access without changing an existing key value.'
      >
        <div className='flex flex-wrap items-center justify-between gap-3 border-y border-border py-3'>
          <div className='min-w-0'>
            <p className='font-medium'>{existingName}</p>
            <p className='text-muted-foreground'>
              {existingRestricted ? 'Restricted · Missions read-only' : 'General access'} · local sample
            </p>
          </div>
          <Menu>
            <MenuTrigger
              render={
                <Button size='sm' variant='outline'>
                  Manage key
                </Button>
              }
            />
            <MenuPortal>
              <MenuPositioner side='bottom' align='end' sideOffset={4}>
                <MenuPopup>
                  <MenuItem onClick={() => setEditingExisting(true)}>Edit permissions</MenuItem>
                  <MenuItem
                    onClick={() => setManagementNotice('Rotation preview selected; no credential was changed.')}
                  >
                    Preview rotation
                  </MenuItem>
                  <MenuItem onClick={() => setManagementNotice('Revoke preview selected; no credential was revoked.')}>
                    Preview revocation
                  </MenuItem>
                </MenuPopup>
              </MenuPositioner>
            </MenuPortal>
          </Menu>
        </div>
        {editingExisting && (
          <div className='grid max-w-xl gap-3 border border-border p-4'>
            <h5 className='text-base font-medium text-(--foreground)'>Edit key settings</h5>
            <FieldRoot>
              <FieldLabel>Key name</FieldLabel>
              <Input value={existingName} onChange={(event) => setExistingName(event.target.value)} />
            </FieldRoot>
            <Button
              size='sm'
              variant={existingRestricted ? 'secondary' : 'outline'}
              aria-pressed={existingRestricted}
              onClick={() => setExistingRestricted((value) => !value)}
            >
              {existingRestricted ? 'Restricted access' : 'General access'}
            </Button>
            <p className='text-muted-foreground'>
              Only the name and access settings change; the key contents stay the same.
            </p>
            <div className='flex flex-wrap gap-2'>
              <Button size='sm' variant='outline' onClick={() => setEditingExisting(false)}>
                Cancel
              </Button>
              <Button
                size='sm'
                onClick={() => {
                  setManagementNotice('Key settings saved in the local example; key contents are unchanged.')
                  setEditingExisting(false)
                }}
              >
                Save settings
              </Button>
            </div>
          </div>
        )}
        <p role='status' aria-live='polite' className='text-muted-foreground'>
          {managementNotice}
        </p>
      </UseCaseSection>
      <p className='text-muted-foreground'>Local illustrations only; no credential is created, stored, or rotated.</p>
    </DemoFrame>
  )
}

function ImportDemo() {
  const [files, setFiles] = useState<File[]>([])
  const [error, setError] = useState('')
  const [source, setSource] = useState<'file' | 'url'>('file')
  const [url, setUrl] = useState('')
  const [status, setStatus] = useState('')
  const [singleFileResult, setSingleFileResult] = useState('')
  const [metadataResult, setMetadataResult] = useState('')
  const [collectionName, setCollectionName] = useState('Coastal survey imports')
  const [importNote, setImportNote] = useState('')
  const [singleFileOpen, setSingleFileOpen] = useState(false)
  const [singleFileSelected, setSingleFileSelected] = useState(false)
  const [singleFileSource, setSingleFileSource] = useState<'file' | 'url'>('file')
  const [singleFileUrl, setSingleFileUrl] = useState('')
  const [singleFileError, setSingleFileError] = useState('')
  const [metadataPanelOpen, setMetadataPanelOpen] = useState(false)
  return (
    <DemoFrame>
      <UseCaseSection
        title='Choose multiple mission files or a source URL'
        scenario={
          source === 'file'
            ? 'A full-page or side-panel workflow can accept several supported JSON or GeoJSON files and show validation or selection status.'
            : 'When a remote source is supported, validate its HTTPS address locally before proceeding; this sample never fetches it.'
        }
      >
        <FieldRoot className='w-full' invalid={Boolean(error)}>
          <div className='flex gap-2'>
            <Button
              type='button'
              size='sm'
              variant={source === 'file' ? 'secondary' : 'outline'}
              aria-pressed={source === 'file'}
              onClick={() => {
                setSource('file')
                setError('')
                setStatus('')
              }}
            >
              Choose file
            </Button>
            <Button
              type='button'
              size='sm'
              variant={source === 'url' ? 'secondary' : 'outline'}
              aria-pressed={source === 'url'}
              onClick={() => {
                setSource('url')
                setError('')
                setStatus('')
              }}
            >
              Import from URL
            </Button>
          </div>
          {source === 'file' ? (
            <>
              <FieldLabel>Choose mission files</FieldLabel>
              <Dropzone
                accept='.json,.geojson'
                multiple
                hint='Choose JSON or GeoJSON files. Selection stays in this browser demo.'
                onFilesSelected={(selected) => {
                  const invalid = selected.find((file) => !/\.(json|geojson)$/i.test(file.name))
                  if (invalid) {
                    setError(`${invalid.name} is not a JSON or GeoJSON file.`)
                    setStatus('')
                    return
                  }
                  setError('')
                  setStatus(`${selected.length} file(s) selected locally.`)
                  setFiles((current) => [...current, ...selected])
                }}
              />
              <FieldDescription>
                Choose one or more JSON/GeoJSON files. Selection stays local; no upload occurs.
              </FieldDescription>
            </>
          ) : (
            <>
              <FieldLabel>Source URL</FieldLabel>
              <Input
                type='url'
                value={url}
                onChange={(event) => setUrl(event.target.value)}
                placeholder='https://example.com/mission.geojson'
              />
              <Button
                type='button'
                variant='outline'
                onClick={() =>
                  url.startsWith('https://')
                    ? (setError(''), setStatus('URL accepted for this illustration; nothing was fetched.'))
                    : (setError('Enter a valid HTTPS URL.'), setStatus(''))
                }
              >
                Import from URL
              </Button>
              <FieldDescription>URL is validated locally and never fetched.</FieldDescription>
            </>
          )}
          <FieldError match={Boolean(error)}>{error}</FieldError>
          {status && (
            <p role='status' aria-live='polite' className='text-muted-foreground'>
              {status}
            </p>
          )}
          {files.map((file, index) => (
            <Attachment key={`${file.name}-${index}`} state='done' className='w-full'>
              <AttachmentMedia>{file.name.split('.').pop()?.toUpperCase()}</AttachmentMedia>
              <AttachmentContent>
                <AttachmentTitle>{file.name}</AttachmentTitle>
                <AttachmentDescription>Selected locally · {Math.ceil(file.size / 1024)} KB</AttachmentDescription>
              </AttachmentContent>
            </Attachment>
          ))}
        </FieldRoot>
      </UseCaseSection>
      <UseCaseSection
        title='Import one file or URL in a focused modal'
        scenario='For one item with no extra metadata, choose a local file or a URL; keep Import disabled until the chosen source is valid.'
      >
        <Button onClick={() => setSingleFileOpen(true)}>Import one mission file</Button>
        <Dialog open={singleFileOpen} onOpenChange={setSingleFileOpen}>
          <DialogPortal>
            <DialogBackdrop />
            <DialogPopup>
              <DialogHeader>
                <DialogTitle>Import mission file</DialogTitle>
                <DialogDescription>
                  Choose one JSON or GeoJSON file. The sample stays in this browser.
                </DialogDescription>
              </DialogHeader>
              <div className='flex flex-wrap gap-2'>
                <Button
                  size='sm'
                  variant={singleFileSource === 'file' ? 'secondary' : 'outline'}
                  aria-pressed={singleFileSource === 'file'}
                  onClick={() => {
                    setSingleFileSource('file')
                    setSingleFileError('')
                    setSingleFileSelected(false)
                  }}
                >
                  File
                </Button>
                <Button
                  size='sm'
                  variant={singleFileSource === 'url' ? 'secondary' : 'outline'}
                  aria-pressed={singleFileSource === 'url'}
                  onClick={() => {
                    setSingleFileSource('url')
                    setSingleFileError('')
                    setSingleFileSelected(false)
                  }}
                >
                  URL
                </Button>
              </div>
              <FieldRoot>
                {singleFileSource === 'file' ? (
                  <>
                    <FieldLabel>Mission file</FieldLabel>
                    <Dropzone
                      accept='.json,.geojson'
                      hint='Select one supported file; no upload occurs.'
                      onFilesSelected={(selected) => {
                        setSingleFileSelected(selected.length > 0)
                        setSingleFileError('')
                      }}
                    />
                  </>
                ) : (
                  <>
                    <FieldLabel>Source URL</FieldLabel>
                    <Input
                      type='url'
                      value={singleFileUrl}
                      onChange={(event) => {
                        setSingleFileUrl(event.target.value)
                        setSingleFileError('')
                        setSingleFileSelected(false)
                      }}
                      placeholder='https://example.com/mission.geojson'
                    />
                    <Button
                      size='sm'
                      variant='outline'
                      onClick={() => {
                        if (singleFileUrl.startsWith('https://')) {
                          setSingleFileSelected(true)
                          setSingleFileError('')
                        } else {
                          setSingleFileSelected(false)
                          setSingleFileError('Enter a valid HTTPS URL.')
                        }
                      }}
                    >
                      Add URL
                    </Button>
                    <FieldError match={Boolean(singleFileError)}>{singleFileError}</FieldError>
                    <FieldDescription>URL validation is local. No request is sent.</FieldDescription>
                  </>
                )}
              </FieldRoot>
              <DialogFooter>
                <DialogClose variant='outline'>Cancel</DialogClose>
                <Button
                  disabled={!singleFileSelected}
                  onClick={() => {
                    setSingleFileResult(
                      singleFileSource === 'file'
                        ? 'Import step completed in this local example. No file was uploaded.'
                        : 'Import step completed in this local example. No data was fetched.'
                    )
                    setSingleFileOpen(false)
                  }}
                >
                  Import file
                </Button>
              </DialogFooter>
            </DialogPopup>
          </DialogPortal>
        </Dialog>
        {singleFileResult && (
          <p role='status' aria-live='polite' className='text-muted-foreground'>
            {singleFileResult}
          </p>
        )}
      </UseCaseSection>
      <UseCaseSection
        title='Add metadata in a side panel after file selection'
        scenario='When an import needs a name or destination, keep the selection step distinct and collect the extra information in a side panel.'
      >
        <Drawer open={metadataPanelOpen} onOpenChange={setMetadataPanelOpen} swipeDirection='right'>
          <DrawerTrigger>Review import details</DrawerTrigger>
          <DrawerPortal>
            <DrawerBackdrop />
            <DrawerViewport side='right'>
              <DrawerPopup side='right'>
                <DrawerContent>
                  <DrawerTitle>Import details</DrawerTitle>
                  <DrawerDescription>Set context before adding the selected mission data.</DrawerDescription>
                  <p className='text-muted-foreground'>Selected source: north-coast-missions.geojson · local sample</p>
                  <FieldRoot>
                    <FieldLabel>Collection name</FieldLabel>
                    <Input value={collectionName} onChange={(event) => setCollectionName(event.target.value)} />
                  </FieldRoot>
                  <FieldRoot>
                    <FieldLabel>Import note</FieldLabel>
                    <Input
                      value={importNote}
                      onChange={(event) => setImportNote(event.target.value)}
                      placeholder='Optional note for reviewers'
                    />
                  </FieldRoot>
                  <div className='flex flex-wrap gap-2'>
                    <DrawerClose>Cancel</DrawerClose>
                    <Button
                      onClick={() => {
                        setMetadataPanelOpen(false)
                        setMetadataResult(
                          `Import details ready for review in “${collectionName || 'Untitled collection'}”. ${importNote.trim() ? 'Reviewer note included.' : 'No reviewer note added.'} No data was imported.`
                        )
                      }}
                    >
                      Review import
                    </Button>
                  </div>
                </DrawerContent>
              </DrawerPopup>
            </DrawerViewport>
          </DrawerPortal>
        </Drawer>
        {metadataResult && (
          <p role='status' aria-live='polite' className='text-muted-foreground'>
            {metadataResult}
          </p>
        )}
      </UseCaseSection>
    </DemoFrame>
  )
}

function OrderSummaryDemo() {
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

function RemoveDemo() {
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

function renderPatternDemo(patternId: PatternId) {
  switch (patternId) {
    case 'common-actions':
      return <CommonActionsDemo />
    case 'dialogs':
      return <DialogsDemo />
    case 'disabled-states':
      return <DisabledStatesDemo />
    case 'disclosures':
      return <DisclosuresDemo />
    case 'empty-states':
      return <EmptyStatesDemo />
    case 'filtering':
      return <FilteringDemo />
    case 'fluid-styles':
      return <FluidStylesDemo />
    case 'forms':
      return <FormsDemo />
    case 'global-header':
      return <GlobalHeaderDemo />
    case 'loading':
      return <LoadingDemo />
    case 'login':
      return <LoginDemo />
    case 'notifications':
      return <NotificationsDemoWithProvider />
    case 'overflow-content':
      return <OverflowDemo />
    case 'read-only-states':
      return <ReadOnlyDemo />
    case 'search':
      return <SearchDemo />
    case 'status-indicators':
      return <StatusIndicatorsDemo />
    case 'text-toolbars':
      return <TextToolbarDemo />
    case 'community-chatbots':
      return <ChatbotsDemo />
    case 'community-in-app-learning':
      return <InAppLearningDemo />
    case 'community-create-flows':
      return <CreateFlowsDemo />
    case 'community-edit':
      return <EditDemo />
    case 'community-export':
      return <ExportDemoWithProvider />
    case 'community-api-key':
      return <ApiKeyDemo />
    case 'community-import':
      return <ImportDemo />
    case 'community-order-summary':
      return <OrderSummaryDemo />
    case 'community-remove':
      return <RemoveDemo />
  }
}

export function PatternDemo({ patternId }: { patternId: PatternId }) {
  return (
    <PatternDemoContext.Provider value={{ patternId, page: PATTERN_PAGE_CONTENT[patternId] }}>
      {renderPatternDemo(patternId)}
    </PatternDemoContext.Provider>
  )
}
