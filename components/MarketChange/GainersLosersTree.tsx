// import TreeMap from "./treeMap";
import TreeMap from "./treeMapScale";
// import { treeMapData as data } from "@/utils/treeMapData";
import { treeMapStockData as data } from "@/utils/treeMapData";

const GainersLosersTree = () => {
    return ( 
        <div className="w-full">
            <h1 className='font-bold text-2xl py-6'>Heatmap (24hr)</h1>
            <div className=' w-full h-full rounded-lg'>
               {/* <TreeMap data={data} height={580} width={680}/> */}
               <TreeMap data={data}/>
            </div>
        </div>
     );
}

export default GainersLosersTree;