'use client'
import React, { useState } from 'react'

const ChartSelection = ({
    AreaChartSelection,
    CandleStickChartSelection,
}) => {
    const [selectedChart, setSelectedChart] = useState("Area")

  return (
    <section>
        <div className='max-w-fit border border-zinc-300 bg-zinc-300 dark:border-zinc-700 dark:bg-zinc-700 px-1  rounded-lg'>
            <button className={`py-1.5 px-3 text-sm hover:cursor-pointer ${selectedChart === 'Area' ? 'bg-zinc-100 dark:bg-black rounded-lg' : 'hover:bg-zinc-400/20 dark:hover:bg-zinc-800 hover:rounded-lg'}`} 
            onClick={() => setSelectedChart('Area')}>
                Area
            </button>
            <button className={`py-1.5 px-3 text-sm hover:cursor-pointer ${selectedChart === 'Candlestick' ? 'bg-zinc-100 dark:bg-black rounded-lg' : 'hover:bg-zinc-400/20 dark:hover:bg-zinc-800 hover:rounded-lg'}`} 
            onClick={() => setSelectedChart('Candlestick')}>
                Candlestick
            </button>
        </div>
        {selectedChart === "Area" ? AreaChartSelection : CandleStickChartSelection}
    </section>
  )
}

export default ChartSelection