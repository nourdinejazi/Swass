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

    const name = query.name;
    const phone = query.phone;

    const clients = await db.user.findMany({
      where: {
        name: {
          contains: name as string,
          mode: "insensitive",
        },
        phone: {
          contains: phone as string,
          mode: "insensitive",
        },
      },

      select: {
        id: true,
        name: true,
        phone: true,
      },
    });

    return NextResponse.json(clients, { headers: corsHeaders });
  } catch (error) {
    console.log("[GET-PRODUIT-EROOR]", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 400 }
    );
  }
}
