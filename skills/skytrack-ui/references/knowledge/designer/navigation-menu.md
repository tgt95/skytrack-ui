# Navigation Menu

> A set of primary destinations and related links.

- Package version: `0.1.5`
- Public export: `skytrack-ui/navigation-menu`
- Implementation: [`src/components/ui/navigation-menu.tsx`](../../../../../src/components/ui/navigation-menu.tsx)
- Public type declaration: [`dist-lib/components/ui/navigation-menu.d.ts`](../../../../../dist-lib/components/ui/navigation-menu.d.ts)
- Showcase demo id: `navigation-menu`
- Closest demo: [`src/demos/navigation-menu.demo.tsx`](../../../../../src/demos/navigation-menu.demo.tsx)
- Official guidance: [Carbon Design System UI Shell Header](https://carbondesignsystem.com/components/UI-shell-header/usage/)

## Usage

Use Navigation Menu for primary global application header navigation where destinations require rich multi-column flyout panels, featured links, category descriptions, or structured sub-links.

Avoid Navigation Menu for simple contextual action menus (use Menu), tabbed views within a single screen (use Tabs), or deep hierarchical folder exploration (use Sidebar).

The best alternative for multi-tiered application module navigation is Sidebar. For simple non-nested command triggers, choose Menu.

**Live demo variant:** `Default`

## Types

Choose direct links for a short hierarchy, nested navigation for deeper paths, or an expanded menu for related destinations.

## Behavior

Use the trigger and popup to expose related destinations. Keep navigation choices as links; put task controls in the page or an action menu.

Make nested destinations available by pointer and keyboard so people are not required to hover to discover or open them.

**Live demo variant:** `Nested inline submenus`

## Layout

Position Navigation Menu horizontally inside the primary application header, elevated at the highest layout level of the page shell.

Place the navigation menu in the application or site header. Keep panel content close to its trigger and group related links. For narrow screens, provide a layout that keeps destinations reachable without assuming the desktop flyout fits.

| Do                                                                                                 | Don't                                                                                                      | Why                                                                                                                            |
| -------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Include descriptive preview copy below section links to help users choose the correct destination. | Embed complex interactive form controls, inputs, or multi-step wizards directly inside navigation flyouts. | Navigation flyouts are meant for destination routing; interactive form controls are prone to accidental closing and data loss. |

**Live demo variant:** `Large menus`

## Accessibility

Use meaningful destination names and preserve predictable keyboard and focus behavior.

**Live demo variant:** `Nested submenus`

## Content

Link text should be concise, scannable noun phrases (e.g., “Projects”, “Reports”, “Access settings”).

Keep supporting descriptions short and specific to their destinations.

**Live demo variant:** `Custom links`
