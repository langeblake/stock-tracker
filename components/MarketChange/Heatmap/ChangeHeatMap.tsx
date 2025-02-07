import ChangeTreeMap from "./ReChartTreeMaps/ChangeTreeMap";
import changeTreeData from "@/data/staticPolygonData/changeTreeData.json";

const ChangeHeatMap = async () => {
  return (
    <div className="w-full max-h-[700px] min-h-[500px]">
      <div className=" w-full h-full rounded-lg">
        {/* <TreeMap data={data} height={580} width={680}/> */}
        {/* <TreeMapScale data={data}/> */}
        {/* <D3ChangeTree data={treeMapData}/> */}
        <ChangeTreeMap data={changeTreeData} />
      </div>
    </div>
  );
};

export default ChangeHeatMap;
