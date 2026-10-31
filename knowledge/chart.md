# Chart

> Composable responsive charts built with Recharts and SkyTrack theme tokens.

- Package version: `0.1.5`
- Public export: `skytrack-ui/chart`
- Implementation: [`src/components/ui/chart.tsx`](../src/components/ui/chart.tsx)
- Public type declaration: Target `./dist-lib/components/ui/chart.d.ts` declared in [`package.json`](../package.json) is absent from this checkout; exported types verified in [`src/components/ui/chart.tsx`](../src/components/ui/chart.tsx).
- Showcase demo id: `chart`
- Closest demo: [`src/demos/chart.demo.tsx`](../src/demos/chart.demo.tsx)

## Overview

The Chart component integrates Recharts visualizations with SkyTrack design system tokens, responsive containers, accessible tooltips, and legends. It visualizes quantitative flight telemetry, battery discharge curves, fleet mission completion rates, and sensor coverage distributions.

Through `ChartContainer`, theme colors are dynamically registered into CSS custom properties (`--color-<key>`), ensuring consistent light/dark styling without hardcoded hex codes.

**Live demo variant:** `BAR CHART`

```tsx
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart'

const chartData = [
  { month: 'Jan', flights: 42 },
  { month: 'Feb', flights: 58 },
  { month: 'Mar', flights: 65 }
]

const chartConfig = {
  flights: { label: 'Completed flights', color: 'var(--chart-1)' }
} satisfies ChartConfig

export function ChartExample() {
  return (
    <ChartContainer config={chartConfig} className='h-48 w-full max-w-md'>
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} stroke='var(--border)' />
        <XAxis dataKey='month' tickLine={false} axisLine={false} />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <Bar dataKey='flights' fill='var(--color-flights)' radius={4} />
      </BarChart>
    </ChartContainer>
  )
}
```

## Usage

Use Chart for visual trend inspection, comparative metric analysis, and telemetry monitoring across time and fleet segments.

Do not use Chart when users need exact values for dense tabular records (use `skytrack-ui/data-table`). Follow the [chart-choice and legibility rules](../UI_RULES.md#chart-choice-and-legibility): treat five pie slices as the recommended maximum and four to five line series as a readability ceiling. Above those levels, use a sorted bar, small multiples, filtering/focus, or a companion table unless the task or reference justifies an exception and the rendered chart remains legible. Always pair chart graphics with clear titles and visible data units.

**Live demo variant:** `BAR CHART`

## Anatomy

Compose in hierarchy:

1. `ChartContainer`: Top-level wrapper managing dynamic CSS color variable injection (`data-slot='chart'`).
2. Recharts primitive: `<BarChart>`, `<LineChart>`, `<AreaChart>`, etc. Always include `accessibilityLayer`.
3. Cartesian axes: `<CartesianGrid>`, `<XAxis>`, `<YAxis>`.
4. `ChartTooltip` & `ChartTooltipContent`: Formatted overlay displaying hovered data points.
5. `ChartLegend` & `ChartLegendContent`: Config-driven series legend.
6. Graphic series: `<Bar>`, `<Line>`, etc. using CSS variable fills (e.g. `var(--color-planned)`).

**Live demo variant:** `BAR CHART`

## Variants & states

Supported chart types via Recharts:

- Bar Charts: Discrete category comparisons (e.g. monthly flight counts).
- Line / Area Charts: Continuous telemetry and temporal trends (e.g. altitude or speed over time).

Tooltips:

- Supports single-point inspection or multi-series comparison via `indicator='line'`, `indicator='dot'`, or `indicator='dashed'`.
- Format values through `formatter` callback in `ChartTooltipContent`.

**Live demo variant:** `BAR CHART`

## Accessibility

- Always enable `accessibilityLayer` on the root Recharts element to generate semantic SVG tab-stops and keyboard navigation.
- Colors must be defined via SkyTrack chart tokens (`--chart-1` through `--chart-5`), tested for contrast in light and dark themes.
- When color alone distinguishes categories, ensure tooltips and legends present textual labels.
- Provide a summary text description or companion data table for screen reader users.

**Live demo variant:** `BAR CHART`

## API & examples

Import `ChartContainer`, `ChartTooltip`, `ChartTooltipContent`, `ChartLegend`, `ChartLegendContent`, and `type ChartConfig` from `skytrack-ui/chart` (or `@/components/ui/chart` locally).

| Export                | Type                                                                          | Description                                                 |
| --------------------- | ----------------------------------------------------------------------------- | ----------------------------------------------------------- |
| `ChartContainer`      | `Component`                                                                   | Responsive container injecting CSS variables from `config`  |
| `ChartConfig`         | `Record<string, { label?: ReactNode; color?: string; icon?: ComponentType }>` | Color and label definition dictionary                       |
| `ChartTooltipContent` | `Component`                                                                   | Formatted tooltip card supporting indicators and formatters |
| `ChartLegendContent`  | `Component`                                                                   | Formatted legend row reading config labels                  |

Tokens: Uses `--chart-1` through `--chart-5`, `--border`, `--popover`, and `--popover-foreground`.

**Live demo variant:** `BAR CHART`

## Evidence and limits

- Package/version checked: `0.1.5`.
- Export: [`package.json`](../package.json) — `./chart`.
- Source, public declarations, and closest demo: linked above.
- Limits or unverified behavior: Target declaration `./dist-lib/components/ui/chart.d.ts` is absent in `dist-lib`; source types verified in `src/components/ui/chart.tsx`. Requires `recharts` peer dependency.
