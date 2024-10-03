import { db } from "@/lib/db";
import { CouleurForm } from "../_components/couleur-form";

export default async function CouleurPage() {
  const couleurs = await db.couleurs.findMany();

  return (
    <div className=" border border-primary bg-white rounded-xl p-8 space-y-6">
      <h4 className="text-accent font-medium">Configuration des couleurs</h4>
      <CouleurForm couleurs={couleurs} />
    </div>
  );
}
