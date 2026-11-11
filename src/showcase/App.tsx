import { Fragment, useEffect, useLayoutEffect, useMemo, useState } from 'react'
import {
  ArrowLeftIcon,
  ArrowsHorizontalIcon,
  MagnifyingGlassIcon,
  MoonIcon,
  SunIcon,
  XIcon,
  PaletteIcon,
  CodeIcon,
  TextAlignLeftIcon,
  TextAlignRightIcon,
  TextBIcon,
  TextItalicIcon,
  DotsThreeIcon
} from '@phosphor-icons/react'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import { VariantBlock, type DemoMeta } from './demo'
import { ShowcaseBrandLink } from './brand-link'
import { Sheet } from './sheet'
import { OverviewStyle } from './overview-style'
import { OverviewDashboard } from './overview-dashboard'
import { PatternLibrary } from './pattern-library'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { DataTable, type DataTableColumnDef } from '@/components/ui/data-table'
import { Calendar } from '@/components/ui/calendar'
import { DatePicker } from '@/components/ui/date-picker'
import { RadioGroup, RadioRoot } from '@/components/ui/radio'
import { Search } from '@/components/ui/search'
import {
  Combobox,
  ComboboxChip,
  ComboboxChipRemove,
  ComboboxChips,
  ComboboxInput,
  ComboboxInputGroup,
  ComboboxValue
} from '@/components/ui/combobox'
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockTitle,
  CodeBlockLine,
  useHighlightedCode
} from '@/components/ui/code-block'
import { Toggle } from '@/components/ui/toggle'
import { ToggleGroup } from '@/components/ui/toggle-group'
import { Toolbar, ToolbarButton, ToolbarSeparator } from '@/components/ui/toolbar'
import { Menu, MenuItem, MenuPopup, MenuPortal, MenuPositioner, MenuTrigger } from '@/components/ui/menu'
import {
  Select,
  SelectIcon,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectList,
  SelectPopup,
  SelectPortal,
  SelectPositioner,
  SelectSeparator,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  NumberField,
  NumberFieldGroup,
  NumberFieldInput,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldScrubArea,
  NumberFieldScrubAreaCursor
} from '@/components/ui/number-field'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger
} from '@/components/ui/sidebar'
import {
  Tooltip,
  TooltipArrow,
  TooltipPopup,
  TooltipPortal,
  TooltipPositioner,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import {
  ComponentGuidelineSheet,
  designerGuidelinesBySlug,
  designerPracticesBySlug,
  guidelinesBySlug
} from './component-guidelines'
import { DesignerGuidelineSheet } from './component-guidelines/designer-guideline-sheet'
import { Tabs, TabsList, TabsPanel, TabsTab } from '@/components/ui/tabs'
import { ChartContainer, ChartLegend, ChartLegendContent, type ChartConfig } from '@/components/ui/chart'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import {
  Popover,
  PopoverArrow,
  PopoverDescription,
  PopoverPopup,
  PopoverPortal,
  PopoverPositioner,
  PopoverTitle,
  PopoverTrigger
} from '@/components/ui/popover'
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem
} from '@/components/ui/command'
import skytrackLogo from '../../public/skytrack-logo-full.svg?raw'

/**
 * Auto-registers every demo file. Members add `src/demos/<id>.demo.tsx`;
 * nobody edits this file to register a component.
 */
const modules = import.meta.glob<{ demo: DemoMeta }>('../demos/*.demo.tsx', { eager: true })

const GROUP_ORDER: DemoMeta['group'][] = [
  'Actions',
  'Forms',
  'Overlays',
  'Menus & Navigation',
  'Data Display',
  'Layout',
  'Patterns',
  'UI shell'
]

const rawDemos = Object.values(modules)
  .map((m) => m.demo)
  .filter(Boolean)

const datePickerDemo = rawDemos.find((d) => d.id === 'date-picker')
const hasCalendarDemo = rawDemos.some((d) => d.id === 'calendar')

const calendarDemo: DemoMeta | null =
  !hasCalendarDemo && datePickerDemo
    ? {
        id: 'calendar',
        title: 'Calendar',
        description: 'A standalone month-grid calendar for selecting dates.',
        group: 'Forms',
        variants: datePickerDemo.variants.filter((v) => v.name === 'CALENDAR')
      }
    : null

const groupRank = (group: DemoMeta['group']) => {
  const index = GROUP_ORDER.indexOf(group)
  return index === -1 ? GROUP_ORDER.length : index
}

const demos: DemoMeta[] = (calendarDemo ? [...rawDemos, calendarDemo] : rawDemos).sort(
  (a, b) => groupRank(a.group) - groupRank(b.group) || a.title.localeCompare(b.title)
)

const demosMap = demos.reduce<Record<string, DemoMeta>>((acc, d) => {
  acc[d.id] = d
  return acc
}, {})

const VIEWS = [
  ['components', 'Components'],
  ['sheet', 'Sheet'],
  ['showcase', 'Showcase'],
  ['pattern', 'Patterns']
] as const

/** `Overview` and `Dashboard` are two tabs of the merged `showcase` route, not routes of their own. */

type View = (typeof VIEWS)[number][0]
type Audience = 'designer' | 'developer'

/**
 * The two showcases that share the merged `showcase` route. The filled tabs in the top nav
 * switch between them, the same way the components route separates its variants.
 */
const SHOWCASE_PANELS = [
  ['overview', '01', 'Overview'],
  ['dashboard', '02', 'Dashboard']
] as const

type ShowcasePanel = (typeof SHOWCASE_PANELS)[number][0]

/** Legacy routes that now resolve to the merged `showcase` route. */
const LEGACY_VIEW_ALIASES: Record<string, ShowcasePanel> = {
  'style-overview': 'overview',
  dashboard: 'dashboard'
}

const toolbarFontOptions = [
  { label: 'Helvetica', value: 'helvetica' },
  { label: 'Arial', value: 'arial' },
  { label: 'Inter', value: 'inter', disabled: true }
]

const thumbnailFruitOptions = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Orange', value: 'orange' }
]

const thumbnailFlightData = [
  { month: 'Jan', planned: 18, completed: 14 },
  { month: 'Feb', planned: 22, completed: 19 },
  { month: 'Mar', planned: 25, completed: 21 },
  { month: 'Apr', planned: 20, completed: 17 },
  { month: 'May', planned: 29, completed: 26 },
  { month: 'Jun', planned: 32, completed: 28 }
]

const thumbnailFlightConfig = {
  completed: { label: 'Completed', color: 'var(--chart-1)' },
  planned: { label: 'Planned', color: 'var(--chart-2)' }
} satisfies ChartConfig

type ThumbnailCustomer = {
  id: string
  name: string
  email: string
  status: 'Active' | 'Invited'
  avatar?: string
}

const thumbnailCustomers: ThumbnailCustomer[] = [
  {
    id: 'C-1042',
    name: 'Luna Smith',
    email: 'luna@example.com',
    status: 'Active',
    avatar: '/images/avatars/Female/1.jpg'
  },
  {
    id: 'C-1043',
    name: 'Jovani Martins',
    email: 'jovani@example.com',
    status: 'Active',
    avatar: '/images/avatars/Male/1.jpg'
  },
  { id: 'C-1044', name: 'Bryana Schneider', email: 'bryana@example.com', status: 'Invited' }
]

const thumbnailCustomerColumns: DataTableColumnDef<ThumbnailCustomer>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => <span className='font-medium'>{row.original.id}</span>
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => (
      <div className='flex items-center gap-2'>
        <Avatar size='xs' aria-hidden='true'>
          {row.original.avatar && <AvatarImage src={row.original.avatar} alt='' />}
          <AvatarFallback>
            {row.original.name
              .split(' ')
              .map((part) => part[0])
              .join('')}
          </AvatarFallback>
        </Avatar>
        <span>{row.original.name}</span>
      </div>
    )
  },
  { accessorKey: 'email', header: 'Email' },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <Badge
        count={row.original.status}
        status={row.original.status === 'Active' ? 'success' : 'secondary'}
        size='sm'
        className='rounded-(--radius)'
      />
    )
  }
]

type ThumbnailLanguage = { id: string; value: string }

const thumbnailLanguages: ThumbnailLanguage[] = [
  { id: 'php', value: 'PHP' },
  { id: 'cs', value: 'C#' },
  { id: 'java', value: 'Java' },
  { id: 'typescript', value: 'TypeScript' }
]

const thumbnailCode = `export function routeDistance(points: Point[]) {
  return points.reduce((total, point) => total + point.distance, 0)
}`

function CompactCodeBlockThumbnail() {
  const lines = useHighlightedCode(thumbnailCode, 'typescript')

  return (
    <CodeBlock className='w-full max-w-sm' size='sm'>
      <CodeBlockHeader className='py-1.5'>
        <CodeBlockTitle>route-distance.ts</CodeBlockTitle>
        <CodeBlockActions>
          <CodeBlockCopyButton value={thumbnailCode} size='icon-xs' />
        </CodeBlockActions>
      </CodeBlockHeader>
      <CodeBlockContent wrap className='max-h-28 text-xs'>
        {lines.map((line, index) => (
          <CodeBlockLine key={index}>{line}</CodeBlockLine>
        ))}
      </CodeBlockContent>
    </CodeBlock>
  )
}

function OverlayThumbnail({ demo }: { demo: DemoMeta }) {
  const isModal = demo.id === 'dialog' || demo.id === 'alert-dialog'
  const isDrawer = demo.id === 'drawer'
  const isToast = demo.id === 'toast'
  const isTooltip = demo.id === 'tooltip'
  const isPopover = demo.id === 'popover'
  const label = isModal ? (demo.id === 'dialog' ? 'Dialog' : 'Discard changes?') : demo.title

  return (
    <div
      aria-hidden='true'
      className='relative flex h-44 w-full max-w-md items-center justify-center overflow-hidden border border-border bg-muted/25 p-0'
    >
      <div className='absolute inset-0 border border-border/70 bg-background/70' />
      {!isToast && !isTooltip && !isPopover && !isDrawer && <div className='absolute inset-5 bg-background/55' />}
      {isModal && (
        <div className='relative z-10 w-44 border border-primary/60 bg-card p-3 shadow-lg'>
          <div className='mb-3 h-2 w-20 bg-foreground/70' />
          <div className='mb-2 h-1.5 w-full bg-muted-foreground/40' />
          <div className='mb-3 h-1.5 w-3/4 bg-muted-foreground/30' />
          <div className='flex justify-end gap-2'>
            <span className='h-2 w-8 bg-muted' />
            <span className='h-2 w-9 bg-primary/80' />
          </div>
        </div>
      )}
      {isDrawer && (
        <div className='absolute inset-y-5 right-5 z-10 w-36 border-l border-primary/50 bg-card p-3 shadow-lg'>
          <div className='mb-4 h-2 w-16 bg-foreground/70' />
          <div className='space-y-2'>
            <div className='h-1.5 w-full bg-muted-foreground/35' />
            <div className='h-1.5 w-4/5 bg-muted-foreground/30' />
            <div className='h-1.5 w-3/4 bg-muted-foreground/30' />
          </div>
        </div>
      )}
      {isPopover && (
        <>
          <div className='relative z-10 h-7 w-20 border border-input bg-background' />
          <div className='absolute left-1/2 top-7 z-20 w-36 -translate-x-1/2 border border-border bg-popover p-3 shadow-lg'>
            <div className='mb-2 h-1.5 w-16 bg-foreground/60' />
            <div className='h-1.5 w-full bg-muted-foreground/30' />
          </div>
        </>
      )}
      {isTooltip && (
        <>
          <div className='relative z-10 h-7 w-20 border border-input bg-background' />
          <div className='absolute left-1/2 top-7 z-20 -translate-x-1/2 bg-foreground px-3 py-2 text-[10px] text-background shadow-lg'>
            Helpful hint
          </div>
        </>
      )}
      {isToast && (
        <div className='absolute bottom-7 right-7 z-10 w-44 border border-border bg-card p-3 shadow-lg'>
          <div className='mb-2 h-2 w-20 bg-foreground/70' />
          <div className='h-1.5 w-full bg-muted-foreground/35' />
        </div>
      )}
      {!isModal && !isDrawer && !isToast && !isTooltip && !isPopover && (
        <div className='relative z-10 w-36 border border-primary/50 bg-card p-3 shadow-lg'>
          <div className='mb-2 h-2 w-16 bg-foreground/70' />
          <div className='h-1.5 w-full bg-muted-foreground/35' />
        </div>
      )}
      <span className='sr-only'>{label} open over the demo surface</span>
    </div>
  )
}

function ComponentPlaceholder({ demo }: { demo: DemoMeta }) {
  const frame = 'flex h-44 w-full max-w-md overflow-hidden border border-border bg-background text-[8px]'
  const line = 'h-1.5 bg-muted-foreground/40'
  const active = 'h-1.5 bg-primary/80'

  if (demo.id === 'left-nav-shell')
    return (
      <div aria-hidden='true' className={frame}>
        <aside className='w-1/4 space-y-3 border-r border-border bg-muted/20 p-3'>
          <div className='h-2 w-3/4 bg-foreground/60' />
          <div className='h-3 bg-primary/20' />
          <div className={line} />
          <div className={line} />
        </aside>
        <div className='flex-1 p-4'>
          <div className='mb-4 h-2 w-1/3 bg-foreground/60' />
          <div className='grid grid-cols-2 gap-2'>
            <div className='h-12 border border-border bg-muted/15' />
            <div className='h-12 border border-border bg-muted/15' />
          </div>
          <div className='mt-3 h-10 border border-border bg-muted/15' />
        </div>
      </div>
    )

  if (demo.id === 'top-nav-shell')
    return (
      <div aria-hidden='true' className={`${frame} flex-col`}>
        <div className='flex h-8 items-center gap-4 border-b border-border bg-muted/20 px-3'>
          <div className='h-2 w-12 bg-foreground/60' />
          <div className={active + ' w-10'} />
          <div className={line + ' w-10'} />
          <div className={line + ' w-10'} />
          <div className='ml-auto h-3 w-8 bg-primary/50' />
        </div>
        <div className='flex-1 p-4'>
          <div className='mb-3 h-2 w-1/3 bg-foreground/60' />
          <div className='grid grid-cols-3 gap-2'>
            <div className='h-12 border border-border' />
            <div className='h-12 border border-border' />
            <div className='h-12 border border-border' />
          </div>
        </div>
      </div>
    )

  if (demo.id === 'combined-shell')
    return (
      <div aria-hidden='true' className={`${frame} flex-col`}>
        <div className='flex h-7 items-center gap-3 border-b border-border bg-muted/20 px-3'>
          <div className='h-2 w-12 bg-foreground/60' />
          <div className={active + ' w-12'} />
          <div className={line + ' w-12'} />
        </div>
        <div className='flex min-h-0 flex-1'>
          <aside className='w-1/5 space-y-2 border-r border-border p-2'>
            <div className={active + ' w-full'} />
            <div className={line + ' w-full'} />
            <div className={line + ' w-4/5'} />
          </aside>
          <div className='flex-1 p-3'>
            <div className='mb-3 h-2 w-1/3 bg-foreground/60' />
            <div className='grid grid-cols-2 gap-2'>
              <div className='h-10 border border-border' />
              <div className='h-10 border border-border' />
            </div>
          </div>
          <aside className='w-1/5 border-l border-border bg-muted/10 p-2'>
            <div className={line + ' w-full'} />
            <div className='mt-2 h-8 border border-border' />
          </aside>
        </div>
      </div>
    )

  if (demo.id === 'multi-pane-shell')
    return (
      <div aria-hidden='true' className={frame}>
        <aside className='w-1/3 space-y-2 border-r border-border bg-muted/10 p-2'>
          <div className={active + ' w-full'} />
          <div className={line + ' w-4/5'} />
          <div className={line + ' w-full'} />
          <div className={line + ' w-3/4'} />
        </aside>
        <div className='flex-1 p-3'>
          <div className='mb-3 h-2 w-1/2 bg-foreground/60' />
          <div className='h-2 w-full bg-muted-foreground/35' />
          <div className='mt-2 h-2 w-4/5 bg-muted-foreground/25' />
          <div className='mt-4 h-14 border border-border bg-muted/10' />
        </div>
      </div>
    )

  if (demo.id === 'multi-tab-shell')
    return (
      <div aria-hidden='true' className={`${frame} flex-col`}>
        <div className='flex h-8 items-end gap-4 border-b border-border px-3'>
          <div className={active + ' mb-0.5 w-12'} />
          <div className={line + ' mb-0.5 w-12'} />
          <div className={line + ' mb-0.5 w-12'} />
        </div>
        <div className='flex flex-1'>
          <aside className='w-1/4 space-y-2 border-r border-border p-2'>
            <div className={active + ' w-full'} />
            <div className={line + ' w-4/5'} />
            <div className={line + ' w-full'} />
          </aside>
          <div className='flex-1 p-4'>
            <div className='mb-3 h-2 w-1/3 bg-foreground/60' />
            <div className='h-12 border border-border' />
          </div>
        </div>
      </div>
    )

  if (demo.id === 'canvas-shell')
    return (
      <div aria-hidden='true' className={frame}>
        <aside className='w-7 border-r border-border bg-muted/20 p-1'>
          <div className='mb-2 h-3 border border-border' />
          <div className='mb-2 h-3 border border-border' />
          <div className='h-3 border border-border' />
        </aside>
        <div className='relative flex-1 bg-muted/10'>
          <div className='absolute left-1/4 top-1/4 h-8 w-12 border border-primary/70 bg-card' />
          <div className='absolute right-1/4 top-1/2 h-8 w-12 border border-border bg-card' />
          <div className='absolute bottom-2 left-1/3 h-1.5 w-1/3 bg-muted-foreground/30' />
        </div>
        <aside className='w-1/5 border-l border-border p-2'>
          <div className='mb-2 h-2 w-3/4 bg-foreground/50' />
          <div className={line + ' w-full'} />
          <div className='mt-2 h-5 border border-border' />
        </aside>
      </div>
    )

  if (demo.id === 'command-first-shell')
    return (
      <div aria-hidden='true' className='w-full max-w-sm border border-primary/60 bg-card p-3 shadow-lg'>
        <div className='mb-3 border-b border-border pb-2'>
          <div className={line + ' w-3/4'} />
        </div>
        <div className='mb-2 h-1.5 w-1/4 bg-foreground/50' />
        <div className='mb-1 h-5 bg-primary/20 px-2'>
          <div className={`${active} mt-2 w-2/3`} />
        </div>
        <div className='h-5 px-2'>
          <div className={`${line} mt-2 w-1/2`} />
        </div>
        <div className='mt-2 h-px bg-border' />
        <div className='mt-2 h-1.5 w-1/5 bg-foreground/50' />
      </div>
    )

  return (
    <div aria-hidden='true' className={frame}>
      <div className='flex-1 p-4'>
        <div className='mb-4 h-2 w-1/3 bg-foreground/60' />
        <div className='grid grid-cols-2 gap-2'>
          <div className='h-12 border border-border bg-muted/15' />
          <div className='h-12 border border-border bg-muted/15' />
        </div>
        <div className='mt-3 h-10 border border-border bg-muted/15' />
      </div>
    </div>
  )
}

function ThumbnailPreview({ demo }: { demo: DemoMeta }) {
  if (demo.id === 'combobox')
    return (
      <div className='sm:w-64 w-64 space-y-2'>
        <Combobox<ThumbnailLanguage, true>
          items={thumbnailLanguages}
          multiple
          defaultValue={thumbnailLanguages.slice(0, 3)}
        >
          <ComboboxInputGroup shape='chips'>
            <ComboboxValue>
              {(value: ThumbnailLanguage[]) => (
                <ComboboxChips aria-label='Selected languages'>
                  {value.map((language) => (
                    <ComboboxChip key={language.id} aria-label={language.value}>
                      {language.value}
                      <ComboboxChipRemove aria-label={`Remove ${language.value}`} />
                    </ComboboxChip>
                  ))}
                  <ComboboxInput id='thumbnail-combobox-input' aria-label='Add language' placeholder='' />
                </ComboboxChips>
              )}
            </ComboboxValue>
          </ComboboxInputGroup>
        </Combobox>
      </div>
    )
  if (demo.id === 'date-picker')
    return <DatePicker aria-label='Flight date' placeholder='Select a date' className='w-64' />
  if (demo.id === 'radio')
    return (
      <div className='flex w-full justify-center'>
        <div className='w-fit space-y-3'>
          <div className='font-medium'>Best apple</div>
          <RadioGroup defaultValue='fuji-apple' aria-label='Best apple' className='gap-3'>
            {[
              ['fuji-apple', 'Fuji'],
              ['gala-apple', 'Gala'],
              ['granny-smith-apple', 'Granny Smith']
            ].map(([value, label]) => (
              <label key={value} className='flex items-center gap-2'>
                <RadioRoot value={value} />
                {label}
              </label>
            ))}
          </RadioGroup>
        </div>
      </div>
    )
  if (demo.id === 'code-block') return <CompactCodeBlockThumbnail />
  if (demo.id === 'search')
    return <Search aria-label='Search workspaces' defaultValue='Northstar' className='w-full max-w-sm' />
  if (demo.id === 'calendar')
    return (
      <Calendar
        mode='single'
        defaultMonth={new Date(2026, 10, 1, 12)}
        selected={new Date(2026, 10, 10, 12)}
        hideNavigation
        components={{ MonthCaption: () => <div className='hidden' /> }}
        className='p-0'
      />
    )
  if (demo.id === 'chart')
    return (
      <ChartContainer config={thumbnailFlightConfig} className='h-44 w-full max-w-md'>
        <BarChart accessibilityLayer data={thumbnailFlightData} margin={{ left: 4, right: 4, top: 4, bottom: 0 }}>
          <CartesianGrid vertical={false} stroke='var(--border)' />
          <XAxis dataKey='month' tickLine={false} axisLine={false} tickMargin={6} />
          <YAxis width={28} tickLine={false} axisLine={false} />
          <ChartLegend verticalAlign='bottom' content={<ChartLegendContent />} />
          <Bar dataKey='planned' fill='var(--color-planned)' radius={0} />
          <Bar dataKey='completed' fill='var(--color-completed)' radius={0} />
        </BarChart>
      </ChartContainer>
    )
  if (demo.id === 'data-table')
    return (
      <DataTable
        data={thumbnailCustomers}
        columns={thumbnailCustomerColumns}
        getRowId={(customer) => customer.id}
        pageSize={3}
        size='md'
        className='gap-0 [&>div:last-child>p]:hidden'
        tableContainerClassName='max-h-48'
        renderSearch={() => null}
        renderColumnVisibility={() => null}
        renderPagination={() => null}
      />
    )
  if (demo.id === 'breadcrumb')
    return (
      <Breadcrumb aria-hidden='true'>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink render={<a href='#home' />}>Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink render={<a href='#missions' />}>Missions</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Flight plan</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    )
  if (demo.id === 'input') return <Input aria-label='Name' placeholder='e.g. Colm Tuite' className='w-56' />
  if (demo.id === 'select')
    return (
      <Select items={thumbnailFruitOptions} defaultValue='apple'>
        <SelectTrigger aria-label='Apple' className='w-48'>
          <SelectValue placeholder='Select apple' />
          <SelectIcon />
        </SelectTrigger>
        <SelectPortal>
          <SelectPositioner side='bottom' align='start' sideOffset={4}>
            <SelectPopup>
              <SelectList>
                {thumbnailFruitOptions.map((fruit) => (
                  <SelectItem key={fruit.value} value={fruit.value}>
                    <SelectItemIndicator />
                    <SelectItemText>{fruit.label}</SelectItemText>
                  </SelectItem>
                ))}
              </SelectList>
            </SelectPopup>
          </SelectPositioner>
        </SelectPortal>
      </Select>
    )
  if (demo.id === 'popover')
    return (
      <div className='flex h-36 pt-12 w-full items-center justify-center'>
        <Popover open>
          <PopoverTrigger
            render={
              <Button variant='outline' size='sm'>
                View details
              </Button>
            }
          />
          <PopoverPortal>
            <PopoverPositioner side='top' sideOffset={12}>
              <PopoverPopup className='pointer-events-none'>
                <PopoverArrow />
                <PopoverTitle>Notifications</PopoverTitle>
                <PopoverDescription>You are all caught up.</PopoverDescription>
              </PopoverPopup>
            </PopoverPositioner>
          </PopoverPortal>
        </Popover>
      </div>
    )
  if (demo.id === 'tooltip')
    return (
      <TooltipProvider>
        <div className='flex h-36 pt-12 w-full items-center justify-center'>
          <Tooltip open>
            <TooltipTrigger
              render={
                <Button variant='outline' size='sm'>
                  Copy
                </Button>
              }
            />
            <TooltipPortal>
              <TooltipPositioner side='top' sideOffset={12}>
                <TooltipPopup className='pointer-events-none'>
                  <TooltipArrow />
                  Copied
                </TooltipPopup>
              </TooltipPositioner>
            </TooltipPortal>
          </Tooltip>
        </div>
      </TooltipProvider>
    )
  if (demo.id === 'button') return <Button>Button</Button>
  if (demo.id === 'toolbar')
    return (
      <Toolbar className=''>
        <ToggleGroup defaultValue={['align-left']} size='sm' aria-label='Text alignment' className='border-0 p-0'>
          <ToolbarButton render={<Toggle />} value='align-left' aria-label='Align left'>
            <TextAlignLeftIcon />
          </ToolbarButton>
          <ToolbarButton render={<Toggle />} value='align-right' aria-label='Align right'>
            <TextAlignRightIcon />
          </ToolbarButton>
        </ToggleGroup>
        <ToolbarSeparator />
        <ToggleGroup defaultValue={['bold']} size='sm' aria-label='Text formatting' className='border-0 p-0'>
          <ToolbarButton render={<Toggle />} value='bold' aria-label='Bold' className='border-0 font-semibold'>
            <TextBIcon />
          </ToolbarButton>
          <ToolbarButton render={<Toggle />} value='italic' aria-label='Italic' className='border-0 italic'>
            <TextItalicIcon />
          </ToolbarButton>
        </ToggleGroup>
        <ToolbarSeparator />
        <Select items={toolbarFontOptions} defaultValue='helvetica'>
          <ToolbarButton
            render={<SelectTrigger size='sm' className='w-32' />}
            className='justify-between'
            aria-label='Font family'
          >
            <SelectValue />
            <SelectIcon />
          </ToolbarButton>
          <SelectPortal>
            <SelectPositioner side='bottom' align='start' sideOffset={4}>
              <SelectPopup>
                <SelectList>
                  {toolbarFontOptions.map((font) => (
                    <Fragment key={font.value}>
                      {font.value === 'inter' && <SelectSeparator />}
                      <SelectItem value={font.value} disabled={font.disabled}>
                        <SelectItemIndicator />
                        <SelectItemText>{font.label}</SelectItemText>
                      </SelectItem>
                    </Fragment>
                  ))}
                </SelectList>
              </SelectPopup>
            </SelectPositioner>
          </SelectPortal>
        </Select>
      </Toolbar>
    )
  if (demo.id === 'tabs')
    return (
      <Tabs defaultValue='overview' className='w-auto max-auto max-w-xl'>
        <TabsList variant='filled' className='w-auto'>
          <TabsTab value='overview'>Overview</TabsTab>
          <TabsTab value='projects'>Projects</TabsTab>
          <TabsTab value='account'>Account</TabsTab>
        </TabsList>
      </Tabs>
    )
  if (demo.id === 'sidebar')
    return (
      <div aria-hidden='true' className='flex h-40 w-full max-w-md border border-border bg-background text-[9px]'>
        <nav className='w-1/3 space-y-3 border-r border-border bg-muted/10 p-3'>
          <div className='mb-4 h-2 w-3/4 bg-foreground/60' />
          <div className='flex h-6 items-center border-l-2 border-primary bg-primary/10 px-2'>
            <div className='h-1.5 w-12 bg-foreground/70' />
          </div>
          <div className='h-6 px-2 py-2'>
            <div className='h-1.5 w-10 bg-muted-foreground/45' />
          </div>
          <div className='h-6 px-2 py-2'>
            <div className='h-1.5 w-8 bg-muted-foreground/45' />
          </div>
        </nav>
        <div className='flex-1 p-4'>
          <div className='mb-3 h-2 w-1/3 bg-foreground/60' />
          <div className='mb-2 h-1.5 w-3/4 bg-muted-foreground/30' />
          <div className='h-1.5 w-1/2 bg-muted-foreground/25' />
        </div>
      </div>
    )
  if (demo.id === 'collapsible') return demo.variants[0]?.render()
  if (demo.id === 'page-header')
    return (
      <div
        aria-hidden='true'
        className='flex w-full max-w-md items-start justify-between gap-4 border-b border-border bg-background px-4 py-4'
      >
        <div className='min-w-0 flex-1'>
          <div className='mb-2 h-2.5 w-1/3 bg-foreground/70' />
          <div className='mb-4 h-1.5 w-3/4 bg-muted-foreground/35' />
          <div className='flex gap-2'>
            <span className='h-2 w-12 bg-muted-foreground/20' />
            <span className='h-2 w-14 bg-muted-foreground/20' />
          </div>
        </div>
        <div className='flex shrink-0 gap-2'>
          <span className='h-6 w-12 border border-border bg-muted/10' />
          <span className='h-6 w-14 bg-primary/70' />
        </div>
      </div>
    )
  if (demo.id === 'context-menu')
    return (
      <div className='w-48 space-y-1 border border-border bg-popover p-1 text-sm'>
        <div className='px-3 py-2'>Open</div>
        <div className='bg-accent px-3 py-2'>Copy</div>
        <div className='px-3 py-2'>Rename</div>
      </div>
    )
  if (demo.id === 'command')
    return (
      <div className='w-80 border border-border bg-popover p-3'>
        <div className='mb-3 border-b border-border pb-2 text-sm text-muted-foreground'>Search commands…</div>
        <div className='text-xs font-semibold text-muted-foreground'>SUGGESTIONS</div>
        <div className='mt-2 bg-accent px-3 py-2 text-sm'>Create new mission</div>
        <div className='px-3 py-2 text-sm'>Open settings</div>
      </div>
    )
  if (demo.id === 'otp-field')
    return (
      <div className='flex gap-2'>
        {['4', '8', '', '', '', ''].map((value, index) => (
          <div
            key={index}
            className='flex size-10 items-center justify-center rounded-(--radius) border border-input bg-background font-mono'
          >
            {value}
          </div>
        ))}
      </div>
    )
  if (demo.id === 'number-field')
    return (
      <NumberField defaultValue={100}>
        <NumberFieldScrubArea className='flex items-center gap-1'>
          <NumberFieldScrubAreaCursor>
            <ArrowsHorizontalIcon />
          </NumberFieldScrubAreaCursor>
        </NumberFieldScrubArea>
        <NumberFieldGroup>
          <NumberFieldDecrement aria-label='Decrease amount' />
          <NumberFieldInput />
          <NumberFieldIncrement aria-label='Increase amount' />
        </NumberFieldGroup>
      </NumberField>
    )
  if (demo.id === 'menu')
    return (
      <Menu open={true} modal={false}>
        <MenuTrigger
          render={
            <Button
              variant='ghost'
              size='icon-lg'
              aria-label='More actions'
              className='bg-accent text-accent-foreground'
            />
          }
        >
          <DotsThreeIcon aria-hidden='true' />
        </MenuTrigger>
        <MenuPortal>
          <MenuPositioner side='bottom' align='end' sideOffset={4}>
            <MenuPopup>
              <MenuItem>Rename</MenuItem>
              <MenuItem>Duplicate</MenuItem>
            </MenuPopup>
          </MenuPositioner>
        </MenuPortal>
      </Menu>
    )
  if (demo.id === 'navigation-menu')
    return (
      <div aria-hidden='true' className='relative w-80'>
        <div className='flex items-center gap-2'>
          <div className='flex h-9 w-28 items-center justify-center border border-border'>
            <div className='h-2 w-14 bg-muted-foreground/45' />
            <div className='ml-2 h-1.5 w-1.5 border-b border-r border-muted-foreground/50 rotate-45' />
          </div>
          <div className='flex h-9 w-28 items-center justify-center border border-border'>
            <div className='h-2 w-14 bg-muted-foreground/45' />
            <div className='ml-2 h-1.5 w-1.5 border-b border-r border-muted-foreground/50 rotate-45' />
          </div>
          <div className='h-2 w-8 bg-muted-foreground/35' />
        </div>
        <div className='mt-2 w-64 border border-primary/50 bg-popover p-4 shadow-lg'>
          <div className='mb-3 h-2 w-1/3 bg-foreground/60' />
          <div className='mb-2 h-1.5 w-full bg-muted-foreground/35' />
          <div className='h-1.5 w-3/4 bg-muted-foreground/25' />
        </div>
      </div>
    )
  if (demo.id === 'alert') return demo.variants[0]?.render()
  if (demo.group === 'Overlays') return <OverlayThumbnail demo={demo} />
  if (demo.id === 'dropzone') return demo.variants[0]?.render()
  if (demo.group === 'UI shell') return <ComponentPlaceholder demo={demo} />
  return demo.variants[0]?.render()
}

function readComponentFromUrl(): string | null {
  const id = new URLSearchParams(window.location.search).get('component')
  return id && demosMap[id] ? id : null
}

/**
 * The merged showcase route. The two legacy routes (`style-overview`, `dashboard`) resolve to it,
 * so old links keep working.
 */
function readViewFromUrl(): View {
  const route = new URLSearchParams(window.location.search).get('view')
  if (route && route in LEGACY_VIEW_ALIASES) return 'showcase'
  return VIEWS.some(([id]) => id === route) ? (route as View) : 'components'
}

/**
 * Which of the two showcases the merged route shows. The old routes carry their showcase in the
 * `view` param, so `?view=dashboard` still lands on the dashboard.
 */
function readShowcasePanelFromUrl(): ShowcasePanel {
  const params = new URLSearchParams(window.location.search)
  const legacy = LEGACY_VIEW_ALIASES[params.get('view') ?? '']
  if (legacy) return legacy
  return params.get('panel') === 'dashboard' ? 'dashboard' : 'overview'
}

/** True when the URL still points at one of the routes merged into `showcase`. */
function hasLegacyView(): boolean {
  const route = new URLSearchParams(window.location.search).get('view')
  return route != null && route in LEGACY_VIEW_ALIASES
}

export function App() {
  const [dark, setDark] = useState(() => localStorage.getItem('skytrack-ui-theme') === 'dark')
  const [query, setQuery] = useState('')
  const [view, setView] = useState<View>(readViewFromUrl)
  const [componentId, setComponentId] = useState<string | null>(readComponentFromUrl)
  const [showcasePanel, setShowcasePanel] = useState<ShowcasePanel>(readShowcasePanelFromUrl)
  const [audience, setAudience] = useState<Audience>('designer')
  const [commandOpen, setCommandOpen] = useState(false)
  const [commandQuery, setCommandQuery] = useState('')

  const navigateToView = (nextView: View) => {
    const url = new URL(window.location.href)
    url.searchParams.set('view', nextView)
    url.searchParams.delete('component')
    if (nextView === 'showcase') url.searchParams.set('panel', showcasePanel)
    else url.searchParams.delete('panel')
    window.history.pushState({ view: nextView }, '', url)
    setView(nextView)
    setComponentId(null)
  }

  /** Switches the showcase shown by the merged route. */
  const selectShowcasePanel = (panel: ShowcasePanel) => {
    const url = new URL(window.location.href)
    url.searchParams.set('view', 'showcase')
    url.searchParams.delete('component')
    url.searchParams.set('panel', panel)
    window.history.pushState({ view: 'showcase', panel }, '', url)
    setView('showcase')
    setComponentId(null)
    setShowcasePanel(panel)
  }

  const navigateToComponent = (id: string | null) => {
    const url = new URL(window.location.href)
    url.searchParams.set('view', 'components')
    url.searchParams.delete('panel')
    if (id && demosMap[id]) url.searchParams.set('component', id)
    else url.searchParams.delete('component')
    window.history.pushState({ view: 'components', component: id }, '', url)
    setView('components')
    setComponentId(id && demosMap[id] ? id : null)
  }

  useEffect(() => {
    const syncViewFromUrl = () => {
      setView(readViewFromUrl())
      setComponentId(readComponentFromUrl())
      setShowcasePanel(readShowcasePanelFromUrl())
    }
    window.addEventListener('popstate', syncViewFromUrl)
    return () => window.removeEventListener('popstate', syncViewFromUrl)
  }, [])

  // The two former routes now resolve to the merged `showcase` route; rewrite the address bar
  // so only one route stays in the history.
  useEffect(() => {
    if (!hasLegacyView()) return
    const url = new URL(window.location.href)
    url.searchParams.set('view', 'showcase')
    url.searchParams.set('panel', readShowcasePanelFromUrl())
    window.history.replaceState({ view: 'showcase' }, '', url)
  }, [])

  useEffect(() => {
    const handleSearchShortcut = (event: KeyboardEvent) => {
      if (!(event.metaKey || event.ctrlKey) || event.key.toLowerCase() !== 'k') return
      event.preventDefault()
      setCommandQuery('')
      setCommandOpen(true)
    }
    window.addEventListener('keydown', handleSearchShortcut)
    return () => window.removeEventListener('keydown', handleSearchShortcut)
  }, [])

  useEffect(() => {
    // The showcase route keeps the old per-showcase markers so the shipped CSS selectors
    // (`style-overview`) still match the right page.
    document.body.dataset.showcaseView =
      view === 'showcase' ? (showcasePanel === 'overview' ? 'style-overview' : 'dashboard') : view
    return () => {
      delete document.body.dataset.showcaseView
    }
  }, [view, showcasePanel])

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [view, componentId, showcasePanel])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('skytrack-ui-theme', dark ? 'dark' : 'light')
  }, [dark])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return q
      ? demos.filter(
          (d) =>
            d.title.toLowerCase().includes(q) ||
            d.id.toLowerCase().includes(q) ||
            d.description.toLowerCase().includes(q)
        )
      : demos
  }, [query])

  const renderViewContent = (selectedAudience: Audience) =>
    view === 'showcase' ? null : view === 'components' ? (
      componentId ? (
        (() => {
          const d = demosMap[componentId]
          const developerGuideline = guidelinesBySlug[d.id]
          const designerGuideline = designerGuidelinesBySlug[d.id]
          return (
            <div className='mx-auto max-w-7xl space-y-8 px-6 py-10 sm:px-8'>
              <Button variant='ghost' onClick={() => navigateToComponent(null)}>
                <ArrowLeftIcon /> All components
              </Button>
              <header className='space-y-2'>
                <h1 className='h1'>{d.title}</h1>
                <p className='text-muted-foreground'>
                  {selectedAudience === 'designer' ? (designerGuideline?.description ?? d.description) : d.description}
                </p>
              </header>
              {selectedAudience === 'designer' && designerGuideline ? (
                <DesignerGuidelineSheet
                  guideline={designerGuideline}
                  demo={d}
                  allDemos={demosMap}
                  practices={designerPracticesBySlug[d.id]}
                />
              ) : developerGuideline ? (
                <ComponentGuidelineSheet guideline={developerGuideline} demo={d} allDemos={demosMap} />
              ) : (
                <div className='grid gap-4'>
                  {d.variants.map((v) => (
                    <VariantBlock key={v.name} name={v.name}>
                      {v.render()}
                    </VariantBlock>
                  ))}
                </div>
              )}
            </div>
          )
        })()
      ) : (
        <div className='mx-auto max-w-[1600px] space-y-16 px-6 sm:px-8 py-10'>
          <h1 className='h1'>All components</h1>
          {GROUP_ORDER.map((group) => {
            const items = filtered.filter((d) => d.group === group)
            return items.length ? (
              <section key={group} className='space-y-4'>
                <div className='h3'>{group}</div>
                <div className='grid gap-5 sm:grid-cols-2 xl:grid-cols-3'>
                  {items.map((d) => (
                    <div
                      key={d.id}
                      role='link'
                      tabIndex={0}
                      onClick={() => navigateToComponent(d.id)}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                          event.preventDefault()
                          navigateToComponent(d.id)
                        }
                      }}
                      className='overflow-hidden rounded-(--radius) border border-border bg-card text-left hover:border-primary/60 cursor-pointer focus-visible:outline-2 focus-visible:outline-primary'
                    >
                      <div
                        className={`showcase-thumbnail thumbnail-${d.id} flex h-64 items-center justify-center overflow-hidden bg-muted/30 p-6`}
                      >
                        <div
                          className={`pointer-events-none flex w-full items-center justify-center ${
                            d.id === 'radio-group' || d.id === 'switch' ? '[&>*]:!w-fit' : ''
                          }`}
                        >
                          <ThumbnailPreview demo={d} />
                        </div>
                      </div>
                      <div className='flex items-center justify-between gap-3 border-t border-border p-4'>
                        <span className='font-medium'>{d.title}</span>
                        <Badge
                          size='sm'
                          count={
                            guidelinesBySlug[d.id] || designerGuidelinesBySlug[d.id] ? 'Guidelines' : 'No guidelines'
                          }
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ) : null
          })}
        </div>
      )
    ) : view === 'pattern' ? (
      <PatternLibrary query={query} audience={selectedAudience} onClearSearch={() => setQuery('')} />
    ) : (
      <div className='mx-auto max-w-7xl px-8 py-10'>
        <Sheet />
      </div>
    )

  const renderShowcasePanel = (panel: ShowcasePanel) => (
    <div className='mx-auto max-w-7xl px-8 py-10'>
      {panel === 'overview' ? <OverviewStyle /> : <OverviewDashboard />}
    </div>
  )

  return (
    <SidebarProvider className='min-h-screen w-full bg-background'>
      {view === 'components' && (
        <Sidebar className='md:sticky md:top-0 md:h-screen md:w-64 md:shrink-0'>
          <SidebarHeader className='gap-0 p-0'>
            <div className='flex h-14 items-center gap-2 border-b border-sidebar-border px-5'>
              <ShowcaseBrandLink logo={skytrackLogo} />
              <div className='relative flex items-center justify-centerh-5'>
                <Badge count='ui' status='outline' className='text-sm font-semibold border-primary shrink-0' />
                <div className='absolute h-2 w-2 bg-background border-primary border top-0 right-0 translate-x-1/2 -translate-y-1/2' />
                <div className='absolute h-2 w-2 bg-background border-primary border top-0 left-0 -translate-x-1/2 -translate-y-1/2' />
                <div className='absolute h-2 w-2 bg-background border-primary border bottom-0 right-0 translate-x-1/2 translate-y-1/2' />
                <div className='absolute h-2 w-2 bg-background border-primary border bottom-0 left-0 -translate-x-1/2 translate-y-1/2' />
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent className='gap-0 p-3 text-sm'>
            <SidebarGroup className='mb-4 gap-0 p-0'>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive={!componentId} onClick={() => navigateToComponent(null)}>
                    All components
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
            {GROUP_ORDER.map((group) => {
              const items = filtered.filter((d) => d.group === group)
              if (!items.length) return null
              return (
                <SidebarGroup key={group} className='mb-6 gap-0 p-0 last:mb-0'>
                  <SidebarGroupLabel className='h-8 px-2 pb-1'>{group}</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {items.map((d) => (
                        <SidebarMenuItem key={d.id}>
                          <SidebarMenuButton isActive={componentId === d.id} onClick={() => navigateToComponent(d.id)}>
                            <span className='min-w-0 truncate'>{d.title}</span>
                            {/* <span className='ml-auto shrink-0 text-xs text-muted-foreground'>{d.variants.length}</span> */}
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              )
            })}
          </SidebarContent>
        </Sidebar>
      )}

      <Tabs
        value={view === 'showcase' ? showcasePanel : audience}
        onValueChange={(value) => {
          if (value === 'overview' || value === 'dashboard') selectShowcasePanel(value)
          else setAudience(value as Audience)
        }}
        className='w-full min-w-0 flex-1 gap-0'
      >
        <header className='w-full sticky top-0 z-1 flex h-14 items-center gap-1 border-b border-border bg-background/90 px-3 backdrop-blur sm:gap-4 md:z-40'>
          {view === 'components' && <SidebarTrigger />}
          <ToggleGroup
            className='w-18 shrink-0 gap-1 overflow-x-auto border-none sm:w-full sm:min-w-0 sm:flex-1'
            variant='default'
            aria-label='Showcase views'
            value={[view]}
          >
            {VIEWS.map(([id, label]) => (
              <Toggle key={id} onClick={() => navigateToView(id)} value={id}>
                {label}
              </Toggle>
            ))}
          </ToggleGroup>
          {view === 'components' && (
            <>
              <Input
                startAdornment={<MagnifyingGlassIcon />}
                endAdornment={
                  <>
                    <Badge size='sm' count='⌘ K' className='rounded-(--radius)' />
                    {query !== '' && (
                      <Button size='icon-xs' variant='ghost' aria-label='Clear filter' onClick={() => setQuery('')}>
                        <XIcon />
                      </Button>
                    )}
                  </>
                }
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder='Search components'
                className='w-full min-w-0 max-w-28 sm:max-w-60'
              />
              <Separator orientation='vertical' className='h-[calc(100%-var(--spacing)*8)]' />
              <div className='flex flex-row items-center gap-2'>
                <div className='hidden text-xs text-muted-foreground sm:block'>View as:</div>
                <TabsList variant='filled' width='hug' aria-label='Guidance audience' className='shrink-0'>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger
                        render={
                          <TabsTab
                            value='designer'
                            render={
                              <Button size='icon' variant='ghost'>
                                <PaletteIcon />
                              </Button>
                            }
                          />
                        }
                        aria-label='Designer'
                      />
                      <TooltipPortal>
                        <TooltipPositioner sideOffset={8}>
                          <TooltipPopup>
                            Designer
                            <TooltipArrow />
                          </TooltipPopup>
                        </TooltipPositioner>
                      </TooltipPortal>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger
                        render={
                          <TabsTab
                            value='developer'
                            render={
                              <Button size='icon' variant='ghost'>
                                <CodeIcon />
                              </Button>
                            }
                          />
                        }
                        aria-label='Developer'
                      />
                      <TooltipPortal>
                        <TooltipPositioner sideOffset={8}>
                          <TooltipPopup>
                            Developer
                            <TooltipArrow />
                          </TooltipPopup>
                        </TooltipPositioner>
                      </TooltipPortal>
                    </Tooltip>
                  </TooltipProvider>
                </TabsList>
              </div>
            </>
          )}
          {view === 'showcase' && (
            <div className='flex flex-row items-center gap-2'>
              <div className='hidden text-xs text-muted-foreground sm:block'>Show:</div>
              <TabsList variant='filled' width='hug' aria-label='Showcase view' className='shrink-0'>
                {SHOWCASE_PANELS.map(([panel, index, label]) => (
                  <TooltipProvider key={panel}>
                    <Tooltip>
                      <TooltipTrigger
                        render={
                          <TabsTab value={panel} aria-label={`${index} ${label}`} className='font-mono'>
                            {index}
                          </TabsTab>
                        }
                      />
                      <TooltipPortal>
                        <TooltipPositioner sideOffset={8}>
                          <TooltipPopup>
                            {label}
                            <TooltipArrow />
                          </TooltipPopup>
                        </TooltipPositioner>
                      </TooltipPortal>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </TabsList>
            </div>
          )}
          <Button onClick={() => setDark((d) => !d)} aria-label='Toggle theme' size='icon' variant='outline'>
            {dark ? <SunIcon className='size-4' /> : <MoonIcon className='size-4' />}
          </Button>
        </header>
        <main className='min-w-0 flex-1'>
          <TabsPanel value='designer' className='min-w-0 outline-none'>
            {renderViewContent('designer')}
          </TabsPanel>
          <TabsPanel value='developer' className='min-w-0 outline-none'>
            {renderViewContent('developer')}
          </TabsPanel>
          <TabsPanel value='overview' className='min-w-0 outline-none bg-muted'>
            {renderShowcasePanel('overview')}
          </TabsPanel>
          <TabsPanel value='dashboard' className='min-w-0 outline-none'>
            {renderShowcasePanel('dashboard')}
          </TabsPanel>
        </main>
      </Tabs>
      <CommandDialog open={commandOpen} onOpenChange={setCommandOpen}>
        <CommandInput value={commandQuery} onValueChange={setCommandQuery} placeholder='Search components...' />
        <CommandList>
          <CommandEmpty>No components found.</CommandEmpty>
          {GROUP_ORDER.map((group) => {
            const items = demos.filter(
              (demo) =>
                demo.group === group &&
                `${demo.title} ${demo.id} ${demo.description}`.toLowerCase().includes(commandQuery.toLowerCase())
            )
            if (!items.length) return null
            return (
              <CommandGroup key={group} heading={group}>
                {items.map((demo) => (
                  <CommandItem
                    key={demo.id}
                    value={`${demo.title} ${demo.id}`}
                    onSelect={() => {
                      setQuery('')
                      setCommandOpen(false)
                      navigateToComponent(demo.id)
                    }}
                  >
                    {demo.title}
                  </CommandItem>
                ))}
              </CommandGroup>
            )
          })}
        </CommandList>
      </CommandDialog>
    </SidebarProvider>
  )
}
