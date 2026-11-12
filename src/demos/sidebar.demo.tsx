import {
  HouseIcon,
  LifebuoyIcon,
  PlusIcon,
  RocketLaunchIcon,
  CaretUpDownIcon,
  GearSixIcon,
  SquaresFourIcon,
  UsersThreeIcon
} from '@phosphor-icons/react'
import skytrackLogo from '../../public/skytrack-logo-full.svg?raw'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Menu,
  MenuGroup,
  MenuGroupLabel,
  MenuItem,
  MenuPopup,
  MenuPortal,
  MenuPositioner,
  MenuSeparator,
  MenuTrigger
} from '@/components/ui/menu'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger
} from '@/components/ui/sidebar'
import type { DemoMeta } from '@/showcase/demo'

const WORKSPACE_ITEMS = [
  { label: 'Overview', icon: HouseIcon, active: true },
  { label: 'Missions', icon: RocketLaunchIcon, count: '4' },
  { label: 'Team', icon: UsersThreeIcon }
] as const

function WorkspaceSidebar({ variant = 'sidebar' }: { variant?: 'sidebar' | 'inset' }) {
  return (
    <Sidebar
      variant={variant}
      collapsible='icon'
      gapClassName='!h-full !min-h-0'
      containerClassName='!absolute !h-full'
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size='default'
              tooltip='SkyTrack workspace'
              aria-label='SkyTrack workspace'
              className='group-data-[icon-collapsed=true]/sidebar:p-0'
            >
              <span className='flex min-w-0 flex-1 flex-col items-start gap-0.5 group-data-[icon-collapsed=true]/sidebar:hidden'>
                <span
                  aria-hidden='true'
                  className='block h-5 [&>svg]:block [&>svg]:h-full [&>svg]:w-full'
                  dangerouslySetInnerHTML={{ __html: skytrackLogo }}
                />
              </span>
              <img
                src='/skytrack-logo-full.svg'
                alt=''
                className='hidden size-5 object-cover object-left group-data-[icon-collapsed=true]/sidebar:block'
              />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <div className='flex flex-row flex-wrap justify-between items-center gap-3'>
            <SidebarGroupLabel>Workspace</SidebarGroupLabel>
            <SidebarGroupAction className='shrink-0' aria-label='Add workspace item' title='Add workspace item'>
              <PlusIcon />
            </SidebarGroupAction>
          </div>
          <SidebarGroupContent>
            <SidebarMenu>
              {WORKSPACE_ITEMS.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton isActive={'active' in item && item.active} tooltip={item.label}>
                    <item.icon />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                  {'count' in item && item.count && (
                    <SidebarMenuBadge render={<Badge variant='outline' />}>{item.count}</SidebarMenuBadge>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Support</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip='Help center'>
                  <LifebuoyIcon />
                  <span>Help center</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip='Settings'>
                  <GearSixIcon />
                  <span>Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <Menu>
              <MenuTrigger render={<SidebarMenuButton tooltip='Account settings' />}>
                <Avatar size='sm'>
                  <AvatarFallback>TT</AvatarFallback>
                </Avatar>
                <span className='truncate'>Tuan Trinh</span>
                <Badge
                  variant='outline'
                  count='Pro'
                  className='ml-auto group-data-[icon-collapsed=true]/sidebar:hidden'
                  size='sm'
                />
                <CaretUpDownIcon className='group-data-[icon-collapsed=true]/sidebar:hidden' aria-hidden='true' />
              </MenuTrigger>
              <MenuPortal>
                <MenuPositioner side='top' align='end' sideOffset={6}>
                  <MenuPopup className='min-w-48'>
                    <MenuGroup>
                      <MenuGroupLabel>SkyTrack account</MenuGroupLabel>
                      <MenuItem>Profile</MenuItem>
                      <MenuItem>Account settings</MenuItem>
                      <MenuItem>Billing and plan</MenuItem>
                    </MenuGroup>
                    <MenuSeparator />
                    <MenuItem>Sign out</MenuItem>
                  </MenuPopup>
                </MenuPositioner>
              </MenuPortal>
            </Menu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

function SidebarExample() {
  return (
    <SidebarProvider className='relative h-112 min-h-0 w-full overflow-hidden border border-border'>
      <WorkspaceSidebar />
      <div className='w-full h-full min-h-0 min-w-0'>
        <header className='flex h-12 shrink-0 items-center gap-3 border-b border-border px-3'>
          <SidebarTrigger />
          <span className='text-sm font-medium'>Overview</span>
        </header>
        <div className='flex flex-1 flex-col gap-3 p-4'>
          <h3 className='text-lg font-medium'>Good afternoon, Tuan</h3>
          <p className='text-sm text-muted-foreground'>Your workspace navigation collapses to icons on desktop.</p>
          <Button className='self-start' size='sm' variant='outline'>
            <SquaresFourIcon />
            Browse missions
          </Button>
        </div>
      </div>
    </SidebarProvider>
  )
}

function ControlledExample() {
  return (
    <SidebarProvider defaultOpen={false} className='relative h-56 min-h-0 w-full overflow-hidden'>
      <Sidebar collapsible='icon' side='right' gapClassName='!h-full !min-h-0' containerClassName='!absolute !h-full'>
        <SidebarHeader>
          <SidebarTrigger className='self-start' />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Projects</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip='Flight plans'>
                    <RocketLaunchIcon />
                    <span>Flight plans</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset className='h-full min-h-0'>
        <header className='flex h-12 items-center gap-3 border-b border-border px-3'>
          <SidebarTrigger />
          <span className='text-sm'>Right side · icon collapse</span>
        </header>
      </SidebarInset>
    </SidebarProvider>
  )
}

function InsetExample() {
  return (
    <SidebarProvider className='relative h-112 min-h-0 w-full overflow-hidden'>
      <WorkspaceSidebar variant='inset' />
      <SidebarInset className='h-full min-h-0 min-w-0'>
        <header className='flex h-12 shrink-0 items-center gap-3 border-b border-border px-3'>
          <SidebarTrigger />
          <span className='text-sm font-medium'>Overview</span>
        </header>
        <div className='flex flex-1 flex-col gap-3 p-4'>
          <h3 className='text-lg font-medium'>Good afternoon, Tuan</h3>
          <p className='text-sm text-muted-foreground'>Your workspace navigation uses the inset variant.</p>
          <Button className='self-start' size='sm' variant='outline'>
            <SquaresFourIcon />
            Browse missions
          </Button>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export const demo: DemoMeta = {
  id: 'sidebar',
  title: 'Sidebar',
  description: 'A composable, themeable navigation panel with offcanvas, icon and fixed desktop modes.',
  group: 'Layout',
  variants: [
    { name: 'Icon collapse', render: () => <SidebarExample /> },
    { name: 'Right side', render: () => <ControlledExample /> },
    { name: 'Inset layout', render: () => <InsetExample /> }
  ]
}
