# Toast

> A brief, temporary confirmation or update that does not interrupt the current task.

- Package version: `0.1.5`
- Public export: `skytrack-ui/toast`
- Implementation: [`src/components/ui/toast.tsx`](../../src/components/ui/toast.tsx)
- Public type declaration: [`dist-lib/components/ui/toast.d.ts`](../../dist-lib/components/ui/toast.d.ts)
- Showcase demo id: `toast`
- Closest demo: [`src/demos/toast.demo.tsx`](../../src/demos/toast.demo.tsx)
- Official guidance: [Carbon Design System Toast Notification Usage](https://carbondesignsystem.com/components/notification/usage/)

## Usage

Use Toast for brief, non-critical feedback that confirms the outcome of an action without interrupting the current task (e.g., “Changes saved”, “Link copied”, “Item deleted”).

Avoid Toast for critical system errors, mandatory security alerts, or warnings that require immediate user action before continuing (use persistent Alert or modal Alert Dialog).

The best alternative for urgent errors requiring immediate attention is Alert. For critical confirmations requiring an explicit decision before proceeding, choose Alert Dialog.

**Live demo variant:** `Default`

## Types

Toast supports status styling for `success`, `error`, `warning`, and `loading` messages. Its default `stacked` layout collapses older toasts behind the newest; `flat` displays them as a list.

**Live demo variant:** `Undo action`

## Behavior

The provider queues toasts and uses a 5-second default timeout; set a different timeout when a message or action needs more or less time. The underlying Base UI toast pauses its timer while hovered or focused. Promise toasts can update through loading, success, and error states.

**Live demo variant:** `Default`

## Layout

Place brief notifications where they are noticeable without covering important content. On narrow screens, let them fit the available width and leave space between stacked messages.

| Do                                                                                                                   | Don't                                                                                                       | Why                                                                                                               |
| -------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| Include an immediate inline "Undo" action for reversible operations like deleting a location or archiving a project. | Pack lengthy multi-paragraph instructions, complex forms, or critical error logs into a disappearing toast. | Users cannot read long messages before the toast automatically dismisses, leading to missed critical information. |

**Live demo variant:** `Anchored toasts`

## Accessibility

Keep messages concise and announce them at a priority that matches their urgency. Give close controls clear names and keep actions keyboard accessible.

**Live demo variant:** `Promise`

## Content

Toast text must be short, direct, and actionable (e.g. “Record duplicated”, “Settings updated”).

Avoid generic titles like "Success" or "Notification". State the concrete outcome.

**Live demo variant:** `Custom`
