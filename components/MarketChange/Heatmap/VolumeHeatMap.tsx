import { transformVolumeDataForTreeMap } from "@/utils/helper/transformVolumeDataForTreeMapReChart";
import { format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import VolumeTreeMap from "./ReChartTreeMaps/VolumeTreeMap";

const fetchTickerData = async () => {
  const apiKey = process.env.POLYGON_API_KEY;
  try {
    // // Specify the timezone you want, in this case, Eastern Standard Time
    // const timeZone = "America/Los_Angeles";

    // // Get the current date and time in UTC
    // const nowUTC = new Date();

    // // Convert UTC to the desired timezone
    // const nowInEST = utcToZonedTime(nowUTC, timeZone);

    // // Format the date in the desired format
    // const formattedDate = format(nowInEST, "yyyy-MM-dd");

    const response = await fetch(
      `https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/tickers?apiKey=${apiKey}`,
      { cache: "no-store" }
    );
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

const VolumeHeatMap = async () => {
  const tickerData = await fetchTickerData();

  // console.log(tickerData)

  // Transform the data right before rendering the tree map
  const treeMapData = transformVolumeDataForTreeMap(tickerData);

  return (
    <div className="w-full max-h-[700px] min-h-[500px]">
      <div className=" w-full h-full rounded-lg">
        {/* <D3VolumeTree data={treeMapData}/> */}
        <VolumeTreeMap data={treeMapData} />
      </div>
    </div>
  );
};

export default VolumeHeatMap;
