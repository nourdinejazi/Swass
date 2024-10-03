import { Suspense } from "react";
import Header from "@/components/header";
import ProduitFormClient from "./components/produit-form-client";
import TableFallBack from "@/components/table-fallback";

const ProduitFormPage = async ({
  params,
}: {
  params: { produitId: string };
}) => {
  return (
    <div className="   h-full p-10 pb-16   overflow-y-auto w-full   ">
      <Header
        name="Gestion Produits"
        description="La page des paramètres vous permet de personnaliser les produits."
      />

      <Suspense fallback={<TableFallBack />}>
        <ProduitFormClient params={params} />
      </Suspense>
    </div>
  );
};

export default ProduitFormPage;
