import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import type { DemoMeta } from '@/showcase/demo'

const panelClass = 'flex items-center justify-center bg-background p-4 text-sm text-foreground'

export const demo: DemoMeta = {
  id: 'resizable',
  title: 'Resizable',
  description: 'Accessible resizable panel groups and layouts with keyboard support.',
  group: 'Layout',
  variants: [
    {
      name: 'Horizontal',
      render: () => (
        <ResizablePanelGroup
          orientation='horizontal'
          className='rounded-[var(--radius)] border border-border'
          style={{ height: '10rem' }}
        >
          <ResizablePanel defaultSize='35%' minSize='20%' className={panelClass}>
            Map
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize='65%' minSize='30%' className={panelClass}>
            Mission details
          </ResizablePanel>
        </ResizablePanelGroup>
      )
    },
    {
      name: 'Vertical',
      render: () => (
        <ResizablePanelGroup
          orientation='vertical'
          className='rounded-[var(--radius)] border border-border'
          style={{ height: '15rem' }}
        >
          <ResizablePanel defaultSize='60%' minSize='25%' className={panelClass}>
            Map view
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize='40%' minSize='20%' className={panelClass}>
            Timeline
          </ResizablePanel>
        </ResizablePanelGroup>
      )
    }
  ]
}
