export interface DayData {
    c: number;
    h: number;
    l: number;
    o: number;
    v: number;
    vw: number;
  }
  
  export interface LastQuote {
    P: number;
    S: number;
    p: number;
    s: number;
    t: number;
  }
  
  export interface LastTrade {
    c: number[];
    i: string;
    p: number;
    s: number;
    t: number;
    x: number;
  }
  
  export interface MinData {
    av: number;
    c: number;
    h: number;
    l: number;
    n: number;
    o: number;
    t: number;
    v: number;
    vw: number;
  }
  
  export interface PrevDay {
    c: number;
    h: number;
    l: number;
    o: number;
    v: number;
    vw: number;
  }
  
  export interface Ticker {
    day: DayData;
    lastQuote: LastQuote;
    lastTrade: LastTrade;
    min: MinData;
    prevDay: PrevDay;
    ticker: string;
    todaysChange: number;
    todaysChangePerc: number;
    updated: number;
  }
  
  export interface StockData {
    status: string;
    tickers: Ticker[];
  }

  export interface StockDataItem {
    status: string;
    tickers: Ticker[];
  }
  
  export interface MarketData {
    gainers: StockData;
    losers: StockData;
  }