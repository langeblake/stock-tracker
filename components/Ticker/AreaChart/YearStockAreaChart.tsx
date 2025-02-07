import React, { Suspense } from "react";
import { ReAreaChart } from "./Rechart-Area";
import { YearReAreaChart } from "./YearRechart-Area";
import { fetchAggregateData } from "./StockAreaChart";

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


const YearStockAreaChart = async ({ ticker, listDate }) => {
  const aggregateData = await fetchAggregateData(ticker, listDate);

  if (!aggregateData || !aggregateData.results) {
    console.error("Failed to fetch aggregate data or no results found");
    return null; // Return null or some error component
  }
  const chartData = aggregateData.results.map((d) => ({
    date: new Date(d.t).toISOString().substring(0, 10), // Format date as string for the name
    close: d.c, // Use `d.c` for the closing price
    // Directly create a Date object for sorting purposes
  }));

  return (
    <div>
      <YearReAreaChart data={chartData} />
    </div>
  );
};

export default YearStockAreaChart;
