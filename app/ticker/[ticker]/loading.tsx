import Breadcrumb from '@/components/Common/Breadcrumb';
import React from 'react';

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
    <div className='pb-96'>
    <Breadcrumb />
    <div className="container hidden xl:flex justify-between pt-12 pb-20 gap-3">
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
    </div>
  );
};

export default SkeletonLoader;
