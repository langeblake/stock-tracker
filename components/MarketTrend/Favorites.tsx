'use client'

import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation';
import useFavoritesStore from '@/store/favortiesStore';
import { IoIosStar } from 'react-icons/io';

const Favorites = () => {
    const router = useRouter();
    const { favorites } = useFavoritesStore();
    const [favoriteToggle, setFavoriteToggle] = useState<boolean>(false);

    // useEffect(() => {
    //     if (favoriteTickers.length === 0) {
    //         router.push('/', { scroll: false });
    //     } else {
    //         router.push(`?search=${favoriteTickers}`, { scroll: false });
    //     }
    // }, [favoriteTickers, router]);

    const handleChange = () => {
        console.log(favorites)
        if (favoriteToggle === true) {
            router.push('/', { scroll: false });
            setFavoriteToggle(false)
        } else {
            router.push(`?search=${favorites}`, { scroll: false });
            setFavoriteToggle(true)
        }
    };
    
  return (
    <div className='mx-6 flex justify-center items-center gap-2 border h-10 rounded-md border-zinc-700 dark:bg-zinc-700 bg-zinc-100 w-44'>
        {/* <div>
            <IoIosStar className='pb-[1px]' size={18}/>
            <span>Show Favorites</span>
        </div> */}
        <button onClick={handleChange}>{favoriteToggle ? "Show All" : "Show Favorites"}</button>
    </div>
  )
}

export default Favorites