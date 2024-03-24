// 'use client'

// import axios from "axios";
// import { useRouter } from "next/navigation";
// import { useCallback, useMemo } from "react";
// import { toast } from "react-hot-toast";
// import { SafeUser } from "@/types/user";
// import { useFavoritesStore } from "@/store/favortiesStore";

// interface IUseFavorite {
//   ticker: string;
//   currentUser?: SafeUser | null;
// }

// const useFavorite = ({ ticker, currentUser }: IUseFavorite) => {
//   const router = useRouter();
//   const { toggleFavorite: toggleLocalFavorite } = useFavoritesStore();


//   const hasFavorited = useMemo(() => {
//     // For a logged-in user, check against the database-stored favorites
//     // For a guest, check against the local Zustand store
//     const list = currentUser ? currentUser.favoriteIds : useFavoritesStore.getState().favorites;
//     return list.includes(ticker);
//   }, [currentUser, ticker]);

//   const toggleFavorite = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {
//     e.stopPropagation();

//     if (!currentUser) {
//       return;
//     }

//     try {
//       // Proceed with API request for logged-in users
//       let request;

//       if (hasFavorited) {
//         request = () => axios.delete(`/api/favorites/${ticker}`);
//       } else {
//         request = () => axios.post(`/api/favorites/${ticker}`);
//       }

//       await request();
//       router.refresh();
//       toast.success('Success');
//     } catch (error) {
//       toast.error('Something went wrong.');
//     }
//   }, [currentUser, hasFavorited, ticker, router]);

//   // For guests, manage favorites locally in Zustand store
//   const toggleLocalFavoriteIfNeeded = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
//     e.stopPropagation();
//     if (!currentUser) {
//       toggleLocalFavorite(ticker);
//       toast.success('Favorite updated locally');
//     }
//   }, [currentUser, ticker, toggleLocalFavorite]);

//   return {
//     hasFavorited,
//     toggleFavorite: currentUser ? toggleFavorite : toggleLocalFavoriteIfNeeded,
//   };
// }

// export default useFavorite;
