"use client"

// import TreeMap from "./treeMap";
import usePolygonDaily from "@/hooks/usePolygonDaily";
import VolumeHeatMap from "./VolumeHeatMap";
// import { treeMapData as data } from "@/utils/treeMapData";
// import { treeMapStockData as data } from "@/data/treeMapData-Test01";
import { Grid, Oval } from "react-loader-spinner";
import usePolygonAllTickers from "@/hooks/usePolygonAllTickers";
import { transformTickerDataForTreeMap } from "@/utils/transformTIckerDataForTreeMap";

const GainersLosersTree = () => {
    const { data, error, isLoading } = usePolygonAllTickers();

    if (isLoading) {
        return (
            <div className="w-full">
                <h1 className='font-bold text-2xl py-6'>Heatmap (24hr)</h1>
                <div className=' flex w-full h-500px rounded-lg justify-center items-center'>
                <Oval
                    visible={true}
                    height="80"
                    width="80"
                    color="#4fa94d"
                    ariaLabel="oval-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                />
                </div>
            </div>
        );
    }
    if (error) return <div>Error loading data</div>;
  
    // Transform the data right before rendering the tree map
    const treeMapData = transformTickerDataForTreeMap(data);
    console.log("Treemap Data", treeMapData)

    

    return ( 
        <div className="w-full max-h-[700px] min-h-[700px]">
            <h1 className='font-bold text-2xl py-6'>Heatmap (24hr)</h1>
            <div className=' w-full h-full rounded-lg'>
               {/* <TreeMap data={data} height={580} width={680}/> */}
               {/* <TreeMapScale data={data}/> */}
               <VolumeHeatMap data={treeMapData}/>
            </div>
        </div>
     );
}

export default GainersLosersTree;