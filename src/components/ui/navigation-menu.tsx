import * as React from 'react'
import { NavigationMenu as BaseNavigationMenu } from '@base-ui/react/navigation-menu'
import { CaretDownIcon } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'
import { focusRing } from '@/components/ui/button'

function NavigationMenu({ className, ...props }: React.ComponentProps<typeof BaseNavigationMenu.Root>) {
  return (
    <BaseNavigationMenu.Root
      data-slot='navigation-menu'
      className={cn('relative flex max-w-max flex-col', 'data-[orientation=vertical]:flex-row', className as string)}
      {...props}
    />
  )
}

function NavigationMenuList({ className, ...props }: React.ComponentProps<typeof BaseNavigationMenu.List>) {
  return (
    <BaseNavigationMenu.List
      data-slot='navigation-menu-list'
      className={cn(
        'flex list-none flex-row items-center gap-1',
        'data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch',
        className as string
      )}
      {...props}
    />
  )
}

function NavigationMenuItem({ className, ...props }: React.ComponentProps<typeof BaseNavigationMenu.Item>) {
  return (
    <BaseNavigationMenu.Item
      data-slot='navigation-menu-item'
      className={cn('relative', className as string)}
      {...props}
    />
  )
}

function NavigationMenuTrigger({ className, children, ...props }: React.ComponentProps<typeof BaseNavigationMenu.Trigger>) {
  return (
    <BaseNavigationMenu.Trigger
      data-slot='navigation-menu-trigger'
      className={className}
      {...props}
    >
      {children}
    </BaseNavigationMenu.Trigger>
  )
}

function NavigationMenuIcon({ className, children, ...props }: React.ComponentProps<typeof BaseNavigationMenu.Icon>) {
  return (
    <BaseNavigationMenu.Icon
      data-slot='navigation-menu-icon'
      className={cn(
        'flex size-4 items-center justify-center transition-transform duration-200',
        'data-[popup-open]:rotate-180',
        className as string
      )}
      {...props}
    >
      {children ?? <CaretDownIcon />}
    </BaseNavigationMenu.Icon>
  )
}

function NavigationMenuContent({ className, ...props }: React.ComponentProps<typeof BaseNavigationMenu.Content>) {
  return (
    <BaseNavigationMenu.Content
      data-slot='navigation-menu-content'
      className={cn(
        'h-full w-[calc(100vw-2.5rem)] p-2 md:w-max md:max-w-[25rem]',
        'transition-[opacity,transform,translate] duration-200 ease-out',
        'data-[starting-style]:opacity-0 data-[ending-style]:opacity-0',
        'data-[starting-style]:data-[activation-direction=left]:translate-x-[-50%]',
        'data-[starting-style]:data-[activation-direction=right]:translate-x-[50%]',
        'data-[ending-style]:data-[activation-direction=left]:translate-x-[50%]',
        'data-[ending-style]:data-[activation-direction=right]:translate-x-[-50%]',
        className as string
      )}
      {...props}
    />
  )
}

/* ----------------------------------------------------------------- Popup */

function NavigationMenuPortal({ className, ...props }: React.ComponentProps<typeof BaseNavigationMenu.Portal>) {
  return <BaseNavigationMenu.Portal data-slot='navigation-menu-portal' className={cn(className as string)} {...props} />
}

function NavigationMenuBackdrop({ className, ...props }: React.ComponentProps<typeof BaseNavigationMenu.Backdrop>) {
  return (
    <BaseNavigationMenu.Backdrop
      data-slot='navigation-menu-backdrop'
      className={cn(
        'fixed inset-0 z-50 bg-foreground/20 transition-opacity duration-150',
        'data-[starting-style]:opacity-0 data-[ending-style]:opacity-0',
        className as string
      )}
      {...props}
    />
  )
}

function NavigationMenuPositioner({ className, ...props }: React.ComponentProps<typeof BaseNavigationMenu.Positioner>) {
  return (
    <BaseNavigationMenu.Positioner
      data-slot='navigation-menu-positioner'
      className={cn(
        'z-50 outline-hidden',
        'transition-[top,left,right,bottom,transform] duration-200 ease-out data-[instant]:transition-none',
        className as string
      )}
      {...props}
    />
  )
}

function NavigationMenuPopup({ className, ...props }: React.ComponentProps<typeof BaseNavigationMenu.Popup>) {
  return (
    <BaseNavigationMenu.Popup
      data-slot='navigation-menu-popup'
      className={cn(
        'relative h-[var(--popup-height)] w-[var(--popup-width)] origin-[var(--transform-origin)] rounded-lg border border-border bg-popover text-popover-foreground shadow-md outline-hidden',
        'transition-[opacity,transform,width,height,scale] duration-200 ease-out',
        'data-[instant]:transition-none',
        'data-[starting-style]:scale-95 data-[starting-style]:opacity-0',
        'data-[ending-style]:scale-95 data-[ending-style]:opacity-0',
        className as string
      )}
      {...props}
    />
  )
}

function NavigationMenuViewport({ className, ...props }: React.ComponentProps<typeof BaseNavigationMenu.Viewport>) {
  return (
    <BaseNavigationMenu.Viewport
      data-slot='navigation-menu-viewport'
      className={cn('relative h-full w-full overflow-hidden', className as string)}
      {...props}
    />
  )
}

function NavigationMenuArrowGlyph(props: React.ComponentProps<'svg'>) {
  return (
    <svg width='20' height='10' viewBox='0 0 20 10' fill='none' aria-hidden='true' focusable='false' {...props}>
      <path d='M1 9 L10 1 L19 9 Z' fill='currentColor' stroke='none' className='text-popover' />
      <path
        d='M1 9 L10 1 L19 9'
        fill='none'
        stroke='currentColor'
        strokeWidth={1}
        strokeLinejoin='round'
        strokeLinecap='round'
        className='text-border'
      />
    </svg>
  )
}

function NavigationMenuArrow({ className, children, ...props }: React.ComponentProps<typeof BaseNavigationMenu.Arrow>) {
  return (
    <BaseNavigationMenu.Arrow
      data-slot='navigation-menu-arrow'
      className={cn(
        'pointer-events-none absolute z-10 flex h-2.5 w-5 items-center justify-center',
        'data-[side=top]:bottom-[-9px] data-[side=top]:rotate-180',
        'data-[side=bottom]:top-[-9px]',
        'data-[side=left]:right-[-14px] data-[side=left]:rotate-90',
        'data-[side=right]:left-[-14px] data-[side=right]:-rotate-90',
        className as string
      )}
      {...props}
    >
      {children ?? <NavigationMenuArrowGlyph />}
    </BaseNavigationMenu.Arrow>
  )
}

/* ------------------------------------------------------------------ Link */

function NavigationMenuLink({ className, ...props }: React.ComponentProps<typeof BaseNavigationMenu.Link>) {
  return (
    <BaseNavigationMenu.Link
      data-slot='navigation-menu-link'
      className={cn(
        'block cursor-pointer select-none rounded-md p-2 text-foreground no-underline transition-colors',
        'hover:bg-accent hover:text-accent-foreground',
        'data-[active]:bg-accent/60 data-[active]:font-medium',
        focusRing,
        className as string
      )}
      {...props}
    />
  )
}

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuIcon,
  NavigationMenuContent,
  NavigationMenuPortal,
  NavigationMenuBackdrop,
  NavigationMenuPositioner,
  NavigationMenuPopup,
  NavigationMenuViewport,
  NavigationMenuArrow,
  NavigationMenuLink
}
