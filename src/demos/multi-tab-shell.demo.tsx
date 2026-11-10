import { useState } from 'react'
import {
  BuildingsIcon,
  HouseIcon,
  XIcon,
  PlusIcon,
  FileTextIcon,
  PackageIcon,
  TruckIcon,
  CurrencyDollarIcon,
  PencilSimpleIcon,
  ProhibitIcon,
  ReceiptIcon
} from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from '@/components/ui/sidebar'
import { Tabs, TabsList, TabsTab } from '@/components/ui/tabs'
import type { DemoMeta } from '@/showcase/demo'

export function MultiTabShellMock() {
  const [activeTabId, setActiveTabId] = useState('order-9912')
  const [activeSubNav, setActiveSubNav] = useState('overview')

  const [tabs, setTabs] = useState([
    { id: 'home', label: 'Dashboard', icon: HouseIcon, closable: false },
    { id: 'cust-8839', label: 'Cust #8839 (Stark)', closable: true },
    { id: 'order-9912', label: 'Order #9912 (Acme)', closable: true }
  ])

  const subNavs = [
    { id: 'overview', label: 'Order Overview', icon: FileTextIcon },
    { id: 'items', label: 'Line Items (8)', icon: PackageIcon },
    { id: 'shipping', label: 'Fulfillment & Freight', icon: TruckIcon },
    { id: 'billing', label: 'Invoice & Escrow', icon: CurrencyDollarIcon }
  ]

  const closeTab = (e: React.MouseEvent, id: string) => {
    e.stopPropagation()
    const filtered = tabs.filter((t) => t.id !== id)
    setTabs(filtered)
    if (activeTabId === id && filtered.length > 0) {
      setActiveTabId(filtered[filtered.length - 1].id)
    }
  }

  return (
    <div className='flex h-[420px] w-full flex-col overflow-hidden rounded-(--radius) border border-border bg-background text-xs shadow-xs'>
      {/* 1. Global Header */}
      <header className='flex h-11 shrink-0 items-center justify-between border-b border-border bg-card px-3'>
        <div className='flex items-center gap-2'>
          <div className='flex size-6 items-center justify-center rounded-(--radius) bg-primary text-primary-foreground'>
            <BuildingsIcon className='size-4' />
          </div>
          <span className='font-bold text-foreground'>Core Banking &amp; ERP</span>
          <Badge size='sm' count='PROD-CLUSTER' status='success' className='ml-1 hidden sm:inline-flex' />
        </div>

        <div className='flex items-center gap-2'>
          <span className='text-[11px] text-muted-foreground'>Entity: North America HQ</span>
          <Avatar size='xs'>
            <AvatarFallback className='text-[10px]'>OP</AvatarFallback>
          </Avatar>
        </div>
      </header>

      {/* 2. In-App Tab Bar */}
      <div className='flex h-8 shrink-0 items-center gap-1 border-b border-border bg-muted/40 px-2 overflow-x-auto'>
        <Tabs value={activeTabId} onValueChange={(val) => setActiveTabId(String(val))} className='w-auto'>
          <TabsList variant='filled' size='xs' className='gap-1 bg-transparent p-0'>
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <TabsTab
                  key={tab.id}
                  value={tab.id}
                  className='h-7 gap-1.5 rounded-t-(--radius) rounded-b-none border-t border-x border-border/50 px-2.5 text-xs font-medium data-active:border-primary data-active:bg-background data-active:text-foreground'
                >
                  {Icon && <Icon className='size-3.5' />}
                  <span>{tab.label}</span>
                  {tab.closable && (
                    <Button
                      size='icon-xs'
                      variant='ghost'
                      onClick={(e) => closeTab(e, tab.id)}
                      aria-label={`Close ${tab.label}`}
                      className='ml-1 size-4 p-0 text-muted-foreground hover:text-foreground'
                    >
                      <XIcon className='size-2.5' />
                    </Button>
                  )}
                </TabsTab>
              )
            })}
          </TabsList>
        </Tabs>

        <Button
          size='icon-xs'
          variant='ghost'
          onClick={() => {
            const nextId = `order-${Math.floor(1000 + Math.random() * 9000)}`
            setTabs([...tabs, { id: nextId, label: `Order #${nextId.slice(6)}`, closable: true }])
            setActiveTabId(nextId)
          }}
          title='Open new tab'
          aria-label='Open new tab'
          className='size-6 p-0'
        >
          <PlusIcon className='size-3' />
        </Button>
      </div>

      {/* 3. Tab Body with Contextual Sub-Nav & Tab Content */}
      <div className='relative flex flex-1 overflow-hidden min-h-0'>
        {/* Contextual SideNav for Active Tab */}
        <aside className='w-44 shrink-0 border-r border-border bg-sidebar/30 text-xs flex flex-col overflow-y-auto'>
          <SidebarContent className='p-2'>
            <SidebarGroup className='p-0'>
              <SidebarGroupLabel className='text-xs sub-heading px-2'>Record Sections</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {subNavs.map((sub) => {
                    const Icon = sub.icon
                    const isCurrent = activeSubNav === sub.id
                    return (
                      <SidebarMenuItem key={sub.id}>
                        <SidebarMenuButton
                          isActive={isCurrent}
                          onClick={() => setActiveSubNav(sub.id)}
                          className='text-xs'
                        >
                          <Icon className='size-3.5' />
                          <span>{sub.label}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    )
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </aside>

        {/* Tab Content Panel */}
        <main className='flex flex-1 flex-col overflow-y-auto bg-background p-4 space-y-3.5'>
          {/* Action Header */}
          <div className='flex items-start justify-between border-b border-border pb-3'>
            <div>
              <div className='flex items-center gap-2'>
                <h3 className='text-sm font-bold text-foreground'>Order #9912 Details</h3>
                <Badge size='sm' count='Processing' status='default' />
              </div>
              <div className='mt-1 flex items-center gap-3 text-xs text-muted-foreground'>
                <span>Customer: <strong className='text-foreground'>Acme Corp</strong></span>
                <span>•</span>
                <span>Order Total: <strong className='text-foreground'>$45,000.00 USD</strong></span>
              </div>
            </div>

            <div className='flex items-center gap-1.5'>
              <Button size='sm' variant='outline' className='h-7 gap-1 px-2.5 text-xs'>
                <PencilSimpleIcon className='size-3' />
                Edit Order
              </Button>
              <Button size='sm' variant='outline' className='h-7 gap-1 px-2.5 text-xs text-destructive'>
                <ProhibitIcon className='size-3' />
                Cancel
              </Button>
              <Button size='sm' className='h-7 gap-1 px-2.5 text-xs'>
                <ReceiptIcon className='size-3' />
                Generate Invoice
              </Button>
            </div>
          </div>

          {/* Details Overview Grid */}
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
            <div className='rounded-(--radius) border border-border bg-card p-3 space-y-1.5'>
              <div className='text-xs sub-heading text-muted-foreground'>Fulfillment Information</div>
              <div className='text-xs'><span className='text-muted-foreground'>Carrier:</span> FedEx Freight Express</div>
              <div className='text-xs'><span className='text-muted-foreground'>Tracking Number:</span> 7849-2910-4491</div>
              <div className='text-xs'><span className='text-muted-foreground'>Estimated Delivery:</span> Nov 14, 2026</div>
            </div>

            <div className='rounded-(--radius) border border-border bg-card p-3 space-y-1.5'>
              <div className='text-xs sub-heading text-muted-foreground'>Financial Terms</div>
              <div className='text-xs'><span className='text-muted-foreground'>Payment Method:</span> Wire Transfer (Net 30)</div>
              <div className='text-xs'><span className='text-muted-foreground'>Escrow ID:</span> ESC-2026-99120</div>
              <div className='text-xs'><span className='text-muted-foreground'>Ledger Account:</span> 1010-Accounts-Receivable</div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export const demo: DemoMeta = {
  id: 'multi-tab-shell',
  title: 'Multi-Tabbed Shell',
  description: 'In-app tabbed workspace supporting intensive multitasking across multiple documents without state loss.',
  group: 'UI shell',
  variants: [
    {
      name: 'Default',
      render: () => <MultiTabShellMock />
    }
  ]
}
