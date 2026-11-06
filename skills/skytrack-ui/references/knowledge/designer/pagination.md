# Pagination

> Controls for moving through a large collection divided into pages.

- Package version: `0.1.5`
- Public export: `skytrack-ui/pagination`
- Implementation: [`src/components/ui/pagination.tsx`](../../../../../src/components/ui/pagination.tsx)
- Public type declaration: Target `./dist-lib/components/ui/pagination.d.ts` declared in [`package.json`](../../../../../package.json) is absent; exported types verified in [`src/components/ui/pagination.tsx`](../../../../../src/components/ui/pagination.tsx).
- Showcase demo id: `pagination`
- Closest demo: [`src/demos/pagination.demo.tsx`](../../../../../src/demos/pagination.demo.tsx)
- Official guidance: [Carbon Design System Pagination Usage](https://carbondesignsystem.com/components/pagination/usage/)

## Usage

Use Pagination when users need to browse large, structured collections of records (e.g. activity history, asset inventories, access review records) divided into discrete, manageable pages.

Avoid Pagination for short data sets that can be displayed inline, or for real-time live streaming feeds where continuous scrolling or an explicit "Load more" button is more appropriate.

For a continuous or streaming feed, use a feed pattern with a clear way to load more content.

**Live demo variant:** `INTERACTIVE`

## Behavior

Clicking a page number button immediately navigates to that page and loads the corresponding data set. Clicking "Previous" navigates back one page; clicking "Next" navigates forward one page.

When on page 1, "Previous" is disabled; when on the final page, "Next" is disabled. The current page is marked visually and programmatically.

**Live demo variant:** `INTERACTIVE`

## Layout

Place Pagination below the results it controls, with 16–24px of separation.

Combine pagination controls with a total count summary (e.g. “Showing 1–25 of 184 records”) on the left and page size controls where appropriate. Maintain 4–8px spacing between individual page number buttons.

On mobile screens, collapse intermediate page numbers to display only "Previous", "Next", and a compact indicator ("Page 3 of 12").

| Do                                                                                  | Don't                                                                      | Why                                                                                                       |
| ----------------------------------------------------------------------------------- | -------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| Make the current page visually distinct and understandable to assistive technology. | Remove or hide the "Previous" or "Next" buttons on the first or last page. | Keeping the controls in a consistent position helps people find them as they move through the collection. |

**Live demo variant:** `INTERACTIVE`

## Accessibility

Make the current page and the pagination controls clear to assistive technology. Name Previous and Next actions; make page choices keyboard accessible.

**Live demo variant:** `INTERACTIVE`

## Content

Number buttons should display concise arabic numerals. Ellipsis items indicate omitted page spans and are non-interactive.

Count summaries should be clearly formatted (e.g., "Showing 1–20 of 145 projects").

**Live demo variant:** `INTERACTIVE`
