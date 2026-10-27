import * as React from 'react'
import { CaretDownIcon, XIcon } from '@phosphor-icons/react'
import {
  AlertDialog,
  AlertDialogClose,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogPopup,
  AlertDialogPortal,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import {
  createHandle,
  Dialog,
  DialogBackdrop,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPopup,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
  DialogViewport,
  type DialogChangeEventDetails
} from '@/components/ui/dialog'
import { FieldControl, FieldLabel, FieldRoot } from '@/components/ui/field'
import { FieldsetLegend, FieldsetRoot } from '@/components/ui/fieldset'
import { Menu, MenuItem, MenuPortal, MenuPositioner, MenuPopup, MenuSeparator, MenuTrigger } from '@/components/ui/menu'
import {
  ScrollArea,
  ScrollAreaContent,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport
} from '@/components/ui/scroll-area'
import type { DemoMeta } from '@/showcase/demo'

const LOREM_SECTIONS = [
  {
    title: 'Typography',
    body: 'Typography is the art and science of arranging type to make written language clear, visually appealing, and effective in communication.'
  },
  {
    title: 'Layout',
    body: 'A grid-based layout gives every block of content a predictable home, which keeps dense operational screens legible.'
  },
  {
    title: 'Colour',
    body: 'Colour carries meaning here: semantic tokens only, so light and dark themes stay consistent without raw values.'
  },
  {
    title: 'Motion',
    body: 'Transitions are short and purposeful. They confirm an action rather than decorate it.'
  },
  {
    title: 'Accessibility',
    body: 'Focus order, labels and contrast ratios are checked before a component reaches the showcase.'
  }
] as const

/* "Detached triggers" */
const detachedDialog = createHandle()

/* "Multiple triggers" */
const payloadDialog = createHandle<{ text: string }>()

/* "Controlled mode with multiple triggers" */
const controlledDialog = createHandle()

/* "State" */
function StateExample () {
  const [open, setOpen] = React.useState(false)
  const [log, setLog] = React.useState<string[]>([])

  return (
    <div className='flex flex-col items-start gap-3'>
      <div className='flex gap-3'>
        <Dialog>
          <DialogTrigger render={<Button variant='outline'>Uncontrolled</Button>} />
          <DialogPortal>
            <DialogBackdrop />
            <DialogPopup>
              <DialogHeader>
                <DialogTitle>Uncontrolled dialog</DialogTitle>
                <DialogDescription>
                  The dialog owns its own open state. Close it with the button, the backdrop or Escape.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose>Close</DialogClose>
              </DialogFooter>
            </DialogPopup>
          </DialogPortal>
        </Dialog>

        <Button
          variant='outline'
          onClick={() => {
            setOpen(true)
            setLog((prev) => ['open requested', ...prev].slice(0, 3))
          }}
        >
          Controlled
        </Button>
        <Button
          variant='outline'
          onClick={() => {
            setOpen(true)
            setLog((prev) => ['opened programmatically', ...prev].slice(0, 3))
          }}
        >
          Controlled from elsewhere
        </Button>
      </div>

      <Dialog
        open={open}
        onOpenChange={(nextOpen, eventDetails) => {
          setOpen(nextOpen)
          setLog((prev) => [`${eventDetails.reason}`, ...prev].slice(0, 3))
        }}
      >
        <DialogPortal>
          <DialogBackdrop />
          <DialogPopup>
            <DialogHeader>
              <DialogTitle>Controlled dialog</DialogTitle>
              <DialogDescription>
                <code>open</code> and <code>onOpenChange</code> drive this dialog imperatively.
              </DialogDescription>
            </DialogHeader>
            <form
              onSubmit={(event) => {
                event.preventDefault()
                setOpen(false)
              }}
            >
              <DialogFooter className='mt-4'>
                <DialogClose>Cancel</DialogClose>
                <Button type='submit'>Submit</Button>
              </DialogFooter>
            </form>
          </DialogPopup>
        </DialogPortal>
      </Dialog>

      <ul className='flex flex-col gap-1 text-xs text-muted-foreground'>
        {log.map((entry, index) => (
          <li key={`${entry}-${index}`}>{entry}</li>
        ))}
      </ul>
    </div>
  )
}

/* "Open from a menu" */
const MENU_ITEMS = ['Playlist details', 'Share playlist', 'Export playlist']

function OpenFromMenu () {
  const [dialogOpen, setDialogOpen] = React.useState(false)

  return (
    <div className='flex flex-col items-start gap-3'>
      <Menu>
        <MenuTrigger
          render={
            <Button variant='outline'>
              Playlist <CaretDownIcon />
            </Button>
          }
        ></MenuTrigger>
        <MenuPortal>
          <MenuPositioner sideOffset={8} align='start'>
            <MenuPopup className='w-56'>
              {MENU_ITEMS.map((item, index) => (
                <React.Fragment key={item}>
                  {index === 2 && <MenuSeparator className='my-1' />}
                  {/* Open the dialog when the menu item is clicked */}
                  <MenuItem onClick={() => setDialogOpen(true)}>{item}</MenuItem>
                </React.Fragment>
              ))}
            </MenuPopup>
          </MenuPositioner>
        </MenuPortal>
      </Menu>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogPortal>
          <DialogBackdrop />
          <DialogPopup>
            <DialogHeader>
              <DialogTitle>Playlist details</DialogTitle>
              <DialogDescription>This playlist contains 24 songs and was last updated today.</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose>Close</DialogClose>
            </DialogFooter>
          </DialogPopup>
        </DialogPortal>
      </Dialog>
    </div>
  )
}

/* "Nested dialogs" */
function NestedDialogs () {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant='outline'>View notifications</Button>} />
      <DialogPortal>
        <DialogBackdrop />
        <DialogPopup>
          <DialogHeader>
            <DialogTitle>Notifications</DialogTitle>
            <DialogDescription>You are all caught up. Good job!</DialogDescription>
          </DialogHeader>
          <div>
            <Dialog>
              <DialogTrigger>Customize</DialogTrigger>
              <DialogPortal>
                <DialogPopup>
                  <DialogHeader>
                    <DialogTitle>Customize notifications</DialogTitle>
                    <DialogDescription>Review your settings here.</DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose>Close</DialogClose>
                  </DialogFooter>
                </DialogPopup>
              </DialogPortal>
            </Dialog>
          </div>
        </DialogPopup>
      </DialogPortal>
    </Dialog>
  )
}

/* "Close confirmation" */
function CloseConfirmation () {
  const [dialogOpen, setDialogOpen] = React.useState(false)
  const [confirmationOpen, setConfirmationOpen] = React.useState(false)
  const [textareaValue, setTextareaValue] = React.useState('')
  const titleId = React.useId()

  return (
    <Dialog
      open={dialogOpen}
      onOpenChange={(open) => {
        // Show the close confirmation if there's text in the textarea.
        if (!open && textareaValue) {
          setConfirmationOpen(true)
        } else {
          setTextareaValue('')
          setDialogOpen(open)
        }
      }}
    >
      <DialogTrigger>Tweet</DialogTrigger>
      <DialogPortal>
        <DialogBackdrop />
        <DialogPopup>
          <DialogTitle id={titleId}>New tweet</DialogTitle>
          <form
            className='flex flex-col gap-4'
            onSubmit={(event) => {
              event.preventDefault()
              setDialogOpen(false)
            }}
          >
            <textarea
              aria-labelledby={titleId}
              required
              className='min-h-32 w-full resize-none rounded-(--radius) border border-input bg-background p-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none'
              placeholder="What's on your mind?"
              value={textareaValue}
              onChange={(event) => setTextareaValue(event.target.value)}
            />
            <DialogFooter>
              <DialogClose>Cancel</DialogClose>
              <Button type='submit'>Tweet</Button>
            </DialogFooter>
          </form>
        </DialogPopup>
      </DialogPortal>

      {/* Confirmation dialog */}
      <AlertDialog open={confirmationOpen} onOpenChange={setConfirmationOpen}>
        <AlertDialogPortal>
          <AlertDialogPopup>
            <AlertDialogHeader>
              <AlertDialogTitle>Discard tweet?</AlertDialogTitle>
              <AlertDialogDescription>Your tweet will be lost.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogClose>Go back</AlertDialogClose>
              <Button
                variant='destructive'
                onClick={() => {
                  setConfirmationOpen(false)
                  setDialogOpen(false)
                }}
              >
                Discard
              </Button>
            </AlertDialogFooter>
          </AlertDialogPopup>
        </AlertDialogPortal>
      </AlertDialog>
    </Dialog>
  )
}

/* "Custom focus management" */
function CustomFocusManagement () {
  const initialFocusRef = React.useRef<HTMLInputElement | null>(null)
  const finalFocusRef = React.useRef<HTMLButtonElement | null>(null)

  return (
    <div className='flex flex-wrap items-center gap-3'>
      <Dialog>
        <DialogTrigger>Open feedback</DialogTrigger>
        <DialogPortal>
          <DialogBackdrop />
          <DialogPopup initialFocus={initialFocusRef} finalFocus={finalFocusRef} className='sm:max-w-md'>
            <DialogHeader>
              <DialogTitle>Feedback form</DialogTitle>
              <DialogDescription>Your feedback means a lot to us.</DialogDescription>
            </DialogHeader>
            <FieldsetRoot className='m-0 gap-4 border-0 p-0'>
              <FieldsetLegend className='sr-only'>Feedback details</FieldsetLegend>
              <FieldRoot>
                <FieldLabel>Full name</FieldLabel>
                <FieldControl placeholder='Enter your name' />
              </FieldRoot>
              <FieldRoot>
                <FieldLabel>Feedback</FieldLabel>
                <FieldControl ref={initialFocusRef} required placeholder='Enter your feedback' />
              </FieldRoot>
            </FieldsetRoot>
            <DialogFooter>
              <DialogClose>Close</DialogClose>
            </DialogFooter>
          </DialogPopup>
        </DialogPortal>
      </Dialog>
      <Button ref={finalFocusRef} variant='outline'>
        Final focus
      </Button>
    </div>
  )
}

/* "Outside scroll dialog" */
function OutsideScrollDialog () {
  const popupRef = React.useRef<HTMLDivElement | null>(null)

  return (
    <Dialog>
      <DialogTrigger>Open dialog</DialogTrigger>
      <DialogPortal>
        <DialogBackdrop className='bg-black/20 transition-opacity duration-[600ms]' />
        <DialogViewport className='group/dialog'>
          <ScrollArea className='h-full'>
            <ScrollAreaViewport className='h-full'>
              <ScrollAreaContent className='flex min-h-full items-center justify-center'>
                <DialogPopup
                  ref={popupRef}
                  initialFocus={popupRef}
                  className='relative mx-auto my-16 max-w-lg translate-x-0 translate-y-0 scale-100'
                >
                  <div className='relative flex flex-col gap-1 pr-8'>
                    <DialogTitle>Dialog</DialogTitle>
                    <DialogDescription>
                      This layout keeps an outer container scrollable while the dialog can extend past the bottom edge.
                    </DialogDescription>
                    <DialogClose
                      aria-label='Close'
                      className='absolute -top-1 -right-1 size-8 border-0 bg-transparent p-0 hover:bg-accent'
                    >
                      <XIcon />
                    </DialogClose>
                  </div>
                  <div className='flex flex-col gap-4'>
                    {LOREM_SECTIONS.map((item) => (
                      <section key={item.title} className='flex flex-col gap-1'>
                        <h3 className='h6 sub-heading'>{item.title}</h3>
                        <p className='text-sm text-muted-foreground'>{item.body}</p>
                      </section>
                    ))}
                  </div>
                </DialogPopup>
              </ScrollAreaContent>
            </ScrollAreaViewport>
            <ScrollAreaScrollbar className='bg-foreground/10'>
              <ScrollAreaThumb className='bg-foreground/30' />
            </ScrollAreaScrollbar>
          </ScrollArea>
        </DialogViewport>
      </DialogPortal>
    </Dialog>
  )
}

/* "Inside scroll dialog" */
function InsideScrollDialog () {
  return (
    <Dialog>
      <DialogTrigger>Open dialog</DialogTrigger>
      <DialogPortal>
        <DialogBackdrop />
        <DialogViewport>
          <DialogPopup className='max-h-[80vh]'>
            <DialogHeader>
              <DialogTitle>Dialog</DialogTitle>
              <DialogDescription>
                This layout keeps the popup fully on screen while allowing its content to scroll.
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className='max-h-64'>
              <ScrollAreaViewport>
                <ScrollAreaContent>
                  {LOREM_SECTIONS.map((item) => (
                    <section key={item.title} className='flex flex-col gap-1'>
                      <h3 className='h6 sub-heading'>{item.title}</h3>
                      <p className='text-sm text-muted-foreground'>{item.body}</p>
                    </section>
                  ))}
                </ScrollAreaContent>
              </ScrollAreaViewport>
              <ScrollAreaScrollbar className='bg-foreground/10'>
                <ScrollAreaThumb className='bg-foreground/30' />
              </ScrollAreaScrollbar>
            </ScrollArea>
            <DialogFooter>
              <DialogClose>Close</DialogClose>
            </DialogFooter>
          </DialogPopup>
        </DialogViewport>
      </DialogPortal>
    </Dialog>
  )
}

/* "Placing elements outside the popup" */
function UncontainedDialog () {
  return (
    <Dialog>
      <DialogTrigger>Open dialog</DialogTrigger>
      <DialogPortal>
        <DialogBackdrop />
        <DialogViewport className='flex items-center justify-center'>
          <DialogPopup className='pointer-events-none w-auto max-w-none translate-x-0 translate-y-0 scale-100 bg-transparent p-0 shadow-none'>
            <DialogClose
              aria-label='Close'
              className='pointer-events-auto absolute -top-2 -right-2 z-10 size-8 border-0 bg-transparent p-0 hover:bg-accent'
            >
              <XIcon />
            </DialogClose>
            <div className='pointer-events-auto flex w-72 flex-col gap-4 rounded-(--radius) border border-border bg-background p-6 text-foreground shadow-lg'>
              <DialogHeader>
                <DialogTitle>Uncontained dialog</DialogTitle>
                <DialogDescription>
                  The popup has no visual styles. The inner element carries the panel styles, so the close button can
                  sit outside the coloured area while staying in the tab order.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose>Close</DialogClose>
              </DialogFooter>
            </div>
          </DialogPopup>
        </DialogViewport>
      </DialogPortal>
    </Dialog>
  )
}

/* "Controlled mode with multiple triggers" */
function ControlledTriggers () {
  const [open, setOpen] = React.useState(false)
  const [triggerId, setTriggerId] = React.useState<string | null>(null)

  const handleOpenChange = (isOpen: boolean, eventDetails: DialogChangeEventDetails) => {
    setOpen(isOpen)
    setTriggerId(eventDetails.trigger?.id ?? null)
  }

  return (
    <div className='flex flex-wrap items-center gap-3'>
      <DialogTrigger handle={controlledDialog} id='trigger-1'>
        Trigger 1
      </DialogTrigger>
      <DialogTrigger handle={controlledDialog} id='trigger-2'>
        Trigger 2
      </DialogTrigger>
      <DialogTrigger handle={controlledDialog} id='trigger-3'>
        Trigger 3
      </DialogTrigger>
      <Button
        variant='outline'
        onClick={() => {
          setTriggerId('trigger-2')
          setOpen(true)
        }}
      >
        Open programmatically
      </Button>

      <Dialog handle={controlledDialog} open={open} onOpenChange={handleOpenChange} triggerId={triggerId}>
        <DialogPortal>
          <DialogBackdrop />
          <DialogPopup>
            <DialogHeader>
              <DialogTitle>Dialog</DialogTitle>
              <DialogDescription>
                This has been opened by <code>{triggerId ?? 'unknown'}</code>.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose>Close</DialogClose>
            </DialogFooter>
          </DialogPopup>
        </DialogPortal>
      </Dialog>
    </div>
  )
}

export const demo: DemoMeta = {
  id: 'dialog',
  title: 'Dialog',
  description: 'A high-quality, unstyled React dialog component that opens on top of the entire page.',
  group: 'Overlays',
  variants: [
    {
      name: 'Default',
      render: () => (
        <Dialog>
          <DialogTrigger>View notifications</DialogTrigger>
          <DialogPortal>
            <DialogBackdrop />
            <DialogPopup>
              <DialogHeader>
                <DialogTitle>Notifications</DialogTitle>
                <DialogDescription>You are all caught up. Good job!</DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose>Close</DialogClose>
              </DialogFooter>
            </DialogPopup>
          </DialogPortal>
        </Dialog>
      )
    },
    {
      name: 'State',
      render: () => <StateExample />
    },
    {
      name: 'Open from a menu',
      render: () => <OpenFromMenu />
    },
    {
      name: 'Nested dialogs',
      render: () => <NestedDialogs />
    },
    {
      name: 'Close confirmation',
      render: () => <CloseConfirmation />
    },
    {
      name: 'Custom focus management',
      render: () => <CustomFocusManagement />
    },
    {
      name: 'Outside scroll dialog',
      render: () => <OutsideScrollDialog />
    },
    {
      name: 'Inside scroll dialog',
      render: () => <InsideScrollDialog />
    },
    {
      name: 'Placing elements outside the popup',
      render: () => <UncontainedDialog />
    },
    {
      name: 'Detached triggers',
      render: () => (
        <div className='flex flex-wrap items-center gap-3'>
          <DialogTrigger handle={detachedDialog}>View notifications</DialogTrigger>

          <Dialog handle={detachedDialog}>
            <DialogPortal>
              <DialogBackdrop />
              <DialogPopup>
                <DialogHeader>
                  <DialogTitle>Notifications</DialogTitle>
                  <DialogDescription>You are all caught up. Good job!</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose>Close</DialogClose>
                </DialogFooter>
              </DialogPopup>
            </DialogPortal>
          </Dialog>
        </div>
      )
    },
    {
      name: 'Multiple triggers',
      render: () => (
        <div className='flex flex-wrap items-center gap-3'>
          <DialogTrigger handle={payloadDialog} payload={{ text: 'Trigger 1' }}>
            Trigger 1
          </DialogTrigger>
          <DialogTrigger handle={payloadDialog} payload={{ text: 'Trigger 2' }}>
            Trigger 2
          </DialogTrigger>
          <DialogTrigger handle={payloadDialog} payload={{ text: 'Trigger 3' }}>
            Trigger 3
          </DialogTrigger>

          <Dialog handle={payloadDialog}>
            {({ payload }) => (
              <DialogPortal>
                <DialogBackdrop />
                <DialogPopup>
                  <DialogHeader>
                    <DialogTitle>Dialog</DialogTitle>
                    {payload !== undefined && (
                      <DialogDescription>This has been opened by {payload.text}</DialogDescription>
                    )}
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose>Close</DialogClose>
                  </DialogFooter>
                </DialogPopup>
              </DialogPortal>
            )}
          </Dialog>
        </div>
      )
    },
    {
      name: 'Controlled mode with multiple triggers',
      render: () => <ControlledTriggers />
    }
  ]
}
