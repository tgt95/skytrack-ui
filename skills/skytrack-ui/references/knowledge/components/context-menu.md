# Context Menu

> A high-quality, unstyled React context menu component that appears at the pointer on right click or long press.

- Package version: `0.1.5`
- Public export: `skytrack-ui/context-menu`
- Implementation: [`src/components/ui/context-menu.tsx`](../../../../../src/components/ui/context-menu.tsx)
- Public type declaration: [`dist-lib/components/ui/context-menu.d.ts`](../../../../../dist-lib/components/ui/context-menu.d.ts)
- Showcase demo id: `context-menu`
- Closest demo: [`src/demos/context-menu.demo.tsx`](../../../../../src/demos/context-menu.demo.tsx)

## Overview

The Context Menu presents contextual actions and options anchored directly to the user's pointer upon a right-click or mobile long-press gesture. In SkyTrack, it powers spatial map interactions (e.g. right-clicking a waypoint or drone marker on the 2D map to inspect telemetry, set an altitude override, or command Return-to-Home) and table row actions.

It reuses the exact visual token system and typography as `skytrack-ui/menu` to guarantee unified styling across popup interactions.

**Live demo variant:** `Default`

```tsx
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuPortal,
  ContextMenuPositioner,
  ContextMenuPopup,
  ContextMenuItem,
  ContextMenuSeparator
} from '@/components/ui/context-menu'

export function ContextMenuExample() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className='flex h-32 w-64 items-center justify-center rounded-(--radius) border border-dashed border-border text-sm text-muted-foreground select-none'>
        Right click here for actions
      </ContextMenuTrigger>
      <ContextMenuPortal>
        <ContextMenuPositioner>
          <ContextMenuPopup className='w-48'>
            <ContextMenuItem onSelect={() => alert('Add waypoint')}>Add waypoint</ContextMenuItem>
            <ContextMenuItem onSelect={() => alert('Center camera')}>Center map view</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem variant='destructive' onSelect={() => alert('Clear markers')}>
              Clear all markers
            </ContextMenuItem>
          </ContextMenuPopup>
        </ContextMenuPositioner>
      </ContextMenuPortal>
    </ContextMenu>
  )
}
```

## Usage

Use Context Menu on complex canvas elements, flight logs, waypoint pins, and data tables where secondary contextual actions improve workflow speed.

Do not use Context Menu as the primary or sole method to execute an action; always ensure actions are reachable through visible buttons or toolbars. Avoid deeply nested submenus beyond one level to prevent pointer slippage.

**Live demo variant:** `Using with Menu`

## Anatomy

### Composition Tree

```text
<ContextMenu>
├─ <ContextMenuTrigger>Right-click surface</ContextMenuTrigger>
└─ <ContextMenuPortal>
   └─ <ContextMenuPositioner>
      └─ <ContextMenuPopup>
         ├─ <ContextMenuItem>Action</ContextMenuItem>
         ├─ <ContextMenuCheckboxItem checked={...}>
         │  └─ <ContextMenuItemIndicator />
         ├─ <ContextMenuSeparator />
         └─ <ContextMenuSubmenu>
            ├─ <ContextMenuSubmenuTrigger />
            └─ <ContextMenuPortal>
               └─ <ContextMenuPositioner>
                  └─ <ContextMenuPopup> ...
```

Render in strict structural order:

1. `ContextMenu`: Root coordination component.
2. `ContextMenuTrigger`: Interactive surface listening for right-click (`contextmenu`) or long-press events (`data-slot='context-menu-trigger'`).
3. `ContextMenuPortal`: Teleports menu content into the document body (`data-slot='context-menu-portal'`).
4. `ContextMenuPositioner`: Coordinates pointer positioning and collision avoidance (`data-slot='context-menu-positioner'`).
5. `ContextMenuPopup`: Styled popover surface (`data-slot='context-menu-popup'`).
6. Content items: `ContextMenuItem`, `ContextMenuLinkItem`, `ContextMenuCheckboxItem`, `ContextMenuRadioGroup`, `ContextMenuRadioItem`, `ContextMenuSubmenuRoot`, `ContextMenuSeparator`, `ContextMenuGroupLabel`.

**Live demo variant:** `Nested menu`

## Variants & states

Item variants via `contextMenuItemVariants`:

- `default`: Neutral text and hover highlight (`data-highlighted:bg-accent`).
- `destructive`: Red text and red highlight (`text-destructive data-highlighted:bg-destructive data-highlighted:text-white`).
- `inset`: Adds `pl-8` indentation for items without icons when aligning beside checkbox or radio items.

Item states:

- Highlighted: Pointer hover or arrow-key focus applies `bg-accent text-accent-foreground`.
- Disabled: `data-disabled` applies `opacity-50 pointer-events-none`.
- Checked: Checkbox and radio items display `CheckIcon` indicators.

**Live demo variant:** `Checkbox and radio items`

## Accessibility

- Built on `@base-ui/react/context-menu`:
- Sets `role='menu'` on the popup, `role='menuitem'` on action rows, `role='menuitemcheckbox'`, and `role='menuitemradio'`.
- Keyboard navigation: Full arrow key traversal (`ArrowDown`, `ArrowUp`); `ArrowRight` expands submenus; `ArrowLeft` returns to parent menu; `Enter` or `Space` executes selection; `Escape` closes the menu.
- Pointer alignment: Accurately positions menu at pointer coordinates while automatically flipping to prevent screen-edge overflow.

**Live demo variant:** `Default`

## API & examples

Import named parts from `skytrack-ui/context-menu` (or `@/components/ui/context-menu` locally).

| Component                   | Target Props                                                                                             | Description                               |
| --------------------------- | -------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| `ContextMenuItem`           | `variant?: 'default' \| 'destructive'`, `inset?: boolean`, `disabled?: boolean`, `onSelect?: () => void` | Standard menu item                        |
| `ContextMenuCheckboxItem`   | `checked?: boolean`, `onCheckedChange?: (checked: boolean) => void`                                      | Toggleable checkbox item                  |
| `ContextMenuRadioItem`      | `value: string`                                                                                          | Radio item inside `ContextMenuRadioGroup` |
| `ContextMenuSubmenuTrigger` | `disabled?: boolean`                                                                                     | Expands nested submenu                    |
| `ContextMenuShortcut`       | `children: ReactNode`                                                                                    | Renders keyboard shortcut label           |

Tokens: Reuses `--popover`, `--popover-foreground`, `--accent`, `--border`, and `--radius`.

**Live demo variant:** `Using with Menu`

## Evidence and limits

- Package/version checked: `0.1.5`.
- Export: [`package.json`](../../../../../package.json) — `./context-menu`.
- Source, public declarations, and closest demo: linked above.
- Limits or unverified behavior: Context menus are triggered by pointer right-click or touch long-press; ensure keyboard users can trigger identical actions via standard focusable menus or shortcuts.
