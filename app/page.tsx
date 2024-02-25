import ScrollUp from "@/components/Common/ScrollUp";
import MarketChange from "@/components/MarketChange-SS";

import { Metadata } from "next";
// import { Suspense } from "react";
import OverviewCards from "@/components/OverviewCards";
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
          {/* <Suspense fallback={<Loading />}>
            <MarketOverviewSC />
          </Suspense> */}
        <OverviewCards /> 
        <MarketChange 
          GainersLosers={<GainersLosers/>} 
          // VolumeHeatMap={<VolumeHeatMap/>}
          // ChangeHeatMap={<ChangeHeatMap/>}
          >
        </MarketChange>
    </>
  );
}

