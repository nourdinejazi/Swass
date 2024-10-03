"use client";
import Currency from "@/components/currency";
import { cn } from "@/lib/utils";
import { GetProduitType } from "@/server/server-only";
import Image from "next/image";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import React from "react";
import { CartButton } from "./prod-item";
import { useRouter } from "next/navigation";
import { placeholderImgs } from "@/data/placeholder";

const MobileHomeItem = ({
  produit,
  cartButton,
}: {
  produit: GetProduitType;
  cartButton?: boolean;
}) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const router = useRouter();
  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div
      onClick={() => router.push("/produit/" + produit.reference)}
      className=" bg-white w-full    flex flex-col items-center gap-3 justify-center    "
    >
      <Carousel
        setApi={setApi}
        className="w-full max-w-xs rounded-md   overflow-hidden"
      >
        <CarouselContent className="gap-1">
          {Array.from({ length: placeholderImgs.length }).map((_, index) => (
            <CarouselItem
              className="relative h-[200px]   w-full     p-2  "
              key={index}
            >
              <Image
                // src={`http://localhost:3001${placeholderImgs[index].path}`}
                src={`${placeholderImgs[index].path}`}
                fill
                sizes="100"
                alt="img"
                className="object-cover    h-auto w-full     "
              ></Image>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="w-full  flex gap-2  z-50 max-w-xs ">
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className={cn("w-full h-[2.5px] rounded-md  mb-2 ", {
              "bg-accent": index + 1 === current,
              "bg-[#D9D9D9]": index + 1 !== current,
            })}
          />
        ))}
      </div>
      <h3 className="font-medium  text-xs ">{produit.nom}</h3>
      {produit.promotion ? (
        <div className="flex gap-2 items-center">
          <Currency
            className="text-red-500 opacity-60 line-through  text-xs    "
            value={produit.prix}
          />
          <Currency
            className=" text-xs "
            value={produit.prix - produit.prix * (produit.promotion / 100)}
          />
        </div>
      ) : (
        <Currency className=" text-xs " value={produit.prix} />
      )}
      {cartButton && <CartButton produit={produit} />}
    </div>
  );
};

export default MobileHomeItem;
