export const OverviewCard = ({ data }) => {
    return ( 
        <div className="border flex w-full flex-col gap-4 rounded-lg p-4 justify-around dark:border-zinc-800 dark:bg-zinc-900 bg-white dark:text-white">
            {data.map((item) => (
                <div key={item.id} className="flex py-4 px-2 flex-row  justify-between dark:hover:bg-zinc-800 hover:bg-zinc-100 hover:cursor-pointer">
                    <h1 className="mr-4 font-medium ">{item.market} {item.id}</h1>
                    <div className="flex gap-4">
                        <h2 className="text-green-600 font-light">{item.price}</h2>
                        <h2 className="text-red-600 font-light">{item.change}%</h2>
                    </div>
                </div>
            ))}
        </div>
    );
};
