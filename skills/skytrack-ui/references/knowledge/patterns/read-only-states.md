# Read-only states

> Values people may review but cannot modify in the current context.

- Pattern ID: `read-only-states`
- Catalog group: Core
- Source status: **Universal**
- Primary source: [maintained reference](../../../../../docs/carbon-ds-reference/patterns/read-only-states-pattern/index.md)
- Catalog entry: [catalog.ts](../../../../../src/showcase/pattern-library/catalog.ts)
- Page copy, source citations, and demo map: [page-content.ts](../../../../../src/showcase/pattern-library/page-content.ts)
- Local interaction implementation: [demos.tsx](../../../../../src/showcase/pattern-library/demos.tsx)

## Decision summary

**Use when:** Use read-only when people should still inspect or copy a value; use disabled only when a prerequisite prevents interaction.

**User outcome:** People can inspect important values without mistaking them for editable or unavailable content.

### Design decisions

- Keep read-only values legible and distinguish them from editable controls without suggesting they are unavailable.
- Make the state clear through structure, label, and behavior rather than color alone.
- Ensure keyboard users can focus and review the value when appropriate.

### SkyTrack UI implementation route

- Use the native readOnly state on Input and keep it inside the normal Field structure.
- Provide a separate example for disabled controls so the two states are not conflated.
- Check text selection, focus, and copy behavior.

**Candidate components:** `Field`, `Input`. Verify each API against [component routing](../COMPONENT_ROUTING.md) and installed source.

## Source limits

- Component doc note: referenced standalone Form usage documentation still lists read-only inputs as upcoming, making this pattern page the authoritative specification.
- Taxonomy note: upstream index contains a spelling typo ("Ready-only inputs") referring to this Read-only states specification.

## Source notes

- Upstream uses docsite UI tabs "#### Tab: Read-only" / "#### Tab: Enabled" under Component fields, borders, icon signifiers, and ## Content; normalized cleanly into comparative Read-only vs. Enabled copy below.

## Guidance reference

### Overview

Read-only turns an active control from interactive to purely informative without removing it from keyboard navigation or concealing its saved value.

#### When to use

Use read-only solely on form or data controls that already possess an enabled interactive state elsewhere, triggered by three conditions: (1) an ongoing application process temporarily locking submission, (2) a concurrency lock while another operator edits the record, or (3) view-only user permissions.

#### When not to use

- Never apply read-only to static text, metadata readouts, or labels that users can never edit anywhere.
- Never use read-only for temporarily unavailable prerequisite actions—keep those rendered as disabled.
- Inside full read-only pages/viewports, preserve prerequisite-disabled controls in disabled state rather than converting them to read-only.

### Formatting and anatomy

Keep labels, spacing geometry, value text, and structural icon placement identical to the enabled control so switching between view and edit modes introduces zero layout jump.

### Visual guidance

#### Structure across selection and bound controls

Maintain identical alignment, grid widths, and visual geometry across checkbox sets, radio groups, switches, selects, date/time pickers, number inputs, and sliders—letting checked indicators or selected slider/picker values stand out clearly without edit affordability.

**Examples:** `read-only-selected-bound`.

#### Visual differences from enabled controls

| Element                                              | Enabled state                                              | Read-only state                                                                                                                                        |
| ---------------------------------------------------- | ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Component fields                                     | Standard solid input surface contrasting against container | Default fields use a subtle transparent, borderless treatment while staying focusable; fluid fields retain their enabled fill while shedding edit cues |
| Component borders                                    | Crisp active underline or perimeter border                 | Subtle softened divider/border de-emphasizing clickability                                                                                             |
| Value text & contrast                                | Active foreground color (>= 4.5:1)                         | Full active text contrast (>= 4.5:1) so values remain crystal clear                                                                                    |
| Component icon signifiers (chevron, calendar, close) | Active interactive icon contrast                           | Remain visible in place but dim to muted disabled-icon contrast                                                                                        |

**Examples:** `read-only-mission-settings`.

#### Best practices

##### Preserve value readability

Never dim read-only text down to disabled opacity levels; operators rely on read-only values for verification and audit accuracy.

##### Read-only viewports

When a screen loads entirely in read-only mode due to permissions, keep controls that would otherwise be disabled for unmet dependencies rendered in disabled styling so conditional rules remain accurate.

##### Keep disabled and read-only states distinct

Reserve disabled for temporarily blocked interactive actions and read-only for inspectable locked values; swapping roles misleads screen-reader and sighted users alike.

#### Mouse and keyboard interactions

Keep the pointer as a default arrow cursor on hover (never text-caret if purely selection/closed or not-allowed blocked cues) while allowing text selection and focus traversal via Tab so operators inspect and copy locked content cleanly without modifying state.

### Content conventions

Keep saved values identical between enabled and read-only views. Whenever an enabled selector displays an interactive prompt when unselected (such as "Choose an option"), swap that prompt in read-only mode for a factual, solid-contrast empty statement (such as "No option selected") rather than leaving an empty placeholder field that looks incomplete or broken.

**Examples:** `read-only-empty-informative`.

### Accessibility

Distinguish navigability from operability clearly: read-only fields remain navigable (reachable via keyboard Tab, announced with their labels and saved values by screen readers at >= 4.5:1 contrast) yet intentionally non-operable, whereas default disabled controls fail both and are skipped by screen readers.

### Related components and patterns

**Related:** Input, Select, Checkbox, Radio, DatePicker, NumberField, Disabled states, Forms.

## Interactive and visual examples

### Review mission settings without changing them

- Example ID: `read-only-mission-settings`
- Type: **Interactive**
- Source mapping: partial-divergent — `visual-interactive-elements`
- Scenario: Present locked settings at full >= 4.5:1 legibility, navigable for keyboard inspection/copy, without reverting to disabled opacity.
- What it teaches: Read-only state lets users inspect normally editable controls when process locks, concurrency locks, or view permissions prevent edits.
- Decision shown: Blend default field surfaces cleanly into the layer (keeping enabled fills only on fluid fields), soften borders, dim chevron/close/calendar signifiers, keep arrow cursor on hover, and preserve disabled controls on unmet prerequisites.
- Consider: Read-only fields stay navigable by Tab and screen readers even though non-operable—unlike skipped disabled controls.
- Boundary or simplification: The preview shows editable, read-only, and prerequisite-disabled text fields side by side. Read-only fields use a subtle transparent, borderless treatment and remain focusable for review and copy; the disabled field stays visibly distinct. It does not demonstrate every control family or test a prerequisite-disabled item inside a full read-only viewport.

### Review selected options and bound values

- Example ID: `read-only-selected-bound`
- Type: **Visual reference**
- Source mapping: mapped — `visual-structure`
- Scenario: Preserve layout alignment and saved picks cleanly across selection controls and date/number bound entries.
- What it teaches: Read-only selections and bound controls retain enabled geometry so saved values inspect reliably.
- Decision shown: Keep checkbox/radio/switch and bound control layouts consistent while preventing modification.
- Consider: Expose read-only state and saved values clearly to assistive technology.

### Keep an empty selection informative

- Example ID: `read-only-empty-informative`
- Type: **Visual reference**
- Source mapping: mapped — `content`
- Scenario: Transform instructive prompts ("Choose an option") into factual read-only values ("No option selected") rather than blank placeholders.
- What it teaches: An empty read-only value confirms no option was set while preventing misleading blank-box ambiguity.
- Decision shown: Replace interactive prompts with solid high-contrast factual statements ("No option selected" or "No note provided") instead of faint placeholder text.
- Consider: Do not render an empty bordered input shell with faint placeholder text that looks editable or uninitialized.

## Maintenance rule

Treat the catalog as the source for status, summary, component shortlist, and design decisions. Treat page content as the source for section guidance and demo teaching. Treat the rendered demo as evidence only for the behavior it visibly implements. Update this guide and [pattern routing](../PATTERN_ROUTING.md) when the pattern changes. Never treat local examples as production services or operational policy.
