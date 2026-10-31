# Breadcrumb

> A path that shows where a page sits in a hierarchy and supports moving to a parent level.

- Package version: `0.1.5`
- Public export: `skytrack-ui/breadcrumb`
- Implementation: [`src/components/ui/breadcrumb.tsx`](../../src/components/ui/breadcrumb.tsx)
- Public type declaration: [`dist-lib/components/ui/breadcrumb.d.ts`](../../dist-lib/components/ui/breadcrumb.d.ts)
- Showcase demo id: `breadcrumb`
- Closest demo: [`src/demos/breadcrumb.demo.tsx`](../../src/demos/breadcrumb.demo.tsx)
- Official guidance: [W3C WAI ARIA Breadcrumb Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/)

## Usage

Use Breadcrumb when people navigate several levels deep and need a quick path back to a parent location, such as “Records > Customers > Customer details”.

- **Fit:** Deep navigational structures requiring step-back traversal.
- **Avoid:** Flat app structures, linear wizards (use steppers or Progress), or top-level navigation.
- **Best alternative:** For linear steps, use Progress. For main navigation, use Navigation Menu.

**Live demo variant:** `Basic`

## Types

Breadcrumbs support standard link trails with diverse separator styling:

- **Separators:** Use a subtle, consistent separator between levels.
- **Long paths:** Collapse less relevant middle levels when a path is too long, while keeping the current location clear.

**Live demo variant:** `Custom separator`

## Behavior

Clicking an ancestor link navigates directly to that level. Clicking the ellipsis icon opens an accessible dropdown listing intermediate levels.

- **Current page:** The final item is static text and cannot be clicked.

| Do                                                                                                   | Don't                                                                                | Why                                                                                                         |
| ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------- |
| Collapse deep intermediate parent levels into an ellipsis menu when horizontal space is constrained. | Allow long breadcrumb trails to wrap onto two or three lines above the page heading. | Multi-line breadcrumbs create visual noise and push high-priority charts and activity data down the screen. |

**Live demo variant:** `Collapsed path`

## Layout

Position breadcrumbs directly above the page title.

- **Structure:** Keep the path on one line when possible. Show the current page as text rather than as a link to itself.
- **Mobile viewports:** Collapse intermediate ancestors into an ellipsis menu or replace with a single "Back to [Parent]" link.

**Live demo variant:** `Basic`

## Accessibility

Identify the path as navigation, avoid announcing decorative separators, and make the current page clear to assistive technology.

**Live demo variant:** `Basic`

## Content

Crumb labels must match the exact titles of the referenced parent pages.

- **Truncation:** If an entity name is excessively long, truncate the middle with an ellipsis (e.g. "Project 2026-Alpha...").

**Live demo variant:** `Custom separator`
