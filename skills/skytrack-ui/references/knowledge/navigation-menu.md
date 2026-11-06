# Navigation Menu

> A high-quality, unstyled React navigation menu component that displays a collection of links and menus for website navigation.

- Package version: `0.1.5`
- Public export: `skytrack-ui/navigation-menu`
- Implementation: [`src/components/ui/navigation-menu.tsx`](../../../../src/components/ui/navigation-menu.tsx)
- Public type declaration: [`dist-lib/components/ui/navigation-menu.d.ts`](../../../../dist-lib/components/ui/navigation-menu.d.ts)
- Showcase demo id: `navigation-menu`
- Closest demo: [`src/demos/navigation-menu.demo.tsx`](../../../../src/demos/navigation-menu.demo.tsx)

## Overview

The Navigation Menu provides a comprehensive, accessible header navigation system with interactive dropdown panels, flyouts, and animated indicators. In SkyTrack, it powers the global navigation bar, allowing operators to switch between mission workspaces, flight operations, fleet registries, and live map views.

Built on `@base-ui/react/navigation-menu`, it coordinates delay-based pointer interactions, animated active indicators, and keyboard navigation.

**Live demo variant:** `Default`

```tsx
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuIcon,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuPortal,
  NavigationMenuPositioner,
  NavigationMenuPopup,
  NavigationMenuArrow,
  NavigationMenuViewport
} from '@/components/ui/navigation-menu'
import { Button } from '@/components/ui/button'

export function NavigationMenuExample() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger render={<Button variant='outline' />}>
            Missions
            <NavigationMenuIcon />
          </NavigationMenuTrigger>
          <NavigationMenuContent className='grid w-80 gap-3 p-4'>
            <NavigationMenuLink href='#surveys' className='block select-none rounded-(--radius) p-2 hover:bg-accent'>
              <div className='text-sm font-medium'>Autonomous Surveys</div>
              <p className='text-xs text-muted-foreground'>Configure grid patterns and orthomosaics.</p>
            </NavigationMenuLink>
            <NavigationMenuLink href='#corridors' className='block select-none rounded-(--radius) p-2 hover:bg-accent'>
              <div className='text-sm font-medium'>Linear Infrastructure</div>
              <p className='text-xs text-muted-foreground'>Pipeline and transmission line inspections.</p>
            </NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href='#fleet'>Aircraft Fleet</NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>

      <NavigationMenuPortal>
        <NavigationMenuPositioner sideOffset={10}>
          <NavigationMenuPopup>
            <NavigationMenuArrow />
            <NavigationMenuViewport />
          </NavigationMenuPopup>
        </NavigationMenuPositioner>
      </NavigationMenuPortal>
    </NavigationMenu>
  )
}
```

## Usage

Use Navigation Menu for primary application headers where major sections branch into multiple destinations or feature previews.

Do not use Navigation Menu for secondary page commands or action menus (use `skytrack-ui/menu` or `skytrack-ui/menubar`). Do not use Navigation Menu inside compact mobile layouts without switching to a drawer (use `skytrack-ui/drawer`).

**Live demo variant:** `Custom links`

## Anatomy

Render in strict structural order:

1. `NavigationMenu`: Root coordinator (`BaseNavigationMenu.Root`).
2. `NavigationMenuList`: Horizontal or vertical item list (`data-slot='navigation-menu-list'`).
3. `NavigationMenuItem`: Parent wrapper for trigger and panel (`data-slot='navigation-menu-item'`).
4. `NavigationMenuTrigger`: Dropdown trigger button (`data-slot='navigation-menu-trigger'`).
5. `NavigationMenuIcon`: Animated chevron rotating when panel opens (`data-slot='navigation-menu-icon'`).
6. `NavigationMenuContent`: Content container for custom links and card grids (`data-slot='navigation-menu-content'`).
7. `NavigationMenuPortal`: Teleports flyout content into document root (`data-slot='navigation-menu-portal'`).
8. `NavigationMenuPositioner`: Positions dropdown relative to triggers (`data-slot='navigation-menu-positioner'`).
9. `NavigationMenuPopup`: Styled popover surface (`data-slot='navigation-menu-popup'`).
10. `NavigationMenuArrow`: Visual arrow pointer anchored to trigger (`data-slot='navigation-menu-arrow'`).
11. `NavigationMenuViewport`: Smoothly animates size changes across different tab contents (`data-slot='navigation-menu-viewport'`).
12. `NavigationMenuLink`: Anchor element with active styling (`data-slot='navigation-menu-link'`).

**Live demo variant:** `Nested submenus`

## Variants & states

Supported features:

- Trigger Styling: Styled with `Button` composition (e.g. `render={<Button variant='outline' />}`) or direct utility classes for consistent hover and open states.
- Orientation: Horizontal bar (default) or vertical (`orientation='vertical'`).
- Animated Viewport: Smoothly morphs width and height when transitioning between menus of varying content sizes.
- Direct Links: Can mix dropdown triggers with plain `NavigationMenuLink` elements.

**Live demo variant:** `Large menus`

## Accessibility

- Built on `@base-ui/react/navigation-menu`:
- Sets WAI-ARIA `role='navigation'` and list structure.
- Keyboard navigation: `ArrowRight` and `ArrowLeft` traverse between top-level items; `ArrowDown` enters the active popup; `Escape` closes the active panel and focuses trigger.
- Pointer hover incorporates an intentional delay buffer so diagonal mouse movement toward submenus does not prematurely close the flyout.

**Live demo variant:** `Nested inline submenus`

## API & examples

Import named parts from `skytrack-ui/navigation-menu` (or `@/components/ui/navigation-menu` locally): `NavigationMenu`, `NavigationMenuList`, `NavigationMenuItem`, `NavigationMenuTrigger`, `NavigationMenuIcon`, `NavigationMenuContent`, `NavigationMenuPortal`, `NavigationMenuBackdrop`, `NavigationMenuPositioner`, `NavigationMenuPopup`, `NavigationMenuViewport`, `NavigationMenuArrow`, `NavigationMenuLink`.

| Export                  | Type        | Description                                                       |
| ----------------------- | ----------- | ----------------------------------------------------------------- |
| `NavigationMenu`        | `Component` | Root navigation wrapper                                           |
| `NavigationMenuTrigger` | `Component` | Dropdown trigger button composed with Button or utility classes   |
| `NavigationMenuLink`    | `Component` | Navigational anchor element with built-in hover and active styles |
| `NavigationMenuArrow`   | `Component` | Dropdown arrow pointer rendered inside popup                      |

Tokens: Uses `--popover`, `--popover-foreground`, `--border`, `--accent`, and `--radius`.

**Live demo variant:** `Default`

## Evidence and limits

- Package/version checked: `0.1.5`.
- Export: [`package.json`](../../../../package.json) — `./navigation-menu`.
- Source, public declarations, and closest demo: linked above.
- Limits or unverified behavior: Demo content is illustrative; adapt its links and menu content to the product's actual navigation structure.
