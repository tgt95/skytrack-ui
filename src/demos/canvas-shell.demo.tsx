import { useState } from 'react'
import {
  GraphIcon,
  CursorIcon,
  PlusIcon,
  LightningIcon,
  FunnelIcon,
  PaperPlaneRightIcon,
  HandPalmIcon,
  ShareNetworkIcon,
  ExportIcon,
  MagnifyingGlassPlusIcon,
  MagnifyingGlassMinusIcon,
  CheckCircleIcon
} from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { FieldRoot, FieldLabel, FieldControl } from '@/components/ui/field'
import { Toolbar, ToolbarButton, ToolbarGroup, ToolbarSeparator } from '@/components/ui/toolbar'
import { Menubar } from '@/components/ui/menubar'
import { Menu, MenuTrigger, MenuPortal, MenuPositioner, MenuPopup, MenuItem } from '@/components/ui/menu'
import type { DemoMeta } from '@/showcase/demo'

const barTrigger =
  'h-6 rounded-(--radius) border-0 bg-transparent px-2 text-xs font-medium text-muted-foreground hover:bg-accent hover:text-foreground data-popup-open:bg-accent data-popup-open:text-accent-foreground cursor-pointer'

export function CanvasShellMock() {
  const [activeTool, setActiveTool] = useState('select')
  const [selectedNode, setSelectedNode] = useState('action')

  return (
    <div className='flex h-[420px] w-full flex-col overflow-hidden rounded-(--radius) border border-border bg-background text-xs shadow-xs'>
      {/* 1. Header: Menu & Actions */}
      <header className='flex h-11 shrink-0 items-center justify-between border-b border-border bg-card px-3'>
        <div className='flex items-center gap-4'>
          <div className='flex items-center gap-2'>
            <div className='flex size-6 items-center justify-center rounded-(--radius) bg-primary text-primary-foreground'>
              <GraphIcon className='size-4' />
            </div>
            <span className='font-bold text-foreground'>Flow Studio</span>
          </div>

          <div className='hidden sm:flex items-center'>
            <Menubar className='border-0 bg-transparent p-0 gap-0.5'>
              <Menu>
                <MenuTrigger className={barTrigger}>File</MenuTrigger>
                <MenuPortal>
                  <MenuPositioner side='bottom' align='start' sideOffset={4}>
                    <MenuPopup>
                      <MenuItem>New Pipeline</MenuItem>
                      <MenuItem>Open Flow…</MenuItem>
                      <MenuItem>Save</MenuItem>
                    </MenuPopup>
                  </MenuPositioner>
                </MenuPortal>
              </Menu>
              <Menu>
                <MenuTrigger className={barTrigger}>Edit</MenuTrigger>
                <MenuPortal>
                  <MenuPositioner side='bottom' align='start' sideOffset={4}>
                    <MenuPopup>
                      <MenuItem>Undo</MenuItem>
                      <MenuItem>Redo</MenuItem>
                      <MenuItem>Cut Node</MenuItem>
                    </MenuPopup>
                  </MenuPositioner>
                </MenuPortal>
              </Menu>
              <Menu>
                <MenuTrigger className={barTrigger}>View</MenuTrigger>
                <MenuPortal>
                  <MenuPositioner side='bottom' align='start' sideOffset={4}>
                    <MenuPopup>
                      <MenuItem>Zoom In</MenuItem>
                      <MenuItem>Zoom Out</MenuItem>
                      <MenuItem>Fit to Screen</MenuItem>
                    </MenuPopup>
                  </MenuPositioner>
                </MenuPortal>
              </Menu>
              <Menu>
                <MenuTrigger className={barTrigger}>Run</MenuTrigger>
                <MenuPortal>
                  <MenuPositioner side='bottom' align='start' sideOffset={4}>
                    <MenuPopup>
                      <MenuItem>Test Run</MenuItem>
                      <MenuItem>Deploy</MenuItem>
                    </MenuPopup>
                  </MenuPositioner>
                </MenuPortal>
              </Menu>
            </Menubar>
          </div>

          <div className='border-l border-border pl-3 flex items-center gap-2'>
            <span className='font-medium text-foreground'>Lead Qualification Pipeline</span>
            <Badge size='sm' count='Saved' status='outline' />
          </div>
        </div>

        <div className='flex items-center gap-2'>
          <Button size='sm' variant='outline' className='h-7 gap-1 px-2 text-xs'>
            <ShareNetworkIcon className='size-3.5' />
            Share
          </Button>
          <Button size='sm' className='h-7 gap-1 px-2.5 text-xs'>
            <ExportIcon className='size-3.5' />
            Deploy Flow
          </Button>
        </div>
      </header>

      {/* 2. Middle: Left Toolbar + Canvas + Right Properties */}
      <div className='flex flex-1 overflow-hidden relative'>
        {/* Left Toolbar using SkyTrack UI Toolbar */}
        <div className='w-11 shrink-0 border-r border-border bg-card flex flex-col items-center py-2 gap-2 z-10'>
          <Toolbar orientation='vertical' className='border-0 bg-transparent p-0 gap-1.5'>
            <ToolbarGroup>
              <ToolbarButton
                isActivated={activeTool === 'select'}
                onClick={() => setActiveTool('select')}
                size='icon'
                aria-label='Select tool'
                className='size-7'
              >
                <CursorIcon className='size-4' />
              </ToolbarButton>
              <ToolbarButton
                isActivated={activeTool === 'hand'}
                onClick={() => setActiveTool('hand')}
                size='icon'
                aria-label='Pan tool'
                className='size-7'
              >
                <HandPalmIcon className='size-4' />
              </ToolbarButton>
            </ToolbarGroup>
            <ToolbarSeparator className='w-6 my-1' />
            <ToolbarGroup>
              <ToolbarButton size='icon' aria-label='Trigger node' className='size-7'>
                <LightningIcon className='size-4' />
              </ToolbarButton>
              <ToolbarButton size='icon' aria-label='Filter logic node' className='size-7'>
                <FunnelIcon className='size-4' />
              </ToolbarButton>
              <ToolbarButton size='icon' aria-label='Action node' className='size-7'>
                <PaperPlaneRightIcon className='size-4' />
              </ToolbarButton>
            </ToolbarGroup>
            <ToolbarSeparator className='w-6 my-1' />
            <ToolbarButton size='icon' aria-label='Add block' className='size-7 border border-dashed border-border'>
              <PlusIcon className='size-4' />
            </ToolbarButton>
          </Toolbar>
        </div>

        {/* Center: Canvas / Workspace */}
        <div className='flex-1 relative bg-muted/15 flex items-center justify-center overflow-hidden p-6'>
          {/* Subtle Canvas Dot Grid Background */}
          <div
            className='absolute inset-0 opacity-40'
            style={{
              backgroundImage: 'radial-gradient(var(--border) 1px, transparent 1px)',
              backgroundSize: '16px 16px'
            }}
          />

          {/* Workflow Diagram Nodes */}
          <div className='relative z-0 flex flex-col items-center gap-6'>
            {/* Node 1: Trigger */}
            <div
              role='button'
              tabIndex={0}
              onClick={() => setSelectedNode('trigger')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setSelectedNode('trigger')
                }
              }}
              className={`w-64 cursor-pointer rounded-(--radius) border bg-card p-3 shadow-xs transition-all outline-hidden ${
                selectedNode === 'trigger'
                  ? 'border-primary ring-2 ring-primary/20'
                  : 'border-border hover:border-border/80'
              }`}
            >
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-1.5 font-semibold text-foreground'>
                  <LightningIcon className='size-4 text-warning' weight='fill' />
                  <span>Webhook: New Form Lead</span>
                </div>
                <Badge size='sm' count='Trigger' status='outline' />
              </div>
              <p className='mt-1 text-[11px] text-muted-foreground font-mono'>POST /api/v1/intake</p>
            </div>

            {/* Down Connector */}
            <div className='flex flex-col items-center text-muted-foreground'>
              <div className='h-5 w-0.5 bg-border' />
              <div className='size-1.5 rounded-full bg-border' />
            </div>

            {/* Node 2: Action / Executed */}
            <div
              role='button'
              tabIndex={0}
              onClick={() => setSelectedNode('action')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setSelectedNode('action')
                }
              }}
              className={`w-64 cursor-pointer rounded-(--radius) border bg-card p-3 shadow-xs transition-all outline-hidden ${
                selectedNode === 'action'
                  ? 'border-primary ring-2 ring-primary/20'
                  : 'border-border hover:border-border/80'
              }`}
            >
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-1.5 font-semibold text-foreground'>
                  <CheckCircleIcon className='size-4 text-success' weight='fill' />
                  <span>Sync to Enterprise CRM</span>
                </div>
                <Badge size='sm' count='Action' status='success' />
              </div>
              <p className='mt-1 text-[11px] text-muted-foreground font-mono'>Target: Salesforce Deals</p>
            </div>
          </div>
        </div>

        {/* Right: Properties / Inspector */}
        <aside className='w-56 shrink-0 border-l border-border bg-card/60 p-3 flex flex-col justify-between overflow-y-auto z-10'>
          <div className='space-y-3'>
            <div className='border-b border-border pb-2'>
              <div className='text-xs sub-heading text-muted-foreground'>Inspector</div>
              <h4 className='font-bold text-foreground text-sm mt-0.5'>
                {selectedNode === 'trigger' ? 'Webhook Listener' : 'CRM Dispatcher'}
              </h4>
              <Badge
                size='sm'
                count={selectedNode === 'trigger' ? 'Event Source' : 'Ready'}
                status='outline'
                className='mt-1'
              />
            </div>

            <div className='space-y-2.5 text-xs'>
              <FieldRoot>
                <FieldLabel className='text-[10px] text-muted-foreground'>Target Route</FieldLabel>
                <FieldControl
                  size='sm'
                  value={selectedNode === 'trigger' ? '/api/leads' : 'https://api.salesforce.com'}
                  readOnly
                  className='h-7 font-mono text-[10px]'
                />
              </FieldRoot>
              <FieldRoot>
                <FieldLabel className='text-[10px] text-muted-foreground'>Retry Interval</FieldLabel>
                <FieldControl size='sm' value='3 Retries (Backoff: 2s)' readOnly className='h-7 text-[10px]' />
              </FieldRoot>
              <div>
                <span className='text-muted-foreground block text-[10px] mb-1 font-medium'>Payload Mapping</span>
                <div className='rounded-(--radius) bg-muted/40 p-1.5 font-mono text-[10px] text-muted-foreground'>
                  &#123; lead_id, status: &quot;new&quot; &#125;
                </div>
              </div>
            </div>
          </div>

          <Button size='sm' className='w-full text-xs h-7 mt-3'>
            Save Configuration
          </Button>
        </aside>
      </div>

      {/* 3. Footer: Zoom Level / Coordinates / Execution Status */}
      <footer className='flex h-6 shrink-0 items-center justify-between border-t border-border bg-muted/30 px-3 text-[10px] text-muted-foreground'>
        <div className='flex items-center gap-3'>
          <div className='flex items-center gap-1'>
            <Button size='icon-xs' variant='ghost' className='size-5 p-0' aria-label='Zoom out'>
              <MagnifyingGlassMinusIcon className='size-3' />
            </Button>
            <span className='font-mono'>100%</span>
            <Button size='icon-xs' variant='ghost' className='size-5 p-0' aria-label='Zoom in'>
              <MagnifyingGlassPlusIcon className='size-3' />
            </Button>
          </div>
          <span>•</span>
          <span className='font-mono'>Coords: X: 420px, Y: 180px</span>
        </div>

        <div className='flex items-center gap-1.5 text-success font-medium'>
          <Badge dot status='success' />
          <span>Execution: Idle (Completed in 42ms)</span>
        </div>
      </footer>
    </div>
  )
}

export const demo: DemoMeta = {
  id: 'canvas-shell',
  title: 'Workspace / Canvas-centric Shell',
  description:
    'Infinite visual canvas with docked toolbars and property inspector for nodal pipelines and visual editors.',
  group: 'UI shell',
  variants: [
    {
      name: 'Default',
      render: () => <CanvasShellMock />
    }
  ]
}
