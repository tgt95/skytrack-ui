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

Avoid Toast for critical system errors, mandatory security alerts, or warnings that require immediate user action before continuing (use persistent Alert or modal Alert Dialog). Do not use Toast as the sole record of information that must be referenced later; store durable details in an activity log, history panel, or notification center.

The best alternative for urgent errors requiring immediate attention is Alert. For critical confirmations requiring an explicit decision before proceeding, choose Alert Dialog.

**Live demo variant:** `Default`

## Types

Match the toast pattern and lifetime to its operational role:

- **Confirmation:** Brief status feedback for completed user actions (e.g., “File uploaded”, “Link copied”). It dismisses automatically after a short timeout so people can continue working uninterrupted.
- **Progress:** Status feedback for ongoing asynchronous operations (e.g., “Exporting report…”). It remains visible until the process finishes or fails, then updates to a confirmation or error message.
- **Communication and actionable:** Informational updates that provide useful context or immediate undo recovery (e.g., “Item moved to trash” with an “Undo” button). Use a longer reading window or manual dismissal so people have time to take action.

## Behavior

Tailor message duration to content complexity and task type rather than applying a single uniform timeout across all toasts. Give people enough time to read the text and trigger any interactive action.

- **Dismissal and timeouts:** Dismiss simple confirmations automatically after a few seconds. Keep progress toasts visible until complete, and provide an explicit close control for any toast requiring action or longer reading time.
- **Persistent retrieval:** Because toasts disappear, any information users may need to review later—such as detailed error logs, asynchronous job results, or audit summaries—must be permanently retrievable in a notification center, activity feed, or system log.
- **Pause and resume:** Pause automatic dismissal on hover or focus so people do not lose the message while reading or attempting to click an action.

**Live demo variant:** `Default`

## Layout

Place brief notifications where they are noticeable without covering important content. On narrow screens, let them fit the available width and leave space between stacked messages.

- **Stacking and competing notifications:** Avoid triggering multiple competing toasts simultaneously or overloading the screen. When multiple events occur close together, batch or deduplicate repetitive alerts. Keep messages readable and prevent competing stacks instead of enforcing a universal count.

| Do                                                                                                               | Don't                                                                                                       | Why                                                                                                               |
| ---------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| Include an immediate inline "Undo" action for reversible operations like deleting a record or archiving an item. | Pack lengthy multi-paragraph instructions, complex forms, or critical error logs into a disappearing toast. | Users cannot read long messages before the toast automatically dismisses, leading to missed critical information. |
| Provide a persistent log or notification center for messages users may need to revisit after dismissal.          | Fire multiple competing toasts simultaneously that cover the workspace and overwhelm the user.              | Competing stacks cause visual clutter and increase the risk that users miss important feedback.                   |

**Live demo variant:** `Anchored toasts`

## Accessibility

Keep messages concise and announce them at a priority that matches their urgency. Give close controls clear names and keep actions keyboard accessible.

**Live demo variant:** `Promise`

## Content

Toast text must be short, direct, and actionable (e.g. “Record duplicated”, “Settings updated”).

Avoid generic titles like "Success" or "Notification". State the concrete outcome.

**Live demo variant:** `Custom`
