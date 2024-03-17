export function transformVolumeDataForTreeMap(data) {
    const topTickers = data.tickers
        .sort((a, b) => {
            // Use day.v if available, otherwise fall back to prevDay.v for sorting
            const volumeA = a.day.v !== 0 ? a.day.v : a.prevDay.v;
            const volumeB = b.day.v !== 0 ? b.day.v : b.prevDay.v;
            return volumeB - volumeA;
        })
        .slice(0, 10); // Take the top 10

    const treeMapData = {
        children: topTickers.map(ticker => ({
            name: ticker.ticker,
            size: ticker.day.v !== 0 ? ticker.day.v : ticker.prevDay.v,
            actualValue: ticker.prevDay.c - ticker.prevDay.o
        })),
    };

    return [treeMapData];
}

