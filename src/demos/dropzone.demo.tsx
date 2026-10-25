import { useState } from 'react'
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
  const [names, setNames] = useState<string[]>([])
  return (
    <div className='flex w-full max-w-md flex-col gap-3'>
      <Dropzone multiple onFilesSelected={(files) => setNames(files.map((file) => file.name))} />
      <p aria-live='polite' className='min-h-5 text-sm text-muted-foreground'>
        {names.length ? names.join(', ') : 'No files selected'}
      </p>
    </div>
  )
}
