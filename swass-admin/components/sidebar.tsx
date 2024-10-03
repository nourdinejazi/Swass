"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { Menu, Settings, Shirt, ShoppingCart, User } from "lucide-react";
import { logout } from "@/actions/logout";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useMounted } from "@/hooks/use-mounted";

const SideBar = () => {
  const pathname = usePathname();
  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const item = {
    hidden: { x: 20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
    },
  };
  const routes = [
    // {
    //   href: `/`,
    //   label: "Dashboard",
    //   active: pathname === `/`,
    //   icon: <House size={25} strokeWidth={2} />,
    // },

    {
      href: "/order",
      label: "Gestion Commandes",
      active: pathname.includes("/order") ? true : false,
      icon: <ShoppingCart size={25} strokeWidth={2} />,
    },

    {
      href: "/produits",
      label: "Gestion Produits",
      active: pathname.includes("/produits") ? true : false,
      icon: <Shirt size={25} strokeWidth={2} />,
    },
    {
      href: `/customers`,
      label: "Gestion des clients",
      active: pathname.includes("/customers") ? true : false,
      icon: <User size={25} strokeWidth={2} />,
    },

    {
      href: `/parametres`,
      label: "Paramètres",
      active: pathname.includes("/parametres") ? true : false,
      icon: <Settings size={25} strokeWidth={2} />,
    },
  ];

  const isDesktop = useMediaQuery("(min-width: 850px)");
  const isMounted = useMounted();

  if (!isMounted) return null;
  if (!isDesktop) {
    return (
      <nav className="w-full h-[80px] p-4 bg-[#DCB690]  shadow-md flex justify-start items-center bg-secondary">
        <div className="flex items-start justify-start gap-2    ">
          <Sheet>
            <SheetTrigger>
              <Menu strokeWidth={1} size={25} />
            </SheetTrigger>
            <SheetContent side={"left"} className="bg-secondary">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
                <SheetDescription>
                  <></>
                </SheetDescription>
              </SheetHeader>
              <nav className="flex flex-col space-y-4 mt-8">
                {routes.map((route) => {
                  const Icon = route.icon;
                  return (
                    <Link
                      key={route.href}
                      href={route.href}
                      className={cn(
                        "flex items-center text-sm space-x-3 rounded-lg px-3 py-2 text-slate-900 transition-all  ",
                        route.active
                          ? "bg-accent text-accent-foreground font-medium"
                          : ""
                      )}
                    >
                      {route.icon}
                      <span>{route.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </SheetContent>
          </Sheet>
          <Link href="/">
            <Image
              src={"/images/logo.png"}
              priority
              quality={100}
              height={150}
              width={150}
              alt="logo"
            ></Image>
          </Link>
        </div>
      </nav>
    );
  } else
    return (
      <aside className="w-[120px] bg-secondary          flex items-start py-8 justify-center  h-screen    ">
        <motion.ul
          variants={container}
          initial="hidden"
          animate="visible"
          className="relative flex  h-full   w-full   flex-col items-center justify-center   gap-4"
        >
          <motion.li
            variants={item}
            className={cn(
              " flex flex-col items-center justify-start    p-5 bg-[#DCB690] bg-opacity-25 rounded-xl    mb-8   "
            )}
          >
            <Link
              href={"/"}
              className={cn("text-center text-sm transition-colors ")}
            >
              <Image
                src={"/images/slogo.svg"}
                style={{ width: "auto" }}
                width={10}
                height={10}
                alt="menu"
              ></Image>
            </Link>
          </motion.li>
          {routes.map((route, key) => (
            <motion.li
              key={key}
              variants={item}
              className={cn(
                " flex items-center justify-center relative    gap-5 w-full py-8  h-[17px]  "
              )}
            >
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "text-center z-20 text-sm  transition-colors ",
                  route.active && "   "
                )}
              >
                {route.active && (
                  <div className="absolute left-0 -top-6 rounded-l-xl   bg-white w-full h-[115px] -z-10 after:absolute  after:top-0 after:right-0 after:bg-secondary after:w-full after:h-5 after:rounded-r-xl after:rounded-t-none  after:z-50  before:absolute  before:bottom-0 before:right-0 before:bg-secondary before:w-full before:h-5 before:rounded-t-xl before:rounded-l-none  before:z-50       " />
                  // before:absolute  before:bottom-0 before:right-0 before:bg-black before:w-full before:h-4 before:rounded-r-xl before:rounded-t-none
                )}
                {/* <Image
                src={route.icon}
                style={{ width: "auto" }}
                width={15}
                height={15}
                className="bg-[#5F3B40] p-3"
                alt="menu"
              ></Image> */}
                <div
                  className={cn(
                    "text-[#A0616A]",
                    route.active &&
                      "  p-3 rounded-lg bg-[#5F3B40] sh   text-white shadow-2xl shadow-[#DCB690]"
                  )}
                >
                  {route.icon}
                </div>
              </Link>
            </motion.li>
          ))}

          <motion.li
            variants={item}
            className={cn(
              " flex items-center justify-center gap-5 w-full mt-auto  "
            )}
          >
            <button
              onClick={() => logout()}
              className={cn("text-center text-sm transition-colors ")}
            >
              <Image
                src={"/images/logout.svg"}
                style={{ width: "auto" }}
                width={15}
                height={15}
                alt="menu"
              ></Image>
            </button>
          </motion.li>
        </motion.ul>
      </aside>
    );
};

export default SideBar;
