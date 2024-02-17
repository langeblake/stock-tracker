// components/TickerPage.js
import { Oval } from 'react-loader-spinner';

const Ticker = ({ data, loading, error }) => {

  if (loading) {
    return <Oval color="#4fa94d" height={80} width={80} />;
  }

  if (error) {
    return <div>Error: {error.toString()}</div>;
  }

  if (!data) {
    return <div>No Data!</div>
  }

  // Assuming `data` is directly the object you showed from the API fetch
  const { ticker, marketCap, sma200, sma50 } = data;

  // Now accessing properties directly from `ticker`
  const tickerOpen = ticker.day.o;
  const tickerClose = ticker.min.c.toFixed(2);
  const tickerPrevClose = ticker.prevDay.c;
  const tickerDayVolume = ticker.day.v.toLocaleString();
  const tickerPrevDayVolume = ticker.prevDay.v;
  const tickerPriceChange = ticker.todaysChange;
  const tickerVolumeChange = ticker.day.v - ticker.prevDay.v; // Adjusted to use .v for volume
  const volumeChangePerc = ((ticker.day.v - ticker.prevDay.v) / ticker.prevDay.v) * 100;
  const first50SMAValue = sma50.toFixed(2);
  const first200SMAValue = sma200.toFixed(2);

  const isPricePositiveChange = tickerPriceChange >= 0;
  const isVolumePositiveChange = tickerVolumeChange >= 0;
  // Adjust volume change calculation if necessary

  const formattedMarketCap = formatLargeNumber(marketCap);

  // Your rendering logic follows...

  function formatLargeNumber(number: number) {
    if (number >= 1e9) {
      return (number / 1e9).toFixed(2) + 'B'; // Divide by a billion and add 'B'
    } else if (number >= 1e6) {
      return (number / 1e6).toFixed(2) + 'M'; 
    } else if (number >= 1e3) {
      return (number / 1e3).toFixed(2) + 'K'
    } else if (number > 0) {
      return number;
    } else {
      return 'NA'
    }
  }
  

  return (
    <div className='grid sm:grid-cols-2 xl:grid-cols-4 gap-6 mt-10 lg:mt-0'>

      {/* Card 1 */}
      <div className='flex flex-wrap flex-col border dark:border-zinc-700 dark:bg-zinc-900 rounded-lg'>
        <div className='flex'>
          <h1 className='p-4 w-2/3'>Price</h1>
          <p className={`p-4 ${isPricePositiveChange ? 'text-green-500' : 'text-red-500'}`}>{isPricePositiveChange ? '+' : ''}${tickerPriceChange.toFixed(2)}</p>
          <p className={`p-4`}>${tickerClose}</p>
        </div>
        <div className='flex justify-between'>
          <h1 className='p-4'>Open</h1>
          <p className={`p-4 ${isPricePositiveChange ? 'text-green-500' : 'text-red-500'}`}>${tickerOpen}</p>
        </div>
        <div className='flex justify-between'>
          <h1 className='p-4'>High</h1>
          <p className={`p-4`}>${data.ticker.day.h}</p>
        </div>
        <div className='flex justify-between'>
          <h1 className='p-4'>Low</h1>
          <p className='p-4'>{data.ticker.day.l}</p>
        </div>
        <div className='flex justify-between'>
        <h1 className='p-4'>Previous Close</h1>
          <p className={`p-4`}>${tickerPrevClose}</p>
        </div>
      </div>

      {/* Card 2 */}
      <div className='flex flex-col border dark:border-zinc-700 dark:bg-zinc-900 rounded-lg'>
        <div className='flex justify-between'>
          <h1 className='p-4 w-2/3'>Volume</h1>
          <p className={`p-4 ${isVolumePositiveChange ? 'text-green-500' : 'text-red-500'}`}>{volumeChangePerc.toFixed(2)}%</p>
          <p className='p-4' >{tickerDayVolume}</p>
        </div>
        <div className='flex justify-between'>
          <h1 className='p-4'>50-Day Moving Avg.</h1>
          <p className='p-4' >{first50SMAValue}</p>
        </div>
        <div className='flex justify-between'>
          <h1 className='p-4'>200-Day Moving Avg.</h1>
          <p className='p-4' >{first200SMAValue}</p>
        </div>
        <div className='flex justify-between'>
          <h1 className='p-4'>Market Cap</h1>
          <p className='p-4' >{formattedMarketCap}</p>
        </div>

        {/* Display more ticker information */}
      </div>

      {/* Card 3 */}
      <div className='flex justify-between border dark:border-zinc-700 dark:bg-zinc-900 rounded-lg'>
        <h1 className='p-4'>Ticker Data</h1>
        {/* <p className='p-4'>${tickerClose}</p> */}
        {/* Display more ticker information */}
      </div>

      {/* Card 4 */}
      <div className='flex justify-between border dark:border-zinc-700 dark:bg-zinc-900 rounded-lg'>
        <h1 className='p-4'>Ticker Data</h1>
        {/* <p className='p-4'>${tickerClose}</p> */}
        {/* Display more ticker information */}
      </div>

    </div>
  );
};

export default Ticker;