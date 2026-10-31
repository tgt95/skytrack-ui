# Button

> An action control for submitting, confirming, opening, or changing something.

- Package version: `0.1.5`
- Public export: `skytrack-ui/button`
- Implementation: [`src/components/ui/button.tsx`](../../src/components/ui/button.tsx)
- Public type declaration: [`dist-lib/components/ui/button.d.ts`](../../dist-lib/components/ui/button.d.ts)
- Showcase demo id: `button`
- Closest demo: [`src/demos/button.demo.tsx`](../../src/demos/button.demo.tsx)
- Official guidance: [Fluent 2 Button Usage](https://fluent2.microsoft.design/components/web/react/core/button/usage)

## Usage

Use Button for a clear, discrete action—such as saving changes, inviting a person, or exporting records. Use a link when the action navigates to another destination.

- **Fit:** Direct actions and form submissions.
- **Avoid:** Navigation to another page should use a link. Use Switch for a setting that takes effect immediately.
- **Best alternative:** For navigation, use a link. Reserve Button for actions.

**Live demo variant:** `Variants`

## Types

Use visual hierarchy to make the main action easy to identify, following Fluent 2 guidance:

- **Primary:** Use a filled style for the main action. Show one primary action per visual group.
- **Secondary:** Use neutral styling for supporting actions such as “Cancel” or “Save draft”.
- **Destructive:** Use a clear danger style for irreversible actions such as “Delete record”.
- **Quiet:** Use a low emphasis style for repeated actions in dense lists and tables.

Choose a button size that fits its context while keeping its label and hit area easy to read and use. Icon-only buttons need a clear accessible name and a target large enough to activate comfortably.

**Live demo variant:** `Sizes`

## Behavior

Buttons provide tactile feedback across hover, active, and focus-visible states.

- **Loading state:** Show that the action is in progress and prevent accidental repeat activation. Keep the action’s label or context understandable while it is busy.

**Live demo variant:** `Loading (focusableWhenDisabled)`

## Layout

Separate buttons in a group by 8–12px. Place the primary action where people expect to complete the task, such as at the end of a dialog footer or form action row.

- **Mobile viewports:** Use a comfortable touch target of at least 44px. Let a button fill the available width when that improves clarity or reach.

| Do                                                                                         | Don't                                                               | Why                                                                       |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| Give one main action the strongest emphasis and use quieter styles for supporting actions. | Give several equally prominent styles to actions in the same group. | A clear visual hierarchy helps people identify the recommended next step. |

**Live demo variant:** `With icon`

## Accessibility

Give every action a clear accessible name. Icon-only actions need a descriptive name. Enter and Space activate buttons; show a visible focus indicator in both themes.

**Live demo variant:** `Disabled`

## Content

Labels should be concise and start with a direct action verb, such as “Save”, “Invite”, or “Export”.

**Live demo variant:** `Link styled with buttonVariants`
