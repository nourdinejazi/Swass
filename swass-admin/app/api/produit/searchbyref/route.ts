import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import queryString from "query-string";
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function GET(req: Request) {
  try {
    const current = queryString.parseUrl(req.url);

    const query = current.query;

    const produits = await db.produit.findMany({
      where: {
        reference: {
          contains: query.ref as string,
          mode: "insensitive",
        },
      },

      select: {
        reference: true,
        stock: true,
      },
    });

    return NextResponse.json(produits, { headers: corsHeaders });
  } catch (error) {
    console.log("[GET-PRODUIT-EROOR]", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 400 }
    );
  }
}
