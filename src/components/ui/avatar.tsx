import * as React from 'react'
import { Avatar as BaseAvatar } from '@base-ui/react/avatar'
import { cn } from '@/lib/utils'
import type { ControlSize } from '@/lib/control-sizes'

const AVATAR_SIZE_CLASSES: Record<ControlSize, string> = {
  xs: 'size-6',
  sm: 'size-8',
  default: 'size-9',
  lg: 'size-10'
}

type AvatarProps = React.ComponentProps<typeof BaseAvatar.Root> & {
  size?: ControlSize
}

function Avatar({ className, size = 'default', ...props }: AvatarProps) {
  return (
    <BaseAvatar.Root
      data-slot='avatar'
      data-size={size}
      className={cn(
        'group/avatar relative flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted text-sm font-medium text-muted-foreground select-none',
        AVATAR_SIZE_CLASSES[size],
        className
      )}
      {...props}
    />
  )
}

function AvatarImage({ className, ...props }: React.ComponentProps<typeof BaseAvatar.Image>) {
  return <BaseAvatar.Image data-slot='avatar-image' className={cn('size-full object-cover', className)} {...props} />
}

function AvatarFallback({ className, ...props }: React.ComponentProps<typeof BaseAvatar.Fallback>) {
  return (
    <BaseAvatar.Fallback
      data-slot='avatar-fallback'
      className={cn(
        'flex size-full items-center justify-center text-sm group-data-[size=xs]/avatar:text-[10px] group-data-[size=sm]/avatar:text-xs group-data-[size=lg]/avatar:text-base',
        className
      )}
      {...props}
    />
  )
}

export { Avatar, AvatarImage, AvatarFallback }
