import * as React from 'react'
import { ArrowUUpLeftIcon, MagnifyingGlassIcon, PlusIcon, XIcon } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
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
  BreadcrumbItem,
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

function AlertSpecimen({ variant = 'default' }: { variant?: string }) {
  return (
    <Alert variant={variant as React.ComponentProps<typeof Alert>['variant']} className='max-w-sm'>
      <AlertTitle>Flight plan updated</AlertTitle>
      <AlertDescription>Changes are saved and ready to sync.</AlertDescription>
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

function BreadcrumbSpecimen() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>Projects</BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>Mission Alpha</BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Plan</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}

/* ------------------------------------------------------------------ Toggle */

function ToggleSpecimen({ variant, size }: { variant?: string; size?: string }) {
  return (
    <Toggle
      variant={variant as React.ComponentProps<typeof Toggle>['variant']}
      size={size as React.ComponentProps<typeof Toggle>['size']}
      defaultPressed
      aria-label={`toggle ${variant ?? size ?? ''}`}
    >
      Bold
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
        <span className='w-28 text-[11px] text-muted-foreground'>Input group</span>
        <ComboboxSpecimen size={size} shape={shape} />
      </div>
      <div className='flex flex-wrap items-center gap-2'>
        <span className='w-28 text-[11px] text-muted-foreground'>Standalone trigger</span>
        <ComboboxSpecimen standaloneTriggerSize={standaloneTriggerSize} />
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------- Input */

function InputSpecimen({ adornment }: { adornment: string }) {
  const start = adornment === 'start' || adornment === 'both'
  const end = adornment === 'end' || adornment === 'both'
  return (
    <Input
      className='w-40'
      placeholder='Value'
      aria-label={`input ${adornment}`}
      startAdornment={start ? <MagnifyingGlassIcon aria-hidden /> : undefined}
      endAdornment={end ? <span className='text-xs'>kg</span> : undefined}
    />
  )
}

/* ------------------------------------------------------------ Number field */

function NumberFieldSpecimen({ size }: { size: string }) {
  const dense = size !== 'default'
  return (
    <NumberField defaultValue={100}>
      <NumberFieldGroup className={dense ? 'h-6' : undefined}>
        {dense ? null : <NumberFieldDecrement aria-label='Decrease' />}
        <NumberFieldInput size={size as React.ComponentProps<typeof NumberFieldInput>['size']} aria-label='Amount' />
        {dense ? null : <NumberFieldIncrement aria-label='Increase' />}
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

function SliderSpecimen({ orientation }: { orientation: string }) {
  return (
    <Slider
      orientation={orientation as React.ComponentProps<typeof Slider>['orientation']}
      defaultValue={40}
      className={orientation === 'vertical' ? 'h-28 w-8' : 'w-40'}
    >
      <SliderControl>
        <SliderTrack>
          <SliderIndicator />
          <SliderThumb aria-label={`slider ${orientation}`} />
        </SliderTrack>
      </SliderControl>
    </Slider>
  )
}

/* ------------------------------------------------------------------ Switch */

function SwitchSpecimen({ size }: { size: string }) {
  return (
    <Switch size={size as React.ComponentProps<typeof Switch>['size']} defaultChecked aria-label={`switch ${size}`}>
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
        <div className='flex h-16 w-32 items-center justify-center border border-dashed border-border text-[11px] text-muted-foreground select-none'>
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

function AvatarSpecimen() {
  return (
    <div className='flex items-center gap-3'>
      <Avatar>
        <AvatarImage
          src='https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=96&h=96&dpr=2&q=80'
          width='48'
          height='48'
          alt=''
        />
        <AvatarFallback>LT</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>SK</AvatarFallback>
      </Avatar>
    </div>
  )
}

/* ---------------------------------------------------------- Checkbox */

function CheckboxSpecimen() {
  return (
    <div className='flex flex-col gap-2'>
      <CheckboxRoot defaultChecked aria-label='Checked checkbox' />
      <CheckboxRoot aria-label='Unchecked checkbox' />
      <CheckboxRoot indeterminate aria-label='Indeterminate checkbox' />
    </div>
  )
}

function CheckboxGroupSpecimen() {
  return (
    <CheckboxGroup defaultValue={['a']} aria-label='Checkbox group'>
      <CheckboxRoot value='a' aria-label='Option A' />
      <CheckboxRoot value='b' aria-label='Option B' />
    </CheckboxGroup>
  )
}

/* ----------------------------------------------------------- Field */

function FieldSpecimen() {
  return (
    <FieldRoot>
      <FieldLabel>Email address</FieldLabel>
      <FieldControl placeholder='name@example.com' aria-label='Email input' />
      <FieldDescription>We never share your email.</FieldDescription>
    </FieldRoot>
  )
}

/* ---------------------------------------------------------- Fieldset */

function FieldsetSpecimen() {
  return (
    <FieldsetRoot>
      <FieldsetLegend>Delivery details</FieldsetLegend>
      <FieldRoot>
        <FieldLabel>Address</FieldLabel>
        <FieldControl placeholder='12 Computing Way' aria-label='Address input' />
      </FieldRoot>
    </FieldsetRoot>
  )
}

/* ---------------------------------------------------------------- Form */

function FormSpecimen() {
  return (
    <Form>
      <FieldRoot>
        <FieldLabel>Username</FieldLabel>
        <FieldControl placeholder='jdoe' aria-label='Username input' />
      </FieldRoot>
    </Form>
  )
}

/* --------------------------------------------------------------- Radio */

function RadioSpecimen() {
  return (
    <RadioGroup defaultValue='a' aria-label='Radio group'>
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

function ProgressSpecimen() {
  return (
    <Progress value={60}>
      <ProgressLabel>Upload</ProgressLabel>
      <ProgressTrack>
        <ProgressIndicator className='w-60' />
      </ProgressTrack>
      <span className='text-right text-sm text-foreground'>60%</span>
    </Progress>
  )
}

/* ----------------------------------------------------------- Accordion */

function AccordionSpecimen({ variant = 'default' }: { variant?: 'default' | 'compact' }) {
  return <AccountFaqAccordion compact={variant === 'compact'} defaultOpen multiple />
}

/* --------------------------------------------------------- Collapsible */

function CollapsibleSpecimen() {
  return (
    <Collapsible defaultOpen>
      <CollapsibleTrigger>Show details</CollapsibleTrigger>
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

function MenubarSpecimen() {
  return (
    <Menubar>
      <Menu>
        <MenuTrigger>File</MenuTrigger>
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
        <MenuTrigger>Edit</MenuTrigger>
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

function NavigationMenuSpecimen() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger value='overview'>Overview</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className='flex flex-col gap-1'>
              <NavigationMenuLink href='#projects'>Projects</NavigationMenuLink>
              <NavigationMenuLink href='#releases'>Releases</NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger value='account'>Account</NavigationMenuTrigger>
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

/* --------------------------------------------------------------- Registry */

type SpecimenRenderer = (value: string) => React.ReactNode
type ComponentSpecimens = Record<string, SpecimenRenderer | undefined> & {
  states?: () => React.ReactNode
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
    adornment: (value) => <InputSpecimen adornment={value} />
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
    orientation: (value) => <SliderSpecimen orientation={value} />
  },
  switch: {
    size: (value) => <SwitchSpecimen size={value} />
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
    states: () => <AvatarSpecimen />
  },
  checkbox: {
    states: () => <CheckboxSpecimen />
  },
  'checkbox-group': {
    states: () => <CheckboxGroupSpecimen />
  },
  field: {
    states: () => <FieldSpecimen />
  },
  fieldset: {
    states: () => <FieldsetSpecimen />
  },
  form: {
    states: () => <FormSpecimen />
  },
  dropzone: {
    states: () => <Dropzone className='w-full max-w-sm' />
  },
  attachment: {
    states: () => <AttachmentSpecimen />
  },
  alert: {
    states: () => <AlertSpecimen />
  },
  breadcrumb: {
    states: () => <BreadcrumbSpecimen />
  },
  radio: {
    states: () => <RadioSpecimen />
  },
  meter: {
    states: () => <MeterSpecimen />
  },
  progress: {
    states: () => <ProgressSpecimen />
  },
  accordion: {
    'trigger variant': (value) => <AccordionSpecimen variant={value as 'default' | 'compact'} />,
    states: () => <AccordionSpecimen />
  },
  collapsible: {
    states: () => <CollapsibleSpecimen />
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
    states: () => <MenubarSpecimen />
  },
  'navigation-menu': {
    states: () => <NavigationMenuSpecimen />
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
      return <InputSpecimen adornment={setting(settings, 'adornment', 'none')} />
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
      return <AccordionSpecimen variant={setting(settings, 'trigger variant', 'default') as 'default' | 'compact'} />
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
    default:
      return SPECIMENS[specId]?.states?.()
  }
}

/** Returns the live specimen for one axis value, or undefined when none exists. */
export function renderSpecimen(specId: string, axisName: string, value: string): React.ReactNode | undefined {
  return SPECIMENS[specId]?.[axisName]?.(value)
}

/** Returns the live specimen for a state-only component (no axes). */
export function renderStateSpecimen(specId: string): React.ReactNode | undefined {
  return SPECIMENS[specId]?.states?.()
}
