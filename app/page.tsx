// import AboutSectionOne from "@/components/About/AboutSectionOne";
// import AboutSectionTwo from "@/components/About/AboutSectionTwo";
// import Brands from "@/components/(template)/Brands";
import ScrollUp from "@/components/Common/ScrollUp";
// import Contact from "@/components/Contact";
// import Features from "@/components/(template)/Features";
import Hero from "@/components/Hero";
import MarketChange from "@/components/MarketChange";
import MarketOverview from "@/components/MarketOverview";
import MarketTrend from "@/components/MarketTrend";
import PolygonDataFetcher from "@/components/polygonDataFetcher";
// import Pricing from "@/components/(template)/Pricing";
// import Testimonials from "@/components/Testimonials";
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
      {/* <Hero /> */}
      <MarketOverview />
      {/* <PolygonDataFetcher /> */}
      <MarketTrend />
      <MarketChange />
      {/* <Features /> */}
      {/* <Brands /> */}
      {/* <AboutSectionOne />
      <AboutSectionTwo /> */}
      {/* <Testimonials /> */}
      {/* <Pricing /> */}
      {/* <Contact /> */}
    </>
  );
}
