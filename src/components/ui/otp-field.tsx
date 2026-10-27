import * as React from 'react'
import { OTPField as BaseOTPField } from '@base-ui/react/otp-field'
import { cn } from '@/lib/utils'
import { focusRing } from '@/components/ui/button'

function OTPField({ className, ...props }: React.ComponentProps<typeof BaseOTPField.Root>) {
  return (
    <BaseOTPField.Root
      data-slot='otp-field'
      className={cn('flex items-center gap-2', className as string)}
      {...props}
    />
  )
}

function OTPFieldInput({ className, ...props }: React.ComponentProps<typeof BaseOTPField.Input>) {
  return (
    <BaseOTPField.Input
      data-slot='otp-field-input'
      className={cn(
        'm-0 h-10 w-10 rounded-(--radius) border border-input bg-background text-center text-base font-normal transition-colors',
        'data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[readonly]:bg-muted',
        'data-[filled]:border-foreground',
        focusRing,
        className as string
      )}
      {...props}
    />
  )
}

function OTPFieldSeparator({ className, ...props }: React.ComponentProps<typeof BaseOTPField.Separator>) {
  return (
    <BaseOTPField.Separator
      data-slot='otp-field-separator'
      className={cn(
        'h-px w-4 shrink-0 bg-border text-foreground',
        'data-[orientation=vertical]:h-4 data-[orientation=vertical]:w-px',
        className as string
      )}
      {...props}
    />
  )
}

export { OTPField, OTPFieldInput, OTPFieldSeparator }
