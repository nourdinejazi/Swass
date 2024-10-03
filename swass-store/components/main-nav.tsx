"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Image from "next/image";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

export function MainNav() {
  const router = useRouter();

  return (
    <NavigationMenu className="bg-white  w-full    ">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger
            onClick={() => router.push("/vetements?categories[]=Dresses")}
          >
            ROBES
          </NavigationMenuTrigger>
          <NavigationMenuContent className="flex gap-8 justify-between items-start    min-w-[850px]   p-8">
            <div className="flex flex-col  items-start ">
              <span className="font-semibold text-sm mb-3 ">TOPS</span>
              <ul className="text-sm font-medium list-disc  flex flex-col justify-start items-start ">
                <Button className="h-8" variant={"linkHover2"}>
                  <li className="font-medium">Blouses</li>
                </Button>
                <Button className="h-8" variant={"linkHover2"}>
                  <li className="font-medium">T-shirts</li>
                </Button>
                <Button className="h-8" variant={"linkHover2"}>
                  <li className="font-medium">Sets</li>
                </Button>
              </ul>
            </div>
            <div className="flex flex-col  items-start ">
              <span className="font-semibold text-sm mb-3 ">OUTWEAR</span>
              <ul className="text-sm font-medium list-disc  flex flex-col justify-start items-start ">
                <Button className="h-8" variant={"linkHover2"}>
                  <li className="font-medium">Blouses</li>
                </Button>
                <Button className="h-8" variant={"linkHover2"}>
                  <li className="font-medium">T-shirts</li>
                </Button>
                <Button className="h-8" variant={"linkHover2"}>
                  <li className="font-medium">Sets</li>
                </Button>
              </ul>
            </div>
            <div className="flex flex-col  items-start ">
              <span className="font-semibold text-sm mb-3 ">BOTTOMS</span>
              <ul className="text-sm font-medium list-disc  flex flex-col justify-start items-start ">
                <Button className="h-8" variant={"linkHover2"}>
                  <li className="font-medium">Blouses</li>
                </Button>
                <Button className="h-8" variant={"linkHover2"}>
                  <li className="font-medium">T-shirts</li>
                </Button>
                <Button className="h-8" variant={"linkHover2"}>
                  <li className="font-medium">Sets</li>
                </Button>
              </ul>
            </div>
            <div className="flex items-center justify-center gap-2">
              <div className="relative size-[150px] cursor-pointer flex items-center justify-center   dropdownBanner   rounded-full   ">
                <Image
                  src="/dress-sale-17-08.webp"
                  fill
                  sizes="100"
                  className="w-full h-full object-cover      rounded-full  "
                  alt="logo"
                ></Image>
                <span className="z-50 text-center text-white">SOLDE</span>
              </div>
              <div className="relative size-[150px] cursor-pointer flex items-center justify-center   dropdownBanner   rounded-full   ">
                <Image
                  src="/dress-best-seller-17-08.webp"
                  fill
                  sizes="100"
                  className="w-full h-full object-cover      rounded-full  "
                  alt="logo"
                ></Image>
                <span className="z-50 text-center text-white">BEST SELLER</span>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger onClick={() => router.push("/vetements")}>
            VETEMENTS
          </NavigationMenuTrigger>
          <NavigationMenuContent className="flex   gap-3 justify-between items-start    min-w-[850px]   p-8">
            <div className="flex flex-col  items-start ">
              <span className="font-semibold text-sm mb-3 ">TOPS</span>
              <ul className="text-sm f marker: list-disc  flex flex-col justify-start items-start ">
                <Button className="h-8" variant={"linkHover2"}>
                  <li className="font-medium">Blouses</li>
                </Button>
                <Button className="h-8" variant={"linkHover2"}>
                  <li className="font-medium">T-shirts</li>
                </Button>
                <Button className="h-8" variant={"linkHover2"}>
                  <li className="font-medium">Sets</li>
                </Button>
                <Button className="h-8" variant={"linkHover2"}>
                  <li className="font-medium">Blouses</li>
                </Button>
                <Button className="h-8" variant={"linkHover2"}>
                  <li className="font-medium">T-shirts</li>
                </Button>
                <Button className="h-8" variant={"linkHover2"}>
                  <li className="font-medium">Sets</li>
                </Button>
                <Button className="h-8" variant={"linkHover2"}>
                  <li className="font-medium">T-shirts</li>
                </Button>
                <Button className="h-8" variant={"linkHover2"}>
                  <li className="font-medium">Sets</li>
                </Button>
              </ul>
            </div>
            <div className="flex flex-col  items-start   ">
              <span className="font-semibold text-sm mb-3 ">OUTWEAR</span>
              <ul className="text-sm font-medium list-disc  flex flex-col justify-start items-start ">
                <Button className="h-8" variant={"linkHover2"}>
                  <li className="font-medium">Blouses</li>
                </Button>
                <Button className="h-8" variant={"linkHover2"}>
                  <li className="font-medium">T-shirts</li>
                </Button>
                <Button className="h-8" variant={"linkHover2"}>
                  <li className="font-medium">Sets</li>
                </Button>
              </ul>
            </div>
            <div className="flex flex-col  items-start ">
              <span className="font-semibold text-sm mb-3 ">BOTTOMS</span>
              <ul className="text-sm font-medium list-disc  flex flex-col justify-start items-start ">
                <Button className="h-8" variant={"linkHover2"}>
                  <li className="font-medium">Blouses</li>
                </Button>
                <Button className="h-8" variant={"linkHover2"}>
                  <li className="font-medium">T-shirts</li>
                </Button>
                <Button className="h-8" variant={"linkHover2"}>
                  <li className="font-medium">Sets</li>
                </Button>
              </ul>
            </div>
            <div className=" grid grid-cols-2 gap-5">
              <div className="relative size-[150px] cursor-pointer flex items-center justify-center   dropdownBanner   rounded-full   ">
                <Image
                  src="/cheap-evenin-dress-17-08.webp"
                  fill
                  sizes="100"
                  className="w-full h-full object-cover      rounded-full  "
                  alt="logo"
                ></Image>
                <span className="z-50 text-center text-white">SOLDE</span>
              </div>
              <div className="relative size-[150px] cursor-pointer flex items-center justify-center   dropdownBanner   rounded-full   ">
                <Image
                  src="/new-evening-dress-17-08.webp"
                  fill
                  sizes="100"
                  className="w-full h-full object-cover      rounded-full  "
                  alt="logo"
                ></Image>
                <span className="z-50 text-center text-white">BEST SELLER</span>
              </div>

              <div className="relative size-[150px] cursor-pointer flex items-center justify-center   dropdownBanner   rounded-full   ">
                <Image
                  src="/dress-sale-17-08.webp"
                  fill
                  sizes="100"
                  className="w-full h-full object-cover      rounded-full  "
                  alt="logo"
                ></Image>
                <span className="z-50 text-center text-white">SOLDE</span>
              </div>
              <div className="relative size-[150px] cursor-pointer flex items-center justify-center   dropdownBanner   rounded-full   ">
                <Image
                  src="/dress-best-seller-17-08.webp"
                  fill
                  sizes="100"
                  className="w-full h-full object-cover      rounded-full  "
                  alt="logo"
                ></Image>
                <span className="z-50 text-center text-white">BEST SELLER</span>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              MEILLEURES VENTES
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger
            onClick={() => router.push("/vetements?newCollection=true")}
          >
            NOUVELLE COLLECTION
          </NavigationMenuTrigger>
          <NavigationMenuContent className="flex gap-8 justify-between items-start    min-w-[850px]   p-8">
            <div className="flex flex-col  items-start ">
              <span className="font-semibold text-sm mb-3 ">TOPS</span>
              <ul className="text-sm font-medium list-disc  flex flex-col justify-start items-start ">
                <Button className="h-8" variant={"linkHover2"}>
                  <li className="font-medium">Blouses</li>
                </Button>
                <Button className="h-8" variant={"linkHover2"}>
                  <li className="font-medium">T-shirts</li>
                </Button>
                <Button className="h-8" variant={"linkHover2"}>
                  <li className="font-medium">Sets</li>
                </Button>
              </ul>
            </div>
            <div className="flex flex-col  items-start ">
              <span className="font-semibold text-sm mb-3 ">OUTWEAR</span>
              <ul className="text-sm font-medium list-disc  flex flex-col justify-start items-start ">
                <Button className="h-8" variant={"linkHover2"}>
                  <li className="font-medium">Blouses</li>
                </Button>
                <Button className="h-8" variant={"linkHover2"}>
                  <li className="font-medium">T-shirts</li>
                </Button>
                <Button className="h-8" variant={"linkHover2"}>
                  <li className="font-medium">Sets</li>
                </Button>
              </ul>
            </div>
            <div className="flex flex-col  items-start ">
              <span className="font-semibold text-sm mb-3 ">BOTTOMS</span>
              <ul className="text-sm font-medium list-disc  flex flex-col justify-start items-start ">
                <Button className="h-8" variant={"linkHover2"}>
                  <li className="font-medium">Blouses</li>
                </Button>
                <Button className="h-8" variant={"linkHover2"}>
                  <li className="font-medium">T-shirts</li>
                </Button>
                <Button className="h-8" variant={"linkHover2"}>
                  <li className="font-medium">Sets</li>
                </Button>
              </ul>
            </div>
            <div className="flex items-center justify-center gap-2">
              <div className="relative size-[150px] cursor-pointer flex items-center justify-center   dropdownBanner   rounded-full   ">
                <Image
                  src="/dress-sale-17-08.webp"
                  fill
                  sizes="100"
                  className="w-full h-full object-cover      rounded-full  "
                  alt="logo"
                ></Image>
                <span className="z-50 text-center text-white">SOLDE</span>
              </div>
              <div className="relative size-[150px] cursor-pointer flex items-center justify-center   dropdownBanner   rounded-full   ">
                <Image
                  src="/dress-best-seller-17-08.webp"
                  fill
                  sizes="100"
                  className="w-full h-full object-cover      rounded-full  "
                  alt="logo"
                ></Image>
                <span className="z-50 text-center text-white">BEST SELLER</span>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              ROBES DE SOIRÉE
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="/vetements?promotion=true" legacyBehavior passHref>
            <NavigationMenuLink
              className={cn(navigationMenuTriggerStyle(), "text-red-500")}
            >
              SOLDES
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li className="font-medium">
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors    focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
