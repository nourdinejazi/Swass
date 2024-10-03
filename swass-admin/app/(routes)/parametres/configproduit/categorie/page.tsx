import { db } from "@/lib/db";
import { CategorieForm } from "../_components/categorie-form";
import { FamilleForm } from "../_components/famille-form";

export default async function CategoriePage() {
  const categories = await db.categorie.findMany();
  const familles = await db.famille.findMany();

  return (
    <div className=" space-y-10">
      <div className=" border border-primary bg-white rounded-xl p-8 space-y-6">
        <h4 className="text-accent font-medium">
          Configuration des catégories
        </h4>
        <CategorieForm categories={categories} />
      </div>
      <div className=" border border-primary bg-white rounded-xl p-8 space-y-6">
        <h4 className="text-accent font-medium">Configuration des Familles</h4>
        <FamilleForm familles={familles} />
      </div>
    </div>
  );
}
