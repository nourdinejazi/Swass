"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { DataTableColumnHeader } from "./customers-column-header";
import { GetCustomerType } from "@/actions/server-only";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Clipboard, MoreHorizontal } from "lucide-react";
import toast from "react-hot-toast";

export const CustomerColumns: ColumnDef<GetCustomerType>[] = [
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
    accessorKey: "id",
    id: "id",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="ID Client" />;
    },
    cell: ({ row }) => {
      return <span>{row.original.id}</span>;
    },
  },

  {
    accessorKey: "name",
    id: "name",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Nom" />;
    },
    cell: ({ row }) => {
      return <span>{row.original.name}</span>;
    },
  },

  {
    accessorKey: "email",
    id: "email",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Email" />;
    },
    cell: ({ row }) => {
      return (
        <span>
          <Badge variant={"default"}>{row.original.email}</Badge>
        </span>
      );
    },
  },

  {
    accessorKey: "orders",
    id: "orders",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="NB°Commandes" />;
    },
    cell: ({ row }) => {
      const nbCommandePaye = row.original.orders.filter(
        (order) => order.paye === true
      ).length;
      const nbCommandeAnnule = row.original.orders.filter(
        (order) => order.paye === false
      ).length;

      return (
        <div className="flex gap-2">
          <span className="text-green-500">{nbCommandePaye} /</span>
          <span className="text-red-500">{nbCommandeAnnule} /</span>

          <span>{nbCommandeAnnule + nbCommandePaye}</span>
        </div>
      );
    },
    enableSorting: false,
    enableColumnFilter: false,
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
              <DropdownMenuItem
                onClick={() => {
                  navigator.clipboard.writeText(row.original.id);
                  toast.success("ID Copié");
                }}
                className="hover:text-primary  flex items-center justify-start gap-2   cursor-pointer focus:outline-none"
              >
                <span>Copier ID</span>
                <Clipboard size={17} />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      );
    },
  },
];
