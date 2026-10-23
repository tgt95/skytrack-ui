import * as React from 'react'
import { Avatar as BaseAvatar } from '@base-ui/react/avatar'
import { cn } from '@/lib/utils'

function Avatar({ className, ...props }: React.ComponentProps<typeof BaseAvatar.Root>) {
  return (
    <BaseAvatar.Root
      data-slot='avatar'
      className={cn(
        'relative flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted text-sm font-medium text-muted-foreground select-none',
        className as string
      )}
      {...props}
    />
  )
}

function AvatarImage({ className, ...props }: React.ComponentProps<typeof BaseAvatar.Image>) {
  return (
    <BaseAvatar.Image
      data-slot='avatar-image'
      className={cn('size-full object-cover', className as string)}
      {...props}
    />
  )
}

function AvatarFallback({ className, ...props }: React.ComponentProps<typeof BaseAvatar.Fallback>) {
  return (
    <BaseAvatar.Fallback
      data-slot='avatar-fallback'
      className={cn('flex size-full items-center justify-center text-sm', className as string)}
      {...props}
    />
  )
}

export { Avatar, AvatarImage, AvatarFallback }
