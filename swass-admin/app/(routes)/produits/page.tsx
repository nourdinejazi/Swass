import Header from "@/components/header";
import ProduitClient from "./_components/produit-client";
import TableFallBack from "@/components/table-fallback";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import Link from "next/link";

const ProduitPage = () => {
  return (
    <div className="  w-full h-full overflow-y-auto  p-4 lg:p-10 lg:pb-16  ">
      <div className=" lg:flex mb-5 lg:mb-0 items-start">
        <Header
          className="flex-grow"
          name="Gestion Produits"
          description="La page des paramètres vous permet de personnaliser les produits."
        />
        <Link href="/produits/new">
          <Button
            variant="outline"
            size={"lg"}
            className="flex items-center justify-center gap-2"
          >
            <span>Ajouter un produit</span>
            <MoveRight size={20}></MoveRight>
          </Button>
        </Link>
      </div>
      <Suspense fallback={<TableFallBack />}>
        <ProduitClient />
      </Suspense>
    </div>
  );
};

export default ProduitPage;
