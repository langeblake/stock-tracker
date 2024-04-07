'use client'
import LoadingTickerCharts from '@/components/Loading/LoadingTickerCharts';
import React, { Suspense, useState } from 'react';
import { FcCandleSticks } from "react-icons/fc";
import { FcAreaChart } from "react-icons/fc";

const ChartSelection = ({
    StockAreaChart,
    YearStockAreaChart,
    NinetyCandleStickChart,
    ThirtyCandleStickChart,
    SevenCandleStickChart,
}) => {
    const [selectedChartType, setSelectedChartType] = useState("Area")
    const [selectedAreaChartRange, setSelectedAreaChartRange] = useState("5yr")
    const [selectedCandleChartRange, setSelectedCandleChartRange] = useState("120")

    const renderChart = () => {
        if (selectedChartType === "Area") {
            switch (selectedAreaChartRange) {
                case "5yr":
                    return StockAreaChart
                case "1yr":
                    return YearStockAreaChart;
                // case "1mo":
                //     return MonthStockAreaChart;
                default:
                    return null; // or some default component
            }
        } else if (selectedChartType === "Candlestick") {
            switch (selectedCandleChartRange) {
                case "120":
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
            <button className={`py-1.5 px-3 text-sm hover:cursor-pointer ${selectedCandleChartRange === '120' ? 'bg-zinc-100 dark:bg-black rounded-lg' : 'hover:bg-zinc-400/20 dark:hover:bg-zinc-800 hover:rounded-lg'}`} 
            onClick={() => setSelectedCandleChartRange('120')}>
                <p className='font-light'>120d</p>
            </button>
            <button className={`py-1.5 px-3 text-sm hover:cursor-pointer ${selectedCandleChartRange === '30' ? 'bg-zinc-100 dark:bg-black rounded-lg' : 'hover:bg-zinc-400/20 dark:hover:bg-zinc-800 hover:rounded-lg'}`} 
            onClick={() => setSelectedCandleChartRange('30')}>
                <p className='font-light'>30d</p>
            </button>
            <button className={`py-1.5 px-3 text-sm hover:cursor-pointer ${selectedCandleChartRange === '15' ? 'bg-zinc-100 dark:bg-black rounded-lg' : 'hover:bg-zinc-400/20 dark:hover:bg-zinc-800 hover:rounded-lg'}`} 
            onClick={() => setSelectedCandleChartRange('15')}>
                <p className='font-light'>15d</p>
            </button>
            </div>
        ) : (
            <div className='max-w-fit mt-2 border border-zinc-300 bg-zinc-300 dark:border-zinc-700 dark:bg-zinc-700 px-1  rounded-lg'>
            <button className={`py-1.5 px-3 text-sm hover:cursor-pointer ${selectedAreaChartRange === '5yr' ? 'bg-zinc-100 dark:bg-black rounded-lg' : 'hover:bg-zinc-400/20 dark:hover:bg-zinc-800 hover:rounded-lg'}`} 
            onClick={() => setSelectedAreaChartRange('5yr')}>
                <p className='font-light'>5yr</p>
            </button>
            <button className={`py-1.5 px-3 text-sm hover:cursor-pointer ${selectedAreaChartRange === '1yr' ? 'bg-zinc-100 dark:bg-black rounded-lg' : 'hover:bg-zinc-400/20 dark:hover:bg-zinc-800 hover:rounded-lg'}`} 
            onClick={() => setSelectedAreaChartRange('1yr')}>
                <p className='font-light'>1yr</p>
            </button>
            {/* <button className={`py-1.5 px-3 text-sm hover:cursor-pointer ${selectedAreaChartRange === '15' ? 'bg-zinc-100 dark:bg-black rounded-lg' : 'hover:bg-zinc-400/20 dark:hover:bg-zinc-800 hover:rounded-lg'}`} 
            onClick={() => setSelectedAreaChartRange('1mo')}>
                <p className='font-light'>1mo</p>
            </button> */}
            </div>
        )}
        <Suspense fallback={<LoadingTickerCharts />}>
        {renderChart()}
        </Suspense>
    </section>
  )
}

export default ChartSelection