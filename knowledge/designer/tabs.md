# Tabs

> A way to move between independent, related content panels on the same page.

- Package version: `0.1.5`
- Public export: `skytrack-ui/tabs`
- Implementation: [`src/components/ui/tabs.tsx`](../../src/components/ui/tabs.tsx)
- Public type declaration: [`dist-lib/components/ui/tabs.d.ts`](../../dist-lib/components/ui/tabs.d.ts)
- Showcase demo id: `tabs`
- Closest demo: [`src/demos/tabs.demo.tsx`](../../src/demos/tabs.demo.tsx)
- Official guidance: [Carbon Design System Tabs Usage](https://carbondesignsystem.com/components/tabs/usage/)

## Usage

Use Tabs to organize related, mutually exclusive content panels on the same page at the same hierarchical level (e.g., Overview, Activity, Details), allowing people to switch views without navigating away.

Avoid Tabs for sequential, step-by-step processes with dependencies (use a Step flow or Wizard instead), or for navigating between completely distinct top-level application modules (use Navigation Menu or Sidebar).

The best alternative for sequential linear workflows is a multi-step form wizard. For primary application routing across modules, choose Sidebar.

**Live demo variant:** `Demo`

## Types

Use tabs for related peer views; choose treatment, orientation, and closability to match their shared context.

## Behavior

Clicking or keyboard-navigating to a tab switches panels immediately. Only one panel is active at a time.

Panel transitions can be animated with smooth cross-fade styling. Disabled tabs ignore clicks and cannot be focused.

**Live demo variant:** `Animated panels`

## Layout

Position tabs directly above their corresponding panels with enough separation to associate each control with its content. Keep the set concise; if people need to scan many destinations, consider another navigation pattern.

For vertical tabs, place the labels beside their panel. On narrow screens, let long tab rows scroll rather than clipping or wrapping labels.

| Do                                                                                  | Don't                                                                                | Why                                                                                                       |
| ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------- |
| Use concise, scannable labels for tab triggers (e.g. Overview, Activity, Settings). | Nest horizontal tab bars directly inside other horizontal tab bars on the same page. | Multi-tier horizontal tabs create severe visual ambiguity about which bar controls which content surface. |

**Live demo variant:** `Vertical`

## Accessibility

Give each tab group a clear name and make the selected tab and its panel understandable. Arrow keys move between tabs.

**Live demo variant:** `Disabled tab`

## Content

Tab titles must be written in sentence case and remain brief (e.g., "Projects", "Locations", "Settings").

Badge counters can be appended to show item counts (e.g. "Locations (12)").

**Live demo variant:** `Closable tabs`
