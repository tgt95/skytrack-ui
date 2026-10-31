# Command

> A searchable list of actions and destinations, including keyboard shortcuts.

- Package version: `0.1.5`
- Public export: `skytrack-ui/command`
- Implementation: [`src/components/ui/command.tsx`](../../src/components/ui/command.tsx)
- Public type declaration: Target `./dist-lib/components/ui/command.d.ts` declared in [`package.json`](../../package.json) is absent from this checkout; exported types verified in [`src/components/ui/command.tsx`](../../src/components/ui/command.tsx).
- Showcase demo id: `command`
- Closest demo: [`src/demos/command.demo.tsx`](../../src/demos/command.demo.tsx)
- Official guidance: [W3C WAI ARIA Menu Button Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/)

## Usage

Use Command when people need a fast, keyboard-driven way to find a destination or action across the product. A familiar shortcut such as ⌘K or Ctrl+K can make it easier to open.

- **Fit:** Global action palettes, deep search navigation, and dense keyboard-driven workflows.
- **Avoid:** Standard form input fields (use Input), or simple dropdown selections (use Select).
- **Best alternative:** For choosing a value in a form, use Autocomplete or Combobox.

**Live demo variant:** `COMMAND PALETTE`

## Types

Command supports two primary display modes:

- **Command dialog:** A searchable action list that opens over the current page, often from a keyboard shortcut.
- **Inline command list:** A persistent searchable action list embedded in a page or navigation area.

**Live demo variant:** `INLINE`

## Behavior

Typing filters items in real time across groups using fuzzy search. The first matching item is automatically highlighted for one-stroke execution.

- **Execution:** Enter runs the highlighted action and closes the list.
- **Dismissal:** Escape or clicking outside closes the list without running the highlighted action.

**Live demo variant:** `COMMAND PALETTE`

## Layout

Center the command dialog and keep it wide enough to show matching destinations and their helpful context.

- **Grouping:** Use concise group labels when they help people scan different kinds of results.
- **Separators:** Separate distinct groups only when the boundary helps people scan them.
- **Mobile:** Renders full-width with the input pinned to the top, ensuring comfortable touch scrolling.

| Do                                                                                   | Don't                                                         | Why                                                                                      |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| Provide clear group titles (e.g., "Quick Actions", "Navigation", "System Settings"). | Dump 30 uncategorized commands into a single monolithic list. | Meaningful group headers help users scan and find relevant actions significantly faster. |

**Live demo variant:** `INLINE`

## Accessibility

Make search results and selection changes understandable to assistive technology. Arrow keys move through results; provide clear feedback when nothing matches.

**Live demo variant:** `COMMAND PALETTE`

## Content

Action labels should start with a direct verb (e.g., “Create project”, “View activity”, “Change theme”).

- **Shortcuts:** Show familiar keys clearly (e.g., ⌘K or Ctrl+K).
- **Empty feedback:** Explain when no results match and suggest a useful next step.

**Live demo variant:** `INLINE`
