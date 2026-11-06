# Menu

> A list of related actions or choices opened from a trigger.

- Package version: `0.1.5`
- Public export: `skytrack-ui/menu`
- Implementation: [`src/components/ui/menu.tsx`](../../../../../src/components/ui/menu.tsx)
- Public type declaration: [`dist-lib/components/ui/menu.d.ts`](../../../../../dist-lib/components/ui/menu.d.ts)
- Showcase demo id: `menu`
- Closest demo: [`src/demos/menu.demo.tsx`](../../../../../src/demos/menu.demo.tsx)
- Official guidance: [W3C WAI ARIA Menu Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/menu/)

## Usage

Use Menu for a temporary floating list of actions, commands, or secondary options triggered by a button (e.g. overflow "More actions" trigger, table row context actions, export format options).

Avoid Menu for primary website navigation (use Navigation Menu), choosing a single form value from options (use Select), or rich interactive content with forms (use Popover).

The best alternative for selecting a value in a form is Select. For rich interactive popups containing multiple form controls, choose Popover.

**Live demo variant:** `Default`

## Types

Choose direct actions, independent options, single-choice options, or a short submenu according to the task.

## Behavior

Menu opens on click (or hover when configured). Opening places focus on the first interactive menu item.

Moving the cursor highlights items. Pressing Enter executes the action and dismisses the menu, while checkbox and radio items update their selection state. Pressing Escape dismisses the menu and returns focus to the trigger.

**Live demo variant:** `Close on click`

## Layout

Place the menu close to its opening control. Group related actions and separate distinct clusters when it improves scanning.

Keep menus to a manageable number of choices. Use concise group headings when needed, give each item a comfortable target, and place irreversible actions apart from routine actions.

| Do                                                                                                   | Don't                                                                                              | Why                                                                                                        |
| ---------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| Group related commands logically and place destructive actions at the bottom separated by a divider. | Bury the primary screen call-to-action inside an overflow menu alongside minor secondary commands. | Primary actions must remain immediately visible so users can complete tasks without hunting through menus. |

**Live demo variant:** `Group labels`

## Accessibility

Use clear action names and visible focus. Arrow keys move through options; Enter or Space activates; Escape closes the menu and returns focus to its trigger.

**Live demo variant:** `Nested menu`

## Content

Item labels should use concise verb-noun phrasing in sentence case (e.g., “Export data”, “Duplicate record”, “Delete item”).

Give irreversible actions a clear danger treatment. Use specific labels rather than broad terms like “Manage”.

**Live demo variant:** `Default`
