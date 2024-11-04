"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { useEffect, useRef, useState, useTransition } from "react";
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
import Image from "next/image";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";

import { Separator } from "@/components/ui/separator";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { CheckCheck, ChevronLeft, ChevronRight, Pen } from "lucide-react";
import Reveal from "@/components/reveal";
import useOrderForm from "@/hooks/use-order";
import { OrderSchema } from "@/schemas/settings";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import useCart from "@/hooks/use-cart";
import Currency from "@/components/currency";
import toast from "react-hot-toast";
import SmallSpinner from "@/components/small-spinner";
import { Navigation } from "@/components/navigation";
import { placeholderImgs } from "@/data/placeholder";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface OrderFormProps {
  initialData: z.infer<typeof OrderSchema>;
  selectedGroup: keyof z.infer<typeof OrderSchema>;
}

const OrderForm = ({ initialData, selectedGroup }: OrderFormProps) => {
  const cart = useCart();
  const router = useRouter();
  const [cartEmptyOpen, setCartEmptyOpen] = useState(
    cart.items.length === 0 ? true : false
  );
  const [selected, setSelected] = useState(selectedGroup);
  const [isPending, startTransition] = useTransition();
  const [editAddress, setEditAddress] = useState(false);
  const [ordrerPassed, setOrderPassed] = useState(false);
  const globalForm = useOrderForm();
  const ref = useRef<HTMLDivElement>(null);

  const form = useForm<z.infer<typeof OrderSchema>>({
    defaultValues: initialData,
    resolver: zodResolver(OrderSchema),
  });

  const onSubmit = async (values: z.infer<typeof OrderSchema>) => {
    const order = {
      orderInfo: values,
      orderedItems: cart.items,
    };
    try {
      startTransition(async () => {
        await fetch("http://localhost:3001/api/order", {
          method: "POST",
          body: JSON.stringify(order),
        })
          .then((response) => response.json())
          .then((res) => {
            if (res.success) {
              form.reset();
              // cart.removeAll();
              // setOrderPassed(true);
              toast.success(res.success);
            } else if (res.error) {
              toast.error(res.error);
            }
          });
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleNext = (
    current: keyof z.infer<typeof OrderSchema>,
    next: keyof z.infer<typeof OrderSchema>
  ) => {
    scrollToRef();
    form.trigger(current).then((isValid) => {
      if (isValid) {
        globalForm.setField(current, "completed", true);
        setSelected(next);
        globalForm.setSelectedGroup(next as keyof typeof globalForm.orderForm);
      } else {
        globalForm.setField(current, "completed", false);
      }
    });
  };

  const scrollToRef = () => {
    if (ref.current) ref.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (cart.items.length === 0) {
      setCartEmptyOpen(true);
    }
  }, [cart.items.length, ordrerPassed]);

  if (cart.items.length === 0) {
    return (
      <AlertDialog open={true} onOpenChange={setCartEmptyOpen}>
        <AlertDialogContent className="flex items-start justify-center rounded-md  w-[300px] lg:w-[400px] ">
          <AlertDialogHeader className="hidden">
            <AlertDialogTitle>
              {ordrerPassed ? "Commande passée" : "Panier vide"}
            </AlertDialogTitle>
            <AlertDialogDescription>dec</AlertDialogDescription>
          </AlertDialogHeader>

          <div className="   w-full  bg-white  rounded-lg">
            <div className="space-y-5">
              <h6 className="text-center text-lg">
                {ordrerPassed ? "Commande passée avec succès !" : "Panier vide"}
              </h6>
              <p className="text-center text-sm text-neutral-500">
                {ordrerPassed
                  ? "Votre commande a été passée avec succès ! Un conseiller vous contactera par téléphone sous peu pour confirmer les détails de votre commande. Merci pour votre confiance et à très bientôt !"
                  : "Commencez à ajouter des articles à votre panier"}
              </p>
            </div>
            <Button
              onClick={() => {
                router.push("/vetements");
                cart.setOpen(false);
              }}
              size={"lg"}
              className="bg-[#F05F4B] text-white   hover:text-white mt-8 w-full"
              variant={"ringHover"}
            >
              Voir Collection <ChevronRight size={20} />
            </Button>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    );
  } else
    return (
      <div ref={ref} className="w-[95%] m-auto     z-30 px-4   lg:mt-5">
        <Navigation pathArr={["Commander"]} />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="  flex flex-col  "
          >
            <Tabs defaultValue={selected} value={selected}>
              <TabsList className="relative flex items-center justify-center px-4 bg-white text-accent h-[80px]  lg:h-[150px] rounded-xl">
                <div className="h-[50px] flex items-center justify-between  relative  w-[90%]">
                  <Separator className=" absolute z-10 inset-x-0 top-1/2 lg:top-1/3 w-[90%] bg-[#D9D9D9]  m-auto h-[1px]" />

                  <TabLabel
                    index={3}
                    completed={globalForm.orderForm.address.completed}
                    value={"address"}
                    selected={selected}
                    label="Address"
                  />

                  <TabLabel
                    index={2}
                    completed={globalForm.orderForm.modeLivraison.completed}
                    value={"modeLivraison"}
                    selected={selected}
                    label="Mode de Livraison"
                  />

                  <TabLabel
                    index={4}
                    completed={globalForm.orderForm.modePaiement.completed}
                    value={"modePaiement"}
                    selected={selected}
                    label="Paiement"
                  />
                </div>
              </TabsList>
              <Reveal key={selectedGroup}>
                <div className="flex flex-col lg:flex-row  lg:gap-10   w-full ">
                  <div className=" mt-4  flex-grow max-w-2xl  ">
                    <TabsContent
                      className="  bg-white p-8 rounded-lg space-y-5"
                      value="address"
                    >
                      <h3 className=" text-[#F05F4B]">2. Adresse</h3>

                      <p>
                        L'adresse sélectionnée sera utilisée à la fois comme
                        adresse personnelle (pour la facturation) et comme
                        adresse de livraison.
                      </p>

                      {editAddress ? (
                        <div className="space-y-3">
                          <div className="border rounded-xl p-4">
                            <div className="flex items-center justify-between">
                              <h4>Mon Adresse</h4>
                              <Button
                                onClick={() => setEditAddress(!editAddress)}
                                className="space-x-2"
                                variant={"outline"}
                              >
                                <span>Modifier</span> <Pen size={17} />
                              </Button>
                            </div>
                            <div>
                              <dl className="max-w-md text-sm text-gray-900 divide-y space-y-2 divide-gray-200 dark:text-white dark:divide-gray-700">
                                <div className="flex flex-col pb-3">
                                  <dt className="mb-1 text-gray-500   dark:text-gray-400">
                                    Nom
                                  </dt>
                                  <dd className="  font-medium">
                                    {initialData.address.nom}
                                  </dd>
                                </div>
                                <div className="flex flex-col py-3">
                                  <dt className="mb-1 text-gray-500   dark:text-gray-400">
                                    Prénom
                                  </dt>
                                  <dd className=" font-medium">
                                    {initialData.address.prenom}
                                  </dd>
                                </div>
                                <div className="flex flex-col pt-3">
                                  <dt className="mb-1 text-gray-500   dark:text-gray-400">
                                    Adresse
                                  </dt>
                                  <dd className=" font-medium">
                                    {initialData.address.location}
                                  </dd>
                                </div>
                                <div className="flex flex-col pt-3">
                                  <dt className="mb-1 text-gray-500   dark:text-gray-400">
                                    Ville
                                  </dt>
                                  <dd className=" font-medium">
                                    {initialData.address.city}
                                  </dd>
                                </div>
                                <div className="flex flex-col pt-3">
                                  <dt className="mb-1 text-gray-500   dark:text-gray-400">
                                    Code Postale
                                  </dt>
                                  <dd className=" font-medium">
                                    {initialData.address.postalCode}
                                  </dd>
                                </div>
                                <div className="flex flex-col pt-3">
                                  <dt className="mb-1 text-gray-500   dark:text-gray-400">
                                    Pays
                                  </dt>
                                  <dd className=" font-medium">
                                    {initialData.address.country}
                                  </dd>
                                </div>
                                <div className="flex flex-col pt-3">
                                  <dt className="mb-1 text-gray-500   dark:text-gray-400">
                                    Téléphone
                                  </dt>
                                  <dd className=" font-medium">
                                    {initialData.address.phone}
                                  </dd>
                                </div>
                                {initialData.address.phone2 && (
                                  <div className="flex flex-col pt-3">
                                    <dt className="mb-1 text-gray-500   dark:text-gray-400">
                                      Téléphone 2
                                    </dt>
                                    <dd className=" font-medium">
                                      {initialData.address.phone2}
                                    </dd>
                                  </div>
                                )}
                              </dl>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <>
                          <Separator></Separator>
                          <AddressForm form={form} />
                        </>
                      )}

                      <div className="flex justify-end ">
                        <div className="flex gap-5">
                          <Button
                            onClick={() =>
                              handleNext("address", "modeLivraison")
                            }
                            type="button"
                            className="mt-8   w-[120px] h-[50px] flex items-center justify-center gap-2"
                          >
                            Next <ChevronRight size={20} />
                          </Button>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent
                      className="  bg-white p-8 rounded-lg space-y-5"
                      value="modeLivraison"
                    >
                      <div className="pb-3 space-y-3">
                        <h3 className=" text-[#F05F4B]">
                          2. Mode de Livraison
                        </h3>
                        <p>
                          Veuillez sélectionner votre mode de livraison préféré
                          pour recevoir votre commande.
                        </p>
                      </div>
                      <ModeLivraisonForm form={form} />
                      <div className="flex justify-end ">
                        <div className="flex gap-5">
                          <Button
                            variant={"outline"}
                            onClick={() => {
                              setSelected("address");
                              globalForm.setSelectedGroup("address");
                              scrollToRef();
                            }}
                            type="button"
                            className="mt-8 w-[120px] h-[50px] flex items-center justify-center gap-2"
                          >
                            <ChevronLeft size={20} /> Précédent
                          </Button>
                          <Button
                            onClick={() =>
                              handleNext("modeLivraison", "modePaiement")
                            }
                            type="button"
                            className="mt-8   w-[120px] h-[50px] flex items-center justify-center gap-2"
                          >
                            Next <ChevronRight size={20} />
                          </Button>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent
                      className="  bg-white p-8 rounded-lg space-y-5"
                      value="modePaiement"
                    >
                      <div className="relative pb-3 space-y-3">
                        <h3 className=" text-[#F05F4B]">3. Mode de Paiement</h3>
                        <p>
                          Veuillez choisir votre mode de paiement pour finaliser
                          votre commande.
                        </p>
                      </div>
                      <PaiementForm isPending={isPending} form={form} />
                      <div className="flex justify-end ">
                        <div className="flex gap-5">
                          <Button
                            variant={"outline"}
                            disabled={isPending}
                            onClick={() => {
                              setSelected("modeLivraison");
                              globalForm.setSelectedGroup("modeLivraison");
                              scrollToRef();
                            }}
                            type="button"
                            className="mt-8 w-[120px] h-[50px] flex items-center justify-center gap-2"
                          >
                            <ChevronLeft size={20} /> Précédent
                          </Button>
                          <Button
                            disabled={isPending}
                            type="submit"
                            className="mt-8   w-[120px] h-[50px] flex items-center justify-center gap-2"
                          >
                            {isPending ? <SmallSpinner /> : "Commander"}
                          </Button>
                        </div>
                      </div>
                    </TabsContent>
                  </div>
                  <div>
                    <OrderSummary />
                  </div>
                </div>
              </Reveal>
            </Tabs>
          </form>
        </Form>
      </div>
    );
};

export default OrderForm;

const TabLabel = ({
  selected,
  label,
  value,
  index,
  completed,
}: {
  index: number;
  completed: boolean | undefined;
  selected: string;
  label: string;
  value: string;
}) => {
  return (
    <div className="flex flex-col gap-2 items-center justiffy-center">
      <div
        className={cn(
          "  z-20 flex relative items-center justify-center gap-2 bg-[#D9D9D9] border text-center border-white  text-[#7C7C7C] font-medium  rounded-full  size-[40px] lg:size-[90px]",
          selected === value && " border-accent bg-white text-accent",
          completed && "bg-primary text-accent"
        )}
      >
        {completed && (
          <CheckCheck
            size={20}
            className="absolute text-accent -top-1 lg:top-0  lg:-right-3 -right-5"
          />
        )}
        <span className="text-lg">{index}</span>
      </div>
      <span className="  hidden lg:block ">{label}</span>
    </div>
  );
};

// const PersonalInfoForm = () => {
//   return (
//     <section className="max-w-2xl flex-col lg:flex-row   bg-white p-4 lg:p-8 rounded-lg flex items-stretch justify-center gap-5 ">
//       <div className="flex flex-col gap-5 w-full lg:max-w-sm lg:border-r lg:pr-8 border-[#D9D9D9] border-b lg:border-b-0 lg:pb-0 pb-8  ">
//         <h3 className="text-[#B3B3B3]">Commander en tant que Nouveau Client</h3>
//         <p className="text-black text-sm lg:text-base">
//           Créer un compte a de nombreux avantages :
//         </p>
//         <ul className="list-disc pl-8 text-black text-sm lg:text-base ">
//           <li>Suivre l'historique des commandes</li>
//           <li>Commander plus rapidement</li>
//         </ul>

//         <AuthButton
//           className="bg-[#00A91B] cursor-pointer text-white border border-none px-3 p-2 transition-colors hover:bg-green-500 rounded-md flex items-center justify-center gap-2  lg:ml-auto"
//           authMode="register"
//           redirectUrl="/order"
//         >
//           <span>
//             Créer un compte <ChevronRight size={20} />
//           </span>
//         </AuthButton>
//       </div>

//       <div className="  max-w-sm  flex flex-col gap-5">
//         <h3 className="text-[#B3B3B3]">Commander en utilisant votre compte</h3>
//         <p className="text-black text-sm lg:text-base">
//           Si vous avez un compte, voulez-vous vous authentifier pour suivre
//           votre commande
//         </p>

//         <AuthButton
//           className="bg-[#00A91B] cursor-pointer text-white border border-none px-3 p-2 transition-colors hover:bg-green-500 rounded-md flex items-center justify-center gap-2   lg:ml-auto mt-auto"
//           authMode="login"
//           redirectUrl="/order"
//         >
//           <span>
//             Connection <ChevronRight size={20} />
//           </span>
//         </AuthButton>
//       </div>
//     </section>
//   );
// };

const AddressForm = ({ form }: any) => {
  const globalForm = useOrderForm();

  return (
    <section className="space-y-3">
      <div className="flex text-black items-center justify-start w-full   gap-5">
        <FormField
          control={form.control}
          name="address.nom"
          render={({ field }) => (
            <FormItem className="w-1/2">
              <FormLabel>Nom</FormLabel>
              <FormControl>
                <Input
                  placeholder="Taper votre nom"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                    globalForm.setField("address", "nom", e.target.value);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address.prenom"
          render={({ field }) => (
            <FormItem className="w-1/2">
              <FormLabel>Prénom</FormLabel>
              <FormControl>
                <Input
                  placeholder="Taper votre prénom"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                    globalForm.setField("address", "prenom", e.target.value);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={form.control}
        name="address.country"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Pays</FormLabel>
            <FormControl>
              <Input
                placeholder="Taper votre pays"
                {...field}
                onChange={(e) => {
                  field.onChange(e.target.value);
                  globalForm.setField("address", "country", e.target.value);
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="address.city"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Ville</FormLabel>
            <FormControl>
              <Input
                placeholder="Taper votre ville"
                {...field}
                onChange={(e) => {
                  field.onChange(e.target.value);
                  globalForm.setField("address", "city", e.target.value);
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="address.location"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Adresse</FormLabel>
            <FormControl>
              <Input
                placeholder="Taper votre adresse"
                {...field}
                onChange={(e) => {
                  field.onChange(e.target.value);
                  globalForm.setField("address", "location", e.target.value);
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="address.postalCode"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Code Postale</FormLabel>
            <FormControl>
              <Input
                placeholder="Taper votre adresse"
                {...field}
                onChange={(e) => {
                  field.onChange(e.target.value);
                  globalForm.setField("address", "postalCode", e.target.value);
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="address.infoSupp"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Information supplémentaire</FormLabel>
            <FormControl>
              <Input
                placeholder="Si vous avez une remarque ou quelque chose à ajouter"
                {...field}
                onChange={(e) => {
                  field.onChange(e.target.value);
                  globalForm.setField("address", "infoSupp", e.target.value);
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="address.phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Téléphone</FormLabel>
            <FormControl>
              <Input
                placeholder="Taper votre Téléphone"
                {...field}
                onChange={(e) => {
                  field.onChange(e.target.value);
                  globalForm.setField("address", "phone", e.target.value);
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="address.phone2"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Téléphone 2 (Optionel)</FormLabel>
            <FormControl>
              <Input
                placeholder="Taper votre Téléphone 2"
                {...field}
                onChange={(e) => {
                  field.onChange(e.target.value);
                  globalForm.setField("address", "phone2", e.target.value);
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </section>
  );
};

const ModeLivraisonForm = ({ form }: any) => {
  const globalForm = useOrderForm();

  return (
    <section>
      <FormField
        control={form.control}
        name="modeLivraison.mode"
        render={({ field }) => (
          <FormItem className="">
            <FormControl>
              <RadioGroup
                onValueChange={(value) => {
                  field.onChange(value);
                  globalForm.setField("modeLivraison", "mode", value);
                }}
                defaultValue={field.value}
                className="     space-y-3"
              >
                <FormItem className="flex flex-col lg:flex-row items-start justify-start border flex-wrap max-w-xl  p-3 rounded-xl lg:items-center gap-5  space-y-0">
                  <div className="flex gap-3">
                    <FormControl>
                      <RadioGroupItem value="Retrait" />
                    </FormControl>
                    <FormLabel className="  text-accent">
                      Retrait en magasin - Nabeul
                    </FormLabel>
                  </div>
                  <FormDescription className=" max-w-[200px]   text-accent">
                    Avenue exemple exemple 8011, Nabeul
                  </FormDescription>
                  <span className="text-accent text-sm font-medium  ">
                    Gratuit
                  </span>
                </FormItem>

                <FormItem className="flex flex-col  lg:flex-row items-start justify-start border flex-wrap max-w-xl  p-3 rounded-xl lg:items-center gap-5  space-y-0">
                  <div className="flex gap-3">
                    <FormControl>
                      <RadioGroupItem value="Transporteur" />
                    </FormControl>
                    <FormLabel className=" text-nowrap text-accent">
                      Transporteur - Toute la Tunisie
                    </FormLabel>
                  </div>
                  <FormDescription className=" max-w-[200px] text-accent text-wrap">
                    Paiement à la livraison (Livraison gratuite à partir de 100
                    DT d'achat)
                  </FormDescription>
                  <span className="text-accent text-sm font-medium text-nowrap ">
                    7 DT
                  </span>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </section>
  );
};

const PaiementForm = ({ form, isPending }: any) => {
  const globalForm = useOrderForm();

  return (
    <section>
      <FormField
        control={form.control}
        name="modePaiement.paiement"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <RadioGroup
                onValueChange={(value) => {
                  field.onChange(value);
                  globalForm.setField("modePaiement", "paiement", value);
                }}
                defaultValue={field.value}
                className="     space-y-3"
              >
                {/* <FormItem className="  flex border flex-wrap p-3 rounded-xl items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem disabled={isPending} value="carte" />
                  </FormControl>
                  <FormLabel className=" cursor-pointer text-accent">
                    Paiement par carte bancaire 
                  </FormLabel>
                </FormItem> */}

                <FormItem className="    flex border flex-wrap  p-3 rounded-xl items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem disabled={isPending} value="livraison" />
                  </FormControl>
                  <FormLabel className="cursor-pointer text-nowrap text-accent">
                    Payer à la livraison
                  </FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </section>
  );
};

const OrderSummary = () => {
  const cart = useCart();
  const router = useRouter();
  const totalOrders = cart.items
    .map(
      (item) => (item.prix - item.prix * (item.promotion / 100)) * item.quantity
    )
    .reduce((a, b) => a + b, 0);
  if (cart.items.length === 0)
    return (
      <div className=" max-w-[400px]   mt-6  bg-white p-8 rounded-lg">
        <div>
          <h6 className="text-center text-lg">Votre panier est vide</h6>
          <p className="text-center text-sm text-neutral-500">
            Commencez à ajouter des articles à votre panier
          </p>
        </div>
        <Button
          onClick={() => {
            router.push("/vetements");
            cart.setOpen(false);
          }}
          size={"lg"}
          className="bg-[#F05F4B] text-white   hover:text-white mt-8 w-full"
          variant={"ringHover"}
        >
          Voir Collection <ChevronRight size={20} />
        </Button>
      </div>
    );
  return (
    <div className="max-w-[400px]   mt-6  bg-white p-8 rounded-lg ">
      <div className="w-full space-y-2">
        <h5>{cart.items.length} Articles</h5>
        <Separator />
      </div>
      <div className="flex flex-col  gap-4 mt-3">
        <div className="max-h-[400px] overflow-auto flex flex-col  gap-4  ">
          {cart.items.map((item) => (
            <div
              key={item.id + item.selectedCouleur + item.selectedTaille}
              className="flex items-start justify-between gap-3 border-b border-neutral-200 pb-3"
            >
              <div className="relative size-[100px]  aspect-square   ">
                <Image
                  // src={`http://localhost:3001${item.images[0].path}`}
                  src={placeholderImgs[0].path}
                  fill
                  sizes="100"
                  alt="img"
                  className="object-contain     h-auto w-full  rounded-md "
                ></Image>
              </div>
              <div className="  w-full   flex flex-col gap-1">
                <h6>{item.nom}</h6>
                <span className="text-sm text-neutral-500">
                  couleur : {item.selectedCouleur}
                </span>
                <span className="text-sm text-neutral-500">
                  Taille : {item.selectedTaille}
                </span>
                <span className="text-sm text-neutral-500">
                  Quantité : {item.quantity}
                </span>
              </div>
              <Currency
                promotion={item.promotion}
                className="text-accent text-md my-auto  "
                value={item.prix}
              />
            </div>
          ))}
        </div>
        <div>
          <div className="flex items-center justify-between">
            <span className="text-base text-neutral-500">Sous Total </span>
            <Currency
              value={totalOrders}
              className="text-base text-neutral-500"
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-base text-neutral-500">Livraison </span>
            <Currency value={7} className="text-base text-neutral-500" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-lg">Total TTC : </span>
            <Currency
              value={totalOrders + 7}
              className="text-accent text-lg font-medium"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
