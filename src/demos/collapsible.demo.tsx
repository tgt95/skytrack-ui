import { CaretRightIcon } from '@phosphor-icons/react'
import { Collapsible, CollapsiblePanel, CollapsibleTrigger } from '@/components/ui/collapsible'
import type { DemoMeta } from '@/showcase/demo'

export const demo: DemoMeta = {
  id: 'collapsible',
  title: 'Collapsible',
  description: 'A high-quality, unstyled React collapsible component that displays a panel controlled by a button.',
  group: 'Layout',
  variants: [
    {
      name: 'Default',
      render: () => (
        <Collapsible className='min-h-36' defaultOpen={true}>
          <CollapsibleTrigger className='group flex w-full flex-row items-center justify-between gap-1 border border-border px-3 py-2'>
            Recovery keys
            <CaretRightIcon className='transition-transform duration-100 ease-out group-data-panel-open:rotate-90' />
          </CollapsibleTrigger>
          <CollapsiblePanel>
            <div className='flex flex-col gap-2 border border-t-0 border-border p-3 font-mono text-sm'>
              <div className='w-full'>alien-bean-pasta</div>
              <div className='w-full'>wild-irish-burrito</div>
              <div className='w-full'>horse-battery-staple</div>
            </div>
          </CollapsiblePanel>
        </Collapsible>
      )
    },
    {
      name: 'Hidden until found',
      render: () => (
        <Collapsible>
          <CollapsibleTrigger className='group flex w-full flex-row items-center justify-between gap-1 px-3 py-2'>
            Shipping details
            <CaretRightIcon className='transition-transform duration-100 ease-out group-data-panel-open:rotate-90' />
          </CollapsibleTrigger>
          <CollapsiblePanel hiddenUntilFound>
            <div className='border border-t-0 border-border px-3.5 py-2'>
              Standard shipping takes 3–5 business days.
            </div>
          </CollapsiblePanel>
        </Collapsible>
      )
    }
  ]
}
