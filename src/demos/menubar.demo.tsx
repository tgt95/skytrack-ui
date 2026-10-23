import { Check, PencilSimple, Trash } from '@phosphor-icons/react'
import { Menubar } from '@/components/ui/menubar'
import {
  Menu,
  MenuCheckboxItem,
  MenuCheckboxItemIndicator,
  MenuGroup,
  MenuGroupLabel,
  MenuItem,
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
  MenuTrigger
} from '@/components/ui/menu'
import type { DemoMeta } from '@/showcase/demo'

/** Trigger styling for a menubar: flat, no border, sits inside the bar. */
const barTrigger =
  'h-8 rounded-md border-0 bg-transparent px-3 font-medium hover:bg-accent hover:text-accent-foreground data-[popup-open]:bg-accent data-[popup-open]:text-accent-foreground'

function DefaultMenubar() {
  return (
    <Menubar>
      <Menu>
        <MenuTrigger className={barTrigger}>File</MenuTrigger>
        <MenuPortal>
          <MenuPositioner side='bottom' align='start' sideOffset={4}>
            <MenuPopup>
              <MenuItem>
                New
                <MenuShortcut>⌘N</MenuShortcut>
              </MenuItem>
              <MenuItem>
                Open…
                <MenuShortcut>⌘O</MenuShortcut>
              </MenuItem>
              <MenuSeparator />
              <MenuItem>Save</MenuItem>
              <MenuItem>Save As…</MenuItem>
            </MenuPopup>
          </MenuPositioner>
        </MenuPortal>
      </Menu>

      <Menu>
        <MenuTrigger className={barTrigger}>Edit</MenuTrigger>
        <MenuPortal>
          <MenuPositioner side='bottom' align='start' sideOffset={4}>
            <MenuPopup>
              <MenuItem>Undo</MenuItem>
              <MenuItem>Redo</MenuItem>
              <MenuSeparator />
              <MenuItem>Cut</MenuItem>
              <MenuItem>Copy</MenuItem>
              <MenuItem>Paste</MenuItem>
            </MenuPopup>
          </MenuPositioner>
        </MenuPortal>
      </Menu>

      <Menu>
        <MenuTrigger className={barTrigger}>View</MenuTrigger>
        <MenuPortal>
          <MenuPositioner side='bottom' align='start' sideOffset={4}>
            <MenuPopup>
              <MenuCheckboxItem defaultChecked inset>
                <MenuCheckboxItemIndicator />
                Show sidebar
              </MenuCheckboxItem>
              <MenuCheckboxItem inset>Show status bar</MenuCheckboxItem>
              <MenuSeparator />
              <MenuRadioGroup defaultValue='comfortable'>
                <MenuGroupLabel>Density</MenuGroupLabel>
                <MenuRadioItem value='compact' inset>
                  <MenuRadioItemIndicator />
                  Compact
                </MenuRadioItem>
                <MenuRadioItem value='comfortable' inset>
                  <MenuRadioItemIndicator />
                  Comfortable
                </MenuRadioItem>
              </MenuRadioGroup>
            </MenuPopup>
          </MenuPositioner>
        </MenuPortal>
      </Menu>

      <Menu>
        <MenuTrigger className={barTrigger}>Help</MenuTrigger>
        <MenuPortal>
          <MenuPositioner side='bottom' align='start' sideOffset={4}>
            <MenuPopup>
              <MenuItem>
                Documentation
                <MenuShortcut>⌘/</MenuShortcut>
              </MenuItem>
              <MenuItem>Keyboard shortcuts</MenuItem>
            </MenuPopup>
          </MenuPositioner>
        </MenuPortal>
      </Menu>
    </Menubar>
  )
}

function MenubarWithSubmenu() {
  return (
    <Menubar>
      <Menu>
        <MenuTrigger className={barTrigger}>File</MenuTrigger>
        <MenuPortal>
          <MenuPositioner side='bottom' align='start' sideOffset={4}>
            <MenuPopup>
              <MenuItem>New</MenuItem>
              <MenuItem>Open…</MenuItem>
              <MenuSubmenuRoot>
                <MenuSubmenuTrigger>Export</MenuSubmenuTrigger>
                <MenuPortal>
                  <MenuPositioner side='inline-end' alignOffset={-4} sideOffset={-4}>
                    <MenuPopup>
                      <MenuGroup>
                        <MenuGroupLabel>Format</MenuGroupLabel>
                        <MenuItem>MP3</MenuItem>
                        <MenuItem>WAV</MenuItem>
                        <MenuItem>FLAC</MenuItem>
                      </MenuGroup>
                    </MenuPopup>
                  </MenuPositioner>
                </MenuPortal>
              </MenuSubmenuRoot>
              <MenuSeparator />
              <MenuItem variant='destructive'>
                <Trash /> Delete
              </MenuItem>
            </MenuPopup>
          </MenuPositioner>
        </MenuPortal>
      </Menu>

      <Menu>
        <MenuTrigger className={barTrigger}>Edit</MenuTrigger>
        <MenuPortal>
          <MenuPositioner side='bottom' align='start' sideOffset={4}>
            <MenuPopup>
              <MenuItem>
                <PencilSimple /> Rename
                <MenuShortcut>F2</MenuShortcut>
              </MenuItem>
              <MenuSeparator />
              <MenuItem disabled>Duplicate</MenuItem>
              <MenuItem>
                <Check /> Select all
                <MenuShortcut>⌘A</MenuShortcut>
              </MenuItem>
            </MenuPopup>
          </MenuPositioner>
        </MenuPortal>
      </Menu>
    </Menubar>
  )
}

function VerticalMenubar() {
  return (
    <Menubar orientation='vertical'>
      <Menu>
        <MenuTrigger className={barTrigger}>Format</MenuTrigger>
        <MenuPortal>
          <MenuPositioner side='inline-end' align='start' sideOffset={4}>
            <MenuPopup>
              <MenuItem>Bold</MenuItem>
              <MenuItem>Italic</MenuItem>
              <MenuSeparator />
              <MenuItem>Clear formatting</MenuItem>
            </MenuPopup>
          </MenuPositioner>
        </MenuPortal>
      </Menu>
      <Menu>
        <MenuTrigger className={barTrigger}>Arrange</MenuTrigger>
        <MenuPortal>
          <MenuPositioner side='inline-end' align='start' sideOffset={4}>
            <MenuPopup>
              <MenuItem>Bring to front</MenuItem>
              <MenuItem>Send to back</MenuItem>
            </MenuPopup>
          </MenuPositioner>
        </MenuPortal>
      </Menu>
    </Menubar>
  )
}

export const demo: DemoMeta = {
  id: 'menubar',
  title: 'Menubar',
  description: 'A menu bar providing commands and options for your application.',
  group: 'Menus & Navigation',
  variants: [
    { name: 'Default', render: () => <DefaultMenubar /> },
    { name: 'Submenus and shortcuts', render: () => <MenubarWithSubmenu /> },
    { name: 'Vertical', render: () => <VerticalMenubar /> }
  ]
}
