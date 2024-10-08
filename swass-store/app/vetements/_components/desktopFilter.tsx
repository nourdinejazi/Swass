"use client";
import {
  GetListCategoriesType,
  GetListCouleursType,
  GetListFamilleType,
  GetListPatternsType,
  GetListTaillesType,
} from "@/server/server-only";

import { useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";
import { cn } from "@/lib/utils";
import { ArrowDown01, ArrowUp01, Check } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { useEffect, useState } from "react";
import Currency from "@/components/currency";
import { Separator } from "@/components/ui/separator";
import { useMounted } from "@/hooks/use-mounted";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const DesktopFilter = ({
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
  familles: GetListFamilleType;
  patterns: GetListPatternsType;
  longeurs: {
    name: string;
  }[];
}) => {
  const mounted = useMounted();

  const router = useRouter();
  const params = useSearchParams();

  const [curr, setCurr] = useState(
    queryString.parse(window.location.search, {
      arrayFormat: "bracket-separator",
      arrayFormatSeparator: "|",
    })
  );
  const [price, setPrice] = useState([Number(curr.prix)] || [0]);
  function removeEmptyArrays(obj: any): any {
    for (const key in obj) {
      if (Array.isArray(obj[key]) && obj[key].length === 0) {
        delete obj[key];
      } else if (obj[key] == 0) {
        delete obj[key];
      }
    }
    return obj;
  }

  const checkSelectedFilter = (name: string, value: string) => {
    if (curr) {
      if (curr[name]) {
        return (curr[name] as string[]).find((item) => item === value);
      }
    }
    return false;
  };

  useEffect(() => {
    setCurr(
      queryString.parse(location.search, {
        arrayFormat: "bracket-separator",
        arrayFormatSeparator: "|",
      })
    );
  }, [params]);

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
  console.log(curr);
  return (
    <div className="w-full   lg:max-w-[300px]   bg-white p-4 py-8  flex flex-col gap-5 border border-primary rounded-lg ">
      <div>
        <span className="w-1/2 h-full flex items-center justify-center gap-2 text-[#7A7676] font-medium">
          <Image
            src={"/filter.svg"}
            height={28}
            width={28}
            alt="sort-products-icon"
          />
          Trier
        </span>
        <div className="flex flex-col gap-2 mt-3">
          <Button
            variant={"ghost"}
            className={cn(
              "gap-2 flex items-center justify-start",
              params.toString().includes("prixSort=asc") &&
                "bg-accent text-accent-foreground"
            )}
            onClick={() => filterParams("prixSort", "asc")}
          >
            •<span>Prix</span> <ArrowUp01 size={17} />
          </Button>
          <Button
            variant={"ghost"}
            className={cn(
              "gap-2 flex items-center justify-start",
              params.toString().includes("prixSort=desc") &&
                "bg-accent text-accent-foreground"
            )}
            onClick={() => filterParams("prixSort", "desc")}
          >
            • <span>Prix</span> <ArrowDown01 size={17} />
          </Button>
        </div>
      </div>

      <div>
        <h4>Couleurs</h4>
        <ul className="  flex items-start justify-start gap-5 flex-wrap p-3 max-h-[200px] overflow-auto">
          {couleurs.map((couleur) => (
            <li key={couleur.id}>
              <button
                onClick={() => filterParams("couleurs", couleur.name)}
                id={couleur.id}
                style={{
                  backgroundColor: couleur.code,
                }}
                className={cn(
                  `rounded-full size-8 flex items-center justify-center relative   `
                )}
              >
                {params.toString().includes(couleur.name) && (
                  <Check size={16} className="absolute -top-1 -right-3" />
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <Separator />
      <div>
        <h4>Tailles</h4>
        <ul className=" flex items-start justify-start gap-4 flex-wrap p-3 ">
          {tailles.map((taille) => (
            <li key={taille.id}>
              <button
                onClick={() => filterParams("tailles", taille.name)}
                id={taille.id}
                className={cn(
                  `rounded-full min-w-8 min-h-8 p-1 flex items-center justify-center relative border `,
                  checkSelectedFilter("tailles", taille.name) &&
                    "border border-accent bg-primary text-accent font-medium"
                )}
              >
                {taille.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <Separator />

      <div className="space-y-2">
        <h4>Prix</h4>
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
            <span className={cn("text-neutral-500 text-sm")}>0.00 DT</span>
          )}
        </span>
      </div>
      <Separator />
      <div>
        <h4>Pattern</h4>
        <ul className=" flex  items-start justify-start gap-4 flex-wrap p-3 max-h-[200px] overflow-auto ">
          {patterns.map((patern) => (
            <li key={patern.id}>
              <button
                onClick={() => filterParams("patterns", patern.name)}
                id={patern.id}
                className={cn(
                  `rounded-full text-sm p-2 flex items-center justify-center relative border border-primary `,
                  checkSelectedFilter("patterns", patern.name) &&
                    "border border-accent bg-primary text-accent font-medium"
                )}
              >
                {patern.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <Separator />

      <div>
        <h4>Categorie</h4>
        <ul className=" flex  items-start justify-start gap-4 flex-wrap p-3 max-h-[200px] overflow-auto">
          {categories.map((categorie) => (
            <li key={categorie.id}>
              <button
                onClick={() => filterParams("categories", categorie.name)}
                id={categorie.id}
                className={cn(
                  `rounded-full text-sm p-2 flex items-center justify-center relative  border border-primary `,
                  checkSelectedFilter("categories", categorie.name) &&
                    "border border-accent bg-primary text-accent font-medium"
                )}
              >
                {categorie.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <Separator />
      <div>
        <h4 className="mb-3">Famille</h4>
        {/* <ul className=" flex  items-start justify-start gap-4 flex-wrap p-3 max-h-[200px] overflow-auto">
          {familles.map((famille) => (
            <li key={famille.id}>
              <button
                onClick={() => filterParams("famille", famille.name)}
                id={famille.id}
                className={cn(
                  `rounded-full text-sm p-2 flex items-center justify-center relative  border border-primary `,
                  checkSelectedFilter("familles", famille.name) &&
                    "border border-accent bg-primary text-accent font-medium"
                )}
              >
                {famille.name}
              </button>
            </li>
          ))}
        </ul> */}
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
          <SelectTrigger className="w-full">
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
      </div>
      <Separator />
      <div>
        <h4>Longeur</h4>
        <ul className=" flex  items-start justify-start gap-4 flex-wrap p-3 max-h-[200px] overflow-auto">
          {longeurs.map((longeur) => (
            <li key={longeur.name}>
              <button
                onClick={() => filterParams("longeurs", longeur.name)}
                id={longeur.name}
                className={cn(
                  `rounded-full  text-sm p-2 flex items-center justify-center relative  border border-primary `,
                  checkSelectedFilter("longeurs", longeur.name) &&
                    "border border-accent bg-primary text-accent font-medium"
                )}
              >
                {longeur.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <div className="items-top flex space-x-2">
          <Checkbox
            onCheckedChange={(value) => {
              console.log(value);
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
              New Collection
            </label>
            <p className="text-sm text-muted-foreground">
              Les articles de la nouvelle collection
            </p>
          </div>
        </div>
      </div>
      <Separator />
      <div>
        <div className="items-top flex space-x-2">
          <Checkbox
            onCheckedChange={(value) => {
              console.log(value);
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
    </div>
  );
};

export default DesktopFilter;
