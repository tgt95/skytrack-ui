# Sidebar

> A composable, themeable navigation panel with offcanvas, icon and fixed desktop modes.

- Package version: `0.1.5`
- Public export: `skytrack-ui/sidebar`
- Implementation: [`src/components/ui/sidebar.tsx`](../../../../../src/components/ui/sidebar.tsx)
- Public type declaration: generated declaration `dist-lib/components/ui/sidebar.d.ts` is absent in this checkout; source type declarations are exported in [`src/components/ui/sidebar.tsx`](../../../../../src/components/ui/sidebar.tsx).
- Showcase demo id: `sidebar`
- Closest demo: [`src/demos/sidebar.demo.tsx`](../../../../../src/demos/sidebar.demo.tsx)

## Overview

The Sidebar component provides a responsive application layout shell and primary navigation panel. It features collapsible icon rail modes, off-canvas drawers for mobile viewports, keyboard toggle shortcuts (`⌘+B` / `Ctrl+B`), floating or inset layout variants, and integrated submenus with tooltips.

**Live demo variant:** `Icon collapse`

```tsx
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger
} from '@/components/ui/sidebar'
import { HouseIcon, RocketLaunchIcon } from '@phosphor-icons/react'

export function SidebarDemo() {
  return (
    <SidebarProvider defaultOpen>
      <div className='flex h-64 w-full border border-border bg-background'>
        <Sidebar collapsible='icon'>
          <SidebarHeader className='p-3 font-semibold'>SkyTrack OS</SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton isActive tooltip='Overview'>
                      <HouseIcon />
                      <span>Overview</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip='Missions'>
                      <RocketLaunchIcon />
                      <span>Missions</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <main className='flex-1 p-4'>
          <SidebarTrigger />
        </main>
      </div>
    </SidebarProvider>
  )
}
```

## Usage

Use Sidebar as the high-level application framework navigation for desktop dashboards, management consoles, and complex multi-page operational tools. Do not use Sidebar as a transient contextual menu (use `Menu` or `Dropdown`) or as a simple modal dialogue (use `Dialog`). On narrow viewports, Sidebar automatically adapts into a touch-friendly slide-over mobile drawer.

**Live demo variant:** `Right side`

## Anatomy

### Composition Tree

```text
<SidebarProvider defaultOpen>
├─ <Sidebar collapsible='offcanvas|icon|none' side='left|right'>
│  ├─ <SidebarHeader>
│  │  └─ Workspace switcher
│  ├─ <SidebarContent>
│  │  └─ <SidebarGroup>
│  │     ├─ <SidebarGroupLabel>Navigation</SidebarGroupLabel>
│  │     └─ <SidebarMenu>
│  │        └─ <SidebarMenuItem>
│  │           └─ <SidebarMenuButton />
│  └─ <SidebarFooter>
│     └─ User menu
└─ <SidebarInset>
   ├─ <SidebarTrigger />
   └─ Main content
```

Sidebar is composed of hierarchical layout parts:

1. `SidebarProvider` (Top-level context provider managing state, mobile detection, and keyboard hotkeys)
2. `Sidebar` (Container element managing collapsible widths and placement)
3. `SidebarHeader` (Brand, logo, and workspace switcher header)
4. `SidebarContent` (Scrollable container holding navigation sections)
5. `SidebarGroup`, `SidebarGroupLabel`, `SidebarGroupAction`, & `SidebarGroupContent` (Navigation categories)
6. `SidebarMenu` & `SidebarMenuItem` (List and items)
7. `SidebarMenuButton` (Interactive navigation links or buttons with icon and text)
8. `SidebarMenuAction` & `SidebarMenuBadge` (Secondary buttons and status counts)
9. `SidebarMenuSub`, `SidebarMenuSubItem`, & `SidebarMenuSubButton` (Nested second-level menus)
10. `SidebarFooter` (User profile or bottom settings container)
11. `SidebarRail` (Draggable / clickable edge strip to toggle collapse state)
12. `SidebarTrigger` (Toggle button controlling expanded/collapsed state)
13. `SidebarInset` (Main application content container paired with inset sidebars)

**Live demo variant:** `Icon collapse`

## Variants & states

Supported variants:

- `collapsible`: `offcanvas` (slides completely offscreen), `icon` (collapses to 48px icon rail), or `none` (fixed width).
- `variant`: `sidebar` (flush edge), `floating` (floating card with margins), or `inset` (inset card inside viewport).
- `side`: `left` (default) or `right`.

**Live demo variant:** `Inset layout`

## Accessibility

`Sidebar` renders semantic `<aside>` or `<nav>` landmark regions with `aria-label='Sidebar'`. When collapsed in `icon` mode, `SidebarMenuButton` automatically renders a `Tooltip` to sighted and screen reader users. On mobile devices, the drawer manages modal focus trapping and `aria-modal='true'`.

**Live demo variant:** `Icon collapse`

## API & examples

Import components, constants, and the `useSidebar` hook from `skytrack-ui/sidebar` or `@/components/ui/sidebar`. Key exported constants: `SIDEBAR_WIDTH` (`16rem`), `SIDEBAR_WIDTH_ICON` (`3rem`), and `SIDEBAR_KEYBOARD_SHORTCUT` (`b`).

**Live demo variant:** `Icon collapse`

## Evidence and limits

- Package/version checked: `0.1.5`.
- Export: [`package.json`](../../../../../package.json) — `./sidebar`.
- Source, public declarations, and closest demo: linked above.
- Limits or unverified behavior: The generated declaration `dist-lib/components/ui/sidebar.d.ts` is absent in this checkout; rely on source types exported from `src/components/ui/sidebar.tsx`.
