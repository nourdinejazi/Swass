"use server";
import * as z from "zod";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { CouleurFormSchema } from "@/schemas/settings";

export const AddCouleur = async (values: z.infer<typeof CouleurFormSchema>) => {
  const validatedFields = CouleurFormSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  values = { ...validatedFields.data };

  try {
    const sameName = await db.couleurs.findUnique({
      where: {
        name: values.name,
      },
    });

    if (sameName) {
      await db.couleurs.update({
        where: { name: values.name },
        data: {
          code: values.code,
        },
      });
      return { success: "mise à jour avec succès" };
    }

    const sameCode = await db.couleurs.findUnique({
      where: {
        code: values.code,
      },
    });
    if (sameCode) return { error: "code déjà existant !" };

    await db.couleurs.create({
      data: {
        name: values.name,
        code: values.code,
      },
    });

    revalidatePath(`/parametres/configproduit/couleur`);

    return { success: "couleur ajouté avec succès !" };
  } catch (error) {
    console.log(error);
    return { error: "Something Went wrong!" };
  }
};
