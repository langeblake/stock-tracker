import SectionTitle from "../Common/SectionTitle";
import TrendList from "./TrendList";




const MarketTrend = () => {
    return ( 
        <>
            <section id="tickerListSection" className="pt-20 pb-4 md:pt-20 md:pb-2 lg:pt-28 xl:pt-10">
                <div className="px-4 2xl:container">
                    {/* <SectionTitle
                    title="Market Trend List"
                    paragraph="This section will include a (regularly) updated list of stock trends: Ranking, Symbol, Price, Price(24hr%), Funding Rate, Volume, Volume(24hr%), Market Cap, etc. "
                    center
                    /> */}
                    <TrendList />
                </div>
            </section>
        </>
    );
}
 
export default MarketTrend;

