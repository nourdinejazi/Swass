"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, MoreHorizontal, Sigma } from "lucide-react";

import Link from "next/link";
import { Produit, Stock } from "@prisma/client";

import { Badge } from "@/components/ui/badge";
import { DataTableColumnHeader } from "./produit-column-header";
import Currency from "@/components/currency";
import {
  Credenza,
  CredenzaBody,
  CredenzaContent,
  CredenzaDescription,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from "@/components/credenza";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { etatsProduit } from "@/enum-types/data";

export const ProduitColumns: ColumnDef<Produit & { stock: Stock[] }>[] = [
  {
    id: "select",
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: any) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="border bg-white  rounded-lg print:hidden"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "reference",
    id: "reference",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Référence" />;
    },
    cell: ({ row }) => {
      return (
        <span>
          <Badge variant={"default"}>{row.original.reference}</Badge>
        </span>
      );
    },
  },

  {
    accessorKey: "nom",
    id: "nom",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Nom" />;
    },
    cell: ({ row }) => {
      return <span>{row.original.nom}</span>;
    },
  },

  {
    accessorKey: "archived",
    id: "archived",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Archivé" />;
    },
    cell: ({ row }) => {
      return (
        <span className="text-sm">{row.original.archived ? "Oui" : "Non"}</span>
      );
    },
    filterFn: (row, id, value) => {
      if (value.includes("archived") && row.getValue(id) === true) {
        return true;
      }
      if (value.includes("visible") && row.getValue(id) === false) {
        return true;
      }
      return false;
    },
  },

  {
    accessorKey: "prix",
    id: "prix",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Prix" />;
    },
    cell: ({ row }) => {
      return (
        <>
          {row.original.promotion > 0 ? (
            <Currency className="  text-red-400" value={row.original.prix} />
          ) : (
            <Currency value={row.original.prix} />
          )}
        </>
      );
    },
  },
  {
    accessorKey: "promotion",
    id: "promotion",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Promotion" />;
    },
    cell: ({ row }) => {
      return (
        <div className="space-x-2">
          <span className="text-xs">({row.original.promotion}%)</span>
          <Currency
            value={row.original.prix}
            promotion={row.original.promotion}
          />
        </div>
      );
    },
  },

  {
    accessorKey: "etat",
    id: "etat",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Etat" />;
    },
    cell: ({ row }) => {
      const etat = etatsProduit.find((s) => s.value === row.original.etat);
      if (etat)
        return (
          <Badge style={{ backgroundColor: etat?.color }}>{etat.label}</Badge>
        );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "newCollection",
    id: "newCollection",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="New Collec" />;
    },
    cell: ({ row }) => {
      return (
        <span className="text-sm">
          {row.original.newCollection ? "Oui" : "Non"}
        </span>
      );
    },
    filterFn: (row, id, value) => {
      if (value.includes("newCollection") && row.getValue(id) === true) {
        return true;
      }
      if (value.includes("collection") && row.getValue(id) === false) {
        return true;
      }
      return false;
    },
  },

  {
    accessorKey: "categorieId",
    id: "categorie",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Catégorie" />;
    },
    cell: ({ row }) => {
      return <div>{row.original.categorieId}</div>;
    },
    filterFn: (row, id, value) => {
      console.log(row.getValue(id));
      return value.includes(row.getValue(id));
    },
  },

  {
    accessorKey: "familleId",
    id: "famille",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Famille" />;
    },
    cell: ({ row }) => {
      return <div className="text-xs">{row.original.familleId}</div>;
    },
    filterFn: (row, id, value) => {
      console.log(row.getValue(id));
      return value.includes(row.getValue(id));
    },
  },

  {
    accessorKey: "modelId",
    id: "model",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Modéle" />;
    },
    cell: ({ row }) => {
      return <div>{row.original.modelId}</div>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },

  {
    accessorKey: "longeur",
    id: "longueur",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Longueur" />;
    },
    cell: ({ row }) => {
      return <div>{row.original.longeur}</div>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },

  {
    accessorKey: "stock",
    id: "stock",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Stock" />;
    },
    cell: ({ row }) => {
      const total = row.original.stock.reduce((acc, item) => {
        return acc + item.stock;
      }, 0);

      return (
        <Credenza>
          <CredenzaTrigger asChild>
            <button>
              <Eye size={20} />
            </button>
          </CredenzaTrigger>
          <CredenzaContent>
            <CredenzaHeader>
              <CredenzaTitle>
                le Stock pour {row.original.reference}
              </CredenzaTitle>
              <CredenzaDescription className="flex items-center justif-center gap-2 -ml-1">
                <Sigma />
                <span>Somme du stock : {total}</span>
              </CredenzaDescription>
            </CredenzaHeader>
            <CredenzaBody className="">
              <div className="flex flex-col gap-5">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Taille</TableHead>
                      <TableHead>Couleur</TableHead>
                      <TableHead className="text-right">Stock</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="max-h-[400px] overflow-auto">
                    {row.original.stock.map((item) => (
                      <TableRow
                        key={item.couleurId + item.tailleId + item.produitId}
                      >
                        <TableCell className="font-medium">
                          {item.tailleId}
                        </TableCell>
                        <TableCell>{item.couleurId}</TableCell>

                        <TableCell className="text-right">
                          {item.stock}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CredenzaBody>
            <CredenzaFooter>
              <span></span>
            </CredenzaFooter>
          </CredenzaContent>
        </Credenza>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: false,
    enableColumnFilter: false,
  },

  {
    accessorKey: "createdAt",

    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Créer Le" />;
    },

    cell: ({ row }) => {
      return <span>{row.original.createdAt.toLocaleString()}</span>;
    },
    filterFn: (rows, id, filterValue) => {
      return (
        rows.original.createdAt.setHours(0, 0, 0, 0) >=
          filterValue.from.setHours(0, 0, 0, 0) &&
        rows.original.createdAt.setHours(0, 0, 0, 0) <=
          filterValue.to.setHours(0, 0, 0, 0)
      );
    },
  },

  {
    accessorKey: "updatedAt",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Modifé Le" />;
    },
    cell: ({ row }) => {
      return <span>{row.original.updatedAt.toLocaleString()}</span>;
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0  ">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="bg-white z-50 mb-3 shadow-lg p-2 rounded-xl  font-medium"
              align="end"
            >
              <Link href={`/produits/${row.original.reference}`}>
                <DropdownMenuItem className="hover:text-primary  flex items-center justify-start gap-2   cursor-pointer focus:outline-none">
                  <span>Details</span>
                </DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      );
    },
  },
];
