# Filtering

> A way for people to include or exclude items from a displayed data set using defined attributes.

- Pattern ID: `filtering`
- Catalog group: Core
- Source status: **Universal**
- Primary source: [maintained reference](../../../../../docs/carbon-ds-reference/patterns/filtering/index.md)
- Catalog entry: [catalog.ts](../../../../../src/showcase/pattern-library/catalog.ts)
- Page copy, source citations, and demo map: [page-content.ts](../../../../../src/showcase/pattern-library/page-content.ts)
- Local interaction implementation: [demos.tsx](../../../../../src/showcase/pattern-library/demos.tsx)

## Decision summary

**Use when:** Use filters when a collection needs narrowing by known attributes; choose single, multiple, or combined filters to fit the task.

**User outcome:** People can narrow a known collection and see whether their choices changed the results.

### Design decisions

- Show active filter state and whether changes apply immediately or after an explicit action.
- Apply simple, single-category choices immediately; use Apply and Cancel when users need to review several pending choices.
- Support clearing or resetting filters without forcing users to reverse each choice.
- Keep the result count and empty result recovery close to the filtered content.

### SkyTrack UI implementation route

- Compose Input with ToggleGroup or other supported selection controls and a visible result list.
- Use immediate updates for simple filters; use batch apply/cancel when users build a larger filter set.
- Expose the active selection and clear action to keyboard and assistive technology.

**Candidate components:** `Input`, `ToggleGroup`, `DataTable`, `Button`. Verify each API against [component routing](../COMPONENT_ROUTING.md) and installed source.

## Guidance reference

### Overview

Use filtering when operators need to narrow a known catalog by structured criteria, compare subsets side-by-side, or exclude unwanted records cleanly—distinct from open-ended keyword search.

### Selection methods

Choose single- versus multi-value selection controls, layout orientation, and apply cadence based on query speed and how many categories users adjust together.

#### Single selection

Restrict choices to one attribute value at a time using radio semantics: standard dropdown/select lists, compact inline dropdowns, or visible radio groups.

**Examples:** `filtering-single-status`.

#### Multiselect

Support combining two or more attribute values simultaneously using checkbox semantics: multi-select dropdowns, inline multi-select lists, or standalone checkbox sets.

#### Selecting multiple categories

Organize related attributes under labeled filter categories anchored vertically in a left sidebar or horizontally directly above the dataset. Never nest multiple distinct filter categories inside a single menu or dropdown trigger.

**Examples:** `filtering-combine-categories`.

#### Multiple filters with batch updates

Use an explicit "Apply filters" action when operators combine criteria across multiple categories or when backend queries carry noticeable latency—preventing wasted reload cycles on every individual checkbox click.

#### Multiple filters with instant updates

Apply updates immediately per click when response time is fast and operators typically adjust one filter at a time or browse live counts interactively.

### Filter states

Each filter category starts either all-unselected (when operators typically filter in one specific value) or all-selected (when operators normally exclude just one or two values), and sibling categories on the same screen may mix start states. Whenever filters tuck inside a closed drawer, dropdown, or popover, keep at least the count of active criteria visible on the trigger alongside a direct one-click clear affordance without reopening.

### Resetting filters

Provide resetting at two levels: a per-category reset restoring that group to its baseline start state (whether empty or all-selected), plus a global clear/reset control removing all active filter modifications at once.

### Related components and patterns

**Related:** Checkbox, Radio, Select, Common actions (Clear, Reset), Search.

## Interactive and visual examples

### Choose one status · instant results

- Example ID: `filtering-single-status`
- Type: **Interactive**
- Source mapping: partial-divergent — `selection-single`
- Scenario: Narrow a mission catalog by one attribute using immediate single-selection updates.
- What it teaches: A single-selection filter narrows a known collection by one structured attribute using radio semantics and updates results immediately.
- Decision shown: Use radio groups, selects, or single dropdowns for quick one-attribute filtering; keep keyword search separated into Search patterns.
- Consider: Let users clear or revert the category to its default state and recover cleanly from empty results.
- Boundary or simplification: The single-status example now uses the package RadioGroup/Radio controls and shows its count/list in the same example. Keyword search is separate. The combined-category example has local instant/batch selection, pending count, apply, clear-selection, and reset-all states; collapsed-trigger badges and per-category reset affordances remain simplified.

### Combine categories · apply or update instantly

- Example ID: `filtering-combine-categories`
- Type: **Interactive**
- Source mapping: partial-divergent — `selection-multiple-categories`
- Scenario: Combine multiple attributes cleanly using batch Apply filters when latency or deliberation warrants it, alongside two-tier resets.
- What it teaches: Multiple filters combine attributes to narrow a known collection; placement stays left-sidebar or top-horizontal rather than nesting categories in one menu.
- Decision shown: Use instant updates for fast single changes and batch "Apply filters" when reviewing several choices or querying slow datasets.
- Consider: Show an active filter count and quick clear on collapsed filter triggers, start categories either all-unselected or all-selected as needed, and offer both per-category clear and global reset.
- Boundary or simplification: The combined-category example now filters by plan category with local pending/applied states and visibly distinguishes Clear selections from Reset all filters. Collapsed-trigger active badges and per-category reset affordances remain simplified.

## Maintenance rule

Treat the catalog as the source for status, summary, component shortlist, and design decisions. Treat page content as the source for section guidance and demo teaching. Treat the rendered demo as evidence only for the behavior it visibly implements. Update this guide and [pattern routing](../PATTERN_ROUTING.md) when the pattern changes. Never treat local examples as production services or operational policy.
