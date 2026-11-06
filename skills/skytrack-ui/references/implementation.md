# Design System implementation rules

These rules govern code and component use. They apply in both execution modes.

## Research and plan Information Architecture

Before implementing a UI screen, page, or flow, research and analyze IA regardless of STRICT or YOLO. For an isolated control/component repair, inspect its parent screen and confirm whether the IA changes. Inspect the brief and references, existing shell/menu/routes, the closest screen/flow/spec, and relevant object/data model or process. Record concise findings and use them as evidence for an IA outline; do not infer product structure from visual styling alone.

Before choosing a layout, name the audience/role, task frequency and risk, object lifecycle, and
the decision or action the page supports. Map `role → task → object/data → page pattern → controls,
actions, and states`. Choose an overview, searchable object list, known-work queue, object detail or
edit page, analytical exploration, or guided sequence only when it matches the work. These are
decision aids inspired by the goal-oriented patterns in Carbon and task-specific Fiori floorplans;
do not copy their shell or require vendor floorplan names.

If project evidence is missing or conflicting about the user task, objects, or flow; no suitable pattern exists; or multiple plausible IA structures would materially change groupings, order, or task path, research external IA patterns for that assignment. Cite useful sources and compare them with SkyTrack's constraints; do not copy another product's structure without checking fit. If material uncertainty remains, ask only the decision needed to proceed under the selected mode.

For product UI, preserve established domain navigation and use the user's task flow to structure each screen. Reuse the existing shell, menu, route names, and placement; mark the active location. Add breadcrumbs only for genuinely nested routes when they improve orientation. Do not create duplicate navigation.

Group related information meaningfully, generally by domain object. Keep fields for one object together and order object groups by task sequence and dependencies. Split an object's fields only when the actual workflow requires it. Subdivide large groups by semantic relationship rather than an arbitrary field-count threshold. Keep required and safety-critical information visible; show what supports the current decision first and progressively disclose advanced or infrequent details.

Choose page structure by relationship and sequence: use sections for groups serving the same task, tabs for independent groups users move between, steps for sequential stages with clear inputs and outputs, and split view when users select an item and inspect or edit its details alongside it.

For enterprise lists, define the full list-to-detail path in the IA outline: search/filter scope,
current view, how a row opens its object, which actions apply to the page versus one row or a
selection, and how the user returns. Keep useful query/filter/view state when the user drills into
an object and back. Include first-use empty, no-results, filtered-empty, loading, permission, and
failure states; each should explain the current condition and the next useful action. On mobile,
decide how object identity, filters, selection actions, and list/detail navigation adapt. Do not
only compress the desktop layout.

Use semantic sections/headings or `Fieldset` to express relationships before adding a visual surface. Cards are flexible: add a surface when it clarifies a distinct module, state, or independent action; nested cards may express deeper abstraction when the content warrants it. Do not turn every subgroup into a card. For nested surfaces, use the `--accent` token; deeper levels may use an accent background with a chosen opacity such as `bg-(--accent)/20` (replace `20` with the rendered value selected for the context). Verify text/surface contrast in supported themes and adjust the tint/foreground as needed. Keep color token-linked.

For form grids, use one column on narrow screens and one to two columns as the desktop baseline. Let content justify up to four columns for short, same-level fields when higher density improves scanning. Choose each field's span from its control type and expected value length: long text, URLs, or descriptive values need more space; compact values may share a row. Preserve logical grouping and mobile order. Use a 16px form gap unless the reference or task specifies otherwise.

Create an evidence-backed outline before visual implementation. It should identify the user goal/primary task, navigation placement, screen sections and their order, object groups/subgroups, information/actions needed for decisions, any disclosure or multi-step pattern, responsive priority, and material assumptions. Use this compact shape when useful:

For every screen with visible headings, add a heading inventory before coding: heading text, parent
heading/group, semantic element/level, visual hierarchy level, and exact role class. Determine visual
level from the outline, not the tag name. A heading directly inside a Level 1 card is Level 2
(`text-lg font-medium text-(--foreground)`), even if semantic markup uses `<h3>`; its subgroup is
Level 3 (`text-base font-medium text-(--foreground)`). Verify every inventory row against code and
report.

```text
Evidence/findings:
User goal and primary task:
Navigation placement:
Hierarchy and order:
Object groups and subgroups:
Decision-critical information and actions:
Sections/tabs/steps/split view + why:
Disclosure and responsive priority:
Assumptions/trade-offs:
```

In STRICT, show this outline for Owner feedback before dependent implementation. In YOLO, prepare it before coding, proceed without an intermediate approval, and surface only material assumptions or IA trade-offs. Both modes use the outline for review.

Before completion, exercise 1–3 main-task scenarios against the implemented IA. Check that users can orient themselves, find the relevant object/information, see required or risk-critical details, understand the next action, and follow the grouping/order on mobile. Record any scenario or IA limitation that was not checked.

For complex product screens, use a compact traceability map during IA review:
`role → task → object → page pattern → information/actions → states → mobile behavior`. It makes
the outline checkable and helps catch generic dashboards, orphaned actions, lost list context, and
missing empty/error flows before implementation.

## Choose and size charts for legibility

Treat charts as tools for answering a data question, not as decorative card content. Before choosing one, record the user's comparison or decision task, the relationship in the data, required precision, number of categories/series, units and time range, whether this is an analytical chart or a compact preview, and the actual desktop/mobile viewports.

Use `Chart` or a local chart composition for historical, aggregate, comparative, or distribution data—even when it uses bars. Use `Progress` only for completion of an operation currently underway; use `Meter` for a current value against a known range. Do not assign `role="progressbar"` to a historical trend or category share because it has a filled bar. Verify the closest candidate against the installed exports, types, source, and compatible demo before selecting a fallback.

Choose an encoding that fits the task and data:

- Use a table or labeled values when users need exact lookup; use a visualization when comparison, trend, distribution, relationship, or spatial pattern is the task.
- Use bars or dots for category comparison, lines for time trends, and pie/donut only for part-to-whole data that totals 100% and has a small number of categories.
- Treat **five pie slices as the recommended maximum** and **four to five line series as a readability ceiling**. Above those levels, default to a sorted bar chart, small multiples, filtering/focus, or a companion table. Do not silently drop or merge categories unless that aggregation is semantically valid and disclosed. An exception needs a task/reference reason and must still pass the legibility checks below.
- Do not use 3D effects or rely on color alone to identify series/categories. Use direct labels, ordering, patterns, markers, or other redundant cues where they improve identification. Preserve valid scales and clearly label units, time ranges, and any non-zero or broken axis.

There is **no universal minimum pixel width or height** for every chart. Determine the usable plot area after accounting for the title, axis ticks/labels, legend, annotations, padding, and touch targets; inspect the rendered chart at the actual target desktop and narrow viewport. Pass the chart readability check only when:

1. A viewer can tell what is measured, the unit/time range, and the intended comparison or takeaway.
2. Relevant categories/series can be identified without color being the only cue; axes, labels, legend, and annotations do not overlap, clip, or truncate ambiguously.
3. Values and changes can be compared for the task. When exact values matter, expose them in visible labels or a semantic table; hover-only tooltips are insufficient. For interactive charts, support keyboard/focus as well as pointer/touch.
4. The chart and its labels fit without forcing tiny text, unreadable rotations, or page-level horizontal overflow. Check the actual mobile layout and the supported zoom/reflow behavior.

If any check fails, do not keep shrinking labels or compressing the plot. Change orientation, simplify ticks, move the legend, split into small multiples, add filtering, provide a table, or replace the chart with a compact summary that opens a full analytical view. A **40 × 40 px** graphic is icon-sized: it may serve only as a decorative cue for one simple metric or trend, paired with a visible label/value and access to full detail when precision matters. It cannot serve as an analytical preview of ten pie categories. For ten categories, choose a larger sorted bar/table or another valid decomposition, and expose exact values accessibly.

Treat these slice/series counts as evidence-informed defaults, not proof that every chart under the threshold is readable. Check the real data, reference, task, and viewport; state a material exception and its rationale. The chart-quality evidence is task-based: ask whether users can identify the takeaway, distinguish the relevant values, retrieve exact values when needed, and use the chart without relying on color or hover alone.

Evidence basis: [Cleveland & McGill, *Graphical Perception* (1984)](https://doi.org/10.1080/01621459.1984.10478080) compares accuracy across visual encodings; [CFPB data visualization guidance](https://cfpb.github.io/design-system/guidelines/data-visualization-guidelines) and the [UK Analysis Function chart checklist](https://analysisfunction.civilservice.gov.uk/policy-store/charts-a-checklist/) provide operational category/series and accessibility heuristics. The UK checklist explicitly avoids a universal label-size minimum because published charts can be resized; use rendered legibility checks instead.

## Inspect and compose

- **Load the installed package theme first:** every consumer of `skytrack-ui` imports
  `skytrack-ui/styles.css` exactly once from its app entry point. Before evaluating component
  appearance or heading fonts, verify the installed package manifest exports that stylesheet, open
  the installed stylesheet and its font asset references, record those reads, and add the import to
  the consumer. A source-checkout CSS file, `@import "tailwindcss"`, or matching class names alone
  does not load the installed theme, component styling, tokens, or bundled fonts. The final audit
  checks that the entry import exists and resolves.
- Before coding a screen or pattern, list every distinct UI need: controls, status displays, data
  presentations, and interactions. Group repeated instances, but do not omit a visual because it
  looks simple. Make a concise coverage map in the IA outline or implementation notes: UI need,
  likely component/composition, target package version/export, evidence checked, and reuse/custom
  decision. For an isolated repair, use a short inline map.
- Scan `skills/skytrack-ui/references/knowledge/COMPONENT_ROUTING.md` once to discover candidates.
  A router scan is discovery only; it does not complete the coverage map or authorize custom UI.
  Do not open unrelated component pages, source files, types, or demos.
- Before running the component gate, open and chronologically log the applicable root router
  ([`AGENTS.md`](../../../AGENTS.md)), [`skills/README.md`](../../README.md),
  [`skills/skytrack-ui/references/README.md`](README.md),
  [`skills/skytrack-ui/references/implementation-gates.md`](implementation-gates.md), this implementation
  guide, `skills/skytrack-ui/references/AGENT_GUIDE.md`,
  `skills/skytrack-ui/references/UI_RULES.md`, and
  `skills/skytrack-ui/references/knowledge/COMPONENT_ROUTING.md`. The preflight
  checker requires these reads and rejects app-source edits made before those reads. A guide read
  after coding does not satisfy the gate; refresh preflight after completing the required reads and
  before writing any UI.
- For every shortlisted candidate needed by the map, inspect the target installed version and
  export, the Developer guide, declaration/types, actual runtime implementation, and the closest
  compatible demo before implementation. Put exact paths and selected decisions in the map; a guide
  or router link is not proof that a file was inspected. If implementation source is not shipped,
  record that limitation and inspect the installed entry implementation; do not label declarations
  alone as source evidence. Read the Designer guide too when component choice, usage, behavior, or
  information priority needs a UX decision. Repeat inspection only when the component, API, or
  version changes.
- Keep independent charts as independent UI needs and reconciliation rows. A time trend and an
  outcome/category distribution remain separate chart needs even if both use `ChartContainer`.
  Cite the source range that renders each chart; a working chart elsewhere on the page does not
  verify another visualization.
- In a consumer, the resolved `node_modules/skytrack-ui` artifact governs. A source checkout with
  the same version string may still differ from the built tarball. Record installed exports and
  exact resolved type/source paths; record any discrepancy with documentation/source and do not
  invent or import an API absent from the installed artifact. A local test tarball must use a fresh,
  non-overwriting path and have its SHA-256 recorded. Never edit `node_modules/skytrack-ui` to make
  a probe pass. Give the pinned tarball to the checker with `--package-tarball`; preflight and final
  checks compare installed and archived file sets in both directions, compare each file byte-for-byte,
  and bind the tarball hash into the gate record. A changed installed file or tarball invalidates the run; preserve the evidence and
  start a fresh case after correcting the setup.
- Do not write UI for a mapped need until the pre-code component gate passes. Run:

  ```sh
  node skills/skytrack-ui/references/scripts/audit-ui-handoff.mjs --stage preflight \
    --source-root <app-source> --coverage <COMPONENT-COVERAGE.md> \
    --ia <IA-OUTLINE.md> \
    --gate-record PREFLIGHT-GATE-RESULT.md
  ```

  Add `--package-tarball <pinned-skytrack-ui.tgz>` only for a task that uses a pinned local tarball.

  To opt into read logging, set `DEBUG=true` and add `--read-log <FILE-READ-LOG.md>` to both
  preflight and final checker commands.

  Each row must identify the exact installed `node_modules/skytrack-ui/package.json`, export,
  declaration, runtime implementation, and closest compatible demo paths. If compatible source/demo
  is not shipped, state that and inspect the closest installed entry point. The checker validates
  each mapped path and installed export even when read logging is off. Re-run the gate when a
  component, export, or package version changes. Keep the generated gate record; the final stage
  checks that its evidence hashes still match and that app source changed after its PASS timestamp.
- Read logging is disabled by default. Only when the environment is exactly `DEBUG=true`, maintain
  `FILE-READ-LOG.md` chronologically by prefixing logger calls with `DEBUG=true`, for example:
  `DEBUG=true node skills/skytrack-ui/references/scripts/read-and-log.mjs --path <file> --reason <why>`.
  The helper records timestamp, content SHA-256, logger method, and read scope. Use `--heading
  "<exact heading>"` or a narrow `--lines` range for long references. A full-file `AGENT_GUIDE.md`
  read fails preflight only when DEBUG logging is enabled, unless the task explicitly audits the
  entire guide and both checker stages include `--allow-full-guide-read`. When DEBUG is unset or
  differs from the exact string `true`, do not invoke the logger or create/append the log, leave map
  log-entry cells blank or `—`, and omit `--read-log`. Component/source/type/demo inspection remains
  mandatory. If logging is enabled, report the actual numbered entry count; a read appended after
  preflight requires a new gate before coding.
- The map is a hard gate: do not implement a custom control, pattern, chart, or substitute markup
  for a mapped need until its candidates have been checked. If a supported component or composition
  fits, use it. If none fits, record the exact missing capability and why verified parts cannot
  compose it. Use a local fallback only for that gap, and keep supported library parts around it.
- Installed exports/types/source govern available API. Use demos as composition references only
  when compatible with that version. If no compatible demo exists, inspect implementation/types and
  disclose the missing demo; do not invent parts or props.
- Reuse supported components and compositions. Preserve required nesting, portals/positioners,
  semantic roles, keyboard behavior, focus handling, and accessibility associations.
- If no candidate or supported composition meets the requirement, state the concrete missing
  capability and why available parts cannot satisfy it. When the library meets only part of the
  requirement, retain that part and custom-build only the gap.
- Broad custom CSS is allowed using DS tokens and Tailwind utilities. Prefer supported variants/props
  when they fit. A substantially different visual design may justify a local component composed from
  library primitives. A visual preference or shorter implementation is not a capability gap. Fix a
  confirmed appearance defect through a verified prop, slot, class, or composition first. A fallback
  needs a concrete unmet behavior, semantic, accessibility, or visual requirement; record the
  attempted supported composition and why it cannot satisfy that requirement. Preserve verified
  APIs and accessibility; avoid copying library internals or brittle deep selectors.
- Use semantic HTML for structure and library controls for interactive parts. Create shared app
  components only when reuse is demonstrated; do not automatically promote route-specific
  compositions into the shared package.
- Before handoff, compare every distinct rendered UI need with the map. Confirm supported needs use
  their verified composition and every local fallback has the recorded capability gap. Recheck the
  actual component, token, and typography choices; typecheck alone cannot establish this. Prefer
  `DataTable` when search, sorting, selection, pagination, or column comparison fit. Use a native
  semantic table only for a small static lookup when those behaviors are unnecessary or a verified
  API gap requires it; record why. Use the installed Chart composition for historical or
  distribution data when it fits; do not substitute hand-built bars or `Progress`.
- Treat column visibility as an optional IA decision: include it only when the table's objects,
  roles, and tasks show that people need to customize visible columns. The DataTable demo is a
  reference, not a required feature list; omission does not need a separate IA note. In checked
  package version `0.1.5`, the component always renders `Columns` and has no table-level disable prop.
  Verify the installed version. Do not hide the internal control with consumer CSS or invent an API.
  If its unavoidable presence materially conflicts with the IA, record the gap and choose another
  supported table composition only if it meets the required data and interactions.
- `MeterIndicator` derives its fill from the parent `Meter` value. Do not add an inline width that
  duplicates or overrides that state; follow the installed Meter demo unless inspection proves a
  concrete package defect.
- Treat every chart that answers a different data question as a distinct UI need and map row, even
  when the charts share the same Chart export. A time-series trend and a category/outcome
  distribution have separate encodings, data, controls, and exact implementation ranges; never
  combine them in one row. Cite the JSX range that renders each chart, not an import or nearby use.
- Reconciliation must match code at every cited source range. Inspect that exact range and confirm
  it renders the component named in `Implemented with` for that UI need; a component used elsewhere
  in the file is not evidence.
- Add `CONTENT-AUDIT.md` for substantive/delegated screens. Inventory user-facing claims, status
  labels, numeric metrics, date ranges, and next actions; cite the supplied prompt/source, identify
  each item as sourced, synthetic sample, or local simulation, record its dataset scope and
  consistency check, and point to its visible disclosure and code location. Synthetic operational
  data must be labeled as a local sample/demo where it could look live. Keep related totals,
  percentages, cohorts, and dates coherent or label distinct scopes. Never invent live telemetry,
  safety policies/thresholds, or prescriptive operational instructions. If policy is unavailable,
  state that fact and keep follow-up wording neutral; generic “approved guidance” text is not proof
  of an actual directive. Local simulations must visibly state that no live system changed.
  `CONTENT-AUDIT.md` must use `Source evidence` and `Consistency / Calculation` columns. For sourced claims, give the opened
  `file:line` and an exact quoted excerpt that supports the claim; generic labels such as
  “Prompt requirement,” “official,” or “design policy” are not evidence. A synthetic-only row must
  say it is worker-created sample data and makes no policy/operational claim. Give every rendered
  per-record `nextAction`, threshold, cutoff, and operational recommendation its own row, including
  repeated per-record actions. Only the exact cited excerpt supports the wording it contains;
  citing another line in the same file does not authorize unrelated values or actions. The
  implementation and generated audit/report files are not product-policy sources. A sample
  disclosure does not authorize directive copy. When the provided prompt and opened source files do
  not authorize an operational command, remove it or use neutral wording that explicitly says no
  authorized action was supplied; do not infer a flight command from the metric or status.
- Audit safety/severity labels as claims too. Do not assign warning/critical/reserve status from a
  synthetic percentage when no supplied policy defines its meaning. Use neutral sample wording or
  clearly mark the label as illustrative-only and not an approved operational classification.
  Audit every rendered status/severity label, including badges and per-record classifications.
  Synthetic classifications must be explicitly illustrative-only and not approved policy; a general
  sample-data banner does not authorize a safety classification. Aggregate labels must be calculated
  from the stated dataset, not copied from one record or invented independently. Record the exact
  formula, input rows, resulting value, and scope in the content audit. Keep totals, percentages, and
  dates mathematically consistent; a separate synthetic metric must name its separate scope. For a
  displayed category distribution, record `count / total × 100`, the rounding precision, and
  `Displayed rounded shares: sum(...) = N%` in `Consistency / Calculation`; verify that sum against
  values actually rendered. Do not claim the rounded shares total 100.0% when the calculation differs
  or silently adjust one category to force 100%.
- Add `INTERACTION-AUDIT.md` with the primary action and one meaningful control: expected change,
  implementation source, observed visible result, and browser-evidence path. The worker leaves each
  observation `PENDING` or `NOT RUN`; only the coordinator may mark it `PASS` after desktop browser
  interaction and attach a screenshot or saved DOM evidence file. In the desktop browser, exercise each and
  verify that its dependent state/data actually changes. A changed trigger label with unchanged
  dependent chart/list is not a functioning filter. Do not claim browser verification from source or
  typecheck alone. Mark observations `PENDING` until desktop browser evidence exists; only the
  coordinator may mark a row `PASS` after observing the result. The final review compares the audits
  with the code and rendered interface.
- Report prompt identity as UTF-8 byte count and final-newline status; do not report string character
  count as bytes. The shared audit checks the count against the preserved prompt literal.
- For package-wide guidance in `AGENT_GUIDE.md`, open only the relevant heading to limit context.
  When `DEBUG=true`, the preflight checker also requires a logged heading or narrow line range and
  rejects any full-file read. Only a task auditing the entire guide may pass
  `--allow-full-guide-read` to both checker stages. With DEBUG on, use
  `DEBUG=true node skills/skytrack-ui/references/scripts/read-and-log.mjs --heading "<exact heading>"` to
  display that section while hashing the complete file. For product/visual decisions use `UI_RULES.md`; for API facts trust the target
  installation's exports, types, and source.

## Enforce component evidence and content at handoff

Treat each distinct visible primitive as its own need, including nested pieces inside a card, table,
chart, or alert. A parent row does not cover a meter, filled bar, badge, selector, or action rendered
inside it. Before coding, the map must show the candidate and decision for every such need. At
handoff, reconcile the map against the rendered interface and code; any visible need missing from
the map, or any mapped library component replaced by custom markup without an evidenced gap, fails
the gate.

For a native table, create its own coverage row, list `DataTable` as a candidate, and record why it
is a small static lookup and why the verified API is unnecessary or mismatched. Count authored
semantic markup accurately; do not claim zero custom tables when a native table is present. For each
custom inline range/bar indicator, compare the installed Meter, Progress, or Chart candidate and
state why none fits. A hand-built width/fill div is not exempt because it appears inside a table
cell.

For every coverage row, verify the named subpath against `node_modules/skytrack-ui/package.json`'s
actual `exports`; record the exact resolved declaration and runtime paths under that installed
  package. A source-checkout declaration/runtime file, even at the same version, cannot prove the
  consumer API. A missing installed source file is an explicit evidence gap: inspect
the installed export target and record the limitation before the preflight gate. Use the nearest
compatible demo as a composition example, then validate every part and prop against installed
types/runtime. Do not start UI implementation until the shared preflight gate accepts these exact
paths. When `DEBUG=true`, the gate also validates their opened read-log rows.

Add a `Component map reconciliation` table to `IMPLEMENTATION-RECONCILIATION.md` with columns
`Coverage row`, `UI need`, `Implemented with`, `Source location`, and `DOM evidence`. It must have
one row per numbered coverage row and cite the actual app source line. State the expected element or
role and what the coordinator should see in the browser. The coordinator checks this mapping against
the implementation and rendered desktop UI; a self-reported map is not independent proof.

Let text inherit the typography set by its owning `skytrack-ui` component or parent. When neither
sets a size, use the body's default. Do not add `text-base` just to normalize ordinary copy or to
override a component's own `text-sm`, `text-xs`, or other documented size. Component defaults are
intentional; a below-body default is not automatically a defect or an exception. Use explicit size
utilities only when a named visual role, documented component variant, or verified design
requirement calls for them. Keep `.sub-heading` limited to its documented eyebrow, assistive-label,
sidebar-group, and option-menu-group roles; use heading-role classes independently of HTML heading
levels. A Report card title uses `.h4`, with its semantic heading tag determined by the outline.

For substantive or delegated UI work, add `COMPONENT-TYPOGRAPHY-AUDIT.md` with one row per relevant
text-bearing component/slot, recording installed default, effective size, role, any consumer
override, and exact source/type/demo paths (add read-log IDs only when `DEBUG=true`). Include `Badge`, `SelectItem`, chart axis/tooltip/legend,
`DataTable` header/cells, `FieldLabel`, buttons, and `Meter` as applicable. Distinguish library
defaults from consumer overrides: a below-base component default is intentional and does not need a
reset or exception justification. Audit authored below-base/arbitrary utilities and deliberate
changes, and compare the record with the actual code. A selected control must show its
human-readable label, not its raw machine value.

Preserve component-owned typography, casing, tracking, and documented visual defaults. Use public
props, slots, and supported compositions for task-specific requirements. Do not target internal
library classes from consumer CSS for visual normalization or preference, and do not add styled
children merely to counter component typography.

An internal-class CSS override is allowed only to repair a reproduced functional or accessibility
defect after verifying no public API, supported slot, or composition can fix it. Visual preference,
density alone, or a wish to make every component 16px is not an exception. An agent may apply an
evidence-complete repair without prior Owner approval. Scope the selector under a unique wrapper to
the exact component/class; never use a global selector. Record the inspected API/types, package
version and runtime source, closest demo, attempted alternatives and why each failed, and screenshot
or reproducible steps. Validate the repaired behavior/accessibility and include evidence in the
handoff; missing evidence fails the handoff. Preserve `DataTable` header/cell defaults and `Badge`
default size, uppercase, and tracking;
do not add redundant `text-base`, `normal-case`, or blanket CSS overrides.

Before handoff, verify heading-role classes against the outline, check computed heading families
when browser evidence is available, and confirm badges/labels do not wrap into fragments, clip,
overlap, or overflow their containers.

Every page route must expose exactly one `main` landmark. Record it and every visible heading in the
IA outline. For delegated/substantive UI work, add `IMPLEMENTATION-RECONCILIATION.md` mapping each
outlined landmark and heading to its code location and rendered DOM tag/role. An outline entry with
no matching source/rendered evidence is a failed handoff. At desktop runtime, exercise one primary
action and one meaningful control and confirm the visible result. If the interaction simulates a
real operation, confirm the UI continues to state that it is simulated. Date/range labels must match
the represented dates; only use Q1/Q2 when the applicable fiscal calendar is defined.

Keep implementation-policy explanations out of product copy unless they help the user task. Identify
synthetic data as illustrative where it could be mistaken for live operations. Do not invent numeric
safety thresholds, severity cutoffs, regulatory claims, or imperative operational actions. A sample
disclaimer does not make an invented policy valid. Use cited Owner/source policy; if none is supplied,
state that the policy is unavailable and direct people to approved operating guidance. Do not infer
flight actions from synthetic values. Never invent a policy document name, section number, contents,
or authority. A citation is valid only when its source was supplied or actually inspected; when
`DEBUG=true`, the read log must also show it was opened. The checker validates the cited file and
exact excerpt in either mode. Otherwise use a generic reference to approved operating guidance. If a local demo simulates a real
operational action, label the action/result in product UI as simulated and state that no live system
changed; a report disclaimer is not enough.

When `DEBUG=true`, log prompt and instruction files when actually opened. If a rule was injected by
the runtime and no file was read, identify it as injected instead of claiming a read. Count actual
read-log entries, not Markdown lines. With logging off, do not create a read log or report read-log
counts. Before handoff, compare every material report claim with the code, map, and evidence. A claim that says a component,
type size, token, or content rule is satisfied when the implementation contradicts it fails the gate;
the map and narrative do not override the code.

A handoff is not COMPLETE when mapped source/type/demo paths are missing, enabled DEBUG logging does
not substantiate the map, a fallback has no specific capability gap, content claims lack source/sample
framing, or a rendered UI need differs from its mapped decision. Typecheck success does not waive this gate.

### Run the deterministic handoff audit

For substantive or delegated UI work, run `node skills/skytrack-ui/references/scripts/audit-ui-handoff.mjs --stage preflight`
before code. After implementation run `--stage final` with `--source-root`, `--coverage`,
`--typography`, `--report`, `--ia`, `--reconciliation`, `--component-typography`,
`--semantic-colors`, `--radius-audit`, `--content-audit`, `--interaction-audit`, and the same
  `--package-tarball` and `--gate-record`. Add `--read-log <FILE-READ-LOG.md>` to both stages only
when `DEBUG=true`; prefix logger commands with the same exact environment value. The final stage
requires exactly one installed `skytrack-ui/styles.css` import and resolves/inspects its installed
export directly. Add `--require-main` for page routes. For prompt probes,
also pass `--prompt-file`, `--prompt-source`, and `--prompt-constant`; report prompt identity using
the exact UTF-8 byte count and final-newline status. Final audit checks native tables/controls,
text-size audit entries and any documented component-default deviations, main-landmark evidence, radii,
semantic colors, content/interaction audit structure, reconciliation, optional DEBUG read-log counts, and prompt
bytes. Include both commands and exit results. Any failure blocks completion; fix it and rerun.

The checker does not replace the API or visual review. For every native `<table>`, inspect a separate
coverage row that compares `DataTable` and names the actual requirement for native markup. Scan every
chart's config, data fields, and mark props to confirm a declared category color is actually read and
applied to the corresponding mark; an unused `colorVar` or a single series color does not prove a
categorical palette. Re-read every below-base source line from the final code and record its actual
expression, rendered/effective size when known, hierarchy role, and reason. Do not copy planned sizes
into the audit. If the browser was not inspected, call the values declared/inferred, not computed or
verified. A report claim that disagrees with code, checker output, or the available runtime evidence
is a failed handoff.

## Tokens and reference fidelity

1. Use the nearest appropriate DS token. For semantic states, use the matching utility such as `text-success`, `text-warning`, `text-destructive`, or `text-info`; do not substitute raw palette classes such as `text-amber-600` or `bg-emerald-500`. Preserve the meaning of success, warning, error, and neutral states.
2. For non-status chart categories, use an existing categorical palette when the installed library provides one. If it does not, derive distinct colors from existing CSS variables with `color-mix()` or relative OKLCH so theme changes propagate. Keep values identifiable through labels or another visual cue, and check contrast in supported themes. If available tokens cannot distinguish the data accessibly, record the gap and propose a token; do not add shared tokens without authorization.
3. Let ordinary interface text inherit from its owning component/parent; if neither sets a size, use the body default. Do not add `text-base` to normalize component defaults. Use named size utilities only for an established visual role or documented component variant, and avoid arbitrary pixel sizes unless a verified reference requires them and standard sizes cannot match it.
4. Apply heading-role classes (`.h3` page title, `.h4` Level 1 card title) to semantic heading elements. When browser access is available, verify computed heading `font-family` and loaded font assets; diagnose stylesheet/font delivery before changing size or adding a local font workaround. Do not override the role font through a generic font utility.
5. Use the 2px `--radius` token for ordinary surfaces and controls. Keep full circles only for genuinely circular elements such as avatars, radios, and status dots. Chart bars/areas stay square by setting mark radius to `0`; chart containers use the 2px token.
   For substantive/delegated work, record every authored rounded utility, literal radius, and chart-mark radius in `RADIUS-AUDIT.md`; the final checker rejects non-token radii and undocumented circular shapes.
6. Explicit faithful references govern visual appearance, content, hierarchy, ordering, density, and layout. Use DS tokens and Tailwind utilities to match them while keeping valid component composition. For inspiration work, preserve the agreed interpretation rather than pretending it is a pixel copy.
7. Inspect the actual reference image. When handing work to another agent, provide a readable image or attachment, target route, image-to-route mapping, and checkable acceptance criteria. If essential source material is unavailable, obtain it or an approved specification before inventing dependent details.

## Behavior, responsive design, and verification

1. Retain library behavior/a11y and add appropriate hover, focus, disabled, loading, empty, and validation states for the requested flow. Use local data for demos. Visible controls should perform their advertised local action or clearly communicate their unavailable state; do not imply a real backend action occurred.
2. At desktop, follow the reference. Adapt mobile while preserving content and priority. Keep wide table overflow local to the table, rather than making the entire page scroll horizontally. Use target viewports from the brief; otherwise choose and report representative desktop and mobile sizes.
3. Before declaring completion, run the relevant focused typecheck (for a project without a typechecker, use its applicable syntax/lint check and state that typecheck is not applicable); inspect actual browser screenshots at desktop and mobile sizes; compare against the reference; and exercise principal interactions and relevant states. Verify that utility classes actually render, including responsive layout, overlays, multiline values, and error treatment. Follow the project's build policy; a build is not automatically required.
4. Report checks not run, failures, and material mismatches accurately. A successful typecheck or HTTP response does not prove visual fidelity. Do not mark unverified criteria as passed.
5. Resolve routine gaps inside the app. Propose shared-library fixes/extensions and edit that library only when the task authorizes it. Mode selection alone does not expand this authority.

## Examples

- Segmented tabs: verify the installed Tabs API and choose its filled variant when available; preserve required part composition instead of hand-building clickable spans.
- DataTable exists: inspect its API and demo and use them when they fit. For requirements outside that API, use semantic `<table>`, `<thead>`, `<tbody>`, `<th scope=...>`, and `<td>` with DS tokens; compose supported library controls around it and state the concrete gap.
- Derived tint: `color-mix(in oklch, var(--brand-500) 12%, transparent)` remains linked to the brand token. Confirm that the token exists and the resulting contrast works in each supported theme.
- A native heading tag defines document semantics; its class defines visual size. A reference-specific display heading may override the default visual scale without changing semantic level.
