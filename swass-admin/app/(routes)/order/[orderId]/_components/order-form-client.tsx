import { db } from "@/lib/db";
import { Suspense } from "react";
 import Header from "@/components/header";
import { redirect } from "next/navigation";
import OrderForm from "../../_components/order-form";

export const dynamic = "force-dynamic";

const OrderFormClient = async ({ params }: { params: { orderId: string } }) => {
  const order = await db.order.findUnique({
    where: {
      id: params.orderId,
    },
    // include: {
    //   items: {
    //     include: {
    //       product: true,
    //     },
    //   },
    // },

    include: {
      items: {
        select: {
          product: {
            include: {
              images: true,
            },
          },
          quantity: true,
          couleurId: true,
          tailleId: true,
        },
      },
    },
  });

  if (!order) {
    redirect("/order");
  }
  return (
 
        <OrderForm initialData={order} />
   
  );
};

export default OrderFormClient;
