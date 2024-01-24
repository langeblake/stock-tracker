import SectionTitle from "../Common/SectionTitle";

const MarketChange = () => {
    return ( 
        <>
            <section id="marketchange" className="py-16 md:py-20 lg:py-28 border-t border-slate-600">
                <div className="container">
                    <SectionTitle
                    title="Market Change"
                    paragraph="This section can contain two components: Gains & Losses; Tree/Heat Maps"
                    center
                    />
                </div>
            </section>
        </>
    );
}
 
export default MarketChange;