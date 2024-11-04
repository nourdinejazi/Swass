import { db } from "@/lib/db";
import StoreOrderFrom from "../../_components/store-order-form";
import { StoreOrderSchemaAdmin } from "@/schemas/settings";
import { z } from "zod";

const OrderFormClient = async ({ params }: { params: { orderId: string } }) => {
  const order = await db.order.findUnique({
    where: {
      id: params.orderId,
    },

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

  let formattedData: z.infer<typeof StoreOrderSchemaAdmin> | null = null;

  if (order) {
    formattedData = {
      nom: order.nom,
      prenom: order.prenom,
      phone: order.phone,

      infoSupp: order.infoSupp || "",
      items: order.items.map((item) => {
        return {
          ref: item.product.reference,
          images: item.product.images.map((img) => img.path),
          nom: item.product.nom,
          quantity: item.quantity,
          prixfinal: item.product.prixFinal ?? 0,
          promotion: item.product.promotion,
          couleurId: item.couleurId,
          tailleId: item.tailleId,
          productId: item.product.id,
        };
      }),
    };
  } else formattedData = null;

  return <StoreOrderFrom initialData={formattedData} />;
};

export default OrderFormClient;
