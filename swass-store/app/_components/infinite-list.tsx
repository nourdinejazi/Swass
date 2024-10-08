"use client";
import { useMediaQuery } from "@/hooks/use-media-query";
import MobileHomeItem from "./mobile-home-item";
import { cn } from "@/lib/utils";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { GetListProduitsType } from "@/server/server-only";
import queryString from "query-string";
import ProdItem from "./prod-item";
import BigSpinner from "@/components/big-spinner";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const InfiniteList = ({
  cartButton,
  className,

  initialData,
}: {
  initialData: GetListProduitsType;
  cartButton?: boolean;
  className?: string;
}) => {
  const isDesktop = useMediaQuery("(min-width: 850px)");
  const [data, setData] = useState<GetListProduitsType>(initialData);

  const [loading, setLoading] = useState(false);
  const [ref, inView] = useInView();
  const [stopFetching, setStopFetching] = useState(false);
  const [page, setPage] = useState<number>(0);
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    setData(initialData);
    setPage(0);
    setStopFetching(false);
  }, [initialData]);

  async function loadMoreProduits() {
    if (stopFetching) return;
    if (data.length === 0) return;

    const newUrl = queryString.exclude(
      "http://localhost:3001/api/produit" + window.location.search,
      ["page"],
      {
        arrayFormat: "bracket-separator",
        arrayFormatSeparator: "|",
      }
    );
    if (data?.length) {
      setLoading(true);

      console.log(newUrl + (newUrl.includes("?") ? "&" : "?") + "page=" + page);
      fetch(newUrl + (newUrl.includes("?") ? "&" : "?") + "page=" + page)
        .then((res) => res.json())
        .then((nextPage) => {
          setData((prev) => [...prev, ...nextPage]);
          if (nextPage.length === 0) {
            setStopFetching(true);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }

  useEffect(() => {
    if (inView && data.length > 0) {
      setPage((prev) => {
        const newPage = prev + 1;
        return newPage;
      });
    }
  }, [inView]);

  useEffect(() => {
    if (page === 5 && path == "/") setStopFetching(true);

    if (page > 0) loadMoreProduits();
  }, [page]);

  // useEffect(() => {
  //   const sort = priceSort.sort;
  //   if (sort == "asc") {
  //     const sorted = data.sort((a, b) => a.prix - b.prix);
  //     setSortedData([...sorted]);
  //   } else if (sort == "desc") {
  //     const sorted = data.sort((a, b) => b.prix - a.prix);
  //     setSortedData([...sorted]);
  //   } else if (!sort) return;
  // }, [priceSort.sort, data]);

  return (
    //px-12 lg:px-[10%] md:p-20
    <div
      className={cn(
        className,
        "relative  flex flex-col    gap-8  items-center justify-start"
      )}
    >
      <span className="  text-sm mr-auto text-neutral-500 font-medium">
        {data.length} Produit(s)
      </span>
      {isDesktop ? (
        <div
          className="w-full   grid gap-8    "
          style={{
            gridTemplateColumns: "repeat(auto-fit,minmax(200px, 1fr))",
          }}
        >
          {data.map((produit) => (
            <ProdItem
              cartButton={cartButton}
              produit={produit}
              key={produit.id}
            />
          ))}
        </div>
      ) : (
        <div
          className="w-full grid   grid-cols-2   gap-8    "
          // style={{
          //   gridTemplateColumns: "repeat(auto-fit,minmax(200px, 1fr))",
          // }}
        >
          {data.map((produit) => (
            <MobileHomeItem
              cartButton={cartButton}
              produit={produit}
              key={produit.id}
            />
          ))}
        </div>
      )}

      <div
        ref={ref}
        className="col-span-1 mt-16 flex items-center justify-center sm:col-span-2 md:col-span-3 lg:col-span-4"
      >
        {loading && !stopFetching && <BigSpinner />}
        <span className="sr-only">Loading...</span>
      </div>

      {stopFetching && path == "/" && (
        <div className="flex items-center justify-center w-full">
          <Button
            size={"lg"}
            onClick={() => router.push("/vetements")}
            variant={"secondary"}
            className="  font-meduim z-50 flex items-center justify-center gap-2    "
          >
            <span>Voir Collection</span>
            <ArrowRight size={20} />
          </Button>
        </div>
      )}
    </div>
  );
};

export default InfiniteList;
