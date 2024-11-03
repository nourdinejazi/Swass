import TableFallBack from "@/components/table-fallback";

import { Suspense } from "react";
import Header from "@/components/header";
import OrderClient from "./_components/store-order-client";
import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import Link from "next/link";
export const dynamic = "force-dynamic";

const StoreOrdersPage = async () => {
  return (
    <div className="  w-full h-full overflow-y-auto  p-4 lg:p-10 lg:pb-16  ">
      <div className=" lg:flex mb-5 lg:mb-0 items-start">
        <Header
          className="flex-grow"
          name="Gestion des ventes"
          description="La page vous permet d'ajouter les ventes."
        />
        <Link href="/store-orders/new">
          <Button
            variant="outline"
            size={"lg"}
            className="flex items-center justify-center gap-2"
          >
            <span>Ajouter une vente</span>
            <MoveRight size={20}></MoveRight>
          </Button>
        </Link>
      </div>
      <Suspense fallback={<TableFallBack />}>
        <OrderClient />
      </Suspense>
    </div>
  );
};

export default StoreOrdersPage;
