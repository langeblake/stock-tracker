import VolumeTreeMap from "./ReChartTreeMaps/VolumeTreeMap";
import volumeTreeData from "@/data/staticPolygonData/volumeTreeData.json";


const VolumeHeatMap = async () => {

  

  return (
    <div className="w-full max-h-[700px] min-h-[500px]">
      <div className=" w-full h-full rounded-lg">
        {/* <D3VolumeTree data={treeMapData}/> */}
        <VolumeTreeMap data={volumeTreeData} />
      </div>
    </div>
  );
};

export default VolumeHeatMap;
