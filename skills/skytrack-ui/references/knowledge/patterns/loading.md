# Loading

> Feedback that shows work is in progress, how much is complete, or when more content is available.

- Pattern ID: `loading`
- Catalog group: Core
- Source status: **Universal**
- Primary source: [maintained reference](../../../../../docs/carbon-ds-reference/patterns/loading-pattern/index.md)
- Catalog entry: [catalog.ts](../../../../../src/showcase/pattern-library/catalog.ts)
- Page copy, source citations, and demo map: [page-content.ts](../../../../../src/showcase/pattern-library/page-content.ts)
- Local interaction implementation: [demos.tsx](../../../../../src/showcase/pattern-library/demos.tsx)

## Decision summary

**Use when:** Use a loading indicator for delayed work; choose skeletons for content-shaped placeholders and progress only when measurable.

**User outcome:** Honest, well-placed progress feedback reduces uncertainty without promising work the system cannot measure.

### Design decisions

- Place the indicator in the area that is loading, or use a full-screen treatment only when the entire page is blocked.
- Use progressive loading when useful content can appear before the full result.
- Keep updates perceivable and do not invent a completion percentage.

### SkyTrack UI implementation route

- Use Progress with a value only when the amount of completed work is known.
- Use content skeletons or a concise status message for unknown duration.
- The example advances local state and does not start background work.

**Candidate components:** `Progress`, `Button`. Verify each API against [component routing](../COMPONENT_ROUTING.md) and installed source.

## Source limits

- SkyTrack UI package constraint: SkyTrack UI ships `Progress` (`progress.tsx`) and does NOT currently ship dedicated `Skeleton`, activity spinner `Loading`, or `InlineLoading` primitives. Local examples use pulse placeholder geometry and indeterminate `<Progress value={null}>` bars strictly as visual stand-ins.

## Guidance reference

### Overview

Select loading treatments by how predictable the layout is and how long the operation lasts:

| Estimated duration & context                  | Recommended loading mechanism                                                                                      |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Sub-3 seconds / initial known layout load     | Skeleton states (animated placeholders for containers and primary data blocks)                                     |
| Unknown wait > 3 seconds                      | Activity spinner (inline for a local control/row, full-screen only when entire page is blocked)                    |
| Measurable duration exceeding a moment or two | Determinate progress bar reporting real progress (never swap a bar for short indeterminate spinners in production) |
| Background job taking several minutes or more | Hand off cleanly and notify the operator via notification when finished                                            |

### Skeleton states

Use animated skeleton blocks solely on initial page loads lasting at most a few seconds when the target container shape is known ahead of arrival. Render skeletons for structural cards, tiles, structured lists, and data tables—leaving interactive action controls omitted or inactive until ready.

> **dont:** Never place skeletons on interactive buttons, form inputs, checkboxes, toggles, toast notifications, overflow menus, dropdown options, loading spinners, or outer modal frames (skeletonize only inner modal body data).

**Examples:** `loading-skeleton-list`.

### Loading indicators

Indeterminate activity spinners report active work without inventing fake percentages once a wait passes roughly three seconds; promote to a determinate progress indicator once meaningful steps or completion percentages can be measured—and avoid stacking multiple simultaneous spinners on one view.

> **Source limit:** SkyTrack package note: because spinner primitives (`Loading`, `InlineLoading`) are not yet present in SkyTrack UI, the measured progress demo sits here alongside indeterminate progress-bar stand-ins.

**Examples:** `loading-measured-progress`.

#### Full-screen loading

Use a full-screen blocking spinner overlay sparingly only when saving, switching tenant environment, or recalculating page-wide state prevents safe interaction across the entire viewport.

**Examples:** `loading-full-screen-save`.

#### Inline loading

Scope an inline spinner directly to the triggered button, row, or form panel while the rest of the workspace stays usable. While active, disable both the triggering action and dependent actions like Cancel; transition cleanly to a brief finished checkmark (~1.5s before invoking the follow-up completion callback) or revert to inactive alongside an inline error alert on failure.

**Examples:** `loading-inline-check`.

### Progressive loading

Staged progressive loading accelerates large multi-source dashboards and complex faceted tables by rendering core structure in priority order instead of blocking behind one global spinner:

- Batch 1 (render immediately): layout containers, non-data UI chrome and headings, and lightweight skeletons for primary data values.
- Batch 2+ (stream asynchronously): heavy charts, offscreen table rows, secondary action controls, and delayed imagery—reserving fixed empty negative space matched to final image dimensions (e.g., 600×600px) rather than mandatory skeleton boxes so layouts never jump.

### Load more options

Pair truncated database-backed feeds or tables with an explicit "Load more" control to retrieve additional batches asynchronously while keeping scroll stability and current context intact.

**Examples:** `loading-batch-collection`.

### Accessibility

Expose loading, busy, stalled, and failed transitions programmatically using `aria-busy` on updating containers and polite live regions so non-visual operators know whether work is still underway, stalled, or finished without polling visually.

### Related components and patterns

**Related:** Progress, Notifications, Dialogs.

## Interactive and visual examples

### Show measured task progress

- Example ID: `loading-measured-progress`
- Type: **Interactive**
- Source mapping: mapped — `loading-indicators`
- Scenario: Display real completion percentage when upload or processing stages are measurable and run past a brief wait.
- What it teaches: A progress indicator reports how much of a task is complete when the system can measure real step progress.
- Decision shown: Use measured progress indicators once work exceeds a moment or two with real completion steps; use an activity spinner when duration cannot be measured.
- Consider: Never invent synthetic percentages, and transition cleanly to completion or failure recovery.

### Keep an inline check responsive

- Example ID: `loading-inline-check`
- Type: **Interactive**
- Source mapping: partial-divergent — `loading-inline`
- Scenario: Show local activity feedback for one connection check without blocking the rest of the page; the sample keeps its trigger and Cancel check unavailable while active.
- What it teaches: Inline loading communicates that a single control or region is busy while sibling workflows remain interactive.
- Decision shown: Disable the trigger and related Cancel controls while active, transition through a brief finished confirmation (~1.5s) before follow-up actions, or revert with an inline error on failure.
- Consider: SkyTrack UI lacks `InlineLoading` spinner primitives, so this local demo substitutes an indeterminate `<Progress value={null}>` bar.
- Boundary or simplification: Uses the supported indeterminate Progress composition and a separate completion control for the local preview; it does not simulate the source 1.5s transition or failure recovery.

### Block the page while a save completes

- Example ID: `loading-full-screen-save`
- Type: **Interactive**
- Source mapping: partial-divergent — `loading-full-screen`
- Scenario: Cover an entire blocking workflow temporarily so conflicting mutations cannot occur during critical save processing.
- What it teaches: A page-level busy overlay signals that a save or workspace switch blocks safe interaction until finished.
- Decision shown: Reserve blocking overlays strictly for full-context operations lasting > 3 seconds; isolate local tasks with inline loading instead.
- Consider: Ensure overlay scrims cover or disable triggering controls as well as body inputs and announce completion clearly.
- Boundary or simplification: The local overlay blocks its sample content; a labeled demo control remains outside so readers can end the preview. A real page-level save should block the rest of the page.

### Load a collection in batches

- Example ID: `loading-batch-collection`
- Type: **Interactive**
- Source mapping: partial-divergent — `load-more-options`
- Scenario: Reveal the next sample batch on request while preserving the list and making the end of the collection clear.
- What it teaches: A Load more control reveals the next portion of a collection without forcing a full-page reload.
- Decision shown: Pair incremental initial batching with Load more when operators scan sequentially; consider multi-batch progressive loading (containers first, reserved whitespace for delayed media) on large dashboards.
- Consider: Preserve scroll focus/position and announce loading state cleanly.
- Boundary or simplification: The local sample reveals its next records immediately and says it does not fetch data or simulate network delay.

### Reserve the shape of a list while its first data loads

- Example ID: `loading-skeleton-list`
- Type: **Visual reference**
- Source mapping: partial-divergent — `skeleton-states`
- Scenario: Preview known container and text structure on brief initial loads without skeletonizing buttons, menus, toasts, or outer modal shells.
- What it teaches: A skeleton previews known structural layout during brief (< a few seconds) initial page loads.
- Decision shown: Use skeletons strictly on containers and data blocks (cards, list items, table data, inner modal bodies)—never on action buttons, inputs, menus, dropdown items, toast alerts, or outer modals.
- Consider: Expose loading regions with aria-busy rather than misleading static `role="img"` placeholders alone, and show content immediately upon arrival.
- Boundary or simplification: The local pulse-bar illustration now exposes `aria-busy` on its containing region and hides decorative bars from assistive technology; the package still has no Skeleton primitive.

## Maintenance rule

Treat the catalog as the source for status, summary, component shortlist, and design decisions. Treat page content as the source for section guidance and demo teaching. Treat the rendered demo as evidence only for the behavior it visibly implements. Update this guide and [pattern routing](../PATTERN_ROUTING.md) when the pattern changes. Never treat local examples as production services or operational policy.
