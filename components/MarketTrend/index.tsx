import { FiSearch } from "react-icons/fi";
import SectionTitle from "../Common/SectionTitle";
import TrendList from "./TrendList";
import { Input } from "../ui/input";
import { Search } from "./Search";
import Favorites from "./Favorites";




const MarketTrend = ({query}) => {
    return ( 
        <>
            <section id="tickerListSection" className="pt-20 pb-4 md:pt-20 md:pb-2 lg:pt-28 xl:pt-0">
                <div className="px-4 2xl:container">
                <div className="flex items-center flex-col pb-4 sm:pb-0 sm:flex-row">
                    <h1 className='sm:w-2/5 font-bold text-2xl py-6'>Trending Tickers</h1>
                    <Search />
                    <Favorites />
                </div>
                    <TrendList query={query}/>
                </div>
            </section>
        </>
    );
}
 
export default MarketTrend;

