import { Metadata } from "next";
import ScrollUp from "@/components/Common/ScrollUp";
import OverviewCards from "@/components/OverviewCards";
import MarketChange from "@/components/MarketChange";
import GainersLosers from "@/components/MarketChange/GainersLosersCard";
import ChangeHeatMap from "@/components/MarketChange/Heatmap/ChangeHeatMap";
import MarketTrend from "@/components/MarketTrend";
import VolumeHeatMap from "@/components/MarketChange/Heatmap/VolumeHeatMap";

export const metadata: Metadata = {
  title: "Lumiere",
  description: "Stock Tracker",
};

// interface HomeProps {
//   searchParams: ITickerListParams;
// }

const Home = async () => {
  // const search =
  //   typeof searchParams.search === "string" ? searchParams.search : undefined;
  // const favorites =
  //   typeof searchParams.favorites === "string"
  //     ? searchParams.favorites
  //     : undefined;

  return (
    <>
      <ScrollUp />
      <OverviewCards />
      <MarketTrend />
      <MarketChange
        GainersLosers={<GainersLosers />}
        VolumeHeatMap={<VolumeHeatMap />}
        ChangeHeatMap={<ChangeHeatMap />}
      ></MarketChange>
    </>
  );
};

export default Home;
