import { create } from "zustand";
interface usePriceSort {
  sort: "asc" | "desc" | null;
  setSort: (sort: "asc" | "desc" | null) => void;
}

export const usePriceSort = create<usePriceSort>((set) => ({
  sort: null,
  setSort: (sort) => set({ sort: sort }),
}));
