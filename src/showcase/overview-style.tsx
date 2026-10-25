import {
  ArrowsClockwiseIcon,
  ArrowsOutIcon,
  AirplaneIcon,
  AirTrafficControlIcon,
  BatteryChargingIcon,
  BellIcon,
  BellRingingIcon,
  BriefcaseIcon,
  CameraIcon,
  CalendarBlankIcon,
  ChartLineUpIcon,
  CaretDownIcon,
  CaretRightIcon,
  CheckIcon,
  CheckCircleIcon,
  CloudArrowUpIcon,
  CompassIcon,
  CrosshairIcon,
  CopyIcon,
  DatabaseIcon,
  DotsThreeIcon,
  DroneIcon,
  EyeIcon,
  GaugeIcon,
  GearIcon,
  GearSixIcon,
  GlobeHemisphereWestIcon,
  InfoIcon,
  MapPinIcon,
  MapTrifoldIcon,
  MagnifyingGlassIcon,
  MinusIcon,
  NavigationArrowIcon,
  PathIcon,
  PlusIcon,
  RadioIcon,
  RepeatIcon,
  RocketIcon,
  SlidersHorizontalIcon,
  SunIcon,
  TrashIcon,
  VideoCameraIcon,
  WifiHighIcon,
  WindIcon,
  WrenchIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  LockKeyIcon,
  SpeakerHighIcon,
  ThermometerIcon,
  TimerIcon,
  WarningCircleIcon,
  XIcon
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ToggleGroup } from '@/components/ui/toggle-group'
import { Toggle } from '@/components/ui/toggle'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Menu, MenuItem, MenuPortal, MenuPopup, MenuPositioner, MenuSeparator, MenuTrigger } from '@/components/ui/menu'
import { AccountFaqAccordion } from './accordion-faq'
import miniProA8miniSvg from './images/MiniPro_A8mini_blueprint_static.svg?raw'

const miniProA8mini = miniProA8miniSvg

function Card ({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`flex flex-col gap-4 border border-border bg-card p-6 text-card-foreground ${className}`}>
      {children}
    </div>
  )
}

function CardTitle ({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <h5 className={`h5 heading ${className}`}>{children}</h5>
}

function CardSub ({ children }: { children: React.ReactNode }) {
  return <p className='text-sm text-muted-foreground'>{children}</p>
}

const ICON_BUTTONS = [
  CopyIcon,
  InfoIcon,
  TrashIcon,
  ArrowsOutIcon,
  BriefcaseIcon,
  DotsThreeIcon,
  SunIcon,
  PlusIcon,
  MinusIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
  CaretDownIcon,
  CaretRightIcon,
  MagnifyingGlassIcon,
  GearIcon,
  AirplaneIcon,
  AirTrafficControlIcon,
  BatteryChargingIcon,
  BellIcon,
  BellRingingIcon,
  CameraIcon,
  ChartLineUpIcon,
  CompassIcon,
  CrosshairIcon,
  DatabaseIcon,
  DroneIcon,
  EyeIcon,
  GearSixIcon,
  GlobeHemisphereWestIcon,
  MapPinIcon,
  MapTrifoldIcon,
  NavigationArrowIcon,
  PathIcon,
  RadioIcon,
  RocketIcon,
  SlidersHorizontalIcon,
  VideoCameraIcon,
  WifiHighIcon,
  WindIcon,
  WrenchIcon
]

function IconButtonGrid () {
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

function TrafficChart () {
  return (
    <div>
      <div className='flex h-44 items-end justify-between gap-3'>
        {TRAFFIC.map((t) => (
          <div key={t.month} className='flex h-full flex-1 items-end justify-center gap-1.5'>
            <div className='w-full bg-chart-1' style={{ height: `${t.desktop}%` }} />
            <div className='w-full bg-chart-3' style={{ height: `${t.mobile}%` }} />
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
          <span className='size-2.5 bg-chart-1' /> Desktop
        </span>
        <span className='flex items-center gap-1.5'>
          <span className='size-2.5 bg-chart-3' /> Mobile
        </span>
      </div>
    </div>
  )
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

function Kbd ({ children }: { children: React.ReactNode }) {
  return (
    <Badge className='flex gap-1' status='default' size='sm' count={children} />
    // <kbd className='pointer-events-none inline-flex min-w-6 items-center justify-center border border-border bg-muted px-1.5 py-0.5 text-xs select-none'>
    // {children}
    // </kbd>
  )
}

function PseudoQr ({ size = 148 }: { size?: number }) {
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
    <div className='border border-border bg-background p-3' style={{ width: size + 24 }}>
      <div className='grid' style={{ gridTemplateColumns: `repeat(${N}, 1fr)`, width: size, height: size }}>
        {Array.from({ length: N * N }, (_, i) => {
          const r = Math.floor(i / N)
          const c = i % N
          return <div key={i} className={on(r, c) ? 'bg-foreground' : 'bg-transparent'} />
        })}
      </div>
    </div>
  )
}

function BarcodeMark () {
  return (
    <div aria-hidden='true' className='flex h-12 items-stretch gap-px overflow-hidden'>
      {Array.from({ length: 52 }, (_, index) => (
        <span
          key={index}
          className={index % 5 === 1 || index % 7 === 3 ? 'w-1.5 bg-foreground' : 'w-0.5 bg-foreground'}
        />
      ))}
    </div>
  )
}

function OperatorProfileCard () {
  return (
    <Card className='lg:col-span-2 xl:col-span-1'>
      <header className='flex items-center justify-between border-b border-border pb-3 text-xs'>
        <span className='sub-heading text-foreground'>FLIGHT CREW</span>
        <span className='sub-heading'>PROFILE 01</span>
      </header>
      <div className='grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4'>
        <div className='space-y-3'>
          <Avatar className='size-32 rounded-(--radius) border-border border bg-muted text-2xl'>
            <AvatarImage src='/images/lineart-avatar-1.png' />
          </Avatar>
          <div className='flex flex-col gap-2'>
            <div>
              <h2 className='h2'>Sky-001</h2>
              <p className='text-xs sub-heading mt-1'>The Terminator</p>
            </div>
            <p className='text-sm'>mPlaza, VN</p>
          </div>
        </div>
        <div className='text-center'>
          <Badge className='mt-3' status='processing' count='ACTIVE NOW' />
          <div className='text-7xl heading'>04</div>
          <p className='mt-2 text-xs text-muted-foreground'>Missions today</p>
        </div>
      </div>
      <Separator />
      <div className='space-y-2'>
        <p className='text-xs sub-heading'>About</p>
        <p className='max-w-72 text-sm leading-5'>
          Mapping coastlines and infrastructure with careful, repeatable flight plans.
        </p>
      </div>
      <div className='flex flex-wrap items-center gap-2'>
        <Badge status='outline' count='Survey' />
        <Badge status='outline' count='Mapping' />
        <Badge status='outline' count='Inspection' />
      </div>
      <div className='flex items-center justify-between gap-4 p-3 -mx-2 bg-muted'>
        <div className='space-y-2'>
          <div className='flex flex-col gap-1'>
            <p className='text-xs sub-heading'>Connect crew</p>
            <p className='text-sm text-foreground'>Scan to open Sky-001&apos;s field card.</p>
          </div>
          <Button variant='outline'>View profile</Button>
        </div>
        <PseudoQr size={76} />
      </div>
      <div className='grid grid-cols-2 divide-x divide-border pt-3'>
        <div className='pr-4'>
          <p className='text-xs sub-heading'>Flights</p>
          <p className='h2 mt-1 tabular-nums'>23</p>
        </div>
        <div className='pl-4'>
          <p className='text-xs sub-heading'>Missions</p>
          <p className='h2 mt-1 tabular-nums'>07</p>
        </div>
      </div>
    </Card>
  )
}

function MissionPassCard () {
  return (
    <Card className='lg:col-span-2'>
      <header className='flex items-start justify-between gap-4 border-b border-border pb-4'>
        <div>
          <CardTitle>Mission boarding pass</CardTitle>
          <CardSub>United Flight · UAV-048</CardSub>
        </div>
        <Badge status='success' count='READY' />
      </header>
      <div className='grid gap-5 md:grid-cols-[minmax(0,1fr)_12rem]'>
        <div className='space-y-5'>
          <div className='grid grid-cols-[1fr_auto_1fr] items-center gap-4'>
            <div>
              <p className='text-xs sub-heading'>Launch</p>
              <p className='h2 mt-2'>H01</p>
              <p className='text-sm'>Hangar 01</p>
            </div>
            <ArrowRightIcon aria-hidden='true' className='size-5 text-muted-foreground' />
            <div className='text-right'>
              <p className='text-xs sub-heading'>Survey zone</p>
              <p className='h2 mt-2'>Z08</p>
              <p className='text-sm'>Coastal sector</p>
            </div>
          </div>
          <Separator />
          <div className='grid grid-cols-3 gap-3'>
            <div>
              <p className='text-xs sub-heading'>Takeoff</p>
              <p className='mt-1 h6 tabular-nums'>04:20 PM</p>
            </div>
            <div>
              <p className='text-xs sub-heading'>Return</p>
              <p className='mt-1 h6 tabular-nums'>06:30 PM</p>
            </div>
            <div>
              <p className='text-xs sub-heading'>Waypoints</p>
              <p className='mt-1 h6 tabular-nums'>48</p>
            </div>
          </div>
        </div>
        <aside className='flex flex-col justify-between gap-5 border-t border-border pt-4 md:border-t-0 md:border-l border-dashed md:pt-0 md:pl-5'>
          <div className='flex justify-between'>
            <div>
              <p className='text-xs sub-heading'>Drone</p>
              <p className='h6 heading'>MiniPro V6</p>
            </div>
            <div className='text-right'>
              <p className='text-xs sub-heading'>Slot</p>
              <p className='h5 tabular-nums'>10C</p>
            </div>
          </div>
          <div className='space-y-2'>
            <BarcodeMark />
            <p className='text-center font-mono text-xs font-medium tracking-widest text-muted-foreground'>
              UF048 · H01 · Z08
            </p>
          </div>
        </aside>
      </div>
    </Card>
  )
}

function FieldPosterCard () {
  return (
    <Card className='lg:col-span-2 xl:col-span-2 gap-0! p-0!'>
      <header className='flex items-center justify-between border-b border-border p-6 pb-3 text-xs'>
        <span className='sub-heading text-foreground'>Unmanned Aerial Vehicle</span>
        <span className='sub-heading'>Oct 25, 2026</span>
      </header>
      <div className='grid gap-0 sm:grid-cols-[minmax(0,1fr)_12rem] min-h-0 h-full'>
        <div className='flex flex-col justify-between border-r border-border'>
          <div className='relative p-6 min-h-0 h-full'>
            <h2 className='text-7xl heading mb-4'>
              Autonomy for <br /> Every Drone
            </h2>
            <p className='text-xs sub-heading'>SkyTrack OS · v1.1.2</p>
            <div
              className='absolute z-1 -bottom-5 -right-19 [&_svg]:block [&_svg]:h-auto [&_svg]:w-xl'
              role='img'
              aria-label='SkyTrack'
              dangerouslySetInnerHTML={{ __html: miniProA8mini }}
            />
          </div>
          <div className='relative z-1 flex flex-wrap items-end justify-between gap-4 border-t border-border p-6 bg-card'>
            <div>
              <p className='text-xs sub-heading'>Our goal</p>
              <p className='h4 mt-1'>An operating system for autonomous missions </p>
            </div>
          </div>
        </div>
        <div className='relative z-0 flex flex-col min-h-0 h-full bg-size-[5px_5px] bg-[linear-gradient(45deg,var(--border)_12.50%,transparent_12.50%,transparent_50%,var(--border)_50%,var(--border)_62.50%,transparent_62.50%,transparent_100%)]'>
          <div className='flex w-full flex-col justify-between bg-primary p-4 py-6 text-center text-primary-foreground'>
            <p className='text-xs sub-heading text-primary-foreground'>Mini Pro</p>
            <p className='text-8xl heading tabular-nums pb-2'>A8</p>
            <div className='flex items-center justify-between border-t border-primary-foreground/30 pt-2 text-sm'>
              <span className='w-full text-center'>Quadcopter</span>
              {/* <Badge status='secondary' count='Verified' /> */}
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

function SwissMissionCard () {
  return (
    <Card className='lg:col-span-2 p-0! gap-0!'>
      <header className='flex items-start justify-between gap-4 p-6'>
        <div>
          <p className='text-xs sub-heading'>Mission studio</p>
          <h2 className='h1 mt-2'>Plan with clarity</h2>
        </div>
        <Badge status='processing' count='DESIGN PRINCIPLE' />
      </header>
      <div className='grid grid-cols-1 border-y border-border sm:grid-cols-3'>
        <div className='flex flex-col gap-8 justify-between bg-primary p-6 text-primary-foreground'>
          <div className='flex flex-col gap-4'>
            <span className='text-xs sub-heading text-primary-foreground'>01. Grid</span>
            <p className='text-7xl heading tabular-nums'>03</p>
          </div>
          <span className='text-sm mt-auto'>
            A clear route, <br /> at a glance.
          </span>
        </div>
        <div className='flex flex-col gap-8 justify-between border-border p-6'>
          <div className='flex flex-col gap-4'>
            <span className='text-xs sub-heading text-muted-foreground'>02. Type</span>
            <p className='h3'>Form follows function.</p>
          </div>
          <p className='text-sm text-muted-foreground  mt-auto'>
            Every label <br /> gives the crew one useful signal.
          </p>
        </div>
        <div className='flex flex-col gap-8 justify-between border-border p-6 sm:border-l'>
          <div className='flex flex-col gap-4'>
            <span className='text-xs sub-heading text-muted-foreground'>03. Accuracy</span>
            <div className='grid w-fit grid-cols-7 gap-2' aria-hidden='true'>
              {Array.from({ length: 49 }, (_, index) => (
                <span key={index} className={index % 4 === 0 ? 'size-1.5 bg-primary' : 'size-1.5 bg-border'} />
              ))}
            </div>
          </div>
          <p className='text-sm text-muted-foreground  mt-auto'>
            A precise grid <br /> keeps decisions legible.
          </p>
        </div>
      </div>
      {/* <footer className='flex flex-wrap items-center justify-between gap-3'>
        <p className='max-w-lg text-sm text-muted-foreground'>
          Mission details stay structured, so operators can focus on the airspace.
        </p>
        <Button variant='outline' size='sm'>
          View mission guide
        </Button>
      </footer> */}
    </Card>
  )
}

export function OverviewStyle () {
  return (
    <div className='grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3'>
      <OperatorProfileCard />
      <FieldPosterCard />
      <MissionPassCard />

      {/* Type rhythm */}
      <Card className='lg:col-span-1 lg:row-span-2'>
        <p className='text-xs font-medium uppercase tracking-wide text-muted-foreground'>Inherit - IBM Plex Sans</p>
        <h2 className='h1'>
          Designing <br /> with rhythm and hierarchy
        </h2>
        <Separator className='my-3' />
        <div className='grid gap-3'>
          <h1 className='h1'>Heading 1</h1>
          <h2 className='h2'>Heading 2</h2>
          <h3 className='h3'>Heading 3</h3>
          <h4 className='h4'>Heading 4</h4>
          <h5 className='h5'>Heading 5</h5>
          <h6 className='h6'>Heading 6</h6>
        </div>
        <div className='flex flex-col gap-0.5'>
          <p className='text-sm leading-6 text-muted-foreground'>
            A strong body style keeps long-form content readable and balances the visual weight of headings.
          </p>
          <p className='text-sm leading-6 text-muted-foreground'>
            Thoughtful spacing and cadence help paragraphs scan quickly without feeling dense.
          </p>
        </div>
      </Card>

      <SwissMissionCard />

      {/* Icon buttons */}
      <Card>
        <IconButtonGrid />
      </Card>

      {/* Controls kitchen-sink */}
      <Card className='lg:col-span-2'>
        <div className='flex items-center justify-between border border-border p-4'>
          <div>
            <div className='text-sm font-medium'>Two-factor authentication</div>
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
        <Input placeholder='Name' startAdornment={<MagnifyingGlassIcon aria-hidden='true' />} />
        <textarea
          placeholder='Message'
          rows={3}
          className='w-full resize-y border border-input bg-background px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50'
        />
        <div className='flex flex-wrap items-center gap-2 text-xs font-semibold'>
          <Badge status='processing' count='Badge' />
          <Badge status='secondary' count='Secondary' />
          <Badge status='outline' count='Outline' />
        </div>

        <div className='flex items-center gap-8'>
          <RadioGroup defaultValue='a' aria-label='Sample radios' className='flex flex-row items-center gap-2'>
            <RadioRoot value='a' aria-label='Option A' />
            <RadioRoot value='b' aria-label='Option B' />
          </RadioGroup>
          <div className='flex flex-row items-center gap-2'>
            <label className='flex items-center'>
              <CheckboxRoot defaultChecked aria-label='Sample checked' />
            </label>
            <label className='flex items-center'>
              <CheckboxRoot aria-label='Sample unchecked' />
            </label>
          </div>
          <div className='flex flex-row items-center gap-2'>
            <label className='ml-auto flex items-center gap-2 text-sm'>
              <Switch defaultChecked>
                <SwitchThumb />
              </Switch>
            </label>
            <label className='ml-auto flex items-center gap-2 text-sm'>
              <Switch>
                <SwitchThumb />
              </Switch>
            </label>
          </div>
        </div>

        <div className='flex flex-wrap items-center gap-2'>
          <div className='flex flex-wrap items-center gap-2'>
            <Button>Primary</Button>
            <Button variant='secondary'>Secondary</Button>
            <Button variant='outline'>Outline</Button>
            <Button variant='ghost'>Ghost</Button>
          </div>

          <div className='ml-auto'>
            <AlertDialog>
              <AlertDialogTrigger render={<Button variant='outline'>Alert Dialog</Button>} />
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
          </div>
          <span className='flex items-stretch'>
            <Button variant='outline' className='rounded-r-none border-r-0'>
              Split Button
            </Button>
            <Menu>
              <MenuTrigger
                render={<Button variant='outline' size='icon' aria-label='More group actions' className='rounded-l-none' />}
              >
                <CaretDownIcon aria-hidden='true' />
              </MenuTrigger>
              <MenuPortal>
                <MenuPositioner side='bottom' align='end' sideOffset={4}>
                  <MenuPopup>
                    <MenuItem>Edit</MenuItem>
                    <MenuItem>Duplicate</MenuItem>
                    <MenuItem>Archive</MenuItem>
                    <MenuSeparator />
                    <MenuItem variant='destructive'>Delete</MenuItem>
                  </MenuPopup>
                </MenuPositioner>
              </MenuPortal>
            </Menu>
          </span>
        </div>
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
        <div className='flex items-center justify-end gap-2'>
          <Button variant='outline'>Edit</Button>
          <Button variant='default'>Deploy</Button>
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
            <div className='text-xs sub-heading'>Desktop</div>
            <div className='h5'>1,224</div>
          </div>
          <div>
            <div className='text-xs sub-heading'>Mobile</div>
            <div className='h5'>860</div>
          </div>
          <div>
            <div className='text-xs sub-heading'>Mix delta</div>
            <div className='h5'>+42%</div>
          </div>
        </div>
      </Card>

      {/* Tabs */}
      <Card>
        <Tabs defaultValue='codespaces' className='min-h-0 h-full'>
          <TabsList className='w-full'>
            <TabsTab value='codespaces' className='flex-1'>
              Codespaces
            </TabsTab>
            <TabsTab value='local' className='flex-1'>
              Local
            </TabsTab>
            <TabsIndicator />
          </TabsList>
          <TabsPanel value='codespaces' className='flex items-center'>
            <div className='w-full flex flex-col items-center gap-2 py-6 text-center'>
              <p className='text-sm font-medium'>No codespaces</p>
              <p className='max-w-64 text-sm text-muted-foreground'>
                You don&apos;t have any codespaces with this repository checked out
              </p>
              <Button>Create Codespace</Button>
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
        <AccountFaqAccordion />
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
          {[
            ['SC', 'Female/1.jpg'],
            ['VL', 'Male/1.jpg'],
            ['NX', 'Female/2.jpg'],
            ['TW', 'Male/2.jpg'],
            ['TS', 'Female/3.jpg'],
            ['ES', 'Male/3.jpg'],
            ['PR', 'Female/4.jpg'],
            ['BB', 'Male/4.jpg'],
            ['WP', 'Female/5.jpg'],
            ['RU', 'Male/5.jpg'],
            ['PC', 'Female/6.jpg'],
            ['VT', 'Male/6.jpg'],
            ['RC', 'Male/7.jpg'],
            ['VU', 'Male/8.jpg'],
            ['NG', 'Male/9.jpg'],
            ['SO', 'Male/10.jpg']
          ].map(([initials, image]) => (
            <Avatar key={initials}>
              <AvatarImage src={`/images/avatars/${image}`} alt={`Contributor ${initials}`} />
              <AvatarFallback>{initials}</AvatarFallback>
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
          <DialogTrigger className='w-auto'>Share Feedback</DialogTrigger>
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
        <div className='flex justify-end gap-2'>
          <Button variant='outline'>Download PDF</Button>
          <Button>Pay Now</Button>
        </div>
      </Card>

      {/* Kitchen island smart home */}
      <Card>
        <div className='w-full'>
          <div className='w-full flex items-center justify-between gap-2'>
            <CardTitle>Kitchen Island</CardTitle>
            <label className='flex items-center gap-2 text-sm'>
              <Switch defaultChecked>
                <SwitchThumb />
              </Switch>
            </label>
          </div>
          <CardSub>Hue Color Ambient</CardSub>
        </div>
        <ToggleGroup defaultValue={['cooking']} aria-label='Scenes'>
          {['Cooking', 'Dining', 'Nightlight', 'Focus'].map((s) => (
            <Toggle className='w-full' key={s} value={s.toLowerCase()} aria-label={s}>
              {s}
            </Toggle>
          ))}
        </ToggleGroup>
        {[
          { icon: SunIcon, label: 'Brightness', v: 90 },
          { icon: ThermometerIcon, label: 'Color Temp', v: 70 },
          { icon: SpeakerHighIcon, label: 'Volume', v: 30 },
          { icon: TimerIcon, label: 'Fade', v: 0 }
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
        <div className='flex flex-col gap-0 border border-border rounded-(--radius)'>
          {[
            ['Search', ['⌘', 'K']],
            ['Quick Actions', ['⌘', 'J']],
            ['New File', ['⌘', 'N']],
            ['Save', ['⌘', 'S']],
            ['Toggle Sidebar', ['⌘', 'B']]
          ].map(([label, keys], i, arr) => (
            <>
              <div key={label as string} className='flex items-center justify-between px-4 py-3 text-sm'>
                <span>{label}</span>
                <span className='flex gap-1'>
                  {(keys as string[]).map((k) => (
                    <Kbd key={k}>{k}</Kbd>
                  ))}
                </span>
              </div>
              {i < arr.length - 1 && <Separator />}
            </>
          ))}
        </div>
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
            <a href='#forgot' className='sub-heading text-xs hover:text-foreground'>
              Forgot?
            </a>
          </span>
          <Input type='password' defaultValue='password123' />
        </div>
        <Button className='w-full'>
          <LockKeyIcon aria-hidden='true' /> Update Security
        </Button>
        <a href='#danger' className='flex items-center gap-3 border border-border p-3 text-sm hover:bg-muted/50'>
          <WarningCircleIcon aria-hidden='true' className='size-4 shrink-0 text-destructive' />
          <span>
            <span className='block font-medium'>Danger Zone</span>
            <span className='block text-muted-foreground'>Archive account and remove catalog</span>
          </span>
          <ArrowRightIcon aria-hidden='true' className='ml-auto size-4' />
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
            <XIcon />
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
        <div className='flex justify-end gap-2'>
          <Button variant='outline'>Reset</Button>
          <Button>Save Preferences</Button>
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
            <XIcon />
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
        <div className='grid grid-cols-1 gap-3 my-auto'>
          <div className='flex justify-center pt-2'>
            <PseudoQr />
          </div>
          <div className='flex flex-col gap-1 text-center'>
            <CardTitle>Scan to connect your mobile device</CardTitle>
            <CardSub>
              Open the Ledger mobile app and scan this code <br />
              to link your device.
            </CardSub>
          </div>
          <Button variant='secondary' className='w-full'>
            Got it
          </Button>
        </div>
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
              <CaretRightIcon className='size-3' />
            </li>
            <li>
              <Button variant='ghost' size='icon-sm' aria-label='Account options'>
                <DotsThreeIcon aria-hidden='true' />
              </Button>
            </li>
            <li aria-hidden='true' className='text-muted-foreground'>
              <CaretRightIcon className='size-3' />
            </li>
            <li aria-current='page' className='font-medium'>
              Payments
            </li>
          </ol>
        </nav>
        {[
          { icon: GaugeIcon, t: 'Change transfer limit', d: 'Adjust how much you can send from your balance.' },
          { icon: CalendarBlankIcon, t: 'Scheduled transfers', d: 'Set up a transfer to send at a later date.' },
          { icon: RepeatIcon, t: 'Direct Debits', d: 'Set up and manage regular payments.' },
          { icon: ArrowsClockwiseIcon, t: 'Recurring card payments', d: 'Manage your repeated card transactions.' }
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
            <CaretRightIcon aria-hidden='true' className='ml-auto size-4 text-muted-foreground' />
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
            Locked <LockKeyIcon aria-hidden='true' className='size-4' />
          </span>
        </div>
        <div className='relative flex min-h-0 h-full items-center justify-center overflow-hidden rounded-lg border border-border bg-muted bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,var(--border)_10px,var(--border)_11px)]'>
          <span className='absolute top-2 right-2'>
            <Badge status='error' count='Live' />
          </span>
        </div>
      </Card>

      {/* 404 empty */}
      <Card>
        <div className='flex flex-col items-center gap-3 my-auto text-center'>
          <div className='flex flex-col gap-2'>
            <p className='h5'>404 - Not Found</p>
            <p className='max-w-64 text-sm text-muted-foreground'>
              The page you&apos;re looking for doesn&apos;t exist. Try searching below.
            </p>
          </div>
          <div className='w-3/4'>
            <Input placeholder='Try searching for pages…' startAdornment={<MagnifyingGlassIcon aria-hidden='true' />} />
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
            <CheckCircleIcon aria-hidden='true' className='mt-0.5 size-5 shrink-0 text-primary' />
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
        <div className='flex flex-col justify-center items-center gap-2 border border-border py-8 text-center min-h-0 h-full'>
          <CloudArrowUpIcon aria-hidden='true' className='size-8 text-muted-foreground' />
          <p className='text-sm font-medium'>Upload files</p>
          <p className='text-sm text-muted-foreground'>PNG, JPG, PDF up to 10MB</p>
          <Button>Browse Files</Button>
        </div>
      </Card>
    </div>
  )
}
