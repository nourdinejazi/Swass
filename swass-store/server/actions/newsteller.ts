"use server";
import { db } from "@/lib/db";
import { NewsTellerShema } from "@/schemas/settings";
import { z } from "zod";

export const addCustomerEmail = async (
  data: z.infer<typeof NewsTellerShema>
) => {
  const validatedData = NewsTellerShema.safeParse(data);
  try {
    if (!validatedData.success) {
      return { error: "Email invalide" };
    }

    const user = await db.user.findFirst({
      where: {
        email: data.email,
      },
    });

    const email = await db.emails.findFirst({
      where: {
        email: data.email,
      },
    });

    if (user || email) {
      return { success: "Vous êtes déjà inscrit!" };
    }

    await db.emails.create({
      data: {
        email: data.email,
      },
    });

    return { success: "Vous êtes inscrit avec succès" };
  } catch (error) {
    console.log("[ERROR SENDING NEWSLETTER EMAIL]", error);
    return { error: "Something went wrong" };
  }
};
