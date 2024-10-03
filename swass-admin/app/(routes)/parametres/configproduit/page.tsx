import { Separator } from "@/components/ui/separator";
import ConfProd from "../_components/conf-prod";

export default async function ConfigProdPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Config Produit</h3>
        <p className="text-sm text-muted-foreground">
          Cette page vous permet de contrôler les configuration des produits
        </p>
      </div>
      <Separator />

      <ConfProd />
    </div>
  );
}
