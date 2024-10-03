import SmallSpinner from "@/components/small-spinner";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { motion, useAnimation } from "framer-motion";
import { Search } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// const SearchBar = () => {
//   return (
//     <div className="relative  flex-grow max-w-[500px] mx-10  ">
//       <Input
//         className="   bg-white     rounded-[30px] placeholder:text-[#B3B3B3]"
//         placeholder="Chercher un produit"
//       />
//       <Search size={17} strokeWidth={1} className="absolute top-2.5 right-5 " />
//     </div>
//   );
// };

function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default function SearchBar() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [refs, setRefs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();
  const params = useParams();
  const debouncedValue = useDebounce(value, 200);

  const mainControls = useAnimation();
  useEffect(() => {
    if (open) {
      mainControls.start("visible");
    }
  }, [open, mainControls, value]);

  function fetchRefs() {
    try {
      fetch(
        `http://localhost:3001/api/produit/searchbyref?ref=${debouncedValue}`
      )
        .then((res) => res.json())
        .then((data) => {
          setRefs(data);
          setIsLoading(false);
        });
    } catch (err) {
      console.log(err);
      setIsLoading(false); // Ensure loading state is reset on error
    }
  }

  useEffect(() => {
    if (debouncedValue) {
      setIsLoading(true);
      fetchRefs();
    }
  }, [debouncedValue]);
  return (
    <div className="relative  flex-grow max-w-[500px] lg:mx-10  ">
      <Input
        className="   bg-white     rounded-[30px] placeholder:text-[#B3B3B3]"
        value={value}
        onClick={() => setOpen(true)}
        placeholder="Taper une référence"
        disabled={isPending}
        onChange={(ev) => {
          setValue((prev) => {
            setOpen(true);
            return ev.target.value;
          });
        }}
      />

      <Search size={17} strokeWidth={1} className="absolute top-2.5 right-5 " />
      {open && value.length > 0 && (
        <>
          <div
            onClick={() => setOpen(false)}
            className={cn(
              "fixed inset-0 z-50     data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
            )}
          />
          <motion.div
            variants={{
              hidden: { opacity: 0, x: -200 },
              visible: { opacity: 1, x: 0 },
            }}
            initial="hidden"
            animate={mainControls}
            transition={{
              duration: 0.5,
              delay: 0,
              type: "spring",
            }}
            className="absolute top-12 shadow-lg left-0 bg-white border  rounded-md w-[300px] h-[200px] z-50  "
          >
            {isLoading ? (
              <div className="w-full h-full flex items-center justify-center">
                <SmallSpinner className=" h-7 w-7" />
              </div>
            ) : (
              <div className="flex flex-col  gap-2 items-start justify-start w-full h-full overflow-y-auto p-4">
                {refs.length === 0 && (
                  <div className="flex items-center justify-center w-full h-full">
                    <span className="text-sm text-neutral-500">
                      Aucun produit trouvé
                    </span>
                  </div>
                )}

                {refs.map((item: any) => (
                  <button
                    className=" hover:bg-secondary w-full transition-colors "
                    onClick={() => {
                      router.push(`/produit/${item.reference}`);
                      setValue(item.reference);
                      setOpen(false);
                    }}
                    key={item.reference}
                  >
                    {item.reference}
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        </>
      )}
    </div>
  );
}
