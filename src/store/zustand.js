import { create } from "zustand";

export const BreweriesStore = create((set) => ({
  isLiked: false,
  breweries: [],
  bufferBreweries: [],
  selected: [],

  currentFactory: {},

  setBreweries: (newBreweries) => set({ breweries: newBreweries }),
  // setIsLiked: (like) => set({ isLiked: like }),
  setSelected: (newSelected) =>
    set((state) => ({
      selected: [...state.selected, newSelected],
    })),

  deleteFromSelected: (id) =>
    set((state) => ({
      selected: state.selected.filter((fav) => fav.id != id),
    })),

  deleteAllFromSelected: () => set({ selected: [] }),

  setCurrentFactory: (newCurrentFactory) =>
    set({ currentFactory: newCurrentFactory }),

  setBufferBreweries: (newBufferBreweries) =>
    set({ bufferBreweries: newBufferBreweries }),
}));
