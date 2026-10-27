import * as React from 'react'
import { DotsThreeVerticalIcon, ImageSquareIcon } from '@phosphor-icons/react'
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuCheckboxItemIndicator,
  ContextMenuItem,
  ContextMenuPopup,
  ContextMenuPortal,
  ContextMenuPositioner,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuRadioItemIndicator,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSubmenuRoot,
  ContextMenuSubmenuTrigger,
  ContextMenuTrigger
} from '@/components/ui/context-menu'
import { Menu, MenuItem, MenuPopup, MenuPortal, MenuPositioner, MenuSeparator, MenuTrigger } from '@/components/ui/menu'
import type { DemoMeta } from '@/showcase/demo'

const ACTIONS = ['Preview', 'Download', 'Copy link', 'Rename']

function TriggerPanel({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex h-32 w-full max-w-64 items-center justify-center rounded-(--radius) border border-dashed border-border bg-muted text-sm text-muted-foreground select-none'>
      {children}
    </div>
  )
}

/** The same action list, rendered by either Menu or ContextMenu parts. */
function SharedMenuItems({ type = 'menu' }: { type?: 'menu' | 'context-menu' }) {
  if (type === 'context-menu') {
    return (
      <>
        {ACTIONS.map((action) => (
          <ContextMenuItem key={action}>{action}</ContextMenuItem>
        ))}
        <ContextMenuSeparator />
        <ContextMenuItem variant='destructive'>Delete</ContextMenuItem>
      </>
    )
  }
  return (
    <>
      {ACTIONS.map((action) => (
        <MenuItem key={action}>{action}</MenuItem>
      ))}
      <MenuSeparator />
      <MenuItem variant='destructive'>Delete</MenuItem>
    </>
  )
}

/* --------------------------------------------------------- Using with Menu */

function ImageCardWithBothMenus() {
  return (
    <div className='group relative w-full max-w-64 overflow-hidden rounded-(--radius) border border-border bg-card text-card-foreground select-none'>
      <ContextMenu>
        <ContextMenuTrigger>
          <div className='flex aspect-5/3 items-center justify-center bg-muted text-muted-foreground'>
            <ImageSquareIcon className='size-8' />
          </div>
          <div className='p-2'>
            <p className='text-sm leading-5'>Station Hofplein</p>
            <p className='text-xs leading-4 text-muted-foreground'>JPG, 2.4 MB</p>
          </div>
        </ContextMenuTrigger>

        <ContextMenuPortal>
          <ContextMenuPositioner>
            <ContextMenuPopup>
              <SharedMenuItems type='context-menu' />
            </ContextMenuPopup>
          </ContextMenuPositioner>
        </ContextMenuPortal>
      </ContextMenu>

      <Menu>
        <MenuTrigger
          aria-label='Image actions'
          className='absolute top-2 right-2 opacity-0 group-hover:opacity-100 data-[popup-open]:opacity-100'
        >
          <DotsThreeVerticalIcon />
        </MenuTrigger>
        <MenuPortal>
          <MenuPositioner align='end' sideOffset={8}>
            <MenuPopup>
              <SharedMenuItems />
            </MenuPopup>
          </MenuPositioner>
        </MenuPortal>
      </Menu>
    </div>
  )
}

/* ----------------------------------------------------------- Nested menu */

function NestedContextMenu() {
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <TriggerPanel>Right click here</TriggerPanel>
      </ContextMenuTrigger>
      <ContextMenuPortal>
        <ContextMenuPositioner>
          <ContextMenuPopup>
            <ContextMenuItem>Add to Library</ContextMenuItem>

            <ContextMenuSubmenuRoot>
              <ContextMenuSubmenuTrigger>Add to Playlist</ContextMenuSubmenuTrigger>
              <ContextMenuPortal>
                <ContextMenuPositioner alignOffset={-4} sideOffset={-4}>
                  <ContextMenuPopup>
                    <ContextMenuItem>Get Up!</ContextMenuItem>
                    <ContextMenuItem>Inside Out</ContextMenuItem>
                    <ContextMenuItem>Night Beats</ContextMenuItem>
                    <ContextMenuSeparator />
                    <ContextMenuItem>New playlist…</ContextMenuItem>
                  </ContextMenuPopup>
                </ContextMenuPositioner>
              </ContextMenuPortal>
            </ContextMenuSubmenuRoot>

            <ContextMenuSeparator />

            <ContextMenuItem>Play Next</ContextMenuItem>
            <ContextMenuItem>Play Last</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem>Favorite</ContextMenuItem>
            <ContextMenuItem>Share</ContextMenuItem>
          </ContextMenuPopup>
        </ContextMenuPositioner>
      </ContextMenuPortal>
    </ContextMenu>
  )
}

/* ----------------------------------------------------- Checkbox and radio */

function SettingsContextMenu() {
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <TriggerPanel>Right click for settings</TriggerPanel>
      </ContextMenuTrigger>
      <ContextMenuPortal>
        <ContextMenuPositioner>
          <ContextMenuPopup>
            <ContextMenuItem>
              Cut
              <ContextMenuShortcut>⌘X</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem>
              Copy
              <ContextMenuShortcut>⌘C</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem disabled>Paste</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuCheckboxItem defaultChecked inset>
              <ContextMenuCheckboxItemIndicator />
              Show hidden files
            </ContextMenuCheckboxItem>
            <ContextMenuRadioGroup defaultValue='name'>
              <ContextMenuRadioItem value='name' inset>
                <ContextMenuRadioItemIndicator />
                Sort by name
              </ContextMenuRadioItem>
              <ContextMenuRadioItem value='date' inset>
                <ContextMenuRadioItemIndicator />
                Sort by date
              </ContextMenuRadioItem>
            </ContextMenuRadioGroup>
            <ContextMenuSeparator />
            <ContextMenuItem variant='destructive'>Delete</ContextMenuItem>
          </ContextMenuPopup>
        </ContextMenuPositioner>
      </ContextMenuPortal>
    </ContextMenu>
  )
}

export const demo: DemoMeta = {
  id: 'context-menu',
  title: 'Context Menu',
  description:
    'A high-quality, unstyled React context menu component that appears at the pointer on right click or long press.',
  group: 'Menus & Navigation',
  variants: [
    {
      name: 'Default',
      render: () => (
        <ContextMenu>
          <ContextMenuTrigger>
            <TriggerPanel>Right click here</TriggerPanel>
          </ContextMenuTrigger>
          <ContextMenuPortal>
            <ContextMenuPositioner>
              <ContextMenuPopup>
                <ContextMenuItem>Add to Library</ContextMenuItem>
                <ContextMenuItem>Add to Playlist</ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuItem>Play Next</ContextMenuItem>
                <ContextMenuItem>Play Last</ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuItem>Favorite</ContextMenuItem>
                <ContextMenuItem>Share</ContextMenuItem>
              </ContextMenuPopup>
            </ContextMenuPositioner>
          </ContextMenuPortal>
        </ContextMenu>
      )
    },
    { name: 'Using with Menu', render: () => <ImageCardWithBothMenus /> },
    { name: 'Nested menu', render: () => <NestedContextMenu /> },
    { name: 'Checkbox and radio items', render: () => <SettingsContextMenu /> }
  ]
}
