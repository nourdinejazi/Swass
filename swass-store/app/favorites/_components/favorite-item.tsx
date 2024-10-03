"use client";
import { GetProduitType } from "@/server/server-only";

import { Button } from "@/components/ui/button";
import useFavorites from "@/hooks/use-favorites";
import { HeartFilledIcon } from "@radix-ui/react-icons";
import { Heart } from "lucide-react";

interface ProduitItemProps {
  data: GetProduitType;
}

const FavoriteItem = ({ data }: ProduitItemProps) => {
  const favoris = useFavorites();
  return (
    <div className="text-white p-5 m-5  bg-blue-400">
      <h1>{data.reference}</h1>
      <h1>{data.nom}</h1>
      <p>{data.description}</p>
      <p>{data.prix}</p>
      <div>
        <Button onClick={() => favoris.addItem(data)}>
          {favoris.items.find((item) => item.id === data.id) ? (
            <HeartFilledIcon />
          ) : (
            <Heart />
          )}
        </Button>
      </div>

      <p>{data.images.map((image) => image.path)}</p>
    </div>
  );
};

export default FavoriteItem;
