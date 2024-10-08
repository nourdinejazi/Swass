import { db } from "@/lib/db";
import { DataTable } from "./produit-data-table";
import { ProduitColumns } from "./produit-columns";

const ProduitClient = async () => {
  const data = await db.produit.findMany({
    include: {
      stock: true,
    },
  });
  const categories = await db.categorie.findMany({});
  const models = await db.models.findMany({});
  const familles = await db.famille.findMany({});
  return (
    <div className="     ">
      <DataTable
        data={data}
        categories={categories}
        familles={familles}
        models={models}
        columns={ProduitColumns}
      />
    </div>
  );
};

export default ProduitClient;
