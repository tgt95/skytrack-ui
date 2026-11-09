# Tabs

> A component for toggling between related panels on the same page.

- Package version: `0.1.5`
- Public export: `skytrack-ui/tabs`
- Implementation: [`src/components/ui/tabs.tsx`](../../../../../src/components/ui/tabs.tsx)
- Public type declaration: [`dist-lib/components/ui/tabs.d.ts`](../../../../../dist-lib/components/ui/tabs.d.ts) (matches source version `0.1.5`)
- Showcase demo id: `tabs`
- Closest demo: [`src/demos/tabs.demo.tsx`](../../../../../src/demos/tabs.demo.tsx)

## Overview

The Tabs component enables switching between multiple views, sheets, or sections within a single context. Built on Base UI Tabs, it provides animated sliding indicators, line or filled tab styles, horizontal and vertical orientations, and complete keyboard accessibility.

**Live demo variant:** `Demo`

```tsx
import { Tabs, TabsList, TabsPanel, TabsTab } from '@/components/ui/tabs'

export function TabsDemo() {
  return (
    <Tabs defaultValue='telemetry' className='w-full max-w-md'>
      <TabsList variant='line'>
        <TabsTab value='telemetry'>Telemetry</TabsTab>
        <TabsTab value='flight-plan'>Flight Plan</TabsTab>
        <TabsTab value='weather'>Weather</TabsTab>
      </TabsList>
      <TabsPanel value='telemetry' className='p-3 text-sm text-muted-foreground'>
        Real-time ADS-B altitude and speed metrics.
      </TabsPanel>
      <TabsPanel value='flight-plan' className='p-3 text-sm text-muted-foreground'>
        Waypoints: SFO → OAK → SAC → RNO.
      </TabsPanel>
      <TabsPanel value='weather' className='p-3 text-sm text-muted-foreground'>
        METAR/TAF ceiling clear, visibility 10+ SM.
      </TabsPanel>
    </Tabs>
  )
}
```

## Usage

Use Tabs when content can be separated into distinct parallel categories that users view one at a time without losing page context. For multi-step sequential wizards where users must finish step 1 before proceeding to step 2, use a step indicator or sequential form flow instead. For site-wide or page-level navigation changing URL routes, use `NavigationMenu` or `Breadcrumb`.

**Live demo variant:** `Variants`

## Anatomy

### Composition Tree

```text
<Tabs value={activeTab} onValueChange={setActiveTab} orientation='horizontal|vertical'>
├─ <TabsList>
│  ├─ <TabsTab value='tab1'>Tab 1</TabsTab>
│  ├─ <TabsTab value='tab2'>Tab 2</TabsTab>
│  └─ <TabsIndicator /> (optional sliding highlight bar)
├─ <TabsPanel value='tab1'>Panel 1 content</TabsPanel>
└─ <TabsPanel value='tab2'>Panel 2 content</TabsPanel>
</Tabs>
```

Tabs is composed of:

1. `Tabs` (Root provider managing selected tab value, orientation, and context)
2. `TabsList` (Bar container hosting tabs; manages indicator line animations)
3. `TabsTab` (Individual clickable tab trigger)
4. `TabsIndicator` (Sliding indicator highlight bar rendered inside `TabsList`)
5. `TabsPanel` (Content view associated with a specific tab `value`)

Alias exports `TabsTrigger` (alias for `TabsTab`) and `TabsContent` (alias for `TabsPanel`) are also provided for migration convenience.

**Live demo variant:** `Demo`

## Variants & states

Supported variants:

- `variant` on `TabsList`: `line` (border-bottom active line indicator), `filled` (segmented pill container), and `pill`.
- `size`: `xs` (24px height), `sm` (32px), `default` (36px), and `lg` (40px).
- `orientation`: `horizontal` (default) or `vertical`.
- `width`: `hug` (default) or `full` (flex-1 evenly distributed tabs).
- States: active tab, inactive tab, hover, focused, and `disabled`.

**Live demo variant:** `Vertical`

## Accessibility

Follows the WAI-ARIA Tabs design pattern. The tablist has `role='tablist'`, tabs have `role='tab'` with `aria-selected` and `aria-controls`, and panels have `role='tabpanel'` with `aria-labelledby`. Arrow key navigation (`ArrowLeft`/`ArrowRight` horizontally, `ArrowUp`/`ArrowDown` vertically) moves focus between tabs and automatically activates panels.

**Live demo variant:** `Disabled tab`

## API & examples

Import `Tabs`, `TabsList`, `TabsTab`, `TabsPanel`, and `TabsIndicator` from `skytrack-ui/tabs` or `@/components/ui/tabs`. Key root props: `value`, `defaultValue`, `onValueChange`, and `orientation`.

**Live demo variant:** `Animated panels`

## Evidence and limits

- Package/version checked: `0.1.5`.
- Export: [`package.json`](../../../../../package.json) — `./tabs`.
- Source, public declarations, and closest demo: linked above.
- Limits or unverified behavior: When using `TabsList variant='line'`, the active indicator automatically tracks position; avoid mixing fixed manual padding on individual tab children that could misalign the indicator bounding box.
