# Left Navigation Shell

> Fixed vertical left navigation optimized for deep enterprise CRM, ERP, and CMS hierarchies.

- Package version: `0.1.5`
- Showcase demo id: `left-nav-shell`
- Closest demo: [`src/demos/left-nav-shell.demo.tsx`](../../../../../src/demos/left-nav-shell.demo.tsx)
- Pattern source: [`docs/enterprise_ui_shell_patterns.md`](../../../../../docs/enterprise_ui_shell_patterns.md)

## Usage

Use Left Navigation Shell when an enterprise application requires a multi-level information hierarchy (L1, L2, L3) with scalable menu expansion. The vertical left-hand navigation panel anchors primary destination routing and provides durable orientation for deep transactional workflows.

- **Fit:** Complex ERP systems (SAP, Odoo), CRM platforms (Salesforce Lightning, HubSpot), Headless/Enterprise CMS (Strapi, WordPress Admin).
- **Avoid:** Single-purpose SaaS tools, lightweight consumer web apps, full-screen canvas editors.
- **Best alternative:** For broad multi-product cloud ecosystems, use the Combined / Hybrid Shell.

**Live demo variant:** `Default`

## Types

Left Navigation Shell provides two primary display states:

- **Expanded Mode:** Full-width panel displaying category labels, icons, group headers, and contextual count badges.
- **Collapsed / Icon-only Mode:** Compact rail preserving horizontal screen real estate for wide data tables while retaining icon tooltips.

## Behavior

- **Toggle transitions:** Smooth collapse and expand triggered via header hamburger button or keyboard shortcut (⌘B).
- **Active destination highlighting:** Current route highlighted with high-contrast accent background and distinct font weight.
- **Persistent breadcrumbs:** Top action subheader keeps persistent location breadcrumbs to allow single-click backtracking.

| Do | Don't | Why |
| --- | --- | --- |
| Group navigation items into clear semantic groups and provide category search when items exceed 10. | Overload the top level with unorganized flat links that force endless vertical scrolling. | Organized categorization prevents decision fatigue and accelerates visual scanning. |
| Provide persistent breadcrumbs inside the content header to anchor current hierarchy depth. | Remove breadcrumb trails on nested detail screens. | Breadcrumbs reinforce orientation and enable direct upward navigation. |

**Live demo variant:** `Default`

## Layout

- **Navigation rail width:** 200px - 240px when expanded; 56px - 64px when collapsed.
- **Content grid:** Responsive layout pairing a primary data table with summary metric widgets.
- **Minimal status bar:** Docked 24px footer showing real-time gateway health, latency, and last sync timestamp.

**Live demo variant:** `Default`

## Accessibility

- Navigation landmark configured with `<nav aria-label="Main Navigation">`.
- Collapsible rail button provides explicit `aria-expanded="true|false"` states.
- Icon-only collapsed items expose accessible names via tooltips and `aria-label` attributes.

**Live demo variant:** `Default`

## Content

- Navigation labels should use concise sentence-case nouns (e.g., "Dashboard", "Sales & Deals", "Accounts", "Invoices").
- Badges must denote actionable counts (e.g., pending tasks, active deals) rather than generic status indicators.

**Live demo variant:** `Default`
