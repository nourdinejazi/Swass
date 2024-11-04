"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useCart from "@/hooks/use-cart";
import { Heart, Menu, Search, ShoppingBag, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { useMounted } from "@/hooks/use-mounted";

import { MainNav } from "./main-nav";
import SearchBar from "@/app/_components/search-bar";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Reveal from "./reveal";

const NavBar = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams().toString();
  const routes = [
    {
      href: `/`,
      label: "ACCEUIL",
      active: pathname === `/`,
      // icon: <House size={25} strokeWidth={2} />,
    },

    {
      href: "/vetements?newCollection=true",
      label: "Nouveau Collection",
      active: searchParams === "newCollection=true",
      // icon: <ShoppingCart size={25} strokeWidth={2} />,
    },

    {
      href: "#",
      label: "Meilleures Ventes",
      active: false,
      // icon: <Shirt size={25} strokeWidth={2} />,
    },
    {
      href: `/vetements`,
      label: "Vêtements",
      active: pathname === "/vetements" && !searchParams,
      // icon: <User size={25} strokeWidth={2} />,
    },

    {
      href: `/vetements?promotion=true`,
      label: "Soldes",
      active: searchParams === "promotion=true",
      // icon: <Settings size={25} strokeWidth={2} />,
    },
    {
      href: `/order`,
      label: "Commander",
      active: pathname === "/order" && !searchParams,
      // icon: <Settings size={25} strokeWidth={2} />,
    },
  ];

  const cart = useCart();
  const [open, setOpen] = useState(false);
  const [searchPhone, setSearchPhone] = useState(false);
  const router = useRouter();
  const isDesktop = useMediaQuery("(min-width: 850px)");
  const mounted = useMounted();
  if (!mounted) return null;

  return (
    <div className="w-full  lg:mb-[60px]  relative flex items-center justify-between p-4 lg:py-4 lg:px-[10%] bg-primary  h-[90px]">
      {isDesktop && (
        <Link className="relative w-[190px]  h-full " href="/">
          <Image
            src={"/logo.png"}
            priority
            quality={100}
            fill
            alt="logo"
            sizes="100"
            className="hidden lg:block object-contain"
          ></Image>
        </Link>
      )}
      {isDesktop && <SearchBar />}

      {!isDesktop && !searchPhone && (
        <div className="flex items-start justify-start gap-2 g:hildden ">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger>
              <Menu strokeWidth={1} size={25} />
            </SheetTrigger>
            <SheetContent side={"left"}>
              <SheetHeader>
                <SheetTitle> </SheetTitle>
                <SheetDescription>
                  <></>
                </SheetDescription>
              </SheetHeader>
              <nav className="flex flex-col space-y-4 mt-8">
                <Link className="relative w-full  mb-5  h-[30px] " href="/">
                  <Image
                    src={"/logo.png"}
                    priority
                    quality={100}
                    fill
                    alt="logo"
                    sizes="100"
                    className="    object-contain"
                  ></Image>
                </Link>
                {routes.map((route) => {
                  return (
                    <Link
                      onClick={() => setOpen(false)}
                      key={route.href}
                      href={route.href}
                      className={cn(
                        "flex items-center  gap-2 uppercase text-sm space-x-3  px-3 py-2 text-slate-900 transition-all  ",
                        route.active
                          ? "bg-accent text-accent-foreground font-medium rounded-lg"
                          : ""
                      )}
                    >
                      <span>✦</span>
                      {route.label}
                    </Link>
                  );
                })}
              </nav>
            </SheetContent>
          </Sheet>
          <Link href="/">
            <Image
              src={"/logo.png"}
              priority
              quality={100}
              height={150}
              width={150}
              alt="logo"
            ></Image>
          </Link>
        </div>
      )}

      <div
        className={cn(
          "  flex items-center justify-center  gap-4   ",
          searchPhone && "w-full lg:w-auto"
        )}
      >
        {!isDesktop && (
          // <button className="relative size-8  lg:hidden    ">
          //   <Search strokeWidth={1} size={22} />
          // </button>

          <>
            {searchPhone ? (
              <Reveal className="w-full">
                <div className="  w-full flex items-center justify-center gap-2">
                  <SearchBar />
                  <button
                    onClick={() => setSearchPhone(false)}
                    className=" z-50"
                  >
                    <X strokeWidth={1} size={22} />
                  </button>
                </div>
              </Reveal>
            ) : (
              <button
                onClick={() => setSearchPhone(true)}
                className="relative size-8  lg:hidden    "
              >
                <Search strokeWidth={1} size={22} />
              </button>
            )}
          </>
        )}

        {isDesktop && (
          <button
            onClick={() => router.push("/favorites")}
            className="relative size-8      "
          >
            <Heart strokeWidth={1} size={22} />
            {/* {favoris.items.length > 0 && (
              <span className=" absolute -top-1 -right-1 bg-accent/80 text-white rounded-full w-[20px] h-[20px] flex items-center justify-center text-sm font-semibold">
                {favoris.items.length}
              </span>
            )} */}
          </button>
        )}
        {!searchPhone && (
          <button
            onClick={() => cart.setOpen(true)}
            className="relative size-8      "
          >
            <ShoppingBag strokeWidth={1} size={22} />
            {cart.items.length > 0 && (
              <span className=" absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-[20px] h-[20px] flex items-center justify-center  font-semibold">
                {cart.items.length}
              </span>
            )}
          </button>
        )}
      </div>

      {isDesktop && (
        <div className="border-b hidden  border-primary absolute  -bottom-[60px] h-[60px] lg:flex items-center justify-center z-40 left-0 w-full bg-white   ">
          <MainNav />
        </div>
      )}
    </div>
  );
};

export default NavBar;
