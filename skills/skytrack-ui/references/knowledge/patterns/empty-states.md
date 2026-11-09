# Empty states

> A content area with no data, including first use, user-created emptiness, or unavailable content.

- Pattern ID: `empty-states`
- Catalog group: Core
- Source status: **Universal**
- Primary source: [maintained reference](../../../../../docs/carbon-ds-reference/patterns/empty-states-pattern/index.md)
- Catalog entry: [catalog.ts](../../../../../src/showcase/pattern-library/catalog.ts)
- Page copy, source citations, and demo map: [page-content.ts](../../../../../src/showcase/pattern-library/page-content.ts)
- Local interaction implementation: [demos.tsx](../../../../../src/showcase/pattern-library/demos.tsx)

## Decision summary

**Use when:** Use the empty state that names the actual reason: no data yet, no results, an error, or a required user action.

**User outcome:** People learn why content is missing and what they can do next instead of meeting a dead end.

### Design decisions

- Explain why the space is empty and offer a useful next step when one exists.
- Keep the message sized to its space and use starter content only when it helps people begin.
- Give search with no matches its own recovery guidance instead of reusing first-use copy.

### SkyTrack UI implementation route

- Compose a concise status message with Alert or semantic text and an optional Button.
- Replace the empty result surface with the state instead of leaving a dead, empty table.
- Make the example action change only local sample state.

**Candidate components:** `Alert`, `Button`. Verify each API against [component routing](../COMPONENT_ROUTING.md) and installed source.

## Source limits

- Dedicated source standards for Error states and Onboarding tours are noted as future source expansions; rely only on the high-level error and onboarding guidance documented here.

## Guidance reference

### Overview

Whenever a table, card grid, inbox, or workspace has nothing to show, present an honest explanation and one unmistakable action rather than leaving operators staring at blank headers or unexplained zero counts.

### Anatomy

1. Image (optional): concise non-interactive graphic proportional to container size.
2. Title (required): clear positive framing describing what happens next (prefer "Start by adding..." over negative "You have no...").
3. Body copy (required): explains the state concisely and delivers a next step via one of three routes—a button beneath copy, an inline link in copy, or guidance pointing to an existing control on screen.
4. Primary action button (optional): shown when a button is the clearest way to resolve the empty state.
5. Secondary action link (optional): tertiary text link (such as "Learn more") pointing to documentation when helpful.

### Designing with empty states

Choose basic empty states for routine or secondary views; reserve heavier in-depth alternatives—inline guides, guided onboarding, or pre-loaded starter kits—strictly for primary workflows.

#### When to use

Display an empty state whenever zero items are present before first setup, after an over-narrow filter/search, when all alerts are clear, or when data fails to load.

#### Basic empty states

Replace the entire missing component container (for example, omit data table column headings, filter toolbars that make no sense without rows, and pagination footers) so users and assistive technology never traverse dead table shells.

#### Where to use

Use across full-page collections, split view panes, dashboard cards/tiles, data tables, and notification trays whenever records can drop to zero.

#### Visual guidelines for smaller empty spaces

##### Alignment of elements

Keep title, body copy, and action controls left-aligned inside compact tiles or narrow drawers. Only the optional illustration may sit centered above left-aligned text in small square tiles.

##### Image choice considerations

Keep graphics lightweight or omit images altogether inside tight cards so text remains effortless to read without inflating container height.

##### Multiple empty states

When several dashboard cards show empty states at the same time, demote individual triggers from primary to tertiary actions so buttons do not visually fight each other. If multiple widgets fail to load data, drop imagery and display clear text-only recovery guidance.

#### Visual guidelines for larger empty spaces

##### Alignment of elements

Keep text left-aligned within its content block even when the block itself sits positioned cleanly inside a wide canvas or grid region—never center multi-line explanatory prose.

##### Layout and positioning options

Anchor large empty blocks comfortably near top-left with balanced margins or inside a horizontally centered content column with left-aligned text.

##### Image position options

Place wider landscape illustrations directly above the empty-state heading, or place taller portrait/spot illustrations neatly beside the left-aligned text column.

##### Image choice considerations

Use custom product imagery only where it reinforces domain meaning without distracting from the recovery CTA.

##### Best practices

Conserve vertical scan flow, limit copy to one clear purpose, and link directly to the next action.

### Types of empty states

Match copy tone and offered actions carefully to the cause of emptiness so users never mistake an unavailable service or an overly narrow search for a freshly installed product.

#### No data empty states

Appear before an operator creates or imports records for the first time. Name specifically what belongs in this view and offer one direct action to begin.

> **do:** State specifically what will live here, write positive inviting titles ("Start by creating a plan"), and keep a single focused call to action.

> **dont:** Do not write vague placeholders, bury users in internal jargon, or apologize negatively ("You don't have anything yet") when inviting first-time creation.

**Examples:** `empty-states-no-data`.

#### User action empty states

Trigger from direct operator actions and split into two distinct situations: (1) zero search or filter matches—where the active query remains clear alongside options to clear or broaden filters rather than offering "Create first item"; and (2) healthy completion states—such as a cleared inbox or configured monitor with zero triggered alerts, where calm status confirmation needs no intrusive action button.

**Examples:** `empty-states-no-results`.

#### Error management empty states

Explain clearly why records could not appear without falsely claiming the collection is empty:

| Cause                  | What to communicate to operators                                                            |
| ---------------------- | ------------------------------------------------------------------------------------------- |
| Permissions issue      | Explain access limits and who can grant role rights                                         |
| Systems issue          | State that service connectivity or retrieval failed and offer safe Retry or status guidance |
| Configuration required | Point to the missing setup prerequisite needed before data flows in                         |
| Action not supported   | Explain why the requested view or capability is unavailable in this environment             |

> **do:** Use plain human language describing what happened and rank recovery steps cleanly from primary fix to secondary support links.

> **dont:** Never expose cryptic numeric error codes alone or leave operators without a clear next step.

> **Source limit:** Source limit: comprehensive standalone Error states guidance is marked for future development in the reference taxonomy.

**Examples:** `empty-states-error`.

### In-depth alternatives

For flagship workflows where a two-line empty state leaves new teams guessing how the capability works, substitute richer educational structures with clear fallback paths.

#### Choosing among educational approaches

Weigh localization overhead, skip behavior, and deletability before picking inline documentation, guided onboarding, or pre-seeded starter content over a lightweight basic empty state.

#### In-line documentation

Embed structured feature explanation and visual walkthrough material directly in the empty workspace so teams learn before their first configuration run.

**Examples:** `empty-states-inline-doc`.

##### Considerations for in-line documentation

- Restrict coverage strictly to one primary feature so the screen never reads like a documentation portal.
- Account for maintenance cost: annotated screenshots or diagrams require regeneration and multi-language translation whenever the UI updates.

#### Onboarding

Offer step-by-step orientation or setup checklists for multi-part workflows where learning the conceptual model first increases activation success.

**Examples:** `empty-states-onboarding`.

##### Considerations for onboarding

Keep onboarding optional and skippable, and always design a basic empty state behind it once dismissed. Note: standalone Onboarding pattern documentation is planned as a future addition in the reference set.

#### Starter content

Seed unfamiliar workspaces with concrete sample records or pre-assembled templates so operators inspect working output immediately instead of building from scratch.

**Examples:** `empty-states-starter-content`.

##### Pre-built sample content

Include realistic sample data sets clearly tagged as examples so teams test views, filters, and visualizations without harming real operations.

##### Pre-configured kits and workflows

Supply starter templates or rule bundles that operators duplicate or adapt into production workflows.

##### Considerations for starter content

Whenever users are allowed to archive or delete starter items, ensure deleting all samples cleanly reveals a fallback basic empty state.

### Accessibility

Decorative illustrations inside empty states convey no extra facts beyond surrounding headings and copy; assign empty alt attributes (`alt=""`) so screen readers skip decorative artwork cleanly across browsers and assistive tools.

### Related components and patterns

**Related:** Data table, Tile / Card, Notifications, Search, Error states (future reference expansion), Onboarding (future reference expansion).

## Interactive and visual examples

### No data · create the first plan

- Example ID: `empty-states-no-data`
- Type: **Interactive**
- Source mapping: mapped — `types-no-data`
- Scenario: Show a positive first step, then make the new plan visible in the collection after creation.
- What it teaches: This state explains that no plans exist yet and helps the user create the first one.
- Decision shown: Replace the entire container (omitting empty table headers/footers), use a positive action-oriented title, and provide one clear resolution CTA.
- Consider: Left-align empty-state text as a block (never centering multi-line prose) and never use first-use copy for load errors or zero search matches.

### No results · recover a search

- Example ID: `empty-states-no-results`
- Type: **Interactive**
- Source mapping: mapped — `types-user-action`
- Scenario: Keep the query visible, show matching plans as it changes, and offer a clear way back from zero matches.
- What it teaches: This user-action state shows that records exist in the system, though the active query returned none.
- Decision shown: Keep the query visible and offer filter reset or query revision rather than a Create First Item prompt; note that zero-item completion views (such as zero pending alerts) require no extra call to action.
- Consider: Reserve extra recovery controls for zero-match searches while keeping healthy completion states concise.
- Boundary or simplification: This sample demonstrates a no-match search state; it does not represent a healthy completed zero-alert view.

### Error · recover an unavailable collection

- Example ID: `empty-states-error`
- Type: **Interactive**
- Source mapping: mapped — `types-error-management`
- Scenario: Clarify when data retrieval failed—across permissions, system outage, setup gaps, or unsupported actions—using plain language rather than raw error codes.
- What it teaches: An error empty state explains that the collection could not load, so its absence is not evidence that no plans exist.
- Decision shown: Communicate permission, system, configuration, or capability failures in plain human terms without cryptic error codes, and rank recovery steps.
- Consider: Preserve relevant filters, drop imagery if multiple dashboard tiles fail simultaneously, and note comprehensive Error states guidance is planned in source.

### Inline documentation · explain the next step

- Example ID: `empty-states-inline-doc`
- Type: **Interactive**
- Source mapping: mapped — `alternatives-inline-docs`
- Scenario: Guide setup beside the empty workspace and show the created sample plan beside the instruction.
- What it teaches: Inline documentation teaches a primary workflow beside the place where the user performs it.
- Decision shown: Limit inline documentation to a single feature inside a high-value space, weighing visual asset maintenance and localization costs.
- Consider: Keep instruction proportional to the space and keep container state self-contained.

### Onboarding · guide a first task

- Example ID: `empty-states-onboarding`
- Type: **Interactive**
- Source mapping: mapped — `alternatives-onboarding`
- Scenario: Show progress through a few first steps, then let the user dismiss the guide and return to a simple workspace state.
- What it teaches: Onboarding helps a new user learn how to approach a multi-step capability when a two-line prompt is not enough.
- Decision shown: Pair optional onboarding flows with an underlying basic empty state in case users skip or dismiss the tour.
- Consider: Standalone Onboarding guidelines remain a future expansion in the reference; keep steps tied to immediate user goals.

### Starter content · orient the user with an example

- Example ID: `empty-states-starter-content`
- Type: **Interactive**
- Source mapping: mapped — `alternatives-starter-content`
- Scenario: Seed clearly labeled example data, then let the user clear it to inspect the empty-state fallback and restore the sample.
- What it teaches: Starter content gives users sample plans or pre-configured workflows to inspect before building their own.
- Decision shown: Use sample data or starter kits when exploring real configuration teaches faster than prose alone, always providing a basic empty state if users delete starter records.
- Consider: Mark sample content unmistakably so operators never confuse starter data with live operational missions.

## Maintenance rule

Treat the catalog as the source for status, summary, component shortlist, and design decisions. Treat page content as the source for section guidance and demo teaching. Treat the rendered demo as evidence only for the behavior it visibly implements. Update this guide and [pattern routing](../PATTERN_ROUTING.md) when the pattern changes. Never treat local examples as production services or operational policy.
