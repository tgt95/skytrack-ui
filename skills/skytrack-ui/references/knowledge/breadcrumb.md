# Breadcrumb

> Shows the current page location within a navigation hierarchy.

- Package version: `0.1.5`
- Public export: `skytrack-ui/breadcrumb`
- Implementation: [`src/components/ui/breadcrumb.tsx`](../../../../src/components/ui/breadcrumb.tsx)
- Public type declaration: [`dist-lib/components/ui/breadcrumb.d.ts`](../../../../dist-lib/components/ui/breadcrumb.d.ts)
- Showcase demo id: `breadcrumb`
- Closest demo: [`src/demos/breadcrumb.demo.tsx`](../../../../src/demos/breadcrumb.demo.tsx)

## Overview

The Breadcrumb component reveals the user's location within a hierarchical path and provides one-click navigation to ancestor levels. In SkyTrack, it establishes spatial orientation across mission workspaces, project folders, aircraft fleets, and inspection reports.

It renders an accessible `<nav>` wrapper containing an ordered list (`<ol>`) of links, accessible separators, and a non-navigable terminal element representing the current page.

**Live demo variant:** `Basic`

```tsx
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'

export function BreadcrumbExample() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink render={<a href='#missions' />}>Missions</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink render={<a href='#north-coast' />}>North Coast Survey</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Flight plan</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
```

## Usage

Use Breadcrumbs for nested structures deeper than two levels where operators need immediate hierarchy context and the ability to step upward.

Do not use Breadcrumbs for flat, single-level dashboards, wizard step sequences (use explicit stepped indicators), or primary top-level app navigation (use `skytrack-ui/navigation-menu`). Never mark the terminal breadcrumb as an interactive link; it represents the current active document.

**Live demo variant:** `Custom separator`

## Anatomy

Render in strict nested order:

1. `Breadcrumb`: Accessible `<nav aria-label='breadcrumb'>` element (`data-slot='breadcrumb'`).
2. `BreadcrumbList`: Flex-wrapping `<ol>` container (`data-slot='breadcrumb-list'`).
3. `BreadcrumbItem`: List item container (`data-slot='breadcrumb-item'`).
4. `BreadcrumbLink`: Anchor element supporting custom renderers via `useRender` (`data-slot='breadcrumb-link'`).
5. `BreadcrumbSeparator`: Presentation item holding default `CaretRightIcon` or custom slot elements (`data-slot='breadcrumb-separator'`).
6. `BreadcrumbPage`: Non-interactive terminal span (`data-slot='breadcrumb-page'`) holding current page title.
7. `BreadcrumbEllipsis`: Collapsed segment indicator with `DotsThreeIcon` (`data-slot='breadcrumb-ellipsis'`).

**Live demo variant:** `Basic`

## Variants & states

Breadcrumb supports custom separators (e.g. forward slashes or dots) by passing children to `BreadcrumbSeparator`.

Deep paths can be collapsed using `BreadcrumbEllipsis`, optionally wrapped with a dropdown menu (`skytrack-ui/menu`) to reveal intermediate ancestor routes without horizontal overflow.

Link states:

- Default: `text-muted-foreground`.
- Hover: `text-foreground` with smooth transition.
- Current page: `text-foreground font-normal` with `aria-current='page'`.

**Live demo variant:** `Collapsed path`

## Accessibility

- Root navigation provides `aria-label='breadcrumb'` to identify the landmark.
- List markup uses semantic `<ol>` and `<li>` elements, conveying the count and sequence of ancestors to assistive technology.
- Separators include `role='presentation'` and `aria-hidden='true'` to prevent assistive clutter.
- Terminal page element includes `aria-current='page'` and `aria-disabled='true'`.

**Live demo variant:** `Basic`

## API & examples

Import named parts from `skytrack-ui/breadcrumb` (or `@/components/ui/breadcrumb` locally).

| Component             | Element               | Primary Props                                   |
| --------------------- | --------------------- | ----------------------------------------------- |
| `Breadcrumb`          | `nav`                 | `aria-label?: string`, standard HTML attributes |
| `BreadcrumbList`      | `ol`                  | `className?: string`                            |
| `BreadcrumbItem`      | `li`                  | `className?: string`                            |
| `BreadcrumbLink`      | `a` (or via `render`) | `render?: ReactElement`, `href?: string`        |
| `BreadcrumbPage`      | `span`                | `className?: string`                            |
| `BreadcrumbSeparator` | `li`                  | `children?: ReactNode`                          |
| `BreadcrumbEllipsis`  | `span`                | `className?: string`                            |

Theme tokens: Uses `--muted-foreground`, `--foreground`, and responsive gap spacing (`gap-1.5 sm:gap-2.5`).

**Live demo variant:** `Custom separator`

## Evidence and limits

- Package/version checked: `0.1.5`.
- Export: [`package.json`](../../../../package.json) — `./breadcrumb`.
- Source, public declarations, and closest demo: linked above.
- Limits or unverified behavior: None found in inspected source. Breadcrumb links accept custom routers via the `render` prop.
