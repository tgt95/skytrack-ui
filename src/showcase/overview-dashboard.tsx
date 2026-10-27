import { useState } from 'react'
import {
  CameraIcon,
  CarIcon,
  CheckIcon,
  CloudIcon,
  CoffeeIcon,
  CreditCardIcon,
  DotsThreeIcon,
  GlobeIcon,
  ImageIcon,
  PlusIcon,
  PlusCircleIcon,
  RecordIcon,
  ShoppingCartIcon,
  TelevisionIcon,
  UploadSimpleIcon,
  WalletIcon,
  XIcon
} from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { CheckboxRoot } from '@/components/ui/checkbox'
import { ToggleGroup } from '@/components/ui/toggle-group'
import { Toggle } from '@/components/ui/toggle'
import {
  Select,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectLabel,
  SelectList,
  SelectPopup,
  SelectPortal,
  SelectPositioner,
  SelectTrigger,
  SelectValue,
  SelectIcon
} from '@/components/ui/select'
import { Slider, SliderControl, SliderIndicator, SliderThumb, SliderTrack } from '@/components/ui/slider'
import { Progress, ProgressIndicator, ProgressTrack } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import {
  Combobox,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxInputGroup,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxLabel,
  ComboboxList,
  ComboboxPopup,
  ComboboxPortal,
  ComboboxPositioner,
  ComboboxTrigger
} from '@/components/ui/combobox'
import { Badge } from '@/components/ui/badge'

function Card ({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`flex flex-col gap-4 border border-border bg-card p-6 text-card-foreground ${className}`}>
      {children}
    </div>
  )
}

function CardTitle ({ children }: { children: React.ReactNode }) {
  return <h5 className='h5 heading py-0.5'>{children}</h5>
}

function CardSub ({ children }: { children: React.ReactNode }) {
  return <p className='text-sm text-muted-foreground'>{children}</p>
}

function MiniSelect ({
  label,
  items,
  defaultValue
}: {
  label: string
  items: { value: string; label: string }[]
  defaultValue?: string
}) {
  return (
    <div className='flex min-w-0 flex-col gap-1.5'>
      <Select<string> items={items} defaultValue={defaultValue ?? items[0]?.value}>
        <SelectLabel>{label}</SelectLabel>
        <SelectTrigger className='w-full'>
          <SelectValue />
          <SelectIcon />
        </SelectTrigger>
        <SelectPortal>
          <SelectPositioner side='bottom' align='start' sideOffset={4}>
            <SelectPopup>
              <SelectList>
                {items.map((i) => (
                  <SelectItem key={i.value} value={i.value}>
                    <SelectItemIndicator />
                    <SelectItemText>{i.label}</SelectItemText>
                  </SelectItem>
                ))}
              </SelectList>
            </SelectPopup>
          </SelectPositioner>
        </SelectPortal>
      </Select>
    </div>
  )
}

function Donut ({
  pct,
  size = 180,
  track = 'var(--chart-1)',
  fill = 'var(--chart-2)',
  top,
  sub
}: {
  pct: number
  size?: number
  track?: string
  fill?: string
  top: string
  sub?: string
}) {
  const R = 70
  const C = 2 * Math.PI * R
  return (
    <div className='relative mx-auto' style={{ width: size, height: size }}>
      <svg viewBox='0 0 180 180' className='size-full -rotate-90' aria-hidden='true'>
        <circle cx='90' cy='90' r={R} fill='none' stroke={track} strokeWidth='22' />
        <circle
          cx='90'
          cy='90'
          r={R}
          fill='none'
          stroke={fill}
          strokeWidth='22'
          strokeLinecap='round'
          strokeDasharray={`${(pct / 100) * C} ${C}`}
        />
      </svg>
      <div className='absolute inset-0 flex flex-col items-center justify-center'>
        <span className='text-2xl font-bold'>{top}</span>
        {sub && <span className='text-xs text-muted-foreground'>{sub}</span>}
      </div>
    </div>
  )
}

function AreaSpark ({ points, color = 'var(--chart-1)', id }: { points: number[]; color?: string; id: string }) {
  const W = 300
  const H = 100
  const step = W / (points.length - 1)
  const d = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${(i * step).toFixed(1)},${(H - p * H).toFixed(1)}`).join(' ')
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className='h-24 w-full' role='img' aria-label='Area sparkline'>
      <defs>
        <linearGradient id={id} x1='0' y1='0' x2='0' y2='1'>
          <stop offset='0%' stopColor={color} stopOpacity='0.35' />
          <stop offset='100%' stopColor={color} stopOpacity='0.05' />
        </linearGradient>
      </defs>
      <path d={`${d} L${W},${H} L0,${H} Z`} fill={`url(#${id})`} />
      <path d={d} fill='none' stroke={color} strokeWidth='2' />
    </svg>
  )
}

function Ring ({ pct, label, value }: { pct: number; label: string; value: string }) {
  return (
    <div className='flex items-center gap-3'>
      <svg viewBox='0 0 36 36' className='size-4 shrink-0 text-primary' aria-hidden='true'>
        <circle cx='18' cy='18' r='15.9155' fill='none' stroke='currentColor' strokeWidth='4' className='opacity-20' />
        <circle
          cx='18'
          cy='18'
          r='15.9155'
          fill='none'
          stroke='currentColor'
          strokeWidth='4'
          strokeLinecap='round'
          pathLength={100}
          strokeDasharray={`${pct} 100`}
          transform='rotate(-90 18 18)'
        />
      </svg>
      <span className='flex-1 truncate text-sm'>{label}</span>
      <code className='text-xs text-muted-foreground'>{value}</code>
    </div>
  )
}

const HISTORY = [
  { month: 'Dec', v: 48 },
  { month: 'Jan', v: 66 },
  { month: 'Feb', v: 56 },
  { month: 'Mar', v: 80 },
  { month: 'Apr', v: 44 },
  { month: 'May', v: 92 }
]

function ContributionCard () {
  return (
    <Card>
      <div className='flex flex-col gap-0.5'>
        <div className='flex items-center justify-between gap-2'>
          <CardTitle>Contribution History</CardTitle>
        </div>
        <CardSub>Last 6 months of activity</CardSub>
      </div>
      <div>
        <div className='flex h-44 items-end gap-3'>
          {HISTORY.map((h) => (
            <div key={h.month} className='flex-1 rounded-t-[var(--radius)] bg-chart-2' style={{ height: `${h.v}%` }} />
          ))}
        </div>
        <div className='mt-2 flex gap-3 text-xs text-muted-foreground'>
          {HISTORY.map((h) => (
            <span key={h.month} className='flex-1 text-center'>
              {h.month}
            </span>
          ))}
        </div>
      </div>
      <div className='grid grid-cols-2 gap-3'>
        <div className='bg-muted/60 p-4'>
          <div className='text-sm sub-heading'>Upcoming</div>
          <div className='mt-1 text-lg font-semibold'>May 25, 2024</div>
          <div className='text-sm text-muted-foreground'>$1,000 scheduled</div>
        </div>
        <div className='bg-muted/60 p-4'>
          <div className='text-sm sub-heading'>Auto-save plan</div>
          <div className='mt-1 text-lg font-semibold'>Accelerated</div>
          <div className='text-sm text-muted-foreground'>Recurring weekly</div>
        </div>
      </div>
      <Button className='w-full'>View Full Report</Button>
    </Card>
  )
}

const CURRENCIES = [
  { value: 'usd', label: 'USD — United States Dollar' },
  { value: 'eur', label: 'EUR — Euro' },
  { value: 'vnd', label: 'VND — Vietnamese Dong' }
]

function PayoutCard () {
  const [amount, setAmount] = useState<number | number[]>(2500)
  const n = Array.isArray(amount) ? amount[0] ?? 2500 : amount

  return (
    <Card>
      <div className='flex flex-col gap-0.5'>
        <div className='flex items-center justify-between gap-2'>
          <CardTitle>Payout Threshold</CardTitle>
          <Button variant='ghost' size='icon-sm' aria-label='Close payout card'>
            <XIcon aria-hidden='true' />
          </Button>
        </div>
        <CardSub>Set the minimum balance required before a payout is triggered.</CardSub>
      </div>
      <div>
        <Select<string> items={CURRENCIES} defaultValue='usd'>
          <SelectLabel className='mb-1'>Preferred Currency</SelectLabel>
          <SelectTrigger>
            <SelectValue />
            <SelectIcon />
          </SelectTrigger>
          <SelectPortal>
            <SelectPositioner side='bottom' align='start' sideOffset={4}>
              <SelectPopup>
                <SelectList>
                  {CURRENCIES.map((c) => (
                    <SelectItem key={c.value} value={c.value}>
                      <SelectItemIndicator />
                      <SelectItemText>{c.label}</SelectItemText>
                    </SelectItem>
                  ))}
                </SelectList>
              </SelectPopup>
            </SelectPositioner>
          </SelectPortal>
        </Select>
      </div>
      <div>
        <div className='flex items-baseline justify-between'>
          <span className='text-sm font-medium'>Minimum Payout Amount</span>
          <span className='h4'>${n.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
        </div>
        <Slider
          value={amount}
          min={50}
          max={10000}
          step={50}
          onValueChange={(next: number | readonly number[]) => setAmount(next as number | number[])}
          className='my-2'
        >
          <SliderControl>
            <SliderTrack>
              <SliderIndicator />
              <SliderThumb aria-label='Minimum payout amount' />
            </SliderTrack>
          </SliderControl>
        </Slider>
        <div className='mt-1 flex justify-between text-xs text-muted-foreground'>
          <span className='sub-heading'>$50 (MIN)</span>
          <span className='sub-heading'>$10,000 (MAX)</span>
        </div>
      </div>
      <div>
        <div className='mb-1 text-sm font-medium'>Notes</div>
        <textarea
          placeholder='Add any notes for this payout configuration…'
          rows={4}
          className='w-full resize-y border border-input bg-background px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50'
        />
      </div>
      <Button className='w-full mt-auto'>Save Threshold</Button>
    </Card>
  )
}

function SavingsCard () {
  return (
    <Card className='h-full'>
      <div className='flex flex-col gap-0.5'>
        <div className='flex items-center justify-between gap-2'>
          <CardTitle>Savings Targets</CardTitle>
          <Button variant='outline' size='sm'>
            New Goal
          </Button>
        </div>
        <CardSub>Active milestones for 2024</CardSub>
      </div>

      <div className='bg-muted/60 p-6'>
        <div className='text-sm sub-heading mb-1'>Retirement</div>
        <div className='h2'>$420,000</div>
        <Progress value={65} className='mt-3'>
          <ProgressTrack>
            <ProgressIndicator />
          </ProgressTrack>
        </Progress>
        <div className='mt-2 flex justify-between text-sm'>
          <span className='text-muted-foreground'>65% achieved</span>
          <span className='font-medium'>$273,000</span>
        </div>
      </div>
      <div className='bg-muted/60 p-6'>
        <div className='text-sm sub-heading mb-1'>Real estate</div>
        <div className='h2'>$85,000</div>
        <Progress value={32} className='mt-3'>
          <ProgressTrack>
            <ProgressIndicator />
          </ProgressTrack>
        </Progress>
        <div className='mt-2 flex justify-between text-sm'>
          <span className='text-muted-foreground'>32% achieved</span>
          <span className='font-medium'>$27,200</span>
        </div>
      </div>
      <p className='text-sm text-muted-foreground'>You have not met your targets for this year.</p>
    </Card>
  )
}

const TXNS = [
  { icon: CoffeeIcon, name: 'Blue Bottle Coffee', cat: 'Food & Drink', when: 'Today, 10:24 AM', amt: '-$6.50', hot: false },
  { icon: ShoppingCartIcon, name: 'Whole Foods Market', cat: 'Groceries', when: 'Yesterday', amt: '-$142.30', hot: false },
  { icon: WalletIcon, name: 'Stripe Payout', cat: 'Income', when: 'Oct 12', amt: '+$4,200.00', hot: true },
  { icon: CarIcon, name: 'Uber Technologies', cat: 'Transport', when: 'Oct 11', amt: '-$24.10', hot: false },
  { icon: TelevisionIcon, name: 'Netflix Subscription', cat: 'Entertainment', when: 'Oct 10', amt: '-$19.99', hot: false }
]

export function OverviewDashboard () {
  return (
    <div className='grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3'>
      <ContributionCard />
      <PayoutCard />
      <div className='flex flex-col gap-4'>
        <SavingsCard />
      </div>
      <Card>
        <div className='flex flex-col items-center gap-2 my-auto text-center'>
          <span className='flex size-10 items-center justify-center bg-muted text-lg rounded-(--radius)'>
            <PlusIcon aria-hidden='true' />
          </span>
          <div className='h6'>Distribute Track</div>
          <p className='max-w-64 text-sm text-muted-foreground'>
            Upload your first master to start reaching listeners on Spotify, Apple Music, and more.
          </p>
        </div>
      </Card>
      <Card>
        <div className='flex flex-col gap-1'>
          <div className='text-xs sub-heading'>Claimable Balance</div>
          <div className='flex items-baseline gap-1'>
            <div className='text-3xl sub-heading'>$</div>
            <div className='h1'>32.04</div>
          </div>
        </div>
        <div>
          {/* <span className='inline-flex items-center gap-1.5 border border-border px-2 py-1 text-xs font-medium'>
            <span className='size-1.5 rounded-full bg-chart-2' />
            Pending Setup
          </span> */}
          <Badge status='outline' count='Pending Setup' />
        </div>
        <div className='flex flex-col bg-muted/60 px-4 py-3 text-sm'>
          <div className='flex items-center justify-between py-1'>
            <span className='text-muted-foreground'>Net Royalties</span>
            <span className='font-medium tabular-nums'>$0.00</span>
          </div>
          <div className='flex items-center justify-between py-1'>
            <span className='text-muted-foreground'>Processing Fee</span>
            <span className='font-medium tabular-nums'>-$0.00</span>
          </div>
          <Separator className='my-1' />
          <div className='flex items-center justify-between py-1'>
            <span className='text-muted-foreground'>Total Ready to Claim</span>
            <span className='font-semibold tabular-nums'>$0.00 USD</span>
          </div>
        </div>
        <CardSub>
          Once your bank is connected, balances over $10.00 are automatically eligible for monthly distribution on the
          15th of each month.
        </CardSub>
      </Card>
      <Card>
        <div className='flex items-start justify-between gap-2'>
          <div>
            <CardTitle>Recent Transactions</CardTitle>
            <CardSub>Your latest account activity.</CardSub>
          </div>
          <Button variant='outline' size='sm'>
            View All
          </Button>
        </div>
        <ul className='flex flex-col'>
          {TXNS.map((t) => (
            <li
              key={t.name}
              className='flex items-center gap-3 border-t border-border py-3 first:border-t-0 first:pt-0'
            >
              <span className='flex size-9 shrink-0 items-center justify-center rounded-(--radius) bg-muted'>
                <t.icon aria-hidden='true' className='size-4' />
              </span>
              <span className='min-w-0 flex-1'>
                <span className='block truncate text-sm font-medium'>{t.name}</span>
                <span className='block text-xs text-muted-foreground'>{t.cat}</span>
              </span>
              <span className='hidden text-xs text-muted-foreground xl:block'>{t.when}</span>
              <span
                className={`text-sm font-semibold tabular-nums ${
                  t.hot ? 'text-emerald-600 dark:text-emerald-400' : ''
                }`}
              >
                {t.amt}
              </span>
              <Button variant='ghost' size='icon-sm' aria-label={`More actions for ${t.name}`}>
                <DotsThreeIcon aria-hidden='true' />
              </Button>
            </li>
          ))}
        </ul>
      </Card>

      {/* Savings donut */}
      <Card>
        <Donut pct={80} top='$24,000' sub='80% of $30,000' />
        <Separator />
        {[
          ['Projected Finish', 'October 2024'],
          ['Monthly Average', '$1,250'],
          ['Top Contributor', 'Auto-Transfer']
        ].map(([k, v]) => (
          <div key={k} className='flex items-center justify-between py-1 text-sm'>
            <span className='text-muted-foreground'>{k}</span>
            <span className='font-semibold tabular-nums'>{v}</span>
          </div>
        ))}
      </Card>

      {/* Browser share */}
      <Card>
        <div>
          <CardTitle>Browser Share</CardTitle>
          <CardSub>January - June 2026</CardSub>
        </div>
        <Donut pct={31} size={160} track='var(--chart-1)' fill='var(--chart-3)' top='935' sub='Visitors' />
        <div className='flex items-center justify-center gap-4 text-xs text-muted-foreground'>
          {[
            ['Chrome', 'var(--chart-1)'],
            ['Edge', 'var(--chart-4)'],
            ['Firefox', 'var(--chart-3)'],
            ['Safari', 'var(--chart-2)']
          ].map(([n, c]) => (
            <span key={n} className='flex items-center gap-1.5'>
              <span className='size-2 rounded-(--radius)' style={{ backgroundColor: c }} />
              {n}
            </span>
          ))}
        </div>
        <div>
          <div className='flex items-center justify-between text-xs'>
            <span className='font-medium'>Firefox</span>
            <span className='text-muted-foreground tabular-nums'>31%</span>
          </div>
          <Progress value={31} className='mt-2'>
            <ProgressTrack>
              <ProgressIndicator />
            </ProgressTrack>
          </Progress>
        </div>
      </Card>

      {/* Power usage */}
      <Card>
        <div>
          <CardTitle>Power Usage</CardTitle>
          <CardSub>Whole Home</CardSub>
        </div>
        <div className='flex h-32 items-end gap-2'>
          {[30, 70, 78, 60, 86, 73, 96, 81].map((v, i) => (
            <div key={i} className='flex-1 rounded-t-[var(--radius)] bg-chart-2' style={{ height: `${v}%` }} />
          ))}
        </div>
        <div className='flex justify-between text-xs text-muted-foreground'>
          {['6a', '8a', '10a', '12p', '2p', '4p', '6p', '8p'].map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
        <Separator />
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <div className='text-sm text-muted-foreground'>Currently Using</div>
            <div className='text-lg font-semibold tabular-nums'>3.4 kW</div>
          </div>
          <div>
            <div className='text-sm text-muted-foreground'>Solar Gen</div>
            <div className='text-lg font-semibold tabular-nums'>+1.2 kW</div>
          </div>
        </div>
        <div>
          <div className='text-sm text-muted-foreground'>Battery Level</div>
          <div className='mt-1 flex items-center gap-2'>
            <Progress value={85} className='flex-1'>
              <ProgressTrack>
                <ProgressIndicator />
              </ProgressTrack>
            </Progress>
            <span className='text-sm font-medium tabular-nums'>85%</span>
          </div>
        </div>
      </Card>

      {/* Sleep report */}
      <Card>
        <div>
          <CardTitle>Sleep Report</CardTitle>
          <CardSub>Last night · 7h 24m</CardSub>
        </div>
        <div className='flex h-28 items-end gap-1.5'>
          {[
            ['var(--chart-2)', 50],
            ['var(--chart-1)', 50],
            ['var(--chart-1)', 66],
            ['var(--chart-1)', 83],
            ['var(--chart-3)', 16],
            ['var(--chart-2)', 33],
            ['var(--chart-1)', 41],
            ['var(--chart-2)', 25]
          ].map(([c, v], i) => (
            <div key={i} className='flex-1 rounded-t-[var(--radius)]' style={{ height: `${v}%`, backgroundColor: c as string }} />
          ))}
        </div>
        <div className='grid grid-cols-4 gap-2 text-center'>
          {[
            ['2h 10m', 'Deep'],
            ['3h 48m', 'Light'],
            ['1h 26m', 'REM'],
            ['84', 'Score']
          ].map(([v, l]) => (
            <div key={l}>
              <div className='text-sm font-medium tabular-nums'>{v}</div>
              <div className='text-xs text-muted-foreground'>{l}</div>
            </div>
          ))}
        </div>
        <div className='flex items-center gap-2'>
          <Badge status='success' count='Good' />
          <Button variant='outline' size='sm' className='ml-auto'>
            Details
          </Button>
        </div>
      </Card>

      {/* Fitness week */}
      <Card>
        <div>
          <CardTitle>Weekly Fitness Summary</CardTitle>
          <CardSub>Calories and workout load by day</CardSub>
        </div>
        <div className='grid grid-cols-7 gap-3'>
          {[
            ['M', 84],
            ['T', 52],
            ['W', 73],
            ['T', 66],
            ['F', 91],
            ['S', 48],
            ['S', 61]
          ].map(([d, v]) => (
            <div key={`${d}-${v}`} className='text-center'>
              <div className='text-xs text-muted-foreground'>{d}</div>
              <div className='relative mt-1 h-20 overflow-hidden rounded-(--radius) bg-muted'>
                <div className='absolute inset-x-0 bottom-0 rounded-(--radius) bg-chart-3' style={{ height: `${v}%` }} />
              </div>
            </div>
          ))}
        </div>
        <Button className='w-full'>View details</Button>
      </Card>

      {/* Analytics sparkline */}
      <Card>
        <div className='flex items-start justify-between gap-2'>
          <div>
            <CardTitle>Analytics</CardTitle>
            <CardSub>
              418.2K Visitors <Badge status='success' count='+10%' />
            </CardSub>
          </div>
          <Button variant='outline' size='sm'>
            View Analytics
          </Button>
        </div>
        <AreaSpark id='spark-analytics' points={[0.45, 0.94, 0.66, 0.03, 0.54, 0.56]} />
      </Card>

      {/* Visitors area */}
      <Card>
        <div className='flex items-start justify-between gap-2'>
          <div>
            <CardTitle>Visitors</CardTitle>
            <CardSub>Last 6 months</CardSub>
          </div>
          <Badge status='secondary' count='+2% vs last month' />
        </div>
        <AreaSpark id='spark-visitors' points={[0.16, 0.85, 0.46, 0.6, 0.3, 0.32]} />
      </Card>

      {/* Stock performance with combobox */}
      <Card>
        <div>
          <CardTitle>Stock Performance</CardTitle>
          <CardSub>6-month price history.</CardSub>
        </div>
        <Combobox
          items={[
            { value: 'VOO', label: 'VOO — Vanguard S&P 500' },
            { value: 'VIG', label: 'VIG — Dividend Appreciation' },
            { value: 'AAPL', label: 'AAPL — Apple Inc.' }
          ]}
          defaultValue={{ value: 'VOO', label: 'VOO — Vanguard S&P 500' }}
        >
          <div className='flex w-full flex-col gap-1'>
            <ComboboxLabel>Ticker</ComboboxLabel>
            <ComboboxInputGroup>
              <ComboboxInput placeholder='Search ticker…' aria-label='Ticker' />
              <ComboboxTrigger aria-label='Open tickers' />
            </ComboboxInputGroup>
          </div>
          <ComboboxPortal>
            <ComboboxPositioner side='bottom' align='start' sideOffset={4}>
              <ComboboxPopup>
                <ComboboxEmpty>No tickers found.</ComboboxEmpty>
                <ComboboxList>
                  {(item: { value: string; label: string }) => (
                    <ComboboxItem key={item.value} value={item}>
                      <ComboboxItemIndicator>
                        <CheckIcon className='size-4' />
                      </ComboboxItemIndicator>
                      <span className='col-start-2'>{item.label}</span>
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxPopup>
            </ComboboxPositioner>
          </ComboboxPortal>
        </Combobox>
        <Separator />
        <AreaSpark id='spark-stock' points={[0.32, 0.4, 0.26, 0.44, 0.34, 0.48]} color='var(--chart-2)' />
      </Card>

      {/* Buy investment */}
      <Card>
        <div>
          <CardTitle>Buy Investment</CardTitle>
        </div>
        <label className='flex flex-col gap-1.5 text-sm'>
          <span className='font-medium'>Amount to Invest</span>
          <Input defaultValue='1,000.00' aria-label='Amount to invest' startAdornment={<span>$</span>} />
        </label>
        <MiniSelect
          label='Order Type'
          defaultValue='market'
          items={[
            { value: 'market', label: 'Market Order' },
            { value: 'limit', label: 'Limit Order' },
            { value: 'stop', label: 'Stop Order' }
          ]}
        />
        <CardSub>Market orders execute at the current price.</CardSub>
        <div className='flex flex-col gap-1 text-sm'>
          <div className='flex items-center justify-between'>
            <span className='text-muted-foreground'>Estimated Shares</span>
            <span className='font-semibold tabular-nums'>1.95</span>
          </div>
          <div className='flex items-center justify-between'>
            <span className='text-muted-foreground'>Buying Power</span>
            <span className='font-semibold tabular-nums'>$12,450.00</span>
          </div>
        </div>
        <Button className='w-full'>Review Order</Button>
        <CardSub>Trades are typically executed within minutes during market hours.</CardSub>
      </Card>

      {/* Report bug */}
      <Card>
        <div>
          <CardTitle>Report Bug</CardTitle>
          <CardSub>Help us fix issues faster.</CardSub>
        </div>
        <label className='flex flex-col gap-1.5 text-sm'>
          <span className='font-medium'>Title</span>
          <Input placeholder='Brief description of the issue' />
        </label>
        <div className='grid grid-cols-2 gap-3'>
          <MiniSelect
            label='Severity'
            defaultValue='medium'
            items={[
              { value: 'low', label: 'Low' },
              { value: 'medium', label: 'Medium' },
              { value: 'high', label: 'High' }
            ]}
          />
          <MiniSelect
            label='Component'
            defaultValue='dashboard'
            items={[
              { value: 'dashboard', label: 'Dashboard' },
              { value: 'map', label: 'Map' },
              { value: 'planner', label: 'Planner' }
            ]}
          />
        </div>
        <label className='flex flex-col gap-1.5 text-sm'>
          <span className='font-medium'>Steps to reproduce</span>
          <textarea
            rows={3}
            placeholder={'1. Go to\n2. Click on\n3. Observe…'}
            className='w-full resize-y border border-input bg-background px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50'
          />
        </label>
        <div className='flex justify-end gap-2'>
          <Button variant='outline'>Attach File</Button>
          <Button>Submit Bug</Button>
        </div>
      </Card>

      {/* Profile */}
      <Card>
        <div>
          <CardTitle>Profile</CardTitle>
          <CardSub>Manage your profile information.</CardSub>
        </div>
        <label className='flex flex-col gap-1.5 text-sm'>
          <span className='font-medium'>Name</span>
          <Input placeholder='shadcn' />
          <span className='text-xs text-muted-foreground'>
            Your name may appear around GitHub where you contribute. You can remove it at any time.
          </span>
        </label>
        <MiniSelect
          label='Public Email'
          defaultValue='m@sh designs'
          items={[
            { value: 'm@sh designs', label: 'm@sh designs' },
            { value: 'm@gmail.com', label: 'm@gmail.com' }
          ]}
        />
        <label className='flex flex-col gap-1.5 text-sm'>
          <span className='font-medium'>Bio</span>
          <textarea
            rows={2}
            placeholder='Tell us a little bit about yourself'
            className='w-full resize-y border border-input bg-background px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50'
          />
          <span className='text-xs text-muted-foreground'>
            You can @mention other users and organizations to link to them.
          </span>
        </label>
        <Button className='w-full'>Save Profile</Button>
      </Card>

      {/* Social links */}
      <Card>
        <div>
          <CardTitle>Social Links</CardTitle>
        </div>
        {[
          { icon: PlusCircleIcon, label: 'Spotify Artist URL', v: 'spotify.com/artist/3j…2k', ph: undefined },
          { icon: CameraIcon, label: 'Instagram Handle', v: '@julianduryea_music', ph: undefined },
          { icon: CloudIcon, label: 'SoundCloud URL', v: undefined, ph: 'soundcloud.com/username' },
          { icon: GlobeIcon, label: 'Website', v: undefined, ph: 'https://yoursite.com' }
        ].map((f) => (
          <label key={f.label} className='flex flex-col gap-1.5 text-sm'>
            <span className='font-medium'>{f.label}</span>
            <Input
              defaultValue={f.v}
              placeholder={f.ph}
              aria-label={f.label}
              startAdornment={<f.icon aria-hidden='true' />}
            />
          </label>
        ))}
        <div className='flex justify-end gap-2'>
          <Button variant='secondary'>Discard</Button>
          <Button>Save Changes</Button>
        </div>
      </Card>

      {/* Cover art upload */}
      <Card>
        <label
          htmlFor='ov-cover-art'
          className='flex flex-col items-center gap-1 text-xs font-normal uppercase tracking-wider text-muted-foreground'
        >
          Cover Art
        </label>
        <label
          htmlFor='ov-cover-art'
          className='flex aspect-square w-full cursor-pointer items-center justify-center border border-border'
        >
          <ImageIcon aria-hidden='true' className='size-10 text-muted-foreground/50' />
        </label>
        <input id='ov-cover-art' accept='image/jpeg,image/png' className='sr-only' type='file' />
        <Button variant='secondary' className='w-full'>
          <UploadSimpleIcon aria-hidden='true' /> Upload Artwork
        </Button>
        <CardSub>
          Minimum 3000 × 3000px
          <br />
          JPEG or PNG only
        </CardSub>
      </Card>

      {/* Explore catalog empty */}
      <Card>
        <div className='flex flex-col items-center gap-2 py-6 text-center'>
          <RecordIcon aria-hidden='true' className='size-8 text-muted-foreground' />
          <p className='text-sm font-medium'>Explore Catalog</p>
          <p className='max-w-64 text-sm text-muted-foreground'>
            Check your ISRC codes, metadata, and visual assets before going live.
          </p>
          <Button>View Catalog</Button>
        </div>
      </Card>

      {/* Set milestone */}
      <Card>
        <div>
          <CardTitle>Set a new milestone</CardTitle>
          <CardSub>Define your financial target and we&apos;ll help you pace your savings.</CardSub>
        </div>
        <label className='flex flex-col gap-1.5 text-sm'>
          <span className='font-medium'>Goal Name</span>
          <Input placeholder='e.g. New Car, Home Downpayment' />
        </label>
        <div className='grid grid-cols-2 gap-3'>
          <label className='flex flex-col gap-1.5 text-sm'>
            <span className='font-medium'>Target Amount</span>
            <Input defaultValue='$15,000' />
          </label>
          <label className='flex flex-col gap-1.5 text-sm'>
            <span className='font-medium'>Target Date</span>
            <Input defaultValue='Dec 2025' />
          </label>
        </div>
        <Button className='w-full'>Create Goal</Button>
        <Button variant='outline' className='w-full'>
          Cancel
        </Button>
      </Card>

      {/* Connect bank empty */}
      <Card>
        <div className='flex flex-col items-center gap-2 py-6 text-center'>
          <CreditCardIcon aria-hidden='true' className='size-8 text-muted-foreground' />
          <p className='text-sm font-medium'>Connect Bank</p>
          <p className='max-w-64 text-sm text-muted-foreground'>
            Link your payout method to receive monthly royalty distributions automatically.
          </p>
          <Button>Set Up Payouts</Button>
        </div>
      </Card>

      {/* Book appointment */}
      <Card>
        <div>
          <CardTitle>Book Appointment</CardTitle>
          <CardSub>Dr. Sarah Chen · Cardiology</CardSub>
        </div>
        <div className='flex flex-col gap-2'>
          <span className='text-sm font-medium'>Available on March 18, 2026</span>
          <ToggleGroup aria-label='Appointment time' defaultValue={['9:00 AM']}>
            {['9:00 AM', '10:30 AM', '11:00 AM', '1:30 PM'].map((t) => (
              <Toggle key={t} value={t} aria-label={t}>
                {t}
              </Toggle>
            ))}
          </ToggleGroup>
        </div>
        <div role='alert' className='border border-border bg-muted/60 px-3 py-2 text-sm'>
          <p className='font-medium'>New patient?</p>
          <p className='text-muted-foreground'>Please arrive 15 minutes early.</p>
        </div>
        <Button className='w-full'>Book Appointment</Button>
      </Card>

      {/* Transfer funds */}
      <Card>
        <div className='flex items-start justify-between gap-2'>
          <div>
            <CardTitle>Transfer Funds</CardTitle>
            <CardSub>Move money between your connected accounts.</CardSub>
          </div>
          <Button variant='ghost' size='icon-sm' aria-label='Close transfer'>
            <XIcon />
          </Button>
        </div>
        <label className='flex flex-col gap-1.5 text-sm'>
          <span className='font-medium'>Amount to Transfer</span>
          <Input defaultValue='1,200.00' aria-label='Amount to transfer' startAdornment={<span>$</span>} />
        </label>
        <MiniSelect
          label='From Account'
          defaultValue='checking'
          items={[{ value: 'checking', label: 'Main Checking (··8402) — $12,450.00' }]}
        />
        <MiniSelect
          label='To Account'
          defaultValue='savings'
          items={[{ value: 'savings', label: 'High Yield Savings (··1192) — $42,100.00' }]}
        />
        <div className='flex flex-col bg-muted/60 px-4 py-2 text-sm'>
          <div className='flex items-center justify-between py-1'>
            <span className='text-muted-foreground'>Estimated arrival</span>
            <span className='font-medium'>Today, Apr 14</span>
          </div>
          <Separator />
          <div className='flex items-center justify-between py-1'>
            <span className='text-muted-foreground'>Transaction fee</span>
            <span className='font-medium tabular-nums'>$0.00</span>
          </div>
          <Separator />
          <div className='flex items-center justify-between py-1'>
            <span className='font-medium'>Total amount</span>
            <span className='font-semibold tabular-nums'>$1,200.00</span>
          </div>
        </div>
        <Button className='w-full'>Confirm Transfer</Button>
      </Card>

      {/* Shipping address */}
      <Card>
        <div>
          <CardTitle>Shipping Address</CardTitle>
          <CardSub>Where should we deliver?</CardSub>
        </div>
        <label className='flex flex-col gap-1.5 text-sm'>
          <span className='font-medium'>Street address</span>
          <Input placeholder='123 Main Street' />
        </label>
        <label className='flex flex-col gap-1.5 text-sm'>
          <span className='font-medium'>Apt / Suite</span>
          <Input placeholder='Apt 4B' />
        </label>
        <div className='grid grid-cols-2 gap-3'>
          <label className='flex flex-col gap-1.5 text-sm'>
            <span className='font-medium'>City</span>
            <Input placeholder='San Francisco' />
          </label>
          <MiniSelect
            label='State'
            defaultValue='CA'
            items={[
              { value: 'CA', label: 'California' },
              { value: 'NY', label: 'New York' },
              { value: 'TX', label: 'Texas' }
            ]}
          />
        </div>
        <div className='grid grid-cols-2 gap-3'>
          <label className='flex flex-col gap-1.5 text-sm'>
            <span className='font-medium'>ZIP Code</span>
            <Input placeholder='94102' />
          </label>
          <MiniSelect
            label='Country'
            defaultValue='US'
            items={[
              { value: 'US', label: 'United States' },
              { value: 'VN', label: 'Vietnam' }
            ]}
          />
        </div>
        <label className='flex items-center gap-2 text-sm'>
          <CheckboxRoot defaultChecked aria-label='Save as default address' />
          Save as default address
        </label>
        <div className='flex gap-2'>
          <Button variant='outline' size='sm'>
            Cancel
          </Button>
          <Button size='sm' className='ml-auto'>
            Save Address
          </Button>
        </div>
      </Card>

      {/* Usage rings */}
      <Card>
        <div className='flex items-center gap-1 px-1 text-sm font-medium'>5 days remaining in cycle</div>
        <div className='flex flex-col gap-2.5'>
          <Ring pct={67} label='Edge Requests' value='$1.83K' />
          <Ring pct={52} label='Fast Data Transfer' value='$952.51' />
          <Ring pct={89} label='Monitoring data points' value='$901.20' />
          <Ring pct={46} label='Web Analytics Events' value='$603.71' />
          <Ring pct={26} label='ISR Writes' value='524.52K / 2M' />
          <Ring pct={5} label='Function Duration' value='5.11 GB Hrs / 1K GB Hrs' />
        </div>
      </Card>

      {/* Dividend income */}
      <Card>
        <div className='flex items-start justify-between gap-2'>
          <div>
            <CardTitle>Q2 Dividend Income</CardTitle>
            <CardSub>Quarterly dividend payouts across your portfolio holdings.</CardSub>
          </div>
          <Button variant='ghost' size='icon-sm' aria-label='Close dividends'>
            <XIcon />
          </Button>
        </div>
        {[
          { n: 'Vanguard VIG', s: '450 Shares', v: [52, 58, 55, 88], amt: '$1,842.10' },
          { n: 'S&P 500 VOO', s: '112 Shares', v: [56, 66, 100, 68], amt: '$928.40' },
          { n: 'Apple AAPL', s: '85 Shares', v: [50, 58, 100, 75], amt: '$340.00' },
          { n: 'Realty Income', s: '320 Shares', v: [66, 72, 78, 100], amt: '$1,139.50' }
        ].map((d) => (
          <div key={d.n} className='flex items-center gap-3'>
            <span className='min-w-0 flex-1'>
              <span className='block truncate text-sm font-medium'>{d.n}</span>
              <span className='block text-xs text-muted-foreground'>{d.s}</span>
            </span>
            <span className='flex h-8 w-24 items-end gap-1' aria-hidden='true'>
              {d.v.map((h, i) => (
                <span key={i} className='flex-1 rounded-t-[var(--radius)] bg-chart-2' style={{ height: `${h}%` }} />
              ))}
            </span>
            <span className='text-sm font-semibold tabular-nums'>{d.amt}</span>
          </div>
        ))}
      </Card>
    </div>
  )
}
