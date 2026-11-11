# Report and dashboard UX guidelines

Use this guide when shaping a data-heavy report, dashboard, or operational overview. It distills the supplied `report_ux_guidelines_citations.md` into design checks. These are research-informed heuristics, not package API rules, product requirements, or proof that a metric supports a particular decision.

## Start from the decision

Before choosing charts or cards, identify:

- Audience and role: who reads this view, and what level of detail do they need?
- Decision or task: what should the reader understand or do after scanning it?
- Time frame, data grain, refresh cadence, and source of each metric.
- Whether this is a snapshot report, an operational dashboard, or an analytical exploration surface.

Shape the report around the decision. Executives may need a concise outcome and material exceptions; operators may need progress, blockers, and record-level follow-up. Avoid showing every audience the same undifferentiated dataset.

## Build a scannable information hierarchy

1. Lead with a short, evidence-backed headline that states the main finding. Keep a neutral title when the data does not support a clear conclusion.
2. Summarize the few metrics needed to orient the reader.
3. Show trends, comparisons, segments, and material exceptions.
4. Put detailed records and methodology farther down or behind an explicit drill-down.

Use the sequence “overview first, zoom and filter, then details on demand” as an information-seeking model, not a mandatory layout. Keep page titles and chart titles descriptive; the headline communicates the takeaway, while chart labels explain what is plotted.

## Give metrics context

Do not leave a prominent number unexplained. Where relevant, show its comparison period, target, benchmark, denominator, unit, and date range. State data freshness and caveats when they affect interpretation. Make positive, negative, and neutral changes clear without requiring readers to calculate them mentally.

Choose a chart that fits the relationship and question: comparison, trend over time, distribution, composition, or spatial relationship. Use a table when readers need exact values, lookup, or record-level comparison. Small trend graphics can support at-a-glance summaries, but should not replace detail needed for accurate analysis.

## Reduce visual noise and improve scanning

- Remove decoration that does not explain data: unnecessary borders, dense gridlines, shadows, gradients, and 3D effects.
- Use whitespace, alignment, typography, and a small number of visual cues to establish hierarchy.
- Highlight meaningful changes and exceptions. Annotate a notable point only when the cause is supported; otherwise label it as an observation to investigate.
- Keep scales, units, date formats, category names, and status semantics consistent across related views.
- Use color with labels, shape, or text. Do not make color the only way to identify status or compare series.

## Make insight actionable without overstating evidence

Pair a finding with a next step only when the action is relevant and authorized in the product context. Link to the affected records or workflow when useful. Separate observed correlation from verified cause; do not turn an anomaly into a causal claim without evidence. Recommendations should state their basis and should not imply an action completed before it has.

## Check states and constraints

Review the report with realistic data and include:

- Empty, no-results, loading, partial, stale, and error states where applicable.
- Long labels, large values, missing values, negative values, and unusually large or small ranges.
- Small screens and narrower containers; preserve the key takeaway and access to detail.
- Keyboard access, meaningful headings and labels, readable contrast, and non-color status cues.
- Clear ownership of units, date ranges, definitions, and data sources.

For component selection, route separately through [`COMPONENT_ROUTING.md`](../COMPONENT_ROUTING.md). Verify every candidate against the installed exports, types, source, and closest demo. Relevant guides may include [Chart](../components/chart.md), [Data Table](../components/data-table.md), [Search](../components/search.md), [Empty states](../patterns/empty-states.md), [Loading](../patterns/loading.md), and [Status indicators](../patterns/status-indicators.md). This guide does not establish supported APIs or compositions.

## Source references

The source document supplied these references. Use them as reading pointers; verify the original passage before quoting a precise claim or applying a numeric threshold.

- Ben Shneiderman, “The Eyes Have It: A Task by Data Type Taxonomy for Information Visualizations” (1996), [DOI](https://doi.org/10.1109/VL.1996.545307). Overview, zoom/filter, and details-on-demand.
- Edward R. Tufte, [The Visual Display of Quantitative Information](https://www.edwardtufte.com/tufte/books_vdqi) and [Sparklines](https://www.edwardtufte.com/bboard/q-and-a-fetch-msg?msg_id=0001OR). Data-ink, visual clutter, and compact trend graphics.
- Stephen Few, [Bullet Graph Design Specification](https://www.perceptualedge.com/articles/misc/Bullet_Graph_Design_Spec.pdf). Comparing a measure with qualitative ranges and targets.
- Nielsen Norman Group, [Dashboards: Making Charts and Graphs Easier to Understand](https://www.nngroup.com/articles/dashboards-preattentive/), [Visual Hierarchy in UX](https://www.nngroup.com/articles/visual-hierarchy-ux-definition/), and [10 Usability Heuristics](https://www.nngroup.com/articles/ten-usability-heuristics/). Scanability, visual hierarchy, and consistency.
- Cole Nussbaumer Knaflic, [Storytelling with Data](https://www.storytellingwithdata.com/books). Clear takeaway and focused data presentation.
- Colin Ware, [Information Visualization: Perception for Design, 4th edition](https://www.sciencedirect.com/book/9780128128756/information-visualization). Visual perception and encoding.
- Alan Cooper et al., [About Face: The Essentials of Interaction Design, 4th edition](https://www.wiley.com/en-us/About+Face%3A+The+Essentials+of+Interaction+Design%2C+4th+Edition-p-9781118766576). Role and task alignment.
