import { NextResponse } from "next/server";
import { readFileSync } from "node:fs";

export async function GET(
  req: Request,
  { params }: { params: { ref: string } }
) {
  try {
    const file = readFileSync(
      `./uploads/produits/${params.ref[0]}/${params.ref[1]}`
    );

    console.log(file, "here");
    return new NextResponse(file);
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        error: "file not found",
      },
      { status: 404 }
    );
  }
}
