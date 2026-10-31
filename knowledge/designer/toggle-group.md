# Toggle Group

> A compact group of related choices or view controls.

- Package version: `0.1.5`
- Public export: `skytrack-ui/toggle-group`
- Implementation: [`src/components/ui/toggle-group.tsx`](../../src/components/ui/toggle-group.tsx)
- Public type declaration: [`dist-lib/components/ui/toggle-group.d.ts`](../../dist-lib/components/ui/toggle-group.d.ts)
- Showcase demo id: `toggle-group`
- Closest demo: [`src/demos/toggle-group.demo.tsx`](../../src/demos/toggle-group.demo.tsx)
- Official guidance: [Carbon Design System Content Switcher Usage](https://carbondesignsystem.com/components/content-switcher/usage/)

## Usage

Use Toggle Group for compact, visually connected button sets that let users choose one or more related options within toolbars or inspector headers (e.g. view mode switcher: Grid vs. List; view filters: Open, Closed, Archived; text alignment controls).

Avoid Toggle Group when there are more than 5 options that would consume excessive horizontal space (use Select), or when options require extensive descriptive explanations (use Radio Group).

The best alternative for a large set of options is Select. For an independent, single on/off button, choose Toggle.

**Live demo variant:** `Single`

## Types

Toggle Group supports three key styling variants:

- **Segmented:** A compact choice between related views, such as List and Grid.
- **Outlined:** A distinct group for related choices alongside other controls.
- **Default:** Clean unbordered button group with subtle active fills.

Use single selection when only one option may be active; use multi-selection when choices can be combined.

**Live demo variant:** `Segmented inset`

## Behavior

In single-select mode, clicking an inactive button activates it and deselects all others. In multi-select mode, clicking toggles that button independently without affecting others.

Make the selected option clearly different from unselected options. Show unavailable choices as disabled.

**Live demo variant:** `Multiple`

## Layout

Place the group near the content or setting it controls. Give its choices consistent sizing.

Stack choices when the available width is limited. Keep groups short enough to scan and reach on narrow screens.

| Do                                                                                  | Don't                                                  | Why                                                            |
| ----------------------------------------------------------------------------------- | ------------------------------------------------------ | -------------------------------------------------------------- |
| Give each icon-only choice a visible or accessible label that explains its meaning. | Use abstract icons without labels or supporting hints. | Clear labels make each choice easier to understand and select. |

**Live demo variant:** `Vertical`

## Accessibility

Give the group a clear name and make each selected state visible beyond color. Arrow keys move between choices; Space or Enter changes selection.

**Live demo variant:** `Outline`

## Content

Buttons should use universal iconography (e.g. grid, list, map layers) or short 1-word labels ("Day", "Night", "Thermal").

Avoid multi-word labels that cause button wrapping.

**Live demo variant:** `Single`
