import "server-only";
import { db } from "@/lib/db";

export async function getProduits() {
  const produits = await db.produit.findMany({
    include: {
      categorie: true,
      stock: true,
      model: true,
      images: true,
    },
  });

  return produits;
}

export type GetListProduitsType = Awaited<ReturnType<typeof getProduits>>;
export type GetProduitType = GetListProduitsType[number];

export async function getCouleurs() {
  const couleurs = await db.couleurs.findMany();
  return couleurs;
}

export type GetListCouleursType = Awaited<ReturnType<typeof getCouleurs>>;
export type GetCouleurType = GetListCouleursType[number];

export async function getCategories() {
  const categories = await db.categorie.findMany();
  return categories;
}

export type GetListCategoriesType = Awaited<ReturnType<typeof getCategories>>;
export type GetCategorieType = GetListCategoriesType[number];

export async function getTailles() {
  const Tailles = await db.tailles.findMany();
  return Tailles;
}

export type GetListTaillesType = Awaited<ReturnType<typeof getTailles>>;
export type GetTailleType = GetListTaillesType[number];

export async function getPatterns() {
  const Paterns = await db.models.findMany();
  return Paterns;
}

export type GetListPatternsType = Awaited<ReturnType<typeof getPatterns>>;
export type GetPatternType = GetListPatternsType[number];


export async function getFamilles() {
  const Familles = await db.famille.findMany();
  return Familles;
}

export type GetListFamilleType = Awaited<ReturnType<typeof getFamilles>>;
export type getFamillesType = GetListFamilleType[number];
