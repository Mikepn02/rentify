import { useMemo, useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {  ChevronLeft, ChevronRight,} from "lucide-react";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";


const ITEMS_PER_PAGE = 5;

interface DataTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData>[];
  filterPlaceholder?: string;
  addNewComponent?: React.ReactNode;
}

export function DataTable<TData>({
  data,
  columns,
  filterPlaceholder = "Search...",
  addNewComponent
}: DataTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const memoizedData = useMemo(() => data, [data]);

  const table = useReactTable({
    data: memoizedData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    initialState: {
      pagination: {
        pageSize: ITEMS_PER_PAGE,
      },
    },
  });

  
  const firstFilterableColumn = columns.find(
    (col): col is ColumnDef<TData> & { accessorKey: string } => "accessorKey" in col
  )?.accessorKey;  
  const filterColumn = firstFilterableColumn ? table.getColumn(firstFilterableColumn) : null;

  return (
    <div className="w-full bg-white p-4 rounded-md shadow-md">
      <div className="flex md:flex-row flex-col gap-4 md:gap-0 items-center justify-between py-4">
        <Input
          placeholder={filterPlaceholder}
          value={(filterColumn?.getFilterValue() as string) ?? ""}
          onChange={(event) => filterColumn?.setFilterValue(event.target.value)}
          className="w-full md:max-w-sm"
        />
        <div>
        {addNewComponent}
        </div>
      </div>

      <div className="rounded-md">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
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

      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronLeft size={18} />
        </Button>
        <Button className="bg-primary-light rounded-xl">
          {table.getState().pagination.pageIndex + 1}
        </Button>
        <Button
          variant="outline"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <ChevronRight size={18} />
        </Button>
      </div>
    </div>
  );
}
