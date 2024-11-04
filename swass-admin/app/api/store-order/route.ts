import { currentUser } from "@/lib/auth";
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
    const session = await currentUser();
    if (!session) {
      return NextResponse.json(
        { error: "Vous n'êtes pas autorisé à effectuer cette action !" },
        { status: 401, headers: corsHeaders }
      );
    }
    const body = await req.json();
    console.log("[ADD-ORDER-BODY]", body);
    let order;

    if (!body.nom || !body.prenom || !body.phone) {
      return NextResponse.json(
        { error: "Les Champs sont invalides !" },
        { status: 400, headers: corsHeaders }
      );
    }
    order = await db.order.create({
      data: {
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
