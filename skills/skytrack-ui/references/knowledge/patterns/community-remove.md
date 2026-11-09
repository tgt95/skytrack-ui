# Remove

> Moving information from one location to another; deletion is the destructive form of removal.

- Pattern ID: `community-remove`
- Catalog group: Community
- Source status: **Community maintained**
- Primary source: [maintained reference](../../../../../docs/carbon-ds-reference/community/patterns/remove-pattern/index.md)
- Catalog entry: [catalog.ts](../../../../../src/showcase/pattern-library/catalog.ts)
- Page copy, source citations, and demo map: [page-content.ts](../../../../../src/showcase/pattern-library/page-content.ts)
- Local interaction implementation: [demos.tsx](../../../../../src/showcase/pattern-library/demos.tsx)

## Decision summary

**Use when:** Use removal to move or unlink an item and deletion to destroy it. Either change may be difficult or impossible to undo, so match confirmation to its impact.

**User outcome:** People understand whether an item is unlinked or destroyed and know what recovery is possible.

### Design decisions

- Name whether the action removes or deletes and state what happens afterward.
- Confirm medium-impact removal when its effects cannot be reversed, and state clearly what will change.
- Use stronger confirmation for high-impact destructive actions; keep low-impact actions lightweight when recovery is available.

### SkyTrack UI implementation route

- Use AlertDialog when a destructive decision must be acknowledged.
- Keep cancel available and show that the demo removes only its local sample.
- Use post-action feedback or undo for reversible removal.

**Candidate components:** `AlertDialog`, `Button`, `Alert`. Verify each API against [component routing](../COMPONENT_ROUTING.md) and installed source.

> **Local example limit:** Community pattern; the local page distinguishes removal from destructive deletion.

## Source limits

- Ghost-style low-impact triggers that reveal red destructive emphasis only on hover or focus may require styling overrides beyond standard default button tokens.

## Source notes

- Source starts with ### Delete / Remove variations (H3, line 29) before ## High-impact deletion (H2, line 39); normalized here to level 2 so heading hierarchy stays consistent.
- High-impact deletion (line 56) links to #done-modal and #requested-modal anchors that correspond to ### Optional passive modal under ## Anatomy.

## Guidance reference

### Delete and remove impact variations

Select confirmation intensity across five tiers based on whether the action destroys or merely unlinks data, whether it can be reversed, and how severe an accidental trigger would be:

| Action | Impact tier   | Rule and confirmation                                                                                                                |
| ------ | ------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Delete | High impact   | Irreversible destruction with major operational loss. Operator must type the exact resource name in the confirmation modal.          |
| Delete | Medium impact | Irreversible destruction with moderate loss. Modal names the resource, consequences, and irreversibility without typed confirmation. |
| Delete | Low impact    | Reversible or minimal loss (or paired with Undo). Confirmation modal may be skipped.                                                 |
| Remove | Medium impact | Non-destructive move/unlink that cannot be reversed and carries moderate impact. Modal states consequences and irreversibility.      |
| Remove | Low impact    | Non-destructive and easily reversed. Confirmation modal is typically omitted.                                                        |

### High-impact deletion

When irreversible deletion would cause major loss if triggered accidentally, present a confirmation modal containing four required elements:

- The exact name of the resource being deleted.
- Clear consequences of deleting it.
- An explicit statement that the action cannot be undone.
- An input field where the operator must manually enter the exact resource name—keeping the Delete button disabled until the typed text matches perfectly.

Optionally pair completion with a passive Done modal, an async Requested modal, or a notification (or one modal combined with a notification).

**Examples:** `remove-high-impact-delete`.

### Medium-impact deletion

When irreversible deletion causes moderate rather than catastrophic loss, require a confirmation modal without a typed-name barrier, displaying three elements:

- The resource name.
- Specific consequences of deletion (and what remains intact).
- An explicit statement that the action cannot be undone.

Optionally follow up with a passive completion modal, a notification, or both.

**Examples:** `remove-medium-impact-delete`.

### Low-impact deletion

Confirming deletion is generally recommended, yet in low-impact situations—or whenever an immediate Undo action is provided—you may omit the confirmation modal. In dense lists or toolbars, prefer subtle ghost triggers that reveal destructive red emphasis only on hover or focus over rows crowded with solid red danger buttons.

**Examples:** `remove-low-impact-delete`.

### Medium-impact removal

Non-destructive removal still carries medium impact whenever unlinking or moving an item cannot be undone easily and affects access or shared state. Display a confirmation modal stating both the operational consequences of removal and that the action cannot be undone.

**Examples:** `remove-medium-impact-unlink`.

### Low-impact removal

Because unlinking or moving does not destroy the underlying resource, low-impact removal typically needs no confirmation modal. Use standard or subtle ghost hover-danger triggers cleanly in context.

**Examples:** `remove-low-impact-unlink`.

### Anatomy

#### Optional passive modal

For medium- and high-impact flows, optionally show a passive modal reflecting the outcome state: display a Requested modal when deletion or removal runs asynchronously (explaining the request was sent, users can close and keep working, and a notification will follow), or a Done modal once an immediate action completes.

#### Notification

Optionally send a completion notification after medium- or high-impact removals and deletions—especially valuable when the operation takes longer than a few moments.

## Interactive and visual examples

### High-impact deletion · require the resource name

- Example ID: `remove-high-impact-delete`
- Type: **Interactive**
- Source mapping: mapped — `high-impact-deletion`
- Scenario: For an irreversible action with significant loss, identify the resource and require an exact name match before enabling Delete.
- What it teaches: High-impact deletion destroys a consequential asset permanently and requires deliberate typed verification.
- Decision shown: Display the resource name, consequences, "This action cannot be undone", and a text input matching the exact resource name before enabling Delete.
- Consider: Optionally pair completion with a passive Done or Requested modal and notification; never offer an undo button on irreversible deletion.

### Medium-impact deletion · confirm the consequence

- Example ID: `remove-medium-impact-delete`
- Type: **Interactive**
- Source mapping: mapped — `medium-impact-deletion`
- Scenario: For a smaller but irreversible loss, explain what will be deleted and require a deliberate confirmation.
- What it teaches: Medium-impact deletion permanently destroys a bounded item whose loss is consequential but not catastrophic.
- Decision shown: Confirm in a modal naming the resource, its consequences, and that the action cannot be undone—without requiring typed-name confirmation.
- Consider: State clearly what remains untouched so operators do not confuse deleting a filter or view with deleting primary records.

### Low-impact deletion · undo a draft deletion

- Example ID: `remove-low-impact-delete`
- Type: **Interactive**
- Source mapping: partial-divergent — `low-impact-deletion`
- Scenario: When deleting a low-risk draft is easy to reverse or recreate, skip the confirmation and keep an immediate Undo action beside the result.
- What it teaches: Low-impact deletion skips confirmation dialogs when loss is minor or an immediate Undo action protects against slips.
- Decision shown: Omit modal friction for low-risk deletions paired with immediate Undo, and prefer subtle hover-danger triggers in dense lists.
- Consider: Keep Undo available long enough to recover, and distinguish deleting the draft from unlinking an existing item.
- Boundary or simplification: The local Delete/Undo example represents low-impact deletion; the separate unlink example demonstrates non-destructive removal.

### Medium-impact removal · preserve the original data

- Example ID: `remove-medium-impact-unlink`
- Type: **Interactive**
- Source mapping: partial-divergent — `medium-impact-removal`
- Scenario: For a non-destructive but consequential unlink, explain the impact and confirm before removing access.
- What it teaches: Medium-impact removal unlinks or moves an item without destroying the source, yet cannot be reversed cleanly.
- Decision shown: Confirm in a modal explaining what loses access or leaves the collection and stating explicitly that the action cannot be undone.
- Consider: Do not present irreversible medium-impact removal as undoable; reserve immediate Undo for low-impact cases.
- Boundary or simplification: The confirmation names the collection impact and says the removal cannot be undone from this sample view; the completed state has no Restore or Undo action. This remains a local preview and does not change real access.

### Low-impact removal · unlink and undo

- Example ID: `remove-low-impact-unlink`
- Type: **Interactive**
- Source mapping: mapped — `low-impact-removal`
- Scenario: For a reversible unlink, remove it without a warning and keep an Undo action close to the result.
- What it teaches: Low-impact removal unlinks an item harmlessly without destroying the underlying source.
- Decision shown: Execute directly without a confirmation dialog, optionally offer immediate Undo nearby, and use ghost hover-danger triggers where dense rows appear.
- Consider: Clarify that unlinking removes only the reference in this view while leaving the source intact.
- Boundary or simplification: Live demo (`demos.tsx:4349-4381`) matches low-impact removal rules; uses an outline trigger rather than illustrating the optional ghost hover-danger trigger treatment.

## Maintenance rule

Treat the catalog as the source for status, summary, component shortlist, and design decisions. Treat page content as the source for section guidance and demo teaching. Treat the rendered demo as evidence only for the behavior it visibly implements. Update this guide and [pattern routing](../PATTERN_ROUTING.md) when the pattern changes. Never treat local examples as production services or operational policy.
