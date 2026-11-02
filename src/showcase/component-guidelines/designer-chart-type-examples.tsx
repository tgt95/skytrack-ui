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

const comparisonData = [
  { category: 'New', requests: 34 },
  { category: 'Active', requests: 52 },
  { category: 'Resolved', requests: 41 },
  { category: 'On hold', requests: 18 }
]

const trendData = [
  { period: 'W1', opened: 32, resolved: 25 },
  { period: 'W2', opened: 39, resolved: 31 },
  { period: 'W3', opened: 35, resolved: 34 },
  { period: 'W4', opened: 46, resolved: 38 },
  { period: 'W5', opened: 42, resolved: 40 },
  { period: 'W6', opened: 51, resolved: 47 }
]

const stackedCategoryData = [
  { category: 'Email', new: 34, completed: 28 },
  { category: 'Web', new: 42, completed: 36 },
  { category: 'Mobile', new: 29, completed: 31 },
  { category: 'Other', new: 18, completed: 14 }
]

const distributionData = [
  { category: 'New', requests: 34 },
  { category: 'Active', requests: 52 },
  { category: 'Resolved', requests: 41 },
  { category: 'On hold', requests: 18 }
]

const volumeData = [
  { period: 'W1', requests: 32 },
  { period: 'W2', requests: 39 },
  { period: 'W3', requests: 35 },
  { period: 'W4', requests: 46 },
  { period: 'W5', requests: 42 },
  { period: 'W6', requests: 51 }
]

const stackedVolumeData = [
  { period: 'W1', direct: 18, referred: 14 },
  { period: 'W2', direct: 23, referred: 16 },
  { period: 'W3', direct: 20, referred: 15 },
  { period: 'W4', direct: 27, referred: 19 },
  { period: 'W5', direct: 24, referred: 18 },
  { period: 'W6', direct: 31, referred: 20 }
]

const relationshipData = [
  { x: 2, y: 91 },
  { x: 4, y: 84 },
  { x: 6, y: 87 },
  { x: 8, y: 76 },
  { x: 11, y: 79 },
  { x: 13, y: 68 },
  { x: 15, y: 72 },
  { x: 18, y: 61 },
  { x: 21, y: 58 }
]

const comparisonConfig = {
  requests: { label: 'Requests', color: 'var(--chart-1)' }
} satisfies ChartConfig

const trendConfig = {
  opened: { label: 'Opened', color: 'var(--chart-1)' },
  resolved: { label: 'Resolved', color: 'var(--chart-3)' }
} satisfies ChartConfig

const stackedCategoryConfig = {
  new: { label: 'New', color: 'var(--chart-1)' },
  completed: { label: 'Completed', color: 'var(--chart-3)' }
} satisfies ChartConfig

const distributionConfig = {
  requests: { label: 'Requests', color: 'var(--chart-1)' }
} satisfies ChartConfig

const volumeConfig = {
  requests: { label: 'Requests', color: 'var(--chart-2)' }
} satisfies ChartConfig

const stackedVolumeConfig = {
  direct: { label: 'Direct', color: 'var(--chart-1)' },
  referred: { label: 'Referred', color: 'var(--chart-3)' }
} satisfies ChartConfig

const relationshipConfig = {
  responses: { label: 'Responses', color: 'var(--chart-2)' }
} satisfies ChartConfig

const categoryColors = ['var(--chart-1)', 'var(--chart-2)', 'var(--chart-3)', 'var(--chart-4)']

export function ChartBarTypePreview() {
  return (
    <ChartContainer config={comparisonConfig} className='h-60 w-full'>
      <BarChart accessibilityLayer data={comparisonData} margin={{ left: 0, right: 8 }}>
        <CartesianGrid vertical={false} stroke='var(--border)' />
        <XAxis dataKey='category' tickLine={false} axisLine={false} tickMargin={8} />
        <YAxis width={32} tickLine={false} axisLine={false} />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <Bar dataKey='requests' fill='var(--color-requests)' />
      </BarChart>
    </ChartContainer>
  )
}

export function ChartHorizontalBarTypePreview() {
  return (
    <ChartContainer config={comparisonConfig} className='h-60 w-full'>
      <BarChart layout='vertical' accessibilityLayer data={comparisonData} margin={{ left: 4, right: 12 }}>
        <CartesianGrid horizontal={false} stroke='var(--border)' />
        <XAxis type='number' tickLine={false} axisLine={false} />
        <YAxis type='category' dataKey='category' width={78} tickLine={false} axisLine={false} tickMargin={8} />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <Bar dataKey='requests' fill='var(--color-requests)' />
      </BarChart>
    </ChartContainer>
  )
}

export function ChartStackedBarTypePreview() {
  return (
    <ChartContainer config={stackedCategoryConfig} className='h-60 w-full'>
      <BarChart accessibilityLayer data={stackedCategoryData} margin={{ left: 0, right: 8 }}>
        <CartesianGrid vertical={false} stroke='var(--border)' />
        <XAxis dataKey='category' tickLine={false} axisLine={false} tickMargin={8} />
        <YAxis width={32} tickLine={false} axisLine={false} />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <ChartLegend verticalAlign='bottom' content={<ChartLegendContent />} />
        <Bar dataKey='new' stackId='category-total' fill='var(--color-new)' />
        <Bar dataKey='completed' stackId='category-total' fill='var(--color-completed)' />
      </BarChart>
    </ChartContainer>
  )
}

export function ChartLineTypePreview() {
  return (
    <ChartContainer config={trendConfig} className='h-60 w-full'>
      <LineChart accessibilityLayer data={trendData} margin={{ left: 0, right: 8 }}>
        <CartesianGrid vertical={false} stroke='var(--border)' />
        <XAxis dataKey='period' tickLine={false} axisLine={false} tickMargin={8} />
        <YAxis width={32} tickLine={false} axisLine={false} />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <ChartLegend verticalAlign='bottom' content={<ChartLegendContent />} />
        <Line dataKey='opened' stroke='var(--color-opened)' strokeWidth={2} dot={false} />
        <Line dataKey='resolved' stroke='var(--color-resolved)' strokeWidth={2} dot={false} />
      </LineChart>
    </ChartContainer>
  )
}

export function ChartPieTypePreview() {
  return (
    <div className='w-full max-w-sm space-y-2'>
      <ChartContainer config={distributionConfig} className='h-48 w-full'>
        <PieChart accessibilityLayer>
          <ChartTooltip content={<ChartTooltipContent />} />
          <Pie data={distributionData} dataKey='requests' nameKey='category' innerRadius={0} outerRadius='78%'>
            {distributionData.map((item, index) => (
              <Cell key={item.category} fill={categoryColors[index]} />
            ))}
          </Pie>
        </PieChart>
      </ChartContainer>
      <ul className='flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs text-muted-foreground'>
        {distributionData.map((item, index) => (
          <li key={item.category} className='flex items-center gap-1.5'>
            <span className='size-2.5' style={{ backgroundColor: categoryColors[index] }} aria-hidden='true' />
            {item.category}: {item.requests}
          </li>
        ))}
      </ul>
    </div>
  )
}

export function ChartAreaTypePreview() {
  return (
    <ChartContainer config={volumeConfig} className='h-60 w-full'>
      <AreaChart accessibilityLayer data={volumeData} margin={{ left: 0, right: 8 }}>
        <CartesianGrid vertical={false} stroke='var(--border)' />
        <XAxis dataKey='period' tickLine={false} axisLine={false} tickMargin={8} />
        <YAxis width={32} tickLine={false} axisLine={false} />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <Area
          dataKey='requests'
          type='monotone'
          stroke='var(--color-requests)'
          fill='var(--color-requests)'
          fillOpacity={0.24}
        />
      </AreaChart>
    </ChartContainer>
  )
}

export function ChartStackedAreaTypePreview() {
  return (
    <ChartContainer config={stackedVolumeConfig} className='h-60 w-full'>
      <AreaChart accessibilityLayer data={stackedVolumeData} margin={{ left: 0, right: 8 }}>
        <CartesianGrid vertical={false} stroke='var(--border)' />
        <XAxis dataKey='period' tickLine={false} axisLine={false} tickMargin={8} />
        <YAxis width={32} tickLine={false} axisLine={false} />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <ChartLegend verticalAlign='bottom' content={<ChartLegendContent />} />
        <Area
          dataKey='direct'
          type='monotone'
          stackId='volume-total'
          stroke='var(--color-direct)'
          fill='var(--color-direct)'
          fillOpacity={0.35}
        />
        <Area
          dataKey='referred'
          type='monotone'
          stackId='volume-total'
          stroke='var(--color-referred)'
          fill='var(--color-referred)'
          fillOpacity={0.55}
        />
      </AreaChart>
    </ChartContainer>
  )
}

export function ChartScatterTypePreview() {
  return (
    <ChartContainer config={relationshipConfig} className='h-60 w-full'>
      <ScatterChart accessibilityLayer margin={{ left: 0, right: 12, top: 8, bottom: 8 }}>
        <CartesianGrid stroke='var(--border)' />
        <XAxis
          type='number'
          dataKey='x'
          name='Response time'
          unit='h'
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />
        <YAxis type='number' dataKey='y' name='Rating' domain={[0, 100]} width={32} tickLine={false} axisLine={false} />
        <ChartTooltip cursor={{ strokeDasharray: '3 3' }} content={<ChartTooltipContent />} />
        <Scatter name='Responses' data={relationshipData} fill='var(--color-responses)' />
      </ScatterChart>
    </ChartContainer>
  )
}
