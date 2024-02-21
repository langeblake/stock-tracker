// // pages/api/indices.js

// export default async function handler(req, res) {
//     const API_KEY = process.env.POLYGON_API_KEY;
//     const tickers = ['I:COMP', 'I:DJA', 'I:SPX', 'I:RUT'];
//     // const currentDate = new Date().toISOString().split('T')[0];
  
//     try {
//       const data = await Promise.all(
//         tickers.map(async (ticker) => {
//           const url = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/2024-02-16/2024-02-16?sort=asc&limit=120&apiKey=${API_KEY}`;
//           const response = await fetch(url);
//           if (!response.ok) throw new Error(`Failed to fetch data for ${ticker}`);
//           return response.json();
//         })
//       );
  
//       res.status(200).json(data);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Failed to fetch indices data' });
//     }
//   }
  