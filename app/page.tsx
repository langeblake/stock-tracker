import ScrollUp from "@/components/Common/ScrollUp";
import MarketChange from "@/components/MarketChange";
import MarketOverview from "@/components/MarketOverview";
import MarketTrend from "@/components/MarketTrend";
import fetchPolygonDaily from "@/utils/api/fetchPolygonDaily";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "K-MarketView",
  description: "Korean Financial Market Data",
  // other metadata
};

export default function Home() {
  return (
    <>
      <ScrollUp />
        <MarketOverview />
        <MarketTrend />
        <MarketChange />
    </>
  );
}

