// // Non-persisted store for UI states like favoriteToggle
// import { create } from 'zustand';

// // Persisted store for application states like favorites
// import { persist } from 'zustand/middleware';

// // Interface for the parts of the state we want to persist
// interface FavoritesState {
//   favorites: string[];
//   toggleFavorite: (ticker: string) => void;
//   setFavorites: (favorites: string[]) => void;
// }

// // Interface for the parts of the state we do NOT want to persist
// interface UIState {
//   favoriteToggle: boolean;
//   toggleFavoriteVisibility: () => void;
// }

// // Creating the persisted store
// const useFavoritesStore = create<FavoritesState>()(
//   persist(
//     (set) => ({
//       favorites: [],
//       toggleFavorite: (ticker) => set((state) => ({
//         favorites: state.favorites.includes(ticker)
//           ? state.favorites.filter((fav) => fav !== ticker)
//           : [...state.favorites, ticker],
//       })),
//       setFavorites: (favorites) => set(() => ({ favorites })),
//     }),
//     {
//       name: 'favorites-store', // Unique name for the persisted state
//     }
//   )
// );

// // Creating the non-persisted store
// const useUIStore = create<UIState>((set) => ({
//   favoriteToggle: false,
//   toggleFavoriteVisibility: () => set((state) => ({
//     favoriteToggle: !state.favoriteToggle,
//   })),
// }));

// export { useFavoritesStore, useUIStore };