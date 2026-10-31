# Alert

> An in-page message that explains an important status, issue, or next action.

- Package version: `0.1.5`
- Public export: `skytrack-ui/alert`
- Implementation: [`src/components/ui/alert.tsx`](../../src/components/ui/alert.tsx)
- Public type declaration: [`dist-lib/components/ui/alert.d.ts`](../../dist-lib/components/ui/alert.d.ts)
- Showcase demo id: `alert`
- Closest demo: [`src/demos/alert.demo.tsx`](../../src/demos/alert.demo.tsx)
- Official guidance: [W3C WAI ARIA Alert Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/alert/)

## Usage

Use Alert for persistent, in-context messages that users need to see while interacting with a page or form—such as resource level health warnings, location boundary boundary alerts, or activity data fallback modes.

- **Fit:** Persistent inline notices that explain an issue, important status, or required response.
- **Avoid:** Brief status updates (use Toast), confirmations that block progress (use Alert Dialog), or field-specific validation errors (use Field).
- **Best alternative:** For brief status updates, use Toast. For blocking confirmations, use Alert Dialog.

**Live demo variant:** `Semantic variants`

## Types

Alert supports five semantic variants:

- **Default / Informative:** Neutral slate or blue for general notices and status updates.
- **Success:** Emerald green for completed operations or system readiness checks.
- **Warning:** Amber for non-critical issues that need attention (e.g. a deadline is approaching).
- **Error:** A clear error treatment for failures that need attention.

**Live demo variant:** `Semantic variants`

## Behavior

Alerts are static inline callouts that remain visible until conditions resolve or the user takes corrective action.

- **Actionable alerts:** Can embed inline buttons to trigger immediate diagnostic routines or dismiss resolved notices.

| Do                                                                      | Don't                                                             | Why                                                               |
| ----------------------------------------------------------------------- | ----------------------------------------------------------------- | ----------------------------------------------------------------- |
| Include a direct recovery action when people need to resolve the issue. | Show a warning with no next step when the person can take action. | Actionable guidance helps people recover and continue their task. |

**Live demo variant:** `With action`

## Layout

Position alerts directly above the relevant section, form, or card content that they describe.

- **Spacing:** Use 16px internal padding and 16–24px between the alert and surrounding content. Align the status icon with the title.
- **Mobile viewports:** Expands to full width; actions wrap below description to preserve 44px tap targets.

**Live demo variant:** `Action below description`

## Accessibility

Make urgent alerts noticeable without interrupting users for routine updates. Keep text and actions readable in light and dark themes.

**Live demo variant:** `Semantic variants`

## Content

Titles should be brief, declarative statements in sentence case (e.g., “Connection interrupted”).

- **Description:** Use one or two sentences to explain the cause and recommended action.
- **Action buttons:** Use concise action verbs (e.g. "Recalibrate", "Retry Link").

**Live demo variant:** `Action below description`
