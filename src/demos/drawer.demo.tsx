import * as React from 'react'
import {
  createHandle,
  Drawer,
  DrawerBackdrop,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerIndent,
  DrawerIndentBackground,
  DrawerPopup,
  DrawerPortal,
  DrawerProvider,
  DrawerSwipeArea,
  DrawerTitle,
  DrawerTrigger,
  DrawerViewport,
  DrawerVirtualKeyboardProvider,
  type DrawerSnapPoint
} from '@/components/ui/drawer'
import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogClose,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogPopup,
  AlertDialogPortal,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { FieldControl, FieldLabel, FieldRoot } from '@/components/ui/field'
import {
  ScrollArea,
  ScrollAreaContent,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport
} from '@/components/ui/scroll-area'
import type { DemoMeta } from '@/showcase/demo'

const NAV_ITEMS = [
  { href: '#drawer', label: 'Overview' },
  { href: '#drawer', label: 'Components' },
  { href: '#drawer', label: 'Utilities' },
  { href: '#drawer', label: 'Releases' }
] as const

const PROFILE_ACTIONS = ['Unfollow', 'Mute', 'Add to Favourites', 'Add to Close Friends', 'Restrict'] as const

const DELIVERY_FIELDS = [
  ['Name', 'Ada Lovelace'],
  ['Phone', '+1 (555) 123-4567'],
  ['Street address', '12 Computing Way'],
  ['Apartment', 'Unit 4B'],
  ['City', 'San Francisco'],
  ['Postal code', '94107'],
  ['Delivery window', 'After 6 PM'],
  ['Backup contact', 'Grace Hopper']
] as const

/* "Detached triggers" and "Stacking and animations" */
const detachedDrawer = createHandle()
const payloadDrawer = createHandle<{ title: string }>()

const TOP_MARGIN_REM = 1
const SNAP_POINTS: DrawerSnapPoint[] = [`${30 + TOP_MARGIN_REM}rem`, 1]

/* Drawer handle bar shown at the top of every bottom sheet. */
function Handle() {
  return <div aria-hidden className='mx-auto mb-2 h-1 w-12 shrink-0 rounded-sm bg-muted-foreground/30' />
}

/* "State" */
function StateExample() {
  const [open, setOpen] = React.useState(false)
  const [events, setEvents] = React.useState<string[]>([])

  return (
    <div className='flex flex-col items-start gap-3'>
      <div className='flex flex-wrap gap-3'>
        <Drawer>
          <DrawerTrigger>Uncontrolled</DrawerTrigger>
          <DrawerPortal>
            <DrawerBackdrop />
            <DrawerViewport>
              <DrawerPopup>
                <Handle />
                <DrawerContent>
                  <DrawerTitle>Uncontrolled drawer</DrawerTitle>
                  <DrawerDescription>
                    The drawer owns its open state and is dismissed by backdrop press, Escape or a swipe.
                  </DrawerDescription>
                  <DrawerClose className='self-start'>Close</DrawerClose>
                </DrawerContent>
              </DrawerPopup>
            </DrawerViewport>
          </DrawerPortal>
        </Drawer>

        <Button
          variant='outline'
          onClick={() => {
            setOpen(true)
            setEvents((prev) => ['opened imperatively', ...prev].slice(0, 3))
          }}
        >
          Controlled
        </Button>
      </div>

      <Drawer
        open={open}
        onOpenChange={(nextOpen, eventDetails) => {
          setOpen(nextOpen)
          setEvents((prev) => [String(eventDetails.reason), ...prev].slice(0, 3))
        }}
      >
        <DrawerPortal>
          <DrawerBackdrop />
          <DrawerViewport>
            <DrawerPopup>
              <Handle />
              <DrawerContent>
                <DrawerTitle>Controlled drawer</DrawerTitle>
                <DrawerDescription>
                  <code>open</code> and <code>onOpenChange</code> drive this drawer, so it can be opened from anywhere
                  in the app.
                </DrawerDescription>
                <DrawerClose className='self-start'>Close</DrawerClose>
              </DrawerContent>
            </DrawerPopup>
          </DrawerViewport>
        </DrawerPortal>
      </Drawer>

      <ul className='flex flex-col gap-1 text-xs text-muted-foreground'>
        {events.map((entry, index) => (
          <li key={`${entry}-${index}`}>{entry}</li>
        ))}
      </ul>
    </div>
  )
}

/* "Position" — every documented swipe direction. */
function PositionExample() {
  return (
    <div className='flex flex-wrap gap-3'>
      <Drawer>
        <DrawerTrigger>Open bottom drawer</DrawerTrigger>
        <DrawerPortal>
          <DrawerBackdrop />
          <DrawerViewport>
            <DrawerPopup>
              <Handle />
              <DrawerContent>
                <DrawerTitle>Notifications</DrawerTitle>
                <DrawerDescription>You are all caught up. Good job! Swipe down to dismiss.</DrawerDescription>
                <DrawerClose className='self-start'>Close</DrawerClose>
              </DrawerContent>
            </DrawerPopup>
          </DrawerViewport>
        </DrawerPortal>
      </Drawer>

      <Drawer swipeDirection='right'>
        <DrawerTrigger>Open right drawer</DrawerTrigger>
        <DrawerPortal>
          <DrawerBackdrop />
          <DrawerViewport side='right'>
            <DrawerPopup side='right'>
              <DrawerContent>
                <DrawerTitle>Library</DrawerTitle>
                <DrawerDescription>Swipe right to dismiss.</DrawerDescription>
                <DrawerClose className='self-start'>Close</DrawerClose>
              </DrawerContent>
            </DrawerPopup>
          </DrawerViewport>
        </DrawerPortal>
      </Drawer>

      <Drawer swipeDirection='left'>
        <DrawerTrigger>Open left drawer</DrawerTrigger>
        <DrawerPortal>
          <DrawerBackdrop />
          <DrawerViewport side='left'>
            <DrawerPopup side='left'>
              <DrawerContent>
                <DrawerTitle>Filters</DrawerTitle>
                <DrawerDescription>Swipe left to dismiss.</DrawerDescription>
                <DrawerClose className='self-start'>Close</DrawerClose>
              </DrawerContent>
            </DrawerPopup>
          </DrawerViewport>
        </DrawerPortal>
      </Drawer>

      <Drawer swipeDirection='up'>
        <DrawerTrigger>Open top drawer</DrawerTrigger>
        <DrawerPortal>
          <DrawerBackdrop />
          <DrawerViewport side='top'>
            <DrawerPopup side='top'>
              <Handle />
              <DrawerContent>
                <DrawerTitle>Search</DrawerTitle>
                <DrawerDescription>Swipe up to dismiss.</DrawerDescription>
                <DrawerClose className='self-start'>Close</DrawerClose>
              </DrawerContent>
            </DrawerPopup>
          </DrawerViewport>
        </DrawerPortal>
      </Drawer>
    </div>
  )
}

/* Shared stacking styles for nested drawers. */
const stackStyles =
  '[--stack-step:0.05] [--peek:3rem] ' +
  '[transform:translateY(var(--drawer-swipe-movement-y,0px))_scale(calc(1-(var(--nested-drawers,0)*var(--stack-step))))] ' +
  'transition-[transform,margin] duration-[450ms] ease-[cubic-bezier(0.32,0.72,0,1)]'

const nestedPeek = 'data-[nested-drawer-open]:-mt-[calc(var(--peek)*var(--nested-drawers,0))]'

function SecurityDrawer() {
  return (
    <Drawer>
      <DrawerTrigger render={<Button variant='secondary'>Security settings</Button>} />
      <DrawerPortal>
        <DrawerBackdrop />
        <DrawerViewport>
          <DrawerPopup className={`${stackStyles} ${nestedPeek}`}>
            <Handle />
            <DrawerContent>
              <DrawerTitle>Security</DrawerTitle>
              <DrawerDescription>Review sign-in activity and update your security preferences.</DrawerDescription>
              <ul className='flex flex-col gap-1 text-sm text-muted-foreground'>
                <li>Passkeys enabled</li>
                <li>2FA via authenticator app</li>
                <li>3 signed-in devices</li>
              </ul>
              <DrawerClose className='self-start'>Close</DrawerClose>
            </DrawerContent>
          </DrawerPopup>
        </DrawerViewport>
      </DrawerPortal>
    </Drawer>
  )
}

function AdvancedDrawer() {
  return (
    <Drawer>
      <DrawerTrigger render={<Button variant='secondary'>Advanced options</Button>} />
      <DrawerPortal>
        <DrawerBackdrop />
        <DrawerViewport>
          <DrawerPopup className={`${stackStyles} ${nestedPeek}`}>
            <Handle />
            <DrawerContent>
              <DrawerTitle>Advanced</DrawerTitle>
              <DrawerDescription>This drawer is taller to demonstrate variable-height stacking.</DrawerDescription>
              <div className='flex flex-col gap-2 text-sm text-muted-foreground'>
                {Array.from({ length: 6 }, (_, index) => (
                  <p key={index}>Recovery codes and session history.</p>
                ))}
              </div>
              <DrawerClose className='self-start'>Close</DrawerClose>
            </DrawerContent>
          </DrawerPopup>
        </DrawerViewport>
      </DrawerPortal>
    </Drawer>
  )
}

/* "Nested drawers" and "Stacking and animations" */
function NestedDrawers() {
  return (
    <Drawer>
      <DrawerTrigger>Open drawer stack</DrawerTrigger>
      <DrawerPortal>
        <DrawerBackdrop />
        <DrawerViewport>
          <DrawerPopup className={`${stackStyles} ${nestedPeek}`}>
            <Handle />
            <DrawerContent>
              <DrawerTitle>Account</DrawerTitle>
              <DrawerDescription>
                Nested drawers stack while each one stays independently focus managed.
              </DrawerDescription>
              <div className='flex flex-wrap gap-3'>
                <SecurityDrawer />
                <AdvancedDrawer />
              </div>
            </DrawerContent>
          </DrawerPopup>
        </DrawerViewport>
      </DrawerPortal>
    </Drawer>
  )
}

/* "Snap points" */
function SnapPoints() {
  const [snapPoint, setSnapPoint] = React.useState<DrawerSnapPoint | null>(SNAP_POINTS[0])

  return (
    <div className='flex flex-col items-start gap-3'>
      <Drawer snapPoints={SNAP_POINTS} snapPoint={snapPoint} onSnapPointChange={setSnapPoint}>
        <DrawerTrigger>Open snap drawer</DrawerTrigger>
        <DrawerPortal>
          <DrawerBackdrop />
          <DrawerViewport>
            <DrawerPopup>
              <Handle />
              <div className='flex flex-col gap-1'>
                <DrawerTitle>Snap points</DrawerTitle>
                <DrawerDescription>
                  Drag the sheet to snap between a compact peek and a near full-height view.
                </DrawerDescription>
              </div>
              <DrawerContent>
                <div aria-hidden className='flex flex-col gap-2'>
                  {Array.from({ length: 14 }, (_, index) => (
                    <div key={index} className='h-6 rounded-md bg-muted' />
                  ))}
                </div>
                <DrawerClose className='self-start'>Close</DrawerClose>
              </DrawerContent>
            </DrawerPopup>
          </DrawerViewport>
        </DrawerPortal>
      </Drawer>
      <p className='text-xs text-muted-foreground'>
        Active snap point: <code>{String(snapPoint)}</code>
      </p>
    </div>
  )
}

/* "Virtual keyboard aware" */
function VirtualKeyboardAware() {
  return (
    <Drawer>
      <DrawerTrigger>Open keyboard-aware drawer</DrawerTrigger>
      <DrawerVirtualKeyboardProvider>
        <DrawerPortal>
          <DrawerBackdrop />
          <DrawerViewport>
            <DrawerPopup className='max-h-[85vh]'>
              <Handle />
              <div className='flex items-center justify-between gap-3 border-b border-border pb-3'>
                <DrawerClose variant='ghost'>Cancel</DrawerClose>
                <DrawerTitle>Delivery details</DrawerTitle>
                <DrawerClose>Save</DrawerClose>
              </div>

              <DrawerContent className='max-w-none'>
                <ScrollArea className='max-h-72'>
                  <ScrollAreaViewport>
                    <ScrollAreaContent className='gap-4 p-0'>
                      {DELIVERY_FIELDS.map(([label, placeholder]) => (
                        <FieldRoot key={label}>
                          <FieldLabel>{label}</FieldLabel>
                          <FieldControl placeholder={placeholder} type='text' />
                        </FieldRoot>
                      ))}
                      <FieldRoot>
                        <FieldLabel>Instructions</FieldLabel>
                        <FieldControl placeholder='Gate code, drop-off spot, or anything else the driver should know' />
                      </FieldRoot>
                    </ScrollAreaContent>
                  </ScrollAreaViewport>
                  <ScrollAreaScrollbar>
                    <ScrollAreaThumb />
                  </ScrollAreaScrollbar>
                </ScrollArea>
              </DrawerContent>

              {/* Pinned footer input, lifted by the keyboard inset. */}
              <div
                className='border-t border-border pt-3'
                style={{ paddingBottom: 'var(--drawer-keyboard-inset, 0px)' }}
              >
                <FieldRoot>
                  <FieldLabel>Delivery note</FieldLabel>
                  <FieldControl placeholder='Add a note for the driver' type='text' />
                </FieldRoot>
              </div>
            </DrawerPopup>
          </DrawerViewport>
        </DrawerPortal>
      </DrawerVirtualKeyboardProvider>
    </Drawer>
  )
}

/* "Indent effect" */
function IndentEffect() {
  return (
    <DrawerProvider>
      <DrawerIndentBackground />
      <DrawerIndent className='min-h-80 border border-border p-4'>
        <div className='flex flex-col items-start gap-3'>
          <p className='text-sm text-muted-foreground'>
            The page scales down and lifts while a drawer is open, and snaps back on close.
          </p>
          <Drawer swipeDirection='right'>
            <DrawerTrigger>Open side drawer</DrawerTrigger>
            <DrawerPortal>
              <DrawerBackdrop />
              <DrawerViewport side='right'>
                <DrawerPopup side='right'>
                  <DrawerContent>
                    <DrawerTitle>Notifications</DrawerTitle>
                    <DrawerDescription>
                      This is a drawer that slides in from the side. You can swipe to dismiss it.
                    </DrawerDescription>
                    <DrawerClose className='self-start'>Close</DrawerClose>
                  </DrawerContent>
                </DrawerPopup>
              </DrawerViewport>
            </DrawerPortal>
          </Drawer>
        </div>
      </DrawerIndent>
    </DrawerProvider>
  )
}

/* "Non-modal" */
function NonModal() {
  return (
    <Drawer swipeDirection='right' modal={false} disablePointerDismissal>
      <DrawerTrigger>Open non-modal drawer</DrawerTrigger>
      <DrawerPortal>
        <DrawerViewport side='right'>
          <DrawerPopup side='right' className='max-h-full'>
            <DrawerContent>
              <DrawerTitle>Non-modal drawer</DrawerTitle>
              <DrawerDescription>
                Focus is not trapped, page scroll is not locked, and outside clicks keep the drawer open. Press Escape
                or use the button to close it.
              </DrawerDescription>
              <DrawerClose className='self-start'>Close</DrawerClose>
            </DrawerContent>
          </DrawerPopup>
        </DrawerViewport>
      </DrawerPortal>
    </Drawer>
  )
}

/* "Mobile navigation" */
function MobileNavigation() {
  return (
    <Drawer swipeDirection='up'>
      <DrawerTrigger>Open navigation</DrawerTrigger>
      <DrawerPortal>
        <DrawerBackdrop />
        <DrawerViewport side='top'>
          <DrawerPopup side='top' className='h-[85vh] max-h-[85vh] max-w-none'>
            <Handle />
            <DrawerContent className='max-w-none'>
              <DrawerTitle>Navigation</DrawerTitle>
              <DrawerDescription>
                A full-height sheet with a flick-to-dismiss gesture from the top edge.
              </DrawerDescription>
              <ScrollArea className='max-h-96'>
                <ScrollAreaViewport>
                  <ScrollAreaContent className='gap-1 p-0'>
                    {NAV_ITEMS.map((item) => (
                      <a
                        key={item.label}
                        href={item.href}
                        className='rounded-md px-2 py-2 text-sm hover:bg-accent hover:text-accent-foreground'
                      >
                        {item.label}
                      </a>
                    ))}
                  </ScrollAreaContent>
                </ScrollAreaViewport>
                <ScrollAreaScrollbar>
                  <ScrollAreaThumb />
                </ScrollAreaScrollbar>
              </ScrollArea>
            </DrawerContent>
            <DrawerClose className='mt-4 self-start'>Close</DrawerClose>
          </DrawerPopup>
        </DrawerViewport>
      </DrawerPortal>
    </Drawer>
  )
}

/* "Swipe to open" */
function SwipeToOpen() {
  const [portalContainer, setPortalContainer] = React.useState<HTMLDivElement | null>(null)

  return (
    <div
      ref={setPortalContainer}
      className='relative flex min-h-40 flex-col gap-3 overflow-hidden rounded-md border border-border p-4'
    >
      <Drawer swipeDirection='right' modal={false}>
        <DrawerSwipeArea>
          <span className='absolute right-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground'>Swipe here</span>
        </DrawerSwipeArea>
        <p className='text-sm text-muted-foreground'>Swipe from the right edge to open the drawer.</p>
        <DrawerPortal container={portalContainer}>
          <DrawerBackdrop />
          <DrawerViewport side='right'>
            <DrawerPopup side='right' className='max-h-full'>
              <DrawerContent>
                <DrawerTitle>Library</DrawerTitle>
                <DrawerDescription>
                  Swipe from the edge whenever you want to jump back into your playlists.
                </DrawerDescription>
                <DrawerClose className='self-start'>Close</DrawerClose>
              </DrawerContent>
            </DrawerPopup>
          </DrawerViewport>
        </DrawerPortal>
      </Drawer>
    </div>
  )
}

/* "Close confirmation" */
function CloseConfirmation() {
  const [drawerOpen, setDrawerOpen] = React.useState(false)
  const [confirmationOpen, setConfirmationOpen] = React.useState(false)
  const [note, setNote] = React.useState('')
  const titleId = React.useId()

  return (
    <Drawer
      open={drawerOpen}
      onOpenChange={(open, eventDetails) => {
        if (!open && note) {
          eventDetails.cancel()
          setConfirmationOpen(true)
          return
        }
        setDrawerOpen(open)
      }}
    >
      <DrawerTrigger>Compose note</DrawerTrigger>
      <DrawerPortal>
        <DrawerBackdrop />
        <DrawerViewport>
          <DrawerPopup>
            <Handle />
            <DrawerTitle id={titleId}>New note</DrawerTitle>
            <form
              className='flex flex-col gap-4'
              onSubmit={(event) => {
                event.preventDefault()
                setDrawerOpen(false)
              }}
            >
              <textarea
                aria-labelledby={titleId}
                required
                className='min-h-32 w-full resize-none rounded-md border border-input bg-background p-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none'
                placeholder="What's on your mind?"
                value={note}
                onChange={(event) => setNote(event.target.value)}
              />
              <div className='flex gap-3'>
                <DrawerClose variant='secondary'>Cancel</DrawerClose>
                <Button type='submit'>Save note</Button>
              </div>
            </form>
          </DrawerPopup>
        </DrawerViewport>
      </DrawerPortal>

      <AlertDialog open={confirmationOpen} onOpenChange={setConfirmationOpen}>
        <AlertDialogPortal>
          <AlertDialogBackdrop />
          <AlertDialogPopup>
            <AlertDialogHeader>
              <AlertDialogTitle>Discard note?</AlertDialogTitle>
              <AlertDialogDescription>Your note will be lost.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogClose>Go back</AlertDialogClose>
              <Button
                variant='destructive'
                onClick={() => {
                  setConfirmationOpen(false)
                  setNote('')
                  setDrawerOpen(false)
                }}
              >
                Discard
              </Button>
            </AlertDialogFooter>
          </AlertDialogPopup>
        </AlertDialogPortal>
      </AlertDialog>
    </Drawer>
  )
}

/* "Action sheet with separate destructive action" */
function ActionSheet() {
  const [open, setOpen] = React.useState(false)

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger>Open action sheet</DrawerTrigger>
      <DrawerPortal>
        <DrawerBackdrop />
        <DrawerViewport>
          <DrawerPopup>
            <Handle />
            <DrawerContent>
              <DrawerTitle>Profile actions</DrawerTitle>
              <DrawerDescription>Choose an action for this user.</DrawerDescription>

              <ul aria-label='Profile actions' className='flex flex-col'>
                {PROFILE_ACTIONS.map((action, index) => (
                  <li key={action}>
                    {index === 0 && <DrawerClose>Close action sheet</DrawerClose>}
                    <Button
                      type='button'
                      variant='ghost'
                      className='h-10 w-full justify-start'
                      onClick={() => setOpen(false)}
                    >
                      {action}
                    </Button>
                  </li>
                ))}
              </ul>
            </DrawerContent>
            <div className='border-t border-border pt-3'>
              <Button type='button' variant='destructive' className='w-full' onClick={() => setOpen(false)}>
                Block user
              </Button>
            </div>
          </DrawerPopup>
        </DrawerViewport>
      </DrawerPortal>
    </Drawer>
  )
}

export const demo: DemoMeta = {
  id: 'drawer',
  title: 'Drawer',
  description: 'A high-quality, unstyled React drawer component with swipe-to-dismiss gestures.',
  group: 'Overlays',
  variants: [
    {
      name: 'Default',
      render: () => (
        <Drawer swipeDirection='right'>
          <DrawerTrigger>Open drawer</DrawerTrigger>
          <DrawerPortal>
            <DrawerBackdrop />
            <DrawerViewport side='right'>
              <DrawerPopup side='right'>
                <DrawerContent>
                  <DrawerTitle>Drawer</DrawerTitle>
                  <DrawerDescription>
                    This is a drawer that slides in from the side. You can swipe to dismiss it.
                  </DrawerDescription>
                  <DrawerClose className='self-start'>Close</DrawerClose>
                </DrawerContent>
              </DrawerPopup>
            </DrawerViewport>
          </DrawerPortal>
        </Drawer>
      )
    },
    {
      name: 'State',
      render: () => <StateExample />
    },
    {
      name: 'Position',
      render: () => <PositionExample />
    },
    {
      name: 'Nested drawers',
      render: () => <NestedDrawers />
    },
    {
      name: 'Snap points',
      render: () => <SnapPoints />
    },
    {
      name: 'Virtual keyboard aware',
      render: () => <VirtualKeyboardAware />
    },
    {
      name: 'Indent effect',
      render: () => <IndentEffect />
    },
    {
      name: 'Non-modal',
      render: () => <NonModal />
    },
    {
      name: 'Mobile navigation',
      render: () => <MobileNavigation />
    },
    {
      name: 'Swipe to open',
      render: () => <SwipeToOpen />
    },
    {
      name: 'Close confirmation',
      render: () => <CloseConfirmation />
    },
    {
      name: 'Action sheet with separate destructive action',
      render: () => <ActionSheet />
    },
    {
      name: 'Detached triggers',
      render: () => (
        <div className='flex flex-col gap-6'>
          <div className='flex flex-wrap items-center gap-3'>
            <DrawerTrigger handle={detachedDrawer}>Open drawer</DrawerTrigger>

            <Drawer handle={detachedDrawer}>
              <DrawerPortal>
                <DrawerBackdrop />
                <DrawerViewport>
                  <DrawerPopup>
                    <Handle />
                    <DrawerContent>
                      <DrawerTitle>Drawer</DrawerTitle>
                      <DrawerDescription>
                        The trigger lives outside the root and controls it through a handle.
                      </DrawerDescription>
                      <DrawerClose className='self-start'>Close</DrawerClose>
                    </DrawerContent>
                  </DrawerPopup>
                </DrawerViewport>
              </DrawerPortal>
            </Drawer>
          </div>

          <div className='flex flex-wrap items-center gap-3'>
            <DrawerTrigger handle={payloadDrawer} payload={{ title: 'Profile' }}>
              Profile
            </DrawerTrigger>
            <DrawerTrigger handle={payloadDrawer} payload={{ title: 'Settings' }}>
              Settings
            </DrawerTrigger>

            <Drawer handle={payloadDrawer}>
              {({ payload }) => (
                <DrawerPortal>
                  <DrawerBackdrop />
                  <DrawerViewport>
                    <DrawerPopup>
                      <Handle />
                      <DrawerContent>
                        <DrawerTitle>{payload?.title}</DrawerTitle>
                        <DrawerDescription>
                          Each trigger passes its own payload into the drawer content.
                        </DrawerDescription>
                        <DrawerClose className='self-start'>Close</DrawerClose>
                      </DrawerContent>
                    </DrawerPopup>
                  </DrawerViewport>
                </DrawerPortal>
              )}
            </Drawer>
          </div>
        </div>
      )
    },
    {
      name: 'Stacking and animations',
      render: () => <NestedDrawers />
    }
  ]
}
