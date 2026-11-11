import { useState } from 'react'
import {
  CloudIcon,
  CaretDownIcon,
  TerminalWindowIcon,
  QuestionIcon,
  BellIcon,
  CpuIcon,
  HardDrivesIcon,
  ShareNetworkIcon,
  ShieldCheckIcon,
  PlusIcon,
  ArrowClockwiseIcon,
  PlayIcon,
  TrashIcon
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
  SidebarMenuButton,
  SidebarMenuBadge
} from '@/components/ui/sidebar'
import { Tabs, TabsList, TabsTab } from '@/components/ui/tabs'
import { Meter, MeterTrack, MeterIndicator } from '@/components/ui/meter'
import { DataTable, type DataTableColumnDef } from '@/components/ui/data-table'
import type { DemoMeta } from '@/showcase/demo'

type VM = {
  id: string
  name: string
  zone: string
  type: string
  ip: string
  state: 'Running' | 'Stopped'
}

export function CombinedShellMock() {
  const [selectedModule, setSelectedModule] = useState('compute')
  const [selectedNav, setSelectedNav] = useState('vms')
  const [selectedVm, setSelectedVm] = useState('api-prod-01')

  const modules = [
    { id: 'compute', label: 'Compute Engine' },
    { id: 'storage', label: 'Cloud Storage' },
    { id: 'network', label: 'Virtual Networks' },
    { id: 'security', label: 'IAM & Security' }
  ]

  const computeNav = [
    { id: 'vms', label: 'Virtual Machines', count: '3', icon: CpuIcon },
    { id: 'disks', label: 'Disks & Volumes', icon: HardDrivesIcon },
    { id: 'load-balancers', label: 'Load Balancers', icon: ShareNetworkIcon },
    { id: 'security-groups', label: 'Security Groups', icon: ShieldCheckIcon }
  ]

  const vms: VM[] = [
    {
      id: 'api-prod-01',
      name: 'api-prod-01',
      zone: 'us-east-1a',
      type: 'c6g.xlarge',
      ip: '54.210.12.8',
      state: 'Running'
    },
    {
      id: 'worker-pool-04',
      name: 'worker-pool-04',
      zone: 'us-east-1b',
      type: 'm6i.large',
      ip: '54.210.14.90',
      state: 'Running'
    },
    {
      id: 'db-replica-02',
      name: 'db-replica-02',
      zone: 'us-east-1c',
      type: 'r6g.2xlarge',
      ip: '10.0.4.15',
      state: 'Stopped'
    }
  ]

  const activeVm = vms.find((v) => v.id === selectedVm) ?? vms[0]

  const vmColumns: DataTableColumnDef<VM>[] = [
    {
      accessorKey: 'name',
      header: 'Name',
      cell: ({ row }) => (
        <Button
          variant='link'
          size='sm'
          onClick={() => setSelectedVm(row.original.id)}
          className='h-auto p-0 font-mono text-xs font-semibold text-foreground hover:underline text-left'
        >
          {row.original.name}
        </Button>
      )
    },
    {
      accessorKey: 'zone',
      header: 'Zone',
      cell: ({ row }) => <span className='text-muted-foreground'>{row.original.zone}</span>
    },
    {
      accessorKey: 'state',
      header: 'State',
      cell: ({ row }) => (
        <div className='flex items-center gap-1.5'>
          <Badge dot status={row.original.state === 'Running' ? 'success' : 'outline'} />
          <span>{row.original.state}</span>
        </div>
      )
    },
    {
      accessorKey: 'ip',
      header: 'Public IP',
      cell: ({ row }) => <span className='font-mono text-xs text-muted-foreground'>{row.original.ip}</span>
    }
  ]

  return (
    <div className='flex h-[420px] w-full flex-col overflow-hidden rounded-(--radius) border border-border bg-background text-xs shadow-xs'>
      {/* 1. Global Strategic Topbar with App/Module Switcher */}
      <header className='flex h-11 shrink-0 items-center justify-between border-b border-border bg-card px-3'>
        <div className='flex items-center gap-3'>
          <div className='flex items-center gap-1.5'>
            <div className='flex size-6 items-center justify-center rounded-(--radius) bg-primary text-primary-foreground'>
              <CloudIcon className='size-4' />
            </div>
            <span className='font-bold text-foreground'>SkyCloud</span>
          </div>

          <div className='hidden sm:flex items-center gap-1 border-l border-border pl-3'>
            <Button size='sm' variant='ghost' className='h-7 gap-1 font-semibold text-foreground px-2 text-xs'>
              <span>Product Console</span>
              <CaretDownIcon className='size-3 text-muted-foreground' />
            </Button>
          </div>

          <div className='hidden md:block border-l border-border pl-2'>
            <Tabs value={selectedModule} onValueChange={setSelectedModule} className='w-auto'>
              <TabsList variant='pill' size='xs' className='gap-0.5'>
                {modules.map((m) => (
                  <TabsTab key={m.id} value={m.id} className='text-xs px-2 py-1'>
                    {m.label}
                  </TabsTab>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Global Tools */}
        <div className='flex items-center gap-2'>
          <div className='hidden sm:flex items-center gap-1 rounded-(--radius) border border-border px-2 py-1 text-[11px] text-muted-foreground'>
            <Badge dot status='success' />
            <span>us-east-1</span>
          </div>
          <Button size='icon-xs' variant='ghost' title='Cloud Shell' aria-label='Cloud Shell'>
            <TerminalWindowIcon className='size-4' />
          </Button>
          <Button size='icon-xs' variant='ghost' title='Documentation' aria-label='Documentation'>
            <QuestionIcon className='size-4' />
          </Button>
          <Button size='icon-xs' variant='ghost' title='Alerts' aria-label='Alerts'>
            <BellIcon className='size-4' />
          </Button>
          <Avatar size='xs'>
            <AvatarFallback className='text-[10px]'>SC</AvatarFallback>
          </Avatar>
        </div>
      </header>

      {/* 2. Lower Body: In-flow Contextual SubNav + Workspace & Detail Panel */}
      <div className='relative flex flex-1 overflow-hidden min-h-0'>
        {/* Left SubNav for Active Module */}
        <aside className='w-48 shrink-0 border-r border-border bg-sidebar/40 text-xs flex flex-col overflow-y-auto'>
          <SidebarContent className='p-2'>
            <SidebarGroup className='p-0'>
              <SidebarGroupLabel className='text-xs sub-heading px-2'>Compute Services</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {computeNav.map((item) => {
                    const Icon = item.icon
                    const isCurrent = selectedNav === item.id
                    return (
                      <SidebarMenuItem key={item.id}>
                        <SidebarMenuButton
                          isActive={isCurrent}
                          onClick={() => setSelectedNav(item.id)}
                          className='text-xs'
                        >
                          <Icon className='size-3.5' />
                          <span>{item.label}</span>
                        </SidebarMenuButton>
                        {item.count && <SidebarMenuBadge className='text-[10px]'>{item.count}</SidebarMenuBadge>}
                      </SidebarMenuItem>
                    )
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </aside>

        {/* Main Contextual Workspace Area */}
        <main className='flex flex-1 flex-col min-w-0 overflow-hidden bg-background'>
          {/* Workspace Action Header */}
          <div className='flex h-10 shrink-0 items-center justify-between border-b border-border/70 bg-card/40 px-3.5'>
            <div className='flex items-center gap-2'>
              <h4 className='text-xs font-semibold sub-heading'>Instances</h4>
              <Badge size='sm' count='3 registered' status='outline' />
            </div>
            <div className='flex items-center gap-1.5'>
              <Button size='sm' variant='outline' className='h-7 gap-1 px-2 text-xs'>
                <ArrowClockwiseIcon className='size-3' />
                Refresh
              </Button>
              <Button size='sm' className='h-7 gap-1 px-2 text-xs'>
                <PlusIcon className='size-3' />
                Launch Instance
              </Button>
            </div>
          </div>

          {/* 2-Panel Layout: Instances Grid + Contextual Detail Panel */}
          <div className='flex flex-1 gap-3 overflow-hidden p-3'>
            {/* Left: Instances Data Table */}
            <div className='flex flex-1 flex-col rounded-(--radius) border border-border bg-card overflow-hidden p-2'>
              <DataTable
                columns={vmColumns}
                data={vms}
                size='xs'
                renderSearch={() => null}
                renderColumnVisibility={() => null}
                renderPagination={() => null}
                className='gap-0'
              />
            </div>

            {/* Right: Detail View Panel */}
            <div className='w-56 shrink-0 rounded-(--radius) border border-border bg-card p-3 flex flex-col justify-between overflow-y-auto'>
              <div className='space-y-3'>
                <div className='border-b border-border pb-2'>
                  <div className='text-xs sub-heading text-muted-foreground'>Inspector</div>
                  <div className='font-mono font-bold text-foreground truncate mt-0.5'>{activeVm.name}</div>
                  <Badge
                    size='sm'
                    count={activeVm.state}
                    status={activeVm.state === 'Running' ? 'success' : 'outline'}
                    className='mt-1'
                  />
                </div>

                <div className='space-y-2 text-xs'>
                  <div>
                    <span className='text-muted-foreground block text-[10px]'>Instance Specs</span>
                    <span className='font-medium text-foreground'>{activeVm.type} (4 vCPU / 16GB)</span>
                  </div>
                  <div>
                    <span className='text-muted-foreground block text-[10px]'>CPU Utilization</span>
                    <Meter value={38} className='w-full grid-cols-1 gap-y-0 mt-1'>
                      <MeterTrack className='h-1.5 rounded-(--radius) overflow-hidden bg-muted'>
                        <MeterIndicator className='rounded-(--radius) bg-primary' />
                      </MeterTrack>
                    </Meter>
                    <span className='text-[10px] text-muted-foreground mt-0.5 block'>38% average</span>
                  </div>
                  <div>
                    <span className='text-muted-foreground block text-[10px]'>Security Group</span>
                    <span className='font-mono text-[10px] text-foreground'>sg-web-public (80/443)</span>
                  </div>
                </div>
              </div>

              <div className='pt-3 border-t border-border flex items-center gap-1.5'>
                <Button size='sm' variant='outline' className='h-6 flex-1 gap-1 text-[10px]'>
                  <PlayIcon className='size-3' />
                  Reboot
                </Button>
                <Button size='sm' variant='ghost' className='h-6 px-2 text-destructive' aria-label='Terminate'>
                  <TrashIcon className='size-3' />
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export const demo: DemoMeta = {
  id: 'combined-shell',
  title: 'Combined / Hybrid Shell',
  description:
    'Hybrid top-and-left shell separating macro strategic suite switcher from module-level tactical navigation.',
  group: 'UI shell',
  variants: [
    {
      name: 'Default',
      render: () => <CombinedShellMock />
    }
  ]
}
