"use server";
import * as z from "zod";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { ModelesFormSchema } from "@/schemas/settings";

export const AddModeles = async (values: z.infer<typeof ModelesFormSchema>) => {
  const validatedFields = ModelesFormSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  values = { ...validatedFields.data };

  try {
    const sameName = await db.models.findUnique({
      where: {
        name: values.name,
      },
    });

    if (sameName) return { error: "modéle déjà existant !" };

    await db.models.create({
      data: {
        name: values.name,
      },
    });

    revalidatePath(`/parametres/configproduit/modele`);

    return { success: "modéle ajouté avec succès !" };
  } catch (error) {
    console.log(error);
    return { error: "Something Went wrong!" };
  }
};
