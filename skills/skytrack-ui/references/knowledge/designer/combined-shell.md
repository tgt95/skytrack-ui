# Combined / Hybrid Shell

> Hybrid top-and-left shell separating macro strategic suite switcher from module-level tactical navigation.

- Package version: `0.1.5`
- Showcase demo id: `combined-shell`
- Closest demo: [`src/demos/combined-shell.demo.tsx`](../../../../../src/demos/combined-shell.demo.tsx)
- Pattern source: [`docs/enterprise_ui_shell_patterns.md`](../../../../../docs/enterprise_ui_shell_patterns.md)

## Usage

Use Combined / Hybrid Shell for extensive enterprise cloud platforms and multi-product suites. The top bar functions as the strategic application switcher (routing between Compute, Storage, Networking, and IAM), while the left-hand sub-navigation handles operational task navigation within the selected module.

- **Fit:** Cloud management consoles (AWS, Azure Portal, GCP), enterprise ERP suites (Oracle NetSuite, Microsoft Dynamics 365).
- **Avoid:** Single-purpose applications, consumer portals, standalone tools.
- **Best alternative:** For single-module systems, use Left Navigation Shell.

**Live demo variant:** `Default`

## Types

- **Module Switcher Mode:** Direct switching between major functional suites via header tabs or app launcher dropdown.
- **Global Tools Integration:** Header embeds platform-wide tools including region selectors (e.g., `us-east-1`), terminal shell launchers, alerts, and user profiles.

## Behavior

- **Contextual synchronization:** Changing the active module in the top bar instantly reloads the left sub-navigation without a full-page reload.
- **Master-detail workspace:** Workspace grid pairs live resource tables with an inline property inspector panel for selected entities.

| Do | Don't | Why |
| --- | --- | --- |
| Clearly separate macro suite selection (top) from micro task navigation (left). | Mix specific task links into the top bar. | Spatial separation clarifies global platform scope versus local task scope. |
| Always show the active datacenter region and deployment environment prominently in the header. | Hide regional or tenant context. | Explicit regional awareness prevents accidental modifications on live production clusters. |

**Live demo variant:** `Default`

## Layout

- **Strategic top bar:** 44px - 48px fixed height with logo, suite tabs, and global tools.
- **Sub-navigation sidebar:** 180px - 220px fixed width on the left.
- **Split workspace:** Central data grid paired with a 220px - 260px right-hand inspector panel.

**Live demo variant:** `Default`

## Accessibility

- Distinct landmark roles separating suite navigation from task navigation (`aria-label="Suite Switcher"` vs `aria-label="Module Tasks"`).
- Keyboard shortcuts configured to toggle between global tools and workspace focus.

**Live demo variant:** `Default`

## Content

- Suite labels use broad functional nouns: "Compute Engine", "Cloud Storage", "Virtual Networks", "IAM & Security".
- Inspector panel communicates exact technical specifications (vCPU, RAM, public IP, security group).

**Live demo variant:** `Default`
