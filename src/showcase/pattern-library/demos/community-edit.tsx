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
import {
  Drawer,
  DrawerBackdrop,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerPopup,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
  DrawerViewport
} from '@/components/ui/drawer'
import { FieldDescription, FieldLabel, FieldRoot } from '@/components/ui/field'
import { InlineEdit, InlineEditInput, InlineEditTrigger } from '@/components/ui/inline-edit'
import { Input } from '@/components/ui/input'
import { DemoFrame, UseCaseSection } from './shared'

export function EditDemo() {
  const [name, setName] = useState('North coast survey')
  const [draft, setDraft] = useState(name)
  const [mode, setMode] = useState<'inline' | 'high-impact'>('inline')
  const [open, setOpen] = useState(false)
  const [highImpactConfirmOpen, setHighImpactConfirmOpen] = useState(false)
  const [editPanelOpen, setEditPanelOpen] = useState(false)
  const [panelImpact, setPanelImpact] = useState<'low' | 'high'>('low')
  const [panelReviewing, setPanelReviewing] = useState(false)
  const [editPageOpen, setEditPageOpen] = useState(false)
  const [fullPageConfirmOpen, setFullPageConfirmOpen] = useState(false)
  const [inlineStatus, setInlineStatus] = useState('')
  const [modalStatus, setModalStatus] = useState('')
  const [panelStatus, setPanelStatus] = useState('')
  const [pageStatus, setPageStatus] = useState('')
  return (
    <DemoFrame>
      <UseCaseSection
        title={mode === 'inline' ? 'Make a low-impact inline change' : 'Review a higher-impact edit before saving'}
        scenario={
          mode === 'inline'
            ? 'Update a short mission label directly in its record.'
            : 'Show the current value and change summary before committing a consequential route update.'
        }
      >
        <div className='flex flex-wrap gap-2'>
          <Button
            size='sm'
            variant={mode === 'inline' ? 'secondary' : 'outline'}
            aria-pressed={mode === 'inline'}
            onClick={() => setMode('inline')}
          >
            Low-impact · inline
          </Button>
          <Button
            size='sm'
            variant={mode === 'high-impact' ? 'secondary' : 'outline'}
            aria-pressed={mode === 'high-impact'}
            onClick={() => {
              setDraft(name)
              setMode('high-impact')
            }}
          >
            High-impact · modal
          </Button>
        </div>
        {mode === 'inline' ? (
          <section className='space-y-3 rounded-(--radius) border border-border p-4'>
            <div>
              <h4 className='font-medium'>Quick value edit</h4>
              <p className='text-muted-foreground'>Use for a short, low-impact change in context.</p>
            </div>
            <InlineEdit
              value={name}
              onValueChange={(value) => {
                setName(value)
                setInlineStatus('Mission name updated in this sample.')
              }}
              label='Mission name'
            >
              <InlineEditTrigger
                render={
                  <Button variant='ghost' className='h-auto justify-start whitespace-normal px-2 py-1 text-left' />
                }
              />
              <InlineEditInput />
            </InlineEdit>
          </section>
        ) : (
          <section className='space-y-3 rounded-(--radius) border border-border p-4'>
            <div>
              <h4 className='font-medium'>Review before saving</h4>
              <p className='text-muted-foreground'>Use a focused surface for higher-impact edits.</p>
            </div>
            <p>
              Current mission: <strong>{name}</strong>
            </p>
            <Button onClick={() => setOpen(true)}>Edit mission details</Button>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogPortal>
                <DialogBackdrop />
                <DialogPopup>
                  <DialogHeader>
                    <DialogTitle>Edit mission</DialogTitle>
                    <DialogDescription>Review the proposed change before saving.</DialogDescription>
                  </DialogHeader>
                  <FieldRoot>
                    <FieldLabel>Mission name</FieldLabel>
                    <Input value={draft} onChange={(event) => setDraft(event.target.value)} />
                  </FieldRoot>
                  <FieldRoot>
                    <FieldLabel>Assigned flight area · read-only</FieldLabel>
                    <Input value='North coast' readOnly />
                    <FieldDescription>This assignment is managed by mission operations.</FieldDescription>
                  </FieldRoot>
                  <p className='text-muted-foreground'>
                    Change summary: {name} → {draft}
                  </p>
                  <DialogFooter>
                    <DialogClose variant='outline'>Cancel</DialogClose>
                    <Button
                      onClick={() => {
                        setOpen(false)
                        setHighImpactConfirmOpen(true)
                      }}
                    >
                      Review change
                    </Button>
                  </DialogFooter>
                </DialogPopup>
              </DialogPortal>
            </Dialog>
            <AlertDialog open={highImpactConfirmOpen} onOpenChange={setHighImpactConfirmOpen}>
              <AlertDialogPortal>
                <AlertDialogBackdrop />
                <AlertDialogPopup>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Confirm this higher-impact edit</AlertDialogTitle>
                    <AlertDialogDescription>
                      This changes the mission name dispatchers use to identify it in review lists. This sample has no
                      undo; no live mission is modified.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <p>
                    Mission name: {name} → {draft}
                  </p>
                  <AlertDialogFooter>
                    <AlertDialogClose onClick={() => setOpen(true)}>Keep editing</AlertDialogClose>
                    <Button
                      variant='destructive'
                      onClick={() => {
                        setName(draft)
                        setModalStatus('Mission name saved in this sample after confirmation.')
                        setHighImpactConfirmOpen(false)
                      }}
                    >
                      Confirm edit
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogPopup>
              </AlertDialogPortal>
            </AlertDialog>
          </section>
        )}
        {inlineStatus && mode === 'inline' && (
          <p role='status' aria-live='polite' className='text-muted-foreground'>
            {inlineStatus}
          </p>
        )}
        {modalStatus && mode === 'high-impact' && (
          <Alert variant='success'>
            <AlertTitle>Change confirmed</AlertTitle>
            <AlertDescription>{modalStatus}</AlertDescription>
          </Alert>
        )}
        <p className='text-muted-foreground'>
          The examples cover inline, modal, side-panel, and full-page layouts. Changes stay in local state.
        </p>
      </UseCaseSection>
      <UseCaseSection
        title='Keep a broader edit in a side panel'
        scenario='Keep the mission list in context; save low-impact edits directly or review a warning stage for high-impact changes.'
      >
        <div className='flex flex-wrap gap-2' role='group' aria-label='Side-panel edit impact'>
          <Button
            size='sm'
            variant={panelImpact === 'low' ? 'secondary' : 'outline'}
            aria-pressed={panelImpact === 'low'}
            onClick={() => setPanelImpact('low')}
          >
            Low impact
          </Button>
          <Button
            size='sm'
            variant={panelImpact === 'high' ? 'secondary' : 'outline'}
            aria-pressed={panelImpact === 'high'}
            onClick={() => setPanelImpact('high')}
          >
            High impact
          </Button>
        </div>
        <Drawer open={editPanelOpen} onOpenChange={setEditPanelOpen} swipeDirection='right'>
          <DrawerTrigger
            onClick={() => {
              setDraft(name)
              setPanelReviewing(false)
            }}
          >
            Open mission edit panel
          </DrawerTrigger>
          <DrawerPortal>
            <DrawerBackdrop />
            <DrawerViewport side='right'>
              <DrawerPopup side='right'>
                <DrawerContent>
                  <DrawerTitle>Edit mission details</DrawerTitle>
                  <DrawerDescription>
                    The mission list stays visible behind this drawer for reference.{' '}
                    {panelImpact === 'low'
                      ? 'Save this low-impact edit directly.'
                      : 'Review the consequences before saving.'}
                  </DrawerDescription>
                  {panelReviewing ? (
                    <>
                      <Alert variant='warning'>
                        <AlertTitle>Review before saving</AlertTitle>
                        <AlertDescription>
                          This changes how dispatchers identify the plan in review lists. This sample has no Undo.
                        </AlertDescription>
                      </Alert>
                      <p>
                        Mission name: {name} → {draft}
                      </p>
                      <div className='flex flex-wrap gap-2'>
                        <Button variant='outline' onClick={() => setPanelReviewing(false)}>
                          Back to edit
                        </Button>
                        <Button
                          onClick={() => {
                            setName(draft)
                            setPanelStatus('Higher-impact mission name saved in this side-panel example after review.')
                            setPanelReviewing(false)
                            setEditPanelOpen(false)
                          }}
                        >
                          Confirm and save
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <FieldRoot>
                        <FieldLabel>Mission name</FieldLabel>
                        <Input value={draft} onChange={(event) => setDraft(event.target.value)} />
                      </FieldRoot>
                      <FieldRoot>
                        <FieldLabel>Flight area · read-only</FieldLabel>
                        <Input value='North coast' readOnly />
                      </FieldRoot>
                      <div className='flex flex-wrap gap-2'>
                        <DrawerClose>Cancel</DrawerClose>
                        {panelImpact === 'low' ? (
                          <Button
                            onClick={() => {
                              setName(draft)
                              setPanelStatus('Mission name saved directly in this low-impact side-panel example.')
                              setEditPanelOpen(false)
                            }}
                          >
                            Save changes
                          </Button>
                        ) : (
                          <Button onClick={() => setPanelReviewing(true)}>Review change</Button>
                        )}
                      </div>
                    </>
                  )}
                </DrawerContent>
              </DrawerPopup>
            </DrawerViewport>
          </DrawerPortal>
        </Drawer>
        {panelStatus && (
          <p role='status' aria-live='polite' className='text-muted-foreground'>
            {panelStatus}
          </p>
        )}
      </UseCaseSection>
      <UseCaseSection
        title='Use a full-page canvas for a complex revision'
        scenario='Review a consequential full-page mission edit, then confirm its summary before saving; this is an in-place layout preview.'
      >
        {editPageOpen ? (
          <section className='max-w-2xl space-y-3 border border-border p-4'>
            <p className='sub-heading'>EDIT MISSION · FULL-PAGE LAYOUT PREVIEW</p>
            <FieldRoot>
              <FieldLabel>Mission name</FieldLabel>
              <Input value={draft} onChange={(event) => setDraft(event.target.value)} />
            </FieldRoot>
            <p className='text-muted-foreground'>
              Change summary: {name} → {draft}
            </p>
            <div className='flex gap-2'>
              <Button variant='outline' onClick={() => setEditPageOpen(false)}>
                Cancel preview
              </Button>
              <Button onClick={() => setFullPageConfirmOpen(true)}>Save revision</Button>
            </div>
          </section>
        ) : (
          <Button variant='outline' onClick={() => setEditPageOpen(true)}>
            Preview full-page edit
          </Button>
        )}
        {pageStatus && (
          <p role='status' aria-live='polite' className='text-muted-foreground'>
            {pageStatus}
          </p>
        )}
        <AlertDialog open={fullPageConfirmOpen} onOpenChange={setFullPageConfirmOpen}>
          <AlertDialogPortal>
            <AlertDialogBackdrop />
            <AlertDialogPopup>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirm full-page revision</AlertDialogTitle>
                <AlertDialogDescription>
                  This changes how dispatchers identify the plan in review lists. This sample has no Undo; no live
                  mission is modified.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <p>
                Mission name: {name} → {draft}
              </p>
              <AlertDialogFooter>
                <AlertDialogClose>Keep editing</AlertDialogClose>
                <Button
                  onClick={() => {
                    setName(draft)
                    setPageStatus('Mission name saved in this full-page example after confirmation.')
                    setFullPageConfirmOpen(false)
                    setEditPageOpen(false)
                  }}
                >
                  Confirm and save
                </Button>
              </AlertDialogFooter>
            </AlertDialogPopup>
          </AlertDialogPortal>
        </AlertDialog>
      </UseCaseSection>
    </DemoFrame>
  )
}
