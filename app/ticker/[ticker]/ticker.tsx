import { format } from "path";

const Ticker = ({ data }) => {

  if (!data) {
    return <div></div>
  }

  // Now accessing properties directly from `ticker`
  const tickerOpen = data.ticker.day.o.toFixed(2);
  const tickerClose = data.ticker.min.c.toFixed(2);
  const tickerPrevClose = data.ticker.prevDay.c;
  const tickerDayVolume = data.ticker.day.v.toLocaleString();
  const tickerPrevDayVolume = data.ticker.prevDay.v;
  const tickerPriceChange = data.ticker.todaysChange;
  // const tickerVolumeChange = data.ticker.day.v - data.ticker.prevDay.v; // Adjusted to use .v for volume
  // const volumeChangePerc = ((data.ticker.day.v - data.ticker.prevDay.v) / data.ticker.prevDay.v) * 100;
  const first50SMAValue = data.sma50.toFixed(2);
  const first200SMAValue = data.sma200.toFixed(2);
  const fiscalPeriod = data.fiscalPeriod;
  const fiscalYear = data.fiscalYear;
  const netIncomeLoss = data.netIncomeLoss;
  const grossProfit = data.grossProfit;
  const earningsPerShare = data.earningsPerShare;
  const revenues = data.revenues;
  const priceToEarnings = (tickerOpen) / (earningsPerShare)

  // Adjustments & Class control
  const isPricePositiveChange = tickerPriceChange >= 0;
  const isVolumePositiveChange = data.ticker.todaysChangePerc >= 0;

  const formattedMarketCap = formatLargeNumber(data.marketCap);
  const formattedVolume = formatLargeNumber(data.ticker.day.v);
  const formattedNetIncomeLoss = formatLargeNumber(netIncomeLoss);
  const formattedGrossProfit = formatLargeNumber(grossProfit);
  const formattedRevenues = formatLargeNumber(revenues);


  // Your rendering logic follows...

  function formatLargeNumber(number: number) {
    if (number >= 1e12) {
      return (number / 1e12).toFixed(2) + 'T'; 
    } else if (number >= 1e9) {
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

    <div className='grid md:grid-cols-2 xl:grid-cols-4 gap-6 mt-10 lg:mt-0'>

      {/* Card 1 */}
      <div className='flex flex-wrap flex-col border bg-white dark:border-zinc-700 dark:bg-zinc-900 rounded-lg'>
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
          <p className={`p-4`}>${data.ticker.day.h.toFixed(2)}</p>
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
      <div className='flex flex-col border bg-white dark:border-zinc-700 dark:bg-zinc-900 rounded-lg'>
        <div className='flex justify-between'>
          <h1 className='p-4 w-2/3'>Volume</h1>
          <p className={`p-4 ${isVolumePositiveChange ? 'text-green-500' : 'text-red-500'}`}>{data.ticker.todaysChangePerc.toFixed(2)}%</p>
          <p className='p-4' >{formattedVolume}</p>
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
      <div className='flex flex-col border bg-white dark:border-zinc-700 dark:bg-zinc-900 rounded-lg'>
        <div className='flex justify-between'>
          <h1 className='p-4'>Net Income/Loss ({fiscalPeriod})</h1>
          <p className={`p-4`}>${formattedNetIncomeLoss}</p>
        </div>
        <div className='flex justify-between'>
          <h1 className='p-4'>Gross Profit</h1>
          <p className={`p-4`}>${formattedGrossProfit}</p>
        </div>
        <div className='flex justify-between'>
          <h1 className='p-4'>Eernings Per Share</h1>
          <p className='p-4'>${earningsPerShare.toFixed(2)}</p>
        </div>
        <div className='flex justify-between'>
        <h1 className='p-4'>Revenues</h1>
          <p className={`p-4`}>${formattedRevenues}</p>
        </div>
        <div className='flex justify-between'>
        <h1 className='p-4'>Price-To-Earnings</h1>
          <p className={`p-4`}>${priceToEarnings.toFixed(2)}</p>
        </div>
      </div>

      {/* Card 4 */}
      <div className='flex justify-between border bg-white dark:border-zinc-700 dark:bg-zinc-900 rounded-lg'>
        <h1 className='p-4'>Ticker Data</h1>
        {/* <p className='p-4'>${tickerClose}</p> */}
        {/* Display more ticker information */}
      </div>

    </div>
  );
};

export default Ticker;