import * as React from 'react'
import {
  Group as ResizablePrimitiveGroup,
  Panel as ResizablePrimitivePanel,
  Separator as ResizablePrimitiveSeparator
} from 'react-resizable-panels'
import { cn } from '@/lib/utils'

const ResizableContext = React.createContext<'horizontal' | 'vertical'>('horizontal')

function ResizablePanelGroup({
  className,
  orientation = 'horizontal',
  ...props
}: React.ComponentProps<typeof ResizablePrimitiveGroup>) {
  return (
    <ResizableContext.Provider value={orientation}>
      <ResizablePrimitiveGroup
        data-slot='resizable-panel-group'
        data-orientation={orientation}
        orientation={orientation}
        className={cn('h-full w-full', className)}
        {...props}
      />
    </ResizableContext.Provider>
  )
}

function ResizablePanel({ className, ...props }: React.ComponentProps<typeof ResizablePrimitivePanel>) {
  return <ResizablePrimitivePanel data-slot='resizable-panel' className={cn('min-h-0 min-w-0', className)} {...props} />
}

type ResizableHandleProps = React.ComponentProps<typeof ResizablePrimitiveSeparator> & {
  withHandle?: boolean
}

function ResizableHandle({ className, withHandle, ...props }: ResizableHandleProps) {
  const orientation = React.useContext(ResizableContext)

  return (
    <ResizablePrimitiveSeparator
      data-slot='resizable-handle'
      data-orientation={orientation === 'horizontal' ? 'vertical' : 'horizontal'}
      className={cn(
        'relative z-10 flex shrink-0 items-center justify-center bg-border outline-none transition-colors focus-visible:bg-primary/40 focus-visible:ring-1 focus-visible:ring-primary',
        orientation === 'horizontal' ? 'h-full w-px cursor-col-resize' : 'h-px w-full cursor-row-resize',
        className
      )}
      {...props}
    >
      {withHandle && (
        <span
          data-slot='resizable-handle-grip'
          className='pointer-events-none absolute z-10 flex h-4 w-3 items-center justify-center rounded-[var(--radius)] border border-border bg-background text-muted-foreground'
        >
          <span
            className={cn(
              'flex items-center justify-center',
              orientation === 'horizontal' ? 'h-2 flex-row gap-0.5' : 'w-2 flex-col gap-0.5'
            )}
          >
            <span className={cn('bg-current', orientation === 'horizontal' ? 'h-2 w-px' : 'h-px w-2')} />
            <span className={cn('bg-current', orientation === 'horizontal' ? 'h-2 w-px' : 'h-px w-2')} />
          </span>
        </span>
      )}
    </ResizablePrimitiveSeparator>
  )
}

export { ResizableHandle, ResizablePanel, ResizablePanelGroup }
export type { ResizableHandleProps }
