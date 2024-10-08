import { decrementStock } from "@/actions/api-functions";
import { db } from "@/lib/db";
import { cartItem, OrderSchema } from "@/schemas/settings";
import { NextResponse } from "next/server";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST,GET,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { orderInfo, orderedItems } = body;

    const validatedFields = OrderSchema.safeParse(orderInfo);

    if (!validatedFields.success) {
      console.log(validatedFields.error.message);
      return NextResponse.json(
        { error: "Invalid fields!" },
        { status: 400, headers: corsHeaders }
      );
    }

    const validatedOrderInfo = validatedFields.data;

    //the order items can have the same item twice with diffrence sizes and colors

    const uniqueOrderItems = Array.from(new Set<number>(
      orderedItems.map((item: cartItem) => item.id)
    )) 

    const prods = await db.produit.findMany({
      where: {
        id: {
          in: uniqueOrderItems.map((id) => id),
        },
      },
      include: {
        stock: true,
      },
    });

    if (prods.length !== uniqueOrderItems.length) {
      return NextResponse.json(
        { error: "Les produits ne sont pas valides !" },
        { status: 400, headers: corsHeaders }
      );
    }
    const sameItem = (item: cartItem, data: cartItem) => {
      if (
        item.id === data.id &&
        item.selectedCouleur === data.selectedCouleur &&
        item.selectedTaille === data.selectedTaille
      ) {
        return true;
      }
    };

    const isStockValid = orderedItems.every((item: cartItem) => {
      const prod = prods.find((p) => p.id === item.id);

      if (!prod) {
        return false;
      }

      const stockItem = prod.stock.find(
        (stock) =>
          stock.couleurId === item.selectedCouleur &&
          stock.tailleId === item.selectedTaille
      );

      if (!stockItem) {
        return false;
      }

      return stockItem.stock >= item.quantity;
    });

    if (!isStockValid) {
      return NextResponse.json(
        { error: "Il ya un Article non disponible!" },
        { status: 400, headers: corsHeaders }
      );
    }

    try {
      await db.address.upsert({
        where: { userId: validatedOrderInfo.personalInfo.userId },
        update: {
          location: validatedOrderInfo.address.location,
          city: validatedOrderInfo.address.city,
          postalCode: validatedOrderInfo.address.postalCode,
          country: validatedOrderInfo.address.country,
          phone: validatedOrderInfo.address.phone,
          phone2: validatedOrderInfo.address.phone2,
         },
        create: {
          firstName: validatedOrderInfo.address.nom,
          lastName: validatedOrderInfo.address.prenom,
          location: validatedOrderInfo.address.location,
          city: validatedOrderInfo.address.city,
          postalCode: validatedOrderInfo.address.postalCode,
          country: validatedOrderInfo.address.country,
          phone: validatedOrderInfo.address.phone,
          phone2: validatedOrderInfo.address.phone2,
          userId: validatedOrderInfo.personalInfo.userId,
        },
      });
    } catch (error) {
      console.log("[ADD-ADDRESS-TO-CUSTOMER-EROOR]", error);
      return NextResponse.json(
        { error: "Les Champs sont invalides !" },
        { status: 400, headers: corsHeaders }
      );
    }

    await db.order.create({
      data: {
        customer: {
          connect: {
            id: validatedOrderInfo.personalInfo.userId,
          },
        },
        city: validatedOrderInfo.address.city,
        location: validatedOrderInfo.address.location,
        country: validatedOrderInfo.address.country,
        postalCode: validatedOrderInfo.address.postalCode,
        phone: validatedOrderInfo.address.phone,
        phone2: validatedOrderInfo.address.phone2,
        infoSupp: validatedOrderInfo.address.infoSupp,
        nom: validatedOrderInfo.address.nom,
        prenom: validatedOrderInfo.address.prenom,
        items: {
          createMany: {
            data: [
              ...orderedItems.map((item: cartItem) => {
                return {
                  ref: item.reference,
                  quantity: item.quantity,
                  couleurId: item.selectedCouleur,
                  tailleId: item.selectedTaille,
                };
              }),
            ],
          },
        },
        modeLivraison: validatedOrderInfo.modeLivraison.mode,
        modePaiement: validatedOrderInfo.modePaiement.paiement,
      },
    });

    await Promise.all(
      orderedItems.map((item: cartItem) =>
        decrementStock(
          item.id,
          item.selectedTaille,
          item.selectedCouleur,
          item.quantity
        )
      )
    );

    return NextResponse.json(
      { success: "Commande  ajouté avec succés" },
      { headers: corsHeaders }
    );
  } catch (error) {
    console.log("[ADD-ORDER-EROOR]", error);
    return NextResponse.json(
      { error: "Les Champs sont invalides !" },
      { status: 400, headers: corsHeaders }
    );
  }
}
