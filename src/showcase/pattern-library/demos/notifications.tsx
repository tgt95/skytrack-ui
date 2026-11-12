import { useState } from 'react'
import { Alert, AlertAction, AlertDescription, AlertTitle } from '@/components/ui/alert'
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
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { FieldControl, FieldDescription, FieldLabel, FieldRoot } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { ToastPortal, ToastProvider, ToastViewport, useToastManager } from '@/components/ui/toast'
import { DemoFrame, UseCaseSection, ToastItems } from './shared'

export function NotificationsDemo() {
  const toastManager = useToastManager()
  const [panelOpen, setPanelOpen] = useState(false)
  const [updateVisible, setUpdateVisible] = useState(true)
  const [actionMessage, setActionMessage] = useState('Choose an action to preview its local result.')
  const statuses = [
    { type: 'info', label: 'Information', message: 'A workspace update is available.' },
    { type: 'success', label: 'Success', message: 'Your changes have been saved.' },
    { type: 'warning', label: 'Warning', message: 'Review this setting before continuing.' },
    { type: 'error', label: 'Error', message: "We couldn't save your changes. Try again." }
  ] as const
  return (
    <DemoFrame>
      <UseCaseSection
        title='Keep important status in context'
        scenario='Show feedback beside the content or task it describes.'
      >
        <div className='grid gap-2 md:grid-cols-2'>
          {statuses.map(({ type, label, message }) => (
            <Alert key={type} variant={type === 'error' ? 'destructive' : type}>
              <AlertTitle>{label}</AlertTitle>
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          ))}
        </div>
      </UseCaseSection>
      <UseCaseSection
        title='Keep field guidance close to its control'
        scenario='Show a short informational note beside the control it explains.'
      >
        <div className='mx-auto w-full max-w-xl space-y-2'>
          <Alert variant='info' role='note' aria-label='Page-load callout'>
            <AlertDescription>Choose a workspace to keep related work in the right place.</AlertDescription>
          </Alert>
          <FieldRoot>
            <FieldLabel>Workspace name</FieldLabel>
            <FieldControl render={<Input value='Operations team' readOnly aria-label='Workspace name' />} />
            <FieldDescription>The callout stays beside the field it explains.</FieldDescription>
          </FieldRoot>
        </div>
      </UseCaseSection>
      <UseCaseSection
        title='Confirm a completed action briefly'
        scenario='Preview brief, noncritical feedback after a routine action. Timing and queue behavior are not specified here.'
      >
        <div className='flex flex-wrap gap-2'>
          {statuses
            .filter(({ type }) => type === 'success' || type === 'info')
            .map(({ type, label, message }) => (
              <Button
                key={type}
                size='sm'
                variant='outline'
                onClick={() => toastManager.add({ type, title: label, description: message })}
              >
                Show {label.toLowerCase()} toast
              </Button>
            ))}
        </div>
      </UseCaseSection>
      <UseCaseSection
        title='Review sample notifications in a panel'
        scenario='Explore an experimental panel concept for viewing sample notices together.'
      >
        <p className='text-xs text-muted-foreground'>
          Experimental local illustration · no history, unread state, preferences, or service is implemented.
        </p>
        <Button variant='outline' aria-expanded={panelOpen} onClick={() => setPanelOpen((open) => !open)}>
          {panelOpen ? 'Close sample panel' : 'Open sample panel'}
        </Button>
        {panelOpen && (
          <div
            role='region'
            aria-label='Notification center'
            className='max-w-xl divide-y divide-border border border-border'
          >
            <div className='space-y-1 p-3'>
              <div className='flex flex-wrap items-center gap-2'>
                <p className='font-medium'>Work · Review requested</p>
                <Badge count='Information' status='outline' />
              </div>
              <p className='text-muted-foreground'>A sample item is ready for review.</p>
            </div>
            <div className='space-y-1 p-3'>
              <div className='flex flex-wrap items-center gap-2'>
                <p className='font-medium'>Workspace · Update available</p>
                <Badge count='Success' status='success' />
              </div>
              <p className='text-muted-foreground'>A sample workspace change is complete.</p>
            </div>
            <div className='space-y-1 p-3'>
              <div className='flex flex-wrap items-center gap-2'>
                <p className='font-medium'>Collaboration · Access changed</p>
                <Badge count='Warning' status='warning' />
              </div>
              <p className='text-muted-foreground'>A sample access setting needs review.</p>
            </div>
          </div>
        )}
      </UseCaseSection>
      <UseCaseSection
        title='Offer a next step or acknowledge a critical notice'
        scenario='Compare a contextual next step, an experimental broad update concept, and a blocking acknowledgement interaction.'
      >
        <Alert variant='warning'>
          <AlertTitle>Action needed</AlertTitle>
          <AlertDescription>A sample item needs one more detail before it is ready.</AlertDescription>
          <AlertAction>
            <Button
              size='sm'
              variant='ghost'
              onClick={() => setActionMessage('Edit preview opened; no item was changed.')}
            >
              Edit description
            </Button>
          </AlertAction>
        </Alert>
        {updateVisible ? (
          <div className='space-y-2'>
            <p className='text-xs text-muted-foreground'>
              Experimental banner concept · this local Alert does not implement global placement or persistence.
            </p>
            <Alert variant='info' className='items-center'>
              <AlertDescription>
                <strong>Workspace update:</strong> A sample update is available.
              </AlertDescription>
              <AlertAction>
                <Button size='sm' variant='ghost' onClick={() => setUpdateVisible(false)}>
                  Dismiss
                </Button>
              </AlertAction>
            </Alert>
          </div>
        ) : (
          <Button size='sm' variant='outline' onClick={() => setUpdateVisible(true)}>
            Show service update
          </Button>
        )}
        <p role='status' aria-live='polite' className='text-muted-foreground'>
          {actionMessage}
        </p>
        <AlertDialog>
          <AlertDialogTrigger render={<Button variant='outline'>Show blocking acknowledgement</Button>} />
          <AlertDialogPortal>
            <AlertDialogBackdrop />
            <AlertDialogPopup>
              <AlertDialogHeader>
                <AlertDialogTitle>Sample blocking notice</AlertDialogTitle>
                <AlertDialogDescription>
                  This Alert Dialog illustrates an acknowledgement interaction. No real service status is represented.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogClose>Acknowledge</AlertDialogClose>
              </AlertDialogFooter>
            </AlertDialogPopup>
          </AlertDialogPortal>
        </AlertDialog>
      </UseCaseSection>
    </DemoFrame>
  )
}

export function NotificationsDemoWithProvider() {
  return (
    <ToastProvider>
      <NotificationsDemo />
      <ToastPortal>
        <ToastViewport>
          <ToastItems />
        </ToastViewport>
      </ToastPortal>
    </ToastProvider>
  )
}
