import { useState } from 'react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogClose,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogPopup,
  AlertDialogPortal,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
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
import { FieldLabel, FieldRoot } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Progress, ProgressIndicator, ProgressLabel, ProgressTrack, ProgressValue } from '@/components/ui/progress'
import { DemoFrame, UseCaseSection } from './shared'

export function CreateFlowsDemo() {
  const [mode, setMode] = useState<'inline' | 'modal'>('inline')
  const [open, setOpen] = useState(false)
  const [panelOpen, setPanelOpen] = useState(false)
  const [fullPageOpen, setFullPageOpen] = useState(false)
  const [setupStep, setSetupStep] = useState(1)
  const [workspaceName, setWorkspaceName] = useState('Northstar Flight Operations')
  const [operatingArea, setOperatingArea] = useState('North coast survey zone')
  const [discardOpen, setDiscardOpen] = useState(false)
  const [createProgress, setCreateProgress] = useState(0)
  const [name, setName] = useState('North coast survey')
  const [created, setCreated] = useState('')
  const [sidePanelResult, setSidePanelResult] = useState('')
  const [fullPageResult, setFullPageResult] = useState('')
  const [selectedCollectionMission, setSelectedCollectionMission] = useState('North coast survey')
  const create = () => {
    if (!name.trim()) return
    setCreated(name.trim())
    setOpen(false)
  }
  const quickFields = (
    <FieldRoot>
      <FieldLabel>Mission name</FieldLabel>
      <Input value={name} onChange={(event) => setName(event.target.value)} required />
    </FieldRoot>
  )
  const fields = (
    <>
      <FieldRoot>
        <FieldLabel>Mission name</FieldLabel>
        <Input value={name} onChange={(event) => setName(event.target.value)} required />
      </FieldRoot>
      <FieldRoot>
        <FieldLabel>Purpose</FieldLabel>
        <Input defaultValue='Coastal mapping' />
      </FieldRoot>
    </>
  )
  return (
    <DemoFrame>
      <UseCaseSection
        title={mode === 'inline' ? 'Create a quick mission inline' : 'Create a mission in a focused dialog'}
        scenario={
          mode === 'inline'
            ? 'Create a new one-field mission while keeping the collection visible; use this compact route when no extra context is needed.'
            : 'Use a modal for a short task that needs focused attention but not a full page.'
        }
      >
        <div className='flex flex-wrap gap-2'>
          <Button
            size='sm'
            variant={mode === 'inline' ? 'secondary' : 'outline'}
            aria-pressed={mode === 'inline'}
            onClick={() => setMode('inline')}
          >
            Inline
          </Button>
          <Button
            size='sm'
            variant={mode === 'modal' ? 'secondary' : 'outline'}
            aria-pressed={mode === 'modal'}
            onClick={() => setMode('modal')}
          >
            Modal
          </Button>
        </div>
        {mode === 'inline' ? (
          <section className='space-y-3 rounded-(--radius) border border-border p-4'>
            <div>
              <h4 className='font-medium'>Quick create</h4>
              <p className='text-muted-foreground'>One short step; keep the user in context.</p>
            </div>
            {quickFields}
            <div className='flex gap-2'>
              <Button onClick={create} disabled={!name.trim()}>
                Create mission
              </Button>
              <Button variant='outline' onClick={() => setName('')}>
                Clear
              </Button>
            </div>
          </section>
        ) : (
          <>
            <Button onClick={() => setOpen(true)}>Create mission</Button>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogPortal>
                <DialogBackdrop />
                <DialogPopup>
                  <DialogHeader>
                    <DialogTitle>New mission</DialogTitle>
                    <DialogDescription>Use a focused modal for this short creation task.</DialogDescription>
                  </DialogHeader>
                  {fields}
                  <DialogFooter>
                    <DialogClose variant='outline'>Cancel</DialogClose>
                    <Button onClick={create} disabled={!name.trim()}>
                      Create mission
                    </Button>
                  </DialogFooter>
                </DialogPopup>
              </DialogPortal>
            </Dialog>
          </>
        )}
        {created && (
          <Alert variant='success'>
            <AlertTitle>Mission created</AlertTitle>
            <AlertDescription>{created} · local sample only.</AlertDescription>
          </Alert>
        )}
        <p className='text-muted-foreground'>
          Creating a new resource is different from adding an existing one. Side-panel, tearsheet, and full-page
          surfaces suit more complex creation flows.
        </p>
      </UseCaseSection>
      <UseCaseSection
        title='Create a complex mission in a side panel'
        scenario='Keep the collection visible beside a longer creation task; this uses the library Drawer as the side-panel surface.'
      >
        <div className='grid min-w-0 gap-4 md:grid-cols-[minmax(0,1fr)_minmax(18rem,0.8fr)]'>
          <section aria-label='Mission collection' className='min-w-0 space-y-3 border border-border p-4'>
            <div>
              <h5 className='text-base font-medium text-(--foreground)'>Mission collection</h5>
              <p className='text-sm text-muted-foreground'>
                Select or review a mission while the create panel is open.
              </p>
            </div>
            <div className='grid gap-2'>
              {['North coast survey', 'River mapping'].map((mission) => (
                <Button
                  key={mission}
                  size='sm'
                  variant={selectedCollectionMission === mission ? 'secondary' : 'ghost'}
                  className='justify-start'
                  aria-pressed={selectedCollectionMission === mission}
                  onClick={() => setSelectedCollectionMission(mission)}
                >
                  {mission}
                </Button>
              ))}
            </div>
            {!panelOpen && (
              <Button variant='outline' onClick={() => setPanelOpen(true)}>
                Create a mission
              </Button>
            )}
          </section>
          {panelOpen && (
            <aside aria-label='New mission side panel' className='min-w-0 space-y-3 border border-border p-4'>
              <div>
                <h5 className='text-base font-medium text-(--foreground)'>New mission</h5>
                <p className='text-sm text-muted-foreground'>
                  Create beside {selectedCollectionMission}; the collection stays usable.
                </p>
              </div>
              {fields}
              <div className='flex flex-wrap gap-2'>
                <Button variant='outline' onClick={() => setPanelOpen(false)}>
                  Cancel
                </Button>
                <Button
                  disabled={!name.trim()}
                  onClick={() => {
                    setSidePanelResult(`${name.trim()} prepared in the local preview; no mission was saved.`)
                    setPanelOpen(false)
                  }}
                >
                  Create mission
                </Button>
              </div>
            </aside>
          )}
        </div>
        {sidePanelResult && (
          <p role='status' aria-live='polite' className='text-sm text-muted-foreground'>
            {sidePanelResult}
          </p>
        )}
      </UseCaseSection>
      <UseCaseSection
        title='Give a multi-step creation task a full-page canvas'
        scenario='Set up the initial flight-operations workspace that dispatchers must complete before mission planning is available. This preview uses a dedicated two-step canvas.'
      >
        {fullPageOpen ? (
          <section className='space-y-4 border border-border p-4'>
            <p className='sub-heading'>REQUIRED INITIAL SETUP · FULL-PAGE PREVIEW</p>
            <div className='grid gap-4 md:grid-cols-[16rem_minmax(0,1fr)]'>
              <ol aria-label='Workspace setup steps' className='space-y-3 border-s border-border ps-4'>
                <li aria-current={setupStep === 1 ? 'step' : undefined}>
                  <span className={setupStep === 1 ? 'font-medium text-(--foreground)' : 'text-muted-foreground'}>
                    1. Workspace details
                  </span>
                </li>
                <li aria-current={setupStep === 2 ? 'step' : undefined}>
                  <span className={setupStep === 2 ? 'font-medium text-(--foreground)' : 'text-muted-foreground'}>
                    2. Operating area
                  </span>
                </li>
              </ol>
              <div className='min-w-0 space-y-3'>
                <h5 className='text-base font-medium text-(--foreground)'>
                  Step {setupStep} of 2 · {setupStep === 1 ? 'Workspace details' : 'Operating area'}
                </h5>
                {setupStep === 1 ? (
                  <FieldRoot>
                    <FieldLabel>Workspace name</FieldLabel>
                    <Input value={workspaceName} onChange={(event) => setWorkspaceName(event.target.value)} required />
                  </FieldRoot>
                ) : (
                  <>
                    <FieldRoot>
                      <FieldLabel>Primary operating area</FieldLabel>
                      <Input
                        value={operatingArea}
                        onChange={(event) => setOperatingArea(event.target.value)}
                        required
                      />
                    </FieldRoot>
                    <p className='text-sm text-muted-foreground'>Workspace: {workspaceName}</p>
                    <p className='text-sm text-muted-foreground'>
                      Mission planning is unavailable until setup finishes.
                    </p>
                  </>
                )}
              </div>
            </div>
            <div className='flex flex-wrap justify-end gap-2 border-t border-border pt-3'>
              <Button variant='outline' onClick={() => setDiscardOpen(true)}>
                Cancel setup
              </Button>
              {setupStep === 2 && (
                <Button variant='outline' onClick={() => setSetupStep(1)}>
                  Previous step
                </Button>
              )}
              {setupStep === 1 ? (
                <Button disabled={!workspaceName.trim()} onClick={() => setSetupStep(2)}>
                  Next step
                </Button>
              ) : (
                <Button
                  disabled={!workspaceName.trim() || !operatingArea.trim()}
                  onClick={() => {
                    setFullPageResult(
                      `Initial setup for ${workspaceName.trim()} is complete in this local preview; no workspace was saved.`
                    )
                    setFullPageOpen(false)
                  }}
                >
                  Complete setup
                </Button>
              )}
            </div>
            <AlertDialog open={discardOpen} onOpenChange={setDiscardOpen}>
              <AlertDialogPortal>
                <AlertDialogBackdrop />
                <AlertDialogPopup>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Discard workspace setup?</AlertDialogTitle>
                    <AlertDialogDescription>Your unsaved setup details will be discarded.</AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogClose>Keep editing</AlertDialogClose>
                    <Button
                      variant='destructive'
                      onClick={() => {
                        setFullPageOpen(false)
                        setSetupStep(1)
                        setWorkspaceName('Northstar Flight Operations')
                        setOperatingArea('North coast survey zone')
                        setDiscardOpen(false)
                      }}
                    >
                      Discard setup
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogPopup>
              </AlertDialogPortal>
            </AlertDialog>
          </section>
        ) : (
          <Button
            variant='outline'
            onClick={() => {
              setSetupStep(1)
              setFullPageOpen(true)
            }}
          >
            Preview required workspace setup
          </Button>
        )}
        {fullPageResult && (
          <p role='status' aria-live='polite' className='text-sm text-muted-foreground'>
            {fullPageResult}
          </p>
        )}
      </UseCaseSection>
      <UseCaseSection
        title='Use a narrow tearsheet for a compact create task'
        scenario='When a create form needs vertical scrolling, use a narrow tearsheet to group related fields while keeping its actions visible.'
      >
        <div className='mx-auto flex h-96 w-full max-w-sm flex-col border border-border bg-background shadow-sm'>
          <div className='space-y-1 border-b border-border p-4'>
            <h5 className='text-base font-medium text-(--foreground)'>New mission</h5>
            <p className='text-muted-foreground'>Narrow tearsheet · scrollable form</p>
          </div>
          <div className='min-h-0 flex-1 space-y-4 overflow-y-auto p-4'>
            <section aria-labelledby='narrow-tearsheet-mission-details' className='space-y-3'>
              <h6 id='narrow-tearsheet-mission-details' className='font-medium'>
                Mission details
              </h6>
              <FieldRoot>
                <FieldLabel>Mission name</FieldLabel>
                <Input defaultValue='Coastal survey' readOnly />
              </FieldRoot>
              <FieldRoot>
                <FieldLabel>Collection</FieldLabel>
                <Input defaultValue='North region' readOnly />
              </FieldRoot>
            </section>
            <section aria-labelledby='narrow-tearsheet-flight-settings' className='space-y-3'>
              <h6 id='narrow-tearsheet-flight-settings' className='font-medium'>
                Flight settings
              </h6>
              <FieldRoot>
                <FieldLabel>Operating area</FieldLabel>
                <Input defaultValue='North coast survey zone' readOnly />
              </FieldRoot>
              <FieldRoot>
                <FieldLabel>Return reserve</FieldLabel>
                <Input defaultValue='25% battery' readOnly />
              </FieldRoot>
              <FieldRoot>
                <FieldLabel>Review owner</FieldLabel>
                <Input defaultValue='Flight operations' readOnly />
              </FieldRoot>
            </section>
          </div>
          <div className='flex flex-wrap justify-end gap-2 border-t border-border p-4'>
            <Button size='sm' variant='outline' disabled>
              Cancel
            </Button>
            <Button size='sm' disabled>
              Create
            </Button>
          </div>
        </div>
        <p className='text-muted-foreground'>Static layout preview; Tearsheet is not shipped in `skytrack-ui`.</p>
      </UseCaseSection>
      <UseCaseSection
        title='Use a wide tearsheet when the task needs more room'
        scenario='Show a multi-step mission setup that needs a progress rail and roomy review area; the overlay blocks the page until operators finish or exit the flow.'
      >
        <div className='mx-auto grid min-h-72 w-full max-w-4xl grid-cols-1 border border-border bg-background shadow-sm md:grid-cols-[15rem_minmax(0,1fr)]'>
          <aside aria-label='Setup progress' className='border-b border-border p-4 md:border-b-0 md:border-r'>
            <p className='sub-heading'>MISSION SETUP · STEP 2 OF 2</p>
            <ol aria-label='Mission setup steps' className='mt-4 space-y-3'>
              <li className='text-muted-foreground'>1. Mission details · complete</li>
              <li aria-current='step' className='font-medium text-(--foreground)'>
                2. Review operating area
              </li>
            </ol>
          </aside>
          <div className='flex min-w-0 flex-col'>
            <div className='space-y-1 border-b border-border p-4'>
              <h5 className='text-base font-medium text-(--foreground)'>Review mission setup</h5>
              <p className='text-muted-foreground'>The progress rail keeps this two-step task oriented.</p>
            </div>
            <div className='grid flex-1 gap-3 p-4'>
              <FieldRoot>
                <FieldLabel>Mission name</FieldLabel>
                <Input defaultValue='North coast survey' readOnly />
              </FieldRoot>
              <FieldRoot>
                <FieldLabel>Operating area</FieldLabel>
                <Input defaultValue='North coast survey zone' readOnly />
              </FieldRoot>
            </div>
          </div>
          <aside className='space-y-2 border-t border-border bg-muted/30 p-4 md:col-span-2'>
            <h5 className='text-base font-medium text-(--foreground)'>Why this surface fits</h5>
            <p className='text-muted-foreground'>
              Use a wide tearsheet when users need a progress rail and spacious review, but the full product does not
              need to remain blocked until setup is complete.
            </p>
          </aside>
          <div className='flex flex-wrap justify-end gap-2 border-t border-border p-4 md:col-span-2'>
            <Button size='sm' variant='outline' disabled>
              Cancel
            </Button>
            <Button size='sm' disabled>
              Create
            </Button>
          </div>
        </div>
        <p className='text-muted-foreground'>
          Tearsheet is not a shipped `skytrack-ui` component; this responsive layout is illustrative.
        </p>
      </UseCaseSection>
      <UseCaseSection
        title='Show completion and a brief loading state'
        scenario='After the user submits a create flow, communicate that local preparation is in progress and then show completion.'
      >
        <Progress value={createProgress}>
          <ProgressLabel>Preparing mission record · local sample</ProgressLabel>
          <ProgressValue />
          <ProgressTrack>
            <ProgressIndicator />
          </ProgressTrack>
        </Progress>
        {createProgress >= 100 ? (
          <Alert variant='success'>
            <AlertTitle>Draft ready</AlertTitle>
            <AlertDescription>No mission was saved outside this demo.</AlertDescription>
          </Alert>
        ) : (
          <Button size='sm' onClick={() => setCreateProgress((value) => Math.min(100, value + 50))}>
            {createProgress === 0 ? 'Submit sample mission' : 'Continue preparation'}
          </Button>
        )}
        <Button size='sm' variant='ghost' disabled={createProgress === 0} onClick={() => setCreateProgress(0)}>
          Reset sample
        </Button>
      </UseCaseSection>
    </DemoFrame>
  )
}
