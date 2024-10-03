import Currency from "@/components/currency";
import { placeholderImgs } from "@/data/placeholder";
import { GetProduitType } from "@/server/server-only";
import Image from "next/image";
import Link from "next/link";
const PvItem = ({ produit }: { produit: GetProduitType }) => {
  return (
    <Link href={"/produit/" + produit.reference}>
      <div className=" bg-transparent  w-full max-w-[250px]  flex flex-col items-start   justify-center        ">
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
              className="object-cover    h-auto w-full  rounded-t-md  img img--hidden"
            ></Image>
          ) : (
            <div className="w-full h-full " />
          )}
        </div>
        <div className="space-y-2 bg-white w-full rounded-l-md rounded-t-none p-3 ">
          <h5 className="font-medium text-black">{produit.nom}</h5>
          <Currency value={produit.prix} />
        </div>
      </div>
    </Link>
  );
};

export default PvItem;
