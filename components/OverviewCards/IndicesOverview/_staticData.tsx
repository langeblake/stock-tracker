import indicesOverviewData  from "./indicesOverviewData.json";

function formatNumber(value) {
  if (value >= 0) {
    return `+$${value.toFixed(2)}`;
  } else {
    return `${value.toFixed(2)}`;
  }
}

const IndicesOverview = () => {
  return (
    <section className="flex flex-col w-full shadow-md rounded-lg p-4 border dark:border-zinc-700 dark:bg-zinc-900">
      <div>
        {indicesOverviewData.results.slice(0, 1).map((indexData, idx) => (
          <div key={idx}>
            <h3 className="font-bold text-lg mb-10">NASDAQ-100</h3>
            <div className="flex flex-col gap-10">
              <div className="flex justify-between gap-4">
                <h1 className="w-2/3">Price</h1>
                <div
                  className={`font-light ${indexData.c > indexData.o ? "text-green-500" : "text-red-500"}`}
                >
                  {formatNumber(indexData.c - indexData.o)}
                </div>
                <div>
                  $
                  {indexData.c?.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }) ?? "N/A"}
                </div>
              </div>
              <div className="flex justify-between">
                <h1>Open</h1>
                <div>
                  $
                  {indexData.o?.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }) ?? "N/A"}
                </div>
              </div>
              <div className="flex justify-between">
                <h1>High</h1>
                <div>
                  $
                  {indexData.h?.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }) ?? "N/A"}
                </div>
              </div>
              <div className="flex justify-between">
                <h1>Low</h1>
                <div>
                  $
                  {indexData.l?.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }) ?? "N/A"}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default IndicesOverview;