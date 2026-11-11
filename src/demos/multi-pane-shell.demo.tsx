import { useState } from 'react'
import {
  TrayIcon,
  PaperPlaneTiltIcon,
  ClockCounterClockwiseIcon,
  CheckCircleIcon,
  DotsThreeVerticalIcon,
  PaperclipIcon
} from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Search } from '@/components/ui/search'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuBadge
} from '@/components/ui/sidebar'
import type { DemoMeta } from '@/showcase/demo'

export function MultiPaneShellMock() {
  const [selectedFolder, setSelectedFolder] = useState('inbox')
  const [selectedTicketId, setSelectedTicketId] = useState('INV-2026-001')

  const folders = [
    { id: 'inbox', label: 'Open Invoices', count: '14', icon: TrayIcon },
    { id: 'review', label: 'Pending Review', count: '3', icon: ClockCounterClockwiseIcon },
    { id: 'sent', label: 'Dispatched', icon: PaperPlaneTiltIcon },
    { id: 'paid', label: 'Reconciled', icon: CheckCircleIcon }
  ]

  const items = [
    {
      id: 'INV-2026-001',
      title: 'Invoice #INV-2026-001 discrepancy',
      customer: 'Acme Corp',
      amount: '$18,500.00',
      status: 'Paid',
      statusType: 'success' as const,
      time: '12m ago',
      priority: 'High'
    },
    {
      id: 'INV-2026-002',
      title: 'Subscription renewal - Global license',
      customer: 'Globex Ltd',
      amount: '$42,000.00',
      status: 'Pending',
      statusType: 'warning' as const,
      time: '1h ago',
      priority: 'Urgent'
    },
    {
      id: 'INV-2026-003',
      title: 'Late fee dispute and tax calculation',
      customer: 'Initech Systems',
      amount: '$6,420.00',
      status: 'Under Audit',
      statusType: 'outline' as const,
      time: '3h ago',
      priority: 'Normal'
    }
  ]

  const activeItem = items.find((i) => i.id === selectedTicketId) ?? items[0]

  return (
    <div className='flex h-[420px] w-full flex-col overflow-hidden rounded-(--radius) border border-border bg-background text-xs shadow-xs'>
      {/* Top Header: Global Search */}
      <header className='flex h-11 shrink-0 items-center justify-between border-b border-border bg-card px-3'>
        <div className='flex items-center gap-2'>
          <div className='flex size-6 items-center justify-center rounded-(--radius) bg-primary text-primary-foreground font-bold'>
            IN
          </div>
          <span className='font-bold text-foreground'>Invoice Desk</span>
        </div>

        <div className='w-72'>
          <Search size='sm' placeholder='Search invoice #, customer ID, or tag...' className='h-7 text-xs' />
        </div>

        <div className='flex items-center gap-2'>
          <Avatar size='xs'>
            <AvatarFallback className='text-[10px]'>AS</AvatarFallback>
          </Avatar>
        </div>
      </header>

      {/* 3-Column Body in pure flex flow */}
      <div className='relative flex flex-1 overflow-hidden min-h-0'>
        {/* Column 1: Navigation / Folders */}
        <aside className='w-44 shrink-0 border-r border-border bg-sidebar/40 text-xs flex flex-col overflow-y-auto'>
          <SidebarContent className='p-2'>
            <SidebarGroup className='p-0'>
              <SidebarGroupLabel className='text-xs sub-heading px-2'>Queues</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {folders.map((folder) => {
                    const Icon = folder.icon
                    const isCurrent = selectedFolder === folder.id
                    return (
                      <SidebarMenuItem key={folder.id}>
                        <SidebarMenuButton
                          isActive={isCurrent}
                          onClick={() => setSelectedFolder(folder.id)}
                          className='text-xs'
                        >
                          <Icon className='size-3.5' />
                          <span>{folder.label}</span>
                        </SidebarMenuButton>
                        {folder.count && <SidebarMenuBadge className='text-[10px]'>{folder.count}</SidebarMenuBadge>}
                      </SidebarMenuItem>
                    )
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </aside>

        {/* Column 2: Master List */}
        <section className='w-64 shrink-0 border-r border-border bg-card/40 flex flex-col overflow-hidden'>
          <div className='flex h-8 shrink-0 items-center justify-between border-b border-border/70 px-3 text-[11px] font-medium text-muted-foreground'>
            <span className='text-xs sub-heading'>Items ({items.length})</span>
            <span>Sorted by Recent</span>
          </div>

          <div className='flex-1 divide-y divide-border/40 overflow-y-auto'>
            {items.map((item) => {
              const isSelected = selectedTicketId === item.id
              return (
                <div
                  key={item.id}
                  role='button'
                  tabIndex={0}
                  onClick={() => setSelectedTicketId(item.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      setSelectedTicketId(item.id)
                    }
                  }}
                  className={`cursor-pointer p-3 transition-colors outline-hidden focus-visible:bg-accent/40 ${
                    isSelected ? 'border-l-2 border-primary bg-accent/60' : 'hover:bg-muted/30'
                  }`}
                >
                  <div className='flex items-center justify-between'>
                    <span className='font-mono font-bold text-foreground text-xs'>{item.id}</span>
                    <span className='text-[10px] text-muted-foreground'>{item.time}</span>
                  </div>
                  <p className='mt-1 line-clamp-1 font-medium text-foreground text-xs'>{item.title}</p>
                  <div className='mt-2 flex items-center justify-between text-xs'>
                    <span className='text-muted-foreground'>{item.customer}</span>
                    <Badge size='sm' count={item.status} status={item.statusType} />
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Column 3: Detail Inspection Pane */}
        <main className='flex flex-1 flex-col overflow-y-auto bg-background p-4 space-y-3.5'>
          {/* Detail Toolbar */}
          <div className='flex items-start justify-between border-b border-border pb-3'>
            <div>
              <div className='flex items-center gap-2'>
                <h3 className='text-sm font-bold text-foreground'>{activeItem.title}</h3>
                <Badge
                  size='sm'
                  count={activeItem.priority}
                  status={activeItem.priority === 'Urgent' ? 'error' : 'outline'}
                />
              </div>
              <p className='mt-0.5 text-xs text-muted-foreground'>
                Account: <span className='font-medium text-foreground'>{activeItem.customer}</span> · Created{' '}
                {activeItem.time}
              </p>
            </div>

            <div className='flex items-center gap-1.5'>
              <Button size='sm' variant='outline' className='h-7 px-2 text-xs'>
                Approve
              </Button>
              <Button size='icon-xs' variant='ghost' aria-label='More options'>
                <DotsThreeVerticalIcon className='size-4' />
              </Button>
            </div>
          </div>

          {/* Account Metadata Card */}
          <div className='grid grid-cols-2 gap-3 rounded-(--radius) border border-border bg-card p-3'>
            <div>
              <div className='text-xs sub-heading text-muted-foreground'>Billed Amount</div>
              <div className='mt-1 text-base font-bold text-foreground'>{activeItem.amount}</div>
            </div>
            <div>
              <div className='text-xs sub-heading text-muted-foreground'>Audit Status</div>
              <div className='mt-1'>
                <Badge size='sm' count={activeItem.status} status={activeItem.statusType} />
              </div>
            </div>
            <div className='col-span-2 space-y-1 border-t border-border/60 pt-2 text-[11px]'>
              <div>
                <span className='text-muted-foreground'>Tax ID:</span> US-9482104-X
              </div>
              <div>
                <span className='text-muted-foreground'>Payment Terms:</span> Net 30 (ACH)
              </div>
              <div>
                <span className='text-muted-foreground'>Billing Contact:</span> billing@acme.com
              </div>
            </div>
          </div>

          {/* Itemized Line Items & Billing */}
          <div className='rounded-(--radius) border border-border bg-card p-3'>
            <div className='flex items-center justify-between mb-2'>
              <div className='text-xs sub-heading text-muted-foreground'>Line Items &amp; Billing</div>
              <Button size='sm' variant='outline' className='h-6 gap-1 px-2 text-[10px]'>
                <PaperclipIcon className='size-3' />
                PDF Receipt
              </Button>
            </div>
            <div className='space-y-1.5 text-xs'>
              <div className='flex justify-between py-1 border-b border-border/40'>
                <span>1. Enterprise Cloud Subscription (Annual)</span>
                <span className='font-semibold'>$15,000.00</span>
              </div>
              <div className='flex justify-between py-1 border-b border-border/40'>
                <span>2. Premium Support Tier (24/7 Response)</span>
                <span className='font-semibold'>$3,500.00</span>
              </div>
              <div className='flex justify-between pt-1 font-bold text-foreground'>
                <span>Total Reconciled</span>
                <span>{activeItem.amount}</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export const demo: DemoMeta = {
  id: 'multi-pane-shell',
  title: 'Multi-Pane / Three-Column Shell',
  description:
    'Three-column master-detail layout enabling rapid triage, search, and deep inspection without page context loss.',
  group: 'UI shell',
  variants: [
    {
      name: 'Default',
      render: () => <MultiPaneShellMock />
    }
  ]
}
