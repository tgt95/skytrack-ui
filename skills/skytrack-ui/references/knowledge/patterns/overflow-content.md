# Overflow content

> Text or controls that exceed the available space, handled with truncation or a show-more affordance.

- Pattern ID: `overflow-content`
- Catalog group: Core
- Source status: **Additional local topic**
- Primary source: [maintained reference](../../../../../docs/carbon-ds-reference/patterns/overflow-content/index.md)
- Catalog entry: [catalog.ts](../../../../../src/showcase/pattern-library/catalog.ts)
- Page copy, source citations, and demo map: [page-content.ts](../../../../../src/showcase/pattern-library/page-content.ts)
- Local interaction implementation: [demos.tsx](../../../../../src/showcase/pattern-library/demos.tsx)

## Decision summary

**Use when:** Use truncation for constrained repeated labels and Show more when the omitted text is useful in context.

**User outcome:** Compact layouts stay readable while meaningful values remain available in full.

### Design decisions

- Keep the complete value available when truncation hides meaningful information.
- Prefer wrapping unless repeated content or a compact layout makes truncation necessary.
- Choose where to truncate based on the content; identifiers may need a middle ellipsis.
- Make expansion explicit and keep the expanded content easy to collapse.

### SkyTrack UI implementation route

- Use responsive text wrapping by default and apply truncation only for a real space constraint.
- Pair truncated content with a visible Show more control or a supported Tooltip when appropriate.
- Keep the expanded state local in the example.

**Candidate components:** `Tooltip`, `Button`. Verify each API against [component routing](../COMPONENT_ROUTING.md) and installed source.

## Source limits

- Catalog topic limit: Overflow content is maintained in the local pattern directory, though excluded from the 14-item Universal overview catalog.

## Source notes

- Maintained source opens directly with ## Truncation (wrapping Quick Navigation, Usage, Variations, Code, Example Usage, Result, and "Show more" buttons). Code/Result CSS snippets are synthesized cleanly into design & implementation rules without vendor class names.

## Guidance reference

### Truncation

Only truncate secondary read-only values when clipping hides at least three characters while keeping at least four characters visible—shorter truncations save almost no horizontal room while obscuring meaning. Always expose the hidden full value through a native hover tooltip (`title` attribute), with one explicit exception: omit tooltips at the clipped tail of a multi-line truncated paragraph.

#### Usage boundaries

> **do:** Limit truncation strictly to expandable supporting copy, long file or asset identifiers, deep URLs, paginated items, and intermediate breadcrumb paths.

> **dont:** Never truncate page headers, headings/titles, form field labels, validation errors, or notification messages.

#### Variations

#### Front-line truncation (…56789)

**Use when:** Preserving a trailing file path, filename, or right-hand identifier continuation.

**Avoid when:** Left-to-right URLs or punctuated paths unless explicitly protected with bidirectional isolation (`bdi`) so right-to-left text direction never flips slashes or domain tokens backwards.

#### Mid-line truncation (1234…5678)

**Use when:** Identifiers, revision slugs, or codes where both prefix and suffix differentiate items sharing common middle segments.

#### End-line truncation (12345…)

**Use when:** Standard trailing overflow for single-line titles, labels in compact tables, or narrative descriptions.

**Examples:** `overflow-identifiers-links`.

##### Standalone ellipses in collapsed controls

When collapsing multi-level navigation controls such as deep breadcrumbs to a standalone "…" token, expose the hidden intermediate segments via an interactive overflow menu on hover (and keyboard click activation for non-pointer accessibility) rather than a passive plain-text browser tooltip.

**Examples:** `overflow-breadcrumbs`.

#### Truncation calculation and directional safety

End-line and front-line cuts can rely on native CSS container width constraints paired with an explicit container width and hover `title` attribute; mid-line truncation has no universal pure-CSS equivalent and must be computed dynamically with JavaScript measurement based on available container width and distinct start/end slices.

#### "Show more" buttons

Prefer explicit "Show more" / "Show less" actions over cramped scrollable boxes, masked gradients, or opaque fades when revealing longer supporting descriptions—making expanded reading deliberate and discoverable. Swap to "Load more" when lazy fetching additional backend records improves page responsiveness.

**Examples:** `overflow-expand-route-note`.

## Interactive and visual examples

### Expand a long route note

- Example ID: `overflow-expand-route-note`
- Type: **Interactive**
- Source mapping: mapped — `show-more-buttons`
- Scenario: Reveal multi-line supporting copy with explicit Show more / Show less controls rather than subtle fades or nested scrollboxes.
- What it teaches: Show more reveals complete secondary prose cleanly when truncating initial card height improves scanning.
- Decision shown: Use Show more / Show less over gradients, fades, or tight scrollable areas; reserve Load more for async data fetching; keep headers, labels, errors, and alerts unclipped.
- Consider: Omit tooltip duplication at the end of a truncated paragraph, and make expanded/collapsed state clear to screen readers.

### Fit identifiers and links in compact layouts

- Example ID: `overflow-identifiers-links`
- Type: **Visual reference**
- Source mapping: partial-divergent — `truncation-variations`
- Scenario: Compare front-line, mid-line, and end-line truncation while keeping the complete value available on hover.
- What it teaches: Directional truncation hides at least 3 clipped characters while keeping at least 4 characters visible so compact rows remain readable.
- Decision shown: Pick front-line for trailing filenames, mid-line when both prefix and suffix identify an item, and end-line as default. Keep the full value available through a title or a separate copy/inspect action.
- Consider: Protect left-to-right URLs inside right-to-left containers (`bdi` or Unicode isolation) so punctuation and path order never invert visually.
- Boundary or simplification: The CSS now performs the middle ellipsis on the complete identifier instead of receiving pre-truncated text, and the LTR URL is isolated with `<bdi>` inside its RTL container. Copy actions are guidance only and are not demonstrated by this static example.

### Collapse long breadcrumb paths

- Example ID: `overflow-breadcrumbs`
- Type: **Interactive**
- Source mapping: partial-divergent — `variations-ellipses-alone`
- Scenario: Compress deep location trails using an ellipsis menu revealing intermediate levels.
- What it teaches: A compact breadcrumb collapses middle ancestors into "…" while retaining root and destination orientation.
- Decision shown: Open collapsed breadcrumb steps inside an overflow menu rather than relying on a passive text tooltip on hover.
- Consider: Source describes hover activation on the overflow trigger; supporting click/Enter/Space menu activation alongside hover ensures keyboard and touch users reach hidden levels.
- Boundary or simplification: The ellipsis opens a local menu with the hidden Organization and Workspace ancestors; destination navigation is not simulated.

## Maintenance rule

Treat the catalog as the source for status, summary, component shortlist, and design decisions. Treat page content as the source for section guidance and demo teaching. Treat the rendered demo as evidence only for the behavior it visibly implements. Update this guide and [pattern routing](../PATTERN_ROUTING.md) when the pattern changes. Never treat local examples as production services or operational policy.
