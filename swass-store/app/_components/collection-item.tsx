import Currency from "@/components/currency";
import { placeholderImgs } from "@/data/placeholder";
import { GetProduitType } from "@/server/server-only";
import Image from "next/image";
import Link from "next/link";
const CollectionItem = ({ produit }: { produit: GetProduitType }) => {
  return (
    <Link href={"/produit/" + produit.reference}>
      <div className=" bg-white w-full max-w-[300px]  flex flex-col items-start gap-3 justify-center rounded-md border border-primary p-4">
        <div className="relative h-[300px] lg:h-[400px] w-full   ">
          {placeholderImgs[0]?.path !== undefined ? (
            <Image
              // src={`http://localhost:3001${placeholderImgs[0].path}`}
              src={placeholderImgs[0].path}
              fill
              alt="img"
              sizes="100"
              onLoadingComplete={(image) =>
                image.classList.remove("img--hidden")
              }
              className="object-cover object-center   h-auto w-full rounded-md  img img--hidden"
            ></Image>
          ) : (
            <div className="w-full h-full " />
          )}
        </div>
        <span className="font-medium">{produit.nom}</span>
        <Currency value={produit.prix} />
      </div>
    </Link>
  );
};

export default CollectionItem;
