import * as React from 'react'
import { UploadSimpleIcon } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export type DropzoneProps = Omit<
  React.ComponentProps<'div'>,
  'onDrop' | 'onDragEnter' | 'onDragOver' | 'onDragLeave'
> & {
  accept?: string
  multiple?: boolean
  disabled?: boolean
  hint?: React.ReactNode
  buttonLabel?: string
  onFilesSelected?: (files: File[]) => void
}

function Dropzone({
  accept,
  multiple = false,
  disabled = false,
  hint = 'Choose a file or drag it here to upload.',
  buttonLabel = 'Choose file',
  onFilesSelected,
  className,
  ...props
}: DropzoneProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = React.useState(false)
  const hintId = React.useId()

  const selectFiles = React.useCallback(
    (files: FileList | File[]) => {
      if (disabled) return
      const selected = Array.from(files)
      if (selected.length) onFilesSelected?.(selected)
    },
    [disabled, onFilesSelected]
  )

  return (
    <div
      data-slot='dropzone'
      role='group'
      aria-label='File upload'
      data-dragging={dragging ? '' : undefined}
      data-disabled={disabled ? '' : undefined}
      aria-describedby={hintId}
      className={cn(
        'flex min-h-40 flex-col items-center justify-center gap-3 border border-dashed border-border bg-muted/30 p-6 text-center transition-colors',
        'data-[dragging]:border-primary data-[dragging]:bg-primary/5',
        'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        className as string
      )}
      onDragEnter={(event) => {
        event.preventDefault()
        if (!disabled) setDragging(true)
      }}
      onDragOver={(event) => {
        event.preventDefault()
        if (!disabled) setDragging(true)
      }}
      onDragLeave={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setDragging(false)
      }}
      onDrop={(event) => {
        event.preventDefault()
        setDragging(false)
        selectFiles(event.dataTransfer.files)
      }}
      {...props}
    >
      <UploadSimpleIcon aria-hidden='true' className='size-5 text-muted-foreground' />
      <p id={hintId} className='text-sm text-muted-foreground'>
        {hint}
      </p>
      <Button type='button' variant='outline' size='sm' disabled={disabled} onClick={() => inputRef.current?.click()}>
        {buttonLabel}
      </Button>
      <input
        ref={inputRef}
        type='file'
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        tabIndex={-1}
        aria-hidden='true'
        className='sr-only'
        onChange={(event) => {
          selectFiles(event.currentTarget.files ?? [])
          event.currentTarget.value = ''
        }}
      />
    </div>
  )
}

export { Dropzone }
