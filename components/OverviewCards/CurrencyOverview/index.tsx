import currencyOverviewData from './currencyOverviewData.json';

const currencyNames = {
  "C:USDEUR": "Euro",
  "C:USDKRW": "Korean Won",
  "C:USDGBP": "British Pound",
  "C:USDJPY": "Japanese Yen",
};

const CurrencyOverview = () => {
  const transformedData = Object.keys(currencyOverviewData).reduce((acc, ticker) => {
    const currencyData = currencyOverviewData[ticker];
    const { currentDay, previousDay, change } = currencyData;
    acc[ticker] = { currentDay, previousDay, change };
    return acc;
  }, {});

  return (
    <section className="container w-full shadow-md rounded-lg p-4 border dark:border-zinc-700 dark:bg-zinc-900">
      <div>
        <h3 className="font-bold text-lg mb-10">US Dollar Exchange</h3>
        <div className="flex flex-col gap-10">
          {Object.keys(currencyNames).map((ticker, idx) => {
            const currencyInfo = transformedData[ticker];
            return (
              <div key={idx} className="flex">
                <h1 className="w-2/4">{currencyNames[ticker]}</h1>
                {currencyInfo ? (
                  <>
                    <div
                      className={`w-1/4 font-light text-left ${currencyInfo.change >= 0 ? "text-green-500" : "text-red-500"}`}
                    >
                      {currencyInfo.change.toFixed(2)}%
                    </div>
                    <div className="w-1/4 text-right">
                      $
                      {currencyInfo.currentDay.c?.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }) ?? "N/A"}
                    </div>
                  </>
                ) : (
                  <div className="w-3/4">Data not available</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CurrencyOverview;
