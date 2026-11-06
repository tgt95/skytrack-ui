# Menubar

> A menu bar providing commands and options for your application.

- Package version: `0.1.5`
- Public export: `skytrack-ui/menubar`
- Implementation: [`src/components/ui/menubar.tsx`](../../../../src/components/ui/menubar.tsx)
- Public type declaration: [`dist-lib/components/ui/menubar.d.ts`](../../../../dist-lib/components/ui/menubar.d.ts)
- Showcase demo id: `menubar`
- Closest demo: [`src/demos/menubar.demo.tsx`](../../../../src/demos/menubar.demo.tsx)

## Overview

The Menubar component organizes desktop application commands into a persistent horizontal or vertical strip of menus. Emulating desktop desktop menu bars (e.g. File, Edit, View, Missions), it allows operators to traverse across distinct menus with continuous arrow-key navigation.

The container component styles the bar and manages keyboard roaming between triggers, while individual dropdown menus are composed using `skytrack-ui/menu`.

**Live demo variant:** `Default`

```tsx
import { Menubar } from '@/components/ui/menubar'
import {
  Menu,
  MenuTrigger,
  MenuPortal,
  MenuPositioner,
  MenuPopup,
  MenuItem,
  MenuSeparator,
  MenuShortcut
} from '@/components/ui/menu'

const barTrigger =
  'h-8 rounded-(--radius) border-0 bg-transparent px-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground data-popup-open:bg-accent data-popup-open:text-accent-foreground'

export function MenubarExample() {
  return (
    <Menubar>
      <Menu>
        <MenuTrigger className={barTrigger}>Mission</MenuTrigger>
        <MenuPortal>
          <MenuPositioner side='bottom' align='start' sideOffset={4}>
            <MenuPopup>
              <MenuItem>
                New Flight Plan <MenuShortcut>⌘N</MenuShortcut>
              </MenuItem>
              <MenuItem>Open Log…</MenuItem>
              <MenuSeparator />
              <MenuItem>Export KML</MenuItem>
            </MenuPopup>
          </MenuPositioner>
        </MenuPortal>
      </Menu>
      <Menu>
        <MenuTrigger className={barTrigger}>View</MenuTrigger>
        <MenuPortal>
          <MenuPositioner side='bottom' align='start' sideOffset={4}>
            <MenuPopup>
              <MenuItem>Toggle 3D Terrain</MenuItem>
              <MenuItem>Airspace Layers</MenuItem>
            </MenuPopup>
          </MenuPositioner>
        </MenuPortal>
      </Menu>
    </Menubar>
  )
}
```

## Usage

Use Menubar in desktop flight planning suites, complex analytical workspaces, and multi-tool suites where extensive command hierarchies require constant visibility and quick access.

Do not use Menubar on compact mobile screens or simple websites where a hamburger drawer or standard navigation bar is appropriate. Do not place form inputs inside menubar triggers.

**Live demo variant:** `Submenus and shortcuts`

## Anatomy

Compose structurally:

1. `Menubar`: Base wrapper managing keyboard roaming and orientation (`data-slot='menubar'`).
2. Child `Menu` instances from `skytrack-ui/menu`:
   - `Menu`: Root instance per top-level command category.
   - `MenuTrigger`: Flat button embedded inside the bar strip.
   - `MenuPortal`, `MenuPositioner`, and `MenuPopup`: Popover content hierarchy.
   - `MenuItem`, `MenuSeparator`, `MenuShortcut`: Command rows and shortcuts.

**Live demo variant:** `Default`

## Variants & states

Supported configurations:

- Orientation: Horizontal (default flex row) or vertical (`orientation='vertical'` flex column).
- Disabled: `data-disabled` dims bar opacity to 50%.
- Trigger States: Highlights on hover and maintains active background when the associated menu popup is open (`data-popup-open`).

**Live demo variant:** `Vertical`

## Accessibility

- Built on `@base-ui/react/menubar`:
- Sets WAI-ARIA `role='menubar'` on the container and `role='menuitem'` on menu triggers.
- Roaming tabindex: Arrow keys (`ArrowLeft`, `ArrowRight`) traverse between category triggers without activating them.
- Seamless menu switching: Once one menu is open, hovering over adjacent triggers immediately displays their popups without extra clicks.

**Live demo variant:** `Submenus and shortcuts`

## API & examples

Import `Menubar` from `skytrack-ui/menubar` (or `@/components/ui/menubar` locally) and `Menu` parts from `skytrack-ui/menu`.

| Component | Props                                                            | Description                          |
| --------- | ---------------------------------------------------------------- | ------------------------------------ |
| `Menubar` | `orientation?: 'horizontal' \| 'vertical'`, `disabled?: boolean` | Bar container wrapping menu triggers |

Tokens: Uses `--border`, `--background`, `--accent`, and `--radius`.

**Live demo variant:** `Default`

## Evidence and limits

- Package/version checked: `0.1.5`.
- Export: [`package.json`](../../../../package.json) — `./menubar`.
- Source, public declarations, and closest demo: linked above.
- Limits or unverified behavior: None found in inspected source. `Menubar` only styles the outer strip; child menu logic is delegated to `skytrack-ui/menu`.
