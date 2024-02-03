// OverviewCard.jsx

export const OverviewCard = ({ data, isLoading }) => {
    return (
      <div className="border flex w-full flex-col gap-4 rounded-lg p-4 justify-around dark:border-zinc-700 dark:bg-zinc-900 bg-white dark:text-white">
        {isLoading ? (
          // Render skeleton loaders
          Array.from({ length: 5 }, (_, index) => (
            <div key={index} className="animate-pulse flex py-4 px-2 flex-row justify-between">
              <div className="h-6 bg-gray-600 rounded-full w-2/5"></div> {/* Skeleton for ticker */}
              <div className="h-6 bg-gray-600 rounded-full w-2/4"></div> 
            </div>
          ))
        ) : (
          // Render actual data
          data.map((item, index) => {
            const change = item.c - item.o; // Calculate the change
            const isPositiveChange = change >= 0; // Determine if the change is positive
  
            return (
              <div key={index} className="flex py-4 px-2 flex-row justify-between dark:hover:cursor-pointer dark:hover:bg-zinc-800 hover:bg-zinc-100 rounded-md">
                <h1 className="mr-4 font-medium">{item.T}</h1> {/* Display the ticker */}
                <div className="flex gap-4">
                  <h2 className={`font-light ${isPositiveChange ? 'text-green-500' : 'text-red-500'}`}>
                    {isPositiveChange ? '+' : ''}{change.toFixed(2)} {/* Display the change */}
                  </h2>
                  <h2 className="dark:text-green-400 text-green-500 font-light">${item.c}</h2> {/* Display the closing price */}
                </div>
              </div>
            );
          })
        )}
      </div>
    );
  };
  