import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FavoritesState {
  favorites: string[];
  toggleFavorite: (ticker: string) => void;
}

const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set) => ({
      favorites: [],
      toggleFavorite: (ticker) => set((state) => ({
        favorites: state.favorites.includes(ticker)
          ? state.favorites.filter((fav) => fav !== ticker)
          : [...state.favorites, ticker],
      })),
    }),
    {
      name: 'favorites-store', // unique name for the persisted state
    }
  )
);


export default useFavoritesStore;