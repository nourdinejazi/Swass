"use server";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";

export const DeleteFamille = async (name: string) => {
  try {
    await db.famille.delete({
      where: {
        name: name,
      },
    });

    revalidatePath(`/parametres/configproduit/famille`);

    return { success: "Famille supprimé avec succès !" };
  } catch (error) {
    console.log(error);
    return { error: "Something Went wrong!" };
  }
};
