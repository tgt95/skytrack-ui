# Search

> A way to find relevant content with a word or phrase, including basic, active, and focused search.

- Pattern ID: `search`
- Catalog group: Core
- Source status: **Universal**
- Primary source: [maintained reference](../../../../../docs/carbon-ds-reference/patterns/search-pattern/index.md)
- Catalog entry: [catalog.ts](../../../../../src/showcase/pattern-library/catalog.ts)
- Page copy, source citations, and demo map: [page-content.ts](../../../../../src/showcase/pattern-library/page-content.ts)
- Local interaction implementation: [demos.tsx](../../../../../src/showcase/pattern-library/demos.tsx)

## Decision summary

**Use when:** Use search for open-ended discovery and add a scope filter when the searchable collection needs context.

**User outcome:** People can find an open-ended match, understand the result, and recover when nothing matches.

### Design decisions

- Always show the result count, including zero and counts for each scope; show loading when results take time.
- Support type-ahead or recent suggestions when they help the task, without requiring them for a small local list.
- Keep the query and clear action available and localize the field.
- A scope filter selects one category at a time and defaults to All or Any.

### SkyTrack UI implementation route

- Use Input for a direct search field and Command for searchable keyboard-driven choices.
- Return clear empty and loading states and expose result changes politely.
- Keep suggestion selection operable without a mouse.

**Candidate components:** `Input`, `Command`, `Button`. Verify each API against [component routing](../COMPONENT_ROUTING.md) and installed source.

## Source limits

- Deferred source scope: the maintained reference explicitly leaves dedicated Search results page layout design to future guidance.

## Guidance reference

### Overview

Select a search mode tailored to dataset size, query cost, and whether operators explore an entire workspace or a narrow sub-area.

#### Anatomy

- Search input container pairing leading magnifying-glass icon, clearable text entry, and accessible aria-label without a visible form label.
- Trailing clear (×) button clearing entered terms cleanly.
- Optional single-select scope dropdown defaulting to "All" or "Any".
- Optional submit trigger (required in Basic search; omitted in Active search).
- Focus-triggered recent/trending suggestions and typing type-ahead preview lists.
- Loading/progress feedback indicator and visible result count.

#### Types of search

#### Basic search

**Use when:** Queries run against large, costly, or remote datasets where waiting for explicit submit prevents wasted round-trips.

#### Active search

**Use when:** Small, fast tables or local catalogs where live per-keystroke filtering feels instant with no Search/Go button.

#### Focused search

**Use when:** Queries scoped to an active project, workspace, or category alongside a clear "See all results" widening path.

**Examples:** `search-find-and-narrow`.

#### Best practices

##### Avoid dead ends

Whenever queries match nothing, preserve what the user typed and surface helpful resets, spelling suggestions, popular categories, or scope widening so zero-match screens remain actionable.

##### Include a loading indicator

When searches take longer than a moment or two, show loading feedback matched visually to empty-state spacing, escalating to a progress bar with estimated completion time for heavy long-running scans.

**Examples:** `search-loading-and-rtl`.

##### Display the number of results

Always display matching result totals—including "0 results"—and expose counts per category option inside scope filters so operators judge breadth quickly.

**Examples:** `search-result-count-recovery`.

##### Do not render a visible field label

> **dont:** Identify search bars with the magnifying glass glyph, informative placeholder copy, and a screen-reader aria-label—never render a visible form label above or beside the search input.

##### Localize for right-to-left and regional scripts

Mirror search alignment, placeholder flow, clear icons, and scope dropdown ordering cleanly for right-to-left interfaces while keeping the magnifying glass icon immediately recognizable.

##### Add a single-select scope filter

Pair global search with a single-select scope dropdown defaulting to "All" or "Any" (executing as global Basic search unless narrowed) rather than forcing operators to pick multiple scopes upfront.

### Basic search

Use Basic search when querying broad or expensive indexes where execution only starts once the user commits via Enter or clicking Search.

#### Behaviors

##### Recent search suggestions

When focusing an empty Basic search input, display recent personal searches and/or trending queries to speed repeat navigation.

##### Type-ahead suggestions

Once typing begins, replace recent history cleanly with live type-ahead suggestions matching the entered prefix so users either jump straight to a record or submit the full query.

**Examples:** `search-preview-type-ahead`.

##### Results page

Submitting Basic search transitions users to a dedicated results screen hosting post-search attribute filters and result counts.

> **Source limit:** Source limit: detailed layout conventions for dedicated search results pages are marked for future guidance in the reference documentation.

### Active search

Use Active search inside fast local catalogs, tables, or dropdown pickers where filtering updates immediately on every keystroke.

#### Behaviors

##### Search field behavior

Omit explicit Search or Go buttons in Active search—include only the magnifying glass icon, specific helpful placeholder text visible until typing, and a trailing clear (×) button.

##### Presenting results

When filtering an inline page catalog or table, display all available records before typing starts. When Active search opens as a header dropdown panel, show recent queries on initial focus, swap to live filtered matches on typing, and optionally offer a bottom "See all results" fallback behaving like Basic search.

### Focused search

Focused search combines instant active matching inside the operator’s active mission, workspace, or resource folder with a clear escape hatch to widen scope globally.

#### Behaviors

##### Search field and category persistence

Surface session history and recent queries upon focus, refining interactively as characters are typed. When a user narrows Focused search to a specific subcategory, run filtered results cleanly and persist that chosen scope across subsequent queries in the session until the user clears it or ends the session.

##### Presenting results

Display matching counts clearly even at zero. Group unfamiliar destinations into categorized match clusters with "View all" links when users may not know where items live (or expose a scope dropdown when destinations are known), paired with a bottom "See all results" option widening beyond local context.

### Accessibility

#### Search and scope keyboard flow

- Search input: Tab enters the field; typing updates suggestions or input value; Enter submits in Basic mode.
- Scope selector: Tab reaches scope dropdown; Arrow keys open and browse options; Enter commits the scope and advances keyboard focus smoothly right into the search input.
- Type-ahead list: Down/Up arrows traverse options; Enter selects; Escape dismisses suggestions cleanly without clearing typed text.

#### Faceted filtering focus persistence

Move between facet groups via Tab, press Enter to step inside a facet group, navigate options via Arrow keys, and toggle selections via Enter—crucially holding keyboard focus anchored on that active facet checkbox/filter when live results reload so keyboard operators never have to Tab back down from the top of the page.

### Related components and patterns

**Related:** Search, Select & Command, Empty states, Filtering, Loading.

## Interactive and visual examples

### Find missions and narrow the result set

- Example ID: `search-find-and-narrow`
- Type: **Interactive**
- Source mapping: partial-divergent — `overview-types-of-search`
- Scenario: Compare Basic submit search, instant Active filtering, and workspace Focused search with an All/Any scope filter.
- What it teaches: Search finds items by open-ended queries while structured scoping and filtering narrow large results cleanly.
- Decision shown: Use Basic search (submit -> distinct results page) for broad costly datasets, Active search (no Search button; instant per-keystroke filtering) for fast small datasets, and Focused search (local scope + "See all results" widening) with persistent chosen subcategory filters.
- Consider: Default single-select scope filters to All or Any, surface recent searches on focus across modes, and show result counts per scope option.
- Boundary or simplification: Search use-case controls and result feedback are now contained in the same preview. Recent terms appear on focus in every mode, focused scope is a counted single-select, Basic results are labeled as a separate-results-page preview, and Focused can widen back to all missions. The local catalog still uses sample filtering rather than the package Search component (`catalog.ts` / `search.tsx`).

### Review result count and recover from no matches

- Example ID: `search-result-count-recovery`
- Type: **Interactive**
- Source mapping: mapped — `bp-display-result-count`
- Scenario: Show a live match count, then clear an unmatched term to recover the complete sample list.
- What it teaches: A visible count confirms query breadth immediately while zero-result recovery avoids search dead ends.
- Decision shown: Always display total result counts (including 0) and per-scope counts; offer clear query revision, reset scope, or suggested categories on empty matches.
- Consider: Keep the entered search text visible so the user can edit one term instead of starting over.

### Preview matches before opening the full result set

- Example ID: `search-preview-type-ahead`
- Type: **Interactive**
- Source mapping: mapped — `basic-type-ahead-suggestions`
- Scenario: For a short mission list, filter matches as the user types and show suggestions in place.
- What it teaches: Type-ahead suggestions surface high-confidence records as characters are entered while keeping full search submission available.
- Decision shown: Replace focus-triggered recent queries cleanly with matching suggestions once typing starts, supporting Arrow/Enter selection and Escape dismissal.
- Consider: Expose clear keyboard focus transitions from scope dropdowns into the input and keep result labels accessible.

### Signal a slow search and support right-to-left entry

- Example ID: `search-loading-and-rtl`
- Type: **Interactive**
- Source mapping: partial-divergent — `bp-loading-indicator`
- Scenario: Display empty-state-aligned loading/ETA feedback for slow scans and mirror RTL search containers cleanly without visible form labels.
- What it teaches: Slow-search loading keeps queries visible while reassuring users; localized right-to-left containers flip control layout naturally.
- Decision shown: Omit visible text labels on search inputs (rely on magnifying glass, helpful placeholder, and aria-label), show loading/progress ETA when heavy queries exceed a moment or two, and mirror controls cleanly for RTL locales.
- Consider: Keep the magnifying-glass metaphor clear and verify trailing clear icons and cursor direction in RTL layouts.
- Boundary or simplification: The RTL search input uses its aria-label, localized placeholder, and search icon without a visible field label, as specified. Loading is a local preview and no query is sent.

## Maintenance rule

Treat the catalog as the source for status, summary, component shortlist, and design decisions. Treat page content as the source for section guidance and demo teaching. Treat the rendered demo as evidence only for the behavior it visibly implements. Update this guide and [pattern routing](../PATTERN_ROUTING.md) when the pattern changes. Never treat local examples as production services or operational policy.
