import * as React from 'react'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  Scatter,
  ScatterChart,
  XAxis,
  YAxis
} from 'recharts'
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig
} from '@/components/ui/chart'
import type { DemoMeta } from '@/showcase/demo'

const monthlyFlights = [
  { month: 'Jan', planned: 18, completed: 14 },
  { month: 'Feb', planned: 22, completed: 19 },
  { month: 'Mar', planned: 25, completed: 21 },
  { month: 'Apr', planned: 20, completed: 17 },
  { month: 'May', planned: 29, completed: 26 },
  { month: 'Jun', planned: 32, completed: 28 }
]

const monthlyHours = [
  { month: 'Jan', hours: 72 },
  { month: 'Feb', hours: 96 },
  { month: 'Mar', hours: 88 },
  { month: 'Apr', hours: 110 },
  { month: 'May', hours: 126 },
  { month: 'Jun', hours: 118 }
]

const baseComposition = [
  { base: 'North', mapping: 18, inspection: 12 },
  { base: 'Central', mapping: 14, inspection: 16 },
  { base: 'South', mapping: 22, inspection: 10 }
]

const missionOutcomes = [
  { status: 'Complete', count: 12 },
  { status: 'In review', count: 8 },
  { status: 'Draft', count: 5 }
]

const flightInspectionPoints = [
  { hours: 2.1, inspection: 34 },
  { hours: 3.4, inspection: 42 },
  { hours: 4.2, inspection: 51 },
  { hours: 5.1, inspection: 48 },
  { hours: 6.3, inspection: 67 },
  { hours: 7.4, inspection: 72 }
]

const monthlyConfig = {
  planned: { label: 'Planned', color: 'var(--chart-2)' },
  completed: { label: 'Completed', color: 'var(--chart-1)' }
} satisfies ChartConfig

const hoursConfig = {
  hours: { label: 'Flight hours', color: 'var(--chart-3)' }
} satisfies ChartConfig

const baseConfig = {
  mapping: { label: 'Mapping', color: 'var(--chart-1)' },
  inspection: { label: 'Inspection', color: 'var(--chart-4)' }
} satisfies ChartConfig

const outcomeConfig = {
  complete: { label: 'Complete', color: 'var(--chart-1)' },
  'in-review': { label: 'In review', color: 'var(--chart-2)' },
  draft: { label: 'Draft', color: 'var(--chart-4)' },
  count: { label: 'Records', color: 'var(--chart-1)' }
} satisfies ChartConfig

const scatterConfig = {
  hours: { label: 'Flight hours', color: 'var(--chart-2)' },
  inspection: { label: 'Inspection findings', color: 'var(--chart-5)' }
} satisfies ChartConfig

function ChartExample({
  title,
  description,
  summary,
  config,
  children
}: {
  title: string
  description: string
  summary: string
  config: ChartConfig
  children: React.ReactElement
}) {
  return (
    <section
      className='w-full max-w-4xl space-y-3'
      aria-labelledby={`${title.toLowerCase().replaceAll(/[^a-z0-9]+/g, '-')}-heading`}
    >
      <div>
        <h3
          id={`${title.toLowerCase().replaceAll(/[^a-z0-9]+/g, '-')}-heading`}
          className='text-lg font-medium text-(--foreground)'
        >
          {title}
        </h3>
        <p className='text-sm text-muted-foreground'>{description}</p>
      </div>
      <ChartContainer config={config} className='h-64 w-full'>
        {children}
      </ChartContainer>
      <p className='text-xs text-muted-foreground'>Sample data — {summary}</p>
    </section>
  )
}

function MissionActivityBarChart() {
  return (
    <ChartExample
      title='Planned and completed flights'
      description='Compare sample flight counts by month, January to June.'
      summary='planned/completed counts: Jan 18/14, Feb 22/19, Mar 25/21, Apr 20/17, May 29/26, Jun 32/28.'
      config={monthlyConfig}
    >
      <BarChart accessibilityLayer data={monthlyFlights} margin={{ left: 8, right: 8 }}>
        <CartesianGrid vertical={false} stroke='var(--border)' />
        <XAxis dataKey='month' tickLine={false} axisLine={false} tickMargin={8} />
        <YAxis width={32} tickLine={false} axisLine={false} />
        <ChartTooltip cursor={false} content={<ChartTooltipContent className='rounded-(--radius)' />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey='planned' fill='var(--color-planned)' radius={0} />
        <Bar dataKey='completed' fill='var(--color-completed)' radius={0} />
      </BarChart>
    </ChartExample>
  )
}

function FlightHoursLineChart() {
  return (
    <ChartExample
      title='Flight hours over time'
      description='Follow a single sample measure across six months.'
      summary='flight hours: Jan 72, Feb 96, Mar 88, Apr 110, May 126, Jun 118.'
      config={hoursConfig}
    >
      <LineChart accessibilityLayer data={monthlyHours} margin={{ left: 8, right: 12 }}>
        <CartesianGrid vertical={false} stroke='var(--border)' />
        <XAxis dataKey='month' tickLine={false} axisLine={false} tickMargin={8} />
        <YAxis width={32} tickLine={false} axisLine={false} />
        <ChartTooltip cursor={false} content={<ChartTooltipContent className='rounded-(--radius)' />} />
        <Line
          dataKey='hours'
          type='monotone'
          stroke='var(--color-hours)'
          strokeWidth={2}
          dot={false}
          activeDot={false}
        />
      </LineChart>
    </ChartExample>
  )
}

function BaseCompositionChart() {
  return (
    <ChartExample
      title='Work by base'
      description='Compare totals and their two sample categories.'
      summary='mapping/inspection counts: North 18/12, Central 14/16, South 22/10.'
      config={baseConfig}
    >
      <BarChart accessibilityLayer data={baseComposition} margin={{ left: 8, right: 12 }}>
        <CartesianGrid vertical={false} stroke='var(--border)' />
        <XAxis dataKey='base' tickLine={false} axisLine={false} tickMargin={8} />
        <YAxis width={32} tickLine={false} axisLine={false} />
        <ChartTooltip cursor={false} content={<ChartTooltipContent className='rounded-(--radius)' />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey='mapping' stackId='work' fill='var(--color-mapping)' radius={0} />
        <Bar dataKey='inspection' stackId='work' fill='var(--color-inspection)' radius={0} />
      </BarChart>
    </ChartExample>
  )
}

function FlightHoursAreaChart() {
  return (
    <ChartExample
      title='Flight-hour magnitude'
      description='Use filled area to emphasize the changing magnitude of one time series.'
      summary='flight hours: Jan 72, Feb 96, Mar 88, Apr 110, May 126, Jun 118.'
      config={hoursConfig}
    >
      <AreaChart accessibilityLayer data={monthlyHours} margin={{ left: 8, right: 12 }}>
        <CartesianGrid vertical={false} stroke='var(--border)' />
        <XAxis dataKey='month' tickLine={false} axisLine={false} tickMargin={8} />
        <YAxis width={32} tickLine={false} axisLine={false} />
        <ChartTooltip cursor={false} content={<ChartTooltipContent className='rounded-(--radius)' />} />
        <Area
          dataKey='hours'
          type='monotone'
          stroke='var(--color-hours)'
          fill='var(--color-hours)'
          fillOpacity={0.18}
          dot={false}
          activeDot={false}
        />
      </AreaChart>
    </ChartExample>
  )
}

function OutcomePieChart() {
  const colors = ['var(--color-complete)', 'var(--color-in-review)', 'var(--color-draft)']

  return (
    <ChartExample
      title='Sample record outcomes'
      description='Show a small part-to-whole distribution with three categories.'
      summary='Complete 12, In review 8, Draft 5; 25 sample records total.'
      config={outcomeConfig}
    >
      <PieChart accessibilityLayer>
        <ChartTooltip cursor={false} content={<ChartTooltipContent className='rounded-(--radius)' />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Pie data={missionOutcomes} dataKey='count' nameKey='status' innerRadius={42} outerRadius={82}>
          {missionOutcomes.map((entry, index) => (
            <Cell key={entry.status} fill={colors[index]} />
          ))}
        </Pie>
      </PieChart>
    </ChartExample>
  )
}

function FlightHoursScatterChart() {
  return (
    <ChartExample
      title='Flight hours and sample inspection findings'
      description='Explore how two sample numeric measures vary together; this does not imply causation.'
      summary='hours/findings: 2.1/34, 3.4/42, 4.2/51, 5.1/48, 6.3/67, 7.4/72.'
      config={scatterConfig}
    >
      <ScatterChart accessibilityLayer margin={{ left: 8, right: 12, top: 12 }}>
        <CartesianGrid stroke='var(--border)' />
        <XAxis
          type='number'
          dataKey='hours'
          name='Flight hours'
          unit=' h'
          tickLine={false}
          axisLine={false}
          label={{ value: 'Flight hours', position: 'insideBottom', offset: -4 }}
        />
        <YAxis
          type='number'
          dataKey='inspection'
          name='Inspection findings'
          width={44}
          tickLine={false}
          axisLine={false}
          label={{ value: 'Findings', angle: -90, position: 'insideLeft' }}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent className='rounded-(--radius)' />} />
        <Scatter data={flightInspectionPoints} fill='var(--color-hours)' shape='square' />
      </ScatterChart>
    </ChartExample>
  )
}

export const demo: DemoMeta = {
  id: 'chart',
  title: 'Chart',
  description: 'Composable responsive charts built with Recharts and SkyTrack theme tokens.',
  group: 'Data Display',
  variants: [
    { name: 'BAR CHART', render: () => <MissionActivityBarChart /> },
    { name: 'LINE CHART', render: () => <FlightHoursLineChart /> },
    { name: 'STACKED BAR', render: () => <BaseCompositionChart /> },
    { name: 'AREA CHART', render: () => <FlightHoursAreaChart /> },
    { name: 'PIE CHART', render: () => <OutcomePieChart /> },
    { name: 'SCATTER CHART', render: () => <FlightHoursScatterChart /> }
  ]
}
