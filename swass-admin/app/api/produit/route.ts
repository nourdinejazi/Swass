import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import queryString from "query-string";
import { ProduitFormSchema } from "@/schemas/settings";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const formDataValues = Object.fromEntries(formData.entries());

    const fileArray: Array<{ img: File; index: number }> = [];

    for (let [key, value] of formData.entries()) {
      if (value instanceof File && key.includes("images")) {
        fileArray.push({
          img: value as File,
          index: parseInt(key.split("-")[1]),
        });
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

 
    // if (
    //   !uniqueCouleurStock(data.couleurStock) ||
    //   !uniqueSizeStock(data.sizeStock)
    // )
    //   return NextResponse.json(
    //     { error: "deux champ avec le meme couleur ou taille!" },
    //     { status: 400 }
    //   );

    const produit = await db.produit.findUnique({
      where: {
        reference: data.reference,
      },
    });

    if (produit)
      return NextResponse.json(
        { error: "référence est déjà existant !" },
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

    try {
      await db.produit.create({
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
            createMany: {
              data: [
                ...data.images.map((image) => {
                  return {
                    path: `/${data.reference}/${image.img.name}`,
                    index: image.index,
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
          promotion: data.promotion,
          categorie: {
            connect: {
              name: data.categorie,
            },
          },
          famille: {
            connect: {
              name: data.famille,
            },
          },
          model: {
            connect: {
              name: data.model,
            },
          },
        },
      });
    } catch (error) {
      console.log("[ADD-PRODUIT-EROOR]", error);
      return NextResponse.json(
        { error: "Les Champs sont invalides !" },
        { status: 400 }
      );
    }
  
    try {
      const filesData = new FormData();

      filesData.append("reference", data.reference);
      data.images.forEach((file) => {
        filesData.append("images", file.img);
      });

      await fetch(`${process.env.INTERNAL_MEDIA_URL}/media/produits`, {
        method: "POST",
        body: filesData,
      });
    } catch (error) {
      console.log("[SEND-IMAGES-EROOR]", error);
      return new NextResponse("Internal error", { status: 500 });
    }

    // umplaod images
    // data.images.forEach(async (file) => {
    //   const arrayBuffer = await file.arrayBuffer();
    //   const buffer = new Uint8Array(arrayBuffer);
    //   await fs.mkdir(`./public/uploads/produits/${data.reference}`, {
    //     recursive: true,
    //   });

    //   await fs.writeFile(
    //     `./public/uploads/produits/${data.reference}/${file.name}`,
    //     buffer
    //   );
    // });

    revalidatePath(`/produit`);

    return NextResponse.json({ success: "Produit  ajouté avec succés" });
  } catch (error) {
    console.log("[ADD-PRODUIT-EROOR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

type QueryType = {
  take: number;
  skip: number;
  where: {
    modelId: { in: string[] | undefined };
    categorieId: { in: string[] | undefined };
    familleId: string | undefined;
    longeur: { in: string[] | undefined };
    prixFinal: { gte: number | undefined };
    promotion?: { gt: 0 | undefined };
    newCollection: boolean | undefined;
    archived: false;
    stock?: {
      some: {
        couleurId: {
          in: string[] | undefined;
        };
        tailleId: {
          in: string[] | undefined;
        };
        stock: {
          gt: 0;
        };
      };
    };
  };

  include: {
    images: boolean;
    stock: boolean;
  };

  orderBy: [
    {
      prixFinal: "asc" | "desc" | undefined;
    },
    {
      id: "asc";
    }
  ];
};

export async function GET(req: Request) {
  try {
    const current = queryString.parseUrl(req.url, {
      arrayFormat: "bracket-separator",
      arrayFormatSeparator: "|",
      parseNumbers: true,
      parseBooleans: true,
    });

    let query = current.query;

    Object.keys(query).forEach((key) => {
      if (Array.isArray(query[key]) && query[key][0] === "") {
        query[key] = null;
      }
    });

    let queryParams: QueryType = {
      take: 10,
      skip: query.page ? (query.page as unknown as number) * 10 : 0,
      where: {
        modelId: {
          in: (query.patterns as string[] | null) || undefined,
        },
        categorieId: {
          in: (query.categories as string[] | null) || undefined,
        },
        familleId: query.famille as string | undefined,
        longeur: {
          in: (query.longeurs as string[] | null) || undefined,
        },
        prixFinal: {
          gte: (query.prix as number | null) || undefined,
        },
        newCollection: (query.newCollection as boolean | null) || undefined,
        archived: false,
      },

      include: {
        images: true,
        stock: true,
      },
      orderBy: [
        { prixFinal: query.prixSort as "asc" | "desc" | undefined },
        { id: "asc" },
      ],
    };

    if (query.couleurs || query.tailles) {
      queryParams.where.stock = {
        some: {
          couleurId: {
            in: query.couleurs as string[] | undefined,
          },
          tailleId: {
            in: query.tailles as string[] | undefined,
          },
          stock: {
            gt: 0,
          },
        },
      };
    }

    if (query.promotion) {
      queryParams.where.promotion = {
        gt: 0,
      };
    }

    const produits = await db.produit.findMany(queryParams);

    return NextResponse.json(produits, { headers: corsHeaders });
  } catch (error) {
    console.log("[GET-PRODUIT-EROOR]", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 400 }
    );
  }
}
