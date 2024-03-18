'use client'

import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation';
import useFavoritesStore from '@/store/favortiesStore';
import { IoIosStar, IoIosStarOutline } from 'react-icons/io';

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
            router.push(`?search=${favorites.join(',')}`, { scroll: false }); 
            setFavoriteToggle(true)
        }
    };
    
  return (
    <div>
        {/* <div>
            <IoIosStar className='pb-[1px]' size={18}/>
            <span>Show Favorites</span>
        </div> */}
        <button 
            className='mx-6 w-44 flex justify-center items-center gap-2 h-10 rounded-md dark:bg-zinc-800 bg-zinc-200 hover:dark:bg-zinc-700 hover:bg-zinc-300 text-[15px]'
            onClick={handleChange}>{
                favoriteToggle ? 
                <div className='flex items-center gap-2'><IoIosStar className='' size={18}/>Show Favorites</div>
                : 
                <div className='flex items-center gap-2'><IoIosStarOutline className='' size={18} /> Show Favorites</div>}
        </button>
    </div>
  )
}

export default Favorites