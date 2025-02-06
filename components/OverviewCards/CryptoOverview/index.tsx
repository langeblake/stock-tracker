import cryptoOverviewData from './cryptoOverviewData.json';

const currencyNames = {
  "X:BTCUSD": "Bitcoin",
  "X:ETHUSD": "Ethereum",
  "X:ADAUSD": "Cardano",
  "X:SOLUSD": "Solana",
};

const CryptoOverview = () => {
  const transformedData = Object.keys(cryptoOverviewData).reduce((acc, ticker) => {
    const currencyData = cryptoOverviewData[ticker];
    const { currentDay, previousDay, change } = currencyData;
    acc[ticker] = { currentDay, previousDay, change };
    return acc;
  }, {});

  return (
    <section className="container w-full shadow-md rounded-lg p-4 border dark:border-zinc-700 dark:bg-zinc-900">
      <div>
        <h3 className="font-bold text-lg mb-10">Cryptocurrency</h3>
        <div className="flex flex-col gap-10">
          {Object.keys(currencyNames).map((ticker, idx) => {
            const currencyInfo = transformedData[ticker];
            return (
              <div key={idx} className="flex justify-between gap-4">
                <h1 className="w-3/6">{currencyNames[ticker]}</h1>
                {currencyInfo ? (
                  <>
                    <div
                      className={`w-1/6 text-left font-light ${currencyInfo.change >= 0 ? "text-green-500" : "text-red-500"}`}
                    >
                      {currencyInfo.change.toFixed(2)}%
                    </div>
                    <div className="w-2/6 text-right">
                      $
                      {currencyInfo.currentDay.c?.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }) ?? "N/A"}
                    </div>
                  </>
                ) : (
                  <div className="w-3/6">Data not available</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CryptoOverview;