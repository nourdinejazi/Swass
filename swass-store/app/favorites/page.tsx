"use client";
import useFavorites from "@/hooks/use-favorites";
import { Navigation } from "@/components/navigation";
import { useMediaQuery } from "@/hooks/use-media-query";
import ProdItem from "../_components/prod-item";
import MobileHomeItem from "../_components/mobile-home-item";

const FavoritesPage = () => {
  const favoris = useFavorites();
  const isDesktop = useMediaQuery("(min-width: 850px)");

  return (
    <main className="lg:px-[5%]  pb-[200px] bg-secondary">
      <Navigation />
      <section className="bg-white rounded-lg">
        <div className="text-center space-y-2 ">
          <h2 className="font-semibold  text-accent   py-3">Mes Favories</h2>
          <p className="text-xs lg:text-base font-meduim text-accent px-3">
            Voici vos articles favoris, Consultez-les ici pour un accès rapide à
            vos produits préférés
          </p>
        </div>
        {isDesktop ? (
          <div className=" flex gap-8 p-8 flex-wrap   ">
            {favoris.items.map((produit) => (
              <ProdItem
                cartButton
                className="w-[260px]"
                produit={produit}
                key={produit.id}
              />
            ))}
          </div>
        ) : (
          <div
            className="w-full grid   grid-cols-2   gap-8 p-2 py-8  "
            // style={{
            //   gridTemplateColumns: "repeat(auto-fit,minmax(200px, 1fr))",
            // }}
          >
            {favoris.items.map((produit) => (
              <MobileHomeItem cartButton produit={produit} key={produit.id} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default FavoritesPage;
