"use client";

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
import { ArrowUpDown, ChevronDown } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Flights } from "@/interfaces/interfaces";

export const columns: ColumnDef<Flights>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center cursor-pointer hover:underline"
        >
          Flight Id
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => <div className="capitalize">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "origin",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center cursor-pointer hover:underline"
        >
          Origin
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => <div className="capitalize">{row.getValue("origin")}</div>,
  },
  {
    accessorKey: "destination",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center cursor-pointer hover:underline"
        >
          Destination
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => <div className="capitalize">{row.getValue("destination")}</div>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center cursor-pointer hover:underline"
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => <div className="capitalize">{row.getValue("status")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const flightDetails = row.original;
      const { id, arrival, origin, departure, destination, status, economyPrice, businessPrice } =
        flightDetails;

      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button>Book</Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Flight Details</DialogTitle>
            </DialogHeader>
            <DialogDescription>
              <div className="space-y-3">
                <div className="space-y-1">
                  <p>
                    <strong>ID:</strong> {id}
                  </p>
                  <p>
                    <strong>Departure:</strong> {departure.toLocaleString()}
                  </p>
                  <p>
                    <strong>Arrival:</strong> {arrival.toLocaleString()}
                  </p>
                  <p>
                    <strong>Origin:</strong> {origin}
                  </p>
                  <p>
                    <strong>Destination:</strong> {destination}
                  </p>
                  <p>
                    <strong>Status:</strong> {status}
                  </p>
                </div>

                <div className="flex flex-col justify-between space-y-4">
                  <Select>
                    <SelectTrigger className="w-auto">
                      <SelectValue placeholder="Select a class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Available tickets</SelectLabel>
                        <SelectItem value="economyPrice">Economy: ${economyPrice}</SelectItem>
                        <SelectItem value="businessPrice">Business: ${businessPrice}</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <Button onClick={() => console.log("Booking", id)}>Book Selected Class</Button>
                </div>
              </div>
            </DialogDescription>
          </DialogContent>
        </Dialog>
      );
    },
  },
];

interface DataTableProps {
  data: Flights[];
}
export function DataTable({ data }: DataTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [selectedFlight, setSelectedFlight] = React.useState<Flights | null>(null);
  const [isDialogOpen, setDialogOpen] = React.useState(false);

  const openDialog = (flight: Flights) => {
    setSelectedFlight(flight);
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  const table = useReactTable({
    data,
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
  });

  return (
    <>
      <div className="w-full">
        <div className="flex items-center py-4">
          <Input
            placeholder="Where to..."
            value={(table.getColumn("destination")?.getFilterValue() as string) ?? ""}
            onChange={(event) => table.getColumn("destination")?.setFilterValue(event.target.value)}
            className="max-w-sm"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) => column.toggleVisibility(!!value)}
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    onClick={() => openDialog(row.original)}
                    data-state={row.getIsSelected() && "selected"}
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
        <div className="flex items-center justify-end space-x-2 py-4">
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
    </>
  );
}
