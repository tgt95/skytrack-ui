import { useState } from 'react'
import { Plus, X } from '@phosphor-icons/react'
import { focusRing } from '@/components/ui/button'
import { Tabs, TabsList, TabsTab, TabsIndicator, TabsPanel } from '@/components/ui/tabs'
import type { DemoMeta } from '@/showcase/demo'

const TABS = [
  { value: 'overview', label: 'Overview', content: 'Workspace stats and activity.' },
  { value: 'projects', label: 'Projects', content: 'Milestones and deadlines.' },
  { value: 'account', label: 'Account', content: 'Profile and preferences.' }
]

/**
 * Browser-style card tabs. The nested close button matches browser-tab UX
 * practice; arrow-key tab navigation is unaffected and each X stays
 * Tab-reachable with an accessible name.
 */
function ClosableTabsExample() {
  const [tabs, setTabs] = useState(['Tab 1', 'Tab 2', 'Tab 3'])
  const [value, setValue] = useState('Tab 1')

  function addTab() {
    const next = `Tab ${tabs.reduce((max, tab) => Math.max(max, Number.parseInt(tab.slice(4), 10) || 0), 0) + 1}`
    setTabs([...tabs, next])
    setValue(next)
  }

  function closeTab(tab: string) {
    const index = tabs.indexOf(tab)
    const remaining = tabs.filter((t) => t !== tab)
    setTabs(remaining)
    if (value === tab) {
      setValue(remaining[Math.min(index, remaining.length - 1)] ?? '')
    }
  }

  return (
    <Tabs value={value} onValueChange={(next) => setValue(String(next))} className='w-full max-w-md'>
      <TabsList className='w-full rounded-none border-0 border-b border-border bg-transparent p-0'>
        {tabs.map((tab) => (
          <TabsTab
            key={tab}
            value={tab}
            className='rounded-b-none rounded-t-md border border-b-0 border-transparent -mb-px data-[active]:border-border data-[active]:bg-background'
          >
            {tab}
            <button
              type='button'
              aria-label={`Close ${tab}`}
              onClick={(event) => {
                event.stopPropagation()
                closeTab(tab)
              }}
              className={`-mr-1 rounded-xs p-0.5 text-muted-foreground hover:text-foreground ${focusRing}`}
            >
              <X className='size-3.5' />
            </button>
          </TabsTab>
        ))}
        <button
          type='button'
          aria-label='Add tab'
          onClick={addTab}
          className={`relative z-10 ml-1 mr-1 rounded-xs p-0.5 text-muted-foreground hover:text-foreground ${focusRing}`}
        >
          <Plus className='size-4' />
        </button>
        <TabsIndicator />
      </TabsList>
      {tabs.map((tab) => (
        <TabsPanel key={tab} value={tab}>
          <p className='m-0'>{tab} content.</p>
        </TabsPanel>
      ))}
    </Tabs>
  )
}

export const demo: DemoMeta = {
  id: 'tabs',
  title: 'Tabs',
  description: 'A component for toggling between related panels on the same page.',
  group: 'Layout',
  variants: [
    {
      name: 'Demo',
      render: () => (
        <Tabs defaultValue='overview' className='max-w-xs'>
          <TabsList>
            {TABS.map((tab) => (
              <TabsTab key={tab.value} value={tab.value}>
                {tab.label}
              </TabsTab>
            ))}
            <TabsIndicator />
          </TabsList>
          {TABS.map((tab) => (
            <TabsPanel key={tab.value} value={tab.value}>
              <p className='m-0'>{tab.content}</p>
            </TabsPanel>
          ))}
        </Tabs>
      )
    },
    {
      name: 'Animated panels',
      render: () => (
        <Tabs defaultValue='overview' className='max-w-xs'>
          <TabsList>
            {TABS.map((tab) => (
              <TabsTab key={tab.value} value={tab.value}>
                {tab.label}
              </TabsTab>
            ))}
            <TabsIndicator />
          </TabsList>
          {TABS.map((tab) => (
            <TabsPanel key={tab.value} value={tab.value}>
              <p className='m-0'>{tab.content}</p>
            </TabsPanel>
          ))}
        </Tabs>
      )
    },
    {
      name: 'Links',
      render: () => (
        <Tabs defaultValue='overview' className='max-w-xs'>
          <TabsList>
            {TABS.map((tab) => (
              <TabsTab key={tab.value} value={tab.value} nativeButton={false} render={<a href={`#${tab.value}`} />}>
                {tab.label}
              </TabsTab>
            ))}
            <TabsIndicator />
          </TabsList>
          {TABS.map((tab) => (
            <TabsPanel key={tab.value} value={tab.value}>
              <p className='m-0'>{tab.content}</p>
            </TabsPanel>
          ))}
        </Tabs>
      )
    },
    {
      name: 'Disabled tab',
      render: () => (
        <Tabs defaultValue='overview' className='max-w-xs'>
          <TabsList>
            <TabsTab value='overview'>Overview</TabsTab>
            <TabsTab value='projects' disabled>
              Projects
            </TabsTab>
            <TabsTab value='account'>Account</TabsTab>
            <TabsIndicator />
          </TabsList>
          <TabsPanel value='overview'>
            <p className='m-0'>Workspace stats and activity.</p>
          </TabsPanel>
          <TabsPanel value='projects'>
            <p className='m-0'>Milestones and deadlines.</p>
          </TabsPanel>
          <TabsPanel value='account'>
            <p className='m-0'>Profile and preferences.</p>
          </TabsPanel>
        </Tabs>
      )
    },
    {
      name: 'Vertical',
      render: () => (
        <Tabs orientation='vertical' defaultValue='overview' className='max-w-xs flex-row gap-4'>
          <TabsList className='flex-col'>
            {TABS.map((tab) => (
              <TabsTab key={tab.value} value={tab.value}>
                {tab.label}
              </TabsTab>
            ))}
            <TabsIndicator variant='underline' />
          </TabsList>
          {TABS.map((tab) => (
            <TabsPanel key={tab.value} value={tab.value}>
              <p className='m-0'>{tab.content}</p>
            </TabsPanel>
          ))}
        </Tabs>
      )
    },
    {
      name: 'Variants',
      render: () => (
        <div className='flex flex-wrap items-start gap-6'>
          <Tabs defaultValue='overview' className='max-w-xs'>
            <TabsList variant='standard'>
              {TABS.map((tab) => (
                <TabsTab key={tab.value} value={tab.value} variant='standard'>
                  {tab.label}
                </TabsTab>
              ))}
              <TabsIndicator variant='underline' />
            </TabsList>
            {TABS.map((tab) => (
              <TabsPanel key={tab.value} value={tab.value}>
                <p className='m-0'>{tab.content}</p>
              </TabsPanel>
            ))}
          </Tabs>
          <Tabs defaultValue='overview' className='max-w-xs'>
            <TabsList>
              {TABS.map((tab) => (
                <TabsTab key={tab.value} value={tab.value}>
                  {tab.label}
                </TabsTab>
              ))}
              <TabsIndicator />
            </TabsList>
            {TABS.map((tab) => (
              <TabsPanel key={tab.value} value={tab.value}>
                <p className='m-0'>{tab.content}</p>
              </TabsPanel>
            ))}
          </Tabs>
          <Tabs defaultValue='overview' className='max-w-xs'>
            <TabsList variant='outlined'>
              {TABS.map((tab) => (
                <TabsTab key={tab.value} value={tab.value} variant='outlined'>
                  {tab.label}
                </TabsTab>
              ))}
              <TabsIndicator />
            </TabsList>
            {TABS.map((tab) => (
              <TabsPanel key={tab.value} value={tab.value}>
                <p className='m-0'>{tab.content}</p>
              </TabsPanel>
            ))}
          </Tabs>
        </div>
      )
    },
    {
      name: 'Closable tabs',
      render: () => <ClosableTabsExample />
    }
  ]
}
