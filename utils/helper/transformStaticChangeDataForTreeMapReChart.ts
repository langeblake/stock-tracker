export function transformStaticChangeDataForTreeMap(data) {
    // Utility function to calculate or use existing todaysChangePerc
    const calculateChangePerc = (ticker) => {
        if (ticker.todaysChangePerc !== 0 && ticker.todaysChangePerc != null) {
            return ticker.todaysChangePerc;
        } else {
            return ((((ticker.ticker.prevDay.c ?? 0) - (ticker.twoPrevDayTicker.close ?? 0)) / (ticker.twoPrevDayTicker.close ?? 0)) * 100);
        }
    };

    // Filter out tickers with change percentage over 1000% before sorting
    // const filteredGainers = data?.gainers?.tickers.filter(ticker => Math.abs(calculateChangePerc(ticker)) <= 1000);
    // const filteredLosers = data?.losers?.tickers.filter(ticker => Math.abs(calculateChangePerc(ticker)) <= 1000);

    // Sort and slice the filtered arrays
    const topGainers = data.gainers
        ?.sort((a, b) => Math.abs(calculateChangePerc(b)) - Math.abs(calculateChangePerc(a)))
        .slice(0, 5);

    const topLosers = data.losers
        ?.sort((a, b) => Math.abs(calculateChangePerc(b)) - Math.abs(calculateChangePerc(a)))
        .slice(0, 5);

    // Merge top gainers and losers
    const mergedTickers = [...topGainers, ...topLosers];

    // Sort merged tickers by the greatest absolute change percentage
    const sortedTickers = mergedTickers.sort((a, b) => Math.abs(calculateChangePerc(b)) - Math.abs(calculateChangePerc(a)));

    // Construct the data structure for the tree map
    const treeMapData = {
        children: sortedTickers.map(ticker => ({
            name: ticker.ticker.ticker,
            actualValue: calculateChangePerc(ticker).toFixed(2), 
            size: Math.abs(calculateChangePerc(ticker)),
        })),
    };

    return [treeMapData];
}
