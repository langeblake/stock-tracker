import { Metadata } from "next";
// import { Suspense } from "react";
import ScrollUp from "@/components/Common/ScrollUp";
import OverviewCards from "@/components/OverviewCards";
import MarketChange from "@/components/MarketChange-SS";

import GainersLosers from "@/components/MarketChange-SS/GainersLosersCard";
import VolumeHeatMap from "@/components/MarketChange-SS/Heatmap/VolumeHeatMap";
import ChangeHeatMap from "@/components/MarketChange-SS/Heatmap/ChangeHeatMap";
import MarketTrend from "@/components/MarketTrend";
import TrendList from "@/components/MarketTrend/TrendList";

export const metadata: Metadata = {
  title: "K-MarketView",
  description: "Korean Financial Market Data",
  // other metadata
};



export default function Home({
  searchParams
}: {
  searchParams: string
}) {

  const search = typeof searchParams.search === 'string' ? searchParams.search : undefined


  return (
    <>
        <ScrollUp />
        <OverviewCards /> 
        <MarketTrend query={search}/>
        {/* <TrendList /> */}
        <MarketChange 
          GainersLosers={<GainersLosers/>} 
          VolumeHeatMap={<VolumeHeatMap/>}
          ChangeHeatMap={<ChangeHeatMap/>}
          >
        </MarketChange>
        
    </>
  );
}

