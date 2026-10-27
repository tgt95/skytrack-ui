import { CheckCircleIcon, CircleNotchIcon, FileIcon, ImageIcon, XIcon } from '@phosphor-icons/react'
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle
} from '@/components/ui/attachment'
import type { DemoMeta } from '@/showcase/demo'

export const demo: DemoMeta = {
  id: 'attachment',
  title: 'Attachment',
  description: 'Show a file or image with metadata, upload state, and actions.',
  group: 'Data Display',
  variants: [
    {
      name: 'Default',
      render: () => <AttachmentExample state='done' />
    },
    {
      name: 'Upload states',
      render: () => (
        <div className='flex w-full max-w-lg flex-col gap-2'>
          <AttachmentExample state='idle' />
          <AttachmentExample state='uploading' />
          <AttachmentExample state='processing' />
          <AttachmentExample state='error' />
          <AttachmentExample state='done' />
        </div>
      )
    },
    {
      name: 'Sizes',
      render: () => (
        <div className='flex w-full max-w-lg flex-col gap-2'>
          {(['default', 'sm', 'xs'] as const).map((size) => (
            <Attachment key={size} size={size}>
              <AttachmentMedia>
                <FileIcon />
              </AttachmentMedia>
              <AttachmentContent>
                <AttachmentTitle>flight-report.pdf</AttachmentTitle>
                <AttachmentDescription>PDF · 2.4 MB</AttachmentDescription>
              </AttachmentContent>
            </Attachment>
          ))}
        </div>
      )
    },
    {
      name: 'Group',
      render: () => (
        <AttachmentGroup className='max-w-lg'>
          {['briefing-notes.pdf', 'workspace.png', 'mission-data.csv'].map((name, index) => (
            <Attachment key={name} className='min-w-64 snap-start'>
              <AttachmentMedia>{index === 1 ? <ImageIcon /> : <FileIcon />}</AttachmentMedia>
              <AttachmentContent>
                <AttachmentTitle>{name}</AttachmentTitle>
                <AttachmentDescription>{['PDF · 1.4 MB', 'PNG · 820 KB', 'CSV · 18 KB'][index]}</AttachmentDescription>
              </AttachmentContent>
            </Attachment>
          ))}
        </AttachmentGroup>
      )
    }
  ]
}

function AttachmentExample({ state }: { state: 'idle' | 'uploading' | 'processing' | 'error' | 'done' }) {
  const descriptions = {
    idle: 'Ready to upload · PDF · 2.4 MB',
    uploading: 'Uploading · 64%',
    processing: 'Processing document',
    error: 'Upload failed. Check the file and try again.',
    done: 'Uploaded · PDF · 2.4 MB'
  }
  return (
    <Attachment state={state} className='w-full max-w-lg'>
      <AttachmentMedia>
        <FileIcon />
      </AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>flight-report.pdf</AttachmentTitle>
        <AttachmentDescription>{descriptions[state]}</AttachmentDescription>
      </AttachmentContent>
      <AttachmentActions>
        {state === 'uploading' || state === 'processing' ? (
          <CircleNotchIcon
            aria-label={state === 'uploading' ? 'Uploading' : 'Processing'}
            className='size-4 animate-spin text-primary'
          />
        ) : state === 'done' ? (
          <CheckCircleIcon aria-label='Uploaded' className='size-4 text-success' />
        ) : (
          <AttachmentAction aria-label='Remove flight-report.pdf'>
            <XIcon />
          </AttachmentAction>
        )}
      </AttachmentActions>
    </Attachment>
  )
}
