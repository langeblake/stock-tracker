import Breadcrumb from "@/components/Common/Breadcrumb";
import Ticker from "./ticker";
import { Metadata } from "next";

//Need to pass Ticker into title
export const metadata: Metadata = {
    title: "Ticker",
    description: "",
    // other metadata
  };
  

const TickerPage = ({ params }: {
    params: { ticker: string }
}) => {

    return (
        <>
        <Breadcrumb
            pageName={params.ticker}
            description="Information about the company..."
        />
        <div className="container mb-20">
            <Ticker ticker={params.ticker} />
        </div>
        </>
    );
}

export default TickerPage;
