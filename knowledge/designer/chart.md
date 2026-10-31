# Chart

> A visual summary that helps people compare values, patterns, or change over time.

- Package version: `0.1.5`
- Public export: `skytrack-ui/chart`
- Implementation: [`src/components/ui/chart.tsx`](../../src/components/ui/chart.tsx)
- Public type declaration: Target `./dist-lib/components/ui/chart.d.ts` declared in [`package.json`](../../package.json) is absent from this checkout; exported types verified in [`src/components/ui/chart.tsx`](../../src/components/ui/chart.tsx).
- Showcase demo id: `chart`
- Closest demo: [`src/demos/chart.demo.tsx`](../../src/demos/chart.demo.tsx)
- Official guidance: [Carbon Design System Chart Types](https://carbondesignsystem.com/data-visualization/chart-types/)

## Usage

Use Chart to help people compare values, see a pattern, or understand change over time.

- **Fit:** Comparing trends, categories, or distributions over time.
- **Avoid:** Looking up exact numerical values (use Data Table), or a single value that is clearer as a labeled summary.
- **Best alternative:** For exact tabular inspection, use Data Table.

**Live demo variant:** `BAR CHART`

## Types

Choose the chart form that makes the comparison easiest to read:

- **Bar chart:** Compare a small set of categories (e.g. orders by month).
- **Line / Area Chart:** Show a trend over a continuous period (for example, monthly revenue or weekly sign-ups).
- **Labels and legend:** Name each series clearly. Use a legend when direct labels would clutter the chart.

**Live demo variant:** `BAR CHART`

## Behavior

Charts can reveal additional values on hover, focus, or tap. Keep key comparisons visible without requiring a tooltip.

- **Interaction:** Hovering or focusing a mark reveals its value; selecting a legend item can hide or show a series.
- **Responsiveness:** Keep the chart and its labels readable as the available space changes.

| Do                                                               | Don't                                                                    | Why                                                                            |
| ---------------------------------------------------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| Keep the number of series low enough to distinguish and compare. | Put many overlapping series in one chart without a way to separate them. | Too much visual density makes patterns hard to see and values easy to confuse. |

**Live demo variant:** `BAR CHART`

## Layout

Place charts in a clearly titled section with enough spacing to separate the data from surrounding content.

- **Size:** Give the chart enough space for its marks, labels, and legend to remain readable. Check it at the actual size and viewport where people will use it.
- **Mobile adaptation:** Ensure axes labels remain legible on narrow screens; rotate labels or reduce tick density rather than clipping text.

**Live demo variant:** `BAR CHART`

## Accessibility

Do not rely on color or hover alone. Use labels or patterns to distinguish series and provide a concise text summary or accessible table for the data and takeaway.

**Live demo variant:** `BAR CHART`

## Content

Chart titles should state the measure and time period when relevant (e.g., “Orders per month, January–June”).

- **Axes:** Label measures and units when they are not obvious (e.g., “Revenue (USD)” or “Completion (%)”).
- **Legends:** Keep series labels short (1–3 words) and position legends above or below the plot area.

**Live demo variant:** `BAR CHART`
