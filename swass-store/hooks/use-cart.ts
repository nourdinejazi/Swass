import { create } from "zustand";
import { toast } from "react-hot-toast";
import { persist, createJSONStorage } from "zustand/middleware";

import { GetProduitType } from "@/server/server-only";

type cartItem = GetProduitType & {
  quantity: number;
  selectedCouleur: string;
  selectedTaille: string;
};

interface CartStore {
  items: cartItem[];
  open: boolean;
  setOpen: (open: boolean) => void;
  addItem: (data: cartItem) => void;
  removeItem: (data: cartItem, removeEntireItem?: boolean) => void;
  removeAll: () => void;
  getItem: (data: cartItem) => cartItem | undefined;
}

const sameItem = (item: cartItem, data: cartItem) => {
  if (
    item.id === data.id &&
    item.selectedCouleur === data.selectedCouleur &&
    item.selectedTaille === data.selectedTaille
  ) {
    return true;
  }
};

const findTheExistingItem = (currentItems: cartItem[], data: cartItem) => {
  return currentItems.find((item) => {
    return sameItem(item, data);
  });
};

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      open: false,
      setOpen: (open: boolean) => set({ open }),
      items: [],
      getItem: (data: cartItem) => {
        const currentItems = get().items;
        const existingItem = findTheExistingItem(currentItems, data);
        return existingItem;
      },
      addItem: (data: cartItem) => {
        const currentItems = get().items;
        const existingItem = findTheExistingItem(currentItems, data);

        if (existingItem) {
          const newItems = currentItems.map((item) => {
            if (sameItem(item, data)) {
              return { ...item, quantity: item.quantity + 1 };
            }
            return item;
          });
          set({ items: [...newItems] });
          return;
        }

        set({ items: [...get().items, data] });
        toast.success("Produit ajouté au panier!");
      },
      removeItem: (data: cartItem, removeEntireItem: boolean = false) => {
        const currentItems = get().items;
        const existingItem = findTheExistingItem(currentItems, data);
        if (!existingItem) return;
        if (!removeEntireItem && existingItem.quantity > 1) {
          const newItems = currentItems.map((item) => {
            if (sameItem(item, existingItem) && item.quantity > 1) {
              return { ...item, quantity: item.quantity - 1 };
            }
            return item;
          });
          set({ items: [...newItems] });
          return;
        }
        set({
          items: [
            ...get().items.filter((item) => !sameItem(item, existingItem)),
          ],
        });
        toast.success("Produit retiré du panier!");
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
