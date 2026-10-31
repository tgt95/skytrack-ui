import { InlineEdit, InlineEditTrigger, InlineEditInput } from '@/components/ui/inline-edit'
import { Input } from '@/components/ui/input'
import { FieldRoot, FieldLabel, FieldDescription } from '@/components/ui/field'
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
  NavigationMenuLink
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
import { Popover, PopoverTrigger, PopoverPopup, PopoverClose } from '@/components/ui/popover'
import { PreviewCard, PreviewCardTrigger, PreviewCardPopup } from '@/components/ui/preview-card'
import { Progress, ProgressTrack, ProgressIndicator } from '@/components/ui/progress'
import { RadioGroup, RadioRoot, RadioIndicator } from '@/components/ui/radio'
import { ScrollArea, ScrollAreaViewport, ScrollAreaScrollbar, ScrollAreaThumb } from '@/components/ui/scroll-area'
import { Select, SelectTrigger, SelectValue, SelectPopup, SelectItem } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { SidebarProvider } from '@/components/ui/sidebar'
import { Slider, SliderControl, SliderTrack, SliderIndicator, SliderThumb } from '@/components/ui/slider'
import { Switch, SwitchThumb } from '@/components/ui/switch'
import { Tabs, TabsList, TabsTab, TabsPanel } from '@/components/ui/tabs'
import { ToggleGroup } from '@/components/ui/toggle-group'
import { Toggle } from '@/components/ui/toggle'
import { Toolbar, ToolbarButton, ToolbarSeparator } from '@/components/ui/toolbar'
import { Tooltip, TooltipTrigger, TooltipPopup } from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'
import type { DesignerPracticeRegistry } from '../practice-types'

export const designerPracticeRegistry: DesignerPracticeRegistry = {
  'inline-edit': {
    Layout: [
      {
        recommended: (
          <InlineEdit defaultValue='Quarterly Review'>
            <InlineEditTrigger className='group flex items-center gap-1.5 rounded-(--radius) p-1.5 hover:bg-muted/60 text-xs font-medium'>
              <span>Quarterly Review</span>
              <span className='text-[10px] text-muted-foreground opacity-60 group-hover:opacity-100'>✎</span>
            </InlineEditTrigger>
            <InlineEditInput className='rounded-(--radius) border border-input px-2 py-1 text-xs' />
          </InlineEdit>
        ),
        discouraged: (
          <InlineEdit defaultValue='Quarterly Review'>
            <InlineEditTrigger className='rounded-none p-0 hover:bg-transparent text-xs font-medium'>
              <span>Quarterly Review</span>
            </InlineEditTrigger>
            <InlineEditInput className='rounded-(--radius) border border-input px-2 py-1 text-xs' />
          </InlineEdit>
        )
      }
    ]
  },
  input: {
    Layout: [
      {
        recommended: (
          <FieldRoot className='w-full max-w-xs space-y-1.5'>
            <FieldLabel className='text-xs font-medium'>Display name</FieldLabel>
            <Input placeholder='e.g. SKY-01' size='sm' />
          </FieldRoot>
        ),
        discouraged: (
          <div className='w-full max-w-xs'>
            <Input placeholder='Display name' size='sm' />
          </div>
        )
      }
    ]
  },
  menu: {
    Layout: [
      {
        recommended: (
          <Menu>
            <MenuTrigger
              render={
                <Button variant='outline' size='xs'>
                  Options ▾
                </Button>
              }
            />
            <MenuPopup className='w-44 rounded-(--radius) border border-border bg-popover p-1 shadow-md'>
              <MenuGroup>
                <MenuGroupLabel className='px-2 py-1 text-[10px] text-muted-foreground'>Project</MenuGroupLabel>
                <MenuItem className='rounded-sm px-2 py-1 text-xs hover:bg-accent'>Duplicate</MenuItem>
                <MenuItem className='rounded-sm px-2 py-1 text-xs hover:bg-accent'>Export report</MenuItem>
              </MenuGroup>
              <MenuSeparator className='my-1 h-px bg-border' />
              <MenuItem className='rounded-sm px-2 py-1 text-xs text-destructive hover:bg-destructive/10'>
                Delete project
              </MenuItem>
            </MenuPopup>
          </Menu>
        ),
        discouraged: (
          <Menu>
            <MenuTrigger
              render={
                <Button variant='outline' size='xs'>
                  Options ▾
                </Button>
              }
            />
            <MenuPopup className='w-44 rounded-(--radius) border border-border bg-popover p-1 shadow-md'>
              <MenuItem className='rounded-sm px-2 py-1 text-xs font-semibold text-primary'>Open project</MenuItem>
              <MenuItem className='rounded-sm px-2 py-1 text-xs hover:bg-accent'>Duplicate</MenuItem>
              <MenuItem className='rounded-sm px-2 py-1 text-xs text-destructive hover:bg-destructive/10'>
                Delete project
              </MenuItem>
            </MenuPopup>
          </Menu>
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
              <MenuTrigger className='h-7 rounded-(--radius) px-2 text-xs font-medium hover:bg-accent'>
                File
              </MenuTrigger>
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
              <MenuTrigger className='h-7 rounded-(--radius) px-2 text-xs font-medium hover:bg-accent'>
                View
              </MenuTrigger>
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
          <div className='flex items-center gap-2 rounded-(--radius) border border-border p-1'>
            <Menubar>
              <Menu>
                <MenuTrigger className='h-7 rounded-(--radius) px-2 text-xs'>File</MenuTrigger>
                <MenuPortal>
                  <MenuPositioner side='bottom' align='start' sideOffset={4}>
                    <MenuPopup>
                      <MenuItem>Save</MenuItem>
                    </MenuPopup>
                  </MenuPositioner>
                </MenuPortal>
              </Menu>
            </Menubar>
            <input
              type='text'
              placeholder='Search...'
              className='h-6 text-[10px] border border-input rounded px-1 w-20'
            />
          </div>
        )
      }
    ]
  },
  meter: {
    Layout: [
      {
        recommended: (
          <Meter value={78} className='w-full max-w-xs space-y-1.5'>
            <div className='flex justify-between text-xs font-medium'>
              <MeterLabel>Storage usage</MeterLabel>
              <MeterValue />
            </div>
            <MeterTrack className='h-2 rounded-full bg-muted'>
              <MeterIndicator className='h-full rounded-full bg-primary' style={{ width: '78%' }} />
            </MeterTrack>
          </Meter>
        ),
        discouraged: (
          <Meter value={78} className='w-full max-w-xs space-y-1.5'>
            <MeterTrack className='h-2 rounded-full bg-muted'>
              <MeterIndicator className='h-full rounded-full bg-primary' style={{ width: '78%' }} />
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
                <NavigationMenuTrigger className='text-xs font-medium'>Projects</NavigationMenuTrigger>
                <NavigationMenuContent className='p-3 space-y-1 w-48'>
                  <NavigationMenuLink href='#' className='block rounded p-2 hover:bg-muted'>
                    <div className='text-xs font-semibold'>Project review</div>
                    <div className='text-[10px] text-muted-foreground'>Automated grid</div>
                  </NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        ),
        discouraged: (
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem value='search'>
                <NavigationMenuTrigger className='text-xs font-medium'>Search</NavigationMenuTrigger>
                <NavigationMenuContent className='p-3 space-y-2 w-48'>
                  <input
                    type='text'
                    placeholder='Search records...'
                    className='h-7 text-xs border border-input p-1 rounded w-full'
                  />
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        )
      }
    ]
  },
  'number-field': {
    Layout: [
      {
        recommended: (
          <FieldRoot className='w-full max-w-xs space-y-1'>
            <FieldLabel className='text-xs font-medium'>Maximum capacity</FieldLabel>
            <NumberField defaultValue={60} min={10} max={120} step={10}>
              <NumberFieldGroup className='flex items-center rounded-(--radius) border border-input'>
                <NumberFieldInput className='w-full px-2 py-1 text-xs' />
                <div className='flex flex-col border-l border-input'>
                  <NumberFieldIncrement className='px-1 text-[9px]'>▴</NumberFieldIncrement>
                  <NumberFieldDecrement className='px-1 text-[9px]'>▾</NumberFieldDecrement>
                </div>
              </NumberFieldGroup>
            </NumberField>
            <FieldDescription className='text-[10px] text-muted-foreground'>
              Min 10, max 120 (steps of 10)
            </FieldDescription>
          </FieldRoot>
        ),
        discouraged: (
          <div className='w-full max-w-xs'>
            <NumberField defaultValue={60}>
              <NumberFieldGroup className='flex items-center rounded-(--radius) border border-input'>
                <NumberFieldInput className='w-full px-2 py-1 text-xs' />
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
          <OTPField length={6} defaultValue='123456'>
            {Array.from({ length: 6 }, (_, index) => (
              <Fragment key={index}>
                {index === 3 && <OTPFieldSeparator className='text-muted-foreground'>–</OTPFieldSeparator>}
                <OTPFieldInput
                  aria-label={index === 0 ? undefined : `Character ${index + 1} of 6`}
                  className='h-8 w-7 text-center text-xs border border-input rounded'
                />
              </Fragment>
            ))}
          </OTPField>
        ),
        discouraged: (
          <input
            type='text'
            maxLength={6}
            placeholder='123456'
            className='h-8 w-32 text-center text-xs border border-input rounded'
          />
        )
      }
    ]
  },
  'page-header': {
    Layout: [
      {
        recommended: (
          <PageHeader
            title='Project overview'
            breadcrumbs={
              <nav aria-label='Breadcrumb' className='flex gap-1 text-xs text-muted-foreground'>
                <a href='#'>Projects</a>
                <span aria-hidden='true'>/</span>
                <span aria-current='page'>Alpha Recon</span>
              </nav>
            }
            toolbar={
              <div className='flex gap-1.5'>
                <Button variant='outline' size='xs'>
                  Edit Route
                </Button>
                <Button variant='default' size='xs'>
                  Open project
                </Button>
              </div>
            }
          />
        ),
        discouraged: (
          <PageHeader
            title='Project overview'
            toolbar={
              <div className='flex gap-1.5'>
                <Button variant='default' size='xs'>
                  Edit
                </Button>
                <Button variant='default' size='xs'>
                  Delete
                </Button>
                <Button variant='default' size='xs'>
                  Launch
                </Button>
              </div>
            }
          />
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
                <PaginationPrevious href='#' aria-disabled='true' className='pointer-events-none opacity-50 text-xs' />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href='#' isActive className='text-xs'>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href='#' className='text-xs'>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href='#' className='text-xs' />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        ),
        discouraged: (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationLink href='#' className='text-xs'>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href='#' className='text-xs'>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href='#' className='text-xs' />
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
                <Button variant='outline' size='xs'>
                  Filter by priority
                </Button>
              }
            />
            <PopoverPopup className='w-56 rounded-(--radius) border border-border bg-popover p-3 shadow-md space-y-2'>
              <div className='text-xs font-semibold'>Set priority range</div>
              <input type='range' min='10' max='120' className='w-full' />
              <div className='flex justify-end'>
                <PopoverClose
                  render={
                    <Button size='xs' variant='default'>
                      Apply
                    </Button>
                  }
                />
              </div>
            </PopoverPopup>
          </Popover>
        ),
        discouraged: (
          <Popover>
            <PopoverTrigger
              render={
                <Button variant='outline' size='xs'>
                  Filter (Hover)
                </Button>
              }
            />
            <PopoverPopup className='w-56 border border-border bg-popover p-3 space-y-2 shadow-md'>
              <input
                type='text'
                placeholder='Closing easily on drift...'
                className='w-full text-xs border border-input p-1 rounded'
              />
            </PopoverPopup>
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
            <PreviewCardTrigger href='#' className='text-xs text-primary underline'>
              View profile: Jordan Lee
            </PreviewCardTrigger>
            <PreviewCardPopup className='w-52 rounded-(--radius) border border-border bg-card p-2.5 shadow-md space-y-1'>
              <div className='text-xs font-semibold'>Cpt. Vance</div>
              <div className='text-[10px] text-muted-foreground'>Part 107 Commercial · 420 Hours</div>
            </PreviewCardPopup>
          </PreviewCard>
        ),
        discouraged: (
          <PreviewCard>
            <PreviewCardTrigger href='#' className='text-xs text-primary underline'>
              Team member profile
            </PreviewCardTrigger>
            <PreviewCardPopup className='w-52 border border-border bg-card p-2.5 space-y-1.5 shadow-md'>
              <input
                type='text'
                placeholder='Edit notes...'
                className='w-full text-[10px] border border-input p-1 rounded'
              />
              <button className='w-full text-[10px] bg-primary text-white py-0.5 rounded'>Save Notes</button>
            </PreviewCardPopup>
          </PreviewCard>
        )
      }
    ]
  },
  progress: {
    Layout: [
      {
        recommended: (
          <div className='w-full max-w-xs space-y-1.5'>
            <div className='flex justify-between text-xs font-medium'>
              <span>Uploading Mesh</span>
              <span>65%</span>
            </div>
            <Progress value={65}>
              <ProgressTrack className='h-2 rounded-full bg-muted'>
                <ProgressIndicator className='h-full rounded-full bg-primary' style={{ width: '65%' }} />
              </ProgressTrack>
            </Progress>
          </div>
        ),
        discouraged: (
          <div className='w-full max-w-xs space-y-1.5'>
            <Progress value={99}>
              <ProgressTrack className='h-2 rounded-full bg-muted'>
                <ProgressIndicator className='h-full rounded-full bg-primary' style={{ width: '99%' }} />
              </ProgressTrack>
            </Progress>
          </div>
        )
      }
    ]
  },
  radio: {
    Layout: [
      {
        recommended: (
          <RadioGroup defaultValue='eco' className='space-y-1.5'>
            <div className='flex items-center gap-2'>
              <RadioRoot
                value='eco'
                className='h-3.5 w-3.5 rounded-full border border-primary flex items-center justify-center'
              >
                <RadioIndicator className='h-2 w-2 rounded-full bg-primary' />
              </RadioRoot>
              <span className='text-xs'>Reduce resource use</span>
            </div>
            <div className='flex items-center gap-2'>
              <RadioRoot
                value='standard'
                className='h-3.5 w-3.5 rounded-full border border-primary flex items-center justify-center'
              >
                <RadioIndicator className='h-2 w-2 rounded-full bg-primary' />
              </RadioRoot>
              <span className='text-xs'>Standard Cruise</span>
            </div>
          </RadioGroup>
        ),
        discouraged: (
          <RadioGroup defaultValue='eco' className='flex flex-wrap gap-3'>
            <div className='flex items-center gap-1'>
              <RadioRoot value='eco' className='h-3.5 w-3.5 border rounded-full' />
              <span className='text-xs'>Eco</span>
            </div>
            <div className='flex items-center gap-1'>
              <RadioRoot value='standard' className='h-3.5 w-3.5 border rounded-full' />
              <span className='text-xs'>Standard</span>
            </div>
          </RadioGroup>
        )
      }
    ]
  },
  'scroll-area': {
    Layout: [
      {
        recommended: (
          <ScrollArea className='h-20 w-full max-w-xs rounded border border-border p-2'>
            <ScrollAreaViewport className='h-full w-full'>
              <div className='space-y-1 text-xs text-muted-foreground'>
                <p>09:00:01 Import started</p>
                <p>09:00:04 Records verified</p>
                <p>09:00:08 Import complete</p>
              </div>
            </ScrollAreaViewport>
            <ScrollAreaScrollbar orientation='vertical' className='w-1 bg-muted/40'>
              <ScrollAreaThumb className='rounded-full bg-muted-foreground/50' />
            </ScrollAreaScrollbar>
          </ScrollArea>
        ),
        discouraged: (
          <div className='h-20 w-full max-w-xs overflow-hidden border border-border p-2 text-xs'>
            <p>09:00:01 Import started</p>
            <p>09:00:04 Records verified</p>
            <p>09:00:08 Import complete (hidden by scroll)</p>
          </div>
        )
      }
    ]
  },
  select: {
    Layout: [
      {
        recommended: (
          <div className='w-full max-w-xs space-y-1'>
            <label className='text-xs font-medium'>Category</label>
            <Select defaultValue=''>
              <SelectTrigger className='w-full justify-between h-8 px-2 text-xs border border-input rounded'>
                <SelectValue placeholder='Select a category...' />
              </SelectTrigger>
              <SelectPopup className='w-full border border-border bg-popover p-1 rounded shadow-md text-xs'>
                <SelectItem value='rgb'>Sony 61MP Optical</SelectItem>
                <SelectItem value='thermal'>FLIR Radiometric Thermal</SelectItem>
              </SelectPopup>
            </Select>
          </div>
        ),
        discouraged: (
          <div className='w-full max-w-xs'>
            <Select defaultValue='rgb'>
              <SelectTrigger className='w-full justify-between h-8 px-2 text-xs border border-input rounded'>
                <SelectValue />
              </SelectTrigger>
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
          <div className='flex items-center gap-1.5 border border-border p-1 rounded-(--radius)'>
            <Button size='xs' variant='ghost'>
              Pan
            </Button>
            <Button size='xs' variant='ghost'>
              Zoom
            </Button>
            <Separator orientation='vertical' className='h-4 w-px bg-border mx-1' />
            <Button size='xs' variant='ghost' className='text-destructive'>
              Clear
            </Button>
          </div>
        ),
        discouraged: (
          <div className='flex items-center gap-1.5 border border-border p-1 rounded-(--radius)'>
            <Button size='xs' variant='ghost'>
              Pan
            </Button>
            <Separator orientation='vertical' className='h-4 w-px bg-border' />
            <Button size='xs' variant='ghost'>
              Zoom
            </Button>
            <Separator orientation='vertical' className='h-4 w-px bg-border' />
            <Button size='xs' variant='ghost'>
              Select
            </Button>
          </div>
        )
      }
    ]
  },
  sidebar: {
    Layout: [
      {
        recommended: (
          <SidebarProvider defaultOpen={false}>
            <div className='w-12 border-r border-border h-24 p-1 flex justify-center'>
              <Tooltip>
                <TooltipTrigger
                  render={
                    <button className='w-8 h-8 flex items-center justify-center rounded hover:bg-muted text-xs'>
                      🗺
                    </button>
                  }
                />
                <TooltipPopup className='text-[10px] bg-popover p-1 border border-border rounded'>
                  Workspace overview
                </TooltipPopup>
              </Tooltip>
            </div>
          </SidebarProvider>
        ),
        discouraged: (
          <SidebarProvider defaultOpen={false}>
            <div className='w-12 border-r border-border h-24 p-1 flex justify-center'>
              <button className='w-8 h-8 flex items-center justify-center rounded text-xs'>🗺</button>
            </div>
          </SidebarProvider>
        )
      }
    ]
  },
  slider: {
    Layout: [
      {
        recommended: (
          <div className='w-full max-w-xs space-y-1.5'>
            <div className='flex justify-between text-xs font-medium'>
              <span>Image angle</span>
              <span>-45°</span>
            </div>
            <Slider defaultValue={[-45]} min={-90} max={0}>
              <SliderControl className='flex items-center h-4'>
                <SliderTrack className='h-1.5 w-full rounded-full bg-muted'>
                  <SliderIndicator className='h-full bg-primary rounded-full' />
                  <SliderThumb className='h-3.5 w-3.5 rounded-full bg-primary border-2 border-background' />
                </SliderTrack>
              </SliderControl>
            </Slider>
          </div>
        ),
        discouraged: (
          <div className='w-full max-w-xs'>
            <Slider defaultValue={[-45]} min={-90} max={0}>
              <SliderControl className='flex items-center h-4'>
                <SliderTrack className='h-1.5 w-full rounded-full bg-muted'>
                  <SliderThumb className='h-3.5 w-3.5 rounded-full bg-primary' />
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
          <div className='flex items-center justify-between w-full max-w-xs'>
            <span className='text-xs font-medium'>Automatic Return to Home</span>
            <Switch defaultChecked className='h-4 w-7 rounded-full bg-primary p-0.5'>
              <SwitchThumb className='h-3 w-3 rounded-full bg-background block transition-transform translate-x-3' />
            </Switch>
          </div>
        ),
        discouraged: (
          <div className='flex items-center justify-between w-full max-w-xs'>
            <span className='text-xs font-medium'>Disable Obstacle Avoidance</span>
            <Switch defaultChecked={false} className='h-4 w-7 rounded-full bg-muted p-0.5'>
              <SwitchThumb className='h-3 w-3 rounded-full bg-background block' />
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
          <Tabs defaultValue='details' className='w-full max-w-xs'>
            <TabsList variant='line' className='flex gap-2 border-b border-border'>
              <TabsTab value='details' className='text-xs pb-1 font-medium'>
                Locations
              </TabsTab>
              <TabsTab value='activity' className='text-xs pb-1 font-medium text-muted-foreground'>
                Activity
              </TabsTab>
            </TabsList>
            <TabsPanel value='details' className='pt-1 text-xs'>
              12 items shown.
            </TabsPanel>
          </Tabs>
        ),
        discouraged: (
          <div className='space-y-1 w-full max-w-xs text-xs'>
            <div className='flex gap-2 border-b'>
              <span>Activity</span>
              <span>Files</span>
            </div>
            <div className='flex gap-2 border-b pl-2 text-[10px]'>
              <span>Sub-1</span>
              <span>Sub-2</span>
            </div>
          </div>
        )
      }
    ]
  },
  toast: {
    Layout: [
      {
        recommended: (
          <div className='flex items-center justify-between w-full max-w-xs rounded-(--radius) border border-border bg-card p-2.5 shadow-sm'>
            <span className='text-xs'>Item 4 deleted</span>
            <Button size='xs' variant='outline'>
              Undo
            </Button>
          </div>
        ),
        discouraged: (
          <div className='w-full max-w-xs rounded-(--radius) border border-border bg-card p-2.5 shadow-sm text-xs space-y-1'>
            <div className='font-semibold'>System Notification</div>
            <p className='text-[10px] text-muted-foreground'>
              This file changed in another session and was synchronized.
            </p>
          </div>
        )
      }
    ]
  },
  'toggle-group': {
    Layout: [
      {
        recommended: (
          <ToggleGroup defaultValue={['2d']} className='flex rounded-(--radius) border border-border p-0.5 bg-muted/40'>
            <Toggle
              value='2d'
              size='sm'
              className='px-2 py-0.5 text-xs rounded-sm data-[state=on]:bg-background data-[state=on]:shadow-xs'
            >
              2D Map
            </Toggle>
            <Toggle value='3d' size='sm' className='px-2 py-0.5 text-xs rounded-sm data-[state=on]:bg-background'>
              3D Mesh
            </Toggle>
          </ToggleGroup>
        ),
        discouraged: (
          <div className='flex gap-1.5'>
            <button className='border border-input p-1 text-xs rounded'>[?]</button>
            <button className='border border-input p-1 text-xs rounded'>[!]</button>
          </div>
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
            className='gap-1 px-2.5 py-1 text-xs rounded border border-input data-[state=on]:bg-accent'
          >
            <span>📌</span>
            <span>Pin Panel</span>
          </Toggle>
        ),
        discouraged: (
          <Toggle className='px-2.5 py-1 text-xs rounded border border-input'>
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
            <ToolbarButton className='px-2 py-0.5 text-xs rounded hover:bg-muted'>Select</ToolbarButton>
            <ToolbarButton className='px-2 py-0.5 text-xs rounded hover:bg-muted'>Draw</ToolbarButton>
            <ToolbarSeparator className='h-3.5 w-px bg-border mx-0.5' />
            <ToolbarButton className='px-2 py-0.5 text-xs rounded hover:bg-destructive/10 text-destructive'>
              Delete
            </ToolbarButton>
          </Toolbar>
        ),
        discouraged: (
          <Toolbar className='flex items-center gap-1 border border-border p-1 rounded-(--radius)'>
            <ToolbarButton className='p-0.5 text-xs'>A</ToolbarButton>
            <ToolbarButton className='p-0.5 text-xs'>B</ToolbarButton>
            <ToolbarButton className='p-0.5 text-xs'>C</ToolbarButton>
            <ToolbarButton className='p-0.5 text-xs'>D</ToolbarButton>
          </Toolbar>
        )
      }
    ]
  },
  tooltip: {
    Layout: [
      {
        recommended: (
          <Tooltip>
            <TooltipTrigger
              render={
                <Button size='xs' variant='outline'>
                  ＋
                </Button>
              }
            />
            <TooltipPopup className='rounded bg-popover text-popover-foreground border border-border px-1.5 py-0.5 text-[10px] shadow-sm'>
              Add item (W)
            </TooltipPopup>
          </Tooltip>
        ),
        discouraged: (
          <Tooltip>
            <TooltipTrigger
              render={
                <Button size='xs' variant='outline'>
                  ℹ
                </Button>
              }
            />
            <TooltipPopup className='rounded bg-popover text-popover-foreground border border-border p-1.5 text-[10px] space-y-1'>
              <div>Need assistance?</div>
              <a href='#' className='text-primary underline block'>
                Read Documentation
              </a>
            </TooltipPopup>
          </Tooltip>
        )
      }
    ]
  }
}

export const designerPracticesB = designerPracticeRegistry
export default designerPracticeRegistry
import { Fragment } from 'react'
