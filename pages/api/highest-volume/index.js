// // API Route: pages/api/highest-volume.js

// // Called in trendList-copy to pass data into trendingTickers API

// import fetchPolygonAllTickers from '@/utils/api/fetchPolygonAllTickers';

// export default async function handler(req, res) {
//   const apiKey = req.headers['x-api-key'];
//   const expectedApiKey = process.env.NEXT_PUBLIC_BABYQUANT_API_KEY;

//   if (!apiKey || apiKey !== expectedApiKey) {
//     return res.status(401).json({ message: "Unauthorized access." });
//   }

//   try {
//     const allTickersData = await fetchPolygonAllTickers();
//     // Check if tickers exists and is an array
//     if (!Array.isArray(allTickersData.tickers)) {
//       return res.status(404).json({ message: "No ticker data found." });
//     }

//     // Sort by volume in descending order and take the top 200
//     const sortedByVolume = allTickersData.tickers
//       .sort((a, b) => b.day.v - a.day.v)
//       .slice(0, 200);

//     // Map to get only the ticker symbols
//     const topTickerSymbols = sortedByVolume.map(ticker => ticker.ticker);

//     res.status(200).json(topTickerSymbols);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "An error occurred while fetching data.", error: error.message });
//   }
// }
