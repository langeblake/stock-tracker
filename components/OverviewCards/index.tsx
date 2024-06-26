import IndicesOverview from "@/components/OverviewCards/IndicesOverview";
import CurrencyOverview from "@/components/OverviewCards/CurrencyOverview";
import CryptoOverview from "./CryptoOverview";
import NewsOverview from "./TickerNews";
import { Suspense } from "react";
import LoadingOverviewCards from "../Loading/LoadingOverviewCards";

const OverviewCards = () => {
  return (
    <section className="container hidden xl:flex justify-between pt-32 pb-10 gap-3">
      <Suspense fallback={<LoadingOverviewCards />}>
        <IndicesOverview />
        <CurrencyOverview />
        <CryptoOverview />
        <NewsOverview />
      </Suspense>
    </section>
  );
};

export default OverviewCards;
