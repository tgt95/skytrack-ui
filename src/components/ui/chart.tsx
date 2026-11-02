import * as React from 'react'
import * as Recharts from 'recharts'
import { cn } from '@/lib/utils'

export type ChartConfig = Record<
  string,
  {
    label?: React.ReactNode
    color?: string
    icon?: React.ComponentType<{ className?: string }>
  }
>

type ChartContextValue = { config: ChartConfig }
const ChartContext = React.createContext<ChartContextValue | null>(null)

function useChart() {
  const context = React.useContext(ChartContext)
  if (!context) throw new Error('Chart components must be rendered inside <ChartContainer>.')
  return context
}

export type ChartContainerProps = React.ComponentProps<'div'> & {
  config: ChartConfig
  children: React.ReactElement
}

function ChartContainer({ config, children, className, style, ...props }: ChartContainerProps) {
  const colors = Object.fromEntries(
    Object.entries(config)
      .filter(([, item]) => item.color)
      .map(([key, item]) => [`--color-${key}`, item.color!])
  ) as React.CSSProperties

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-slot='chart-container'
        className={cn('relative flex w-full items-center justify-center text-xs', className)}
        style={{ ...colors, ...style }}
        {...props}
      >
        <Recharts.ResponsiveContainer>{children}</Recharts.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  )
}

function ChartTooltipContent({
  active,
  payload,
  label,
  hideLabel = false,
  className
}: {
  active?: boolean
  payload?: Array<{
    dataKey?: string | number
    name?: string | number
    value?: string | number
    color?: string
  }>
  label?: React.ReactNode
  hideLabel?: boolean
  className?: string
}) {
  const { config } = useChart()
  if (!active || !payload?.length) return null

  return (
    <div
      className={cn(
        'grid min-w-32 gap-1.5 border border-border bg-popover px-3 py-2 text-xs text-popover-foreground shadow-md',
        className
      )}
    >
      {!hideLabel && <div className='font-medium'>{label}</div>}
      <div className='grid gap-1'>
        {payload.map((item, index) => {
          const key = String(item.dataKey ?? item.name ?? index)
          const entry = config[key]
          const Icon = entry?.icon
          return (
            <div key={`${key}-${index}`} className='flex items-center gap-2'>
              {Icon ? (
                <Icon className='size-3.5' />
              ) : (
                <span className='size-2.5' style={{ backgroundColor: item.color ?? entry?.color }} />
              )}
              <span className='flex-1 text-muted-foreground'>{entry?.label ?? item.name ?? key}</span>
              <span className='font-mono font-medium tabular-nums'>{item.value}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function ChartLegendContent({
  payload,
  className
}: {
  payload?: Array<{ dataKey?: string | number; value?: string | number; color?: string }>
  className?: string
}) {
  const { config } = useChart()
  if (!payload?.length) return null

  return (
    <div className={cn('flex flex-wrap items-center justify-center gap-x-4 gap-y-2', className)}>
      {payload.map((item, index) => {
        const key = String(item.dataKey ?? item.value ?? index)
        const entry = config[key]
        const Icon = entry?.icon
        return (
          <span key={`${key}-${index}`} className='flex items-center gap-1.5 text-muted-foreground'>
            {Icon ? (
              <Icon className='size-3.5' />
            ) : (
              <span className='size-2.5' style={{ backgroundColor: item.color ?? entry?.color }} />
            )}
            {entry?.label ?? item.value ?? key}
          </span>
        )
      })}
    </div>
  )
}

const ChartTooltip = Recharts.Tooltip
const ChartLegend = Recharts.Legend

export { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, useChart }
