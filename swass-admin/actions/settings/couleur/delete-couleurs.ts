"use server";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";

export const DeleteCouleur = async (name: string) => {
  try {
    await db.couleurs.delete({
      where: {
        name: name,
      },
    });

    revalidatePath(`/parametres/configproduit/couleur`);

    return { success: "couleur supprimé avec succès !" };
  } catch (error) {
    console.log(error);
    return { error: "Something Went wrong!" };
  }
};
