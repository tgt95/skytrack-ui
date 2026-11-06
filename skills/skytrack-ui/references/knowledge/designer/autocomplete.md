# Autocomplete

> A search field that helps people find and select an option from a large list.

- Package version: `0.1.5`
- Public export: `skytrack-ui/autocomplete`
- Implementation: [`src/components/ui/autocomplete.tsx`](../../../../../src/components/ui/autocomplete.tsx)
- Public type declaration: [`dist-lib/components/ui/autocomplete.d.ts`](../../../../../dist-lib/components/ui/autocomplete.d.ts)
- Showcase demo id: `autocomplete`
- Closest demo: [`src/demos/autocomplete.demo.tsx`](../../../../../src/demos/autocomplete.demo.tsx)
- Official guidance: [W3C WAI ARIA Combobox Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/)

## Usage

Use Autocomplete when people need to find one value in a long list by typing a few characters, such as a record, team, or project.

- **Fit:** Single-selection lookups across large or dynamic datasets.
- **Avoid:** A short, fixed list that users can scan without searching (use Select), multiple selections (use Combobox), or unconstrained text entry (use Input).
- **Best alternative:** For small, fixed lists, use Select. For workspace-wide command search, choose Command.

**Live demo variant:** `Default`

## Types

Choose suggestion list, inline completion, or grouped results according to how people enter and scan options.

## Behavior

Typing filters available options. For asynchronous search, display loading feedback while fetching results and keep current suggestions visible until new matches load.

- **Selection:** Choosing an option populates the input and closes the popup.
- **Dismissal:** Pressing `Escape` closes the menu without clearing the typed query.

**Live demo variant:** `Async search`

## Layout

Place it in a form with a visible label and relevant supporting or error text.

- **Results list:** Keep the list within the available screen space and let people scroll through longer result sets.
- **Mobile viewports:** Keep the input and results reachable when the virtual keyboard is open.

| Do                                                                                           | Don't                                                                                | Why                                                                                                 |
| -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------- |
| Group related suggestions with categorical headers when searching across mixed entity types. | Mix disparate entity results in an unsorted flat list without visual group dividers. | Categorical grouping accelerates visual scanning and prevents misidentifying similarly named items. |

**Live demo variant:** `Grouped`

## Accessibility

Give the search field and suggestions clear names and states. Arrow keys move through suggestions, Enter selects, and focus remains visible.

**Live demo variant:** `Auto highlight`

## Content

Placeholder copy should describe expected input format (e.g., "Search by record or project...").

- **Item labels:** Make the primary name easy to scan; use quieter secondary text for helpful context.

**Live demo variant:** `Inline autocomplete`
