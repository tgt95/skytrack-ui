# Edit

> A flow for changing a resource that already exists in the system.

- Pattern ID: `community-edit`
- Catalog group: Community
- Source status: **Community maintained**
- Primary source: [maintained reference](../../../../../docs/carbon-ds-reference/community/patterns/edit-pattern/index.md)
- Catalog entry: [catalog.ts](../../../../../src/showcase/pattern-library/catalog.ts)
- Page copy, source citations, and demo map: [page-content.ts](../../../../../src/showcase/pattern-library/page-content.ts)
- Local interaction implementation: [demos.tsx](../../../../../src/showcase/pattern-library/demos.tsx)

## Decision summary

**Use when:** Use edit behavior aligned with create behavior unless the editable fields or need for surrounding context materially differ.

**User outcome:** The edit surface and review effort match the amount of context and consequence of a change.

### Design decisions

- Choose modal, side panel, or full page according to impact and the amount of context needed.
- For high-impact edits, warn that the change cannot be undone, explain its system consequences, and provide a review before separate confirmation.
- Preserve non-editable values and show a summary of changes when it helps review.
- Give a clear save/cancel path and success feedback.

### SkyTrack UI implementation route

- Use InlineEdit for a short value change and Field/Input for a larger form.
- Keep the changed value in local component state and support cancel where the composition permits.
- Keep non-editable data distinguishable from editable controls.

**Candidate components:** `InlineEdit`, `Field`, `Input`, `Button`. Verify each API against [component routing](../COMPONENT_ROUTING.md) and installed source.

> **Local example limit:** Community pattern; the local page documents low- and high-impact edit options.

## Source limits

- Maintained Edit guidance covers Modal, Side-panel, and Full-page surfaces only; inline editing (`InlineEdit`) is a SkyTrack-local addition with no source section.
- For locked fields, the community source mentions disabled field appearance, whereas SkyTrack intentionally uses `readOnly` to align with Core Read-only accessibility rules so operators can still focus and inspect locked values.

## Source notes

- edit-pattern/index.md begins directly with an opening surface-parity blockquote (lines 11–15) before ## Low-impact edit; its rule is captured in summary and reinforced inside the surface subsections without inventing an Overview heading.
- ### Non-editable fields (line 161) recommends a disabled field for a few locked inputs, conflicting with SkyTrack Core Read-only rules; SkyTrack retains readOnly intentionally.

## Guidance reference

### Low-impact edit

When changes carry no wider operational or destructive impact, let operators edit directly without adding warning friction.

#### Modal

Use a modal when the resource was created in a modal or when only a small subset of fields can be edited. If enough editable fields appear to require vertical scrolling, switch to a side panel or full-page edit view instead.

#### Side-panel

Use a side panel when the resource was created in a side panel or when seeing main-view records helps the operator make accurate edits.

**Examples:** `edit-side-panel`.

#### Full page

When a resource was created in a full-page flow and most fields remain editable, present a dedicated full-page properties or configuration view supporting clear reading and editing modes.

### High-impact edit

Whenever an edit carries broader system consequences, warn operators explicitly about likely downstream effects, state clearly that the change cannot be undone, and enforce a dedicated warning/confirmation stage before saving.

#### Modal

For a few high-impact fields, use a danger modal followed by a second confirmation modal before saving changes, optionally displaying a summary of what changed.

**Examples:** `edit-high-impact-modal`.

#### Side-panel

When a resource was created in a side panel or holds too many editable fields for a modal, use a slide-over panel that advances to a dedicated warning screen inside the panel before saving changes.

#### Full page

When a resource was created in a full-page flow or involves a high volume of editable fields, edit on a full-page canvas and trigger a confirmation modal warning of save consequences when the operator submits.

**Examples:** `edit-full-page`.

### Optional extras

#### Summary of changes

Include an old-to-new summary of modified values inside the high-impact warning stage so operators can verify every pending change before confirming.

#### Non-editable fields

When only a few fields are locked, keep their values visible inline alongside editable controls. When most fields cannot be edited, provide an editable-only view filter or let operators edit individual settings in focused modals.

> **note:** SkyTrack accessibility rule: although the community source refers to disabled styling for a few locked fields, SkyTrack renders inspectable locked values as read-only rather than disabled so keyboard and screen-reader users can still read them.

#### Success notifications

Optionally display a brief success notification confirming that edited changes have been saved.

## Interactive and visual examples

### Make a low-impact inline change

- Example ID: `edit-inline-local`
- Type: **Interactive**
- Source mapping: UNMAPPED
- Scenario: Update a short mission label directly in its record.
- What it teaches: Local extension: inline editing lets a person revise a single short value in place when the change has no wider impact.
- Decision shown: UNMAPPED to maintained source (maintained Edit covers Modal, Side-panel, and Full-page flows only). Reserve inline edits strictly for trivial, low-risk label updates where no warning is needed.
- Consider: Keep save/cancel state unmistakable and avoid warnings for low-impact changes.
- Boundary or simplification: UNMAPPED local extension (`demos.tsx:3115, 3149-3164`, `<InlineEdit>`). Maintained `edit-pattern/index.md` defines Modal, Side-panel, and Full-page edit surfaces only; shares one toggled demo slot with "Review a higher-impact edit before saving".

### Review a higher-impact edit before saving

- Example ID: `edit-high-impact-modal`
- Type: **Interactive**
- Source mapping: partial-divergent — `high-impact-modal`
- Scenario: Review a mission-name change that affects how dispatchers identify the plan, then confirm it before saving.
- What it teaches: A high-impact modal edit pairs an initial danger edit dialog with a second confirmation modal before saving.
- Decision shown: Explain downstream system consequences, state clearly that the change cannot be undone, and optionally include an old-to-new summary in the confirmation modal.
- Consider: Keep non-editable values readable (`readOnly` in SkyTrack rather than disabled) and pair completion with clear save feedback.
- Boundary or simplification: The confirmation now names the dispatch consequence and says the sample has no undo. Completion uses a local inline success alert instead of a toast; the example does not modify a live mission.

### Keep a broader edit in a side panel

- Example ID: `edit-side-panel`
- Type: **Interactive**
- Source mapping: mapped — `low-impact-side-panel`
- Scenario: When an update needs related context, edit it in a side surface while retaining the mission list behind it.
- What it teaches: A side panel supports editing when the resource started in a side panel, exceeds modal scrolling limits, or depends on surrounding page context.
- Decision shown: Omit warnings for low-impact side-panel edits; for high-impact edits, advance to a separate warning screen inside the side panel before saving.
- Consider: Keep locked values legible alongside editable inputs, or provide an editable-only filter when most fields are locked.

### Use a full-page canvas for a complex revision

- Example ID: `edit-full-page`
- Type: **Interactive**
- Source mapping: mapped — `high-impact-full-page`
- Scenario: Review a consequential full-page mission edit and confirm its summary before saving the local preview.
- What it teaches: Full-page editing fits resources created in a full-page flow or revisions with large numbers of editable fields.
- Decision shown: For low-impact full-page edits, use a read/edit properties view without warnings; for high-impact full-page edits, open a consequence confirmation modal when saving.
- Consider: Include a change summary in high-impact confirmation modals and clarify irreversibility.

## Maintenance rule

Treat the catalog as the source for status, summary, component shortlist, and design decisions. Treat page content as the source for section guidance and demo teaching. Treat the rendered demo as evidence only for the behavior it visibly implements. Update this guide and [pattern routing](../PATTERN_ROUTING.md) when the pattern changes. Never treat local examples as production services or operational policy.
