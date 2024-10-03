import { db } from "@/lib/db";
import { ModeleForm } from "../_components/modele-form";

export default async function ModelPage() {
  const modeles = await db.models.findMany();

  return (
    <div className=" border border-primary bg-white rounded-xl p-8 space-y-6">
      <h4 className="text-accent font-medium">Configuration des modéles</h4>
      <ModeleForm modeles={modeles} />
    </div>
  );
}
