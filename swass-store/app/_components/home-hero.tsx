"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import RevealHeroTitle from "./reveal-hero-title";
import Reveal from "@/components/reveal";
import { useRouter } from "next/navigation";

const HomeHero = () => {
  const router = useRouter();
  return (
    <section className="relative   lg:px-[10%]  bg-secondary border-2 border-primary w-full   h-[60vh]   lg:h-[80vh]  flex  flex-col items-center justify-start lg:justify-between lg:flex-row  ">
      <div className="  hidden lg:block space-y-3  max-w-[500px]    text-start text-black">
        <h1 className="  font-bold   text-[#34251F] ">
          <RevealHeroTitle text="Trouvez le meilleur style pour vous" />
        </h1>
        <Reveal hidden={{ opacity: 0, x: 0, y: 0 }} delay={0.7}>
          <p className=" text-lg text-accent font-medium">
            Nous sommes passionnés par la mode et fiers de vous offrir une
            sélection tendance
          </p>
        </Reveal>
        <Reveal hidden={{ opacity: 0, x: 0, y: 0 }} delay={1}>
          <Button
            onClick={() => router.push("/vetements")}
            size={"lg"}
            variant={"secondary"}
            className="  font-meduim z-50     "
          >
            SHOP NOW
          </Button>
        </Reveal>
      </div>

      <div className="w-[50%] max-w-[300px]     h-[70%] mt-10 lg:mt-20  relative  z-20      ">
        <Image
          src={"/hero.png"}
          fill
          alt="home-hero"
          sizes="100"
          priority
          onLoadingComplete={(image) => image.classList.remove("img--hidden")}
          className="  object-cover heroBorder max-w-[600px]     w-full h-auto  img img--hidden"
        />

        <div className="absolute bottom-10 w-[150%] lg:w-[120%] lg:hidden space-y-3 -left-1/4   text-center text-black">
          <h1 className="  font-bold text-3xl text-[#34251F] ">
            <RevealHeroTitle text="Trouvez le meilleur style pour vous" />
          </h1>
          <Reveal>
            <p className="text-xs text-[#34251F] font-medium">
              nous sommes passionnés par la mode et fiers de vous offrir une
              sélection tendance
            </p>
          </Reveal>
        </div>
      </div>

      <Button
        size={"lg"}
        variant={"secondary"}
        className="  font-bold z-50 lg:hidden  -mt-5 "
      >
        SHOP NOW
      </Button>

      <div className=" w-full h-[200px] absolute bottom-0 inset-x-0  lg:hidden   ">
        <Image
          src={"/zigzag.svg"}
          fill
          sizes="100"
          alt="home-hero"
          className="object-cover     w-full h-auto z-20"
        />
      </div>

      <div className=" absolute bottom-0 left-0    bg-gradient-to-t from-primary  z-10 to-white w-[70px] h-[100px]   " />

      <div className=" absolute top-0 right-0    bg-gradient-to-t from-primary z-10  to-white w-[100px] h-[300px]   " />

      <Image
        src={"/dots.svg"}
        width={30}
        height={30}
        alt="home-hero"
        className="absolute top-20 left-0 w-auto"
      />
    </section>
  );
};

export default HomeHero;
