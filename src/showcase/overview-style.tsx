import {
  ArrowsClockwise,
  ArrowsOut,
  Briefcase,
  CalendarBlank,
  CaretDown,
  CaretRight,
  CaretUp,
  Check,
  CheckCircle,
  CloudArrowUp,
  Copy,
  DotsThree,
  Gauge,
  Gear,
  Info,
  MagnifyingGlass,
  Minus,
  Plus,
  Repeat,
  Sun,
  Trash,
  ArrowLeft,
  ArrowRight,
  LockKey,
  SpeakerHigh,
  Thermometer,
  Timer,
  WarningCircle,
  X
} from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectList,
  SelectPopup,
  SelectPortal,
  SelectPositioner,
  SelectTrigger,
  SelectValue,
  SelectIcon,
  SelectLabel
} from '@/components/ui/select'
import { Slider, SliderControl, SliderIndicator, SliderThumb, SliderTrack } from '@/components/ui/slider'
import { Switch, SwitchThumb } from '@/components/ui/switch'
import { CheckboxRoot } from '@/components/ui/checkbox'
import { RadioGroup, RadioRoot } from '@/components/ui/radio'
import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogClose,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogPopup,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import {
  Dialog,
  DialogBackdrop,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPopup,
  DialogPortal,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Tabs, TabsIndicator, TabsList, TabsPanel, TabsTab } from '@/components/ui/tabs'
import { Accordion, AccordionHeader, AccordionItem, AccordionPanel, AccordionTrigger } from '@/components/ui/accordion'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { ToggleGroup } from '@/components/ui/toggle-group'
import { Toggle } from '@/components/ui/toggle'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'

function Card({ children }: { children: React.ReactNode }) {
  return <div className='flex flex-col gap-4 border border-border bg-card p-6 text-card-foreground'>{children}</div>
}

function CardTitle({ children }: { children: React.ReactNode }) {
  return <h3 className='text-lg font-semibold tracking-tight'>{children}</h3>
}

function CardSub({ children }: { children: React.ReactNode }) {
  return <p className='text-sm text-muted-foreground'>{children}</p>
}

const TOKEN_SWATCHES: { token: string; label: string }[] = [
  { token: '--background', label: '--backgro…' },
  { token: '--foreground', label: '--foregro…' },
  { token: '--primary', label: '--primary' },
  { token: '--secondary', label: '--second…' },
  { token: '--muted', label: '--muted' },
  { token: '--accent', label: '--accent' },
  { token: '--destructive', label: '--destructive' },
  { token: '--success', label: '--success' },
  { token: '--warning', label: '--warning' },
  { token: '--info', label: '--info' },
  { token: '--favorite', label: '--favorite' },
  { token: '--border', label: '--border' },
  { token: '--chart-1', label: '--chart-1' },
  { token: '--chart-2', label: '--chart-2' },
  { token: '--chart-3', label: '--chart-3' },
  { token: '--chart-4', label: '--chart-4' },
  { token: '--chart-5', label: '--chart-5' }
]

function TokenSwatches() {
  return (
    <div className='grid grid-cols-6 gap-3'>
      {TOKEN_SWATCHES.map((s) => (
        <div key={s.token} className='flex flex-col gap-1.5'>
          <div className='aspect-square w-full border border-border' style={{ backgroundColor: `var(${s.token})` }} />
          <code className='truncate text-[11px] text-muted-foreground'>{s.label}</code>
        </div>
      ))}
    </div>
  )
}

const ICON_BUTTONS = [
  Copy,
  Info,
  Trash,
  ArrowsOut,
  Briefcase,
  DotsThree,
  Sun,
  Plus,
  Minus,
  ArrowLeft,
  ArrowRight,
  Check,
  CaretDown,
  CaretRight,
  MagnifyingGlass,
  Gear
]

function IconButtonGrid() {
  return (
    <div className='flex flex-wrap gap-2'>
      {ICON_BUTTONS.map((Icon, i) => (
        <Button key={i} variant='outline' size='icon' aria-label={`Sample icon ${i + 1}`}>
          <Icon aria-hidden='true' />
        </Button>
      ))}
    </div>
  )
}

const TRAFFIC: { month: string; desktop: number; mobile: number }[] = [
  { month: 'Jan', desktop: 55, mobile: 30 },
  { month: 'Feb', desktop: 95, mobile: 70 },
  { month: 'Mar', desktop: 78, mobile: 45 },
  { month: 'Apr', desktop: 30, mobile: 68 },
  { month: 'May', desktop: 62, mobile: 48 },
  { month: 'Jun', desktop: 58, mobile: 52 }
]

function TrafficChart() {
  return (
    <div>
      <div className='flex h-44 items-end justify-between gap-3'>
        {TRAFFIC.map((t) => (
          <div key={t.month} className='flex h-full flex-1 items-end justify-center gap-1.5'>
            <div className='w-full rounded-t-sm bg-chart-1' style={{ height: `${t.desktop}%` }} />
            <div className='w-full rounded-t-sm bg-chart-3' style={{ height: `${t.mobile}%` }} />
          </div>
        ))}
      </div>
      <div className='mt-2 flex justify-between text-xs text-muted-foreground'>
        {TRAFFIC.map((t) => (
          <span key={t.month} className='flex-1 text-center'>
            {t.month}
          </span>
        ))}
      </div>
      <div className='mt-3 flex items-center justify-center gap-4 text-xs text-muted-foreground'>
        <span className='flex items-center gap-1.5'>
          <span className='size-2.5 rounded-[2px] bg-chart-1' /> Desktop
        </span>
        <span className='flex items-center gap-1.5'>
          <span className='size-2.5 rounded-[2px] bg-chart-3' /> Mobile
        </span>
      </div>
    </div>
  )
}

function MiniSelect({
  label,
  items,
  defaultValue
}: {
  label: string
  items: { value: string; label: string }[]
  defaultValue?: string
}) {
  return (
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
  )
}

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className='pointer-events-none inline-flex min-w-6 items-center justify-center border border-border bg-muted px-1.5 py-0.5 text-xs select-none'>
      {children}
    </kbd>
  )
}

function PseudoQr({ size = 148 }: { size?: number }) {
  const N = 21
  const rand: boolean[] = []
  let h = 7
  for (let i = 0; i < N * N; i++) {
    h = (h * 31 + i * 17 + 11) % 997
    rand.push(h % 3 !== 0)
  }
  const on = (r: number, c: number) => {
    const zones = [
      [0, 0],
      [0, N - 7],
      [N - 7, 0]
    ]
    for (const [zr, zc] of zones) {
      const lr = r - zr
      const lc = c - zc
      if (lr >= 0 && lr < 7 && lc >= 0 && lc < 7) {
        const outer = lr === 0 || lr === 6 || lc === 0 || lc === 6
        const inner = lr >= 2 && lr <= 4 && lc >= 2 && lc <= 4
        return outer || inner
      }
    }
    return rand[r * N + c]
  }
  return (
    <div className='border border-border bg-white p-3' style={{ width: size + 24 }}>
      <div className='grid' style={{ gridTemplateColumns: `repeat(${N}, 1fr)`, width: size, height: size }}>
        {Array.from({ length: N * N }, (_, i) => {
          const r = Math.floor(i / N)
          const c = i % N
          return <div key={i} className={on(r, c) ? 'bg-black' : 'bg-transparent'} />
        })}
      </div>
    </div>
  )
}

export function OverviewStyle() {
  return (
    <div className='grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3'>
      {/* Typography + tokens */}
      <Card>
        <div>
          <CardTitle>Nova - IBM Plex Sans</CardTitle>
          <CardSub>
            Designers love packing quirky glyphs into test phrases. This is a preview of the typography…
          </CardSub>
        </div>
        <TokenSwatches />
      </Card>

      {/* Icon buttons */}
      <Card>
        <IconButtonGrid />
      </Card>

      {/* Env vars */}
      <Card>
        <div>
          <CardTitle>Environment Variables</CardTitle>
          <CardSub>Production · 8 variables</CardSub>
        </div>
        <div className='flex flex-col gap-2 text-sm'>
          <div className='flex items-center justify-between border border-border px-3 py-2'>
            <code>DATABASE_URL</code>
            <span className='text-muted-foreground'>••••••••</span>
          </div>
          <div className='flex items-center justify-between border border-border px-3 py-2'>
            <code>NEXT_PUBLIC_API</code>
            <span className='truncate text-xs text-muted-foreground'>https://api.example.com</span>
          </div>
          <div className='flex items-center justify-between border border-border px-3 py-2'>
            <code>STRIPE_SECRET</code>
            <span className='text-muted-foreground'>••••••••</span>
          </div>
        </div>
        <div className='flex items-center justify-between'>
          <Button variant='outline'>Edit</Button>
          <Button variant='default'>Deploy</Button>
        </div>
      </Card>

      {/* Type rhythm */}
      <Card>
        <p className='text-xs font-medium uppercase tracking-wide text-muted-foreground'>Inherit - IBM Plex Sans</p>
        <h2 className='text-3xl font-semibold tracking-tight'>Designing with rhythm and hierarchy.</h2>
        <p className='text-sm leading-6 text-muted-foreground'>
          A strong body style keeps long-form content readable and balances the visual weight of headings.
        </p>
        <p className='text-sm leading-6 text-muted-foreground'>
          Thoughtful spacing and cadence help paragraphs scan quickly without feeling dense.
        </p>
        <Button variant='outline' className='w-full'>
          Share Feedback
        </Button>
      </Card>

      {/* Controls kitchen-sink */}
      <Card>
        <div className='flex flex-wrap items-center gap-2'>
          <Button size='sm'>Button</Button>
          <Button size='sm' variant='secondary'>
            Secondary
          </Button>
          <Button size='sm' variant='outline'>
            Outline
          </Button>
          <Button size='sm' variant='ghost'>
            Ghost
          </Button>
        </div>
        <div className='flex items-center justify-between border border-border p-4'>
          <div>
            <div className='text-sm font-semibold'>Two-factor authentication</div>
            <div className='text-sm text-muted-foreground'>Verify via email or phone number.</div>
          </div>
          <Button variant='secondary' size='sm'>
            Enable
          </Button>
        </div>
        <Slider defaultValue={62}>
          <SliderControl>
            <SliderTrack>
              <SliderIndicator />
              <SliderThumb aria-label='Sample value' />
            </SliderTrack>
          </SliderControl>
        </Slider>
        <Input placeholder='Name' startAdornment={<MagnifyingGlass aria-hidden='true' />} />
        <textarea
          placeholder='Message'
          rows={3}
          className='w-full resize-y border border-input bg-background px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50'
        />
        <div className='flex flex-wrap items-center gap-2 text-xs font-semibold'>
          <Badge status='processing' count='Badge' />
          <Badge status='secondary' count='Secondary' />
          <Badge status='outline' count='Outline' />
          <span className='ml-auto flex items-center gap-3'>
            <RadioGroup defaultValue='a' aria-label='Sample radios' className='flex items-center gap-2'>
              <RadioRoot value='a' aria-label='Option A' />
              <RadioRoot value='b' aria-label='Option B' />
            </RadioGroup>
            <label className='flex items-center'>
              <CheckboxRoot defaultChecked aria-label='Sample checked' />
            </label>
            <label className='flex items-center'>
              <CheckboxRoot aria-label='Sample unchecked' />
            </label>
          </span>
        </div>
        <div className='flex flex-wrap items-center gap-2'>
          <AlertDialog>
            <AlertDialogTrigger>Alert Dialog</AlertDialogTrigger>
            <AlertDialogPortal>
              <AlertDialogBackdrop />
              <AlertDialogPopup>
                <AlertDialogHeader>
                  <AlertDialogTitle>Discard changes?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Unsaved edits will be lost. This is the alert-dialog style.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogClose>Cancel</AlertDialogClose>
                  <AlertDialogClose>Discard</AlertDialogClose>
                </AlertDialogFooter>
              </AlertDialogPopup>
            </AlertDialogPortal>
          </AlertDialog>
          <span className='flex items-stretch'>
            <Button variant='outline' className='rounded-r-none border-r-0'>
              Button Group
            </Button>
            <Button variant='outline' size='icon' aria-label='More group actions' className='rounded-l-none'>
              <CaretUp aria-hidden='true' />
            </Button>
          </span>
          <label className='ml-auto flex items-center gap-2 text-sm'>
            <Switch defaultChecked>
              <SwitchThumb />
            </Switch>
          </label>
        </div>
      </Card>

      {/* Traffic */}
      <Card>
        <div>
          <CardTitle>Traffic channels</CardTitle>
          <CardSub>
            Monthly desktop and mobile traffic for the last six months—compare volume and mix across platforms…
          </CardSub>
        </div>
        <TrafficChart />
        <div className='grid grid-cols-3 gap-2 border-t border-border pt-4 text-center'>
          <div>
            <div className='text-[11px] uppercase tracking-wide text-muted-foreground'>Desktop</div>
            <div className='text-lg font-semibold'>1,224</div>
          </div>
          <div>
            <div className='text-[11px] uppercase tracking-wide text-muted-foreground'>Mobile</div>
            <div className='text-lg font-semibold'>860</div>
          </div>
          <div>
            <div className='text-[11px] uppercase tracking-wide text-muted-foreground'>Mix delta</div>
            <div className='text-lg font-semibold'>+42%</div>
          </div>
        </div>
      </Card>

      {/* Tabs */}
      <Card>
        <Tabs defaultValue='codespaces'>
          <TabsList className='w-full'>
            <TabsTab value='codespaces' className='flex-1'>
              Codespaces
            </TabsTab>
            <TabsTab value='local' className='flex-1'>
              Local
            </TabsTab>
            <TabsIndicator />
          </TabsList>
          <TabsPanel value='codespaces'>
            <div className='flex flex-col items-center gap-2 py-6 text-center'>
              <p className='text-sm font-medium'>No codespaces</p>
              <p className='max-w-64 text-sm text-muted-foreground'>
                You don&apos;t have any codespaces with this repository checked out
              </p>
              <Button size='sm'>Create Codespace</Button>
              <a href='#learn-more' className='text-xs text-muted-foreground underline underline-offset-4'>
                Learn more about codespaces
              </a>
            </div>
          </TabsPanel>
          <TabsPanel value='local'>
            <p className='py-6 text-center text-sm text-muted-foreground'>Clone the repository to work locally.</p>
          </TabsPanel>
        </Tabs>
      </Card>

      {/* Accordion FAQ */}
      <Card>
        <Accordion className='w-full'>
          {[
            {
              q: 'How secure is my financial data?',
              a: 'Bank-level AES-256 encryption, SOC 2 Type II infrastructure, read-only access tokens.'
            },
            {
              q: 'How do I connect my accounts?',
              a: 'Link any bank or investment account in under a minute with secure OAuth.'
            },
            {
              q: 'Can I export my data for tax purposes?',
              a: 'Yes — one-click CSV and PDF exports, grouped by category and quarter.'
            }
          ].map((item) => (
            <AccordionItem key={item.q}>
              <AccordionHeader>
                <AccordionTrigger>{item.q}</AccordionTrigger>
              </AccordionHeader>
              <AccordionPanel>{item.a}</AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
        <div className='flex gap-2'>
          <Button variant='outline' className='flex-1'>
            Contact Support
          </Button>
          <Button variant='link' className='flex-1'>
            Learn More
          </Button>
        </div>
      </Card>

      {/* Contributors avatars */}
      <Card>
        <div className='flex items-center gap-2'>
          <CardTitle>Contributors</CardTitle>
          <Badge status='secondary' count='312' />
        </div>
        <div className='flex flex-wrap gap-2'>
          {['SC', 'VL', 'NX', 'TW', 'TS', 'ES', 'PR', 'BB', 'WP', 'RU', 'PC', 'VT', 'RC', 'VU', 'NG', 'SO'].map((n) => (
            <Avatar key={n}>
              <AvatarFallback>{n}</AvatarFallback>
            </Avatar>
          ))}
        </div>
        <a href='#contributors' className='text-sm underline underline-offset-4'>
          + 810 contributors
        </a>
      </Card>

      {/* Share feedback dialog */}
      <Card>
        <div>
          <CardTitle>Designing with rhythm and hierarchy.</CardTitle>
          <CardSub>Open a real dialog built from the library — not a mock.</CardSub>
        </div>
        <Dialog>
          <DialogTrigger className='w-full'>Share Feedback</DialogTrigger>
          <DialogPortal>
            <DialogBackdrop />
            <DialogPopup>
              <DialogHeader>
                <DialogTitle>Share feedback</DialogTitle>
                <DialogDescription>Tell us what works and what doesn&apos;t in this style pass.</DialogDescription>
              </DialogHeader>
              <div className='flex flex-col gap-3'>
                <MiniSelect
                  label='Topic'
                  defaultValue='dashboard'
                  items={[
                    { value: 'ai', label: 'AI' },
                    { value: 'billing', label: 'Billing' },
                    { value: 'dashboard', label: 'Dashboard Interface' },
                    { value: 'domains', label: 'Domains' }
                  ]}
                />
                <textarea
                  placeholder='Your feedback helps us improve…'
                  rows={3}
                  className='w-full resize-y border border-input bg-background px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50'
                />
              </div>
              <DialogFooter>
                <DialogClose>Cancel</DialogClose>
                <DialogClose>Submit</DialogClose>
              </DialogFooter>
            </DialogPopup>
          </DialogPortal>
        </Dialog>
      </Card>

      {/* Invoice table */}
      <Card>
        <div className='flex items-start justify-between gap-2'>
          <div>
            <CardTitle>Invoice #INV-2847</CardTitle>
            <CardSub>Due March 30, 2026</CardSub>
          </div>
          <Badge status='outline' count='Pending' />
        </div>
        <table className='w-full text-sm'>
          <thead>
            <tr className='text-left text-muted-foreground'>
              <th className='py-1.5 pr-2 font-medium'>Item</th>
              <th className='py-1.5 pr-2 text-right font-medium'>Qty</th>
              <th className='py-1.5 pr-2 text-right font-medium'>Rate</th>
              <th className='py-1.5 text-right font-medium'>Amount</th>
            </tr>
          </thead>
          <tbody className='[&_tr]:border-t [&_tr]:border-border'>
            {[
              ['Design System License', '1', '$499.00', '$499.00'],
              ['Priority Support', '12', '$99.00', '$1,188.00'],
              ['Custom Components', '3', '$250.00', '$750.00']
            ].map((row) => (
              <tr key={row[0]}>
                <td className='py-1.5 pr-2'>{row[0]}</td>
                <td className='py-1.5 pr-2 text-right tabular-nums'>{row[1]}</td>
                <td className='py-1.5 pr-2 text-right tabular-nums'>{row[2]}</td>
                <td className='py-1.5 text-right tabular-nums'>{row[3]}</td>
              </tr>
            ))}
            <tr>
              <td colSpan={3} className='py-1.5 pr-2 text-right text-muted-foreground'>
                Subtotal
              </td>
              <td className='py-1.5 text-right tabular-nums'>$2,437.00</td>
            </tr>
            <tr>
              <td colSpan={3} className='py-1.5 pr-2 text-right font-medium'>
                Total Due
              </td>
              <td className='py-1.5 text-right font-semibold tabular-nums'>$2,437.00</td>
            </tr>
          </tbody>
        </table>
        <div className='flex gap-2'>
          <Button variant='outline' size='sm'>
            Download PDF
          </Button>
          <Button size='sm' className='ml-auto'>
            Pay Now
          </Button>
        </div>
      </Card>

      {/* Kitchen island smart home */}
      <Card>
        <div className='flex items-start justify-between gap-2'>
          <div>
            <CardTitle>Kitchen Island</CardTitle>
            <CardSub>Hue Color Ambient</CardSub>
          </div>
          <label className='flex items-center gap-2 text-sm'>
            <Switch defaultChecked>
              <SwitchThumb />
            </Switch>
          </label>
        </div>
        <ToggleGroup defaultValue={['cooking']} aria-label='Scenes'>
          {['Cooking', 'Dining', 'Nightlight', 'Focus'].map((s) => (
            <Toggle className='w-full' key={s} value={s.toLowerCase()} aria-label={s}>
              {s}
            </Toggle>
          ))}
        </ToggleGroup>
        {[
          { icon: Sun, label: 'Brightness', v: 90 },
          { icon: Thermometer, label: 'Color Temp', v: 70 },
          { icon: SpeakerHigh, label: 'Volume', v: 30 },
          { icon: Timer, label: 'Fade', v: 0 }
        ].map((row) => (
          <div key={row.label} className='flex items-center gap-3 border border-border p-3'>
            <row.icon aria-hidden='true' className='size-4 shrink-0 text-muted-foreground' />
            <span className='w-20 shrink-0 text-sm'>{row.label}</span>
            <Slider defaultValue={row.v} className='flex-1'>
              <SliderControl>
                <SliderTrack>
                  <SliderIndicator />
                  <SliderThumb aria-label={row.label} />
                </SliderTrack>
              </SliderControl>
            </Slider>
          </div>
        ))}
      </Card>

      {/* Shortcuts */}
      <Card>
        <CardTitle>Shortcuts</CardTitle>
        {[
          ['Search', ['⌘', 'K']],
          ['Quick Actions', ['⌘', 'J']],
          ['New File', ['⌘', 'N']],
          ['Save', ['⌘', 'S']],
          ['Toggle Sidebar', ['⌘', 'B']]
        ].map(([label, keys], i, arr) => (
          <div key={label as string}>
            <div className='flex items-center justify-between py-1.5 text-sm'>
              <span>{label}</span>
              <span className='flex gap-1'>
                {(keys as string[]).map((k) => (
                  <Kbd key={k}>{k}</Kbd>
                ))}
              </span>
            </div>
            {i < arr.length - 1 && <Separator />}
          </div>
        ))}
      </Card>

      {/* Notifications checkboxes */}
      <Card>
        <div>
          <CardTitle>Notifications</CardTitle>
          <CardSub>Choose what you want to be notified about.</CardSub>
        </div>
        {[
          { label: 'Select all', desc: undefined, indeterminate: true },
          { label: 'Transaction alerts', desc: 'Deposits, withdrawals, and transfers.', checked: true },
          { label: 'Security alerts', desc: 'Login attempts and account changes.', checked: true },
          { label: 'Goal milestones', desc: 'Updates at 25%, 50%, 75%, and 100%.', checked: false },
          { label: 'Market updates', desc: 'Daily portfolio summary and price alerts.', checked: false }
        ].map((n) => (
          <label key={n.label} className='flex items-start gap-3 text-sm'>
            <CheckboxRoot
              defaultChecked={n.checked}
              indeterminate={n.indeterminate}
              aria-label={n.label}
              className='mt-0.5'
            />
            <span>
              <span className='block font-medium'>{n.label}</span>
              {n.desc && <span className='block text-muted-foreground'>{n.desc}</span>}
            </span>
          </label>
        ))}
        <Button className='w-full'>Save Preferences</Button>
      </Card>

      {/* Account access */}
      <Card>
        <div>
          <CardTitle>Account Access</CardTitle>
          <CardSub>Update your credentials or re-authenticate.</CardSub>
        </div>
        <label className='flex flex-col gap-1.5 text-sm'>
          <span className='font-medium'>Email Address</span>
          <Input type='email' defaultValue='artist@studio.inc' />
        </label>
        <div className='flex flex-col gap-1.5 text-sm'>
          <span className='flex items-center justify-between'>
            <span className='font-medium'>Current Password</span>
            <a href='#forgot' className='text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground'>
              Forgot?
            </a>
          </span>
          <Input type='password' defaultValue='password123' />
        </div>
        <Button className='w-full'>
          <LockKey aria-hidden='true' /> Update Security
        </Button>
        <a href='#danger' className='flex items-center gap-3 border border-border p-3 text-sm hover:bg-muted/50'>
          <WarningCircle aria-hidden='true' className='size-4 shrink-0 text-destructive' />
          <span>
            <span className='block font-medium'>Danger Zone</span>
            <span className='block text-muted-foreground'>Archive account and remove catalog</span>
          </span>
          <ArrowRight aria-hidden='true' className='ml-auto size-4' />
        </a>
      </Card>

      {/* Preferences switches */}
      <Card>
        <div className='flex items-start justify-between gap-2'>
          <div>
            <CardTitle>Preferences</CardTitle>
            <CardSub>Manage your account settings and notifications.</CardSub>
          </div>
          <Button variant='ghost' size='icon-sm' aria-label='Close preferences'>
            <X />
          </Button>
        </div>
        <MiniSelect
          label='Default Currency'
          defaultValue='usd'
          items={[
            { value: 'usd', label: 'USD — United States Dollar' },
            { value: 'eur', label: 'EUR — Euro' },
            { value: 'vnd', label: 'VND — Vietnamese Dong' }
          ]}
        />
        <Separator />
        {[
          { t: 'Public Statistics', d: 'Allow others to see your total stream count and listening activity' },
          { t: 'Email Notifications', d: 'Monthly royalty reports and distribution updates' }
        ].map((s) => (
          <div key={s.t}>
            <div className='flex items-start justify-between gap-3'>
              <span>
                <span className='block text-sm font-medium'>{s.t}</span>
                <span className='block text-sm text-muted-foreground'>{s.d}</span>
              </span>
              <Switch defaultChecked>
                <SwitchThumb />
              </Switch>
            </div>
            <Separator className='mt-3' />
          </div>
        ))}
        <div className='flex gap-2'>
          <Button variant='outline'>Reset</Button>
          <Button className='ml-auto'>Save Preferences</Button>
        </div>
      </Card>

      {/* Receiving method radios */}
      <Card>
        <div className='flex items-start justify-between gap-2'>
          <div>
            <CardSub>Payout Preferences</CardSub>
            <CardTitle>Receiving Method</CardTitle>
          </div>
          <Button variant='ghost' size='icon-sm' aria-label='Close receiving method'>
            <X />
          </Button>
        </div>
        <label className='flex flex-col gap-1.5 text-sm'>
          <span className='font-medium'>Account Holder Name</span>
          <Input defaultValue='Synthetic Horizons Music LLC' />
        </label>
        <RadioGroup defaultValue='bank' aria-label='Receiving method'>
          <span className='mb-1 block text-sm font-medium'>Receiving Method</span>
          <div className='grid grid-cols-1 gap-3 md:grid-cols-2 w-full'>
            {[
              { v: 'bank', t: 'Bank Transfer', d: 'SWIFT / IBAN' },
              { v: 'paypal', t: 'PayPal', d: 'Instant Payout' }
            ].map((o) => (
              <label
                key={o.v}
                className='flex items-start gap-3 border border-border p-3 text-sm has-data-[checked]:border-primary'
              >
                <RadioRoot value={o.v} aria-label={o.t} className='mt-0.5' />
                <span>
                  <span className='block font-medium'>{o.t}</span>
                  <span className='block text-muted-foreground'>{o.d}</span>
                </span>
              </label>
            ))}
          </div>
        </RadioGroup>
        <label className='flex flex-col gap-1.5 text-sm'>
          <span className='font-medium'>IBAN / Account Number</span>
          <Input placeholder='DE89 3704 0044 …' />
        </label>
        <Button disabled className='w-full'>
          Save Payout Settings
        </Button>
      </Card>

      {/* QR connect */}
      <Card>
        <div className='flex justify-center pt-2'>
          <PseudoQr />
        </div>
        <div className='text-center'>
          <CardTitle>Scan to connect your mobile device</CardTitle>
          <CardSub>Open the Ledger mobile app and scan this code to link your device.</CardSub>
        </div>
        <Button variant='secondary' className='w-full'>
          Got it
        </Button>
      </Card>

      {/* Skeleton loading */}
      <Card>
        <div className='flex flex-col gap-2'>
          <div className='h-5 w-32 animate-pulse bg-muted' />
          <div className='h-4 w-48 animate-pulse bg-muted' />
        </div>
        <div className='h-32 w-full animate-pulse rounded-lg bg-muted' />
        <div className='flex flex-col gap-2'>
          <div className='h-4 w-full animate-pulse bg-muted' />
          <div className='h-4 w-3/4 animate-pulse bg-muted' />
          <div className='h-4 w-1/2 animate-pulse bg-muted' />
        </div>
        <div className='flex gap-2'>
          <div className='h-9 flex-1 animate-pulse rounded-md bg-muted' />
          <div className='h-9 flex-1 animate-pulse rounded-md bg-muted' />
        </div>
      </Card>

      {/* Breadcrumb + settings list */}
      <Card>
        <nav aria-label='Breadcrumb'>
          <ol className='flex flex-wrap items-center gap-1.5 text-sm'>
            <li>
              <a href='#home' className='text-muted-foreground hover:text-foreground'>
                Home
              </a>
            </li>
            <li aria-hidden='true' className='text-muted-foreground'>
              <CaretRight className='size-3' />
            </li>
            <li>
              <Button variant='ghost' size='icon-sm' aria-label='Account options'>
                <DotsThree aria-hidden='true' />
              </Button>
            </li>
            <li aria-hidden='true' className='text-muted-foreground'>
              <CaretRight className='size-3' />
            </li>
            <li aria-current='page' className='font-medium'>
              Payments
            </li>
          </ol>
        </nav>
        {[
          { icon: Gauge, t: 'Change transfer limit', d: 'Adjust how much you can send from your balance.' },
          { icon: CalendarBlank, t: 'Scheduled transfers', d: 'Set up a transfer to send at a later date.' },
          { icon: Repeat, t: 'Direct Debits', d: 'Set up and manage regular payments.' },
          { icon: ArrowsClockwise, t: 'Recurring card payments', d: 'Manage your repeated card transactions.' }
        ].map((r) => (
          <a
            key={r.t}
            href='#payments'
            className='flex items-center gap-3 border border-border p-3 text-sm hover:bg-muted/50'
          >
            <r.icon aria-hidden='true' className='size-4 shrink-0 text-muted-foreground' />
            <span>
              <span className='block font-medium'>{r.t}</span>
              <span className='block text-muted-foreground'>{r.d}</span>
            </span>
            <CaretRight aria-hidden='true' className='ml-auto size-4 text-muted-foreground' />
          </a>
        ))}
      </Card>

      {/* Front door live */}
      <Card>
        <div className='flex items-start justify-between gap-2'>
          <div>
            <CardTitle>Front Door</CardTitle>
            <CardSub>Smart Lock Pro</CardSub>
          </div>
          <span className='flex items-center gap-1.5 text-sm text-muted-foreground'>
            Locked <LockKey aria-hidden='true' className='size-4' />
          </span>
        </div>
        <div className='relative flex aspect-video items-center justify-center overflow-hidden rounded-lg border border-border bg-muted bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,var(--border)_10px,var(--border)_11px)]'>
          <span className='absolute top-2 right-2'>
            <Badge status='error' count='Live' />
          </span>
        </div>
      </Card>

      {/* 404 empty */}
      <Card>
        <div className='flex flex-col items-center gap-2 py-6 text-center'>
          <p className='text-lg font-semibold'>404 - Not Found</p>
          <p className='max-w-64 text-sm text-muted-foreground'>
            The page you&apos;re looking for doesn&apos;t exist. Try searching below.
          </p>
          <div className='w-3/4'>
            <Input placeholder='Try searching for pages…' startAdornment={<MagnifyingGlass aria-hidden='true' />} />
          </div>
          <Button variant='link'>Go to homepage</Button>
        </div>
      </Card>

      {/* Agent checklist */}
      <Card>
        <div>
          <CardTitle>Ship faster &amp; safer with Vercel Agent</CardTitle>
          <CardSub>
            Your use is subject to the{' '}
            <a href='#beta' className='underline underline-offset-4'>
              Public Beta Agreement
            </a>{' '}
            and{' '}
            <a href='#ai' className='underline underline-offset-4'>
              AI Product Terms
            </a>
            .
          </CardSub>
        </div>
        {[
          ['Code reviews', 'with full codebase context to catch hard-to-find bugs.'],
          ['Code suggestions', 'validated in sandboxes before you merge.'],
          ['Root-cause analysis', 'for production issues with deployment context.']
        ].map(([strong, rest]) => (
          <div key={strong as string} className='flex items-start gap-2.5 text-sm'>
            <CheckCircle aria-hidden='true' className='mt-0.5 size-5 shrink-0 text-primary' />
            <p className='text-muted-foreground'>
              <strong className='font-medium text-foreground'>{strong}</strong> {rest}
            </p>
          </div>
        ))}
        <div role='alert' className='border border-border bg-muted/60 px-3 py-2 text-sm text-muted-foreground'>
          Pro teams get $100 in trial credit for 2 weeks after activation.
        </div>
        <div className='flex justify-end gap-2'>
          <Button variant='outline'>Cancel</Button>
          <Button>Enable with $100 credits</Button>
        </div>
      </Card>

      {/* File upload empty */}
      <Card>
        <div>
          <CardTitle>File Upload</CardTitle>
          <CardSub>Drag and drop or browse</CardSub>
        </div>
        <div className='flex flex-col items-center gap-2 border border-border py-8 text-center'>
          <CloudArrowUp aria-hidden='true' className='size-8 text-muted-foreground' />
          <p className='text-sm font-medium'>Upload files</p>
          <p className='text-sm text-muted-foreground'>PNG, JPG, PDF up to 10MB</p>
          <Button>Browse Files</Button>
        </div>
      </Card>
    </div>
  )
}
