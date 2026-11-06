# Combobox

> A searchable selection field for choosing one or more items from a list.

- Package version: `0.1.5`
- Public export: `skytrack-ui/combobox`
- Implementation: [`src/components/ui/combobox.tsx`](../../../../../src/components/ui/combobox.tsx)
- Public type declaration: [`dist-lib/components/ui/combobox.d.ts`](../../../../../dist-lib/components/ui/combobox.d.ts)
- Showcase demo id: `combobox`
- Closest demo: [`src/demos/combobox.demo.tsx`](../../../../../src/demos/combobox.demo.tsx)
- Official guidance: [W3C WAI ARIA Combobox Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/)

## Usage

Use Combobox when people need to choose one or more items from a long list and typing helps them find a match, such as selecting records, teams, or files.

- **Fit:** Searchable single-select and multi-select lists with rich item metadata.
- **Avoid:** Small static lists that users can scan without searching (use Select), or freeform unconstrained text entry (use Input).
- **Best alternative:** For fixed, short lists that need no search filtering, use Select.

**Live demo variant:** `Default`

## Types

Choose single or multiple selection, and group or create options only when the task calls for them.

## Behavior

Typing in the search input filters the options list. For remote searches, show when matches are loading and provide a clear no-results state when search finishes.

- **Item selection:** Selecting an item updates the value and highlights it with a checkmark. In single-select mode, the dropdown closes automatically; in multi-select mode, the dropdown remains open for batch selection.
- **Removing selections:** Make each selected item easy to remove, including with the keyboard.

| Do                                                       | Don't                                                                | Why                                                                       |
| -------------------------------------------------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| Keep the list open while people make several selections. | Close the list after every selection when more choices are expected. | Keeping the list open reduces repeated interaction and preserves context. |

**Live demo variant:** `Async search (single)`

## Layout

Place it in a form with a visible label and relevant supporting or error text.

- **Results list:** Keep the menu within the available screen space and let people scroll through longer result sets. Use search or grouping when it helps people find an option.
- **Grouped choices:** Group choices when categories help people find the right match; give each group a concise label.
- **Mobile viewports:** The popup expands to match screen width, with touch targets sized to at least 44px.

**Live demo variant:** `Grouped`

## Accessibility

Give the field, suggestions, and selected values clear names. Arrow keys move through suggestions, Enter selects, and Escape closes the list. Selected items can be removed with the keyboard.

**Live demo variant:** `Sizes`

## Content

Placeholder copy should describe what can be searched (e.g., "Select records...", "Add categories...").

- **Item labels:** Make the primary name easy to scan; use quieter secondary text for helpful context.
- **Empty state:** When no matches are found, display clear feedback (e.g., "No matching records found").

**Live demo variant:** `Input inside popup`
