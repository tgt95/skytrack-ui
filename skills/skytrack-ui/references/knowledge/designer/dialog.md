# Dialog

> A focused overlay for a short task, decision, or related details.

- Package version: `0.1.5`
- Public export: `skytrack-ui/dialog`
- Implementation: [`src/components/ui/dialog.tsx`](../../../../../src/components/ui/dialog.tsx)
- Public type declaration: [`dist-lib/components/ui/dialog.d.ts`](../../../../../dist-lib/components/ui/dialog.d.ts)
- Showcase demo id: `dialog`
- Closest demo: [`src/demos/dialog.demo.tsx`](../../../../../src/demos/dialog.demo.tsx)
- Official guidance: [W3C WAI ARIA Dialog (Modal) Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)

## Usage

Use Dialog for a short, self-contained task that people can complete without losing their place, such as editing a profile, reviewing details, or confirming a non-destructive change. Keep dialogs focused on a single primary goal; do not combine divergent tasks or chain nested workflows within a modal overlay.

- **Fit:** Focused object editing that requires user completion before returning.
- **Avoid:** Complex multi-step workflows or configuration wizards (use a dedicated page, drawer, or step flow), high-risk irreversible operations (use Alert Dialog), or brief status feedback (use Toast).
- **Best alternative:** For complex multi-step tasks or configuration wizards, use a dedicated page, drawer, or step flow. For urgent, high-risk confirmations with no form fields, use Alert Dialog. For slide-over inspection panels, use Drawer.

**Live demo variant:** `Default`

## Types

Choose a dialog pattern by task context, content length, and whether closing could lose meaningful edits.

## Behavior

Opening a dialog visually separates it from the page and prevents interaction with content behind it.

- **Dismissal:** Users can close the modal by clicking the 'x' close button, clicking the backdrop overlay, or pressing `Escape`.
- **Unsaved changes:** If the user has typed into form fields, confirm discarding edits inline within the dialog surface or retain draft edits rather than opening a nested modal. Never launch a second modal dialog on top of an active dialog.

**Live demo variant:** `Close confirmation`

## Layout

Give the dialog enough internal space to separate its title, content, and actions.

- **Focus and structure:** Keep the dialog focused on a single task. Use a clear title, brief description when needed, concise content, and a distinct action area.
- **Actions:** Place the primary action where it is easy to find and pair it with a clear way to cancel. Keep action choices focused on the primary outcome; while some systems like Fluent suggest a maximum of three footer actions, prioritize clarity and minimal distraction over a rigid universal limit.
- **Mobile viewports:** Keep the dialog within the screen and make its content and actions easy to reach.

| Do                                                                                           | Don't                                                                                | Why                                                                                   |
| -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------- |
| Give the primary action more emphasis than the neutral cancel action.                        | Give the primary and cancel actions identical visual weight.                         | A clear hierarchy helps people choose the intended next step.                         |
| Resolve unsaved change confirmations inline or retain draft state within the current dialog. | Launch a second modal dialog on top of an open dialog to confirm discarding changes. | Nested modals disorient users, clutter the interface, and create fragile focus traps. |

**Live demo variant:** `Outside scroll dialog`

## Accessibility

Give the dialog a clear title and purpose. Keep keyboard focus inside while it is open and return focus to the control that opened it when it closes.

**Live demo variant:** `Custom focus management`

## Content

Titles must clearly declare the task (e.g., "Edit project", "Add team member").

- **Descriptions:** Add one concise sentence below the title when people need context to complete the task.
- **Action buttons:** Align button labels directly with the task verb in sentence case (e.g., “Save changes”, “Create project”, “Discard changes”) paired with a clear neutral cancel action. Avoid generic labels like “OK”, “Yes”, or “Continue” that do not explain what will happen.

**Live demo variant:** `Open from a menu`
