# Toolbar

> A grouped set of controls for actions used together.

- Package version: `0.1.5`
- Public export: `skytrack-ui/toolbar`
- Implementation: [`src/components/ui/toolbar.tsx`](../../src/components/ui/toolbar.tsx)
- Public type declaration: [`dist-lib/components/ui/toolbar.d.ts`](../../dist-lib/components/ui/toolbar.d.ts)
- Showcase demo id: `toolbar`
- Closest demo: [`src/demos/toolbar.demo.tsx`](../../src/demos/toolbar.demo.tsx)
- Official guidance: [W3C WAI ARIA Toolbar Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/)

## Usage

Use Toolbar to group related controls people use together on a working surface, such as selection, editing, view, or formatting tools.

Avoid Toolbar for top-level navigation (use Page Header or Navigation Menu) or application-wide commands (use Menubar).

Use Menubar for application-wide commands and Page Header for page titles and primary page actions.

**Live demo variant:** `Default`

## Behavior

Buttons inside the toolbar respond immediately to click and keyboard activation.

Toolbars support embedded menus, tooltips, and stepper fields. Active tools display pressed styling, while disabled tools reject interaction.

**Live demo variant:** `Using with NumberField`

## Layout

Toolbar floats directly over or sits immediately adjacent to the primary workspace canvas (e.g. pinned horizontally across the top of the map view or vertically along the canvas edge).

Group related tools (e.g., selection, editing, and history) and separate distinct groups. Keep controls close enough to read as one toolbar without crowding.

On mobile screens, collapse secondary or infrequent tools into an overflow menu button within the toolbar to maintain a clean single-row layout without overflowing the screen.

| Do                                                                                                                         | Don't                                                                                                  | Why                                                                                               |
| -------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------- |
| Pair every icon-only toolbar button with an informative Tooltip and standard keyboard shortcut (e.g. "Location tool (W)"). | Pack dozens of un-grouped, un-labeled icons into an uninterrupted horizontal strip without separators. | Unorganized walls of icons cause severe visual fatigue and slow down critical user interventions. |

**Live demo variant:** `Vertical`

## Accessibility

Give the toolbar a clear name. Tab enters and leaves; arrow keys move between its controls. Icon-only controls need descriptive names.

**Live demo variant:** `Using with Tooltip`

## Content

Buttons should use standardized, recognizable iconography with tooltips that clearly describe the tool action.

Include keyboard shortcuts in tooltips where supported (e.g. "Undo (⌘Z)").

**Live demo variant:** `Using with Menu`
