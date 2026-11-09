# Dialogs

> A focused conversation that asks for input or gives urgent information during a workflow.

- Pattern ID: `dialogs`
- Catalog group: Core
- Source status: **Universal**
- Primary source: [maintained reference](../../../../../docs/carbon-ds-reference/patterns/dialog-pattern/index.md)
- Catalog entry: [catalog.ts](../../../../../src/showcase/pattern-library/catalog.ts)
- Page copy, source citations, and demo map: [page-content.ts](../../../../../src/showcase/pattern-library/page-content.ts)
- Local interaction implementation: [demos.tsx](../../../../../src/showcase/pattern-library/demos.tsx)

## Decision summary

**Use when:** Use a modal when the user must respond before continuing, or a non-modal panel when the page should remain available.

**User outcome:** People keep their page context unless a response is necessary before they can continue.

### Design decisions

- Block the underlying page only when the user must respond before continuing; otherwise preserve access to it.
- Use dialogs sparingly and keep each task short and focused.
- Open them from a user action; do not nest dialogs or make a dialog a substitute for a full page.
- Keep focus, keyboard dismissal, validation, and completion behavior clear; place Cancel on the far left and the sole primary action on the far right.

### SkyTrack UI implementation route

- Use Dialog for a task that needs context and AlertDialog when a response is required to continue.
- Use the library trigger, portal, backdrop, popup, title, description, and footer composition.
- Keep the sample flow local and put cancel beside its completion action.

**Candidate components:** `Dialog`, `AlertDialog`, `Button`. Verify each API against [component routing](../COMPONENT_ROUTING.md) and installed source.

## Guidance reference

### Overview

Use dialogs to surface urgent notices, focused decisions, or lightweight supporting tasks without navigating away from the current screen.

#### Anatomy of a dialog

1. Header: concise title matching the task or button label, optional context line above the title, and an upper-right close icon.
2. Body content: form fields, message copy, or supporting controls—short-title confirmation dialogs may omit body text when the title itself carries the message.
3. Action bar: footer action buttons with specific verb labels (such as Add, Save, or Delete); avoid vague "Done" or "OK" labels.
4. Close icon: explicit upper-right dismiss trigger that exits without submitting.
5. Backdrop overlay (modal dialogs only): dims and blocks interaction with the page behind.

#### When to use a dialog

Choose a dialog when an immediate decision, error acknowledgment, or short task belongs inline with the active screen—or when a floating helper needs to stay open alongside page work.

#### When not to use a dialog

Avoid dialogs for lengthy multi-step work, cross-record browsing, or passive background notices generated without user intent—route those to notifications, panels, or dedicated pages.

#### Dialog types

#### Modal dialog

**Use when:** The operator must respond, review urgent consequences, or resolve a blocking decision before touching the underlying view.

**Avoid when:** The operator needs to read, copy, or manipulate the page behind the dialog.

#### Non-modal dialog

**Use when:** The operator benefits from a floating helper or inspector while keeping page controls interactive.

**Avoid when:** The workflow requires a mandatory decision before allowing further page changes.

#### Best practices

##### Use dialogs sparingly

Frequent modal interruptions break concentration and slow operators down; reserve blocking surfaces for truly high-value interruptions.

##### Dialogs should be user initiated

Open a dialog directly from a user trigger—or an indirect consequence of an action just attempted (such as closing a dirty tab)—rather than from unsolicited background events.

##### Keep dialog tasks simple and focused

Limit a dialog to one self-contained goal that completes cleanly in place without sprawling layouts.

### Modal dialogs

Modal dialogs lock background content behind a dimmed overlay so the operator completes or dismisses the task before continuing.

**Examples:** `dialogs-modal-confirm`.

#### When to use

##### An immediate response is required

Use when downstream workflow state depends on an immediate choice or short input before proceeding.

##### Notify the user of urgent information

Use for critical warnings or blocking failures that operators must acknowledge immediately.

##### Confirm a user decision

Use before committing irreversible or high-risk actions so the operator verifies scope and consequences (escalating to danger styling when destructive).

#### When not to use

##### Modals prevent access to the main page

If the operator needs to compare map coordinates, inspect underlying records, or run repeated actions against the workspace, choose a non-modal surface or side panel instead.

##### Do not nest modals

Never stack one modal over another. Layering overlays disorients keyboard users and hides origin context.

##### Do not make modals full page

A modal that fills the viewport signals the wrong container choice—navigate to a dedicated page or stepped flow instead.

#### Modal variants

| Variant        | Purpose                                                                                               | Footer actions                                              |
| -------------- | ----------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| Passive        | Deliver non-blocking confirmation or status without requiring an action choice                        | None                                                        |
| Transactional  | Collect short input or confirm/cancel an action (includes Danger variant for destructive commitments) | Cancel + Primary action (or Danger primary)                 |
| Acknowledgment | Require explicit reading acknowledgment of an urgent system condition                                 | Single specific acknowledgment button (avoid vague OK/Done) |
| Progress       | Guide a bounded multi-step dialog flow                                                                | Cancel + Previous + Next / final completion verb            |

#### Dismissing variant modals

Passive modals close via the close icon, Escape key, or clicking the backdrop overlay. Transactional, Danger, Acknowledgment, and Progress modals close only on task completion, explicit Cancel, the close icon, or Escape—never on an accidental backdrop click.

### Non-modal dialogs

Non-modal dialogs render floating surfaces without locking the page, allowing operators to inspect workspace items, switch focus freely, and move the panel if it obscures underlying details.

**Examples:** `dialogs-non-modal-inspect`.

#### When to use

##### When access to the page is needed

Choose non-modal when users must inspect or edit the active canvas—and optionally reposition the floating panel so nothing stays hidden.

##### Aid or accelerate a workflow

Support repeatable utilities such as find-and-replace or quick property adjustments across multiple selections without reopening a dialog on every step.

##### Display additional information

Surface supplemental contextual records or hints while keeping primary work uninterrupted.

#### When not to use

##### Do not use if a response is required

If continuing safely requires an immediate user answer or confirmation, block the page with a modal instead.

#### Non-modal variants

#### Passive non-modal

**Use when:** Supplemental information or preview without embedded footer actions.

#### Transactional non-modal

**Use when:** One or more repeatable action triggers (such as Find Next / Replace) that stay open across invocations until manually closed.

#### Dismissing non-modal dialogs

Non-modal dialogs close intentionally via the header close icon, Cancel, or Escape. Clicking onto the surrounding workspace keeps the dialog open so users can reference both.

### Designing with dialogs

Consistent button grouping, focus management, sizing, and component restraint keep dialogs fast to scan and reliable under keyboard navigation.

#### Button groups

Anchor the footer cleanly along the bottom edge, keeping Cancel farthest left and at most one primary action farthest right. Wait—note that full-bleed 25%/50% spans reflect container-edge styling conventions alongside padded dialog footers.

**Examples:** `dialogs-button-groups`.

##### One button

Used for single-action acknowledgments, spanning 50% width aligned to the right edge with specific labeling rather than vague "Done" or "OK".

##### Two buttons

Splits the footer 50/50 between secondary Cancel on the left and the primary commitment action on the right.

##### Three buttons

Uses 25%-width action slots right-aligned after left-anchored Cancel, applying primary emphasis strictly to the rightmost action—or styling all three secondary when equal weight is intended.

##### Progress indicator buttons

Places ghost-style Cancel (25%) at the far left opposite secondary Previous (25%) and primary Next (25%) on the right, renaming Next on the final step to the concrete completion verb.

#### Behaviors

##### Trigger

Launch modals from clear interactive triggers such as toolbar actions, menu items, links, or status errors without auto-spawning unexpectedly.

##### Focus

On open, trap keyboard focus inside the dialog and move focus directly to the first interactive body control (or to the primary footer action when the body contains no inputs). Return focus to the invoking trigger on close.

##### Scrolling

Constrain dialogs to four responsive height tiers (xs 48%, sm 72%, md 84%, lg 96% viewport max-height; full-height scrolling on mobile viewports). Keep the header and footer fixed while only the body scrolls vertically with edge fades; never introduce horizontal scrolling.

##### Validation

Keep invalid dialogs open until fixed. Validate client rules when focus leaves each field (on blur) and clear errors immediately once corrected; display server-side failures in an inline alert, and favor constrained controls (radios, selects) to prevent typos.

##### Task completion and loading

For short processing waits inside a modal, display body-level loading feedback and lock the primary button against duplicate submission (or show inline button loading). If an operation takes more than a few seconds, close or hand off the dialog and surface measurable progress cleanly elsewhere on screen.

**Examples:** `dialogs-long-task-progress`.

#### Using components

Select simple inputs, selection lists, switches, and structured summaries inside dialog bodies, avoiding patterns that pull attention away or create heavy nesting:

##### Avoid components that direct the user away from the dialog

Keep external navigation links out of dialog copy so operators are not pulled mid-task away from an unfinished modal decision.

##### Avoid components that hide information

Do not place tabs or accordions inside a dialog; if content needs multiple panes, move the workflow to a side panel, tearsheet, or dedicated page.

##### Avoid complex interactions with data tables

Keep any embedded table selection-only rather than exposing inline row editing, filters, or overflow action menus—or swap to structured lists or tiles.

### Accessibility

#### Focus management

Move focus directly onto the first focusable body input when opening a modal (never landing first on footer buttons when inputs exist), confine Tab and Shift+Tab within the dialog, and restore focus to the opener button upon close.

#### Keyboard navigation

Support Escape to dismiss non-critical dialogs cleanly, Tab/Shift+Tab to cycle controls, Space/Enter to toggle selections, and Enter on text inputs or focused actions only where safe.

#### Tab order

1. First interactive control inside the dialog body
2. Remaining body controls left-to-right, top-to-bottom
3. Primary footer action
4. Secondary footer action (Cancel)
5. Header close (×) icon button last

#### ARIA semantics

Expose modal dialog role and title labeling, mark background content inert when modal, and describe urgency accurately when confirmation guards destructive state.

### Related components and patterns

**Related:** Dialog, Button, Common actions, Forms, Notifications.

## Interactive and visual examples

### Modal · confirm a route change

- Example ID: `dialogs-modal-confirm`
- Type: **Interactive**
- Source mapping: partial-divergent — `modal-dialogs`
- Scenario: Ask for the replacement route name before the pilot confirms a consequential change, then show the confirmation after the modal closes.
- What it teaches: A modal asks the user to decide before returning to the blocked page. It fits a consequential route change only when confirmation is required to continue.
- Decision shown: Use a modal for a required response or urgent information; keep the task short and user-initiated. Use a non-modal surface when the page must remain accessible.
- Consider: Validate the required route name on blur and again on confirmation; clear the inline error as soon as the name is valid and keep focus inside the modal.
- Boundary or simplification: The route-name field validates on blur and on confirmation; entering a valid name clears the inline error before the local confirmation closes the modal.

### Non-modal · inspect a route while keeping the page available

- Example ID: `dialogs-non-modal-inspect`
- Type: **Interactive**
- Source mapping: mapped — `non-modal-dialogs`
- Scenario: Keep waypoint details readable beside the map or table without blocking interaction on the main page.
- What it teaches: A non-modal dialog presents supporting information while users can still work with the page.
- Decision shown: Choose it when the user benefits from extra detail—or repeatable workflow helpers—without blocking access to underlying controls.
- Consider: Keep the floating surface dismissible via close icon, Cancel, or Escape rather than outside clicks, and avoid obscuring underlying reference details.

### Button groups · one, two, or three decisions

- Example ID: `dialogs-button-groups`
- Type: **Interactive**
- Source mapping: partial-divergent — `designing-button-groups`
- Scenario: Compare single-action acknowledgment, two-button confirmation, and multi-decision dialog footers.
- What it teaches: Dialog actions should make the available choice and its consequence clear. More choices add comparison work.
- Decision shown: Use one action for explicit acknowledgment, two for Cancel + Primary confirmation, three only when a third distinct choice is essential, and Progress groups for bounded multi-step dialogs.
- Consider: Put Cancel at the far left and at most one Primary action farthest right; replace vague labels like "Done" or "OK" with outcome verbs like "Acknowledge".
- Boundary or simplification: Acknowledgment uses an outcome verb and the required-response dialog now presents three distinct choices. Footer spacing remains package-specific.

### Show progress after confirming a longer task

- Example ID: `dialogs-long-task-progress`
- Type: **Interactive**
- Source mapping: partial-divergent — `behaviors-task-completion-loading`
- Scenario: After a dispatcher confirms a longer route check, close the dialog and show persistent on-page progress until validation completes.
- What it teaches: A progress indicator communicates that a confirmed dialog task is still underway without trapping the operator inside a frozen modal.
- Decision shown: Use inside-dialog loading for short waits, and hand off to persistent page-level progress whenever work takes longer than a few seconds.
- Consider: Do not leave users unsure whether the dialog can close or whether the action finished; provide clear completion and failure recovery.
- Boundary or simplification: A confirmation dialog now starts the route check and closes before page-level progress appears; failure recovery remains outside this sample.

## Maintenance rule

Treat the catalog as the source for status, summary, component shortlist, and design decisions. Treat page content as the source for section guidance and demo teaching. Treat the rendered demo as evidence only for the behavior it visibly implements. Update this guide and [pattern routing](../PATTERN_ROUTING.md) when the pattern changes. Never treat local examples as production services or operational policy.
