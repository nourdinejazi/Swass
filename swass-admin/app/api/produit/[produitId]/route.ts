import { ProduitFormSchema } from "@/schemas/settings";
import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function PATCH(
  req: Request,
  { params }: { params: { produitId: string } }
) {
  const formatPath = (path: string): string => {
    if (path.includes("/")) {
      return path.split("/")[path.split("/").length - 1];
    } else {
      return path;
    }
  };

  const uniqueStockValues = (array: any[]) => {
    const seen = new Set();

    for (const item of array) {
      const combination = `${item.produitId}-${item.couleurId}-${item.tailleId}`;

      if (seen.has(combination)) {
        return false; // Duplicate combination found
      }

      seen.add(combination);
    }

    return true; // All combina
  };
  try {
    const formData = await req.formData();
    const formDataValues = Object.fromEntries(formData.entries());

    const fileArray: Array<{ img: File | { path: string }; index: number }> =
      [];

    for (let [key, value] of formData.entries()) {
      if (key.includes("images")) {
        if (!(value instanceof File)) {
          fileArray.push({
            img: JSON.parse(value),
            index: parseInt(key.split("-")[1]),
          });
        }

        if (value instanceof File) {
          fileArray.push({
            img: Object.assign(value, {
              path: value.name,
            }) as File,
            index: parseInt(key.split("-")[1]),
          });
        }
      }
    }

    let values: z.infer<typeof ProduitFormSchema> = {
      reference: formDataValues.reference.toString(),
      nom: formDataValues.nom.toString(),
      description: formDataValues.description.toString(),
      categorie: formDataValues.categorie.toString(),
      famille: formDataValues.famille.toString(),
      model: formDataValues.modele.toString(),
      etat: formDataValues.etat.toString() as "" | "Disponible" | "En repture",

      longeur: formDataValues.longeur.toString() as
        | ""
        | "Midi"
        | "Mini"
        | "Maxi",
      stock: JSON.parse(formDataValues.stock as string),
      prix: Number(formDataValues.prix),
      promotion: Number(formDataValues.promotion),
      newCollection: formDataValues.newCollection === "true",
      archived: formDataValues.archived === "true",
      images: fileArray,
    };

    const validatedFields = ProduitFormSchema.safeParse(values);

    if (!validatedFields.success) {
      console.log(validatedFields.error.message);
      return NextResponse.json({ error: "Invalid fields!" }, { status: 400 });
    }

    const data = { ...validatedFields.data };
    // check for model

    if (!uniqueStockValues(data.stock))
      return NextResponse.json(
        { error: "Verifier les elements du stock !" },
        { status: 400 }
      );

    const produit = await db.produit.findUnique({
      where: {
        reference: data.reference,
      },
    });

    if (!produit)
      return NextResponse.json(
        { error: "Produit n'est pas existant !" },
        { status: 400 }
      );

    const model = await db.models.findUnique({
      where: {
        name: data.model,
      },
    });

    if (!model)
      return NextResponse.json(
        { error: "Modéle n'est pas existant !" },
        { status: 400 }
      );

    //check for categorie
    const categorie = await db.categorie.findUnique({
      where: {
        name: data.categorie,
      },
    });

    if (!categorie)
      return NextResponse.json(
        { error: "Categorie n'est pas existant !" },
        { status: 400 }
      );

    //check for categorie
    const famille = await db.famille.findUnique({
      where: {
        name: data.famille,
      },
    });

    if (!famille)
      return NextResponse.json(
        { error: "Famille n'est pas existant !" },
        { status: 400 }
      );

    try {
      await db.produit.update({
        where: {
          reference: data.reference,
        },
        data: {
          reference: data.reference,
          nom: data.nom,
          description: data.description,
          prix: data.prix,
          prixFinal: data.promotion
            ? data.prix - data.prix * (data.promotion / 100)
            : data.prix,
          newCollection: data.newCollection,
          archived: data.archived,
          etat: data.etat,
          longeur: data.longeur,
          images: {
            deleteMany: {},
          },
          promotion: data.promotion,
          categorie: {
            connect: {
              name: data.categorie,
            },
          },
          model: {
            connect: {
              name: data.model,
            },
          },
          famille: {
            connect: {
              name: data.famille,
            },
          },
          stock: {
            deleteMany: {},
          },
        },
      });
    } catch (err) {
      console.log("UPDATE PRODUIT 1", err);

      return NextResponse.json({ error: "Champs Invalide !" }, { status: 400 });
    }

    try {
      const totalStock = data.stock.reduce(
        (acc, stock) => acc + stock.stock,
        0
      );

      await db.produit.update({
        where: {
          reference: data.reference,
        },
        data: {
          images: {
            createMany: {
              data: [
                ...data.images.map((item) => {
                  return {
                    // the new image is a file with the only path=name  but the old image that stayed is an object the has a full path
                    path: `/${data.reference}/${formatPath(
                      item.img.path
                    )}`,
                    index: item.index,
                  };
                }),
              ],
            },
          },
          stock: {
            createMany: {
              data: [
                ...data.stock.map((stock) => {
                  return {
                    stock: stock.stock,
                    couleurId: stock.couleurId,
                    tailleId: stock.tailleId,
                  };
                }),
              ],
            },
          },

          etat: totalStock == 0 ? "En repture" : "Disponible",
        },
      });
    } catch (err) {
      console.log("UPDATE PRODUIT 2", err);
      return NextResponse.json({ error: "Champs Invalide !" }, { status: 400 });
    }

    // umplaod images
   

    // try {
    //   const filesData = new FormData();

    //   filesData.append("reference", data.reference);
    //   data.images.forEach((item) => {
    //     if (item.img instanceof File) {
    //       filesData.append("images", item.img);
    //     } else {
    //       filesData.append("exsistingimg" +"-"+ item.index, formatPath(item.img.path));
    //     }
    //   });

    //   await fetch(`${process.env.INTERNAL_MEDIA_URL}/media/produits`, {
    //     method: "PATCH",
    //     body: filesData,
    //   });
    // } catch (error) {
    //   console.log("[SEND-IMAGES-EROOR]", error);
    //   return new NextResponse("Internal error", { status: 500 });
    // }

    // fsr.readdir(`./public/uploads/produits/${data.reference}`, (err, files) => {
    //   if (err) {
    //     data.images.forEach(async (file) => {
    //       const arrayBuffer = await file.arrayBuffer();
    //       const buffer = new Uint8Array(arrayBuffer);
    //       await fs.mkdir(`./public/uploads/produits/${data.reference}`, {
    //         recursive: true,
    //       });

    //       await fs.writeFile(
    //         `./public/uploads/produits/${data.reference}/${file.name}`,
    //         buffer
    //       );
    //     });
    //     console.log("Directory create on update for " + data.reference);
    //     return;
    //   }

    //   data.images.forEach(async (image) => {
    //     //add new images
    //     if (!files.includes(formatPath(image.path))) {
    //       const arrayBuffer = await image.arrayBuffer();
    //       const buffer = new Uint8Array(arrayBuffer);

    //       await fs.writeFile(
    //         `./public/uploads/produits/${data.reference}/${formatPath(
    //           image.name
    //         )}`,
    //         buffer
    //       );
    //     }
    //   });
    //   //remove extra images
    //   files.forEach((file) => {
    //     if (
    //       !data.images.map((image) => formatPath(image.path)).includes(file)
    //     ) {
    //       fsr.unlink(
    //         `./public/uploads/produits/${data.reference}/${file}`,
    //         (err) => {
    //           if (err) {
    //             console.error(err);
    //             return;
    //           }
    //         }
    //       );
    //     }
    //   });
    // });

    revalidatePath(`/produit`);

    return NextResponse.json({ success: "Produit modifié avec succés" });
  } catch (error) {
    console.log("[UPDATE-PRODUIT-EROOR]", error);
    return NextResponse.json({ error: "Invalid fields!" }, { status: 400 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { produitId: string } }
) {
  try {
    if (!params.produitId) {
      return new NextResponse("Product id is required", { status: 400 });
    }

    const product = await db.produit.findUnique({
      where: {
        reference: params.produitId,
      },
      include: {
        images: true,
        stock: true,
      },
    });

    return NextResponse.json(product, { headers: corsHeaders });
  } catch (error) {
    console.log("[PRODUCT_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
