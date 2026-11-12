import { Badge } from '@/components/ui/badge'
import { DemoFrame, UseCaseSection } from './shared'
import {
  ArrowDownIcon,
  ArrowUpIcon,
  BellIcon,
  CheckCircleIcon,
  FileTextIcon,
  WarningCircleIcon
} from '@phosphor-icons/react'

export function StatusIndicatorsDemo() {
  return (
    <DemoFrame>
      <UseCaseSection
        title='Show connection and attention states'
        scenario='A mission overview uses distinct symbols and text labels so status is not communicated by color alone.'
      >
        <ul className='grid gap-2'>
          <li className='flex items-center gap-2'>
            <CheckCircleIcon className='size-5 text-success' aria-hidden='true' />
            <span>Aircraft connection · Connected</span>
          </li>
          <li className='flex items-center gap-2'>
            <WarningCircleIcon className='size-5 text-warning' aria-hidden='true' />
            <span>Route review · Action needed</span>
          </li>
        </ul>
      </UseCaseSection>
      <UseCaseSection
        title='Scan operational readiness in a compact list'
        scenario='Use a shape plus a readable label to distinguish ready, review, and blocked items.'
      >
        <ul className='grid gap-2'>
          <li className='flex items-center gap-2'>
            <span aria-hidden='true' className='size-4 rounded-full border-2 border-success' />
            <span>Ready</span>
          </li>
          <li className='flex items-center gap-2'>
            <span aria-hidden='true' className='size-4 rotate-45 border-2 border-warning' />
            <span>Needs review</span>
          </li>
          <li className='flex items-center gap-2'>
            <span aria-hidden='true' className='size-4 border-2 border-destructive' />
            <span>Blocked</span>
          </li>
        </ul>
      </UseCaseSection>
      <UseCaseSection
        title='Summarize unread work in navigation'
        scenario='Show a queue count, an unread item, and the meaningful zero state.'
      >
        <div className='grid grid-cols-2 gap-4 text-center sm:grid-cols-4'>
          <div className='grid justify-items-center gap-1'>
            <span
              role='img'
              aria-label='Notifications icon with four unread items'
              className='relative inline-flex size-12 items-center justify-center rounded-(--radius) border border-border'
            >
              <BellIcon aria-hidden='true' className='size-5' />
              <Badge count={4} status='error' className='absolute -end-1 -top-1' />
            </span>
            <span className='text-sm text-muted-foreground'>4 unread</span>
          </div>
          <div className='grid justify-items-center gap-1'>
            <span
              role='img'
              aria-label='Operations icon with 999 or more unread items'
              className='relative inline-flex size-10 items-center justify-center rounded-(--radius) border border-border'
            >
              <FileTextIcon aria-hidden='true' className='size-4' />
              <Badge count={1200} maxCount={999} status='error' className='absolute -end-1 -top-1' />
            </span>
            <span className='text-sm text-muted-foreground'>999+ unread · capped</span>
          </div>
          <div className='grid justify-items-center gap-1'>
            <span
              role='img'
              aria-label='Reports icon with a new-item dot'
              className='relative inline-flex size-10 items-center justify-center rounded-(--radius) border border-border'
            >
              <FileTextIcon aria-hidden='true' className='size-4' />
              <Badge dot status='processing' className='absolute -end-1 -top-1' />
            </span>
            <span className='text-sm text-muted-foreground'>New report</span>
          </div>
          <div className='grid justify-items-center gap-1'>
            <span
              role='img'
              aria-label='Review queue icon with no unread badge'
              className='inline-flex size-10 items-center justify-center rounded-(--radius) border border-border'
            >
              <CheckCircleIcon aria-hidden='true' className='size-4' />
            </span>
            <span className='text-sm text-muted-foreground'>0 unread · badge hidden</span>
          </div>
        </div>
      </UseCaseSection>
      <UseCaseSection
        title='Compare operational trends over time'
        scenario='Make the comparison period explicit when reporting mission completion or aircraft health changes.'
      >
        <div className='grid gap-2 sm:grid-cols-2'>
          <p className='flex items-center gap-2'>
            <ArrowUpIcon className='size-4 text-success' aria-hidden='true' />
            <strong>+12%</strong>
            <span className='text-muted-foreground'>sample task completion vs. prior period</span>
          </p>
          <p className='flex items-center gap-2'>
            <ArrowDownIcon className='size-4 text-destructive' aria-hidden='true' />
            <strong>−4%</strong>
            <span className='text-muted-foreground'>sample service availability vs. prior period</span>
          </p>
        </div>
      </UseCaseSection>
      <p className='text-muted-foreground'>
        Sample data only. Color is never the only signal; these labels and percentages do not define operational
        thresholds or flight guidance.
      </p>
    </DemoFrame>
  )
}
