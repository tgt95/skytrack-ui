# Notifications

> Feedback ranging from contextual, non-blocking status to an interruption that requires a decision.

- Pattern ID: `notifications`
- Catalog group: Core
- Source status: **Universal**
- Primary source: [maintained reference](../../../../../docs/carbon-ds-reference/patterns/notification-pattern/index.md)
- Catalog entry: [catalog.ts](../../../../../src/showcase/pattern-library/catalog.ts)
- Page copy, source citations, and demo map: [page-content.ts](../../../../../src/showcase/pattern-library/page-content.ts)
- Local interaction implementation: [demos.tsx](../../../../../src/showcase/pattern-library/demos.tsx)

## Decision summary

**Use when:** A user needs feedback about an action, validation, page context, a background event, or a blocking condition.

**Do not use when:** A quiet state already explains the condition, the user needs brief help with a control, or the task needs a secondary data-entry flow. Route those needs to the appropriate state, Tooltip/Popover, or Dialog pattern.

**Core rule:** Choose event category, semantic status, and presentation as separate decisions. An event category does not determine its status or presentation. Error does not automatically mean modal; success does not automatically mean Toast.

### Reusable event categories

Use these broad categories as a starting point across products. Adapt their names and examples to the product's objects, jobs, collaboration model, and settings. They are not a universal taxonomy or a required three-category limit.

| Event category | Reusable examples |
| :--- | :--- |
| **Work and task activity** | An item is created, saved, edited, or reaches a new status; a task or background job starts, progresses, completes, or fails; readiness or approval changes. |
| **Collaboration and access** | An item is shared, assigned, mentioned, or commented on; access, ownership, or a role changes; shared work is updated. |
| **Workspace and system updates** | A member, resource, setting, or integration is added or changed; a service becomes unavailable; a quota, entitlement, or plan changes. |

Product teams define preference groups against their own event categories. Add or split categories when users need separate control or events require materially different handling. Avoid a catch-all category that hides useful meaning.

**User outcome:** The right timing and reach communicate urgency without interrupting more work than necessary.

### SkyTrack UI implementation route

- Use Alert for persistent context and Toast for brief, non-critical feedback when verified component behavior fits.
- Give actions a clear consequence and retain a visible path to dismiss or recover.
- Keep success, warning, error, and information meaning explicit in text.

**Candidate components:** `Alert`, `Toast`, `Button`. Verify each API against [component routing](../COMPONENT_ROUTING.md), installed source, types, and closest demo.

## Authority markers

- `STANDARD`: accessibility requirement or WAI-ARIA behavior. Do not weaken.
- `CARBON`: behavior adopted from the maintained Carbon reference.
- `SKYTRACK POLICY`: package-level design rule; revise only through an Owner decision.
- `EXPERIMENTAL`: source guidance is incomplete. Do not imply established behavior.
- `VERIFY`: confirm the installed component API, types, runtime source, and closest demo before implementation.

## Source limits

- Banner notifications and the Notification panel are experimental/work in progress in the maintained reference.
- A standalone Error states pattern is deferred future work.
- A local demo is evidence only for behavior it visibly implements. It does not establish production delivery, storage, persistence, preferences, grouping, deduplication, or push support.

## Decision model

Choose three independent axes:

1. **Event category:** What product activity happened? Which product preference group applies, if any?
2. **Semantic status:** Is the event informational, successful, cautionary, or an error?
3. **Presentation:** Where and how should the message appear, based on context, urgency, response, persistence, and history?

Then apply this routing sequence:

1. Prefer a quiet state or contextual copy when it already explains the condition.
2. Route field validation beside its field. Use Tooltip for brief control help, Popover for richer or interactive help, and Dialog for a secondary data-entry flow.
3. Identify the trigger and affected object. Include enough context for users to understand the message, especially when it comes from an asynchronous or system event.
4. Choose the lowest accurate semantic status.
5. Ask whether the user can continue safely without an immediate response.
6. Match presentation and scope to the user's current context: field, local panel, current page, product-wide surface, history view, or external channel.
7. State whether no response, an optional action, a required decision, or data entry is needed. Give errors a recovery path.
8. Define whether the message can be missed, dismissed, reread, grouped, or preference-controlled. Do not assume unsupported behavior.
9. Verify announcement, focus, dismissal, and component behavior for the chosen scenario.

If an unknown changes user impact or required behavior, keep it unresolved and obtain the needed product decision before dependent implementation.

## Semantic status

Select the lowest accurate status. Use text and icon/color together; never rely on color alone.

| Status | When to choose |
| :--- | :--- |
| **Informational** | Neutral update, helpful workspace state, or orientation. |
| **Success** | A requested operation completed cleanly. |
| **Warning** | A potential risk or prerequisite needs attention. |
| **Error** | An operation failed or a service is unavailable and the user needs remediation. |

## Presentation guide

| Presentation | Use when | Persistence and action | Maturity or constraint |
| :--- | :--- | :--- | :--- |
| **Inline Alert** | Feedback belongs beside an affected field, panel, or form action. | Persists until resolved or explicitly dismissed. Omit Close when resolution is mandatory. | Keep near affected content and do not cover working controls. Aim for two concise lines. |
| **Toast** | A brief, non-critical result follows an action or background completion. | Non-actionable only for timed dismissal. Auto-dismiss only when safe to miss and recoverable through a persistent surface. | No default timeout, stack limit, or queue policy. Never use a timed Toast for critical or required information. |
| **Actionable Alert/Toast** | The user may take one optional next step, such as Undo or View. | One concise action; never auto-dismiss. | Do not assume focus moves to the notice. Verify component behavior. Route overflow to a page, panel, or dialog. |
| **Callout** | Initial page context explains a nearby control or state. | Informational or Warning only. No dismiss or action button; a short explanatory text link is allowed. | Show on initial page load. Do not use for action results, background events, Success, or Error. |
| **Banner** | A product-wide announcement needs high visibility. | Persistence and dismissal must be defined per feature. | Experimental. Place below the global header, let it scroll with content, and show at most one active Banner. Do not promise cross-session persistence without policy and implementation evidence. |
| **Notification panel** | Users need to review accumulated asynchronous events later. | History, unread state, grouping, deduplication, and preferences require an explicit feature brief. | Experimental. Do not imply the demo provides storage or these behaviors. |
| **Push/OS delivery** | A user is outside the product and an external alert is justified. | Define consent, preferences, platform behavior, and deep links. | Requires separate product and implementation decisions. Do not request permission on page load. |

Dialogs are interaction patterns rather than notification presentations:

- **Alert Dialog:** Use for a consequential decision that must block safe progress. Explain the consequence and recovery path. Keep at most one blocking dialog open. Verify focus containment/restoration and Escape/outside-click behavior.
- **Dialog:** Use for a secondary data-entry flow. Do not use it merely to announce an event.

## Detailed guidance

### Inline Alert

Place persistent feedback beside the affected input group, panel, or directly above relevant form actions. Include the affected object and recovery instruction for errors. Omit Close when resolution is mandatory.

**Example:** `notifications-inline-context` teaches persistent status beside affected work. Keep the message concise and do not mix high- and low-contrast treatments within one presentation type on a screen.

### Toast

Use for brief, non-critical feedback after an action or background completion. A Toast may auto-dismiss only when the user does not need to act and can recover the information through a persistent surface. The current pattern demo does not prove a persistent notification history, so do not rely on it as the recovery path.

Do not establish a default five-second timeout, fixed width, newest-first queue, or stack limit unless product policy defines it. Never place required recovery work or critical information in a timed Toast.

**Example:** `notifications-toast-brief` shows brief completion feedback; it does not establish timeout or queue policy.

### Actionable notification

Embed at most one concise optional action, no longer than two words. Use a supported ghost treatment in an inline Alert or tertiary treatment in a Toast. Never auto-dismiss an actionable notice. If text or actions exceed the compact format, route to a page, panel, or dialog instead of inventing a “View more” behavior.

Do not move keyboard focus to a generic alert. Verify the chosen component and scenario; do not assume the notice steals focus or receives focus automatically.

**Example:** `notifications-actionable-or-modal` illustrates an optional next step. Its initial-render state does not establish focus behavior for dynamically created alerts.

### Callout

Show on initial page load to explain nearby context. Use Informational or Warning status only. Do not add a dismiss or action button; a short text link may explain context but must not stand in for remediation. Place the Callout above the related control and avoid redundant heading chrome.

**Example:** `notifications-callout-on-load` shows initial informational guidance near a field.

### Banner — Experimental

Use only for a high-visibility product-wide announcement, such as a service notice. Place it under the global header, let it scroll with page content, and show at most one active Banner. The source does not establish persistence, dismissal, priority, or API behavior. Define those before implementation; do not imply cross-session persistence.

### Notification panel — Experimental

Use for accumulated asynchronous updates that users need to review later. Chronological history, unread state, grouping, deduplication, retention, and preference behavior are candidate features, not defaults. Define them in a feature brief before implementation.

**Example:** `notifications-panel-review` is a local illustration. Its sample unread items do not model persistent storage, user preferences, grouping, or deduplication.

### Dialog and critical acknowledgement

Reserve Alert Dialog for a consequential choice that blocks safe progress. Use Dialog for secondary data entry. A blocking acknowledgement is appropriate only when immediate response is required. Do not show a modal to announce success or merely to surface a routine error. Verify focus and dismissal behavior for the selected implementation.

## Content, contrast, and interaction

- Omit trailing periods from notification titles. Write one or two clear body sentences without repeating the headline.
- Make system-triggered messages stand alone with affected-object and workspace context.
- Give every error an actionable recovery step. Do not depend on bold or italic styling; screen readers announce bodies as flat text.
- Separate optional suggestions from required responses. State what blocks workflow completion and what action resolves it.
- Pair high-contrast treatments with urgent messages and muted treatments with routine information. Keep contrast treatment consistent within the same presentation type on a screen.

## Accessibility

- `STANDARD`: Announce status changes programmatically when they do not receive focus. Do not move focus to a generic alert.
- `STANDARD`: Do not auto-dismiss critical or actionable information. Allow users to pause, filter, or limit routine background interruptions where the product supports those controls.
- `STANDARD`: A modal dialog contains focus while open and restores focus appropriately when closed.
- `STANDARD`: Tooltip is available on hover or keyboard focus, is not focusable itself, and closes with Escape. Use another pattern for interactive content.
- `VERIFY`: Confirm keyboard access to embedded actions and dismiss controls, and verify Escape/Enter/Space behavior against the selected component.
- Follow WCAG 2.2.3 **No Timing**, 2.2.4 **Interruptions**, and 4.1.3 **Status Messages**. Do not mislabel these criteria.

## Related patterns and evidence

**Related:** Forms, Tooltip/Popover, Dialogs, Alert & Toast, Status indicators. A standalone Error states pattern is planned future work.

Before implementation, verify the installed component version, exports, types, runtime source, and closest demo. A catalog entry or local demo is not proof of component API support or production service behavior.

## Interactive and visual examples

| Example ID | Teaches | Evidence boundary |
| :--- | :--- | :--- |
| `notifications-inline-context` | Persistent status near affected work. | Visual reference; does not establish a product-wide severity policy. |
| `notifications-toast-brief` | Brief completion feedback. | Interactive; does not establish a timeout, queue, or persistent history. |
| `notifications-callout-on-load` | Initial informational guidance by a related field. | Visual reference; does not define callout behavior for action results. |
| `notifications-panel-review` | Later review of accumulated updates. | Interactive preview; storage, preferences, grouping, and deduplication are not modeled. |
| `notifications-actionable-or-modal` | Optional action and a route to critical decisions. | Interactive; focus behavior is not established by its initial-render sample. |

## Maintenance rule

Treat the catalog as the source for source status, summary, component shortlist, and design decisions. Treat page content as the source for rendered section guidance and demo teaching. Treat the rendered demo as evidence only for behavior it visibly implements. Update this guide and [pattern routing](../PATTERN_ROUTING.md) when routing changes. Never treat local examples as production services or operational policy.
