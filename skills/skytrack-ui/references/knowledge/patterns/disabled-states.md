# Disabled states

> An unavailable control state used when permissions, dependencies, or prerequisites prevent interaction.

- Pattern ID: `disabled-states`
- Catalog group: Core
- Source status: **Universal**
- Primary source: [maintained reference](../../../../../docs/carbon-ds-reference/patterns/disabled-states/index.md)
- Catalog entry: [catalog.ts](../../../../../src/showcase/pattern-library/catalog.ts)
- Page copy, source citations, and demo map: [page-content.ts](../../../../../src/showcase/pattern-library/page-content.ts)
- Local interaction implementation: [demos.tsx](../../../../../src/showcase/pattern-library/demos.tsx)

## Decision summary

**Use when:** Use disabled while a specific condition blocks an otherwise available action; use read-only when values remain reviewable.

**User outcome:** A visible reason and a way to resolve it turn an unavailable control into a clear next step.

### Design decisions

- Explain the prerequisite or permission when the disabled state would otherwise be confusing.
- Keep the blocked action visible while the user can resolve its prerequisite.
- Do not use disabled styling as a substitute for read-only content.
- Hide an item only when the user should not see it at all.

### SkyTrack UI implementation route

- Use the disabled prop on the actual control and keep its Field label and description associated.
- Keep the reason for the state visible near the control.
- Do not simulate disabled styling with color alone.

**Candidate components:** `Field`, `Input`, `Button`. Verify each API against [component routing](../COMPONENT_ROUTING.md) and installed source.

## Guidance reference

### Disabled variations

Select among three distinct treatments depending on whether the user must resolve a dependency, inspect a locked value, or lacks permission to know a capability exists:

| Variation        | Cause                                                       | Visibility                                                      | Screen reader & keyboard access              |
| ---------------- | ----------------------------------------------------------- | --------------------------------------------------------------- | -------------------------------------------- |
| Default disabled | Temporarily unmet prerequisite or system dependency         | Visible at reduced opacity                                      | Not focusable and not read by screen readers |
| Read-only        | Value locked by role or workflow but still relevant to read | Visible at normal readable contrast without interactive styling | Focusable, readable, and copyable            |
| Hidden           | Excluded by assigned user permissions or role               | Removed completely from view                                    | Absent from visual layout and assistive tree |

### Default disabled

Apply default disabled styling when an action or input is temporarily blocked by an unmet prerequisite or software dependency and will re-enable once the user resolves that condition. Never hide a control merely because a prerequisite is currently unsatisfied.

**Examples:** `disabled-states-default`.

#### Visual styling and interaction

- Control container and icons render at 50% opacity; labels and value text render at 25% opacity.
- Hover styling is completely disabled.
- Pointer hover displays the not-allowed cursor to reinforce unavailability.
- Controls remain skipped by keyboard navigation and screen readers; explain any prerequisite in persistent nearby copy so everyone can discover how to unlock the control.

#### Additional warning for blocking conditions

Whenever a disabled state blocks the flow’s primary action or disables multiple interactive items at once, add an inline warning notification nearby stating exactly how to re-enable the blocked workflow.

**Examples:** `disabled-states-warning`.

### Read-only

Use read-only rather than default disabled when a control cannot be modified in the current context yet its value remains needed for review, copying, or screen-reader inspection.

**Examples:** `disabled-states-read-only`.

#### Styling restrictions

Preserve high legibility and assistive-technology discoverability while removing every cue of mutability: never apply primary brand or interactive accent tokens, hover transitions, link underlines, or other clickable embellishments.

### Hidden

Hide an element completely only when the user’s assigned role lacks permission to access or see it. Keep the control absent unless permissions change—never hide controls merely because of incomplete steps.

**Examples:** `disabled-states-hidden`.

## Interactive and visual examples

### Default disabled · missing prerequisite

- Example ID: `disabled-states-default`
- Type: **Visual reference**
- Source mapping: mapped — `default-disabled`
- Scenario: Keep a primary launch control visible but blocked until the operator completes the preflight prerequisite.
- What it teaches: A disabled control shows an action exists but cannot run until a prerequisite is met.
- Decision shown: Keep it visible when the user can satisfy the prerequisite; use read-only for inspectable values and hide actions outside the user's permission.
- Consider: Default disabled controls are skipped by screen readers, so place prerequisite instructions in persistent readable helper text.

### Disabled with a warning · unsaved prerequisite

- Example ID: `disabled-states-warning`
- Type: **Visual reference**
- Source mapping: partial-divergent — `default-disabled-additional-warning`
- Scenario: Unsaved route edits block the primary scheduling action; explain what needs to happen before the user can continue.
- What it teaches: A warning adds explicit remediation guidance when an unmet prerequisite blocks a primary flow or disables several controls at once.
- Decision shown: Use an inline warning alert specifically when a primary action or multi-item region is stalled—such as requiring unsaved edits to be saved before continuing.
- Consider: State the exact resolving step clearly without relying on color alone.

### Read-only · value is available for review

- Example ID: `disabled-states-read-only`
- Type: **Visual reference**
- Source mapping: mapped — `read-only`
- Scenario: Keep mission coordinates reviewable and accessible without implying the value can be edited here.
- What it teaches: Read-only content remains available to inspect and read aloud while preventing edits in this context.
- Decision shown: Choose read-only when users need the value for reference; choose disabled only when an interactive control is temporarily blocked.
- Consider: Keep values at high contrast without interactive brand colors, hover highlights, or underlines.

### Hidden · action is outside this role’s permissions

- Example ID: `disabled-states-hidden`
- Type: **Visual reference**
- Source mapping: mapped — `hidden`
- Scenario: Remove restricted administrative actions completely when the signed-in role lacks permission.
- What it teaches: A hidden action is unavailable because the user's role should not see it.
- Decision shown: Hide controls strictly for role permissions; keep temporarily blocked prerequisites visible as disabled.
- Consider: Do not hide actions simply because a user has not finished entering a form field.

## Maintenance rule

Treat the catalog as the source for status, summary, component shortlist, and design decisions. Treat page content as the source for section guidance and demo teaching. Treat the rendered demo as evidence only for the behavior it visibly implements. Update this guide and [pattern routing](../PATTERN_ROUTING.md) when the pattern changes. Never treat local examples as production services or operational policy.
