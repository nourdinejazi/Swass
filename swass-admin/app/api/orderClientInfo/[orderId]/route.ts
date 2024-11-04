import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { StoreOrderSchemaAdmin } from "@/schemas/settings";
import { NextResponse } from "next/server";
//route for store order customer/order update
export async function PATCH(
  req: Request,
  { params }: { params: { orderId: string } }
) {
  try {
    const session = await currentUser();
    if (!session) {
      return NextResponse.json({
        error: "Vous n'êtes pas autorisé à effectuer cette action !",
      });
    }
    const body = await req.json();

    const validatedFields = StoreOrderSchemaAdmin.safeParse(body);

    if (!validatedFields.success) {
      return NextResponse.json(
        { error: "Les Champs sont invalides !" },
        { status: 400 }
      );
    }

    try {
      await db.order.update({
        where: {
          id: params.orderId,
        },
        data: {
          phone: validatedFields.data.phone,
          infoSupp: validatedFields.data.infoSupp,
          nom: validatedFields.data.nom,
          prenom: validatedFields.data.prenom,
        },
      });
    } catch (error) {
      console.log("[UPDATE-User-EROOR]", error);
      return NextResponse.json(
        { error: "Les Champs sont invalides !" },
        { status: 400 }
      );
    }

    // try {
    //   await db.order.update({
    //     where: {
    //       id: params.orderId,
    //     },
    //     data: {
    //       phone: validatedFields.data.phone,
    //       infoSupp: validatedFields.data.infoSupp,
    //     },
    //   });
    // } catch (error) {
    //   console.log("[UPDATE-User-EROOR]", error);
    //   return NextResponse.json(
    //     { error: "Les Champs sont invalides !" },
    //     { status: 400 }
    //   );
    // }

    return NextResponse.json({
      success: "Commande modifié avec succès !",
    });
  } catch (error) {
    console.log("[ADD-ORDER-EROOR]", error);
    return NextResponse.json({ error: "Les Champs sont invalides !" });
  }
}
