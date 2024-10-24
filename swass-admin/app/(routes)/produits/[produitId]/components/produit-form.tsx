"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
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

import { ProduitFormSchema } from "@/schemas/settings";

import { Categorie, Couleurs, Famille, Models, Tailles } from "@prisma/client";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import SmallSpinner from "@/components/small-spinner";
import DropZone from "./drop-zone";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@radix-ui/react-checkbox";
import { Link, MoveLeft,  TicketPercent } from "lucide-react";
import StockForm from "./stock-form";
import Currency from "@/components/currency";
interface ProduitFormProps {
  initialData: any;
  sizes: Tailles[];
  colors: Couleurs[];
  models: Models[];
  familles: Famille[];
  categories: Categorie[];
}

const ProduitForm = ({
  initialData,
  sizes,
  colors,
  models,
  familles,
  categories,
}: ProduitFormProps) => {
  const [isPending, startTransition] = useTransition();

  const [open, setOpen] = useState(false);
  const router = useRouter();
  const params = useParams();

  const form = useForm<z.infer<typeof ProduitFormSchema>>({
    resolver: zodResolver(ProduitFormSchema),
    defaultValues: (initialData || {
      reference: "",
      nom: "",
      description: "",
      prix: 0,
      newCollection: false,
      archived: false,
      etat: "",
      model: "",
      stock: [],
      categorie: "",
      famille: "",
      images: [],
      promotion: 0,
      sousCategorie: "",
      longeur: "",
    }) as z.infer<typeof ProduitFormSchema>,
  });

  const onSubmit = async (data: z.infer<typeof ProduitFormSchema>) => {
    try {
      const formData = new FormData();
      formData.append("nom", data.nom);
      formData.append("description", data.description);
      formData.append("prix", data.prix.toString());
      formData.append("reference", data.reference);
      formData.append("newCollection", data.newCollection.toString());
      formData.append("archived", data.archived.toString());
      formData.append("etat", data.etat);
      formData.append("modele", data.model);
      formData.append("famille", data.famille);
      formData.append("categorie", data.categorie);
      formData.append("promotion", data.promotion.toString());
      formData.append("longeur", data.longeur);
      formData.append("stock", JSON.stringify(data.stock));

      data.images.forEach((image) => {
        if (image instanceof File)
          // @ts-ignore
          formData.append(`images-${image.index}`, image);
        else formData.append(`images-${image.index}`, JSON.stringify(image));
      });

      console.log("DATA  before the formDATA : ", data);

      console.log(
        "DATA SENT TO SERVER : ",
        Object.fromEntries(formData.entries())
      );

      startTransition(async () => {
        if (initialData) {
          await fetch(`/api/produit/${params.produitId}`, {
            method: "PATCH",
            body: formData,
          })
            .then((response) => response.json())
            .then((res) => {
              if (res.success) {
                // form.reset();
                toast.success(res.success);
                // router.push("/produits");
              } else if (res.error) {
                toast.error(res.error);
              }
            });
        } else {
          await fetch("/api/produit/", {
            method: "POST",
            body: formData,
          })
            .then((response) => response.json())
            .then((res) => {
              if (res.success) {
                toast.success(res.success);
                // router.push("/produits");
              } else if (res.error) {
                toast.error(res.error);
              }
            });
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className=" w-full   h-auto      ">
      {/* <div className="  m-4  no-print flex items-center justify-between   ">
        <PathSlash /> 
        <Link
          className="ml-auto"
          href={`/${params.boutiqueId}/gestionespece/Produit`}
        >
          <Button className="">
            <MoveLeft size={20} />
          </Button>
        </Link>
      </div> */}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-[1500px] h-full space-y-5 py-8         "
        >
          <div className="max-w-3xl overflow-auto  bg-white p-8 space-y-5   border border-primary  rounded-lg  ">
            <h4 className="font-medium">Général</h4>
            <Separator />

            <div className="flex  items-center   justify-start gap-5 max-w-xl">
              <FormField
                control={form.control}
                name="reference"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-start justify-center  ">
                    <FormLabel className="text-base">Référence</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder=""
                        className="max-w-[400px]"
                        type="text"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="nom"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-start justify-center  ">
                    <FormLabel className="text-base">Nom</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="max-w-[400px]"
                        disabled={isPending}
                        placeholder=" "
                        type="text"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="prix"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-start justify-center  ">
                    <FormLabel className="text-base">Prix</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value || ""}
                        className="max-w-[400px]"
                        disabled={isPending}
                        placeholder=""
                        type="number"
                        step="0.001"
                        min="0"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="max-w-xl">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Décrire le produit..."
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-start justify-start gap-5">
              <FormField
                control={form.control}
                name="newCollection"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border  w-[250px] bg-white p-4">
                    <FormControl>
                      <Checkbox
                        disabled={isPending}
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="cursor-pointer">
                        Nouvelle collection
                      </FormLabel>
                      <FormDescription>
                        Marquer le produit comme nouvelle collection
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="archived"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border  w-[250px] bg-white p-4">
                    <FormControl>
                      <Checkbox
                        disabled={isPending}
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="cursor-pointer">Archivé</FormLabel>
                      <FormDescription>
                        Marquer le produit comme archivé
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>
            <Table className="w-full  ">
              <TableBody className="w-full   flex items-center justify-start gap-5 max-w-xl  ">
                <TableRow className="w-full">
                  <TableCell>
                    <FormField
                      control={form.control}
                      name="etat"
                      render={({ field }) => (
                        <FormItem className="w-[150px]">
                          <FormLabel>Etat</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select Etat" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="En repture">
                                En repture
                              </SelectItem>
                              <SelectItem value="Disponible">
                                Disponible
                              </SelectItem>
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
                      name="longeur"
                      render={({ field }) => (
                        <FormItem className=" w-[150px]">
                          <FormLabel>Longeur</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select longeur" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Mini">Mini</SelectItem>
                              <SelectItem value="Midi">Midi</SelectItem>
                              <SelectItem value="Maxi">Maxi</SelectItem>
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
                      name="model"
                      render={({ field }) => (
                        <FormItem className=" w-[150px]">
                          <FormLabel>Modéle</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={
                              typeof field.value === "object"
                                ? (field.value as { name: string }).name
                                : field.value
                            }
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select Modéle" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {models.map((model) => (
                                <SelectItem key={model.id} value={model.name}>
                                  {model.name}
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
          <div className="max-w-3xl overflow-auto  bg-white p-8 space-y-5  border border-primary  rounded-lg  ">
            <h4 className="font-medium  ">Stock</h4>
            <Separator />
            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start justify-center  ">
                  <StockForm
                    initialData={field.value}
                    sizes={sizes}
                    colors={colors}
                    field={field}
                    isPending={isPending}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className=" bg-white  max-h-[500px] overflow-auto p-8 space-y-5    gap-5 max-w-3xl   border border-primary  rounded-lg  ">
            <h4 className="font-medium  ">Catégorie</h4>
            <Separator />
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <FormField
                      control={form.control}
                      name="famille"
                      render={({ field }) => (
                        <FormItem className=" w-[200px]  ">
                          <FormLabel>Famille</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            disabled={isPending}
                            defaultValue={
                              typeof field.value === "object"
                                ? (field.value as { name: string }).name
                                : field.value
                            }
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select famille" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {familles.map((famille: any) => (
                                <SelectItem
                                  key={famille.id}
                                  value={famille.name}
                                >
                                  {famille.name}
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
                      name="categorie"
                      render={({ field }) => (
                        <FormItem className=" w-[170px]  ">
                          <FormLabel>Categorie</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            disabled={isPending}
                            defaultValue={
                              typeof field.value === "object"
                                ? (field.value as { name: string }).name
                                : field.value
                            }
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select categorie" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {categories.map((categorie: any) => (
                                <SelectItem
                                  key={categorie.id}
                                  value={categorie.name}
                                >
                                  {categorie.name}
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
          <div className=" bg-white p-8 max-w-[900px] space-y-5 overflow-auto   border border-primary  rounded-lg  ">
            <h4 className="font-medium  ">Media</h4>
            <Separator />
            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start justify-start  ">
                  <DropZone initialData={initialData} field={field} />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className=" bg-white p-8 space-y-5 max-w-xl  border border-primary  rounded-lg  ">
            <FormField
              control={form.control}
              name="promotion"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start justify-center  ">
                  <div className="flex gap-6">
                    <FormLabel className="text-base">
                      Promotion % (Optionnel)
                    </FormLabel>
                    {form.watch("promotion") > 0 &&
                      form.watch("promotion") <= 100 &&
                      form.watch("prix") > 0 && (
                        <span className="text-lg font-medium text-black">
                          <div className="flex gap-2 items-center    ">
                            <Currency
                              className="text-red-500 opacity-60 line-through"
                              value={form.watch("prix")}
                            />
                            <TicketPercent />
                            <Currency
                              value={form.watch("prix")}
                              promotion={form.watch("promotion")}
                            />
                          </div>
                        </span>
                      )}
                  </div>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value || ""}
                      className="max-w-[400px]"
                      disabled={isPending}
                      placeholder="0 %"
                      type="number"
                      step="0.001"
                      min="0"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
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

export default ProduitForm;
