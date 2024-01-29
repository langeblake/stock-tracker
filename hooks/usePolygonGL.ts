import { useState, useEffect } from 'react';
import { restClient } from '@polygon.io/client-js';
import { MarketData } from '@/types/stockDataTypes';

const usePolygonGL = (): { data: MarketData; loading: boolean; error: Error | null } => {
    const [data, setData] = useState<MarketData>({ gainers: { status: '', tickers: [] }, losers: { status: '', tickers: [] } });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const rest = restClient(process.env.NEXT_PUBLIC_POLYGON_API_KEY);

    useEffect(() => {
        setLoading(true);

        const fetchGainersLosers = async (type: 'gainers' | 'losers') => {
            try {
                const response = await rest.stocks.snapshotGainersLosers(type);
                setData(prevData => ({ ...prevData, [type]: response }));
            } catch (e) {
                console.error(`An error happened fetching ${type}:`, e);
                setError(e);
            }
        };

        fetchGainersLosers("gainers");
        fetchGainersLosers("losers");

        setLoading(false);
    }, []);

    console.log(data)
    return { data, loading, error };
};

export default usePolygonGL;
