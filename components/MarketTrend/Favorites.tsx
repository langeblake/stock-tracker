'use client'

import React, { useEffect, useState } from 'react'
import { useFavoritesStore, useUIStore } from '@/store/favortiesStore';
import { IoIosStar, IoIosStarOutline } from 'react-icons/io';
import { useRouter } from 'next/navigation';

const Favorites = () => {
    const router = useRouter();
    const { favorites } = useFavoritesStore();
    const { favoriteToggle, toggleFavoriteVisibility } = useUIStore();
    const [isRouting, setIsRouting] = useState(false);

    // useEffect(() => {
    //     if (searchParams) {
    //         const favorites = searchParams.get('favorites');
    //         const search = searchParams.get('search');
    //         // If there's a 'search' parameter and it doesn't match the query,
    //         // or if there's a change in query that's not yet reflected in URL.
    //         if ((favoriteToggle && !favorites && !search)) {
    //             setIsRouting(true);
    //             console.log('Spin!')
    //         } else {
    //             setIsRouting(false);
    //             console.log('Stop')
    //         }
    //     }

    // }, [searchParams, favoriteToggle]);
    const handleChange = () => {
        console.log('handleChange triggered'); // This should always log when the function is called
        if (favoriteToggle) {
            console.log('Navigating to base URL');
            router.push('/', { scroll: false }); 
        } else if (favorites.length > 0) {
            console.log(`Navigating to favorites with: ${favorites.join(',')}`);
            router.push(`?favorites=${favorites.join(',')}`, { scroll: false }); 
        } else {
            router.push(`?favorites=NoResult`, { scroll: false }); 
        }
        toggleFavoriteVisibility();
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
                <div className='flex items-center gap-2'><IoIosStar className={`${isRouting && 'animate-spin'}`} size={18}/>Show Favorites</div>
                : 
                <div className='flex items-center gap-2'><IoIosStarOutline className={`${isRouting && 'animate-spin'}`} size={18} /> Show Favorites</div>}
        </button>
    </div>
  )
}

export default Favorites