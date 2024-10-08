import "server-only";

import { db } from "@/lib/db";

export async function decrementStock(
  produitId: number,
  tailleId: string,
  couleurId: string,
  qte: number
) {
  const updatedStock = await db.stock.update({
    where: {
      produitId_tailleId_couleurId: {
        produitId: produitId,
        tailleId: tailleId,
        couleurId: couleurId,
      },
    },
    data: {
      stock: {
        decrement: qte,
      },
    },
  });

  if (updatedStock.stock == 0) {
    await db.produit.update({
      where: {
        id: produitId,
      },
      data: {
        etat: "En repture",
      },
    });
  }
}

export async function incrementStock(
  produitId: number,
  tailleId: string,
  couleurId: string,
  qte: number
) {
  const updatedStock = await db.stock.update({
    where: {
      produitId_tailleId_couleurId: {
        produitId: produitId,
        tailleId: tailleId,
        couleurId: couleurId,
      },
    },
    data: {
      stock: {
        increment: qte,
      },
    },
  });

  if (updatedStock.stock - qte == 0) {
    await db.produit.update({
      where: {
        id: produitId,
      },
      data: {
        etat: "Disponible",
      },
    });
  }
}
