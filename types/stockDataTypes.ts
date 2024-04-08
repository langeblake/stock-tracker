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
    status?: string;
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


  export interface TickerResponse {
    ticker: {
      ticker: string;
      todaysChangePerc: number;
      todaysChange: number;
      updated: number;
      day: {
        o: number;
        h: number;
        l: number;
        c: number;
        v: number;
        vw: number;
      };
      min: {
        av: number;
        t: number;
        n: number;
        o: number;
        h: number;
        l: number;
        c: number;
        v: number;
        vw: number;
      };
      prevDay: {
        o: number;
        h: number;
        l: number;
        c: number;
        v: number;
        vw: number;
      };
    };
    name: string;
    marketCap: number;
    sma200: number;
    sma50: number;
    twoPrevDayTicker: TwoPrevDayTicker;
    threePrevDayTicker: ThreePrevDayTicker;
    status: string;
  }
  
  export interface TwoPrevDayTicker {
    afterHours: number;
    close: number | null;
    from: Date;
    high: number;
    low: number;
    open: number;
    preMarket: number;
    status: string;
    symbol: string;
    volume: number;
  }
  
  export interface ThreePrevDayTicker {
    afterHours: number;
    close: number | null;
    from: Date;
    high: number;
    low: number;
    open: number;
    preMarket: number;
    status: string;
    symbol: string;
    volume: number;
  }

// Gainers - Losers
  export type TickerData = {
    ticker: {
      ticker: string;
      todaysChangePerc: number;
      todaysChange: number;
      updated: number;
      day: {
        o: number;
        h: number;
        l: number;
        c: number;
        v: number;
        vw: number;
      };
      min: {
        av: number;
        t: number;
        n: number;
        o: number;
        h: number;
        l: number;
        c: number;
        v: number;
        vw: number;
      };
      prevDay: {
        o: number;
        h: number;
        l: number;
        c: number;
        v: number;
        vw: number;
      };
    };
  };
  
  export interface GainersLosersResponse {
    gainers: { tickers: TickerData[] };
    losers: { tickers: TickerData[] };
  }
  