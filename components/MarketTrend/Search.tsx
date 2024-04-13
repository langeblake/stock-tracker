"use client";

import React, { useEffect, useState } from "react";
import { FiLoader, FiSearch, FiX } from "react-icons/fi";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "use-debounce";
import { useFavoritesStore, useUIStore } from "@/store/favortiesStore";

export const Search = () => {
  const router = useRouter();
  const [text, setText] = useState<string>("");
  const [isRouting, setIsRouting] = useState(false);
  const [query] = useDebounce(text, 500);
  const { favorites } = useFavoritesStore();
  const { favoriteToggle } = useUIStore();
  const searchParams = useSearchParams();

  const shouldSetRouting = (
    searchParams,
    query,
    search,
    favoritesParam,
    favoriteToggle,
    text
  ) => {
    // Check directly if favoritesParam indicates 'NoResult'
    if (favoritesParam === "NoResult") {
      // If favorites are 'NoResult', do not show loading spinner regardless of the query status
      return false;
    }

    // Check if search value changed and not set to 'NoResult'
    if (search && query !== search && search !== "NoResult") {
      return true;
    }

    // Check if there is a new query but no previous search value
    if (!search && query) {
      return true;
    }

    // Check if there's a favorite toggle and query mismatch with 'NoResult'
    if (favoriteToggle && query && search !== "NoResult") {
      return true;
    }

    // Check if favorites are toggled but no favorites param is present and it's not 'NoResult'
    if (favoriteToggle && !favoritesParam && search !== "NoResult") {
      return true;
    }

    // Check if no favorite toggle, query exists but does not match the current search
    if (!favoriteToggle && query && search !== query) {
      return true;
    }

    // Check if no favorite toggle, no text input but favorites are present
    if (!favoriteToggle && !text && favoritesParam) {
      return true;
    }

    return false;
  };

  useEffect(() => {
    if (searchParams) {
      const search = searchParams.get("search");
      const favoritesParam = searchParams.get("favorites");

      const isRoutingNeeded = shouldSetRouting(
        searchParams,
        query,
        search,
        favoritesParam,
        favoriteToggle,
        text
      );
      setIsRouting(isRoutingNeeded);
    }
  }, [searchParams, query, favoriteToggle, text]);

  useEffect(() => {
    let url = "/";

    if (favoriteToggle) {
      if (favorites.length > 0 && query && favorites.includes(query)) {
        // If favorites are toggled and query is a favorite, navigate with search parameter.
        url = `/?search=${query}`;
      } else if (favorites.length > 0 && !query) {
        // If favorites are toggled but query is not a favorite or is empty, show all favorites.
        url = `/?favorites=${favorites.join(",")}`;
      } else if (favorites.length === 0) {
        url = `/?favorites=NoResult`;
      } else if (query && !favorites.includes(query)) {
        // If there's a query that's not in favorites, navigate with "NoResult".
        url = `/?search=NoResult`;
      }
    } else if (query) {
      // Show search results if there's a query and favorites are not toggled.
      url = `/?search=${query}`;
    }

    // window.history.pushState(null, '', url);
    router.replace(url, { scroll: false });
  }, [query, favoriteToggle, favorites, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value.toUpperCase());
  };

  const handleClear = () => {
    setText("");
  };

  return (
    <div className="relative">
      <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
        <FiSearch className="dark:text-gray-400" />
      </span>
      <input
        value={text}
        className="pl-10 pr-10 border h-10 rounded-md border-zinc-700 bg-zinc-100 dark:bg-black w-64 focus:border-none"
        type="text"
        placeholder="Search for a symbol"
        onChange={handleChange}
        // disabled={isRouting} // Optional: disable input during routing
      />
      {isRouting ? (
        <span className="absolute inset-y-0 right-0 pr-3 flex items-center">
          <FiLoader className="animate-spin dark:text-white" />
        </span>
      ) : text ? (
        <span
          className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
          onClick={handleClear}
        >
          <FiX className="dark:text-gray-400" />
        </span>
      ) : null}
    </div>
  );
};
