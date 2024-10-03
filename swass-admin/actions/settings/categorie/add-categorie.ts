"use server";
import * as z from "zod";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { CategorieFormSchema } from "@/schemas/settings";

export const AddCategorie = async (
  values: z.infer<typeof CategorieFormSchema>
) => {
  const validatedFields = CategorieFormSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  values = { ...validatedFields.data };

  try {
    const sameName = await db.categorie.findUnique({
      where: {
        name: values.name,
      },
    });

    if (sameName) return { error: "catégorie déjà existant !" };

    await db.categorie.create({
      data: {
        name: values.name,
      },
    });

    revalidatePath(`/parametres/configproduit/categorie`);

    return { success: "catégorie ajouté avec succès !" };
  } catch (error) {
    console.log(error);
    return { error: "Something Went wrong!" };
  }
};
