import { useState } from 'react'
import {
  ChartLineUpIcon,
  DownloadSimpleIcon,
  FunnelIcon,
  BellIcon,
  CalendarBlankIcon,
  ArrowUpRightIcon
} from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Search } from '@/components/ui/search'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { Tabs, TabsList, TabsTab } from '@/components/ui/tabs'
import { DataTable, type DataTableColumnDef } from '@/components/ui/data-table'
import type { DemoMeta } from '@/showcase/demo'

type Segment = {
  segment: string
  target: string
  actual: string
  progress: string
  status: 'success' | 'warning'
}

const segmentColumns: DataTableColumnDef<Segment>[] = [
  {
    accessorKey: 'segment',
    header: 'Segment',
    cell: ({ row }) => <span className='font-medium text-foreground'>{row.original.segment}</span>
  },
  {
    accessorKey: 'target',
    header: 'Q4 Target',
    cell: ({ row }) => <span className='text-muted-foreground'>{row.original.target}</span>
  },
  {
    accessorKey: 'actual',
    header: 'Actual Revenue',
    cell: ({ row }) => <span className='font-medium text-foreground'>{row.original.actual}</span>
  },
  {
    accessorKey: 'progress',
    header: 'Attainment',
    cell: ({ row }) => <Badge size='sm' count={row.original.progress} status={row.original.status} />
  }
]

export function TopNavShellMock() {
  const [activeTab, setActiveTab] = useState('revenue')

  const navLinks = [
    { id: 'overview', label: 'Overview' },
    { id: 'revenue', label: 'Revenue Report' },
    { id: 'cohorts', label: 'Cohorts' },
    { id: 'funnels', label: 'Conversion' },
    { id: 'integrations', label: 'Integrations' }
  ]

  const segmentRows: Segment[] = [
    { segment: 'Enterprise Tier', target: '$650,000', actual: '$712,400', progress: '109%', status: 'success' },
    { segment: 'Mid-Market Core', target: '$380,000', actual: '$395,100', progress: '104%', status: 'success' },
    { segment: 'SMB Self-Serve', target: '$220,000', actual: '$208,200', progress: '94%', status: 'warning' },
    { segment: 'Startup Pilot', target: '$50,000', actual: '$62,800', progress: '125%', status: 'success' }
  ]

  return (
    <div className='flex h-[420px] w-full flex-col overflow-hidden rounded-(--radius) border border-border bg-background text-xs shadow-xs'>
      {/* 1. Full-Width Top Navigation Bar */}
      <header className='flex h-12 shrink-0 items-center justify-between border-b border-border bg-card px-4'>
        <div className='flex items-center gap-6'>
          <div className='flex items-center gap-2'>
            <div className='flex size-6 items-center justify-center rounded-(--radius) bg-primary text-primary-foreground'>
              <ChartLineUpIcon className='size-4' />
            </div>
            <span className='font-bold text-foreground'>Metrix BI</span>
          </div>

          <div className='hidden md:block'>
            <Tabs value={activeTab} onValueChange={setActiveTab} className='w-auto'>
              <TabsList variant='line' size='sm' className='border-b-0 gap-1'>
                {navLinks.map((link) => (
                  <TabsTab key={link.id} value={link.id} className='text-xs px-2.5 py-1.5'>
                    {link.label}
                  </TabsTab>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>

        <div className='flex items-center gap-2'>
          <Search
            size='sm'
            placeholder='Search reports...'
            className='h-7 w-36 text-xs sm:w-48'
          />
          <Button size='icon-xs' variant='ghost' aria-label='Notifications'>
            <BellIcon className='size-4' />
          </Button>
          <Avatar size='xs'>
            <AvatarFallback className='text-[10px]'>MB</AvatarFallback>
          </Avatar>
        </div>
      </header>

      {/* 2. Breadcrumb / Action Bar */}
      <div className='flex h-10 shrink-0 items-center justify-between border-b border-border/70 bg-muted/20 px-4'>
        <Breadcrumb>
          <BreadcrumbList className='text-xs'>
            <BreadcrumbItem>
              <BreadcrumbLink href='#'>Analytics</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href='#'>Finance</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Revenue Report (Q4 2026)</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className='flex items-center gap-2'>
          <div className='hidden sm:flex items-center gap-1.5 rounded-(--radius) border border-border bg-card px-2 py-1 text-xs text-muted-foreground'>
            <CalendarBlankIcon className='size-3.5' />
            <span>Oct 1 – Dec 31, 2026</span>
          </div>
          <Button size='sm' variant='outline' className='h-7 gap-1.5 px-2.5 text-xs'>
            <FunnelIcon className='size-3.5' />
            Filters
          </Button>
          <Button size='sm' className='h-7 gap-1.5 px-2.5 text-xs'>
            <DownloadSimpleIcon className='size-3.5' />
            Export CSV
          </Button>
        </div>
      </div>

      {/* 3. Main Content Area (Full Width) */}
      <main className='flex-1 overflow-y-auto p-4 space-y-3.5 bg-background'>
        {/* KPI Summary Cards */}
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-3'>
          <div className='rounded-(--radius) border border-border bg-card p-3'>
            <div className='text-xs sub-heading text-muted-foreground'>Total ARR</div>
            <div className='flex items-baseline justify-between mt-1'>
              <span className='text-lg font-bold text-foreground'>$1,378,500</span>
              <span className='flex items-center gap-0.5 text-success font-semibold text-xs'>
                <ArrowUpRightIcon className='size-3' /> +18.4%
              </span>
            </div>
          </div>
          <div className='rounded-(--radius) border border-border bg-card p-3'>
            <div className='text-xs sub-heading text-muted-foreground'>Net Retention Rate (NDR)</div>
            <div className='flex items-baseline justify-between mt-1'>
              <span className='text-lg font-bold text-foreground'>118.2%</span>
              <Badge size='sm' count='Top Decile' status='success' />
            </div>
          </div>
          <div className='rounded-(--radius) border border-border bg-card p-3'>
            <div className='text-xs sub-heading text-muted-foreground'>Average Contract Value</div>
            <div className='flex items-baseline justify-between mt-1'>
              <span className='text-lg font-bold text-foreground'>$42,800</span>
              <span className='text-muted-foreground text-xs'>+8% YoY</span>
            </div>
          </div>
        </div>

        {/* Full-width Data Grid */}
        <div className='rounded-(--radius) border border-border bg-card p-3 overflow-hidden'>
          <DataTable
            columns={segmentColumns}
            data={segmentRows}
            size='xs'
            renderSearch={() => (
              <div className='flex items-center justify-between w-full'>
                <h4 className='text-xs font-semibold sub-heading'>Customer Segment Performance</h4>
                <span className='text-[11px] text-muted-foreground'>Updated 10m ago</span>
              </div>
            )}
            renderColumnVisibility={() => null}
            renderPagination={() => null}
            className='gap-2.5'
          />
        </div>
      </main>
    </div>
  )
}

export const demo: DemoMeta = {
  id: 'top-nav-shell',
  title: 'Top Navigation Shell',
  description: 'Full-width horizontal navigation for data-dense analytics dashboards, reporting suites, and wide grids.',
  group: 'UI shell',
  variants: [
    {
      name: 'Default',
      render: () => <TopNavShellMock />
    }
  ]
}
