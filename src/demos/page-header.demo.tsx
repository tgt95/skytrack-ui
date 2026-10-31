import { Fragment, useState } from 'react'
import {
  DotsThreeIcon,
  FolderIcon,
  GearSixIcon,
  HouseIcon,
  LinkSimpleIcon,
  RocketLaunchIcon,
  ShareNetworkIcon,
  UsersThreeIcon
} from '@phosphor-icons/react'
import skytrackLogo from '../../public/skytrack-logo-full.svg?raw'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { PageHeader } from '@/components/ui/page-header'
import { Menu, MenuItem, MenuPopup, MenuPortal, MenuPositioner, MenuSeparator, MenuTrigger } from '@/components/ui/menu'
import { Separator } from '@/components/ui/separator'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger
} from '@/components/ui/sidebar'
import { Tabs, TabsList, TabsPanel, TabsTab } from '@/components/ui/tabs'
import { Toolbar, ToolbarButton, ToolbarGroup, ToolbarSeparator } from '@/components/ui/toolbar'
import type { DemoMeta } from '@/showcase/demo'

const TABS = [
  { value: 'files', label: 'Files', content: '1 file selected · Flight-plan-Q4.xlsx' },
  { value: 'activity', label: 'Activity', content: 'Recent workspace activity.' },
  { value: 'settings', label: 'Settings', content: 'Workspace preferences.' }
]

const SIDEBAR_ITEMS = [
  { label: 'Home', icon: HouseIcon },
  { label: 'Missions', icon: RocketLaunchIcon },
  { label: 'Team', icon: UsersThreeIcon },
  { label: 'Settings', icon: GearSixIcon }
] as const

const MORE_ACTION_GROUPS = [
  [
    { label: 'Rename', action: 'Rename' },
    { label: 'Move to…', action: 'Move to' }
  ],
  [
    { label: 'Download', action: 'Download' },
    { label: 'Copy link', action: 'Copy link' }
  ]
]

function PageHeaderToolbar ({ onAction }: { onAction: (action: string) => void }) {
  return (
    <Toolbar aria-label='Flight plan actions' className='max-w-full p-0 border-0'>
      <ToolbarGroup>
        <ToolbarButton onClick={() => onAction('Open')}>
          <FolderIcon /> Open
        </ToolbarButton>
        <ToolbarButton onClick={() => onAction('Share')}>
          <ShareNetworkIcon /> Share
        </ToolbarButton>
        <ToolbarButton onClick={() => onAction('Copy link')}>
          <LinkSimpleIcon /> Copy link
        </ToolbarButton>
      </ToolbarGroup>
      <ToolbarSeparator />
      <Menu>
        <ToolbarButton render={<MenuTrigger />} size='icon' aria-label='More actions'>
          <DotsThreeIcon />
        </ToolbarButton>
        <MenuPortal>
          <MenuPositioner side='bottom' align='end' sideOffset={4}>
            <MenuPopup aria-label='More flight plan actions'>
              {MORE_ACTION_GROUPS.map((group, groupIndex) => (
                <Fragment key={group[0].action}>
                  {groupIndex > 0 && <MenuSeparator />}
                  {group.map((item) => (
                    <MenuItem key={item.action} onClick={() => onAction(item.action)}>
                      {item.label}
                    </MenuItem>
                  ))}
                </Fragment>
              ))}
              <MenuSeparator />
              <MenuItem variant='destructive' onClick={() => onAction('Delete')}>
                Delete
              </MenuItem>
            </MenuPopup>
          </MenuPositioner>
        </MenuPortal>
      </Menu>
    </Toolbar>
  )
}

function PageHeaderSidebar ({ activeItem, onSelect }: { activeItem: string; onSelect: (item: string) => void }) {
  return (
    <Sidebar collapsible='icon' gapClassName='!h-full !min-h-0' containerClassName='!absolute !h-full'>
      <SidebarHeader>
        <SidebarMenuButton size='default' tooltip='SkyTrack workspace' className='group-data-[icon-collapsed=true]/sidebar:p-0'>
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
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {SIDEBAR_ITEMS.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    isActive={activeItem === item.label}
                    tooltip={item.label}
                    onClick={() => onSelect(item.label)}
                  >
                    <item.icon />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}

type PageHeaderExampleProps = {
  withSidebar?: boolean
  showBreadcrumb?: boolean
  title?: string
  activeSidebarItem?: string
}

function PageHeaderExample ({
  withSidebar = false,
  showBreadcrumb = true,
  title = 'Flight plans',
  activeSidebarItem = 'Missions'
}: PageHeaderExampleProps = {}) {
  const [activeTab, setActiveTab] = useState('files')
  const [lastAction, setLastAction] = useState('')
  const [activeItem, setActiveItem] = useState(activeSidebarItem)

  const breadcrumb = showBreadcrumb ? (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink render={<a href='#workspace' />}>Workspace</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink render={<a href='#projects' />}>Projects</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{title}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ) : null
  const pageBreadcrumb = withSidebar ? (
    <div className='flex min-w-0 items-center gap-2'>
      <SidebarTrigger />
      {breadcrumb && <Separator aria-hidden='true' orientation='vertical' className='h-5' />}
      {breadcrumb}
    </div>
  ) : (
    breadcrumb
  )

  const pageContent = (
    <Tabs value={activeTab} onValueChange={(value) => setActiveTab(String(value))} className='gap-0'>
      <PageHeader breadcrumbs={pageBreadcrumb} title={title} toolbar={<PageHeaderToolbar onAction={setLastAction} />}>
        <TabsList width='hug' className='border-0'>
          {TABS.map((tab) => (
            <TabsTab key={tab.value} value={tab.value} className='flex-none'>
              {tab.label}
            </TabsTab>
          ))}
        </TabsList>
      </PageHeader>
      {TABS.map((tab) => (
        <TabsPanel key={tab.value} value={tab.value} className='px-6 py-3'>
          <p className='m-0'>
            {tab.content} | Action: {lastAction} selected.
          </p>
        </TabsPanel>
      ))}
    </Tabs>
  )

  if (!withSidebar) return <div className='w-full min-w-0'>{pageContent}</div>

  return (
    <SidebarProvider className='relative h-112 min-h-0 w-full overflow-hidden border border-border'>
      <PageHeaderSidebar activeItem={activeItem} onSelect={setActiveItem} />
      <SidebarInset className='h-full min-h-0 min-w-0'>{pageContent}</SidebarInset>
    </SidebarProvider>
  )
}

export const demo: DemoMeta = {
  id: 'page-header',
  title: 'Page Header',
  description: 'A page-level heading with breadcrumbs, a title, optional toolbar, and caller-composed lower content.',
  group: 'Layout',
  variants: [
    { name: 'With Tabs and Toolbar', render: () => <PageHeaderExample /> },
    { name: 'With Sidebar', render: () => <PageHeaderExample withSidebar /> },
    {
      name: 'Sidebar · Home without Breadcrumb',
      render: () => <PageHeaderExample withSidebar showBreadcrumb={false} title='Home' activeSidebarItem='Home' />
    }
  ]
}
