"use client";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { placeholderImgs } from "@/data/placeholder";
import { cn } from "@/lib/utils";
import { GetProduitType } from "@/server/server-only";
import Image from "next/image";
import React from "react";
export function ProduitCarousel({ produit }: { produit: GetProduitType }) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
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
    <Carousel setApi={setApi} className="w-full max-w-[500px]      ">
      <div className="relative w-full flex gap-2  ">
        <div className=" xlg:flex hidden flex-col max-h-[500px] no-scroll-bar overflow-auto  gap-2 w-[120px] ">
          {placeholderImgs.map((image) => (
            <div
              key={image.index}
              onClick={() => {
                api?.scrollTo(image.index);
              }}
              className="relative  w-full min-h-[150px]  cursor-pointer "
            >
              <Image
                // src={`http://localhost:3001${image.path}`}
                src={`${image.path}`}
                fill
                alt="img"
                sizes="100"
                className="object-cover object-center   h-auto w-full rounded-md  "
              ></Image>
            </div>
          ))}
        </div>
        <div className="   relative flex-1 ">
          <CarouselContent className="w-full    max-lg:p-0   ">
            {placeholderImgs.map((image) => (
              <CarouselItem className="w-full  max-lg:p-0   " key={image.index}>
                <div className="relative   h-[500px] w-full cursor-grab  ">
                  <Image
                    // src={`http://localhost:3001${image.path}`}
                    src={`${image.path}`}
                    fill
                    alt="img"
                    sizes="100"
                    quality={100}
                    className="object-cover h-auto w-full lg:rounded-md  "
                  ></Image>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex   gap-2 absolute bottom-5 left-[45%] bg-accent/50 items-center justify-center  px-2  h-5 rounded-2xl  ">
            {Array.from({ length: count }).map((_, index) => (
              <div
                key={index}
                className={cn("w-2 h-2 rounded-full   ", {
                  "bg-primary lg:bg-white": index + 1 === current,
                  "border border-white lg:border-white": index + 1 !== current,
                })}
              />
            ))}
          </div>
        </div>
      </div>
    </Carousel>
  );
}
