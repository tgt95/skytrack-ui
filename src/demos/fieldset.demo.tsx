import { FieldsetRoot, FieldsetLegend } from '@/components/ui/fieldset'
import { FieldRoot, FieldLabel, FieldControl } from '@/components/ui/field'
import type { DemoMeta } from '@/showcase/demo'

export const demo: DemoMeta = {
  id: 'fieldset',
  title: 'Fieldset',
  description: 'A native fieldset element with an easily stylable legend.',
  group: 'Forms',
  variants: [
    {
      name: 'Default',
      render: () => (
        <FieldsetRoot className='w-64'>
          <FieldsetLegend className='border-b border-border pb-2'>Billing details</FieldsetLegend>
          <FieldRoot>
            <FieldLabel>Company</FieldLabel>
            <FieldControl placeholder='Enter company name' />
          </FieldRoot>
          <FieldRoot>
            <FieldLabel>Tax ID</FieldLabel>
            <FieldControl placeholder='Enter fiscal number' />
          </FieldRoot>
        </FieldsetRoot>
      )
    },
    {
      name: 'Legend without divider',
      render: () => (
        <FieldsetRoot className='w-64'>
          <FieldsetLegend>Preferences</FieldsetLegend>
          <FieldRoot>
            <FieldLabel>Language</FieldLabel>
            <FieldControl placeholder='English' />
          </FieldRoot>
        </FieldsetRoot>
      )
    }
  ]
}
