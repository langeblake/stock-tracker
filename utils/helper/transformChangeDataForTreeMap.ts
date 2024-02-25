export function transformChangeDataForTreeMap(data) {
    // Filter out tickers with change percentage over 1000% before sorting
    const filteredGainers = data.gainers.tickers.filter(ticker => Math.abs(ticker.todaysChangePerc) <= 100);
    const filteredLosers = data.losers.tickers.filter(ticker => Math.abs(ticker.todaysChangePerc) <= 100);

    // Sort and slice the filtered arrays
    const topGainers = filteredGainers
        .sort((a, b) => Math.abs(b.todaysChangePerc) - Math.abs(a.todaysChangePerc))
        .slice(0, 5);

    const topLosers = filteredLosers
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
