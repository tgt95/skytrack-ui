import { useEffect, useState } from 'react'
import { Progress, ProgressIndicator, ProgressLabel, ProgressTrack, ProgressValue } from '@/components/ui/progress'
import type { DemoMeta } from '@/showcase/demo'

function SimulatedProgress() {
  const [value, setValue] = useState(20)
  useEffect(() => {
    const interval = setInterval(() => {
      setValue((current) => Math.min(100, Math.round(current + Math.random() * 25)))
    }, 1000)
    return () => clearInterval(interval)
  }, [])
  return (
    <Progress value={value}>
      <ProgressLabel>Export data</ProgressLabel>
      <ProgressValue />
      <ProgressTrack>
        <ProgressIndicator />
      </ProgressTrack>
    </Progress>
  )
}

export const demo: DemoMeta = {
  id: 'progress',
  title: 'Progress',
  description:
    'A high-quality, unstyled React progress bar component that displays the status of a task that takes a long time.',
  group: 'Data Display',
  variants: [
    { name: 'Live value', render: () => <SimulatedProgress /> },
    {
      name: 'Complete and indeterminate',
      render: () => (
        <div className='flex flex-col gap-4'>
          <Progress value={100}>
            <ProgressLabel>Upload</ProgressLabel>
            <ProgressValue />
            <ProgressTrack>
              <ProgressIndicator />
            </ProgressTrack>
          </Progress>
          <Progress value={null}>
            <ProgressLabel>Loading</ProgressLabel>
            <ProgressValue />
            <ProgressTrack>
              <ProgressIndicator className='w-2/3' />
            </ProgressTrack>
          </Progress>
        </div>
      )
    }
  ]
}
