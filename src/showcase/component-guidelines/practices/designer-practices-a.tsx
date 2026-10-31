import type { DesignerPracticeRegistry } from '../practice-types'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
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
import { CheckboxRoot as Checkbox } from '@/components/ui/checkbox'
import { Collapsible, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Dropzone } from '@/components/ui/dropzone'
import { FieldRoot, FieldLabel, FieldControl, FieldError } from '@/components/ui/field'
import { FieldsetRoot, FieldsetLegend } from '@/components/ui/fieldset'
import { Form } from '@/components/ui/form'

export const designerPracticeRegistry: DesignerPracticeRegistry = {
  accordion: {
    Behavior: [
      {
        recommended: (
          <Accordion className='w-full max-w-xs' multiple defaultValue={['activity', 'preferences']}>
            <AccordionItem value='activity'>
              <AccordionTrigger>Activity</AccordionTrigger>
              <AccordionContent className='text-xs text-muted-foreground'>Sync paused</AccordionContent>
            </AccordionItem>
            <AccordionItem value='preferences'>
              <AccordionTrigger>Settings</AccordionTrigger>
              <AccordionContent className='text-xs text-muted-foreground'>Settings updated</AccordionContent>
            </AccordionItem>
          </Accordion>
        ),
        discouraged: (
          <Accordion className='w-full max-w-xs' defaultValue={['activity']}>
            <AccordionItem value='activity'>
              <AccordionTrigger>Activity</AccordionTrigger>
              <AccordionContent className='text-xs text-muted-foreground'>Sync paused</AccordionContent>
            </AccordionItem>
            <AccordionItem value='preferences'>
              <AccordionTrigger>Settings</AccordionTrigger>
              <AccordionContent className='text-xs text-muted-foreground'>Settings updated</AccordionContent>
            </AccordionItem>
          </Accordion>
        )
      }
    ]
  },
  'alert-dialog': {
    Layout: [
      {
        recommended: (
          <div className='flex flex-wrap items-center justify-center gap-2'>
            <Button variant='destructive'>Cancel project</Button>
            <Button variant='outline'>Cancel</Button>
          </div>
        ),
        discouraged: (
          <div className='flex flex-wrap items-center justify-center gap-2'>
            <Button variant='destructive'>Cancel project</Button>
            <Button variant='destructive'>Cancel</Button>
          </div>
        )
      }
    ]
  },
  alert: {
    Behavior: [
      {
        recommended: (
          <Alert variant='warning' className='w-full max-w-sm'>
            <AlertTitle>Connection interrupted</AlertTitle>
            <AlertDescription className='flex items-center justify-between gap-2 text-xs'>
              <span>Using a backup connection.</span>
              <Button size='xs' variant='outline'>
                Retry connection
              </Button>
            </AlertDescription>
          </Alert>
        ),
        discouraged: (
          <Alert variant='warning' className='w-full max-w-sm'>
            <AlertTitle>Connection interrupted</AlertTitle>
            <AlertDescription className='text-xs'>No recovery action is available.</AlertDescription>
          </Alert>
        )
      }
    ]
  },
  attachment: {
    Behavior: [
      {
        recommended: (
          <div className='w-full max-w-xs space-y-1.5'>
            <Attachment size='sm' className='border-destructive/40 bg-destructive/5'>
              <AttachmentContent>
                <AttachmentTitle>activity_log.csv</AttachmentTitle>
                <AttachmentDescription className='text-destructive'>
                  Upload failed: checksum mismatch
                </AttachmentDescription>
              </AttachmentContent>
              <AttachmentActions>
                <Button size='xs' variant='outline'>
                  Retry
                </Button>
              </AttachmentActions>
            </Attachment>
          </div>
        ),
        discouraged: (
          <div className='w-full max-w-xs space-y-1.5'>
            <Attachment size='sm' className='border-destructive/40 bg-destructive/5'>
              <AttachmentContent>
                <AttachmentTitle>activity_log.csv</AttachmentTitle>
                <AttachmentDescription className='text-destructive'>Error</AttachmentDescription>
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
        recommended: (
          <div className='w-full max-w-xs rounded-(--radius) border border-border bg-popover p-2 text-xs shadow-xs'>
            <div className='font-semibold text-muted-foreground uppercase px-2 py-1 text-[10px]'>Assets</div>
            <div className='rounded-xs bg-accent px-2 py-1 font-medium'>Item 01 (In progress)</div>
            <div className='font-semibold text-muted-foreground uppercase px-2 py-1 text-[10px] mt-1'>Locations</div>
            <div className='rounded-xs px-2 py-1'>Customer records</div>
          </div>
        ),
        discouraged: (
          <div className='w-full max-w-xs rounded-(--radius) border border-border bg-popover p-2 text-xs shadow-xs'>
            <div className='rounded-xs bg-accent px-2 py-1 font-medium'>Record 01</div>
            <div className='rounded-xs px-2 py-1'>Customer records</div>
            <div className='rounded-xs px-2 py-1'>Record 02</div>
          </div>
        )
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
            <div className='text-xs'>
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
            <div className='text-xs'>
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
            <span className='text-xs text-muted-foreground'>Alarms capped cleanly (99+)</span>
          </div>
        ),
        discouraged: (
          <div className='flex items-center gap-2'>
            <Badge status='error' count={1429} maxCount={9999} />
            <span className='text-xs text-muted-foreground'>Uncapped digits distort badge</span>
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
            <BreadcrumbList className='text-xs'>
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
            <BreadcrumbList className='text-xs flex-wrap max-w-44'>
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
          <div className='rounded-(--radius) border border-border p-2 text-xs'>
            <Calendar
              mode='single'
              selected={new Date(2026, 9, 31)}
              disabled={(date) => date < new Date(2026, 9, 31)}
            />
          </div>
        ),
        discouraged: (
          <div className='rounded-(--radius) border border-border p-2 text-xs'>
            <Calendar mode='single' selected={new Date(2026, 9, 31)} />
          </div>
        )
      }
    ]
  },
  chart: {
    Behavior: [
      {
        recommended: (
          <div className='flex h-20 w-48 items-end justify-between gap-2 border-b border-border p-2'>
            <div className='w-8 rounded-t bg-primary h-14' title='Category A' />
            <div className='w-8 rounded-t bg-primary/70 h-10' title='Category B' />
            <div className='w-8 rounded-t bg-primary/40 h-8' title='Category C' />
          </div>
        ),
        discouraged: (
          <div className='flex h-20 w-48 items-end justify-between gap-0.5 border-b border-border p-2'>
            {Array.from({ length: 14 }).map((_, i) => (
              <div key={i} className='w-2.5 rounded-t bg-primary' style={{ height: `${((i % 5) + 2) * 10}px` }} />
            ))}
          </div>
        )
      }
    ]
  },
  'checkbox-group': {
    Behavior: [
      {
        recommended: (
          <div className='space-y-1.5 text-xs'>
            <label className='flex cursor-pointer items-center gap-2 font-medium'>
              <Checkbox indeterminate />
              <span>All report sections</span>
            </label>
            <div className='pl-5 space-y-1 text-muted-foreground'>
              <label className='flex items-center gap-2 cursor-pointer'>
                <Checkbox checked />
                <span>Activity summary</span>
              </label>
            </div>
          </div>
        ),
        discouraged: (
          <div className='space-y-1 text-xs text-muted-foreground'>
            <label className='flex items-center gap-2 cursor-pointer'>
              <Checkbox checked />
              <span>Activity summary</span>
            </label>
            <label className='flex items-center gap-2 cursor-pointer'>
              <Checkbox />
              <span>Invoices</span>
            </label>
          </div>
        )
      }
    ]
  },
  checkbox: {
    Behavior: [
      {
        recommended: (
          <label className='flex cursor-pointer items-center gap-2 text-xs font-medium'>
            <Checkbox defaultChecked />
            <span>Enable return-to-home fail-safe</span>
          </label>
        ),
        discouraged: (
          <div className='flex items-center gap-2 text-xs font-medium'>
            <Checkbox defaultChecked />
            <span className='select-none pointer-events-none text-muted-foreground'>
              Enable return-to-home fail-safe
            </span>
          </div>
        )
      }
    ]
  },
  collapsible: {
    Behavior: [
      {
        recommended: (
          <Collapsible defaultOpen={false} className='w-full max-w-xs text-xs'>
            <CollapsibleTrigger
              render={
                <Button variant='ghost' size='xs'>
                  Show advanced radio settings
                </Button>
              }
            />
          </Collapsible>
        ),
        discouraged: (
          <Collapsible
            defaultOpen={false}
            className='w-full max-w-xs text-xs border border-destructive/30 p-2 rounded-(--radius)'
          >
            <div className='text-destructive font-medium'>Required approval (Hidden)</div>
            <CollapsibleTrigger
              render={
                <Button variant='ghost' size='xs'>
                  Reveal required authorization
                </Button>
              }
            />
          </Collapsible>
        )
      }
    ]
  },
  combobox: {
    Behavior: [
      {
        recommended: (
          <div className='flex flex-wrap items-center gap-1.5 rounded-(--radius) border border-input bg-background p-1.5 text-xs'>
            <span className='rounded-xs bg-secondary px-1.5 py-0.5 text-secondary-foreground'>Record 01 ×</span>
            <span className='rounded-xs bg-secondary px-1.5 py-0.5 text-secondary-foreground'>Record 02 ×</span>
            <span className='text-muted-foreground pl-1'>Select team members...</span>
          </div>
        ),
        discouraged: (
          <div className='rounded-(--radius) border border-input bg-background p-1.5 text-xs text-muted-foreground'>
            <span>Record 01 (dropdown closed immediately)</span>
          </div>
        )
      }
    ]
  },
  command: {
    Layout: [
      {
        recommended: (
          <div className='w-full max-w-xs rounded-(--radius) border border-border bg-popover p-2 text-xs shadow-xs'>
            <div className='font-semibold text-muted-foreground uppercase px-2 py-0.5 text-[10px]'>Quick Actions</div>
            <div className='rounded-xs bg-accent px-2 py-1 font-medium'>Review project</div>
            <div className='font-semibold text-muted-foreground uppercase px-2 py-0.5 text-[10px] mt-1.5'>
              Navigation
            </div>
            <div className='rounded-xs px-2 py-1'>View asset list</div>
          </div>
        ),
        discouraged: (
          <div className='w-full max-w-xs rounded-(--radius) border border-border bg-popover p-2 text-xs shadow-xs'>
            <div className='rounded-xs px-2 py-1'>Review project</div>
            <div className='rounded-xs px-2 py-1'>View asset list</div>
            <div className='rounded-xs px-2 py-1'>Update preferences</div>
          </div>
        )
      }
    ]
  },
  'context-menu': {
    Content: [
      {
        recommended: (
          <div className='w-44 rounded-(--radius) border border-border bg-popover p-1 text-xs shadow-xs'>
            <div className='px-2 py-1 rounded-xs hover:bg-accent'>Edit item</div>
            <div className='px-2 py-1 rounded-xs hover:bg-accent'>Duplicate item</div>
            <div className='my-1 h-px bg-border' />
            <div className='px-2 py-1 rounded-xs text-destructive hover:bg-destructive/10 font-medium'>Delete item</div>
          </div>
        ),
        discouraged: (
          <div className='w-44 rounded-(--radius) border border-border bg-popover p-1 text-xs shadow-xs'>
            <div className='px-2 py-1 rounded-xs hover:bg-accent'>Edit item</div>
            <div className='px-2 py-1 rounded-xs text-destructive font-medium'>Delete item</div>
            <div className='px-2 py-1 rounded-xs hover:bg-accent'>Duplicate item</div>
          </div>
        )
      }
    ]
  },
  'data-table': {
    Layout: [
      {
        recommended: (
          <div className='w-full max-w-xs border border-border rounded-(--radius) text-xs overflow-hidden'>
            <div className='grid grid-cols-2 bg-muted/50 p-1.5 font-medium'>
              <span>Item ID</span>
              <span className='text-right'>Usage</span>
            </div>
            <div className='grid grid-cols-2 p-1.5 border-t border-border'>
              <span className='font-mono'>Record 01</span>
              <span className='text-right font-mono'>94%</span>
            </div>
          </div>
        ),
        discouraged: (
          <div className='w-full max-w-xs border border-border rounded-(--radius) text-xs overflow-hidden'>
            <div className='grid grid-cols-2 bg-muted/50 p-1.5 font-medium'>
              <span>Item ID</span>
              <span className='text-center'>Usage</span>
            </div>
            <div className='grid grid-cols-2 p-1.5 border-t border-border'>
              <span className='font-mono'>Record 01</span>
              <span className='text-center font-mono'>94%</span>
            </div>
          </div>
        )
      }
    ]
  },
  'date-picker': {
    Behavior: [
      {
        recommended: (
          <div className='rounded-(--radius) border border-border bg-popover p-2 text-xs'>
            <div className='font-medium pb-1 text-center'>November 2026</div>
            <div className='grid grid-cols-7 gap-1 text-center'>
              <span className='text-muted-foreground/40 cursor-not-allowed'>29</span>
              <span className='text-muted-foreground/40 cursor-not-allowed'>30</span>
              <span className='rounded bg-primary text-primary-foreground font-medium'>1</span>
              <span className='hover:bg-accent rounded'>2</span>
            </div>
          </div>
        ),
        discouraged: (
          <div className='rounded-(--radius) border border-border bg-popover p-2 text-xs'>
            <div className='font-medium pb-1 text-center'>November 2026</div>
            <div className='grid grid-cols-7 gap-1 text-center'>
              <span className='hover:bg-accent rounded'>29</span>
              <span className='hover:bg-accent rounded'>30</span>
              <span className='rounded bg-primary text-primary-foreground font-medium'>1</span>
              <span className='hover:bg-accent rounded'>2</span>
            </div>
          </div>
        )
      }
    ]
  },
  dialog: {
    Layout: [
      {
        recommended: (
          <div className='w-full max-w-xs space-y-3 rounded-(--radius) border border-border bg-card p-3'>
            <div className='text-xs font-semibold'>Update project settings</div>
            <div className='flex justify-end gap-2'>
              <Button variant='outline' size='xs'>
                Cancel
              </Button>
              <Button variant='default' size='xs'>
                Save changes
              </Button>
            </div>
          </div>
        ),
        discouraged: (
          <div className='w-full max-w-xs space-y-3 rounded-(--radius) border border-border bg-card p-3'>
            <div className='text-xs font-semibold'>Update project settings</div>
            <div className='flex justify-end gap-2'>
              <Button variant='default' size='xs'>
                Cancel
              </Button>
              <Button variant='default' size='xs'>
                Save changes
              </Button>
            </div>
          </div>
        )
      }
    ]
  },
  drawer: {
    Behavior: [
      {
        recommended: (
          <div className='w-full max-w-xs rounded-t-(--radius) border border-b-0 border-border bg-card p-3 text-xs shadow-lg'>
            <div className='mx-auto h-1 w-8 rounded-full bg-muted-foreground/30 mb-2' />
            <div className='font-medium'>Activity summary</div>
            <div className='text-muted-foreground text-[11px]'>Drag handle to expand or dismiss</div>
          </div>
        ),
        discouraged: (
          <div className='w-full max-w-xs rounded-(--radius) border border-destructive/40 bg-card p-3 text-xs'>
            <div className='font-medium text-destructive'>Centered Desktop Modal on Mobile</div>
            <div className='text-muted-foreground text-[11px]'>Dialog corners clipped off-screen</div>
          </div>
        )
      }
    ]
  },
  dropzone: {
    Behavior: [
      {
        recommended: (
          <div className='w-full max-w-xs space-y-1.5'>
            <Dropzone className='p-3 text-xs text-center border-destructive/50 bg-destructive/5'>
              <span>Drop files here</span>
            </Dropzone>
            <div className='text-[11px] text-destructive font-medium'>CSV, PDF, and image files are supported</div>
          </div>
        ),
        discouraged: (
          <div className='w-full max-w-xs space-y-1.5'>
            <Dropzone className='p-3 text-xs text-center'>
              <span>Drop files here (unresponsive rejection)</span>
            </Dropzone>
          </div>
        )
      }
    ]
  },
  field: {
    Behavior: [
      {
        recommended: (
          <FieldRoot className='w-full max-w-xs'>
            <FieldLabel className='text-xs font-medium'>Maximum capacity</FieldLabel>
            <FieldControl>
              <div className='h-8 rounded-(--radius) border border-destructive bg-background px-2 text-xs flex items-center'>
                550
              </div>
            </FieldControl>
            <FieldError className='text-[11px] text-destructive'>Capacity cannot exceed 400 items</FieldError>
          </FieldRoot>
        ),
        discouraged: (
          <div className='w-full max-w-xs space-y-1'>
            <div className='text-xs font-medium text-muted-foreground'>Maximum capacity</div>
            <div className='h-8 rounded-(--radius) border border-input bg-background px-2 text-xs flex items-center'>
              550
            </div>
          </div>
        )
      }
    ]
  },
  fieldset: {
    Behavior: [
      {
        recommended: (
          <FieldsetRoot className='w-full max-w-xs rounded-(--radius) border border-border p-2.5 text-xs'>
            <FieldsetLegend className='text-xs font-semibold'>Location settings</FieldsetLegend>
            <div className='text-muted-foreground'>Session timeout: 30 min · Language: English</div>
          </FieldsetRoot>
        ),
        discouraged: (
          <div className='w-full max-w-xs p-2.5 text-xs border border-border rounded-(--radius)'>
            <div className='text-muted-foreground'>30 min · English (ungrouped values)</div>
          </div>
        )
      }
    ]
  },
  form: {
    Behavior: [
      {
        recommended: (
          <Form className='w-full max-w-xs space-y-2 text-xs'>
            <div className='h-8 rounded-(--radius) border border-destructive bg-background px-2 flex items-center text-destructive'>
              Invalid Call Sign
            </div>
            <Button size='xs' variant='default' disabled>
              Saving changes...
            </Button>
          </Form>
        ),
        discouraged: (
          <Form className='w-full max-w-xs space-y-2 text-xs'>
            <div className='h-8 rounded-(--radius) border border-input bg-background px-2 flex items-center text-muted-foreground'>
              Call Sign
            </div>
            <Button size='xs' variant='default'>
              Submit
            </Button>
          </Form>
        )
      }
    ]
  }
}
