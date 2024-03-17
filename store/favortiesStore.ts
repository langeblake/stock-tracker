import { create } from 'zustand';

interface FavoritesState {
    favorites: string[];
    toggleFavorite: (ticker: string) => void;
  }

  const useFavoritesStore = create<FavoritesState>((set) => ({
    favorites: [],
    toggleFavorite: (ticker) => set((state) => ({
      favorites: state.favorites.includes(ticker)
        ? state.favorites.filter((fav) => fav !== ticker)
        : [...state.favorites, ticker],
    })),
  }));
  
  export default useFavoritesStore;
  