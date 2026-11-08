import * as React from 'react'
import { HouseIcon, MapPinIcon } from '@phosphor-icons/react'
import { InlineEdit, InlineEditTrigger, InlineEditInput } from '@/components/ui/inline-edit'
import { Input } from '@/components/ui/input'
import { FieldRoot, FieldLabel, FieldControl, FieldDescription, FieldItem } from '@/components/ui/field'
import {
  Menu,
  MenuTrigger,
  MenuPopup,
  MenuItem,
  MenuGroup,
  MenuGroupLabel,
  MenuSeparator,
  MenuPortal,
  MenuPositioner,
  MenuShortcut
} from '@/components/ui/menu'
import { Menubar } from '@/components/ui/menubar'
import { Meter, MeterLabel, MeterValue, MeterTrack, MeterIndicator } from '@/components/ui/meter'
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuPortal,
  NavigationMenuPositioner,
  NavigationMenuPopup,
  NavigationMenuViewport
} from '@/components/ui/navigation-menu'
import {
  NumberField,
  NumberFieldGroup,
  NumberFieldInput,
  NumberFieldIncrement,
  NumberFieldDecrement
} from '@/components/ui/number-field'
import { OTPField, OTPFieldInput, OTPFieldSeparator } from '@/components/ui/otp-field'
import { PageHeader } from '@/components/ui/page-header'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext
} from '@/components/ui/pagination'
import {
  Popover,
  PopoverTrigger,
  PopoverPopup,
  PopoverClose,
  PopoverPortal,
  PopoverPositioner
} from '@/components/ui/popover'
import {
  PreviewCard,
  PreviewCardTrigger,
  PreviewCardPopup,
  PreviewCardPortal,
  PreviewCardPositioner
} from '@/components/ui/preview-card'
import { Progress, ProgressLabel, ProgressValue, ProgressTrack, ProgressIndicator } from '@/components/ui/progress'
import { RadioGroup, RadioRoot } from '@/components/ui/radio'
import {
  ScrollArea,
  ScrollAreaViewport,
  ScrollAreaContent,
  ScrollAreaScrollbar,
  ScrollAreaThumb
} from '@/components/ui/scroll-area'
import {
  Select,
  SelectTrigger,
  SelectIcon,
  SelectValue,
  SelectPopup,
  SelectItem,
  SelectPortal,
  SelectPositioner
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset
} from '@/components/ui/sidebar'
import { Slider, SliderControl, SliderTrack, SliderIndicator, SliderThumb } from '@/components/ui/slider'
import { Switch, SwitchThumb } from '@/components/ui/switch'
import { Tabs, TabsList, TabsTab, TabsPanel } from '@/components/ui/tabs'
import { ToggleGroup } from '@/components/ui/toggle-group'
import { Toggle } from '@/components/ui/toggle'
import { Toolbar, ToolbarButton, ToolbarSeparator } from '@/components/ui/toolbar'
import {
  Tooltip,
  TooltipTrigger,
  TooltipPopup,
  TooltipProvider,
  TooltipPortal,
  TooltipPositioner
} from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'
import {
  ToastAction,
  ToastContent,
  ToastDescription,
  ToastPortal,
  ToastProvider,
  ToastRoot,
  ToastTitle,
  ToastViewport,
  createToastManager,
  useToastManager
} from '@/components/ui/toast'
import type { DesignerPracticeRegistry } from '../practice-types'

function ScrollAreaPractice({ showScrollbar }: { showScrollbar: boolean }) {
  return (
    <ScrollArea className='h-24 w-full max-w-md rounded-(--radius) border border-border'>
      <ScrollAreaViewport className='h-full'>
        <ScrollAreaContent className='space-y-2 p-3 text-base leading-normal'>
          <p>Record R-1042 · Status changed</p>
          <p>Record R-1048 · Assignment updated</p>
          <p>Record R-1051 · Review completed</p>
          <p>Record R-1056 · Owner changed</p>
        </ScrollAreaContent>
      </ScrollAreaViewport>
      {showScrollbar ? (
        <ScrollAreaScrollbar orientation='vertical'>
          <ScrollAreaThumb />
        </ScrollAreaScrollbar>
      ) : null}
    </ScrollArea>
  )
}

function SidebarLayoutPractice({ showTooltip }: { showTooltip: boolean }) {
  return (
    <SidebarProvider defaultOpen={false} className='relative h-24 min-h-0 w-full max-w-md overflow-hidden'>
      <Sidebar collapsible='icon' gapClassName='!h-full !min-h-0' containerClassName='!absolute !h-full'>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip={showTooltip ? 'Workspace overview' : undefined}>
                    <HouseIcon aria-hidden='true' />
                    {showTooltip ? <span>Workspace overview</span> : null}
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip={showTooltip ? 'Locations' : undefined}>
                    <MapPinIcon aria-hidden='true' />
                    {showTooltip ? <span>Locations</span> : null}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset className='h-full min-h-0'>
        <p className='px-14 py-3'>Workspace overview</p>
      </SidebarInset>
    </SidebarProvider>
  )
}

type ToastPreviewItem = { id: string; title: string; description: string; type: string; action?: boolean }

function ToastPractice({ items }: { items: ToastPreviewItem[] }) {
  const manager = React.useMemo(() => createToastManager(), [])
  const [container, setContainer] = React.useState<HTMLDivElement | null>(null)

  React.useEffect(() => {
    for (const { action, ...toast } of items) {
      manager.add({
        ...toast,
        timeout: 0,
        actionProps: action ? { children: 'Undo', onClick: () => manager.close(toast.id) } : undefined
      })
    }
    return () => items.forEach((item) => manager.close(item.id))
  }, [items, manager])

  return (
    <ToastProvider toastManager={manager} timeout={0}>
      <div ref={setContainer} className='relative min-h-28 w-full max-w-sm'>
        {container ? (
          <ToastPortal container={container}>
            <ToastViewport className='relative inset-auto z-auto mx-0 min-h-28 w-full max-w-sm flex-col gap-2 p-0'>
              <ToastPracticeItems />
            </ToastViewport>
          </ToastPortal>
        ) : null}
      </div>
    </ToastProvider>
  )
}

function ToastPracticeItems() {
  const { toasts } = useToastManager()

  return toasts.map((toast) => (
    <ToastRoot key={toast.id} toast={toast} layout='flat' className='relative inset-auto h-auto w-full max-w-sm'>
      <ToastContent>
        <div className='flex min-w-0 flex-1 flex-col gap-1'>
          <ToastTitle className='text-base' />
          <ToastDescription className='text-base' />
        </div>
        {toast.actionProps ? <ToastAction size='default' /> : null}
      </ToastContent>
    </ToastRoot>
  ))
}

function NotificationHistoryPractice() {
  return (
    <div className='w-full max-w-sm rounded-(--radius) border border-border bg-background p-4 text-foreground'>
      <h3 className='h4'>Notification history</h3>
      <ScrollArea className='mt-3 h-24 w-full'>
        <ScrollAreaViewport className='h-full'>
          <ScrollAreaContent className='space-y-3 p-2 text-base leading-normal'>
            <div className='border-b border-border pb-3'>
              <p className='font-medium'>Record deleted</p>
              <p className='text-muted-foreground'>Undo is no longer available.</p>
            </div>
            <div>
              <p className='font-medium'>Changes saved</p>
              <p className='text-muted-foreground'>Settings were updated.</p>
            </div>
          </ScrollAreaContent>
        </ScrollAreaViewport>
      </ScrollArea>
    </div>
  )
}

function ToastCompetitionPractice() {
  return (
    <div className='w-full max-w-sm space-y-2'>
      {COMPETING_TOASTS.map((toast) => (
        <ToastPractice key={toast.id} items={[toast]} />
      ))}
    </div>
  )
}

const SHORT_UNDO_TOASTS: ToastPreviewItem[] = [
  {
    id: 'undo-record-deletion',
    title: 'Record deleted',
    description: 'The record was removed from the workspace.',
    type: 'success',
    action: true
  }
]

const LONG_TOASTS: ToastPreviewItem[] = [
  {
    id: 'long-system-message',
    title: 'System update',
    description:
      'A record changed in another session and synchronized with the server. Review the full change history and assignment details before proceeding.',
    type: 'warning'
  }
]

const COMPETING_TOASTS: ToastPreviewItem[] = [
  { id: 'toast-one', title: 'Record updated', description: 'Assignment changed.', type: 'success' },
  { id: 'toast-two', title: 'Sync complete', description: 'Workspace is up to date.', type: 'success' },
  { id: 'toast-three', title: 'Review needed', description: 'A new update is available.', type: 'warning' }
]

function ImmediateRadioPreferenceExample() {
  const [theme, setTheme] = React.useState('dark')

  return (
    <FieldRoot className='w-full max-w-md gap-2'>
      <FieldLabel className='font-medium'>Application theme</FieldLabel>
      <RadioGroup value={theme} onValueChange={(value) => setTheme(String(value))} className='gap-2'>
        <FieldItem>
          <FieldLabel className='flex items-center gap-2 font-normal'>
            <RadioRoot value='light' />
            Light
          </FieldLabel>
        </FieldItem>
        <FieldItem>
          <FieldLabel className='flex items-center gap-2 font-normal'>
            <RadioRoot value='dark' />
            Dark
          </FieldLabel>
        </FieldItem>
      </RadioGroup>
      <div
        className={
          theme === 'dark'
            ? 'rounded-(--radius) border border-border bg-foreground p-3 text-background'
            : 'rounded-(--radius) border border-border bg-background p-3 text-foreground'
        }
      >
        Theme preview updates immediately.
      </div>
    </FieldRoot>
  )
}

export const designerPracticeRegistry: DesignerPracticeRegistry = {
  'inline-edit': {
    Layout: [
      {
        recommended: (
          <InlineEdit defaultValue='Quarterly Review'>
            <InlineEditTrigger className='group flex items-center gap-1.5 rounded-(--radius) p-1.5 hover:bg-muted/60 font-medium'>
              <span>Quarterly Review</span>
              <span className='text-muted-foreground opacity-60 group-hover:opacity-100'>✎</span>
            </InlineEditTrigger>
            <InlineEditInput className='rounded-(--radius) border border-input px-2 py-1' />
          </InlineEdit>
        ),
        discouraged: (
          <InlineEdit defaultValue='Quarterly Review'>
            <InlineEditTrigger className='rounded-none p-0 hover:bg-transparent font-medium'>
              <span>Quarterly Review</span>
            </InlineEditTrigger>
            <InlineEditInput className='rounded-(--radius) border border-input px-2 py-1' />
          </InlineEdit>
        )
      }
    ]
  },
  input: {
    Layout: [
      {
        recommended: (
          <FieldRoot className='w-full max-w-md space-y-1.5'>
            <FieldLabel className='font-medium'>Display name</FieldLabel>
            <Input placeholder='e.g. AC-1042' size='default' />
          </FieldRoot>
        ),
        discouraged: (
          <div className='w-full max-w-md'>
            <Input placeholder='Display name' size='default' />
          </div>
        )
      }
    ]
  },
  menu: {
    Layout: [
      {
        recommended: (
          <div className='flex items-center gap-2'>
            <Button variant='default' size='default'>
              Open project
            </Button>
            <Menu>
              <MenuTrigger
                render={
                  <Button variant='outline' size='default'>
                    Options ▾
                  </Button>
                }
              />
              <MenuPortal>
                <MenuPositioner side='bottom' align='start' sideOffset={4}>
                  <MenuPopup className='w-44 rounded-(--radius) border border-border bg-popover p-1 shadow-md'>
                    <MenuGroup>
                      <MenuGroupLabel className='px-2 py-1 text-muted-foreground'>Project</MenuGroupLabel>
                      <MenuItem className='rounded-sm px-2 py-1 hover:bg-accent'>Duplicate</MenuItem>
                      <MenuItem className='rounded-sm px-2 py-1 hover:bg-accent'>Export report</MenuItem>
                    </MenuGroup>
                    <MenuSeparator className='my-1 h-px bg-border' />
                    <MenuItem variant='destructive'>Delete project</MenuItem>
                  </MenuPopup>
                </MenuPositioner>
              </MenuPortal>
            </Menu>
          </div>
        ),
        discouraged: (
          <div className='flex items-center gap-2'>
            <Menu>
              <MenuTrigger
                render={
                  <Button variant='outline' size='default'>
                    Options ▾
                  </Button>
                }
              />
              <MenuPortal>
                <MenuPositioner side='bottom' align='start' sideOffset={4}>
                  <MenuPopup className='w-44 rounded-(--radius) border border-border bg-popover p-1 shadow-md'>
                    <MenuItem className='rounded-sm px-2 py-1 hover:bg-accent'>Duplicate</MenuItem>
                    <MenuItem className='rounded-sm px-2 py-1 hover:bg-accent'>Export report</MenuItem>
                    <MenuItem className='rounded-sm px-2 py-1 hover:bg-accent'>Open project</MenuItem>
                    <MenuSeparator className='my-1 h-px bg-border' />
                    <MenuItem variant='destructive'>Delete project</MenuItem>
                  </MenuPopup>
                </MenuPositioner>
              </MenuPortal>
            </Menu>
          </div>
        )
      }
    ]
  },
  menubar: {
    Layout: [
      {
        recommended: (
          <Menubar>
            <Menu>
              <MenuTrigger className='h-7 rounded-(--radius) px-2 font-medium hover:bg-accent'>File</MenuTrigger>
              <MenuPortal>
                <MenuPositioner side='bottom' align='start' sideOffset={4}>
                  <MenuPopup>
                    <MenuItem>
                      Save changes <MenuShortcut>⌘S</MenuShortcut>
                    </MenuItem>
                    <MenuItem>
                      Export report <MenuShortcut>⌘E</MenuShortcut>
                    </MenuItem>
                  </MenuPopup>
                </MenuPositioner>
              </MenuPortal>
            </Menu>
            <Menu>
              <MenuTrigger className='h-7 rounded-(--radius) px-2 font-medium hover:bg-accent'>View</MenuTrigger>
              <MenuPortal>
                <MenuPositioner side='bottom' align='start' sideOffset={4}>
                  <MenuPopup>
                    <MenuItem>
                      Reset layout <MenuShortcut>⌘0</MenuShortcut>
                    </MenuItem>
                  </MenuPopup>
                </MenuPositioner>
              </MenuPortal>
            </Menu>
          </Menubar>
        ),
        discouraged: (
          <Menubar className='flex items-center gap-2'>
            <Menu>
              <MenuTrigger className='h-7 rounded-(--radius) px-2 font-medium hover:bg-accent'>File</MenuTrigger>
              <MenuPortal>
                <MenuPositioner side='bottom' align='start' sideOffset={4}>
                  <MenuPopup>
                    <MenuItem>Save</MenuItem>
                  </MenuPopup>
                </MenuPositioner>
              </MenuPortal>
            </Menu>
            <div className='px-1'>
              <Input placeholder='Search records...' size='default' className='w-40' />
            </div>
          </Menubar>
        )
      }
    ]
  },
  meter: {
    Layout: [
      {
        recommended: (
          <Meter value={78} className='w-full max-w-md'>
            <MeterLabel className='font-medium'>Storage usage</MeterLabel>
            <MeterValue className='font-medium' />
            <MeterTrack className='h-2 rounded-(--radius) bg-muted'>
              <MeterIndicator className='h-full rounded-(--radius) bg-primary' />
            </MeterTrack>
          </Meter>
        ),
        discouraged: (
          <Meter value={78} className='w-full max-w-md'>
            <MeterTrack className='h-2 rounded-(--radius) bg-muted'>
              <MeterIndicator className='h-full rounded-(--radius) bg-destructive' />
            </MeterTrack>
          </Meter>
        )
      }
    ]
  },
  'navigation-menu': {
    Layout: [
      {
        recommended: (
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem value='projects'>
                <NavigationMenuTrigger className='font-medium'>Projects</NavigationMenuTrigger>
                <NavigationMenuContent className='p-3 space-y-1 w-48'>
                  <NavigationMenuLink href='#' className='block p-2 hover:bg-muted'>
                    <div className='font-semibold'>Project review</div>
                    <div className='text-muted-foreground'>Manage records and review updates.</div>
                  </NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
            <NavigationMenuPortal>
              <NavigationMenuPositioner sideOffset={10}>
                <NavigationMenuPopup>
                  <NavigationMenuViewport />
                </NavigationMenuPopup>
              </NavigationMenuPositioner>
            </NavigationMenuPortal>
          </NavigationMenu>
        ),
        discouraged: (
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem value='search'>
                <NavigationMenuTrigger className='font-medium'>Search</NavigationMenuTrigger>
                <NavigationMenuContent className='p-3 space-y-2 w-48'>
                  <FieldRoot className='w-full'>
                    <FieldLabel>Search records</FieldLabel>
                    <FieldControl placeholder='Search records...' />
                  </FieldRoot>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
            <NavigationMenuPortal>
              <NavigationMenuPositioner sideOffset={10}>
                <NavigationMenuPopup>
                  <NavigationMenuViewport />
                </NavigationMenuPopup>
              </NavigationMenuPositioner>
            </NavigationMenuPortal>
          </NavigationMenu>
        )
      }
    ]
  },
  'number-field': {
    Layout: [
      {
        recommended: (
          <FieldRoot className='w-full max-w-md space-y-1'>
            <FieldLabel className='font-medium'>Maximum capacity</FieldLabel>
            <NumberField defaultValue={60} min={10} max={120} step={10}>
              <NumberFieldGroup className='flex items-center rounded-(--radius) border border-input'>
                <NumberFieldInput className='w-full px-2 py-1' />
                <div className='flex flex-col border-l border-input'>
                  <NumberFieldIncrement className='px-1'>▴</NumberFieldIncrement>
                  <NumberFieldDecrement className='px-1'>▾</NumberFieldDecrement>
                </div>
              </NumberFieldGroup>
            </NumberField>
            <FieldDescription className='text-muted-foreground'>Min 10, max 120 (steps of 10)</FieldDescription>
          </FieldRoot>
        ),
        discouraged: (
          <div className='w-full max-w-md'>
            <NumberField defaultValue={60}>
              <NumberFieldGroup className='flex items-center rounded-(--radius) border border-input'>
                <NumberFieldInput className='w-full px-2 py-1' />
              </NumberFieldGroup>
            </NumberField>
          </div>
        )
      }
    ]
  },
  'otp-field': {
    Layout: [
      {
        recommended: (
          <OTPField length={6} defaultValue='123456' className='gap-1 sm:gap-2'>
            {Array.from({ length: 6 }, (_, index) => (
              <React.Fragment key={index}>
                {index === 3 && <OTPFieldSeparator className='text-muted-foreground'>–</OTPFieldSeparator>}
                <OTPFieldInput aria-label={index === 0 ? undefined : `Character ${index + 1} of 6`} />
              </React.Fragment>
            ))}
          </OTPField>
        ),
        discouraged: (
          <div role='group' aria-label='Verification code' className='flex items-center gap-1 sm:gap-2'>
            {Array.from({ length: 6 }, (_, index) => (
              <Input
                key={index}
                aria-label={`Code character ${index + 1}`}
                inputMode='numeric'
                maxLength={1}
                size='default'
                className='p-0 text-center'
              />
            ))}
          </div>
        )
      }
    ]
  },
  'page-header': {
    Layout: [
      {
        recommended: (
          <div className='w-full overflow-hidden rounded-(--radius) border border-border bg-card'>
            <PageHeader
              title='Project overview'
              breadcrumbs={
                <nav aria-label='Breadcrumb' className='flex gap-1 text-muted-foreground'>
                  <a href='#'>Projects</a>
                  <span aria-hidden='true'>/</span>
                  <span aria-current='page'>Project overview</span>
                </nav>
              }
              toolbar={
                <div className='flex gap-1.5'>
                  <Button variant='outline' size='default'>
                    Edit route
                  </Button>
                  <Button variant='default' size='default'>
                    Open project
                  </Button>
                </div>
              }
            />
          </div>
        ),
        discouraged: (
          <div className='w-full overflow-hidden rounded-(--radius) border border-border bg-card'>
            <PageHeader
              title='Project overview'
              toolbar={
                <div className='flex gap-1.5'>
                  <Button variant='default' size='default'>
                    Edit
                  </Button>
                  <Button variant='default' size='default'>
                    Delete
                  </Button>
                  <Button variant='default' size='default'>
                    Launch
                  </Button>
                </div>
              }
            />
          </div>
        )
      }
    ]
  },
  pagination: {
    Layout: [
      {
        recommended: (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href='#' aria-disabled='true' className='pointer-events-none opacity-50' />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href='#' isActive>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href='#'>2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href='#' />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        ),
        discouraged: (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationLink href='#'>1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href='#'>2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href='#' />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )
      }
    ]
  },
  popover: {
    Layout: [
      {
        recommended: (
          <Popover>
            <PopoverTrigger
              render={
                <Button variant='outline' size='default'>
                  Filter by priority
                </Button>
              }
            />
            <PopoverPortal>
              <PopoverPositioner sideOffset={8}>
                <PopoverPopup className='w-56 rounded-(--radius) border border-border bg-popover p-4 shadow-md space-y-2'>
                  <FieldRoot>
                    <FieldLabel>Minimum priority</FieldLabel>
                    <Slider aria-label='Minimum priority' defaultValue={[65]} min={10} max={120}>
                      <SliderControl className='flex h-8 items-center'>
                        <SliderTrack className='h-1.5 w-full rounded-(--radius) bg-muted'>
                          <SliderIndicator className='h-full rounded-(--radius) bg-primary' />
                          <SliderThumb className='size-4 rounded-(--radius) border-2 border-background bg-primary' />
                        </SliderTrack>
                      </SliderControl>
                    </Slider>
                  </FieldRoot>
                  <div className='flex justify-end'>
                    <PopoverClose
                      render={
                        <Button size='default' variant='default'>
                          Apply
                        </Button>
                      }
                    />
                  </div>
                </PopoverPopup>
              </PopoverPositioner>
            </PopoverPortal>
          </Popover>
        ),
        discouraged: (
          <Popover>
            <PopoverTrigger
              openOnHover
              delay={200}
              render={
                <Button variant='outline' size='default'>
                  Filter (Hover)
                </Button>
              }
            />
            <PopoverPortal>
              <PopoverPositioner sideOffset={8}>
                <PopoverPopup className='w-56 border border-border bg-popover p-4 space-y-2 shadow-md'>
                  <FieldRoot>
                    <FieldLabel>Filter</FieldLabel>
                    <FieldControl placeholder='Search by status or owner...' />
                  </FieldRoot>
                </PopoverPopup>
              </PopoverPositioner>
            </PopoverPortal>
          </Popover>
        )
      }
    ]
  },
  'preview-card': {
    Layout: [
      {
        recommended: (
          <PreviewCard>
            <PreviewCardTrigger href='#' className='text-primary underline'>
              View profile: Jordan Lee
            </PreviewCardTrigger>
            <PreviewCardPortal>
              <PreviewCardPositioner sideOffset={8}>
                <PreviewCardPopup className='w-64 rounded-(--radius) border border-border bg-card p-3 shadow-md space-y-1'>
                  <div className='font-semibold'>Jordan Lee</div>
                  <div className='text-muted-foreground'>Operations manager · 4 years</div>
                </PreviewCardPopup>
              </PreviewCardPositioner>
            </PreviewCardPortal>
          </PreviewCard>
        ),
        discouraged: (
          <PreviewCard>
            <PreviewCardTrigger href='#' className='text-primary underline'>
              Team member profile
            </PreviewCardTrigger>
            <PreviewCardPortal>
              <PreviewCardPositioner sideOffset={8}>
                <PreviewCardPopup className='w-64 border border-border bg-card p-3 space-y-2 shadow-md'>
                  <FieldRoot>
                    <FieldLabel>Notes</FieldLabel>
                    <FieldControl placeholder='Add a note...' />
                  </FieldRoot>
                  <Button className='w-full'>Save notes</Button>
                </PreviewCardPopup>
              </PreviewCardPositioner>
            </PreviewCardPortal>
          </PreviewCard>
        )
      }
    ]
  },
  progress: {
    Layout: [
      {
        recommended: (
          <Progress value={null} className='w-full max-w-md'>
            <ProgressLabel className='font-medium'>Uploading files · progress unavailable</ProgressLabel>
            <ProgressValue className='font-medium' />
            <ProgressTrack className='h-2 rounded-(--radius) bg-muted'>
              <ProgressIndicator className='rounded-(--radius) data-indeterminate:w-1/3 motion-safe:animate-pulse' />
            </ProgressTrack>
          </Progress>
        ),
        discouraged: (
          <Progress value={99} className='w-full max-w-md'>
            <ProgressLabel className='font-medium'>Uploading files (stalled at 99%)</ProgressLabel>
            <ProgressValue className='font-medium' />
            <ProgressTrack className='h-2 rounded-(--radius) bg-muted'>
              <ProgressIndicator className='rounded-(--radius)' />
            </ProgressTrack>
          </Progress>
        )
      }
    ]
  },
  radio: {
    Layout: [
      {
        recommended: (
          <FieldRoot className='w-full max-w-md gap-2'>
            <FieldLabel className='font-medium'>Report delivery frequency</FieldLabel>
            <RadioGroup defaultValue='daily' className='gap-2'>
              <FieldItem>
                <FieldLabel className='flex items-center gap-2 font-normal'>
                  <RadioRoot value='daily' />
                  Daily summary
                </FieldLabel>
              </FieldItem>
              <FieldItem>
                <FieldLabel className='flex items-center gap-2 font-normal'>
                  <RadioRoot value='weekly' />
                  Weekly summary
                </FieldLabel>
              </FieldItem>
            </RadioGroup>
            <Button size='default' variant='outline' className='w-fit mt-1'>
              Save preference
            </Button>
          </FieldRoot>
        ),
        discouraged: <ImmediateRadioPreferenceExample />
      }
    ]
  },
  'scroll-area': {
    Layout: [
      {
        recommended: <ScrollAreaPractice showScrollbar />,
        discouraged: <ScrollAreaPractice showScrollbar={false} />
      }
    ]
  },
  select: {
    Layout: [
      {
        recommended: (
          <FieldRoot className='w-full max-w-md'>
            <FieldLabel>Category</FieldLabel>
            <Select defaultValue=''>
              <SelectTrigger className='w-full justify-between'>
                <SelectValue placeholder='Select a category...' />
                <SelectIcon />
              </SelectTrigger>
              <SelectPortal>
                <SelectPositioner side='bottom' align='start' sideOffset={4} alignItemWithTrigger={false}>
                  <SelectPopup className='w-full border border-border bg-popover p-1 shadow-md'>
                    <SelectItem value='standard'>Standard</SelectItem>
                    <SelectItem value='advanced'>Advanced</SelectItem>
                  </SelectPopup>
                </SelectPositioner>
              </SelectPortal>
            </Select>
          </FieldRoot>
        ),
        discouraged: (
          <div className='w-full max-w-md'>
            <Select defaultValue=''>
              <SelectTrigger className='w-full justify-between'>
                <SelectValue placeholder='Select category (missing label)...' />
                <SelectIcon />
              </SelectTrigger>
              <SelectPortal>
                <SelectPositioner side='bottom' align='start' sideOffset={4} alignItemWithTrigger={false}>
                  <SelectPopup className='w-full border border-border bg-popover p-1 shadow-md'>
                    <SelectItem value='standard'>Standard</SelectItem>
                    <SelectItem value='advanced'>Advanced</SelectItem>
                  </SelectPopup>
                </SelectPositioner>
              </SelectPortal>
            </Select>
          </div>
        )
      }
    ]
  },
  separator: {
    Layout: [
      {
        recommended: (
          <div className='flex items-center gap-2 border border-border p-1.5 rounded-(--radius)'>
            <Button size='default' variant='ghost'>
              Undo
            </Button>
            <Button size='default' variant='ghost'>
              Redo
            </Button>
            <Separator orientation='vertical' className='h-4 w-px bg-border mx-2' />
            <Button size='default' variant='destructive'>
              Delete
            </Button>
          </div>
        ),
        discouraged: (
          <div className='flex items-center gap-2 border border-border p-1.5 rounded-(--radius)'>
            <Button size='default' variant='ghost'>
              Undo
            </Button>
            <Separator orientation='vertical' className='h-4 w-px bg-border mx-1' />
            <Button size='default' variant='ghost'>
              Redo
            </Button>
            <Separator orientation='vertical' className='h-4 w-px bg-border mx-1' />
            <Button size='default' variant='ghost'>
              Export
            </Button>
          </div>
        )
      }
    ]
  },
  sidebar: {
    Layout: [
      {
        recommended: <SidebarLayoutPractice showTooltip />,
        discouraged: <SidebarLayoutPractice showTooltip={false} />
      }
    ]
  },
  slider: {
    Layout: [
      {
        recommended: (
          <div className='w-full max-w-md space-y-1.5'>
            <div className='flex justify-between font-medium'>
              <span>Opacity</span>
              <span>65%</span>
            </div>
            <Slider defaultValue={[65]} min={0} max={100}>
              <SliderControl className='flex items-center h-4'>
                <SliderTrack className='h-1.5 w-full rounded-(--radius) bg-muted'>
                  <SliderIndicator className='h-full bg-primary rounded-(--radius)' />
                  <SliderThumb className='h-3.5 w-3.5 rounded-(--radius) bg-primary border-2 border-background' />
                </SliderTrack>
              </SliderControl>
            </Slider>
          </div>
        ),
        discouraged: (
          <div className='w-full max-w-md'>
            <Slider defaultValue={[65]} min={0} max={100}>
              <SliderControl className='flex items-center h-4'>
                <SliderTrack className='h-1.5 w-full rounded-(--radius) bg-muted'>
                  <SliderThumb className='h-3.5 w-3.5 rounded-(--radius) bg-primary' />
                </SliderTrack>
              </SliderControl>
            </Slider>
          </div>
        )
      }
    ]
  },
  switch: {
    Layout: [
      {
        recommended: (
          <div className='flex items-center justify-between w-full max-w-md'>
            <span className='font-medium'>Receive notifications</span>
            <Switch defaultChecked size='default'>
              <SwitchThumb />
            </Switch>
          </div>
        ),
        discouraged: (
          <div className='flex items-center justify-between w-full max-w-md'>
            <span className='font-medium'>Do not receive notifications</span>
            <Switch defaultChecked={false} size='default'>
              <SwitchThumb />
            </Switch>
          </div>
        )
      }
    ]
  },
  tabs: {
    Layout: [
      {
        recommended: (
          <Tabs defaultValue='details' className='w-full max-w-md'>
            <TabsList variant='line'>
              <TabsTab value='details'>Locations</TabsTab>
              <TabsTab value='activity'>Activity</TabsTab>
            </TabsList>
            <TabsPanel value='details' className='pt-3 text-muted-foreground'>
              12 items shown.
            </TabsPanel>
            <TabsPanel value='activity' className='pt-3 text-muted-foreground'>
              Recent activity logged.
            </TabsPanel>
          </Tabs>
        ),
        discouraged: (
          <Tabs defaultValue='activity' className='w-full max-w-md'>
            <TabsList variant='line'>
              <TabsTab value='activity'>Activity</TabsTab>
              <TabsTab value='files'>Files</TabsTab>
            </TabsList>
            <TabsPanel value='activity' className='pt-3'>
              <Tabs defaultValue='recent'>
                <TabsList variant='line'>
                  <TabsTab value='recent'>Recent</TabsTab>
                  <TabsTab value='archived'>Archived</TabsTab>
                </TabsList>
                <TabsPanel value='recent' className='pt-2 text-muted-foreground'>
                  Recent activity
                </TabsPanel>
              </Tabs>
            </TabsPanel>
          </Tabs>
        )
      }
    ]
  },
  toast: {
    Layout: [
      {
        recommended: <ToastPractice items={SHORT_UNDO_TOASTS} />,
        discouraged: <ToastPractice items={LONG_TOASTS} />
      },
      {
        recommended: <NotificationHistoryPractice />,
        discouraged: <ToastCompetitionPractice />
      }
    ]
  },
  'toggle-group': {
    Layout: [
      {
        recommended: (
          <ToggleGroup
            defaultValue={['list']}
            className='flex rounded-(--radius) border border-border p-0.5 bg-muted/40'
          >
            <Toggle
              value='list'
              size='default'
              className='px-2.5 py-1 rounded-sm data-pressed:bg-background data-pressed:shadow-xs'
            >
              List
            </Toggle>
            <Toggle
              value='grid'
              size='default'
              className='px-2.5 py-1 rounded-sm data-pressed:bg-background data-pressed:shadow-xs'
            >
              Grid
            </Toggle>
          </ToggleGroup>
        ),
        discouraged: (
          <ToggleGroup defaultValue={['opt1']} className='flex gap-1'>
            <Toggle value='opt1' size='default' aria-label={undefined}>
              <span>◇</span>
            </Toggle>
            <Toggle value='opt2' size='default' aria-label={undefined}>
              <span>⬡</span>
            </Toggle>
          </ToggleGroup>
        )
      }
    ]
  },
  toggle: {
    Layout: [
      {
        recommended: (
          <Toggle
            aria-label='Pin inspector panel'
            className='gap-1 px-2.5 py-1 border border-input data-pressed:bg-accent data-pressed:text-accent-foreground'
          >
            <span>📌</span>
            <span>Pin Panel</span>
          </Toggle>
        ),
        discouraged: (
          <Toggle className='px-2.5 py-1 border border-input'>
            <span>Unpin (Dynamic)</span>
          </Toggle>
        )
      }
    ]
  },
  toolbar: {
    Layout: [
      {
        recommended: (
          <Toolbar className='flex items-center gap-1 border border-border p-1 rounded-(--radius) bg-card'>
            <ToolbarButton className='px-2 py-0.5 hover:bg-muted'>Select</ToolbarButton>
            <ToolbarButton className='px-2 py-0.5 hover:bg-muted'>Draw</ToolbarButton>
            <ToolbarSeparator className='h-3.5 w-px bg-border mx-0.5' />
            <ToolbarButton className='px-2 py-0.5 hover:bg-destructive/10 text-destructive'>Delete</ToolbarButton>
          </Toolbar>
        ),
        discouraged: (
          <Toolbar className='flex items-center gap-1 border border-border p-1 rounded-(--radius)'>
            <ToolbarButton className='p-0.5'>A</ToolbarButton>
            <ToolbarButton className='p-0.5'>B</ToolbarButton>
            <ToolbarButton className='p-0.5'>C</ToolbarButton>
            <ToolbarButton className='p-0.5'>D</ToolbarButton>
          </Toolbar>
        )
      }
    ]
  },
  tooltip: {
    Layout: [
      {
        recommended: (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger
                render={
                  <Button size='default' variant='outline'>
                    ＋
                  </Button>
                }
              />
              <TooltipPortal>
                <TooltipPositioner sideOffset={8}>
                  <TooltipPopup className='bg-popover text-popover-foreground border border-border px-2 py-1 shadow-sm'>
                    Add item (W)
                  </TooltipPopup>
                </TooltipPositioner>
              </TooltipPortal>
            </Tooltip>
          </TooltipProvider>
        ),
        discouraged: (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger
                render={
                  <Button size='default' variant='outline'>
                    ℹ
                  </Button>
                }
              />
              <TooltipPortal>
                <TooltipPositioner sideOffset={8}>
                  <TooltipPopup className='bg-popover text-popover-foreground border border-border p-2 space-y-1 shadow-sm'>
                    <div>Need assistance?</div>
                    <a href='#' className='text-primary underline block'>
                      Read Documentation
                    </a>
                  </TooltipPopup>
                </TooltipPositioner>
              </TooltipPortal>
            </Tooltip>
          </TooltipProvider>
        )
      }
    ]
  }
}

export const designerPracticesB = designerPracticeRegistry
export default designerPracticeRegistry
