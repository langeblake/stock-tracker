import React from 'react'
import NinetyCandleStickChart from './90CandleStickChart'


const CandleStickChartSelection = ({ ticker, listDate}) => {
  return (
    <>
    <h1>Candlestick Chart Selection</h1>
    <NinetyCandleStickChart ticker={ticker} listDate={listDate}/>
    </>
  )
}

export default CandleStickChartSelection