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

## Types

Group related frequent actions and choose a horizontal or vertical arrangement that fits the work area.

## Behavior

Buttons inside the toolbar respond immediately to click and keyboard activation.

Toolbars support embedded menus, tooltips, and stepper fields. Active tools display pressed styling, while disabled tools reject interaction.

**Live demo variant:** `Using with NumberField`

## Layout

Toolbar floats over or sits beside the primary work surface, such as along its top or side edge.

Group related tools (e.g., selection, editing, and history) and separate distinct groups. Keep controls close enough to read as one toolbar without crowding.

On mobile screens, collapse secondary or infrequent tools into an overflow menu button within the toolbar to maintain a clean single-row layout without overflowing the screen.

| Do                                                                                                                | Don't                                                                                      | Why                                                                             |
| ----------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------- |
| Give icon-only controls clear accessible names; add a tooltip when it helps people discover an unfamiliar action. | Pack ungrouped, unlabeled icons into an uninterrupted horizontal strip without separators. | Clear names and grouping help people find and understand the available actions. |

**Live demo variant:** `Vertical`

## Accessibility

Give the toolbar a clear name. Tab enters and leaves; arrow keys move between its controls. Icon-only controls need descriptive names.

**Live demo variant:** `Using with Tooltip`

## Content

Buttons should use recognizable iconography and direct labels. Add a tooltip or shortcut hint when it makes an unfamiliar action easier to discover.

Include a keyboard shortcut when it is available and useful to the task (e.g. “Undo (⌘Z)”).

**Live demo variant:** `Using with Menu`
