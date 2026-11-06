# Page Header

> A page heading that establishes context and groups page-level actions.

- Package version: `0.1.5`
- Public export: `skytrack-ui/page-header`
- Implementation: [`src/components/ui/page-header.tsx`](../../../../../src/components/ui/page-header.tsx)
- Public type declaration: Target `./dist-lib/components/ui/page-header.d.ts` declared in [`package.json`](../../../../../package.json) is absent; exported types verified in [`src/components/ui/page-header.tsx`](../../../../../src/components/ui/page-header.tsx).
- Showcase demo id: `page-header`
- Closest demo: [`src/demos/page-header.demo.tsx`](../../../../../src/demos/page-header.demo.tsx)
- Official guidance: [Carbon Design System UI Shell Header](https://carbondesignsystem.com/components/UI-shell-header/usage/)

## Usage

Use Page Header at the top of primary application pages, workspace views, or project workspaces to anchor the page title, display hierarchical breadcrumbs, expose primary page-level actions, and host secondary tabs.

Avoid Page Header inside nested cards, modal dialogs, or slide-out sheets (use dedicated modal headers or card title components instead).

The best alternative for modal or off-canvas container headers is Dialog header parts or Drawer header components.

**Live demo variant:** `With Tabs and Toolbar`

## Types

Choose a header composition that establishes page location and keeps related page-level navigation and actions together.

## Layout

Page Header resides immediately below the global app header or beside the persistent sidebar navigation.

Use a clear page title, with breadcrumbs above it when the route is nested. Align primary and secondary actions together on wide screens; move them below the title on narrow screens.

| Do                                                                                             | Don't                                                                                      | Why                                                                                                |
| ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------- |
| Emphasize one primary call to action in the header toolbar, keeping secondary actions neutral. | Overload the page header with multiple prominent primary buttons and complex filter forms. | Competing primary actions create visual noise and obscure the main task recommended for that page. |

**Live demo variant:** `With Sidebar`

## Accessibility

Use a clear page heading. Mark the current location in the breadcrumb, and give each page action a descriptive name and visible focus.

**Live demo variant:** `Sidebar · Home without Breadcrumb`

## Content

Page titles should be clear, scannable nouns or noun phrases in sentence case (e.g., "Active project planning", "Asset activity diagnostics").

Action button labels should use direct action verbs ("Launch project", "Export report"). Breadcrumb labels should mirror the title of the parent page exactly.

**Live demo variant:** `With Tabs and Toolbar`
