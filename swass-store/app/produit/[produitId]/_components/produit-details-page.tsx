"use client";
import { GetListCouleursType, GetProduitType } from "@/server/server-only";
import { ProduitCarousel } from "./produit-carousel";
import Currency from "@/components/currency";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingBag } from "lucide-react";
import useCart from "@/hooks/use-cart";
import useFavorites from "@/hooks/use-favorites";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const ProduitDetailsPage = ({
  produit,
  codeCouleurs,
  outOfStock,
}: {
  produit: GetProduitType;
  codeCouleurs: GetListCouleursType;
  outOfStock: boolean;
}) => {
  const isInStock = (name: string, type: "color" | "size") => {
    let found;
    if (type === "color") {
      found = produit.stock.find(
        (stockItem) => stockItem.couleurId === name && stockItem.stock > 0
      );
    } else {
      found = produit.stock.find(
        (stockItem) => stockItem.tailleId === name && stockItem.stock > 0
      );
    }
    return found ? true : false;
  };

  const cart = useCart();
  const favoris = useFavorites();
  const tailleArray = [
    ...new Set(
      produit.stock.reduce((acc: string[], stockItem) => {
        if (isInStock(stockItem.tailleId, "size")) {
          acc.push(stockItem.tailleId);
        }
        return acc;
      }, [])
    ),
  ];
  const couleurArray = codeCouleurs.reduce((acc: string[], couleur) => {
    if (isInStock(couleur.name, "color")) {
      acc.push(couleur.name);
    }
    return acc;
  }, []);

  const [coul, setCoul] = useState<string>("");
  const [size, setSize] = useState<string>("");
  const [couleurError, setCouleurError] = useState<string>("");
  const [tailleError, setTailleError] = useState<string>("");
  const [validColors, setValidColors] = useState<string[]>(couleurArray);
  const [validSizes, setValidSizes] = useState<string[]>(tailleArray);

  useEffect(() => {
    if (coul) {
      const sizesAvailable = produit.stock
        .filter(
          (stockItem) => stockItem.couleurId === coul && stockItem.stock > 0
        )
        .map((stockItem) => stockItem.tailleId);
      setValidSizes(sizesAvailable);
      return;
    }

    if (size) {
      const colorsAvailable = produit.stock
        .filter(
          (stockItem) => stockItem.tailleId === size && stockItem.stock > 0
        )
        .map((stockItem) => stockItem.couleurId);
      setValidColors(colorsAvailable);
    }
  }, [coul, size]);

  return (
    <section className="flex flex-col lg:flex-row items-center lg:items-start lg:mt-16 justify-center  ">
      <ProduitCarousel produit={produit} />
      <div className="flex   flex-grow max-w-lg  flex-col lg:gap-5">
        <div className="bg-white rounded-md p-8 ">
          <div className="font-medium flex flex-col gap-3">
            <h3 className="">{produit.nom}</h3>
            <span className="text-neutral-500">
              Référence : {produit.reference}
            </span>
            {outOfStock ? (
              <span className="text-red-500">En rupture de stock</span>
            ) : (
              <div className="space-y-3">
                <Currency
                  className="text-xl text-accent/80"
                  value={produit.prix}
                />

                <Separator />
                <div className="space-y-3">
                  <h4>Couleur</h4>
                  <div className="flex gap-2">
                    {codeCouleurs.map((couleur) => (
                      <button
                        disabled={!validColors.includes(couleur.name)}
                        onClick={() => {
                          if (coul === couleur.name) {
                            setCoul("");
                            setValidSizes(tailleArray);
                            return;
                          }
                          setCoul(couleur.name);
                          setCouleurError("");
                        }}
                        key={couleur.id}
                        style={{ backgroundColor: couleur.code }}
                        className={cn(
                          "w-10 h-10 aspect-square  relative rounded-sm border    ",
                          !validColors.includes(couleur.name) &&
                            "opacity-50 cursor-not-allowed ",
                          couleur.name == coul &&
                            "       ring-2  ring-[#F05F4B] ring-offset-2"
                        )}
                      >
                        {!validColors.includes(couleur.name) && (
                          <span className="w-[.5px] h-full absolute top-0 left-1/2 rotate-45 bg-orange-700" />
                        )}
                      </button>
                    ))}
                  </div>
                  {couleurError && (
                    <span className="text-red-500 mt-4 text-sm">
                      {couleurError}
                    </span>
                  )}
                </div>

                <Separator />
                <div className="space-y-3">
                  <h4>Taille</h4>
                  <div className="flex gap-2  ">
                    {tailleArray.map((taille) => (
                      <button
                        disabled={!validSizes.includes(taille)}
                        onClick={() => {
                          if (size === taille) {
                            setSize("");
                            setValidColors(couleurArray);
                            return;
                          }
                          setSize(taille);
                          setTailleError("");
                        }}
                        key={taille}
                        className={cn(
                          "min-w-10 h-10  px-2 relative   rounded-sm bg-[#D9D9D9] text-base font-medium text-black text-center flex items-center justify-center",
                          !validSizes.includes(taille) &&
                            " opacity-50 cursor-not-allowed ",
                          taille == size &&
                            "    ring-2  ring-[#F05F4B] ring-offset-2"
                        )}
                      >
                        <span>{taille}</span>
                        {!validSizes.includes(taille) && (
                          <span className="w-[.5px] h-full absolute top-0 left-1/2 rotate-45 bg-orange-700" />
                        )}
                      </button>
                    ))}
                  </div>
                  {tailleError && (
                    <span className="text-red-500 mt-4 text-sm">
                      {tailleError}
                    </span>
                  )}
                </div>
              </div>
            )}

            <div className="flex w-full mt-8   max-w-sm gap-2">
              <Button
                variant={"ringHover"}
                disabled={outOfStock}
                onClick={() => {
                  if (!coul) {
                    setCouleurError("Veuillez sélectionner une couleur");
                    return;
                  } else if (!size) {
                    setTailleError("Veuillez sélectionner une taille");
                    return;
                  } else
                    cart.addItem({
                      ...produit,
                      quantity: 1,
                      selectedCouleur: coul,
                      selectedTaille: size,
                    });
                  cart.setOpen(true);
                }}
                className="bg-[#F05F4B] flex items-center justify-center gap-2 hover:bg-[#F05F4B]   hover:text-white text-white flex-grow"
              >
                Ajouter au panier
                <ShoppingBag className="" size={17} />
              </Button>
              <Button
                onClick={() => favoris.addItem(produit)}
                variant={"ghost"}
                className="border   text-accent"
                size={"icon"}
              >
                {favoris.items.find((item) => item.id === produit.id) ? (
                  <Heart
                    strokeWidth={1.2}
                    size={22}
                    className="text-pink-500"
                  />
                ) : (
                  <Heart strokeWidth={1.2} size={22} />
                )}
              </Button>
            </div>
          </div>
        </div>
        <Tabs
          defaultValue="Description"
          className="  w-full rounded-md  bg-white"
        >
          <TabsList className="w-full bg-white   ">
            <TabsTrigger
              className="data-[state=active]:border-[#F05F4B] border-b rounded-none text-md  w-1/2"
              value="Description"
            >
              Description
            </TabsTrigger>
            <TabsTrigger
              className="data-[state=active]:border-[#F05F4B] border-b rounded-none text-md  w-1/2"
              value="Livraison"
            >
              Livraison
            </TabsTrigger>
          </TabsList>
          <TabsContent className="text-sm" value="Description">
            <div className="p-4">
              <p className="text-neutral-500">
                {produit.description} une solution rapide et fiable pour
                acheminer les commandes à travers le monde. En tant que service
                de logistique reconnu, Aramex propose des options de livraison
                express, standard, et économiques, adaptées aux besoins des
                clients. Grâce à un suivi en temps réel,
              </p>
            </div>
          </TabsContent>
          <TabsContent className="text-sm" value="Livraison">
            <div className="p-4">
              <p className="text-neutral-500">
                une solution rapide et fiable pour acheminer les commandes à
                travers le monde. En tant que service de logistique reconnu,
                Aramex propose des options de livraison express, standard, et
                économiques, adaptées aux besoins des clients. Grâce à un suivi
                en temps réel,
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default ProduitDetailsPage;
