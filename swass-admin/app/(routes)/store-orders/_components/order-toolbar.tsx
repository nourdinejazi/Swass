"use client";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "./order-view-options";
import { DatePickerWithRange } from "@/components/date-range-picker";

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
    <div className="flex items-center justify-between flex-wrap gap-2">
      <div className="flex flex-1 items-center  flex-wrap gap-2">
        <Input
          placeholder="N°Commande"
          value={(table.getColumn("num")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("num")?.setFilterValue(event.target.value)
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

        {table.getColumn("createdAt") && (
          <DatePickerWithRange column={table.getColumn("createdAt")} />
        )}
        {/* 
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
          />
        )}
        {table.getColumn("modeLivraison") && (
          <DataTableFacetedFilter
            column={table.getColumn("modeLivraison")}
            title="Mode Livraison"
            options={modeLivraison}
          />
        )}
        {table.getColumn("modePaiement") && (
          <DataTableFacetedFilter
            column={table.getColumn("modePaiement")}
            title="Mode Paiment"
            options={modePaiement}
          />
        )}
        {table.getColumn("paye") && (
          <DataTableFacetedFilter
            column={table.getColumn("paye")}
            title="Status Paiement"
            options={statusPaiement}
          />
        )} */}
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
