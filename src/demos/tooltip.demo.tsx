import * as React from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  HeadphonesIcon,
  TextBIcon,
  TextItalicIcon,
  TextUnderlineIcon,
  TimerIcon,
  TrashIcon
} from '@phosphor-icons/react'
import {
  createHandle,
  Tooltip,
  TooltipArrow,
  TooltipPortal,
  TooltipPositioner,
  TooltipPopup,
  TooltipProvider,
  TooltipTrigger,
  TooltipViewport,
  type TooltipChangeEventDetails
} from '@/components/ui/tooltip'
import type { DemoMeta } from '@/showcase/demo'

const HINTS = [
  { label: 'Bold', icon: TextBIcon },
  { label: 'Italic', icon: TextItalicIcon },
  { label: 'Underline', icon: TextUnderlineIcon }
] as const

/* "Detached triggers" */
const detachedTooltip = createHandle()

/* "Controlled mode with multiple triggers" */
const controlledTooltip = createHandle()

const animatedPositioner = cn(
  'transition-[top,left,right,bottom,transform] duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)]',
  'data-instant:transition-none'
)

const animatedPopup = cn(
  'transition-[width,height] duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)]',
  'data-instant:transition-none'
)

const viewportContentTransition =
  '[--viewport-inline-padding:0.5rem] relative h-full w-full overflow-clip px-[var(--viewport-inline-padding)] py-1 ' +
  '[&_[data-previous]]:w-[calc(var(--popup-width)-2*var(--viewport-inline-padding))] [&_[data-previous]]:translate-x-0 [&_[data-previous]]:opacity-100 ' +
  '[&_[data-previous]]:transition-[translate,opacity] [&_[data-previous]]:duration-[350ms,175ms] ' +
  '[&_[data-previous]]:ease-[cubic-bezier(0.22,1,0.36,1)] ' +
  '[&_[data-current]]:w-[calc(var(--popup-width)-2*var(--viewport-inline-padding))] [&_[data-current]]:translate-x-0 [&_[data-current]]:opacity-100 ' +
  '[&_[data-current]]:transition-[translate,opacity] [&_[data-current]]:duration-[350ms,175ms] ' +
  '[&_[data-current]]:ease-[cubic-bezier(0.22,1,0.36,1)] ' +
  "data-[activation-direction~='left']:[&_[data-current][data-starting-style]]:-translate-x-1/2 " +
  "data-[activation-direction~='left']:[&_[data-current][data-starting-style]]:opacity-0 " +
  "data-[activation-direction~='right']:[&_[data-current][data-starting-style]]:translate-x-1/2 " +
  "data-[activation-direction~='right']:[&_[data-current][data-starting-style]]:opacity-0 " +
  '[[data-instant]_&_[data-previous]]:transition-none [[data-instant]_&_[data-current]]:transition-none ' +
  "data-[activation-direction~='left']:[&_[data-previous][data-ending-style]]:translate-x-1/2 " +
  "data-[activation-direction~='left']:[&_[data-previous][data-ending-style]]:opacity-0 " +
  "data-[activation-direction~='right']:[&_[data-previous][data-ending-style]]:-translate-x-1/2 " +
  "data-[activation-direction~='right']:[&_[data-previous][data-ending-style]]:opacity-0"

/* "Controlled mode with multiple triggers" */
function ControlledTriggers() {
  const [open, setOpen] = React.useState(false)
  const [triggerId, setTriggerId] = React.useState<string | null>(null)

  const handleOpenChange = (isOpen: boolean, eventDetails: TooltipChangeEventDetails) => {
    setOpen(isOpen)
    setTriggerId(eventDetails.trigger?.id ?? null)
  }

  return (
    <div className='flex flex-wrap items-center gap-3'>
      <TooltipProvider>
        <TooltipTrigger handle={controlledTooltip} id='trigger-1' aria-label='Trigger 1'>
          <TextBIcon />
        </TooltipTrigger>
        <TooltipTrigger handle={controlledTooltip} id='trigger-2' aria-label='Trigger 2'>
          <TextItalicIcon />
        </TooltipTrigger>
        <TooltipTrigger handle={controlledTooltip} id='trigger-3' aria-label='Trigger 3'>
          <TextUnderlineIcon />
        </TooltipTrigger>
        <Button
          variant='outline'
          onClick={() => {
            setTriggerId('trigger-2')
            setOpen(true)
          }}
        >
          Show tooltip programmatically
        </Button>

        <Tooltip handle={controlledTooltip} open={open} onOpenChange={handleOpenChange} triggerId={triggerId}>
          <TooltipPortal>
            <TooltipPositioner sideOffset={11}>
              <TooltipPopup>
                <TooltipArrow />
                Tooltip
              </TooltipPopup>
            </TooltipPositioner>
          </TooltipPortal>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}

/* "Animating the Tooltip" and "Content" — the popup moves and its content swaps. */
function AnimatedTooltips() {
  const [payloadTooltip] = React.useState(() => createHandle<React.ReactNode>())

  return (
    <TooltipProvider>
      <div className='flex flex-wrap items-center gap-3'>
        <TooltipTrigger handle={payloadTooltip} payload='Listen to audio preview' aria-label='Listen to audio preview'>
          <HeadphonesIcon />
        </TooltipTrigger>
        <TooltipTrigger handle={payloadTooltip} payload='Set a timer' aria-label='Set a timer'>
          <TimerIcon />
        </TooltipTrigger>
        <TooltipTrigger
          handle={payloadTooltip}
          payload='Delete: This action cannot be undone'
          aria-label='Delete: This action cannot be undone'
        >
          <TrashIcon />
        </TooltipTrigger>
      </div>

      <Tooltip handle={payloadTooltip}>
        {({ payload }) => (
          <TooltipPortal>
            <TooltipPositioner sideOffset={11} className={animatedPositioner}>
              <TooltipPopup className={animatedPopup}>
                <TooltipArrow />
                <TooltipViewport className={viewportContentTransition}>{payload}</TooltipViewport>
              </TooltipPopup>
            </TooltipPositioner>
          </TooltipPortal>
        )}
      </Tooltip>
    </TooltipProvider>
  )
}

function MultipleTriggers() {
  const [payloadTooltip] = React.useState(() => createHandle<React.ReactNode>())

  return (
    <TooltipProvider>
      <div className='flex items-center gap-2'>
        <TooltipTrigger handle={payloadTooltip} payload='Bold' aria-label='Bold'>
          <TextBIcon />
        </TooltipTrigger>
        <TooltipTrigger handle={payloadTooltip} payload='Italic' aria-label='Italic'>
          <TextItalicIcon />
        </TooltipTrigger>
        <TooltipTrigger handle={payloadTooltip} payload='Underline' aria-label='Underline'>
          <TextUnderlineIcon />
        </TooltipTrigger>
      </div>

      <Tooltip handle={payloadTooltip}>
        {({ payload }) => (
          <TooltipPortal>
            <TooltipPositioner sideOffset={11}>
              <TooltipPopup>
                <TooltipArrow />
                {payload}
              </TooltipPopup>
            </TooltipPositioner>
          </TooltipPortal>
        )}
      </Tooltip>
    </TooltipProvider>
  )
}

export const demo: DemoMeta = {
  id: 'tooltip',
  title: 'Tooltip',
  description:
    'A high-quality, unstyled React tooltip component that appears when an element is hovered or focused, showing a hint for sighted users.',
  group: 'Overlays',
  variants: [
    {
      name: 'Default',
      render: () => (
        <TooltipProvider>
          <div className='flex items-center gap-2'>
            {HINTS.map(({ label, icon: Icon }) => (
              <Tooltip key={label}>
                <TooltipTrigger aria-label={label}>
                  <Icon />
                </TooltipTrigger>
                <TooltipPortal>
                  <TooltipPositioner sideOffset={11}>
                    <TooltipPopup>
                      <TooltipArrow />
                      {label}
                    </TooltipPopup>
                  </TooltipPositioner>
                </TooltipPortal>
              </Tooltip>
            ))}
          </div>
        </TooltipProvider>
      )
    },
    {
      name: 'Detached triggers',
      render: () => (
        <TooltipProvider delay={300}>
          <div className='flex items-center gap-2'>
            <TooltipTrigger handle={detachedTooltip} aria-label='Bold'>
              <TextBIcon />
            </TooltipTrigger>
            <TooltipTrigger handle={detachedTooltip} aria-label='Italic'>
              <TextItalicIcon />
            </TooltipTrigger>
            <TooltipTrigger handle={detachedTooltip} aria-label='Underline'>
              <TextUnderlineIcon />
            </TooltipTrigger>
          </div>

          <Tooltip handle={detachedTooltip}>
            <TooltipPortal>
              <TooltipPositioner sideOffset={11}>
                <TooltipPopup>
                  <TooltipArrow />
                  Formatting hint
                </TooltipPopup>
              </TooltipPositioner>
            </TooltipPortal>
          </Tooltip>
        </TooltipProvider>
      )
    },
    {
      name: 'Multiple triggers',
      render: () => <MultipleTriggers />
    },
    {
      name: 'Controlled mode with multiple triggers',
      render: () => <ControlledTriggers />
    },
    {
      name: 'Animating the Tooltip',
      render: () => <AnimatedTooltips />
    },
    {
      name: 'Position and Size',
      render: () => <AnimatedTooltips />
    },
    {
      name: 'Content',
      render: () => <AnimatedTooltips />
    }
  ]
}
