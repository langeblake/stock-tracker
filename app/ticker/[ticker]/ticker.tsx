const Ticker = ({ data }) => {



  if (!data) {
    return <div></div>
  }

  // Now accessing properties directly from `ticker`
  const tickerOpen = data.ticker.day.o;
  const tickerClose = data.ticker.min.c.toFixed(2);
  const tickerPrevClose = data.ticker.prevDay.c;
  const tickerDayVolume = data.ticker.day.v.toLocaleString();
  const tickerPrevDayVolume = data.ticker.prevDay.v;
  const tickerPriceChange = data.ticker.todaysChange;
  const tickerVolumeChange = data.ticker.day.v - data.ticker.prevDay.v; // Adjusted to use .v for volume
  const volumeChangePerc = ((data.ticker.day.v - data.ticker.prevDay.v) / data.ticker.prevDay.v) * 100;
  const first50SMAValue = data.sma50.toFixed(2);
  const first200SMAValue = data.sma200.toFixed(2);

  const isPricePositiveChange = tickerPriceChange >= 0;
  const isVolumePositiveChange = tickerVolumeChange >= 0;
  // Adjust volume change calculation if necessary

  const formattedMarketCap = formatLargeNumber(data.marketCap);

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
          <p className={`p-4 ${isVolumePositiveChange ? 'text-green-500' : 'text-red-500'}`}>{data.ticker.todaysChangePerc.toFixed(2)}%</p>
          <p className='p-4' >{tickerDayVolume}</p>
        </div>
        <div className='flex justify-between'>
          <h1 className='p-4'>50-Day Moving Avg.</h1>
          <p className='p-4' >{first50SMAValue ? first50SMAValue : "NA"}</p>
        </div>
        <div className='flex justify-between'>
          <h1 className='p-4'>200-Day Moving Avg.</h1>
          <p className='p-4' >{first200SMAValue ? first200SMAValue : "NA"}</p>
        </div>
        <div className='flex justify-between'>
          <h1 className='p-4'>Market Cap</h1>
          <p className='p-4'>{formattedMarketCap}</p>
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