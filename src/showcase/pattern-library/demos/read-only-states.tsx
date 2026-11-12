import { useState } from 'react'
import { CheckboxRoot } from '@/components/ui/checkbox'
import { FieldDescription, FieldLabel, FieldRoot } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { DemoFrame, UseCaseSection } from './shared'

export function ReadOnlyDemo() {
  const [value, setValue] = useState('workspace-2048')
  return (
    <DemoFrame>
      <UseCaseSection
        title='Review mission settings without changing them'
        scenario='Compare editable, read-only, and prerequisite-blocked values in a flight approval record.'
      >
        <p className='text-muted-foreground'>
          Read-only values remain part of the workflow and can be reviewed or copied. Disabled values cannot be operated
          because a condition blocks them.
        </p>
        <div className='grid min-w-0 gap-4 md:grid-cols-2'>
          <FieldRoot>
            <FieldLabel>Workspace ID · editable</FieldLabel>
            <Input value={value} onChange={(event) => setValue(event.target.value)} />
            <FieldDescription>This enabled control can be changed.</FieldDescription>
          </FieldRoot>
          <FieldRoot>
            <FieldLabel>Workspace ID · read-only</FieldLabel>
            <Input value={value} readOnly className='border-transparent bg-transparent px-0 shadow-none' />
            <FieldDescription>Focus, select, and copy; editing is unavailable in this context.</FieldDescription>
          </FieldRoot>
          <FieldRoot>
            <FieldLabel>Launch approval · disabled</FieldLabel>
            <Input value='Waiting for review' disabled />
            <FieldDescription>Unavailable until the approval prerequisite is complete.</FieldDescription>
          </FieldRoot>
        </div>
      </UseCaseSection>
      <UseCaseSection
        title='Review selected options and bound values'
        scenario='A reviewer can inspect the assigned aircraft, enabled safety checks, and planned date while controls remain non-operable.'
      >
        <div className='grid min-w-0 gap-4 md:grid-cols-2'>
          <FieldRoot>
            <FieldLabel>Assigned aircraft · read-only</FieldLabel>
            <Input value='SkyTrack Scout 04' readOnly className='border-transparent bg-transparent px-0 shadow-none' />
            <FieldDescription>The selected value remains visible for approval.</FieldDescription>
          </FieldRoot>
          <FieldRoot>
            <FieldLabel>Launch window · read-only</FieldLabel>
            <Input
              type='text'
              value='Nov 5, 2026'
              readOnly
              className='border-transparent bg-transparent px-0 shadow-none'
            />
            <FieldDescription>The saved date stays readable; this view does not offer a date picker.</FieldDescription>
          </FieldRoot>
          <label className='flex items-center gap-2'>
            <CheckboxRoot checked readOnly aria-label='Weather review completed' />
            <span>Weather review completed · read-only</span>
          </label>
        </div>
      </UseCaseSection>
      <UseCaseSection
        title='Keep an empty selection informative'
        scenario='A restricted reviewer can see that an optional mission note has no value without mistaking a disabled control for read-only content.'
      >
        <FieldRoot className='max-w-md'>
          <p className='text-sm font-medium'>Mission note · read-only</p>
          <p className='text-foreground'>No note provided</p>
        </FieldRoot>
      </UseCaseSection>
    </DemoFrame>
  )
}
