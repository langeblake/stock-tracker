import { DataTable } from "./TickerTable/data-table";
import { columns } from "./TickerTable/columns";
import tickerData from '@/data/staticPolygonData/tickerData.json';
import Fuse from "fuse.js";

export const formatNumberString = (value: number | undefined) => {
  if (value !== undefined) {
    return value.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
  return "";
};

type TrendListProps = {
  query: string | undefined;
  favorites: string[];
  favoriteToggle: boolean;
};

const TrendList = ({ query, favorites, favoriteToggle }: TrendListProps) => {
  let filteredData: any[] = [];

  // Check if there are favorites
  if (favoriteToggle) {
    // Filter tickerData to only include favorites
    filteredData = tickerData.filter((stock) => favorites.includes(stock.symbol));
  } else {
    filteredData = tickerData;
  }

  // Further filter the data based on the query using Fuse.js
  if (query) {
    const fuse = new Fuse(filteredData, {
      keys: ['symbol'],
      threshold: 0.1, // Adjust the threshold as needed
    });
    const results = fuse.search(query);
    filteredData = results.map(result => result.item);
  }

  return (
    <section id="tickerListSection" className="">
      <div className="">
        <DataTable columns={columns} data={filteredData} />
      </div>
    </section>
  );
};

export default TrendList;

