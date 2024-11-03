"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { StoreOrderSchemaAdmin } from "@/schemas/settings";
import { AlertCircle, RefreshCcw, ShoppingBag, SquarePen } from "lucide-react";

import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import SmallSpinner from "@/components/small-spinner";

import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { MapIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import * as React from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import {
  Credenza,
  CredenzaTrigger,
  CredenzaContent,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaDescription,
  CredenzaBody,
  CredenzaFooter,
  CredenzaClose,
} from "@/components/credenza";
import {
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";
import { Label } from "@/components/ui/label";

interface OrderFormProps {
  initialData: z.infer<typeof StoreOrderSchemaAdmin> | null;
}

const StoreOrderFrom = ({ initialData }: OrderFormProps) => {
  const [isPending, setIsPending] = useState(false);

  const [open, setOpen] = useState(false);
  const router = useRouter();
  const params = useParams();

  const form = useForm<z.infer<typeof StoreOrderSchemaAdmin>>({
    resolver: zodResolver(StoreOrderSchemaAdmin),
    defaultValues: initialData || {
      name: "",
      email: "",
      phone: "",
      infoSupp: "",
      items: [],
    },
  });

  const onSubmit = (data: z.infer<typeof StoreOrderSchemaAdmin>) => {
    console.log(data);
    try {
      setIsPending(true);
      fetch(`/api/customer/${params.orderId}`, {
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
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-[1500px] h-full space-y-5 py-8         "
        >
          {initialData && <OrderItemsForm initialData={initialData} />}

          <div className="max-w-3xl  bg-white p-8 space-y-5   border border-primary  rounded-lg  ">
            <h4 className="font-medium flex items-center justify-start gap-2">
              Contact Client <MapIcon />
            </h4>
            <Separator />
            {initialData ? (
              <section className="space-y-3">
                <div className="flex text-black items-center justify-start w-full   gap-5">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="w-1/2">
                        <FormLabel>Nom</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Taper le nom de client"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex text-black items-center justify-start w-full   gap-5">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="w-1/2">
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Taper votre ville" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="infoSupp"
                    render={({ field }) => (
                      <FormItem className="w-1/2">
                        <FormLabel>information supplémentaire</FormLabel>
                        <FormControl>
                          <Input placeholder="" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

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
              </section>
            ) : (
              <AddClientOrder />
            )}
            {initialData && (
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
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default StoreOrderFrom;

const AddClientOrder = () => {
  const [createNewClient, setCreateNewClient] = React.useState(true);
  const [nom, setNom] = React.useState("");
  const [prenom, setPrenom] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [infoSupp, setInfoSupp] = React.useState("");
  const [isPending, setIsPending] = React.useState(false);
  const router = useRouter();
  const onSubmitNewClient = async () => {
    setIsPending(true);
    try {
      const response = await fetch(`/api/store-order`, {
        body: JSON.stringify({
          newClient: true,
          nom: nom,
          prenom: prenom,
          email: email,
          phone: phone,
          infoSupp: infoSupp,
        }),
        method: "POST",
      });
      const data = await response.json();

      if (data.success) {
        router.push(`/store-orders/${data.orderId}`);
        toast.success(data.success);
      } else if (data.error) {
        toast.error(data.error);
        setIsPending(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="space-y-3 max-w-[400px]">
      <div className="flex items-center justify-between  ">
        <Label className=" ">Nouveau Client</Label>
        <Button
          type="button"
          className="flex items-center justify-center gap-2 "
          onClick={() => setCreateNewClient(!createNewClient)}
        >
          {createNewClient ? "Non" : "Oui"}
          <RefreshCcw size={20}></RefreshCcw>
        </Button>
      </div>
      <Separator />
      {!createNewClient ? (
        <ClientComboBox />
      ) : (
        <>
          <div className="flex items-center justify-between  ">
            <Label className=" ">Nom</Label>
            <Input
              className="w-1/2"
              value={nom}
              placeholder="Nom"
              onChange={(ev) => {
                setNom(ev.target.value);
              }}
            />
          </div>

          <div className="flex items-center justify-between ">
            <Label className=" ">Prenom</Label>
            <Input
              className="w-1/2"
              value={prenom}
              placeholder="Prenom"
              onChange={(ev) => {
                setPrenom(ev.target.value);
              }}
            />
          </div>

          <div className="flex items-center justify-between ">
            <Label className=" ">Email</Label>
            <Input
              className="w-1/2"
              value={email}
              placeholder="Email"
              onChange={(ev) => {
                setEmail(ev.target.value);
              }}
            />
          </div>

          <div className="flex items-center justify-between ">
            <Label className=" ">Téléphone</Label>
            <Input
              className="w-1/2"
              value={phone}
              placeholder="Téléphone"
              onChange={(ev) => {
                setPhone(ev.target.value);
              }}
            />
          </div>

          <div className="flex items-center justify-between ">
            <Label className=" ">Info Supp</Label>
            <Input
              className="w-1/2"
              value={infoSupp}
              placeholder="Information supp"
              onChange={(ev) => {
                setInfoSupp(ev.target.value);
              }}
            />
          </div>
          <Button
            type="button"
            className="flex items-center justify-center gap-2 "
            onClick={() => onSubmitNewClient()}
          >
            Ajouter
          </Button>
        </>
      )}
    </section>
  );
};

const OrderItemsForm = ({ initialData }: OrderFormProps) => {
  return (
    <div className="space-y-5">
      <div className="max-w-3xl  bg-white p-4 px-8 space-y-5     border border-primary  rounded-lg  ">
        <h4 className="font-medium flex items-center justify-start gap-2">
          Produits <ShoppingBag size={22} />
        </h4>
        <RefComboBox />
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
              {initialData?.items &&
                initialData?.items.map((item) => (
                  <TableRow
                    key={item.productId + item.couleurId + item.tailleId}
                    className="   "
                  >
                    <TableCell className=" size-[70px]  relative     ">
                      {item.images[0] !== undefined && (
                        <Image
                          src={
                            process.env.NEXT_PUBLIC_MEDIA_URL + item.images[0]
                          }
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
                      <span className="text-sm">{item.ref}</span>
                      <span className="text-xs">{item.nom}</span>
                      <div className="flex gap-1">
                        <span>{item.tailleId}</span>
                        <span>|</span>
                        <span>{item.couleurId}</span>
                      </div>
                    </TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.prixfinal}</TableCell>
                    <TableCell className="text-right">
                      {item.prixfinal * item.quantity}
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
                              prodData={{
                                oldProdref: item.ref,
                                oldQte: item.quantity,
                                oldCouleurId: item.couleurId,
                                oldTailleId: item.tailleId,
                              }}
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
                ))}
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

interface ProdData {
  oldProdref: string;
  oldQte: number;
  oldCouleurId: string;
  oldTailleId: string;
}

interface RefComboBoxProps {
  prodData?: ProdData;
}

const RefComboBox: React.FC<RefComboBoxProps> = ({ prodData }) => {
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
    setIsPending(true);
    try {
      if (!prodData) {
        fetch(`/api/order/${params.orderId}/orderItem`, {
          body: JSON.stringify({
            selectedProd,
            selectedInfo,
            newQte,
          }),
          method: "POST",
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
      } else {
        fetch(`/api/order/${params.orderId}/orderItem`, {
          body: JSON.stringify({
            selectedProd,
            selectedInfo,
            oldProdref: prodData.oldProdref,
            newQte,
            oldQte: prodData.oldQte,
            oldCouleurId: prodData.oldCouleurId,
            oldTailleId: prodData.oldTailleId,
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
      }
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
      {prodData ? (
        <h5>Modifier le Produit : {prodData.oldProdref}</h5>
      ) : (
        <h5>Ajouter un produit</h5>
      )}
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
        {prodData ? "Modifier" : "Ajouter"}
        {isPending && <SmallSpinner />}
      </Button>
    </div>
  );
};

const ClientComboBox = () => {
  const [open, setOpen] = React.useState(false);
  const [phone, setPhone] = React.useState("");
  const [name, setName] = React.useState("");
  const [clients, setClients] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();
  const [isPending, setIsPending] = React.useState(false);

  const debouncedPhone = useDebounce(phone, 500);
  const debouncedName = useDebounce(name, 500);

  const onSubmit = async (clientId: string) => {
    setIsPending(true);
    try {
      const response = await fetch(`/api/store-order`, {
        body: JSON.stringify({
          newClient: false,
          clientId: clientId,
        }),
        method: "POST",
      });
      const data = await response.json();

      if (data.success) {
        router.push(`/store-orders/${data.orderId}`);
        toast.success(data.success);
      } else if (data.error) {
        toast.error(data.error);
        setIsPending(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  function fetchClients() {
    try {
      fetch(`/api/customer?phone=${debouncedPhone}&name=${debouncedName}`)
        .then((res) => res.json())
        .then((data) => {
          setClients(data);
          setIsLoading(false);
        });
    } catch (err) {
      console.log(err);
      setIsLoading(false); // Ensure loading state is reset on error
    }
  }

  React.useEffect(() => {
    if (debouncedPhone) {
      setIsLoading(true);
      fetchClients();
    }
    if (debouncedName) {
      setIsLoading(true);
      fetchClients();
    }
  }, [debouncedPhone, debouncedName]);

  return (
    <div className="   max-w-[400px]  flex flex-col gap-5">
      <div className=" space-y-2">
        <div className="flex   gap-2  ">
          <div className="w-full">
            <label className="text-neutral-500 text-sm">Nom</label>
            <Input
              className="w-full"
              value={name}
              disabled={isPending}
              // onBlur={() => setOpen(false)}
              onChange={(ev) => {
                setName(ev.target.value);
                setOpen(true);
              }}
            />
          </div>
          <div className="w-full">
            <label className="text-neutral-500 text-sm"> Téléphone</label>
            <Input
              className="w-full"
              value={phone}
              disabled={isPending}
              // onBlur={() => setOpen(false)}
              onChange={(ev) => {
                setPhone(ev.target.value);
                setOpen(true);
              }}
            />
          </div>
        </div>

        {open && (
          <div className=" bg-white border  rounded-md w-[300px]   z-50  ">
            {isLoading ? (
              <div className="w-full h-full flex p-8 items-center justify-center">
                <SmallSpinner className=" h-7 w-7" />
              </div>
            ) : (
              <div className="flex flex-col gap-2 items-start justify-start w-full h-full overflow-y-auto p-4">
                {clients.length === 0 && (
                  <div className="flex items-center justify-center w-full h-full">
                    <span className="text-sm text-neutral-500">
                      Aucun produit trouvé
                    </span>
                  </div>
                )}

                {clients.map((item: any) => (
                  <button
                    className=" hover:bg-secondary w-full transition-colors "
                    onClick={() => {
                      onSubmit(item.id);
                      setOpen(false);
                    }}
                    key={item.id}
                  >
                    {item.name} - {item.phone}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
