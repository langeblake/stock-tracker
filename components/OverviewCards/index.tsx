
import IndicesOverview from "@/components/OverviewCards/IndicesOverview"
import CurrencyOverview from "@/components/OverviewCards/CurrencyOverview"
import CryptoOverview from "./CryptoOverview"
import NewsOverview from "./TickerNews"
import { Suspense } from "react"
import LoadingHeatMap from "@/components/Loading/LoadingHeatMap"
import LoadingOverviewCards from "../Loading/LoadingOverviewCards"

const OverviewCards = () => {
  return (
    // <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 pt-32 pb-20 px-16 gap-6">
    <section className="container hidden xl:flex justify-between pt-32 pb-20 gap-3">
      <Suspense fallback={<LoadingOverviewCards />}>
            <IndicesOverview />
            <CurrencyOverview />
            <CryptoOverview />
            <NewsOverview />
      </Suspense>
    </section>
    
  )
}

export default OverviewCards