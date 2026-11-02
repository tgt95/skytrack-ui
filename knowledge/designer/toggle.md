# Toggle

> A two-state control for turning an optional view or mode on and off.

- Package version: `0.1.5`
- Public export: `skytrack-ui/toggle`
- Implementation: [`src/components/ui/toggle.tsx`](../../src/components/ui/toggle.tsx)
- Public type declaration: [`dist-lib/components/ui/toggle.d.ts`](../../dist-lib/components/ui/toggle.d.ts)
- Showcase demo id: `toggle`
- Closest demo: [`src/demos/toggle.demo.tsx`](../../src/demos/toggle.demo.tsx)
- Official guidance: [W3C WAI ARIA Toggle Button Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/button/)

## Usage

Use Toggle for an independent, two-state interactive button that can be toggled on or off to activate a specific tool or display mode (e.g. "Pin inspector panel", "Mute audio cues", “Show activity summary”, "Favorite project").

Avoid Toggle for executing an immediate action that does not persist state (use standard Button), for multi-option selection sets (use Toggle Group), or inside standard forms where a checkbox is expected (use Checkbox).

The best alternative for grouping multiple mutually exclusive toggles is Toggle Group. For standalone actions that trigger an event rather than state, choose Button.

**Live demo variant:** `Default`

## Types

Use a quiet or outlined toggle according to the emphasis and boundary needed in its context.

## Behavior

Selecting the control changes its state between on and off. Make the active state visually clear.

Visual background and border styling transition immediately to reflect the new state. Disabled toggles reject interaction and appear visually muted.

**Live demo variant:** `Outline`

## Layout

Place Toggle alongside related action buttons or utility tools inside toolbars, workspace controls, or card headers. Use a size that fits the surrounding actions.

Maintain 4–8px spacing between adjacent toggle buttons. On mobile touch viewports, ensure the toggle hit target is at least 44x44px so users can activate it reliably with a thumb.

| Do                                                                                                                      | Don't                                                                                                           | Why                                                                                                                   |
| ----------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Keep the button label and icon static while toggling, using the pressed visual styling to communicate the active state. | Dynamically swap the button's label text between opposite states (e.g. changing label from "Mute" to "Unmute"). | Dynamically changing labels leaves users uncertain whether the button indicates the current state or the next action. |

**Live demo variant:** `With text`

## Accessibility

Use a clear label and show its current on/off state. Keep focus visible. Enter or Space changes the state.

**Live demo variant:** `Disabled`

## Content

Labels should be short, single-word or two-word capabilities (e.g., "Pin", "Grid", "Mute").

Never change the label dynamically when the button is pressed.

**Live demo variant:** `With text`
