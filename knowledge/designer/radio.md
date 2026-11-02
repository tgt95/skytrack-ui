# Radio Group

> A set of mutually exclusive choices where people select one visible option.

- Package version: `0.1.5`
- Public export: `skytrack-ui/radio`
- Implementation: [`src/components/ui/radio.tsx`](../../src/components/ui/radio.tsx)
- Public type declaration: [`dist-lib/components/ui/radio.d.ts`](../../dist-lib/components/ui/radio.d.ts)
- Showcase demo id: `radio`
- Closest demo: [`src/demos/radio.demo.tsx`](../../src/demos/radio.demo.tsx)
- Official guidance: [Carbon Design System Radio Button Usage](https://carbondesignsystem.com/components/radio-button/usage/)

## Usage

Use Radio Group when people must choose exactly one option from a short, mutually exclusive set that can remain visible together. If the choices no longer scan comfortably in the available space, use a Select instead. For independent selections, use Checkbox Group; for an immediate on/off setting, use Switch.

**Live demo variant:** `Default`

## Behavior

Clicking or keyboard-navigating to an unselected radio button selects it immediately and deselects the previously selected button in the group.

Selection is mutually exclusive within the group. Disabled radio items ignore click and keyboard events.

**Live demo variant:** `Controlled`

## Layout

Stack options with consistent spacing. Use a horizontal row only when all labels fit comfortably and remain easy to compare at the current viewport.

Give the choices a visible group label. On touch screens, make each option easy to tap with a target at least 44px tall.

| Do                                                                                                                       | Don't                                                                 | Why                                                                                                                                                 |
| ------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| Select a default only when one option is recommended; leave the group unselected when the choice needs deliberate input. | Use radio buttons for settings that change immediately when selected. | A preselected answer can bias a decision that should be made intentionally; immediate settings need a control that communicates their on/off state. |

**Live demo variant:** `Form integration`

## Accessibility

Give the choices a clear group label. Arrow keys move and select; Tab enters and leaves the group. Do not use color alone to show selection.

**Live demo variant:** `Disabled and read-only`

## Content

Option labels should be clear, parallel noun phrases or brief statements in sentence case (e.g., “Compact”, “Comfortable”, “Spacious”).

Avoid negative statements or confusing double-negative options.

**Live demo variant:** `Labeling a radio group`
