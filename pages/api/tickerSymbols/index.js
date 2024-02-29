// // API Route: pages/api/tickersSymbols.js
// import fetchPolygonAllTickers from '@/utils/api/fetchPolygonAllTickers'; // Assuming fetchPolygonDaily is the correct function to fetch the list of tickers

// export default async function handler(req, res) {
//   // Check for API key in headers
// //   const apiKey = req.headers['x-api-key'];
// //   const expectedApiKey = process.env.NEXT_PUBLIC_BABYQUANT_API_KEY; // Set this in your .env.local file

// //   // Validate API key
// //   if (!apiKey || apiKey !== expectedApiKey) {
// //     return res.status(401).json({ message: "Unauthorized access." });
// //   }

//   try {
//     // Assuming fetchPolygonDaily is a function that fetches the daily ticker data
//     const allTickerData = await fetchPolygonAllTickers(); // Corrected: Removed Promise around the function call
//     const allTickerSymbols = allTickerData.tickers.map(ticker => ticker.ticker); // Assuming each ticker data has a property 'T' for the symbol

//     // Directly return the array of ticker symbols in the response
//     res.status(200).json(allTickerSymbols);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "An error occurred while fetching data.", error: error.message });
//   }
// }
