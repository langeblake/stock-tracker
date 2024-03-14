'use client'

import React, { useEffect, useState } from 'react'
import { FiSearch, FiX } from 'react-icons/fi'
import { Input } from '../ui/input'
import { useRouter } from 'next/navigation'
import { useDebounce } from 'use-debounce'

export const Search = () => {
    const router = useRouter();
    const [text, setText] = useState<string>('');
    const [query] = useDebounce(text, 500);

    useEffect(() => {
        if (!query) {
            router.push('/', { scroll: false });
        } else {
            router.push(`?search=${query}`, { scroll: false });
        }
    }, [query, router]);

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