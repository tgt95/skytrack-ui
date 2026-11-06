# Resizable

> Let people adjust space between related work areas.

- Package version: `0.1.5`
- Public export: `skytrack-ui/resizable`
- Implementation: [`src/components/ui/resizable.tsx`](../../../../../src/components/ui/resizable.tsx)
- Public type declaration: `ResizableHandleProps` in the linked source; package declarations are emitted by `npm run build:lib`.
- Showcase demo id: `resizable`
- Closest demo: [`src/demos/resizable.demo.tsx`](../../../../../src/demos/resizable.demo.tsx)
- Official guidance: [shadcn/ui Resizable](https://ui.shadcn.com/docs/components/base/resizable) · [react-resizable-panels](https://react-resizable-panels.vercel.app/)

## Usage

Use resizable panels when people need to adjust adjacent, related work areas, such as a map and its details. Use Tabs when only one view is needed at a time, or a Drawer when details should temporarily overlay the work area.

**Live demo variant:** `Horizontal`

## Types

Choose horizontal orientation for side-by-side areas and vertical orientation for stacked areas. Add the visible handle grip when the resize affordance may not be obvious; it does not change how resizing works.

**Live demo variant:** `Vertical`

## Behavior

Dragging or using the keyboard changes the space assigned to neighboring panels. Minimum and maximum sizes protect important content. Collapsible panels can hide secondary content when their task supports that behavior.

**Live demo variant:** `Horizontal`

## Layout

Set an explicit height on the group and choose panel constraints from the content. The group fills its parent size, so provide a definite height through `style`. On narrow screens, use a stacked or single-panel layout when two regions cannot remain useful side by side. Do not rely on users to resize around clipped or inaccessible content.

| Do | Don't | Why |
| --- | --- | --- |
| Keep two related work areas visible and set useful minimum sizes. | Split unrelated destinations or let a panel shrink until its content becomes unusable. | Resizing should support one task while preserving readable content. |

**Live demo variant:** `Vertical`

## Accessibility

Keep the resize separator keyboard-operable and visibly focused. Give each panel an accessible name. Check that keyboard and touch users can resize the areas and that important content remains reachable at narrow widths.

**Live demo variant:** `Horizontal`

## Content

Use concise, task-based names such as “Map” and “Mission details.” Names should describe each panel's content, not its current width or position.

**Live demo variant:** `Horizontal`
