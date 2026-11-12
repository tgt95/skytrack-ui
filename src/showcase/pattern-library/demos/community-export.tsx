import { useRef, useState } from 'react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogBackdrop,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPopup,
  DialogPortal,
  DialogTitle
} from '@/components/ui/dialog'
import { FieldDescription, FieldError, FieldLabel, FieldRoot } from '@/components/ui/field'
import { FieldsetLegend, FieldsetRoot } from '@/components/ui/fieldset'
import { Input } from '@/components/ui/input'
import { Progress, ProgressIndicator, ProgressLabel, ProgressTrack } from '@/components/ui/progress'
import { RadioGroup, RadioRoot } from '@/components/ui/radio'
import { ToastPortal, ToastProvider, ToastViewport, useToastManager } from '@/components/ui/toast'
import { DemoFrame, UseCaseSection, ToastItems } from './shared'

export function ExportDemo() {
  const toastManager = useToastManager()
  const [format, setFormat] = useState('CSV')
  const [preparing, setPreparing] = useState(false)
  const [progressError, setProgressError] = useState(false)
  const [downloadStatus, setDownloadStatus] = useState('No download preview has been opened.')
  const [configurationStatus, setConfigurationStatus] = useState('No export configuration has been prepared.')
  const [progressStatus, setProgressStatus] = useState('Export preparation has not started.')
  const [completionStatus, setCompletionStatus] = useState('No completion preview has been opened.')
  const [fileName, setFileName] = useState('mission-report.csv')
  const [exportError, setExportError] = useState('')
  const [configurationOpen, setConfigurationOpen] = useState(false)
  const [completionOpen, setCompletionOpen] = useState(false)
  const prepareExportRef = useRef<HTMLButtonElement>(null)
  const progressErrorCloseRef = useRef<HTMLButtonElement>(null)
  const completionCloseRef = useRef<HTMLButtonElement>(null)
  const prepareExport = () => {
    const normalizedName = fileName.trim()
    if (!normalizedName) {
      setExportError('Enter a file name before preparing the export.')
      return
    }
    if (!normalizedName.toLowerCase().endsWith(`.${format.toLowerCase()}`)) {
      setExportError(`Use the .${format.toLowerCase()} extension for the selected format.`)
      return
    }
    setExportError('')
    setConfigurationOpen(false)
    setConfigurationStatus(`${normalizedName} is prepared as ${format} in this preview. No file was created.`)
  }
  return (
    <DemoFrame>
      <UseCaseSection
        title='Download a standard report with its intuitive name'
        scenario='When the user needs the default report and no format or destination choice, offer a direct download action without an extra form.'
      >
        <Button
          onClick={() =>
            setDownloadStatus(
              'mission-summary.csv is shown as the default filename. This preview does not create or download a file.'
            )
          }
        >
          Preview standard download
        </Button>
        <p role='status' aria-live='polite' className='text-muted-foreground'>
          {downloadStatus}
        </p>
      </UseCaseSection>
      <UseCaseSection
        title='Customize a report before export'
        scenario='When users need to rename a report or choose its format, collect those choices in a dialog before preparing the export.'
      >
        <p className='text-sm text-muted-foreground'>
          Choose a format with its guidance. A browser download uses the browser’s Save dialog for location; this
          preview does not open that system dialog or create a file.
        </p>
        <Button onClick={() => setConfigurationOpen(true)}>Configure export</Button>
        <p role='status' aria-live='polite' className='text-muted-foreground'>
          {configurationStatus}
        </p>
        <Dialog open={configurationOpen} onOpenChange={setConfigurationOpen}>
          <DialogPortal>
            <DialogBackdrop />
            <DialogPopup initialFocus={prepareExportRef}>
              <DialogHeader>
                <DialogTitle>Export mission report</DialogTitle>
                <DialogDescription>Choose a file name and format before preparing the report.</DialogDescription>
              </DialogHeader>
              <DialogFooter className='order-last sm:flex-row-reverse'>
                <Button ref={prepareExportRef} onClick={prepareExport}>
                  Prepare export
                </Button>
                <DialogClose variant='outline'>Cancel</DialogClose>
              </DialogFooter>
              <FieldRoot invalid={Boolean(exportError)}>
                <FieldLabel>File name</FieldLabel>
                <Input
                  value={fileName}
                  onChange={(event) => {
                    setFileName(event.target.value)
                    setExportError('')
                  }}
                />
                <FieldDescription>Include the extension that matches the selected format.</FieldDescription>
                <FieldError match={Boolean(exportError)}>{exportError}</FieldError>
              </FieldRoot>
              <FieldsetRoot>
                <FieldsetLegend>Export format</FieldsetLegend>
                <RadioGroup
                  aria-label='Export format'
                  value={format}
                  onValueChange={(nextValue) => {
                    setFormat(String(nextValue))
                    setExportError('')
                  }}
                >
                  <label className='flex items-start gap-2'>
                    <RadioRoot value='CSV' />
                    <span>
                      <span className='block text-sm font-medium'>CSV</span>
                      <span className='block text-sm text-muted-foreground'>Use for spreadsheet workflows.</span>
                    </span>
                  </label>
                  <label className='flex items-start gap-2'>
                    <RadioRoot value='JSON' />
                    <span>
                      <span className='block text-sm font-medium'>JSON</span>
                      <span className='block text-sm text-muted-foreground'>Keep structured record fields.</span>
                    </span>
                  </label>
                  <label className='flex items-start gap-2'>
                    <RadioRoot value='GeoJSON' />
                    <span>
                      <span className='block text-sm font-medium'>GeoJSON</span>
                      <span className='block text-sm text-muted-foreground'>Include geographic coordinates.</span>
                    </span>
                  </label>
                </RadioGroup>
              </FieldsetRoot>
            </DialogPopup>
          </DialogPortal>
        </Dialog>
      </UseCaseSection>
      <UseCaseSection
        title='Track preparation and recover from an export failure'
        scenario='Show progress only while preparation runs, then communicate completion or a recoverable destination error.'
      >
        <div aria-busy={preparing} className='grid max-w-xl gap-2'>
          {preparing && (
            <Progress value={null}>
              <ProgressLabel>Preparing export</ProgressLabel>
              <ProgressTrack>
                <ProgressIndicator />
              </ProgressTrack>
            </Progress>
          )}
          <Button
            size='sm'
            variant='outline'
            onClick={() => {
              if (preparing) {
                setPreparing(false)
                setProgressStatus('Export preparation complete. No file was created.')
              } else {
                setProgressError(false)
                setPreparing(true)
                setProgressStatus(`Preparing ${format} export in this preview.`)
              }
            }}
          >
            {preparing ? 'Finish preparation' : 'Start preparation'}
          </Button>
          <Button
            size='sm'
            variant='ghost'
            disabled={preparing}
            onClick={() => {
              setProgressError(true)
              setProgressStatus('A destination error is being previewed.')
            }}
          >
            Preview export failure
          </Button>
        </div>
        <p role='status' aria-live='polite' className='text-muted-foreground'>
          {progressStatus}
        </p>
        <Dialog open={progressError} onOpenChange={setProgressError}>
          <DialogPortal>
            <DialogBackdrop />
            <DialogPopup initialFocus={progressErrorCloseRef}>
              <DialogHeader>
                <DialogTitle>Export preparation failed</DialogTitle>
                <DialogDescription>The report could not be prepared. Retry or close this message.</DialogDescription>
              </DialogHeader>
              <Alert variant='destructive'>
                <AlertTitle>Destination unavailable</AlertTitle>
                <AlertDescription>This is a local failure preview. No file was created.</AlertDescription>
              </Alert>
              <DialogFooter>
                <DialogClose ref={progressErrorCloseRef} variant='outline'>
                  Close error
                </DialogClose>
                <Button
                  onClick={() => {
                    setProgressError(false)
                    setPreparing(true)
                    setProgressStatus('Retrying export preparation in this preview.')
                  }}
                >
                  Retry preparation
                </Button>
              </DialogFooter>
            </DialogPopup>
          </DialogPortal>
        </Dialog>
      </UseCaseSection>
      <UseCaseSection
        title='Confirm export completion without implying a download'
        scenario='After a successful export, show a passive completion message and a separate brief notification; make the local-only result explicit.'
      >
        <p className='text-sm text-muted-foreground'>The completion dialog and notification below are previews only.</p>
        <div className='flex flex-wrap gap-2'>
          <Button
            size='sm'
            variant='outline'
            onClick={() => {
              setCompletionOpen(true)
              setCompletionStatus('Completion dialog preview opened; no file was created or saved.')
            }}
          >
            Preview completion dialog
          </Button>
          <Button
            size='sm'
            variant='outline'
            onClick={() => {
              setCompletionStatus('Success notification preview shown; no file was downloaded.')
              toastManager.add({
                type: 'success',
                title: 'Export ready',
                description: `${fileName}.${format.toLowerCase()} was prepared in this sample. No file was created.`
              })
            }}
          >
            Preview success notification
          </Button>
        </div>
        <p role='status' aria-live='polite' className='text-muted-foreground'>
          {completionStatus}
        </p>
        <Dialog open={completionOpen} onOpenChange={setCompletionOpen}>
          <DialogPortal>
            <DialogBackdrop />
            <DialogPopup initialFocus={completionCloseRef}>
              <DialogHeader>
                <DialogTitle>Export prepared</DialogTitle>
                <DialogDescription>{fileName} is ready in this sample. No file was created or saved.</DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose ref={completionCloseRef}>Close completion message</DialogClose>
              </DialogFooter>
            </DialogPopup>
          </DialogPortal>
        </Dialog>
      </UseCaseSection>
    </DemoFrame>
  )
}

export function ExportDemoWithProvider() {
  return (
    <ToastProvider>
      <ExportDemo />
      <ToastPortal>
        <ToastViewport>
          <ToastItems />
        </ToastViewport>
      </ToastPortal>
    </ToastProvider>
  )
}
