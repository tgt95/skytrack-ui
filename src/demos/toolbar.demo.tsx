import * as React from 'react'
import {
  TextAlignLeftIcon,
  TextAlignRightIcon,
  TextBIcon,
  TextItalicIcon,
  CursorIcon,
  PathIcon,
  ArrowUUpLeftIcon,
  ArrowUUpRightIcon,
  TrashIcon,
  BoundingBoxIcon
} from '@phosphor-icons/react'
import { Toolbar, ToolbarButton, ToolbarInput, ToolbarLink, ToolbarSeparator } from '@/components/ui/toolbar'
import { ToggleGroup } from '@/components/ui/toggle-group'
import { Toggle } from '@/components/ui/toggle'
import { Menu, MenuItem, MenuPopup, MenuPortal, MenuPositioner, MenuSeparator, MenuTrigger } from '@/components/ui/menu'
import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput
} from '@/components/ui/number-field'
import {
  Tooltip,
  TooltipArrow,
  TooltipPopup,
  TooltipPortal,
  TooltipPositioner,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import type { DemoMeta } from '@/showcase/demo'

/* ------------------------------------------------------------- Default */

/** Controlled toolbar so the demo reflects live toolbar state. */
function DefaultToolbar() {
  const [alignment, setAlignment] = React.useState(['align-left'])
  const [format, setFormat] = React.useState(['bold'])

  return (
    <Toolbar className='w-full max-w-2xl'>
      <ToggleGroup value={alignment} onValueChange={setAlignment} aria-label='Alignment' className='border-0 p-0'>
        <ToolbarButton render={<Toggle />} value='align-left' aria-label='Align left'>
          <TextAlignLeftIcon />
        </ToolbarButton>
        <ToolbarButton render={<Toggle />} value='align-right' aria-label='Align right'>
          <TextAlignRightIcon />
        </ToolbarButton>
      </ToggleGroup>

      <ToolbarSeparator />

      <ToggleGroup
        value={format}
        onValueChange={setFormat}
        variant='outline'
        aria-label='Formatting'
        className='border-0 p-'
      >
        <ToolbarButton
          render={<Toggle />}
          value='bold'
          aria-label='Bold'
          className='border-0 text-base font-semibold data-[pressed]:bg-accent data-[pressed]:text-accent-foreground'
        >
          B
        </ToolbarButton>
        <ToolbarButton
          render={<Toggle />}
          value='italic'
          aria-label='Italic'
          className='border-0 text-base italic data-[pressed]:bg-accent data-[pressed]:text-accent-foreground'
        >
          I
        </ToolbarButton>
      </ToggleGroup>

      <ToolbarSeparator />

      <Menu>
        <ToolbarButton render={<MenuTrigger />} className='min-w-32 justify-between border border-input'>
          Helvetica
        </ToolbarButton>
        <MenuPortal>
          <MenuPositioner side='bottom' align='start' sideOffset={4}>
            <MenuPopup>
              <MenuItem>Helvetica</MenuItem>
              <MenuItem>Arial</MenuItem>
              <MenuSeparator />
              <MenuItem disabled>Inter</MenuItem>
            </MenuPopup>
          </MenuPositioner>
        </MenuPortal>
      </Menu>

      <ToolbarSeparator />

      {/* Guideline: in a horizontal toolbar use one input, placed last. */}
      <ToolbarInput placeholder='Search flights' aria-label='Search flights' />

      <ToolbarLink href='#toolbar-edited'>Edited 51m ago</ToolbarLink>
    </Toolbar>
  )
}

/* ------------------------------------------------------ Using with Menu */

function ToolbarWithMenu() {
  return (
    <Toolbar>
      <Menu>
        <ToolbarButton render={<MenuTrigger />}>File</ToolbarButton>
        <MenuPortal>
          <MenuPositioner side='bottom' align='start' sideOffset={4}>
            <MenuPopup>
              <MenuItem>New</MenuItem>
              <MenuItem>Open…</MenuItem>
              <MenuSeparator />
              <MenuItem variant='destructive'>Delete</MenuItem>
            </MenuPopup>
          </MenuPositioner>
        </MenuPortal>
      </Menu>

      <ToolbarSeparator />

      <Menu>
        <ToolbarButton render={<MenuTrigger />}>Edit</ToolbarButton>
        <MenuPortal>
          <MenuPositioner side='bottom' align='start' sideOffset={4}>
            <MenuPopup>
              <MenuItem>Undo</MenuItem>
              <MenuItem>Redo</MenuItem>
            </MenuPopup>
          </MenuPositioner>
        </MenuPortal>
      </Menu>

      <ToolbarButton disabled>Print</ToolbarButton>
    </Toolbar>
  )
}

/* --------------------------------------------------- Using with Tooltip */

/** Docs: the toolbar item is passed to the render prop of `Tooltip.Trigger`. */
function ToolbarWithTooltip() {
  return (
    <TooltipProvider>
      <Toolbar>
        <Tooltip>
          <TooltipTrigger render={<ToolbarButton />} aria-label='Align left'>
            <TextAlignLeftIcon />
          </TooltipTrigger>
          <TooltipPortal>
            <TooltipPositioner sideOffset={8}>
              <TooltipPopup>
                Align left
                <TooltipArrow />
              </TooltipPopup>
            </TooltipPositioner>
          </TooltipPortal>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger render={<ToolbarButton />} aria-label='Bold'>
            <TextBIcon />
          </TooltipTrigger>
          <TooltipPortal>
            <TooltipPositioner sideOffset={8}>
              <TooltipPopup>
                Bold
                <TooltipArrow />
              </TooltipPopup>
            </TooltipPositioner>
          </TooltipPortal>
        </Tooltip>

        <ToolbarSeparator />

        <Tooltip>
          <TooltipTrigger render={<ToolbarButton />} aria-label='Italic'>
            <TextItalicIcon />
          </TooltipTrigger>
          <TooltipPortal>
            <TooltipPositioner sideOffset={8}>
              <TooltipPopup>
                Italic
                <TooltipArrow />
              </TooltipPopup>
            </TooltipPositioner>
          </TooltipPortal>
        </Tooltip>
      </Toolbar>
    </TooltipProvider>
  )
}

/* ------------------------------------------------ Using with NumberField */

/** Docs: pass `NumberField.Input` to `Toolbar.Input` with the render prop. */
function ToolbarWithNumberField() {
  return (
    <Toolbar>
      <NumberField defaultValue={100} min={0} max={1000}>
        <NumberFieldGroup className='h-8' aria-label='Zoom'>
          <NumberFieldDecrement />
          <ToolbarInput
            render={<NumberFieldInput />}
            aria-label='Zoom level'
            /* `flex-none` overrides the input's default `flex-1` so the field keeps a width. */
            className='w-14 flex-none px-2 text-center'
          />
          <NumberFieldIncrement />
        </NumberFieldGroup>
      </NumberField>

      <ToolbarSeparator />

      <ToolbarButton>Apply</ToolbarButton>
    </Toolbar>
  )
}

/* ------------------------------------------------------------- Vertical */

function VerticalToolbar() {
  return (
    // <Toolbar orientation="vertical" aria-label="Formatting">
    //   <ToolbarButton aria-label="Align left">
    //     <TextAlignLeftIcon />
    //   </ToolbarButton>
    //   <ToolbarButton aria-label="Align right">
    //     <TextAlignRightIcon />
    //   </ToolbarButton>
    //   <ToolbarSeparator />
    //   <ToolbarButton aria-label="Bold">
    //     <TextBIcon />
    //   </ToolbarButton>
    //   <ToolbarButton aria-label="Italic">
    //     <TextItalicIcon />
    //   </ToolbarButton>
    // </Toolbar>
    <Toolbar orientation='vertical'>
      <ToggleGroup orientation='vertical' className='border-0' defaultValue={['Cursor']}>
        {[
          { id: 1, name: 'Cursor', icon: CursorIcon },
          { id: 2, name: 'Waypoint', icon: PathIcon },
          { id: 3, name: 'Area', icon: BoundingBoxIcon }
        ].map((item) => (
          <TooltipProvider key={item.id}>
            <Tooltip>
              <TooltipTrigger
                render={<ToolbarButton size='icon' value={item.name} render={<Toggle variant='brand' />} />}
                aria-label={item.name}
              >
                <item.icon />
              </TooltipTrigger>
              <TooltipPortal>
                <TooltipPositioner sideOffset={11} side='right' align='center'>
                  <TooltipPopup>
                    <TooltipArrow />
                    {item.name}
                  </TooltipPopup>
                </TooltipPositioner>
              </TooltipPortal>
            </Tooltip>
          </TooltipProvider>
        ))}
      </ToggleGroup>

      <ToolbarSeparator />
      {[
        { id: 1, name: 'Undo', icon: ArrowUUpLeftIcon },
        { id: 2, name: 'Redo', icon: ArrowUUpRightIcon }
      ].map((item) => (
        <TooltipProvider key={item.id}>
          <Tooltip>
            <TooltipTrigger render={<ToolbarButton size='icon' />} aria-label={item.name}>
              <item.icon />
            </TooltipTrigger>
            <TooltipPortal>
              <TooltipPositioner sideOffset={11} side='right' align='center'>
                <TooltipPopup>
                  <TooltipArrow />
                  {item.name}
                </TooltipPopup>
              </TooltipPositioner>
            </TooltipPortal>
          </Tooltip>
        </TooltipProvider>
      ))}

      <ToolbarSeparator />
      {[{ id: 1, name: 'Delete', icon: TrashIcon }].map((item) => (
        <TooltipProvider key={item.id}>
          <Tooltip>
            <TooltipTrigger render={<ToolbarButton size='icon' />} aria-label={item.name}>
              <item.icon />
            </TooltipTrigger>
            <TooltipPortal>
              <TooltipPositioner sideOffset={11} side='right' align='center'>
                <TooltipPopup>
                  <TooltipArrow />
                  {item.name}
                </TooltipPopup>
              </TooltipPositioner>
            </TooltipPortal>
          </Tooltip>
        </TooltipProvider>
      ))}
    </Toolbar>
  )
}

export const demo: DemoMeta = {
  id: 'toolbar',
  title: 'Toolbar',
  description: 'A high-quality, unstyled React toolbar component that groups a set of buttons and controls.',
  group: 'Actions',
  variants: [
    { name: 'Default', render: () => <DefaultToolbar /> },
    { name: 'Using with Menu', render: () => <ToolbarWithMenu /> },
    { name: 'Using with Tooltip', render: () => <ToolbarWithTooltip /> },
    { name: 'Using with NumberField', render: () => <ToolbarWithNumberField /> },
    { name: 'Vertical', render: () => <VerticalToolbar /> }
  ]
}
