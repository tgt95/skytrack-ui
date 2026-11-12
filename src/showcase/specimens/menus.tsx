import * as React from 'react'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import {
  ContextMenu,
  ContextMenuItem,
  ContextMenuPopup,
  ContextMenuPortal,
  ContextMenuPositioner,
  ContextMenuTrigger
} from '@/components/ui/context-menu'
import { Menu, MenuItem, MenuPopup, MenuPortal, MenuPositioner, MenuTrigger } from '@/components/ui/menu'
import { Menubar } from '@/components/ui/menubar'
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuPortal,
  NavigationMenuPositioner,
  NavigationMenuPopup,
  NavigationMenuViewport,
  NavigationMenuLink
} from '@/components/ui/navigation-menu'

/* ------------------------------------------------------------ Context menu */

export function ContextMenuSpecimen({ variant, inset }: { variant?: string; inset?: string }) {
  const isInset = inset === 'true'
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div className='flex h-16 w-32 items-center justify-center border border-dashed border-border text-xs text-muted-foreground select-none'>
          right-click
        </div>
      </ContextMenuTrigger>
      <ContextMenuPortal>
        <ContextMenuPositioner>
          <ContextMenuPopup>
            <ContextMenuItem inset={isInset}>Rename</ContextMenuItem>
            <ContextMenuItem
              variant={variant as React.ComponentProps<typeof ContextMenuItem>['variant']}
              inset={isInset}
            >
              Delete
            </ContextMenuItem>
          </ContextMenuPopup>
        </ContextMenuPositioner>
      </ContextMenuPortal>
    </ContextMenu>
  )
}

/* -------------------------------------------------------------------- Menu */

export function MenuSpecimen({ variant, inset }: { variant?: string; inset?: string }) {
  const isInset = inset === 'true'
  return (
    <Menu>
      <MenuTrigger>Open</MenuTrigger>
      <MenuPortal>
        <MenuPositioner side='bottom' align='start' sideOffset={4}>
          <MenuPopup>
            <MenuItem inset={isInset}>Rename</MenuItem>
            <MenuItem variant={variant as React.ComponentProps<typeof MenuItem>['variant']} inset={isInset}>
              Delete
            </MenuItem>
          </MenuPopup>
        </MenuPositioner>
      </MenuPortal>
    </Menu>
  )
}

/* ------------------------------------------------------------- Menubar */

export function MenubarSpecimen({ state = 'enabled' }: { state?: string }) {
  const disabled = state === 'disabled'
  return (
    <Menubar>
      <Menu>
        <MenuTrigger disabled={disabled}>File</MenuTrigger>
        <MenuPortal>
          <MenuPositioner side='bottom' align='start' sideOffset={4}>
            <MenuPopup>
              <MenuItem>New</MenuItem>
              <MenuItem>Open</MenuItem>
            </MenuPopup>
          </MenuPositioner>
        </MenuPortal>
      </Menu>
      <Menu>
        <MenuTrigger disabled={disabled}>Edit</MenuTrigger>
        <MenuPortal>
          <MenuPositioner side='bottom' align='start' sideOffset={4}>
            <MenuPopup>
              <MenuItem>Undo</MenuItem>
              <MenuItem>Redo</MenuItem>
            </MenuPopup>
          </MenuPositioner>
        </MenuPortal>
      </Menu>
    </Menubar>
  )
}

/* -------------------------------------------------------- Navigation menu */

export function NavigationMenuSpecimen({ state = 'active' }: { state?: string }) {
  const isDisabled = state === 'disabled'
  const isPopupOpen = state === 'popup-open'
  const isInstant = state === 'instant'

  return (
    <NavigationMenu
      key={state}
      defaultValue={isPopupOpen || isInstant ? 'overview' : undefined}
      delay={isInstant ? 0 : undefined}
    >
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger value='overview'>Overview</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className='flex flex-col gap-1 p-2'>
              <NavigationMenuLink href='#projects'>Projects</NavigationMenuLink>
              <NavigationMenuLink href='#releases'>Releases</NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger value='account' disabled={isDisabled}>
            Account
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink href='#settings'>Settings</NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
      <NavigationMenuPortal>
        <NavigationMenuPositioner>
          <NavigationMenuPopup>
            <NavigationMenuViewport />
          </NavigationMenuPopup>
        </NavigationMenuPositioner>
      </NavigationMenuPortal>
    </NavigationMenu>
  )
}

/* ----------------------------------------------------------------- Command */

export function CommandSpecimen({ state = 'inline list' }: { state?: string }) {
  const isEmpty = state === 'empty state'
  const isDialog = state === 'dialog'

  const content = (
    <Command key={state} className='w-full max-w-sm rounded-(--radius) border border-border shadow-xs'>
      <CommandInput placeholder='Search actions...' defaultValue={isEmpty ? 'nonexistent-query' : ''} />
      <CommandList className='max-h-40'>
        <CommandEmpty>No results found.</CommandEmpty>
        {!isEmpty && (
          <>
            <CommandGroup heading='Workspace'>
              <CommandItem value='calendar'>Calendar</CommandItem>
              <CommandItem value='projects'>Projects</CommandItem>
            </CommandGroup>
            <CommandGroup heading='Settings'>
              <CommandItem value='theme'>Theme</CommandItem>
            </CommandGroup>
          </>
        )}
      </CommandList>
    </Command>
  )

  if (isDialog) {
    return (
      <div key={state} className='flex flex-col gap-2'>
        <span className='text-xs text-muted-foreground'>Command dialog overlay view:</span>
        {content}
      </div>
    )
  }

  return content
}
