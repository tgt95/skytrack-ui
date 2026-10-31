import { useState } from 'react'
import { CaretDownIcon, FunnelSimpleIcon, MagnifyingGlassIcon, WarningIcon } from '@phosphor-icons/react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CheckboxRoot } from '@/components/ui/checkbox'
import { InlineEdit, InlineEditInput, InlineEditTrigger } from '@/components/ui/inline-edit'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsPanel, TabsTab } from '@/components/ui/tabs'
import type { DemoMeta } from '@/showcase/demo'

function StatusBadge({ status, label }: { status: 'success' | 'warning'; label: string }) {
  const tone = status === 'success'
    ? { pill: 'bg-success/10 text-success', dot: 'bg-success' }
    : { pill: 'bg-warning/10 text-warning', dot: 'bg-warning' }

  return (
    <Badge
      status={status}
      size='sm'
      count={<span className='inline-flex items-center gap-1.5 normal-case tracking-normal'><span className={`size-1.5 shrink-0 rounded-full ${tone.dot}`} aria-hidden='true' />{label}</span>}
      className={`h-5 min-w-0 rounded-full px-2 normal-case tracking-normal ${tone.pill}`}
    />
  )
}

const RECORDS = [
  { id: 'MBX-891', firstName: 'Luna', lastName: 'Smith', phone: '+372 555 2109', createdAt: 'Sep 15, 2024' },
  { id: 'MBX-904', firstName: 'Jovani', lastName: 'Martins', phone: '+372 555 3210', createdAt: 'Jul 18, 2024' },
  { id: 'MBX-906', firstName: 'Bryana', lastName: 'Schneider', phone: '+372 555 6543', createdAt: 'Mar 17, 2024' },
  { id: 'MBX-909', firstName: 'Bryana', lastName: '', phone: '+372 555 6789', createdAt: 'May 1, 2024' },
  { id: 'MBX-892', firstName: 'Kiana', lastName: 'Olafsson', phone: '+372 555 1234', createdAt: 'Dec 1, 2024' },
  { id: 'MBX-893', firstName: 'Zackary', lastName: 'Dubois', phone: '+372 555 5678', createdAt: 'Jan 14, 2024' },
  { id: 'MBX-894', firstName: 'Jayson', lastName: 'Sinclair', phone: '+372 555 9012', createdAt: 'Jul 2, 2024' },
  { id: 'MBX-895', firstName: 'Doug', lastName: 'Dubois', phone: '+372 555 3456', createdAt: 'Aug 16, 2024' }
]

function CustomerRecordsTable() {
  const [editedLastName, setEditedLastName] = useState('')

  return (
    <Tabs defaultValue='data' className='w-full min-w-0'>
      <div className='mb-3 flex flex-wrap items-center justify-between gap-3'>
        <TabsList variant='filled' size='sm' className='w-fit'>
          <TabsTab value='data'>Data (232)</TabsTab>
          <TabsTab value='schema'>Schema</TabsTab>
          <TabsTab value='relationships'>Relationships (3)</TabsTab>
          <TabsTab value='api'>API</TabsTab>
        </TabsList>
        <div className='flex min-w-0 flex-wrap items-center gap-2'>
          <Input
            aria-label='Search records'
            placeholder='Search records'
            startAdornment={<MagnifyingGlassIcon aria-hidden='true' />}
            className='w-full sm:w-56'
          />
          <Button variant='outline' size='sm'>
            <FunnelSimpleIcon aria-hidden='true' /> Filter
          </Button>
        </div>
      </div>

      <TabsPanel value='data' className='p-0'>
        <div className='mb-3 flex flex-wrap gap-2'>
          <Button variant='outline' size='xs'>
            × &nbsp; createdAt &nbsp; <span className='text-primary'>Last 2 days</span> <CaretDownIcon aria-hidden='true' />
          </Button>
          <Button variant='outline' size='xs'>
            × &nbsp; tier &nbsp; <Badge status='warning' count='Gold' /> <CaretDownIcon aria-hidden='true' />
          </Button>
        </div>

        <div className='w-full overflow-x-auto border border-border'>
          <table className='w-full min-w-[850px] border-collapse text-left text-sm'>
            <thead className='bg-muted text-xs text-muted-foreground'>
              <tr>
                <th className='w-10 border-b border-border px-2 py-2' scope='col'>
                  <CheckboxRoot aria-label='Select all customer records' />
                </th>
                <th className='w-10 border-b border-border px-2 py-2 text-center text-xs font-normal' scope='col'>#</th>
                <th className='border-b border-border px-2 py-2 text-xs font-normal' scope='col'>ID</th>
                <th className='border-b border-border px-2 py-2 text-xs font-normal' scope='col'>Status</th>
                <th className='border-b border-border px-2 py-2 text-xs font-normal' scope='col'>First name</th>
                <th className='border-b border-border px-2 py-2 text-xs font-normal' scope='col'>Last name</th>
                <th className='border-b border-border px-2 py-2 text-xs font-normal' scope='col'>Phone</th>
                <th className='border-b border-border px-2 py-2 text-xs font-normal' scope='col'>Created at</th>
                <th className='border-b border-border px-2 py-2 text-xs font-normal' scope='col'>Tier</th>
              </tr>
            </thead>
            <tbody>
              {RECORDS.map((record, index) => (
                <tr key={record.id} className='border-b border-border last:border-0 hover:bg-muted/40'>
                  <td className='px-2 py-1.5'><CheckboxRoot aria-label={`Select ${record.id}`} /></td>
                  <td className='px-2 py-1.5 text-center text-muted-foreground tabular-nums'>
                    {record.lastName ? String(index + 1).padStart(2, '0') : <WarningIcon className='mx-auto size-4 text-destructive' aria-label='Missing last name' />}
                  </td>
                  <th className='px-2 py-1.5 font-medium' scope='row'>{record.id}</th>
                  <td className='px-2 py-1.5'><StatusBadge status='success' label='Active' /></td>
                  <td className='px-2 py-1.5'>{record.firstName}</td>
                  <td className={`px-2 py-1.5 ${record.lastName ? '' : 'border border-destructive'}`}>
                    {record.lastName || (
                      <InlineEdit
                        value={editedLastName}
                        onValueChange={(next) => setEditedLastName(String(next))}
                        label={`Last name for ${record.id}`}
                      >
                        <InlineEditTrigger className='min-h-6 w-full text-left' />
                        <InlineEditInput aria-label={`Edit last name for ${record.id}`} className='w-full' />
                      </InlineEdit>
                    )}
                  </td>
                  <td className='whitespace-nowrap px-2 py-1.5'>{record.phone}</td>
                  <td className='whitespace-nowrap px-2 py-1.5'>{record.createdAt}</td>
                  <td className='px-2 py-1.5'><StatusBadge status='warning' label='Gold' /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className='mt-3 flex flex-wrap items-center justify-between gap-3'>
          <span className='text-xs text-muted-foreground'>Showing 1–20 of 232 records</span>
          <nav className='flex items-center gap-1' aria-label='Customer record pages'>
            <Button variant='outline' size='icon-sm' aria-label='Previous page' disabled>‹</Button>
            {[1, 2, 3, 4].map((page) => (
              <Button key={page} variant={page === 1 ? 'outline' : 'ghost'} size='sm' aria-current={page === 1 ? 'page' : undefined}>{page}</Button>
            ))}
            <span className='px-1 text-muted-foreground'>…</span>
            <Button variant='ghost' size='sm'>10</Button>
            <Button variant='outline' size='icon-sm' aria-label='Next page'>›</Button>
          </nav>
        </div>
      </TabsPanel>

      {(['schema', 'relationships', 'api'] as const).map((tab) => (
        <TabsPanel key={tab} value={tab} className='border border-border p-4 text-sm text-muted-foreground'>
          {tab === 'schema' ? 'Customer field definitions.' : tab === 'relationships' ? 'Three related data models.' : 'Customer records API.'}
        </TabsPanel>
      ))}
    </Tabs>
  )
}

export const demo: DemoMeta = {
  id: 'table-pattern',
  title: 'Datatable',
  description:
    'A Datatable pattern sample using native HTML table markup, SkyTrack UI controls, and inline Tailwind utilities. This is a composition example, not an exported component.',
  group: 'Patterns',
  variants: [
    {
      name: 'Customer records',
      render: () => <CustomerRecordsTable />
    }
  ]
}
