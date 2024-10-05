"use server";
import * as z from "zod";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { TaillesFormSchema } from "@/schemas/settings";

export const AddTailles = async (values: z.infer<typeof TaillesFormSchema>) => {
  const validatedFields = TaillesFormSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  values = { ...validatedFields.data };

  try {
    const sameName = await db.tailles.findUnique({
      where: {
        name: values.name,
      },
    });

    if (sameName) return { error: "taille déjà existant !" };

    await db.tailles.create({
      data: {
        name: values.name.toUpperCase(),
      },
    });

    revalidatePath(`/parametres/configproduit/taille`);

    return { success: "taille ajouté avec succès !" };
  } catch (error) {
    console.log(error);
    return { error: "Something Went wrong!" };
  }
};
