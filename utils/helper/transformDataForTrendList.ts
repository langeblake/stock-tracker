export function transformVolumeDataForTrendList(data) {
    return data.map(stock => ({
      symbol: stock.ticker.ticker,
      price: stock.ticker.day.c !== 0 ? stock.ticker.day.c : stock.ticker.prevDay.c,
      change: stock.ticker.todaysChange,
      todaysChangePerc: stock.ticker.todaysChangePerc,
      volume: stock.ticker.day.v !== 0 ? stock.ticker.day.v : stock.ticker.prevDay.v,
      marketCap: stock.marketCap,
      sma50: stock.sma50,
      sma200: stock.sma200,
    }));
  }
  