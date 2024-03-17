// // OverviewCard.jsx

// import { useRouter } from "next/navigation";

// export const OverviewCard = ({ data, isLoading }) => {
//   const router = useRouter()

//   const handleClick = (ticker: string) => {
//     router.push(`/ticker/${ticker}`);
// };

//     return (
//       <div className="border flex w-full flex-col gap-4 rounded-lg p-4 justify-around dark:border-zinc-700 dark:bg-zinc-900/70 bg-white dark:text-white">
//         {isLoading ? (
//           // Render skeleton loaders
//           Array.from({ length: 5 }, (_, index) => (
//             <div key={index} className="animate-pulse flex py-4 px-2 flex-row justify-between">
//               <div className="h-6 bg-gray-600 rounded-full w-2/5"></div> {/* Skeleton for ticker */}
//               <div className="h-6 bg-gray-600 rounded-full w-2/5"></div> 
//             </div>
//           ))
//         ) : (
//           // Render actual data
//           data.map((item, index) => {
//             const change = item.todaysChange; // Calculate the change
//             const isPositiveChange = change >= 0; // Determine if the change is positive
  
//             return (
//               <div key={index} onClick={() => handleClick(item.ticker)} className="flex py-4 px-2 flex-row justify-between dark:hover:cursor-pointer dark:hover:bg-zinc-900 hover:bg-zinc-100 rounded-md">
//                 <h1 className="mr-4 font-medium">{item.ticker}</h1> {/* Display the ticker */}
//                 <div className="flex gap-4">
//                   <h2 className={`font-light ${isPositiveChange ? 'text-green-500' : 'text-red-500'}`}>
//                     {isPositiveChange ? '+' : ''}{change.toFixed(2)} {/* Display the change */}
//                   </h2>
//                   <h2 className="font-regular">${item.day.c.toFixed(2)}</h2> {/* Display the closing price */}
//                 </div>
//               </div>
//             );
//           })
//         )}
//       </div>
//     );
//   };
  