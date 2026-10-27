import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Button, type ButtonProps } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export type AttachmentState = 'idle' | 'uploading' | 'processing' | 'error' | 'done'
export type AttachmentSize = 'default' | 'sm' | 'xs'
export type AttachmentOrientation = 'horizontal' | 'vertical'

type AttachmentContextValue = {
  state: AttachmentState
  size: AttachmentSize
  orientation: AttachmentOrientation
}

const AttachmentContext = React.createContext<AttachmentContextValue>({
  state: 'done',
  size: 'default',
  orientation: 'horizontal'
})

const attachmentVariants = cva(
  'relative isolate flex w-full gap-3 rounded-(--radius) border border-border bg-card text-card-foreground transition-colors',
  {
    variants: {
      size: {
        default: 'min-h-16 p-3',
        sm: 'min-h-14 gap-2 p-2.5',
        xs: 'min-h-11 gap-2 p-2'
      },
      orientation: {
        horizontal: 'flex-row items-center',
        vertical: 'flex-col items-stretch'
      },
      state: {
        idle: 'border-border',
        uploading: 'border-primary/40',
        processing: 'border-primary/40',
        error: 'border-destructive/50 bg-destructive/5',
        done: 'border-border'
      }
    },
    defaultVariants: { size: 'default', orientation: 'horizontal', state: 'done' }
  }
)

export type AttachmentProps = React.ComponentProps<'div'> &
  VariantProps<typeof attachmentVariants> & { state?: AttachmentState }

function Attachment({
  className,
  size = 'default',
  orientation = 'horizontal',
  state = 'done',
  ...props
}: AttachmentProps) {
  const resolvedSize = size ?? 'default'
  const resolvedOrientation = orientation ?? 'horizontal'
  const context = React.useMemo(
    () => ({ state, size: resolvedSize, orientation: resolvedOrientation }),
    [state, resolvedSize, resolvedOrientation]
  )

  return (
    <AttachmentContext.Provider value={context}>
      <div
        data-slot='attachment'
        data-state={state}
        data-size={resolvedSize}
        data-orientation={resolvedOrientation}
        className={cn(
          attachmentVariants({ size: resolvedSize, orientation: resolvedOrientation, state }),
          className as string
        )}
        {...props}
      />
    </AttachmentContext.Provider>
  )
}

export type AttachmentMediaProps = React.ComponentProps<'div'> & { variant?: 'icon' | 'image' }

function AttachmentMedia({ variant = 'icon', className, ...props }: AttachmentMediaProps) {
  const { size, orientation } = React.useContext(AttachmentContext)
  return (
    <div
      data-slot='attachment-media'
      data-variant={variant}
      className={cn(
        'pointer-events-none relative z-10 flex shrink-0 items-center justify-center overflow-hidden rounded-(--radius) bg-muted text-muted-foreground [&>svg]:size-5 [&>svg]:shrink-0',
        variant === 'icon' && 'size-10',
        variant === 'image' && 'aspect-square w-16 [&>img]:size-full [&>img]:object-cover',
        size === 'sm' && variant === 'icon' && 'size-9 [&>svg]:size-4',
        size === 'xs' && variant === 'icon' && 'size-7 [&>svg]:size-4',
        orientation === 'vertical' && variant === 'image' && 'w-full',
        className as string
      )}
      {...props}
    />
  )
}

function AttachmentContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='attachment-content'
      className={cn(
        'pointer-events-none relative z-10 flex min-w-0 flex-1 flex-col justify-center gap-0.5',
        className as string
      )}
      {...props}
    />
  )
}

function AttachmentTitle({ className, ...props }: React.ComponentProps<'p'>) {
  const { state, size } = React.useContext(AttachmentContext)
  const inProgress = state === 'uploading' || state === 'processing'

  return (
    <p
      data-slot='attachment-title'
      data-state={state}
      className={cn(
        'truncate text-sm font-medium leading-5 text-foreground',
        size === 'xs' && 'text-xs leading-4',
        inProgress && 'animate-pulse',
        state === 'error' && 'text-destructive',
        className as string
      )}
      {...props}
    />
  )
}

function AttachmentDescription({ className, ...props }: React.ComponentProps<'p'>) {
  const { state, size } = React.useContext(AttachmentContext)
  return (
    <p
      data-slot='attachment-description'
      className={cn(
        'truncate text-xs leading-4 text-muted-foreground',
        size === 'xs' && 'text-[0.6875rem] leading-4',
        state === 'error' && 'text-destructive',
        className as string
      )}
      {...props}
    />
  )
}

function AttachmentActions({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='attachment-actions'
      className={cn('relative z-20 ml-auto flex shrink-0 items-center gap-1', className as string)}
      {...props}
    />
  )
}

type AttachmentActionProps = Omit<ButtonProps, 'size'> & { size?: ButtonProps['size'] }

function AttachmentAction({ className, size = 'icon-xs', variant = 'ghost', ...props }: AttachmentActionProps) {
  return (
    <Button
      data-slot='attachment-action'
      variant={variant}
      size={size}
      className={cn('relative z-20 text-muted-foreground hover:text-foreground', className as string)}
      {...props}
    />
  )
}

export type AttachmentTriggerProps = React.ComponentProps<'button'> & { render?: React.ReactElement }

function AttachmentTrigger({ className, render, ...props }: AttachmentTriggerProps) {
  const triggerClassName = cn(
    'absolute inset-0 z-0 cursor-pointer rounded-(--radius) outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    className
  )

  if (render) {
    const renderProps = render.props as { className?: string }
    return React.cloneElement(render as React.ReactElement<Record<string, unknown>>, {
      ...props,
      className: cn(triggerClassName, renderProps.className)
    })
  }

  return <button data-slot='attachment-trigger' type='button' className={triggerClassName} {...props} />
}

function AttachmentGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='attachment-group'
      className={cn(
        'flex w-full snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain pb-1 [&>*]:snap-start',
        className as string
      )}
      {...props}
    />
  )
}

export {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
  AttachmentTrigger
}
