# Progress

> A visual indication that a task is underway and how much has completed.

- Package version: `0.1.5`
- Public export: `skytrack-ui/progress`
- Implementation: [`src/components/ui/progress.tsx`](../../../../../src/components/ui/progress.tsx)
- Public type declaration: [`dist-lib/components/ui/progress.d.ts`](../../../../../dist-lib/components/ui/progress.d.ts)
- Showcase demo id: `progress`
- Closest demo: [`src/demos/progress.demo.tsx`](../../../../../src/demos/progress.demo.tsx)
- Official guidance: [Carbon Design System Progress Bar Usage](https://carbondesignsystem.com/components/progress-bar/usage/)

## Usage

Use Progress to communicate the duration and completion state of an active, ongoing system operation (e.g. uploading documents, generating a report, or exporting records).

Avoid Progress for static capacity or measurement readouts like remaining resource level percentage or disk usage (use Meter instead), or for operations that finish before progress feedback would be useful.

The best alternative for static scalar measurements like resource level capacity or disk space is Meter. For discrete multi-step guided workflows, use a step indicator.

**Live demo variant:** `Live value`

## Types

Show a measured amount only when the total is known; otherwise indicate progress without implying an estimate.

## Behavior

In determinate mode, the progress indicator animates smoothly as progress values increase. When reaching 100%, the track fills completely and can transition to a completed state.

If an error occurs, communicate it using a separate alert or error message; the progress indicator itself maintains a primary fill and does not include built-in error color logic.

**Live demo variant:** `Live value`

## Layout

Place Progress directly in the visual context where the operation is occurring (e.g. inside an upload modal, beside a table row being processed, or in a persistent header status widget).

Use a slim track that does not compete with surrounding content. Place a clear status label beside it and show a percentage or remaining time only when that estimate is reliable.

| Do                                                                                                                      | Don't                                                                                                      | Why                                                                                         |
| ----------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| Switch to indeterminate animation mode whenever file size or remaining processing time cannot be accurately calculated. | Show a determinate progress bar that freezes at 99% for prolonged periods while background tasks continue. | Freezing bars destroy user trust and prompt users to refresh or kill processes prematurely. |

**Live demo variant:** `Live value`

## Accessibility

Show progress and completion in text as well as visually. Announce completion without interrupting unrelated screen-reader speech.

**Live demo variant:** `Complete and indeterminate`

## Content

Accompanying text should use active present-tense verbs (e.g., “Generating report...”, “Importing records...”).

Include estimated remaining time (e.g., "About 45 seconds remaining") when reliable calculations exist.

**Live demo variant:** `Live value`
