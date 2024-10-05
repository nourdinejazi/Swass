"use server";
import * as z from "zod";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { FamilleFormSchema } from "@/schemas/settings";

export const AddFamille = async (values: z.infer<typeof FamilleFormSchema>) => {
  const validatedFields = FamilleFormSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  values = { ...validatedFields.data };

  try {
    const sameName = await db.famille.findUnique({
      where: {
        name: values.name,
      },
    });

    if (sameName) return { error: "catégorie déjà existant !" };

    await db.famille.create({
      data: {
        name: values.name,
      },
    });

    revalidatePath(`/parametres/configproduit/famille`);

    return { success: "Famille ajouté avec succès !" };
  } catch (error) {
    console.log(error);
    return { error: "Something Went wrong!" };
  }
};
