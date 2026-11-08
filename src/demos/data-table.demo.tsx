import * as React from 'react'
import { useEffect, useId, useRef } from 'react'
import { DataTable, type DataTableColumnDef } from '@/components/ui/data-table'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CheckboxRoot } from '@/components/ui/checkbox'
import { FieldLabel, FieldRoot } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Search } from '@/components/ui/search'
import { Toggle } from '@/components/ui/toggle'
import { ToggleGroup } from '@/components/ui/toggle-group'
import { CaretDownIcon, DotsThreeIcon, MagnifyingGlassIcon, XIcon } from '@phosphor-icons/react'
import { Menu, MenuItem, MenuPopup, MenuPortal, MenuPositioner, MenuSeparator, MenuTrigger } from '@/components/ui/menu'
import {
  Popover,
  PopoverPopup,
  PopoverPortal,
  PopoverPositioner,
  PopoverTitle,
  PopoverTrigger
} from '@/components/ui/popover'
import type { DemoMeta } from '@/showcase/demo'
import type { DataTableRenderProps } from '@/components/ui/data-table'

type Customer = {
  id: string
  name: string
  email: string
  status: 'Active' | 'Invited'
  plan: 'Pro' | 'Starter'
  price: number
}

function SampleDataDisclosure({
  children,
  label = 'Sample customer records; no live data changes.'
}: {
  children: React.ReactNode
  label?: string
}) {
  return (
    <div className='w-full space-y-2'>
      <p className='text-xs text-muted-foreground'>{label}</p>
      {children}
    </div>
  )
}

const customers: Customer[] = [
  { id: 'C-1042', name: 'Luna Smith', email: 'luna@example.com', status: 'Active', plan: 'Pro', price: 1299 },
  {
    id: 'C-1043',
    name: 'Jovani Martins',
    email: 'jovani@example.com',
    status: 'Active',
    plan: 'Starter',
    price: 899.5
  },
  { id: 'C-1044', name: 'Bryana Schneider', email: 'bryana@example.com', status: 'Invited', plan: 'Pro', price: 149 },
  { id: 'C-1045', name: 'Kiana Olafsson', email: 'kiana@example.com', status: 'Active', plan: 'Pro', price: 1299 },
  {
    id: 'C-1046',
    name: 'Zackary Dubois',
    email: 'zackary@example.com',
    status: 'Active',
    plan: 'Starter',
    price: 899.5
  },
  {
    id: 'C-1047',
    name: 'Jayson Sinclair',
    email: 'jayson@example.com',
    status: 'Invited',
    plan: 'Starter',
    price: 149
  },
  { id: 'C-1048', name: 'Doug Dubois', email: 'doug@example.com', status: 'Active', plan: 'Pro', price: 1299 },
  { id: 'C-1049', name: 'Maya Chen', email: 'maya@example.com', status: 'Active', plan: 'Starter', price: 899.5 },
  {
    id: 'C-1050',
    name: 'Elliot Turner',
    email: 'elliot@example.com',
    status: 'Invited',
    plan: 'Pro',
    price: 1299
  },
  {
    id: 'C-1051',
    name: 'Amara Okafor',
    email: 'amara@example.com',
    status: 'Active',
    plan: 'Pro',
    price: 1299
  },
  {
    id: 'C-1052',
    name: 'Noah Williams',
    email: 'noah@example.com',
    status: 'Active',
    plan: 'Starter',
    price: 899.5
  },
  {
    id: 'C-1053',
    name: 'Sofia Patel',
    email: 'sofia@example.com',
    status: 'Invited',
    plan: 'Starter',
    price: 149
  },
  {
    id: 'C-1054',
    name: 'Luca Moretti',
    email: 'luca@example.com',
    status: 'Active',
    plan: 'Pro',
    price: 1299
  },
  {
    id: 'C-1055',
    name: 'Avery Brooks',
    email: 'avery@example.com',
    status: 'Active',
    plan: 'Starter',
    price: 899.5
  },
  {
    id: 'C-1056',
    name: 'Hana Suzuki',
    email: 'hana@example.com',
    status: 'Invited',
    plan: 'Pro',
    price: 149
  },
  {
    id: 'C-1057',
    name: 'Mateo Alvarez',
    email: 'mateo@example.com',
    status: 'Active',
    plan: 'Pro',
    price: 1299
  },
  {
    id: 'C-1058',
    name: 'Iris Johnson',
    email: 'iris@example.com',
    status: 'Active',
    plan: 'Starter',
    price: 899.5
  },
  {
    id: 'C-1059',
    name: 'Theo Laurent',
    email: 'theo@example.com',
    status: 'Invited',
    plan: 'Pro',
    price: 149
  },
  {
    id: 'C-1060',
    name: 'Zara Khan',
    email: 'zara@example.com',
    status: 'Active',
    plan: 'Pro',
    price: 1299
  },
  {
    id: 'C-1061',
    name: 'Kai Thompson',
    email: 'kai@example.com',
    status: 'Active',
    plan: 'Starter',
    price: 899.5
  },
  {
    id: 'C-1062',
    name: 'Nina Fischer',
    email: 'nina@example.com',
    status: 'Invited',
    plan: 'Starter',
    price: 149
  },
  {
    id: 'C-1063',
    name: 'Omar Hassan',
    email: 'omar@example.com',
    status: 'Active',
    plan: 'Pro',
    price: 1299
  },
  {
    id: 'C-1064',
    name: 'Grace Kim',
    email: 'grace@example.com',
    status: 'Active',
    plan: 'Starter',
    price: 899.5
  },
  {
    id: 'C-1065',
    name: 'Rafael Costa',
    email: 'rafael@example.com',
    status: 'Invited',
    plan: 'Pro',
    price: 149
  }
]

const currencyFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

const customerAvatarById: Record<string, string> = {
  'C-1042': '/images/avatars/Female/1.jpg',
  'C-1043': '/images/avatars/Male/1.jpg',
  'C-1045': '/images/avatars/Female/2.jpg',
  'C-1046': '/images/avatars/Male/2.jpg',
  'C-1048': '/images/avatars/Male/3.jpg',
  'C-1049': '/images/avatars/Female/3.jpg'
}

const customerDetailsById: Record<string, { workspace: string; region: string; lastActivity: string }> = {
  'C-1042': { workspace: 'Northstar Mapping', region: 'Austin, TX', lastActivity: 'Active 5 minutes ago' },
  'C-1043': { workspace: 'Meridian Survey', region: 'Seattle, WA', lastActivity: 'Active today at 9:42 AM' },
  'C-1044': { workspace: 'Gridline Aerial', region: 'Toronto, CA', lastActivity: 'Invitation sent 2 days ago' },
  'C-1045': { workspace: 'Horizon Geospatial', region: 'Oslo, NO', lastActivity: 'Active yesterday at 4:15 PM' },
  'C-1046': { workspace: 'Waypoint Labs', region: 'Denver, CO', lastActivity: 'Active 32 minutes ago' },
  'C-1047': { workspace: 'Atlas Flight Ops', region: 'Vancouver, CA', lastActivity: 'Invitation sent 1 day ago' },
  'C-1048': { workspace: 'Contour Analytics', region: 'Bristol, UK', lastActivity: 'Active 1 hour ago' }
}

function getInitials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

const columns: DataTableColumnDef<Customer>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => <span className='font-medium'>{row.original.id}</span>
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => (
      <div className='flex items-center gap-2'>
        <Avatar size='sm' aria-hidden='true'>
          {customerAvatarById[row.original.id] && <AvatarImage src={customerAvatarById[row.original.id]} alt='' />}
          <AvatarFallback>{getInitials(row.original.name)}</AvatarFallback>
        </Avatar>
        <span>{row.original.name}</span>
      </div>
    )
  },
  { accessorKey: 'email', header: 'Email' },
  {
    accessorKey: 'status',
    header: 'Status',
    filterFn: 'includesString',
    cell: ({ row }) => (
      <Badge
        count={row.original.status}
        status={row.original.status === 'Active' ? 'success' : 'secondary'}
        size='sm'
        className='rounded-(--radius)'
      />
    )
  },
  { accessorKey: 'plan', header: 'Plan' },
  {
    accessorKey: 'price',
    header: 'Price',
    meta: { align: 'right' },
    cell: ({ row }) => currencyFormatter.format(row.original.price)
  },
  {
    id: 'actions',
    header: 'Actions',
    enableSorting: false,
    enableHiding: false,
    meta: { align: 'center' },
    cell: ({ row }) => (
      <Menu>
        <MenuTrigger
          render={
            <Button type='button' variant='ghost' size='icon-xs' aria-label={`Actions for ${row.original.name}`} />
          }
        >
          <DotsThreeIcon aria-hidden='true' />
        </MenuTrigger>
        <MenuPortal>
          <MenuPositioner side='bottom' align='end' sideOffset={4}>
            <MenuPopup>
              <MenuItem>View customer</MenuItem>
              <MenuItem>Edit customer</MenuItem>
              <MenuSeparator />
              <MenuItem variant='destructive'>Delete customer</MenuItem>
            </MenuPopup>
          </MenuPositioner>
        </MenuPortal>
      </Menu>
    )
  }
]

function CustomerTable() {
  return (
    <DataTable
      data={customers}
      columns={columns}
      getRowId={(customer) => customer.id}
      enableRowSelection
      pageSize={12}
      searchPlaceholder='Search customers'
      tableContainerClassName='max-h-80 overflow-y-auto overscroll-contain'
    />
  )
}

function CustomerDetails({ customer }: { customer: Customer }) {
  const details = customerDetailsById[customer.id]

  return (
    <dl className='grid gap-3 text-sm sm:grid-cols-3'>
      <div className='min-w-0'>
        <dt className='text-xs text-muted-foreground'>Workspace</dt>
        <dd className='truncate'>{details.workspace}</dd>
      </div>
      <div>
        <dt className='text-xs text-muted-foreground'>Region</dt>
        <dd>{details.region}</dd>
      </div>
      <div>
        <dt className='text-xs text-muted-foreground'>Last activity</dt>
        <dd>{details.lastActivity}</dd>
      </div>
    </dl>
  )
}

const referenceCustomers = customers.slice(0, 7)

function DefaultCustomerTable() {
  return <DataTable data={referenceCustomers} columns={columns} getRowId={(customer) => customer.id} pageSize={7} />
}

function SelectableCustomerTable() {
  return (
    <DataTable
      data={referenceCustomers}
      columns={columns}
      getRowId={(customer) => customer.id}
      enableRowSelection
      pageSize={7}
    />
  )
}

function RowDetailsCustomerTable() {
  return (
    <DataTable
      data={referenceCustomers}
      columns={columns}
      getRowId={(customer) => customer.id}
      enableRowSelection
      getRowCanExpand={(customer) => customer.status === 'Active'}
      renderExpandedRow={({ row }) => <CustomerDetails customer={row.original} />}
      pageSize={7}
    />
  )
}

function CustomControlsCustomerTable() {
  return (
    <DataTable
      data={referenceCustomers}
      columns={columns}
      getRowId={(customer) => customer.id}
      pageSize={7}
      renderSearch={({ table }) => {
        const query = String(table.state.globalFilter ?? '')
        const statusColumn = table.getColumn('status')
        const activeOnly = statusColumn?.getFilterValue() === 'Active'

        return (
          <div className='flex w-full flex-wrap items-center gap-2 sm:w-auto'>
            <Search
              aria-label='Search customers'
              placeholder='Search customers'
              value={query}
              onValueChange={(nextQuery) => table.setGlobalFilter(nextQuery)}
              className='w-full sm:max-w-64'
            />
            <Button
              type='button'
              variant={activeOnly ? 'default' : 'outline'}
              onClick={() => statusColumn?.setFilterValue(activeOnly ? undefined : 'Active')}
            >
              Active only
            </Button>
          </div>
        )
      }}
      renderColumnVisibility={({ table }) => {
        const emailColumn = table.getColumn('email')

        return (
          <Button
            type='button'
            variant='outline'
            disabled={!emailColumn}
            onClick={() => emailColumn?.toggleVisibility()}
          >
            {emailColumn?.getIsVisible() ? 'Hide email' : 'Show email'}
          </Button>
        )
      }}
    />
  )
}

function SingleSelectCustomerTable() {
  return (
    <DataTable
      data={referenceCustomers}
      columns={columns}
      getRowId={(customer) => customer.id}
      enableRowSelection
      selectionMode='single'
      pageSize={7}
    />
  )
}

function BatchActionsCustomerTable() {
  const [rows, setRows] = React.useState(referenceCustomers)
  const [archivedCount, setArchivedCount] = React.useState(0)

  return (
    <div className='w-full space-y-3'>
      <DataTable
        data={rows}
        columns={columns}
        getRowId={(customer) => customer.id}
        enableRowSelection
        pageSize={7}
        renderSearch={({ table }) => {
          const selectedRows = table.getSelectedRowModel().rows.map((row) => row.original)
          const query = String(table.state.globalFilter ?? '')

          return (
            <div className='flex w-full flex-wrap items-center gap-2'>
              <Search
                aria-label='Search customers for batch actions'
                value={query}
                onValueChange={(nextQuery) => table.setGlobalFilter(nextQuery)}
                placeholder='Search customers'
                className='sm:max-w-64'
              />
              {selectedRows.length > 0 && (
                <div role='toolbar' aria-label='Selected sample customer actions' className='flex items-center gap-2'>
                  <span className='text-sm text-muted-foreground'>{selectedRows.length} selected</span>
                  <Button
                    type='button'
                    size='sm'
                    onClick={() => {
                      const selectedIds = new Set(selectedRows.map((row) => row.id))
                      setRows((currentRows) => currentRows.filter((row) => !selectedIds.has(row.id)))
                      setArchivedCount((count) => count + selectedRows.length)
                      table.resetRowSelection()
                    }}
                  >
                    Archive sample rows
                  </Button>
                  <Button type='button' size='sm' variant='outline' onClick={() => table.resetRowSelection()}>
                    Clear selection
                  </Button>
                </div>
              )}
            </div>
          )
        }}
      />
      <p aria-live='polite' className='text-xs text-muted-foreground'>
        Sample data only; no live records change.{' '}
        {archivedCount > 0 && `${archivedCount} sample ${archivedCount === 1 ? 'row' : 'rows'} archived in this demo.`}
      </p>
    </div>
  )
}

function CollapsedSearchCustomerTable() {
  const [open, setOpen] = React.useState(false)

  return (
    <DataTable
      data={referenceCustomers}
      columns={columns}
      getRowId={(customer) => customer.id}
      pageSize={7}
      renderSearch={({ table }) => {
        const query = String(table.state.globalFilter ?? '')
        if (!open) {
          return (
            <Button
              type='button'
              variant='ghost'
              size='icon'
              aria-label='Open table search'
              onClick={() => setOpen(true)}
            >
              <MagnifyingGlassIcon aria-hidden='true' />
            </Button>
          )
        }

        return (
          <div className='flex w-full items-center gap-2 sm:w-auto'>
            <Search
              aria-label='Search customer table'
              value={query}
              onValueChange={(nextQuery) => table.setGlobalFilter(nextQuery)}
              placeholder='Search customers'
              className='sm:max-w-64'
            />
            <Button
              type='button'
              variant='ghost'
              size='icon-sm'
              aria-label='Close table search'
              onClick={() => {
                table.setGlobalFilter('')
                setOpen(false)
              }}
            >
              <XIcon aria-hidden='true' />
            </Button>
          </div>
        )
      }}
    />
  )
}

function DensityAndStripeCustomerTable() {
  const [size, setSize] = React.useState<'xs' | 'sm' | 'md' | 'lg' | 'xl'>('md')
  const sizes = [
    { value: 'xs', label: 'XS' },
    { value: 'sm', label: 'S' },
    { value: 'md', label: 'M' },
    { value: 'lg', label: 'L' },
    { value: 'xl', label: 'XL' }
  ] as const

  return (
    <div className='w-full space-y-3'>
      <div className='flex flex-wrap items-center justify-between gap-3'>
        <p className='text-sm text-muted-foreground'>Row density: {size.toUpperCase()}</p>
        <ToggleGroup
          aria-label='Table row density'
          variant='outline'
          size='xs'
          value={[size]}
          onValueChange={(values) => {
            if (values[0] && sizes.some((option) => option.value === values[0])) {
              setSize(values[0] as typeof size)
            }
          }}
        >
          {sizes.map((option) => (
            <Toggle key={option.value} value={option.value}>
              {option.label}
            </Toggle>
          ))}
        </ToggleGroup>
      </div>
      <DataTable
        data={referenceCustomers.slice(0, 4)}
        columns={columns}
        getRowId={(customer) => customer.id}
        pageSize={4}
        size={size}
        striped
      />
    </div>
  )
}

function LoadingAndEmptyCustomerTables() {
  return (
    <div className='flex w-full flex-col gap-6'>
      <section className='w-full space-y-2' aria-labelledby='loading-customer-table-heading'>
        <h3 id='loading-customer-table-heading' className='text-lg font-medium text-(--foreground)'>
          Loading records
        </h3>
        <DataTable data={[]} columns={columns} loading pageSize={5} />
      </section>
      <section className='w-full space-y-2' aria-labelledby='empty-customer-table-heading'>
        <h3 id='empty-customer-table-heading' className='text-lg font-medium text-(--foreground)'>
          No matching records
        </h3>
        <DataTable data={[]} columns={columns} emptyMessage='No sample customers match the current filters.' />
      </section>
    </div>
  )
}

type CandidateStatus = 'Follow-Up' | 'Hired' | 'Feedback' | 'Rejected'

type Candidate = {
  id: string
  name: string
  role: string
  location: string
  status: CandidateStatus
}

const candidates: Candidate[] = [
  { id: 'A-1001', name: 'Alice Green', role: 'UX Designer', location: 'Ho Chi Minh', status: 'Follow-Up' },
  { id: 'A-1002', name: 'Michael Red', role: 'Product Designer', location: 'Hanoi', status: 'Feedback' },
  { id: 'A-1003', name: 'David Orange', role: 'Interaction Designer', location: 'Hue', status: 'Follow-Up' },
  { id: 'A-1004', name: 'Emily Purple', role: 'Visual Designer', location: 'Can Tho', status: 'Hired' },
  { id: 'A-1005', name: 'Chris Teal', role: 'Web Designer', location: 'Hai Phong', status: 'Hired' },
  { id: 'A-1006', name: 'Sophia Pink', role: 'Graphic Designer', location: 'Phu Quoc', status: 'Follow-Up' },
  { id: 'A-1007', name: 'John Wick', role: 'UI Designer', location: 'Nha Trang', status: 'Hired' }
]

const candidateStatusStyles: Record<CandidateStatus, 'processing' | 'success' | 'warning' | 'error'> = {
  'Follow-Up': 'processing',
  Hired: 'success',
  Feedback: 'warning',
  Rejected: 'error'
}

const candidateColumns: DataTableColumnDef<Candidate>[] = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'role', header: 'Role', filterFn: filterBySelectedValues },
  { accessorKey: 'location', header: 'Location', filterFn: filterBySelectedValues },
  {
    accessorKey: 'status',
    header: 'Status',
    filterFn: filterBySelectedValues,
    cell: ({ row }) => (
      <Badge
        count={row.original.status}
        status={candidateStatusStyles[row.original.status]}
        className='rounded-(--radius)'
      />
    )
  }
]

function filterBySelectedValues(
  row: { getValue: (columnId: string) => unknown },
  columnId: string,
  filterValue: unknown
) {
  const selectedValues = Array.isArray(filterValue) ? filterValue : []
  return selectedValues.length === 0 || selectedValues.includes(row.getValue(columnId))
}

type CandidateTable = DataTableRenderProps<Candidate>['table']

type MultiSelectFilterOption = {
  value: string
  label: string
  badgeStatus?: 'processing' | 'success' | 'warning' | 'error'
}

function MultiSelectFilter({
  label,
  options,
  selectedValues,
  onToggle,
  onClear
}: {
  label: string
  options: MultiSelectFilterOption[]
  selectedValues: string[]
  onToggle: (value: string, checked: boolean) => void
  onClear: () => void
}) {
  const id = useId()

  return (
    <div className='flex items-center'>
      <Popover>
        <PopoverTrigger
          render={
            <Button
              type='button'
              size='sm'
              variant='outline'
              className={
                selectedValues.length
                  ? 'rounded-none bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  : 'rounded-none'
              }
            />
          }
        >
          {label}
          {selectedValues.length > 0 && (
            <Badge count={selectedValues.length} status='processing' size='sm' className='rounded-(--radius)' />
          )}
          <CaretDownIcon aria-hidden='true' />
        </PopoverTrigger>
        <PopoverPortal>
          <PopoverPositioner side='bottom' align='start' sideOffset={4}>
            <PopoverPopup className='w-60 p-2'>
              <PopoverTitle className='px-2 py-1 text-sm'>Filter by {label.toLowerCase()}</PopoverTitle>
              <div className='flex flex-col gap-1'>
                {options.map((option) => {
                  const optionId = `${id}-${option.value.toLowerCase().replaceAll(/[^a-z0-9]+/g, '-')}`

                  return (
                    <FieldRoot key={option.value} className='flex-row items-center gap-0 self-stretch'>
                      <FieldLabel className='flex w-full cursor-pointer select-none items-center gap-3 rounded-(--radius) px-2 py-1.5 font-normal hover:bg-accent'>
                        <CheckboxRoot
                          checked={selectedValues.includes(option.value)}
                          aria-labelledby={optionId}
                          onCheckedChange={(checked) => onToggle(option.value, checked === true)}
                        />
                        <span id={optionId} className='text-sm'>
                          {option.badgeStatus ? (
                            <Badge count={option.label} status={option.badgeStatus} className='rounded-(--radius)' />
                          ) : (
                            option.label
                          )}
                        </span>
                      </FieldLabel>
                    </FieldRoot>
                  )
                })}
              </div>
            </PopoverPopup>
          </PopoverPositioner>
        </PopoverPortal>
      </Popover>
      {selectedValues.length > 0 && (
        <Button
          type='button'
          size='icon-sm'
          variant='outline'
          className='rounded-none border-s-0'
          aria-label={`Clear ${label} filter`}
          onClick={onClear}
        >
          <XIcon aria-hidden='true' />
        </Button>
      )}
    </div>
  )
}

function CandidateFilters({ table }: { table: CandidateTable }) {
  const initialized = useRef(false)

  useEffect(() => {
    if (initialized.current) return
    initialized.current = true
    table.getColumn('status')?.setFilterValue(['Follow-Up', 'Feedback'])
  }, [table])

  const selectedValues = (columnId: string) => {
    const value = table.getColumn(columnId)?.getFilterValue()
    return Array.isArray(value) ? value : []
  }

  const toggleValue = (columnId: string, value: string, checked: boolean) => {
    const column = table.getColumn(columnId)
    const selected = selectedValues(columnId)
    const next = checked ? [...selected, value] : selected.filter((item) => item !== value)
    column?.setFilterValue(next.length ? next : undefined)
  }

  return (
    <div className='flex w-full flex-wrap items-center gap-2'>
      <Input
        aria-label='Search candidates'
        placeholder='Search'
        startAdornment={<MagnifyingGlassIcon aria-hidden='true' />}
        value={String(table.state.globalFilter ?? '')}
        onChange={(event) => table.setGlobalFilter(event.currentTarget.value)}
        className='w-full sm:max-w-64'
      />
      <div className='ml-auto flex w-full flex-wrap items-center justify-end gap-2 sm:w-auto'>
        <MultiSelectFilter
          label='Role'
          options={[...new Set(candidates.map((candidate) => candidate.role))].map((value) => ({
            value,
            label: value
          }))}
          selectedValues={selectedValues('role')}
          onToggle={(value, checked) => toggleValue('role', value, checked)}
          onClear={() => table.getColumn('role')?.setFilterValue(undefined)}
        />
        <MultiSelectFilter
          label='Location'
          options={[...new Set(candidates.map((candidate) => candidate.location))].map((value) => ({
            value,
            label: value
          }))}
          selectedValues={selectedValues('location')}
          onToggle={(value, checked) => toggleValue('location', value, checked)}
          onClear={() => table.getColumn('location')?.setFilterValue(undefined)}
        />
        <MultiSelectFilter
          label='Status'
          options={(['Follow-Up', 'Hired', 'Feedback', 'Rejected'] as CandidateStatus[]).map((value) => ({
            value,
            label: value,
            badgeStatus: candidateStatusStyles[value]
          }))}
          selectedValues={selectedValues('status')}
          onToggle={(value, checked) => toggleValue('status', value, checked)}
          onClear={() => table.getColumn('status')?.setFilterValue(undefined)}
        />
      </div>
    </div>
  )
}

function CandidateFilterTable() {
  return (
    <DataTable
      data={candidates}
      columns={candidateColumns}
      getRowId={(candidate) => candidate.id}
      pageSize={10}
      tableContainerClassName='min-h-[19rem]'
      renderSearch={(props) => <CandidateFilters table={props.table} />}
      renderColumnVisibility={() => null}
    />
  )
}

export const demo: DemoMeta = {
  id: 'data-table',
  title: 'Data Table',
  description: 'A reusable, headless data table built with TanStack Table and semantic HTML.',
  group: 'Data Display',
  variants: [
    {
      name: 'DEFAULT TABLE',
      render: () => (
        <SampleDataDisclosure>
          <DefaultCustomerTable />
        </SampleDataDisclosure>
      )
    },
    {
      name: 'SELECTABLE ROWS',
      render: () => (
        <SampleDataDisclosure>
          <SelectableCustomerTable />
        </SampleDataDisclosure>
      )
    },
    {
      name: 'OPEN ROW DETAILS ON DEMAND',
      render: () => (
        <SampleDataDisclosure>
          <RowDetailsCustomerTable />
        </SampleDataDisclosure>
      )
    },
    {
      name: 'SINGLE ROW SELECTION',
      render: () => (
        <SampleDataDisclosure>
          <SingleSelectCustomerTable />
        </SampleDataDisclosure>
      )
    },
    { name: 'BATCH ACTIONS', render: () => <BatchActionsCustomerTable /> },
    {
      name: 'CUSTOM SEARCH + COLUMNS',
      render: () => (
        <SampleDataDisclosure>
          <CustomControlsCustomerTable />
        </SampleDataDisclosure>
      )
    },
    {
      name: 'COLLAPSED SEARCH',
      render: () => (
        <SampleDataDisclosure>
          <CollapsedSearchCustomerTable />
        </SampleDataDisclosure>
      )
    },
    {
      name: 'ADVANCED FILTERS',
      render: () => (
        <SampleDataDisclosure label='Sample candidate records; filters update only this local preview.'>
          <CandidateFilterTable />
        </SampleDataDisclosure>
      )
    },
    {
      name: 'DENSE RECORDS',
      render: () => (
        <SampleDataDisclosure>
          <CustomerTable />
        </SampleDataDisclosure>
      )
    },
    {
      name: 'ROW DENSITY + ZEBRA',
      render: () => (
        <SampleDataDisclosure>
          <DensityAndStripeCustomerTable />
        </SampleDataDisclosure>
      )
    },
    {
      name: 'LOADING + EMPTY STATES',
      render: () => (
        <SampleDataDisclosure label='Staged loading and empty states; no server request is made.'>
          <LoadingAndEmptyCustomerTables />
        </SampleDataDisclosure>
      )
    }
  ]
}
