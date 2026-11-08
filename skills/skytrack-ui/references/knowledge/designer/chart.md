# Chart

> A visual summary that helps people compare values, patterns, or change over time.

- Package version: `0.1.5`
- Public export: `skytrack-ui/chart`
- Implementation: [`src/components/ui/chart.tsx`](../../../../../src/components/ui/chart.tsx)
- Public type declaration: Target `./dist-lib/components/ui/chart.d.ts` declared in [`package.json`](../../../../../package.json) is absent from this checkout; exported types verified in [`src/components/ui/chart.tsx`](../../../../../src/components/ui/chart.tsx).
- Showcase demo id: `chart`
- Closest demo: [`src/demos/chart.demo.tsx`](../../../../../src/demos/chart.demo.tsx)

## Usage

Use Chart to help people compare values, see a pattern, or understand change over time.

- **Fit:** Comparing trends, categories, or distributions over time.
- **Avoid:** Looking up exact numerical values (use Data Table), or a single value that is clearer as a labeled summary.
- **Best alternative:** For exact tabular inspection, use Data Table.

**Live demo variant:** `BAR CHART`

## Types

Match the chart to the relationship people need to understand:

- **Bar:** Compare values across discrete categories; use a horizontal bar when ranking or longer category labels need room.
- **Stacked bar:** Compare totals and their parts across a small set of categories.
- **Line:** Follow change over time; show only series people can distinguish. Filter or split the chart when lines or legend entries become hard to match.
- **Area:** Show how a value or total changes over time when the filled shape helps communicate magnitude.
- **Stacked area:** Show how parts contribute to a changing total over time, with few distinguishable series.
- **Pie:** Show parts of one whole only when slices and labels remain easy to distinguish. Use bars or a table when categories are numerous or close in value.
- **Scatter:** Explore how two numeric measures vary together; describe association without implying causation.

The examples show category comparison and ranking, category composition, trends and magnitude over time, a small part-to-whole set, and the relationship between two measures.

The interactive examples are `BAR CHART`, `LINE CHART`, `STACKED BAR`, `AREA CHART`, `PIE CHART`, and `SCATTER CHART`. Each displays its sample values as text; the outcome example contains 25 sample records and does not display rounded percentages.

## Behavior

Keep the metric, period, and main comparison visible without requiring hover. Use tooltips only for supporting values that benefit from closer inspection.

- **Interaction:** Make marks and their values available to pointer and keyboard users when the chart supports interactive detail (such as tooltips). Keep series names visible in a clear, static legend.
- **Responsiveness:** Keep the chart and its labels readable as the available space changes.

| Do                                                                                | Don't                                                                  | Why                                                                            |
| --------------------------------------------------------------------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| Keep only as many series as people can distinguish, and filter or split the rest. | Overlay series when lines or legend entries cannot be matched clearly. | Too much visual density makes patterns hard to see and values easy to confuse. |

**Live demo variant:** `BAR CHART`

## Layout

Place charts in a clearly titled section with enough spacing to separate the data from surrounding content.

- **Rendered check:** At the actual chart size and desktop and narrow viewports, can people identify the measure, units and time context, read labels and legend without overlap or clipping, compare the marks, and access exact values without relying on color or hover alone?
- **When it fails:** Choose a chart type that better fits the comparison, give it more space, simplify the labels, filter or split the data, use small multiples, or provide a table or summary linked to the full data. Do not use one universal pixel minimum.
- **Mobile adaptation:** Keep axis labels legible; reduce tick density or choose a different chart rather than clipping or shrinking text.
- **Decision reference:** Apply [SkyTrack's chart-choice and rendered-legibility criteria](../../UI_RULES.md#chart-choice-and-legibility).

**Live demo variant:** `BAR CHART`

## Accessibility

Do not rely on color or hover alone. Use labels or patterns to distinguish series, maintain stable category and semantic color meanings across views, and provide a concise text summary or accessible table for the data and takeaway.

**Live demo variant:** `BAR CHART`

## Content

Chart titles should state the measure and time period when relevant (e.g., “Orders per month, January–June”).

- **Axes:** Label measures and units when they are not obvious (e.g., “Revenue (USD)” or “Completion (%)”).
- **Legends:** Keep series labels concise and position legends above or below the plot area.
- **Formatting:** Format numbers, currencies, percentages, and dates according to the user's locale so values and timestamps are unambiguous.
- **Color consistency:** Map a category to the same `--chart-1` through `--chart-10` token across related charts. The shared palette offers two shades of blue, orange, teal, purple, and pink; reserve functional status colors (e.g., success, warning, destructive) for actual status indicators rather than generic categories.

**Live demo variant:** `BAR CHART`
