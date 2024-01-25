// import Link from "next/link";
// import SectionTitle from "../Common/SectionTitle";
import { OverviewCard } from "./overviewCard";
// import TopCharts from "./topCharts";
// import TopStocks from "./topStocks";


const MarketOverview = () => {
  const marketData = [
    { id: 1, market: "Market", price: "Price", change: "Change" },
    { id: 2, market: "Market", price: "Price", change: "Change" },
    { id: 3, market: "Market", price: "Price", change: "Change" },
    { id: 4, market: "Market", price: "Price", change: "Change" },
    { id: 5, market: "Market", price: "Price", change: "Change" },
    { id: 6, market: "Market", price: "Price", change: "Change" },
    { id: 7, market: "Market", price: "Price", change: "Change" },
    { id: 8, market: "Market", price: "Price", change: "Change" },
    { id: 9, market: "Market", price: "Price", change: "Change" },
    { id: 10, market: "Market", price: "Price", change: "Change" },
    { id: 11, market: "Market", price: "Price", change: "Change" },
    { id: 12, market: "Market", price: "Price", change: "Change" },
    { id: 13, market: "Market", price: "Price", change: "Change" },
    { id: 14, market: "Market", price: "Price", change: "Change" },
    { id: 15, market: "Market", price: "Price", change: "Change" },
    { id: 16, market: "Market", price: "Price", change: "Change" },
    { id: 17, market: "Market", price: "Price", change: "Change" },
    { id: 18, market: "Market", price: "Price", change: "Change" },
    { id: 19, market: "Market", price: "Price", change: "Change" },
    { id: 20, market: "Market", price: "Price", change: "Change" },
    // ... more data objects
];
  
  // Function to chunk the data into groups of 5
  const chunkSize = 5;
  const chunks = [];
  for (let i = 0; i < marketData.length; i += chunkSize) {
    chunks.push(marketData.slice(i, i + chunkSize));
  }

  return (
    <section
      id="market-overview"
      className="hidden lg:flex w-full dark:bg-black overflow-hidden bg-gray-100 pb-16 pt-[120px]"
    >
      <div className="container mx-auto pt-24">
        <div className="flex justify-center items-center gap-4 ">
          {chunks.map((chunk, index) => (
            <OverviewCard key={index} data={chunk} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarketOverview;
