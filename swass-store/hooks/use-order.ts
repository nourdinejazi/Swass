import { OrderSchema } from "@/schemas/settings";
import { z } from "zod";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface orderFormInterface {
  orderForm: z.infer<typeof OrderSchema>;
  selectedGroup: keyof orderFormInterface["orderForm"];
  setField: (
    groupKey: keyof orderFormInterface["orderForm"],
    fieldKey:
      | keyof orderFormInterface["orderForm"]["address"]
      | keyof orderFormInterface["orderForm"]["modeLivraison"]
      | keyof orderFormInterface["orderForm"]["modePaiement"],

    fieldValue: string | boolean
  ) => void;
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
  setSelectedGroup: (group: keyof orderFormInterface["orderForm"]) => void;
}

const useOrderForm = create(
  persist<orderFormInterface>(
    (set, get) => ({
      orderForm: {
        address: {
          nom: "",
          prenom: "",
          location: "",
          city: "",
          postalCode: "",
          country: "Tunisie",
          phone: "",
          phone2: "",
          infoSupp: "",
          completed: false,
        },
        modeLivraison: {
          mode: "",
          completed: false,
        },
        modePaiement: {
          paiement: "",
          completed: false,
        },
      },

      setField: (
        groupKey: keyof orderFormInterface["orderForm"],
        fieldKey:
          | keyof orderFormInterface["orderForm"]["address"]
          | keyof orderFormInterface["orderForm"]["modeLivraison"]
          | keyof orderFormInterface["orderForm"]["modePaiement"],

        fieldValue: string | boolean
      ) => {
        set({
          orderForm: {
            ...get().orderForm,
            [groupKey]: {
              ...get().orderForm[groupKey],
              [fieldKey]: fieldValue,
            },
          },
        });
      },

      selectedGroup: "address",
      _hasHydrated: false,

      setSelectedGroup: (group: keyof orderFormInterface["orderForm"]) => {
        set({
          selectedGroup: group,
        });
      },

      setHasHydrated: (state: boolean) => {
        set({
          _hasHydrated: state,
        });
      },
    }),

    {
      name: "orderForm",
      storage: createJSONStorage(() => localStorage),

      onRehydrateStorage: (state) => {
        console.log("hydration starts");
        return (state, error) => {
          if (error) {
            console.log("an error happened during hydration", error);
          } else {
            state?.setHasHydrated(true);
          }
        };
      },
    }
  )
);

export default useOrderForm;
