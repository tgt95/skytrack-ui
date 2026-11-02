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

Use Alert for persistent, in-context messages that people need to see while interacting with a page or form—such as system warnings, unsaved changes across records, or data synchronization notices.

- **Fit:** Persistent inline notices that explain an issue, important status, or required response.
- **Avoid:** Brief status updates (use Toast), confirmations that block progress (use Alert Dialog), or field-specific validation errors (use Field).
- **Best alternative:** For brief status updates, use Toast. For blocking confirmations, use Alert Dialog.

**Live demo variant:** `Semantic variants`

## Types

Choose an alert treatment by message severity; add an action only when it helps resolve the message.

## Behavior

Alerts are static inline callouts that remain visible until conditions resolve or the user takes corrective action.

- **Actionable alerts:** Can include inline buttons to resolve an issue immediately or dismiss a resolved notice.

| Do                                                                      | Don't                                                             | Why                                                               |
| ----------------------------------------------------------------------- | ----------------------------------------------------------------- | ----------------------------------------------------------------- |
| Include a direct recovery action when people need to resolve the issue. | Show a warning with no next step when the person can take action. | Actionable guidance helps people recover and continue their task. |

**Live demo variant:** `With action`

## Layout

Position alerts directly above the relevant section, form, or card content that they describe.

- **Spacing:** Use 16px internal padding and 16–24px between the alert and surrounding content. Align the status icon with the title.
- **Mobile viewports:** Expands to full width; actions wrap below description to preserve touch targets of at least 44px.

**Live demo variant:** `Action below description`

## Accessibility

Make urgent alerts noticeable without interrupting users for routine updates. Keep text and actions readable in light and dark themes.

**Live demo variant:** `Semantic variants`

## Content

Titles should be brief, declarative statements in sentence case (e.g., “Connection interrupted”).

- **Description:** Use one or two sentences to explain the cause and recommended action.
- **Action buttons:** Use concise action verbs in sentence case (e.g., “Retry sync” or “Review settings”).

**Live demo variant:** `Action below description`
