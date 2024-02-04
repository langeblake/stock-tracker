// Transformation function within the hook or as a separate utility
export function transformTickerDataForTreeMap(data) {
    const topTickers = data.tickers
        .sort((a, b) => b.day.v - a.day.v) // Sort by volume in descending order
        .slice(0, 10); // Take the top 10

    return {
        name: 'Stocks',
        children: topTickers.map(ticker => ({
            name: ticker.ticker,
            value: ticker.day.v, // Use volume as the value for the tree map
            change: ticker.todaysChange
            // Add other properties as needed
        })),
    };
}
