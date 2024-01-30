import TreeMap from "./treeMap";
// import { treeMapData as data } from "@/utils/treeMapData";
import { treeMapStockData as data } from "@/utils/treeMapData";

const GainersLosersTree = () => {
    return ( 
        <div className="w-full">
            <h1 className='font-bold text-2xl py-6'>Heatmap (24hr)</h1>
            <div className='dark:bg-gray-700 bg-gray-300 w-full h-full rounded-lg'>
               <TreeMap data={data} height={400} width={600}/>
            </div>
        </div>
     );
}

export default GainersLosersTree;