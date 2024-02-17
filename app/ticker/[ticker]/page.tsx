'use client'

import { useEffect, useState } from 'react';
import Breadcrumb from "@/components/Common/Breadcrumb";
import Ticker from "./ticker";


type TickerData = {
    ticker: {
      ticker: string;
      todaysChangePerc: number;
      todaysChange: number;
      updated: number;
      day: {
        o: number;
        h: number;
        l: number;
        c: number;
        v: number;
        vw: number;
      };
      min: {
        av: number;
        t: number;
        n: number;
        o: number;
        h: number;
        l: number;
        c: number;
        v: number;
        vw: number;
      };
      prevDay: {
        o: number;
        h: number;
        l: number;
        c: number;
        v: number;
        vw: number;
      };
    };
    name: string;
    market_cap: number;
    $200sma_values: number;
    $50sma_values: number;
  };

const TickerPage = ({ params }) => {
    const { ticker } = params;
    const [data, setData] = useState<TickerData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const API_KEY = process.env.NEXT_PUBLIC_BABYQUANT_API_KEY


    useEffect(() => {
        async function fetchTickerData() {
          setLoading(true);
          try {
            const response = await fetch(`/api/ticker?ticker=${ticker}`, {
                headers: {
                  'X-API-Key': API_KEY!,
                },
              });
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            // Use type assertion to expect an array of TickerData objects
            const jsonData: TickerData = await response.json();
            setData(jsonData);
          } catch (error) {
            setError(error.message);
          }
          setLoading(false);
        }
    
        fetchTickerData();
      }, []);


    // Use useEffect to dynamically set document title and metadata
    useEffect(() => {
        document.title = `${ticker}`; // Set the document title dynamically
        // If you also need to set meta tags like description dynamically, you can do so here using document.querySelector and setting its content
        // Example: document.querySelector('meta[name="description"]').content = `Information about the company ${ticker}.`;
    }, [ticker]); // This effect runs when `ticker` prop changes

    const description = loading ? "Loading..." : data ? data.name : "No data available";

    return (
        <>
            {/* <Breadcrumb pageName={ticker} description={name} /> */}
            <Breadcrumb pageName={ticker} description={description}/>
            <div className="container mb-20 ">
                <Ticker data={data} loading={loading} error={error}/>
            </div>
        </>
    );
};

export default TickerPage;