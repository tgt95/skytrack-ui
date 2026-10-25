import * as React from 'react'
import { CheckIcon, CircleNotchIcon, TrashIcon } from '@phosphor-icons/react'
import {
  ToastAction,
  ToastArrow,
  ToastClose,
  ToastContent,
  ToastDescription,
  ToastPortal,
  ToastPositioner,
  ToastProvider,
  ToastRoot,
  ToastTitle,
  ToastViewport,
  createToastManager,
  useToastManager,
  type ToastRootProps
} from '@/components/ui/toast'
import { Button } from '@/components/ui/button'
import type { DemoMeta } from '@/showcase/demo'

type ToastObject<Data extends object = any> = ToastRootProps<Data>['toast']

/** Stacked toast list shared by every stacked variant. */
function StackedToastList({ withClose = true }: { withClose?: boolean }) {
  const { toasts } = useToastManager()
  return toasts.map((toast) => (
    <ToastRoot key={toast.id} toast={toast}>
      <ToastContent>
        <div className='flex min-w-0 flex-1 flex-col gap-1'>
          <ToastTitle />
          <ToastDescription />
        </div>
        {withClose ? <ToastClose>Dismiss</ToastClose> : null}
      </ToastContent>
    </ToastRoot>
  ))
}

/* ------------------------------------------------------------------ hero -- */

function DefaultToastDemo() {
  return (
    <ToastProvider>
      <CreateToastButton />
      <ToastPortal>
        <ToastViewport>
          <StackedToastList />
        </ToastViewport>
      </ToastPortal>
    </ToastProvider>
  )
}

function CreateToastButton() {
  const toastManager = useToastManager()
  const [count, setCount] = React.useState(0)

  return (
    <Button
      onClick={() => {
        setCount((prev) => prev + 1)
        toastManager.add({
          title: `Toast ${count + 1} created`,
          description: 'This is a toast notification.'
        })
      }}
    >
      Create toast
    </Button>
  )
}

/* -------------------------------------------------------- anchored toasts -- */

const anchoredToastManager = createToastManager()
const stackedToastManager = createToastManager()

function AnchoredToastsDemo() {
  return (
    <>
      <ToastProvider toastManager={anchoredToastManager}>
        <AnchoredToastViewport />
      </ToastProvider>
      <ToastProvider toastManager={stackedToastManager}>
        <StackedToastViewport />
      </ToastProvider>

      <div className='flex items-center gap-2'>
        <CopyButton />
        <Button
          variant='outline'
          onClick={() => {
            stackedToastManager.add({ description: 'Copied' })
          }}
        >
          Stacked toast
        </Button>
      </div>
    </>
  )
}

function AnchoredToastViewport() {
  const { toasts } = useToastManager()
  return (
    <ToastPortal>
      <ToastViewport>
        {toasts.map((toast) => (
          <ToastPositioner key={toast.id} toast={toast}>
            <ToastRoot
              toast={toast}
              className='relative flex w-max rounded-md border bg-popover px-2 py-1 text-sm text-popover-foreground shadow-md'
            >
              <ToastArrow className='absolute -bottom-2 left-1/2 -translate-x-1/2 rotate-180' />
              <ToastContent className='p-0'>
                <ToastDescription />
              </ToastContent>
            </ToastRoot>
          </ToastPositioner>
        ))}
      </ToastViewport>
    </ToastPortal>
  )
}

function StackedToastViewport() {
  const { toasts } = useToastManager()
  return (
    <ToastPortal>
      <ToastViewport>
        {toasts.map((toast) => (
          <ToastRoot key={toast.id} toast={toast}>
            <ToastContent>
              <ToastDescription />
            </ToastContent>
          </ToastRoot>
        ))}
      </ToastViewport>
    </ToastPortal>
  )
}

function CopyButton() {
  const [copied, setCopied] = React.useState(false)
  const buttonRef = React.useRef<HTMLButtonElement | null>(null)

  return (
    <Button
      ref={buttonRef}
      variant='outline'
      size='icon'
      disabled={copied}
      focusableWhenDisabled
      aria-label='Copy to clipboard'
      onClick={() => {
        setCopied(true)
        anchoredToastManager.add({
          description: 'Copied',
          positionerProps: {
            anchor: buttonRef.current,
            sideOffset: 10
          },
          timeout: 1500,
          onClose() {
            setCopied(false)
          }
        })
      }}
    >
      {copied ? <CheckIcon className='size-4' /> : <TrashIcon className='size-4' />}
    </Button>
  )
}

/* ---------------------------------------------------------- custom position -- */

function CustomPositionToastDemo() {
  return (
    <ToastProvider>
      <CreateToastButton />
      <ToastPortal>
        <ToastViewport className='fixed top-4 bottom-auto left-1/2 right-auto -translate-x-1/2 w-[calc(100vw-2rem)] max-w-sm z-50 flex flex-col items-center gap-2'>
          <TopToastList />
        </ToastViewport>
      </ToastPortal>
    </ToastProvider>
  )
}

function TopToastList() {
  const { toasts } = useToastManager()
  return toasts.map((toast) => (
    <ToastRoot
      key={toast.id}
      toast={toast}
      className='w-full max-w-sm static h-auto transform-none translate-none origin-center'
    >
      <ToastContent className='relative'>
        <div className='flex min-w-0 flex-1 flex-col gap-1'>
          <ToastTitle />
          <ToastDescription />
        </div>
        <ToastClose>Dismiss</ToastClose>
      </ToastContent>
    </ToastRoot>
  ))
}

/* ------------------------------------------------------------- undo action -- */

function UndoToastDemo() {
  return (
    <ToastProvider>
      <UndoActionButton />
      <ToastPortal>
        <ToastViewport>
          <UndoToastList />
        </ToastViewport>
      </ToastPortal>
    </ToastProvider>
  )
}

function UndoActionButton() {
  const toastManager = useToastManager()

  return (
    <Button
      onClick={() => {
        const id = toastManager.add({
          title: 'Action performed',
          description: 'You can undo this action.',
          type: 'success',
          timeout: 10000,
          actionProps: {
            children: 'Undo',
            onClick() {
              toastManager.close(id)
              toastManager.add({ title: 'Action undone' })
            }
          }
        })
      }}
    >
      Perform action
    </Button>
  )
}

function UndoToastList() {
  const { toasts } = useToastManager()
  return toasts.map((toast) => (
    <ToastRoot key={toast.id} toast={toast}>
      <ToastContent>
        <div className='flex min-w-0 flex-1 flex-col gap-1'>
          <ToastTitle />
          <ToastDescription />
        </div>
        <ToastAction />
      </ToastContent>
    </ToastRoot>
  ))
}

/* ----------------------------------------------------------------- promise -- */

function PromiseToastDemo() {
  return (
    <ToastProvider>
      <RunPromiseButton />
      <ToastPortal>
        <ToastViewport>
          <PromiseToastList />
        </ToastViewport>
      </ToastPortal>
    </ToastProvider>
  )
}

function RunPromiseButton() {
  const toastManager = useToastManager()

  return (
    <Button
      onClick={() => {
        void toastManager.promise(
          // Simulated request: resolves after 2 seconds, fails 30% of the time.
          new Promise<string>((resolve, reject) => {
            const shouldSucceed = Math.random() > 0.3
            setTimeout(() => {
              if (shouldSucceed) {
                resolve('operation completed')
              } else {
                reject(new Error('operation failed'))
              }
            }, 2000)
          }),
          {
            loading: 'Loading data…',
            success: (data: string) => `Success: ${data}`,
            error: (err: Error) => `Error: ${err.message}`
          }
        )
      }}
    >
      Run promise
    </Button>
  )
}

function PromiseToastList() {
  const { toasts } = useToastManager()
  return toasts.map((toast) => (
    <ToastRoot key={toast.id} toast={toast}>
      <ToastContent>
        {toast.type === 'loading' ? <CircleNotchIcon className='size-4 shrink-0 animate-spin' aria-hidden /> : null}
        <div className='flex min-w-0 flex-1 flex-col gap-1'>
          <ToastTitle />
          <ToastDescription />
        </div>
        <ToastClose>Dismiss</ToastClose>
      </ToastContent>
    </ToastRoot>
  ))
}

/* ------------------------------------------------------------------ custom -- */

interface CustomToastData {
  userId: string
}

function isCustomToast(toast: ToastObject): toast is ToastObject<CustomToastData> {
  return toast.data?.userId !== undefined
}

function CustomToastDemo() {
  return (
    <ToastProvider>
      <CustomToastButton />
      <ToastPortal>
        <ToastViewport>
          <CustomToastList />
        </ToastViewport>
      </ToastPortal>
    </ToastProvider>
  )
}

function CustomToastButton() {
  const toastManager = useToastManager()

  return (
    <Button
      onClick={() => {
        const data: CustomToastData = { userId: '123' }
        toastManager.add({ title: 'Toast with custom data', data })
      }}
    >
      Create custom toast
    </Button>
  )
}

function CustomToastList() {
  const { toasts } = useToastManager()
  return toasts.map((toast) => (
    <ToastRoot key={toast.id} toast={toast}>
      <ToastContent>
        <div className='flex min-w-0 flex-1 flex-col gap-1'>
          <ToastTitle>{toast.title}</ToastTitle>
          {isCustomToast(toast) && toast.data ? (
            <ToastDescription>User id: {toast.data.userId}</ToastDescription>
          ) : (
            <ToastDescription />
          )}
        </div>
        <ToastClose>Dismiss</ToastClose>
      </ToastContent>
    </ToastRoot>
  ))
}

/* --------------------------------------------------------- deduplicated -- */

function DeduplicatedToastDemo() {
  return (
    <ToastProvider>
      <SaveDraftButton />
      <ToastPortal>
        <ToastViewport>
          <PulseToastList />
        </ToastViewport>
      </ToastPortal>
    </ToastProvider>
  )
}

function SaveDraftButton() {
  const toastManager = useToastManager()

  return (
    <Button
      onClick={() => {
        toastManager.add({
          id: 'save-status',
          title: 'Draft saved',
          description: 'Click again while it is visible to replay the pulse.'
        })
      }}
    >
      Save draft
    </Button>
  )
}

function PulseToastList() {
  const { toasts } = useToastManager()
  return toasts.map((toast) => <PulseToastItem key={toast.id} toast={toast} />)
}

function PulseToastItem({ toast }: { toast: ToastObject }) {
  // New toasts start at `updateKey: 0`, so the first add skips the replay pulse.
  const pulseClassName = toast.updateKey ? 'animate-pulse' : null

  return (
    <ToastRoot toast={toast} className={pulseClassName ?? undefined}>
      <ToastContent>
        <div className='flex min-w-0 flex-1 flex-col gap-1'>
          <ToastTitle />
          <ToastDescription />
        </div>
        <ToastClose>Dismiss</ToastClose>
      </ToastContent>
    </ToastRoot>
  )
}

/* ---------------------------------------------------------- varying heights -- */

const VARYING_TEXTS = [
  'Short message.',
  'A bit longer message that spans two lines.',
  'This is a longer description that intentionally takes more vertical space to demonstrate stacking with varying heights.',
  'An even longer description that should span multiple lines so we can verify the clamped collapsed height and smooth expansion animation when hovering or focusing the viewport.'
]

function VaryingHeightsToastDemo() {
  return (
    <ToastProvider>
      <VaryingToastButton />
      <ToastPortal>
        <ToastViewport>
          <StackedToastList />
        </ToastViewport>
      </ToastPortal>
    </ToastProvider>
  )
}

function VaryingToastButton() {
  const toastManager = useToastManager()
  const [count, setCount] = React.useState(0)

  return (
    <Button
      onClick={() => {
        setCount((prev) => prev + 1)
        const description = VARYING_TEXTS[Math.floor(Math.random() * VARYING_TEXTS.length)]
        toastManager.add({ title: `Toast ${count + 1} created`, description })
      }}
    >
      Create varying height toast
    </Button>
  )
}

/* ------------------------------------------------------------------ export -- */

export const demo: DemoMeta = {
  id: 'toast',
  title: 'Toast',
  description: 'Generates toast notifications.',
  group: 'Overlays',
  variants: [
    { name: 'Default', render: () => <DefaultToastDemo /> },
    { name: 'Anchored toasts', render: () => <AnchoredToastsDemo /> },
    { name: 'Custom position', render: () => <CustomPositionToastDemo /> },
    { name: 'Undo action', render: () => <UndoToastDemo /> },
    { name: 'Promise', render: () => <PromiseToastDemo /> },
    { name: 'Custom', render: () => <CustomToastDemo /> },
    { name: 'Deduplicated toast', render: () => <DeduplicatedToastDemo /> },
    { name: 'Varying heights', render: () => <VaryingHeightsToastDemo /> }
  ]
}
