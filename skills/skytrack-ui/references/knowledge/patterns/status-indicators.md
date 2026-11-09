# Status indicators

> Visual indicators that help people assess status or severity and respond appropriately.

- Pattern ID: `status-indicators`
- Catalog group: Core
- Source status: **Additional local topic**
- Primary source: [maintained reference](../../../../../docs/carbon-ds-reference/patterns/status-indicator-pattern/index.md)
- Catalog entry: [catalog.ts](../../../../../src/showcase/pattern-library/catalog.ts)
- Page copy, source citations, and demo map: [page-content.ts](../../../../../src/showcase/pattern-library/page-content.ts)
- Local interaction implementation: [demos.tsx](../../../../../src/showcase/pattern-library/demos.tsx)

## Decision summary

**Use when:** Use an indicator when a status needs to be found quickly in a list, record, or workflow.

**User outcome:** Consistent labels and symbols make important states faster to scan and easier to understand.

### Design decisions

- Pair color with a text label or a well-understood icon; color alone is insufficient.
- Standardize status vocabulary and severity across the product.
- When combining states, surface the most important active condition rather than hiding its severity.
- Use consolidated indicators carefully to avoid adding unnecessary cognitive load.

### SkyTrack UI implementation route

- Use Badge status styles for compact labels and retain the status text.
- Use icons only when their meaning is established and provide an accessible name.
- Do not imply that a visual status changes the underlying workflow state.

**Candidate components:** `Badge`, `Alert`. Verify each API against [component routing](../COMPONENT_ROUTING.md) and installed source.

## Source limits

- Catalog topic limit: Status indicators exists in the maintained local directory yet is omitted from the 14-item Universal overview catalog.

## Source notes

- In ## Overview > ### Anatomy (lines 79–95), upstream lists #### 1. Icon indicator, #### 3. Badge indicator, #### 2. Shape indicator, #### 4. Differential indicator (non-sequential 3-before-2 numbering). Sequence is preserved cleanly without confusing numbering errors.
- ## Badge indicator and ## Differential indicator jump directly from H2 to H4 subheadings in source markdown; normalized cleanly to level 3 subsections.

## Guidance reference

### Overview

Status indicators reveal machine condition, process readiness, pending counts, or period-over-period shifts in place without interrupting active navigation.

#### Variants: icon indicators versus shape indicators

Choose Icon indicators when space allows stronger visual urgency tied to overall system health (combining icon glyph, containing shape, semantic color, and label). Choose compact Shape indicators for tight multi-row lists or diagrams expressing product-specific workflow lifecycle or priority tiers where red-to-green urgency does not always apply.

#### Anatomy across the four indicator families

1. Icon indicator: containing color silhouette, crisp interior symbol, and paired status text.
2. Badge indicator: numbered count pill or compact unread dot overlaid cleanly on an interactive ghost icon button trigger.
3. Shape indicator: distinct geometric outline silhouette + fill color paired closely with a status label.
4. Differential indicator: directional prefix (+/− symbol, caret, or arrow) paired with formatted change value and optional semantic color.

### Designing with status indicators

#### Choosing for context

##### Consolidated statuses

When rolling multiple underlying checks up into a single summary indicator, display the single highest-severity condition (error/red overrides warning/yellow, which overrides healthy/green).

##### Cognitive load limits

Keep indicators meaningful: swap non-actionable or low-value metadata to plain text, because cluttering one view beyond roughly five or six distinct status indicators overwhelms operator scanning.

#### Standardization

Apply identical status labels, severity tiers, and shape encodings consistently across related dashboards and tables so operators never re-learn vocabulary screen by screen.

#### Severity levels

| Tier             | Intent                                 | Representative meanings                                                   |
| ---------------- | -------------------------------------- | ------------------------------------------------------------------------- |
| High attention   | Requires immediate intervention        | Critical errors, failures, stop alerts, urgent blocks                     |
| Medium attention | Needs awareness without immediate halt | Warnings, caution thresholds, pending acknowledgement, in-progress states |
| Low attention    | Informational or healthy baseline      | Healthy ready, completed, available updates, neutral drafts               |

#### Visual guidance

##### Status symbols

Pair high-recognition icons consistently with critical system health states rather than decorating generic table attributes.

##### Status shapes

Assign one unique geometry to each distinct state within a table or workflow—never reuse the exact same silhouette with two different colors inside the same view.

##### Status color palettes and extended yellows/oranges

Draw states from the core semantic palette (red, orange, yellow, green, blue), plus gray for unstarted/draft work and purple for outliers or undefined readings. Reach into extended palette stops strictly where light-mode yellow or orange fills need darker strokes to guarantee accessible WCAG contrast.

##### Status typography and size pairings

Size indicators proportionally to adjacent labels: pair 20px icon indicators with 16pt type (or 16px icons with 14pt type); pair 16px shape indicators with 14pt or 12pt labels cleanly.

### Icon indicator

Use icon indicators for prominent system health, connection failures, and immediate attention notices—left-aligning symbols directly ahead of status labels in lists and tables (follow enclosing notification rules when inside alerts).

**Examples:** `status-icon-connection`.

### Shape indicator

Use compact outlined shapes paired with labels for scanning dense multi-row operational readiness or priority columns. Left-align shapes ahead of labels in vertical lists (trailing placement is permitted solely when every preceding text label stays constant width), never repeat one shape across different colors, and preserve 16px silhouettes with crisp outer outlines.

**Examples:** `status-shape-compact-list`.

### Badge indicator

Overlay badge indicators directly on interactive ghost icon buttons—clearing badges cleanly once the user views or acknowledges the pending updates:

**Examples:** `status-badge-navigation`.

#### Badge with number

Use numbered counts exclusively over large 48px global-header ghost icon buttons, capping display at three digits ("999+") so counters never blow out header layout.

#### Badge without number (dot badge)

Use a lightweight dot indicator on toolbar icon buttons or anywhere exact unread tally is irrelevant or unknown, signaling new activity until opened.

### Differential indicator

Communicate comparative metric delta using explicit +/− signs, directional arrows, or carets paired with comparison values and time context—so magnitude direction reads unambiguously without needing color.

**Examples:** `status-differential-trends`.

#### Color and metric-specific exceptions

Optional green (upward/positive) and red (downward/negative) semantic colors enhance rapid scanning, except on metrics where numeric direction carries domain reversal or neutral physics—such as temperature changes, error-rate drops, or latency deltas.

### Accessibility

#### Multi-cue contrast and standalone icon exception

Maintain at least 3:1 luminance contrast both against page backgrounds and between adjacent statuses even in grayscale. Combine at least two visual elements (symbol, shape, color) paired with text labels; static icon-only indicators are acceptable only where high-contrast symbols guarantee >= 3:1 legibility on their own.

#### Outlines on shape indicators

Because icon indicators carry high-contrast inner glyphs they require no outer border, whereas compact filled Shape indicators MUST include visible outer outlines alongside text labels—especially around light yellow or orange swatches in light surfaces.

### Related components and patterns

**Related:** Badge & Button, Notifications, Disabled states.

## Interactive and visual examples

### Show connection and attention states

- Example ID: `status-icon-connection`
- Type: **Visual reference**
- Source mapping: mapped — `icon-indicator`
- Scenario: Combine clear status icons, distinct severity colors, and left-aligned labels for system health telemetry.
- What it teaches: An icon indicator pairs a high-contrast symbol inside a status color with concise text for system health and attention states.
- Decision shown: Match icon indicators (20px/16pt or 16px/14pt) to system health conditions, rolling consolidated states up to the highest active severity.
- Consider: Keep status indicators to <= 5–6 per dense area using plain text for non-actionable states, and preserve >= 3:1 grayscale contrast.

### Scan operational readiness in a compact list

- Example ID: `status-shape-compact-list`
- Type: **Visual reference**
- Source mapping: mapped — `shape-indicator`
- Scenario: Use distinct outlined 16px shapes paired with left-aligned lifecycle/readiness text in dense table rows.
- What it teaches: Shape indicators support scanning many compact rows where product lifecycle or priority tiers differ.
- Decision shown: Assign a unique shape geometry to each state (never reusing the same shape with different colors), size silhouettes at 16px beside labels, and always add outlines on light themes.
- Consider: Reserve gray for unstarted/draft states and purple for outliers; use extended palettes strictly to keep yellow/orange 3:1 accessible.

### Summarize unread work in navigation

- Example ID: `status-badge-navigation`
- Type: **Visual reference**
- Source mapping: partial-divergent — `badge-indicator`
- Scenario: Illustrate a capped unread count, a new-item dot, and a hidden zero badge on navigation icons; production badges belong on actionable icon buttons.
- What it teaches: A badge indicator overlays unread counts or presence dots onto interactive icon buttons until acknowledged.
- Decision shown: Use numbered counters (max 3 digits: 999+) strictly on 48px header ghost icon buttons, use dot badges on toolbar icon buttons, and hide badges at zero.
- Consider: Clear badges cleanly once acknowledged and never attach standalone zero counters beside plain text strings.
- Boundary or simplification: Static reference uses labeled icon illustrations, overlays unread/dot badges, demonstrates the 999+ cap, and hides the zero badge; it does not provide operable navigation buttons.

### Compare operational trends over time

- Example ID: `status-differential-trends`
- Type: **Visual reference**
- Source mapping: mapped — `differential-indicator`
- Scenario: Present +/- values, directional carets/arrows, comparison baselines, and domain-safe color meaning.
- What it teaches: A differential indicator communicates magnitude and direction relative to a comparison timeframe.
- Decision shown: Include explicit +, -, arrow, or caret markers alongside comparison labels so directional meaning never depends on color alone.
- Consider: Avoid assuming green = up everywhere—metrics like battery temperature, thermal drift, or error rates invert or neutralize directional color meaning.

## Maintenance rule

Treat the catalog as the source for status, summary, component shortlist, and design decisions. Treat page content as the source for section guidance and demo teaching. Treat the rendered demo as evidence only for the behavior it visibly implements. Update this guide and [pattern routing](../PATTERN_ROUTING.md) when the pattern changes. Never treat local examples as production services or operational policy.
