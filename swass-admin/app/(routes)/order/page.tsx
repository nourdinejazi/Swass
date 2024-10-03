import TableFallBack from "@/components/table-fallback";

import { Suspense } from "react";
import Header from "@/components/header";
import OrderClient from "./_components/order-client";
export const dynamic = "force-dynamic";

const RetraitPage = async () => {
  return (
    <div className="  w-full h-full overflow-y-auto  p-4 lg:p-10 lg:pb-16  ">
      <Header
        name="Gestion des Commandes"
        description="La page des commandes vous permet de gérer les commandes."
      />
      <Suspense fallback={<TableFallBack />}>
        <OrderClient />
      </Suspense>
    </div>
  );
};

export default RetraitPage;
