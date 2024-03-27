
import { Search } from "./Search";
import Favorites from "./Favorites";
import TrendList from "./TrendList";

export interface ITickerListParams {
    search?: string;
    favorites?: string;

  }


const MarketTrend = ({search, favorites}) => {
    const query = favorites ? favorites : search;

    return ( 
        <>
            <section id="tickerListSection" className="pt-20 pb-4 md:pt-28 md:pb-2 xl:pt-0">
                <div className="px-4 2xl:container">
                <div className="flex gap-4 items-center flex-col pb-4 md:pb-0 md:flex-row">
                    <h1 className='md:w-2/5 font-bold text-2xl pt-6 md:pb-6'>Trending Tickers</h1>
                    <div className="flex justify-center items-center gap-4 flex-col md:flex-row">
                        <Search />
                        <Favorites />
                    </div>
                </div>
                    <TrendList query={query}/>
                </div>
            </section>
        </>
    );
}
 
export default MarketTrend;

