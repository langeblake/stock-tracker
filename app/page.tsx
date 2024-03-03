import { Metadata } from "next";
// import { Suspense } from "react";
import ScrollUp from "@/components/Common/ScrollUp";
import OverviewCards from "@/components/OverviewCards";
import MarketChange from "@/components/MarketChange-SS";

import GainersLosers from "@/components/MarketChange-SS/GainersLosersCard";
import VolumeHeatMap from "@/components/MarketChange-SS/Heatmap/VolumeHeatMap";
import ChangeHeatMap from "@/components/MarketChange-SS/Heatmap/ChangeHeatMap";

export const metadata: Metadata = {
  title: "K-MarketView",
  description: "Korean Financial Market Data",
  // other metadata
};

export default function Home() {
  return (
    <>
        <ScrollUp />
        <OverviewCards /> 
        <MarketChange 
          GainersLosers={<GainersLosers/>} 
          VolumeHeatMap={<VolumeHeatMap/>}
          ChangeHeatMap={<ChangeHeatMap/>}
          >
        </MarketChange>
    </>
  );
}

