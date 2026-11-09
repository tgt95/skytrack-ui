# Common actions

> Consistent placement, labels, confirmation, and feedback for add, cancel, clear, close, copy, delete, edit, errors, next, refresh, remove, and reset.

- Pattern ID: `common-actions`
- Catalog group: Core
- Source status: **Universal**
- Primary source: [maintained reference](../../../../../docs/carbon-ds-reference/patterns/common-actions/index.md)
- Catalog entry: [catalog.ts](../../../../../src/showcase/pattern-library/catalog.ts)
- Page copy, source citations, and demo map: [page-content.ts](../../../../../src/showcase/pattern-library/page-content.ts)
- Local interaction implementation: [demos.tsx](../../../../../src/showcase/pattern-library/demos.tsx)

## Decision summary

**Use when:** Use these shared action patterns whenever people act on a control, a resource, or a workflow.

**User outcome:** People can predict what each action changes, while the most important next step is easy to find.

### Design decisions

- When Add is the main task, make it the single primary action; otherwise use less emphasis and keep other actions secondary.
- Use an action label and placement consistently so the same word leads to the same result.
- Use a secondary button or link for Cancel; place Clear’s close icon at the field’s right edge; dismiss surfaces with an upper-right close icon rather than a Close button; confirm Copy with a brief tooltip and keep Remove low emphasis.
- Keep cancel, close, clear, reset, remove, and delete distinct; Delete destroys an object and is usually permanent, while Remove detaches it.
- Match confirmation and post-action feedback to the impact, reversibility, and failure cost of the action.

### SkyTrack UI implementation route

- Use Button for primary and secondary actions, Menu for grouped overflow, and AlertDialog for high-impact deletion.
- Keep demo actions local and make the affected sample item visible.
- Use descriptive labels instead of relying on an icon alone.

**Candidate components:** `Button`, `Menu`, `AlertDialog`. Verify each API against [component routing](../COMPONENT_ROUTING.md) and installed source.

## Guidance reference

### Add

Add attaches an existing record, user, or resource into a collection, list, or workspace without creating a brand-new item from scratch.

**Examples:** `common-actions-add`.

#### Hierarchy and placement

Size visual prominence—high, medium, or low emphasis—to match how central adding is on the screen. Reserve the single primary action style for pages where adding is the main task, and keep secondary or subtle treatments when adding supports other work.

#### Considerations

Clarify operational consequences before letting an operator attach an item:

- Consequences: clarify any billing, access-control, or compliance side effects triggered by adding the item.
- Permissions: confirm the operator holds rights to attach to the destination before offering the trigger.
- Reversibility: state whether the relationship change is permanent or easily reversed.
- Duration: set realistic expectations when attachment spans seconds, minutes, hours, or days.
- Failure recovery: explain what happened and how to retry or roll back if attachment fails.
- Scope: make single-item versus bulk attachment unmistakable.

### Cancel

Cancel halts an active workflow and dismisses its modal, drawer, or editing mode. Render Cancel as a secondary button or inline link, and warn users explicitly if stopping mid-task risks discarding unsaved entries or corrupting work.

**Examples:** `common-actions-cancel`.

### Clear

Clear empties entered characters, removes active multi-select choices, or clears content such as a live log while keeping the control ready for new input. For controls that carry an inherent baseline choice—such as radio button groups—Clear restores that default selection instead of leaving the group blank. Place a trailing close icon on the right edge of the field, chip, or value.

**Examples:** `common-actions-clear`.

### Close

Close dismisses a window, panel, popover, menu, or toast notice without cancelling an underlying workflow. Render Close as an icon control anchored in the upper-right corner—never label a standard footer button Close.

**Examples:** `common-actions-close`.

### Copy

Copy produces a separate duplicate of an identifier, snippet, or record while leaving the original untouched. Pair a copy icon trigger with brief confirmation feedback—such as a "Copied" tooltip immediately after click or tap.

**Examples:** `common-actions-copy`.

### Delete

Delete destroys the object rather than unlinking it and is usually permanent or difficult to reverse. When an item is easy to recreate or an immediate Undo is available, a lightweight action can be appropriate; confirm deletion when the potential loss is consequential.

**Examples:** `common-actions-delete`.

#### Low-impact deletion

When recreating or undoing the item is trivial, delete immediately on click or tap without interrupting the operator with a confirmation dialog.

#### Moderate-impact deletion

When an object cannot be restored easily or when multiple items are selected at once, ask for explicit dialog confirmation explaining what will happen if deletion proceeds.

#### High-impact deletion

When deletion destroys critical data, cascades to dependent records, or requires costly rebuilds, require both a danger dialog explaining consequences and manual typing of the exact resource name before enabling deletion.

#### Post-deletion feedback and recovery

After confirming deletion, return the user to the parent list view, animate the deleted row out smoothly, and surface a confirmation notification. If deletion fails, notify the user immediately, restore the item visually into the list where possible, and send a secondary alert through another channel (such as email) when supported.

### Edit

Edit updates values on an existing record or enters an editable state for a targeted field. Expose Edit through an overflow menu item, an explicit button, or an edit icon close to the record.

**Examples:** `common-actions-edit`.

### Errors

Errors appear across full-page fallbacks, modals, inline alerts, and compact field placements whenever an action cannot finish. State clearly what failed and give users a productive next step—such as returning to a working state, consulting support, or trying a concrete fix. Use inline error alerts inside tight input areas where space is constrained.

**Examples:** `common-actions-errors`.

#### Content guidelines

Keep copy concise, transparent, and supportive: explain what occurred and what action resolves it. Limit full-page and large-modal errors to at most three lines of paragraph text, and keep form field errors to two lines or fewer.

### Next

Next steps an operator forward in a numbered sequence or wizard without completing the final submission. Represent Next as a button paired with a forward arrow icon or as a standalone forward icon control.

**Examples:** `common-actions-next`.

### Refresh

Refresh requests updated records for the current object, table, or list when displayed state falls behind server data. Present Refresh using a refresh icon trigger or button while preserving active view filters.

**Examples:** `common-actions-refresh`.

### Remove

Remove detaches or moves one or more items out of a list, group, or container while preserving the source object elsewhere. Keep the distinction from destructive deletion unmistakable.

**Examples:** `common-actions-remove`.

#### Hierarchy and placement

Represent Remove with a secondary/subtle button or a subtract glyph. Removal is seldom the main workflow on a page and should avoid primary visual emphasis.

#### Considerations

- Operational impact: clarify billing, permission, or compliance effects before unlinking.
- Clarity against deletion: reassure users that the underlying record survives unless detachment revokes all access.
- Permissions: check whether the operator is allowed to modify the list membership.
- Permanence: inform the user explicitly if removing the relationship cannot be undone.
- Timeframe and failure recovery: state expected processing duration and fallback behavior on error.
- Scope: indicate whether one entry or a bulk selection will be detached.

### Reset

Reset discards unapplied edits in filters or settings and restores values to the last saved checkpoint—specifically the configuration active when the operator last clicked Apply. Style Reset cleanly as an inline link or subtle action.

**Examples:** `common-actions-reset`.

## Interactive and visual examples

### Add

- Example ID: `common-actions-add`
- Type: **Interactive**
- Source mapping: mapped — `add`
- Scenario: Attach an existing mission plan into the team review collection without creating a new record.
- What it teaches: Add attaches an existing plan to a collection; it does not create a new plan. The user needs to include work already available elsewhere.
- Decision shown: Use Add when the object already exists and the destination relationship changes. If adding is the page’s main task, use the single primary button and keep other actions secondary; if it is secondary, lower its visual emphasis.
- Consider: Confirm permissions, operational consequences (access/billing), permanence, timeframe, failure recovery, and single-item versus bulk scope.

### Cancel

- Example ID: `common-actions-cancel`
- Type: **Interactive**
- Source mapping: mapped — `cancel`
- Scenario: Close a route-edit dialog and discard the unsaved name while keeping the saved route unchanged.
- What it teaches: Cancel stops the current operation and leaves the user in the surrounding workflow.
- Decision shown: Use it for an unfinished task the user can abandon; present it as a secondary button or link. Use Close to dismiss a surface and Clear to remove entered content.
- Consider: State whether unsaved input is discarded or preserved, especially when work may take time to recreate; warn about data loss or corruption if abandoning the task creates that risk.

### Clear

- Example ID: `common-actions-clear`
- Type: **Interactive**
- Source mapping: mapped — `clear`
- Scenario: Clear entered search text or multi-select choices without resetting saved defaults or unrelated fields.
- What it teaches: Clear removes current field or selection contents while keeping the field and workflow available.
- Decision shown: Use a close icon at the right edge of a field, item, or value to clear it; use Reset to restore the last applied or saved values.
- Consider: For controls with a defined baseline selection (such as radio groups), Clear restores that default value rather than leaving nothing selected.

### Close

- Example ID: `common-actions-close`
- Type: **Interactive**
- Source mapping: mapped — `close`
- Scenario: Dismiss a surface notice with an upper-right close icon while preserving underlying work.
- What it teaches: Close dismisses a surface or ends a non-blocking presentation; it does not itself cancel the underlying task.
- Decision shown: Use a close icon, usually at the upper-right of the surface, to dismiss a toast, panel, or other presentation. Do not label a button Close; use Cancel to stop an operation.
- Consider: Keep the underlying work state clear after dismissal, and provide a way to find important updates again when needed.

### Copy

- Example ID: `common-actions-copy`
- Type: **Interactive**
- Source mapping: mapped — `copy`
- Scenario: Copy a mission plan identifier for reuse while confirming the clipboard action.
- What it teaches: Copy makes an identical object or value available for reuse; it leaves the original intact.
- Decision shown: Use it when duplication is the intended result, distinct from editing the original or adding an existing object.
- Consider: Pair a copy icon trigger with brief confirmation feedback such as a “Copied” tooltip; avoid implying it stays linked to later changes in the original.

### Delete

- Example ID: `common-actions-delete`
- Type: **Interactive**
- Source mapping: mapped — `delete`
- Scenario: Compare immediate low-impact deletion, moderate-impact confirmation, and high-impact deletion warnings.
- What it teaches: Delete destroys the selected object and is usually permanent or difficult to undo; Remove detaches it while leaving the object available.
- Decision shown: Use it only when the user intends to destroy the object; scale confirmation to impact and reversibility.
- Consider: For high-impact deletion, ask the user to type the resource name and explain what they will lose. After success, animate the item out of the list and confirm completion; if deletion fails, notify the user, restore the item when possible, and send a second alert through another channel when available.
- Boundary or simplification: High-impact confirmation now requires typing the plan name and states what is lost; low-impact and moderate-impact cases remain separate examples. Decorative trash icon/menu treatment is not modeled.

### Edit

- Example ID: `common-actions-edit`
- Type: **Interactive**
- Source mapping: mapped — `edit`
- Scenario: Modify an existing mission name while preserving its identity and history.
- What it teaches: Edit changes an existing object's information while keeping it the same object.
- Decision shown: Use Edit when users need to change saved values; offer it via a menu item, button, or edit icon.
- Consider: Show which values changed and make save, cancel, and validation outcomes understandable.

### Errors

- Example ID: `common-actions-errors`
- Type: **Interactive**
- Source mapping: mapped — `errors`
- Scenario: Report a failed sync clearly within concise line caps and offer recovery only when retrying helps.
- What it teaches: Error feedback explains that an action failed and gives the user a useful next step.
- Decision shown: Use an error message when refresh or another action cannot complete; offer Retry only when repeating the action can help.
- Consider: Keep form errors to <= 2 lines and full-page or large-modal errors to <= 3 paragraph lines; redirect to a safe state, support, or concrete recovery actions.

### Next

- Example ID: `common-actions-next`
- Type: **Interactive**
- Source mapping: mapped — `next`
- Scenario: Advance between ordered setup stages while retaining prior answers.
- What it teaches: Next advances to the next step in an ordered workflow; it does not imply final submission.
- Decision shown: Use a button paired with a forward icon (or standalone forward icon) when another step follows; reserve final labels for submission.
- Consider: Keep the step's purpose and progress clear, and avoid losing entered information when the user goes back.

### Refresh

- Example ID: `common-actions-refresh`
- Type: **Interactive**
- Source mapping: mapped — `refresh`
- Scenario: Request updated telemetry status while keeping the active filters and selection intact.
- What it teaches: Refresh requests current data again without intentionally changing filters or the underlying object.
- Decision shown: Use a refresh icon or button when users need updated records and automatic updates are absent or insufficient.
- Consider: Keep the selected filters and location, show loading and failure feedback, and avoid duplicate requests where possible.

### Remove

- Example ID: `common-actions-remove`
- Type: **Interactive**
- Source mapping: partial-divergent — `remove`
- Scenario: Detach a mission plan from an assignment group while keeping the underlying plan intact.
- What it teaches: Remove detaches an object from a collection while preserving the original object.
- Decision shown: Represent Remove subtly (button or subtract icon) when the relationship should end without destroying the record.
- Consider: Check access/billing/legal implications, permissions, whether unlinking is permanent, duration, failure recovery, and single vs. bulk scope; do not confuse Remove with Delete.
- Boundary or simplification: Live demo (`demos.tsx:518-520`) defaults to reversible "Undo removal" without showing a subtract icon or irreversible-detachment warning variant.

### Reset

- Example ID: `common-actions-reset`
- Type: **Interactive**
- Source mapping: mapped — `reset`
- Scenario: Discard pending filter edits and return to the last applied settings, not factory defaults.
- What it teaches: Reset restores the last applied or saved values; this may differ from initial defaults or blank values.
- Decision shown: Use a subtle link-style trigger when operators want to revert unapplied settings to the last applied state.
- Consider: Tell users which values will change and whether reset applies immediately or needs confirmation.
- Boundary or simplification: The example keeps pending filter values separate from the last applied view; Reset restores that checkpoint.

## Maintenance rule

Treat the catalog as the source for status, summary, component shortlist, and design decisions. Treat page content as the source for section guidance and demo teaching. Treat the rendered demo as evidence only for the behavior it visibly implements. Update this guide and [pattern routing](../PATTERN_ROUTING.md) when the pattern changes. Never treat local examples as production services or operational policy.
