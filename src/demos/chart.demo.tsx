import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig
} from '@/components/ui/chart'
import type { DemoMeta } from '@/showcase/demo'

const data = [
  { month: 'Jan', planned: 18, completed: 14 },
  { month: 'Feb', planned: 22, completed: 19 },
  { month: 'Mar', planned: 25, completed: 21 },
  { month: 'Apr', planned: 20, completed: 17 },
  { month: 'May', planned: 29, completed: 26 },
  { month: 'Jun', planned: 32, completed: 28 }
]

const config = {
  planned: { label: 'Planned', color: 'var(--chart-2)' },
  completed: { label: 'Completed', color: 'var(--chart-1)' }
} satisfies ChartConfig

function MissionChart() {
  return (
    <div className='w-full max-w-2xl'>
      <div className='mb-4'>
        <h3 className='h4'>Mission activity</h3>
        <p className='text-sm text-muted-foreground'>Planned and completed missions by month.</p>
      </div>
      <ChartContainer config={config} className='h-64 w-full'>
        <BarChart accessibilityLayer data={data} margin={{ left: 8, right: 8 }}>
          <CartesianGrid vertical={false} stroke='var(--border)' />
          <XAxis dataKey='month' tickLine={false} axisLine={false} tickMargin={8} />
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey='planned' fill='var(--color-planned)' radius={4} />
          <Bar dataKey='completed' fill='var(--color-completed)' radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  )
}

export const demo: DemoMeta = {
  id: 'chart',
  title: 'Chart',
  description: 'Composable responsive charts built with Recharts and SkyTrack theme tokens.',
  group: 'Data Display',
  variants: [{ name: 'BAR CHART', render: () => <MissionChart /> }]
}
