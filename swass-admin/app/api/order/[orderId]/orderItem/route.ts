import { decrementStock, incrementStock } from "@/actions/api-functions";
import { inactiveOrderStatuses } from "@/enum-types/data";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { orderId: string } }
) {
  try {
    const body = await req.json();
    const {
      selectedProd,
      selectedInfo,
      oldProdref,
      newQte,
      oldQte,
      oldCouleurId,
      oldTailleId,
    } = body;
    const regex = /^([^-\s]+)-([^-\s]+)-Stock\((\d+)\)$/;
    console.log(body);
    if (
      typeof newQte !== "number" ||
      typeof newQte !== "number" ||
      !selectedProd ||
      !selectedInfo ||
      !oldCouleurId ||
      !oldTailleId ||
      !oldProdref ||
      !regex.test(selectedInfo)
    ) {
      return NextResponse.json(
        { error: "Les Champs sont invalides !" },
        { status: 400 }
      );
    }
    const newSizeId = selectedInfo.split("-")[0];
    const newColorId = selectedInfo.split("-")[1];

    const currentOrder = await db.order.findUnique({
      where: {
        id: params.orderId,
      },
      include: {
        items: true,
      },
    });

    if (!currentOrder) {
      return NextResponse.json({ error: "Order not found !" }, { status: 400 });
    }

    if (inactiveOrderStatuses.includes(currentOrder.status)) {
      console.log(currentOrder);
      return NextResponse.json(
        { error: "Veuiller changer le status du commande" },
        { status: 400 }
      );
    }

    const oldProduit = await db.produit.findUnique({
      where: {
        reference: oldProdref,
      },
    });

    const produit = await db.produit.findUnique({
      where: {
        reference: selectedProd.reference,
      },
    });

    if (!produit || !oldProduit) {
      return NextResponse.json(
        { error: "Référence des produits est invalide !" },
        { status: 400 }
      );
    }

    const currentOrderItemCheck = currentOrder.items.find(
      (item) => item.ref === oldProduit?.reference
    );

    if (!currentOrderItemCheck) {
      return NextResponse.json(
        { error: "Produit non trouvé dans la commande !" },
        { status: 400 }
      );
    }

    const isInStock = await db.stock.findFirst({
      where: {
        produitId: produit.id,
        tailleId: newSizeId,
        couleurId: newColorId,
        stock: {
          gte: newQte,
        },
      },
    });

    if (!isInStock) {
      return NextResponse.json(
        { error: "Stock insuffisant pour ce produit !" },
        { status: 400 }
      );
    }
    await db.order.update({
      where: {
        id: params.orderId,
      },
      data: {
        items: {
          delete: {
            id: currentOrderItemCheck.id,
          },
          create: {
            ref: produit.reference,
            quantity: newQte,
            couleurId: newColorId,
            tailleId: newSizeId,
          },
        },
      },
    });

    await decrementStock(produit.id, newSizeId, newColorId, newQte);

    await incrementStock(oldProduit.id, oldTailleId, oldCouleurId, oldQte);

    revalidatePath(`/order/${params.orderId}`);
    return NextResponse.json({ success: "Order updated successfully" });
  } catch (error) {
    console.log("[ORDER_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
