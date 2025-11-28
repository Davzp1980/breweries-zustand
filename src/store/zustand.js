import { create } from "zustand";
import currentFactory from "../app/currentFactory/page";

export const BreweriesStore = create((set) => ({
  isLiked: false,
  breweries: [],
  favorite: [],
  forDelete: "",
  currentFactory: {},

  setBreweries: (newBreweries) => set({ breweries: newBreweries }),
  setIsLiked: (like) => set({ isLiked: like }),
  setFavorite: (newFavorite) =>
    set((state) => ({
      favorite: [...state.favorite, newFavorite],
    })),
  // setForDelete: (id) => set({ forDelete: id }),
  deleteFromFavorite: (id) =>
    set((state) => ({
      favorite: state.favorite.filter((fav) => fav.id != id),
    })),

  deleteAllFromFavorite: () => set({ favorite: [] }),

  setCurrentFactory: (newCurrentFactory) =>
    set({ currentFactory: newCurrentFactory }),
}));
