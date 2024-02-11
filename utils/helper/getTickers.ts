import fetchPolygonDaily from "../api/fetchPolygonDaily";

export const getTickers = async () => {
    const data = await fetchPolygonDaily();
    if (data && data.results) {
      // Map over the results and return an array of ticker symbols
      return data.results.map(stock => stock.T);
    }
    // Return an empty array if there's no data or results
    return [];
  }