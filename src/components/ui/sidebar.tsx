import * as React from 'react'
import { Button as BaseButton } from '@base-ui/react/button'
import { SidebarSimpleIcon } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'
import {
  Drawer as MobileDrawer,
  DrawerBackdrop as MobileDrawerBackdrop,
  DrawerPopup as MobileDrawerPopup,
  DrawerPortal as MobileDrawerPortal,
  DrawerViewport as MobileDrawerViewport
} from '@/components/ui/drawer'
import {
  Tooltip,
  TooltipArrow,
  TooltipPortal,
  TooltipPopup,
  TooltipPositioner,
  TooltipTrigger
} from '@/components/ui/tooltip'

export const SIDEBAR_WIDTH = '16rem'
export const SIDEBAR_WIDTH_ICON = '3rem'
export const SIDEBAR_WIDTH_MOBILE = '18rem'
export const SIDEBAR_KEYBOARD_SHORTCUT = 'b'

type SidebarState = 'expanded' | 'collapsed'
type SidebarSide = 'left' | 'right'
type SidebarVariant = 'sidebar' | 'floating' | 'inset'
type SidebarCollapsible = 'offcanvas' | 'icon' | 'none'

type SidebarContextValue = {
  state: SidebarState
  open: boolean
  setOpen: (open: boolean) => void
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  isMobile: boolean
  toggleSidebar: () => void
}

const SidebarContext = React.createContext<SidebarContextValue | null>(null)
const SidebarIconCollapseContext = React.createContext(false)

function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)')
    const update = () => setIsMobile(mediaQuery.matches)
    update()
    mediaQuery.addEventListener('change', update)
    return () => mediaQuery.removeEventListener('change', update)
  }, [])

  return isMobile
}

export function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) throw new Error('useSidebar must be used within a SidebarProvider.')
  return context
}

export type SidebarProviderProps = React.ComponentProps<'div'> & {
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange,
  className,
  style,
  children,
  ...props
}: SidebarProviderProps) {
  const isMobile = useIsMobile()
  const [openState, setOpenState] = React.useState(defaultOpen)
  const [openMobile, setOpenMobile] = React.useState(false)
  const open = openProp ?? openState

  const setOpen = React.useCallback(
    (nextOpen: boolean) => {
      if (openProp === undefined) setOpenState(nextOpen)
      onOpenChange?.(nextOpen)
    },
    [onOpenChange, openProp]
  )

  const toggleSidebar = React.useCallback(() => {
    if (isMobile) setOpenMobile((current) => !current)
    else setOpen(!open)
  }, [isMobile, open, setOpen])

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key.toLowerCase() !== SIDEBAR_KEYBOARD_SHORTCUT ||
        !(event.metaKey || event.ctrlKey) ||
        event.altKey ||
        event.shiftKey
      ) {
        return
      }

      const target = event.target
      if (
        target instanceof HTMLElement &&
        (target.isContentEditable ||
          target.closest('input, textarea, select, [role="textbox"], [contenteditable="true"]'))
      ) {
        return
      }

      event.preventDefault()
      toggleSidebar()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [toggleSidebar])

  const contextValue = React.useMemo<SidebarContextValue>(
    () => ({
      state: open ? 'expanded' : 'collapsed',
      open,
      setOpen,
      openMobile,
      setOpenMobile,
      isMobile,
      toggleSidebar
    }),
    [open, setOpen, openMobile, isMobile, toggleSidebar]
  )

  return (
    <SidebarContext.Provider value={contextValue}>
      <div
        data-slot='sidebar-provider'
        data-state={open ? 'expanded' : 'collapsed'}
        className={cn('group/sidebar-wrapper flex min-h-svh w-full has-[>_[data-variant=inset]]:bg-sidebar', className)}
        style={
          {
            '--sidebar-width': SIDEBAR_WIDTH,
            '--sidebar-width-icon': SIDEBAR_WIDTH_ICON,
            '--sidebar-width-mobile': SIDEBAR_WIDTH_MOBILE,
            ...style
          } as React.CSSProperties
        }
        {...props}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  )
}

export type SidebarProps = Omit<React.ComponentProps<'aside'>, 'ref'> & {
  side?: SidebarSide
  variant?: SidebarVariant
  collapsible?: SidebarCollapsible
  /** Adds classes to the desktop width spacer. Useful for previews in bounded containers. */
  gapClassName?: string
  /** Adds classes to the desktop positioning wrapper. */
  containerClassName?: string
}

function Sidebar({
  side = 'left',
  variant = 'sidebar',
  collapsible = 'offcanvas',
  gapClassName,
  containerClassName,
  className,
  children,
  dir,
  style,
  ...props
}: SidebarProps) {
  const { open, openMobile, setOpenMobile, isMobile } = useSidebar()
  const state = open ? 'expanded' : 'collapsed'

  if (collapsible === 'none' && !isMobile) {
    return (
      <aside
        data-slot='sidebar'
        data-sidebar='sidebar'
        data-side={side}
        data-variant={variant}
        data-collapsible='none'
        data-icon-collapsed='false'
        dir={dir}
        className={cn(
          'group/sidebar flex h-full w-(--sidebar-width) shrink-0 flex-col overflow-hidden border-r border-sidebar-border bg-sidebar text-sidebar-foreground data-[variant=inset]:border-r-0',
          variant === 'floating' && 'm-2 rounded-(--radius) border border-sidebar-border shadow-sm',
          side === 'right' && variant === 'inset' && 'border-l border-sidebar-border',
          side === 'right' && 'order-last',
          className
        )}
        style={style}
        {...props}
      >
        {children}
      </aside>
    )
  }

  if (isMobile) {
    return (
      <MobileDrawer open={openMobile} onOpenChange={setOpenMobile} swipeDirection={side}>
        <MobileDrawerPortal>
          <MobileDrawerBackdrop className='bg-black/50' />
          <MobileDrawerViewport side={side}>
            <MobileDrawerPopup
              side={side}
              dir={dir}
              data-slot='sidebar-mobile'
              data-sidebar='sidebar'
              data-side={side}
              data-variant={variant}
              data-state={openMobile ? 'expanded' : 'collapsed'}
              data-icon-collapsed='false'
              className={cn(
                'h-dvh max-w-none rounded-none border-0 bg-sidebar p-0 text-sidebar-foreground shadow-lg',
                className
              )}
              style={{ width: 'var(--sidebar-width-mobile)', ...style }}
              {...props}
            >
              {children}
            </MobileDrawerPopup>
          </MobileDrawerViewport>
        </MobileDrawerPortal>
      </MobileDrawer>
    )
  }

  const panelWidth = !open && collapsible === 'icon' ? 'var(--sidebar-width-icon)' : 'var(--sidebar-width)'
  const gapWidth = !open && collapsible === 'offcanvas' ? '0px' : panelWidth
  const offset = open || collapsible === 'icon' ? '0px' : 'calc(var(--sidebar-width) * -1)'

  return (
    <>
      <div
        data-slot='sidebar-gap'
        data-sidebar='gap'
        data-side={side}
        data-variant={variant}
        data-collapsible={collapsible}
        data-state={state}
        aria-hidden='true'
        className={cn(
          'relative hidden h-svh shrink-0 transition-[width] duration-200 ease-linear md:block',
          side === 'right' && 'order-last',
          gapClassName
        )}
        style={{ width: gapWidth }}
      />
      <div
        data-slot='sidebar-container'
        data-sidebar='container'
        data-side={side}
        data-variant={variant}
        data-collapsible={collapsible}
        data-state={state}
        className={cn(
          'fixed inset-y-0 z-30 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex',
          side === 'left' ? 'left-0' : 'right-0',
          !open && collapsible === 'offcanvas' && 'pointer-events-none',
          containerClassName
        )}
        style={{ [side]: open || collapsible === 'icon' ? 0 : offset, width: panelWidth }}
      >
        <SidebarIconCollapseContext.Provider value={!open && collapsible === 'icon'}>
          <aside
            data-slot='sidebar'
            data-sidebar='sidebar'
            data-side={side}
            data-variant={variant}
            data-collapsible={collapsible}
            data-state={state}
            data-icon-collapsed={!open && collapsible === 'icon'}
            dir={dir}
            className={cn(
              'group/sidebar flex h-full w-full flex-col overflow-hidden border-r border-sidebar-border bg-sidebar text-sidebar-foreground data-[variant=inset]:border-r-0',
              variant === 'floating' &&
                'm-2 h-[calc(100%-1rem)] w-[calc(100%-1rem)] rounded-(--radius) border border-sidebar-border shadow-sm',
              side === 'right' && variant === 'inset' && 'border-l border-sidebar-border',
              !open && collapsible === 'icon' && 'w-(--sidebar-width-icon)',
              className
            )}
            style={{ width: variant === 'floating' ? 'calc(100% - 1rem)' : '100%', ...style }}
            {...props}
          >
            {children}
          </aside>
        </SidebarIconCollapseContext.Provider>
      </div>
    </>
  )
}

function SidebarTrigger({ className, onClick, ...props }: React.ComponentProps<typeof BaseButton>) {
  const { toggleSidebar, open, openMobile, isMobile } = useSidebar()
  const isExpanded = isMobile ? openMobile : open
  const label = isExpanded ? 'Collapse sidebar' : 'Expand sidebar'
  const button = (
    <BaseButton
      data-slot='sidebar-trigger'
      data-sidebar='trigger'
      type='button'
      aria-label={label}
      className={cn(
        'inline-flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-(--radius) text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring',
        className
      )}
      onClick={(event) => {
        onClick?.(event)
        if (!event.defaultPrevented) toggleSidebar()
      }}
      {...props}
    >
      <SidebarSimpleIcon aria-hidden='true' className='size-4' weight={isExpanded ? 'regular' : 'fill'} />
      <span className='sr-only'>{label}</span>
    </BaseButton>
  )

  return (
    <Tooltip>
      <TooltipTrigger render={button} />
      <TooltipPortal>
        <TooltipPositioner side='bottom' sideOffset={8}>
          <TooltipPopup>
            <TooltipArrow />
            {label} (⌘/Ctrl+B)
          </TooltipPopup>
        </TooltipPositioner>
      </TooltipPortal>
    </Tooltip>
  )
}

function SidebarRail({ className, ...props }: React.ComponentProps<'button'>) {
  const { toggleSidebar } = useSidebar()
  return (
    <button
      data-slot='sidebar-rail'
      data-sidebar='rail'
      type='button'
      aria-label='Toggle sidebar'
      tabIndex={-1}
      onClick={toggleSidebar}
      className={cn(
        'absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 cursor-ew-resize transition-all after:absolute after:inset-y-0 after:left-1/2 after:w-px hover:after:bg-sidebar-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring md:block',
        'group-data-[side=left]/sidebar:-right-4 group-data-[side=right]/sidebar:left-0',
        className
      )}
      {...props}
    />
  )
}

function SidebarInset({ className, ...props }: React.ComponentProps<'main'>) {
  return (
    <main
      data-slot='sidebar-inset'
      data-sidebar='inset'
      className={cn(
        'relative flex min-h-svh min-w-0 flex-1 flex-col bg-background',
        'group-has-[>_[data-variant=inset]]/sidebar-wrapper:min-h-[calc(100svh-1rem)] md:group-has-[>_[data-variant=inset]]/sidebar-wrapper:m-2 md:group-has-[>_[data-variant=inset]]/sidebar-wrapper:ml-0 md:group-has-[>_[data-variant=inset]]/sidebar-wrapper:rounded-(--radius) md:group-has-[>_[data-variant=inset]]/sidebar-wrapper:border md:group-has-[>_[data-variant=inset]]/sidebar-wrapper:border-border md:group-has-[>_[data-variant=inset]]/sidebar-wrapper:shadow-sm',
        className
      )}
      {...props}
    />
  )
}

function SidebarHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='sidebar-header'
      data-sidebar='header'
      className={cn('flex flex-col gap-2 p-2', className)}
      {...props}
    />
  )
}

function SidebarFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='sidebar-footer'
      data-sidebar='footer'
      className={cn('mt-auto flex flex-col gap-2 p-2', className)}
      {...props}
    />
  )
}

function SidebarContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='sidebar-content'
      data-sidebar='content'
      className={cn(
        'flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[icon-collapsed=true]/sidebar:overflow-hidden',
        className
      )}
      {...props}
    />
  )
}

function SidebarGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='sidebar-group'
      data-sidebar='group'
      className={cn('relative flex w-full min-w-0 flex-col p-2', className)}
      {...props}
    />
  )
}

type SidebarGroupLabelProps = Pick<
  React.ComponentProps<'div'>,
  'children' | 'className' | 'id' | 'title' | 'aria-label' | 'aria-labelledby'
> & {
  render?: React.ReactElement
}

function SidebarGroupLabel({ className, render, children, ...props }: SidebarGroupLabelProps) {
  const labelClassName = cn(
    'flex h-8 shrink-0 items-center rounded-(--radius) px-2 text-xs sub-heading text-sidebar-foreground/70 outline-none ring-sidebar-ring transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 group-data-[icon-collapsed=true]/sidebar:-mt-8 group-data-[icon-collapsed=true]/sidebar:opacity-0',
    render && 'cursor-pointer',
    className
  )

  if (render) {
    return (
      <BaseButton
        render={render}
        data-slot='sidebar-group-label'
        data-sidebar='group-label'
        className={labelClassName}
        {...props}
      >
        {children}
      </BaseButton>
    )
  }

  return (
    <div data-slot='sidebar-group-label' data-sidebar='group-label' className={labelClassName} {...props}>
      {children}
    </div>
  )
}

function SidebarGroupAction({ className, ...props }: React.ComponentProps<typeof BaseButton>) {
  return (
    <BaseButton
      data-slot='sidebar-group-action'
      data-sidebar='group-action'
      type='button'
      className={cn(
        'flex size-5 cursor-pointer items-center justify-center rounded-(--radius) text-sidebar-foreground outline-none ring-sidebar-ring transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 [&>svg]:size-4 group-data-[icon-collapsed=true]/sidebar:hidden',
        className
      )}
      {...props}
    />
  )
}

function SidebarGroupContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='sidebar-group-content'
      data-sidebar='group-content'
      className={cn('w-full text-sm', className)}
      {...props}
    />
  )
}

function SidebarMenu({ className, ...props }: React.ComponentProps<'ul'>) {
  return (
    <ul
      data-slot='sidebar-menu'
      data-sidebar='menu'
      className={cn('flex w-full min-w-0 flex-col gap-1', className)}
      {...props}
    />
  )
}

function SidebarMenuItem({ className, ...props }: React.ComponentProps<'li'>) {
  return (
    <li
      data-slot='sidebar-menu-item'
      data-sidebar='menu-item'
      className={cn('group/menu-item relative', className)}
      {...props}
    />
  )
}

export type SidebarMenuButtonProps = React.ComponentProps<typeof BaseButton> & {
  isActive?: boolean
  size?: 'default' | 'sm' | 'lg'
  variant?: 'default' | 'outline'
  tooltip?: string
}

function SidebarMenuButton({
  className,
  isActive = false,
  size = 'default',
  variant = 'default',
  tooltip,
  ...props
}: SidebarMenuButtonProps) {
  const isIconCollapsed = React.useContext(SidebarIconCollapseContext)
  const button = (
    <BaseButton
      data-slot='sidebar-menu-button'
      data-sidebar='menu-button'
      data-size={size}
      data-active={isActive ? '' : undefined}
      aria-current={isActive ? 'page' : undefined}
      type='button'
      className={cn(
        'peer/menu-button group/sidebar-menu-button flex w-full min-w-0 cursor-pointer items-center gap-2 overflow-hidden rounded-(--radius) px-2 text-left text-sm outline-none transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 focus-visible:ring-sidebar-ring active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0 [&>span:last-child]:truncate',
        size === 'default' && 'h-8',
        size === 'sm' && 'h-7 text-xs',
        size === 'lg' && 'h-12 text-sm group-data-[icon-collapsed=true]/sidebar:!p-0',
        variant === 'outline' &&
          'border border-sidebar-border bg-background shadow-[0_0_0_1px_var(--sidebar-border)] hover:bg-sidebar-accent hover:shadow-[0_0_0_1px_var(--sidebar-accent)]',
        'data-active:bg-sidebar-accent data-active:font-medium data-active:text-sidebar-accent-foreground',
        'group-data-[icon-collapsed=true]/sidebar:size-8 group-data-[icon-collapsed=true]/sidebar:justify-center group-data-[icon-collapsed=true]/sidebar:p-2 group-data-[icon-collapsed=true]/sidebar:[&>span]:sr-only',
        className
      )}
      {...props}
    />
  )

  if (!tooltip?.trim() || !isIconCollapsed) return button

  return (
    <Tooltip>
      <TooltipTrigger render={button} />
      <TooltipPortal>
        <TooltipPositioner side='right' sideOffset={8}>
          <TooltipPopup>
            <TooltipArrow />
            {tooltip}
          </TooltipPopup>
        </TooltipPositioner>
      </TooltipPortal>
    </Tooltip>
  )
}

function SidebarMenuAction({ className, ...props }: React.ComponentProps<typeof BaseButton>) {
  return (
    <BaseButton
      data-slot='sidebar-menu-action'
      data-sidebar='menu-action'
      type='button'
      className={cn(
        'absolute right-1 top-1.5 flex size-5 cursor-pointer items-center justify-center rounded-(--radius) text-sidebar-foreground outline-none ring-sidebar-ring transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 [&>svg]:size-3.5 group-data-[icon-collapsed=true]/sidebar:hidden',
        className
      )}
      {...props}
    />
  )
}

type SidebarMenuBadgeProps = React.ComponentProps<'span'> & {
  render?: React.ReactElement
}

function SidebarMenuBadge({ className, render, children, ...props }: SidebarMenuBadgeProps) {
  const positionClassName =
    'pointer-events-none absolute right-2 group-data-[icon-collapsed=true]/sidebar:hidden peer-data-[size=sm]/menu-button:top-1 peer-data-[size=default]/menu-button:top-1.5 peer-data-[size=lg]/menu-button:top-3'

  if (render) {
    const renderProps = render.props as { className?: string; children?: React.ReactNode }
    return React.cloneElement(render as React.ReactElement<Record<string, unknown>>, {
      ...props,
      'data-slot': 'sidebar-menu-badge',
      'data-sidebar': 'menu-badge',
      className: cn(positionClassName, className, renderProps.className),
      children: children ?? renderProps.children
    })
  }

  const badgeClassName = cn(
    positionClassName,
    'flex h-5 min-w-5 items-center justify-center rounded-(--radius) px-1 text-xs font-medium tabular-nums text-sidebar-foreground',
    className
  )

  return (
    <span data-slot='sidebar-menu-badge' data-sidebar='menu-badge' className={badgeClassName} {...props}>
      {children}
    </span>
  )
}

function SidebarMenuSkeleton({
  className,
  showIcon = false,
  ...props
}: React.ComponentProps<'div'> & { showIcon?: boolean }) {
  return (
    <div
      data-slot='sidebar-menu-skeleton'
      data-sidebar='menu-skeleton'
      className={cn('flex h-8 items-center gap-2 rounded-(--radius) px-2', className)}
      {...props}
    >
      {showIcon && <span className='size-4 shrink-0 rounded-(--radius) bg-sidebar-accent' />}
      <span className='h-4 max-w-(--skeleton-width,60%) flex-1 rounded-(--radius) bg-sidebar-accent' />
    </div>
  )
}

function SidebarMenuSub({ className, ...props }: React.ComponentProps<'ul'>) {
  return (
    <ul
      data-slot='sidebar-menu-sub'
      data-sidebar='menu-sub'
      className={cn(
        'mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5 group-data-[icon-collapsed=true]/sidebar:hidden',
        className
      )}
      {...props}
    />
  )
}

function SidebarMenuSubItem({ className, ...props }: React.ComponentProps<'li'>) {
  return (
    <li
      data-slot='sidebar-menu-sub-item'
      data-sidebar='menu-sub-item'
      className={cn('group/menu-sub-item relative', className)}
      {...props}
    />
  )
}

export type SidebarMenuSubButtonProps = React.ComponentProps<typeof BaseButton> & {
  isActive?: boolean
  size?: 'sm' | 'md'
}

function SidebarMenuSubButton({ className, isActive = false, size = 'md', ...props }: SidebarMenuSubButtonProps) {
  return (
    <BaseButton
      data-slot='sidebar-menu-sub-button'
      data-sidebar='menu-sub-button'
      data-size={size}
      data-active={isActive ? '' : undefined}
      aria-current={isActive ? 'page' : undefined}
      type='button'
      className={cn(
        'flex h-7 min-w-0 cursor-pointer items-center gap-2 overflow-hidden rounded-(--radius) px-2 text-sidebar-foreground outline-none ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0 [&>span:last-child]:truncate data-active:bg-sidebar-accent data-active:text-sidebar-accent-foreground',
        size === 'sm' && 'text-xs',
        size === 'md' && 'text-sm',
        className
      )}
      {...props}
    />
  )
}

export {
  SidebarProvider,
  Sidebar,
  SidebarTrigger,
  SidebarRail,
  SidebarInset,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton
}
