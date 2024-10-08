import ProduitClient from "./_components/produit-client";
import TableFallBack from "@/components/loading-fallback";
import { Suspense } from "react";

const ProduitPage = async ({
  params,
}: {
  params: {
    produitId: string;
  };
}) => {
  return (
    <div>
      <Suspense fallback={<TableFallBack />}>
        <ProduitClient params={params} />
      </Suspense>
    </div>
  );
};

export default ProduitPage;
