# Multi-Tabbed Shell

> In-app tabbed workspace supporting intensive multitasking across multiple documents without state loss.

- Package version: `0.1.5`
- Showcase demo id: `multi-tab-shell`
- Closest demo: [`src/demos/multi-tab-shell.demo.tsx`](../../../../../src/demos/multi-tab-shell.demo.tsx)
- Pattern source: [`docs/enterprise_ui_shell_patterns.md`](../../../../../docs/enterprise_ui_shell_patterns.md)

## Usage

Use Multi-Tabbed Shell for mission-critical operations where users concurrently inspect, compare, and modify multiple customer records or orders (such as core banking, freight logistics, and call center dispatching). Internal in-app tabs prevent data loss from uncommitted forms and eliminate the chaos of managing dozens of browser-level tabs.

- **Fit:** Core banking applications, logistics freight dispatch, tele-sales and support contact centers.
- **Avoid:** Single-record consumer portals, static documentation, mobile viewports.
- **Best alternative:** For linear single-record workflows, choose Left Navigation Shell.

**Live demo variant:** `Default`

## Types

- **Pinned vs Closable Tabs:** The primary Dashboard tab remains permanently pinned on the left, while contextual record tabs include close buttons (`×`).
- **Sub-navigation per Tab:** Each active tab manages an internal sub-navigation rail to navigate sections of that specific entity.

## Behavior

- **State preservation:** Form inputs, scroll positions, and unsaved drafts are fully preserved in memory when switching between tabs.
- **Safe close prompt:** Closing a tab with dirty form state triggers a confirmation dialog before discarding data.
- **New tab creation:** Clicking the `+` button or opening records from lists creates a new tab seamlessly.

| Do | Don't | Why |
| --- | --- | --- |
| Cap the maximum open tabs between 8 and 12, providing an overflow menu or oldest-tab eviction. | Allow unconstrained tab opening that degrades browser memory performance. | Guardrails maintain fluid runtime performance and prevent cognitive overload. |
| Show concise entity identifiers and customer abbreviations on tab headers (e.g., `Order #9912 (Acme)`). | Truncate long descriptions into unreadable identical prefixes. | Distinct, concise titles enable instantaneous tab identification. |

**Live demo variant:** `Default`

## Layout

- **Global header:** 40px - 44px height showing platform identity, tenant branch, and environment badge.
- **In-app tab bar:** 32px - 36px height positioned directly beneath the global header with horizontal scrolling.
- **Contextual sub-navigation:** 160px - 200px width on the left of the tab content panel.
- **Main tab stage:** Expands to fill remaining area with order details and action triggers.

**Live demo variant:** `Default`

## Accessibility

- Keyboard shortcuts: `Ctrl+W` / `Cmd+W` to close the active tab; `Ctrl+Tab` to cycle open tabs.
- Full ARIA semantics implemented: `role="tablist"`, `role="tab"`, and `role="tabpanel"`.

**Live demo variant:** `Default`

## Content

- Tab headers pair entity icon with ID and account name.
- Primary actions inside tabs are placed at top right: "Edit Order", "Cancel", "Generate Invoice".

**Live demo variant:** `Default`
