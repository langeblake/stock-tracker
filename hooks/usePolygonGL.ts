import { useState, useEffect } from 'react';
import { restClient } from '@polygon.io/client-js';
import { MarketData } from '@/types/stockDataTypes';


const usePolygonGL = (): { data: MarketData; isLoading: boolean; error: Error | null } => {
    const [data, setData] = useState<MarketData>({ gainers: { status: '', tickers: [] }, losers: { status: '', tickers: [] } });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const rest = restClient(process.env.NEXT_PUBLIC_POLYGON_API_KEY);

    useEffect(() => {
        setIsLoading(true);

        // Consider moving fetch logic to Utility Fetch Function
        const fetchGainersLosers = async (type: 'gainers' | 'losers') => {
            try {
                const response = await rest.stocks.snapshotGainersLosers(type);
                setData(prevData => ({ ...prevData, [type]: response }));
                console.log(data)
            } catch (e) {
                console.error(`An error happened fetching ${type}:`, e);
                setError(e);
            }
        };

        fetchGainersLosers("gainers");
        fetchGainersLosers("losers");

        setIsLoading(false);

    }, []);

    useEffect(() => {
        setIsLoading(true)
        if (data.gainers.tickers.length > 0 || data.losers.tickers.length > 0) {
            setIsLoading(false)
        }

    }, [data]);
    return { data, isLoading, error };
};

export default usePolygonGL;
