"use client";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { DataTableFacetedFilter } from "./produit-facetfilter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { DatePickerWithRange } from "@/components/date-range-picker";
import { DataTableViewOptions } from "./produit-view-options";
import {
  etatsProduit,
  longueurs,
  statusArchive,
  statusCollection,
} from "@/enum-types/data";
import { Categorie, Famille, Models } from "@prisma/client";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
  models: Models[] | null;
  categories: Categorie[] | null;
  familles: Famille[] | null;
}

export function DataTableToolbar<TData>({
  table,
  globalFilter,
  setGlobalFilter,
  categories,
  familles,
  models,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between flex-wrap gap-2">
      <div className="flex flex-1 items-center  flex-wrap gap-2">
        <Input
          placeholder="Référence"
          value={
            (table.getColumn("reference")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("reference")?.setFilterValue(event.target.value)
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

        {table.getColumn("etat") && (
          <DataTableFacetedFilter
            column={table.getColumn("etat")}
            title="Etat"
            options={etatsProduit}
          />
        )}

        {table.getColumn("longueur") && (
          <DataTableFacetedFilter
            column={table.getColumn("longueur")}
            title="Longueur"
            options={longueurs}
          />
        )}
        {table.getColumn("categorie") && categories && (
          <DataTableFacetedFilter
            column={table.getColumn("categorie")}
            title="Catégorie"
            options={categories.map((c) => {
              return { label: c.name, value: c.name };
            })}
          />
        )}
        {table.getColumn("famille") && familles && (
          <DataTableFacetedFilter
            column={table.getColumn("famille")}
            title="Famille"
            options={familles.map((c) => {
              return { label: c.name, value: c.name };
            })}
          />
        )}
        {table.getColumn("model") && models && (
          <DataTableFacetedFilter
            column={table.getColumn("model")}
            title="Modéle"
            options={models.map((m) => {
              return { label: m.name, value: m.name };
            })}
          />
        )}

        {table.getColumn("newCollection") && (
          <DataTableFacetedFilter
            column={table.getColumn("newCollection")}
            title="newCollection"
            options={statusCollection}
          />
        )}
        {table.getColumn("archived") && (
          <DataTableFacetedFilter
            column={table.getColumn("archived")}
            title="Archivé"
            options={statusArchive}
          />
        )}

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
