"use client"

// import TreeMap from "./treeMap";
// import { treeMapData as data } from "@/utils/treeMapData";
// import { treeMapStockData as data } from "@/data/treeMapData-Test01";
import { Oval } from "react-loader-spinner";
import { transformChangeDataForTreeMap } from "@/utils/helper/transformChangeDataForTreeMap";
import D3ChangeTree from "./D3TreeMaps/D3ChangeTree";
import useGainersLosersStore from "@/store/GainersLosersStore"
import { useEffect } from "react";


const ChangeHeatMap = () => {
    const { data, isLoading, error, fetchData } = useGainersLosersStore();

    useEffect(() => {
        // Only fetch data if the tickers array is empty (because of Heatmap toggle)
        if (data.gainers.tickers.length === 0) {
          fetchData();
        }
      }, [data.gainers.tickers.length, fetchData]);


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
    const treeMapData = transformChangeDataForTreeMap(data);

    

    return ( 
        <div className="w-full max-h-[700px] min-h-[700px]">
            <div className=' w-full h-full rounded-lg'>
               {/* <TreeMap data={data} height={580} width={680}/> */}
               {/* <TreeMapScale data={data}/> */}
               <D3ChangeTree data={treeMapData}/>
            </div>
        </div>
     );
}

export default ChangeHeatMap;