"use client";
import Currency from "@/components/currency";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import useCart from "@/hooks/use-cart";
import useFavorites from "@/hooks/use-favorites";
import { ChevronRight, Heart, Minus, Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { placeholderImgs } from "@/data/placeholder";
const CartSheet = () => {
  const cart = useCart();

  const isEmpty = cart.items.length === 0;

  const favoris = useFavorites();
  const router = useRouter();
  const [isImageReady, setIsImageReady] = useState(false);

  const onLoadCallBack = (e: any) => {
    setIsImageReady(true);
  };
  const totalOrders = cart.items.reduce((acc,item)=>{
      return acc + item.prixFinal! * item.quantity
  },0)

 

  return (
    <Sheet open={cart.open} onOpenChange={(open) => cart.setOpen(open)}>
      <SheetContent>
        <SheetHeader className="mt-4 space-y-3">
          <div className="  flex items-center justify-between">
            <SheetTitle>
              <span className="text-[#F05F4B] text-xl">
                Panier ({cart.items.length})
              </span>
            </SheetTitle>
            <Button
              className="border border-neutral-600 rounded-[30px] p-1 px-3  space-x-2"
              variant={"ghost"}
              onClick={() => {
                router.push("/favorites");
                cart.setOpen(false);
              }}
            >
              <Heart size={15} fill="red" className="text-red-500 " />
              <span>Favoris ({favoris.items.length})</span>
            </Button>
          </div>
          <Separator></Separator>
          <SheetDescription className="text-start">
            Votre panier contient tous les articles sélectionnés. Vérifiez les
            détails avant de passer à la caisse.
          </SheetDescription>
          <Separator></Separator>
        </SheetHeader>

        {!isEmpty && (
          <div className="flex flex-col text-sm   overflow-auto max-h-[300px] lg:max-h-[500px]  gap-4 mt-3">
            {cart.items.map((item) => (
              <div
                key={item.id+item.selectedCouleur+item.selectedTaille}
                className="flex items-stretch justify-between    gap-3 border-b border-neutral-200 pb-3"
              >
                <div className="relative h-[120px] w-[200px]    ">
                  {placeholderImgs && placeholderImgs[0].path !== undefined ? (
                    <Image
                      // src={`http://localhost:3001${item.images[0].path}`}
                      src={placeholderImgs[0].path}
                      fill
                      alt="img"
                      sizes="100"
                      style={{
                        opacity: 1,
                        transition: "opacity 0.5s",
                      }}
                      onLoad={(image) => {
                        onLoadCallBack(image);
                      }}
                      className="object-cover object-center     h-auto w-full rounded-md   "
                    ></Image>
                  ) : (
                    <div className="w-full h-full bg-black " />
                  )}

                  <span></span>
                </div>
                <div className="  w-full   flex flex-col gap-1 ">
                  <h6>{item.nom}</h6>
                  <span className="text-sm text-neutral-500">
                    couleur : {item.selectedCouleur}
                  </span>
                  <span className="text-sm text-neutral-500">
                    Taille : {item.selectedTaille}
                  </span>
                  <Currency
                    promotion={item.promotion}
                    className="text-accent text-md my-auto  "
                    value={item.prix}
                  />
                </div>
                <div className="flex flex-col items-center justify-between         ">
                  <div className="flex  gap-2 items-center justify-center ">
                    <Button
                      variant={"ghost"}
                      size={"icon"}
                      onClick={() => cart.removeItem(item)}
                    >
                      <Minus size={17} />
                    </Button>

                    <span className="text-lg text-black">
                      {cart.getItem(item)?.quantity}
                    </span>

                    <Button
                      variant={"ghost"}
                      size={"icon"}
                      onClick={() =>
                        cart.addItem({
                          ...item,
                          quantity: cart.getItem(item)?.quantity || 0 + 1,
                        })
                      }
                    >
                      <Plus size={17} />
                    </Button>
                  </div>
                  <Button
                    variant={"ghost"}
                    className="space-x-2"
                    onClick={() => cart.removeItem(item, true)}
                  >
                    <span>Supprimer</span>
                    <Trash2 size={17} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {!isEmpty && (
          <div>
            <div className="mt-4 ">
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-500">Sous Total </span>
                <Currency
                  value={totalOrders}
                  className="text-sm text-neutral-500"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-500">Livraison </span>
                <Currency value={7} className="text-sm text-neutral-500" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg">Total TTC : </span>
                <Currency
                  value={totalOrders + 7}
                  className="text-accent text-lg font-medium"
                />
              </div>

              <Button
                onClick={() => {
                  router.push("/order");
                  cart.setOpen(false);
                }}
                size={"lg"}
                className="bg-[#F05F4B] text-white   hover:text-white mt-8 w-full"
                variant={"ringHover"}
              >
                Commander <ChevronRight size={20} />
              </Button>
            </div>{" "}
          </div>
        )}
        {isEmpty && (
          <div className="my-4">
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
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
