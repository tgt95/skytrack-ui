# Data Table

> A structured view for scanning, comparing, sorting, filtering, and acting on records.

- Package version: `0.1.5`
- Public export: `skytrack-ui/data-table`
- Implementation: [`src/components/ui/data-table.tsx`](../../../../../src/components/ui/data-table.tsx)
- Public type declaration: Target `./dist-lib/components/ui/data-table.d.ts` declared in [`package.json`](../../../../../package.json) is absent from this checkout; exported types verified in [`src/components/ui/data-table.tsx`](../../../../../src/components/ui/data-table.tsx).
- Showcase demo id: `data-table`
- Closest demo: [`src/demos/data-table.demo.tsx`](../../../../../src/demos/data-table.demo.tsx)

## Usage

Use Data Table when people need to scan, compare, sort, filter, or act on a dense set of records, such as customers, orders, projects, or activity logs.

- **Fit:** Structured, multi-attribute datasets requiring sorting, pagination, and multi-row selection.
- **Avoid:** Simple key-value pairs (use a definition list or card), or high-level visual trend summaries (use Chart).
- **Best alternative:** For continuous trend visualization, use Chart.

**Live demo variant:** `DEFAULT TABLE`

## Types

Use dense tabular presentation when people compare record attributes and act on rows or selections.

The showcase includes sortable rows, multi-select, combined row details and selection, single-select, batch actions, custom search and column controls, collapsed search, advanced facets, dense scrolling, density/stripe settings, and loading/empty states. Each example labels its local sample data.

**Live demo variant:** `SINGLE ROW SELECTION`

## Behavior

Sorting, filtering, and row selection respond instantly. Clicking a sortable column header cycles through sort states.

- **Batch actions:** The table supports multi-row selection and selected counts; consuming applications can compose a batch action toolbar triggered by row selection. The sample archive action only changes local demo rows.
- **Row feedback:** Give a row a subtle visual highlight on pointer hover, while keeping selected and focused rows distinct.

Use `renderSearch`, `renderColumnVisibility`, and `renderPagination` when the built-in controls do not match the task. Custom JSX must keep controls accessible and use the supplied `table` instance so filtering, visibility, and pagination state stay connected. The showcase demonstrates custom search and column controls; pagination can be replaced through the same render-prop API.

**Live demo variant:** `CUSTOM SEARCH + COLUMNS`

## Layout

Data tables typically occupy the primary content area within an analytical workspace.

Column visibility is optional. Add show/hide columns only when the objects, roles, and tasks show
that people benefit from choosing which attributes remain visible. Treat the interactive demo as a
reference for available behavior, not a required feature list for every product table.
In package version `0.1.5`, `renderColumnVisibility` replaces the built-in control; return `null` to
omit it. Omit the render prop to keep the default Columns menu.

- **Cell alignment:** Left-align textual columns; right-align numerical values, timestamps, and currency for rapid vertical comparison. Center status badges and action menus.
- **Sortable headers:** Keep the sort indicator after the header label for left-, center-, and right-aligned columns. Align the full label-and-indicator group with its column.
- **Horizontal scroll:** When columns exceed the available width, keep horizontal scrolling within the table container and preserve access to the primary row identifier.
- **Long lists:** Bound the table viewport with `tableContainerClassName` when users need to scroll through many rows while keeping the toolbar and pagination visible.
- **Expanded details:** Use `renderExpandedRow` for supplementary record details; pair it with row selection only when both interactions support the task.
- **Mobile viewports:** Adapt mobile table treatment to the task rather than assuming a single pattern fits all screens. Where multi-attribute comparison is required, preserve horizontal scrolling within the table container and keep the row identifier accessible; where quick record scanning or triage is the primary task, consider responsive stacked list items or prioritizing essential columns.

| Do                                                                                               | Don't                                            | Why                                                                                           |
| ------------------------------------------------------------------------------------------------ | ------------------------------------------------ | --------------------------------------------------------------------------------------------- |
| Right-align numerical values (e.g. revenue, quantity, response time) and left-align text labels. | Center-align numbers with ragged decimal points. | Consistent right alignment allows users to visually scan and compare quantities effortlessly. |

**Live demo variant:** `DENSE RECORDS`

## Accessibility

Keep column headings, values, and sort direction understandable to assistive technology. Make row selection and actions keyboard accessible.

**Live demo variant:** `OPEN ROW DETAILS ON DEMAND`

## Content

Column headers should be concise and descriptive (e.g., “Customer”, “Status”, “Owner”, “Last updated”). Use row actions such as “Export selected” or “Assign owner” only when they support the task.

- **Empty states:** Display an explicit empty table state with clear explanation and next steps (e.g., clearing active filters or adding records) when no rows match. Include an illustration when it helps explain the state or guide recovery, but keep it optional rather than requiring one for every routine empty or filtered table.
- **Loading states:** Show that records are loading while preserving enough of the table structure to keep people oriented.

**Live demo variant:** `DEFAULT TABLE`
