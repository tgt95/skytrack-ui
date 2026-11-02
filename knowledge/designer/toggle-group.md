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

Avoid Toggle Group when the choices no longer fit or scan as a connected set in the available space (use Select), or when people need longer explanations to compare options (use Radio Group).

The best alternative for a large set of options is Select. For an independent, single on/off button, choose Toggle.

**Live demo variant:** `Single`

## Types

Choose single or combined selection and a visual treatment that distinguishes the group from nearby actions.

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

Buttons should use recognizable iconography (e.g. grid, list, chart) or concise labels (e.g. “Day”, “Night”, “Auto”).

Avoid multi-word labels that cause button wrapping.

**Live demo variant:** `Single`
