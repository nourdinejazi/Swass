import { db } from "@/lib/db";
import { StoreOrderSchemaAdmin } from "@/schemas/settings";
import { NextResponse } from "next/server";
//route for store order customer/order update
export async function PATCH(
  req: Request,
  { params }: { params: { orderId: string } }
) {
  try {
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
          nom: validatedFields.data.name.split(" ")[0],
          prenom: validatedFields.data.name.split(" ")[1],
          customer: {
            update: {
              name: validatedFields.data.name,
              email: validatedFields.data.email,
              phone: validatedFields.data.phone,
            },
          },
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
