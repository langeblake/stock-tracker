'use client'

import { useEffect } from 'react';
import Breadcrumb from "@/components/Common/Breadcrumb";
import Ticker from "./ticker";
import TickerStore from '@/store/TickerStore';

const TickerPage = ({ params }) => {
    const { ticker } = params;
    const { data, fetchData } = TickerStore();
    const name = data?.name


    useEffect(() => {
        fetchData(ticker);
    }, [ticker, fetchData]);


    // Use useEffect to dynamically set document title and metadata
    useEffect(() => {
        document.title = `${ticker}`; // Set the document title dynamically
        // If you also need to set meta tags like description dynamically, you can do so here using document.querySelector and setting its content
        // Example: document.querySelector('meta[name="description"]').content = `Information about the company ${ticker}.`;
    }, [ticker]); // This effect runs when `ticker` prop changes


    return (
        <>
            <Breadcrumb pageName={ticker} description={name} />
            <div className="container mb-20 ">
                <Ticker ticker={ticker} />
            </div>
        </>
    );
};

export default TickerPage;
