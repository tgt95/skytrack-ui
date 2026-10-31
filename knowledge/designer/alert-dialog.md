# Alert Dialog

> A confirmation dialog for decisions with serious or difficult-to-reverse consequences.

- Package version: `0.1.5`
- Public export: `skytrack-ui/alert-dialog`
- Implementation: [`src/components/ui/alert-dialog.tsx`](../../src/components/ui/alert-dialog.tsx)
- Public type declaration: [`dist-lib/components/ui/alert-dialog.d.ts`](../../dist-lib/components/ui/alert-dialog.d.ts)
- Showcase demo id: `alert-dialog`
- Closest demo: [`src/demos/alert-dialog.demo.tsx`](../../src/demos/alert-dialog.demo.tsx)
- Official guidance: [W3C WAI ARIA Alert and Message Dialogs Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/)

## Usage

Use Alert Dialog when an action carries high user or data risk, irreversibly destroys data, or interrupts an important workflow—such as deleting a large group of records or closing an account.

- **Fit:** High-risk, irreversible operations requiring deliberate user confirmation.
- **Avoid:** Standard form submissions, non-destructive confirmations, or routine background notifications.
- **Best alternative:** For general forms and non-critical dialogs, use Dialog. For brief status updates, use Alert or Toast.

**Live demo variant:** `Default`

## Types

Alert Dialogs are modal surfaces with fixed roles:

- **Destructive confirmation:** A clearly emphasized danger action paired with a neutral, safe way to cancel.
- **Detached Triggers:** Opened via external action buttons or table row context menus.
- **Programmatically Controlled:** Managed via application state during project cancellation sequences.

**Live demo variant:** `Controlled mode with multiple triggers`

## Behavior

Alert Dialog separates the decision from the page and prevents interaction with content behind it until people respond.

- **Non-dismissable backdrop:** Clicking the backdrop does not close the dialog; an explicit button click is required.
- **Safe escape:** Pressing `Escape` or the cancel button exits safely without executing the destructive action.

**Live demo variant:** `Close confirmation`

## Layout

Keep the dialog focused and give its contents enough space to be read without crowding.

- **Structure:** Separate the title, explanation, and actions with clear spacing.
- **Action alignment:** Keep safe and destructive actions visually distinct. On narrow screens, stack them with the safe choice easy to reach.

| Do                                                                                               | Don't                                                                      | Why                                                                                      |
| ------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| Place the primary destructive confirmation button beside a clearly styled neutral cancel button. | Make the destructive action and the cancel button share identical styling. | Clear contrast in visual weight prevents misclicks when confirming a high-impact action. |

**Live demo variant:** `Detached triggers`

## Accessibility

State the decision and its consequence in the title and message. Keep keyboard focus within the confirmation until the user decides; announce the interruption clearly and return focus to the initiating control when it closes.

**Live demo variant:** `Open from a menu`

## Content

Titles must be clear, declarative statements or direct questions (e.g., “Delete this project?”).

- **Description:** Clearly state what will happen and that the action cannot be undone.
- **Button labels:** Pair explicit verbs (e.g., “Cancel” and “Delete project”). Avoid vague "OK".

**Live demo variant:** `Default`
