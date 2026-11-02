# Slider

> A control for adjusting an approximate value across a continuous range.

- Package version: `0.1.5`
- Public export: `skytrack-ui/slider`
- Implementation: [`src/components/ui/slider.tsx`](../../src/components/ui/slider.tsx)
- Public type declaration: [`dist-lib/components/ui/slider.d.ts`](../../dist-lib/components/ui/slider.d.ts)
- Showcase demo id: `slider`
- Closest demo: [`src/demos/slider.demo.tsx`](../../src/demos/slider.demo.tsx)
- Official guidance: [Carbon Design System Slider Usage](https://carbondesignsystem.com/components/slider/usage/)

## Usage

Use Slider when people need to adjust an approximate value across a bounded range, such as image brightness, playback speed, or notification volume.

Use a numeric field when people need an exact value; pair it with Slider only when adjusting a range visually is also useful.

The best alternative for strict numeric precision is Number Field. For selecting discrete presets, choose Radio Group or Toggle Group.

**Live demo variant:** `Demo`

## Types

Use one thumb for a single value, two for a bounded range, and steps when only defined values are valid.

## Behavior

Dragging the thumb updates the value smoothly. Clicking anywhere along the track jumps the thumb to that position.

In stepped mode, the thumb snaps cleanly to the nearest step increment. Disabled sliders prevent dragging and appear dimmed.

**Live demo variant:** `Steps`

## Layout

Place Slider beside the setting it changes. Show a visible label and the current value beside or above the track.

Show scale markers when they help people understand meaningful increments. Leave enough space around the track to distinguish nearby content.

| Do                                                                                      | Don't                                                               | Why                                                                                  |
| --------------------------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| Show the current value beside the slider when people need to make a precise adjustment. | Make people guess the current value from the handle position alone. | A visible value supports accurate adjustments and helps people understand the scale. |

**Live demo variant:** `Marks`

## Accessibility

Label the setting and unit. Show the current value and range. Arrow keys adjust; Home and End move to the minimum and maximum.

**Live demo variant:** `Disabled`

## Content

Labels should clearly state the parameter and unit (e.g., “Image angle (°)”, “Opacity (%)”).

Always display the current numeric value with units alongside the control.

**Live demo variant:** `Labeling a slider`
