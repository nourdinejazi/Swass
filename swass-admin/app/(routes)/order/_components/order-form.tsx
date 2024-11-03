"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { OrderSchemaAdmin } from "@/schemas/settings";
import { AlertCircle } from "lucide-react";

import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import SmallSpinner from "@/components/small-spinner";

import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import {
  GitPullRequestArrow,
  MapIcon,
  Notebook,
  ShoppingBag,
  SquarePen,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { modeLivraison, modePaiement, statuses } from "@/enum-types/data";
import { Order, Produit, Image as imgProd } from "@prisma/client";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Credenza,
  CredenzaBody,
  CredenzaClose,
  CredenzaContent,
  CredenzaDescription,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from "@/components/credenza";

import * as React from "react";

import Image from "next/image";
import toast from "react-hot-toast";
interface OrderFormProps {
  initialData:
    | Order & {
        items: {
          couleurId: string;
          tailleId: string;
          quantity: number;
          product: Produit & { images: imgProd[] };
        }[];
      };
}

const OrderFrom = ({ initialData }: OrderFormProps) => {
  const [isPending, setIsPending] = useState(false);

  const [open, setOpen] = useState(false);
  const router = useRouter();
  const params = useParams();

  const form = useForm<z.infer<typeof OrderSchemaAdmin>>({
    resolver: zodResolver(OrderSchemaAdmin),
    defaultValues: initialData,
  });

  const onSubmit = (data: z.infer<typeof OrderSchemaAdmin>) => {
    try {
      setIsPending(true);
      fetch(`/api/order/${params.orderId}`, {
        body: JSON.stringify(data),
        method: "PATCH",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            toast.success(data.success);
            router.refresh();
          } else if (data.error) {
            toast.error(data.error);
          }
          setIsPending(false);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" w-full   h-auto      ">
      <OrderItemsForm initialData={initialData} />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-[1500px] h-full space-y-5 py-8         "
        >
          <div className=" bg-white p-8 space-y-5 max-w-3xl   border border-primary  rounded-lg  ">
            <h4 className="font-medium flex items-center justify-start gap-2">
              Etat <GitPullRequestArrow />
            </h4>

            <Separator />
            <div className="flex items-center justify-between gap-5">
              <Table className="p-4">
                <TableBody className="">
                  <TableRow>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                          <FormItem className=" w-[170px]  ">
                            <FormLabel>Status</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Status" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {statuses.map((item: any) => (
                                  <SelectItem
                                    key={item.value}
                                    value={item.value}
                                  >
                                    {item.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name="paye"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border  w-[250px] bg-white p-4">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>Commande Payé</FormLabel>
                              <FormDescription className="text-xs">
                                Cocher si la commande est payé
                              </FormDescription>
                            </div>
                          </FormItem>
                        )}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
          <div className="max-w-3xl  bg-white p-8 space-y-5   border border-primary  rounded-lg  ">
            <h4 className="font-medium flex items-center justify-start gap-2">
              Address de Facturation <MapIcon />
            </h4>
            <Separator />
            <AddressForm form={form} />
          </div>

          <div className=" bg-white p-8 space-y-5 max-w-3xl   border border-primary  rounded-lg  ">
            <h4 className="font-medium flex items-center justify-start gap-2">
              Méthodes <Notebook />
            </h4>
            <Separator />
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <FormField
                      control={form.control}
                      name="modeLivraison"
                      render={({ field }) => (
                        <FormItem className=" w-[170px]  ">
                          <FormLabel>Mode De Livraison</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value!}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select sous-cat" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {modeLivraison.map((item: any) => (
                                <SelectItem key={item.value} value={item.label}>
                                  {item.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TableCell>
                  <TableCell>
                    <FormField
                      control={form.control}
                      name="modePaiement"
                      render={({ field }) => (
                        <FormItem className=" w-[170px]  ">
                          <FormLabel>Mode de Paiement</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select categorie" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {modePaiement.map((item: any) => (
                                <SelectItem key={item.value} value={item.value}>
                                  {item.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <div className="w-full flex justify-center gap-5 sm:justfiy-center  mt-10 flex-wrap   ">
            <Button
              className="w-[150px] bg-[#E9ECEF] text-[#6C757D] hover:bg-[#E9ECEF] "
              type="reset"
            >
              Cancel
            </Button>
            <Button
              disabled={isPending}
              type="submit"
              className="flex items-center justify-center gap-2"
            >
              {initialData ? "Modifier" : "Ajouter"}
              {isPending && <SmallSpinner />}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default OrderFrom;

const AddressForm = ({ form }: any) => {
  return (
    <section className="space-y-3">
      <div className="flex text-black items-center justify-start w-full   gap-5">
        <FormField
          control={form.control}
          name="nom"
          render={({ field }) => (
            <FormItem className="w-1/2">
              <FormLabel>Nom</FormLabel>
              <FormControl>
                <Input placeholder="Taper votre nom" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="prenom"
          render={({ field }) => (
            <FormItem className="w-1/2">
              <FormLabel>Prénom</FormLabel>
              <FormControl>
                <Input placeholder="Taper votre prénom" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="flex text-black items-center justify-start w-full   gap-5">
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem className="w-1/2">
              <FormLabel>Pays</FormLabel>
              <FormControl>
                <Input placeholder="Taper votre pays" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem className="w-1/2">
              <FormLabel>Ville</FormLabel>
              <FormControl>
                <Input placeholder="Taper votre ville" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={form.control}
        name="location"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Adresse</FormLabel>
            <FormControl>
              <Input placeholder="Taper votre adresse" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="postalCode"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Code Postale</FormLabel>
            <FormControl>
              <Input placeholder="Taper votre adresse" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="infoSupp"
        render={({ field }) => (
          <FormItem>
            <FormLabel>information supplémentaire</FormLabel>
            <FormControl>
              <Input placeholder="" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Téléphone</FormLabel>
            <FormControl>
              <Input placeholder="Taper votre Téléphone" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="phone2"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Téléphone 2 (Optionel)</FormLabel>
            <FormControl>
              <Input placeholder="Taper votre Téléphone 2" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </section>
  );
};

const OrderItemsForm = ({ initialData }: OrderFormProps) => {
  return (
    <div className="space-y-5">
      <div className="max-w-3xl  bg-white p-4 px-8 space-y-5     border border-primary  rounded-lg  ">
        <span className="font-medium  ">
          Commande N°{initialData?.num} du{" "}
          {initialData?.createdAt.toLocaleString()}
        </span>
        <Separator />
        <div className="flex pl-4   gap-5 items-center justify-between">
          <ul className="list-disc">
            <li className=" ">
              <span className="font-medium">Livraison : </span>
              {initialData?.modeLivraison === "Transporteur" ? (
                <span className="text-sm">Transporteur - Toute la Tunisie</span>
              ) : (
                <span className="text-sm ">Retrait en boutique</span>
              )}
            </li>
            <li>
              <span className="font-medium">Moyen de paiement : </span>
              {initialData?.modePaiement == "carte" ? (
                <span className="text-sm">
                  Carte bancaire à la livraison (COD)
                </span>
              ) : (
                <span className="text-sm">Paiement à la livraison</span>
              )}
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-3xl  bg-white p-4 px-8 space-y-5     border border-primary  rounded-lg  ">
        <h4 className="font-medium flex items-center justify-start gap-2">
          Produits <ShoppingBag size={22} />
        </h4>
        <div>
          <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className=" ">#</TableHead>
                <TableHead className=" ">Information</TableHead>
                <TableHead>Quantité</TableHead>
                <TableHead>Prix Unitaire</TableHead>
                <TableHead className="text-right">Prix Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {initialData?.items.map(
                (item: {
                  couleurId: string;
                  tailleId: string;
                  quantity: number;
                  product: Produit & { images: imgProd[] };
                }) => (
                  <TableRow
                    key={item.product.id + item.couleurId + item.tailleId}
                    className="   "
                  >
                    <TableCell className=" size-[70px]  relative     ">
                      {item.product.images[0]?.path !== undefined && (
                        <Image
                          src={item.product.images[0].path}
                          fill
                          alt="img"
                          sizes="100"
                          onLoadingComplete={(image) =>
                            image.classList.remove("img--hidden")
                          }
                          className="object-contain    h-auto w-full rounded-md  img img--hidden"
                        ></Image>
                      )}
                    </TableCell>
                    <TableCell className=" flex flex-col gap-1 text-neutral-600">
                      <span className="text-sm">{item.product.reference}</span>
                      <span className="text-xs">{item.product.nom}</span>
                      <div className="flex gap-1">
                        <span>{item.tailleId}</span>
                        <span>|</span>
                        <span>{item.couleurId}</span>
                      </div>
                    </TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.product.prix}</TableCell>
                    <TableCell className="text-right">
                      {item.product.prix * item.quantity}
                    </TableCell>
                    <TableCell>
                      <Credenza>
                        <CredenzaTrigger asChild>
                          <button>
                            <SquarePen size={20} />
                          </button>
                        </CredenzaTrigger>
                        <CredenzaContent className="h-[80%] lg:h-auto">
                          <CredenzaHeader>
                            <CredenzaTitle> </CredenzaTitle>
                            <CredenzaDescription>
                              <></>
                            </CredenzaDescription>
                          </CredenzaHeader>
                          <CredenzaBody>
                            <RefComboBox
                              oldProdref={item.product.reference}
                              oldQte={item.quantity}
                              oldCouleurId={item.couleurId}
                              oldTailleId={item.tailleId}
                            />
                          </CredenzaBody>
                          <CredenzaFooter>
                            <CredenzaClose asChild>
                              <button> </button>
                            </CredenzaClose>
                          </CredenzaFooter>
                        </CredenzaContent>
                      </Credenza>
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

function RefComboBox({
  oldProdref,
  oldQte,
  oldCouleurId,
  oldTailleId,
}: {
  oldProdref: string;
  oldQte: number;
  oldCouleurId: string;
  oldTailleId: string;
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [refs, setRefs] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedProd, setSelectedProd] = React.useState(null);
  const [selectedInfo, setSelectedInfo] = React.useState("");
  const [isPending, setIsPending] = React.useState(false);
  const [newQte, setNewQte] = React.useState(0);
  const params = useParams();
  const debouncedValue = useDebounce(value, 500);
  const [error, setError] = React.useState("");
  const onSubmit = (selectedProd: any, selectedInfo: any) => {
    try {
      setIsPending(true);
      fetch(`/api/order/${params.orderId}/orderItem`, {
        body: JSON.stringify({
          selectedProd,
          selectedInfo,
          oldProdref,
          newQte,
          oldQte,
          oldCouleurId,
          oldTailleId,
        }),
        method: "PATCH",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setError("");
            toast.success(data.success);
            window.location.reload();
          } else if (data.error) {
            toast.error(data.error);
            setError(data.error);
            setIsPending(false);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  function fetchRefs() {
    try {
      fetch(`/api/produit/searchbyref?ref=${debouncedValue}`)
        .then((res) => res.json())
        .then((data) => {
          setRefs(data);
          setIsLoading(false);
        });
    } catch (err) {
      console.log(err);
      setIsLoading(false); // Ensure loading state is reset on error
    }
  }

  React.useEffect(() => {
    if (debouncedValue) {
      setIsLoading(true);
      fetchRefs();
    }
  }, [debouncedValue]);
  return (
    <div className="   w-[300px]  flex flex-col gap-5">
      <h5>Modifier le Produit : {oldProdref}</h5>
      <div className="relative space-y-2">
        <label className="text-neutral-500 text-sm">Reference</label>
        <Input
          className="w-[300px]"
          value={value}
          disabled={isPending}
          // onBlur={() => setOpen(false)}
          onChange={(ev) => {
            setValue(ev.target.value);
            setOpen(true);
          }}
        />
        {open && (
          <div className="absolute top-20  left-0 bg-white border  rounded-md w-[300px] h-[200px] z-50  ">
            {isLoading ? (
              <div className="w-full h-full flex items-center justify-center">
                <SmallSpinner className=" h-7 w-7" />
              </div>
            ) : (
              <div className="flex flex-col gap-2 items-start justify-start w-full h-full overflow-y-auto p-4">
                {refs.length === 0 && (
                  <div className="flex items-center justify-center w-full h-full">
                    <span className="text-sm text-neutral-500">
                      Aucun produit trouvé
                    </span>
                  </div>
                )}

                {refs.map((item: any) => (
                  <button
                    className=" hover:bg-secondary w-full transition-colors "
                    onClick={() => {
                      setValue(item.reference);
                      setSelectedProd(item);
                      setOpen(false);
                    }}
                    key={item.reference}
                  >
                    {item.reference}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {selectedProd && (
        <div className="space-y-5">
          <Select disabled={isPending} onValueChange={setSelectedInfo}>
            <SelectTrigger className="w-[300px]">
              <SelectValue placeholder="Select Taille et Couleur" />
            </SelectTrigger>
            <SelectContent>
              {(selectedProd as unknown as any).stock.map((item: any) => (
                <SelectItem
                  key={`${item.tailleId} - ${item.couleurId} - ${item.stock}`}
                  value={`${item.tailleId}-${item.couleurId}-Stock(${item.stock})`}
                >
                  {`${item.tailleId} - ${item.couleurId} - Stock(${item.stock})`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input
            className="w-[300px]"
            type="number"
            disabled={isPending}
            value={Number(newQte).toString()}
            onChange={(ev) => {
              setNewQte(Number(ev.target.value));
            }}
          />
        </div>
      )}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>{error}</AlertTitle>
        </Alert>
      )}
      <Button
        disabled={isPending}
        type="button"
        className="flex items-center justify-center gap-2"
        onClick={() => onSubmit(selectedProd, selectedInfo)}
      >
        Modifier
        {isPending && <SmallSpinner />}
      </Button>
    </div>
  );
}
