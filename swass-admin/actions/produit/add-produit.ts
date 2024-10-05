// "use server";
// import * as z from "zod";

// import { revalidatePath } from "next/cache";
// import { db } from "@/lib/db";
// import { ProduitFormSchema } from "@/schemas/settings";

// export const AddProduit = async (values: z.infer<typeof ProduitFormSchema>) => {
//   const validatedFields = ProduitFormSchema.safeParse(values);

//   if (!validatedFields.success) {
//     return { error: "Invalid fields!" };
//   }

//   values = { ...validatedFields.data };

//   try {
//     const model = await db.models.findUnique({
//       where: {
//         name: values.modele,
//       },
//     });

//     if (!model) return { error: "Modéle n'est pas existant !" };

//     const categorie = await db.categorie.findUnique({
//       where: {
//         name: values.categorie,
//       },
//     });

//     if (!categorie) return { error: "Categorie n'est pas existant !" };

//     await db.produit.create({
//       data: {
//         reference: values.reference,
//         nom: values.nom,
//         description: values.description,
//         prix: values.prix,
//         newCollection: values.newCollection,
//         etat: values.etat,
//         longeur: values.longeur,
//         sousCategorie: values.sousCategorie,
//         images: {
//           createMany: {
//             data: [{ path: "https://www.google.com" }],
//           },
//         },
//         promotion: values.promotion,
//         categorie: {
//           connect: {
//             name: values.categorie,
//           },
//         },
//         model: {
//           connect: {
//             name: values.modele,
//           },
//         },
//         couleur: {
//           create: values.couleurStock.map((item) => ({
//             stock: item.stock,
//             couleur: {
//               connect: {
//                 name: item.couleur,
//               },
//             },
//           })),
//         },
//         taille: {
//           create: values.sizeStock.map((item) => ({
//             stock: item.stock,
//             taille: {
//               connect: {
//                 name: item.size,
//               },
//             },
//           })),
//         },
//       },
//     });

//     revalidatePath(`/produit`);

//     return { success: "Produit ajouté avec succès !" };
//   } catch (error) {
//     console.log(error);
//     return { error: "Something Went wrong!" };
//   }
// };
