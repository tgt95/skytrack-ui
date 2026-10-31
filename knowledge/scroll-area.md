# Scroll Area

> A native scroll container with custom, theme-aware scrollbars.

- Package version: `0.1.5`
- Public export: `skytrack-ui/scroll-area`
- Implementation: [`src/components/ui/scroll-area.tsx`](../src/components/ui/scroll-area.tsx)
- Public type declaration: [`dist-lib/components/ui/scroll-area.d.ts`](../dist-lib/components/ui/scroll-area.d.ts)
- Showcase demo id: `scroll-area`
- Closest demo: [`src/demos/scroll-area.demo.tsx`](../src/demos/scroll-area.demo.tsx)

## Overview

The Scroll Area component augments native scrolling with consistent, theme-aware custom scrollbars across all operating systems and browsers. In SkyTrack, it manages dense telemetry inspector panels, terminal debug streams, mission checklists, and long waypoint coordinates without jarring native scrollbar styling discrepancies.

Built on `@base-ui/react/scroll-area`, it preserves native momentum scrolling on touchpads and mobile devices while featuring custom scrollbar thumb styling that fades in upon hover or scroll activity.

**Live demo variant:** `Demo`

```tsx
import {
  ScrollArea,
  ScrollAreaViewport,
  ScrollAreaContent,
  ScrollAreaScrollbar,
  ScrollAreaThumb
} from '@/components/ui/scroll-area'

export function ScrollAreaExample() {
  return (
    <ScrollArea className='h-48 w-64 rounded-(--radius) border border-border'>
      <ScrollAreaViewport>
        <ScrollAreaContent>
          <div className='font-medium text-foreground'>Active Waypoints</div>
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className='text-xs text-muted-foreground'>
              WP #{i + 1}: 37.7749° N, 122.4194° W · Alt: 120m
            </div>
          ))}
        </ScrollAreaContent>
      </ScrollAreaViewport>
      <ScrollAreaScrollbar orientation='vertical'>
        <ScrollAreaThumb />
      </ScrollAreaScrollbar>
    </ScrollArea>
  )
}
```

## Usage

Use Scroll Area whenever long vertical or horizontal content must scroll inside a constrained viewport (e.g. sidebars, modal bodies, dropdown menus, code blocks).

Do not use Scroll Area when the entire web page should scroll normally via window scroll. Avoid nesting scroll areas with the same orientation inside one another, which leads to confusing scroll-trapping behavior for operators.

**Live demo variant:** `Both scrollbars`

## Anatomy

Render in strict structural hierarchy:

1. `ScrollArea`: Outer container establishing bounds and clipping (`data-slot='scroll-area'`).
2. `ScrollAreaViewport`: Internal scroll container equipped with focus ring styles and wheel listeners (`data-slot='scroll-area-viewport'`).
3. `ScrollAreaContent`: Padded content wrapper holding children (`data-slot='scroll-area-content'`).
4. `ScrollAreaScrollbar`: Track element positioned at the container edge (`data-slot='scroll-area-scrollbar'`), supporting vertical or horizontal orientation.
5. `ScrollAreaThumb`: Draggable scroll thumb pill (`data-slot='scroll-area-thumb'`).
6. `ScrollAreaCorner`: Bottom-corner filler when both vertical and horizontal scrollbars are active (`data-slot='scroll-area-corner'`).

**Live demo variant:** `Gradient scroll fade`

## Variants & states

Supported scrollbar behavior:

- Orientations: `orientation='vertical'` (2px wide) and `orientation='horizontal'` (2px high).
- Visibility states: Fades in on mouse hover (`data-hovering`) or active scroll gestures (`data-scrolling`). Automatically hides when idle (`opacity-0`).
- Bi-directional scrolling: Can compose both vertical and horizontal scrollbars simultaneously alongside `ScrollAreaCorner`.

**Live demo variant:** `Combining with Tabs`

## Accessibility

- Preserves native browser scrolling semantics and keyboard accessibility.
- `ScrollAreaViewport` provides keyboard focus ring styling (`focusRing`) so keyboard-only users can tab into the container and scroll via `ArrowUp`, `ArrowDown`, `PageUp`, `PageDown`, `Home`, and `End` keys.
- Does not hijack native wheel acceleration or touchpad gesture physics.

**Live demo variant:** `Demo`

## API & examples

Import named parts from `skytrack-ui/scroll-area` (or `@/components/ui/scroll-area` locally).

| Component             | Target Props                               | Description              |
| --------------------- | ------------------------------------------ | ------------------------ |
| `ScrollArea`          | standard div props                         | Root container           |
| `ScrollAreaViewport`  | standard div props                         | Native scroll box        |
| `ScrollAreaContent`   | standard div props                         | Padded content container |
| `ScrollAreaScrollbar` | `orientation?: 'vertical' \| 'horizontal'` | Scrollbar track          |
| `ScrollAreaThumb`     | standard div props                         | Draggable thumb pill     |
| `ScrollAreaCorner`    | standard div props                         | Intersection corner      |

Tokens: Uses `--border`, `--background`, and `--radius`.

**Live demo variant:** `Both scrollbars`

## Evidence and limits

- Package/version checked: `0.1.5`.
- Export: [`package.json`](../package.json) — `./scroll-area`.
- Source, public declarations, and closest demo: linked above.
- Limits or unverified behavior: None found in inspected source. Viewport attaches a non-passive wheel listener to normalize smooth shift-wheel horizontal scrolling.
