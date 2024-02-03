// Transformation function within the hook or as a separate utility
export function transformDataForTreeMap(apiData) {
    const topTickers = apiData.results
        .sort((a, b) => b.v - a.v) // Sort by volume in descending order
        .slice(0, 10); // Take the top 10

    return {
        name: 'Stocks',
        children: topTickers.map(ticker => ({
            name: ticker.T,
            value: ticker.v, // Use volume as the value for the tree map
            // Add other properties as needed
        })),
    };
}
