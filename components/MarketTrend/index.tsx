'use client'

import SectionTitle from "../Common/SectionTitle";
import TrendList from "./trendList";




const MarketTrend = () => {
    return ( 
        <>
            <section id="features" className="py-16 md:py-20 lg:py-0">
                <div className="container">
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

