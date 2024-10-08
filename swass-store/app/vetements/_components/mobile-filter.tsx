"use client";
import Image from "next/image";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  GetListCategoriesType,
  GetListCouleursType,
  GetListFamilleType,
  GetListPatternsType,
  GetListTaillesType,
} from "@/server/server-only";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";
import { cn } from "@/lib/utils";
import { ArrowDown01, ArrowUp01, Check } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { useEffect, useState } from "react";
import Currency from "@/components/currency";
import { buttonVariants } from "@/components/ui/button";
import { useMounted } from "@/hooks/use-mounted";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
const MobileFilter = ({
  categories,
  couleurs,
  tailles,
  patterns,
  longeurs,
  familles,
}: {
  categories: GetListCategoriesType;
  couleurs: GetListCouleursType;
  tailles: GetListTaillesType;
  patterns: GetListPatternsType;
  familles: GetListFamilleType;
  longeurs: {
    name: string;
  }[];
}) => {
  const router = useRouter();
  const params = useSearchParams();
  const mounted = useMounted();
  const [curr, setCurr] = useState(
    queryString.parse(window.location.search, {
      arrayFormat: "bracket-separator",
      arrayFormatSeparator: "|",
    })
  );
  const [price, setPrice] = useState([Number(curr.prix)] || [0]);

  useEffect(() => {
    setCurr(
      queryString.parse(location.search, {
        arrayFormat: "bracket-separator",
        arrayFormatSeparator: "|",
      })
    );
  }, [params]);

  const checkSelectedFilter = (name: string, value: string) => {
    if (curr) {
      if (curr[name]) {
        return (curr[name] as string[]).find((item) => item === value);
      }
    }
    return false;
  };

  function removeEmptyArrays(obj: any): any {
    for (const key in obj) {
      if (Array.isArray(obj[key]) && obj[key].length === 0) {
        delete obj[key];
      }
    }
    return obj;
  }

  const filterParams = (name: string, id: string | boolean | undefined) => {
    const current = queryString.parse(location.search, {
      arrayFormat: "bracket-separator",
      arrayFormatSeparator: "|",
    });

    let query;

    if (
      name === "prix" ||
      name === "prixSort" ||
      name === "famille" ||
      name === "promotion" ||
      name === "newCollection"
    ) {
      query = {
        ...current,
        [name]: id,
      };
    } else if (
      current[name] &&
      (current[name] as string[])?.find((item) => item === id)
    ) {
      query = {
        ...current,
        [name]: (current[name] as string[]).filter((item) => item !== id),
      };
    } else {
      query = {
        ...current,
        [name]: current[name] ? [...(current[name] as string[]), id] : [id],
      };
    }

    query = removeEmptyArrays(query);
    console.log("query", query);
    const url =
      window.location.origin +
      window.location.pathname +
      "?" +
      queryString.stringify(
        query,

        {
          arrayFormat: "bracket-separator",
          arrayFormatSeparator: "|",
          skipEmptyString: true,
          skipNull: true,
        }
      );

    router.push(url);
  };
  if (!mounted) return null;
  return (
    <div className="w-full lg:hidden h-[50px] flex border border-primary ">
      <Sheet>
        <SheetTrigger className="w-1/2 h-full flex items-center justify-center gap-2 text-[#7A7676] font-medium border-r border-primary ">
          <Image
            src={"/filter.svg"}
            height={28}
            width={28}
            alt="filter-products-icon"
          />
          Filtrer
        </SheetTrigger>
        <SheetContent className="overflow-auto" side={"right"}>
          <SheetHeader>
            <SheetTitle>Filtrer</SheetTitle>
          </SheetHeader>

          <Accordion
            defaultValue={[...params.keys()].map((key) =>
              key.replace(/\[|\]/g, "")
            )}
            type="multiple"
          >
            <AccordionItem value="couleur">
              <AccordionTrigger>Couleur</AccordionTrigger>
              <AccordionContent>
                <ul className=" flex items-start justify-start gap-5 flex-wrap p-3">
                  {couleurs.map((couleur) => (
                    <li key={couleur.id}>
                      <button
                        onClick={() => filterParams("couleurs", couleur.name)}
                        id={couleur.id}
                        style={{
                          backgroundColor: couleur.code,
                        }}
                        className={cn(
                          `rounded-full size-8 flex items-center justify-center relative `
                        )}
                      >
                        {params.toString().includes(couleur.name) && (
                          <Check
                            size={16}
                            className="absolute -top-1 -right-3"
                          />
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="tailles">
              <AccordionTrigger>Taille</AccordionTrigger>
              <AccordionContent>
                <ul className=" flex items-start justify-start gap-4 flex-wrap p-3">
                  {tailles.map((taille) => (
                    <li key={taille.id}>
                      <button
                        onClick={() => filterParams("tailles", taille.name)}
                        id={taille.id}
                        className={cn(
                          `rounded-full min-w-8 min-h-8 p-1 flex items-center border justify-center relative `,
                          checkSelectedFilter("tailles", taille.name) &&
                            "border border-accent bg-primary text-accent font-medium"
                        )}
                      >
                        {taille.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="prix">
              <AccordionTrigger>Prix</AccordionTrigger>
              <AccordionContent className=" p-3">
                <Slider
                  value={price}
                  onValueChange={(value) => {
                    setPrice(value);
                    filterParams("prix", value.toString());
                  }}
                  max={500}
                  step={10}
                />
                <span>
                  A partir de{" "}
                  {price[0] > 0 ? (
                    <Currency value={price[0]} />
                  ) : (
                    <span className={cn("text-neutral-500 text-sm")}>
                      0.00 DT
                    </span>
                  )}
                </span>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="pattern">
              <AccordionTrigger>Pattern</AccordionTrigger>
              <AccordionContent>
                <ul className=" flex  items-start justify-start gap-4 flex-wrap p-3">
                  {patterns.map((patern) => (
                    <li key={patern.id}>
                      <button
                        onClick={() => filterParams("patterns", patern.name)}
                        id={patern.id}
                        className={cn(
                          `rounded-full  p-2 flex items-center justify-center relative `,
                          checkSelectedFilter("patterns", patern.name) &&
                            "border border-accent bg-primary text-accent font-medium"
                        )}
                      >
                        {patern.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="categorie">
              <AccordionTrigger>Categorie</AccordionTrigger>
              <AccordionContent>
                <ul className=" flex  items-start justify-start gap-4 flex-wrap p-3">
                  {categories.map((categorie) => (
                    <li key={categorie.id}>
                      <button
                        onClick={() =>
                          filterParams("categories", categorie.name)
                        }
                        id={categorie.id}
                        className={cn(
                          `rounded-full  p-2 flex items-center justify-center relative `,
                          checkSelectedFilter("categories", categorie.name) &&
                            "border border-accent bg-primary text-accent font-medium"
                        )}
                      >
                        {categorie.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="famille">
              <AccordionTrigger>Famille</AccordionTrigger>
              <AccordionContent>
                <Select
                  defaultValue={(curr.famille as string) || "Tous"}
                  onValueChange={(value) => {
                    if (value === "Tous") {
                      filterParams("famille", undefined);
                    } else {
                      filterParams("famille", value);
                    }
                  }}
                >
                  <SelectTrigger className="w-[90%] mt-2 ml-2 ">
                    <SelectValue placeholder="Famille" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={"Tous"}>Tous</SelectItem>
                    {familles.map((famille) => (
                      <SelectItem key={famille.id} value={famille.name}>
                        {famille.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="longeur">
              <AccordionTrigger>Longeur</AccordionTrigger>
              <AccordionContent>
                <ul className=" flex  items-start justify-start gap-4 flex-wrap p-3">
                  {longeurs.map((longeur) => (
                    <li key={longeur.name}>
                      <button
                        onClick={() => filterParams("longeurs", longeur.name)}
                        id={longeur.name}
                        className={cn(
                          `rounded-full  p-2 flex items-center justify-center relative `,
                          checkSelectedFilter("longeurs", longeur.name) &&
                            "border border-accent bg-primary text-accent font-medium"
                        )}
                      >
                        {longeur.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <div className="mt-5">
            <div className="items-top flex space-x-2 ">
              <Checkbox
                onCheckedChange={(value) => {
                  if (value) {
                    filterParams("promotion", value);
                  } else {
                    filterParams("promotion", undefined);
                  }
                }}
                checked={curr.promotion === "true" ? true : false}
              />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="terms1"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Soldes
                </label>
                <p className="text-sm text-muted-foreground">
                  Les articles en soldes
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <div className="items-top flex space-x-2 ">
              <Checkbox
                onCheckedChange={(value) => {
                  if (value) {
                    filterParams("newCollection", value);
                  } else {
                    filterParams("newCollection", undefined);
                  }
                }}
                checked={curr.newCollection === "true" ? true : false}
              />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="terms1"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  new Collection
                </label>
                <p className="text-sm text-muted-foreground">
                  Les articles en soldes
                </p>
              </div>
            </div>
          </div>
          <div className="flex">
            <SheetClose className={cn(buttonVariants(), "my-4 ml-auto")}>
              Fermer
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
      <DropdownMenu>
        <DropdownMenuTrigger className="w-1/2 h-full flex items-center justify-center gap-2 text-[#7A7676] font-medium">
          <Image
            src={"/filter.svg"}
            height={28}
            width={28}
            alt="sort-products-icon"
          />
          Trier
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-secondary">
          <DropdownMenuLabel>Trier par Prix</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => filterParams("prixSort", "asc")}
            className="space-x-2"
          >
            <span>Prix</span> <ArrowUp01 size={17} />
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => filterParams("prixSort", "desc")}
            className="space-x-2"
          >
            <span>Prix</span> <ArrowDown01 size={17} />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default MobileFilter;
