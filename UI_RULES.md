# UI implementation policy

This is the compact source for SkyTrack-specific product and visual decisions. Use the root
[`AGENTS.md`](../../../AGENTS.md) router to load the relevant section for the task. For component
selection, use the [component decision index](knowledge/COMPONENT_ROUTING.md), map each distinct UI
need to a candidate, and verify the candidate before implementation. Do not custom-build a need
until that check confirms a concrete capability gap. Open only shortlisted component guidance; do
not load all component pages or the full package guide by default.

For implementation process and review criteria, use the relevant sections in
[`design-system-implementation.md`](../../../agents/design-system-implementation.md). These rules
apply even when the skill is not invoked.

Every consumer imports `skytrack-ui/styles.css` exactly once from its app entry point. Verify the
installed export and stylesheet before judging component visuals, tokens, or heading fonts; Tailwind
utilities or source-checkout CSS do not load the installed package theme. Log installed stylesheet
and font-asset evidence for delegated work and confirm computed page/card heading families in
browser review.

The component map is a hard pre-code gate, not a suggestion. Map every distinct visible control,
status treatment, data presentation, and interaction, including nested visuals inside cards and
tables (for example, a per-row battery meter, badge, or action). A parent surface or component does
not cover its child needs. Each row names the exact installed package version/export, declaration
path, runtime implementation path, closest compatible demo path, read-log entries, and selected
composition before that need is implemented. A routing row or documentation link alone is not
evidence. In consumer apps, the installed node_modules/skytrack-ui artifact is authoritative;
matching version numbers do not prove source and tarball contents match. Record and resolve artifact
mismatches before choosing a fallback. If the package does not ship readable implementation source,
state that and inspect the actual installed entry implementation instead of claiming source was read.
For delegated implementation and Owner-requested rule probes, log actual reads chronologically in
FILE-READ-LOG.md while working. At handoff, reconcile every rendered need with the map and code;
an evidence row is verified only when its exact package, declaration, implementation, and demo reads
are present in the log. A missing row, unsupported substitute, or unexplained fallback fails the
handoff even when typecheck passes. Before writing UI for a mapped need, run the shared checker with
`--stage preflight` and stop that slice until it passes. Keep its `PREFLIGHT-GATE-RESULT.md`; final
audit validates its map/log/IA hashes and verifies app source changed after the PASS timestamp. A
selected component, export, version, or evidence change invalidates the gate and requires a rerun.
For delegated work and rule probes, open auditable files with
`node agents/scripts/read-and-log.mjs --path <file> --reason <why>` so the read and its timestamp,
content hash, logger method, and read scope are recorded together. For a multi-section guide, use
`--heading "<exact heading>"` (preferred) or a narrow `--lines` range to display only relevant
content while hashing the full file. A full-file read of `AGENT_GUIDE.md` fails the pre-code gate
for ordinary implementation and rule-probe tasks. A task explicitly auditing the entire guide
must pass `--allow-full-guide-read` to both checker stages. The checker requires these
helper-marked rows; do not manually recreate read history after the fact.
Prefer installed components and compositions. A style preference alone does not justify replacing a
component; fix confirmed appearance defects through supported props/slots/classes first. A local
fallback requires a concrete unmet behavior, semantic, accessibility, or visual constraint and
evidence why verified installed parts cannot satisfy it.

The preflight requires chronological reads of the root router, implementation guide, package guide,
these compact rules, and the component routing index before application source changes. For a pinned
local-tarball probe, pass `--package-tarball`; preflight and final compare installed and archived
file sets in both directions, compare each file byte-for-byte, and bind the artifact SHA-256 into the
gate. Never modify installed
`node_modules/skytrack-ui` files. A missing rule read, early source edit, or package mismatch fails
the gate and requires a new isolated case after setup is corrected.

For a complete delivery workflow or creative direction, use
[design-system-delivery](../../../.agents/skills/design-system-delivery/SKILL.md).
Ask STRICT/YOLO only when starting that workflow and the mode is not already supplied.
Routine application of implementation rules does not require selecting a mode.

The implementation rules reflect the Owner's 2026-10-30 wizard decisions:
explicit visual references override default visual scales; installed APIs govern valid
composition; token-based custom styling and locally composed components are allowed.
Shared-library changes require task authorization. Preserve project browser/build policy.

See [DESIGN_SYSTEM_BENCHMARK.md](DESIGN_SYSTEM_BENCHMARK.md) for the dated source comparison of
Fluent 2, Carbon, and SAP Fiori and the rationale behind this synthesis. It is a reference note;
the SkyTrack rules below and in the linked implementation guide govern implementation.

## Information Architecture

Before implementing a screen, page, or flow, research and analyze IA. For an isolated control/component repair, inspect its parent screen and confirm whether IA changes. Inspect the brief/reference, existing shell/menu/routes, nearest screen/flow/spec, and relevant object/data model or process. Summarize findings as evidence for an IA outline. If evidence is missing or conflicting, no suitable pattern exists, or plausible IA choices materially change grouping/order/task path, research external patterns for that assignment, cite useful sources, and compare them with SkyTrack constraints.

Before choosing structure, identify the audience/role, task frequency and risk, object lifecycle,
and decision/action. Map `role → task → object/data → page pattern → controls/actions/states`.
Choose an overview, object list, known-work queue, object detail/edit page, analytical exploration,
or guided sequence only when that task needs it. For list-to-detail work, specify filter/view state,
row navigation, page/row/selection action scope, return behavior, and empty/loading/permission/error
states. Preserve useful context on return and decide how these relationships adapt on mobile. Full
IA method and rationale: [design-system-implementation.md](../../../agents/design-system-implementation.md#research-and-plan-information-architecture).

For product UI, inherit the established domain navigation and structure page content around the task. Keep each object's fields together; order object groups by task sequence and dependencies. Split fields only when workflow requires it. Use sections for groups serving one task, tabs for independent groups, steps for sequential stages with clear inputs/outputs, and split view for selecting an item while viewing/editing its details. Add breadcrumbs only for nested routes where they aid orientation; do not duplicate navigation.

Group information by meaningful object and relationship; subdivide large groups semantically. Show decision-critical and required/safety details clearly; progressively disclose advanced or infrequent information. Prefer semantic headings/sections or `Fieldset` before surfaces. Cards remain flexible by abstraction level; nested surfaces may use `--accent` or a deeper opacity tint such as `bg-(--accent)/20` (choose opacity for context), with text contrast checked in supported themes. Do not make every small group a card by default.

Form grids use one column on narrow screens and one to two as the desktop baseline; allow up to four when short peer fields benefit from density. Set field spans from control type and expected content length, and retain logical mobile order. Use 16px gaps unless the reference or task requires otherwise.

In STRICT, present the evidence-backed IA outline at a checkpoint before dependent implementation. In YOLO, form it before coding and surface only material assumptions/trade-offs. Both modes review with 1–3 main-task scenarios: can users orient themselves, find the relevant object/information, see required/risk data, understand the next action, and scan the groups/order on mobile? Record untested scenarios or IA limits.

## Uppercase labels and group titles

Apply `.sub-heading` to page/section eyebrow labels, secondary/assistive labels paired with `FieldLabel`, sidebar group titles, and option-menu group titles; this class renders those labels uppercase. Add a context-appropriate text-size utility when needed; use `text-xs sub-heading` for compact field labels. Do not recreate its uppercase, tracking, weight, or muted-color typography in local classes. Regular page and content headings follow their own heading-role styles.

## Typography and color

Use text-base for ordinary interface copy, data labels, table cells, and chart labels. Use smaller
named sizes only to show a clear subordinate level, such as metadata, helper copy, or compact field
labels. Apply the smaller size to that element, not an ancestor that also contains ordinary data.
Audit inherited typography: a `text-sm` class on `<table>`, `<tbody>`, a card, or another ancestor
also makes ordinary descendant cells small unless they explicitly reset to `text-base`. Keep table
data and category/axis labels at `text-base`; do not shrink them to fit a crowded chart or table—
change the layout, chart height, label treatment, or information grouping instead.

Before handoff, inventory every visible below-base size, including sizes inherited from ancestor
classes/styles, chart/SVG tick styles, component size props, and arbitrary pixel/rem values. Record
the exact element or code location, computed/inherited size where available, subordinate role,
reason, and evidence in the coverage map or a short text-size audit. Inspect text-bearing descendants
inside library components, including chart ticks, legends and tooltips, select options, field labels,
buttons, badges, and table headers/cells. A library default below `text-base` is not an exception by
itself; use a supported size or class override unless the actual text has a clear subordinate role.
Keep ordinary action labels, field labels, select values/options, chart labels/tooltips, and table
content at `text-base`. Smaller text may be used for evidenced metadata/helper hierarchy and the
specified `.sub-heading` roles. Table column headers stay `text-base`; `.sub-heading` is not a
general exception. Use `.sub-heading` only for page/section eyebrows, secondary assistive field
labels, sidebar group titles, and option-menu group titles. Remove unexplained exceptions; arbitrary sizes require a verified
reference that standard sizes cannot match. A dense layout alone is not sufficient justification.
Compare the audit against the implementation, not only the map or worker narrative; if a report
claim conflicts with code, the gate fails.

Do not infer a descendant's size from a parent class. A wrapper with `text-base` does not cancel a
child component's own `text-sm` or `text-xs`. Apply a supported `className`, size prop, tick style,
or custom header to the text-bearing child itself and verify the installed API allows it. Inspect
whether `Badge` labels, `SelectItem`, `ChartTooltipContent`, chart axis ticks, or `DataTable` headers
set a smaller size; ordinary visible text needs a base-size override at that slot. In delegated or
substantive UI work, create `COMPONENT-TYPOGRAPHY-AUDIT.md` with one row per text-bearing component
or descendant: exact component/slot, installed default, final effective size, override source (or
subordinate role and reason), and source/read-log evidence. Include component defaults even when
they are not written directly in app JSX. Status/severity badges are decision data, not metadata.
A visible control value must be human-readable; never show a raw machine value such as `all`.

Preserve heading role styles independently from semantic heading levels. Use `.h3` for page titles
and `.h4` for Level 1 card titles. Level 2 group headings use
`text-lg font-medium text-(--foreground)`; Level 3 subgroup headings use
`text-base font-medium text-(--foreground)`. Keep their semantic heading elements at the level
required by the document outline. Before coding, include a heading inventory in the IA outline with
each visible heading, its parent, semantic element/level, visual role, and exact required class.
Assign visual role from the heading's position in the content hierarchy, not its HTML tag name: a
heading directly inside a Level 1 card is Level 2 even when it uses `<h3>`; a group one level below
that is Level 3. Audit every inventory row against code and report. Do not replace a role with
`text-sm`, a generic font utility, or another level's class.
When browser inspection is available, verify the computed family for page and card heading roles,
not only the page title.

Every page route has one semantic `main` landmark. Record the landmark and every visible heading in
the IA outline, then create `IMPLEMENTATION-RECONCILIATION.md` for delegated/substantive UI work.
Map each outline landmark and heading to its source location and rendered DOM role/tag. A planned
landmark without matching implementation evidence is a failed handoff. The coordinator verifies
the rendered `main` and heading roles in the desktop browser when access is available.

Do not place implementation-policy notes in product UI (for example, a statement about the absence
of a composite score or the radius token) unless that information helps the actual user task. Treat
synthetic values as illustrative sample data and label them as such when a viewer could mistake them
for live operations. Do not invent numeric safety thresholds, severity cutoffs, regulatory claims,
or imperative operational actions. A sample/illustrative disclaimer does not validate or make up
for missing operational policy. Use a cited Owner/source policy; when none is supplied, say that the
threshold policy is unavailable and refer people to their approved operating guidance. Do not infer
flight actions from synthetic values. Never invent the name, section number, contents, or authority
of a handbook, OEM manual, regulation, or other policy source. A source citation is valid only when
the source was supplied or actually opened and logged; otherwise refer generically to approved
operating guidance.

If a local demo simulates a real operational action, label the action/result visibly as a simulation
and say that no live system changed. A report disclaimer does not correct product copy that says a
link was restored, a command was accepted, or a handshake was verified when no real system was
contacted.

For synthetic dashboards or operational examples, show a visible `Sample data`/`Local demo`
disclosure wherever figures could be mistaken for live state. Keep metric totals, percentages,
dates, and cohort scopes consistent; clearly label distinct datasets. Do not invent telemetry
events, policy thresholds, severity cutoffs, or imperative operations actions. If policy is not
supplied, state that its threshold is unavailable and use neutral example follow-up wording. Create
`CONTENT-AUDIT.md` listing each claim, status, key metric, time range, and action with its source or
prompt basis, sample/simulation classification, data-scope check, visible disclosure, and code
location.
For category distributions with displayed percentages, calculate each share as `count / total × 100`,
state the rounding precision, and total the rounded values shown in `Consistency / Calculation` as
`Displayed rounded shares: sum(...) = N%`. Verify the sum against the chart/table. Do not claim the
displayed shares total 100.0% when they differ, and do not silently adjust one category to force 100%.

Treat content provenance as a pre-handoff gate. Add `Source evidence` and `Consistency / Calculation`
columns to the audit and,
for each sourced claim, cite the opened `file:line` and an exact excerpt that supports it. Generic
labels such as “Prompt requirement,” “official,” or “design policy” do not establish provenance.
Inventory every rendered per-record `nextAction`, numeric safety threshold/cutoff, and operational
recommendation as its own row, including repeated per-record actions. Only the exact cited excerpt
supports the wording it contains; citing another line in the same file does not authorize unrelated
values or actions. The implementation and generated audit/report files are not product-policy
sources. Synthetic sample values can illustrate a dataset but cannot authorize a flight instruction
or safety policy. When no supplied/opened source authorizes a directive, omit it or state neutrally
that no authorized action was supplied; generic wording about approved guidance is not a citation.
The final checker validates exact excerpts and rejects uncited operational directives and numerical
safety thresholds.

For every computed metric or aggregate, include the exact formula, input rows, resulting value, and
dataset scope in `Consistency / Calculation`; verify it against the rendered/source data. Never call
one record's reading a fleet or cohort aggregate. Audit every visible status/severity label. If a
synthetic classification lacks authoritative policy, keep it neutral or mark it illustrative-only
and explicitly not an approved operational classification; a general sample disclosure does not
make that label authoritative.

Control labels and selected values must describe the user's choice, not expose a raw implementation
value such as `all`, `q1`, or an enum key. Use dates/ranges that match the data; call a range Q1/Q2
only when the applicable fiscal calendar is explicit. Before handoff, identify one primary action
and one meaningful control interaction. The desktop browser check must exercise them and verify the
visible state/result; a visible trigger or wired-looking handler alone is not evidence of behavior.
A filter must change its dependent chart/list, not only its selected label. Create
`INTERACTION-AUDIT.md` with the action/control, expected state/data change, code evidence, observed
browser result, and evidence path; keep it distinct from source-only or typecheck claims. Workers
leave observations `PENDING`/`NOT RUN`; only the coordinator can mark `PASS`, with a saved screenshot
or DOM evidence file for each passed interaction.

Use semantic tokens for semantic states: `success`, `warning`, `destructive`, or `info` only when that meaning applies. Do not encode status with raw palette classes such as `text-amber-600` or `bg-emerald-500`. For chart categories, use the installed chart's categorical palette; if none exists, derive colors from existing CSS variables with `color-mix()` or relative OKLCH, check both themes, and retain labels or another non-color cue. Record token gaps; do not add shared tokens without authorization. For substantive/delegated work, create `SEMANTIC-COLOR-AUDIT.md` mapping states/categories to their token or variable and source location; the final audit rejects raw palette classes used for semantic states.

## Chart choice and legibility

For each chart, identify the data question, audience/task, comparison precision, categories/series, units/time range, and whether it is an analytical chart or a compact preview. Choose an encoding that answers that question; use a table or labeled values when exact lookup is primary. Treat five pie slices as the recommended maximum and four to five line series as a readability ceiling. Above those levels, default to a sorted bar, small multiples, filtering/focus, or a companion table; disclose any semantically valid aggregation. An exception requires a task/reference reason and must pass the rendered legibility checks.

Historical, aggregate, comparative, and distribution data are charts even when shown as bars. Use the installed Chart composition when it fits; do not recreate it with hand-built `div`/`span` bars or substitute `Progress`. Use `Progress` only for an operation currently underway; use `Meter` for a current value against a known range. Do not assign `role="progressbar"` to historical trends or category shares. Verify installed chart/progress/meter exports, types/source, and closest demos before choosing a fallback. Give every chart answering a distinct data question its own coverage and implementation-reconciliation row; a time-series trend and category/outcome distribution are separate needs even if both use `ChartContainer` and `BarChart`. Cite the JSX range that renders each visualization, not its imports or another chart's usage. `MeterIndicator` derives its fill from the parent `Meter` value; do not add a second width or percentage-fill style. Use `DataTable` for interactive record lookup/comparison when its verified API fits; use a native semantic table only for a small static lookup when DataTable behavior is unnecessary or demonstrably mismatched, and record why. Map every native/local table as a separate UI need, include `DataTable` as a candidate, and state the specific requirement that makes the native composition a better fit. Never report “zero custom tables” when hand-authored table markup is present.

Aligned rows and columns that communicate record values are a table need even when built from `div`
elements; do not evade the `DataTable`/semantic-table decision by changing the HTML shape. For each
candidate, prove the export exists in the installed package manifest and inspect the installed
declaration/runtime files. Reconcile every coverage-map row to the component or documented fallback
actually used and its source location before handoff.

For category charts, verify that each intended category color reaches its rendered mark through a supported data-to-mark mapping (for example, a verified per-cell fill). Listing colors in a data object or assigning one series color does not implement a categorical palette. Check the map, data binding, and rendered marks together; remove unused color fields.

Do not set one minimum pixel size for all charts. Inspect usable chart area after labels, axes, legend, and annotations at actual desktop and narrow viewports. All necessary text and categories must remain identifiable without overlap, clipping, ambiguous truncation, or reliance on color/hover alone; exact values must be available through visible labels or a semantic table. If it does not fit, change the chart, split/filter the data, or provide a summary linking to a full view. A 40 × 40 px graphic is icon-sized and may only cue one simple metric/trend when paired with a visible label/value and access to full detail when needed; it cannot present ten pie categories for analysis. See [design-system-implementation.md](../../../agents/design-system-implementation.md#choose-and-size-charts-for-legibility) for the decision and review checklist.

Use `--radius` (2px) for ordinary SkyTrack surfaces and controls. Avoid full or larger corner radii
on custom surfaces, badges, tracks, thumbs, controls, and chart containers. Keep full circles only
for genuinely circular elements such as avatars, radio controls, and status dots. Chart bars and
areas stay square per the Owner's direction; set chart mark radius to `0`. Inspect computed radii
for representative rendered elements when browser access is available. Do not add literal radius
values in CSS or inline styles when the token fits; use zero only for intentionally square marks or
edges, and keep circular exceptions semantic.
For substantive/delegated work, record every authored rounded utility, literal radius, and chart-mark
radius in `RADIUS-AUDIT.md`; the final audit rejects non-token radii and undocumented circular shapes.

Use the documented heading role class with the correct semantic heading element. When browser
evidence is available, verify computed `font-family` and loaded heading font. If the family is
missing, inspect the imported stylesheet and emitted font assets before changing heading size or
adding a local font workaround.

Ensure status labels, chips, and metric values remain intact at the target content width. A badge or
label that wraps into a fragmented stack, clips, overlaps, or overflows its surface is a visual QA
failure; shorten the copy or adjust the supported layout while preserving meaning.

Keep product UI free of implementation notes such as “square mark radius applied per design rules,”
component names, design-token explanations, or other developer-facing verification text unless it
directly helps the user's task. In the final report, every compliance statement must point to the
actual code/read-log evidence; a map, checklist, or self-report that disagrees with the implementation
is a failed handoff. A chronological read log must include each prompt and instruction file actually
opened; mark runtime-injected instructions as injected rather than claiming a file read. Report the
number of actual read entries, not the Markdown file's total line count. For delegated or substantive
implementation, run the shared audit's `--stage preflight` before code and `--stage final` at handoff,
passing the same `PREFLIGHT-GATE-RESULT.md` to both.
The final stage requires IA reconciliation, component typography, semantic-color, and radius audits;
add `--require-main` for page routes. Treat any failed result as a blocker. A source-declared size is
not a computed browser style.

For marketing, organize the page as a narrative around audience, primary message, and desired action; do not force product data-object grouping. See the skill's [creative-direction guide](../../../.agents/skills/design-system-delivery/references/creative-direction.md).
