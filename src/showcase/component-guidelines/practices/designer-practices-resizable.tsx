import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import type { DesignerPracticeRegistry } from '../practice-types'

function ResizableExample({ recommended }: { recommended: boolean }) {
  return (
    <ResizablePanelGroup
      orientation='horizontal'
      className='w-full overflow-hidden rounded-(--radius) border border-border'
      style={{ height: '8rem' }}
    >
      <ResizablePanel
        defaultSize='40%'
        minSize={recommended ? '25%' : '5%'}
        aria-label={recommended ? 'Map' : 'Billing'}
      >
        <div className='flex h-full items-center justify-center bg-background p-2 text-sm'>
          {recommended ? 'Map' : 'Billing'}
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel
        defaultSize='60%'
        minSize={recommended ? '30%' : '5%'}
        aria-label={recommended ? 'Mission details' : 'Team directory'}
      >
        <div className='flex h-full items-center justify-center bg-background p-2 text-sm'>
          {recommended ? 'Mission details' : 'Team directory'}
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

export const designerPracticeRegistry: DesignerPracticeRegistry = {
  resizable: {
    Layout: [
      {
        recommended: <ResizableExample recommended />,
        discouraged: <ResizableExample recommended={false} />
      }
    ]
  }
}
