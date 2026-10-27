import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { InlineEdit, InlineEditInput, InlineEditTrigger } from '@/components/ui/inline-edit'
import type { DemoMeta } from '@/showcase/demo'

const initialTitle = 'Design is how it works'

function MissionTitleEditor() {
  const [title, setTitle] = useState(initialTitle)

  return (
    <div className='flex w-full max-w-2xl flex-col gap-2'>
      <InlineEdit value={title} onValueChange={setTitle} label='Mission title'>
        <InlineEditTrigger
          aria-label='Edit mission title'
          render={
            <Button
              variant='ghost'
              className='h-auto w-full justify-start whitespace-normal px-2 py-2 text-left text-2xl leading-8 font-semibold'
            />
          }
        />
        <InlineEditInput />
      </InlineEdit>
      <p className='px-2 text-xs text-muted-foreground'>Enter saves · Shift+Enter adds a line · Escape cancels</p>
    </div>
  )
}

function HeadlessTriggerExample() {
  const [title, setTitle] = useState('Rename this mission')

  return (
    <InlineEdit value={title} onValueChange={setTitle} label='Mission name'>
      <InlineEditTrigger />
      <InlineEditInput />
    </InlineEdit>
  )
}

export const demo: DemoMeta = {
  id: 'inline-edit',
  title: 'Inline Edit',
  description:
    'Switch text into an editable field. The trigger is headless and accepts a caller-provided element through render.',
  group: 'Forms',
  variants: [
    { name: 'Custom trigger via render', render: () => <MissionTitleEditor /> },
    { name: 'Headless trigger', render: () => <HeadlessTriggerExample /> }
  ]
}
