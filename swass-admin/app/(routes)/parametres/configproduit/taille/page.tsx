import { db } from "@/lib/db";
import { TailleForm } from "../_components/taille-form";

export default async function TaillePage() {
  const tailles = await db.tailles.findMany();

  return (
    <div className=" border border-primary bg-white rounded-xl p-8 space-y-6">
      <h4 className="text-accent font-medium">Configuration des tailles</h4>
      <TailleForm tailles={tailles} />
    </div>
  );
}
