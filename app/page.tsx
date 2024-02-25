import ScrollUp from "@/components/Common/ScrollUp";
import MarketChange from "@/components/MarketChange-SS";
import MarketOverviewSC from "@/components/MarketOverview-SS";
import MarketOverview from "@/components/MarketOverview";
import MarketTrend from "@/components/MarketTrend";
import { Metadata } from "next";
import { Suspense } from "react";
import OverviewCards from "@/components/OverviewCards";
import GainersLosers from "@/components/MarketChange-SS/GainersLosersCard";

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
        <MarketChange />
    </>
  );
}

// export default function Home() {
//   return (
//     <>
//         <ScrollUp />
//         <MarketOverview />
//         {/* <MarketTrend /> */}
//         <MarketChange />
//     </>
//   );
// }
