import { useState } from 'react'
import {
  HouseIcon,
  TrendUpIcon,
  UsersIcon,
  ReceiptIcon,
  GearSixIcon,
  BellIcon,
  QuestionIcon,
  PlusIcon,
  FunnelIcon,
  CheckCircleIcon,
  ClockIcon,
  CaretLeftIcon,
  CaretRightIcon
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
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuBadge
} from '@/components/ui/sidebar'
import { Meter, MeterTrack, MeterIndicator } from '@/components/ui/meter'
import { DataTable, type DataTableColumnDef } from '@/components/ui/data-table'
import type { DemoMeta } from '@/showcase/demo'

type Deal = {
  name: string
  value: string
  stage: string
  status: 'warning' | 'default' | 'success' | 'outline'
}

const dealColumns: DataTableColumnDef<Deal>[] = [
  {
    accessorKey: 'name',
    header: 'Opportunity',
    cell: ({ row }) => <span className='font-medium text-foreground'>{row.original.name}</span>
  },
  {
    accessorKey: 'value',
    header: 'Value',
    cell: ({ row }) => <span className='text-muted-foreground'>{row.original.value}</span>
  },
  {
    accessorKey: 'stage',
    header: 'Stage',
    cell: ({ row }) => <Badge size='sm' count={row.original.stage} status={row.original.status} />
  }
]

export function LeftNavShellMock() {
  const [collapsed, setCollapsed] = useState(false)
  const [activeItem, setActiveItem] = useState('deals')

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: HouseIcon },
    { id: 'deals', label: 'Sales & Deals', icon: TrendUpIcon, count: '14' },
    { id: 'accounts', label: 'Accounts', icon: UsersIcon },
    { id: 'invoices', label: 'Invoices', icon: ReceiptIcon },
    { id: 'settings', label: 'Settings', icon: GearSixIcon }
  ]

  const deals: Deal[] = [
    { name: 'Acme Cloud Migration', value: '$120,000', stage: 'In Review', status: 'warning' },
    { name: 'Globex Security Rollout', value: '$85,000', stage: 'Negotiation', status: 'default' },
    { name: 'Stark Industries SLA', value: '$240,000', stage: 'Closed Won', status: 'success' },
    { name: 'Wayne Systems Expansion', value: '$60,000', stage: 'Proposal Sent', status: 'outline' }
  ]

  return (
    <div className='flex h-[420px] w-full flex-col overflow-hidden rounded-(--radius) border border-border bg-background text-xs shadow-xs'>
      {/* Top Header */}
      <header className='flex h-11 shrink-0 items-center justify-between border-b border-border bg-card px-3'>
        <div className='flex items-center gap-2'>
          <div className='flex size-6 items-center justify-center rounded-(--radius) bg-primary text-[11px] font-bold text-primary-foreground'>
            ST
          </div>
          <span className='font-semibold text-foreground'>SkyTrack CRM</span>
          <Badge size='sm' count='Enterprise' status='outline' className='ml-1 hidden sm:inline-flex' />
        </div>

        <div className='flex max-w-64 flex-1 items-center px-2'>
          <Search
            size='sm'
            placeholder='Search deals, accounts...'
            className='h-7 w-full text-xs'
          />
        </div>

        <div className='flex items-center gap-1.5'>
          <Button size='icon-xs' variant='ghost' aria-label='Notifications'>
            <BellIcon className='size-4' />
          </Button>
          <Button size='icon-xs' variant='ghost' aria-label='Help'>
            <QuestionIcon className='size-4' />
          </Button>
          <div className='ml-1 flex items-center gap-1.5 border-l border-border pl-2'>
            <Avatar size='xs'>
              <AvatarFallback className='text-[10px]'>AV</AvatarFallback>
            </Avatar>
            <span className='hidden text-xs font-medium sm:inline-block'>Alex Vance</span>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <div className='relative flex flex-1 overflow-hidden min-h-0'>
        {/* Bounded in-flow Left Navigation */}
        <aside
          className={`flex flex-col border-r border-border bg-sidebar/50 transition-all duration-200 shrink-0 ${
            collapsed ? 'w-14' : 'w-48'
          }`}
        >
          <SidebarHeader className='flex flex-row items-center justify-between p-2 border-b border-border'>
            {!collapsed && <span className='text-xs sub-heading truncate'>Navigation</span>}
            <Button
              size='icon-xs'
              variant='ghost'
              onClick={() => setCollapsed(!collapsed)}
              aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              className='size-6 ml-auto'
            >
              {collapsed ? <CaretRightIcon className='size-3.5' /> : <CaretLeftIcon className='size-3.5' />}
            </Button>
          </SidebarHeader>
          <SidebarContent className='p-1.5'>
            <SidebarGroup className='p-0'>
              {!collapsed && <SidebarGroupLabel className='text-xs sub-heading px-2'>Main Menu</SidebarGroupLabel>}
              <SidebarGroupContent>
                <SidebarMenu>
                  {navItems.map((item) => {
                    const Icon = item.icon
                    const isCurrent = activeItem === item.id
                    return (
                      <SidebarMenuItem key={item.id}>
                        <SidebarMenuButton
                          isActive={isCurrent}
                          onClick={() => setActiveItem(item.id)}
                          tooltip={collapsed ? item.label : undefined}
                          className={`text-xs ${collapsed ? 'justify-center px-0' : ''}`}
                        >
                          <Icon className='size-4 shrink-0' />
                          {!collapsed && <span className='truncate'>{item.label}</span>}
                        </SidebarMenuButton>
                        {!collapsed && item.count && (
                          <SidebarMenuBadge className='text-[10px]'>{item.count}</SidebarMenuBadge>
                        )}
                      </SidebarMenuItem>
                    )
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </aside>

        {/* Workspace Content Area */}
        <main className='flex flex-1 flex-col min-w-0 overflow-hidden bg-background'>
          {/* Breadcrumb & Action Bar */}
          <div className='flex h-9 shrink-0 items-center justify-between border-b border-border/70 bg-card/40 px-3.5'>
            <Breadcrumb>
              <BreadcrumbList className='text-xs'>
                <BreadcrumbItem>
                  <BreadcrumbLink href='#'>Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href='#'>Sales</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Active Deals</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className='flex items-center gap-2'>
              <Button size='sm' variant='outline' className='h-6 gap-1 px-2 text-xs'>
                <FunnelIcon className='size-3' />
                Filter
              </Button>
              <Button size='sm' className='h-6 gap-1 px-2 text-xs'>
                <PlusIcon className='size-3' />
                New Deal
              </Button>
            </div>
          </div>

          {/* Grid Content */}
          <div className='grid flex-1 grid-cols-1 gap-3 overflow-y-auto p-3 lg:grid-cols-3'>
            {/* Left 2 Cols: Data Table */}
            <div className='flex flex-col rounded-(--radius) border border-border bg-card p-3 lg:col-span-2 overflow-hidden'>
              <DataTable
                columns={dealColumns}
                data={deals}
                size='xs'
                renderSearch={() => (
                  <div className='flex items-center justify-between w-full'>
                    <h4 className='text-xs font-semibold sub-heading'>Pipeline Opportunities</h4>
                    <span className='text-[11px] text-muted-foreground'>Showing 4 of 14</span>
                  </div>
                )}
                renderColumnVisibility={() => null}
                renderPagination={() => null}
                className='gap-2.5'
              />
            </div>

            {/* Right 1 Col: Analytics Widget */}
            <div className='flex flex-col justify-between rounded-(--radius) border border-border bg-card p-3'>
              <div>
                <div className='flex items-center justify-between'>
                  <h4 className='text-xs font-semibold sub-heading'>Quarter Target</h4>
                  <Badge size='sm' count='84%' status='success' />
                </div>
                <div className='mt-3'>
                  <div className='text-lg font-bold text-foreground'>$505,000</div>
                  <p className='text-[11px] text-muted-foreground'>Goal: $600,000 (18 days remaining)</p>
                </div>
                <div className='mt-2.5'>
                  <Meter value={84} className='w-full grid-cols-1 gap-y-0'>
                    <MeterTrack className='h-2 rounded-(--radius) overflow-hidden bg-muted'>
                      <MeterIndicator className='rounded-(--radius) bg-primary' />
                    </MeterTrack>
                  </Meter>
                </div>
              </div>

              <div className='mt-4 rounded-(--radius) border border-border/60 bg-muted/20 p-2 text-xs'>
                <div className='flex items-center gap-1.5 font-medium text-success'>
                  <CheckCircleIcon className='size-3.5' />
                  <span>Win Rate: 68.4%</span>
                </div>
                <span className='text-muted-foreground'>+4.2% increase compared to last month</span>
              </div>
            </div>
          </div>

          {/* Minimal Status Bar / Footer */}
          <footer className='flex h-6 shrink-0 items-center justify-between border-t border-border bg-muted/30 px-3 text-[10px] text-muted-foreground'>
            <div className='flex items-center gap-1.5'>
              <Badge dot status='success' />
              <span>Connected · US-East Gateway (24ms)</span>
            </div>
            <div className='flex items-center gap-1'>
              <ClockIcon className='size-3' />
              <span>Synced just now · v2026.4</span>
            </div>
          </footer>
        </main>
      </div>
    </div>
  )
}

export const demo: DemoMeta = {
  id: 'left-nav-shell',
  title: 'Left Navigation Shell',
  description: 'Fixed vertical left navigation optimized for deep enterprise CRM, ERP, and CMS hierarchies.',
  group: 'UI shell',
  variants: [
    {
      name: 'Default',
      render: () => <LeftNavShellMock />
    }
  ]
}
