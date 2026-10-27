import * as React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  createHandle,
  Popover,
  PopoverArrow,
  PopoverClose,
  PopoverDescription,
  PopoverPortal,
  PopoverPositioner,
  PopoverPopup,
  PopoverTitle,
  PopoverTrigger,
  PopoverViewport,
  type PopoverChangeEventDetails
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import type { DemoMeta } from '@/showcase/demo'

function NotificationsBody() {
  return (
    <div className='flex flex-col gap-1'>
      <PopoverTitle>Notifications</PopoverTitle>
      <PopoverDescription>You are all caught up. Good job!</PopoverDescription>
    </div>
  )
}

function ActivityBody() {
  return (
    <div className='flex flex-col gap-1'>
      <PopoverTitle>Activity</PopoverTitle>
      <PopoverDescription>Nothing interesting happened recently.</PopoverDescription>
    </div>
  )
}

function ProfileBody() {
  return (
    <div className='flex flex-col gap-2'>
      <PopoverTitle>Jason Eventon</PopoverTitle>
      <div className='flex items-center gap-2'>
        <Avatar>
          <AvatarImage
            src='https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=128&h=128&dpr=2&q=80'
            width={48}
            height={48}
          />
          <AvatarFallback>JE</AvatarFallback>
        </Avatar>
        <span className='text-sm text-muted-foreground'>Pro plan</span>
      </div>
      <div className='flex flex-col'>
        <a className='rounded-(--radius) px-2 py-1 text-sm text-primary underline-offset-4 hover:underline' href='#popover'>
          Profile settings
        </a>
        <a className='rounded-(--radius) px-2 py-1 text-sm text-primary underline-offset-4 hover:underline' href='#popover'>
          Log out
        </a>
      </div>
    </div>
  )
}

/* "Detached triggers" */
const detachedPopover = createHandle()

/* "Multiple triggers" + "Animating the Popover" */
const panelPopover = createHandle<React.ComponentType>()

/* "Controlled mode with multiple triggers" */
const controlledPopover = createHandle()

const animatedPositioner = cn(
  'transition-[top,left,right,bottom,transform] duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)]',
  'data-[instant]:transition-none'
)

const animatedPopup = cn(
  'transition-[width,height] duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)]',
  'data-[instant]:transition-none'
)

const viewportContentTransition =
  'relative h-full w-full overflow-clip p-2 ' +
  '[&_[data-current]]:w-[calc(var(--popup-width)-1rem)] [&_[data-current]]:translate-x-0 [&_[data-current]]:opacity-100 ' +
  '[&_[data-current]]:transition-[translate,opacity] [&_[data-current]]:duration-[350ms,175ms] ' +
  '[&_[data-current]]:ease-[cubic-bezier(0.22,1,0.36,1)] ' +
  "data-[activation-direction~='left']:[&_[data-current][data-starting-style]]:-translate-x-1/2 " +
  "data-[activation-direction~='left']:[&_[data-current][data-starting-style]]:opacity-0 " +
  "data-[activation-direction~='right']:[&_[data-current][data-starting-style]]:translate-x-1/2 " +
  "data-[activation-direction~='right']:[&_[data-current][data-starting-style]]:opacity-0 " +
  '[&_[data-previous]]:w-[calc(var(--popup-width)-1rem)] [&_[data-previous]]:translate-x-0 [&_[data-previous]]:opacity-100 ' +
  '[&_[data-previous]]:transition-[translate,opacity] [&_[data-previous]]:duration-[350ms,175ms] ' +
  '[&_[data-previous]]:ease-[cubic-bezier(0.22,1,0.36,1)] ' +
  "data-[activation-direction~='left']:[&_[data-previous][data-ending-style]]:translate-x-1/2 " +
  "data-[activation-direction~='left']:[&_[data-previous][data-ending-style]]:opacity-0 " +
  "data-[activation-direction~='right']:[&_[data-previous][data-ending-style]]:-translate-x-1/2 " +
  "data-[activation-direction~='right']:[&_[data-previous][data-ending-style]]:opacity-0"

/* "Controlled mode with multiple triggers" */
function ControlledTriggers() {
  const [open, setOpen] = React.useState(false)
  const [triggerId, setTriggerId] = React.useState<string | null>(null)

  const handleOpenChange = (isOpen: boolean, eventDetails: PopoverChangeEventDetails) => {
    setOpen(isOpen)
    setTriggerId(eventDetails.trigger?.id ?? null)
  }

  return (
    <div className='flex flex-wrap items-center gap-3'>
      <PopoverTrigger handle={controlledPopover} id='trigger-1' render={<Button variant='secondary'>Trigger 1</Button>} />
      <PopoverTrigger handle={controlledPopover} id='trigger-2' render={<Button variant='secondary'>Trigger 2</Button>} />
      <PopoverTrigger handle={controlledPopover} id='trigger-3' render={<Button variant='secondary'>Trigger 3</Button>} />
      <Button
        variant='outline'
        onClick={() => {
          setTriggerId('trigger-2')
          setOpen(true)
        }}
      >
        Open programmatically
      </Button>

      <Popover handle={controlledPopover} open={open} onOpenChange={handleOpenChange} triggerId={triggerId}>
        <PopoverPortal>
          <PopoverPositioner sideOffset={8}>
            <PopoverPopup>
              <PopoverArrow />
              <PopoverTitle>Notifications</PopoverTitle>
              <PopoverDescription>You are all caught up. Good job!</PopoverDescription>
            </PopoverPopup>
          </PopoverPositioner>
        </PopoverPortal>
      </Popover>
    </div>
  )
}

/* "Animating the Popover" and "Content" — content transitions through the Viewport. */
function AnimatedContent() {
  return (
    <div className='flex flex-col gap-3'>
      <div className='flex flex-wrap gap-3'>
        <PopoverTrigger handle={panelPopover} payload={NotificationsBody} render={<Button variant='secondary'>Notifications</Button>} />
        <PopoverTrigger handle={panelPopover} payload={ActivityBody} render={<Button variant='secondary'>Activity</Button>} />
        <PopoverTrigger handle={panelPopover} payload={ProfileBody} render={<Button variant='secondary'>Profile</Button>} />
      </div>

      <Popover handle={panelPopover}>
        {({ payload: Payload }) => (
          <PopoverPortal>
            <PopoverPositioner sideOffset={8} className={animatedPositioner}>
              <PopoverPopup className={animatedPopup}>
                <PopoverArrow />
                <PopoverViewport className={viewportContentTransition}>
                  {Payload !== undefined && <Payload />}
                </PopoverViewport>
              </PopoverPopup>
            </PopoverPositioner>
          </PopoverPortal>
        )}
      </Popover>
    </div>
  )
}

/* "Position and Size" — the Positioner moves, the Popup animates its own size. */
function AnimatedPositionAndSize() {
  return (
    <div className='flex flex-col gap-3'>
      <div className='flex flex-wrap gap-3'>
        <PopoverTrigger handle={panelPopover} payload={NotificationsBody} className='min-w-24 justify-start' render={<Button variant="secondary">Notifications</Button>} />
        <PopoverTrigger handle={panelPopover} payload={ProfileBody} className='min-w-40 justify-center' render={<Button variant="secondary">Profile</Button>} />
      </div>

      <Popover handle={panelPopover}>
        {({ payload: Payload }) => (
          <PopoverPortal>
            <PopoverPositioner sideOffset={8} className={animatedPositioner}>
              <PopoverPopup className={animatedPopup}>
                <PopoverArrow />
                {Payload !== undefined && <Payload />}
              </PopoverPopup>
            </PopoverPositioner>
          </PopoverPortal>
        )}
      </Popover>
    </div>
  )
}

export const demo: DemoMeta = {
  id: 'popover',
  title: 'Popover',
  description:
    'A high-quality, unstyled React popover component that displays an accessible popup anchored to a button.',
  group: 'Overlays',
  variants: [
    {
      name: 'Default',
      render: () => (
        <Popover>
          <PopoverTrigger render={<Button variant="secondary">Notifications</Button>} />
          <PopoverPortal>
            <PopoverPositioner sideOffset={8}>
              <PopoverPopup>
                <PopoverArrow />
                <PopoverTitle>Notifications</PopoverTitle>
                <PopoverDescription>You are all caught up. Good job!</PopoverDescription>
              </PopoverPopup>
            </PopoverPositioner>
          </PopoverPortal>
        </Popover>
      )
    },
    {
      name: 'Opening on hover',
      render: () => (
        <Popover>
          <PopoverTrigger openOnHover delay={200} render={<Button variant="secondary">Notifications</Button>} />
          <PopoverPortal>
            <PopoverPositioner sideOffset={8}>
              <PopoverPopup>
                <PopoverArrow />
                <PopoverTitle>Notifications</PopoverTitle>
                <PopoverDescription>You are all caught up. Good job!</PopoverDescription>
              </PopoverPopup>
            </PopoverPositioner>
          </PopoverPortal>
        </Popover>
      )
    },
    {
      name: 'Detached triggers',
      render: () => (
        <div className='flex flex-wrap items-center gap-3'>
          <PopoverTrigger handle={detachedPopover} render={<Button variant="secondary">View notifications</Button>} />

          <Popover handle={detachedPopover}>
            <PopoverPortal>
              <PopoverPositioner sideOffset={8}>
                <PopoverPopup>
                  <PopoverArrow />
                  <NotificationsBody />
                  <PopoverClose className='top-auto right-3 bottom-2 static w-auto px-2'>Close</PopoverClose>
                </PopoverPopup>
              </PopoverPositioner>
            </PopoverPortal>
          </Popover>
        </div>
      )
    },
    {
      name: 'Multiple triggers',
      render: () => (
        <div className='flex flex-wrap items-center gap-3'>
          <PopoverTrigger handle={panelPopover} payload={NotificationsBody} render={<Button variant="secondary">Trigger 1</Button>} />
          <PopoverTrigger handle={panelPopover} payload={ActivityBody} render={<Button variant="secondary">Trigger 2</Button>} />
          <PopoverTrigger handle={panelPopover} payload={ProfileBody} render={<Button variant="secondary">Trigger 3</Button>} />

          <Popover handle={panelPopover}>
            {({ payload: Payload }) => (
              <PopoverPortal>
                <PopoverPositioner sideOffset={8}>
                  <PopoverPopup>
                    <PopoverArrow />
                    <PopoverTitle>Popover</PopoverTitle>
                    {Payload !== undefined && (
                      <PopoverDescription>This has been opened by a detached trigger</PopoverDescription>
                    )}
                  </PopoverPopup>
                </PopoverPositioner>
              </PopoverPortal>
            )}
          </Popover>
        </div>
      )
    },
    {
      name: 'Controlled mode with multiple triggers',
      render: () => <ControlledTriggers />
    },
    {
      name: 'Animating the Popover',
      render: () => <AnimatedContent />
    },
    {
      name: 'Position and Size',
      render: () => <AnimatedPositionAndSize />
    },
    {
      name: 'Content',
      render: () => <AnimatedContent />
    }
  ]
}
