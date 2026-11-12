import { useState } from 'react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import {
  Attachment,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle
} from '@/components/ui/attachment'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { FieldControl, FieldLabel, FieldRoot } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Menu, MenuItem, MenuPopup, MenuPortal, MenuPositioner, MenuTrigger } from '@/components/ui/menu'
import { Toggle } from '@/components/ui/toggle'
import { ToggleGroup } from '@/components/ui/toggle-group'
import { Toolbar, ToolbarButton, ToolbarSeparator } from '@/components/ui/toolbar'
import { DemoFrame, UseCaseSection, highlightMatches } from './shared'
import { MagnifyingGlassIcon, XIcon } from '@phosphor-icons/react'

export function TextToolbarDemo() {
  const [editorText, setEditorText] = useState(
    'North coast mission brief\nSample notes: route summary, assigned asset, and linked reference.'
  )
  const [findQuery, setFindQuery] = useState('')
  const [findDraft, setFindDraft] = useState(
    'River mapping review\nConfirm the planned survey boundary before the team briefing.'
  )
  const [attachment, setAttachment] = useState(false)
  const [link, setLink] = useState('')
  const [linkOpen, setLinkOpen] = useState(false)
  const [embeddedLink, setEmbeddedLink] = useState('')
  const [message, setMessage] = useState('Unsaved local draft preview.')
  const [formats, setFormats] = useState<string[]>(['bold'])
  const [textStyle, setTextStyle] = useState<'body' | 'heading' | 'quote'>('body')
  const matches = findQuery ? findDraft.toLowerCase().split(findQuery.toLowerCase()).length - 1 : 0
  const matchLabel = `${matches} ${matches === 1 ? 'match' : 'matches'}`
  return (
    <DemoFrame>
      <UseCaseSection
        title='Format a mission brief and manage its draft'
        scenario='A coordinator styles a route note, uses compact toolbar menus, attaches a reference file, and saves a local draft preview.'
      >
        <Toolbar className='w-full flex-wrap border border-border p-2'>
          <ToggleGroup
            multiple
            value={formats}
            onValueChange={(value) => setFormats(value as string[])}
            aria-label='Text formatting'
          >
            <ToolbarButton render={<Toggle />} value='bold' aria-label='Bold'>
              B
            </ToolbarButton>
            <ToolbarButton render={<Toggle />} value='italic' aria-label='Italic'>
              I
            </ToolbarButton>
            <ToolbarButton render={<Toggle />} value='underline' aria-label='Underline'>
              U
            </ToolbarButton>
          </ToggleGroup>
          <ToolbarSeparator />
          <Menu>
            <ToolbarButton render={<MenuTrigger />}>Text style</ToolbarButton>
            <MenuPortal>
              <MenuPositioner side='bottom' align='start' sideOffset={4}>
                <MenuPopup>
                  <MenuItem
                    onClick={() => {
                      setTextStyle('heading')
                      setMessage('Heading style applied to the local draft preview.')
                    }}
                  >
                    Heading
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setTextStyle('body')
                      setMessage('Body style applied to the local draft preview.')
                    }}
                  >
                    Body
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setTextStyle('quote')
                      setMessage('Quote style applied to the local draft preview.')
                    }}
                  >
                    Quote
                  </MenuItem>
                </MenuPopup>
              </MenuPositioner>
            </MenuPortal>
          </Menu>
          <Menu>
            <ToolbarButton render={<MenuTrigger />}>More</ToolbarButton>
            <MenuPortal>
              <MenuPositioner side='bottom' align='start' sideOffset={4}>
                <MenuPopup>
                  <MenuItem onClick={() => setLinkOpen(true)}>Embed link</MenuItem>
                  <MenuItem onClick={() => setAttachment(true)}>Attach file</MenuItem>
                  <MenuItem onClick={() => setMessage('Draft saved in this local example.')}>Save draft</MenuItem>
                </MenuPopup>
              </MenuPositioner>
            </MenuPortal>
          </Menu>
        </Toolbar>
        {linkOpen && (
          <div className='flex flex-wrap gap-2'>
            <Input
              value={link}
              onChange={(event) => setLink(event.target.value)}
              aria-label='Embed link'
              placeholder='Paste a link to embed'
            />
            <Button
              size='sm'
              variant='outline'
              onClick={() => {
                if (!link.trim()) {
                  setMessage('Enter a link before embedding it.')
                  return
                }
                setEmbeddedLink(link.trim())
                setLinkOpen(false)
                setMessage('Link added to the local draft preview.')
              }}
            >
              Add link
            </Button>
          </div>
        )}
        <div className='space-y-2'>
          <p className='text-sm text-muted-foreground'>Formatted draft preview · local sample</p>
          <div
            role='region'
            aria-label='Formatted draft preview'
            className={`min-h-16 whitespace-pre-wrap rounded-(--radius) border border-border bg-muted/30 p-3 ${textStyle === 'heading' ? 'text-xl font-medium' : textStyle === 'quote' ? 'border-s-2 ps-3 italic' : ''}`}
            style={{
              fontWeight: formats.includes('bold') ? 600 : 400,
              fontStyle: formats.includes('italic') ? 'italic' : 'normal',
              textDecoration: formats.includes('underline') ? 'underline' : 'none'
            }}
          >
            {editorText}
          </div>
          {embeddedLink && <p className='text-sm'>Reference: {embeddedLink}</p>}
          <FieldRoot>
            <FieldLabel>Edit draft text</FieldLabel>
            <FieldControl
              render={<textarea />}
              className='min-h-20 resize-y py-3'
              value={editorText}
              onChange={(event) => setEditorText(event.target.value)}
            />
          </FieldRoot>
          {attachment && (
            <Attachment state='done' className='w-full'>
              <AttachmentMedia>PDF</AttachmentMedia>
              <AttachmentContent>
                <AttachmentTitle>mission-brief.pdf</AttachmentTitle>
                <AttachmentDescription>
                  Attached sample ·{' '}
                  <Button
                    size='icon-xs'
                    variant='ghost'
                    aria-label='Remove attachment'
                    onClick={() => setAttachment(false)}
                  >
                    ×
                  </Button>
                </AttachmentDescription>
              </AttachmentContent>
            </Attachment>
          )}
        </div>
        <p role='status' aria-live='polite' className='text-muted-foreground'>
          Local sample only. {message}
        </p>
      </UseCaseSection>
      <UseCaseSection
        title='Find and edit wording in context'
        scenario='Search within the brief, see the match count, and update the wording in this example.'
      >
        <Alert variant='warning'>
          <AlertTitle>Experimental example</AlertTitle>
          <AlertDescription>
            The maintained guidance marks in-editor keyword search as not ready for production. This preview only
            demonstrates a local match count.
          </AlertDescription>
        </Alert>
        <Input
          value={findQuery}
          onChange={(event) => setFindQuery(event.target.value)}
          startAdornment={<MagnifyingGlassIcon aria-hidden='true' />}
          endAdornment={
            findQuery ? (
              <div className='flex items-center gap-1'>
                <Badge count={matchLabel} size='sm' />
                <Button size='icon-xs' variant='ghost' aria-label='Clear find text' onClick={() => setFindQuery('')}>
                  <XIcon />
                </Button>
              </div>
            ) : null
          }
          placeholder='Find text in draft'
          aria-label='Find text in draft'
          id='text-toolbar-search-secondary'
        />
        <div className='space-y-2'>
          <p className='text-sm text-muted-foreground'>Draft editor · edits stay in this preview</p>
          <FieldRoot>
            <FieldLabel>Draft text</FieldLabel>
            <FieldControl
              render={<textarea />}
              className='min-h-24 resize-y py-3'
              value={findDraft}
              onChange={(event) => setFindDraft(event.target.value)}
            />
          </FieldRoot>
          <p role='status' aria-live='polite' className='text-sm text-muted-foreground'>
            {findQuery ? `${matchLabel} in this draft.` : 'Enter a word to see how many times it appears.'}
          </p>
        </div>
        <div
          role='region'
          aria-label='Edited draft preview'
          className='min-h-16 whitespace-pre-wrap rounded-(--radius) border border-border bg-muted/30 p-3'
        >
          {highlightMatches(findDraft, findQuery)}
        </div>
      </UseCaseSection>
    </DemoFrame>
  )
}
