import Breadcrumb from '@/components/Common/Breadcrumb';
import React from 'react';
import { FcAreaChart, FcCandleSticks } from 'react-icons/fc';

const SkeletonCard = () => {
  return (
    <div className="animate-pulse w-full h-full shadow-md rounded-lg p-4 border dark:border-zinc-700 dark:bg-zinc-900">
      <div className="space-y-3">
        <div className="h-5 bg-zinc-400 dark:bg-zinc-700 rounded"></div>
        <div className="h-5 bg-zinc-400 dark:bg-zinc-700 rounded"></div>
        <div className="h-5 bg-zinc-400 dark:bg-zinc-700 rounded"></div>
        <div className="h-5 bg-zinc-400 dark:bg-zinc-700 rounded"></div>
        <div className="h-5 bg-zinc-400 dark:bg-zinc-700 rounded"></div>
        <div className="h-5 bg-zinc-400 dark:bg-zinc-700 rounded"></div>
      </div>
    </div>
  );
};

const SkeletonLoader = () => {

  return (
    <div className='container pb-96'>
      <Breadcrumb />
      <div className=" flex justify-between pt-12 pb-20 gap-3">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
      <div className='max-w-fit border flex gap-1 border-zinc-300 bg-zinc-300 dark:border-zinc-700 dark:bg-zinc-700 px-1 rounded-lg animate-pulse'>
            <button className={`py-1.5 px-3 text-sm hover:cursor-pointerhover:bg-zinc-400/20 dark:hover:bg-zinc-800 hover:rounded-lg`}>
                <div className='flex gap-2 px-2'>
                <FcAreaChart size={20} /> 
                <p className='font-light'>Area</p>
                </div>
            </button>
            <button className={`py-1.5 px- text-sm hover:cursor-pointer hover:bg-zinc-400/20 dark:hover:bg-zinc-800 hover:rounded-lg`}>
                <div className='flex gap-2 px-5'>
                <FcCandleSticks size={20}/> 
                <p className='font-light'>Candle</p>
                </div>
            </button>
        </div>
    </div>
  );
};

export default SkeletonLoader;
