# Meter

> A visual indicator of a value within a known range, such as capacity or usage.

- Package version: `0.1.5`
- Public export: `skytrack-ui/meter`
- Implementation: [`src/components/ui/meter.tsx`](../../../../../src/components/ui/meter.tsx)
- Public type declaration: [`dist-lib/components/ui/meter.d.ts`](../../../../../dist-lib/components/ui/meter.d.ts)
- Showcase demo id: `meter`
- Closest demo: [`src/demos/meter.demo.tsx`](../../../../../src/demos/meter.demo.tsx)
- Official guidance: [MDN HTML meter element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meter)

## Usage

Use Meter to show a value within a known range, such as storage used, capacity remaining, or completion toward a limit.

Avoid Meter for tracking task duration or completion over time (use Progress), or for values without defined upper and lower bounds.

Use Progress for an activity that is underway. Use Slider when people need to adjust the value themselves.

**Live demo variant:** `Storage used`

## Behavior

Meter displays a passive, bounded graphical fill that updates smoothly as activity data values change. It does not accept direct user interaction.

When a warning or critical range matters to the task, make the status clear with text or another non-color cue as well as the meter value; the component does not switch colors automatically by threshold.

**Live demo variant:** `Battery level`

## Layout

Place Meter beside the information it summarizes. Pair the visual with a clear label and the exact value (e.g., “Storage used: 82%”).

Keep the meter visually proportional to its context, with enough separation from its label and nearby content.

| Do                                                                                                      | Don't                                                                                          | Why                                                                                              |
| ------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| Always display the exact numeric readout and unit alongside the graphical bar (e.g. "14.2 GB / 64 GB"). | Rely solely on bar fill color (e.g. red vs. green) to indicate critical or warning thresholds. | Color-blind users or users under bright sunlight cannot reliably decode status from color alone. |

**Live demo variant:** `Storage used`

## Accessibility

Show the exact value, unit, and range in text alongside the visual indicator. Do not use color as the only cue for status.

**Live demo variant:** `Battery level`

## Content

Labels should clearly state what is measured (e.g., “Storage used”, “Capacity remaining”).

Show the current value, bound, and units when that context helps people understand the measured capacity (e.g., “48.5 / 64.0 GB”).

**Live demo variant:** `Storage used`
