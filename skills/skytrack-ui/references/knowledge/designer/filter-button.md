# Filter Button

> A filter trigger that opens a checklist of options without hiding the surrounding result set.

- Package version: `0.1.6`
- Public export: `skytrack-ui/filter-button`
- Implementation: [`src/components/ui/filter-button.tsx`](../../../../../src/components/ui/filter-button.tsx)
- Public type declaration: `src/components/ui/filter-button.tsx` (the dist-lib declaration appears on the next lib build; no build ran for this task)
- Showcase demo id: `filter-button`
- Closest demo: [`src/demos/filter-button.demo.tsx`](../../../../../src/demos/filter-button.demo.tsx)

## Usage

Use Filter Button when people narrow a visible result set — a table, list, or search panel — by picking several values. The trigger sits in the toolbar next to the results it filters.

- **Fit:** Multi-select filtering with a compact toolbar trigger and a short popup checklist.
- **Avoid:** Single-choice filtering (use Select, Combobox, or a Radio Group), form fields that submit with the page (use Checkbox Group), and general settings content (use Popover).
- **Best alternative:** Combobox for searchable multi-select; Popover when the popup needs custom layout or footer actions.

**Live demo variant:** `Default`

## Types

The component has one composition; the design choices belong to the Button and to the trigger content. Variants follow the Button scale — outline suits toolbars, secondary or default emphasize an active filter — and the size follows the toolbar's other controls.

**Live demo variant:** `Variants`

## Behavior

Opening the trigger shows a titled popup with checkbox options; checking an option applies it immediately through the controlled value. The trigger is not required to summarize the selection, but a count Badge is the common way to keep the filter visible while the popup is closed.

- **Clear selection:** A split X button appears while this filter has selected values and clears only this filter.
- **Clear all:** For toolbars with several filter dimensions, add a separate action that clears every filter together.
- **Disabled options:** Keep unavailable options visible but disabled so people understand the full filter scope.
- **Result feedback:** Pair the trigger with a result count or status line that updates as filters change.
- **Active state:** Show the active filter state on or beside the trigger; people must see why the result set changed.
- **Option labels:** Keep option labels to the value itself; the popup is a checklist, not a form.

**Live demo variant:** `Default`

## Layout

Place the trigger in the toolbar row that owns the results it filters, aligned with the other filter and search controls. The popup opens below the trigger at a fixed 256 px width; leave clear space beneath it and avoid clipping near viewport edges.

- **Toolbar pairing:** Search input first, filter triggers next, and an optional global clear-all action after the last trigger.
- **Multiple filters:** Use one Filter Button per dimension (status, region, owner) rather than one popup with mixed dimensions.

**Live demo variant:** `Sizes`

## Accessibility

The popup is named by its title, and each option is a labeled checkbox reachable by keyboard. The trigger keeps the popover's expanded state.

- **Trigger content:** Give the trigger a visible label; an icon-only trigger needs `aria-label`.
- **Count display:** A visible count keeps the selection readable; do not encode the selection only in the popup.
- **Filtering feedback:** Announce result changes through the surrounding list or table status, not the popup.

**Live demo variant:** `Caller trigger content`

## Content

Trigger labels name the filter dimension in one or two words: “Status”, “Region”, “Assignee”. Popup titles repeat the dimension as a heading: “Filter by status”. Option labels are the values people recognize from the data itself.

- **Counts:** Use the count Badge to state how many values are selected, not how many results match.
- **Clear actions:** Label the external reset “Clear all” or name the dimension, for example “Clear status”.
- **Options:** Match the wording used elsewhere in the product for the same values.
