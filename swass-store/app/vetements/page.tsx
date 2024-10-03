import { Suspense } from "react";
import VetementsClient from "./_components/vetement-client";
import TableFallBack from "@/components/loading-fallback";

export const dynamic = "force-dynamic";
const VetementPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  return (
    <div>
      <Suspense fallback={<TableFallBack />}>
        <VetementsClient searchParams={searchParams} />
      </Suspense>
    </div>
  );
};

export default VetementPage;



 

 
