import IndicesOverview from "@/components/OverviewCards/IndicesOverview"
import CurrencyOverview from "@/components/OverviewCards/CurrencyOverview"
import CryptoOverview from "./CryptoOverview"
import NewsOverview from "./TickerNews"

const OverviewCards = () => {
  return (
    // <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 pt-32 pb-20 px-16 gap-6">
    <section className="container hidden xl:flex pt-32 pb-20 ">
            <IndicesOverview />
            <CurrencyOverview />
            <CryptoOverview />
            <NewsOverview />
    </section>
    
  )
}

export default OverviewCards