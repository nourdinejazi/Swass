"use client";
import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { GetListProduitsType } from "@/server/server-only";

import { cn } from "@/lib/utils";
import Autoplay from "embla-carousel-autoplay";
import ProdItem from "@/app/_components/prod-item";

const SimilarProduit = ({ data }: { data: GetListProduitsType }) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

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
    <div className="relative px-12 md:p-20 flex flex-col bg-white   gap-8  items-center justify-center">
      <div className="text-center space-y-2 ">
        <h3 className="font-semibold  text-accent   py-3">
          Des Produits Similaires
        </h3>
        <p className="text-xs lg:text-base font-meduim text-accent">
          Découvrez des produits similaires qui pourraient également vous
          intéresser.
        </p>
      </div>

      <Carousel
        setApi={setApi}
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        className="w-full max-w-sm md:max-w-[80%]    "
      >
        <CarouselContent className="">
          {data.map((produit, index) => (
            <CarouselItem
              className="    md:basis-1/2 lg:basis-1/3 "
              key={index}
            >
              <ProdItem produit={produit} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious variant={"default"} />
        <CarouselNext variant={"default"} />
      </Carousel>

      <div className="flex gap-2   ">
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className={cn("w-2 h-2 rounded-full mb-8 ", {
              "bg-accent/80": index + 1 === current,
              "bg-neutral-300": index + 1 !== current,
            })}
          />
        ))}
      </div>

      <div className="absolute top-0 left-0 h-52  w-20 -z-10  bg-primary/60 " />
      <div className="absolute bottom-0 right-0 h-52  w-20 -z-10  bg-primary/60 " />
    </div>
  );
};

export default SimilarProduit;