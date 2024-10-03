"use client";
import Currency from "@/components/currency";
import { Button } from "@/components/ui/button";
import { placeholderImgs } from "@/data/placeholder";
import useFavorites from "@/hooks/use-favorites";
import { cn } from "@/lib/utils";
import { GetProduitType } from "@/server/server-only";
import { Heart } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
const ProdItem = ({
  produit,
  cartButton,
  className,
}: {
  produit: GetProduitType;
  cartButton?: boolean;
  className?: string;
}) => {
  const [current, setCurrent] = useState(0);
  const router = useRouter();
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const rect = target.getBoundingClientRect();

    const width = rect.width;
    const mouseX = e.clientX - rect.left;
    const xPct = (mouseX / width) * 100;

    const part = Math.floor(100 / placeholderImgs.length);
    const current = Math.floor(xPct / part);
    if (current >= placeholderImgs.length) {
      setCurrent(current - 1);
      return;
    }
    if (current < 0) {
      setCurrent(0);
      return;
    }
    setCurrent(current);
  };
  const [isImageReady, setIsImageReady] = useState(false);

  const onLoadCallBack = (e: any) => {
    setIsImageReady(true);
  };
  return (
    <div
      className={cn(
        className,
        "   max-w-[217px]  cursor-pointer   flex flex-col items-center gap-3 justify-center rounded-t-md rounded-b-md    pb-3   "
      )}
      onClick={() => router.push("/produit/" + produit.reference)}
    >
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setCurrent(0)}
        className="relative h-[325px]  lg:h-[325px] w-full   "
      >
        {placeholderImgs[current]?.path !== undefined ? (
          <Image
            // src={`http://localhost:3001${placeholderImgs[current].path}`}
            src={`${placeholderImgs[current].path}`}
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
            className="object-cover object-center     h-auto w-full  rounded-sm   "
          ></Image>
        ) : (
          <Image
            src={`/placeholder.webp`}
            fill
            alt="img"
            sizes="100"
            quality={90}
            style={{
              opacity: 1,
              transition: "opacity 0.5s",
            }}
            onLoad={(image) => {
              onLoadCallBack(image);
            }}
            className="object-cover object-center     h-auto w-full rounded-sm    "
          ></Image>
        )}
      </div>
      {placeholderImgs.length > 1 ? (
        <div className="w-full  flex gap-2  z-50 px-2 ">
          {Array.from({ length: placeholderImgs.length }).map((_, index) => (
            <div
              key={index}
              className={cn("w-full h-[2.5px] rounded-md  mb-2 ", {
                "bg-accent": index === current,
                "bg-[#D9D9D9]": index !== current,
              })}
            />
          ))}
        </div>
      ) : (
        <div className="h-[2.5px] mb-2" />
      )}

      <span className="font-medium px-2">{produit.nom}</span>
      {produit.promotion ? (
        <div className="flex gap-2 items-center">
          <Currency
            className="text-red-500 opacity-60 line-through   "
            value={produit.prix}
          />
          <Currency
            value={produit.prix - produit.prix * (produit.promotion / 100)}
          />
        </div>
      ) : (
        <Currency value={produit.prix} />
      )}
      {cartButton && <CartButton produit={produit} />}

      {/* <span className="text-xs  ">
        {produit.id} | {produit.modelId} | {produit.categorieId} |{" "}
        {produit.familleId}|| {produit.longeur}
      </span>  */}
    </div>
  );
};

export default ProdItem;

export const CartButton = ({ produit }: { produit: GetProduitType }) => {
  const router = useRouter();
  const favoris = useFavorites();
  return (
    <div className="flex justfiy-between gap-2 items-center w-full">
      <Button
        className=" w-full space-x-2"
        size={"icon"}
        onClick={() => router.push("/produit/" + produit.reference)}
        variant={"secondary"}
      >
        <span className="lg:text-sm text-xs">Ajouter au panier</span>
      </Button>
      <Button
        onClick={() => favoris.addItem(produit)}
        variant={"ghost"}
        className="border   text-accent"
        size={"icon"}
      >
        {favoris.items.find((item) => item.id === produit.id) ? (
          <Heart strokeWidth={1.2} size={22} className="text-pink-500" />
        ) : (
          <Heart strokeWidth={1.2} size={22} />
        )}
      </Button>
    </div>
  );
};
