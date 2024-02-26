// Transformation function within the hook or as a separate utility
export function transformVolumeDataForTreeMap(data) {
    const topTickers = data.results
        .sort((a, b) => b.v - a.v) // Sort by volume in descending order
        .slice(0, 10); // Take the top 10

    return {
        name: 'Stocks',
        children: topTickers.map(ticker => ({
            name: ticker.T,
            value: ticker.v, // Use volume as the value for the tree map
            change: ticker.c - ticker.o
            // Add other properties as needed
        })),
    };
}
 