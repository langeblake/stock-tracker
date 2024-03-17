import { transformChangeDataForTreeMap } from "@/utils/helper/transformChangeDataForTreeMapReChart";
// import D3ChangeTree from "./D3TreeMaps/D3ChangeTree";
import ChangeTreeMap from "./ReChartTreeMaps/ChangeTreeMap";

type TickerData = {
    ticker: {
      ticker: string;
      todaysChangePerc: number;
      todaysChange: number;
      updated: number;
      day: {
        o: number;
        h: number;
        l: number;
        c: number;
        v: number;
        vw: number;
      };
      min: {
        av: number;
        t: number;
        n: number;
        o: number;
        h: number;
        l: number;
        c: number;
        v: number;
        vw: number;
      };
      prevDay: {
        o: number;
        h: number;
        l: number;
        c: number;
        v: number;
        vw: number;
      };
    };
  };

interface GainersLosersResponse {
    gainers: { tickers: TickerData[] };
    losers: { tickers: TickerData[] };
  }


const fetchGainersLosersData = async (): Promise<GainersLosersResponse | null> => {
    try {
      const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://your-production-domain.com';
      const response = await fetch(`${baseUrl}/api/gainers-losers`, { cache: 'no-store' });
      if (!response.ok) {
        throw new Error(`Failed to fetch data Gainers-Losers`);
      }
      const data = await response.json();
   
      return data; // Assuming the API returns the data structured as expected.
    } catch (error) {
      console.error(`Error fetching data for Gainers-Losers:`, error);
      return null;
    }
  };


const ChangeHeatMap = async () => {
    const data = await fetchGainersLosersData();

    // Transform the data right before rendering the tree map
    const treeMapData = transformChangeDataForTreeMap(data);

    console.log(treeMapData)

    return ( 
        <div className="w-full max-h-[700px] min-h-[500px]">
            <div className=' w-full h-full rounded-lg'>
               {/* <TreeMap data={data} height={580} width={680}/> */}
               {/* <TreeMapScale data={data}/> */}
               {/* <D3ChangeTree data={treeMapData}/> */}
               <ChangeTreeMap data={treeMapData}/>
            </div>
        </div>
     );
}

export default ChangeHeatMap;