"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import {
  CreditCard,
  Eye,
  HandCoins,
  MapPin,
  MoreHorizontal,
  Printer,
  Sigma,
  Truck,
} from "lucide-react";

import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { DataTableColumnHeader } from "./column-header";
import { inactiveOrderStatuses, statuses } from "@/enum-types/data";
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
import { GetOrderType } from "@/actions/server-only";

function printDynamicContent(data: GetOrderType) {
  // Create a new window
  const printWindow = window.open("", "_blank");
  if (!printWindow) return;

  // Write the content to the new window
  const subTotal = data.items.reduce((acc, curr) => {
    return acc + curr.product.prix * curr.quantity;
  }, 0);
  printWindow.document.write(`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta charset="UTF-8" />

    <!-- External CSS libraries -->
    <link
      type="text/css"
      rel="stylesheet"
      href="assets/css/bootstrap.min.css"
    />
    <link
      type="text/css"
      rel="stylesheet"
      href="assets/fonts/font-awesome/css/font-awesome.min.css"
    />

    <!-- Favicon icon -->
    <link
      rel="shortcut icon"
      href="assets/img/favicon.ico"
      type="image/x-icon"
    />

    <!-- Google fonts -->
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      rel="stylesheet"
      type="text/css"
      href="https://fonts.googleapis.com/css?family=Poppins:100,200,300,400,500,600,700,800,900"
    />

    <!-- Custom Stylesheet -->
    <link type="text/css" rel="stylesheet" href="assets/css/style.css" />
  </head>
  <body>
    <!-- Invoice 1 start -->
    <div class="invoice-1 invoice-content">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="invoice-inner clearfix">
              <div class="invoice-info clearfix" id="invoice_wrapper">
                <div class="invoice-headar">
                  <div class="row g-0">
                    <div class="col-sm-6">
                      <div class="invoice-logo">
                        <!-- logo started -->
                        <div class="logo">
                          <img src="images/logo.png" alt="logo" />
                        </div>
                        <!-- logo ended -->
                      </div>
                    </div>
                    <div class="col-sm-6 invoice-id">
                      <div class="info">
                        <h1 class="color-white inv-header-1">Facture</h1>
                        <p class="color-white mb-1">
                          Numéro de facture :<span>#${data.num
                            .toString()
                            .padStart(4, "0")}</span>
                        </p>
                        <p class="color-white mb-0">
                          Crée le : <span>${data.createdAt.toLocaleString()}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="invoice-top">
                  <div class="row">
                    <div class="col-sm-6">
                      <div class="invoice-number mb-30">
                        <h4 class="inv-title-1">Facturé à</h4>
                        <h2 class="name mb-10">${
                          data.prenom + " " + data.nom
                        }</h2>
                        <p class="invo-addr-1">
                          ${data.nom + " " + data.prenom} <br />
                          ${data.phone}${" - " + data.phone2} <br />
                           ${data.location}, ${data.city}, ${
    data.country
  } <br />
                        </p>
                      </div>
                    </div>
                    <div class="col-sm-6">
                      <div class="invoice-number mb-30">
                        <div class="invoice-number-inner">
                          <h4 class="inv-title-1">Facturé par</h4>
                          <h2 class="name mb-10">Swass Fashion</h2>
                          <p class="invo-addr-1">
                            Swass Fashion Inc <br />
                            Swassfashion@gmail.com <br />
                            8000 Nabeul, Tunisia <br />
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="invoice-center">
                  <div class="table-responsive">
                    <table class="table mb-0 table-striped invoice-table">
                      <thead class="bg-active">
                        <tr class="tr">
                          <th>No.</th>
                          <th class="pl0 text-start">Déscription</th>
                          <th class="text-center">Prix Unit.</th>
                          <th class="text-center">Quantité</th>
                          <th class="text-end">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                          ${data.items.map(
                            (item, index) =>
                              `<tr class="tr">
                          <td>
                            <div class="item-desc-1">
                              <span>${index}</span>
                            </div>
                          </td>
                          <td class="pl0">${item.ref}-${item.tailleId}-${
                                item.couleurId
                              }</td>
                          <td class="text-center">${item.product.prix}</td>
                          <td class="text-center">${item.quantity}</td>
                          <td class="text-end">
                          ${item.product.prix * item.quantity}
                          </td>
                        </tr>`
                          )}
                        <tr class="tr2">
                          <td></td>
                          <td></td>
                          <td></td>
                          <td class="text-center">Sous-Total</td>
                          <td class="text-end">${subTotal}DT</td>
                        </tr>
                        <tr class="tr2">
                          <td></td>
                          <td></td>
                          <td></td>
                          <td class="text-center">Livraison</td>
                          <td class="text-end">7DT</td>
                        </tr>
                        <tr class="tr2">
                          <td></td>
                          <td></td>
                          <td></td>
                          <td class="text-center f-w-600 active-color">
                            Grand Total
                          </td>
                          <td class="f-w-600 text-end active-color">${
                            subTotal + 7
                          }DT</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div class="invoice-bottom">
                  <div class="row">
                    <div class="col-lg-6 col-md-8 col-sm-7">
                      <div class="mb-30 dear-client">
                        <h3 class="inv-title-1">Terms & Conditions</h3>
                        <p>
                          Les délais de livraison peuvent varier en fonction de
                          la destination et des produits commandés. Nous nous
                          engageons à expédier les articles dans les 2 à 3 jours
                          ouvrables suivant la confirmation de la commande.
                        </p>
                      </div>
                    </div>
                    <div class="col-lg-6 col-md-4 col-sm-5">
                      <div class="mb-30 payment-method">
                        <h3 class="inv-title-1">Service Client</h3>
                        <ul class="payment-method-list-1 text-10">
                          <li>
                            <strong>Assistance téléphonique :</strong>(+216) 28 797 822
                          </li>
                          <li><strong>Site web :</strong> swass-fashion.tn</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="invoice-contact clearfix">
                  <div class="row g-0">
                    <div class="col-lg-9 col-md-11 col-sm-12">
                      <div class="contact-info">
                        <a href="tel:+55-4XX-634-7071"
                          ><i class="fa fa-phone"></i> (+216) 28 797 822</a
                        >
                        <a href="tel:Swassfashion@gmail.com"
                          ><i class="fa fa-envelope"></i>
                         Swassfashion@gmail.com</a
                        >
                        <a
                          href="tel:Swassfashion@gmail.com"
                          class="mr-0 d-none-580"
                          ><i class="fa fa-map-marker"></i> 8000 Nabeul,
                          Tunisia</a
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="invoice-btn-section clearfix d-print-none">
                <a
                  href="javascript:window.print()"
                  class="btn btn-lg btn-print"
                >
                  <i class="fa fa-print"></i> Imprimer Facture
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Invoice 1 end -->

    <script src="assets/js/jquery.min.js"></script>
    <script src="assets/js/jspdf.min.js"></script>
    <script src="assets/js/html2canvas.js"></script>
    <script src="assets/js/app.js"></script>
  </body>
</html>
`);
  // Close the document to finish loading
  printWindow.document.close();

  //Wait for the content to load, then print
  printWindow.onload = function () {
    printWindow.print();
    printWindow.close(); // Close the window after printing
  };
}

export const OrderColumns: ColumnDef<GetOrderType>[] = [
  {
    accessorKey: "num",
    id: "num",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader
          className="w-[70px]"
          column={column}
          title="Numéro "
        />
      );
    },
    cell: ({ row }) => {
      return <span className="text-sm ">{row.original.num}</span>;
    },
  },
  {
    accessorKey: "modeLivraison",
    id: "modeLivraison",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Mode Livraison" />;
    },
    cell: ({ row }) => {
      return row.original.modeLivraison === "Retrait" ? (
        <Badge className="text-sm space-x-2">
          <span>{row.original.modeLivraison}</span> <MapPin size={15} />
        </Badge>
      ) : (
        <Badge className="text-sm space-x-2">
          <span>{row.original.modeLivraison}</span> <Truck size={15} />
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "nom",
    id: "nom",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Nom" />;
    },
    cell: ({ row }) => {
      return <span className="text-sm">{row.original.nom}</span>;
    },
  },

  {
    accessorKey: "prenom",
    id: "prenom",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Prénom" />;
    },
    cell: ({ row }) => {
      return <span className="text-sm">{row.original.prenom}</span>;
    },
  },

  {
    accessorKey: "phone",
    id: "phone",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Téléphone" />;
    },
    cell: ({ row }) => {
      return (
        <div>
          {row.original.phone2 ? (
            <ul className="text-xs list-inside">
              <li>{row.original.phone}</li>
              <li>{row.original.phone2}</li>
            </ul>
          ) : (
            <span className="text-sm">{row.original.phone}</span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "phone2",
    id: "phone2",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Téléphone2" />;
    },
    cell: ({ row }) => {
      return <span className="text-sm">{row.original.phone2}</span>;
    },
  },
  {
    accessorKey: "status",
    id: "status",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Status" />;
    },
    cell: ({ row }) => {
      const status = statuses.find((s) => s.value === row.original.status);
      if (status)
        return (
          <Badge style={{ backgroundColor: status?.color }}>
            {status.label}
          </Badge>
        );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },

  {
    accessorKey: "paye",
    id: "paye",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Payé" />;
    },
    cell: ({ row }) => {
      return (
        <span className="text-sm">{row.original.paye ? "Oui" : "Non"}</span>
      );
    },
    filterFn: (row, id, value) => {
      if (value.includes("paye") && row.getValue(id) === true) {
        return true;
      }
      if (value.includes("nonPaye") && row.getValue(id) === false) {
        return true;
      }
      return false;
    },
  },

  {
    accessorKey: "modePaiement",
    id: "modePaiement",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Mode Paiement" />;
    },
    cell: ({ row }) => {
      return row.original.modePaiement === "carte" ? (
        <Badge variant={"outline"} className="text-sm space-x-2">
          <span>{row.original.modePaiement}</span> <CreditCard size={15} />
        </Badge>
      ) : (
        <Badge variant={"outline"} className="text-sm space-x-2">
          <span>{row.original.modePaiement}</span> <HandCoins size={15} />
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },

  {
    accessorKey: "items",
    id: "items",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Produits" />;
    },
    cell: ({ row }) => {
      return (
        <Credenza>
          <CredenzaTrigger asChild>
            <button>
              <Eye size={20} />
            </button>
          </CredenzaTrigger>
          <CredenzaContent>
            <CredenzaHeader>
              <CredenzaTitle>La commande N°{row.original.num}</CredenzaTitle>
              <CredenzaDescription className="flex items-center justif-center gap-2 -ml-1">
                <Sigma />
                <span>Total : {row.original.items.length} produits</span>
              </CredenzaDescription>
            </CredenzaHeader>
            <CredenzaBody className="">
              <div className="flex flex-col gap-5">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Référence</TableHead>
                      <TableHead>Taille</TableHead>
                      <TableHead>Couleur</TableHead>
                      <TableHead className="text-right">Quantité</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="max-h-[400px] overflow-auto">
                    {row.original.items.map((item) => (
                      <TableRow key={item.couleurId + item.tailleId + item.id}>
                        <TableCell className="font-medium">
                          {item.ref}
                        </TableCell>
                        <TableCell> {item.tailleId}</TableCell>
                        <TableCell>{item.couleurId}</TableCell>

                        <TableCell className="text-right">
                          {item.quantity}
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
    enableSorting: false,
    enableColumnFilter: false,
  },

  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Commandée Le" />;
    },
    cell: ({ row }) => {
      return (
        <span className="text-sm">
          {row.original.createdAt.toLocaleString()}
        </span>
      );
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
      return (
        <span className="text-sm">
          {row.original.updatedAt.toLocaleString()}
        </span>
      );
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
              <Link href={`/order/${row.original.id}`}>
                <DropdownMenuItem className="hover:text-primary  flex items-center justify-start gap-2   cursor-pointer focus:outline-none">
                  <span>Details</span>
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem
                disabled={inactiveOrderStatuses.includes(row.original.status)}
                onClick={() => printDynamicContent(row.original)}
                className="hover:text-primary  flex items-center justify-start gap-2   cursor-pointer focus:outline-none"
              >
                <span>Imprimer</span> <Printer size={17} />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      );
    },
  },
];
