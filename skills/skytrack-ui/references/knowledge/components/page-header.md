# Page Header

> A page-level heading with breadcrumbs, a title, optional toolbar, and caller-composed lower content.

- Package version: `0.1.5`
- Public export: `skytrack-ui/page-header`
- Implementation: [`src/components/ui/page-header.tsx`](../../../../../src/components/ui/page-header.tsx)
- Public type declaration: Target `./dist-lib/components/ui/page-header.d.ts` declared in [`package.json`](../../../../../package.json) is absent from this checkout; exported types verified in [`src/components/ui/page-header.tsx`](../../../../../src/components/ui/page-header.tsx).
- Showcase demo id: `page-header`
- Closest demo: [`src/demos/page-header.demo.tsx`](../../../../../src/demos/page-header.demo.tsx)

## Overview

The Page Header component establishes the primary visual hierarchy and identity at the top of a page view. It organizes breadcrumbs, the page heading, action toolbars, and optional lower content—such as line-variant tab bars or summary filters—into a unified, responsive header block.

It encapsulates SkyTrack document outline semantics by rendering the page title as an `<h1>` styled with the design system's `.h3` visual scale.

**Live demo variant:** `With Tabs and Toolbar`

```tsx
import { PageHeader } from '@/components/ui/page-header'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'

export function PageHeaderExample() {
  return (
    <PageHeader
      breadcrumbs={
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href='#missions'>Missions</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Survey Alpha</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      }
      title='Survey Mission Alpha'
      toolbar={<Button size='sm'>Start pre-flight</Button>}
    >
      <div className='text-sm text-muted-foreground'>Autonomous photogrammetry sweep at 80m AGL.</div>
    </PageHeader>
  )
}
```

## Usage

Use Page Header at the top of major document routes, mission workspaces, fleet dashboards, and report overviews.

Do not use Page Header inside cards, modals, or small split-view panels (use standard heading tags `.h4` or card headers). Avoid overcrowding the toolbar slot; prioritize 1-3 primary actions and place overflow commands inside a menu (`skytrack-ui/menu`).

**Live demo variant:** `With Sidebar`

## Anatomy

### Composition Tree

```text
<PageHeader>
├─ <Breadcrumb ... /> (page-header-breadcrumbs slot)
├─ <PageHeaderBody>
│  ├─ <div className='flex items-center justify-between'>
│  │  ├─ <PageHeaderHeading>
│  │  │  ├─ <PageHeaderTitle>Page Title</PageHeaderTitle>
│  │  │  └─ <PageHeaderDescription>Description text</PageHeaderDescription>
│  │  └─ <PageHeaderActions>
│  │     └─ <Button>Action</Button>
│  └─ <PageHeaderTabs> (optional)
</PageHeader>
```

Render in structural order:

1. `PageHeader`: Outer `<header>` wrapper (`data-slot='page-header'`) with bottom border.
2. `breadcrumbs` slot: Embedded above main title in a dedicated border-separated row (`data-slot='page-header-breadcrumbs'`).
3. Header Body: Layout container (`data-slot='page-header-body'`).
4. Main Row (`data-slot='page-header-main'`):
   - `title`: Primary `<h1>` heading element (`data-slot='page-header-title'`) styled with class `.h3`.
   - `toolbar` slot: Action button cluster (`data-slot='page-header-toolbar'`), right-aligned on desktop.
5. Lower Content slot (`children`): Caller-composed area (`data-slot='page-header-content'`), designed to seamlessly house line-variant `TabsList` without double padding.

**Live demo variant:** `Sidebar · Home without Breadcrumb`

## Variants & states

Supported configurations:

- With Breadcrumbs: Suppresses top padding on the main body to align cleanly below the breadcrumb bar.
- With Line Tabs: Automatically removes bottom padding (`pb-0`) when `children` contains `data-variant='line'` tabs, allowing the tab active border to sit flush on the header's bottom border.
- Responsive layout: On narrow mobile screens, toolbar wraps below the title; on desktop (`sm:`), title and toolbar sit on the same horizontal row.

**Live demo variant:** `With Tabs and Toolbar`

## Accessibility

- Outputs semantic `<header>` landmark.
- Automatically generates an `<h1>` element for document structure, complying with accessibility guidelines while using design-system-scaled `.h3` visual typography.
- Toolbar slot maintains proper keyboard tab order after the title.
- Preserves full responsiveness without truncating essential controls.

**Live demo variant:** `With Sidebar`

## API & examples

Import `PageHeader` and `type PageHeaderProps` from `skytrack-ui/page-header` (or `@/components/ui/page-header` locally).

| Prop          | Type        | Default     | Description                              |
| ------------- | ----------- | ----------- | ---------------------------------------- |
| `title`       | `ReactNode` | required    | Page title rendered inside `<h1>`        |
| `breadcrumbs` | `ReactNode` | `undefined` | Breadcrumb navigation element            |
| `toolbar`     | `ReactNode` | `undefined` | Action button or toolbar cluster         |
| `children`    | `ReactNode` | `undefined` | Lower content (tabs, filters, summaries) |
| `className`   | `string`    | `undefined` | Header container overrides               |

Tokens: Uses `--border`, `--foreground`, `--muted-foreground`, and padding tokens.

**Live demo variant:** `With Tabs and Toolbar`

## Evidence and limits

- Package/version checked: `0.1.5`.
- Export: [`package.json`](../../../../../package.json) — `./page-header`.
- Source, public declarations, and closest demo: linked above.
- Limits or unverified behavior: Target declaration `./dist-lib/components/ui/page-header.d.ts` is absent in `dist-lib`; source types verified in `src/components/ui/page-header.tsx`.
