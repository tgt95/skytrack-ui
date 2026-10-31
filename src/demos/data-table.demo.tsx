import { DataTable, type DataTableColumnDef } from '@/components/ui/data-table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DotsThreeIcon } from '@phosphor-icons/react'
import { Menu, MenuItem, MenuPopup, MenuPortal, MenuPositioner, MenuSeparator, MenuTrigger } from '@/components/ui/menu'
import type { DemoMeta } from '@/showcase/demo'

type Customer = {
  id: string
  name: string
  email: string
  status: 'Active' | 'Invited'
  plan: 'Pro' | 'Starter'
  price: number
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
  { id: 'C-1048', name: 'Doug Dubois', email: 'doug@example.com', status: 'Active', plan: 'Pro', price: 1299 }
]

const currencyFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

const columns: DataTableColumnDef<Customer>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => <span className='font-medium'>{row.original.id}</span>
  },
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'email', header: 'Email' },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <Badge
        count={row.original.status}
        status={row.original.status === 'Active' ? 'success' : 'secondary'}
        size='sm'
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
      pageSize={4}
    />
  )
}

export const demo: DemoMeta = {
  id: 'data-table',
  title: 'Data Table',
  description: 'A reusable, headless data table built with TanStack Table and semantic HTML.',
  group: 'Data Display',
  variants: [{ name: 'CUSTOMER RECORDS', render: () => <CustomerTable /> }]
}
