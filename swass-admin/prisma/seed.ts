import { PrismaClient } from "@prisma/client";
import fs from "fs";

const prisma = new PrismaClient();

function convertDateFormat(dateStr: string): string {
  let parts = dateStr.split("/");
  let year = +parts[2];
  let month = +parts[1] - 1;
  let day = +parts[0];

  if (
    isNaN(year) ||
    isNaN(month) ||
    isNaN(day) ||
    year < 0 ||
    month < 0 ||
    month > 11 ||
    day < 1 ||
    day > 31
  ) {
    return new Date().toISOString();
  }

  let dateObj = new Date(year, month, day);
  let formattedDate = dateObj.toISOString();

  if (formattedDate === "Invalid Date") {
    throw new Error(`Invalid date: ${dateStr}`);
  }

  return formattedDate;
}

const deleteProdsAndStocks = async () => {
  await prisma.stock.deleteMany({});
  await prisma.produit.deleteMany({});
};

async function seedDatabase() {
  try {
    let data;
    //deleteProdsAndStocks();

    const couleurs = fs.readFileSync(
      "C:/Users/FORGE/projects/swass/prisma/couleur.json",
      "utf-8"
    );

    data = JSON.parse(couleurs);

    await prisma.couleurs.createMany({
      data,
    });

    const categories = fs.readFileSync(
      "C:/Users/FORGE/projects/swass/prisma/cat.json",
      "utf-8"
    );

    data = JSON.parse(categories);

    await prisma.categorie.createMany({
      data,
    });
    const familles = fs.readFileSync(
      "C:/Users/FORGE/projects/swass/prisma/famille.json",
      "utf-8"
    );

    data = JSON.parse(familles);

    await prisma.famille.createMany({
      data,
    });

    const models = fs.readFileSync(
      "C:/Users/FORGE/projects/swass/prisma/model.json",
      "utf-8"
    );

    data = JSON.parse(models);

    await prisma.models.createMany({
      data,
    });

    const tailles = fs.readFileSync(
      "C:/Users/FORGE/projects/swass/prisma/taille.json",
      "utf-8"
    );

    data = JSON.parse(tailles);

    await prisma.tailles.createMany({
      data,
    });

    const produits = fs.readFileSync(
      "C:/Users/FORGE/projects/swass/prisma/products.json",
      "utf-8"
    );
    data = JSON.parse(produits);

    await prisma.produit.createMany({
      data,
    });

    const result =
      await prisma.$executeRaw`UPDATE "Produit" SET "prixFinal" = prix - prix * (promotion / 100) ;`;

    // const stocks = fs.readFileSync(
    //   "C:/Users/FORGE/projects/swass/prisma/stock.json",
    //   "utf-8"
    // );

    // const ids = (await prisma.produit.findMany({})).map((p) => p.id);

    // data = JSON.parse(stocks);

    // let i = 0;
    // let k = 0;
    // console.log("data length", data.length);

    // while (k < data.length) {
    //   for (let j = k; j < k + 10; j++) {
    //     data[j].produitId = ids[i];
    //   }
    //   k += 10;
    //   i++;
    // }

    // await prisma.stock.createMany({
    //   data,
    // });

    // const order = fs.readFileSync(
    //   "C:/Users/FORGE/projects/swass/prisma/order.json",
    //   "utf-8"
    // );

    // data = JSON.parse(order);

    // await prisma.order.createMany({
    //   data,
    // });

    // const orderItem = fs.readFileSync(
    //   "C:/Users/FORGE/projects/swass/prisma/order-item.json",
    //   "utf-8"
    // );

    // data = JSON.parse(orderItem);

    // await prisma.orderItem.createMany({
    //   data,
    // });

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error(error);
  }
}

seedDatabase();
