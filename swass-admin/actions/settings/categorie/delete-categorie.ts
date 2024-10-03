"use server";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";

export const DeleteCategorie = async (name: string) => {
  try {
    await db.categorie.delete({
      where: {
        name: name,
      },
    });

    revalidatePath(`/parametres/configproduit/categorie`);

    return { success: "catégorie supprimé avec succès !" };
  } catch (error) {
    console.log(error);
    return { error: "Something Went wrong!" };
  }
};
