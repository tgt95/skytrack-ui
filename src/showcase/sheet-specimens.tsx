import * as React from 'react'
import {
  ArrowUUpLeftIcon,
  CheckCircleIcon,
  InfoIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  WarningCircleIcon,
  WarningIcon,
  XIcon
} from '@phosphor-icons/react'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { ControlSize } from '@/lib/control-sizes'
import { Calendar } from '@/components/ui/calendar'
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig
} from '@/components/ui/chart'
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockLine,
  CodeBlockTitle
} from '@/components/ui/code-block'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import { DataTable, type DataTableColumnDef, type DataTableSize } from '@/components/ui/data-table'
import { DatePicker, DateRangePicker } from '@/components/ui/date-picker'
import { InlineEdit, InlineEditInput, InlineEditTrigger } from '@/components/ui/inline-edit'
import { PageHeader } from '@/components/ui/page-header'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'
import {
  ProgressStepIndicator,
  type ProgressIndicatorStep,
  type ProgressStepStatus
} from '@/components/ui/progress-indicator'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { Search } from '@/components/ui/search'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import {
  Attachment,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle
} from '@/components/ui/attachment'
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { Toggle } from '@/components/ui/toggle'
import { ToggleGroup } from '@/components/ui/toggle-group'
import { Toolbar, ToolbarButton, ToolbarSeparator } from '@/components/ui/toolbar'
import { Input } from '@/components/ui/input'
import {
  Autocomplete,
  AutocompleteEmpty,
  AutocompleteInput,
  AutocompleteInputGroup,
  AutocompleteItem,
  AutocompleteList,
  AutocompletePopup,
  AutocompletePortal,
  AutocompletePositioner,
  AutocompleteTrigger
} from '@/components/ui/autocomplete'
import {
  Combobox,
  ComboboxChip,
  ComboboxChipRemove,
  ComboboxChips,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxInputGroup,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxList,
  ComboboxPopup,
  ComboboxPortal,
  ComboboxPositioner,
  ComboboxTrigger,
  ComboboxTriggerButton,
  ComboboxValue
} from '@/components/ui/combobox'
import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput
} from '@/components/ui/number-field'
import { OTPField, OTPFieldInput, OTPFieldSeparator } from '@/components/ui/otp-field'
import {
  Select,
  SelectIcon,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectList,
  SelectPopup,
  SelectPortal,
  SelectPositioner,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Slider, SliderControl, SliderIndicator, SliderThumb, SliderTrack } from '@/components/ui/slider'
import { Switch, SwitchThumb } from '@/components/ui/switch'
import {
  Drawer,
  DrawerBackdrop,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerPopup,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
  DrawerViewport
} from '@/components/ui/drawer'
import {
  ToastAction,
  ToastClose,
  ToastContent,
  ToastDescription,
  ToastPortal,
  ToastProvider,
  ToastRoot,
  ToastTitle,
  ToastViewport,
  createToastManager,
  useToastManager
} from '@/components/ui/toast'
import {
  ContextMenu,
  ContextMenuItem,
  ContextMenuPopup,
  ContextMenuPortal,
  ContextMenuPositioner,
  ContextMenuTrigger
} from '@/components/ui/context-menu'
import { Menu, MenuItem, MenuPopup, MenuPortal, MenuPositioner, MenuTrigger } from '@/components/ui/menu'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger
} from '@/components/ui/sidebar'
import {
  ScrollArea,
  ScrollAreaContent,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport
} from '@/components/ui/scroll-area'
import { Tabs, TabsList, TabsTab } from '@/components/ui/tabs'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { CheckboxRoot } from '@/components/ui/checkbox'
import { CheckboxGroup } from '@/components/ui/checkbox-group'
import { FieldRoot, FieldLabel, FieldControl, FieldDescription } from '@/components/ui/field'
import { FieldsetRoot, FieldsetLegend } from '@/components/ui/fieldset'
import { Form } from '@/components/ui/form'
import { Dropzone } from '@/components/ui/dropzone'
import { RadioRoot, RadioGroup } from '@/components/ui/radio'
import { Meter, MeterLabel, MeterTrack, MeterIndicator } from '@/components/ui/meter'
import { Progress, ProgressLabel, ProgressTrack, ProgressIndicator } from '@/components/ui/progress'
import { AccountFaqAccordion } from './accordion-faq'
import { Collapsible, CollapsibleTrigger, CollapsiblePanel } from '@/components/ui/collapsible'
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipPortal,
  TooltipPositioner,
  TooltipPopup
} from '@/components/ui/tooltip'
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogPortal,
  AlertDialogBackdrop,
  AlertDialogViewport,
  AlertDialogPopup,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogClose,
  AlertDialogFooter
} from '@/components/ui/alert-dialog'
import {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogBackdrop,
  DialogViewport,
  DialogPopup,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogFooter
} from '@/components/ui/dialog'
import {
  Popover,
  PopoverTrigger,
  PopoverPortal,
  PopoverPositioner,
  PopoverPopup,
  PopoverTitle,
  PopoverDescription
} from '@/components/ui/popover'
import {
  PreviewCard,
  PreviewCardTrigger,
  PreviewCardPortal,
  PreviewCardPositioner,
  PreviewCardPopup
} from '@/components/ui/preview-card'
import { Menubar } from '@/components/ui/menubar'
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuPortal,
  NavigationMenuPositioner,
  NavigationMenuPopup,
  NavigationMenuViewport,
  NavigationMenuLink
} from '@/components/ui/navigation-menu'

/**
 * Live specimens for the Sheet. Each entry renders the real component at one
 * axis value, so a reader can hover, click and open the same thing the library
 * ships. Labels stay in the Sheet row; specimens carry only an accessible name.
 */

const FRUITS = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Mango', value: 'mango' }
]

const COMMANDS = [
  { value: 'alpha', label: 'Alpha' },
  { value: 'bravo', label: 'Bravo' },
  { value: 'charlie', label: 'Charlie' }
]

const TAB_ITEMS = [
  { value: 'one', label: 'One' },
  { value: 'two', label: 'Two' },
  { value: 'three', label: 'Three' }
]

function isIconSize(size?: string) {
  return size?.startsWith('icon') ?? false
}

function ButtonSpecimenContent({ size, label, close = false }: { size?: string; label: string; close?: boolean }) {
  if (!isIconSize(size)) return label
  return close ? <XIcon aria-hidden /> : <PlusIcon aria-hidden />
}

/* ------------------------------------------------------------------ Button */

function ButtonSpecimen({ variant, size }: { variant?: string; size?: string }) {
  const icon = isIconSize(size)
  return (
    <Button
      variant={variant as React.ComponentProps<typeof Button>['variant']}
      size={size as React.ComponentProps<typeof Button>['size']}
      aria-label={icon ? (size ?? 'icon') : undefined}
    >
      {icon ? <PlusIcon aria-hidden /> : variant === 'link' ? 'Link' : 'Button'}
    </Button>
  )
}

const ALERT_VARIANTS_CONTENT: Record<
  string,
  { icon: React.ReactNode; title: string; description: string }
> = {
  default: {
    icon: <InfoIcon className='size-5 shrink-0' aria-hidden='true' />,
    title: 'Heads up',
    description: 'Review this information before continuing your mission setup.'
  },
  info: {
    icon: <InfoIcon className='size-5 shrink-0' aria-hidden='true' />,
    title: 'New flight plan tools',
    description: 'Drafts now support reusable routes and shared checkpoints.'
  },
  success: {
    icon: <CheckCircleIcon className='size-5 shrink-0' aria-hidden='true' />,
    title: 'Mission saved',
    description: 'Your changes are ready for review.'
  },
  warning: {
    icon: <WarningIcon className='size-5 shrink-0' aria-hidden='true' />,
    title: 'Battery reserve is low',
    description: 'Check the return-to-home margin before launching.'
  },
  destructive: {
    icon: <WarningCircleIcon className='size-5 shrink-0' aria-hidden='true' />,
    title: 'Connection lost',
    description: 'Telemetry stopped. Confirm the aircraft link before proceeding.'
  }
}

function AlertSpecimen({ variant = 'default' }: { variant?: string }) {
  const content = ALERT_VARIANTS_CONTENT[variant] ?? ALERT_VARIANTS_CONTENT.default
  return (
    <Alert variant={variant as React.ComponentProps<typeof Alert>['variant']} className='w-full max-w-xl'>
      {content.icon}
      <div className='grid gap-1'>
        <AlertTitle>{content.title}</AlertTitle>
        <AlertDescription>{content.description}</AlertDescription>
      </div>
    </Alert>
  )
}

function AttachmentSpecimen({
  state = 'done',
  size = 'default',
  orientation = 'horizontal',
  media = 'icon'
}: {
  state?: string
  size?: string
  orientation?: string
  media?: string
}) {
  return (
    <Attachment
      state={state as React.ComponentProps<typeof Attachment>['state']}
      size={size as React.ComponentProps<typeof Attachment>['size']}
      orientation={orientation as React.ComponentProps<typeof Attachment>['orientation']}
      className='max-w-sm'
    >
      <AttachmentMedia variant={media as React.ComponentProps<typeof AttachmentMedia>['variant']}>
        <PlusIcon aria-hidden />
      </AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>mission-plan.json</AttachmentTitle>
        <AttachmentDescription>
          {state === 'error' ? 'Upload failed · Retry' : state === 'done' ? 'Ready · 24 KB' : `${state} · 24 KB`}
        </AttachmentDescription>
      </AttachmentContent>
    </Attachment>
  )
}

function BreadcrumbSpecimen({ state = 'link' }: { state?: string }) {
  const isCurrent = state === 'current page'
  const isSeparator = state === 'separator'
  const isEllipsis = state === 'ellipsis'

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href='#'>Projects</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>{isSeparator ? '/' : undefined}</BreadcrumbSeparator>
        {isEllipsis && (
          <>
            <BreadcrumbItem>
              <BreadcrumbEllipsis />
            </BreadcrumbItem>
            <BreadcrumbSeparator>{isSeparator ? '/' : undefined}</BreadcrumbSeparator>
          </>
        )}
        <BreadcrumbItem>
          {isCurrent ? (
            <BreadcrumbPage>Plan</BreadcrumbPage>
          ) : (
            <BreadcrumbLink href='#'>Mission Alpha</BreadcrumbLink>
          )}
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}

/* ------------------------------------------------------------------ Toggle */

function ToggleSpecimen({ variant, size }: { variant?: string; size?: string }) {
  const isIcon = size?.startsWith('icon')
  return (
    <Toggle
      variant={variant as React.ComponentProps<typeof Toggle>['variant']}
      size={size as React.ComponentProps<typeof Toggle>['size']}
      defaultPressed
      aria-label={`toggle ${variant ?? size ?? ''}`}
    >
      {isIcon ? <PlusIcon aria-hidden /> : 'Bold'}
    </Toggle>
  )
}

function ToggleGroupSpecimen({
  variant,
  size,
  orientation
}: {
  variant?: string
  size?: string
  orientation?: string
}) {
  return (
    <ToggleGroup
      variant={variant as React.ComponentProps<typeof ToggleGroup>['variant']}
      size={size as React.ComponentProps<typeof ToggleGroup>['size']}
      orientation={orientation as React.ComponentProps<typeof ToggleGroup>['orientation']}
      defaultValue={['a']}
      aria-label={`toggle group ${variant ?? size ?? orientation ?? ''}`}
    >
      <Toggle value='a'>A</Toggle>
      <Toggle value='b'>B</Toggle>
    </ToggleGroup>
  )
}

/* ----------------------------------------------------------------- Toolbar */

function ToolbarSpecimen({
  size,
  isActivated,
  orientation
}: {
  size?: string
  isActivated?: string
  orientation?: string
}) {
  const icon = size === 'icon'
  return (
    <Toolbar orientation={orientation as React.ComponentProps<typeof Toolbar>['orientation']}>
      <ToolbarButton
        size={size as React.ComponentProps<typeof ToolbarButton>['size']}
        isActivated={isActivated === 'true'}
        aria-label='Bold'
      >
        {icon ? <PlusIcon aria-hidden /> : 'B'}
      </ToolbarButton>
      <ToolbarSeparator />
      <ToolbarButton size={size as React.ComponentProps<typeof ToolbarButton>['size']} aria-label='Italic'>
        {icon ? <PlusIcon aria-hidden /> : 'I'}
      </ToolbarButton>
    </Toolbar>
  )
}

/* ------------------------------------------------------------ Autocomplete */

function AutocompleteSpecimen({
  context,
  inputSize,
  groupSize
}: {
  context?: string
  inputSize?: string
  groupSize?: string
}) {
  const input = (
    <AutocompleteInput
      context={context as React.ComponentProps<typeof AutocompleteInput>['context']}
      size={inputSize as React.ComponentProps<typeof AutocompleteInput>['size']}
      placeholder='Search'
      aria-label={`autocomplete ${inputSize ?? context ?? ''}`}
    />
  )

  return (
    <Autocomplete items={COMMANDS}>
      {context === 'group' ? (
        <AutocompleteInputGroup
          size={groupSize as React.ComponentProps<typeof AutocompleteInputGroup>['size']}
          className='w-40'
        >
          {input}
          <AutocompleteTrigger aria-label='Open suggestions' />
        </AutocompleteInputGroup>
      ) : (
        <div className='w-40'>{input}</div>
      )}
      <AutocompletePortal>
        <AutocompletePositioner side='bottom' align='start' sideOffset={4}>
          <AutocompletePopup>
            <AutocompleteEmpty>No results.</AutocompleteEmpty>
            <AutocompleteList>
              {(item: (typeof COMMANDS)[number]) => (
                <AutocompleteItem key={item.value} value={item}>
                  {item.label}
                </AutocompleteItem>
              )}
            </AutocompleteList>
          </AutocompletePopup>
        </AutocompletePositioner>
      </AutocompletePortal>
    </Autocomplete>
  )
}

/* --------------------------------------------------------------- Combobox */

function ComboboxSpecimen({
  size,
  shape,
  standaloneTriggerSize
}: {
  size?: string
  shape?: string
  standaloneTriggerSize?: string
}) {
  if (standaloneTriggerSize) {
    return (
      <Combobox items={FRUITS}>
        <ComboboxTriggerButton
          size={standaloneTriggerSize as React.ComponentProps<typeof ComboboxTriggerButton>['size']}
          className='w-40'
        >
          <ComboboxValue placeholder='Pick fruit' />
        </ComboboxTriggerButton>
        <ComboboxPortal>
          <ComboboxPositioner side='bottom' align='start' sideOffset={4}>
            <ComboboxPopup>
              <ComboboxList>
                {(item: (typeof FRUITS)[number]) => (
                  <ComboboxItem key={item.value} value={item}>
                    <ComboboxItemIndicator />
                    <span className='col-start-2'>{item.label}</span>
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxPopup>
          </ComboboxPositioner>
        </ComboboxPortal>
      </Combobox>
    )
  }

  if (shape === 'chips') {
    return (
      <Combobox items={FRUITS} multiple defaultValue={[FRUITS[0], FRUITS[1]]}>
        <ComboboxInputGroup
          size={size as React.ComponentProps<typeof ComboboxInputGroup>['size']}
          shape='chips'
          className='w-52'
        >
          <ComboboxValue>
            {(value: (typeof FRUITS)[number][]) => (
              <ComboboxChips aria-label='Selected fruits'>
                {value.map((fruit) => (
                  <ComboboxChip key={fruit.value} aria-label={fruit.label}>
                    {fruit.label}
                    <ComboboxChipRemove aria-label={`Remove ${fruit.label}`} />
                  </ComboboxChip>
                ))}
                <ComboboxInput placeholder='Add fruit' aria-label='Add fruit' />
              </ComboboxChips>
            )}
          </ComboboxValue>
        </ComboboxInputGroup>
        <ComboboxPortal>
          <ComboboxPositioner side='bottom' align='start' sideOffset={4}>
            <ComboboxPopup>
              <ComboboxEmpty>No fruits found.</ComboboxEmpty>
              <ComboboxList>
                {(item: (typeof FRUITS)[number]) => (
                  <ComboboxItem key={item.value} value={item}>
                    <ComboboxItemIndicator />
                    <span className='col-start-2'>{item.label}</span>
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxPopup>
          </ComboboxPositioner>
        </ComboboxPortal>
      </Combobox>
    )
  }

  return (
    <Combobox items={FRUITS}>
      <ComboboxInputGroup size={size as React.ComponentProps<typeof ComboboxInputGroup>['size']} className='w-40'>
        <ComboboxInput placeholder='Pick fruit' aria-label={`combobox ${size ?? ''}`} />
        <ComboboxTrigger aria-label='Open list' />
      </ComboboxInputGroup>
      <ComboboxPortal>
        <ComboboxPositioner side='bottom' align='start' sideOffset={4}>
          <ComboboxPopup>
            <ComboboxEmpty>No fruits found.</ComboboxEmpty>
            <ComboboxList>
              {(item: (typeof FRUITS)[number]) => (
                <ComboboxItem key={item.value} value={item}>
                  <ComboboxItemIndicator />
                  <span className='col-start-2'>{item.label}</span>
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxPopup>
        </ComboboxPositioner>
      </ComboboxPortal>
    </Combobox>
  )
}

function ConfiguredComboboxSpecimen({
  size,
  shape,
  standaloneTriggerSize
}: {
  size: string
  shape: string
  standaloneTriggerSize: string
}) {
  return (
    <div className='flex flex-col gap-2'>
      <div className='flex flex-wrap items-center gap-2'>
        <span className='w-28 text-xs text-muted-foreground'>Input group</span>
        <ComboboxSpecimen size={size} shape={shape} />
      </div>
      <div className='flex flex-wrap items-center gap-2'>
        <span className='w-28 text-xs text-muted-foreground'>Standalone trigger</span>
        <ComboboxSpecimen standaloneTriggerSize={standaloneTriggerSize} />
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------- Input */

function InputSpecimen({ adornment = 'none', size = 'default' }: { adornment?: string; size?: ControlSize }) {
  const start = adornment === 'start' || adornment === 'both'
  const end = adornment === 'end' || adornment === 'both'
  return (
    <Input
      size={size}
      className='w-40'
      placeholder='Value'
      aria-label={`input ${adornment} ${size}`}
      startAdornment={start ? <MagnifyingGlassIcon aria-hidden /> : undefined}
      endAdornment={end ? <span className='text-xs'>kg</span> : undefined}
    />
  )
}

/* ------------------------------------------------------------ Number field */

function NumberFieldSpecimen({ size = 'default' }: { size?: string }) {
  const controlSize = size as ControlSize
  return (
    <NumberField defaultValue={100}>
      <NumberFieldGroup size={controlSize}>
        <NumberFieldDecrement aria-label='Decrease' />
        <NumberFieldInput size={controlSize} aria-label='Amount' />
        <NumberFieldIncrement aria-label='Increase' />
      </NumberFieldGroup>
    </NumberField>
  )
}

/* --------------------------------------------------------------- OTP field */

function OtpFieldSpecimen({ orientation }: { orientation: string }) {
  return (
    <OTPField length={6}>
      {[0, 1, 2].map((index) => (
        <OTPFieldInput key={index} aria-label={`Character ${index + 1} of 6`} />
      ))}
      <OTPFieldSeparator orientation={orientation as 'horizontal' | 'vertical'} aria-hidden />
      {[3, 4, 5].map((index) => (
        <OTPFieldInput key={index} aria-label={`Character ${index + 1} of 6`} />
      ))}
    </OTPField>
  )
}

/* ------------------------------------------------------------------ Select */

function SelectSpecimen({ size }: { size: string }) {
  return (
    <Select items={FRUITS}>
      <SelectTrigger
        size={size as React.ComponentProps<typeof SelectTrigger>['size']}
        className='w-36'
        aria-label={`select ${size}`}
      >
        <SelectValue placeholder='Pick fruit' />
        <SelectIcon />
      </SelectTrigger>
      <SelectPortal>
        <SelectPositioner side='bottom' align='start' sideOffset={4} alignItemWithTrigger={false}>
          <SelectPopup>
            <SelectList>
              {FRUITS.map((fruit) => (
                <SelectItem key={fruit.value} value={fruit.value}>
                  <SelectItemIndicator />
                  <SelectItemText>{fruit.label}</SelectItemText>
                </SelectItem>
              ))}
            </SelectList>
          </SelectPopup>
        </SelectPositioner>
      </SelectPortal>
    </Select>
  )
}

/* ------------------------------------------------------------------ Slider */

function SliderSpecimen({ orientation = 'horizontal', state }: { orientation?: string; state?: string }) {
  const isDragging = state === 'dragging'
  const isDisabled = state === 'disabled'
  const defaultValue = isDragging ? 75 : isDisabled ? 30 : 40

  return (
    <Slider
      orientation={orientation as React.ComponentProps<typeof Slider>['orientation']}
      defaultValue={defaultValue}
      disabled={isDisabled}
      className={orientation === 'vertical' ? 'h-28 w-8' : 'w-48'}
    >
      <SliderControl>
        <SliderTrack>
          <SliderIndicator />
          <SliderThumb
            aria-label={`slider ${orientation}`}
            className={isDragging ? 'shadow-md ring-2 ring-primary' : undefined}
          />
        </SliderTrack>
      </SliderControl>
    </Slider>
  )
}

/* ------------------------------------------------------------------ Switch */

function SwitchSpecimen({ size = 'default', state }: { size?: string; state?: string }) {
  const isChecked = state ? state === 'checked' : true
  const isDisabled = state === 'disabled'
  const isFocusVisible = state === 'focus-visible'
  return (
    <Switch
      size={size as React.ComponentProps<typeof Switch>['size']}
      defaultChecked={isChecked}
      disabled={isDisabled}
      autoFocus={isFocusVisible}
      aria-label={`switch ${size}`}
    >
      <SwitchThumb />
    </Switch>
  )
}

/* ------------------------------------------------------------------ Drawer */

function DrawerSpecimen({
  side = 'bottom',
  buttonVariant = 'outline',
  buttonSize = 'default'
}: {
  side?: string
  buttonVariant?: string
  buttonSize?: string
}) {
  return (
    <Drawer>
      <DrawerTrigger
        aria-label={isIconSize(buttonSize) ? `Open ${side} drawer` : undefined}
        render={
          <Button
            variant={buttonVariant as React.ComponentProps<typeof Button>['variant']}
            size={buttonSize as React.ComponentProps<typeof Button>['size']}
          >
            <ButtonSpecimenContent size={buttonSize} label={side} />
          </Button>
        }
      />
      <DrawerPortal>
        <DrawerBackdrop />
        <DrawerViewport side={side as React.ComponentProps<typeof DrawerViewport>['side']}>
          <DrawerPopup side={side as React.ComponentProps<typeof DrawerPopup>['side']}>
            <DrawerContent>
              <DrawerTitle>{side} drawer</DrawerTitle>
              <DrawerDescription>Opens from the {side} edge of the viewport.</DrawerDescription>
              <DrawerClose
                variant={buttonVariant as React.ComponentProps<typeof DrawerClose>['variant']}
                size={buttonSize as React.ComponentProps<typeof DrawerClose>['size']}
                className='self-start'
                aria-label={isIconSize(buttonSize) ? 'Close drawer' : undefined}
              >
                <ButtonSpecimenContent size={buttonSize} label='Close' close />
              </DrawerClose>
            </DrawerContent>
          </DrawerPopup>
        </DrawerViewport>
      </DrawerPortal>
    </Drawer>
  )
}

/* ------------------------------------------------------------------- Toast */

type ToastType = 'success' | 'error' | 'warning' | 'loading'

function ToastSpecimen({
  label,
  layout,
  type,
  closeSize,
  closeVariant,
  actionSize,
  actionVariant
}: {
  label: string
  layout?: 'stacked' | 'flat'
  type?: ToastType
  closeSize?: 'default' | 'sm' | 'icon'
  closeVariant?: 'outline' | 'ghost'
  actionSize?: 'default' | 'sm' | 'icon'
  actionVariant?: 'outline' | 'ghost'
}) {
  const [manager] = React.useState(createToastManager)

  return (
    <ToastProvider toastManager={manager}>
      <Button
        size='sm'
        variant='outline'
        onClick={() =>
          manager.add({
            title: label,
            description: 'Live toast from the reference sheet.',
            type
          })
        }
      >
        {label}
      </Button>
      <ToastPortal>
        <ToastViewport>
          <ToastList
            layout={layout}
            closeSize={closeSize}
            closeVariant={closeVariant}
            actionSize={actionSize}
            actionVariant={actionVariant}
          />
        </ToastViewport>
      </ToastPortal>
    </ToastProvider>
  )
}

function ToastList({
  layout,
  closeSize,
  closeVariant,
  actionSize,
  actionVariant
}: {
  layout?: 'stacked' | 'flat'
  closeSize?: 'default' | 'sm' | 'icon'
  closeVariant?: 'outline' | 'ghost'
  actionSize?: 'default' | 'sm' | 'icon'
  actionVariant?: 'outline' | 'ghost'
}) {
  const { toasts } = useToastManager()
  return toasts.map((toast) => (
    <ToastRoot key={toast.id} toast={toast} layout={layout}>
      <ToastContent>
        <div className='flex min-w-0 flex-1 flex-col gap-1'>
          <ToastTitle />
          <ToastDescription />
        </div>
        <div className='flex shrink-0 items-center gap-2'>
          {(actionSize || actionVariant) && (
            <ToastAction
              size={actionSize}
              variant={actionVariant}
              aria-label={actionSize === 'icon' ? 'Undo' : undefined}
            >
              {actionSize === 'icon' ? <ArrowUUpLeftIcon aria-hidden /> : 'Undo'}
            </ToastAction>
          )}
          <ToastClose size={closeSize} variant={closeVariant} aria-label='Dismiss' />
        </div>
      </ToastContent>
    </ToastRoot>
  ))
}

/* ------------------------------------------------------------ Context menu */

function ContextMenuSpecimen({ variant, inset }: { variant?: string; inset?: string }) {
  const isInset = inset === 'true'
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div className='flex h-16 w-32 items-center justify-center border border-dashed border-border text-xs text-muted-foreground select-none'>
          right-click
        </div>
      </ContextMenuTrigger>
      <ContextMenuPortal>
        <ContextMenuPositioner>
          <ContextMenuPopup>
            <ContextMenuItem inset={isInset}>Rename</ContextMenuItem>
            <ContextMenuItem
              variant={variant as React.ComponentProps<typeof ContextMenuItem>['variant']}
              inset={isInset}
            >
              Delete
            </ContextMenuItem>
          </ContextMenuPopup>
        </ContextMenuPositioner>
      </ContextMenuPortal>
    </ContextMenu>
  )
}

/* -------------------------------------------------------------------- Menu */

function MenuSpecimen({ variant, inset }: { variant?: string; inset?: string }) {
  const isInset = inset === 'true'
  return (
    <Menu>
      <MenuTrigger>Open</MenuTrigger>
      <MenuPortal>
        <MenuPositioner side='bottom' align='start' sideOffset={4}>
          <MenuPopup>
            <MenuItem inset={isInset}>Rename</MenuItem>
            <MenuItem variant={variant as React.ComponentProps<typeof MenuItem>['variant']} inset={isInset}>
              Delete
            </MenuItem>
          </MenuPopup>
        </MenuPositioner>
      </MenuPortal>
    </Menu>
  )
}

/* ------------------------------------------------------------------- Badge */

function BadgeSpecimen({ status, size }: { status?: string; size?: string }) {
  return (
    <Badge
      status={status as React.ComponentProps<typeof Badge>['status']}
      size={size as React.ComponentProps<typeof Badge>['size']}
      count={status ?? 8}
    />
  )
}

/* --------------------------------------------------------------- Separator */

function SeparatorSpecimen({ orientation }: { orientation: string }) {
  if (orientation === 'vertical') {
    return (
      <span className='flex h-6 items-center'>
        <Separator orientation='vertical' />
      </span>
    )
  }
  return <Separator className='w-24' />
}

/* ------------------------------------------------------------- Scroll area */

function ScrollAreaSpecimen({ orientation }: { orientation: string }) {
  if (orientation === 'horizontal') {
    return (
      <ScrollArea className='h-14 w-40 rounded-(--radius) border border-border'>
        <ScrollAreaViewport>
          <ScrollAreaContent className='w-72 p-2 text-xs whitespace-nowrap'>
            Wide content scrolls sideways.
          </ScrollAreaContent>
        </ScrollAreaViewport>
        <ScrollAreaScrollbar orientation='horizontal'>
          <ScrollAreaThumb />
        </ScrollAreaScrollbar>
      </ScrollArea>
    )
  }

  return (
    <ScrollArea className='h-20 w-40 rounded-(--radius) border border-border'>
      <ScrollAreaViewport>
        <ScrollAreaContent className='p-2 text-xs'>
          <p className='m-0'>Tall content scrolls vertically.</p>
          <p className='m-0'>Second line.</p>
          <p className='m-0'>Third line.</p>
          <p className='m-0'>Fourth line.</p>
          <p className='m-0'>Fifth line.</p>
        </ScrollAreaContent>
      </ScrollAreaViewport>
      <ScrollAreaScrollbar>
        <ScrollAreaThumb />
      </ScrollAreaScrollbar>
    </ScrollArea>
  )
}

/* ------------------------------------------------------------------- Tabs */

function TabsSpecimen({
  defaultTab = 'one',
  listVariant = 'line',
  tabSize = 'default',
  listWidth = 'hug',
  indicatorSide = 'left',
  orientation = 'horizontal',
  disabledTab = 'none',
  activation = 'manual',
  focusLoop = 'loop'
}: {
  defaultTab?: 'none' | 'one' | 'two' | 'three'
  listVariant?: 'filled' | 'pill' | 'line'
  tabSize?: 'default' | 'xs' | 'sm' | 'lg'
  listWidth?: 'full' | 'hug'
  indicatorSide?: 'left' | 'right'
  orientation?: 'horizontal' | 'vertical'
  disabledTab?: 'none' | 'one' | 'two' | 'three'
  activation?: 'manual' | 'automatic'
  focusLoop?: 'loop' | 'stop'
}) {
  return (
    <Tabs
      key={defaultTab}
      defaultValue={defaultTab === 'none' ? null : defaultTab}
      orientation={orientation}
      className={orientation === 'vertical' ? 'w-fit flex-row gap-3' : 'w-fit'}
    >
      <TabsList
        variant={listVariant}
        size={tabSize}
        width={listWidth}
        indicatorSide={indicatorSide}
        activateOnFocus={activation === 'automatic'}
        loopFocus={focusLoop === 'loop'}
        className={orientation === 'vertical' ? 'flex-col' : undefined}
      >
        {TAB_ITEMS.map((tab) => (
          <TabsTab key={tab.value} value={tab.value} disabled={disabledTab === tab.value}>
            {tab.label}
          </TabsTab>
        ))}
      </TabsList>
    </Tabs>
  )
}

/* ------------------------------------------------------------ Avatar */

function AvatarSpecimen({ size = 'default' }: { size?: ControlSize }) {
  return (
    <div className='flex items-center gap-3'>
      <Avatar size={size}>
        <AvatarImage
          src='https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=96&h=96&dpr=2&q=80'
          width='48'
          height='48'
          alt=''
        />
        <AvatarFallback>LT</AvatarFallback>
      </Avatar>
      <Avatar size={size}>
        <AvatarFallback>SK</AvatarFallback>
      </Avatar>
    </div>
  )
}

/* ---------------------------------------------------------- Dropzone */

function DropzoneSpecimen({ state = 'idle' }: { state?: string }) {
  if (state === 'disabled') {
    return <Dropzone disabled className='w-full max-w-sm' />
  }
  if (state === 'dragging') {
    return (
      <Dropzone
        data-dragging=''
        className='w-full max-w-sm border-primary bg-primary/5'
        hint='Drop file here to upload'
      />
    )
  }
  return <Dropzone className='w-full max-w-sm' />
}

/* ---------------------------------------------------------- Checkbox */

function CheckboxSpecimen({ state = 'checked' }: { state?: string }) {
  if (state === 'unchecked') {
    return <CheckboxRoot aria-label='Unchecked checkbox' />
  }
  if (state === 'indeterminate') {
    return <CheckboxRoot indeterminate aria-label='Indeterminate checkbox' />
  }
  if (state === 'disabled') {
    return <CheckboxRoot disabled defaultChecked aria-label='Disabled checkbox' />
  }
  if (state === 'invalid') {
    return <CheckboxRoot aria-invalid defaultChecked aria-label='Invalid checkbox' />
  }
  return <CheckboxRoot defaultChecked aria-label='Checked checkbox' />
}

function CheckboxGroupSpecimen({ state = 'multiple values' }: { state?: string }) {
  const disabled = state === 'disabled'
  return (
    <CheckboxGroup disabled={disabled} defaultValue={['a', 'b']} aria-label='Checkbox group' className='flex gap-3'>
      <CheckboxRoot value='a' aria-label='Option A' />
      <CheckboxRoot value='b' aria-label='Option B' />
      <CheckboxRoot value='c' aria-label='Option C' />
    </CheckboxGroup>
  )
}

/* ----------------------------------------------------------- Field */

function FieldSpecimen({ state = 'filled' }: { state?: string }) {
  if (state === 'invalid') {
    return (
      <FieldRoot invalid className='w-64'>
        <FieldLabel className='text-destructive'>Email address</FieldLabel>
        <FieldControl value='invalid-email' aria-label='Email input' />
        <span data-slot='field-error' className='text-sm leading-normal font-medium text-destructive'>
          Please enter a valid email address.
        </span>
      </FieldRoot>
    )
  }
  if (state === 'disabled') {
    return (
      <FieldRoot disabled className='w-64'>
        <FieldLabel>Email address</FieldLabel>
        <FieldControl placeholder='name@example.com' aria-label='Email input' />
        <FieldDescription>Editing is not available.</FieldDescription>
      </FieldRoot>
    )
  }
  return (
    <FieldRoot className='w-64'>
      <FieldLabel>Email address</FieldLabel>
      <FieldControl defaultValue='name@example.com' aria-label='Email input' />
      <FieldDescription>We never share your email.</FieldDescription>
    </FieldRoot>
  )
}

/* ---------------------------------------------------------- Fieldset */

function FieldsetSpecimen({ state = 'enabled' }: { state?: string }) {
  const disabled = state === 'disabled'
  return (
    <FieldsetRoot disabled={disabled} className='w-64'>
      <FieldsetLegend>Delivery details</FieldsetLegend>
      <FieldRoot>
        <FieldLabel>Address</FieldLabel>
        <FieldControl placeholder='12 Computing Way' aria-label='Address input' />
      </FieldRoot>
    </FieldsetRoot>
  )
}

/* ---------------------------------------------------------------- Form */

function FormSpecimen({ state = 'valid' }: { state?: string }) {
  const isInvalid = state === 'invalid'
  return (
    <Form className='flex w-64 flex-col gap-3' onSubmit={(e) => e.preventDefault()}>
      <FieldRoot invalid={isInvalid}>
        <FieldLabel className={isInvalid ? 'text-destructive' : undefined}>Username</FieldLabel>
        <FieldControl defaultValue={isInvalid ? 'a' : 'pilot'} aria-label='Username input' />
        {isInvalid ? (
          <span data-slot='field-error' className='text-sm leading-normal font-medium text-destructive'>
            Username must be at least 3 characters.
          </span>
        ) : (
          <FieldDescription>Ready to submit.</FieldDescription>
        )}
      </FieldRoot>
      <Button size='sm' type='submit'>Submit</Button>
    </Form>
  )
}

/* --------------------------------------------------------------- Radio */

function RadioSpecimen({ state = 'checked' }: { state?: string }) {
  const isUnchecked = state === 'unchecked'
  const isDisabled = state === 'disabled'
  const isReadOnly = state === 'readonly'
  const isInvalid = state === 'invalid'

  return (
    <RadioGroup
      key={state}
      defaultValue={isUnchecked ? undefined : 'a'}
      disabled={isDisabled}
      readOnly={isReadOnly}
      aria-invalid={isInvalid}
      aria-label='Radio group'
      className='flex gap-3'
    >
      <RadioRoot value='a' aria-label='Option A' />
      <RadioRoot value='b' aria-label='Option B' />
    </RadioGroup>
  )
}

/* ---------------------------------------------------------------- Meter */

function MeterSpecimen() {
  return (
    <Meter value={60}>
      <MeterLabel>Disk usage</MeterLabel>
      <MeterTrack>
        <MeterIndicator className='w-60' />
      </MeterTrack>
      <span className='text-right text-sm text-foreground'>60%</span>
    </Meter>
  )
}

/* ------------------------------------------------------------- Progress */

function ProgressSpecimen({ state = 'determinate' }: { state?: string }) {
  const isIndeterminate = state === 'indeterminate'
  return (
    <Progress value={isIndeterminate ? null : 60} className='w-60'>
      <ProgressLabel>{isIndeterminate ? 'Connecting...' : 'Upload'}</ProgressLabel>
      <ProgressTrack>
        <ProgressIndicator />
      </ProgressTrack>
      {!isIndeterminate && <span className='text-right text-sm text-foreground'>60%</span>}
    </Progress>
  )
}

/* ----------------------------------------------------------- Accordion */

function AccordionSpecimen({ state = 'multiple expansion' }: { state?: string }) {
  const isSingle = state === 'single expansion'
  const isCompact = state === 'compact'
  const isDisabled = state === 'disabled'

  return (
    <div key={state} className='w-full max-w-sm'>
      <AccountFaqAccordion
        defaultOpen
        multiple={!isSingle}
        compact={isCompact}
        disabled={isDisabled}
      />
    </div>
  )
}

/* --------------------------------------------------------- Collapsible */

function CollapsibleSpecimen({ state = 'open' }: { state?: string }) {
  const isOpen = state === 'open'
  const isDisabled = state === 'disabled'

  return (
    <Collapsible key={state} defaultOpen={isOpen} disabled={isDisabled}>
      <CollapsibleTrigger disabled={isDisabled}>Show details</CollapsibleTrigger>
      <CollapsiblePanel>
        <p className='m-0 text-sm'>Here are the details you asked for.</p>
      </CollapsiblePanel>
    </Collapsible>
  )
}

/* ------------------------------------------------------------- Tooltip */

function TooltipSpecimen({ variant, size }: { variant?: string; size?: string }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          aria-label={isIconSize(size) ? 'Show tooltip' : undefined}
          render={
            <Button
              variant={variant as React.ComponentProps<typeof Button>['variant']}
              size={size as React.ComponentProps<typeof Button>['size']}
            >
              <ButtonSpecimenContent size={size} label='Hover me' />
            </Button>
          }
        />
        <TooltipPortal>
          <TooltipPositioner>
            <TooltipPopup>This is a tooltip.</TooltipPopup>
          </TooltipPositioner>
        </TooltipPortal>
      </Tooltip>
    </TooltipProvider>
  )
}

/* --------------------------------------------------------- Alert dialog */

function AlertDialogSpecimen({
  buttonVariant = 'outline',
  buttonSize = 'default'
}: {
  buttonVariant?: string
  buttonSize?: string
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger
        aria-label={isIconSize(buttonSize) ? 'Open alert dialog' : undefined}
        render={
          <Button
            variant={buttonVariant as React.ComponentProps<typeof Button>['variant']}
            size={buttonSize as React.ComponentProps<typeof Button>['size']}
          >
            <ButtonSpecimenContent size={buttonSize} label='Open alert dialog' />
          </Button>
        }
      />
      <AlertDialogPortal>
        <AlertDialogBackdrop />
        <AlertDialogViewport>
          <AlertDialogPopup>
            <AlertDialogTitle>Delete item?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
            <AlertDialogFooter>
              <AlertDialogClose
                variant={buttonVariant as React.ComponentProps<typeof AlertDialogClose>['variant']}
                size={buttonSize as React.ComponentProps<typeof AlertDialogClose>['size']}
                aria-label={isIconSize(buttonSize) ? 'Cancel' : undefined}
              >
                <ButtonSpecimenContent size={buttonSize} label='Cancel' close />
              </AlertDialogClose>
              <AlertDialogClose
                variant='destructive'
                size={buttonSize as React.ComponentProps<typeof AlertDialogClose>['size']}
                aria-label={isIconSize(buttonSize) ? 'Delete item' : undefined}
              >
                <ButtonSpecimenContent size={buttonSize} label='Delete' close />
              </AlertDialogClose>
            </AlertDialogFooter>
          </AlertDialogPopup>
        </AlertDialogViewport>
      </AlertDialogPortal>
    </AlertDialog>
  )
}

/* --------------------------------------------------------------- Dialog */

function DialogSpecimen({
  buttonVariant = 'outline',
  buttonSize = 'default'
}: {
  buttonVariant?: string
  buttonSize?: string
}) {
  return (
    <Dialog>
      <DialogTrigger
        aria-label={isIconSize(buttonSize) ? 'Open dialog' : undefined}
        render={
          <Button
            variant={buttonVariant as React.ComponentProps<typeof Button>['variant']}
            size={buttonSize as React.ComponentProps<typeof Button>['size']}
          >
            <ButtonSpecimenContent size={buttonSize} label='Open dialog' />
          </Button>
        }
      />
      <DialogPortal>
        <DialogBackdrop />
        <DialogViewport>
          <DialogPopup>
            <DialogTitle>Dialog title</DialogTitle>
            <DialogDescription>Dialog description goes here.</DialogDescription>
            <DialogFooter>
              <DialogClose
                variant={buttonVariant as React.ComponentProps<typeof DialogClose>['variant']}
                size={buttonSize as React.ComponentProps<typeof DialogClose>['size']}
                aria-label={isIconSize(buttonSize) ? 'Cancel' : undefined}
              >
                <ButtonSpecimenContent size={buttonSize} label='Cancel' close />
              </DialogClose>
              <DialogClose
                variant={buttonVariant as React.ComponentProps<typeof DialogClose>['variant']}
                size={buttonSize as React.ComponentProps<typeof DialogClose>['size']}
                aria-label={isIconSize(buttonSize) ? 'Save' : undefined}
              >
                <ButtonSpecimenContent size={buttonSize} label='Save' close />
              </DialogClose>
            </DialogFooter>
          </DialogPopup>
        </DialogViewport>
      </DialogPortal>
    </Dialog>
  )
}

/* ------------------------------------------------------------- Popover */

function PopoverSpecimen({ variant, size }: { variant?: string; size?: string }) {
  return (
    <Popover>
      <PopoverTrigger
        aria-label={isIconSize(size) ? 'Open popover' : undefined}
        render={
          <Button
            variant={variant as React.ComponentProps<typeof Button>['variant']}
            size={size as React.ComponentProps<typeof Button>['size']}
          >
            <ButtonSpecimenContent size={size} label='Open popover' />
          </Button>
        }
      />
      <PopoverPortal>
        <PopoverPositioner>
          <PopoverPopup>
            <PopoverTitle>Popover title</PopoverTitle>
            <PopoverDescription>Popover description goes here.</PopoverDescription>
          </PopoverPopup>
        </PopoverPositioner>
      </PopoverPortal>
    </Popover>
  )
}

/* --------------------------------------------------------- Preview card */

function PreviewCardSpecimen({ variant = 'link', size }: { variant?: string; size?: string }) {
  return (
    <PreviewCard>
      <PreviewCardTrigger
        aria-label={isIconSize(size) ? 'View preview' : undefined}
        render={
          <Button
            variant={variant as React.ComponentProps<typeof Button>['variant']}
            size={size as React.ComponentProps<typeof Button>['size']}
          >
            <ButtonSpecimenContent size={size} label='View preview' />
          </Button>
        }
      />
      <PreviewCardPortal>
        <PreviewCardPositioner>
          <PreviewCardPopup>
            <div className='flex flex-col gap-1 p-3'>
              <p className='m-0 text-sm font-medium'>Preview title</p>
              <p className='m-0 text-sm text-muted-foreground'>Preview description goes here.</p>
            </div>
          </PreviewCardPopup>
        </PreviewCardPositioner>
      </PreviewCardPortal>
    </PreviewCard>
  )
}

/* ------------------------------------------------------------- Menubar */

function MenubarSpecimen({ state = 'enabled' }: { state?: string }) {
  const disabled = state === 'disabled'
  return (
    <Menubar>
      <Menu>
        <MenuTrigger disabled={disabled}>File</MenuTrigger>
        <MenuPortal>
          <MenuPositioner side='bottom' align='start' sideOffset={4}>
            <MenuPopup>
              <MenuItem>New</MenuItem>
              <MenuItem>Open</MenuItem>
            </MenuPopup>
          </MenuPositioner>
        </MenuPortal>
      </Menu>
      <Menu>
        <MenuTrigger disabled={disabled}>Edit</MenuTrigger>
        <MenuPortal>
          <MenuPositioner side='bottom' align='start' sideOffset={4}>
            <MenuPopup>
              <MenuItem>Undo</MenuItem>
              <MenuItem>Redo</MenuItem>
            </MenuPopup>
          </MenuPositioner>
        </MenuPortal>
      </Menu>
    </Menubar>
  )
}

/* -------------------------------------------------------- Navigation menu */

function NavigationMenuSpecimen({ state = 'active' }: { state?: string }) {
  const isDisabled = state === 'disabled'
  const isPopupOpen = state === 'popup-open'
  const isInstant = state === 'instant'

  return (
    <NavigationMenu key={state} defaultValue={isPopupOpen || isInstant ? 'overview' : undefined} delay={isInstant ? 0 : undefined}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger value='overview'>Overview</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className='flex flex-col gap-1 p-2'>
              <NavigationMenuLink href='#projects'>Projects</NavigationMenuLink>
              <NavigationMenuLink href='#releases'>Releases</NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger value='account' disabled={isDisabled}>
            Account
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink href='#settings'>Settings</NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
      <NavigationMenuPortal>
        <NavigationMenuPositioner>
          <NavigationMenuPopup>
            <NavigationMenuViewport />
          </NavigationMenuPopup>
        </NavigationMenuPositioner>
      </NavigationMenuPortal>
    </NavigationMenu>
  )
}

/* ---------------------------------------------------------------- Calendar */

function CalendarSpecimen({ state = 'single selection' }: { state?: string }) {
  const isRange = state === 'range'
  const isDisabledDays = state === 'disabled days'
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  if (isRange) {
    return (
      <Calendar
        key={state}
        mode='range'
        selected={{ from: new Date(), to: new Date(Date.now() + 4 * 86400000) }}
        className='rounded-(--radius) border border-border shadow-xs'
      />
    )
  }

  return (
    <Calendar
      key={state}
      mode='single'
      selected={date}
      onSelect={setDate}
      disabled={isDisabledDays ? (d) => d.getDay() === 0 || d.getDay() === 6 : undefined}
      className='rounded-(--radius) border border-border shadow-xs'
    />
  )
}

/* ------------------------------------------------------------------- Chart */

const chartSpecimenConfig: ChartConfig = {
  planned: { label: 'Planned', color: 'var(--color-primary)' },
  completed: { label: 'Completed', color: 'var(--color-muted-foreground)' }
}

const chartSpecimenData = [
  { month: 'Jan', planned: 18, completed: 14 },
  { month: 'Feb', planned: 22, completed: 19 },
  { month: 'Mar', planned: 25, completed: 21 },
  { month: 'Apr', planned: 20, completed: 17 }
]

function ChartSpecimen({ state = 'categorical series' }: { state?: string }) {
  const isCategorical = state === 'categorical series'
  const isCustomTooltip = state === 'custom tooltip'
  const isLegend = state === 'legend'

  return (
    <ChartContainer key={state} config={chartSpecimenConfig} className='h-48 w-full max-w-sm'>
      <BarChart data={chartSpecimenData} accessibilityLayer>
        <CartesianGrid vertical={false} />
        <XAxis dataKey='month' tickLine={false} tickMargin={8} axisLine={false} />
        {isCustomTooltip ? (
          <ChartTooltip defaultIndex={1} content={<ChartTooltipContent hideLabel />} />
        ) : (
          <ChartTooltip content={<ChartTooltipContent />} />
        )}
        {(isLegend || isCategorical) && <ChartLegend content={<ChartLegendContent />} />}
        <Bar dataKey='planned' fill='var(--color-planned)' radius={2} />
        {isCategorical && <Bar dataKey='completed' fill='var(--color-completed)' radius={2} />}
      </BarChart>
    </ChartContainer>
  )
}

/* -------------------------------------------------------------- Code block */

function CodeBlockSpecimen({
  variant = 'default',
  size = 'default'
}: {
  variant?: 'default' | 'destructive'
  size?: 'default' | 'sm' | 'xs'
}) {
  const code = 'const ready = true\nconsole.log(ready)'
  return (
    <CodeBlock variant={variant} size={size} className='w-full max-w-sm'>
      <CodeBlockHeader>
        <CodeBlockTitle>index.ts</CodeBlockTitle>
        <CodeBlockActions>
          <CodeBlockCopyButton value={code} />
        </CodeBlockActions>
      </CodeBlockHeader>
      <CodeBlockContent>
        <CodeBlockLine>const ready = true</CodeBlockLine>
        <CodeBlockLine>console.log(ready)</CodeBlockLine>
      </CodeBlockContent>
    </CodeBlock>
  )
}

/* ----------------------------------------------------------------- Command */

function CommandSpecimen({ state = 'inline list' }: { state?: string }) {
  const isEmpty = state === 'empty state'
  const isDialog = state === 'dialog'

  const content = (
    <Command key={state} className='w-full max-w-sm rounded-(--radius) border border-border shadow-xs'>
      <CommandInput placeholder='Search actions...' defaultValue={isEmpty ? 'nonexistent-query' : ''} />
      <CommandList className='max-h-40'>
        <CommandEmpty>No results found.</CommandEmpty>
        {!isEmpty && (
          <>
            <CommandGroup heading='Workspace'>
              <CommandItem value='calendar'>Calendar</CommandItem>
              <CommandItem value='projects'>Projects</CommandItem>
            </CommandGroup>
            <CommandGroup heading='Settings'>
              <CommandItem value='theme'>Theme</CommandItem>
            </CommandGroup>
          </>
        )}
      </CommandList>
    </Command>
  )

  if (isDialog) {
    return (
      <div key={state} className='flex flex-col gap-2'>
        <span className='text-xs text-muted-foreground'>Command dialog overlay view:</span>
        {content}
      </div>
    )
  }

  return content
}

/* -------------------------------------------------------------- Data table */

type DataTableSample = {
  id: string
  name: string
  status: string
}

const dataTableSampleData: DataTableSample[] = [
  { id: '1', name: 'Alpha Flight', status: 'Active' },
  { id: '2', name: 'Beta Patrol', status: 'Standby' },
  { id: '3', name: 'Gamma Survey', status: 'Complete' }
]

const dataTableSampleColumns: DataTableColumnDef<DataTableSample>[] = [
  { accessorKey: 'id', header: 'ID' },
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'status', header: 'Status' }
]

function DataTableSpecimen({
  size = 'md',
  selection = 'none'
}: {
  size?: DataTableSize
  selection?: string
}) {
  const enableSelection = selection === 'single' || selection === 'multiple'
  const selectionMode = selection === 'single' ? 'single' : 'multiple'
  return (
    <div className='w-full max-w-lg'>
      <DataTable
        columns={dataTableSampleColumns}
        data={dataTableSampleData}
        size={size}
        enableRowSelection={enableSelection}
        selectionMode={selectionMode}
        pageSize={5}
      />
    </div>
  )
}

/* ------------------------------------------------------------- Date picker */

function DatePickerSpecimen({ mode = 'single' }: { mode?: string }) {
  if (mode === 'range') {
    return <DateRangePicker className='w-full max-w-xs' />
  }
  return <DatePicker className='w-full max-w-xs' />
}

/* ------------------------------------------------------------- Inline edit */

function InlineEditSpecimen({ state = 'viewing' }: { state?: string }) {
  const [value, setValue] = React.useState('Design is how it works')
  const isEditing = state === 'editing'
  const isSubmitting = state === 'submitting'
  const isDisabled = state === 'disabled' || isSubmitting

  return (
    <div key={state} className='w-full max-w-xs'>
      <InlineEdit
        value={isSubmitting ? 'Saving changes...' : value}
        onValueChange={setValue}
        defaultEditing={isEditing}
        disabled={isDisabled}
        label='Mission'
      >
        <InlineEditTrigger
          render={
            <Button
              variant='ghost'
              disabled={isDisabled}
              className={cn(
                'h-auto w-full justify-start px-2 py-1 text-left text-sm font-medium',
                isSubmitting && 'opacity-60'
              )}
            />
          }
        />
        <InlineEditInput autoFocus={isEditing} />
      </InlineEdit>
    </div>
  )
}

/* ------------------------------------------------------------- Page header */

function PageHeaderSpecimen({ state = 'with breadcrumbs' }: { state?: string }) {
  const hasBreadcrumbs = state === 'with breadcrumbs'
  const hasToolbar = state === 'with toolbar'
  const hasTabs = state === 'with tabs'

  return (
    <div className='w-full max-w-xl overflow-hidden rounded-(--radius) border border-border'>
      <PageHeader
        title='Mission Overview'
        breadcrumbs={
          hasBreadcrumbs ? (
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>Home</BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Missions</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          ) : undefined
        }
        toolbar={
          hasToolbar ? (
            <Button size='sm' variant='outline'>
              Edit
            </Button>
          ) : undefined
        }
      />
      {hasTabs && (
        <div className='flex gap-4 border-t border-border px-4 py-2 text-xs font-medium text-muted-foreground'>
          <span className='border-b-2 border-primary pb-1 text-foreground'>Overview</span>
          <span>Waypoints</span>
          <span>Telemetry</span>
        </div>
      )}
    </div>
  )
}

/* -------------------------------------------------------------- Pagination */

function PaginationSpecimen({
  linkSize = 'icon',
  linkVariant = 'ghost'
}: {
  linkSize?: 'default' | 'sm' | 'lg' | 'icon'
  linkVariant?: 'ghost' | 'outline'
}) {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href='#' size={linkSize} />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            href='#'
            isActive={linkVariant === 'outline'}
            size={linkSize}
            className={linkVariant === 'outline' ? buttonVariants({ variant: 'outline', size: linkSize }) : undefined}
          >
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            href='#'
            isActive={false}
            size={linkSize}
            className={linkVariant === 'outline' ? buttonVariants({ variant: 'outline', size: linkSize }) : undefined}
          >
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href='#' size={linkSize} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

/* ------------------------------------------------------ Progress indicator */

const progressSteps: ProgressIndicatorStep[] = [
  { label: 'Details', status: 'complete' },
  { label: 'Review', status: 'current' },
  { label: 'Launch', status: 'upcoming' }
]

function ProgressIndicatorSpecimen({
  orientation = 'horizontal',
  state
}: {
  orientation?: 'horizontal' | 'vertical'
  state?: ProgressStepStatus
}) {
  const steps: ProgressIndicatorStep[] = React.useMemo(() => {
    if (!state) return progressSteps
    if (state === 'error') {
      return [
        { label: 'Details', status: 'complete' },
        { label: 'Review', status: 'error', description: 'Action failed' },
        { label: 'Launch', status: 'upcoming' }
      ]
    }
    if (state === 'disabled') {
      return [
        { label: 'Details', status: 'complete' },
        { label: 'Review', status: 'current' },
        { label: 'Launch', status: 'disabled' }
      ]
    }
    if (state === 'complete') {
      return [
        { label: 'Details', status: 'complete' },
        { label: 'Review', status: 'complete' },
        { label: 'Launch', status: 'complete' }
      ]
    }
    if (state === 'upcoming') {
      return [
        { label: 'Details', status: 'upcoming' },
        { label: 'Review', status: 'upcoming' },
        { label: 'Launch', status: 'upcoming' }
      ]
    }
    return [
      { label: 'Details', status: 'complete' },
      { label: 'Review', status: 'current' },
      { label: 'Launch', status: 'upcoming' }
    ]
  }, [state])

  return (
    <div className={orientation === 'vertical' ? 'w-48' : 'w-full max-w-md'}>
      <ProgressStepIndicator steps={steps} orientation={orientation} />
    </div>
  )
}

/* --------------------------------------------------------------- Resizable */

function ResizableSpecimen({
  orientation = 'horizontal',
  withHandle = 'false'
}: {
  orientation?: string
  withHandle?: string
}) {
  const isHorizontal = orientation === 'horizontal'
  return (
    <div className='h-32 w-full max-w-sm rounded-(--radius) border border-border p-1'>
      <ResizablePanelGroup orientation={isHorizontal ? 'horizontal' : 'vertical'}>
        <ResizablePanel defaultSize={50} minSize={20} className='flex items-center justify-center p-2'>
          <span className='text-xs text-muted-foreground'>Panel One</span>
        </ResizablePanel>
        <ResizableHandle withHandle={withHandle === 'true'} />
        <ResizablePanel defaultSize={50} minSize={20} className='flex items-center justify-center p-2'>
          <span className='text-xs text-muted-foreground'>Panel Two</span>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}

/* ------------------------------------------------------------------ Search */

function SearchSpecimen({
  appearance = 'default',
  size = 'default'
}: {
  appearance?: 'default' | 'fluid'
  size?: ControlSize
}) {
  return (
    <div className='w-full max-w-xs'>
      <Search
        appearance={appearance}
        size={size}
        placeholder='Search missions...'
        defaultValue='Initial query'
      />
    </div>
  )
}

/* --------------------------------------------------------------- Registry */

type SpecimenRenderer = (value: string) => React.ReactNode
type ComponentSpecimens = Record<string, SpecimenRenderer | undefined> & {
  states?: (state?: string) => React.ReactNode
}

function SidebarSpecimen({
  side = 'left',
  variant = 'sidebar',
  collapsible = 'offcanvas',
  state
}: {
  side?: 'left' | 'right'
  variant?: 'sidebar' | 'floating' | 'inset'
  collapsible?: 'offcanvas' | 'icon' | 'none'
  state?: string
}) {
  const isCollapsed = state === 'collapsed'
  const isMobileDrawer = state === 'mobile drawer'
  const isFocusVisible = state === 'focus-visible'
  const isActiveMenuItem = state ? state === 'active menu item' : true
  const resolvedCollapsible = isCollapsed ? 'icon' : collapsible
  const defaultOpen = !isCollapsed

  if (isMobileDrawer) {
    return (
      <div className='relative h-64 w-80 overflow-hidden rounded-lg border border-border bg-background shadow-md'>
        <div className='flex h-9 items-center justify-between border-b border-border bg-muted/40 px-3'>
          <span className='text-xs font-medium text-foreground'>Mobile Viewport (18rem)</span>
          <span className='rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium text-primary'>Drawer Open</span>
        </div>
        <div className='relative flex h-[calc(100%-2.25rem)] w-full'>
          <div className='z-10 h-full w-56 border-r border-sidebar-border bg-sidebar p-2 text-sidebar-foreground shadow-2xl'>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>Workspace</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton isActive>Overview</SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton>Missions</SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </div>
          <div className='flex-1 bg-black/50 p-2'>
            <div className='rounded border border-dashed border-white/20 p-2 text-center text-[10px] text-white/60'>
              Backdrop overlay
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <SidebarProvider
      defaultOpen={defaultOpen}
      key={`${state}-${collapsible}`}
      className='relative h-56 min-h-0 w-full overflow-hidden border border-border'
    >
      <Sidebar
        side={side}
        variant={variant}
        collapsible={resolvedCollapsible}
        gapClassName='!h-full !min-h-0'
        containerClassName='!absolute !h-full'
      >
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Workspace</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive={isActiveMenuItem}
                    autoFocus={isFocusVisible}
                    data-focus-visible={isFocusVisible ? '' : undefined}
                    className={isFocusVisible ? 'ring-2 ring-sidebar-ring ring-offset-2 ring-offset-sidebar' : undefined}
                  >
                    Overview
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>Missions</SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset className='h-full min-h-0 min-w-0'>
        <header className='flex h-10 items-center gap-2 border-b border-border px-2'>
          <SidebarTrigger />
          <span className='text-sm'>Sidebar layout</span>
        </header>
      </SidebarInset>
    </SidebarProvider>
  )
}

const SPECIMENS: Record<string, ComponentSpecimens> = {
  button: {
    variant: (value) => <ButtonSpecimen variant={value} size='sm' />,
    size: (value) => <ButtonSpecimen size={value} />
  },
  toggle: {
    variant: (value) => <ToggleSpecimen variant={value} />,
    size: (value) => <ToggleSpecimen size={value} />
  },
  'toggle-group': {
    variant: (value) => <ToggleGroupSpecimen variant={value} />,
    size: (value) => <ToggleGroupSpecimen size={value} />,
    orientation: (value) => <ToggleGroupSpecimen orientation={value} />
  },
  toolbar: {
    'size (button)': (value) => <ToolbarSpecimen size={value} />,
    isActivated: (value) => <ToolbarSpecimen isActivated={value} />,
    orientation: (value) => <ToolbarSpecimen orientation={value} />
  },
  autocomplete: {
    'input context': (value) => <AutocompleteSpecimen context={value} />,
    'input size': (value) => <AutocompleteSpecimen inputSize={value} />,
    'input group size': (value) => <AutocompleteSpecimen context='group' groupSize={value} />
  },
  combobox: {
    'size (input group)': (value) => <ComboboxSpecimen size={value} />,
    'size (standalone trigger)': (value) => <ComboboxSpecimen standaloneTriggerSize={value} />,
    shape: (value) => <ComboboxSpecimen shape={value} />
  },
  input: {
    size: (value) => <InputSpecimen size={value as ControlSize} />,
    adornment: (value) => <InputSpecimen adornment={value} />,
    states: (state) => {
      if (state === 'filled') return <Input defaultValue='Active waypoint' className='w-48' />
      if (state === 'disabled') return <Input disabled placeholder='Disabled' className='w-48' />
      if (state === 'invalid') return <Input aria-invalid defaultValue='Invalid coordinate' className='w-48' />
      return <Input placeholder='Search or enter...' className='w-48' />
    }
  },
  calendar: {
    states: (state) => <CalendarSpecimen state={state} />
  },
  'date-picker': {
    mode: (value) => <DatePickerSpecimen mode={value} />,
    states: (state) => {
      if (state === 'disabled') return <DatePicker disabled className='w-full max-w-xs' />
      if (state === 'preset selection') return <DatePicker defaultValue={new Date()} className='w-full max-w-xs' />
      return <DatePicker className='w-full max-w-xs' />
    }
  },
  'inline-edit': {
    states: (state) => <InlineEditSpecimen state={state} />
  },
  search: {
    appearance: (value) => <SearchSpecimen appearance={value as 'default' | 'fluid'} />,
    size: (value) => <SearchSpecimen size={value as ControlSize} />,
    states: (state) => {
      if (state === 'filled with clear button') return <Search defaultValue='Flight path 12' className='w-60' />
      if (state === 'disabled') return <Search disabled placeholder='Search disabled' className='w-60' />
      return <Search placeholder='Search missions...' className='w-60' />
    }
  },
  'number-field': {
    size: (value) => <NumberFieldSpecimen size={value} />
  },
  'otp-field': {
    'separator orientation': (value) => <OtpFieldSpecimen orientation={value} />
  },
  select: {
    'size (trigger)': (value) => <SelectSpecimen size={value} />
  },
  slider: {
    orientation: (value) => <SliderSpecimen orientation={value} />,
    states: (state) => <SliderSpecimen state={state} />
  },
  switch: {
    size: (value) => <SwitchSpecimen size={value} />,
    states: (state) => <SwitchSpecimen state={state} />
  },
  drawer: {
    side: (value) => <DrawerSpecimen side={value} />,
    'trigger/close variant': (value) => <DrawerSpecimen buttonVariant={value} />,
    'trigger/close size': (value) => <DrawerSpecimen buttonSize={value} />
  },
  toast: {
    layout: (value) => <ToastSpecimen label={value} layout={value as 'stacked' | 'flat'} />,
    type: (value) => <ToastSpecimen label={value} type={value as ToastType} />,
    'close size': (value) => <ToastSpecimen label={value} closeSize={value as 'default' | 'sm' | 'icon'} />,
    'close variant': (value) => <ToastSpecimen label={value} closeVariant={value as 'outline' | 'ghost'} />,
    'action size': (value) => <ToastSpecimen label='Undo' actionSize={value as 'default' | 'sm' | 'icon'} />,
    'action variant': (value) => <ToastSpecimen label='Undo' actionVariant={value as 'outline' | 'ghost'} />
  },
  'context-menu': {
    'item variant': (value) => <ContextMenuSpecimen variant={value} />,
    'item inset': (value) => <ContextMenuSpecimen inset={value} />
  },
  menu: {
    'item variant': (value) => <MenuSpecimen variant={value} />,
    'item inset': (value) => <MenuSpecimen inset={value} />
  },
  badge: {
    status: (value) => <BadgeSpecimen status={value} />,
    size: (value) => <BadgeSpecimen size={value} />
  },
  separator: {
    orientation: (value) => <SeparatorSpecimen orientation={value} />
  },
  'scroll-area': {
    orientation: (value) => <ScrollAreaSpecimen orientation={value} />
  },
  sidebar: {
    side: (value) => <SidebarSpecimen side={value as 'left' | 'right'} />,
    variant: (value) => <SidebarSpecimen variant={value as 'sidebar' | 'floating' | 'inset'} />,
    collapsible: (value) => <SidebarSpecimen collapsible={value as 'offcanvas' | 'icon' | 'none'} />,
    states: (state) => <SidebarSpecimen state={state} />
  },
  tabs: {
    'default value': (value) => <TabsSpecimen defaultTab={value as 'none' | 'one' | 'two' | 'three'} />,
    'list variant': (value) => <TabsSpecimen listVariant={value as 'filled' | 'pill' | 'line'} />,
    'tab size': (value) => <TabsSpecimen tabSize={value as 'default'} />,
    'list width': (value) => <TabsSpecimen listWidth={value as 'full' | 'hug'} />,
    'indicator side': (value) => <TabsSpecimen indicatorSide={value as 'left' | 'right'} orientation='vertical' />,
    orientation: (value) => <TabsSpecimen orientation={value as 'horizontal' | 'vertical'} />,
    'disabled tab': (value) => <TabsSpecimen disabledTab={value as 'none' | 'one' | 'two' | 'three'} />,
    activation: (value) => <TabsSpecimen activation={value as 'manual' | 'automatic'} />,
    'focus loop': (value) => <TabsSpecimen focusLoop={value as 'loop' | 'stop'} />
  },
  avatar: {
    size: (value) => <AvatarSpecimen size={value as ControlSize} />,
    states: (state) => {
      if (state === 'fallback') {
        return (
          <Avatar>
            <AvatarFallback>SK</AvatarFallback>
          </Avatar>
        )
      }
      return (
        <Avatar>
          <AvatarImage
            src='https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=96&h=96&fit=crop&crop=faces'
            alt='Pilot'
          />
          <AvatarFallback>PL</AvatarFallback>
        </Avatar>
      )
    }
  },
  checkbox: {
    states: (state) => <CheckboxSpecimen state={state} />
  },
  'checkbox-group': {
    states: (state) => <CheckboxGroupSpecimen state={state} />
  },
  field: {
    states: (state) => <FieldSpecimen state={state} />
  },
  fieldset: {
    states: (state) => <FieldsetSpecimen state={state} />
  },
  form: {
    states: (state) => <FormSpecimen state={state} />
  },
  dropzone: {
    states: (state) => <DropzoneSpecimen state={state} />
  },
  attachment: {
    states: (state) => <AttachmentSpecimen state={state ?? 'done'} />
  },
  alert: {
    variant: (value) => <AlertSpecimen variant={value} />,
    states: (state) => {
      if (state === 'informative role') {
        return (
          <Alert role='status' variant='info' className='w-full max-w-xl'>
            <InfoIcon className='size-5 shrink-0' aria-hidden='true' />
            <div className='grid gap-1'>
              <AlertTitle>New flight plan tools (role=&quot;status&quot;)</AlertTitle>
              <AlertDescription>Drafts now support reusable routes and shared checkpoints.</AlertDescription>
            </div>
          </Alert>
        )
      }
      return (
        <Alert role='alert' variant='destructive' className='w-full max-w-xl'>
          <WarningCircleIcon className='size-5 shrink-0' aria-hidden='true' />
          <div className='grid gap-1'>
            <AlertTitle>Connection lost (role=&quot;alert&quot;)</AlertTitle>
            <AlertDescription>Telemetry stopped. Confirm the aircraft link before proceeding.</AlertDescription>
          </div>
        </Alert>
      )
    }
  },
  breadcrumb: {
    states: (state) => <BreadcrumbSpecimen state={state} />
  },
  radio: {
    states: (state) => <RadioSpecimen state={state} />
  },
  meter: {
    states: () => <MeterSpecimen />
  },
  progress: {
    states: (state) => <ProgressSpecimen state={state} />
  },
  accordion: {
    states: (state) => <AccordionSpecimen state={state} />
  },
  collapsible: {
    states: (state) => <CollapsibleSpecimen state={state} />
  },
  tooltip: {
    'trigger variant': (value) => <TooltipSpecimen variant={value} />,
    'trigger size': (value) => <TooltipSpecimen size={value} />,
    states: () => <TooltipSpecimen variant='outline' size='sm' />
  },
  'alert-dialog': {
    'trigger/close variant': (value) => <AlertDialogSpecimen buttonVariant={value} />,
    'trigger/close size': (value) => <AlertDialogSpecimen buttonSize={value} />,
    states: () => <AlertDialogSpecimen />
  },
  dialog: {
    'trigger/close variant': (value) => <DialogSpecimen buttonVariant={value} />,
    'trigger/close size': (value) => <DialogSpecimen buttonSize={value} />,
    states: () => <DialogSpecimen />
  },
  popover: {
    'trigger variant': (value) => <PopoverSpecimen variant={value} />,
    'trigger size': (value) => <PopoverSpecimen size={value} />,
    states: () => <PopoverSpecimen variant='outline' size='sm' />
  },
  'preview-card': {
    'trigger variant': (value) => <PreviewCardSpecimen variant={value} />,
    'trigger size': (value) => <PreviewCardSpecimen size={value} />,
    states: () => <PreviewCardSpecimen />
  },
  menubar: {
    states: (state) => <MenubarSpecimen state={state} />
  },
  'navigation-menu': {
    states: (state) => <NavigationMenuSpecimen state={state} />
  },
  command: {
    states: (state) => <CommandSpecimen state={state} />
  },
  pagination: {
    'link size': (value) => <PaginationSpecimen linkSize={value as 'default' | 'sm' | 'lg' | 'icon'} />,
    'link variant': (value) => <PaginationSpecimen linkVariant={value as 'ghost' | 'outline'} />,
    states: () => <PaginationSpecimen />
  },
  chart: {
    states: (state) => <ChartSpecimen state={state} />
  },
  'code-block': {
    variant: (value) => <CodeBlockSpecimen variant={value as 'default' | 'destructive'} />,
    size: (value) => <CodeBlockSpecimen size={value as 'default' | 'sm' | 'xs'} />,
    states: () => <CodeBlockSpecimen />
  },
  'data-table': {
    size: (value) => <DataTableSpecimen size={value as DataTableSize} />,
    selection: (value) => <DataTableSpecimen selection={value} />,
    states: () => <DataTableSpecimen />
  },
  'progress-indicator': {
    orientation: (value) => <ProgressIndicatorSpecimen orientation={value as 'horizontal' | 'vertical'} />,
    states: (state) => <ProgressIndicatorSpecimen state={state as ProgressStepStatus} />
  },
  'page-header': {
    states: (state) => <PageHeaderSpecimen state={state} />
  },
  resizable: {
    orientation: (value) => <ResizableSpecimen orientation={value} />,
    withHandle: (value) => <ResizableSpecimen withHandle={value} />,
    states: () => <ResizableSpecimen />
  }
}

type SpecimenSettings = Record<string, string>

function setting(settings: SpecimenSettings, name: string, fallback: string) {
  return settings[name] ?? fallback
}

/** Renders one specimen with all selected prop values applied together. */
export function renderConfiguredSpecimen(specId: string, settings: SpecimenSettings): React.ReactNode {
  switch (specId) {
    case 'button':
      return (
        <ButtonSpecimen variant={setting(settings, 'variant', 'default')} size={setting(settings, 'size', 'default')} />
      )
    case 'toggle':
      return (
        <ToggleSpecimen variant={setting(settings, 'variant', 'default')} size={setting(settings, 'size', 'default')} />
      )
    case 'toggle-group':
      return (
        <ToggleGroupSpecimen
          variant={setting(settings, 'variant', 'default')}
          size={setting(settings, 'size', 'default')}
          orientation={setting(settings, 'orientation', 'horizontal')}
        />
      )
    case 'toolbar':
      return (
        <ToolbarSpecimen
          size={setting(settings, 'size (button)', 'default')}
          isActivated={setting(settings, 'isActivated', 'false')}
          orientation={setting(settings, 'orientation', 'horizontal')}
        />
      )
    case 'autocomplete':
      return (
        <AutocompleteSpecimen
          context={setting(settings, 'input context', 'standalone')}
          inputSize={setting(settings, 'input size', 'default')}
          groupSize={setting(settings, 'input group size', 'default')}
        />
      )
    case 'combobox':
      return (
        <ConfiguredComboboxSpecimen
          size={setting(settings, 'size (input group)', 'default')}
          shape={setting(settings, 'shape', 'input')}
          standaloneTriggerSize={setting(settings, 'size (standalone trigger)', 'default')}
        />
      )
    case 'input':
      return (
        <InputSpecimen
          adornment={setting(settings, 'adornment', 'none')}
          size={setting(settings, 'size', 'default') as ControlSize}
        />
      )
    case 'calendar':
      return <CalendarSpecimen />
    case 'date-picker':
      return <DatePickerSpecimen mode={setting(settings, 'mode', 'single')} />
    case 'inline-edit':
      return <InlineEditSpecimen />
    case 'search':
      return (
        <SearchSpecimen
          appearance={setting(settings, 'appearance', 'default') as 'default' | 'fluid'}
          size={setting(settings, 'size', 'default') as ControlSize}
        />
      )
    case 'number-field':
      return <NumberFieldSpecimen size={setting(settings, 'size', 'default')} />
    case 'otp-field':
      return <OtpFieldSpecimen orientation={setting(settings, 'separator orientation', 'horizontal')} />
    case 'select':
      return <SelectSpecimen size={setting(settings, 'size (trigger)', 'default')} />
    case 'slider':
      return <SliderSpecimen orientation={setting(settings, 'orientation', 'horizontal')} />
    case 'switch':
      return <SwitchSpecimen size={setting(settings, 'size', 'default')} />
    case 'alert':
      return <AlertSpecimen variant={setting(settings, 'variant', 'default')} />
    case 'attachment':
      return (
        <AttachmentSpecimen
          state={setting(settings, 'state', 'done')}
          size={setting(settings, 'size', 'default')}
          orientation={setting(settings, 'orientation', 'horizontal')}
          media={setting(settings, 'media variant', 'icon')}
        />
      )
    case 'avatar':
      return <AvatarSpecimen size={setting(settings, 'size', 'default') as ControlSize} />
    case 'chart':
      return <ChartSpecimen />
    case 'code-block':
      return (
        <CodeBlockSpecimen
          variant={setting(settings, 'variant', 'default') as 'default' | 'destructive'}
          size={setting(settings, 'size', 'default') as 'default' | 'sm' | 'xs'}
        />
      )
    case 'data-table':
      return (
        <DataTableSpecimen
          size={setting(settings, 'size', 'md') as DataTableSize}
          selection={setting(settings, 'selection', 'none')}
        />
      )
    case 'progress-indicator':
      return (
        <ProgressIndicatorSpecimen
          orientation={setting(settings, 'orientation', 'horizontal') as 'horizontal' | 'vertical'}
        />
      )
    case 'command':
      return <CommandSpecimen />
    case 'pagination':
      return (
        <PaginationSpecimen
          linkSize={setting(settings, 'link size', 'icon') as 'default' | 'sm' | 'lg' | 'icon'}
          linkVariant={setting(settings, 'link variant', 'ghost') as 'ghost' | 'outline'}
        />
      )
    case 'page-header':
      return <PageHeaderSpecimen />
    case 'resizable':
      return (
        <ResizableSpecimen
          orientation={setting(settings, 'orientation', 'horizontal')}
          withHandle={setting(settings, 'withHandle', 'false')}
        />
      )
    case 'alert-dialog':
      return (
        <AlertDialogSpecimen
          buttonVariant={setting(settings, 'trigger/close variant', 'outline')}
          buttonSize={setting(settings, 'trigger/close size', 'default')}
        />
      )
    case 'dialog':
      return (
        <DialogSpecimen
          buttonVariant={setting(settings, 'trigger/close variant', 'outline')}
          buttonSize={setting(settings, 'trigger/close size', 'default')}
        />
      )
    case 'drawer':
      return (
        <DrawerSpecimen
          side={setting(settings, 'side', 'bottom')}
          buttonVariant={setting(settings, 'trigger/close variant', 'outline')}
          buttonSize={setting(settings, 'trigger/close size', 'default')}
        />
      )
    case 'popover':
      return (
        <PopoverSpecimen
          variant={setting(settings, 'trigger variant', 'default')}
          size={setting(settings, 'trigger size', 'default')}
        />
      )
    case 'preview-card':
      return (
        <PreviewCardSpecimen
          variant={setting(settings, 'trigger variant', 'link')}
          size={setting(settings, 'trigger size', 'default')}
        />
      )
    case 'toast':
      return (
        <ToastSpecimen
          label={setting(settings, 'type', 'success')}
          layout={setting(settings, 'layout', 'stacked') as 'stacked' | 'flat'}
          type={setting(settings, 'type', 'success') as ToastType}
          closeSize={setting(settings, 'close size', 'default') as 'default' | 'sm' | 'icon'}
          closeVariant={setting(settings, 'close variant', 'outline') as 'outline' | 'ghost'}
          actionSize={setting(settings, 'action size', 'default') as 'default' | 'sm' | 'icon'}
          actionVariant={setting(settings, 'action variant', 'outline') as 'outline' | 'ghost'}
        />
      )
    case 'tooltip':
      return (
        <TooltipSpecimen
          variant={setting(settings, 'trigger variant', 'default')}
          size={setting(settings, 'trigger size', 'default')}
        />
      )
    case 'context-menu':
      return (
        <ContextMenuSpecimen
          variant={setting(settings, 'item variant', 'default')}
          inset={setting(settings, 'item inset', 'false')}
        />
      )
    case 'menu':
      return (
        <MenuSpecimen
          variant={setting(settings, 'item variant', 'default')}
          inset={setting(settings, 'item inset', 'false')}
        />
      )
    case 'badge':
      return (
        <BadgeSpecimen status={setting(settings, 'status', 'default')} size={setting(settings, 'size', 'default')} />
      )
    case 'separator':
      return <SeparatorSpecimen orientation={setting(settings, 'orientation', 'horizontal')} />
    case 'accordion':
      return <AccordionSpecimen />
    case 'scroll-area':
      return <ScrollAreaSpecimen orientation={setting(settings, 'orientation', 'vertical')} />
    case 'tabs':
      return (
        <TabsSpecimen
          defaultTab={setting(settings, 'default value', 'one') as 'none' | 'one' | 'two' | 'three'}
          listVariant={setting(settings, 'list variant', 'line') as 'filled' | 'pill' | 'line'}
          listWidth={setting(settings, 'list width', 'hug') as 'full' | 'hug'}
          tabSize={setting(settings, 'tab size', 'default') as 'default' | 'xs' | 'sm' | 'lg'}
          indicatorSide={setting(settings, 'indicator side', 'left') as 'left' | 'right'}
          orientation={setting(settings, 'orientation', 'horizontal') as 'horizontal' | 'vertical'}
          disabledTab={setting(settings, 'disabled tab', 'none') as 'none' | 'one' | 'two' | 'three'}
          activation={setting(settings, 'activation', 'manual') as 'manual' | 'automatic'}
          focusLoop={setting(settings, 'focus loop', 'loop') as 'loop' | 'stop'}
        />
      )
    case 'sidebar':
      return (
        <SidebarSpecimen
          side={setting(settings, 'side', 'left') as 'left' | 'right'}
          variant={setting(settings, 'variant', 'sidebar') as 'sidebar' | 'floating' | 'inset'}
          collapsible={setting(settings, 'collapsible', 'offcanvas') as 'offcanvas' | 'icon' | 'none'}
        />
      )
    default:
      return SPECIMENS[specId]?.states?.()
  }
}

/** Returns the live specimen for one axis value, or undefined when none exists. */
export function renderSpecimen(specId: string, axisName: string, value: string): React.ReactNode | undefined {
  return SPECIMENS[specId]?.[axisName]?.(value)
}

/** Returns the live specimen for a state-only component (no axes). */
export function renderStateSpecimen(specId: string, state?: string): React.ReactNode | undefined {
  return SPECIMENS[specId]?.states?.(state)
}
