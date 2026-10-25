import * as React from 'react'
import { DotsThreeIcon, PencilSimpleIcon, TrashIcon } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import {
  Menu,
  MenuArrow,
  MenuCheckboxItem,
  MenuCheckboxItemIndicator,
  MenuGroup,
  MenuGroupLabel,
  MenuItem,
  MenuLinkItem,
  MenuPopup,
  MenuPortal,
  MenuPositioner,
  MenuRadioGroup,
  MenuRadioItem,
  MenuRadioItemIndicator,
  MenuSeparator,
  MenuShortcut,
  MenuSubmenuRoot,
  MenuSubmenuTrigger,
  MenuTrigger,
  MenuViewport,
  createMenuHandle
} from '@/components/ui/menu'
import {
  Dialog,
  DialogBackdrop,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPopup,
  DialogPortal,
  DialogTitle
} from '@/components/ui/dialog'
import type { DemoMeta } from '@/showcase/demo'
import { cn } from '@/lib/utils'

/* ------------------------------------------------- shared demo scaffolding */

function MenuFrame({
  children,
  align = 'start',
  sideOffset = 6
}: {
  children: React.ReactNode
  align?: 'start' | 'center' | 'end'
  sideOffset?: number
}) {
  return (
    <>
      <MenuTrigger>Actions</MenuTrigger>
      <MenuPortal>
        <MenuPositioner side='bottom' align={align} sideOffset={sideOffset}>
          <MenuPopup>{children}</MenuPopup>
        </MenuPositioner>
      </MenuPortal>
    </>
  )
}

function IconButtonTrigger() {
  return (
    <Menu>
      <MenuTrigger render={<Button variant='ghost' size='icon-xs' aria-label='More actions' />}>
        <DotsThreeIcon aria-hidden='true' />
      </MenuTrigger>
      <MenuPortal>
        <MenuPositioner side='bottom' align='end' sideOffset={4}>
          <MenuPopup>
            <MenuItem>Rename</MenuItem>
            <MenuItem>Duplicate</MenuItem>
          </MenuPopup>
        </MenuPositioner>
      </MenuPortal>
    </Menu>
  )
}

/** Docs: control the dialog state and open it from a menu item's `onClick`. */
function DialogFromMenu() {
  const [dialogOpen, setDialogOpen] = React.useState(false)

  return (
    <>
      <Menu>
        <MenuFrame>
          <MenuItem onClick={() => setDialogOpen(true)}>Open dialog</MenuItem>
          <MenuSeparator />
          <MenuItem onClick={() => setDialogOpen(false)}>Close dialog</MenuItem>
        </MenuFrame>
      </Menu>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogPortal>
          <DialogBackdrop />
          <DialogPopup className='sm:max-w-sm'>
            <DialogHeader>
              <DialogTitle>Rename track</DialogTitle>
              <DialogDescription>
                The dialog state is controlled by React and opened from the menu item.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose variant='outline'>Cancel</DialogClose>
              <DialogClose>Save</DialogClose>
            </DialogFooter>
          </DialogPopup>
        </DialogPortal>
      </Dialog>
    </>
  )
}

/* ------------------------------------------------------- detached triggers */

const detachedMenu = createMenuHandle()

function DetachedTriggers() {
  return (
    <>
      <MenuTrigger handle={detachedMenu}>Row actions</MenuTrigger>
      <MenuTrigger handle={detachedMenu}>Quick actions</MenuTrigger>
      <Menu handle={detachedMenu}>
        <MenuPortal>
          <MenuPositioner side='bottom' align='start' sideOffset={6}>
            <MenuPopup>
              <MenuItem>Edit</MenuItem>
              <MenuItem>Duplicate</MenuItem>
              <MenuSeparator />
              <MenuItem variant='destructive'>Delete</MenuItem>
            </MenuPopup>
          </MenuPositioner>
        </MenuPortal>
      </Menu>
    </>
  )
}

const payloadMenu = createMenuHandle<{ items: string[] }>()

const PAYLOAD_ITEMS = {
  file: ['New', 'Open', 'Save'],
  edit: ['Undo', 'Redo', 'Cut', 'Copy', 'Paste']
}

function MultipleTriggersWithPayload() {
  return (
    <>
      <MenuTrigger handle={payloadMenu} payload={{ items: PAYLOAD_ITEMS.file }}>
        File
      </MenuTrigger>
      <MenuTrigger handle={payloadMenu} payload={{ items: PAYLOAD_ITEMS.edit }}>
        Edit
      </MenuTrigger>
      <Menu handle={payloadMenu}>
        {({ payload }) => (
          <MenuPortal>
            <MenuPositioner side='bottom' align='start' sideOffset={6}>
              <MenuPopup>
                <MenuViewport>
                  {(payload?.items ?? []).map((item) => (
                    <MenuItem key={item}>{item}</MenuItem>
                  ))}
                </MenuViewport>
              </MenuPopup>
            </MenuPositioner>
          </MenuPortal>
        )}
      </Menu>
    </>
  )
}

function ControlledMultipleTriggers() {
  const [open, setOpen] = React.useState(false)
  const [triggerId, setTriggerId] = React.useState<string | null>(null)

  return (
    <Menu
      open={open}
      onOpenChange={(nextOpen, eventDetails) => {
        setOpen(nextOpen)
        const element = eventDetails.trigger
        if (element instanceof HTMLElement) {
          setTriggerId(element.id || null)
        }
      }}
      triggerId={triggerId}
    >
      <MenuTrigger id='row-actions'>Row actions</MenuTrigger>
      <MenuTrigger id='quick-actions'>Quick actions</MenuTrigger>
      <MenuPortal>
        <MenuPositioner side='bottom' align='start' sideOffset={6}>
          <MenuPopup>
            <MenuItem>Open</MenuItem>
            <MenuItem>Share</MenuItem>
            <MenuSeparator />
            <MenuItem variant='destructive'>Delete</MenuItem>
          </MenuPopup>
        </MenuPositioner>
      </MenuPortal>
    </Menu>
  )
}

/* ------------------------------------------------------------- animation */

const ANIMATED_MENUS = {
  library: { heading: 'Library', groups: [['Add to library', 'Add to favorites']] },
  playback: {
    heading: 'Playback',
    groups: [
      ['Play now', 'Add to queue'],
      ['Play next', 'Play last', 'Sleep timer']
    ]
  },
  share: {
    heading: 'Share',
    groups: [
      ['Copy link', 'Copy embed code'],
      ['Share to contacts', 'Share to social']
    ]
  }
} as const

type AnimatedMenuKey = keyof typeof ANIMATED_MENUS

const animatedMenu = createMenuHandle<AnimatedMenuKey>()

function AnimatingMenu() {
  return (
    <div className='flex flex-wrap items-center gap-2'>
      {(Object.keys(ANIMATED_MENUS) as AnimatedMenuKey[]).map((key) => (
        <MenuTrigger key={key} handle={animatedMenu} payload={key}>
          {ANIMATED_MENUS[key].heading}
        </MenuTrigger>
      ))}

      <Menu handle={animatedMenu} modal={false}>
        {({ payload }) => (
          <MenuPortal>
            <MenuPositioner
              sideOffset={8}
              align='start'
              className='h-[var(--positioner-height)] w-[var(--positioner-width)] max-w-[var(--available-width)] transition-[top,left,right,bottom] duration-300 ease-out data-[instant]:transition-none'
            >
              <MenuPopup className='h-[var(--popup-height,auto)] w-[var(--popup-width,auto)] transition-[width,height] duration-300 ease-out data-[instant]:transition-none'>
                <MenuViewport
                  className={cn(
                    'relative h-full w-full overflow-hidden',
                    '[&_[data-current]]:w-[var(--popup-width)] [&_[data-current]]:transition-[translate,opacity] [&_[data-current]]:duration-300',
                    '[&_[data-previous]]:absolute [&_[data-previous]]:inset-0 [&_[data-previous]]:w-[var(--popup-width)] [&_[data-previous]]:transition-[translate,opacity] [&_[data-previous]]:duration-300',
                    "data-[activation-direction~='left']:[&_[data-current][data-starting-style]]:-translate-x-1/2 data-[activation-direction~='left']:[&_[data-current][data-starting-style]]:opacity-0",
                    "data-[activation-direction~='right']:[&_[data-current][data-starting-style]]:translate-x-1/2 data-[activation-direction~='right']:[&_[data-current][data-starting-style]]:opacity-0",
                    "data-[activation-direction~='left']:[&_[data-previous][data-ending-style]]:translate-x-1/2 data-[activation-direction~='left']:[&_[data-previous][data-ending-style]]:opacity-0",
                    "data-[activation-direction~='right']:[&_[data-previous][data-ending-style]]:-translate-x-1/2 data-[activation-direction~='right']:[&_[data-previous][data-ending-style]]:opacity-0"
                  )}
                >
                  {payload && (
                    <MenuGroup>
                      <MenuGroupLabel>{ANIMATED_MENUS[payload].heading}</MenuGroupLabel>
                      {ANIMATED_MENUS[payload].groups.map((group, groupIndex) => (
                        <React.Fragment key={group[0]}>
                          {group.map((item) => (
                            <MenuItem key={item}>{item}</MenuItem>
                          ))}
                          {groupIndex < ANIMATED_MENUS[payload].groups.length - 1 && <MenuSeparator />}
                        </React.Fragment>
                      ))}
                    </MenuGroup>
                  )}
                </MenuViewport>
              </MenuPopup>
            </MenuPositioner>
          </MenuPortal>
        )}
      </Menu>
    </div>
  )
}

export const demo: DemoMeta = {
  id: 'menu',
  title: 'Menu',
  description:
    'A high-quality, unstyled React menu component that displays list of actions in a dropdown, enhanced with keyboard navigation.',
  group: 'Menus & Navigation',
  variants: [
    {
      name: 'Default',
      render: () => (
        <Menu>
          <MenuTrigger>Actions</MenuTrigger>
          <MenuPortal>
            <MenuPositioner side='bottom' align='start' sideOffset={6}>
              <MenuPopup>
                <MenuItem>
                  <PencilSimpleIcon /> Edit
                  <MenuShortcut>⌘E</MenuShortcut>
                </MenuItem>
                <MenuItem>Duplicate</MenuItem>
                <MenuSeparator />
                <MenuItem>Play Next</MenuItem>
                <MenuItem>Play Last</MenuItem>
                <MenuSeparator />
                <MenuItem variant='destructive'>
                  <TrashIcon /> Delete
                </MenuItem>
              </MenuPopup>
            </MenuPositioner>
          </MenuPortal>
        </Menu>
      )
    },
    {
      name: 'Open on hover',
      render: () => (
        <Menu>
          <MenuTrigger openOnHover delay={200}>
            Hover me
          </MenuTrigger>
          <MenuPortal>
            <MenuPositioner side='bottom' align='start' sideOffset={6}>
              <MenuPopup>
                <MenuItem>Preview</MenuItem>
                <MenuItem>Download</MenuItem>
                <MenuSeparator />
                <MenuItem>Copy link</MenuItem>
              </MenuPopup>
            </MenuPositioner>
          </MenuPortal>
        </Menu>
      )
    },
    {
      name: 'Checkbox items',
      render: () => (
        <Menu>
          <MenuFrame>
            <MenuGroup>
              <MenuGroupLabel>View</MenuGroupLabel>
              <MenuCheckboxItem defaultChecked inset>
                <MenuCheckboxItemIndicator />
                Show status bar
              </MenuCheckboxItem>
              <MenuCheckboxItem inset>Show minimap</MenuCheckboxItem>
              <MenuCheckboxItem disabled inset>Show word wrap (locked)</MenuCheckboxItem>
            </MenuGroup>
            <MenuSeparator />
            <MenuCheckboxItem closeOnClick inset>
              <MenuCheckboxItemIndicator />
              Keep the menu open
            </MenuCheckboxItem>
          </MenuFrame>
        </Menu>
      )
    },
    {
      name: 'Radio items',
      render: () => (
        <Menu>
          <MenuFrame>
            <MenuRadioGroup defaultValue='date'>
              <MenuGroupLabel>Sort by</MenuGroupLabel>
              <MenuRadioItem value='name' inset>
                <MenuRadioItemIndicator />
                Name
              </MenuRadioItem>
              <MenuRadioItem value='date' inset>
                <MenuRadioItemIndicator />
                Date modified
              </MenuRadioItem>
              <MenuRadioItem value='size' inset>
                <MenuRadioItemIndicator />
                File size
              </MenuRadioItem>
            </MenuRadioGroup>
          </MenuFrame>
        </Menu>
      )
    },
    {
      name: 'Close on click',
      render: () => (
        <Menu>
          <MenuFrame>
            <MenuItem>Closes the menu</MenuItem>
            <MenuItem closeOnClick={false}>Stays open</MenuItem>
            <MenuSeparator />
            <MenuCheckboxItem closeOnClick inset>
              <MenuCheckboxItemIndicator />
              Toggles and closes
            </MenuCheckboxItem>
          </MenuFrame>
        </Menu>
      )
    },
    {
      name: 'Group labels',
      render: () => (
        <Menu>
          <MenuFrame>
            <MenuGroup>
              <MenuGroupLabel>File</MenuGroupLabel>
              <MenuItem>New</MenuItem>
              <MenuItem>Open…</MenuItem>
            </MenuGroup>
            <MenuSeparator />
            <MenuGroup>
              <MenuGroupLabel>Edit</MenuGroupLabel>
              <MenuItem>Undo</MenuItem>
              <MenuItem>Redo</MenuItem>
            </MenuGroup>
            <MenuSeparator />
            <MenuRadioGroup defaultValue='grid'>
              <MenuGroupLabel>Layout</MenuGroupLabel>
              <MenuRadioItem value='grid' inset>
                <MenuRadioItemIndicator />
                Grid
              </MenuRadioItem>
              <MenuRadioItem value='list' inset>
                <MenuRadioItemIndicator />
                List
              </MenuRadioItem>
            </MenuRadioGroup>
          </MenuFrame>
        </Menu>
      )
    },
    {
      name: 'Nested menu',
      render: () => (
        <Menu>
          <MenuTrigger>Track</MenuTrigger>
          <MenuPortal>
            <MenuPositioner side='bottom' align='start' sideOffset={6}>
              <MenuPopup>
                <MenuItem>Add to Library</MenuItem>
                <MenuSubmenuRoot>
                  <MenuSubmenuTrigger>Add to Playlist</MenuSubmenuTrigger>
                  <MenuPortal>
                    <MenuPositioner side='inline-end' alignOffset={-4} sideOffset={-4}>
                      <MenuPopup>
                        <MenuItem>Get Up!</MenuItem>
                        <MenuItem>Inside Out</MenuItem>
                        <MenuItem>Night Beats</MenuItem>
                        <MenuSeparator />
                        <MenuItem>New playlist…</MenuItem>
                      </MenuPopup>
                    </MenuPositioner>
                  </MenuPortal>
                </MenuSubmenuRoot>
                <MenuSeparator />
                <MenuItem>Play Next</MenuItem>
                <MenuItem>Play Last</MenuItem>
              </MenuPopup>
            </MenuPositioner>
          </MenuPortal>
        </Menu>
      )
    },
    {
      name: 'Navigate to another page',
      render: () => (
        <Menu>
          <MenuFrame>
            <MenuLinkItem href='#menu-projects'>Go to Projects</MenuLinkItem>
            <MenuLinkItem href='#menu-settings'>Go to Settings</MenuLinkItem>
            <MenuSeparator />
            <MenuLinkItem href='https://base-ui.com' target='_blank' rel='noreferrer'>
              Documentation
            </MenuLinkItem>
          </MenuFrame>
        </Menu>
      )
    },
    {
      name: 'Open a dialog',
      render: () => <DialogFromMenu />
    },
    { name: 'Icon Button render', render: () => <IconButtonTrigger /> },
    {
      name: 'Detached triggers',
      render: () => <DetachedTriggers />
    },
    {
      name: 'Multiple triggers',
      render: () => (
        <>
          <Menu>
            <MenuTrigger>Row actions</MenuTrigger>
            <MenuTrigger>Quick actions</MenuTrigger>
            <MenuPortal>
              <MenuPositioner side='bottom' align='start' sideOffset={6}>
                <MenuPopup>
                  <MenuItem>Open</MenuItem>
                  <MenuItem>Share</MenuItem>
                </MenuPopup>
              </MenuPositioner>
            </MenuPortal>
          </Menu>
          <MultipleTriggersWithPayload />
        </>
      )
    },
    {
      name: 'Controlled mode with multiple triggers',
      render: () => <ControlledMultipleTriggers />
    },
    {
      name: 'Arrow',
      render: () => (
        <Menu>
          <MenuTrigger>
            Open <DotsThreeIcon />
          </MenuTrigger>
          <MenuPortal>
            <MenuPositioner side='bottom' align='start' sideOffset={6}>
              <MenuPopup>
                <MenuArrow />
                <MenuItem>Preview</MenuItem>
                <MenuItem>Download</MenuItem>
              </MenuPopup>
            </MenuPositioner>
          </MenuPortal>
        </Menu>
      )
    },
    { name: 'Animating the Menu', render: () => <AnimatingMenu /> }
  ]
}
