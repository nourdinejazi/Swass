"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { UserButton } from "@/components/auth/user-button";
import { List, PlusCircleIcon } from "lucide-react";

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="bg-secondary flex justify-between items-center overflow-auto gap-5  p-4 rounded-xl  w-full shadow-sm">
      <div className="flex gap-x-2">
        <Button
          asChild
          variant={
            pathname === "/parametres/securite/adminlist"
              ? "default"
              : "outline"
          }
        >
          <Link className="space-x-2" href="/parametres/securite/adminlist">
            <span>Liste des admins</span>
            <List size={17}></List>
          </Link>
        </Button>
        <Button
          asChild
          variant={
            pathname === "/parametres/securite/addadmin" ? "default" : "outline"
          }
        >
          <Link className="space-x-2" href="/parametres/securite/addadmin">
            <span>Ajouter</span>
            <PlusCircleIcon size={17}></PlusCircleIcon>
          </Link>
        </Button>
      </div>
      <UserButton />
    </nav>
  );
};
