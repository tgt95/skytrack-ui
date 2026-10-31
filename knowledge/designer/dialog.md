# Dialog

> A focused overlay for a short task, decision, or related details.

- Package version: `0.1.5`
- Public export: `skytrack-ui/dialog`
- Implementation: [`src/components/ui/dialog.tsx`](../../src/components/ui/dialog.tsx)
- Public type declaration: [`dist-lib/components/ui/dialog.d.ts`](../../dist-lib/components/ui/dialog.d.ts)
- Showcase demo id: `dialog`
- Closest demo: [`src/demos/dialog.demo.tsx`](../../src/demos/dialog.demo.tsx)
- Official guidance: [W3C WAI ARIA Dialog (Modal) Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)

## Usage

Use Dialog for a short, self-contained task that people can complete without losing their place, such as editing a profile, reviewing details, or confirming a non-destructive change.

- **Fit:** Complex multi-field forms, configuration wizards, and focused object editing that require user completion before returning.
- **Avoid:** Irreversible actions that need an explicit confirmation (use Alert Dialog) or brief status feedback (use Toast).
- **Best alternative:** For urgent, high-risk confirmations with no form fields, use Alert Dialog. For slide-over inspection panels, use Drawer.

**Live demo variant:** `Default`

## Types

Dialog provides diverse scrolling and containment options:

- **Standard Dialog:** Centered modal card suitable for 3–6 form fields.
- **Inside Scroll Dialog (`Inside scroll dialog`):** Keeps header and footer fixed while scrolling the body content internally.
- **Outside Scroll Dialog (`Outside scroll dialog`):** The entire modal scrolls within the page viewport, ideal for lengthy multi-section forms.

**Live demo variant:** `Inside scroll dialog`

## Behavior

Opening a dialog visually separates it from the page and prevents interaction with content behind it.

- **Dismissal:** Users can close the modal by clicking the 'x' close button, clicking the backdrop overlay, or pressing `Escape`.
- **Unsaved changes:** If the user has typed into form fields, trigger a confirmation before discarding edits.

**Live demo variant:** `Close confirmation`

## Layout

Give the dialog enough internal space to separate its title, content, and actions.

- **Structure:** Use a clear title, brief description when needed, focused content, and a distinct action area.
- **Actions:** Place the primary action where it is easy to find and pair it with a clear way to cancel.
- **Mobile viewports:** Keep the dialog within the screen and make its content and actions easy to reach.

| Do                                                                    | Don't                                                        | Why                                                           |
| --------------------------------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------- |
| Give the primary action more emphasis than the neutral cancel action. | Give the primary and cancel actions identical visual weight. | A clear hierarchy helps people choose the intended next step. |

**Live demo variant:** `Outside scroll dialog`

## Accessibility

Give the dialog a clear title and purpose. Keep keyboard focus inside while it is open and return focus to the control that opened it when it closes.

**Live demo variant:** `Custom focus management`

## Content

Titles must clearly declare the task (e.g., "Edit project", "Add team member").

- **Descriptions:** Add one concise sentence below the title when people need context to complete the task.
- **Action buttons:** Pair explicit verbs (e.g., "Save Work Plan" and "Cancel"). Avoid generic "OK".

**Live demo variant:** `Open from a menu`
