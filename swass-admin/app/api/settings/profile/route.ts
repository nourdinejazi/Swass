import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import fs from "node:fs/promises";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const title = formData.get("title");
    const description = formData.get("description");
    const file = formData.get("file") as File;
    if (file) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = new Uint8Array(arrayBuffer);
      await fs.writeFile(`./public/uploads/profile/${file.name}`, buffer);
      await db.profile.update({
        where: { key: 1 },
        data: {
          title: title as string,
          description: description as string,
          imageFile: `/uploads/profile/${file.name}`,
        },
      });
    }

    await db.profile.update({
      where: { key: 1 },
      data: {
        title: title as string,
        description: description as string,
      },
    });

    return NextResponse.json({});
  } catch (error) {
    console.log("[SIZES_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
