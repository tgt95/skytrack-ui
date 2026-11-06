# Resizable

> Accessible panel groups let people adjust how much space related work areas receive.

- Package version: `0.1.5`
- Public export: `skytrack-ui/resizable`
- Implementation: [`src/components/ui/resizable.tsx`](../../../../src/components/ui/resizable.tsx)
- Public type declaration: `ResizableHandleProps` in the linked source; package declarations are emitted by `npm run build:lib`.
- Showcase demo id: `resizable`
- Closest demo: [`src/demos/resizable.demo.tsx`](../../../../src/demos/resizable.demo.tsx)
- Official guidance: [shadcn/ui Resizable](https://ui.shadcn.com/docs/components/base/resizable) · [react-resizable-panels](https://react-resizable-panels.vercel.app/)

## Overview

Resizable panels divide one workspace into regions that users can resize with a pointer or keyboard. Use them for adjacent, related content such as a map with an inspector or an editor with a preview.

**Live demo variant:** `Horizontal`

```tsx
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from 'skytrack-ui/resizable'

export function WorkspaceLayout() {
  return (
    <ResizablePanelGroup orientation='horizontal' className='w-full' style={{ height: '24rem' }}>
      <ResizablePanel defaultSize='35%' minSize='20%' aria-label='Map'>Map</ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize='65%' minSize='30%' aria-label='Mission details'>Mission details</ResizablePanel>
    </ResizablePanelGroup>
  )
}
```

## Usage

Use a resizable group when people benefit from adjusting the balance between simultaneous work areas. Use a Drawer for a temporary inspector, Tabs for mutually exclusive views, or a fixed layout when resizing has no task value.

Give every panel a useful accessible name, set minimum sizes that preserve its content, and give the group a definite width and height through `style`. The underlying group fills its parent size. Do not make a resizable group the only way to reach important content on narrow screens; switch to a stacked or single-panel flow when side-by-side regions no longer fit.

**Live demo variant:** `Horizontal`

## Anatomy

1. `ResizablePanelGroup` owns the orientation and layout.
2. `ResizablePanel` contains each work area.
3. `ResizableHandle` separates adjacent panels and supplies the keyboard-operable separator. `withHandle` adds a visible grip.

Panels and handles must be direct children of the group in alternating order. A group needs at least two panels. Handles are recommended for keyboard access.

**Live demo variant:** `Horizontal`

## Variants & states

- `orientation='horizontal'` places panels side by side; this is the default.
- `orientation='vertical'` stacks panels.
- `defaultSize`, `minSize`, and `maxSize` accept pixel numbers or CSS unit strings. Use explicit units such as `'40%'` or `'320px'`.
- `collapsible` and `collapsedSize` enable a panel to collapse within its configured constraints.
- `disabled` prevents resizing. `withHandle` changes only the visible grip, not separator behavior.

The wrappers preserve the underlying `react-resizable-panels` props. Use its `onLayoutChanged` for a settled layout; `onLayoutChange` fires during resizing.

**Live demo variant:** `Vertical`

## Accessibility

The handle renders a focusable `role='separator'` with value and orientation attributes from `react-resizable-panels`. Arrow keys resize in the group's orientation; `Home` and `End` move to the minimum and maximum layout, and `Enter` toggles a collapsible adjacent panel. Preserve the separator's focus indicator and do not remove its keyboard target.

Set `aria-label` or `aria-labelledby` on each panel so assistive technology can identify its content region. Keep touch targets usable and verify the layout at narrow widths.

**Live demo variant:** `Horizontal`

## API & examples

Import `ResizablePanelGroup`, `ResizablePanel`, and `ResizableHandle` from `skytrack-ui/resizable`. The example above shows the minimal horizontal composition. Each part accepts the corresponding `react-resizable-panels` props; `ResizableHandle` also accepts `withHandle`.

Provide a concrete group size with `style`; class-based height does not override the underlying group's inline `height: 100%`. Panel sizing numbers mean pixels; unitless strings mean percentages. Use explicit units for clarity. `ResizableHandle` must remain a direct child of its group.

**Live demo variant:** `Vertical`

## Evidence and limits

- Package/version checked: `0.1.5`.
- Export: [`package.json`](../../../../package.json) — `./resizable`.
- Source, dependency types, and demo: [`resizable.tsx`](../../../../src/components/ui/resizable.tsx), `react-resizable-panels@4.18.1`, and [`resizable.demo.tsx`](../../../../src/demos/resizable.demo.tsx). Package declaration output is not verified because no library build was run.
- Limits: this wrapper provides panel sizing, separator styling, and the optional visible grip. It does not choose responsive breakpoints or fallback navigation for consumers.
