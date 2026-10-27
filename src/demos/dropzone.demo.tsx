import { useEffect, useRef, useState } from 'react'
import { CheckCircleIcon, CircleNotchIcon, FileIcon, ImageIcon, XIcon } from '@phosphor-icons/react'
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
  type AttachmentState
} from '@/components/ui/attachment'
import { Dropzone } from '@/components/ui/dropzone'
import type { DemoMeta } from '@/showcase/demo'

export const demo: DemoMeta = {
  id: 'dropzone',
  title: 'Dropzone',
  description: 'Choose files with the button or drag them into the drop area.',
  group: 'Forms',
  variants: [
    {
      name: 'Default',
      render: () => <Dropzone className='w-full max-w-md' />
    },
    {
      name: 'Multiple files',
      render: () => (
        <Dropzone
          multiple
          accept='image/*,.pdf'
          hint='Images or PDF · choose multiple or drag them here.'
          className='w-full max-w-md'
        />
      )
    },
    {
      name: 'Disabled',
      render: () => <Dropzone disabled className='w-full max-w-md' />
    },
    {
      name: 'Selected files',
      render: () => <SelectedFilesDemo />
    }
  ]
}

function SelectedFilesDemo() {
  const [files, setFiles] = useState<Array<{ id: number; file: File; state: AttachmentState; message: string }>>([])
  const sequence = useRef(0)
  const timers = useRef<number[]>([])

  useEffect(() => () => timers.current.forEach(window.clearTimeout), [])

  const removeFile = (id: number) => setFiles((current) => current.filter((entry) => entry.id !== id))

  const selectFiles = (selected: File[]) => {
    const additions = selected.map((file) => {
      const id = ++sequence.current
      const supported =
        file.type.startsWith('image/') || file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')
      const tooLarge = file.size > 5 * 1024 * 1024
      const invalidReason = !supported
        ? 'Unsupported file type. Choose an image or PDF.'
        : tooLarge
          ? 'File exceeds the 5 MB demo limit.'
          : null
      return {
        id,
        file,
        state: invalidReason ? ('error' as const) : ('uploading' as const),
        message: invalidReason ?? 'Uploading…'
      }
    })
    setFiles((current) => [...current, ...additions])

    additions
      .filter((entry) => entry.state === 'uploading')
      .forEach((entry) => {
        timers.current.push(
          window.setTimeout(() => {
            setFiles((current) =>
              current.map((item) =>
                item.id === entry.id ? { ...item, state: 'processing', message: 'Processing file…' } : item
              )
            )
          }, 900)
        )
        timers.current.push(
          window.setTimeout(() => {
            setFiles((current) =>
              current.map((item) =>
                item.id === entry.id
                  ? { ...item, state: 'done', message: `${formatFileSize(item.file.size)} · Uploaded` }
                  : item
              )
            )
          }, 1900)
        )
      })
  }

  return (
    <div className='flex w-full max-w-md flex-col gap-3'>
      <Dropzone multiple accept='image/*,.pdf' hint='Images or PDF · up to 5 MB each.' onFilesSelected={selectFiles} />
      <div role='list' aria-label='Selected files' className='flex flex-col gap-2'>
        {files.map(({ id, file, state, message }) => (
          <Attachment key={id} role='listitem' state={state} className='w-full'>
            <AttachmentMedia>{file.type.startsWith('image/') ? <ImageIcon /> : <FileIcon />}</AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>{file.name}</AttachmentTitle>
              <AttachmentDescription>{message}</AttachmentDescription>
            </AttachmentContent>
            <AttachmentActions>
              {state === 'uploading' || state === 'processing' ? (
                <CircleNotchIcon aria-label={message} className='size-4 animate-spin text-primary' />
              ) : state === 'done' ? (
                <CheckCircleIcon aria-label='Upload complete' className='size-4 text-success' />
              ) : null}
              <AttachmentAction aria-label={`Remove ${file.name}`} onClick={() => removeFile(id)}>
                <XIcon />
              </AttachmentAction>
            </AttachmentActions>
          </Attachment>
        ))}
      </div>
      <p aria-live='polite' className='sr-only'>
        {files.length ? `${files.length} file${files.length === 1 ? '' : 's'} selected` : 'No files selected'}
      </p>
    </div>
  )
}

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}
