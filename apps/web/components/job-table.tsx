'use client'

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  type ColumnDef,
} from '@tanstack/react-table'
import { PropsWithChildren, useState } from 'react'
import { Job, Status } from '@alq/validators'

import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Checkbox } from './ui/checkbox'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table'

const Code = ({ children }: PropsWithChildren) => (
  <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
    {children}
  </code>
)

function getStatusBadge(status: Status) {
  switch (status) {
    case 'failed': {
      return (
        <Badge variant="destructive" className="uppercase">
          {status}
        </Badge>
      )
    }
    case 'queued': {
      return (
        <Badge variant="secondary" className="uppercase">
          {status}
        </Badge>
      )
    }
    default: {
      return <Badge className="uppercase">{status}</Badge>
    }
  }
}

const columns: ColumnDef<Job>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        defaultChecked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomeRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(val) => table.toggleAllRowsSelected(!!val)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(val) => row.toggleSelected(!!val)}
        aria-label="Select row"
      />
    ),
    enableHiding: false,
    enableSorting: false,
  },
  {
    accessorKey: 'status',
    header: () => 'Status',
    cell: ({ row }) => getStatusBadge(row.getValue('status')),
  },
  {
    accessorKey: 'handler',
    header: () => 'Handler',
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <Badge variant="outline">{row.original.method}</Badge>
        <span>{row.getValue('handler')}</span>
      </div>
    ),
  },
  {
    accessorKey: 'payload',
    header: () => 'Payload',
    cell: ({ row }) =>
      row.getValue('payload') ? (
        <Code>{JSON.stringify(row.getValue('payload'))}</Code>
      ) : null,
  },
  {
    accessorKey: 'headers',
    header: () => 'Headers',
    cell: ({ row }) =>
      row.getValue('headers') ? (
        <Code>{JSON.stringify(row.getValue('headers'))}</Code>
      ) : null,
  },
]

export default function JobsTable({ jobs }: { jobs: Job[] }) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [rowSelection, setRowSelection] = useState({})

  const table = useReactTable({
    data: jobs,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      rowSelection,
    },
  })

  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((group) => (
              <TableRow key={group.id}>
                {group.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center py-4 space-x-2">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{' '}
          {table.getFilteredRowModel().rows.length} row(s) selected
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
