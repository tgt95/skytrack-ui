import type { DesignerPracticeRegistry } from '../practice-types'
import * as React from 'react'
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'
import { Alert, AlertTitle, AlertDescription, AlertAction } from '@/components/ui/alert'
import {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogPopup,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogClose
} from '@/components/ui/alert-dialog'
import {
  Attachment,
  AttachmentContent,
  AttachmentTitle,
  AttachmentDescription,
  AttachmentActions
} from '@/components/ui/attachment'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Autocomplete,
  AutocompleteCollection,
  AutocompleteGroup,
  AutocompleteGroupLabel,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList
} from '@/components/ui/autocomplete'
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig
} from '@/components/ui/chart'
import { CheckboxRoot as Checkbox } from '@/components/ui/checkbox'
import { CheckboxGroup } from '@/components/ui/checkbox-group'
import { Collapsible, CollapsibleTrigger, CollapsiblePanel } from '@/components/ui/collapsible'
import {
  Combobox,
  ComboboxChip,
  ComboboxChipRemove,
  ComboboxChips,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxInputGroup,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxList,
  ComboboxPopup,
  ComboboxPositioner,
  ComboboxPortal,
  ComboboxValue
} from '@/components/ui/combobox'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import {
  ContextMenu,
  ContextMenuItem,
  ContextMenuPopup,
  ContextMenuPortal,
  ContextMenuPositioner,
  ContextMenuSeparator,
  ContextMenuTrigger
} from '@/components/ui/context-menu'
import { DataTable, type DataTableColumnDef } from '@/components/ui/data-table'
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
  DialogViewport
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
  DrawerViewport
} from '@/components/ui/drawer'
import { Dropzone } from '@/components/ui/dropzone'
import { FieldRoot, FieldLabel, FieldControl, FieldDescription, FieldError } from '@/components/ui/field'
import { FieldsetRoot, FieldsetLegend } from '@/components/ui/fieldset'
import { Form } from '@/components/ui/form'

interface AutocompleteResult {
  id: string
  label: string
}

interface AutocompleteResultGroup {
  [key: string]: unknown
  value: string
  items: AutocompleteResult[]
}

const autocompleteResultGroups: AutocompleteResultGroup[] = [
  {
    value: 'Assets',
    items: [
      { id: 'asset-01', label: 'Asset 01 · In progress' },
      { id: 'asset-02', label: 'Asset 02 · Ready' }
    ]
  },
  {
    value: 'Locations',
    items: [
      { id: 'location-01', label: 'Location 01' },
      { id: 'location-02', label: 'Location 02' }
    ]
  }
]

const autocompleteFlatResults = autocompleteResultGroups.flatMap((group) => group.items)

function AutocompleteLayoutExample({ grouped }: { grouped: boolean }) {
  const input = <AutocompleteInput aria-label='Search records' placeholder='Search records' />

  return (
    <FieldRoot className='w-full max-w-md'>
      <FieldLabel>Search records</FieldLabel>
      {grouped ? (
        <Autocomplete
          items={autocompleteResultGroups}
          itemToStringValue={(item: AutocompleteResult) => item.label}
          inline
          open
        >
          {input}
          <AutocompleteList>
            {(group: AutocompleteResultGroup) => (
              <AutocompleteGroup key={group.value} items={group.items}>
                <AutocompleteGroupLabel>{group.value}</AutocompleteGroupLabel>
                <AutocompleteCollection>
                  {(item: AutocompleteResult) => (
                    <AutocompleteItem key={item.id} value={item}>
                      {item.label}
                    </AutocompleteItem>
                  )}
                </AutocompleteCollection>
              </AutocompleteGroup>
            )}
          </AutocompleteList>
        </Autocomplete>
      ) : (
        <Autocomplete
          items={autocompleteFlatResults}
          itemToStringValue={(item: AutocompleteResult) => item.label}
          inline
          open
        >
          {input}
          <AutocompleteList>
            {(item: AutocompleteResult) => (
              <AutocompleteItem key={item.id} value={item}>
                {item.label}
              </AutocompleteItem>
            )}
          </AutocompleteList>
        </Autocomplete>
      )}
    </FieldRoot>
  )
}

const chartPracticeConfig = {
  groupA: { label: 'Group A', color: 'var(--chart-1)' },
  groupB: { label: 'Group B', color: 'var(--chart-2)' },
  groupC: { label: 'Group C', color: 'var(--chart-3)' },
  groupD: { label: 'Group D', color: 'var(--chart-4)' },
  groupE: { label: 'Group E', color: 'var(--chart-5)' },
  groupF: { label: 'Group F', color: 'var(--chart-6)' },
  groupG: { label: 'Group G', color: 'var(--chart-7)' }
} satisfies ChartConfig

const chartPracticeSeries = [
  { key: 'groupA', label: 'Group A' },
  { key: 'groupB', label: 'Group B' },
  { key: 'groupC', label: 'Group C' },
  { key: 'groupD', label: 'Group D' },
  { key: 'groupE', label: 'Group E' },
  { key: 'groupF', label: 'Group F' },
  { key: 'groupG', label: 'Group G' }
] as const

const chartPracticeData = [
  { period: 'Mon', groupA: 24, groupB: 32, groupC: 18, groupD: 42, groupE: 27, groupF: 35, groupG: 14 },
  { period: 'Tue', groupA: 31, groupB: 27, groupC: 34, groupD: 24, groupE: 41, groupF: 19, groupG: 38 },
  { period: 'Wed', groupA: 28, groupB: 39, groupC: 23, groupD: 36, groupE: 19, groupF: 44, groupG: 30 },
  { period: 'Thu', groupA: 42, groupB: 34, groupC: 39, groupD: 21, groupE: 35, groupF: 26, groupG: 45 }
]

function ChartBehaviorExample({ crowded }: { crowded: boolean }) {
  const series = crowded ? chartPracticeSeries : chartPracticeSeries.slice(0, 3)

  return (
    <ChartContainer config={chartPracticeConfig} className='h-40 w-full'>
      <LineChart accessibilityLayer data={chartPracticeData} margin={{ top: 4, right: 8, bottom: 0, left: 0 }}>
        <CartesianGrid vertical={false} stroke='var(--border)' />
        <XAxis dataKey='period' tickLine={false} axisLine={false} tickMargin={6} />
        <YAxis hide domain={[0, 50]} />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        {series.map(({ key }) => (
          <Line key={key} dataKey={key} type='monotone' stroke={`var(--color-${key})`} strokeWidth={2} dot={false} />
        ))}
      </LineChart>
    </ChartContainer>
  )
}

const teamMemberItems = ['Member 01', 'Member 02', 'Member 03', 'Member 04']

function MultiSelectComboboxExample({ closeAfterSelection }: { closeAfterSelection: boolean }) {
  const [open, setOpen] = React.useState(!closeAfterSelection)
  const [selected, setSelected] = React.useState<string[]>(
    closeAfterSelection ? ['Member 01'] : ['Member 01', 'Member 02']
  )

  return (
    <FieldRoot className='w-full max-w-md'>
      <FieldLabel>Team members</FieldLabel>
      <Combobox<string, true>
        items={teamMemberItems}
        multiple
        value={selected}
        open={open}
        onOpenChange={setOpen}
        onValueChange={(nextValue) => {
          setSelected(nextValue)
          if (closeAfterSelection) setOpen(false)
        }}
      >
        <ComboboxInputGroup shape='chips'>
          <ComboboxValue>
            {(value: string[]) => (
              <ComboboxChips aria-label={value.length > 0 ? 'Selected team members' : undefined}>
                {value.map((member) => (
                  <ComboboxChip key={member} aria-label={member}>
                    {member}
                    <ComboboxChipRemove aria-label={`Remove ${member}`} />
                  </ComboboxChip>
                ))}
                <ComboboxInput placeholder={value.length > 0 ? 'Add another member' : 'Select members'} />
              </ComboboxChips>
            )}
          </ComboboxValue>
        </ComboboxInputGroup>
        <ComboboxPortal>
          <ComboboxPositioner side='bottom' align='start' sideOffset={4}>
            <ComboboxPopup>
              <ComboboxEmpty>No team members found.</ComboboxEmpty>
              <ComboboxList>
                {(member: string) => (
                  <ComboboxItem key={member} value={member}>
                    <ComboboxItemIndicator />
                    <span className='col-start-2'>{member}</span>
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxPopup>
          </ComboboxPositioner>
        </ComboboxPortal>
      </Combobox>
    </FieldRoot>
  )
}

const alignmentRows = [
  { id: 'R-1042', count: 1240.5 },
  { id: 'R-1043', count: 94 },
  { id: 'R-1044', count: 8.25 }
]
type AlignmentRow = (typeof alignmentRows)[number]

function NumericAlignmentExample({ align }: { align: 'right' | 'center' }) {
  const columns: DataTableColumnDef<AlignmentRow>[] = [
    { accessorKey: 'id', header: 'Record', enableSorting: false, enableHiding: false },
    { accessorKey: 'count', header: 'Rate (%)', meta: { align }, enableSorting: false, enableHiding: false }
  ]

  return (
    <DataTable
      data={alignmentRows}
      columns={columns}
      pageSize={3}
      searchPlaceholder='Search records'
      className='[&_table]:min-w-0'
    />
  )
}

function DateAvailabilityExample({ restrictDates }: { restrictDates: boolean }) {
  const month = new Date(2026, 10, 1)
  const minimumDate = new Date(2026, 10, 10)
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date(2026, 10, 15))
  const [showError, setShowError] = React.useState(false)

  return (
    <FieldRoot invalid={showError} className='w-full max-w-md'>
      <FieldLabel>Report date</FieldLabel>
      <Calendar
        mode='single'
        month={month}
        selected={selectedDate}
        onSelect={(date) => {
          setSelectedDate(date)
          setShowError(false)
        }}
        disabled={restrictDates ? { before: minimumDate } : undefined}
      />
      <FieldDescription>
        {restrictDates
          ? 'Dates before November 10 are disabled before selection.'
          : 'Choose any date, then continue to check its availability.'}
      </FieldDescription>
      <Button size='default' variant='outline' onClick={() => setShowError(Boolean(selectedDate && selectedDate < minimumDate))}>
        Continue
      </Button>
      {showError && <FieldError match={true}>Choose a report date on or after November 10.</FieldError>}
    </FieldRoot>
  )
}

function DialogActionExample({ equalActions }: { equalActions: boolean }) {
  return (
    <div className='w-full max-w-sm rounded-(--radius) border border-border bg-background p-4 text-foreground shadow-sm'>
      <DialogHeader>
        <div className='h5 font-semibold text-foreground'>Update project settings</div>
        <div className='text-muted-foreground'>Review the project details before saving.</div>
      </DialogHeader>
      <DialogFooter className='mt-4 flex-row justify-end gap-2'>
        <Button size='default' variant={equalActions ? 'default' : 'outline'}>
          Cancel
        </Button>
        <Button size='default'>Save changes</Button>
      </DialogFooter>
    </div>
  )
}

function DialogUnsavedChangesExample({ nestedConfirmation }: { nestedConfirmation: boolean }) {
  const [portalContainer, setPortalContainer] = React.useState<HTMLDivElement | null>(null)
  const [parentOpen, setParentOpen] = React.useState(true)
  const [confirmationOpen, setConfirmationOpen] = React.useState(true)

  return (
    <div
      ref={setPortalContainer}
      className='relative isolate min-h-56 w-full max-w-sm overflow-hidden rounded-(--radius) border border-border bg-background text-foreground shadow-sm [transform:translateZ(0)]'
    >
      {portalContainer && (
        <Dialog open={parentOpen} onOpenChange={setParentOpen} modal={false}>
          <DialogPortal container={portalContainer} className='relative z-10'>
            <DialogPopup className='!absolute !top-3 !left-3 !z-10 !w-[calc(100%-1.5rem)] !max-w-none !translate-x-0 !translate-y-0 p-3 shadow-sm'>
              <DialogHeader>
                <DialogTitle>Update document</DialogTitle>
                <DialogDescription>Changes have not been saved yet.</DialogDescription>
              </DialogHeader>
              {nestedConfirmation ? (
                <>
                  <p className='text-muted-foreground'>The draft stays open beneath a second confirmation.</p>
                  <Dialog open={confirmationOpen} onOpenChange={setConfirmationOpen}>
                    <DialogPortal container={portalContainer} className='relative z-50'>
                      <DialogBackdrop className='!absolute !inset-0 !z-20 !min-h-0 bg-background/60' />
                      <DialogViewport className='!absolute !inset-0 !z-20 flex items-center justify-center overflow-hidden p-3'>
                        <DialogPopup className='!absolute !top-1/2 !left-1/2 !z-30 !-translate-x-1/2 !-translate-y-1/2 w-[calc(100%-1.5rem)] max-w-sm p-3'>
                          <DialogHeader>
                            <DialogTitle>Discard changes?</DialogTitle>
                            <DialogDescription>Your unsaved edits will be lost.</DialogDescription>
                          </DialogHeader>
                          <DialogFooter className='flex-row justify-end gap-2'>
                            <DialogClose size='default' variant='outline'>
                              Keep editing
                            </DialogClose>
                            <DialogClose
                              size='default'
                              variant='destructive'
                              onClick={() => setParentOpen(false)}
                            >
                              Discard
                            </DialogClose>
                          </DialogFooter>
                        </DialogPopup>
                      </DialogViewport>
                    </DialogPortal>
                  </Dialog>
                </>
              ) : (
                <>
                  <div className='rounded-(--radius) border border-border bg-muted p-3'>
                    <p className='font-medium'>Discard unsaved changes?</p>
                    <p className='text-muted-foreground'>Review the consequence without opening another dialog.</p>
                  </div>
                  <DialogFooter className='flex-row justify-end gap-2'>
                    <DialogClose size='default' variant='outline'>Keep editing</DialogClose>
                    <DialogClose size='default' variant='destructive'>Discard</DialogClose>
                  </DialogFooter>
                </>
              )}
            </DialogPopup>
          </DialogPortal>
        </Dialog>
      )}
      {!parentOpen && (
        <Button
          size='default'
          variant='outline'
          className='absolute inset-x-3 top-3 z-40'
          onClick={() => {
            setConfirmationOpen(true)
            setParentOpen(true)
          }}
        >
          Show preview
        </Button>
      )}
    </div>
  )
}

function AlertDialogPracticeExample({ equalActions }: { equalActions: boolean }) {
  const [container, setContainer] = React.useState<HTMLDivElement | null>(null)
  const [open, setOpen] = React.useState(true)

  return (
    <div
      ref={setContainer}
      className='relative isolate flex w-full max-w-sm flex-col items-center gap-2 [transform:translateZ(0)]'
    >
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogPortal container={container} className='relative z-auto w-full'>
          <AlertDialogPopup
            initialFocus={false}
            className='relative top-auto left-auto z-auto translate-x-0 translate-y-0 w-full max-w-sm p-4 shadow-sm sm:max-w-sm'
          >
            <AlertDialogHeader>
              <AlertDialogTitle className='font-semibold text-foreground'>Delete this project?</AlertDialogTitle>
              <AlertDialogDescription className='text-base text-muted-foreground'>
                This action cannot be undone. All project data will be permanently removed.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className='mt-4 flex-row justify-end gap-2'>
              <AlertDialogClose size='default' variant={equalActions ? 'destructive' : 'outline'}>
                Cancel
              </AlertDialogClose>
              <AlertDialogClose size='default' variant='destructive'>
                Delete project
              </AlertDialogClose>
            </AlertDialogFooter>
          </AlertDialogPopup>
        </AlertDialogPortal>
      </AlertDialog>
      {!open && (
        <Button size='default' variant='outline' onClick={() => setOpen(true)}>
          Reset preview
        </Button>
      )}
    </div>
  )
}

function DrawerResponsiveExample({ centeredDialog }: { centeredDialog: boolean }) {
  const [container, setContainer] = React.useState<HTMLDivElement | null>(null)
  const [open, setOpen] = React.useState(true)

  return (
    <div
      ref={setContainer}
      className='relative isolate h-64 w-full max-w-xs overflow-hidden rounded-(--radius) border border-border bg-muted [transform:translateZ(0)]'
    >
      <div className='absolute inset-x-0 top-0 z-10 border-b border-border bg-background px-3 py-2 text-xs font-medium text-muted-foreground'>
        Narrow viewport · activity details
      </div>
      {container &&
        (centeredDialog ? (
          <Dialog open={open} onOpenChange={setOpen} modal={false}>
            <DialogPortal container={container}>
              <DialogBackdrop className='!absolute !inset-0 !min-h-0 bg-foreground/20' />
              <DialogViewport className='!absolute !inset-0 flex items-center justify-center overflow-hidden p-3'>
                <DialogPopup className='!absolute !top-1/2 !left-1/2 !z-50 !-translate-x-1/2 !-translate-y-1/2 w-[calc(100%-1.5rem)] max-w-sm p-3'>
                  <DialogHeader>
                    <DialogTitle>Activity summary</DialogTitle>
                    <DialogDescription>Recent updates for this item.</DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose size='default'>Close</DialogClose>
                  </DialogFooter>
                </DialogPopup>
              </DialogViewport>
            </DialogPortal>
          </Dialog>
        ) : (
          <Drawer
            open={open}
            onOpenChange={setOpen}
            modal={false}
            swipeDirection='down'
            snapPoints={['148px', 1]}
            defaultSnapPoint='148px'
          >
            <DrawerPortal container={container}>
              <DrawerBackdrop className='!absolute !inset-0 !min-h-0 bg-foreground/20' />
              <DrawerViewport side='bottom' className='!absolute !inset-0 !z-auto overflow-hidden'>
                <DrawerPopup side='bottom' className='!max-h-full !rounded-t-(--radius) !border-b !px-4 !py-3'>
                  <DrawerContent>
                    <DrawerTitle>Activity summary</DrawerTitle>
                    <DrawerDescription>Recent updates for this item.</DrawerDescription>
                    <DrawerClose size='default' className='self-start'>
                      Close
                    </DrawerClose>
                  </DrawerContent>
                </DrawerPopup>
              </DrawerViewport>
            </DrawerPortal>
          </Drawer>
        ))}
      {!open && (
        <Button size='default' variant='outline' className='absolute inset-x-3 top-12 z-[60]' onClick={() => setOpen(true)}>
          Show preview
        </Button>
      )}
    </div>
  )
}

function ContextMenuPracticeExample({ deleteLast }: { deleteLast: boolean }) {
  const [container, setContainer] = React.useState<HTMLDivElement | null>(null)
  const [anchor, setAnchor] = React.useState<HTMLDivElement | null>(null)
  const [open, setOpen] = React.useState(true)

  return (
    <div
      ref={setContainer}
      className='relative isolate min-h-48 w-full max-w-md rounded-(--radius) border border-border bg-muted p-3 [transform:translateZ(0)]'
    >
      <ContextMenu open={Boolean(anchor) && open} onOpenChange={(nextOpen) => setOpen(nextOpen)}>
        <ContextMenuTrigger
          ref={setAnchor}
          className='flex min-h-10 w-full items-center rounded-(--radius) border border-border bg-background px-3 text-left text-foreground'
        >
          Record R-1042
        </ContextMenuTrigger>
        {container && anchor && (
          <ContextMenuPortal container={container}>
            <ContextMenuPositioner anchor={anchor} side='bottom' align='start' sideOffset={4}>
              <ContextMenuPopup className='w-48'>
                <ContextMenuItem>Edit record</ContextMenuItem>
                {deleteLast ? (
                  <>
                    <ContextMenuItem>Duplicate record</ContextMenuItem>
                    <ContextMenuSeparator />
                    <ContextMenuItem variant='destructive'>Delete record</ContextMenuItem>
                  </>
                ) : (
                  <>
                    <ContextMenuItem variant='destructive'>Delete record</ContextMenuItem>
                    <ContextMenuItem>Duplicate record</ContextMenuItem>
                  </>
                )}
              </ContextMenuPopup>
            </ContextMenuPositioner>
          </ContextMenuPortal>
        )}
      </ContextMenu>
    </div>
  )
}

function FormValidationFocusExample({ focusFirstInvalid }: { focusFirstInvalid: boolean }) {
  const invalidFieldRef = React.useRef<HTMLElement | null>(null)

  return focusFirstInvalid ? (
    <Form className='w-full max-w-md' onFormSubmit={() => invalidFieldRef.current?.focus()}>
      <FieldRoot invalid name='recordId'>
        <FieldLabel>Record ID</FieldLabel>
        <FieldControl
          ref={invalidFieldRef}
          defaultValue='Invalid value'
          aria-invalid='true'
          className='focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background'
        />
        <FieldError>Enter a valid record ID.</FieldError>
      </FieldRoot>
      <Button type='submit' size='default'>
        Save changes
      </Button>
    </Form>
  ) : (
    <Form
      className='w-full max-w-md'
      onFormSubmit={(_values, eventDetails) => {
        const submitter = (eventDetails.event as SubmitEvent).submitter
        submitter?.focus()
      }}
    >
      <Alert variant='destructive'>
        <div className='grid min-w-0 flex-1 gap-1'>
          <AlertTitle>Unable to save</AlertTitle>
          <AlertDescription>Review the form fields.</AlertDescription>
        </div>
      </Alert>
      <FieldRoot name='recordId'>
        <FieldLabel>Record ID</FieldLabel>
        <FieldControl defaultValue='Invalid value' />
      </FieldRoot>
      <Button
        type='submit'
        size='default'
        className='focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background'
      >
        Submit
      </Button>
    </Form>
  )
}

export const designerPracticeRegistry: DesignerPracticeRegistry = {
  accordion: {
    Behavior: [
      {
        recommended: (
          <Accordion className='w-full max-w-md' multiple defaultValue={['activity', 'preferences']}>
            <AccordionItem value='activity'>
              <AccordionTrigger>Activity</AccordionTrigger>
              <AccordionContent className='text-muted-foreground'>Sync paused</AccordionContent>
            </AccordionItem>
            <AccordionItem value='preferences'>
              <AccordionTrigger>Settings</AccordionTrigger>
              <AccordionContent className='text-muted-foreground'>Settings updated</AccordionContent>
            </AccordionItem>
          </Accordion>
        ),
        discouraged: (
          <Accordion className='w-full max-w-md' defaultValue={['activity']}>
            <AccordionItem value='activity'>
              <AccordionTrigger>Activity</AccordionTrigger>
              <AccordionContent className='text-muted-foreground'>Sync paused</AccordionContent>
            </AccordionItem>
            <AccordionItem value='preferences'>
              <AccordionTrigger>Settings</AccordionTrigger>
              <AccordionContent className='text-muted-foreground'>Settings updated</AccordionContent>
            </AccordionItem>
          </Accordion>
        )
      }
    ]
  },
  'alert-dialog': {
    Layout: [
      {
        recommended: <AlertDialogPracticeExample equalActions={false} />,
        discouraged: <AlertDialogPracticeExample equalActions />
      }
    ]
  },
  alert: {
    Behavior: [
      {
        recommended: (
          <Alert variant='warning' className='w-full max-w-sm'>
            <div className='grid min-w-0 flex-1 gap-1'>
              <AlertTitle>Connection interrupted</AlertTitle>
              <AlertDescription>Using a backup connection.</AlertDescription>
              <AlertAction className='ml-0 mt-2 self-start'>
                <Button size='default' variant='outline'>
                  Retry connection
                </Button>
              </AlertAction>
            </div>
          </Alert>
        ),
        discouraged: (
          <Alert variant='warning' className='w-full max-w-sm'>
            <div className='grid min-w-0 flex-1 gap-1'>
              <AlertTitle>Connection interrupted</AlertTitle>
              <AlertDescription>No recovery action is available.</AlertDescription>
            </div>
          </Alert>
        )
      }
    ]
  },
  attachment: {
    Behavior: [
      {
        recommended: (
          <div className='w-full max-w-md space-y-1.5'>
            <Attachment size='default' state='error'>
              <AttachmentContent>
                <AttachmentTitle>activity_log.csv</AttachmentTitle>
                <AttachmentDescription>Upload failed: checksum mismatch</AttachmentDescription>
              </AttachmentContent>
              <AttachmentActions>
                <Button size='default' variant='outline'>
                  Retry
                </Button>
              </AttachmentActions>
            </Attachment>
          </div>
        ),
        discouraged: (
          <div className='w-full max-w-md space-y-1.5'>
            <Attachment size='default' state='error'>
              <AttachmentContent>
                <AttachmentTitle>activity_log.csv</AttachmentTitle>
                <AttachmentDescription>Error</AttachmentDescription>
              </AttachmentContent>
            </Attachment>
          </div>
        )
      }
    ]
  },
  autocomplete: {
    Layout: [
      {
        recommended: <AutocompleteLayoutExample grouped />,
        discouraged: <AutocompleteLayoutExample grouped={false} />
      }
    ]
  },
  avatar: {
    Behavior: [
      {
        recommended: (
          <div className='flex items-center gap-3'>
            <Avatar size='default'>
              <AvatarFallback>TC</AvatarFallback>
            </Avatar>
            <div>
              <div className='font-medium text-foreground'>Taylor Chen</div>
              <div className='text-muted-foreground'>Account owner</div>
            </div>
          </div>
        ),
        discouraged: (
          <div className='flex items-center gap-3'>
            <Avatar size='default'>
              <AvatarFallback className='bg-muted' />
            </Avatar>
            <div>
              <div className='font-medium text-foreground'>Taylor Chen</div>
              <div className='text-muted-foreground'>Account owner</div>
            </div>
          </div>
        )
      }
    ]
  },
  badge: {
    Behavior: [
      {
        recommended: (
          <div className='flex items-center gap-2'>
            <Badge status='error' count={1429} maxCount={99} />
            <span className='text-muted-foreground'>Alarms capped cleanly (99+)</span>
          </div>
        ),
        discouraged: (
          <div className='flex items-center gap-2'>
            <Badge status='error' count={1429} maxCount={9999} />
            <span className='text-muted-foreground'>Uncapped digits distort badge</span>
          </div>
        )
      }
    ]
  },
  breadcrumb: {
    Behavior: [
      {
        recommended: (
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href='#'>Workspace</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbEllipsis />
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Project details</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        ),
        discouraged: (
          <Breadcrumb>
            <BreadcrumbList className='flex-wrap max-w-44'>
              <BreadcrumbItem>
                <BreadcrumbLink href='#'>Workspace</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href='#'>Team Alpha</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href='#'>Alpha</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Project details</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        )
      }
    ]
  },
  button: {
    Layout: [
      {
        recommended: (
          <div className='flex flex-wrap items-center justify-center gap-2'>
            <Button variant='default'>Save</Button>
            <Button variant='outline'>Cancel</Button>
          </div>
        ),
        discouraged: (
          <div className='flex flex-wrap items-center justify-center gap-2'>
            <Button variant='default'>Save</Button>
            <Button variant='default'>Cancel</Button>
          </div>
        )
      }
    ]
  },
  calendar: {
    Behavior: [
      {
        recommended: (
          <div className='flex items-center justify-center rounded-(--radius) border border-border p-3'>
            <Calendar
              mode='single'
              selected={new Date(2026, 9, 31)}
              disabled={(date) => date < new Date(2026, 9, 31)}
              showOutsideDays
            />
          </div>
        ),
        discouraged: (
          <div className='flex items-center justify-center rounded-(--radius) border border-border p-3'>
            <Calendar mode='single' selected={new Date(2026, 9, 31)} showOutsideDays />
          </div>
        )
      }
    ]
  },
  chart: {
    Behavior: [
      {
        recommended: <ChartBehaviorExample crowded={false} />,
        discouraged: <ChartBehaviorExample crowded />
      }
    ]
  },
  'checkbox-group': {
    Behavior: [
      {
        recommended: (
          <CheckboxGroup className='space-y-1.5' defaultValue={['activity']}>
            <label className='flex cursor-pointer items-center gap-2 font-medium'>
              <Checkbox indeterminate />
              <span>All report sections</span>
            </label>
            <div className='pl-5 space-y-1 text-muted-foreground'>
              <label className='flex cursor-pointer items-center gap-2'>
                <Checkbox checked />
                <span>Activity summary</span>
              </label>
            </div>
          </CheckboxGroup>
        ),
        discouraged: (
          <CheckboxGroup className='space-y-1 text-muted-foreground'>
            <label className='flex cursor-pointer items-center gap-2'>
              <Checkbox checked />
              <span>Activity summary</span>
            </label>
            <label className='flex cursor-pointer items-center gap-2'>
              <Checkbox />
              <span>Invoices</span>
            </label>
          </CheckboxGroup>
        )
      }
    ]
  },
  checkbox: {
    Behavior: [
      {
        recommended: (
          <label className='flex cursor-pointer items-center gap-2 font-medium'>
            <Checkbox defaultChecked />
            <span>Enable automatic recovery</span>
          </label>
        ),
        discouraged: (
          <div className='flex items-center gap-2 font-medium'>
            <Checkbox defaultChecked />
            <span className='select-none pointer-events-none text-muted-foreground'>Enable automatic recovery</span>
          </div>
        )
      }
    ]
  },
  collapsible: {
    Behavior: [
      {
        recommended: (
          <Collapsible defaultOpen={false} className='w-full max-w-md space-y-1.5'>
            <CollapsibleTrigger
              render={
                <Button variant='ghost' size='default'>
                  Show advanced settings
                </Button>
              }
            />
            <CollapsiblePanel className='space-y-1 pt-1 text-muted-foreground'>
              <div>Sync interval: 500 ms</div>
              <div>Status updates: Enabled</div>
            </CollapsiblePanel>
          </Collapsible>
        ),
        discouraged: (
          <Collapsible
            defaultOpen={false}
            className='w-full max-w-md border border-destructive/30 p-2 rounded-(--radius) space-y-1.5'
          >
            <div className='text-destructive font-medium'>Required approval (Hidden)</div>
            <CollapsibleTrigger
              render={
                <Button variant='ghost' size='default'>
                  Reveal required authorization
                </Button>
              }
            />
            <CollapsiblePanel className='space-y-1 pt-1 text-muted-foreground'>
              <div>Mandatory manager sign-off required before submit</div>
            </CollapsiblePanel>
          </Collapsible>
        )
      }
    ]
  },
  combobox: {
    Behavior: [
      {
        recommended: <MultiSelectComboboxExample closeAfterSelection={false} />,
        discouraged: <MultiSelectComboboxExample closeAfterSelection />
      }
    ]
  },
  command: {
    Layout: [
      {
        recommended: (
          <Command className='w-full max-w-md rounded-(--radius) border border-border'>
            <CommandInput placeholder='Search commands' />
            <CommandList>
              <CommandEmpty>No commands found.</CommandEmpty>
              <CommandGroup heading='Quick actions'>
                <CommandItem value='review-project'>Review project</CommandItem>
              </CommandGroup>
              <CommandGroup heading='Navigation'>
                <CommandItem value='view-records'>View records</CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        ),
        discouraged: (
          <Command className='w-full max-w-md rounded-(--radius) border border-border'>
            <CommandInput placeholder='Search commands' />
            <CommandList>
              <CommandEmpty>No commands found.</CommandEmpty>
              <CommandGroup>
                <CommandItem value='review-project'>Review project</CommandItem>
                <CommandItem value='view-records'>View records</CommandItem>
                <CommandItem value='update-preferences'>Update preferences</CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        )
      }
    ]
  },
  'context-menu': {
    Content: [
      {
        recommended: <ContextMenuPracticeExample deleteLast />,
        discouraged: <ContextMenuPracticeExample deleteLast={false} />
      }
    ]
  },
  'data-table': {
    Layout: [
      {
        recommended: <NumericAlignmentExample align='right' />,
        discouraged: <NumericAlignmentExample align='center' />
      }
    ]
  },
  'date-picker': {
    Behavior: [
      {
        recommended: <DateAvailabilityExample restrictDates />,
        discouraged: <DateAvailabilityExample restrictDates={false} />
      }
    ]
  },
  dialog: {
    Layout: [
      {
        recommended: <DialogActionExample equalActions={false} />,
        discouraged: <DialogActionExample equalActions />
      },
      {
        recommended: <DialogUnsavedChangesExample nestedConfirmation={false} />,
        discouraged: <DialogUnsavedChangesExample nestedConfirmation />
      }
    ]
  },
  drawer: {
    Behavior: [
      {
        recommended: <DrawerResponsiveExample centeredDialog={false} />,
        discouraged: <DrawerResponsiveExample centeredDialog />
      }
    ]
  },
  dropzone: {
    Behavior: [
      {
        recommended: (
          <div className='w-full max-w-md space-y-2'>
            <Dropzone
              className='min-h-32 p-4'
              hint='Drop files here or browse. Max 50 MB.'
              buttonLabel='Browse files'
            />
            <div className='text-muted-foreground'>Supported formats: CSV, PDF, PNG</div>
          </div>
        ),
        discouraged: (
          <div className='w-full max-w-md space-y-2'>
            <Dropzone className='min-h-32 p-4' hint='Drop files here' buttonLabel='Browse files' />
          </div>
        )
      }
    ]
  },
  field: {
    Behavior: [
      {
        recommended: (
          <FieldRoot invalid className='w-full max-w-md'>
            <FieldLabel>Maximum capacity</FieldLabel>
              <FieldControl
                type='number'
                defaultValue={550}
                aria-invalid='true'
                className='ring-2 ring-ring ring-offset-2 ring-offset-background'
              />
            <FieldError>Capacity cannot exceed 400 items.</FieldError>
          </FieldRoot>
        ),
        discouraged: (
          <div className='w-full max-w-md space-y-2'>
            <Alert variant='destructive'>
              <div className='grid min-w-0 flex-1 gap-1'>
                <AlertTitle>Unable to save</AlertTitle>
                <AlertDescription>Review the form fields.</AlertDescription>
              </div>
            </Alert>
            <FieldRoot>
              <FieldLabel>Maximum capacity</FieldLabel>
              <FieldControl type='number' defaultValue={550} />
            </FieldRoot>
          </div>
        )
      }
    ]
  },
  fieldset: {
    Behavior: [
      {
        recommended: (
          <FieldsetRoot className='w-full max-w-md rounded-(--radius) border border-border p-2.5'>
            <FieldsetLegend className='font-semibold'>Location settings</FieldsetLegend>
            <FieldRoot>
              <FieldLabel>Session timeout</FieldLabel>
              <FieldControl defaultValue='30 minutes' />
            </FieldRoot>
            <FieldRoot>
              <FieldLabel>Language</FieldLabel>
              <FieldControl defaultValue='English' />
            </FieldRoot>
          </FieldsetRoot>
        ),
        discouraged: (
          <div className='w-full max-w-md space-y-3'>
            <FieldRoot>
              <FieldLabel>Session timeout</FieldLabel>
              <FieldControl defaultValue='30 minutes' />
            </FieldRoot>
            <FieldRoot>
              <FieldLabel>Language</FieldLabel>
              <FieldControl defaultValue='English' />
            </FieldRoot>
          </div>
        )
      }
    ]
  },
  form: {
    Behavior: [
      {
        recommended: <FormValidationFocusExample focusFirstInvalid />,
        discouraged: <FormValidationFocusExample focusFirstInvalid={false} />
      }
    ]
  }
}
