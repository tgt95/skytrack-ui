import * as React from 'react'
import { InfoIcon, WarningCircleIcon } from '@phosphor-icons/react'
import type { ControlSize } from '@/lib/control-sizes'
import { type DataTableSize } from '@/components/ui/data-table'
import { DatePicker } from '@/components/ui/date-picker'
import { type ProgressStepStatus } from '@/components/ui/progress-indicator'
import { Search } from '@/components/ui/search'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { ButtonSpecimen, ToggleGroupSpecimen, ToggleSpecimen, ToolbarSpecimen } from './actions'
import {
  AttachmentSpecimen,
  AvatarSpecimen,
  BadgeSpecimen,
  CalendarSpecimen,
  ChartSpecimen,
  CodeBlockSpecimen,
  DataTableSpecimen,
  DatePickerSpecimen,
  ResizableSpecimen,
  ScrollAreaSpecimen,
  SeparatorSpecimen
} from './display'
import {
  AlertDialogSpecimen,
  AlertSpecimen,
  DialogSpecimen,
  DrawerSpecimen,
  MeterSpecimen,
  PopoverSpecimen,
  PreviewCardSpecimen,
  ProgressIndicatorSpecimen,
  ProgressSpecimen,
  ToastSpecimen,
  ToastType,
  TooltipSpecimen
} from './feedback'
import {
  AutocompleteSpecimen,
  CheckboxGroupSpecimen,
  CheckboxSpecimen,
  ComboboxSpecimen,
  ConfiguredComboboxSpecimen,
  DropzoneSpecimen,
  FieldSpecimen,
  FieldsetSpecimen,
  FormSpecimen,
  InputSpecimen,
  NumberFieldSpecimen,
  OtpFieldSpecimen,
  RadioSpecimen,
  SelectSpecimen,
  SliderSpecimen,
  SwitchSpecimen
} from './forms'
import { SidebarSpecimen } from './layout'
import { CommandSpecimen, ContextMenuSpecimen, MenuSpecimen, MenubarSpecimen, NavigationMenuSpecimen } from './menus'
import {
  AccordionSpecimen,
  BreadcrumbSpecimen,
  CollapsibleSpecimen,
  InlineEditSpecimen,
  PageHeaderSpecimen,
  PaginationSpecimen,
  SearchSpecimen,
  TabsSpecimen
} from './navigation'

/* --------------------------------------------------------------- Registry */

export type SpecimenRenderer = (value: string) => React.ReactNode

export type ComponentSpecimens = Record<string, SpecimenRenderer | undefined> & {
  states?: (state?: string) => React.ReactNode
}

export const SPECIMENS: Record<string, ComponentSpecimens> = {
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
    alignment: (value) => <ProgressIndicatorSpecimen alignment={value as 'start' | 'center'} />,
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

export type SpecimenSettings = Record<string, string>

export function setting(settings: SpecimenSettings, name: string, fallback: string) {
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
          alignment={setting(settings, 'alignment', 'start') as 'start' | 'center'}
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
