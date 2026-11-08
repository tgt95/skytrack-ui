# Switch

> A control for changing a setting that takes effect immediately.

- Package version: `0.1.5`
- Public export: `skytrack-ui/switch`
- Implementation: [`src/components/ui/switch.tsx`](../../../../../src/components/ui/switch.tsx)
- Public type declaration: [`dist-lib/components/ui/switch.d.ts`](../../../../../dist-lib/components/ui/switch.d.ts)
- Showcase demo id: `switch`
- Closest demo: [`src/demos/switch.demo.tsx`](../../../../../src/demos/switch.demo.tsx)

## Usage

Use Switch for binary, standalone settings that take immediate effect without requiring a separate "Save" or "Apply" button (e.g. “Email notifications: On”, “Auto-renew: On”, “Compact view: Off”, “Dark mode: On”).

Avoid Switch inside multi-field forms where settings are submitted together in a batch (use Checkbox instead), or for choosing between non-binary choices (use Radio Group or Toggle Group).

The best alternative for batch form submission is Checkbox. For two mutually exclusive named states that are not strictly on/off (e.g. Auto vs. Manual), choose Toggle Group.

**Live demo variant:** `Labeling a switch`

## Types

Choose a switch size that fits the density of its settings row while keeping its label clear.

## Behavior

Clicking or keyboard-activating the switch toggles state immediately. The thumb animates across the track with a smooth slide transition.

The track shifts color between the off and on states. Disabled switches reject interaction and appear visually muted.

**Live demo variant:** `Form integration`

## Layout

Place Switch controls inline within settings rows, either right-aligned at the end of the row or left-aligned adjacent to the label. Maintain 12–16px vertical gaps between settings rows.

On mobile screens, ensure each switch row provides at least 44px vertical height so that users can tap anywhere across the row or description to toggle the setting.

| Do                                                                                            | Don't                                                                                                                      | Why                                                                                |
| --------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Use clear, affirmative labels that describe what occurs when the switch is in the 'on' state. | Use negative phrasing or contradictory labels like “Disable email notifications” when the off state actually enables them. | Double negatives make it harder to tell what will happen when the setting changes. |

**Live demo variant:** `Labeling a switch`

## Accessibility

Use a clear label that describes the enabled state. Show on and off with position and another cue beyond color. Space or Enter changes the setting.

**Live demo variant:** `Disabled`

## Content

Label copy should use active, positive nouns or capabilities in sentence case (e.g., “Automatic renewal”, “Email notifications”).

Avoid ambiguous or double-negative phrasing.

**Live demo variant:** `Rendering as a native button`
