import { GetListProduitsType } from "@/server/server-only";
import HomeClient from "@/app/_components/home-client";
import { db } from "@/lib/db";

export default async function Home() {
  const produits: GetListProduitsType = await fetch(
    "http://localhost:3001/api/produit"
  )
    .then((res) => res.json())
    .then((data) => data);

  const newCollectionProduits: GetListProduitsType = await fetch(
    "http://localhost:3001/api/produit?newCollection=true"
  )
    .then((res) => res.json())
    .then((data) => data);

  const pv = await db.stock.groupBy({
    by: ["produitId"],
    _sum: {
      stock: true,
    },
    orderBy: {
      _sum: {
        stock: "desc",
      },
    },

    take: 10,
  });

  const pvIds = pv.map((item) => item.produitId);

  const pvProduits = await db.produit.findMany({
    where: {
      id: {
        in: pvIds,
      },
    },
    include: {
      images: true,
      stock: true,
      model: true,
      categorie: true,
    },
  });

  return (
    <HomeClient
      produits={produits}
      newCollectionProduits={newCollectionProduits}
      pvProduits={pvProduits}
    />
  );
}
