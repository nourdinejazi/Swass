"use client";
import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { GetListProduitsType } from "@/server/server-only";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import PvItem from "./pv-item";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

export function PvCarousel({ data }: { data: GetListProduitsType }) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
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
    <div className="relative    md:pl-[10%]  flex-col pt-10 flex  bg-accent text-accent-foreground  lg:bg-secondary gap-8  items-center justify-center">
      <div className=" flex  items-center justify-between w-full z-20  ">
        <div className="text-start space-y-3 text-accent-foreground max-w-md overflow-hidde px-3">
          <h2 className="font-semibold  lg:text-accent      ">
            Produits tendance
          </h2>
          <p className="text-xs lg:text-base font-medium lg:text-accent   ">
            Découvrez notre nouvelle collection, une fusion audacieuse entre
            tradition et modernité.
          </p>
          <Button
            size={"lg"}
            variant={"outline"}
            className="  font-meduim z-50   lg:bg-accent lg:text-white lg:hover:bg-primary   lg:hover:border lg:hover:border-accent lg:hover:text-accent  "
          >
            VOIR PLUS
          </Button>
        </div>

        <Carousel
          plugins={[plugin.current]}
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
          setApi={setApi}
          className="w-full max-w-[50%]  lg:max-w-[60%]     "
        >
          <CarouselContent className=" ">
            {data.map((produit, index) => (
              <CarouselItem className="    lg:basis-1/3  " key={index}>
                <PvItem produit={produit} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      <div className="flex gap-2   ">
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className={cn("w-2 h-2 rounded-full mb-8 ", {
              "bg-primary lg:bg-accent": index + 1 === current,
              "border border-primary lg:border-accent": index + 1 !== current,
            })}
          />
        ))}
      </div>

      <div className=" w-full h-[180px] lg:h-[40%] absolute bottom-0 inset-x-0  z-0     ">
        <Image
          src={"/zigzag.svg"}
          fill
          alt="home-hero"
          className="object-cover     opacity-50 lg:opacity-30    w-full h-auto z-20"
        />
      </div>
    </div>
  );
}
