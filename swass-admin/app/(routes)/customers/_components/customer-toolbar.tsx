"use client";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { DataTableViewOptions } from "./customers-view-options";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
}

export function DataTableToolbar<TData>({
  table,
  globalFilter,
  setGlobalFilter,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center gap-2 flex-wrap">
        <Input
          placeholder="ID client"
          value={(table.getColumn("id")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("id")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px]  "
        />
        <Input
          placeholder="Global Filter"
          className="h-8 w-[150px] lg:w-[250px]"
          value={globalFilter ?? ""}
          onChange={(event) => setGlobalFilter(event.target.value)}
          type="text"
        />

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>

      <DataTableViewOptions table={table} />
    </div>
  );
}