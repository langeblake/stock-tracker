import { Metadata } from "next";
import ScrollUp from "@/components/Common/ScrollUp";
import OverviewCards from "@/components/OverviewCards";
import MarketChange from "@/components/MarketChange";
import GainersLosers from "@/components/MarketChange/GainersLosersCard";
import ChangeHeatMap from "@/components/MarketChange/Heatmap/ChangeHeatMap";
import MarketTrend from "@/components/MarketTrend";
import VolumeHeatMap from "@/components/MarketChange/Heatmap/VolumeHeatMap";
import Modal from "@/components/Modal";
import ModalManager from "@/components/ModalManager";

export const metadata: Metadata = {
  title: "Lumiere",
  description: "Stock Tracker",
};

const Home = async () => {
  return (
    <>
      <ModalManager />
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
