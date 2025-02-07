import React, { Suspense } from "react";
import { NinetyReCandleStickChart } from "./120Rechart-CandleStick";
import { fetchAggregateData } from "../AreaChart/StockAreaChart";

interface TickerData {
  c: number;
  h: number;
  l: number;
  n: number;
  o: number;
  t: number;
  v: number;
  vw: number;
}

const NinetyCandleStickChart = async ({ ticker, listDate }) => {
  const aggregateData = await fetchAggregateData(ticker, listDate);

  if (!aggregateData || !aggregateData.results) {
    console.error("Failed to fetch aggregate data or no results found");
    return null; // Return null or some error component
  }
  const chartData = aggregateData.results.map((d) => ({
    date: new Date(d.t).toISOString().substring(0, 10), // Format date as string for the name
    open_close: [d.o, d.c],
    low_high: [d.l, d.h],
  }));

  return (
    <div className="pt-4">
      <NinetyReCandleStickChart data={chartData} />
    </div>
  );
};

export default NinetyCandleStickChart;
