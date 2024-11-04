import { incrementStock } from "@/actions/api-functions";
import { inactiveOrderStatuses } from "@/enum-types/data";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { OrderSchemaAdmin } from "@/schemas/settings";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { orderId: string } }
) {
  const session = await currentUser();
  if (!session) {
    return NextResponse.json({
      error: "Vous n'êtes pas autorisé à effectuer cette action !",
    });
  }
  try {
    const body = await req.json();

    const validatedFields = OrderSchemaAdmin.safeParse(body);

    if (!validatedFields.success) {
      return NextResponse.json(
        { error: "Les Champs sont invalides !" },
        { status: 400 }
      );
    }

    const data = validatedFields.data;

    const order = await db.order.findUnique({
      where: {
        id: params.orderId,
      },
      include: {
        items: true,
      },
    });

    if (!order) {
      return NextResponse.json(
        { error: "Commande non trouvé !" },
        { status: 404 }
      );
    }

    const updatedOrder = await db.order.update({
      where: {
        id: params.orderId,
      },
      data: {
        modeLivraison: data.modeLivraison,
        modePaiement: data.modePaiement,
        status: data.status,
        infoSupp: data.infoSupp,
        paye: data.paye,
        location: data.location,
        postalCode: data.postalCode,
        city: data.city,
        country: data.country,
        nom: data.nom,
        prenom: data.prenom,
        phone: data.phone,
        phone2: data.phone2,
      },
    });

    const findProdId = async (ref: string) => {
      const prodID = await db.produit.findUnique({
        where: {
          reference: ref,
        },
        select: {
          id: true,
        },
      });
      return prodID ? prodID.id : null;
    };

    if (inactiveOrderStatuses.includes(updatedOrder.status)) {
      try {
        await Promise.all(
          order.items.map(async (item) => {
            const prodId = await findProdId(item.ref);
            if (!prodId) return Promise.reject("Produit non trouvé");
            return incrementStock(
              prodId,
              item.tailleId,
              item.couleurId,
              item.quantity
            );
          })
        );
        await db.order.update({
          where: {
            id: params.orderId,
          },
          data: {
            items: {
              updateMany: {
                where: {},
                data: {
                  quantity: 0,
                },
              },
            },
          },
        });
      } catch (error) {
        return NextResponse.json(
          { error: "Failed to update the stock" },
          { status: 500 }
        );
      }
    }

    revalidatePath("/order");
    return NextResponse.json(
      { success: "Commande modifié !" },
      { status: 200 }
    );
  } catch (error) {
    console.log("OORDER-PATCH", error);
    return new NextResponse("Internal error Order update", { status: 500 });
  }
}
