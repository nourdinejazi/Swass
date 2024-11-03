import { db } from "@/lib/db";
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
    console.log("[ADD-ORDER-BODY]", body);
    let order;
    if (body.newClient) {
      if (!body.nom || !body.prenom || !body.phone || !body.email) {
        return NextResponse.json(
          { error: "Les Champs sont invalides !" },
          { status: 400, headers: corsHeaders }
        );
      }
      order = await db.order.create({
        data: {
          customer: {
            create: {
              name: body.nom + ` ` + body.prenom,
              firstName: body.prenom,
              lastName: body.nom,
              phone: body.phone,
              email: body.email,
            },
          },
          city: "Nabeul",
          location: "",
          country: "Tunisie",
          postalCode: "8000",
          phone: body.phone,
          infoSupp: body.infoSupp,
          nom: body.nom,
          prenom: body.prenom,
          modePaiement: "espece",
          status: "livre",
          paye: true,
          online: false,
        },
      });
    } else {
      const client = await db.user.findUnique({
        where: {
          id: body.clientId,
        },
      });

      if (!client) {
        return NextResponse.json(
          { error: "Client invalides !" },
          { status: 400, headers: corsHeaders }
        );
      }

      order = await db.order.create({
        data: {
          customer: {
            connect: {
              id: body.clientId,
            },
          },
          city: "Nabeul",
          location: "",
          country: "Tunisie",
          postalCode: "8000",
          phone: client.phone,
          infoSupp: "",
          nom: client.firstName ?? "",
          prenom: client.lastName ?? "",
          modePaiement: "espece",
          status: "livre",
          paye: true,
          online: false,
        },
      });
    }

    return NextResponse.json(
      { orderId: order.id, success: "Commande créer avec succès ! " },
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
