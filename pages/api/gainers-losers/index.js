export default async function handler(req, res) {

    const apiKey = process.env.POLYGON_API_KEY
    
    try{
      // Define the URLs for the API calls
      const gainersDataURL = `https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/gainers?apiKey=${apiKey}`;
      const losersDataURL = `https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/losers?apiKey=${apiKey}`;
      // Fetch data from multiple APIs
      const [gainersDataResponse, losersDataResponse] = await Promise.all([
        fetch(gainersDataURL).then(res => res.json()),
        fetch(losersDataURL).then(res => res.json()),

      ]);
  
      // Combine data into a single structure
      const combinedData = {
        gainers: gainersDataResponse,
        losers: losersDataResponse,
      };
  
      // Send the combined data back to the client
      res.status(200).json(combinedData);
    } catch (error) {
      // Handle errors appropriately
      console.error(error); // Log the error for server-side debugging
      res.status(500).json({ message: "An error occurred while fetching data.", error: error.message });
    }
  }
  