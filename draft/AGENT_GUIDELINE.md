# Agent Guideline: Plan and Implement SkyTrack UI

**STATUS: OWNER REVIEW DRAFT** · **APPLIES TO: PRODUCT UI IMPLEMENTATION**

Use this procedure for screens, flows, component compositions, and reference-based UI work. For an isolated control fix, inspect its parent screen and confirm whether its IA changes. Do not begin dependent UI implementation before doing the research and planning steps.

## 1. Resolve the task and evidence

Extract the intended user outcome, audience/role, target route or artifact, primary action, explicit constraints, and requested fidelity. Separate facts from assumptions. Treat supplied content, routes, source, data models, screenshots, and approved specs as evidence; do not infer product behavior from styling alone.

For a new reference-based or full design-system-delivery assignment, select STRICT or YOLO once before dependent work if the prompt does not already specify a mode, and keep that mode across follow-ups. Routine UI implementation and repairs do not need a mode interview.

For a screenshot or visual reference, classify it as one of:

- **Faithful reference:** the reference governs content, hierarchy, order, layout, density, and visual treatment, except where the Owner explicitly constrains the design system or accessibility.
- **Inspiration:** preserve the stated mood or useful design cues while adapting structure to the product and agreed direction.
- **Unclear:** use prior project direction to suggest a reasonable interpretation in STRICT; in YOLO, state the interpretation and proceed when reversible. Ask only when the difference would materially change scope, IA, behavior, or output.

For a reference handed to another agent, include the readable image/URL, image-to-route mapping, target route, and observable acceptance criteria. If essential reference material is unavailable, obtain it or an approved specification before implementing dependent decisions.

## 2. Research Information Architecture before coding

Inspect the project evidence in this order:

1. The brief, reference, and explicit Owner decisions.
2. Existing application shell, navigation, routes, and nearby screens/flows.
3. Relevant object/data model, lifecycle, permissions, and process dependencies.
4. Current SkyTrack UI component guidance and matching source/demo where controls affect the flow.

Before selecting a page pattern, identify role, task and frequency, object lifecycle, decision or action, risk, and required states. Choose a goal-oriented pattern—overview, searchable object list, known-work queue, object detail or edit page, analytical exploration, or guided sequence—without copying a vendor shell or requiring vendor floorplan names. Map:

```text
role → task → object/data → page pattern → information/actions → states → mobile behavior
```

Use the following IA rules:

- For product UI, use **domain-first navigation** (the established product areas and familiar objects) with **task-first screen structure** (the actions, decision-critical information, and sequence for the current goal). For marketing UI, organize a narrative around audience, message, proof, and CTA; do not force it into data-object groups.
- Group fields by meaningful object and relationship. Keep one object's fields together and order object groups by task sequence and dependency. Split an object's fields only when the real workflow requires it. Break large groups into semantic subgroups rather than arbitrary field counts.
- Put information needed for the current decision first. Keep required and safety-critical information visible; progressively disclose advanced or infrequent details only when that does not hide a required decision or create a risk.
- Use sections for groups serving the same task; tabs for independent groups people switch between; steps for a sequential process with clear inputs and outputs; split view when selecting an item and inspecting/editing its details side by side.
- Inherit existing navigation names, placement, and shell; indicate the current location. Add breadcrumbs only for genuinely nested routes when they improve orientation. Do not add duplicate navigation.
- Use semantic headings, sections, and `FieldsetRoot` / `FieldsetLegend` to express relationships first. Add a card/surface when it clarifies a module, state, or independent action. Nested cards are allowed when a deeper information level needs a distinct surface; use the DS `--accent` token and verify contrast, including any tinted nested surface. Do not surface every small group automatically.
- Forms stack to one column at narrow widths and preserve logical reading order on mobile. Use one to two columns as the desktop baseline; allow up to four only when short, same-level fields benefit from higher density. Long text, URLs, and descriptive values should span wider. Keep a consistent 16px field gap unless the reference or task specifies otherwise.
- For enterprise lists, define search/filter scope, row-to-object navigation, page/row/selection actions, return path, retained query state, and first-use empty, loading, no-results, filtered-empty, permission, and failure states. Each state explains the condition and the next useful action. Adapt list identity, filters, selection actions, and list/detail movement to mobile; do not merely compress the desktop layout.

If project evidence is missing or conflicts about task, object, or flow; no suitable pattern is apparent; or plausible IA choices would materially change grouping, order, or task path, research external patterns for that task. Compare them with SkyTrack's constraints and cite sources; do not copy a vendor structure without checking fit. When material uncertainty remains, ask only for the decision that blocks progress.

Write a concise, evidence-backed IA outline before coding:

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

**STRICT:** show the outline at the Owner checkpoint before dependent implementation. **YOLO:** prepare it before coding, proceed autonomously, and surface only material assumptions or IA trade-offs. Both modes use the outline during review. OVERNIGHT authorizes sustained autonomous work inside the task boundary; it does not change Owner-only decisions or expand scope.

## 3. Route the task to component guidance

Use [`COMPONENT_ROUTING.md`](COMPONENT_ROUTING.md) to find candidate component families by user intent and interaction. It is a routing aid, not an API contract.

For each candidate:

1. Read `knowledge/designer/<slug>.md` to decide whether, when, and how the component should be used. Read its `Usage`, `Types`, `Behavior`, `Layout`, `Accessibility`, and `Content` sections when present; do not invent omitted sections.
2. Read `knowledge/<slug>.md` for composition, variants/states, and the documented code example. These Developer examples use the showcase alias `@/components/ui/<slug>`; in a consumer app, replace it with the verified `skytrack-ui/<slug>` or root `skytrack-ui` import, and confirm the installed package actually contains the corresponding files.
3. Compare adjacent choices in the docs before deciding (for example, Dialog vs Alert Dialog, Date Picker vs Calendar, Select vs Combobox, or Accordion vs Collapsible).
4. Verify the exact public subpath, component parts, props, types, source, and closest compatible demo against the installed package version. Read the library's `package.json`, source/types, and demo; check generated declarations only when present and version-matched. A manifest entry alone does not prove that a consumer artifact exists.
5. Use the documented demo variant to understand API wiring and component mechanics. A demo can be reused only when it matches the installed version. When a Designer UX rule conflicts with a capability demo, follow the UX rule for the product flow; for example, do not stack an Alert Dialog over an open Dialog to confirm unsaved edits—confirm inline or retain the draft. Do not assume similar names imply identical APIs.

In the current `0.1.5` source checkout, 51 component subpaths are declared but 8 lack built `.js` and `.d.ts` artifacts in `dist-lib`: `calendar`, `chart`, `command`, `data-table`, `date-picker`, `page-header`, `pagination`, and `sidebar`. In a consumer app, check the installed package files before using any of these; if the artifact is absent, use a supported available composition or a justified semantic fallback. Do not claim a source-only component is usable from the published package.

If the routing index and source disagree, trust the installed package and record the discrepancy. If a candidate lacks a matching component or needed capability, identify the specific gap and test whether existing parts compose it before adding a local fallback. Preserve supported components and behavior; custom-build only the missing portion. Do not add or change shared-library APIs unless the task authorizes it.

## 4. Implement with the system

- Use public package exports; do not import private library internals in a consuming app.
- Preserve compound component structure, semantic roles, focus management, keyboard behavior, portals/positioners, and field-label/error relationships from the verified API.
- Use semantic HTML for page structure and supported SkyTrack controls for interactive UI. Use shared app components only when there is a real reuse need.
- When a control needs a visible label, description, or validation message, compose it with the styled `FieldRoot`, `FieldLabel`, `FieldControl`, `FieldDescription`, `FieldItem`, `FieldGroup`, `FieldRow`, `FieldError`, or `FieldValidity` exports that match the control. Use `FieldControl` for compatible basic inputs. For Select, Combobox, Autocomplete, NumberField, DatePicker, OTPField, and other compound controls, keep their own verified trigger/input parts inside `FieldRoot`; do not replace a compound trigger or input with `FieldControl`. Read [`knowledge/field.md`](../skills/skytrack-ui/references/knowledge/field.md) and verify the current composition.
- Apply `.sub-heading` to page/section eyebrow labels, secondary/assistive labels paired with `FieldLabel`, sidebar group titles, and option-menu group titles; this class renders those labels uppercase. Choose text size for the hierarchy; use `text-xs sub-heading` for compact field labels. Do not recreate its uppercase, tracking, weight, or muted-color typography in local classes. Regular page and content headings follow their own heading-role styles.
- Use the nearest SkyTrack token. Token-linked `color-mix()` or relative OKLCH may create a derived tint; preserve the source token. Keep brand accents distinct from semantic success, warning, and error colors. Report meaningful token gaps and propose a token; do not alter shared tokens without authorization.
- Match explicit references in content, hierarchy, ordering, density, and layout while keeping verified component composition and accessible contrast. Broad Tailwind styling is allowed when it uses the DS tokens and does not replace required behavior. A substantially different composition may use a local app component built from library primitives; a visual mismatch alone is not evidence that the library lacks a capability.
- Add the states the requested flow needs: hover, focus, disabled, loading, empty, validation, permission, and failure as appropriate. Use local demo data and make visible demo actions work locally or communicate that an operation is unavailable; do not imply a backend ran.
- Keep semantic heading levels aligned with the document outline. Defaults: page title `.h3`; Level 1 card title `.h4`; Level 2 group heading `text-lg font-medium text-(--foreground)`; Level 3 subgroup heading `text-base font-medium text-(--foreground)`; marketing Hero title `text-5xl lg:text-7xl heading`; subordinate field label `text-xs sub-heading`. Pad visible surfaces by nesting level: 24/16/12/8px (`p-6`/`p-4`/`p-3`/`p-2`); do not pad layout-only wrappers. Separate content groups by 24px, group headings from content by 12–16px, and form fields by 16px (`gap-4`). Shared control heights are `xs` 24px, `sm` 32px, `default` 36px, and `lg` 40px; `NumberFieldInput` also supports `compact` 26px. Follow these defaults unless the reference or an approved context-specific override requires otherwise.
- Follow the reference at desktop and adapt for narrow viewports without dropping information or changing its priority. Keep wide-table overflow local to the table.

If `DataTable` is unavailable in the installed package or its API cannot meet a requirement, first state the concrete gap. A local fallback uses semantic `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th scope="col">`, and `<td>` markup, with local horizontal overflow and available SkyTrack controls/tokens; do not invent a public `Table` component.

For charts, first define the question and comparison task, required precision, units/range, categories/series, and actual viewport. Use bars/dots for category comparison, lines for time trends, and pie/donut only for part-to-whole with few categories (five slices is a recommended ceiling, not a guarantee). Use a table/labeled values when exact lookup is primary. Inspect the plot after labels, axes, legends, and annotations at rendered size; no universal minimum pixel size guarantees readability. If labels overlap, clip, truncate ambiguously, or rely on color/hover alone, switch the encoding, split/filter the data, or add an accessible table. A 40×40 graphic is an icon-sized cue for one simple metric, not a multi-category analytical chart. Apply the full checklist in [`../skills/skytrack-ui/references/implementation.md#choose-and-size-charts-for-legibility`](../skills/skytrack-ui/references/implementation.md#choose-and-size-charts-for-legibility). The evidence basis includes [Cleveland and McGill's graphical-perception study](https://doi.org/10.1080/01621459.1984.10478080), [CFPB data-visualization guidance](https://cfpb.github.io/design-system/guidelines/data-visualization-guidelines), and the [UK Analysis Function chart checklist](https://analysisfunction.civilservice.gov.uk/policy-store/charts-a-checklist/).

## 5. Verify and report

Check one to three main-task scenarios against the IA outline: can people orient themselves, locate the object and required/risk information, understand the next action, and scan the grouping/order at mobile width? Check page reflow at 320px and up to 400% zoom without loss of content or function, and 200% text zoom without clipping; local two-dimensional scrolling is acceptable for tables and charts if the page remains navigable. For the UI, perform relevant focused typecheck/lint checks, inspect the actual desktop and narrow browser render, compare with the reference, and exercise primary interactions and states. Follow the repository's build policy; do not run a production build by default during active development.

Record what was checked, failures and fixes, actual changed paths, meaningful mismatches, and any unverified viewport/state. A compile pass or successful HTTP response alone does not establish visual or behavioral correctness. Do not label unverified criteria PASS.

## 6. Handle ambiguity without guessing the product

Use evidence before assumptions. When the brief is vague, collect the smallest relevant facts from the existing route/shell, closest flow, data model, and component guidance. Then:

- **Routine, reversible visual choice:** choose the option most consistent with the reference and tokens; state the assumption briefly if it materially affects review.
- **Missing evidence with a stable project pattern:** follow that pattern and link the source.
- **Conflicting or absent task/object/flow evidence:** research an external IA pattern when that can reduce uncertainty; compare fit with SkyTrack and cite it.
- **Material choice with more than one viable path:** state the options and consequence; in STRICT, ask at the next checkpoint; in YOLO, choose the best-supported reversible path and disclose the trade-off. Ask the Owner when the decision affects product semantics, safety, irreversible behavior, brand, shared library scope, or other Owner-only authority.
- **Essential input missing:** pause only the dependent slice, name the exact missing input, and continue independent work.

Do not turn uncertainty about a reference into invented content or behavior. Preserve unknowns as explicit assumptions and keep them easy to revise.
