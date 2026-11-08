# SkyTrack UI implementation evidence and optional preflight

This guide defines package component/API evidence for SkyTrack UI work. Read it for every UI implementation. The task router in the repository's `AGENTS.md` selects the other relevant guides; API facts still come from the exact installed package. The consuming workspace owns when to run a formal preflight checker.

For every UI implementation with `skytrack-ui`, follow the selective routing below and use
`skills/skytrack-ui/references/AGENT_GUIDE.md` only as a targeted package reference.
Import `skytrack-ui/styles.css` exactly once from the application entry point before evaluating
component styling or heading fonts; inspect the installed package's exported stylesheet and
confirm the import resolves. If `DEBUG=true`, log stylesheet/font-asset reads; otherwise do not
create a read log. A
source-checkout stylesheet or Tailwind classes alone do not load
the installed package theme, component utilities, or bundled fonts.
Before coding, ensure a concise component-coverage map records every distinct UI need: candidate
component/composition, installed package version/export, source/types/demo checked, and decision.
Group repeated instances. A router scan only discovers candidates; it does not satisfy this gate.
Treat each map row as an evidence contract: do not claim a supported library composition until the installed artifact, export,
declaration, runtime implementation, and compatible demo have exact paths and a verified decision.
For a bounded revision, reuse rows/evidence for unaffected needs and refresh only changed or invalidated rows. Inspect the affected rendered area and interactions; broaden reconciliation only when the change affects the route, shared composition, or an explicit acceptance criterion.
Confirm the export subpath against the installed package manifest; declaration/runtime paths must
resolve inside that installed package, not a same-version source checkout. This direct verification
is part of component discovery/mapping; a formal checker should not repeat it when its inputs and
conclusions are already clear and current. Follow the consumer's workspace pipeline to decide
whether `audit-ui-handoff.mjs --stage preflight` adds a distinct unresolved consistency check. Add
`--read-log <FILE-READ-LOG.md>` only when `DEBUG=true`. A package/API uncertainty must be resolved
against installed evidence before use; a formal preflight PASS is not required merely to repeat a
completed analysis. Read the root router, design-system implementation guide, targeted
package guide, compact UI rules, and component routing index before app-source changes; the checker
requires chronological proof only when `DEBUG=true`. For pinned local-tarball probes,
pass `--package-tarball`; the checker compares installed and archived file sets in both directions,
compares each file byte-for-byte, and records the artifact hash. Never edit the installed
`node_modules/skytrack-ui` copy; a mismatch fails
the case and requires a fresh isolated run after setup is corrected.
File-read logging is opt-in. When the environment is exactly `DEBUG=true`, create/append
`FILE-READ-LOG.md` and open auditable files with
`DEBUG=true node skills/skytrack-ui/references/scripts/read-and-log.mjs --path <file> --reason <why>` from the
assigned workspace. Use `--heading <exact Markdown heading>` for a relevant section of a long guide;
the helper displays that section while hashing the full file. The checker then requires its
timestamp, content hash, method, and read scope. A full-file `AGENT_GUIDE.md` read fails preflight
for ordinary implementation and rule-probe tasks; the checker requires a targeted heading or
narrow line range. A task explicitly auditing the entire guide may pass `--allow-full-guide-read`
to both checker stages. When DEBUG is not exactly `true`, do not invoke the logger or create/append
a read log; keep the coverage map's read-log cell blank or `—`. In either mode, inspect relevant
sources directly and keep all component/API/demo checks mandatory.
If a component/API/version changes, refresh only the affected map row and verify its new evidence.
Rerun formal preflight only if the workspace pipeline finds an unresolved consistency check; do not
rerun it solely because a visual revision changed while the need and supported package evidence remain
clear/current. Map nested visuals and
controls separately; a card/table row does not implicitly cover
its badges, meters, bars, selectors, or actions. In a consumer,
inspect `node_modules/skytrack-ui`; matching version strings do not prove a source checkout and
installed tarball contain the same API. Do not custom-build a need until its candidates are
verified and the map records the exact missing capability and why supported parts cannot compose
it. If no suitable package component exists, record a non-blocking `CONCERN`, inform the Owner in the
existing task/handoff, and use the smallest semantic native fallback unless the Owner directs
otherwise; execution mode alone does not change this default. A style preference alone is not a
capability gap. Fix confirmed visual defects through
verified props/slots first; local fallbacks need a concrete unmet behavior, semantic, accessibility,
or visual constraint and a record of why the installed composition cannot satisfy it. Reuse
supported components and compatible demos; verify each part and prop against installed
source/types. If runtime source is not shipped, record that limitation and inspect the actual
installed entry implementation instead. Never invent compound parts or
replace a supported library composition with hand-built HTML. Generic visual skills may guide
styling only; they do not override SkyTrack's component API, semantic color tokens, typography,
or explicit design decisions. Recheck every mapped need against the rendered result before handoff.
Give each independently meaningful visualization its own coverage and reconciliation row, even
when multiple charts use the same Chart composition; never combine a time trend with a category
or outcome distribution in one row. MeterIndicator derives its fill from Meter.value, so do not
set its width manually.
Preserve typography owned by `skytrack-ui` components. Let text inherit from its component/parent;
if neither defines a size, use the body default. Do not add `text-base` to normalize ordinary text
or override a component's own default. Component defaults below `text-base` are intentional unless
an evidenced defect applies. In the component typography audit, record the installed default and
effective size for relevant slots; do not label an unchanged library default as an exception.
Review authored below-base/arbitrary utilities and every deliberate typography change against the
source, types, demo, and rendered result. Preserve Badge's default size, uppercase transformation,
and tracking unless a documented variant is specifically required. A visible control value must
be human-readable; never expose a raw value such as `all` as the visible selection.
Treat column visibility as an optional IA decision. Include show/hide columns only when the
object's attributes, roles, and tasks show that people need to customize visible columns; the
DataTable demo is a reference, not a checklist. In package version `0.1.5`, `renderColumnVisibility`
replaces the built-in Columns control; return `null` to omit it, or omit the render prop to keep the
default. Verify the installed version. Do not hide the internal control with consumer CSS or invent
an API. If a supported slot cannot satisfy the IA, record the capability mismatch and use a different
supported table composition only if it satisfies the required data and interactions. No DataTable
API change is authorized by this rule. If the control is omitted, no separate note is required just
to record its omission.
Internal-class CSS overrides are allowed only to repair a reproduced functional or accessibility
defect after verifying that no public API, supported slot, or composition can fix it. A visual
preference, density, or typography normalization is not an exception. The agent may repair without
prior Owner approval when evidence is complete. Scope the selector under a unique wrapper to the
exact component/class; never use a global selector. Record inspected API/types, package version and
runtime source, closest demo, alternatives tried/rejected and why, and a screenshot or reproduction
steps. Verify the repaired behavior/accessibility. Fail handoff when any evidence item is missing.
Use semantic status tokens instead of raw palettes.
Before coding, include a heading inventory in the IA outline: each visible heading, its parent,
semantic element/level, visual hierarchy role, and required class. Determine visual role from its
place in the outline, not from the HTML tag name. A heading directly inside a Level 1 card is a
Level 2 group heading (`text-lg font-medium text-(--foreground)`); one level below that is Level 3
(`text-base font-medium text-(--foreground)`). Audit each entry against the implementation;
`<h3>` does not automatically mean visual Level 3. Verify rendered heading font family when browser
evidence is available. Use the 2px `--radius` token for
surfaces and controls; reserve full circles for genuinely circular elements and keep chart marks
square. Audit every authored radius and every chart mark. When `DEBUG=true`, maintain a
chronological `FILE-READ-LOG.md`; otherwise do not create or append one. Always reconcile every
rendered need against the map.
Treat a missing component-coverage row, unexplained fallback, unverified content claim, clipped label, or
map-to-code mismatch as a failed handoff; typecheck success does not waive these checks.
For synthetic or local operational examples, label the page as sample/demo data, keep dates,
totals, percentages, and dataset scopes internally consistent, and distinguish simulation from
live system state. For every displayed category percentage, calculate `count / total × 100`, state
the rounding precision, and total the rounded shares shown in the UI. Never claim the displayed
shares sum to exactly 100.0% when their rounded total differs; do not silently adjust a category
to force 100%. Do not invent telemetry events, safety policy, thresholds, or prescriptive
operational actions. When policy is unavailable, say so and use neutral example follow-up text;
do not present generic wording as an approved directive. Record claims, data scope, disclosures,
and source/prompt basis in `CONTENT-AUDIT.md`. A label such as “Prompt requirement” or
“Design policy constraint” is not a citation: record an opened `file:line` plus an exact source
excerpt. Inventory every rendered per-record `nextAction`, safety/policy threshold, and
operational recommendation as its own audit row. Synthetic sample data may provide illustrative
measurements, but it cannot be used as authority for a safety threshold or flight instruction.
Only the exact cited excerpt supports the wording it contains; opening or citing another line in
the same file does not authorize unrelated values or actions. The implementation and generated
audit/report files are not product-policy sources. Give duplicate per-record actions separate
audit rows as well.
If the prompt/source provides no directive, use neutral wording such as “No authorized action is
supplied; refer to approved operating guidance,” or omit the directive. For each primary action and meaningful control,
record the expected visible result and verify the changed state in the desktop browser; preserve
evidence in `INTERACTION-AUDIT.md`. A control that changes only its label while leaving its
dependent visualization/data unchanged is not a functional filter.
Reconcile every final-report claim against the actual code and evidence; a checklist or report
that contradicts the implementation is a failed handoff. Report prompt identity in UTF-8 bytes,
not JavaScript character count, and include whether the final newline was preserved. Only when
`DEBUG=true`, log instruction/prompt files that were opened and identify runtime-injected
instructions as injected. With logging off, do not create a read log or claim log-backed evidence.
For each page route, include one `main` landmark in the IA outline and verify it in the rendered
DOM. Reconcile every IA landmark and heading against the actual source and rendered role. Check
one primary action and one meaningful control interaction in the desktop browser; verify the
visible state/result, not only that the trigger exists. Period labels must match their actual
dates; use Q1/Q2 only when the fiscal calendar is defined.
In `IMPLEMENTATION-RECONCILIATION.md`, include a `Component map reconciliation` table with one row
for every coverage-map row, its actual implementation, source file and line, and expected DOM role;
the coordinator then verifies those elements in the rendered desktop UI.
Marketing/landing Hero titles use
`@apply text-5xl lg:text-7xl heading` as a context-specific override to the `.h3` page-title default.
Use `.h3` for other page titles and `.h4`
for Level 1 card titles; Level 2 group headings use `text-lg font-medium text-(--foreground)`;
Level 3 subgroup headings use `text-base font-medium text-(--foreground)`.
Do not invent numeric safety thresholds, severity cutoffs, operational actions, or the names,
section numbers, or authority of handbooks/specifications. A citation is valid only when the
source was supplied or actually inspected; when `DEBUG=true`, its read log must also show it was
opened. The checker validates the source file and exact excerpt in either mode. If no source is available, state that policy is
unavailable and refer people generically to approved operating guidance. If local demo state
simulates a real operational action, label the interaction/result in product UI as a simulation
and state that no live system changed; never display a simulated success as a real connection or
command result. For cards and content surfaces, use padding by nesting level (24/16/12/8px); do not pad
layout-only wrappers. Separate content groups by 24px and group headings from content by 12–16px.
Forms use 16px gaps and switch from one to two columns responsively when space allows.
When a control needs a visible label, description, or validation message, compose it with the
styled `FieldRoot` / `FieldLabel` / `FieldControl` / `FieldDescription` / `FieldItem` / `FieldError` / `FieldValidity` exports from `skytrack-ui/field`.
Secondary labels below a `FieldLabel` use `text-xs sub-heading` (CSS equivalent: `@apply text-xs sub-heading`).
Map every native HTML or locally composed fallback as its own UI need, compare it with the closest
installed `skytrack-ui` component, and record the concrete capability/semantic reason it fits
better. Do not claim zero custom tables/controls when hand-authored semantic markup exists. In
reports, count read-log rows only when `DEBUG=true`; exclude Markdown headers and distinguish
injected rules from files opened by the agent. For substantive or delegated UI handoffs, run
`skills/skytrack-ui/references/scripts/audit-ui-handoff.mjs --stage final` against the changed source and evidence files,
including the IA outline, implementation reconciliation, component-typography, semantic-color,
and radius audits;
include its result. A failed scan blocks COMPLETE. Also verify chart colors reach the rendered
marks, and claim computed styles only with browser evidence.
