"use server";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";

export const DeleteTaille = async (name: string) => {
  try {
    await db.tailles.delete({
      where: {
        name: name,
      },
    });

    revalidatePath(`/parametres/configproduit/taille`);

    return { success: "taille supprimé avec succès !" };
  } catch (error) {
    console.log(error);
    return { error: "Something Went wrong!" };
  }
};
