import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger
} from '@/components/ui/sidebar'

export function SidebarSpecimen({
  side = 'left',
  variant = 'sidebar',
  collapsible = 'offcanvas',
  state
}: {
  side?: 'left' | 'right'
  variant?: 'sidebar' | 'floating' | 'inset'
  collapsible?: 'offcanvas' | 'icon' | 'none'
  state?: string
}) {
  const isCollapsed = state === 'collapsed'
  const isMobileDrawer = state === 'mobile drawer'
  const isFocusVisible = state === 'focus-visible'
  const isActiveMenuItem = state ? state === 'active menu item' : true
  const resolvedCollapsible = isCollapsed ? 'icon' : collapsible
  const defaultOpen = !isCollapsed

  if (isMobileDrawer) {
    return (
      <div className='relative h-64 w-80 overflow-hidden rounded-lg border border-border bg-background shadow-md'>
        <div className='flex h-9 items-center justify-between border-b border-border bg-muted/40 px-3'>
          <span className='text-xs font-medium text-foreground'>Mobile Viewport (18rem)</span>
          <span className='rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium text-primary'>Drawer Open</span>
        </div>
        <div className='relative flex h-[calc(100%-2.25rem)] w-full'>
          <div className='z-10 h-full w-56 border-r border-sidebar-border bg-sidebar p-2 text-sidebar-foreground shadow-2xl'>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>Workspace</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton isActive>Overview</SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton>Missions</SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </div>
          <div className='flex-1 bg-black/50 p-2'>
            <div className='rounded border border-dashed border-white/20 p-2 text-center text-[10px] text-white/60'>
              Backdrop overlay
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <SidebarProvider
      defaultOpen={defaultOpen}
      key={`${state}-${collapsible}`}
      className='relative h-56 min-h-0 w-full overflow-hidden border border-border'
    >
      <Sidebar
        side={side}
        variant={variant}
        collapsible={resolvedCollapsible}
        gapClassName='!h-full !min-h-0'
        containerClassName='!absolute !h-full'
      >
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Workspace</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive={isActiveMenuItem}
                    autoFocus={isFocusVisible}
                    data-focus-visible={isFocusVisible ? '' : undefined}
                    className={
                      isFocusVisible ? 'ring-2 ring-sidebar-ring ring-offset-2 ring-offset-sidebar' : undefined
                    }
                  >
                    Overview
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>Missions</SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset className='h-full min-h-0 min-w-0'>
        <header className='flex h-10 items-center gap-2 border-b border-border px-2'>
          <SidebarTrigger />
          <span className='text-sm'>Sidebar layout</span>
        </header>
      </SidebarInset>
    </SidebarProvider>
  )
}
