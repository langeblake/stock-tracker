"use client";

import React, { useEffect, useState } from "react";
import { useFavoritesStore, useUIStore } from "@/store/favortiesStore";
import { IoIosStar, IoIosStarOutline } from "react-icons/io";
import { useRouter } from "next/navigation";

const Favorites = () => {
  const router = useRouter();
  const { favorites } = useFavoritesStore();
  const { favoriteToggle, toggleFavoriteVisibility } = useUIStore();
  const [isRouting, setIsRouting] = useState(false);

  const handleChange = () => {
    console.log("handleChange triggered"); // This should always log when the function is called
    if (favoriteToggle) {
      console.log("Navigating to base URL");
      router.push("/", { scroll: false });
    } else if (favorites.length > 0) {
      console.log(`Navigating to favorites with: ${favorites.join(",")}`);
      router.push(`?favorites=${favorites.join(",")}`, { scroll: false });
    } else {
      router.push(`?favorites=NoResult`, { scroll: false });
    }
    toggleFavoriteVisibility();
  };

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
