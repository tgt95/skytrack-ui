# Design-system benchmark: Fluent 2, Carbon, SAP Fiori

Reviewed 2026-10-30. This source-backed research note informs the SkyTrack UI rules. It compares
UX guidance, not vendor implementation APIs.

## Scope and method

Reviewed official web guidance relevant to product UI and the current `skytrack-ui` library:
design principles, IA/page patterns, layout and density, tokens/themes, typography, accessibility,
content, forms, actions, dialogs, search/filtering, tables, charts, empty/loading states, feedback,
and motion. I reviewed the cited guidance pages and their relevant sections; sources are grouped
by topic rather than by every vendor component.

The review covers the complete guidance topics relevant to SkyTrack, not every page in each vendor
catalog or every historical version. SAP's public web index is large: its v1-154
[query index](https://www.sap.com/edge/design-system/fiori-design-web/query-index.json) lists 970
paths, including 223 foundations, 547 UI elements, and 69 page types. SAP topics publish at
different versions; a version in a source URL identifies that topic's cited page, not the portal's
overall release. I reviewed the latest accessible published guidance page found for each cited
topic and did not compare superseded historical editions. Vendor-specific implementation APIs and
unrelated product families are out of scope. Vendor advice is evidence for a decision, not a
substitute for SkyTrack's approved rules or the installed package API.

Local source checks: the `skytrack-ui` source checkout reports version `0.1.5`; its exports, source,
types, demos, and CSS tokens were checked for `DataTable`, `Chart`, fields, and the project's UI
rules. In a consumer app, that app's installed API and version remain authoritative.

## Comparison

| Dimension | Fluent 2 (React Web) | Carbon | SAP Fiori for Web |
| --- | --- | --- | --- |
| **System model** | Cross-platform principles with web React and Web Components catalogs. Emphasizes familiar platform behavior, focus, inclusion, and recognizable product identity. [Principles](https://fluent2.microsoft.design/design-principles) · [React catalog](https://fluent2.microsoft.design/components/web/react/) | Carbon Core organizes foundations, components, patterns, code, and data visualization; distinct Carbon expressions extend the core for their contexts. [About Carbon](https://www.carbondesignsystem.com/getting-started/about-carbon) · [Developing overview](https://www.carbondesignsystem.com/getting-started/developing/overview) | A layered enterprise system: foundations/tokens, UI elements, patterns, page floorplans, templates, and design specifications across technologies. [SAP Design System](https://www.sap.com/design-system/fiori-design-web/v1-145/discover/sap-design-system/sap-fiori) · [Fiori for Web](https://www.sap.com/design-system/fiori-design-web/) |
| **Design principles** | Natural on every platform; built for focus; inclusive; unmistakably Microsoft. [Principles](https://fluent2.microsoft.design/design-principles) | Shared, reusable building blocks with guidance and accessibility, then tailored to product context. The docs separate universal components from goal-oriented patterns. [About Carbon](https://www.carbondesignsystem.com/getting-started/about-carbon) · [Patterns](https://www.carbondesignsystem.com/building-blocks/core/patterns/overview) | Role-based, adaptive, simple, coherent, delightful. [Fiori principles](https://www.sap.com/design-system/fiori-design-web/v1-142/discover/sap-design-system/vision-and-mission/design-principles) |
| **Tokens and themes** | Global tokens hold raw values; semantic alias tokens explain purpose. Themes include light, dark, high contrast, and brand. [Tokens](https://fluent2.microsoft.design/design-tokens) | Named tokens and themes map color, type, spacing, and layers; neutral layers establish surface hierarchy and semantic colors signal states. [Color](https://www.carbondesignsystem.com/building-blocks/foundations/color/overview) · [Spacing](https://www.carbondesignsystem.com/building-blocks/foundations/spacing/overview) | Reference, base, and component token layers support themes, accessibility themes, and brand adaptation. [Tokens](https://www.sap.com/design-system/fiori-design-web/v1-136/foundations/visual/design-tokens) · [Theming](https://www.sap.com/design-system/fiori-design-web/v1-145/foundations/visual/theming) |
| **Layout, type, density** | Proximity signals relationships; spacing creates hierarchy and focus; responsive layouts rearrange or reveal content based on need. Uses a 4px spacing ramp. [Layout](https://fluent2.microsoft.design/layout) | Productive type is compact for task work; expressive type is reserved for editorial/marketing. Grid and spacing scales provide rhythm and support dense work surfaces. [Typography](https://www.carbondesignsystem.com/building-blocks/foundations/typography/overview) · [2x Grid](https://www.carbondesignsystem.com/building-blocks/foundations/2x-grid/overview) | Cozy/compact density adapts control size to touch versus pointer/keyboard; consistency across a page is important. [Density](https://www.sap.com/design-system/fiori-design-web/v1-120/foundations/visual/cozy-compact) |
| **IA and page patterns** | Predictable hierarchy, scannable semantic headings, familiar interaction, focus on the current task. [Accessibility](https://fluent2.microsoft.design/accessibility) · [Principles](https://fluent2.microsoft.design/design-principles) | Patterns combine components to solve user goals and often describe alternatives, constraints, and task flow. Search and filter patterns distinguish scope, dataset size, and interaction cost. [Patterns](https://www.carbondesignsystem.com/building-blocks/core/patterns/overview) · [Search](https://www.carbondesignsystem.com/building-blocks/core/patterns/search) · [Filtering](https://www.carbondesignsystem.com/building-blocks/core/patterns/filtering) | Explicitly selects a page pattern by task: overview, list report, worklist, object page, wizard, or initial page. [Choosing a floorplan](https://www.sap.com/design-system/fiori-design-web/v1-148/page-types/floorplans/when-to-use-which-floorplan) · [List report details](https://www.sap.com/design-system/fiori-design-web/v1-38/page-types/floorplans/list-report/) |
| **Forms and controls** | `Field` composes a label with a control, helper text, and validation. Buttons perform actions; links navigate. Use one primary action for the most important action in a layout. [Field](https://fluent2.microsoft.design/components/web/react/core/field/usage/) · [Button](https://fluent2.microsoft.design/components/web/react/core/button/usage/) | Ask only for necessary information; group related tasks, use predictable order, make widths match expected input, and reduce input-method switching. [Forms](https://www.carbondesignsystem.com/building-blocks/core/patterns/forms) | Forms and fields are built within responsive enterprise page patterns; required, validation, and field grouping are explicit parts of UI-element guidance. [Form](https://www.sap.com/design-system/fiori-design-web/v1-145/ui-elements/form-web-component) |
| **Tables and records** | Component catalog distinguishes list from Table/DataGrid when relationships across columns matter. [List](https://fluent2.microsoft.design/components/web/react/core/list/usage/) · [React catalog](https://fluent2.microsoft.design/components/web/react/) | Data table guidance covers formatting/content, selection, sorting, filters, row actions, pagination, and variants. [Data table](https://www.carbondesignsystem.com/building-blocks/core/components/data-table/guidelines) | Choose responsive table/list/tree versus desktop analytical/grid/tree table by row count, complexity, hierarchy, and device support; use a form for field-value editing and a chart for overview. [Table overview](https://www.sap.com/design-system/fiori-design-web/v1-145/foundations/best-practices/ui-elements/tables/table-overview) |
| **Charts and visual data** | The React catalog provides chart-adjacent components, but no comparable central chart-selection guideline was located in the current Fluent 2 web guide. Do not infer chart rules from component availability. [React catalog](https://fluent2.microsoft.design/components/web/react/) | Taxonomy spans simple comparison/trend/distribution, flow, and spatial charts, with accuracy and accessibility as goals. [Data visualization](https://www.carbondesignsystem.com/building-blocks/data-visualization/overview) | Extensive chart-choice guidance by relationship (comparison, part-to-whole, time, etc.); micro charts are for small at-a-glance data, not extensive interactive analytics. [Chart guidance](https://www.sap.com/design-system/fiori-design-web/v1-145/foundations/best-practices/ui-elements/charts-vizframe) · [Micro charts](https://www.sap.com/design-system/fiori-design-web/v1-136/ui-elements/micro-chart) |
| **Feedback, errors, motion** | Dialogs interrupt and should be reserved for important decisions; non-action feedback belongs in a toast, contextual help in a popover. Motion should explain change, guide next steps, and remain quick and consistent. [Dialog](https://fluent2.microsoft.design/components/web/react/core/dialog/usage/) · [Motion](https://fluent2.microsoft.design/motion) | Notifications should be relevant, timely, informative, and contextual; empty states explain why data is missing and what to do next. [Notifications](https://www.carbondesignsystem.com/building-blocks/core/patterns/notifications) · [Empty states](https://www.carbondesignsystem.com/building-blocks/core/patterns/empty-states) | Toast is for short non-disruptive feedback; task outcomes and timing are described by interaction guidance. [Toast](https://www.sap.com/design-system/fiori-design-web/v1-142/ui-elements/toast-web-component) · [Timing](https://www.sap.com/design-system/fiori-design-web/v1-145/foundations/interaction/timing) |
| **Accessibility and adaptation** | WCAG AA baseline, semantic heading order, keyboard operation and deliberate focus management, high contrast/reflow. [Accessibility](https://fluent2.microsoft.design/accessibility) | Accessibility is a foundation across component guidance; check keyboard, semantics, focus, contrast, and data-viz encoding. [Accessibility](https://www.carbondesignsystem.com/building-blocks/foundations/accessibility/overview) | Framework and app responsibilities are separate; default themes target WCAG 2.2 contrast, controls support keyboard, focus, responsive layouts, and text resizing. [Accessibility](https://www.sap.com/design-system/fiori-design-web/v1-136/discover/sap-design-system/product-standards/accessibility-in-sap-fiori) |

## Consolidated SkyTrack guideline

These are the synthesis for `skytrack-ui`, not an attempt to clone any vendor's visual identity.

### 1. Design the task and information architecture first

Model the experience in this order:

```text
Audience/role → user goal → task and decision → domain object/data → page pattern → controls/actions/states
```

- Start from the brief, current shell/routes, closest flows/screens, and relevant object or process. Identify role, task frequency, task risk, object lifecycle, and what decision or action the page enables.
- Choose a page pattern from the work: role overview; object list/search; assigned work queue; object detail/create/edit; analytical exploration; or a genuinely sequential guided task. Treat these as decision aids, not mandatory route templates. Fiori's floorplans show how a page type can encode a distinct task, not just a visual style.
- Keep navigation, page titles, object names, filters, and action names coherent across routes. Put actions beside the object or selection they affect. Distinguish page-level, row-level, and selection/batch actions; avoid duplicate actions whose scope is unclear.
- Preserve the user's place when moving between a filtered list and an object detail: retain useful query/filter/view state and provide an obvious return path when the flow requires it. Keep filter controls and their result state consistent.
- Distinguish first-use empty state, no results after search/filter, unavailable/permission state, loading, and failure. Say why the content is absent and give the next useful action. Do not use one generic empty message for all cases.
- Continue applying Owner-approved grouping: keep an object's fields together, order objects by task/dependency, use sections/tabs/steps/split view only when those relationships justify them, show required/safety data, and review 1–3 real task scenarios at mobile size.

### 2. Compose from the installed system

- Inspect the installed package exports, types/source, closest demo, and version before choosing each control or supported composition. Use verified `skytrack-ui` parts and semantic HTML. Vendor examples can inform a pattern, but never establish valid SkyTrack imports or nesting.
- Use library controls for interactions and semantic elements for document structure. A custom local composition is appropriate when the reference/task materially differs; first identify the capability gap and retain the supported controls that still fit.
- Match visible structure, exact labels/order, states, and hierarchy from a faithful reference. Do not replace it with a generic pattern merely because that pattern is common in another system.

### 3. Use tokens and stable hierarchy

- Use SkyTrack semantic tokens for surfaces, text, borders, status, focus, and brand. Keep brand roles separate from success/warning/error meaning. Use a token-linked `color-mix()` or OKLCH derivation only when no existing token gives the needed value; check contrast in light and dark themes.
- Preserve the approved SkyTrack typography, heading semantics, 24/16/12/8px nested surface padding, 16px form gaps, and responsive form column rules. Fluent's 4px ramp, Carbon's 8px grid, and Fiori's 44px cozy touch-area example are vendor-specific systems, not new SkyTrack spacing tokens.
- Use whitespace to show relationships before adding dividers or surfaces. Use a card when a module boundary aids comprehension, not as a default wrapper for each information group.

### 4. Make forms efficient and recoverable

- Ask only for information needed for the task; group fields by object and dependency; order fields predictably. Set each field's width/span from expected value length and type.
- When an input needs a visible label, description, required status, or validation, compose the installed `Field` parts. Do not rely on placeholder text as the only field name. Place clear, actionable validation near the affected field and preserve entered values after a correctable error.
- Prefer one clear primary action per decision surface; use a link for navigation. Keep secondary actions visually quieter and next to the relevant scope.

### 5. Choose record, chart, and summary views by task

- Use a list for independent items with few details, a table when comparing attributes across records, a form for editing field/value pairs, and a chart when users need to perceive patterns or relationships. Do not pick a table or chart just because the library offers one.
- Use `DataTable` when its installed API fits the task: current source includes global search, sorting, column visibility, optional row selection, pagination, and semantic table markup. Treat column visibility as optional and IA-driven; its demo is a reference, not a feature checklist. In checked `0.1.5`, the control is always rendered and no table-level disable prop exists, so select another supported composition if its presence materially conflicts with the task. Compose additional filter/action controls only when needed; do not duplicate built-in controls. Use local semantic table markup only for requirements the component cannot express, while reusing library controls around it.
- For wide tables, constrain horizontal scrolling to the table region. On narrow screens retain essential columns/content and actions; do not make the whole page scroll sideways. Keep sort/filter/selection context understandable.
- Follow the existing [chart choice and rendered legibility rules](../../implementation.md#choose-and-size-charts-for-legibility). Small previews summarize; they must not masquerade as analysis. Make exact values accessible without hover-only interaction.

### 6. Give feedback without breaking flow

- Use inline field feedback for correction, page/section messages for consequential state, and toast feedback for brief non-action confirmations. Use a dialog only when the task needs focused input or confirmation before continuing; reserve alert-dialog interruption for meaningful risk or loss.
- Loading, saving, disabled, empty, success, warning, and error states must describe the actual local/demo state. Avoid visual flicker and avoid animation that delays task completion.
- Motion should explain a state or spatial change, keep timing proportional to its content, and respect reduced-motion preferences. Do not add motion only to decorate dense enterprise workflows.

### 7. Validate the complete information path

Review the rendered interface at target desktop/mobile sizes. Check the intended main tasks end to end, keyboard/focus order, heading outline, labels/errors, contrast, zoom/reflow, table/chart legibility, empty/loading/error recovery, and whether users can tell what to do next. State what was not checked. A component catalog or typecheck cannot prove the IA is usable.

## Information architecture findings to carry into SkyTrack

Current SkyTrack rules already cover task-first and domain-first needs, object grouping, risk-aware disclosure, sections/tabs/steps/split view, responsive field spans, navigation inheritance, and scenario review. The research suggests these focused improvements:

1. **Make role and work context explicit before choosing page structure.** Add audience/role, task frequency, object lifecycle, and decision/risk to the IA evidence. This draws on Fiori's role-based content and Carbon's goal-oriented patterns, while preserving SkyTrack's task-first plus domain-first policy.
2. **Name the page's job before choosing components.** Decide whether people need an overview, to find/filter records, process a known queue, inspect/edit one object, or investigate a metric. Then compose controls. Avoid an undifferentiated “dashboard” or generic card grid when the task is really a work queue or record-management flow.
3. **Connect list, detail, and action scope.** For each table/list, define filters, saved/current view, row navigation, selection/batch actions, and object detail entry/return. Keep the result set and user context coherent across drill-down and back navigation. This is especially important for enterprise routes with large datasets.
4. **Specify empty and transition states as part of IA.** Include first-use, zero-result, filtered-empty, loading, no-permission, and failure states in the outline, each with a useful next action. Content structure must still make sense when data is absent.
5. **Model responsive change as a navigation decision.** On mobile, preserve object identity, task priority, and sequence; decide which controls collapse, which detail view becomes a separate page, and how users return. Do not only shrink a desktop grid.
6. **Use a compact traceability map.** For complex screens, record `role → task → object → page pattern → information/actions → states → mobile behavior`. This gives another agent a checkable outline before implementation and a basis for scenario review.

These points extend the current IA policy; they do not require adopting SAP floorplan names, its exact step counts, or any vendor-specific shell.

## Source register

### Microsoft Fluent 2

- [Web React overview](https://fluent2.microsoft.design/components/web/react/) — current React component catalog.
- [Design principles](https://fluent2.microsoft.design/design-principles), [layout](https://fluent2.microsoft.design/layout), [tokens](https://fluent2.microsoft.design/design-tokens), [accessibility](https://fluent2.microsoft.design/accessibility), [content design](https://fluent2.microsoft.design/content-design), and [motion](https://fluent2.microsoft.design/motion).
- [Field](https://fluent2.microsoft.design/components/web/react/core/field/usage/), [Button](https://fluent2.microsoft.design/components/web/react/core/button/usage/), [Dialog](https://fluent2.microsoft.design/components/web/react/core/dialog/usage/), and [List](https://fluent2.microsoft.design/components/web/react/core/list/usage/) guidance.

### IBM Carbon

- [About Carbon](https://www.carbondesignsystem.com/getting-started/about-carbon) and [development overview](https://www.carbondesignsystem.com/getting-started/developing/overview) — system layers and docs organization.
- [2x Grid](https://www.carbondesignsystem.com/building-blocks/foundations/2x-grid/overview), [spacing](https://www.carbondesignsystem.com/building-blocks/foundations/spacing/overview), [typography](https://www.carbondesignsystem.com/building-blocks/foundations/typography/overview), [color](https://www.carbondesignsystem.com/building-blocks/foundations/color/overview), [motion](https://www.carbondesignsystem.com/building-blocks/foundations/motion/overview), and [accessibility](https://www.carbondesignsystem.com/building-blocks/foundations/accessibility/overview).
- [Patterns overview](https://www.carbondesignsystem.com/building-blocks/core/patterns/overview), [forms](https://www.carbondesignsystem.com/building-blocks/core/patterns/forms), [search](https://www.carbondesignsystem.com/building-blocks/core/patterns/search), [filtering](https://www.carbondesignsystem.com/building-blocks/core/patterns/filtering), [notifications](https://www.carbondesignsystem.com/building-blocks/core/patterns/notifications), [empty states](https://www.carbondesignsystem.com/building-blocks/core/patterns/empty-states), [data table](https://www.carbondesignsystem.com/building-blocks/core/components/data-table/guidelines), [pagination](https://www.carbondesignsystem.com/building-blocks/core/components/pagination/guidelines), [Button](https://www.carbondesignsystem.com/building-blocks/core/components/button/guidelines), and [data visualization](https://www.carbondesignsystem.com/building-blocks/data-visualization/overview).

### SAP Fiori for Web

- [Fiori for Web](https://www.sap.com/design-system/fiori-design-web/) and [SAP Design System layers](https://www.sap.com/design-system/fiori-design-web/v1-145/discover/sap-design-system/sap-fiori).
- [Design principles](https://www.sap.com/design-system/fiori-design-web/v1-142/discover/sap-design-system/vision-and-mission/design-principles), [tokens](https://www.sap.com/design-system/fiori-design-web/v1-136/foundations/visual/design-tokens), [theming](https://www.sap.com/design-system/fiori-design-web/v1-145/foundations/visual/theming), [accessibility](https://www.sap.com/design-system/fiori-design-web/v1-136/discover/sap-design-system/product-standards/accessibility-in-sap-fiori), [cozy/compact density](https://www.sap.com/design-system/fiori-design-web/v1-120/foundations/visual/cozy-compact), [timing](https://www.sap.com/design-system/fiori-design-web/v1-145/foundations/interaction/timing), and [UI text guidelines](https://www.sap.com/design-system/fiori-design-web/v1-136/foundations/writing-and-wording/ux-writing/ui-text-guidelines-for-sap-fiori).
- [Floorplan choice](https://www.sap.com/design-system/fiori-design-web/v1-148/page-types/floorplans/when-to-use-which-floorplan), [list report details](https://www.sap.com/design-system/fiori-design-web/v1-38/page-types/floorplans/list-report/), [form](https://www.sap.com/design-system/fiori-design-web/v1-145/ui-elements/form-web-component), [table overview](https://www.sap.com/design-system/fiori-design-web/v1-145/foundations/best-practices/ui-elements/tables/table-overview), [charts](https://www.sap.com/design-system/fiori-design-web/v1-145/foundations/best-practices/ui-elements/charts-vizframe), [micro charts](https://www.sap.com/design-system/fiori-design-web/v1-136/ui-elements/micro-chart), and [toast](https://www.sap.com/design-system/fiori-design-web/v1-142/ui-elements/toast-web-component).
