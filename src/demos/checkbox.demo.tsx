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
        <FieldRoot className='flex-row items-center gap-2'>
          <FieldLabel className='flex items-center gap-2'>
            <CheckboxRoot defaultChecked />
            Enable notifications
          </FieldLabel>
        </FieldRoot>
      )
    },
    {
      name: 'Indeterminate',
      render: () => (
        <FieldRoot className='flex-row items-center gap-2'>
          <FieldLabel className='flex items-center gap-2'>
            <CheckboxRoot indeterminate />
            Mixed selection
          </FieldLabel>
        </FieldRoot>
      )
    },
    {
      name: 'Disabled',
      render: () => (
        <>
          <FieldRoot className='flex-row items-center gap-2'>
            <FieldLabel className='flex items-center gap-2'>
              <CheckboxRoot disabled />
              Disabled unchecked
            </FieldLabel>
          </FieldRoot>
          <FieldRoot className='flex-row items-center gap-2'>
            <FieldLabel className='flex items-center gap-2'>
              <CheckboxRoot disabled defaultChecked />
              Disabled checked
            </FieldLabel>
          </FieldRoot>
        </>
      )
    },
    {
      name: 'Labeling a checkbox',
      render: () => (
        <FieldRoot className='flex-row items-center gap-2'>
          <FieldLabel className='flex items-center gap-2'>
            <CheckboxRoot />
            Accept terms and conditions
          </FieldLabel>
        </FieldRoot>
      )
    },
    {
      name: 'Rendering as a native button',
      render: () => (
        <FieldRoot className='flex-row items-center gap-2'>
          <CheckboxRoot id='notifications-checkbox' nativeButton render={<button />} />
          <FieldLabel nativeLabel={false} render={<span />}>
            Enable notifications
          </FieldLabel>
        </FieldRoot>
      )
    },
    {
      name: 'Render callback',
      render: () => (
        <FieldRoot className='flex-row items-center gap-2'>
          <CheckboxRoot nativeButton render={(buttonProps) => <button {...buttonProps} />} />
          <FieldLabel nativeLabel={false} render={<span />}>
            Enable notifications
          </FieldLabel>
        </FieldRoot>
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
