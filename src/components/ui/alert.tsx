import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

export const alertVariants = cva('relative flex w-full items-start gap-3 rounded-(--radius) border p-4 text-sm', {
  variants: {
    variant: {
      default: 'border-border bg-card text-card-foreground [&>svg]:text-foreground',
      info: 'border-info/40 bg-info/10 text-foreground [&>svg]:text-info',
      success: 'border-success/40 bg-success/10 text-foreground [&>svg]:text-success',
      warning: 'border-warning/40 bg-warning/10 text-foreground [&>svg]:text-warning',
      destructive: 'border-destructive/40 bg-destructive/10 text-foreground [&>svg]:text-destructive'
    }
  },
  defaultVariants: { variant: 'default' }
})

export type AlertProps = React.ComponentProps<'div'> & VariantProps<typeof alertVariants>

function Alert({ className, variant, role = 'alert', ...props }: AlertProps) {
  return (
    <div
      data-slot='alert'
      role={role}
      className={cn(alertVariants({ variant }), className as string)}
      {...props}
    />
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<'h5'>) {
  return (
    <h5
      data-slot='alert-title'
      className={cn('font-medium leading-none tracking-tight text-foreground', className as string)}
      {...props}
    />
  )
}

function AlertDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='alert-description'
      className={cn('text-sm text-muted-foreground [&_p]:leading-relaxed', className as string)}
      {...props}
    />
  )
}

function AlertAction({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot='alert-action' className={cn('ml-auto shrink-0 self-center', className as string)} {...props} />
}

export { Alert, AlertTitle, AlertDescription, AlertAction }
