"use client";

import React, { useCallback } from "react";
import { useFavoritesStore, useUIStore } from "@/store/favortiesStore";
import { IoIosStar, IoIosStarOutline } from "react-icons/io";
import { useRouter } from "next/navigation";

const Favorites = () => {
  const { favoriteToggle, toggleFavoriteVisibility } = useUIStore();

  const handleChange = useCallback(() => {
    toggleFavoriteVisibility();
  }, [toggleFavoriteVisibility]);

  return (
    <div>
      <button
        className="mx-6 w-44 flex justify-center items-center gap-2 h-10 rounded-md dark:bg-zinc-800 bg-zinc-200 hover:dark:bg-zinc-700 hover:bg-zinc-300 text-[15px]"
        onClick={handleChange}
      >
        {favoriteToggle ? (
          <div className="flex items-center gap-2">
            <IoIosStar size={18} />
            Show Favorites
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <IoIosStarOutline size={18} /> Show Favorites
          </div>
        )}
      </button>
    </div>
  );
};

export default Favorites;
