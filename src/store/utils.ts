import { create } from "zustand";

interface MyStoreState {
  place: string;
  loadingCity: boolean;
  setPlace: (newPlace: string) => void;
  setLoadingCity: (isLoading: boolean) => void;
}

// Create Zustand store
export const useStore = create<MyStoreState>((set) => ({
  place: "Indonesia",
  loadingCity: false,
  setPlace: (newPlace) => set({ place: newPlace }),
  setLoadingCity: (isLoading) => set({ loadingCity: isLoading }),
}));
