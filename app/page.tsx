import ScrollUp from "@/components/Common/ScrollUp";
import MarketChange from "@/components/MarketChange";
import MarketOverview from "@/components/MarketOverview";
import { Metadata } from "next";
import { PolygonDataProvider } from "@/context/polygon/allTickerDataContext.js"

export const metadata: Metadata = {
  title: "K-MarketView",
  description: "Korean Financial Market Data",
  // other metadata
};

export default function Home() {
  return (
    <>
      <ScrollUp />
      <PolygonDataProvider>
        <MarketOverview />
        {/* <MarketTrend /> */}
        <MarketChange />
      </PolygonDataProvider>
    </>
  );
}
