import ScrollUp from "@/components/Common/ScrollUp";
import IndicesOverview from "@/components/IndicesOverview";
import MarketChange from "@/components/MarketChange";
import MarketOverviewSC from "@/components/MarketOverview-SC";
import MarketOverview from "@/components/MarketOverview";
import MarketTrend from "@/components/MarketTrend";
import { Metadata } from "next";
import { Suspense } from "react";
import Loading from "./loading";

export const metadata: Metadata = {
  title: "K-MarketView",
  description: "Korean Financial Market Data",
  // other metadata
};

// export default function Home() {
//   return (
//     <>
//         <ScrollUp />
//           <Suspense fallback={<Loading />}>
//             <MarketOverviewSC />
//           </Suspense>
//         <IndicesOverview /> 
//         <MarketTrend />
//         <MarketChange />
//     </>
//   );
// }

export default function Home() {
  return (
    <>
        <ScrollUp />
        <MarketOverview />
        {/* <MarketTrend /> */}
        <MarketChange />
    </>
  );
}
