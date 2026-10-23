import * as React from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { TextBIcon, TextItalicIcon, TextUnderlineIcon } from '@phosphor-icons/react'
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

/* "Multiple triggers" and "Animating the Tooltip" */
const payloadTooltip = createHandle<React.ReactNode>()

/* "Controlled mode with multiple triggers" */
const controlledTooltip = createHandle()

function HeadphonesIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      width='16'
      height='16'
      viewBox='0 0 16 16'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.5'
      aria-hidden='true'
      {...props}
    >
      <path strokeLinecap='round' d='M1.5 11V7.5c0-2.5 2.5-6 6.5-6s6.5 3.5 6.5 6V11' />
      <path d='M12 7.5c1.3807 0 2.5 1.11929 2.5 2.5v2c0 1.3807-1.1193 2.5-2.5 2.5h-1.5v-7zm-8 0h1.5v7H4c-1.38071 0-2.5-1.1193-2.5-2.5v-2c0-1.38071 1.11929-2.5 2.5-2.5Z' />
    </svg>
  )
}

function StopwatchIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      width='16'
      height='16'
      viewBox='0 0 16 16'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.5'
      aria-hidden='true'
      {...props}
    >
      <circle cx='8' cy='8.5' r='6' />
      <path strokeLinecap='square' strokeLinejoin='round' d='M8 9.5v-5m0-2v-2m-2 0h4M12 4l1.5-1.5' />
    </svg>
  )
}

function TrashIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      width='16'
      height='16'
      viewBox='0 0 16 16'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.5'
      aria-hidden='true'
      {...props}
    >
      <path strokeLinecap='square' d='M2.5 4h11' />
      <path strokeLinecap='round' d='M6.5 4V3c0-.82843.67157-1.5 1.5-1.5s1.5.67157 1.5 1.5v1' />
      <path
        strokeLinecap='square'
        d='m3.5 4 .87069 9.1422c.07332.7699.7199 1.3578 1.49324 1.3578h4.27217c.7733 0 1.4199-.5879 1.4932-1.3578L12.5 4'
      />
    </svg>
  )
}

const animatedPositioner = cn(
  'transition-[top,left,right,bottom,transform] duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)]',
  'data-[instant]:transition-none'
)

const animatedPopup = cn(
  'transition-[width,height] duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)]',
  'data-[instant]:transition-none'
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
  return (
    <TooltipProvider>
      <div className='flex flex-wrap items-center gap-3'>
        <TooltipTrigger handle={payloadTooltip} payload='Listen to audio preview' aria-label='Listen to audio preview'>
          <HeadphonesIcon />
        </TooltipTrigger>
        <TooltipTrigger handle={payloadTooltip} payload='Set a timer' aria-label='Set a timer'>
          <StopwatchIcon />
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
      render: () => (
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
