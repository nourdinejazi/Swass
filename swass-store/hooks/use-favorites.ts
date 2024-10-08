import { create } from "zustand";
import { toast } from "react-hot-toast";
import { persist, createJSONStorage } from "zustand/middleware";

import { GetProduitType } from "@/server/server-only";

interface FavoriteStore {
  items: GetProduitType[];
  addItem: (data: GetProduitType) => void;
  removeItem: (id: number) => void;
  removeAll: () => void;
}
const useCart = create(
  persist<FavoriteStore>(
    (set, get) => ({
      items: [],
      addItem: (data: GetProduitType) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === data.id);

        if (existingItem) {
          set({
            items: [
              ...get().items.filter((item) => item.id !== existingItem.id),
            ],
          });
          return toast("Retiré des favoris.");
        }

        set({ items: [...get().items, data] });
        toast.success("Ajouté des favoris.");
      },
      removeItem: (id: number) => {
        set({ items: [...get().items.filter((item) => item.id !== id)] });
        return toast("Retiré des favoris.");
      },
      removeAll: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;
