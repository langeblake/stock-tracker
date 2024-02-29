import React, { useEffect } from 'react';

const LoadingHeatMap = () => {
  useEffect(() => {
    // Ensure quantum is registered only on the client-side
    if (typeof window !== "undefined") {
      // Dynamically import the 'ldrs' package to ensure it's only loaded on the client-side
      import('ldrs').then(({ quantum }) => {
        quantum.register();
      });
    }
  }, []);

  return (
    <div className='flex justify-center items-center w-full h-[500px] animate-pulse'>
      {/* The custom element will only work on the client-side */}
      <l-quantum size="75" speed="1.75" color="white"></l-quantum>
    </div>
  );
};

export default LoadingHeatMap;
