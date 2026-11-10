# Top Navigation Shell

> Full-width top navigation maximizing horizontal screen real estate for dashboards and analytics.

- Package version: `0.1.5`
- Showcase demo id: `top-nav-shell`
- Closest demo: [`src/demos/top-nav-shell.demo.tsx`](../../../../../src/demos/top-nav-shell.demo.tsx)
- Pattern source: [`docs/enterprise_ui_shell_patterns.md`](../../../../../docs/enterprise_ui_shell_patterns.md)

## Usage

Use Top Navigation Shell for analytics dashboards, business intelligence platforms, and reporting applications where content requires 100% horizontal screen width. By consolidating navigation into the top bar, large data tables, multi-column metrics, and wide charting canvases render without lateral obstruction.

- **Fit:** Analytics suites (Google Analytics, Metabase, Tableau Web), single-module B2B SaaS, editorial dashboards.
- **Avoid:** Deeply nested enterprise ERP suites with dozens of hierarchical modules.
- **Best alternative:** For multi-tier record management, choose Left Navigation Shell.

**Live demo variant:** `Default`

## Types

- **Single Tier Top Bar:** Minimal header consolidating logo, primary horizontal links, global search, and user profile.
- **Top Bar + Contextual Action Bar:** Two-tier layout pairing global links with a secondary action subheader containing date-range pickers, filters, and export triggers.

## Behavior

- **Tab switching:** Horizontal navigation items indicate current active route via underline indicator and high-contrast text.
- **Contextual action bar:** Subheader buttons update dynamically according to the active report view (e.g., date-range parameters, CSV export).

| Do | Don't | Why |
| --- | --- | --- |
| Limit top navigation items to between 5 and 7 primary categories. | Add more than 8 horizontal tabs that overflow or wrap onto multiple lines. | Top bar width is physically bounded; excessive items cause visual clutter and layout breakage. |
| Use secondary dropdown menus for account settings and auxiliary utilities. | Neglect responsive mobile behavior. | On narrow viewports, top navigation must collapse into an accessible drawer sheet. |

**Live demo variant:** `Default`

## Layout

- **Header height:** Standard 48px - 56px sticky top bar.
- **Sub-action bar:** 40px height housing breadcrumbs and report filters.
- **Full-width main stage:** 100% container width accommodating multi-column KPI cards and data grids.

**Live demo variant:** `Default`

## Accessibility

- Header marked with `role="banner"` and navigation bar wrapped in `<nav aria-label="Main Menu">`.
- Keyboard navigation supported across horizontal tabs via Left/Right Arrow keys or Tab order.
- Skip-to-content link provided for immediate screen-reader access to primary report metrics.

**Live demo variant:** `Default`

## Content

- Navigation labels should be brief and distinct (e.g., "Overview", "Revenue Report", "Cohorts", "Conversion", "Integrations").
- Action bar buttons should use imperative verbs (e.g., "Export CSV", "Apply Filters").

**Live demo variant:** `Default`
