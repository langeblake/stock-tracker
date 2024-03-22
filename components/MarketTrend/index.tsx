import { FiSearch } from "react-icons/fi";
import SectionTitle from "../Common/SectionTitle";
import TrendList from "./TrendList";
import { Input } from "../ui/input";
import { Search } from "./Search";
import Favorites from "./Favorites";




const MarketTrend = ({query}) => {
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

