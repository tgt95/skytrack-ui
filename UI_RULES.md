# UI implementation policy

For UI work, apply the portable implementation rules in
[design-system-implementation.md](../../../agents/design-system-implementation.md).
They apply even when the skill is not invoked. Read the library's
[AGENT_GUIDE.md](AGENT_GUIDE.md) for project-specific component examples and defaults.

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

## Chart choice and legibility

For each chart, identify the data question, audience/task, comparison precision, categories/series, units/time range, and whether it is an analytical chart or a compact preview. Choose an encoding that answers that question; use a table or labeled values when exact lookup is primary. Treat five pie slices as the recommended maximum and four to five line series as a readability ceiling. Above those levels, default to a sorted bar, small multiples, filtering/focus, or a companion table; disclose any semantically valid aggregation. An exception requires a task/reference reason and must pass the rendered legibility checks.

Do not set one minimum pixel size for all charts. Inspect usable chart area after labels, axes, legend, and annotations at actual desktop and narrow viewports. All necessary text and categories must remain identifiable without overlap, clipping, ambiguous truncation, or reliance on color/hover alone; exact values must be available through visible labels or a semantic table. If it does not fit, change the chart, split/filter the data, or provide a summary linking to a full view. A 40 × 40 px graphic is icon-sized and may only cue one simple metric/trend when paired with a visible label/value and access to full detail when needed; it cannot present ten pie categories for analysis. See [design-system-implementation.md](../../../agents/design-system-implementation.md#choose-and-size-charts-for-legibility) for the decision and review checklist.

For marketing, organize the page as a narrative around audience, primary message, and desired action; do not force product data-object grouping. See the skill's [creative-direction guide](../../../.agents/skills/design-system-delivery/references/creative-direction.md).
