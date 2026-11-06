# Breadcrumb

> A path that shows where a page sits in a hierarchy and supports moving to a parent level.

- Package version: `0.1.5`
- Public export: `skytrack-ui/breadcrumb`
- Implementation: [`src/components/ui/breadcrumb.tsx`](../../../../../src/components/ui/breadcrumb.tsx)
- Public type declaration: [`dist-lib/components/ui/breadcrumb.d.ts`](../../../../../dist-lib/components/ui/breadcrumb.d.ts)
- Showcase demo id: `breadcrumb`
- Closest demo: [`src/demos/breadcrumb.demo.tsx`](../../../../../src/demos/breadcrumb.demo.tsx)
- Official guidance: [W3C WAI ARIA Breadcrumb Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/)

## Usage

Use Breadcrumb when a nested page hierarchy helps people stay oriented and move to an ancestor, such as “Workspace > Records > Record details”.

- **Fit:** Nested page structures where moving to an ancestor is useful.
- **Avoid:** Flat navigation, sequential task steps, or top-level navigation.
- **Best alternative:** Use a step indicator for a sequential task and Navigation Menu for primary navigation.

**Live demo variant:** `Basic`

## Types

Show the ancestor path when it supports orientation; collapse intermediate levels only when available space makes the full path hard to scan.

## Behavior

Clicking an ancestor link navigates directly to that level. The ellipsis indicates collapsed intermediate levels and can be composed with Menu to provide an accessible dropdown for intermediate ancestors.

- **Current page:** The final item is static text and cannot be clicked.

| Do                                                                                                                                                          | Don't                                                                               | Why                                                                              |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| When space is limited, keep the first and current locations visible and make hidden ancestors available from an overflow menu or static ellipsis indicator. | Wrap or truncate the hierarchy without preserving a clear path to the current page. | A clear path helps people understand their location and choose where to go next. |

**Live demo variant:** `Collapsed path`

## Layout

Place Breadcrumb near the page title so it reads as context for the current page.

- **Structure:** Keep the path on one line when it fits. Show the current page as text rather than as a link to itself.
- **Mobile viewports:** Keep the current page and a clear way to reach its parent visible; collapse intermediate ancestors when that improves scanning.

**Live demo variant:** `Basic`

## Accessibility

Identify the path as navigation, avoid announcing decorative separators, and make the current page clear to assistive technology.

**Live demo variant:** `Basic`

## Content

Use concise labels that match the names people see on the referenced pages. Shorten a long label only when its destination remains clear.

**Live demo variant:** `Custom separator`
