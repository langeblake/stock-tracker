"use client"

// import TreeMap from "./treeMap";
import D3VolumeTree from "./D3VolumeTree";
// import { treeMapData as data } from "@/utils/treeMapData";
// import { treeMapStockData as data } from "@/data/treeMapData-Test01";
import { Oval } from "react-loader-spinner";
import { transformVolumeDataForTreeMap } from "@/utils/helper/transformVolumeDataForTreeMap";
import { usePolygonData } from "@/context/polygon/allTickerDataContext";

const VolumeHeatMap = () => {
    const { data, error, isLoading } = usePolygonData();

    if (isLoading) {
        return (
            <div className="w-full">
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
    const treeMapData = transformVolumeDataForTreeMap(data);

    

    return ( 
        <div className="w-full max-h-[700px] min-h-[700px]">
            <div className=' w-full h-full rounded-lg'>
               {/* <TreeMap data={data} height={580} width={680}/> */}
               {/* <TreeMapScale data={data}/> */}
               <D3VolumeTree data={treeMapData}/>
            </div>
        </div>
     );
}

export default VolumeHeatMap;