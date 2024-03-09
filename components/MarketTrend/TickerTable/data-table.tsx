"use client"



import {
  ColumnDef,
  flexRender,
  SortingState,
  getSortedRowModel,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useRouter } from "next/navigation"

interface DataTableProps<TData extends { symbol: string }, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData extends { symbol: string }, TValue>({
  columns,
  data,
}: DataTableProps<TData , TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0, //initial page index
    pageSize: 20, //default page size
    })        

  const router = useRouter(); // initialize the router

  // Define a function that navigates to your desired path
  const handleRowClick = (symbol: string) => {
    router.push(`/ticker/${symbol}`);
  };


  const table = useReactTable({
    data,
    columns,
    onPaginationChange: setPagination, //update the pagination state when internal APIs mutate the pagination state
    state: {
    sorting,
    pagination,
    },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <>
        {/* Table */}
        <div className="border-b border-zinc-600 ">
        <Table>
            <TableHeader className="dark:bg-zinc-900 bg-zinc-200 h-16">
            {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="border-zinc-600">
                {headerGroup.headers.map((header) => {
                    return (
                    <TableHead key={header.id} >
                        {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                            )}
                    </TableHead>
                    )
                })}
                </TableRow>
            ))}
            </TableHeader>
            <TableBody>
            {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                <TableRow
                    className="border-b border-zinc-600 dark:hover:bg-zinc-900 hover:bg-zinc-200 hover:cursor-pointer transition-none"
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    onClick={() => handleRowClick(row.original.symbol)}
                >
                    {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                    ))}
                </TableRow>
                ))
            ) : (
                <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                </TableCell>
                </TableRow>
            )}
            </TableBody>
        </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-end space-x-2 py-4">
        <Button
        variant="outline"
        size="sm"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
        >
        Prev
        </Button>
        <Button
        variant="outline"
        size="sm"
        onClick={() => table.setPageIndex(table.getPageCount() - 5)}
        className={`${pagination.pageIndex === 0 && 'dark:bg-zinc-700 bg-zinc-300' }`}
        >
        1
        </Button>
        <Button
        variant="outline"
        size="sm"
        onClick={() => table.setPageIndex(table.getPageCount() - 4)}
        className={`${pagination.pageIndex === 1 && 'dark:bg-zinc-700 bg-zinc-300' }`}
        >
        2
        </Button>
        <Button
        variant="outline"
        size="sm"
        onClick={() => table.setPageIndex(table.getPageCount() - 3)}
        className={`${pagination.pageIndex === 2 && 'dark:bg-zinc-700 bg-zinc-300' }`}
        >
        3
        </Button>
        <Button
        variant="outline"
        size="sm"
        onClick={() => table.setPageIndex(table.getPageCount() - 2)}
        className={`${pagination.pageIndex === 3 && 'dark:bg-zinc-700 bg-zinc-300' }`}
        >
        4
        </Button>
        <Button
        variant="outline"
        size="sm"
        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        className={`${pagination.pageIndex === 4 && 'dark:bg-zinc-700 bg-zinc-300' }`}
        >
        5
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
    </>
  )
}
