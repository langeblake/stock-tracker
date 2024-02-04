// import SectionTitle from "../Common/SectionTitle";
import GainersLosers from "./GainersLosersCard";
import GainersLosersTree from "./HeatMaps";

const MarketChange = () => {
    return ( 
        <section id="marketchange" className="py-16 md:py-20 lg:py-28 dark:bg-black bg-gray-100 border-slate-600">
            <div className="px-12">
                {/* <SectionTitle
                title="Market Change"
                paragraph="This section can contain two components: Gains & Losses; Tree/Heat Maps"
                center
                /> */}
                <div className="h-fit flex gap-6 flex-col lg:flex-row">
                    <div className="lg:w-1/2">
                        <GainersLosers />
                    </div>
                    <div className="lg:w-1/2">
                        <GainersLosersTree />
                    </div>
                </div>
            </div>
        </section>
    );
}
 
export default MarketChange;