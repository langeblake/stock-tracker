import React, { useState } from 'react';
import ChangeHeatMap from "./Heatmap/ChangeHeatMap";
import GainersLosers from "./GainersLosersCard";
import VolumeHeatMap from "./Heatmap/VolumeHeatMap";

const MarketChange = () => {
    // State to track which heatmap is selected

    return ( 
        <section id="marketchange" className="container py-4 md:py-10 lg:py-10 dark:bg-black bg-gray-100 border-slate-600">
            <div className="">
                
                <div className="h-fit flex gap-6 flex-col lg:flex-row">
                    <div className="lg:w-1/2">
                        <GainersLosers />
                    </div>
                    

                </div>
            </div>
        </section>
    );
}
 
export default MarketChange;
