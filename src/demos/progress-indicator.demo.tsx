import { ProgressStepIndicator } from '@/components/ui/progress-indicator'
import type { DemoMeta } from '@/showcase/demo'

const setupSteps = [
  { label: 'Workspace', description: 'Choose a team workspace.' },
  { label: 'Flight plan', description: 'Add sample route details.' },
  { label: 'Review', description: 'Check the saved configuration.' },
  { label: 'Finish', description: 'Complete setup.' }
]

export const demo: DemoMeta = {
  id: 'progress-indicator',
  title: 'Progress Indicator',
  description: 'Show completed, current, and upcoming steps in a linear multi-step task.',
  group: 'Data Display',
  variants: [
    {
      name: 'HORIZONTAL',
      render: () => (
        <div className='w-full space-y-2'>
          <p className='text-xs text-muted-foreground'>Sample workflow state only; no workspace is changed.</p>
          <ProgressStepIndicator aria-label='Workspace setup' steps={setupSteps} currentStep={2} />
        </div>
      )
    },
    {
      name: 'VERTICAL WITH ERROR',
      render: () => (
        <ProgressStepIndicator
          aria-label='Sample flight plan setup'
          orientation='vertical'
          currentStep={1}
          className='max-w-sm'
          steps={[
            { label: 'Workspace', description: 'Selected for this sample.', status: 'complete' },
            { label: 'Flight plan', description: 'One required field needs attention.', status: 'error' },
            { label: 'Review', description: 'Available after the current step.', status: 'upcoming' },
            { label: 'Optional notes', description: 'Can be completed later.', status: 'disabled', optional: true }
          ]}
        />
      )
    }
  ]
}
