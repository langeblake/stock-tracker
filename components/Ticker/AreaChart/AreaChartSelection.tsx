import React from 'react'
import StockAreaChart from './StockAreaChart'



const AreaChartSelection = ({ ticker, listDate}) => {
  return (
    <>
    <h1>Area Chart Selection</h1>
    <StockAreaChart ticker={ticker} listDate={listDate}/>
    </>
  )
}

export default AreaChartSelection