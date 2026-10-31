# Menubar

> A row of top-level menus for related application commands.

- Package version: `0.1.5`
- Public export: `skytrack-ui/menubar`
- Implementation: [`src/components/ui/menubar.tsx`](../../src/components/ui/menubar.tsx)
- Public type declaration: [`dist-lib/components/ui/menubar.d.ts`](../../dist-lib/components/ui/menubar.d.ts)
- Showcase demo id: `menubar`
- Closest demo: [`src/demos/menubar.demo.tsx`](../../src/demos/menubar.demo.tsx)
- Official guidance: [W3C WAI ARIA Menubar Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/)

## Usage

Use Menubar in desktop-style applications where people expect a persistent top-level command bar with familiar groups such as File, Edit, View, and Help.

Avoid Menubar for standard consumer web pages, mobile flows, or simple forms where a unified navigation bar or simple action menu is much more intuitive.

The best alternative for top-level application navigation is Navigation Menu. For a cluster of context-specific editing tools, choose Toolbar.

**Live demo variant:** `Default`

## Behavior

Clicking any menubar item opens its dropdown menu. Once any menu is open, moving the pointer over sibling menubar items immediately opens them without requiring additional clicks.

Submenus open on hover or `ArrowRight`. Clicking an action executes it and dismisses the menu. Pressing `Escape` closes the active menu and returns focus to the menubar trigger.

**Live demo variant:** `Submenus and shortcuts`

## Layout

Place Menubar horizontally at the very top of the application workspace canvas, immediately below or integrated with the main application title bar.

Order menu groups by familiarity and frequency: common file and edit actions first, then product-specific actions, followed by view and help. Use a vertical arrangement only when the surrounding layout calls for it.

| Do                                                                                                          | Don't                                                                                                     | Why                                                                                                                    |
| ----------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Display standardized keyboard shortcuts right-aligned within menu items (e.g. ⌘S, ⌘Z) to train power users. | Place freeform text inputs or interactive toggles directly inside the horizontal top-level menubar strip. | Menubars are command-driven structures; embedding data-entry controls disrupts expected keyboard arrow-key navigation. |

**Live demo variant:** `Vertical`

## Accessibility

Give each menu a clear name. Arrow keys move between menus and open their options; Escape closes them. Make shortcuts discoverable.

**Live demo variant:** `Submenus and shortcuts`

## Content

Top-level triggers must be short, single-word nouns in title case (File, Edit, View, Project, Help).

Submenu items should use concise sentence-case action verbs ("New project sequence", "Export activity data log", "Save as draft").

**Live demo variant:** `Default`
