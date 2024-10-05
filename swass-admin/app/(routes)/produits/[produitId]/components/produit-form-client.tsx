import { db } from "@/lib/db";
import ProduitForm from "./produit-form";

const ProduitFormClient = async ({
  params,
}: {
  params: { produitId: string };
}) => {
  const sizes = await db.tailles.findMany();

  const colors = await db.couleurs.findMany();

  const models = await db.models.findMany();

  const categories = await db.categorie.findMany();
  const familles = await db.famille.findMany();
  const initialData = await db.produit.findUnique({
    where: { reference: params.produitId },
    include: {
      categorie: true,
      famille: true,
      stock: true,
      model: true,
      images: true,
    },
  });

  const formattedData = {
    ...initialData,
    categorie: initialData?.categorie!.name,
    famille: initialData?.famille!.name,
    model: initialData?.model!.name,
  };
  return (
    <ProduitForm
      initialData={initialData ? formattedData : null}
      categories={categories}
      familles={familles}
      colors={colors}
      sizes={sizes}
      models={models}
    />
  );
};

export default ProduitFormClient;
