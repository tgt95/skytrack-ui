# Pagination

> Accessible page navigation with previous, next, page links, and ellipsis.

- Package version: `0.1.5`
- Public export: `skytrack-ui/pagination`
- Implementation: [`src/components/ui/pagination.tsx`](../../../../src/components/ui/pagination.tsx)
- Public type declaration: Target `./dist-lib/components/ui/pagination.d.ts` declared in [`package.json`](../../../../package.json) is absent from this checkout; exported types verified in [`src/components/ui/pagination.tsx`](../../../../src/components/ui/pagination.tsx).
- Showcase demo id: `pagination`
- Closest demo: [`src/demos/pagination.demo.tsx`](../../../../src/demos/pagination.demo.tsx)

## Overview

The Pagination component provides accessible page navigation controls for large multi-page datasets, flight mission logs, sensor image galleries, and audit histories. It renders previous and next direction triggers, numbered page links, and truncation ellipsis indicators.

It builds on SkyTrack `buttonVariants` to deliver consistent focus rings, active indicator styling, and disabled states.

**Live demo variant:** `INTERACTIVE`

```tsx
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis
} from '@/components/ui/pagination'

export function PaginationExample() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href='#' aria-disabled='true' />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href='#' isActive>
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href='#'>2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href='#'>3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href='#' />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
```

## Usage

Use Pagination when users need discrete navigation through a bounded result set and a stable way to revisit a page. Pair it with the current range and total when those values are available. For a continuous or frequently appended feed, choose a loading and position model that preserves context; Pagination itself does not load or virtualize records. Avoid pagination when all items fit comfortably in the current view.

**Live demo variant:** `INTERACTIVE`

## Anatomy

Render in strict nested list order:

1. `Pagination`: Outer `<nav aria-label='pagination'>` container (`data-slot='pagination'`).
2. `PaginationContent`: Horizontal `<ul>` flex row (`data-slot='pagination-content'`).
3. `PaginationItem`: Semantic `<li>` wrapper per link (`data-slot='pagination-item'`).
4. `PaginationPrevious`: Anchor button navigating to previous page with `CaretLeftIcon` (`data-slot='pagination-previous'`).
5. `PaginationLink`: Numbered anchor button (`data-slot='pagination-link'`).
6. `PaginationEllipsis`: Truncation indicator with `DotsThreeIcon` (`data-slot='pagination-ellipsis'`).
7. `PaginationNext`: Anchor button navigating to next page with `CaretRightIcon` (`data-slot='pagination-next'`).

**Live demo variant:** `INTERACTIVE`

## Variants & states

Supported props and states:

- Active state: `isActive={true}` applies `buttonVariants({ variant: 'outline' })` and sets `aria-current='page'`.
- Inactive state: Uses `buttonVariants({ variant: 'ghost' })`.
- Disabled state: `aria-disabled='true'` applies `opacity-50 pointer-events-none`.
- Sizes: Supports `size='default'`, `'sm'`, `'lg'`, or `'icon'`.
- Custom Text: `PaginationPrevious` and `PaginationNext` support custom labels via `text` prop (e.g. `text='Newer'`).

**Live demo variant:** `INTERACTIVE`

## Accessibility

- Root navigation provides `aria-label='pagination'`.
- Unordered list (`<ul>`) and list item (`<li>`) semantics communicate item sequence and position to screen readers.
- Active page link includes `aria-current='page'`.
- Previous and next buttons provide fallback `aria-label='Go to previous page'` and `'Go to next page'` when text is hidden on small screens.
- `PaginationEllipsis` includes visually hidden "More pages" text for screen readers.

**Live demo variant:** `INTERACTIVE`

## API & examples

Import named parts from `skytrack-ui/pagination` (or `@/components/ui/pagination` locally).

| Component            | Target Props                                                | Description                |
| -------------------- | ----------------------------------------------------------- | -------------------------- |
| `Pagination`         | standard nav props                                          | Outer navigation container |
| `PaginationLink`     | `isActive?: boolean`, `size?: ControlSize`, `href?: string` | Page button anchor         |
| `PaginationPrevious` | `text?: string`, `href?: string`                            | Previous page button       |
| `PaginationNext`     | `text?: string`, `href?: string`                            | Next page button           |
| `PaginationEllipsis` | standard span props                                         | Truncation ellipsis        |

Tokens: Uses `--border`, `--foreground`, `--muted-foreground`, and `--radius`.

**Live demo variant:** `INTERACTIVE`

## Evidence and limits

- Package/version checked: `0.1.5`.
- Export: [`package.json`](../../../../package.json) — `./pagination`.
- Source, public declarations, and closest demo: linked above.
- Limits or unverified behavior: Target declaration `./dist-lib/components/ui/pagination.d.ts` is absent in `dist-lib`; source types verified in `src/components/ui/pagination.tsx`.
