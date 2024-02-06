export function transformChangeDataForTreeMap(data) {
    // Assuming `data` contains both `gainers` and `losers` properties
    const topGainers = data.gainers.tickers
        .sort((a, b) => Math.abs(b.todaysChangePerc) - Math.abs(a.todaysChangePerc))
        .slice(0, 5);

    const topLosers = data.losers.tickers
        .sort((a, b) => Math.abs(b.todaysChangePerc) - Math.abs(a.todaysChangePerc))
        .slice(0, 5);

    // Merge top gainers and losers
    const mergedTickers = [...topGainers, ...topLosers];

    // Sort merged tickers by the greatest absolute change percentage
    const sortedTickers = mergedTickers.sort((a, b) => Math.abs(b.todaysChangePerc) - Math.abs(a.todaysChangePerc));

    // Construct the data structure for the tree map
    const treeMapData = {
        children: sortedTickers.map(ticker => ({
            name: ticker.ticker,
            absValue: Math.abs(ticker.todaysChangePerc),
            value: ticker.todaysChangePerc, // Absolute change percentage used as value
            // You could include other properties here as needed
        })),
    };

    return treeMapData;
}
