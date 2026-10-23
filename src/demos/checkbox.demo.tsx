import { CheckboxRoot } from '@/components/ui/checkbox'
import { FieldRoot, FieldLabel } from '@/components/ui/field'
import { Form } from '@/components/ui/form'
import type { DemoMeta } from '@/showcase/demo'

export const demo: DemoMeta = {
  id: 'checkbox',
  title: 'Checkbox',
  description: 'An easily stylable checkbox component.',
  group: 'Forms',
  variants: [
    {
      name: 'Default',
      render: () => (
        <label className='flex items-center gap-2 text-sm text-foreground'>
          <CheckboxRoot defaultChecked />
          Enable notifications
        </label>
      )
    },
    {
      name: 'Indeterminate',
      render: () => (
        <label className='flex items-center gap-2 text-sm text-foreground'>
          <CheckboxRoot indeterminate />
          Mixed selection
        </label>
      )
    },
    {
      name: 'Disabled',
      render: () => (
        <>
          <label className='flex items-center gap-2 text-sm text-foreground'>
            <CheckboxRoot disabled />
            Disabled unchecked
          </label>
          <label className='flex items-center gap-2 text-sm text-foreground'>
            <CheckboxRoot disabled defaultChecked />
            Disabled checked
          </label>
        </>
      )
    },
    {
      name: 'Labeling a checkbox',
      render: () => (
        <label className='flex items-center gap-2 text-sm text-foreground'>
          <CheckboxRoot />
          Accept terms and conditions
        </label>
      )
    },
    {
      name: 'Rendering as a native button',
      render: () => (
        <div className='flex items-center gap-2 text-sm'>
          <label htmlFor='notifications-checkbox' className='text-foreground'>
            Enable notifications
          </label>
          <CheckboxRoot id='notifications-checkbox' nativeButton render={<button />} />
        </div>
      )
    },
    {
      name: 'Render callback',
      render: () => (
        <CheckboxRoot
          nativeButton
          render={(buttonProps) => (
            <label className='flex items-center gap-2 text-sm text-foreground'>
              <button {...buttonProps} />
              Enable notifications
            </label>
          )}
        />
      )
    },
    {
      name: 'Form integration',
      render: () => (
        <Form className='w-64'>
          <FieldRoot name='stayLoggedIn'>
            <FieldLabel className='flex items-center gap-2'>
              <CheckboxRoot defaultChecked />
              Stay logged in for 7 days
            </FieldLabel>
          </FieldRoot>
        </Form>
      )
    }
  ]
}
