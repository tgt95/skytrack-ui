# Context Menu

> A menu of secondary actions related to the item a person selected.

- Package version: `0.1.5`
- Public export: `skytrack-ui/context-menu`
- Implementation: [`src/components/ui/context-menu.tsx`](../../src/components/ui/context-menu.tsx)
- Public type declaration: [`dist-lib/components/ui/context-menu.d.ts`](../../dist-lib/components/ui/context-menu.d.ts)
- Showcase demo id: `context-menu`
- Closest demo: [`src/demos/context-menu.demo.tsx`](../../src/demos/context-menu.demo.tsx)
- Official guidance: [W3C WAI ARIA Menu Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/menu/)

## Usage

Use Context Menu to offer relevant secondary actions on a selected item, such as a record, file, or project card.

- **Fit:** Secondary actions tied to the selected item (e.g. “Open details”, “Export record”, “Duplicate project”).
- **Avoid:** Exposing unique, primary actions that have no other access point in the UI. Never hide mandatory safety-critical controls solely behind right-click menus.
- **Best alternative:** For a visible, persistent action menu, use Menu.

**Live demo variant:** `Default`

## Types

Context Menu supports diverse interactive menu item types:

- **Actions:** Commands such as opening, editing, or duplicating the selected item.
- **Toggles:** Independent options, such as showing or hiding a detail.
- **Single-choice options:** Mutually exclusive choices, such as switching between list and grid views.
- **Submenus:** A small set of closely related secondary actions.

**Live demo variant:** `Checkbox and radio items`

## Behavior

Right-clicking (or long-pressing on touch screens) within the trigger zone positions the menu directly at the pointer coordinates.

- **Collision detection:** The menu automatically flips or repositions if opened near screen boundaries.
- **Dismissal:** Left-clicking outside, selecting an item, or pressing `Escape` immediately dismisses the menu.

**Live demo variant:** `Nested menu`

## Layout

Show the menu as a distinct floating surface with enough separation from surrounding content.

- **Item spacing:** Make each action easy to distinguish and activate.
- **Separators:** Separate distinct action groups when it helps prevent mistakes.
- **Submenus:** Submenus open adjacent to their parent trigger with an 8px offset.

**Live demo variant:** `Default`

## Accessibility

Keep important actions available outside the context menu too. Support keyboard navigation; Escape closes the menu and returns focus to the item that opened it.

**Live demo variant:** `Using with Menu`

## Content

Item labels should be short (1–3 words) and start with action verbs in sentence case (e.g., "Edit location", "Delete segment").

- **Destructive actions:** Give irreversible actions a clear danger treatment and place them apart from routine actions.
- **Shortcuts:** Show a shortcut beside the action it describes.

| Do                                                                            | Don't                                             | Why                                                                        |
| ----------------------------------------------------------------------------- | ------------------------------------------------- | -------------------------------------------------------------------------- |
| Group related actions and separate irreversible actions from routine choices. | Mix deletion actions into unrelated view options. | Clear grouping helps people find actions and reduces accidental selection. |

**Live demo variant:** `Default`
