# Drawer

> A side panel for viewing or editing details while keeping the current page in context.

- Package version: `0.1.5`
- Public export: `skytrack-ui/drawer`
- Implementation: [`src/components/ui/drawer.tsx`](../../src/components/ui/drawer.tsx)
- Public type declaration: [`dist-lib/components/ui/drawer.d.ts`](../../dist-lib/components/ui/drawer.d.ts)
- Showcase demo id: `drawer`
- Closest demo: [`src/demos/drawer.demo.tsx`](../../src/demos/drawer.demo.tsx)
- Official guidance: [Fluent 2 Drawer Usage](https://fluent2.microsoft.design/components/web/react/core/drawer/usage)

## Usage

Use Drawer when users need to inspect object details, edit secondary settings, or review logs without navigating away from the primary screen or map view.

- **Fit:** A detail panel people need to view beside the current page, or a focused panel on a narrow screen.
- **Avoid:** Destructive alert confirmations (use Alert Dialog), or simple dropdown choices (use Menu).
- **Best alternative:** For compact modal forms, use Dialog. For persistent sidebars, use Sidebar.

**Live demo variant:** `Default`

## Types

Drawer supports multiple positions and sheet configurations:

- **Placement:** Choose the opening edge based on the panel’s relationship to the content and the available screen space.
- **Action Sheets:** Bottom-aligned drawer with isolated destructive actions for rapid thumb operation on tablets or mobile phones.
- **Modal vs Non-modal:** Modal drawers lock background clicks with an overlay; non-modal drawers allow users to interact with background map coordinates while keeping the inspector open.

**Live demo variant:** `Position`

## Behavior

Drawers feature smooth fluid transitions and gesture support:

- **Swipe-to-dismiss:** Touch and pointer drag gestures allow users to swipe the drawer closed.
- **Snap points:** Supports multiple height snap points (e.g., 25% preview, 50% summary, 90% full-screen inspection).
- **Dismissal:** Clicking the backdrop overlay or pressing `Escape` closes the drawer.

| Do                                                                                   | Don't                                                              | Why                                                                                             |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------- |
| Use bottom slide-in drawers with snap points on mobile for activity data inspection. | Force centered desktop modal dialogs onto narrow mobile viewports. | Bottom drawers are ergonomically designed for thumb reach and allow progressive content reveal. |

**Live demo variant:** `Snap points`

## Layout

On larger screens, keep the panel narrow enough to leave the underlying page visible. On mobile, let it use the available width without clipping its content.

- **Structure:** Use a clear title, brief description when needed, focused content, and a distinct action area.
- **Action separation:** In action sheets, visually separate destructive operations from neutral actions with a subtle margin.
- **Mobile keyboard:** Check that fields and actions stay reachable when the virtual keyboard opens; do not assume the drawer shifts automatically.

**Live demo variant:** `Action sheet with separate destructive action`

## Accessibility

Clearly name the panel and its purpose. For a modal drawer, keep keyboard focus inside while open and return it to the opening control when closed.

**Live demo variant:** `Swipe to open`

## Content

Titles should identify the item or task (e.g., “Customer details”, “Edit profile”).

- **Descriptions:** Add one concise sentence to explain what the panel contains when the title alone is not enough.
- **Action buttons:** Use explicit verb labels ("Apply Changes", "Dismiss").

**Live demo variant:** `Mobile navigation`
