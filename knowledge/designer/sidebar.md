# Sidebar

> A persistent area for primary navigation or contextual details.

- Package version: `0.1.5`
- Public export: `skytrack-ui/sidebar`
- Implementation: [`src/components/ui/sidebar.tsx`](../../src/components/ui/sidebar.tsx)
- Public type declaration: Target `./dist-lib/components/ui/sidebar.d.ts` declared in [`package.json`](../../package.json) is absent; exported types verified in [`src/components/ui/sidebar.tsx`](../../src/components/ui/sidebar.tsx).
- Showcase demo id: `sidebar`
- Closest demo: [`src/demos/sidebar.demo.tsx`](../../src/demos/sidebar.demo.tsx)
- Official guidance: [Carbon Design System UI Shell Left Panel](https://carbondesignsystem.com/components/UI-shell-left-panel/usage/)

## Usage

Use Sidebar for persistent, primary navigation across deep application areas (e.g. Project Studio, Asset Management, Access Rules Maps, System Settings), or for persistent right-hand contextual inspector panels.

Avoid Sidebar for transient dropdown actions (use Menu) or lightweight temporary flyout sheets (use Drawer).

The best alternative for transient slide-out panels that open on demand is Drawer. For horizontal top-level navigation, choose Navigation Menu.

**Live demo variant:** `Icon collapse`

## Types

Sidebar can use several navigation treatments:

- **Expanded:** Shows icons, labels, and section headings in a persistent panel.
- **Collapsed:** Saves space but requires clear labels on hover or focus so icons remain understandable.
- **Off-canvas:** Keeps navigation hidden until people open it on a narrow screen.

**Live demo variant:** `Inset layout`

## Behavior

Sidebar supports smooth animated collapsing and expanding via button triggers or keyboard shortcuts (e.g. ⌘B).

Active navigation items display a distinct highlighted background and high-contrast text. In icon-only mode, hovering an icon displays a tooltip identifying the destination.

**Live demo variant:** `Icon collapse`

## Layout

Sidebar sits fixed on the far left edge of the desktop application viewport (or far right edge for property inspector sidebars), spanning the full window height.

On narrow screens, keep navigation out of the way until it is needed and clearly show the page content beneath it.

| Do                                                                                                      | Don't                                                       | Why                                                                 |
| ------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- | ------------------------------------------------------------------- |
| Keep collapsed navigation understandable with a visible label on hover or focus and an accessible name. | Show unlabeled icons with no way to discover their meaning. | Clear labels reduce guesswork and make destinations easier to find. |

**Live demo variant:** `Right side`

## Accessibility

Name the navigation area and make the current page clear. Give collapsed icon controls descriptive names and keep navigation order predictable.

**Live demo variant:** `Icon collapse`

## Content

Navigation labels should use clear, scannable nouns in title case (e.g., "Project Planner", "Asset Activity", "Incident Logs").

Keep labels concise (1–3 words) to prevent truncation in expanded view.

**Live demo variant:** `Inset layout`
