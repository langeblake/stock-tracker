"use client"

// import TreeMap from "./treeMap";
import usePolygonDaily from "@/hooks/usePolygonDaily";
import TreeMapScale from "./treeMapScale";
// import { treeMapData as data } from "@/utils/treeMapData";
// import { treeMapStockData as data } from "@/data/treeMapData-Test01";
import { transformDataForTreeMap } from "@/utils/transformDataForTreeMap";

const GainersLosersTree = () => {
    const { data, error, isLoading } = usePolygonDaily();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading data</div>;
  
    // Transform the data right before rendering the tree map
    const treeMapData = transformDataForTreeMap(data);

    return ( 
        <div className="w-full">
            <h1 className='font-bold text-2xl py-6'>Heatmap (24hr)</h1>
            <div className=' w-full h-full rounded-lg'>
               {/* <TreeMap data={data} height={580} width={680}/> */}
               {/* <TreeMapScale data={data}/> */}
               <TreeMapScale data={treeMapData}/>
            </div>
        </div>
     );
}

export default GainersLosersTree;