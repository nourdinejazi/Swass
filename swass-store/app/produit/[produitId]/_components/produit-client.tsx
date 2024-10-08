import { Navigation } from "@/components/navigation";
import ProduitDetailsPage from "./produit-details-page";
import { db } from "@/lib/db";
import { GetProduitType } from "@/server/server-only";
import SimilarProduit from "../_components/similarProduits";
import NotFound from "@/components/not-found";

const ProduitClient = async ({
  params,
}: {
  params: {
    produitId: string;
  };
}) => {
  const produit: GetProduitType = await fetch(
    "http://localhost:3001/api/produit/" + params.produitId
  )
    .then((res) => res.json())
    .then((data) => data);

  if (!produit || produit.archived) {
    return <NotFound></NotFound>;
  }

  const stockCount = produit.stock.reduce((acc, stockItem) => {
    return acc + stockItem.stock;
  }, 0);

  const codeCouleurs = await db.couleurs.findMany({
    where: {
      name: {
        in: [...new Set(produit.stock.map((stock) => stock.couleurId))],
      },
    },
  });

  const similarProduits = await db.produit.findMany({
    where: {
      categorieId: produit.categorieId,
      NOT: {
        id: produit.id,
      },
    },
    take: 4,

    include: {
      images: true,
      stock: true,
      categorie: true,
      model: true,
    },
  });

  return (
    <main className="  pb-[80px] bg-secondary  lg:space-y-20">
      <div className="lg:px-[5%]">
        <Navigation pathArr={["Produits",params.produitId]} />
        <ProduitDetailsPage
          outOfStock={stockCount === 0}
          produit={produit}
          codeCouleurs={codeCouleurs}
        />
      </div>
      <SimilarProduit data={similarProduits} />
    </main>
  );
};

export default ProduitClient;
