import {
  CheckCircleIcon,
  InfoIcon,
  WarningCircleIcon,
  WarningIcon
} from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Alert, AlertAction, AlertDescription, AlertTitle } from '@/components/ui/alert'
import type { DemoMeta } from '@/showcase/demo'

export const demo: DemoMeta = {
  id: 'alert',
  title: 'Alert',
  description: 'A callout for important information, feedback, and actions.',
  group: 'Data Display',
  variants: [
    {
      name: 'Semantic variants',
      render: () => (
        <div className='flex w-full max-w-xl flex-col gap-3'>
          <Alert>
            <InfoIcon className='mt-0.5 size-4 shrink-0' aria-hidden='true' />
            <div className='grid gap-1'>
              <AlertTitle>Heads up</AlertTitle>
              <AlertDescription>Review this information before continuing your mission setup.</AlertDescription>
            </div>
          </Alert>
          <Alert variant='info'>
            <InfoIcon className='mt-0.5 size-4 shrink-0' aria-hidden='true' />
            <div className='grid gap-1'>
              <AlertTitle>New flight plan tools</AlertTitle>
              <AlertDescription>Drafts now support reusable routes and shared checkpoints.</AlertDescription>
            </div>
          </Alert>
          <Alert variant='success'>
            <CheckCircleIcon className='mt-0.5 size-4 shrink-0' aria-hidden='true' />
            <div className='grid gap-1'>
              <AlertTitle>Mission saved</AlertTitle>
              <AlertDescription>Your changes are ready for review.</AlertDescription>
            </div>
          </Alert>
          <Alert variant='warning'>
            <WarningIcon className='mt-0.5 size-4 shrink-0' aria-hidden='true' />
            <div className='grid gap-1'>
              <AlertTitle>Battery reserve is low</AlertTitle>
              <AlertDescription>Check the return-to-home margin before launching.</AlertDescription>
            </div>
          </Alert>
          <Alert variant='destructive'>
            <WarningCircleIcon className='mt-0.5 size-4 shrink-0' aria-hidden='true' />
            <div className='grid gap-1'>
              <AlertTitle>Connection lost</AlertTitle>
              <AlertDescription>Telemetry stopped. Confirm the aircraft link before proceeding.</AlertDescription>
            </div>
          </Alert>
        </div>
      )
    },
    {
      name: 'With action',
      render: () => (
        <Alert variant='info' className='max-w-xl'>
          <InfoIcon className='mt-0.5 size-4 shrink-0' aria-hidden='true' />
          <div className='grid gap-1'>
            <AlertTitle>Dark mode is available</AlertTitle>
            <AlertDescription>Choose your preferred appearance in workspace settings.</AlertDescription>
          </div>
          <AlertAction>
            <Button variant='outline' size='sm'>
              Settings
            </Button>
          </AlertAction>
        </Alert>
      )
    }
  ]
}
