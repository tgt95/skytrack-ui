import * as React from 'react'
import { CheckIcon, WarningCircleIcon } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

export type ProgressStepStatus = 'complete' | 'current' | 'upcoming' | 'error' | 'disabled'
export type ProgressIndicatorOrientation = 'horizontal' | 'vertical'

export type ProgressIndicatorStep = {
  label: string
  description?: string
  optional?: boolean
  status?: ProgressStepStatus
}

export type ProgressStepIndicatorProps = React.ComponentProps<'ol'> & {
  steps: ProgressIndicatorStep[]
  currentStep?: number
  orientation?: ProgressIndicatorOrientation
}

function getStepStatus(step: ProgressIndicatorStep, index: number, currentStep: number): ProgressStepStatus {
  return step.status ?? (index < currentStep ? 'complete' : index === currentStep ? 'current' : 'upcoming')
}

const markerClasses: Record<ProgressStepStatus, string> = {
  complete: 'border-primary bg-primary text-primary-foreground',
  current: 'border-primary bg-background text-primary',
  upcoming: 'border-border bg-background text-muted-foreground',
  error: 'border-destructive bg-background text-destructive',
  disabled: 'border-border bg-muted text-muted-foreground'
}

function ProgressStepIndicator({
  steps,
  currentStep = 0,
  orientation = 'horizontal',
  className,
  'aria-label': ariaLabel = 'Progress',
  ...props
}: ProgressStepIndicatorProps) {
  const safeCurrentStep = Math.min(Math.max(currentStep, 0), Math.max(steps.length - 1, 0))

  return (
    <ol
      aria-label={ariaLabel}
      data-slot='progress-indicator'
      data-orientation={orientation}
      className={cn('w-full', orientation === 'horizontal' ? 'flex items-start' : 'flex flex-col', className)}
      {...props}
    >
      {steps.map((step, index) => {
        const status = getStepStatus(step, index, safeCurrentStep)
        const isCurrent = status === 'current'
        const isComplete = status === 'complete'
        const isError = status === 'error'
        const isLast = index === steps.length - 1
        const MarkerIcon = isComplete ? CheckIcon : isError ? WarningCircleIcon : null

        return (
          <li
            key={`${step.label}-${index}`}
            data-status={status}
            aria-current={isCurrent ? 'step' : undefined}
            aria-disabled={status === 'disabled' || undefined}
            className={cn('min-w-0', orientation === 'horizontal' ? 'flex flex-1 flex-col gap-2' : 'flex gap-3')}
          >
            <div className={cn('flex', orientation === 'horizontal' ? 'w-full items-center' : 'flex-col items-center')}>
              <span
                aria-hidden='true'
                className={cn(
                  'flex size-7 shrink-0 items-center justify-center rounded-full border text-xs font-medium',
                  markerClasses[status]
                )}
              >
                {MarkerIcon ? <MarkerIcon className='size-4' weight='bold' /> : index + 1}
              </span>
              {!isLast && (
                <span
                  aria-hidden='true'
                  className={cn(
                    'bg-border',
                    isComplete && 'bg-primary',
                    orientation === 'horizontal' ? 'mx-2 h-px min-w-3 flex-1' : 'my-1 min-h-5 w-px'
                  )}
                />
              )}
            </div>
            <div
              className={cn(
                'min-w-0',
                orientation === 'horizontal' && !isLast && 'pe-4',
                orientation === 'vertical' && 'pb-4'
              )}
            >
              <p
                className={cn(
                  'text-sm font-medium',
                  status === 'disabled' ? 'text-muted-foreground' : 'text-foreground',
                  isError && 'text-destructive'
                )}
              >
                <span className='sr-only'>
                  {status === 'complete'
                    ? 'Completed: '
                    : status === 'current'
                      ? 'Current: '
                      : status === 'error'
                        ? 'Error: '
                        : status === 'disabled'
                          ? 'Unavailable: '
                          : 'Not started: '}
                </span>
                {step.label}
                {step.optional && <span className='ml-1 text-xs font-normal text-muted-foreground'>Optional</span>}
              </p>
              {step.description && <p className='mt-1 text-xs text-muted-foreground'>{step.description}</p>}
            </div>
          </li>
        )
      })}
    </ol>
  )
}

export { ProgressStepIndicator }
