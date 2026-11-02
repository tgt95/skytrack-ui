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

Choose action emphasis by priority and use an icon when it improves recognition without replacing the label.

## Behavior

Buttons provide tactile feedback across hover, active, and focus-visible states.

- **Loading state:** Show that the action is in progress and prevent accidental repeat activation. Keep the action’s label or context understandable while it is busy.

**Live demo variant:** `Loading (focusableWhenDisabled)`

## Layout

State one primary action for the layout to anchor the primary task, and separate buttons in a group by 8–12px. Place the primary action where people expect to complete the task, such as at the end of a dialog footer or form action row. Multiple secondary actions with equal priority can share a consistent neutral appearance.

- **Mobile viewports:** Use a comfortable touch target of at least 44px. Let a button fill the available width when that improves clarity or reach.

| Do                                                                                                  | Don't                                                                                                                                                                 | Why                                                                                                                  |
| --------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| Give one main action primary emphasis in the layout, and use neutral or quieter styles for supporting actions. | Use multiple primary or heavily emphasized actions in the same group. Multiple secondary actions may share equal neutral priority, but competing primary styles confuse hierarchy. | A single primary action clarifies the recommended next step, while secondary peer actions remain accessible without visual competition. |

**Live demo variant:** `With icon`

## Accessibility

Give every action a clear accessible name. Icon-only actions need a descriptive name. Enter and Space activate buttons; show a visible focus indicator in both themes.

**Live demo variant:** `Disabled`

## Content

Labels should be concise and start with a direct action verb, such as “Save”, “Invite”, or “Export”.

**Live demo variant:** `Link styled with buttonVariants`
