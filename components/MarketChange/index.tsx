"use client";

import LoadingHeatMap from "@/components/Loading/LoadingHeatMap";
import React, { Suspense, useState } from "react";

const MarketChange = ({ GainersLosers, VolumeHeatMap, ChangeHeatMap }) => {
  // State to track which heatmap is selected
  const [selectedHeatMap, setSelectedHeatMap] = useState("volume");

  return (
    <section
      id="marketchange"
      className="pb-10 dark:bg-black bg-gray-100 border-slate-600"
    >
      <div className="container">
        <div className="h-fit flex gap-6 flex-col lg:flex-row">
          <div className="lg:w-1/2">
            <h1 className="font-bold text-2xl py-6">Gainers & Losers</h1>
            <Suspense>{GainersLosers}</Suspense>
          </div>

          <div className="lg:w-1/2">
            <div className="flex justify-start items-center pt-6 pb-4 mb-1">
              {/* Tab selection bar */}
              <h1 className="font-bold text-2xl mr-8">Heatmap (24hr)</h1>
              <div className="border flex border-zinc-300 bg-zinc-300 dark:border-zinc-700 dark:bg-zinc-700 px-1  rounded-lg">
                <button
                  className={`py-1.5 px-2 hover:cursor-pointer text-sm ${selectedHeatMap === "volume" ? " bg-zinc-100 dark:bg-black rounded-lg " : "hover:bg-zinc-400/20 dark:hover:bg-zinc-800 hover:rounded-lg"}`}
                  onClick={() => setSelectedHeatMap("volume")}
                >
                  Volume
                </button>
                <button
                  className={`py-1.5 px-3 text-sm hover:cursor-pointer ${selectedHeatMap === "change" ? "bg-zinc-100 dark:bg-black rounded-lg" : "hover:bg-zinc-400/20 dark:hover:bg-zinc-800 hover:rounded-lg"}`}
                  onClick={() => setSelectedHeatMap("change")}
                >
                  Chg%
                </button>
              </div>
            </div>

            {/* Conditional rendering based on selected tab */}
            <Suspense fallback={<LoadingHeatMap />}>
              {selectedHeatMap === "volume" ? VolumeHeatMap : ChangeHeatMap}
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketChange;
