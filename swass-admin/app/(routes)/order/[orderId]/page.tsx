import { Suspense } from "react";
import Header from "@/components/header";
import OrderFormClient from "./_components/order-form-client";
import TableFallBack from "@/components/table-fallback";

export const dynamic = "force-dynamic";

const OrderFormPage = async ({ params }: { params: { orderId: string } }) => {
  return (
    <div className="   h-full p-10 pb-16   overflow-y-auto w-full   ">
      <Header
        name="Gestion Produits"
        description="La page des paramètres vous permet de personnaliser les produits."
      />
      <Suspense fallback={<TableFallBack />}>
        <OrderFormClient params={params} />
      </Suspense>
    </div>
  );
};

export default OrderFormPage;
