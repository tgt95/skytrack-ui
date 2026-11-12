import { useState } from 'react'
import {
  Attachment,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle
} from '@/components/ui/attachment'
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
import { Dropzone } from '@/components/ui/dropzone'
import { FieldDescription, FieldError, FieldLabel, FieldRoot } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { DemoFrame, UseCaseSection } from './shared'

export function ImportDemo() {
  const [files, setFiles] = useState<File[]>([])
  const [error, setError] = useState('')
  const [source, setSource] = useState<'file' | 'url'>('file')
  const [url, setUrl] = useState('')
  const [status, setStatus] = useState('')
  const [singleFileResult, setSingleFileResult] = useState('')
  const [metadataResult, setMetadataResult] = useState('')
  const [collectionName, setCollectionName] = useState('Coastal survey imports')
  const [importNote, setImportNote] = useState('')
  const [singleFileOpen, setSingleFileOpen] = useState(false)
  const [singleFileSelected, setSingleFileSelected] = useState(false)
  const [singleFileSource, setSingleFileSource] = useState<'file' | 'url'>('file')
  const [singleFileUrl, setSingleFileUrl] = useState('')
  const [singleFileError, setSingleFileError] = useState('')
  const [metadataPanelOpen, setMetadataPanelOpen] = useState(false)
  return (
    <DemoFrame>
      <UseCaseSection
        title='Choose multiple mission files or a source URL'
        scenario={
          source === 'file'
            ? 'A full-page or side-panel workflow can accept several supported JSON or GeoJSON files and show validation or selection status.'
            : 'When a remote source is supported, validate its HTTPS address locally before proceeding; this sample never fetches it.'
        }
      >
        <FieldRoot className='w-full' invalid={Boolean(error)}>
          <div className='flex gap-2'>
            <Button
              type='button'
              size='sm'
              variant={source === 'file' ? 'secondary' : 'outline'}
              aria-pressed={source === 'file'}
              onClick={() => {
                setSource('file')
                setError('')
                setStatus('')
              }}
            >
              Choose file
            </Button>
            <Button
              type='button'
              size='sm'
              variant={source === 'url' ? 'secondary' : 'outline'}
              aria-pressed={source === 'url'}
              onClick={() => {
                setSource('url')
                setError('')
                setStatus('')
              }}
            >
              Import from URL
            </Button>
          </div>
          {source === 'file' ? (
            <>
              <FieldLabel>Choose mission files</FieldLabel>
              <Dropzone
                accept='.json,.geojson'
                multiple
                hint='Choose JSON or GeoJSON files. Selection stays in this browser demo.'
                onFilesSelected={(selected) => {
                  const invalid = selected.find((file) => !/\.(json|geojson)$/i.test(file.name))
                  if (invalid) {
                    setError(`${invalid.name} is not a JSON or GeoJSON file.`)
                    setStatus('')
                    return
                  }
                  setError('')
                  setStatus(`${selected.length} file(s) selected locally.`)
                  setFiles((current) => [...current, ...selected])
                }}
              />
              <FieldDescription>
                Choose one or more JSON/GeoJSON files. Selection stays local; no upload occurs.
              </FieldDescription>
            </>
          ) : (
            <>
              <FieldLabel>Source URL</FieldLabel>
              <Input
                type='url'
                value={url}
                onChange={(event) => setUrl(event.target.value)}
                placeholder='https://example.com/mission.geojson'
              />
              <Button
                type='button'
                variant='outline'
                onClick={() =>
                  url.startsWith('https://')
                    ? (setError(''), setStatus('URL accepted for this illustration; nothing was fetched.'))
                    : (setError('Enter a valid HTTPS URL.'), setStatus(''))
                }
              >
                Import from URL
              </Button>
              <FieldDescription>URL is validated locally and never fetched.</FieldDescription>
            </>
          )}
          <FieldError match={Boolean(error)}>{error}</FieldError>
          {status && (
            <p role='status' aria-live='polite' className='text-muted-foreground'>
              {status}
            </p>
          )}
          {files.map((file, index) => (
            <Attachment key={`${file.name}-${index}`} state='done' className='w-full'>
              <AttachmentMedia>{file.name.split('.').pop()?.toUpperCase()}</AttachmentMedia>
              <AttachmentContent>
                <AttachmentTitle>{file.name}</AttachmentTitle>
                <AttachmentDescription>Selected locally · {Math.ceil(file.size / 1024)} KB</AttachmentDescription>
              </AttachmentContent>
            </Attachment>
          ))}
        </FieldRoot>
      </UseCaseSection>
      <UseCaseSection
        title='Import one file or URL in a focused modal'
        scenario='For one item with no extra metadata, choose a local file or a URL; keep Import disabled until the chosen source is valid.'
      >
        <Button onClick={() => setSingleFileOpen(true)}>Import one mission file</Button>
        <Dialog open={singleFileOpen} onOpenChange={setSingleFileOpen}>
          <DialogPortal>
            <DialogBackdrop />
            <DialogPopup>
              <DialogHeader>
                <DialogTitle>Import mission file</DialogTitle>
                <DialogDescription>
                  Choose one JSON or GeoJSON file. The sample stays in this browser.
                </DialogDescription>
              </DialogHeader>
              <div className='flex flex-wrap gap-2'>
                <Button
                  size='sm'
                  variant={singleFileSource === 'file' ? 'secondary' : 'outline'}
                  aria-pressed={singleFileSource === 'file'}
                  onClick={() => {
                    setSingleFileSource('file')
                    setSingleFileError('')
                    setSingleFileSelected(false)
                  }}
                >
                  File
                </Button>
                <Button
                  size='sm'
                  variant={singleFileSource === 'url' ? 'secondary' : 'outline'}
                  aria-pressed={singleFileSource === 'url'}
                  onClick={() => {
                    setSingleFileSource('url')
                    setSingleFileError('')
                    setSingleFileSelected(false)
                  }}
                >
                  URL
                </Button>
              </div>
              <FieldRoot>
                {singleFileSource === 'file' ? (
                  <>
                    <FieldLabel>Mission file</FieldLabel>
                    <Dropzone
                      accept='.json,.geojson'
                      hint='Select one supported file; no upload occurs.'
                      onFilesSelected={(selected) => {
                        setSingleFileSelected(selected.length > 0)
                        setSingleFileError('')
                      }}
                    />
                  </>
                ) : (
                  <>
                    <FieldLabel>Source URL</FieldLabel>
                    <Input
                      type='url'
                      value={singleFileUrl}
                      onChange={(event) => {
                        setSingleFileUrl(event.target.value)
                        setSingleFileError('')
                        setSingleFileSelected(false)
                      }}
                      placeholder='https://example.com/mission.geojson'
                    />
                    <Button
                      size='sm'
                      variant='outline'
                      onClick={() => {
                        if (singleFileUrl.startsWith('https://')) {
                          setSingleFileSelected(true)
                          setSingleFileError('')
                        } else {
                          setSingleFileSelected(false)
                          setSingleFileError('Enter a valid HTTPS URL.')
                        }
                      }}
                    >
                      Add URL
                    </Button>
                    <FieldError match={Boolean(singleFileError)}>{singleFileError}</FieldError>
                    <FieldDescription>URL validation is local. No request is sent.</FieldDescription>
                  </>
                )}
              </FieldRoot>
              <DialogFooter>
                <DialogClose variant='outline'>Cancel</DialogClose>
                <Button
                  disabled={!singleFileSelected}
                  onClick={() => {
                    setSingleFileResult(
                      singleFileSource === 'file'
                        ? 'Import step completed in this local example. No file was uploaded.'
                        : 'Import step completed in this local example. No data was fetched.'
                    )
                    setSingleFileOpen(false)
                  }}
                >
                  Import file
                </Button>
              </DialogFooter>
            </DialogPopup>
          </DialogPortal>
        </Dialog>
        {singleFileResult && (
          <p role='status' aria-live='polite' className='text-muted-foreground'>
            {singleFileResult}
          </p>
        )}
      </UseCaseSection>
      <UseCaseSection
        title='Add metadata in a side panel after file selection'
        scenario='When an import needs a name or destination, keep the selection step distinct and collect the extra information in a side panel.'
      >
        <Drawer open={metadataPanelOpen} onOpenChange={setMetadataPanelOpen} swipeDirection='right'>
          <DrawerTrigger>Review import details</DrawerTrigger>
          <DrawerPortal>
            <DrawerBackdrop />
            <DrawerViewport side='right'>
              <DrawerPopup side='right'>
                <DrawerContent>
                  <DrawerTitle>Import details</DrawerTitle>
                  <DrawerDescription>Set context before adding the selected mission data.</DrawerDescription>
                  <p className='text-muted-foreground'>Selected source: north-coast-missions.geojson · local sample</p>
                  <FieldRoot>
                    <FieldLabel>Collection name</FieldLabel>
                    <Input value={collectionName} onChange={(event) => setCollectionName(event.target.value)} />
                  </FieldRoot>
                  <FieldRoot>
                    <FieldLabel>Import note</FieldLabel>
                    <Input
                      value={importNote}
                      onChange={(event) => setImportNote(event.target.value)}
                      placeholder='Optional note for reviewers'
                    />
                  </FieldRoot>
                  <div className='flex flex-wrap gap-2'>
                    <DrawerClose>Cancel</DrawerClose>
                    <Button
                      onClick={() => {
                        setMetadataPanelOpen(false)
                        setMetadataResult(
                          `Import details ready for review in “${collectionName || 'Untitled collection'}”. ${importNote.trim() ? 'Reviewer note included.' : 'No reviewer note added.'} No data was imported.`
                        )
                      }}
                    >
                      Review import
                    </Button>
                  </div>
                </DrawerContent>
              </DrawerPopup>
            </DrawerViewport>
          </DrawerPortal>
        </Drawer>
        {metadataResult && (
          <p role='status' aria-live='polite' className='text-muted-foreground'>
            {metadataResult}
          </p>
        )}
      </UseCaseSection>
    </DemoFrame>
  )
}
