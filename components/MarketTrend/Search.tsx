'use client'

import React, { useEffect, useState } from 'react'
import { FiSearch, FiX } from 'react-icons/fi'
import { redirect, useRouter } from 'next/navigation'
import { useDebounce } from 'use-debounce'
import { useFavoritesStore, useUIStore } from '@/store/favortiesStore'
import { usePathname } from 'next/navigation'


export const Search = () => {
    const router = useRouter();
    const [text, setText] = useState<string>('');
    const [query] = useDebounce(text, 500);
    const { favorites } = useFavoritesStore();
    const { favoriteToggle } = useUIStore();

    useEffect(() => {
        let url = '/';

        if (favoriteToggle) {
            if (favorites.length > 0 && query && favorites.includes(query)) {
                // If favorites are toggled and query is a favorite, navigate with search parameter.
                url = `/?search=${query}`;
            } else if (favorites.length > 0 && !query ) {
                // If favorites are toggled but query is not a favorite or is empty, show all favorites.
                url = `/?favorites=${favorites.join(',')}`;
            } else if (query && !favorites.includes(query)) {
                // If there's a query that's not in favorites, navigate with "NoResult".
                url = `/?search=NoResult`;
            }
        } else if (query) {
            // Show search results if there's a query and favorites are not toggled.
            url = `/?search=${query}`;
        }
        
        window.history.pushState(null, '', url)
        location.reload
        router.replace(url, { scroll: false});
    }, [query, favoriteToggle, favorites, router,]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value.toUpperCase());
    };

    const handleClear = () => {
        setText('');
    };

    return (
        <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="dark:text-gray-400" />
            </span>
            <input
                value={text}
                className="pl-10 border h-10 rounded-md border-zinc-700 bg-zinc-100 dark:bg-black w-64 focus:border-none"
                type="text"
                placeholder="Search for a symbol"
                onChange={handleChange}
            />
            {text && (
                <span
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                    onClick={handleClear}
                >
                    <FiX className="dark:text-gray-400" />
                </span>
            )}
        </div>
    );
};