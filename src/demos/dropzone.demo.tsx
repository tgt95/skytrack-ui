import { useEffect, useId, useRef, useState } from 'react'
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
import { FieldDescription, FieldError, FieldLabel, FieldRoot } from '@/components/ui/field'
import {
  ToastContent,
  ToastDescription,
  ToastPortal,
  ToastProvider,
  ToastRoot,
  ToastTitle,
  ToastViewport,
  useToastManager
} from '@/components/ui/toast'
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
      name: 'Upload success (center toast)',
      render: () => <SuccessfulUploadDemo />
    },
    {
      name: 'Upload failure (field error)',
      render: () => <FailedUploadDemo />
    },
    {
      name: 'Selected files',
      render: () => <SelectedFilesDemo />
    }
  ]
}

function SuccessfulUploadDemo() {
  return (
    <ToastProvider>
      <SuccessfulUploadField />
      <CenteredToastList />
    </ToastProvider>
  )
}

function SuccessfulUploadField() {
  const toastManager = useToastManager()
  const labelId = useId()
  const descriptionId = useId()
  const sequence = useRef(0)
  const [uploads, setUploads] = useState<Array<{ id: number; file: File }>>([])

  return (
    <FieldRoot className='w-full max-w-md'>
      <FieldLabel id={labelId}>Upload files</FieldLabel>
      <Dropzone
        multiple
        accept='image/*,.pdf'
        hint='Choose images or PDF files, or drag them here.'
        aria-labelledby={labelId}
        aria-describedby={descriptionId}
        onFilesSelected={(files) => {
          const additions = files.map((file) => ({ id: ++sequence.current, file }))
          setUploads((current) => [...current, ...additions])
          const description =
            files.length === 1
              ? `${files[0].name} uploaded successfully.`
              : `${files.length} files uploaded successfully.`
          toastManager.add({ type: 'success', title: 'Upload complete', description })
        }}
      />
      <FieldDescription id={descriptionId}>Demo upload completes as soon as files are selected.</FieldDescription>
      {uploads.length > 0 && (
        <div role='list' aria-label='Uploaded files' className='flex w-full flex-col gap-2'>
          {uploads.map(({ id, file }) => (
            <Attachment key={id} role='listitem' state='done' className='w-full'>
              <AttachmentMedia>{file.type.startsWith('image/') ? <ImageIcon /> : <FileIcon />}</AttachmentMedia>
              <AttachmentContent>
                <AttachmentTitle>{file.name}</AttachmentTitle>
                <AttachmentDescription>{formatFileSize(file.size)} · Uploaded</AttachmentDescription>
              </AttachmentContent>
              <AttachmentActions>
                <CheckCircleIcon aria-label='Upload complete' className='size-4 text-success' />
                <AttachmentAction
                  aria-label={`Remove ${file.name}`}
                  onClick={() => setUploads((current) => current.filter((upload) => upload.id !== id))}
                >
                  <XIcon />
                </AttachmentAction>
              </AttachmentActions>
            </Attachment>
          ))}
        </div>
      )}
    </FieldRoot>
  )
}

function CenteredToastList() {
  const { toasts } = useToastManager()

  return (
    <ToastPortal>
      <ToastViewport className='top-10 right-auto bottom-auto left-1/2 -translate-x-1/2'>
        {toasts.map((toast) => (
          <ToastRoot key={toast.id} toast={toast} className='top-0 right-0 bottom-auto left-0 mx-auto'>
            <ToastContent>
              <CheckCircleIcon aria-hidden='true' className='mt-0.5 size-5 shrink-0 text-success' />
              <div className='grid min-w-0 flex-1 gap-1'>
                <ToastTitle />
                <ToastDescription />
              </div>
            </ToastContent>
          </ToastRoot>
        ))}
      </ToastViewport>
    </ToastPortal>
  )
}

function FailedUploadDemo() {
  const [error, setError] = useState<string | null>(null)
  const labelId = useId()
  const descriptionId = useId()
  const errorId = useId()

  return (
    <FieldRoot className='w-full max-w-md' invalid={Boolean(error)}>
      <FieldLabel id={labelId}>Upload an image or PDF</FieldLabel>
      <Dropzone
        multiple
        accept='*/*'
        hint='Drop a different file type or a file over 5 MB to see validation.'
        aria-labelledby={labelId}
        aria-describedby={error ? `${descriptionId} ${errorId}` : descriptionId}
        onFilesSelected={(files) => {
          const invalidFile = files.find((file) => {
            const supported =
              file.type.startsWith('image/') ||
              file.type === 'application/pdf' ||
              file.name.toLowerCase().endsWith('.pdf')
            return !supported || file.size > 5 * 1024 * 1024
          })

          if (!invalidFile) {
            setError(null)
            return
          }

          setError(
            invalidFile.size > 5 * 1024 * 1024
              ? `${invalidFile.name} exceeds the 5 MB limit.`
              : `${invalidFile.name} is not an image or PDF.`
          )
        }}
      />
      <FieldDescription id={descriptionId}>Accepted: images and PDF files up to 5 MB.</FieldDescription>
      <FieldError id={errorId} match={Boolean(error)}>
        {error}
      </FieldError>
    </FieldRoot>
  )
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
