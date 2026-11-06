# Checkbox

> A control for a single optional choice or confirmation.

- Package version: `0.1.5`
- Public export: `skytrack-ui/checkbox`
- Implementation: [`src/components/ui/checkbox.tsx`](../../../../../src/components/ui/checkbox.tsx)
- Public type declaration: [`dist-lib/components/ui/checkbox.d.ts`](../../../../../dist-lib/components/ui/checkbox.d.ts)
- Showcase demo id: `checkbox`
- Closest demo: [`src/demos/checkbox.demo.tsx`](../../../../../src/demos/checkbox.demo.tsx)
- Official guidance: [W3C WAI ARIA Checkbox Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/)

## Usage

Use Checkbox for an independent choice that people confirm when they submit, such as accepting terms or including an optional item.

- **Fit:** Binary decisions that take effect when a form is submitted (e.g. "I confirm compliance").
- **Avoid:** Settings that take effect immediately (use Switch), or selecting between mutually exclusive choices (use Radio Group).
- **Best alternative:** For instant on/off toggles with immediate effect, use Switch.

**Live demo variant:** `Default`

## Types

Use an indeterminate state only to represent partial selection within a parent group.

## Behavior

Clicking either the checkbox box or its adjacent label text toggles the checked state.

- **Form integration:** Use Checkbox for a choice people review and confirm with the rest of the form.
- **Visual feedback:** High-contrast focus rings appear on keyboard focus, and checkmark icons animate into place with clear contrast against the primary token.

| Do                                                                  | Don't                                                              | Why                                                                                                    |
| ------------------------------------------------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| Make the entire label text clickable alongside the checkbox square. | Restrict the click target strictly to the 16x16px checkbox square. | Expanding the hit area across the label improves speed and accessibility on touch and desktop screens. |

**Live demo variant:** `Form integration`

## Layout

Align the checkbox square with the top line of multi-line label text to maintain clean visual baseline alignment.

- **Spacing:** Keep the label close to its checkbox, with enough separation to distinguish neighboring choices.
- **Form placement:** Give the control a visible label and add a short supporting description when it clarifies the choice.
- **Mobile touch targets:** Ensure the interactive hit zone spans at least 44px vertically even though the visual square is 16–20px.

**Live demo variant:** `Labeling a checkbox`

## Accessibility

Use a clear label and make checked, unchecked, mixed, and unavailable states understandable without color alone. Space toggles the focused choice.

**Live demo variant:** `Disabled`

## Content

Labels should be clear, concise, and phrased affirmatively (e.g., “Enable notifications” or “Include archived records”).

- **Formatting:** Write in sentence case. Avoid ending labels with periods unless the label is a full sentence.
- **Terms & agreements:** Place terms confirmation links directly within the label text (e.g., "I accept the [Terms of Service](#)").

**Live demo variant:** `Render callback`
