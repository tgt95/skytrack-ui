# Menu

> A high-quality, unstyled React menu component that displays list of actions in a dropdown, enhanced with keyboard navigation.

- Package version: `0.1.5`
- Public export: `skytrack-ui/menu`
- Implementation: [`src/components/ui/menu.tsx`](../../../../../src/components/ui/menu.tsx)
- Public type declaration: [`dist-lib/components/ui/menu.d.ts`](../../../../../dist-lib/components/ui/menu.d.ts)
- Showcase demo id: `menu`
- Closest demo: [`src/demos/menu.demo.tsx`](../../../../../src/demos/menu.demo.tsx)

## Overview

The Menu component renders an accessible dropdown panel displaying a list of contextual actions, commands, links, and selectable options anchored to a trigger button. It powers top navigation dropdowns, table row overflow menus (`...`), export option menus, and filter selection panels.

Built on `@base-ui/react/menu`, it features smooth animations, nested submenus, checkbox and radio item groups, collision-aware auto-positioning, and complete keyboard traversal.

**Live demo variant:** `Default`

```tsx
import { Menu, MenuTrigger, MenuPortal, MenuPositioner, MenuPopup, MenuItem, MenuSeparator } from '@/components/ui/menu'
import { Button } from '@/components/ui/button'
import { DotsThreeIcon } from '@phosphor-icons/react'

export function MenuExample() {
  return (
    <Menu>
      <MenuTrigger
        render={
          <Button variant='outline' size='icon'>
            <DotsThreeIcon size={20} />
          </Button>
        }
      />
      <MenuPortal>
        <MenuPositioner>
          <MenuPopup className='w-48'>
            <MenuItem onSelect={() => alert('Exporting telemetry')}>Export flight logs</MenuItem>
            <MenuItem onSelect={() => alert('Duplicating mission')}>Duplicate mission</MenuItem>
            <MenuSeparator />
            <MenuItem variant='destructive' onSelect={() => alert('Deleting mission')}>
              Delete mission
            </MenuItem>
          </MenuPopup>
        </MenuPositioner>
      </MenuPortal>
    </Menu>
  )
}
```

## Usage

Use Menu when space is constrained and a single button should offer multiple secondary actions or configuration toggles.

Do not use Menu for selecting a value within a form submission (use `skytrack-ui/select`). Do not use Menu when all options should remain permanently visible on desktop (use a toolbar or button group). Keep menu hierarchies shallow: avoid more than one nested submenu level.

**Live demo variant:** `Group labels`

## Anatomy

### Composition Tree

```text
<Menu open={open} onOpenChange={setOpen}>
├─ <MenuTrigger render={<Button ... />} />
└─ <MenuPortal>
   └─ <MenuPositioner side='bottom' align='start'>
      └─ <MenuPopup>
         ├─ <MenuItem>Item 1</MenuItem>
         ├─ <MenuCheckboxItem checked={...}>
         │  └─ <MenuItemIndicator />
         ├─ <MenuSeparator />
         └─ <MenuSubmenu>
            ├─ <MenuSubmenuTrigger />
            └─ <MenuPortal>
               └─ <MenuPositioner>
                  └─ <MenuPopup> ...
```

Render in strict nested order:

1. `Menu`: Root coordinator (`BaseMenu.Root`).
2. `MenuTrigger`: Interactive button opening the menu (`data-slot='menu-trigger'`).
3. `MenuPortal`: Teleports menu content into document root (`data-slot='menu-portal'`).
4. `MenuPositioner`: Anchors popup to trigger with side and alignment offsets (`data-slot='menu-positioner'`).
5. `MenuPopup`: Styled dropdown surface card (`data-slot='menu-popup'`).
6. Content items:
   - `MenuItem`: Action row (`data-slot='menu-item'`).
   - `MenuLinkItem`: Navigational anchor row (`data-slot='menu-link-item'`).
   - `MenuCheckboxItem` & `MenuCheckboxItemIndicator`: Boolean toggle row.
   - `MenuRadioGroup`, `MenuRadioItem` & `MenuRadioItemIndicator`: Mutually exclusive option group.
   - `MenuSubmenuRoot` & `MenuSubmenuTrigger`: Cascading submenu.
   - `MenuGroup` & `MenuGroupLabel`: Section heading wrapper.
   - `MenuSeparator`: Horizontal dividing rule (`data-slot='menu-separator'`).
   - `MenuShortcut`: Trailing keyboard shortcut badge.

**Live demo variant:** `Nested menu`

## Variants & states

Item styling via `menuItemVariants`:

- `variant='default'`: Standard popover foreground with accent hover highlight.
- `variant='destructive'`: Red text highlighting in solid red (`text-destructive data-highlighted:bg-destructive data-highlighted:text-white`).
- `inset={true}`: Adds `pl-8` indent to align items lacking checkmark icons.

States:

- Open / Closed: Controlled or uncontrolled via `open` and `onOpenChange`.
- Highlighted: Keyboard or pointer focus sets `data-highlighted`.
- Disabled: Disables selection with `data-disabled` opacity.

**Live demo variant:** `Checkbox items`

## Accessibility

- Built on `@base-ui/react/menu`:
- Applies WAI-ARIA `role='menu'` to popup, `role='menuitem'`, `role='menuitemcheckbox'`, and `role='menuitemradio'`.
- Keyboard navigation: `ArrowDown` and `ArrowUp` move focus between items; `ArrowRight` opens submenus; `ArrowLeft` closes submenus; `Enter` or `Space` triggers action; `Escape` closes the menu and returns focus to the trigger.
- Typeahead: Typing letters immediately focuses the first matching item.

**Live demo variant:** `Open a dialog`

## API & examples

Import named parts from `skytrack-ui/menu` (or `@/components/ui/menu` locally).

| Component          | Target Props                                                                                                   | Description                               |
| ------------------ | -------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| `Menu`             | `open?: boolean`, `onOpenChange?: (open: boolean) => void`                                                     | Root component                            |
| `MenuTrigger`      | `render?: ReactElement`, `disabled?: boolean`                                                                  | Element triggering menu                   |
| `MenuPositioner`   | `side?: 'top' \| 'bottom' \| 'left' \| 'right'`, `align?: 'start' \| 'center' \| 'end'`, `sideOffset?: number` | Anchoring geometry                        |
| `MenuItem`         | `variant?: 'default' \| 'destructive'`, `inset?: boolean`, `onSelect?: () => void`                             | Clickable action row                      |
| `createMenuHandle` | `() => MenuRootHandle`                                                                                         | Programmatic handle for detached triggers |

Tokens: Uses `--popover`, `--popover-foreground`, `--border`, `--accent`, and `--radius`.

**Live demo variant:** `Controlled mode with multiple triggers`

## Evidence and limits

- Package/version checked: `0.1.5`.
- Export: [`package.json`](../../../../../package.json) — `./menu`.
- Source, public declarations, and closest demo: linked above.
- Limits or unverified behavior: None found in inspected source. Designed for command menus; form inputs should not be embedded inside MenuPopup.
