"use server";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";

export const DeleteModeles = async (name: string) => {
  try {
    await db.models.delete({
      where: {
        name: name,
      },
    });

    revalidatePath(`/parametres/configproduit/modele`);

    return { success: "modéle supprimé avec succès !" };
  } catch (error) {
    console.log(error);
    return { error: "Something Went wrong!" };
  }
};
