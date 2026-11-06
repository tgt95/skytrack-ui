import { useState, type ReactNode } from 'react'
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CaretDownIcon,
  CheckCircleIcon,
  MagnifyingGlassIcon,
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
import { Progress, ProgressIndicator, ProgressLabel, ProgressTrack, ProgressValue } from '@/components/ui/progress'
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
import { Toolbar, ToolbarButton, ToolbarSeparator } from '@/components/ui/toolbar'
import type { PatternId } from './catalog'

const SAMPLE_ITEMS = [
  { name: 'North coast survey', type: 'Planning' },
  { name: 'Runway inspection', type: 'Review' },
  { name: 'River mapping', type: 'Planning' },
  { name: 'Solar array scan', type: 'Complete' }
]

function DemoFrame({ children }: { children: ReactNode }) {
  return <div className='min-w-0 space-y-4'>{children}</div>
}

function UseCaseSection({ title, scenario, children }: { title: string; scenario: string; children: ReactNode }) {
  return (
    <section data-pattern-example className='min-w-0 space-y-3 border-t border-border pt-4 first:border-0 first:pt-0'>
      <header className='space-y-1'>
        <h4 className='text-base font-medium text-(--foreground)'>{title}</h4>
        <p className='text-muted-foreground'>{scenario}</p>
      </header>
      {children}
    </section>
  )
}

function CommonActionsDemo() {
  const [items, setItems] = useState(['North coast survey'])
  const [message, setMessage] = useState('Choose an action to see its result in this sample.')
  const [query, setQuery] = useState('Breakfast tacos')
  const [selectedToppings, setSelectedToppings] = useState(['salsa', 'guacamole'])
  const [copied, setCopied] = useState(false)
  const [closed, setClosed] = useState(false)
  const [step, setStep] = useState(1)
  const [editing, setEditing] = useState(false)
  const [draftName, setDraftName] = useState('North coast survey')
  const [removed, setRemoved] = useState(false)

  const reset = () => {
    setQuery('Breakfast tacos')
    setSelectedToppings(['salsa', 'guacamole'])
    setStep(1)
    setDraftName('North coast survey')
    setItems(['North coast survey'])
    setRemoved(false)
    setMessage('Sample restored to its starting state.')
  }

  return (
    <DemoFrame>
      <UseCaseSection title='Add' scenario='A dispatcher creates a flight plan from the mission list.'>
        <Button onClick={() => setItems((current) => [...current, 'New flight plan ' + (current.length + 1)])}>
          Add flight plan
        </Button>
        <ul className='list-disc ps-5 text-muted-foreground'>
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </UseCaseSection>

      <UseCaseSection
        title='Cancel'
        scenario='A pilot abandons an unsaved change and returns to the last saved route name.'
      >
        <div className='flex flex-wrap items-end gap-2'>
          <FieldRoot className='min-w-56 flex-1'>
            <FieldLabel>Unsaved route name</FieldLabel>
            <Input value={draftName} onChange={(event) => setDraftName(event.target.value)} />
          </FieldRoot>
          <Button
            variant='outline'
            onClick={() => {
              setDraftName('North coast survey')
              setMessage('Unsaved edit canceled.')
            }}
          >
            Cancel edit
          </Button>
        </div>
      </UseCaseSection>

      <UseCaseSection
        title='Clear'
        scenario='Clear removes current selections or a search value and restores the control to its default state.'
      >
        <div className='grid gap-4 md:grid-cols-2'>
          <FieldRoot>
            <FieldLabel nativeLabel={false} render={<span>Selected taco toppings</span>} />
            <CheckboxGroup aria-label='Taco toppings' value={selectedToppings} onValueChange={setSelectedToppings}>
              {[
                ['salsa', 'Salsa'],
                ['guacamole', 'Guacamole'],
                ['queso', 'Queso']
              ].map(([value, label]) => (
                <FieldItem key={value}>
                  <FieldLabel className='flex items-center gap-2 font-normal'>
                    <CheckboxRoot value={value} /> {label}
                  </FieldLabel>
                </FieldItem>
              ))}
            </CheckboxGroup>
            <Button size='sm' variant='outline' onClick={() => setSelectedToppings([])}>
              Clear selections
            </Button>
          </FieldRoot>
          <FieldRoot>
            <FieldLabel>Search orders</FieldLabel>
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
              {query ? 'Showing matches for “' + query + '”.' : 'Showing all orders.'}
            </p>
          </FieldRoot>
        </div>
      </UseCaseSection>

      <UseCaseSection title='Close' scenario='A user dismisses a non-blocking update after reading it.'>
        {closed ? (
          <Button variant='outline' onClick={() => setClosed(false)}>
            Show update again
          </Button>
        ) : (
          <Alert variant='info'>
            <AlertTitle>Route review reminder</AlertTitle>
            <AlertDescription className='flex items-center justify-between gap-3'>
              Review the route before scheduling.
              <Button
                size='icon-xs'
                variant='ghost'
                aria-label='Close route review reminder'
                onClick={() => setClosed(true)}
              >
                <XIcon />
              </Button>
            </AlertDescription>
          </Alert>
        )}
      </UseCaseSection>

      <UseCaseSection title='Copy' scenario='A coordinator copies a stable flight-plan ID from its detail view.'>
        <div className='flex flex-wrap items-center gap-3'>
          <code className='rounded-(--radius) bg-muted px-2 py-1'>mission-2048</code>
          <Button variant='outline' onClick={() => setCopied(true)}>
            {copied ? 'Copy confirmed' : 'Copy ID'}
          </Button>
          <span role='status' className='text-muted-foreground'>
            {copied ? 'Copy action shown in the local preview.' : 'Ready to copy.'}
          </span>
        </div>
      </UseCaseSection>

      <UseCaseSection
        title='Delete'
        scenario='Choose confirmation strength based on how much data the action destroys.'
      >
        <div className='grid gap-4 md:grid-cols-3'>
          <div className='space-y-2'>
            <h5 className='text-sm font-medium text-(--foreground)'>Low impact · remove a draft row</h5>
            <Button
              size='sm'
              variant='outline'
              onClick={() => setMessage('Draft row removed without a confirmation step.')}
            >
              Remove draft row
            </Button>
          </div>
          <div className='space-y-2'>
            <h5 className='text-sm font-medium text-(--foreground)'>Moderate impact · delete a saved view</h5>
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
                    <AlertDialogClose
                      variant='destructive'
                      onClick={() => setMessage('Saved view deleted; missions were kept.')}
                    >
                      Delete view
                    </AlertDialogClose>
                  </AlertDialogFooter>
                </AlertDialogPopup>
              </AlertDialogPortal>
            </AlertDialog>
          </div>
          <div className='space-y-2'>
            <h5 className='text-sm font-medium text-(--foreground)'>High impact · permanently delete a plan</h5>
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
                      This removes the mission, route and attached notes from this local sample.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogClose>Cancel</AlertDialogClose>
                    <AlertDialogClose
                      variant='destructive'
                      onClick={() => {
                        setItems([])
                        setMessage('Flight plan permanently deleted in the sample.')
                      }}
                    >
                      Delete permanently
                    </AlertDialogClose>
                  </AlertDialogFooter>
                </AlertDialogPopup>
              </AlertDialogPortal>
            </AlertDialog>
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
                setMessage('Flight plan name saved locally.')
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
              }}
            >
              Cancel
            </Button>
          </div>
        ) : (
          <div className='flex items-center gap-3'>
            <span>{draftName}</span>
            <Button size='sm' variant='outline' onClick={() => setEditing(true)}>
              Edit name
            </Button>
          </div>
        )}
      </UseCaseSection>

      <UseCaseSection title='Errors' scenario='When refreshing fails, explain what happened and offer a retry.'>
        <Alert variant='destructive'>
          <AlertTitle>Could not refresh flight plans</AlertTitle>
          <AlertDescription className='flex flex-wrap items-center justify-between gap-3'>
            Check the connection, then try again.
            <Button size='sm' variant='outline' onClick={() => setMessage('Refresh retried in the local sample.')}>
              Retry
            </Button>
          </AlertDescription>
        </Alert>
      </UseCaseSection>

      <UseCaseSection title='Next' scenario='A user advances through a short mission setup flow.'>
        <div className='flex items-center gap-3'>
          <span>Step {step} of 3 · Flight area</span>
          <Button variant='outline' disabled={step >= 3} onClick={() => setStep((value) => Math.min(3, value + 1))}>
            Next step
          </Button>
        </div>
      </UseCaseSection>

      <UseCaseSection title='Refresh' scenario='A user requests the latest mission list without changing filters.'>
        <div className='flex flex-wrap items-center gap-3'>
          <Button variant='outline' onClick={() => setMessage('Mission list refreshed just now.')}>
            Refresh missions
          </Button>
          <span role='status' className='text-muted-foreground'>
            {message}
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
          <Badge count={selectedToppings.length + ' toppings'} status='outline' />
          <span className='text-muted-foreground'>Search: {query || 'All orders'}</span>
          <Button size='sm' variant='ghost' onClick={reset}>
            Reset filters
          </Button>
        </div>
      </UseCaseSection>

      <p role='status' aria-live='polite' className='text-muted-foreground'>
        Local example state only. {message}
      </p>
    </DemoFrame>
  )
}

function DialogsDemo() {
  const [routeName, setRouteName] = useState('')
  const [validation, setValidation] = useState(false)
  const [result, setResult] = useState('No route change has been confirmed.')
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
        <Dialog>
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
                    if (routeName.trim()) setResult('Route change confirmed locally: ' + routeName.trim())
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
            onClick={() => setResult('Mission list action remained available beside the non-modal dialog.')}
          >
            Select another mission
          </Button>
        </div>
      </UseCaseSection>

      <UseCaseSection
        title='Button groups · one, two, or three decisions'
        scenario='Use only the number of dialog actions needed to make the choice clear.'
      >
        <div className='grid gap-4 md:grid-cols-3'>
          <div className='space-y-2'>
            <h5 className='text-sm font-medium text-(--foreground)'>Information only</h5>
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
                    <DialogClose>Done</DialogClose>
                  </DialogFooter>
                </DialogPopup>
              </DialogPortal>
            </Dialog>
          </div>
          <div className='space-y-2'>
            <h5 className='text-sm font-medium text-(--foreground)'>Cancel or continue</h5>
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
                    <DialogClose variant='outline'>Discard</DialogClose>
                    <DialogClose>Save changes</DialogClose>
                  </DialogFooter>
                </DialogPopup>
              </DialogPortal>
            </Dialog>
          </div>
          <div className='space-y-2'>
            <h5 className='text-sm font-medium text-(--foreground)'>Required response</h5>
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
                    <AlertDialogTitle>Leave mission setup?</AlertDialogTitle>
                    <AlertDialogDescription>Your entered route details will be discarded.</AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogClose>Keep editing</AlertDialogClose>
                    <AlertDialogClose variant='destructive'>Leave setup</AlertDialogClose>
                  </AlertDialogFooter>
                </AlertDialogPopup>
              </AlertDialogPortal>
            </AlertDialog>
          </div>
        </div>
      </UseCaseSection>

      <UseCaseSection
        title='Show progress after confirming a longer task'
        scenario='If a confirmed route check takes time, communicate progress and completion after the dialog closes.'
      >
        <Progress value={taskProgress}>
          <ProgressLabel>Validating route permissions</ProgressLabel>
          <ProgressValue />
          <ProgressTrack>
            <ProgressIndicator />
          </ProgressTrack>
        </Progress>
        {taskProgress === 100 ? (
          <Alert variant='success'>
            <AlertTitle>Route ready</AlertTitle>
            <AlertDescription>Validation finished in this local example.</AlertDescription>
          </Alert>
        ) : (
          <Button size='sm' onClick={() => setTaskProgress((value) => Math.min(value + 50, 100))}>
            {taskProgress === 0 ? 'Start validation' : 'Complete validation'}
          </Button>
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
        scenario='Explain why exporting is unavailable and how to make it available.'
      >
        <Alert variant='warning'>
          <AlertTitle>Save the route before exporting</AlertTitle>
          <AlertDescription className='flex flex-wrap items-center justify-between gap-3'>
            The current route has unsaved changes.
            <Button size='sm' variant='outline' disabled>
              Export GeoJSON
            </Button>
          </AlertDescription>
        </Alert>
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
  const [notice, setNotice] = useState('Choose an option to see the related result.')
  const [filter, setFilter] = useState('All plans')
  const [routeNotesOpen, setRouteNotesOpen] = useState(false)

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
                <MenuItem onClick={() => setNotice('Profile settings opened in the local example.')}>
                  Profile settings
                </MenuItem>
                <MenuItem onClick={() => setNotice('Account security opened in the local example.')}>
                  Account security
                </MenuItem>
                <MenuItem onClick={() => setNotice('Signed out of this local sample.')}>Sign out</MenuItem>
              </MenuPopup>
            </MenuPositioner>
          </MenuPortal>
        </Menu>
      </UseCaseSection>

      <UseCaseSection
        title='Settings and filter menu · change a view'
        scenario='Place compact preferences next to the collection they affect and reflect the selected value.'
      >
        <div className='flex flex-wrap items-center gap-3'>
          <Menu>
            <MenuTrigger render={<Button variant='outline'>Mission filter · {filter}</Button>} />
            <MenuPortal>
              <MenuPositioner side='bottom' align='start' sideOffset={4}>
                <MenuPopup>
                  <MenuItem
                    onClick={() => {
                      setFilter('All plans')
                      setNotice('Showing all plans.')
                    }}
                  >
                    All plans
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setFilter('In review')
                      setNotice('Filtered to plans in review.')
                    }}
                  >
                    In review
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setFilter('Scheduled')
                      setNotice('Filtered to scheduled plans.')
                    }}
                  >
                    Scheduled
                  </MenuItem>
                </MenuPopup>
              </MenuPositioner>
            </MenuPortal>
          </Menu>
          <Badge count={filter} status='outline' />
        </div>
      </UseCaseSection>

      <UseCaseSection
        title='Combo button · primary action plus alternatives'
        scenario='Keep the most common creation action visible and place related alternatives in its adjacent menu.'
      >
        <div className='inline-flex items-stretch'>
          <Button className='rounded-e-none' onClick={() => setNotice('Created a blank local flight plan.')}>
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
                  <MenuItem onClick={() => setNotice('Created a flight plan from the local template.')}>
                    From template
                  </MenuItem>
                  <MenuItem onClick={() => setNotice('Started importing a sample route.')}>Import route</MenuItem>
                </MenuPopup>
              </MenuPositioner>
            </MenuPortal>
          </Menu>
        </div>
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

      <p role='status' aria-live='polite' className='text-muted-foreground'>
        {notice} Disclosures are user initiated and remain local to this example.
      </p>
    </DemoFrame>
  )
}

function EmptyStatesDemo() {
  const [created, setCreated] = useState(false)
  const [query, setQuery] = useState('unmatched route')
  const [loadFailed, setLoadFailed] = useState(true)
  const [completedSteps, setCompletedSteps] = useState(1)
  const [showAll, setShowAll] = useState(false)

  return (
    <DemoFrame>
      <UseCaseSection
        title='No data · create the first plan'
        scenario='A new workspace has no saved flight plans, so give the dispatcher one clear starting action.'
      >
        {created ? (
          <Alert variant='success'>
            <AlertTitle>First plan created</AlertTitle>
            <AlertDescription>North coast survey is now in the sample list.</AlertDescription>
          </Alert>
        ) : (
          <div
            role='status'
            className='grid justify-items-center gap-3 border border-dashed border-border px-6 py-8 text-center'
          >
            <h5 className='text-sm font-medium text-(--foreground)'>No flight plans yet</h5>
            <p className='text-muted-foreground'>Create your first plan to start organizing missions.</p>
            <Button onClick={() => setCreated(true)}>Create flight plan</Button>
          </div>
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
        {query ? (
          <Alert role='status'>
            <AlertTitle>No matching plans</AlertTitle>
            <AlertDescription>Try another term or clear this search.</AlertDescription>
            <Button variant='outline' onClick={() => setQuery('')}>
              Clear search
            </Button>
          </Alert>
        ) : (
          <p role='status'>Showing all flight plans.</p>
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
          <Button variant='outline' onClick={() => setCreated(true)}>
            Create a plan
          </Button>
        </Alert>
      </UseCaseSection>
      <UseCaseSection
        title='Onboarding · guide a first task'
        scenario='Show short setup steps with visible progress so a new dispatcher can continue in manageable stages.'
      >
        <Progress value={completedSteps * 33}>
          <ProgressLabel>Workspace setup</ProgressLabel>
          <ProgressValue />
          <ProgressTrack>
            <ProgressIndicator />
          </ProgressTrack>
        </Progress>
        <ol className='list-decimal space-y-1 ps-5'>
          <li>Connect an aircraft</li>
          <li>Review the safety checklist</li>
          <li>Create a flight plan</li>
        </ol>
        <Button size='sm' onClick={() => setCompletedSteps((value) => (value >= 3 ? 1 : value + 1))}>
          {completedSteps >= 3 ? 'Restart setup' : 'Complete next step'}
        </Button>
      </UseCaseSection>
      <UseCaseSection
        title='Starter content · orient the user with an example'
        scenario='A sample collection can teach the structure of the workflow before real records are available.'
      >
        <ul className='divide-y divide-border border-y border-border'>
          {SAMPLE_ITEMS.slice(0, showAll ? SAMPLE_ITEMS.length : 2).map((item) => (
            <li key={item.name} className='flex items-center justify-between gap-3 py-2'>
              <span>{item.name}</span>
              <Badge count={item.type} status='outline' />
            </li>
          ))}
        </ul>
        <Button size='sm' variant='outline' onClick={() => setShowAll((value) => !value)}>
          {showAll ? 'Show fewer examples' : 'Show more examples'}
        </Button>
      </UseCaseSection>
    </DemoFrame>
  )
}

function FilteringDemo() {
  const [query, setQuery] = useState('')
  const [type, setType] = useState('All')
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [mode, setMode] = useState<'instant' | 'batch'>('instant')
  const [appliedTypes, setAppliedTypes] = useState<string[]>([])
  const activeTypes = mode === 'instant' ? selectedTypes : appliedTypes
  const filtered = SAMPLE_ITEMS.filter(
    (item) =>
      item.name.toLowerCase().includes(query.toLowerCase()) &&
      (type === 'All' || item.type === type) &&
      (!activeTypes.length || activeTypes.includes(item.type))
  )

  return (
    <DemoFrame>
      <UseCaseSection
        title='Choose one status · instant results'
        scenario='A dispatcher selects one status and sees the mission list update immediately.'
      >
        <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
          <div className='flex flex-wrap gap-2' aria-label='Filter by status'>
            {['All', 'Planning', 'Review', 'Complete'].map((option) => (
              <Button
                key={option}
                size='sm'
                variant={type === option ? 'secondary' : 'outline'}
                aria-pressed={type === option}
                onClick={() => setType(option)}
              >
                {option}
              </Button>
            ))}
          </div>
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder='Filter flight plans'
            aria-label='Filter flight plans'
          />
        </div>
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
        <div className='flex flex-wrap gap-2' aria-label='Filter by plan type'>
          {['Planning', 'Review', 'Complete'].map((option) => {
            const checked = selectedTypes.includes(option)
            return (
              <Button
                key={option}
                size='sm'
                variant={checked ? 'secondary' : 'outline'}
                aria-pressed={checked}
                onClick={() =>
                  setSelectedTypes((current) =>
                    checked ? current.filter((item) => item !== option) : [...current, option]
                  )
                }
              >
                {option}
              </Button>
            )
          })}
          {mode === 'batch' && (
            <Button size='sm' onClick={() => setAppliedTypes(selectedTypes)}>
              Apply filters
            </Button>
          )}
          <Button
            size='sm'
            variant='ghost'
            onClick={() => {
              setSelectedTypes([])
              setAppliedTypes([])
              setType('All')
              setQuery('')
            }}
          >
            Reset all
          </Button>
        </div>
      </UseCaseSection>
      <p aria-live='polite' className='text-muted-foreground'>
        {filtered.length} results
      </p>
      {filtered.length ? (
        <ul className='divide-y divide-border border-y border-border'>
          {filtered.map((item) => (
            <li key={item.name} className='flex justify-between gap-3 py-2'>
              <span>{item.name}</span>
              <Badge count={item.type} status='outline' className='rounded-(--radius)' />
            </li>
          ))}
        </ul>
      ) : (
        <Alert role='status'>
          <AlertTitle>No matching plans</AlertTitle>
          <AlertDescription>Change or clear the selected filters.</AlertDescription>
        </Alert>
      )}
      {(query || type !== 'All') && (
        <Button
          variant='ghost'
          onClick={() => {
            setQuery('')
            setType('All')
          }}
        >
          Clear filters
        </Button>
      )}
    </DemoFrame>
  )
}

function FluidStylesDemo() {
  const [notice, setNotice] = useState('Choose a button to compare its container behavior.')
  return (
    <DemoFrame>
      <UseCaseSection
        title='Match action width to the task'
        scenario='Compare a content-sized secondary action with a full-width primary action in a mission setup.'
      >
        <div className='grid gap-4 sm:grid-cols-2'>
          <div className='space-y-2 border border-border p-3'>
            <p className='font-medium'>Productive form</p>
            <Input placeholder='Workspace name' aria-label='Workspace name' />
            <Button variant='outline' onClick={() => setNotice('Default action stays sized to its label.')}>
              Continue
            </Button>
          </div>
          <div className='flex flex-col justify-between gap-3 border border-border p-3'>
            <div>
              <p className='font-medium'>Expressive call to action</p>
              <p className='text-muted-foreground'>Use in a spacious, high-emphasis moment.</p>
            </div>
            <Button className='w-full' onClick={() => setNotice('Fluid action fills its container edge.')}>
              Explore missions
            </Button>
          </div>
        </div>
      </UseCaseSection>
      <UseCaseSection
        title='Align related actions in a compact panel'
        scenario='Keep Save draft and Preview the same width when they share a small action area.'
      >
        <div className='grid max-w-sm grid-cols-2 gap-3'>
          <Button variant='outline' onClick={() => setNotice('Draft action selected.')}>
            Save draft
          </Button>
          <Button variant='outline' onClick={() => setNotice('Preview action selected.')}>
            Preview
          </Button>
        </div>
      </UseCaseSection>
      <UseCaseSection
        title='Let a fluid form follow its available width'
        scenario='A workspace setup form should fill its parent column instead of relying on a fixed control width.'
      >
        <FieldRoot className='w-full max-w-none'>
          <FieldLabel>Workspace name</FieldLabel>
          <Input className='w-full' placeholder='e.g. Coastal operations' />
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
          <Input className='rounded-none border-0 border-b' aria-label='Teammate email' placeholder='Teammate email' />
          <Input className='rounded-none border-0 border-b' aria-label='Mission role' placeholder='Mission role' />
          <Button className='w-full rounded-none'>Send invitation</Button>
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
      <p aria-live='polite' className='text-muted-foreground'>
        {notice} The Input API in this library does not expose Carbon fluid-input styling; input examples retain the
        supported Field/Input composition.
      </p>
    </DemoFrame>
  )
}

function FormsDemo() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [notes, setNotes] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [longFormStep, setLongFormStep] = useState(1)
  const [checks, setChecks] = useState(['weather', 'airspace'])
  const invalidName = submitted && !name.trim()
  const invalidEmail = submitted && !email.includes('@')

  return (
    <form
      className='grid min-w-0 gap-4 md:max-w-2xl'
      onSubmit={(event) => {
        event.preventDefault()
        setSubmitted(true)
      }}
    >
      <UseCaseSection
        title='Collect mission contact details'
        scenario='Ask for required contact information first, distinguish optional notes, and explain field expectations.'
      >
        <FieldsetRoot>
          <FieldsetLegend>Mission contact</FieldsetLegend>
          <div className='grid gap-4 md:grid-cols-2'>
            <FieldRoot invalid={invalidName}>
              <FieldLabel>Contact name (required)</FieldLabel>
              <Input
                value={name}
                onChange={(event) => setName(event.target.value)}
                aria-invalid={invalidName}
                placeholder='Name'
              />
              <FieldError match={invalidName}>Enter a contact name.</FieldError>
            </FieldRoot>
            <FieldRoot invalid={invalidEmail}>
              <FieldLabel>Email address (required)</FieldLabel>
              <Input
                type='email'
                value={email}
                onChange={(event) => setEmail(event.target.value)}
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
      </UseCaseSection>
      <UseCaseSection
        title='Validate and recover from missing information'
        scenario='Try saving without a name or with an invalid email; keep errors beside their fields and make clearing the form reversible.'
      >
        <div className='flex flex-wrap items-center gap-3'>
          <Button type='submit'>Save sample</Button>
          <Button
            type='reset'
            variant='outline'
            onClick={() => {
              setName('')
              setEmail('')
              setNotes('')
              setSubmitted(false)
            }}
          >
            Clear form
          </Button>
          {submitted && !invalidName && !invalidEmail && (
            <p role='status'>The sample form is valid. Nothing was submitted.</p>
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
              <Input placeholder='Coastal mapping' />
            </FieldRoot>
            <FieldRoot>
              <FieldLabel>Requested date</FieldLabel>
              <Input type='date' />
            </FieldRoot>
          </FieldsetRoot>
        ) : (
          <FieldsetRoot>
            <FieldsetLegend>Safety review</FieldsetLegend>
            <FieldRoot>
              <FieldLabel>Aircraft</FieldLabel>
              <Input placeholder='Choose an aircraft' />
            </FieldRoot>
            <FieldRoot>
              <FieldLabel>Launch checklist</FieldLabel>
              <Input placeholder='Confirm checklist owner' />
            </FieldRoot>
          </FieldsetRoot>
        )}
        <div className='flex flex-wrap gap-2'>
          <Button type='button' variant='outline' disabled={longFormStep === 1} onClick={() => setLongFormStep(1)}>
            Back
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
    </form>
  )
}

function GlobalHeaderDemo() {
  const [configuration, setConfiguration] = useState<'header' | 'panel'>('header')
  const [organization, setOrganization] = useState<'workspace' | 'mission'>('workspace')
  const [message, setMessage] = useState('Current location: Missions / North coast survey')
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
              <Button size='sm' variant='ghost' onClick={() => setMessage('Opened global Home.')}>
                Home
              </Button>
              <Button size='sm' variant='ghost' onClick={() => setMessage('Opened global Missions.')}>
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
                      <MenuItem onClick={() => setMessage('Notifications panel opened.')}>Notifications · 2</MenuItem>
                      <MenuItem onClick={() => setMessage('System settings opened.')}>System settings</MenuItem>
                      <MenuItem onClick={() => setMessage('Product switcher opened.')}>Switch product</MenuItem>
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
                  onClick={() => setMessage('Viewing mission overview.')}
                >
                  Overview
                </Button>
                <Button
                  size='sm'
                  variant='ghost'
                  className='w-full justify-start'
                  onClick={() => setMessage('Viewing flight plans.')}
                >
                  Flight plans
                </Button>
                <Button
                  size='sm'
                  variant='ghost'
                  className='w-full justify-start'
                  onClick={() => setMessage('Viewing aircraft.')}
                >
                  Aircraft
                </Button>
              </nav>
            )}
            <div className='min-w-0 flex-1 space-y-3 p-4'>
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink render={<a href='#workspace' />}>Workspace</BreadcrumbLink>
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
              <Toolbar className='w-full justify-between'>
                <ToolbarButton onClick={() => setMessage('Opened the local mission overview.')}>Overview</ToolbarButton>
                <ToolbarSeparator />
                <ToolbarButton onClick={() => setMessage('Opened the local mission settings.')}>Settings</ToolbarButton>
              </Toolbar>
            </div>
          </div>
        </div>
        <p aria-live='polite' className='text-muted-foreground'>
          {message} · Global utilities stay consistent; local navigation changes with the product context.
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
              onClick={() => setMessage(`Opened ${item} in the ${organization}-first scheme.`)}
            >
              {item}
            </Button>
          ))}
        </nav>
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
      </UseCaseSection>
      <UseCaseSection
        title='Authenticate progressively and recover from an error'
        scenario='Request work email first, then show the password or organization SSO path, an optional verification step, and clear recovery actions.'
      >
        <div
          className={`mx-auto grid w-full gap-4 rounded-(--radius) border border-border p-5 ${layout === 'centered' ? 'max-w-md' : 'max-w-3xl md:grid-cols-2 md:items-start'}`}
        >
          <div>
            <p className='text-muted-foreground'>SkyTrack workspace</p>
            <h4 className='font-medium'>Log in</h4>
            {layout === 'split' && (
              <p className='mt-2 text-muted-foreground'>Review shared mission records with your team.</p>
            )}
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
                setMessage('Progressive authentication: the password step follows the user ID.')
              } else if (step === 'password') {
                setStep('verification')
                setMessage('A second factor is requested after the password step.')
              } else setMessage('Sample flow complete. No sign-in was attempted.')
            }}
          >
            <FieldRoot>
              <FieldLabel>Email address</FieldLabel>
              <Input
                type='email'
                autoComplete='username'
                placeholder='name@example.com'
                onChange={() => setLoginError(false)}
                aria-invalid={loginError}
              />
              {loginError && (
                <FieldError>The sign-in details were not recognized. Check them and try again.</FieldError>
              )}
            </FieldRoot>
            {step === 'password' && (
              <>
                <FieldRoot>
                  <FieldLabel>Password</FieldLabel>
                  <Input type='password' autoComplete='current-password' placeholder='Enter a password' />
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
              <FieldRoot>
                <FieldLabel>Verification code</FieldLabel>
                <Input inputMode='numeric' autoComplete='one-time-code' placeholder='123 456' />
              </FieldRoot>
            )}
            <Button type='submit'>{step === 'email' ? 'Continue' : step === 'password' ? 'Log in' : 'Verify'}</Button>
          </form>
          {step !== 'email' && (
            <Button
              size='sm'
              variant='outline'
              onClick={() => {
                setStep(step === 'verification' ? 'password' : 'email')
                setMessage(step === 'verification' ? 'Returned to password entry.' : 'Returned to email entry.')
              }}
            >
              {step === 'verification' ? 'Back to password' : 'Back to email'}
            </Button>
          )}
          <div className='border-t border-border pt-3'>
            <p className='mb-2 text-muted-foreground'>Alternative method</p>
            <Button size='sm' variant='ghost' onClick={() => setLoginError(true)}>
              Preview sign-in error
            </Button>
            <Button
              variant='outline'
              className='w-full'
              onClick={() => setMessage('Organization SSO selected. No authentication occurred.')}
            >
              Continue with organization SSO
            </Button>
          </div>
        </div>
      </UseCaseSection>
      <p role='status' aria-live='polite' className='text-muted-foreground'>
        {message}
      </p>
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
        title='Confirm a completed action briefly'
        scenario='After saving a flight plan, show a short-lived message that does not interrupt the next task.'
      >
        <div className='flex flex-wrap gap-2'>
          {statuses.map(({ type, label, message }) => (
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
        <Button variant='outline' aria-expanded={panelOpen} onClick={() => setPanelOpen((open) => !open)}>
          {panelOpen ? 'Close notifications · 3' : 'Notifications · 3'}
        </Button>
        {panelOpen && (
          <div
            role='region'
            aria-label='Notification center'
            className='max-w-xl divide-y divide-border border border-border'
          >
            <div className='space-y-1 p-3'>
              <p className='font-medium'>Task · Draft review pending</p>
              <p className='text-muted-foreground'>A sample task is waiting for review.</p>
            </div>
            <div className='space-y-1 p-3'>
              <p className='font-medium'>System · Map data refreshed</p>
              <p className='text-muted-foreground'>The latest coverage is available for route planning.</p>
            </div>
            <div className='space-y-1 p-3'>
              <p className='font-medium'>Priority · Notification access updated</p>
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
              variant='outline'
              onClick={() => setActionMessage('Description editor preview opened; no record was changed.')}
            >
              Edit description
            </Button>
          </AlertAction>
        </Alert>
        {updateVisible ? (
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
              flight-plan-48…-revision-a
            </dd>
          </div>
          <div className='min-w-0'>
            <dt className='text-muted-foreground'>Front-line</dt>
            <dd
              className='truncate text-right'
              dir='rtl'
              title='https://skytrack.example.com/missions/north-coast-survey'
            >
              https://skytrack.example.com/missions/north-coast-survey
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
            <Input type='date' value='2026-11-05' readOnly />
            <FieldDescription>Bound-entry value is reviewable but cannot be changed.</FieldDescription>
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
          <FieldLabel>Mission note · read-only</FieldLabel>
          <Input value='' placeholder='No note provided' readOnly />
          <FieldDescription>The field remains readable and keyboard-focusable.</FieldDescription>
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
  const [searchLoading, setSearchLoading] = useState(false)
  const scopedItems = SAMPLE_ITEMS.filter((item) => scope === 'All' || item.type === scope)
  const results = scopedItems.filter((item) =>
    item.name.toLowerCase().includes((mode === 'basic' ? submittedQuery : query).toLowerCase())
  )
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
          <div className='flex flex-wrap gap-2' aria-label='Search scope'>
            {['All', 'Planning', 'Review', 'Complete'].map((value) => (
              <Button
                key={value}
                size='sm'
                variant={scope === value ? 'secondary' : 'outline'}
                aria-pressed={scope === value}
                onClick={() => setScope(value)}
              >
                {value}
              </Button>
            ))}
          </div>
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
            onChange={(event) => setQuery(event.target.value)}
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
        {mode === 'focused' && query && scope !== 'All' && (
          <Button size='sm' variant='ghost' onClick={() => setScope('All')}>
            Search all missions for “{query}”
          </Button>
        )}
      </UseCaseSection>
      <UseCaseSection
        title='Review result count and recover from no matches'
        scenario='Show how many missions match, offer recent queries before the first search, and let the user broaden or clear a search.'
      >
        <p aria-live='polite' className='text-muted-foreground'>
          {results.length} results{mode === 'basic' && !submittedQuery ? ' · submit to search' : ''}
          {mode === 'focused' ? ` · ${scope} scope` : ''}
        </p>
        {mode === 'basic' && !submittedQuery ? (
          <div className='flex flex-wrap items-center gap-2'>
            <span className='text-muted-foreground'>Recent searches:</span>
            {['North coast', 'Runway inspection'].map((recent) => (
              <Button
                key={recent}
                size='sm'
                variant='ghost'
                onClick={() => {
                  setQuery(recent)
                  setSubmittedQuery(recent)
                }}
              >
                {recent}
              </Button>
            ))}
          </div>
        ) : results.length ? (
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
      </UseCaseSection>
      <UseCaseSection
        title='Preview matches before opening the full result set'
        scenario='For a small mission catalog, show type-ahead matches in place; a broader focused search can expand to all missions.'
      >
        <p className='text-muted-foreground'>
          Type in the search field above to update these matching mission previews.
        </p>
        <ul aria-live='polite' className='divide-y divide-border border-y border-border'>
          {results.slice(0, 3).map((item) => (
            <li key={item.name} className='flex items-center justify-between gap-3 py-2'>
              <span>{item.name}</span>
              <Badge variant='outline'>{item.type}</Badge>
            </li>
          ))}
          {!results.length && <li className='py-2 text-muted-foreground'>No matching preview yet.</li>}
        </ul>
        {mode === 'focused' && (
          <Button size='sm' variant='outline' onClick={() => setScope('All')}>
            See all missions
          </Button>
        )}
      </UseCaseSection>
      <UseCaseSection
        title='Signal a slow search and support right-to-left entry'
        scenario='For a resource-intensive query, communicate that the request is still running; keep the search icon and text-entry order usable in right-to-left interfaces.'
      >
        <FieldRoot className='max-w-md'>
          <FieldLabel>Mission catalog · right-to-left example</FieldLabel>
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
            <span aria-hidden='true' className='size-3 rounded-full bg-success' />
            <span>Ready</span>
          </li>
          <li className='flex items-center gap-2'>
            <span aria-hidden='true' className='size-3 rotate-45 bg-warning' />
            <span>Needs review</span>
          </li>
          <li className='flex items-center gap-2'>
            <span aria-hidden='true' className='size-3 bg-destructive' />
            <span>Blocked</span>
          </li>
        </ul>
      </UseCaseSection>
      <UseCaseSection
        title='Summarize unread work in navigation'
        scenario='Show a queue count, an unread item, and the meaningful zero state.'
      >
        <div className='flex flex-wrap items-center gap-6'>
          <span className='inline-flex items-center gap-2'>
            <span>Notifications</span>
            <Badge count={4} status='error' />
          </span>
          <span className='inline-flex items-center gap-2'>
            <span>New report</span>
            <Badge dot status='processing' aria-label='New report available' />
          </span>
          <span className='inline-flex items-center gap-2'>
            <span>Review queue</span>
            <Badge count={0} showZero status='secondary' />
          </span>
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

function TextToolbarDemo() {
  const [query, setQuery] = useState('')
  const [attachment, setAttachment] = useState(false)
  const [link, setLink] = useState('')
  const [message, setMessage] = useState('Unsaved local draft preview.')
  const [formats, setFormats] = useState<string[]>(['bold'])
  const [draft, setDraft] = useState(
    'North coast mission brief\nSample notes: route summary, assigned asset, and linked reference.'
  )
  const matches = query ? draft.toLowerCase().split(query.toLowerCase()).length - 1 : 0
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
                  <MenuItem onClick={() => setMessage('Heading style selected for the draft preview.')}>
                    Heading
                  </MenuItem>
                  <MenuItem onClick={() => setMessage('Body style selected for the draft preview.')}>Body</MenuItem>
                  <MenuItem onClick={() => setMessage('Quote style selected for the draft preview.')}>Quote</MenuItem>
                </MenuPopup>
              </MenuPositioner>
            </MenuPortal>
          </Menu>
          <Menu>
            <ToolbarButton render={<MenuTrigger />}>More</ToolbarButton>
            <MenuPortal>
              <MenuPositioner side='bottom' align='start' sideOffset={4}>
                <MenuPopup>
                  <MenuItem onClick={() => setAttachment(true)}>Attach file</MenuItem>
                  <MenuItem onClick={() => document.getElementById('text-toolbar-search')?.focus()}>
                    Search text
                  </MenuItem>
                  <MenuItem onClick={() => setMessage('Changes saved as a draft.')}>Save draft</MenuItem>
                </MenuPopup>
              </MenuPositioner>
            </MenuPortal>
          </Menu>
        </Toolbar>
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
            onClick={() => setMessage(link ? `Embedded link: ${link}` : 'Enter a link first.')}
          >
            Embed link
          </Button>
          <Button size='sm' variant='outline' onClick={() => setAttachment((value) => !value)}>
            {attachment ? 'Remove attachment' : 'Attach file'}
          </Button>
          <Button size='sm' onClick={() => setMessage('Draft saved.')}>
            Save draft
          </Button>
        </div>
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
        <p role='status' aria-live='polite' className='text-muted-foreground'>
          Local sample only. {message}
        </p>
      </UseCaseSection>
      <UseCaseSection
        title='Find and edit wording in context'
        scenario='Search within the brief, see the match count, and update the editable text while reviewing its formatted preview.'
      >
        <Input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          startAdornment={<MagnifyingGlassIcon aria-hidden='true' />}
          endAdornment={query ? <Badge count={`${matches} matches`} size='sm' /> : null}
          placeholder='Find text in draft'
          aria-label='Find text in draft'
          id='text-toolbar-search'
        />
        <div className='space-y-2'>
          <p className='text-sm text-muted-foreground'>Draft editor · formatting applies to the preview</p>
          <FieldRoot>
            <FieldLabel>Draft text</FieldLabel>
            <FieldControl
              render={<textarea />}
              className='min-h-24 resize-y py-3'
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
            />
          </FieldRoot>
        </div>
        <div
          aria-label='Formatted draft preview'
          className='min-h-16 whitespace-pre-wrap rounded-(--radius) border border-border bg-muted/30 p-3'
          style={{
            fontWeight: formats.includes('bold') ? 600 : 400,
            fontStyle: formats.includes('italic') ? 'italic' : 'normal',
            textDecoration: formats.includes('underline') ? 'underline' : 'none'
          }}
        >
          {draft}
        </div>
      </UseCaseSection>
    </DemoFrame>
  )
}

function ChatbotsDemo() {
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState<Array<{ role: 'user' | 'assistant'; text: string }>>([])
  const [connectionError, setConnectionError] = useState(false)
  const [humanHandoff, setHumanHandoff] = useState(false)
  const sendMessage = (value: string) => {
    const question = value.trim()
    if (!question) return
    const normalized = question.toLowerCase()
    const answer = normalized.includes('weather')
      ? 'This local sample has no authorized weather policy, so it cannot provide flight guidance.'
      : normalized.includes('route') || normalized.includes('mission')
        ? 'Open Missions to review the route, assigned aircraft, and schedule.'
        : 'I can help with mission routes or weather checks. Try one of those topics, or open Missions directly.'
    setSent((items) => [...items, { role: 'user', text: question }, { role: 'assistant', text: answer }])
    setMessage('')
  }
  return (
    <DemoFrame>
      <UseCaseSection
        title='Ask for mission planning help'
        scenario='A pilot asks for route or weather guidance, sees suggested prompts, and receives a scripted local answer.'
      >
        <div role='log' aria-live='polite' className='space-y-2'>
          <p>
            <strong>Mission helper:</strong> I can help find route or weather guidance. Choose a prompt or type a
            question.
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
        <Button variant='outline' onClick={() => sendMessage('Open missions')}>
          Open Missions
        </Button>
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
            <AlertDescription>Check the connection, then retry your question.</AlertDescription>
            <AlertAction>
              <Button
                size='sm'
                variant='outline'
                onClick={() => {
                  setConnectionError(false)
                  setSent((items) => [...items, { role: 'assistant', text: 'Connection restored. How can I help?' }])
                }}
              >
                Retry
              </Button>
            </AlertAction>
          </Alert>
        ) : (
          <Button size='sm' variant='outline' onClick={() => setConnectionError(true)}>
            Simulate connection error
          </Button>
        )}
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
  const [welcomeVisible, setWelcomeVisible] = useState(true)
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
        {welcomeVisible ? (
          <Alert>
            <AlertTitle>Welcome to Mission planning</AlertTitle>
            <AlertDescription>Learn where to find missions, saved views, and workspace help.</AlertDescription>
            <AlertAction>
              <Button size='sm' onClick={() => setWelcomeVisible(false)}>
                Get started
              </Button>
            </AlertAction>
          </Alert>
        ) : (
          <Alert variant='success'>
            <AlertTitle>Introduction dismissed</AlertTitle>
            <AlertDescription>You can revisit the guide from Workspace help.</AlertDescription>
            <AlertAction>
              <Button size='sm' variant='outline' onClick={() => setWelcomeVisible(true)}>
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
        Catalog-only source: section types follow the accessible Carbon community catalog summary; the wording and UI
        are local illustrations, not product onboarding policy.
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
  const create = () => {
    setCreated(name.trim())
    setOpen(false)
  }
  const fields = (
    <>
      <FieldRoot>
        <FieldLabel>Mission name</FieldLabel>
        <Input value={name} onChange={(event) => setName(event.target.value)} />
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
            ? 'Add a short mission while keeping the collection visible.'
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
            {fields}
            <div className='flex gap-2'>
              <Button onClick={create}>Create mission</Button>
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
                    <Button onClick={create}>Create mission</Button>
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
        <Drawer open={panelOpen} onOpenChange={setPanelOpen} swipeDirection='right'>
          <DrawerTrigger>Open mission side panel</DrawerTrigger>
          <DrawerPortal>
            <DrawerBackdrop />
            <DrawerViewport side='right'>
              <DrawerPopup side='right'>
                <DrawerContent>
                  <DrawerTitle>New mission</DrawerTitle>
                  <DrawerDescription>
                    Enter a mission name and purpose. This example does not create a record.
                  </DrawerDescription>
                  {fields}
                  <div className='flex flex-wrap gap-2'>
                    <DrawerClose onClick={() => setPanelOpen(false)}>Cancel</DrawerClose>
                    <Button
                      onClick={() => {
                        setCreated(name.trim())
                        setPanelOpen(false)
                      }}
                    >
                      Create mission
                    </Button>
                  </div>
                </DrawerContent>
              </DrawerPopup>
            </DrawerViewport>
          </DrawerPortal>
        </Drawer>
      </UseCaseSection>
      <UseCaseSection
        title='Give a multi-step creation task a full-page canvas'
        scenario='Use the whole workspace when route setup needs a broader safety and map context; this is a local layout illustration, not a routed page component.'
      >
        {fullPageOpen ? (
          <section className='space-y-3 border border-border p-4'>
            <p className='sub-heading'>NEW MISSION · FULL-PAGE LAYOUT PREVIEW</p>
            <h5 className='text-sm font-medium text-(--foreground)'>Configure flight area</h5>
            {fields}
            <div className='flex flex-wrap gap-2'>
              <Button variant='outline' onClick={() => setDiscardOpen(true)}>
                Leave with unsaved changes
              </Button>
              <Button
                onClick={() => {
                  setCreated(name.trim())
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
      </UseCaseSection>
      <UseCaseSection
        title='Use a narrow tearsheet for a compact create task'
        scenario='Show the focused, narrow side sheet layout for a short task while keeping a sense of the collection behind it.'
      >
        <div className='mx-auto flex min-h-72 w-full max-w-sm flex-col border border-border bg-background shadow-sm'>
          <div className='space-y-1 border-b border-border p-4'>
            <h5 className='text-sm font-medium text-(--foreground)'>New mission · narrow tearsheet</h5>
            <p className='text-muted-foreground'>Compact task layout illustration</p>
          </div>
          <div className='flex-1 space-y-3 p-4'>
            <FieldRoot>
              <FieldLabel>Mission name</FieldLabel>
              <Input defaultValue='Coastal survey' />
            </FieldRoot>
            <FieldRoot>
              <FieldLabel>Collection</FieldLabel>
              <Input defaultValue='North region' />
            </FieldRoot>
          </div>
          <div className='flex flex-wrap justify-end gap-2 border-t border-border p-4'>
            <Button size='sm' variant='outline'>
              Cancel
            </Button>
            <Button size='sm'>Create</Button>
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
              <h5 className='text-sm font-medium text-(--foreground)'>Configure mission · wide tearsheet</h5>
              <p className='text-muted-foreground'>Expanded create layout illustration</p>
            </div>
            <div className='grid flex-1 gap-3 p-4 sm:grid-cols-2'>
              <FieldRoot>
                <FieldLabel>Mission name</FieldLabel>
                <Input defaultValue='Coastal survey' />
              </FieldRoot>
              <FieldRoot>
                <FieldLabel>Collection</FieldLabel>
                <Input defaultValue='North region' />
              </FieldRoot>
              <FieldRoot className='sm:col-span-2'>
                <FieldLabel>Description</FieldLabel>
                <Input defaultValue='Map the coastal sample area' />
              </FieldRoot>
            </div>
          </div>
          <aside className='space-y-2 border-t border-border bg-muted/30 p-4 md:border-t-0 md:border-l'>
            <h5 className='text-sm font-medium text-(--foreground)'>Review</h5>
            <p className='text-muted-foreground'>
              Name and collection are shown together before the local sample is created.
            </p>
          </aside>
          <div className='flex flex-wrap justify-end gap-2 border-t border-border p-4 md:col-span-2'>
            <Button size='sm' variant='outline'>
              Cancel
            </Button>
            <Button size='sm'>Create</Button>
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
            Advance create flow
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
  const [editPageOpen, setEditPageOpen] = useState(false)
  const [saved, setSaved] = useState('')
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
                setSaved('Mission name updated locally.')
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
                      Review the change summary before saving. The sample illustrates a confirmation step; no live
                      mission is modified.
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
                        setSaved('Changes saved locally after confirmation.')
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
        {saved && (
          <Alert variant='success'>
            <AlertTitle>Saved</AlertTitle>
            <AlertDescription>{saved}</AlertDescription>
          </Alert>
        )}
        <p className='text-muted-foreground'>
          The examples cover inline, modal, side-panel, and full-page layouts. Changes stay in local state.
        </p>
      </UseCaseSection>
      <UseCaseSection
        title='Keep a broader edit in a side panel'
        scenario='When an update needs related context, edit it in a side surface while retaining the mission list behind it.'
      >
        <Drawer open={editPanelOpen} onOpenChange={setEditPanelOpen} swipeDirection='right'>
          <DrawerTrigger>Open mission edit panel</DrawerTrigger>
          <DrawerPortal>
            <DrawerBackdrop />
            <DrawerViewport side='right'>
              <DrawerPopup side='right'>
                <DrawerContent>
                  <DrawerTitle>Edit mission details</DrawerTitle>
                  <DrawerDescription>
                    Review editable and locked values before saving the sample. This side-panel flow keeps the list
                    context available.
                  </DrawerDescription>
                  <FieldRoot>
                    <FieldLabel>Mission name</FieldLabel>
                    <Input value={draft} onChange={(event) => setDraft(event.target.value)} />
                  </FieldRoot>
                  <Alert variant='warning'>
                    <AlertTitle>Review the change</AlertTitle>
                    <AlertDescription>
                      Only the mission name changes in this example; the assigned flight area is read-only.
                    </AlertDescription>
                  </Alert>
                  <FieldRoot>
                    <FieldLabel>Flight area · read-only</FieldLabel>
                    <Input value='North coast' readOnly />
                  </FieldRoot>
                  <div className='flex flex-wrap gap-2'>
                    <DrawerClose>Cancel</DrawerClose>
                    <Button
                      onClick={() => {
                        setName(draft)
                        setSaved('Changes saved locally.')
                        setEditPanelOpen(false)
                      }}
                    >
                      Save changes
                    </Button>
                  </div>
                </DrawerContent>
              </DrawerPopup>
            </DrawerViewport>
          </DrawerPortal>
        </Drawer>
      </UseCaseSection>
      <UseCaseSection
        title='Use a full-page canvas for a complex revision'
        scenario='When a route revision needs broad context and review, provide a dedicated layout; this is an in-place preview, not a separate route.'
      >
        {editPageOpen ? (
          <section className='max-w-2xl space-y-3 border border-border p-4'>
            <p className='sub-heading'>EDIT MISSION · FULL-PAGE LAYOUT PREVIEW</p>
            <FieldRoot>
              <FieldLabel>Mission name</FieldLabel>
              <Input value={draft} onChange={(event) => setDraft(event.target.value)} />
            </FieldRoot>
            <Alert variant='warning'>
              <AlertTitle>Review before saving</AlertTitle>
              <AlertDescription>
                This preview changes only a local sample value. Confirm the summary below before continuing.
              </AlertDescription>
            </Alert>
            <p className='text-muted-foreground'>
              Change summary: {name} → {draft}
            </p>
            <div className='flex gap-2'>
              <Button variant='outline' onClick={() => setEditPageOpen(false)}>
                Cancel preview
              </Button>
              <Button
                onClick={() => {
                  setName(draft)
                  setSaved('Changes saved locally.')
                  setEditPageOpen(false)
                }}
              >
                Save revision
              </Button>
            </div>
          </section>
        ) : (
          <Button variant='outline' onClick={() => setEditPageOpen(true)}>
            Preview full-page edit
          </Button>
        )}
      </UseCaseSection>
    </DemoFrame>
  )
}

function ExportDemo() {
  const toastManager = useToastManager()
  const [format, setFormat] = useState('CSV')
  const [location, setLocation] = useState('Downloads')
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState('Choose a format; no file will be generated.')
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
            setStatus('mission-summary.csv is ready for the browser download flow. This demo does not create a file.')
          }
        >
          Download mission summary · CSV
        </Button>
        <p role='status' aria-live='polite' className='text-muted-foreground'>
          {status}
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
                  setStatus(`${option} selected for the local example.`)
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
                  setProgress(0),
                  setStatus(`${fileName}.${format.toLowerCase()} prepared for ${location}. No download occurred.`))
            }
          >
            Export {format}
          </Button>
          <Button
            variant='outline'
            onClick={() => {
              setDestinationError(true)
              setStatus('Export failed in the local sample.')
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
                  setStatus('Export is ready to retry in the local sample.')
                }}
              >
                Retry
              </Button>
            </AlertAction>
          </Alert>
        )}
        <p role='status' aria-live='polite' className='text-muted-foreground'>
          {status}
        </p>
      </UseCaseSection>
      <UseCaseSection
        title='Track preparation and recover from an export failure'
        scenario='Show progress only while preparation runs, then communicate completion or a recoverable destination error.'
      >
        <div className='grid max-w-xl gap-2'>
          <Progress value={progress}>
            <ProgressLabel>Preparing export</ProgressLabel>
            <ProgressValue />
            <ProgressTrack>
              <ProgressIndicator />
            </ProgressTrack>
          </Progress>
          <Button
            size='sm'
            variant='outline'
            onClick={() => {
              const next = progress >= 100 ? 25 : Math.min(progress + 25, 100)
              setProgress(next)
              setStatus(
                next === 100
                  ? 'Export preparation complete. No file was created.'
                  : `Preparing ${format} export · ${next}%.`
              )
            }}
          >
            Advance preparation
          </Button>
        </div>
        <p role='status' aria-live='polite' className='text-muted-foreground'>
          {status}
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
            setStatus('Success notification preview shown; no file was downloaded.')
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
          {status}
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
  const [notice, setNotice] = useState('Name the key and choose its access before generating the sample.')
  const [name, setName] = useState('Mission planning integration')
  const [restricted, setRestricted] = useState(false)
  const [generated, setGenerated] = useState(false)
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
                onClick={() => setRetrieval(value)}
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
                : 'The sample key is available only in the generated result; copy it before leaving.'}
          </FieldDescription>
          {retrieval === 'product' && (
            <Button
              size='sm'
              variant='outline'
              onClick={() => setNotice('Key management page preview selected; no external page opened.')}
            >
              Preview key management
            </Button>
          )}
          {retrieval === 'platform' && (
            <Button
              size='sm'
              variant='outline'
              onClick={() => setNotice('Separate-platform instructions preview selected; no external service opened.')}
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
          <AlertTitle>{retrieval === 'once' ? 'Copy your key now' : 'Key retrieval details'}</AlertTitle>
          <AlertDescription>
            {retrieval === 'once'
              ? 'This sample shows a one-time retrieval warning. A real product should explain safe storage and whether recovery is unavailable.'
              : retrieval === 'product'
                ? 'This sample says the key can be retrieved later in the product.'
                : 'This sample says the key can be retrieved in a separate platform and should link to its instructions.'}
          </AlertDescription>
        </Alert>
        <Button
          disabled={!name.trim()}
          onClick={() => {
            setGenerated(true)
            setVisible(false)
            setCopied(false)
            setNotice('Sample key generated. Copy it now; this value is illustrative and not a credential.')
          }}
        >
          {generated ? 'Generate another sample key' : 'Generate key'}
        </Button>
        {generated && (
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
                  setNotice('Sample key copied state shown. Clipboard was not accessed.')
                }}
              >
                {copied ? 'Copied' : 'Copy key'}
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
                    <MenuItem onClick={() => setNotice('Key rotation preview selected; no credential was changed.')}>
                      Rotate key
                    </MenuItem>
                    <MenuItem onClick={() => setNotice('Revoke preview selected; no credential was revoked.')}>
                      Revoke key
                    </MenuItem>
                  </MenuPopup>
                </MenuPositioner>
              </MenuPortal>
            </Menu>
            <p className='text-muted-foreground'>
              Generated view: reveal/hide and copy are local illustrations only; no real key or clipboard access.
            </p>
          </section>
        )}
        <p role='status' aria-live='polite' className='text-muted-foreground'>
          {notice}
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
                  <MenuItem onClick={() => setNotice('Rotation preview selected; no credential was changed.')}>
                    Rotate key
                  </MenuItem>
                  <MenuItem onClick={() => setNotice('Revoke preview selected; no credential was revoked.')}>
                    Revoke
                  </MenuItem>
                </MenuPopup>
              </MenuPositioner>
            </MenuPortal>
          </Menu>
        </div>
        {editingExisting && (
          <div className='grid max-w-xl gap-3 border border-border p-4'>
            <h5 className='text-sm font-medium text-(--foreground)'>Edit key settings</h5>
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
                  setNotice('Key settings saved in the local example; key contents are unchanged.')
                  setEditingExisting(false)
                }}
              >
                Save settings
              </Button>
            </div>
          </div>
        )}
        <p role='status' aria-live='polite' className='text-muted-foreground'>
          {notice}
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
                    setStatus(
                      singleFileSource === 'file'
                        ? 'One mission file selected for import. No file was uploaded.'
                        : 'URL accepted for this sample. No data was fetched.'
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
                    <Input defaultValue='Coastal survey imports' />
                  </FieldRoot>
                  <FieldRoot>
                    <FieldLabel>Import note</FieldLabel>
                    <Input placeholder='Optional note for reviewers' />
                  </FieldRoot>
                  <div className='flex flex-wrap gap-2'>
                    <DrawerClose>Cancel</DrawerClose>
                    <Button onClick={() => setMetadataPanelOpen(false)}>Continue import</Button>
                  </div>
                </DrawerContent>
              </DrawerPopup>
            </DrawerViewport>
          </DrawerPortal>
        </Drawer>
      </UseCaseSection>
    </DemoFrame>
  )
}

function OrderSummaryDemo() {
  const [seats, setSeats] = useState(2)
  const [reviewReady, setReviewReady] = useState(false)
  const subtotal = 120 + seats * 25
  const serviceFee = 15
  const total = subtotal + serviceFee

  return (
    <DemoFrame>
      <UseCaseSection
        title='Review what is included before confirmation'
        scenario='Summarize selected items, quantities, charges, and current review state so the user can check the order before continuing.'
      >
        <div className='space-y-3'>
          <dl className='grid grid-cols-[minmax(0,1fr)_auto] gap-x-6 gap-y-3'>
            <dt>Mission planning package × 1</dt>
            <dd className='text-right'>$120.00</dd>
            <dt>Additional workspace seats · $25.00 each</dt>
            <dd className='flex items-center gap-2 text-right'>
              <Button
                size='icon-xs'
                variant='outline'
                aria-label='Remove one seat'
                disabled={seats <= 1}
                onClick={() => setSeats((value) => Math.max(1, value - 1))}
              >
                −
              </Button>
              <span>{seats} × $25.00</span>
              <Button
                size='icon-xs'
                variant='outline'
                aria-label='Add one seat'
                onClick={() => setSeats((value) => value + 1)}
              >
                +
              </Button>
              <span className='sr-only'>Line total ${(seats * 25).toFixed(2)}</span>
            </dd>
            <dt>Subtotal</dt>
            <dd className='text-right'>${subtotal.toFixed(2)}</dd>
            <dt>Service fee</dt>
            <dd className='text-right'>${serviceFee.toFixed(2)}</dd>
          </dl>
          <div className='flex items-center justify-between gap-3 border-t border-border pt-3 font-medium'>
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className='flex flex-wrap items-center justify-between gap-3'>
            <span>Order status</span>
            <Badge count='Review' status='warning' />
          </div>
          <Button onClick={() => setReviewReady(true)}>Continue to review</Button>
          {reviewReady && (
            <Alert variant='info'>
              <AlertTitle>Ready for review</AlertTitle>
              <AlertDescription>
                The displayed total is the current sample selection. No order was submitted.
              </AlertDescription>
            </Alert>
          )}
        </div>
        <p className='text-muted-foreground'>
          Sample prices and fees are illustrative; no checkout or order was submitted.
        </p>
      </UseCaseSection>
      <UseCaseSection
        title='Summarize a service and its current status'
        scenario='When the summary describes a platform or service, make its main function and current state scannable before the user opens more detail.'
      >
        <div className='space-y-2 border-y border-border py-3'>
          <div className='flex flex-wrap items-center justify-between gap-3'>
            <span className='font-medium'>Mission archive service</span>
            <Badge count='Sample status' status='outline' />
          </div>
          <p className='text-muted-foreground'>Stores named sample plans, saved filters, and export history.</p>
          <Button size='sm' variant='outline'>
            View service details
          </Button>
        </div>
        <p className='text-muted-foreground'>
          Catalog-only source: service-summary details are a local illustration based on the accessible Carbon catalog
          description.
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
  const [outcome, setOutcome] = useState('Choose an example to see its local result.')
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
            <Button
              size='sm'
              variant='outline'
              onClick={() => {
                setHighDeleted(false)
                setOutcome('Sample resource restored.')
              }}
            >
              Restore sample
            </Button>
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
                        setOutcome(`${resourceName} deleted in this local example.`)
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
          {outcome}
        </p>
      </UseCaseSection>

      <UseCaseSection
        title='Medium-impact deletion · confirm the consequence'
        scenario='For a smaller but irreversible loss, explain what will be deleted and require a deliberate confirmation.'
      >
        <div className='flex flex-wrap items-center justify-between gap-3'>
          <span>Saved filter · “Coastal survey”</span>
          {mediumDeleted ? (
            <Button
              size='sm'
              variant='outline'
              onClick={() => {
                setMediumDeleted(false)
                setOutcome('Saved filter restored in the local example.')
              }}
            >
              Restore saved filter
            </Button>
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
                        setOutcome('Saved filter deleted in this local example; mission records remain unchanged.')
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
          {outcome}
        </p>
      </UseCaseSection>

      <UseCaseSection
        title='Low-impact deletion · keep the list moving'
        scenario='For a reversible or low-impact item, remove it directly and offer Undo instead of interrupting with a confirmation.'
      >
        <div className='flex flex-wrap items-center justify-between gap-3'>
          {lowDeleted ? (
            <>
              <span>Draft removed from the sample list.</span>
              <Button
                variant='outline'
                onClick={() => {
                  setLowDeleted(false)
                  setOutcome('Draft restored to the local sample list.')
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
                  setOutcome('Draft removed from the sample list; Undo is available.')
                }}
              >
                Remove draft
              </Button>
            </>
          )}
        </div>
        <p role='status' aria-live='polite' className='text-muted-foreground'>
          {outcome}
        </p>
      </UseCaseSection>

      <UseCaseSection
        title='Medium-impact removal · preserve the original data'
        scenario='For a non-destructive but consequential unlink, explain the impact and confirm before removing access.'
      >
        <div className='flex flex-wrap items-center justify-between gap-3'>
          <span>{resourceName} · team collection</span>
          {mediumRemoved ? (
            <Button
              size='sm'
              variant='outline'
              onClick={() => {
                setMediumRemoved(false)
                setOutcome('Restored to the local team collection.')
              }}
            >
              Restore to team
            </Button>
          ) : (
            <AlertDialog open={mediumRemoveOpen} onOpenChange={setMediumRemoveOpen}>
              <AlertDialogTrigger render={<Button variant='outline'>Remove from team</Button>} />
              <AlertDialogPortal>
                <AlertDialogBackdrop />
                <AlertDialogPopup>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Remove from the team collection?</AlertDialogTitle>
                    <AlertDialogDescription>
                      The item will leave this collection. The owner&apos;s original resource remains available.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogClose>Cancel</AlertDialogClose>
                    <Button
                      variant='destructive'
                      onClick={() => {
                        setOutcome('Removed from the sample collection; the owner’s resource remains.')
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
          {outcome}
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
                  setOutcome('Saved item restored to this sample view.')
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
                setOutcome('Removed from this sample view; the source item is unchanged.')
              }}
            >
              Remove saved item
            </Button>
          )}
          <span role='status' aria-live='polite' className='text-muted-foreground'>
            {outcome}
          </span>
        </div>
      </UseCaseSection>
      <p className='text-muted-foreground'>All outcomes are local illustrations; no real item or permission changes.</p>
    </DemoFrame>
  )
}

export function PatternDemo({ patternId }: { patternId: PatternId }) {
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
