import * as React from 'react'
import { CaretDownIcon } from '@phosphor-icons/react'
import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogClose,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogPopup,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
  createHandle,
  type AlertDialogChangeEventDetails
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogBackdrop,
  DialogClose,
  DialogFooter,
  DialogPopup,
  DialogPortal,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Menu, MenuItem, MenuPortal, MenuPositioner, MenuPopup, MenuSeparator, MenuTrigger } from '@/components/ui/menu'
import type { DemoMeta } from '@/showcase/demo'

/* "Detached triggers" */
const detachedAlert = createHandle()

/* "Multiple triggers" */
const payloadAlert = createHandle<{ text: string }>()

/* "Controlled mode with multiple triggers" */
const controlledAlert = createHandle()

const MENU_ITEMS = ['Discard draft', 'Duplicate draft', 'Export draft']

/* "Open from a menu" */
function OpenFromMenu () {
  const [alertOpen, setAlertOpen] = React.useState(false)

  return (
    <div className='flex flex-col items-start gap-3'>
      <Menu>
        <MenuTrigger
          render={
            <Button variant='outline'>
              Document actions <CaretDownIcon />
            </Button>
          }
        />
        <MenuPortal>
          <MenuPositioner sideOffset={8} align='start'>
            <MenuPopup className='w-56'>
              {MENU_ITEMS.map((item, index) => (
                <React.Fragment key={item}>
                  {index === 2 && <MenuSeparator className='my-1' />}
                  {/* Open the alert dialog when the menu item is clicked */}
                  <MenuItem onClick={() => setAlertOpen(true)}>{item}</MenuItem>
                </React.Fragment>
              ))}
            </MenuPopup>
          </MenuPositioner>
        </MenuPortal>
      </Menu>

      <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
        <AlertDialogPortal>
          <AlertDialogBackdrop />
          <AlertDialogPopup className='sm:max-w-md'>
            <AlertDialogHeader>
              <AlertDialogTitle>Discard draft?</AlertDialogTitle>
              <AlertDialogDescription>
                This action requires a response and cannot be dismissed by clicking outside.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogClose>Cancel</AlertDialogClose>
              <Button variant='destructive' onClick={() => setAlertOpen(false)}>
                Discard
              </Button>
            </AlertDialogFooter>
          </AlertDialogPopup>
        </AlertDialogPortal>
      </AlertDialog>
    </div>
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
      <DialogTrigger render={<Button variant='outline'>Tweet</Button>} />
      <DialogPortal>
        <DialogBackdrop />
        <DialogPopup className='sm:max-w-md'>
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
          <AlertDialogBackdrop />
          <AlertDialogPopup className='sm:max-w-md'>
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

/* "Controlled mode with multiple triggers" */
function ControlledTriggers () {
  const [open, setOpen] = React.useState(false)
  const [triggerId, setTriggerId] = React.useState<string | null>(null)

  const handleOpenChange = (isOpen: boolean, eventDetails: AlertDialogChangeEventDetails) => {
    setOpen(isOpen)
    setTriggerId(eventDetails.trigger?.id ?? null)
  }

  return (
    <div className='flex flex-wrap items-center gap-3'>
      <AlertDialogTrigger
        handle={controlledAlert}
        id='trigger-1'
        render={<Button variant='outline'>Trigger 1</Button>}
      />
      <AlertDialogTrigger
        handle={controlledAlert}
        id='trigger-2'
        render={<Button variant='outline'>Trigger 2</Button>}
      />
      <AlertDialogTrigger
        handle={controlledAlert}
        id='trigger-3'
        render={<Button variant='outline'>Trigger 3</Button>}
      />
      <Button
        variant='outline'
        onClick={() => {
          setTriggerId('trigger-2')
          setOpen(true)
        }}
      >
        Open programmatically
      </Button>

      <AlertDialog handle={controlledAlert} open={open} onOpenChange={handleOpenChange} triggerId={triggerId}>
        <AlertDialogPortal>
          <AlertDialogBackdrop />
          <AlertDialogPopup className='sm:max-w-md'>
            <AlertDialogHeader>
              <AlertDialogTitle>Discard draft?</AlertDialogTitle>
              <AlertDialogDescription>
                You can&apos;t undo this action. Opened by <code>{triggerId ?? 'unknown'}</code>.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogClose>Cancel</AlertDialogClose>
              <Button variant='destructive' onClick={() => setOpen(false)}>
                Discard
              </Button>
            </AlertDialogFooter>
          </AlertDialogPopup>
        </AlertDialogPortal>
      </AlertDialog>
    </div>
  )
}

export const demo: DemoMeta = {
  id: 'alert-dialog',
  title: 'Alert Dialog',
  description: 'A high-quality, unstyled React alert dialog component that requires a user response to proceed.',
  group: 'Overlays',
  variants: [
    {
      name: 'Default',
      render: () => (
        <AlertDialog>
          <AlertDialogTrigger render={<Button variant='destructive'>Discard draft</Button>} />
          <AlertDialogPortal>
            <AlertDialogBackdrop />
            <AlertDialogPopup className='sm:max-w-md'>
              <AlertDialogHeader>
                <AlertDialogTitle>Discard draft?</AlertDialogTitle>
                <AlertDialogDescription>You can&apos;t undo this action.</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogClose>Cancel</AlertDialogClose>
                <AlertDialogClose className='border-destructive bg-destructive text-white hover:bg-destructive/90'>
                  Discard
                </AlertDialogClose>
              </AlertDialogFooter>
            </AlertDialogPopup>
          </AlertDialogPortal>
        </AlertDialog>
      )
    },
    {
      name: 'Open from a menu',
      render: () => <OpenFromMenu />
    },
    {
      name: 'Close confirmation',
      render: () => <CloseConfirmation />
    },
    {
      name: 'Detached triggers',
      render: () => (
        <div className='flex flex-wrap items-center gap-3'>
          <AlertDialogTrigger handle={detachedAlert} render={<Button variant='outline'>Discard draft</Button>} />

          <AlertDialog handle={detachedAlert}>
            <AlertDialogPortal>
              <AlertDialogBackdrop />
              <AlertDialogPopup className='sm:max-w-md'>
                <AlertDialogHeader>
                  <AlertDialogTitle>Discard draft?</AlertDialogTitle>
                  <AlertDialogDescription>You can&apos;t undo this action.</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogClose>Cancel</AlertDialogClose>
                  <Button variant='destructive'>Discard</Button>
                </AlertDialogFooter>
              </AlertDialogPopup>
            </AlertDialogPortal>
          </AlertDialog>
        </div>
      )
    },
    {
      name: 'Multiple triggers',
      render: () => (
        <div className='flex flex-wrap items-center gap-3'>
          <AlertDialogTrigger handle={payloadAlert} payload={{ text: 'Trigger 1' }} render={<Button variant='outline'>Trigger 1</Button>} />
          <AlertDialogTrigger handle={payloadAlert} payload={{ text: 'Trigger 2' }} render={<Button variant='outline'>Trigger 2</Button>} />
          <AlertDialogTrigger handle={payloadAlert} payload={{ text: 'Trigger 3' }} render={<Button variant='outline'>Trigger 3</Button>} />

          <AlertDialog handle={payloadAlert}>
            {({ payload }) => (
              <AlertDialogPortal>
                <AlertDialogBackdrop />
                <AlertDialogPopup className='sm:max-w-md'>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Discard draft?</AlertDialogTitle>
                    {payload !== undefined && (
                      <AlertDialogDescription>This has been opened by {payload.text}</AlertDialogDescription>
                    )}
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogClose>Cancel</AlertDialogClose>
                    <Button variant='destructive'>Discard</Button>
                  </AlertDialogFooter>
                </AlertDialogPopup>
              </AlertDialogPortal>
            )}
          </AlertDialog>
        </div>
      )
    },
    {
      name: 'Controlled mode with multiple triggers',
      render: () => <ControlledTriggers />
    }
  ]
}
