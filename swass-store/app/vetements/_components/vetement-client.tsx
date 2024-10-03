import { Navigation } from "@/components/navigation";
import {
  getCategories,
  getCouleurs,
  getFamilles,
  getPatterns,
  getTailles,
} from "@/server/server-only";
import MobileFilter from "./mobile-filter";
import DesktopFilter from "./desktopFilter";
import VetementClientWrapper from "./vetement-client-wrapper";
import InfiniteListClient from "./infintelist-client";
import TableFallBack from "@/components/loading-fallback";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

const VetementsClient = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  const couleurs = await getCouleurs();
  const categories = await getCategories();
  const tailles = await getTailles();
  const patterns = await getPatterns();
  const familles = await getFamilles();

  return (
    <VetementClientWrapper>
      <main className="lg:px-[5%]  pb-[200px] bg-secondary">
        <Navigation pathArr={["Vêtements"]} />
        <MobileFilter
          categories={categories}
          couleurs={couleurs}
          tailles={tailles}
          familles={familles}
          patterns={patterns}
          longeurs={[{ name: "Mini" }, { name: "Maxi" }, { name: "Midi" }]}
        />
        <div className="w-full flex gap-10   ">
          <div className="hidden lg:block flex-grow-0">
            <DesktopFilter
              categories={categories}
              couleurs={couleurs}
              familles={familles}
              tailles={tailles}
              patterns={patterns}
              longeurs={[{ name: "Mini" }, { name: "Maxi" }, { name: "Midi" }]}
            />
          </div>
          <Suspense fallback={<TableFallBack />}>
            <InfiniteListClient searchParams={searchParams} />
          </Suspense>
        </div>
      </main>
    </VetementClientWrapper>
  );
};

export default VetementsClient;
