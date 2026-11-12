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
import { FieldDescription, FieldLabel, FieldRoot } from '@/components/ui/field'
import { FieldsetLegend, FieldsetRoot } from '@/components/ui/fieldset'
import { Input } from '@/components/ui/input'
import { Menu, MenuItem, MenuPopup, MenuPortal, MenuPositioner, MenuTrigger } from '@/components/ui/menu'
import { RadioGroup, RadioRoot } from '@/components/ui/radio'
import { DemoFrame, UseCaseSection } from './shared'

export function ApiKeyDemo() {
  const [creationNotice, setCreationNotice] = useState('Choose the sample key settings before generating.')
  const [managementNotice, setManagementNotice] = useState('Existing key settings have not changed.')
  const [name, setName] = useState('Mission planning integration')
  const [restricted, setRestricted] = useState(false)
  const [generated, setGenerated] = useState(false)
  const [oneTimeResultDismissed, setOneTimeResultDismissed] = useState(false)
  const [configurationOpen, setConfigurationOpen] = useState(false)
  const [resultOpen, setResultOpen] = useState(false)
  const [visible, setVisible] = useState(false)
  const [copied, setCopied] = useState(false)
  const [retrieval, setRetrieval] = useState<'product' | 'platform' | 'once'>('once')
  const [existingName, setExistingName] = useState('Mission planning integration')
  const [existingRestricted, setExistingRestricted] = useState(true)
  const [editingExisting, setEditingExisting] = useState(false)
  const sampleKey = 'sk_demo_7f3a••••••••••••9b2c'
  const generateKeyRef = useRef<HTMLButtonElement>(null)
  const resultCloseRef = useRef<HTMLButtonElement>(null)
  const generateSampleKey = () => {
    setGenerated(true)
    setOneTimeResultDismissed(false)
    setVisible(false)
    setCopied(false)
    setCreationNotice('Sample key value generated for this preview. No credential was created.')
    setConfigurationOpen(false)
    setResultOpen(true)
  }
  return (
    <DemoFrame>
      <UseCaseSection
        title='Create and manage an API key safely'
        scenario='Choose a recognizable name, review the sample access and retrieval warning, then inspect the separate key-result view.'
      >
        <p className='text-sm text-muted-foreground'>
          Restricted access options depend on the product. This compact sample illustrates general access or read-only
          mission scope; it does not create a credential.
        </p>
        <Button onClick={() => setConfigurationOpen(true)}>
          {generated ? 'Configure another sample key' : 'Configure API key'}
        </Button>
        <Dialog open={configurationOpen} onOpenChange={setConfigurationOpen}>
          <DialogPortal>
            <DialogBackdrop />
            <DialogPopup initialFocus={generateKeyRef}>
              <DialogHeader>
                <DialogTitle>Configure API key</DialogTitle>
                <DialogDescription>
                  Name the key, review its access, and decide how it can be retrieved.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className='order-last sm:flex-row-reverse'>
                <Button ref={generateKeyRef} disabled={!name.trim()} onClick={generateSampleKey}>
                  Generate key
                </Button>
                <DialogClose variant='outline'>Cancel</DialogClose>
              </DialogFooter>
              <FieldRoot>
                <FieldLabel>Key name</FieldLabel>
                <Input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder='e.g. Mission planning integration'
                />
                <FieldDescription>Use a descriptive name so you can identify this key later.</FieldDescription>
              </FieldRoot>
              <FieldsetRoot>
                <FieldsetLegend>Access</FieldsetLegend>
                <RadioGroup
                  aria-label='Access'
                  value={restricted ? 'restricted' : 'general'}
                  onValueChange={(value) => setRestricted(value === 'restricted')}
                >
                  <label className='flex items-center gap-2'>
                    <RadioRoot value='general' />
                    <span>General access</span>
                  </label>
                  <label className='flex items-start gap-2'>
                    <RadioRoot value='restricted' />
                    <span>
                      <span className='block'>Restricted access · Missions read-only</span>
                      <span className='block text-sm text-muted-foreground'>Billing and Team have no access.</span>
                    </span>
                  </label>
                </RadioGroup>
              </FieldsetRoot>
              <FieldsetRoot>
                <FieldsetLegend>Key retrieval</FieldsetLegend>
                <RadioGroup
                  aria-label='Key retrieval'
                  value={retrieval}
                  onValueChange={(value) => {
                    setRetrieval(value as 'product' | 'platform' | 'once')
                    setOneTimeResultDismissed(false)
                  }}
                >
                  <label className='flex items-center gap-2'>
                    <RadioRoot value='product' />
                    <span>Available again in this product</span>
                  </label>
                  <label className='flex items-center gap-2'>
                    <RadioRoot value='platform' />
                    <span>Available from another platform</span>
                  </label>
                  <label className='flex items-center gap-2'>
                    <RadioRoot value='once' />
                    <span>Shown once</span>
                  </label>
                </RadioGroup>
                <p className='text-sm text-muted-foreground'>
                  {retrieval === 'product'
                    ? 'Tell users where to return in the product to retrieve this key.'
                    : retrieval === 'platform'
                      ? 'Link to instructions for retrieving the key on the separate platform.'
                      : 'Warn users to store the key safely. A real one-time key should offer a secure download.'}
                </p>
              </FieldsetRoot>
              {retrieval === 'once' && (
                <Alert variant='warning'>
                  <AlertTitle>This key will be shown once</AlertTitle>
                  <AlertDescription>
                    Store the key securely before closing the result. This local preview shows a sample value only.
                  </AlertDescription>
                </Alert>
              )}
            </DialogPopup>
          </DialogPortal>
        </Dialog>
        <Dialog
          open={resultOpen}
          onOpenChange={(open) => {
            setResultOpen(open)
            if (!open && retrieval === 'once') {
              setOneTimeResultDismissed(true)
              setCreationNotice('One-time sample result closed. A real lost key would need to be generated again.')
            }
          }}
        >
          <DialogPortal>
            <DialogBackdrop />
            <DialogPopup initialFocus={resultCloseRef}>
              <DialogHeader>
                <DialogTitle>API key result preview</DialogTitle>
                <DialogDescription>
                  {name} · {restricted ? 'Restricted · Missions read-only' : 'General workspace access'}. This is a
                  placeholder; no credential was created.
                </DialogDescription>
              </DialogHeader>
              {retrieval === 'once' && (
                <Alert variant='warning'>
                  <AlertTitle>Shown once</AlertTitle>
                  <AlertDescription>
                    A real key that cannot be retrieved later should include a secure JSON download option.
                  </AlertDescription>
                </Alert>
              )}
              <code className='block break-all rounded-(--radius) border border-border bg-muted p-3'>
                {visible ? 'sk_demo_7f3a9d41b820c67f9b2c' : sampleKey}
              </code>
              <div className='flex flex-wrap gap-2'>
                <Button size='sm' variant='outline' onClick={() => setVisible((value) => !value)}>
                  {visible ? 'Hide key' : 'Reveal key'}
                </Button>
                <Button
                  size='sm'
                  onClick={() => {
                    setCopied(true)
                    setCreationNotice('Sample copy feedback shown. Clipboard was not accessed.')
                  }}
                >
                  {copied ? 'Copy preview shown' : 'Preview copy feedback'}
                </Button>
                {retrieval === 'once' && (
                  <Button
                    size='sm'
                    variant='outline'
                    onClick={() => setCreationNotice('JSON download preview selected. No file was downloaded.')}
                  >
                    Preview JSON download
                  </Button>
                )}
                <Menu>
                  <MenuTrigger
                    render={
                      <Button size='sm' variant='ghost'>
                        Manage key
                      </Button>
                    }
                  />
                  <MenuPortal>
                    <MenuPositioner side='bottom' align='start' sideOffset={4}>
                      <MenuPopup>
                        <MenuItem
                          onClick={() => setCreationNotice('Key rotation preview selected; no credential was changed.')}
                        >
                          Preview key rotation
                        </MenuItem>
                        <MenuItem
                          onClick={() => setCreationNotice('Revoke preview selected; no credential was revoked.')}
                        >
                          Preview key revocation
                        </MenuItem>
                      </MenuPopup>
                    </MenuPositioner>
                  </MenuPortal>
                </Menu>
              </div>
              <p className='text-sm text-muted-foreground'>
                Reveal, copy, and download controls are previews only; they do not expose a real secret, access the
                clipboard, or download a file.
              </p>
              <DialogFooter>
                <DialogClose ref={resultCloseRef} variant='outline'>
                  Leave key result
                </DialogClose>
              </DialogFooter>
            </DialogPopup>
          </DialogPortal>
        </Dialog>
        {generated && oneTimeResultDismissed && (
          <Alert variant='warning'>
            <AlertTitle>One-time result closed</AlertTitle>
            <AlertDescription>
              This example hides the value after you leave. If it were a real one-time key, recovery would require a new
              key and any affected integration would need updating.
            </AlertDescription>
          </Alert>
        )}
        <p role='status' aria-live='polite' className='text-muted-foreground'>
          {creationNotice}
        </p>
      </UseCaseSection>
      <UseCaseSection
        title='Manage or edit an existing key without changing its secret'
        scenario='A workspace administrator reviews named keys, opens management actions, and edits access without changing an existing key value.'
      >
        <div className='flex flex-wrap items-center justify-between gap-3 border-y border-border py-3'>
          <div className='min-w-0'>
            <p className='font-medium'>{existingName}</p>
            <p className='text-muted-foreground'>
              {existingRestricted ? 'Restricted · Missions read-only' : 'General access'} · local sample
            </p>
          </div>
          <Menu>
            <MenuTrigger
              render={
                <Button size='sm' variant='outline'>
                  Manage key
                </Button>
              }
            />
            <MenuPortal>
              <MenuPositioner side='bottom' align='end' sideOffset={4}>
                <MenuPopup>
                  <MenuItem onClick={() => setEditingExisting(true)}>Edit permissions</MenuItem>
                  <MenuItem
                    onClick={() => setManagementNotice('Rotation preview selected; no credential was changed.')}
                  >
                    Preview rotation
                  </MenuItem>
                  <MenuItem onClick={() => setManagementNotice('Revoke preview selected; no credential was revoked.')}>
                    Preview revocation
                  </MenuItem>
                </MenuPopup>
              </MenuPositioner>
            </MenuPortal>
          </Menu>
        </div>
        {editingExisting && (
          <div className='grid max-w-xl gap-3 border border-border p-4'>
            <h5 className='text-base font-medium text-(--foreground)'>Edit key settings</h5>
            <FieldRoot>
              <FieldLabel>Key name</FieldLabel>
              <Input value={existingName} onChange={(event) => setExistingName(event.target.value)} />
            </FieldRoot>
            <Button
              size='sm'
              variant={existingRestricted ? 'secondary' : 'outline'}
              aria-pressed={existingRestricted}
              onClick={() => setExistingRestricted((value) => !value)}
            >
              {existingRestricted ? 'Restricted access' : 'General access'}
            </Button>
            <p className='text-muted-foreground'>
              Only the name and access settings change; the key contents stay the same.
            </p>
            <div className='flex flex-wrap gap-2'>
              <Button size='sm' variant='outline' onClick={() => setEditingExisting(false)}>
                Cancel
              </Button>
              <Button
                size='sm'
                onClick={() => {
                  setManagementNotice('Key settings saved in the local example; key contents are unchanged.')
                  setEditingExisting(false)
                }}
              >
                Save settings
              </Button>
            </div>
          </div>
        )}
        <p role='status' aria-live='polite' className='text-muted-foreground'>
          {managementNotice}
        </p>
      </UseCaseSection>
      <p className='text-muted-foreground'>Local illustrations only; no credential is created, stored, or rotated.</p>
    </DemoFrame>
  )
}
