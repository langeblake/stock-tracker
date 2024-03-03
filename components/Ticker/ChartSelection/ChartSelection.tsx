'use client'
import React, { Suspense, useState } from 'react';
import { FcCandleSticks } from "react-icons/fc";
import { FcAreaChart } from "react-icons/fc";

const ChartSelection = ({
    StockAreaChart,
    NinetyCandleStickChart,
    ThirtyCandleStickChart,
    SevenCandleStickChart,
}) => {
    const [selectedChartType, setSelectedChartType] = useState("Area")
    const [selectedChartRange, setSelectedChartRange] = useState("90")

    const renderChart = () => {
        if (selectedChartType === "Area") {
            return StockAreaChart;
        } else if (selectedChartType === "Candlestick") {
            switch (selectedChartRange) {
                case "90":
                    return NinetyCandleStickChart
                case "30":
                    return ThirtyCandleStickChart;
                case "15":
                    return SevenCandleStickChart;
                default:
                    return null; // or some default component
            }
        }
        return null; // In case no chart type is selected
    };


  return (
    <section className='py-10'>
        <div className='max-w-fit border flex gap-1 border-zinc-300 bg-zinc-300 dark:border-zinc-700 dark:bg-zinc-700 px-1  rounded-lg'>
            <button className={`py-1.5 px-3 text-sm hover:cursor-pointer ${selectedChartType === 'Area' ? 'bg-zinc-100 dark:bg-black rounded-lg' : 'hover:bg-zinc-400/20 dark:hover:bg-zinc-800 hover:rounded-lg'}`} 
            onClick={() => setSelectedChartType('Area')}>
                <div className='flex gap-2 px-2'>
                <FcAreaChart size={20} /> 
                <p className='font-light'>Area</p>
                </div>
            </button>
            <button className={`py-1.5 px- text-sm hover:cursor-pointer ${selectedChartType === 'Candlestick' ? 'bg-zinc-100 dark:bg-black rounded-lg' : 'hover:bg-zinc-400/20 dark:hover:bg-zinc-800 hover:rounded-lg'}`} 
            onClick={() => setSelectedChartType('Candlestick')}>
                <div className='flex gap-2 px-5'>
                <FcCandleSticks size={20}/> 
                <p className='font-light'>Candle</p>
                </div>
            </button>
        </div>
        {selectedChartType === "Candlestick" ? (
            <div className='max-w-fit mt-2 border border-zinc-300 bg-zinc-300 dark:border-zinc-700 dark:bg-zinc-700 px-1  rounded-lg'>
            <button className={`py-1.5 px-3 text-sm hover:cursor-pointer ${selectedChartRange === '90' ? 'bg-zinc-100 dark:bg-black rounded-lg' : 'hover:bg-zinc-400/20 dark:hover:bg-zinc-800 hover:rounded-lg'}`} 
            onClick={() => setSelectedChartRange('90')}>
                <p className='font-light'>90d</p>
            </button>
            <button className={`py-1.5 px-3 text-sm hover:cursor-pointer ${selectedChartRange === '30' ? 'bg-zinc-100 dark:bg-black rounded-lg' : 'hover:bg-zinc-400/20 dark:hover:bg-zinc-800 hover:rounded-lg'}`} 
            onClick={() => setSelectedChartRange('30')}>
                <p className='font-light'>30d</p>
            </button>
            <button className={`py-1.5 px-3 text-sm hover:cursor-pointer ${selectedChartRange === '15' ? 'bg-zinc-100 dark:bg-black rounded-lg' : 'hover:bg-zinc-400/20 dark:hover:bg-zinc-800 hover:rounded-lg'}`} 
            onClick={() => setSelectedChartRange('15')}>
                <p className='font-light'>15d</p>
            </button>
            </div>
        ) : (
            <div></div>
        )}
        <Suspense fallback={<div className='h-96'></div>}>
        {renderChart()}
        </Suspense>
    </section>
  )
}

export default ChartSelection