"use client";

import React, {
  useEffect,
  useState,
  useCallback,
  useDeferredValue,
} from "react";
import { FiLoader, FiSearch, FiX } from "react-icons/fi";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "use-debounce";
import { useFavoritesStore, useUIStore } from "@/store/favortiesStore";

export const Search = () => {
  const router = useRouter();
  const [text, setText] = useState<string>("");
  const [query] = useDebounce(text, 300); // Debounce input to reduce frequency of updates
  const { favorites } = useFavoritesStore();
  const { favoriteToggle } = useUIStore();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [initialLoad, setInitialLoad] = useState(true);

  const shouldSetRouting = useCallback(
    (search, favoritesParam, query, favoriteToggle, text) => {
      if (initialLoad) return false;
      console.log("shouldSetRouting", {
        search,
        favoritesParam,
        query,
        favoriteToggle,
        text,
      });

      // Check directly if favoritesParam indicates 'NoResult'
      if (favoritesParam === "NoResult") return false;

      // Check if query value changed and not set to 'NoResult'
      if (search && query !== search && search !== "NoResult") return true;
      // Check if there is a new query but no previous search value
      if (!search && query) return true;
      // Check if there's a favorite toggle and query mismatch with 'NoResult'
      if (favoriteToggle && query && search !== "NoResult") return true;
      // Check if favorites are toggled but no favorites param is present and it's not 'NoResult'
      if (favoriteToggle && !favoritesParam && search !== "NoResult")
        return true;
      // Check if no favorite toggle, query exists but does not match the current search
      if (!favoriteToggle && query && search !== query) return true;
      // Check if no favorite toggle, no text input but favorites are present
      if (!favoriteToggle && !text && favoritesParam) return true;

      return false;
    },
    [initialLoad]
  );

  useEffect(() => {
    setInitialLoad(false);
  }, []);

  useEffect(() => {
    if (searchParams) {
      const search = searchParams.get("search");
      const favoritesParam = searchParams.get("favorites");

      const isRoutingNeeded = shouldSetRouting(
        search,
        favoritesParam,
        query,
        favoriteToggle,
        text
      );

      console.log("Setting isLoading:", isRoutingNeeded);
      setIsLoading(isRoutingNeeded);
    }
  }, [searchParams, query, favoriteToggle, shouldSetRouting, text]);

  const updateUrl = async (url: string) => {
    if (!initialLoad) {
      setIsLoading(true); // Start loading spinner
    }
    console.log("Starting URL update:", url);
    await router.replace(url, { scroll: false });
    console.log("Finished URL update");
  };

  useEffect(() => {
    let url = "/";

    if (favoriteToggle) {
      if (favorites.length > 0 && query && favorites.includes(query)) {
        url = `/?search=${query}`;
      } else if (favorites.length > 0 && !query) {
        url = `/?favorites=${favorites.join(",")}`;
      } else if (favorites.length === 0) {
        url = `/?favorites=NoResult`;
      } else if (query && !favorites.includes(query)) {
        url = `/?search=NoResult`;
      }
    } else if (query) {
      url = `/?search=${query}`;
    }

    updateUrl(url);
  }, [query, favoriteToggle, favorites, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value.toUpperCase());
  };

  const handleClear = async () => {
    setText("");
    await updateUrl("/");
    setIsLoading(false);
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
      />
      {isLoading ? (
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
