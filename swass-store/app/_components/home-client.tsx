"use client";
import { GetListProduitsType } from "@/server/server-only";
import { useMounted } from "@/hooks/use-mounted";
import Loading from "@/app/_components/loading";
import HomeHero from "@/app/_components/home-hero";
import InfiniteList from "@/app/_components/infinite-list";
import { CollecitonCarousel } from "@/app/_components/collection-carousel";
import { PvCarousel } from "@/app/_components/pv-carousel";
const HomeClient = ({
  produits,
  newCollectionProduits,
  pvProduits,
}: {
  produits: GetListProduitsType;
  newCollectionProduits: GetListProduitsType;
  pvProduits: GetListProduitsType;
}) => {
  const mounted = useMounted();
  if (!mounted) return <Loading />;

  return (
    <main className="space-y-10 lg:space-y-20 w-full min-h-screen mb-[200px]  ">
      <HomeHero />
      <CollecitonCarousel data={newCollectionProduits} />
      <PvCarousel data={pvProduits} />
      <div>
        <div className="text-center space-y-2 mb-10 px-2">
          <h2 className="font-semibold  text-accent   py-2">Pour Vous</h2>
          <p className="text-xs px-4 lg:text-base font-medium text-accent">
            Que vous cherchiez à affirmer votre style ou à explorer de nouvelles
            tendances
          </p>
        </div>
        <InfiniteList className="px-12 lg:px-[10%]  " initialData={produits} />
      </div>
    </main>
  );
};

export default HomeClient;
