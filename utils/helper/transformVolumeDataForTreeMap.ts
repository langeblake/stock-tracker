// Transform function for D3 chart

// export function transformVolumeDataForTreeMap(data) {
//     const topTickers = data.tickers
//         .sort((a, b) => {
//             // Use day.v if available, otherwise fall back to prevDay.v for sorting
//             const volumeA = a.day.v !== 0 ? a.day.v : a.prevDay.v;
//             const volumeB = b.day.v !== 0 ? b.day.v : b.prevDay.v;
//             return volumeB - volumeA;
//         })
//         .slice(0, 10); // Take the top 10

//     return {
//         name: 'Stocks',
//         children: topTickers.map(ticker => ({
//             name: ticker.ticker,
//             // Use day.v if available, otherwise fall back to prevDay.v
//             value: ticker.day.v !== 0 ? ticker.day.v : ticker.prevDay.v,
//             change: ticker.prevDay.c - ticker.prevDay.o
//             // Add other properties as needed
//         })),
//     };
// }

// // Transformation function within the hook or as a separate utility
// // export function transformVolumeDataForTreeMap(data) {
// //     const topTickers = data.results
// //         .sort((a, b) => b.v - a.v) // Sort by volume in descending order
// //         .slice(0, 10); // Take the top 10

// //     return {
// //         name: 'Stocks',
// //         children: topTickers.map(ticker => ({
// //             name: ticker.T,
// //             value: ticker.v, // Use volume as the value for the tree map
// //             change: ticker.c - ticker.o
// //             // Add other properties as needed
// //         })),
// //     };
// // }
 