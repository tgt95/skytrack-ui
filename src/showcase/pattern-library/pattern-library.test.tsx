import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { cleanup, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { PATTERNS, type PatternId } from './catalog'
import { PatternDemo } from './demos'
import { PATTERN_EXAMPLE_TEACHING } from './example-copy'
import { PatternSourceContent } from './content-renderer'
import { PatternLibrary } from './index'
import { PATTERN_PAGE_CONTENT, type PatternPageDraft, type SectionNode } from './page-content'

afterEach(cleanup)

function renderPatternDemo(patternId: PatternId) {
  return render(
    <>
      <PatternSourceContent page={PATTERN_PAGE_CONTENT[patternId]} />
      <PatternDemo patternId={patternId} />
    </>
  )
}

describe('Pattern Library teaching content', () => {
  it('has source-shaped content for every Core and Community pattern', () => {
    expect(PATTERNS).toHaveLength(26)
    expect(PATTERNS.filter((pattern) => pattern.group === 'Core')).toHaveLength(17)
    expect(PATTERNS.filter((pattern) => pattern.group === 'Community')).toHaveLength(9)

    expect(Object.keys(PATTERN_PAGE_CONTENT)).toHaveLength(PATTERNS.length)
    const allDemos = PATTERNS.flatMap((pattern) => {
      const page = PATTERN_PAGE_CONTENT[pattern.id]
      expect(page.id).toBe(pattern.id)
      expect(page.group).toBe(pattern.group)
      expect(page.source.status).toBe(pattern.sourceStatus)
      expect(page.sections.length).toBeGreaterThan(0)
      return page.demos.map((demo) => ({ ...demo, patternId: pattern.id }))
    })
    expect(allDemos).toHaveLength(106)
    expect(new Set(allDemos.map(({ patternId, id }) => `${patternId}:${id}`)).size).toBe(allDemos.length)

    const legacyTitles = Object.entries(PATTERN_EXAMPLE_TEACHING).flatMap(([patternId, examples]) =>
      Object.keys(examples).map((title) => `${patternId}:${title}`)
    )
    expect(allDemos.map(({ patternId, title }) => `${patternId}:${title}`).sort()).toEqual(legacyTitles.sort())

    const collectSections = (sections: SectionNode[]): SectionNode[] =>
      sections.flatMap((section) => [section, ...collectSections(section.children ?? [])])
    const allSections = PATTERNS.flatMap((pattern) => collectSections(PATTERN_PAGE_CONTENT[pattern.id].sections))
    const audienceCopy = PATTERNS.flatMap((pattern) => {
      const page = PATTERN_PAGE_CONTENT[pattern.id]
      return [
        page.title,
        page.summary,
        ...collectSections(page.sections).flatMap((section) => [
          section.heading,
          ...section.blocks.map((block) => JSON.stringify(block))
        ]),
        ...page.demos.flatMap((demo) => [
          demo.title,
          demo.scenario,
          demo.teaching.meaning,
          demo.teaching.decision,
          demo.teaching.consider
        ]),
        ...(page.notes ?? []).map((note) => note.text)
      ]
    })
    const sectionIdsByPattern = new Map<PatternPageDraft['id'], Set<string>>()
    for (const pattern of PATTERNS) {
      sectionIdsByPattern.set(
        pattern.id,
        new Set(collectSections(PATTERN_PAGE_CONTENT[pattern.id].sections).map((section) => section.id))
      )
    }
    expect(allSections.every((section) => section.heading.trim() && section.id.trim())).toBe(true)
    for (const pattern of PATTERNS) {
      const sections = collectSections(PATTERN_PAGE_CONTENT[pattern.id].sections)
      expect(new Set(sections.map((section) => section.id)).size, `${pattern.id} has duplicate section anchors`).toBe(
        sections.length
      )
    }
    for (const pattern of PATTERNS) {
      const page = PATTERN_PAGE_CONTENT[pattern.id]
      const sectionIds = sectionIdsByPattern.get(page.id)!
      const demoIds = new Set(page.demos.map((demo) => demo.id))
      expect(new Set(page.demos.map((demo) => demo.title)).size).toBe(page.demos.length)
      for (const section of collectSections(page.sections)) {
        for (const demoRef of section.demoRefs ?? []) expect(demoIds.has(demoRef)).toBe(true)
      }
      for (const demo of page.demos) {
        if (demo.sectionId !== 'UNMAPPED') {
          expect(sectionIds.has(demo.sectionId)).toBe(true)
          expect(collectSections(page.sections).find((section) => section.id === demo.sectionId)?.demoRefs).toContain(
            demo.id
          )
        }
        expect(typeof demo.interactive).toBe('boolean')
      }
    }
    expect(
      PATTERNS.flatMap((pattern) => PATTERN_PAGE_CONTENT[pattern.id].demos).filter((demo) => !demo.interactive)
    ).toHaveLength(21)

    const catalogOnlyIds: PatternId[] = ['community-in-app-learning', 'community-order-summary']
    for (const id of catalogOnlyIds) {
      const page = PATTERN_PAGE_CONTENT[id]
      const blocks = collectSections(page.sections).flatMap((section) => section.blocks)
      const calloutKinds = blocks.flatMap((block) => (block.type === 'callout' ? [block.kind] : []))
      expect(page.source.status).toBe('Community catalog only')
      expect(page.source.catalogEvidence).toBeTruthy()
      expect(page.source.limits?.length).toBeGreaterThan(0)
      expect(calloutKinds).toContain('source-limit')
      expect(calloutKinds).toContain('local-interpretation')
    }
    expect(PATTERN_PAGE_CONTENT['community-chatbots'].source.subpages?.map((page) => page.id)).toEqual([
      'overview',
      'usage',
      'flows',
      'content'
    ])

    expect(audienceCopy.join(' ')).not.toMatch(/carbon|ibm/i)
  })

  it('keeps every primary and supporting source citation resolvable', () => {
    const sourceRoot = resolve(process.cwd(), 'docs/carbon-ds-reference')
    const collectSections = (sections: SectionNode[]): SectionNode[] =>
      sections.flatMap((section) => [section, ...collectSections(section.children ?? [])])
    const sourceReferences: Array<{ path: string; lines?: string }> = PATTERNS.flatMap((pattern) => {
      const page = PATTERN_PAGE_CONTENT[pattern.id]
      const primaryPath = page.source._primaryPath.replace(/^docs\/carbon-ds-reference\//, '')
      return [
        { path: primaryPath, lines: page.source._primaryLines },
        ...(page.source._relatedSources ?? []),
        ...(page.source.subpages ?? []).map((source) => ({
          path: source._path.replace(/^docs\/carbon-ds-reference\//, '')
        })),
        ...collectSections(page.sections).flatMap((section) => {
          expect(section._sourceCitation.lines, `${pattern.id}:${section.id} must cite source lines`).toBeTruthy()
          return [
            {
              path: section._sourceCitation.path,
              lines: section._sourceCitation.lines
            },
            ...(section._sourceCitation.related ?? [])
          ]
        })
      ]
    })
    const missingPaths = [...new Set(sourceReferences.map((source) => source.path))].filter(
      (path) => !existsSync(resolve(sourceRoot, path))
    )
    const invalidLines = sourceReferences.flatMap((source) => {
      if (!source.lines) return []
      const sourcePath = resolve(sourceRoot, source.path)
      if (!existsSync(sourcePath)) return []
      const sourceLineCount = readFileSync(sourcePath, 'utf8').split(/\r?\n/).length
      const citedLineNumbers = source.lines.match(/\d+/g)?.map(Number) ?? []
      return citedLineNumbers.some((line) => line > sourceLineCount)
        ? [`${source.path}:${source.lines} (file has ${sourceLineCount} lines)`]
        : []
    })

    expect(missingPaths).toEqual([])
    expect(invalidLines).toEqual([])
  })

  it('renders source headings and on-page navigation instead of generic page headings', () => {
    render(<PatternLibrary query='' audience='designer' onClearSearch={() => undefined} />)

    expect(screen.getAllByRole('heading', { name: 'Add' })).toHaveLength(1)
    expect(screen.getAllByRole('heading', { name: 'Hierarchy and placement' })).toHaveLength(2)
    expect(screen.queryByRole('heading', { name: 'What this pattern is' })).toBeNull()
    expect(screen.queryByRole('heading', { name: 'Why this helps' })).toBeNull()
    expect(screen.queryByText(/carbon|ibm/i)).toBeNull()
    expect(screen.queryByText('Pattern library · SkyTrack UI')).toBeNull()
    expect(screen.queryByRole('heading', { name: 'Pattern catalog' })).toBeNull()
    expect(screen.queryByText(/core topics, including 14 marked universal/i)).toBeNull()
    expect(screen.getByRole('navigation', { name: 'Common actions sections' })).toBeTruthy()
    const desktopTableOfContents = document.querySelector<HTMLElement>('[aria-label="Common actions section overview"]')
    const addTocLink = desktopTableOfContents?.querySelector<HTMLAnchorElement>(
      'a[href="#pattern-section-common-actions-add"]'
    )
    expect(addTocLink).toBeTruthy()
    expect(addTocLink?.getAttribute('aria-label')).toBe('Add')
    expect(addTocLink?.getAttribute('aria-current')).toBe('location')
    expect(addTocLink?.firstElementChild?.className).toContain('h-px')
    expect(desktopTableOfContents?.className).toContain('max-h-[calc(100vh-2rem)]')
    expect(desktopTableOfContents?.className).toContain('overflow-y-auto')
    const addTocPreview = addTocLink?.parentElement?.querySelector<HTMLElement>('[aria-hidden="true"]')
    expect(addTocPreview?.textContent).toContain('Add')
    expect(addTocPreview?.className).toContain('group-hover:opacity-100')
    expect(addTocPreview?.className).toContain('group-focus-within:opacity-100')
    expect(desktopTableOfContents?.textContent).toContain('Add attaches an existing record, user, or resource')
    const groupFilters = screen.getByRole('tablist', { name: 'Filter patterns by source group' })
    const patternNavigation = screen.getByRole('navigation', { name: 'Pattern catalog navigation' })
    expect(groupFilters.getAttribute('data-variant')).toBe('filled')
    expect(groupFilters.closest('aside')).toBeNull()
    const patternNavCard = patternNavigation.closest('aside')
    expect(patternNavCard).toBeTruthy()
    expect(patternNavCard?.parentElement?.className).toContain('xl:h-[calc(100dvh-8rem)]')
    expect(patternNavCard?.parentElement?.className).toContain('xl:min-h-0')
    const navCardPosition = patternNavCard?.compareDocumentPosition(groupFilters) ?? 0
    expect(navCardPosition & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    expect(patternNavCard?.className).toContain('overflow-hidden')
    expect(patternNavigation.parentElement?.className).toContain('xl:overflow-y-auto')
    expect(groupFilters.className).toContain('bg-muted')
    expect(groupFilters.parentElement?.className).toContain('shrink-0')

    const patternTitle = document.querySelector<HTMLElement>('#selected-pattern-title')
    const addSection = document.querySelector<HTMLElement>('#pattern-section-common-actions-add')
    const addHeading = document.querySelector<HTMLElement>('#pattern-section-common-actions-add-heading')
    const addExample = addSection?.querySelector<HTMLElement>('[data-pattern-example]')
    expect(patternTitle?.classList.contains('h3')).toBe(true)
    expect(addHeading?.classList.contains('h4')).toBe(true)
    expect(addExample?.querySelector('[data-pattern-demo-card]')).toBeTruthy()
  })

  it('navigates through every catalog entry and renders all of its examples', async () => {
    const user = userEvent.setup()
    render(<PatternLibrary query='' audience='designer' onClearSearch={() => undefined} />)
    const navigation = screen.getByRole('navigation', { name: 'Pattern catalog navigation' })

    for (const pattern of PATTERNS) {
      await user.click(within(navigation).getByRole('button', { name: new RegExp(pattern.title, 'i') }))
      expect(screen.getByRole('heading', { level: 2, name: pattern.title })).toBeTruthy()

      const article = screen.getByRole('article')
      const renderedExamples = [...article.querySelectorAll<HTMLElement>('[data-pattern-example-id]')]
      const expectedDemoIds = new Set(PATTERN_PAGE_CONTENT[pattern.id].demos.map((demo) => demo.id))
      expect(renderedExamples.length, `${pattern.id} should render at least one use case`).toBeGreaterThan(0)
      expect(
        renderedExamples.every((example) => expectedDemoIds.has(example.dataset.patternExampleId ?? '')),
        `${pattern.id} should only render examples mapped to its source page`
      ).toBe(true)
    }
  })

  it('filters Core and Community entries and exposes no-result recovery actions', async () => {
    const user = userEvent.setup()
    let clearSearchCount = 0
    const clearSearch = () => {
      clearSearchCount += 1
    }
    const view = render(<PatternLibrary query='' audience='designer' onClearSearch={clearSearch} />)

    const groupTabs = screen.getByRole('tablist', { name: 'Filter patterns by source group' })
    expect(groupTabs.querySelectorAll('[role="tab"]')).toHaveLength(3)
    expect(groupTabs.getAttribute('data-variant')).toBe('filled')
    expect(groupTabs.parentElement?.previousElementSibling?.tagName).toBe('ASIDE')

    await user.click(screen.getByRole('tab', { name: /Core\s*17/i }))
    expect(screen.getByText('17 patterns shown')).toBeTruthy()
    let navigation = screen.getByRole('navigation', { name: 'Pattern catalog navigation' })
    expect(within(navigation).getByRole('heading', { name: 'Core patterns' })).toBeTruthy()
    expect(within(navigation).queryByRole('heading', { name: 'Community patterns' })).toBeNull()

    await user.click(screen.getByRole('tab', { name: /Community\s*9/i }))
    expect(screen.getByText('9 patterns shown')).toBeTruthy()
    navigation = screen.getByRole('navigation', { name: 'Pattern catalog navigation' })
    expect(within(navigation).getByRole('heading', { name: 'Community patterns' })).toBeTruthy()
    expect(within(navigation).queryByRole('heading', { name: 'Core patterns' })).toBeNull()

    view.rerender(<PatternLibrary query='API key' audience='designer' onClearSearch={clearSearch} />)
    expect(screen.getByText(/matching patterns/)).toBeTruthy()
    navigation = screen.getByRole('navigation', { name: 'Pattern catalog navigation' })
    expect(within(navigation).getByRole('button', { name: /Generate an API key/i })).toBeTruthy()

    view.rerender(<PatternLibrary query='unmatched catalog phrase' audience='designer' onClearSearch={clearSearch} />)
    expect(screen.getByRole('heading', { name: 'No patterns match' })).toBeTruthy()
    await user.click(screen.getByRole('button', { name: 'Show all groups' }))
    await user.click(screen.getByRole('button', { name: 'Clear search' }))
    expect(clearSearchCount).toBe(1)

    view.rerender(<PatternLibrary query='' audience='designer' onClearSearch={clearSearch} />)
    expect(screen.getByText('26 patterns shown')).toBeTruthy()
  })

  it('renders interactive demos inside the section they explain', () => {
    for (const pattern of PATTERNS) {
      const { container, unmount } = render(
        <>
          <PatternSourceContent page={PATTERN_PAGE_CONTENT[pattern.id]} />
          <PatternDemo patternId={pattern.id} />
        </>
      )
      const page = PATTERN_PAGE_CONTENT[pattern.id]
      for (const demo of page.demos) {
        const slot = container.querySelector<HTMLElement>(`[data-pattern-demo-slot="${demo.id}"]`)
        expect(slot, `${pattern.id} is missing a slot for ${demo.title}`).toBeTruthy()
        if (demo.sectionId !== 'UNMAPPED') {
          const sourceSection = container.querySelector<HTMLElement>(`#pattern-section-${pattern.id}-${demo.sectionId}`)
          expect(sourceSection?.contains(slot ?? null), `${demo.title} is outside its source section`).toBe(true)
        }
      }
      for (const example of container.querySelectorAll<HTMLElement>('[data-pattern-example-id]')) {
        const id = example.dataset.patternExampleId
        const demo = page.demos.find((item) => item.id === id)
        const demoCard = example.querySelector<HTMLElement>('[data-pattern-demo-card]')
        expect(container.querySelector(`[data-pattern-demo-slot="${id}"]`)?.contains(example)).toBe(true)
        expect(demoCard?.textContent).toContain(demo?.interactive ? 'Interactive example' : 'Visual example')
        expect(demoCard?.querySelector('[data-pattern-demo-instruction]')).toBeTruthy()
      }
      expect(container.querySelector('a[href^="#pattern-example-"]')).toBeNull()
      unmount()
    }
  })

  it('shows a section demo after its source guidance and considerations', () => {
    const { container } = render(
      <>
        <PatternSourceContent page={PATTERN_PAGE_CONTENT['common-actions']} />
        <PatternDemo patternId='common-actions' />
      </>
    )
    const addSection = container.querySelector<HTMLElement>('#pattern-section-common-actions-add')
    const considerations = addSection?.textContent?.indexOf('Clarify operational consequences') ?? -1
    const addDemo = addSection?.querySelector('[data-pattern-demo-slot="common-actions-add"]')
    const demoIndex = addSection?.textContent?.indexOf('Add an existing mission') ?? -1

    expect(considerations).toBeGreaterThan(-1)
    expect(demoIndex).toBeGreaterThan(considerations)
    expect(addDemo).toBeTruthy()
  })

  it('does not repeat a demo title that matches its source section heading', () => {
    renderPatternDemo('common-actions')

    expect(screen.getAllByRole('heading', { name: 'Add' })).toHaveLength(1)
    expect(screen.getByText(/After success, animate the item out of the list/)).toBeTruthy()
    expect(screen.getByText(/when available/)).toBeTruthy()
  })

  it('shows a persistent Callout beside its field and limits brief toasts to non-actionable outcomes', async () => {
    const user = userEvent.setup()
    const { container } = renderPatternDemo('notifications')
    const calloutExample = container.querySelector<HTMLElement>(
      '[data-pattern-example-id="notifications-callout-on-load"]'
    )
    expect(calloutExample).toBeTruthy()
    expect(within(calloutExample!).getByRole('note', { name: 'Page-load callout' })).toBeTruthy()
    expect(within(calloutExample!).getByRole('textbox', { name: 'Review collection' })).toHaveProperty('readOnly', true)
    expect(within(calloutExample!).queryByRole('button')).toBeNull()
    expect(within(calloutExample!).getByText(/Visual reference only/)).toBeTruthy()

    const toastExample = container.querySelector<HTMLElement>('[data-pattern-example-id="notifications-toast-brief"]')
    expect(within(toastExample!).getByRole('button', { name: 'Show success toast' })).toBeTruthy()
    expect(within(toastExample!).getByRole('button', { name: 'Show information toast' })).toBeTruthy()
    expect(within(toastExample!).queryByRole('button', { name: /warning|error/i })).toBeNull()

    const panelExample = container.querySelector<HTMLElement>('[data-pattern-example-id="notifications-panel-review"]')
    await user.click(within(panelExample!).getByRole('button', { name: 'Notifications · 3 unread' }))
    expect(within(panelExample!).getByText(/Experimental preview/)).toBeTruthy()
    expect(within(panelExample!).getAllByText('Unread')).toHaveLength(3)
    expect(within(panelExample!).getByText('Information')).toBeTruthy()
    expect(within(panelExample!).getByText('Success')).toBeTruthy()
    expect(within(panelExample!).getByText('Warning')).toBeTruthy()
  })

  it('pairs a disabled primary action with its unsaved-route warning', () => {
    const { container } = renderPatternDemo('disabled-states')
    const example = container.querySelector<HTMLElement>('[data-pattern-example-id="disabled-states-warning"]')
    expect(example).toBeTruthy()
    expect(within(example!).getByRole('alert').textContent).toContain('Save the route before continuing')
    expect(within(example!).getByRole('alert').textContent).toContain('Save them before scheduling')
    expect(
      (within(example!).getByRole('button', { name: 'Continue to scheduling' }) as HTMLButtonElement).disabled
    ).toBe(true)
    expect(within(example!).queryByRole('button', { name: 'Export GeoJSON' })).toBeNull()
  })

  it('renders explanatory copy before each demo for every pattern', () => {
    const totalCopyVariants = Object.values(PATTERN_EXAMPLE_TEACHING).reduce(
      (total, examples) => total + Object.keys(examples).length,
      0
    )
    expect(totalCopyVariants).toBe(106)

    for (const pattern of PATTERNS) {
      const { container, unmount } = renderPatternDemo(pattern.id)
      const examples = container.querySelectorAll('[data-pattern-example]')
      expect(examples.length).toBeGreaterThan(0)

      for (const example of examples) {
        const teaching = example.querySelector('[data-pattern-teaching-copy]')
        const demoCard = example.querySelector('[data-pattern-demo-card]')

        expect(teaching?.textContent).toContain('What it means')
        expect(teaching?.textContent).toContain('How to choose')
        expect(teaching?.textContent).toContain('Before you ship')
        expect(demoCard).toBeTruthy()
        if (!teaching || !demoCard) throw new Error(`Missing teaching copy or demo card for ${pattern.id}`)
        expect(demoCard.contains(teaching)).toBe(false)
        expect(teaching.compareDocumentPosition(demoCard) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
      }

      unmount()
    }
  })

  it('renders the matching copy when Create and Edit examples change modes', async () => {
    const user = userEvent.setup()

    renderPatternDemo('community-create-flows')
    expect(screen.getByRole('heading', { name: 'Create a quick mission inline' })).toBeTruthy()
    await user.click(screen.getByRole('button', { name: 'Modal' }))
    expect(screen.getByRole('heading', { name: 'Create a mission in a focused dialog' })).toBeTruthy()
    cleanup()

    renderPatternDemo('community-edit')
    expect(screen.getByRole('heading', { name: 'Make a low-impact inline change' })).toBeTruthy()
    await user.click(screen.getByRole('button', { name: 'High-impact · modal' }))
    expect(screen.getByRole('heading', { name: 'Review a higher-impact edit before saving' })).toBeTruthy()
  })

  it('keeps Edit results inside the surface where the change was made', async () => {
    const user = userEvent.setup()
    const { container } = renderPatternDemo('community-edit')
    await user.click(screen.getByRole('button', { name: 'High-impact · modal' }))
    const modalExample = container.querySelector<HTMLElement>('[data-pattern-example-id="edit-high-impact-modal"]')

    await user.click(within(modalExample as HTMLElement).getByRole('button', { name: 'Edit mission details' }))
    await user.clear(screen.getByLabelText('Mission name'))
    await user.type(screen.getByLabelText('Mission name'), 'River mapping')
    await user.click(screen.getByRole('button', { name: 'Review change' }))
    const editConfirmation = screen.getByRole('alertdialog')
    expect(within(editConfirmation).getByText(/dispatchers use to identify it/)).toBeTruthy()
    expect(within(editConfirmation).getByText(/This sample has no undo/)).toBeTruthy()
    await user.click(screen.getByRole('button', { name: 'Confirm edit' }))
    expect(within(modalExample as HTMLElement).getByRole('alert').textContent).toContain(
      'saved in this sample after confirmation'
    )

    const panelExample = container.querySelector<HTMLElement>('[data-pattern-example-id="edit-side-panel"]')
    await user.click(within(panelExample as HTMLElement).getByRole('button', { name: 'High impact' }))
    await user.click(within(panelExample as HTMLElement).getByRole('button', { name: 'Open mission edit panel' }))
    await user.clear(screen.getByLabelText('Mission name'))
    await user.type(screen.getByLabelText('Mission name'), 'Solar array scan')
    await user.click(screen.getByRole('button', { name: 'Review change' }))
    const panelReview = screen.getByText(/This changes how dispatchers identify the plan/)
    expect(panelReview.textContent).toContain('no Undo')
    await user.click(screen.getByRole('button', { name: 'Confirm and save' }))
    expect(within(panelExample as HTMLElement).getByRole('status').textContent).toContain(
      'saved in this side-panel example after review'
    )

    const pageExample = container.querySelector<HTMLElement>('[data-pattern-example-id="edit-full-page"]')
    await user.click(within(pageExample as HTMLElement).getByRole('button', { name: 'Preview full-page edit' }))
    await user.clear(within(pageExample as HTMLElement).getByLabelText('Mission name'))
    await user.type(within(pageExample as HTMLElement).getByLabelText('Mission name'), 'Runway inspection')
    await user.click(within(pageExample as HTMLElement).getByRole('button', { name: 'Save revision' }))
    const pageConfirmation = screen.getByRole('alertdialog')
    expect(within(pageConfirmation).getByText(/dispatchers identify the plan/)).toBeTruthy()
    await user.click(within(pageConfirmation).getByRole('button', { name: 'Confirm and save' }))
    expect(within(pageExample as HTMLElement).getByRole('status').textContent).toContain(
      'saved in this full-page example'
    )
  })

  it('shows Import outcomes in the use case that produced them', async () => {
    const user = userEvent.setup()
    const { container } = renderPatternDemo('community-import')
    const mainExample = container.querySelector<HTMLElement>('[data-pattern-example-id="import-multiple-files-or-url"]')
    const modalExample = container.querySelector<HTMLElement>('[data-pattern-example-id="import-single-file-modal"]')
    const metadataExample = container.querySelector<HTMLElement>(
      '[data-pattern-example-id="import-metadata-side-panel"]'
    )

    await user.click(within(modalExample as HTMLElement).getByRole('button', { name: 'Import one mission file' }))
    await user.click(await screen.findByRole('button', { name: 'URL' }))
    await user.type(screen.getByLabelText('Source URL'), 'https://example.com/mission.geojson')
    await user.click(screen.getByRole('button', { name: 'Add URL' }))
    await user.click(screen.getByRole('button', { name: 'Import file' }))
    expect(within(modalExample as HTMLElement).getByRole('status').textContent).toContain('No data was fetched')
    expect(within(mainExample as HTMLElement).queryByRole('status')).toBeNull()

    await user.click(within(mainExample as HTMLElement).getByRole('button', { name: 'Import from URL' }))
    await user.type(
      within(mainExample as HTMLElement).getByLabelText('Source URL'),
      'https://example.com/flight-plan.json'
    )
    const mainUrlActions = within(mainExample as HTMLElement).getAllByRole('button', { name: 'Import from URL' })
    await user.click(mainUrlActions[1])
    expect(within(mainExample as HTMLElement).getByRole('status').textContent).toContain(
      'URL accepted for this illustration'
    )
    expect(within(modalExample as HTMLElement).getByRole('status').textContent).toContain('No data was fetched')

    await user.click(within(metadataExample as HTMLElement).getByRole('button', { name: 'Review import details' }))
    await user.clear(screen.getByLabelText('Collection name'))
    await user.type(screen.getByLabelText('Collection name'), 'River surveys')
    await user.type(screen.getByLabelText('Import note'), 'Check shoreline coverage')
    await user.click(screen.getByRole('button', { name: 'Review import' }))
    expect(within(metadataExample as HTMLElement).getByRole('status').textContent).toContain('River surveys')
    expect(within(metadataExample as HTMLElement).getByRole('status').textContent).toContain('Reviewer note included')
    expect(within(metadataExample as HTMLElement).getByRole('status').textContent).toContain('No data was imported')
  })

  it('labels Export actions as previews and shows progress only while preparation runs', async () => {
    const user = userEvent.setup()
    const { container } = renderPatternDemo('community-export')
    const configExample = container.querySelector<HTMLElement>('[data-pattern-example-id="export-customize"]')
    const progressExample = container.querySelector<HTMLElement>(
      '[data-pattern-example-id="export-progress-and-error"]'
    )

    await user.click(within(configExample as HTMLElement).getByRole('button', { name: 'Show export error' }))
    await user.click(within(configExample as HTMLElement).getByRole('button', { name: 'Retry' }))
    expect(within(configExample as HTMLElement).getByRole('status').textContent).toContain('Retry completed')

    const downloadExample = container.querySelector<HTMLElement>(
      '[data-pattern-example-id="export-intuitive-download"]'
    )
    await user.click(within(downloadExample as HTMLElement).getByRole('button', { name: 'Preview standard download' }))
    expect(within(downloadExample as HTMLElement).getByRole('status').textContent).toContain(
      'does not create or download a file'
    )

    await user.click(within(configExample as HTMLElement).getByRole('button', { name: 'Prepare CSV preview' }))
    expect(within(configExample as HTMLElement).getByRole('status').textContent).toContain('No download occurred')

    await user.click(within(progressExample as HTMLElement).getByRole('button', { name: 'Start preparation' }))
    expect(within(progressExample as HTMLElement).getByRole('progressbar')).toBeTruthy()
    await user.click(within(progressExample as HTMLElement).getByRole('button', { name: 'Finish preparation' }))
    expect(within(progressExample as HTMLElement).getByRole('status').textContent).toContain('complete')
    expect(within(progressExample as HTMLElement).queryByRole('progressbar')).toBeNull()

    await user.click(within(progressExample as HTMLElement).getByRole('button', { name: 'Preview destination error' }))
    await user.click(within(progressExample as HTMLElement).getByRole('button', { name: 'Retry preparation' }))
    expect(within(progressExample as HTMLElement).getByRole('progressbar')).toBeTruthy()
    expect(within(progressExample as HTMLElement).getByRole('status').textContent).toContain('Retrying export')
  })

  it('keeps Search results local and supports type-ahead keyboard selection and dismissal', async () => {
    const user = userEvent.setup()
    const { container } = renderPatternDemo('search')
    const findExample = container.querySelector<HTMLElement>('[data-pattern-example-id="search-find-and-narrow"]')
    const recoveryExample = container.querySelector<HTMLElement>(
      '[data-pattern-example-id="search-result-count-recovery"]'
    )
    const previewExample = container.querySelector<HTMLElement>('[data-pattern-example-id="search-preview-type-ahead"]')

    await user.type(within(findExample as HTMLElement).getByLabelText('Search missions'), 'North coast')
    expect(within(findExample as HTMLElement).getByText('1 mission match')).toBeTruthy()
    expect(within(findExample as HTMLElement).getByText('North coast survey')).toBeTruthy()
    expect(within(recoveryExample as HTMLElement).getByText('4 missions found in this example.')).toBeTruthy()

    await user.type(within(recoveryExample as HTMLElement).getByLabelText('Search the sample catalog'), 'moon')
    expect(within(recoveryExample as HTMLElement).getByRole('status').textContent).toContain('No missions found')
    await user.click(within(recoveryExample as HTMLElement).getByRole('button', { name: 'Clear search' }))
    expect(within(recoveryExample as HTMLElement).getByText('4 missions found in this example.')).toBeTruthy()

    const previewInput = within(previewExample as HTMLElement).getByLabelText('Find a mission preview')
    await user.type(previewInput, 'Run')
    expect(within(previewExample as HTMLElement).getByRole('listbox', { name: 'Mission suggestions' })).toBeTruthy()
    await user.keyboard('{ArrowDown}{Enter}')
    expect(previewInput).toHaveProperty('value', 'Runway inspection')
    expect(within(previewExample as HTMLElement).queryByRole('listbox')).toBeNull()

    await user.clear(previewInput)
    await user.type(previewInput, 'Coast')
    expect(within(previewExample as HTMLElement).getByRole('listbox')).toBeTruthy()
    await user.keyboard('{Escape}')
    expect(within(previewExample as HTMLElement).queryByRole('listbox')).toBeNull()
  })

  it('shows Login layout changes in the layout example instead of another use case', async () => {
    const user = userEvent.setup()
    const { container } = renderPatternDemo('login')
    const layoutExample = container.querySelector<HTMLElement>('[data-pattern-example-id="login-choose-layout"]')
    const authExample = container.querySelector<HTMLElement>('[data-pattern-example-id="login-progressive-auth"]')
    const authForm = authExample?.querySelector('form')

    await user.click(within(layoutExample as HTMLElement).getByRole('button', { name: 'Split welcome' }))

    expect(
      within(layoutExample as HTMLElement).getByRole('region', { name: 'Sign-in layout preview' }).className
    ).toContain('sm:grid-cols-2')
    expect(within(layoutExample as HTMLElement).getByRole('status').textContent).toContain('Split welcome preview')
    expect(authExample?.querySelector('form')?.className).toBe(authForm?.className)
    expect(within(authExample as HTMLElement).getByRole('status').textContent).toContain(
      'This form does not authenticate'
    )
  })

  it('keeps progressive sign-in steps separate and recovers credential errors without account disclosure', async () => {
    const user = userEvent.setup()
    const { container } = renderPatternDemo('login')
    const authExample = container.querySelector<HTMLElement>('[data-pattern-example-id="login-progressive-auth"]')
    expect(authExample).toBeTruthy()
    await user.type(within(authExample!).getByRole('textbox', { name: 'Work email' }), 'pilot@example.com')
    await user.click(within(authExample!).getByRole('button', { name: 'Continue' }))
    expect(within(authExample!).queryByRole('textbox', { name: 'Work email' })).toBeNull()
    expect(within(authExample!).getByText('pilot@example.com')).toBeTruthy()
    expect(within(authExample!).getByLabelText('Password')).toBeTruthy()
    expect(within(authExample!).queryByRole('button', { name: 'Continue with organization SSO' })).toBeNull()

    await user.type(within(authExample!).getByLabelText('Password'), 'not-a-real-password')
    await user.click(within(authExample!).getByRole('button', { name: 'Preview credential error' }))
    expect(within(authExample!).getByRole('alert').textContent).toContain('Incorrect ID or password. Try again.')
    expect(within(authExample!).getByRole('textbox', { name: 'Work email' })).toHaveProperty(
      'value',
      'pilot@example.com'
    )
    expect(within(authExample!).queryByLabelText('Password')).toBeNull()

    await user.click(within(authExample!).getByRole('button', { name: 'Continue' }))
    await user.type(within(authExample!).getByLabelText('Password'), 'sample-only')
    await user.click(within(authExample!).getByRole('button', { name: 'Continue to verification' }))
    expect(within(authExample!).getByText(/MFA guidance not standardized/)).toBeTruthy()
    expect(within(authExample!).getByRole('textbox', { name: 'Verification code' })).toBeTruthy()
  })

  it('keeps Global Header breadcrumb previews local and type-ahead focus on visible suggestions', async () => {
    const user = userEvent.setup()
    const { container } = renderPatternDemo('global-header')
    const headerExample = container.querySelector<HTMLElement>(
      '[data-pattern-example-id="global-header-with-local-nav"]'
    )

    const currentHash = window.location.hash
    await user.click(within(headerExample as HTMLElement).getByRole('link', { name: 'Workspace' }))
    expect(window.location.hash).toBe(currentHash)
    expect(within(headerExample as HTMLElement).getByText(/Opened the local workspace overview preview/)).toBeTruthy()

    cleanup()
    const { container: searchContainer } = renderPatternDemo('search')
    const previewExample = searchContainer.querySelector<HTMLElement>(
      '[data-pattern-example-id="search-preview-type-ahead"]'
    )
    const previewInput = within(previewExample as HTMLElement).getByLabelText('Find a mission preview')
    await user.type(previewInput, 'a')
    await user.keyboard('{ArrowDown}{ArrowDown}{ArrowDown}{ArrowDown}')
    const activeOptionId = previewInput.getAttribute('aria-activedescendant')
    expect(activeOptionId).toBeTruthy()
    expect(previewExample?.querySelector(`#${activeOptionId}`)).toBeTruthy()
  })

  it('keeps Text Toolbar actions and find results inside their own examples', async () => {
    const user = userEvent.setup()
    const { container } = renderPatternDemo('text-toolbars')
    const formatExample = container.querySelector<HTMLElement>('[data-pattern-example-id="text-toolbars-format-draft"]')
    const findExample = container.querySelector<HTMLElement>(
      '[data-pattern-example-id="text-toolbars-find-in-context"]'
    )

    await user.click(within(formatExample as HTMLElement).getByRole('button', { name: 'Text style' }))
    await user.click(await screen.findByRole('menuitem', { name: 'Heading' }))
    expect(
      within(formatExample as HTMLElement).getByRole('region', { name: 'Formatted draft preview' }).className
    ).toContain('text-xl')
    expect(within(findExample as HTMLElement).getByRole('alert').textContent).toContain('Experimental example')

    await user.type(within(findExample as HTMLElement).getByLabelText('Find text in draft'), 'survey')
    const preview = within(findExample as HTMLElement).getByRole('region', { name: 'Edited draft preview' })
    expect(within(findExample as HTMLElement).getByRole('status').textContent).toContain('1 match in this draft')
    expect(within(preview).getByText('survey').tagName).toBe('MARK')
    await user.click(within(findExample as HTMLElement).getByRole('button', { name: 'Clear find text' }))
    expect(preview.querySelector('mark')).toBeNull()
  })

  it('keeps Filtering outputs local and distinguishes pending, applied, and reset states', async () => {
    const user = userEvent.setup()
    const { container } = renderPatternDemo('filtering')
    const singleExample = container.querySelector<HTMLElement>('[data-pattern-example-id="filtering-single-status"]')
    const multiExample = container.querySelector<HTMLElement>(
      '[data-pattern-example-id="filtering-combine-categories"]'
    )

    await user.click(within(singleExample as HTMLElement).getByRole('radio', { name: 'Ready' }))
    expect(within(singleExample as HTMLElement).getByRole('status').textContent).toContain('2 missions shown for ready')
    expect(within(multiExample as HTMLElement).getByRole('status').textContent).toContain('4 missions shown')

    await user.click(within(multiExample as HTMLElement).getByRole('button', { name: 'Batch' }))
    await user.click(within(multiExample as HTMLElement).getByRole('checkbox', { name: 'Planning' }))
    expect(within(multiExample as HTMLElement).getByRole('status').textContent).toContain('4 missions shown')
    expect(within(multiExample as HTMLElement).getByRole('status').textContent).toContain('1 pending selection')
    await user.click(within(multiExample as HTMLElement).getByRole('button', { name: 'Apply filters' }))
    expect(within(multiExample as HTMLElement).getByRole('status').textContent).toContain('2 missions shown')
    expect(within(multiExample as HTMLElement).getByText('North coast survey')).toBeTruthy()
    expect(within(multiExample as HTMLElement).queryByText('Runway inspection')).toBeNull()
    expect(within(singleExample as HTMLElement).getByText('River mapping')).toBeTruthy()
    expect(within(singleExample as HTMLElement).queryByText('Runway inspection')).toBeNull()

    await user.click(within(multiExample as HTMLElement).getByRole('button', { name: 'Clear selections' }))
    expect(within(multiExample as HTMLElement).getByRole('status').textContent).toContain('2 missions shown')
    expect(within(multiExample as HTMLElement).getByRole('status').textContent).toContain('0 pending selection')
    await user.click(within(multiExample as HTMLElement).getByRole('button', { name: 'Reset all filters' }))
    expect(within(multiExample as HTMLElement).getByRole('status').textContent).toContain('4 missions shown')
  })

  it('adds an existing mission to the review collection without creating a new one', async () => {
    const user = userEvent.setup()
    renderPatternDemo('common-actions')

    const addAction = screen.getByRole('button', { name: 'Add mission' })
    expect(addAction.className).toContain('bg-primary')
    await user.click(screen.getByRole('button', { name: 'Secondary task' }))
    expect(screen.getByRole('button', { name: 'Secondary task' }).getAttribute('aria-pressed')).toBe('true')
    expect(addAction.className).toContain('border-input')
    expect(screen.getByText(/lower its visual emphasis/)).toBeTruthy()
    await user.click(screen.getByRole('button', { name: 'Main task' }))
    expect(screen.getByRole('button', { name: 'Main task' }).getAttribute('aria-pressed')).toBe('true')

    await user.click(screen.getByRole('combobox'))
    await user.click(await screen.findByRole('option', { name: 'Solar array scan' }))
    await user.click(screen.getByRole('button', { name: 'Add mission' }))

    const collection = screen.getByRole('region', { name: 'Team review collection' })
    expect(within(collection).getByText('Solar array scan')).toBeTruthy()
    expect(within(collection).getByText(/does not create a new one/)).toBeTruthy()
  })

  it('clears a defaulted single-choice filter back to its defined value', async () => {
    const user = userEvent.setup()
    const { container } = renderPatternDemo('common-actions')
    const example = container.querySelector<HTMLElement>('[data-pattern-example-id="common-actions-clear"]')!
    const status = within(example).getByRole('status')

    const statusChoices = within(example).getAllByRole('radio')
    await user.click(statusChoices[2])
    expect(status.textContent).toBe('Status filter: Complete.')
    await user.click(within(example).getByRole('button', { name: 'Clear to default' }))
    expect(status.textContent).toBe('Status filter: Ready.')
  })

  it('closes a non-blocking update from the alert surface corner', async () => {
    const user = userEvent.setup()
    const { container } = renderPatternDemo('common-actions')
    const example = container.querySelector<HTMLElement>('[data-pattern-example-id="common-actions-close"]')!
    const alert = within(example).getByRole('alert')
    const close = within(alert).getByRole('button', { name: 'Close route review reminder' })

    expect(close.className).toContain('absolute right-2 top-2')
    await user.click(close)
    expect(within(example).getByRole('button', { name: 'Show update again' })).toBeTruthy()
  })

  it('cancels a route edit by closing the dialog and restoring the saved name', async () => {
    const user = userEvent.setup()
    const { container } = renderPatternDemo('common-actions')
    const example = container.querySelector<HTMLElement>('[data-pattern-example-id="common-actions-cancel"]')!

    await user.click(within(example).getByRole('button', { name: 'Edit route name' }))
    const dialog = screen.getByRole('dialog', { name: 'Edit route name' })
    const routeName = within(dialog).getByLabelText('Route name')
    await user.clear(routeName)
    await user.type(routeName, 'River mapping')
    await user.click(within(dialog).getByRole('button', { name: 'Cancel edit' }))

    expect(screen.queryByRole('dialog', { name: 'Edit route name' })).toBeNull()
    expect(within(example).getByText('Saved route: North coast survey')).toBeTruthy()
    expect(within(example).getByRole('status').textContent).toContain('Edit canceled')
  })

  it('pairs Edit, Next, and Refresh labels with their expected action icons and results', async () => {
    const user = userEvent.setup()
    const { container } = renderPatternDemo('common-actions')
    const edit = container.querySelector<HTMLElement>('[data-pattern-example-id="common-actions-edit"]')!
    const next = container.querySelector<HTMLElement>('[data-pattern-example-id="common-actions-next"]')!
    const refresh = container.querySelector<HTMLElement>('[data-pattern-example-id="common-actions-refresh"]')!

    expect(
      within(edit).getByRole('button', { name: 'Edit name' }).querySelector('svg[aria-hidden="true"]')
    ).toBeTruthy()
    expect(
      within(next).getByRole('button', { name: 'Next step' }).querySelector('svg[aria-hidden="true"]')
    ).toBeTruthy()
    expect(
      within(refresh).getByRole('button', { name: 'Refresh missions' }).querySelector('svg[aria-hidden="true"]')
    ).toBeTruthy()

    await user.click(within(next).getByRole('button', { name: 'Next step' }))
    expect(within(next).getByText('Step 2 of 3 · Flight area')).toBeTruthy()
    await user.click(within(refresh).getByRole('button', { name: 'Refresh missions' }))
    expect(within(refresh).getByRole('status').textContent).toContain('filters were kept')
  })

  it('requires the flight-plan name before confirming high-impact deletion', async () => {
    const user = userEvent.setup()
    renderPatternDemo('common-actions')
    await user.click(screen.getByRole('button', { name: 'Delete flight plan' }))
    const dialog = screen.getByRole('alertdialog')
    expect(within(dialog).getByText(/This cannot be undone/)).toBeTruthy()
    const confirm = within(dialog).getByRole('button', { name: 'Delete permanently' }) as HTMLButtonElement
    expect(confirm.disabled).toBe(true)
    await user.type(within(dialog).getByLabelText('Type North coast survey to confirm'), 'North coast')
    expect(confirm.disabled).toBe(true)
    await user.type(within(dialog).getByLabelText('Type North coast survey to confirm'), ' survey')
    expect(confirm.disabled).toBe(false)
    await user.click(confirm)
    expect(screen.getByText(/Flight plan permanently deleted in this sample/)).toBeTruthy()
  })

  it('copies the displayed mission ID and reports the actual outcome', async () => {
    const user = userEvent.setup()
    const clipboardDescriptor = Object.getOwnPropertyDescriptor(navigator, 'clipboard')
    const writeText = vi.fn<(text: string) => Promise<void>>().mockResolvedValue(undefined)
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText } })

    try {
      renderPatternDemo('common-actions')
      await user.click(screen.getByRole('button', { name: 'Copy flight plan ID' }))

      expect(writeText).toHaveBeenCalledWith('mission-2048')
      expect(screen.getByText('Flight plan ID copied to the clipboard.')).toBeTruthy()
      expect(screen.getByText('Copied')).toBeTruthy()
    } finally {
      if (clipboardDescriptor) {
        Object.defineProperty(navigator, 'clipboard', clipboardDescriptor)
      } else {
        Reflect.deleteProperty(navigator, 'clipboard')
      }
    }
  })

  it('turns the failed refresh example into a visible recovered state after retry', async () => {
    const user = userEvent.setup()
    renderPatternDemo('common-actions')

    await user.click(screen.getByRole('button', { name: 'Retry' }))
    expect(screen.getByText('Flight plans refreshed')).toBeTruthy()
    expect(screen.queryByText('Could not refresh flight plans')).toBeNull()
  })

  it('keeps action outcomes beside their own Common Actions use case', async () => {
    const user = userEvent.setup()
    const { container } = renderPatternDemo('common-actions')
    const cancelExample = container.querySelector<HTMLElement>('[data-pattern-example-id="common-actions-cancel"]')

    await user.click(within(cancelExample as HTMLElement).getByRole('button', { name: 'Edit route name' }))
    const dialog = screen.getByRole('dialog', { name: 'Edit route name' })
    await user.clear(within(dialog).getByLabelText('Route name'))
    await user.type(within(dialog).getByLabelText('Route name'), 'Temporary route')
    await user.click(within(dialog).getByRole('button', { name: 'Save route name' }))

    expect(within(cancelExample as HTMLElement).getByText('Saved route: Temporary route')).toBeTruthy()
    expect(within(cancelExample as HTMLElement).getByRole('status').textContent).toContain('saved in this sample')
  })

  it('keeps local outcomes inside the related Pattern examples', async () => {
    const user = userEvent.setup()
    const { container } = renderPatternDemo('disclosures')
    const profileExample = container.querySelector<HTMLElement>('[data-pattern-example-id="disclosures-profile-menu"]')

    await user.click(within(profileExample as HTMLElement).getByRole('button', { name: 'Tuan Trinh · Account' }))
    await user.click(await screen.findByRole('menuitem', { name: 'Profile settings' }))
    expect(within(profileExample as HTMLElement).getByRole('status').textContent).toContain('Profile settings opened')

    cleanup()
    const chatbotRender = renderPatternDemo('community-chatbots')
    const navigationExample = chatbotRender.container.querySelector<HTMLElement>(
      '[data-pattern-example-id="chatbots-standard-navigation"]'
    )
    await user.click(
      within(navigationExample as HTMLElement).getByRole('button', { name: 'Preview Missions workspace' })
    )
    expect(
      within(navigationExample as HTMLElement).getByRole('region', { name: 'Missions workspace preview' })
    ).toBeTruthy()
    expect(within(navigationExample as HTMLElement).queryByText('You: Open missions')).toBeNull()
  })

  it('stages disclosure filter choices until Apply and shows the updated list in that example', async () => {
    const user = userEvent.setup()
    const { container } = renderPatternDemo('disclosures')
    const example = container.querySelector<HTMLElement>(
      '[data-pattern-example-id="disclosures-settings-filter-menu"]'
    ) as HTMLElement

    expect(within(example).getByRole('status').textContent).toContain('2 missions match: Planning')
    expect(within(example).getByRole('list', { name: 'Filtered sample missions' }).textContent).toContain(
      'North coast survey'
    )
    await user.click(within(example).getByRole('button', { name: /Mission filters/ }))
    await user.click(await screen.findByRole('checkbox', { name: 'Review' }))
    expect(within(example).getByRole('status').textContent).toContain('2 missions match: Planning')
    await user.click(screen.getByRole('button', { name: 'Apply filters' }))
    expect(within(example).getByRole('status').textContent).toContain('3 missions match: Planning, Review')
    expect(within(example).getByRole('list', { name: 'Filtered sample missions' }).textContent).toContain(
      'Runway inspection'
    )

    await user.click(await screen.findByRole('button', { name: 'Reset' }))
    expect(within(example).getByRole('status').textContent).toContain('Showing all 4 sample missions')
    expect(within(example).getByRole('list', { name: 'Filtered sample missions' }).textContent).toContain(
      'Solar array scan'
    )
  })

  it('keeps contact and validation outcomes inside their own Forms examples', async () => {
    const user = userEvent.setup()
    const { container } = renderPatternDemo('forms')
    const validationExample = container.querySelector<HTMLElement>(
      '[data-pattern-example-id="forms-validation-recovery"]'
    )
    const contactExample = container.querySelector<HTMLElement>('[data-pattern-example-id="forms-contact-details"]')

    await user.click(within(contactExample as HTMLElement).getByRole('button', { name: 'Save contact details' }))
    expect(within(contactExample as HTMLElement).getByText('Enter a contact name.')).toBeTruthy()
    expect(within(contactExample as HTMLElement).getByText('Enter a valid email address.')).toBeTruthy()

    await user.type(within(contactExample as HTMLElement).getByLabelText('Contact name'), 'Maya Chen')
    await user.type(within(contactExample as HTMLElement).getByLabelText('Email address'), 'maya@example.com')
    await user.click(within(contactExample as HTMLElement).getByRole('button', { name: 'Save contact details' }))
    expect(within(contactExample as HTMLElement).getByRole('status').textContent).toContain('Contact details are valid')
    expect(within(validationExample as HTMLElement).queryByRole('status')).toBeNull()

    await user.click(within(validationExample as HTMLElement).getByRole('button', { name: 'Validate email' }))
    expect(within(validationExample as HTMLElement).getByText('Enter an email address that includes @.')).toBeTruthy()
    await user.type(within(validationExample as HTMLElement).getByLabelText('Notification email'), 'pilot@example.com')
    await user.click(within(validationExample as HTMLElement).getByRole('button', { name: 'Validate email' }))
    expect(within(validationExample as HTMLElement).getByRole('status').textContent).toContain('Email format is valid')
    expect(within(validationExample as HTMLElement).queryByText('Enter an email address that includes @.')).toBeNull()
    await user.click(
      within(validationExample as HTMLElement).getByRole('button', { name: 'Simulate server rejection' })
    )
    expect(within(validationExample as HTMLElement).getByRole('alert').textContent).toContain('Service could not save')
  })

  it('preserves entered values when moving between form stages', async () => {
    const user = userEvent.setup()
    const { container } = renderPatternDemo('forms')
    const multiStepExample = container.querySelector<HTMLElement>('[data-pattern-example-id="forms-multistep-request"]')

    await user.type(within(multiStepExample as HTMLElement).getByLabelText('Purpose'), 'Coastal mapping')
    await user.click(within(multiStepExample as HTMLElement).getByRole('button', { name: 'Continue to safety' }))
    await user.type(within(multiStepExample as HTMLElement).getByLabelText('Aircraft'), 'Scout 04')
    await user.click(within(multiStepExample as HTMLElement).getByRole('button', { name: 'Previous stage' }))
    expect(within(multiStepExample as HTMLElement).getByLabelText('Purpose')).toHaveProperty('value', 'Coastal mapping')

    await user.click(within(multiStepExample as HTMLElement).getByRole('button', { name: 'Continue to safety' }))
    expect(within(multiStepExample as HTMLElement).getByLabelText('Aircraft')).toHaveProperty('value', 'Scout 04')
  })

  it('keeps every Empty States action and recovery outcome inside its own example', async () => {
    const user = userEvent.setup()
    const { container } = renderPatternDemo('empty-states')
    const example = (id: string) =>
      container.querySelector<HTMLElement>(`[data-pattern-example-id="${id}"]`) as HTMLElement
    const noData = example('empty-states-no-data')
    const noResults = example('empty-states-no-results')
    const loadError = example('empty-states-error')
    const inlineHelp = example('empty-states-inline-doc')
    const onboarding = example('empty-states-onboarding')
    const starter = example('empty-states-starter-content')

    await user.click(within(noData).getByRole('button', { name: 'Create flight plan' }))
    expect(within(noData).getByText('First plan created')).toBeTruthy()
    expect(within(noData).getByRole('list', { name: 'Sample flight plans' }).textContent).toContain(
      'North coast survey'
    )

    const search = within(noResults).getByLabelText('Search flight plans')
    await user.clear(search)
    await user.type(search, 'North')
    expect(within(noResults).getByRole('list', { name: 'Matching flight plans' }).textContent).toContain(
      'North coast survey'
    )
    await user.clear(search)
    await user.type(search, 'unmatched route')
    expect(within(noResults).getByText('No plans match “unmatched route”')).toBeTruthy()
    await user.click(within(noResults).getByRole('button', { name: 'Clear search' }))
    expect(within(noResults).getByRole('list', { name: 'Matching flight plans' }).textContent).toContain(
      'River mapping'
    )

    await user.click(within(loadError).getByRole('button', { name: 'Retry' }))
    expect(within(loadError).getByText('Flight plans loaded')).toBeTruthy()

    const noDataList = within(noData).getByRole('list', { name: 'Sample flight plans' })
    const noDataListBeforeInlineAction = noDataList.textContent
    await user.click(within(inlineHelp).getByRole('button', { name: 'Create a plan' }))
    expect(within(inlineHelp).getByRole('status').textContent).toContain('North coast survey · Draft')
    expect(noDataList.textContent).toBe(noDataListBeforeInlineAction)

    await user.click(within(onboarding).getByRole('button', { name: 'Complete next step' }))
    expect(within(onboarding).getByRole('status').textContent).toContain('2 of 3 setup steps complete')
    await user.click(within(onboarding).getByRole('button', { name: 'Dismiss guide' }))
    expect(within(onboarding).getByText(/Setup guide dismissed/)).toBeTruthy()
    await user.click(within(onboarding).getByRole('button', { name: 'Show setup guide' }))
    expect(within(onboarding).getByRole('button', { name: 'Complete next step' })).toBeTruthy()

    await user.click(within(starter).getByRole('button', { name: 'Clear sample content' }))
    expect(within(starter).getByRole('status').textContent).toContain('Sample content cleared')
    await user.click(within(starter).getByRole('button', { name: 'Restore sample content' }))
    expect(within(starter).getByRole('list', { name: 'Starter flight plans' }).textContent).toContain(
      'North coast survey'
    )
  })

  it('keeps separate deletion outcomes within their own impact examples', async () => {
    const user = userEvent.setup()
    const { container } = renderPatternDemo('community-remove')
    const highDelete = container.querySelector<HTMLElement>('[data-pattern-example-id="remove-high-impact-delete"]')
    const mediumDelete = container.querySelector<HTMLElement>('[data-pattern-example-id="remove-medium-impact-delete"]')

    await user.click(within(highDelete as HTMLElement).getByRole('button', { name: 'Delete permanently' }))
    const dialog = await screen.findByRole('alertdialog')
    await user.type(within(dialog).getByLabelText('Resource name'), 'North coast survey')
    await user.click(within(dialog).getByRole('button', { name: 'Delete' }))

    expect(within(highDelete as HTMLElement).getByRole('status').textContent).toContain('North coast survey deleted')
    expect(within(mediumDelete as HTMLElement).getByRole('status').textContent).toBe(
      'No saved filter has been deleted.'
    )
  })

  it('labels static tearsheet layouts as visual references and disables inert controls', () => {
    const { container } = renderPatternDemo('community-create-flows')
    const example = container.querySelector<HTMLElement>('[data-pattern-example-id="create-flows-narrow-tearsheet"]')

    expect(example?.textContent).toContain('Visual example')
    expect(example?.textContent).toContain('Visual reference only')
    expect(
      within(example as HTMLElement)
        .getByRole('button', { name: 'Create' })
        .hasAttribute('disabled')
    ).toBe(true)
    expect(
      within(example as HTMLElement)
        .getByLabelText('Mission name')
        .hasAttribute('readonly')
    ).toBe(true)
  })

  it('explains what happens after a one-time key result is dismissed', async () => {
    const user = userEvent.setup()
    renderPatternDemo('community-api-key')

    await user.click(screen.getByRole('button', { name: 'Generate key' }))
    await user.click(screen.getByRole('button', { name: 'Leave key result' }))

    const alertText = screen
      .getAllByRole('alert')
      .find((alert) => alert.textContent?.includes('One-time result closed'))?.textContent
    expect(alertText).toBeTruthy()
    expect(alertText).toContain('One-time result closed')
    expect(alertText).toContain('recovery would require a new key')
  })

  it('labels API-key copy, rotation, and revocation as local previews', async () => {
    const user = userEvent.setup()
    const { container } = renderPatternDemo('community-api-key')
    const createExample = container.querySelector<HTMLElement>('[data-pattern-example-id="api-key-create-and-manage"]')

    await user.click(within(createExample as HTMLElement).getByRole('button', { name: 'Generate key' }))
    await user.click(within(createExample as HTMLElement).getByRole('button', { name: 'Preview copy feedback' }))
    expect(within(createExample as HTMLElement).getByRole('status').textContent).toContain('Clipboard was not accessed')
    expect(within(createExample as HTMLElement).getByRole('button', { name: 'Copy preview shown' })).toBeTruthy()

    await user.click(within(createExample as HTMLElement).getByRole('button', { name: 'Manage key' }))
    expect(await screen.findByRole('menuitem', { name: 'Preview key rotation' })).toBeTruthy()
    expect(screen.getByRole('menuitem', { name: 'Preview key revocation' })).toBeTruthy()
  })

  it('shows a local destination when a chatbot hands work back to standard navigation', async () => {
    const user = userEvent.setup()
    const { container } = renderPatternDemo('community-chatbots')
    const example = container.querySelector<HTMLElement>('[data-pattern-example-id="chatbots-standard-navigation"]')

    await user.click(within(example as HTMLElement).getByRole('button', { name: 'Preview Missions workspace' }))
    const destination = within(example as HTMLElement).getByRole('region', { name: 'Missions workspace preview' })
    expect(destination.textContent).toContain('North coast survey')
    expect(destination.textContent).toContain('product navigation did not occur')
  })

  it('keeps read-only empty values factual and hides zero-count status badges', () => {
    const { container: readOnlyContainer } = renderPatternDemo('read-only-states')
    const emptyExample = readOnlyContainer.querySelector<HTMLElement>(
      '[data-pattern-example-id="read-only-empty-informative"]'
    )
    expect(within(emptyExample as HTMLElement).getByText('No note provided')).toBeTruthy()
    expect(within(emptyExample as HTMLElement).queryByRole('textbox')).toBeNull()
    expect(
      readOnlyContainer.querySelector('[data-pattern-example-id="read-only-selected-bound"] input[type="date"]')
    ).toBeNull()

    cleanup()
    const { container: statusContainer } = renderPatternDemo('status-indicators')
    const badgeExample = statusContainer.querySelector<HTMLElement>(
      '[data-pattern-example-id="status-badge-navigation"]'
    )
    expect(within(badgeExample as HTMLElement).getByText('0 unread · badge hidden')).toBeTruthy()
    expect(within(badgeExample as HTMLElement).queryByText('0', { exact: true })).toBeNull()
  })

  it('keeps irreversible deletion examples irreversible in their outcomes', async () => {
    const user = userEvent.setup()
    renderPatternDemo('community-remove')

    await user.click(screen.getByRole('button', { name: 'Delete permanently' }))
    const highImpactDialog = await screen.findByRole('alertdialog')
    await user.type(within(highImpactDialog).getByLabelText('Resource name'), 'North coast survey')
    await user.click(within(highImpactDialog).getByRole('button', { name: 'Delete' }))
    expect(await screen.findByText(/Deleted in this sample · reload the page/)).toBeTruthy()
    expect(screen.queryByRole('button', { name: 'Restore sample' })).toBeNull()

    await user.click(screen.getByRole('button', { name: 'Delete saved filter' }))
    const mediumImpactDialog = await screen.findByRole('alertdialog')
    await user.click(within(mediumImpactDialog).getByRole('button', { name: 'Delete filter' }))
    expect(screen.getAllByText(/Deleted in this sample · reload the page/)).toHaveLength(2)
    expect(screen.queryByRole('button', { name: 'Restore saved filter' })).toBeNull()
  })

  it('distinguishes low-impact deletion from low-impact removal and keeps Undo beside the deletion result', async () => {
    const user = userEvent.setup()
    const { container } = renderPatternDemo('community-remove')
    const deletion = container.querySelector<HTMLElement>('[data-pattern-example-id="remove-low-impact-delete"]')
    const unlink = container.querySelector<HTMLElement>('[data-pattern-example-id="remove-low-impact-unlink"]')

    expect(
      within(deletion as HTMLElement).getByRole('heading', { name: 'Low-impact deletion · undo a draft deletion' })
    ).toBeTruthy()
    await user.click(within(deletion as HTMLElement).getByRole('button', { name: 'Delete draft' }))
    expect(within(deletion as HTMLElement).getByText('Draft deleted from the sample list.')).toBeTruthy()
    expect(within(deletion as HTMLElement).getByRole('status').textContent).toContain('Undo is available')
    await user.click(within(deletion as HTMLElement).getByRole('button', { name: 'Undo' }))
    expect(within(deletion as HTMLElement).getByText('North coast survey · unsent draft')).toBeTruthy()
    expect(within(deletion as HTMLElement).getByRole('status').textContent).toBe('Draft restored to the sample list.')

    expect(
      within(unlink as HTMLElement).getByRole('heading', { name: 'Low-impact removal · unlink and undo' })
    ).toBeTruthy()
    expect(within(unlink as HTMLElement).getByRole('button', { name: 'Remove saved item' })).toBeTruthy()
  })

  it('does not offer restoration for a medium-impact removal described as non-reversible', async () => {
    const user = userEvent.setup()
    const { container } = renderPatternDemo('community-remove')
    const example = container.querySelector<HTMLElement>('[data-pattern-example-id="remove-medium-impact-unlink"]')

    await user.click(within(example as HTMLElement).getByRole('button', { name: 'Remove from team' }))
    const confirmation = await screen.findByRole('alertdialog', { name: 'Remove from the team collection?' })
    await user.click(within(confirmation).getByRole('button', { name: 'Remove' }))

    expect(
      within(example as HTMLElement).getByText(/Removed from the team collection · reload to restart/)
    ).toBeTruthy()
    expect(within(example as HTMLElement).queryByRole('button', { name: /restore|undo/i })).toBeNull()
    expect(within(example as HTMLElement).getByRole('status').textContent).toContain('owner’s resource remains')
  })

  it('closes the route confirmation before showing success and hands long checks off to page progress', async () => {
    const user = userEvent.setup()
    const { container } = renderPatternDemo('dialogs')
    const routeExample = container.querySelector<HTMLElement>('[data-pattern-example-id="dialogs-modal-confirm"]')!

    await user.click(within(routeExample).getByRole('button', { name: 'Review route change' }))
    await user.click(await screen.findByRole('button', { name: 'Confirm route' }))
    expect(screen.getByRole('dialog', { name: 'Confirm the route change' })).toBeTruthy()
    await user.type(within(screen.getByRole('dialog')).getByLabelText('New route name'), 'River mapping revision')
    await user.click(screen.getByRole('button', { name: 'Confirm route' }))
    expect(screen.queryByRole('dialog', { name: 'Confirm the route change' })).toBeNull()
    expect(within(routeExample).getByRole('status').textContent).toContain(
      'Route change confirmed locally: River mapping revision'
    )

    const progressExample = container.querySelector<HTMLElement>(
      '[data-pattern-example-id="dialogs-long-task-progress"]'
    )!
    await user.click(within(progressExample).getByRole('button', { name: 'Review route check' }))
    await user.click(await screen.findByRole('button', { name: 'Start validation' }))
    expect(screen.queryByRole('dialog', { name: 'Validate route permissions?' })).toBeNull()
    expect(within(progressExample).getByText('Validating route permissions')).toBeTruthy()
    await user.click(within(progressExample).getByRole('button', { name: 'Complete validation' }))
    expect(within(progressExample).getByRole('alert').textContent).toContain('Validation finished')
  })

  it('keeps Create examples aligned with required fields and local outcomes', async () => {
    const user = userEvent.setup()
    const { container } = renderPatternDemo('community-create-flows')
    const quickExample = container.querySelector<HTMLElement>('[data-pattern-example-id="create-flows-inline"]')!

    expect(within(quickExample).getAllByLabelText('Mission name')).toHaveLength(1)
    const quickName = within(quickExample).getByLabelText('Mission name')
    await user.clear(quickName)
    expect(within(quickExample).getByRole('button', { name: 'Create mission' }).hasAttribute('disabled')).toBe(true)
    await user.type(quickName, 'River mapping')
    await user.click(within(quickExample).getByRole('button', { name: 'Create mission' }))
    expect(within(quickExample).getByRole('alert').textContent).toContain('River mapping')
    expect(within(quickExample).getByRole('alert').textContent).toContain('local sample only')

    const sidePanelExample = container.querySelector<HTMLElement>(
      '[data-pattern-example-id="create-flows-side-panel"]'
    )!
    await user.click(within(sidePanelExample).getByRole('button', { name: 'Create a mission' }))
    await user.click(within(sidePanelExample).getByRole('button', { name: 'River mapping' }))
    expect(within(sidePanelExample).getByRole('complementary', { name: 'New mission side panel' })).toBeTruthy()
    expect(within(sidePanelExample).getByText(/Create beside River mapping/)).toBeTruthy()
    await user.click(within(sidePanelExample).getByRole('button', { name: 'Create mission' }))
    expect(within(sidePanelExample).getByRole('status').textContent).toContain('no mission was saved')

    const fullPageExample = container.querySelector<HTMLElement>('[data-pattern-example-id="create-flows-full-page"]')!
    await user.click(within(fullPageExample).getByRole('button', { name: 'Preview full-page creation' }))
    const fullPage = within(fullPageExample)
    const fullPageName = fullPage.getByLabelText('Mission name')
    await user.clear(fullPageName)
    await user.type(fullPageName, 'River mapping')
    await user.click(fullPage.getByRole('button', { name: 'Next step' }))
    expect(fullPage.getByText('Step 2 of 2 · Flight area')).toBeTruthy()
    expect(
      fullPage.getByRole('list', { name: 'Mission setup steps' }).querySelector('[aria-current="step"]')?.textContent
    ).toContain('Flight area')
    expect(fullPage.getByText('Mission: River mapping · Purpose: Coastal mapping')).toBeTruthy()
    const flightArea = fullPage.getByLabelText('Flight area')
    await user.clear(flightArea)
    expect(fullPage.getByRole('button', { name: 'Create mission' }).hasAttribute('disabled')).toBe(true)
    await user.type(flightArea, 'River delta')
    await user.click(fullPage.getByRole('button', { name: 'Create mission' }))
    expect(fullPage.getByRole('status').textContent).toContain('River mapping for River delta prepared')
    expect(fullPage.getByRole('status').textContent).toContain('local example')

    const progressExample = container.querySelector<HTMLElement>(
      '[data-pattern-example-id="create-flows-completion-loading"]'
    )!
    await user.click(within(progressExample).getByRole('button', { name: 'Submit sample mission' }))
    expect(within(progressExample).getByText('50%')).toBeTruthy()
    await user.click(within(progressExample).getByRole('button', { name: 'Continue preparation' }))
    expect(within(progressExample).getByRole('alert').textContent).toContain('No mission was saved')
  })

  it('shows local recovery results in Chatbots and navigable help in In-app learning', async () => {
    const user = userEvent.setup()
    const { container } = renderPatternDemo('community-chatbots')
    const retryExample = container.querySelector<HTMLElement>('[data-pattern-example-id="chatbots-error-recovery"]')!

    await user.click(within(retryExample).getByRole('button', { name: 'Simulate connection error' }))
    expect(within(retryExample).getByRole('alert').textContent).toContain('was not sent')
    await user.click(within(retryExample).getByRole('button', { name: 'Retry message' }))
    expect(within(retryExample).getByRole('status').textContent).toContain('Message sent after reconnect')
    const firstChatExample = container.querySelector<HTMLElement>('[data-pattern-example-id="chatbots-mission-help"]')!
    expect(within(firstChatExample).queryByText(/How can I review my route/)).toBeNull()

    cleanup()
    const learningRender = renderPatternDemo('community-in-app-learning')
    const welcome = learningRender.container.querySelector<HTMLElement>(
      '[data-pattern-example-id="in-app-learning-welcome"]'
    )!
    await user.click(within(welcome).getByRole('button', { name: 'Get started' }))
    expect(within(welcome).getByText('Getting started · step 1 of 3')).toBeTruthy()
    await user.click(within(welcome).getByRole('button', { name: 'Back to welcome' }))
    await user.click(within(welcome).getByRole('button', { name: 'Dismiss intro' }))
    expect(within(welcome).getByText('Introduction dismissed')).toBeTruthy()
    await user.click(within(welcome).getByRole('button', { name: 'Show welcome' }))
    expect(within(welcome).getByText('Welcome to Mission planning')).toBeTruthy()

    const help = learningRender.container.querySelector<HTMLElement>(
      '[data-pattern-example-id="in-app-learning-global-help"]'
    )!
    await user.click(within(help).getByText('Workspace help and guidance'))
    expect(within(help).getByText('Keyboard and navigation help')).toBeTruthy()
  })

  it('labels static fluid layouts as references and keeps real overflow navigation interactive', async () => {
    const user = userEvent.setup()
    const fluid = renderPatternDemo('fluid-styles')
    const widthExample = fluid.container.querySelector<HTMLElement>(
      '[data-pattern-example-id="fluid-styles-match-width"]'
    )!
    expect(within(widthExample).getByText(/Visual reference only/)).toBeTruthy()
    expect(within(widthExample).getByRole('button', { name: 'Continue' }).hasAttribute('disabled')).toBe(true)
    const edgeForm = fluid.container.querySelector<HTMLElement>('[data-pattern-example-id="fluid-styles-edge-form"]')!
    expect(within(edgeForm).getByLabelText('Teammate email').hasAttribute('readonly')).toBe(true)
    expect(within(edgeForm).getByRole('button', { name: 'Send invitation' }).hasAttribute('disabled')).toBe(true)

    cleanup()
    const overflow = renderPatternDemo('overflow-content')
    const breadcrumb = overflow.container.querySelector<HTMLElement>(
      '[data-pattern-example-id="overflow-breadcrumbs"]'
    )!
    await user.click(within(breadcrumb).getByRole('button', { name: 'Show earlier locations' }))
    expect(await screen.findByRole('menuitem', { name: 'Organization' })).toBeTruthy()
    expect(screen.getByRole('menuitem', { name: 'Workspace' })).toBeTruthy()
  })

  it('keeps the Order summary example honest about its local preview outcome', async () => {
    const user = userEvent.setup()
    const { container } = renderPatternDemo('community-order-summary')
    const example = container.querySelector<HTMLElement>('[data-pattern-example-id="order-summary-service-review"]')!

    await user.click(within(example).getByRole('button', { name: 'Show capabilities' }))
    expect(within(example).getByText('Plan and schedule survey missions')).toBeTruthy()
    await user.click(within(example).getByRole('button', { name: 'Preview service details' }))
    expect(within(example).getByRole('alert').textContent).toContain('previewed in this sample')
    expect(within(example).getByText(/No external service page was opened or changed/)).toBeTruthy()
  })

  it('keeps long identifiers and right-to-left search examples faithful to their guidance', () => {
    const overflow = renderPatternDemo('overflow-content')
    const identifiers = overflow.container.querySelector<HTMLElement>(
      '[data-pattern-example-id="overflow-identifiers-links"]'
    )!
    expect(within(identifiers).getByText('flight-plan-4829017356-revision-a')).toBeTruthy()
    expect(within(identifiers).getByTitle('flight-plan-4829017356-revision-a')).toBeTruthy()
    const isolatedUrl = identifiers.querySelector('bdi[dir="ltr"]')
    expect(isolatedUrl?.textContent).toContain('https://skytrack.example.com/missions/north-coast-survey')

    cleanup()
    const search = renderPatternDemo('search')
    const rtlExample = search.container.querySelector<HTMLElement>(
      '[data-pattern-example-id="search-loading-and-rtl"]'
    )!
    expect(within(rtlExample).getByRole('textbox', { name: 'Search missions in right-to-left layout' })).toBeTruthy()
    expect(within(rtlExample).queryByText('Mission catalog · right-to-left example')).toBeNull()
  })

  it('gives every interactive use case a control with a visible local response', async () => {
    const user = userEvent.setup()

    for (const pattern of PATTERNS) {
      for (const demo of PATTERN_PAGE_CONTENT[pattern.id].demos.filter((item) => item.interactive)) {
        const { container, unmount } = renderPatternDemo(pattern.id)
        if (pattern.id === 'community-create-flows' && demo.id === 'create-flows-modal') {
          const inline = container.querySelector<HTMLElement>('[data-pattern-example-id="create-flows-inline"]')!
          await user.click(within(inline).getByRole('button', { name: 'Modal' }))
        }
        if (pattern.id === 'community-edit' && demo.id === 'edit-high-impact-modal') {
          await user.click(screen.getByRole('button', { name: 'High-impact · modal' }))
        }
        const example = container.querySelector<HTMLElement>(`[data-pattern-example-id="${demo.id}"]`)
        expect(example, `${demo.id} is missing from ${pattern.id}`).toBeTruthy()

        const controls = example?.querySelectorAll<HTMLElement>(
          'button:not([disabled]):not([aria-disabled="true"]), input:not([disabled]):not([readonly]), textarea:not([disabled]):not([readonly]), select:not([disabled]), [role="radio"], [role="checkbox"], [role="tab"], [role="combobox"], summary'
        )
        expect(controls?.length, `${demo.id} has no enabled control to try`).toBeGreaterThan(0)

        const signature = (node: HTMLElement) =>
          [
            node.outerHTML,
            ...Array.from(
              node.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(
                'input, textarea, select'
              )
            ).map((input) => `${input.value}:${'checked' in input ? input.checked : ''}`)
          ].join('\n')
        let showedResponse = false
        if (demo.id === 'disclosures-profile-menu') {
          await user.click(within(example!).getByRole('button', { name: 'Tuan Trinh · Account' }))
          await user.click(await screen.findByRole('menuitem', { name: 'Profile settings' }))
          expect(within(example!).getByRole('status').textContent).toContain('Profile settings opened')
          showedResponse = true
        } else if (demo.id === 'api-key-edit-existing') {
          await user.click(within(example!).getByRole('button', { name: 'Manage key' }))
          await user.click(await screen.findByRole('menuitem', { name: 'Edit permissions' }))
          expect(within(example!).getByText('Edit key settings')).toBeTruthy()
          showedResponse = true
        } else if (demo.id === 'create-flows-inline') {
          await user.click(within(example!).getByRole('button', { name: 'Create mission' }))
          expect(within(example!).getByRole('alert').textContent).toContain('local sample only')
          showedResponse = true
        } else if (demo.id === 'create-flows-modal') {
          await user.click(within(example!).getByRole('button', { name: 'Create mission' }))
          const dialog = await screen.findByRole('dialog', { name: 'New mission' })
          await user.click(within(dialog).getByRole('button', { name: 'Create mission' }))
          expect(within(example!).getByRole('alert').textContent).toContain('local sample only')
          showedResponse = true
        } else if (demo.id === 'edit-inline-local') {
          await user.click(within(example!).getByRole('button', { name: 'North coast survey' }))
          const nameInput = within(example!).getByRole('textbox', { name: 'Mission name' })
          await user.clear(nameInput)
          await user.type(nameInput, 'River mapping')
          await user.keyboard('{Enter}')
          expect(within(example!).getByRole('status').textContent).toContain('updated in this sample')
          showedResponse = true
        } else if (demo.id === 'edit-high-impact-modal') {
          await user.click(within(example!).getByRole('button', { name: 'Edit mission details' }))
          const dialog = await screen.findByRole('dialog', { name: 'Edit mission' })
          const nameInput = within(dialog).getByRole('textbox', { name: 'Mission name' })
          await user.clear(nameInput)
          await user.type(nameInput, 'River mapping')
          await user.click(within(dialog).getByRole('button', { name: 'Review change' }))
          const confirmation = await screen.findByRole('alertdialog', { name: 'Confirm this higher-impact edit' })
          await user.click(within(confirmation).getByRole('button', { name: 'Confirm edit' }))
          expect(within(example!).getByRole('alert').textContent).toContain('saved in this sample after confirmation')
          showedResponse = true
        } else if (demo.id === 'import-single-file-modal') {
          await user.click(within(example!).getByRole('button', { name: 'Import one mission file' }))
          const dialog = await screen.findByRole('dialog', { name: 'Import mission file' })
          await user.click(within(dialog).getByRole('button', { name: 'URL' }))
          await user.type(within(dialog).getByRole('textbox', { name: 'Source URL' }), 'https://example.com/data.json')
          await user.click(within(dialog).getByRole('button', { name: 'Add URL' }))
          await user.click(within(dialog).getByRole('button', { name: 'Import file' }))
          expect(within(example!).getByRole('status').textContent).toContain('No data was fetched')
          showedResponse = true
        } else if (demo.id === 'overflow-breadcrumbs') {
          await user.click(within(example!).getByRole('button', { name: 'Show earlier locations' }))
          expect(await screen.findByRole('menuitem', { name: 'Organization' })).toBeTruthy()
          showedResponse = true
        } else if (demo.id === 'notifications-toast-brief') {
          await user.click(within(example!).getByRole('button', { name: 'Show success toast' }))
          const savedMessages = await screen.findAllByText('Sample changes saved.')
          expect(savedMessages.some((message) => message.getAttribute('data-slot') === 'toast-description')).toBe(true)
          showedResponse = true
        } else {
          for (const control of Array.from(controls ?? [])) {
            const before = signature(example!)
            if (control instanceof HTMLInputElement || control instanceof HTMLTextAreaElement) {
              await user.type(control, 'x')
            } else {
              await user.click(control)
            }
            if (signature(example!) !== before) {
              showedResponse = true
              break
            }
          }
        }
        expect(showedResponse, `${demo.id} did not show a response to any available control`).toBe(true)
        unmount()
      }
    }
  })

  it('keeps every visual reference free of enabled actions or editable fields', () => {
    for (const pattern of PATTERNS) {
      const { container, unmount } = renderPatternDemo(pattern.id)
      for (const demo of PATTERN_PAGE_CONTENT[pattern.id].demos.filter((item) => !item.interactive)) {
        const example = container.querySelector<HTMLElement>(`[data-pattern-example-id="${demo.id}"]`)
        expect(example, `${demo.id} is missing from ${pattern.id}`).toBeTruthy()
        const liveControls = example!.querySelectorAll(
          'button:not([disabled]):not([aria-disabled="true"]), input:not([aria-hidden="true"]):not([disabled]):not([readonly]), input[type="date"]:not([disabled]), textarea:not([disabled]):not([readonly]), select:not([disabled]), [role="radio"]:not([aria-disabled="true"]):not([aria-readonly="true"]), [role="checkbox"]:not([aria-disabled="true"]):not([aria-readonly="true"]), [role="combobox"]:not([aria-disabled="true"]), a[href]'
        )
        expect(
          liveControls.length,
          `${demo.id} is marked static but has operable controls: ${Array.from(liveControls)
            .map((control) => control.outerHTML)
            .join(' | ')}`
        ).toBe(0)
      }
      unmount()
    }
  })
})
