import * as React from 'react'
import { ArrowUUpLeftIcon, CheckCircleIcon, InfoIcon, WarningCircleIcon, WarningIcon } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import {
  ProgressStepIndicator,
  type ProgressIndicatorStep,
  type ProgressStepStatus
} from '@/components/ui/progress-indicator'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import {
  Drawer,
  DrawerBackdrop,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerPopup,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
  DrawerViewport
} from '@/components/ui/drawer'
import {
  ToastAction,
  ToastClose,
  ToastContent,
  ToastDescription,
  ToastPortal,
  ToastProvider,
  ToastRoot,
  ToastTitle,
  ToastViewport,
  createToastManager,
  useToastManager
} from '@/components/ui/toast'
import { Meter, MeterLabel, MeterTrack, MeterIndicator } from '@/components/ui/meter'
import { Progress, ProgressLabel, ProgressTrack, ProgressIndicator } from '@/components/ui/progress'
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipPortal,
  TooltipPositioner,
  TooltipPopup
} from '@/components/ui/tooltip'
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogPortal,
  AlertDialogBackdrop,
  AlertDialogViewport,
  AlertDialogPopup,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogClose,
  AlertDialogFooter
} from '@/components/ui/alert-dialog'
import {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogBackdrop,
  DialogViewport,
  DialogPopup,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogFooter
} from '@/components/ui/dialog'
import {
  Popover,
  PopoverTrigger,
  PopoverPortal,
  PopoverPositioner,
  PopoverPopup,
  PopoverTitle,
  PopoverDescription
} from '@/components/ui/popover'
import {
  PreviewCard,
  PreviewCardTrigger,
  PreviewCardPortal,
  PreviewCardPositioner,
  PreviewCardPopup
} from '@/components/ui/preview-card'
import { ButtonSpecimenContent, isIconSize } from './actions'

export const ALERT_VARIANTS_CONTENT: Record<string, { icon: React.ReactNode; title: string; description: string }> = {
  default: {
    icon: <InfoIcon className='size-5 shrink-0' aria-hidden='true' />,
    title: 'Heads up',
    description: 'Review this information before continuing your mission setup.'
  },
  info: {
    icon: <InfoIcon className='size-5 shrink-0' aria-hidden='true' />,
    title: 'New flight plan tools',
    description: 'Drafts now support reusable routes and shared checkpoints.'
  },
  success: {
    icon: <CheckCircleIcon className='size-5 shrink-0' aria-hidden='true' />,
    title: 'Mission saved',
    description: 'Your changes are ready for review.'
  },
  warning: {
    icon: <WarningIcon className='size-5 shrink-0' aria-hidden='true' />,
    title: 'Battery reserve is low',
    description: 'Check the return-to-home margin before launching.'
  },
  destructive: {
    icon: <WarningCircleIcon className='size-5 shrink-0' aria-hidden='true' />,
    title: 'Connection lost',
    description: 'Telemetry stopped. Confirm the aircraft link before proceeding.'
  }
}

export function AlertSpecimen({ variant = 'default' }: { variant?: string }) {
  const content = ALERT_VARIANTS_CONTENT[variant] ?? ALERT_VARIANTS_CONTENT.default
  return (
    <Alert variant={variant as React.ComponentProps<typeof Alert>['variant']} className='w-full max-w-xl'>
      {content.icon}
      <div className='grid gap-1'>
        <AlertTitle>{content.title}</AlertTitle>
        <AlertDescription>{content.description}</AlertDescription>
      </div>
    </Alert>
  )
}

/* ------------------------------------------------------------------ Drawer */

export function DrawerSpecimen({
  side = 'bottom',
  buttonVariant = 'outline',
  buttonSize = 'default'
}: {
  side?: string
  buttonVariant?: string
  buttonSize?: string
}) {
  return (
    <Drawer>
      <DrawerTrigger
        aria-label={isIconSize(buttonSize) ? `Open ${side} drawer` : undefined}
        render={
          <Button
            variant={buttonVariant as React.ComponentProps<typeof Button>['variant']}
            size={buttonSize as React.ComponentProps<typeof Button>['size']}
          >
            <ButtonSpecimenContent size={buttonSize} label={side} />
          </Button>
        }
      />
      <DrawerPortal>
        <DrawerBackdrop />
        <DrawerViewport side={side as React.ComponentProps<typeof DrawerViewport>['side']}>
          <DrawerPopup side={side as React.ComponentProps<typeof DrawerPopup>['side']}>
            <DrawerContent>
              <DrawerTitle>{side} drawer</DrawerTitle>
              <DrawerDescription>Opens from the {side} edge of the viewport.</DrawerDescription>
              <DrawerClose
                variant={buttonVariant as React.ComponentProps<typeof DrawerClose>['variant']}
                size={buttonSize as React.ComponentProps<typeof DrawerClose>['size']}
                className='self-start'
                aria-label={isIconSize(buttonSize) ? 'Close drawer' : undefined}
              >
                <ButtonSpecimenContent size={buttonSize} label='Close' close />
              </DrawerClose>
            </DrawerContent>
          </DrawerPopup>
        </DrawerViewport>
      </DrawerPortal>
    </Drawer>
  )
}

/* ------------------------------------------------------------------- Toast */

export type ToastType = 'success' | 'error' | 'warning' | 'loading'

export function ToastSpecimen({
  label,
  layout,
  type,
  closeSize,
  closeVariant,
  actionSize,
  actionVariant
}: {
  label: string
  layout?: 'stacked' | 'flat'
  type?: ToastType
  closeSize?: 'default' | 'sm' | 'icon'
  closeVariant?: 'outline' | 'ghost'
  actionSize?: 'default' | 'sm' | 'icon'
  actionVariant?: 'outline' | 'ghost'
}) {
  const [manager] = React.useState(createToastManager)

  return (
    <ToastProvider toastManager={manager}>
      <Button
        size='sm'
        variant='outline'
        onClick={() =>
          manager.add({
            title: label,
            description: 'Live toast from the reference sheet.',
            type
          })
        }
      >
        {label}
      </Button>
      <ToastPortal>
        <ToastViewport>
          <ToastList
            layout={layout}
            closeSize={closeSize}
            closeVariant={closeVariant}
            actionSize={actionSize}
            actionVariant={actionVariant}
          />
        </ToastViewport>
      </ToastPortal>
    </ToastProvider>
  )
}

export function ToastList({
  layout,
  closeSize,
  closeVariant,
  actionSize,
  actionVariant
}: {
  layout?: 'stacked' | 'flat'
  closeSize?: 'default' | 'sm' | 'icon'
  closeVariant?: 'outline' | 'ghost'
  actionSize?: 'default' | 'sm' | 'icon'
  actionVariant?: 'outline' | 'ghost'
}) {
  const { toasts } = useToastManager()
  return toasts.map((toast) => (
    <ToastRoot key={toast.id} toast={toast} layout={layout}>
      <ToastContent>
        <div className='flex min-w-0 flex-1 flex-col gap-1'>
          <ToastTitle />
          <ToastDescription />
        </div>
        <div className='flex shrink-0 items-center gap-2'>
          {(actionSize || actionVariant) && (
            <ToastAction
              size={actionSize}
              variant={actionVariant}
              aria-label={actionSize === 'icon' ? 'Undo' : undefined}
            >
              {actionSize === 'icon' ? <ArrowUUpLeftIcon aria-hidden /> : 'Undo'}
            </ToastAction>
          )}
          <ToastClose size={closeSize} variant={closeVariant} aria-label='Dismiss' />
        </div>
      </ToastContent>
    </ToastRoot>
  ))
}

/* ---------------------------------------------------------------- Meter */

export function MeterSpecimen() {
  return (
    <Meter value={60}>
      <MeterLabel>Disk usage</MeterLabel>
      <MeterTrack>
        <MeterIndicator className='w-60' />
      </MeterTrack>
      <span className='text-right text-sm text-foreground'>60%</span>
    </Meter>
  )
}

/* ------------------------------------------------------------- Progress */

export function ProgressSpecimen({ state = 'determinate' }: { state?: string }) {
  const isIndeterminate = state === 'indeterminate'
  return (
    <Progress value={isIndeterminate ? null : 60} className='w-60'>
      <ProgressLabel>{isIndeterminate ? 'Connecting...' : 'Upload'}</ProgressLabel>
      <ProgressTrack>
        <ProgressIndicator />
      </ProgressTrack>
      {!isIndeterminate && <span className='text-right text-sm text-foreground'>60%</span>}
    </Progress>
  )
}

/* ------------------------------------------------------------- Tooltip */

export function TooltipSpecimen({ variant, size }: { variant?: string; size?: string }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          aria-label={isIconSize(size) ? 'Show tooltip' : undefined}
          render={
            <Button
              variant={variant as React.ComponentProps<typeof Button>['variant']}
              size={size as React.ComponentProps<typeof Button>['size']}
            >
              <ButtonSpecimenContent size={size} label='Hover me' />
            </Button>
          }
        />
        <TooltipPortal>
          <TooltipPositioner>
            <TooltipPopup>This is a tooltip.</TooltipPopup>
          </TooltipPositioner>
        </TooltipPortal>
      </Tooltip>
    </TooltipProvider>
  )
}

/* --------------------------------------------------------- Alert dialog */

export function AlertDialogSpecimen({
  buttonVariant = 'outline',
  buttonSize = 'default'
}: {
  buttonVariant?: string
  buttonSize?: string
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger
        aria-label={isIconSize(buttonSize) ? 'Open alert dialog' : undefined}
        render={
          <Button
            variant={buttonVariant as React.ComponentProps<typeof Button>['variant']}
            size={buttonSize as React.ComponentProps<typeof Button>['size']}
          >
            <ButtonSpecimenContent size={buttonSize} label='Open alert dialog' />
          </Button>
        }
      />
      <AlertDialogPortal>
        <AlertDialogBackdrop />
        <AlertDialogViewport>
          <AlertDialogPopup>
            <AlertDialogTitle>Delete item?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
            <AlertDialogFooter>
              <AlertDialogClose
                variant={buttonVariant as React.ComponentProps<typeof AlertDialogClose>['variant']}
                size={buttonSize as React.ComponentProps<typeof AlertDialogClose>['size']}
                aria-label={isIconSize(buttonSize) ? 'Cancel' : undefined}
              >
                <ButtonSpecimenContent size={buttonSize} label='Cancel' close />
              </AlertDialogClose>
              <AlertDialogClose
                variant='destructive'
                size={buttonSize as React.ComponentProps<typeof AlertDialogClose>['size']}
                aria-label={isIconSize(buttonSize) ? 'Delete item' : undefined}
              >
                <ButtonSpecimenContent size={buttonSize} label='Delete' close />
              </AlertDialogClose>
            </AlertDialogFooter>
          </AlertDialogPopup>
        </AlertDialogViewport>
      </AlertDialogPortal>
    </AlertDialog>
  )
}

/* --------------------------------------------------------------- Dialog */

export function DialogSpecimen({
  buttonVariant = 'outline',
  buttonSize = 'default'
}: {
  buttonVariant?: string
  buttonSize?: string
}) {
  return (
    <Dialog>
      <DialogTrigger
        aria-label={isIconSize(buttonSize) ? 'Open dialog' : undefined}
        render={
          <Button
            variant={buttonVariant as React.ComponentProps<typeof Button>['variant']}
            size={buttonSize as React.ComponentProps<typeof Button>['size']}
          >
            <ButtonSpecimenContent size={buttonSize} label='Open dialog' />
          </Button>
        }
      />
      <DialogPortal>
        <DialogBackdrop />
        <DialogViewport>
          <DialogPopup>
            <DialogTitle>Dialog title</DialogTitle>
            <DialogDescription>Dialog description goes here.</DialogDescription>
            <DialogFooter>
              <DialogClose
                variant={buttonVariant as React.ComponentProps<typeof DialogClose>['variant']}
                size={buttonSize as React.ComponentProps<typeof DialogClose>['size']}
                aria-label={isIconSize(buttonSize) ? 'Cancel' : undefined}
              >
                <ButtonSpecimenContent size={buttonSize} label='Cancel' close />
              </DialogClose>
              <DialogClose
                variant={buttonVariant as React.ComponentProps<typeof DialogClose>['variant']}
                size={buttonSize as React.ComponentProps<typeof DialogClose>['size']}
                aria-label={isIconSize(buttonSize) ? 'Save' : undefined}
              >
                <ButtonSpecimenContent size={buttonSize} label='Save' close />
              </DialogClose>
            </DialogFooter>
          </DialogPopup>
        </DialogViewport>
      </DialogPortal>
    </Dialog>
  )
}

/* ------------------------------------------------------------- Popover */

export function PopoverSpecimen({ variant, size }: { variant?: string; size?: string }) {
  return (
    <Popover>
      <PopoverTrigger
        aria-label={isIconSize(size) ? 'Open popover' : undefined}
        render={
          <Button
            variant={variant as React.ComponentProps<typeof Button>['variant']}
            size={size as React.ComponentProps<typeof Button>['size']}
          >
            <ButtonSpecimenContent size={size} label='Open popover' />
          </Button>
        }
      />
      <PopoverPortal>
        <PopoverPositioner>
          <PopoverPopup>
            <PopoverTitle>Popover title</PopoverTitle>
            <PopoverDescription>Popover description goes here.</PopoverDescription>
          </PopoverPopup>
        </PopoverPositioner>
      </PopoverPortal>
    </Popover>
  )
}

/* --------------------------------------------------------- Preview card */

export function PreviewCardSpecimen({ variant = 'link', size }: { variant?: string; size?: string }) {
  return (
    <PreviewCard>
      <PreviewCardTrigger
        aria-label={isIconSize(size) ? 'View preview' : undefined}
        render={
          <Button
            variant={variant as React.ComponentProps<typeof Button>['variant']}
            size={size as React.ComponentProps<typeof Button>['size']}
          >
            <ButtonSpecimenContent size={size} label='View preview' />
          </Button>
        }
      />
      <PreviewCardPortal>
        <PreviewCardPositioner>
          <PreviewCardPopup>
            <div className='flex flex-col gap-1 p-3'>
              <p className='m-0 text-sm font-medium'>Preview title</p>
              <p className='m-0 text-sm text-muted-foreground'>Preview description goes here.</p>
            </div>
          </PreviewCardPopup>
        </PreviewCardPositioner>
      </PreviewCardPortal>
    </PreviewCard>
  )
}

/* ------------------------------------------------------ Progress indicator */

export const progressSteps: ProgressIndicatorStep[] = [
  { label: 'Details', status: 'complete' },
  { label: 'Review', status: 'current' },
  { label: 'Launch', status: 'upcoming' }
]

export function ProgressIndicatorSpecimen({
  orientation = 'horizontal',
  alignment = 'start',
  state
}: {
  orientation?: 'horizontal' | 'vertical'
  alignment?: 'start' | 'center'
  state?: ProgressStepStatus
}) {
  const steps: ProgressIndicatorStep[] = React.useMemo(() => {
    if (!state) return progressSteps
    if (state === 'error') {
      return [
        { label: 'Details', status: 'complete' },
        { label: 'Review', status: 'error', description: 'Action failed' },
        { label: 'Launch', status: 'upcoming' }
      ]
    }
    if (state === 'disabled') {
      return [
        { label: 'Details', status: 'complete' },
        { label: 'Review', status: 'current' },
        { label: 'Launch', status: 'disabled' }
      ]
    }
    if (state === 'complete') {
      return [
        { label: 'Details', status: 'complete' },
        { label: 'Review', status: 'complete' },
        { label: 'Launch', status: 'complete' }
      ]
    }
    if (state === 'upcoming') {
      return [
        { label: 'Details', status: 'upcoming' },
        { label: 'Review', status: 'upcoming' },
        { label: 'Launch', status: 'upcoming' }
      ]
    }
    return [
      { label: 'Details', status: 'complete' },
      { label: 'Review', status: 'current' },
      { label: 'Launch', status: 'upcoming' }
    ]
  }, [state])

  return (
    <div className={orientation === 'vertical' ? 'w-48' : 'w-full max-w-md'}>
      <ProgressStepIndicator steps={steps} orientation={orientation} alignment={alignment} />
    </div>
  )
}
