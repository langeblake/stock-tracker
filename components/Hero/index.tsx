// import Link from "next/link";
import SectionTitle from "../Common/SectionTitle";


const Hero = () => {
  return (
    <>
      <section
        id="home"
        className="dark:bg-gray-dark relative z-10 overflow-hidden bg-white pb-16 pt-[120px] md:pb-[120px] md:pt-[150px] xl:pb-[160px] xl:pt-[180px] 2xl:pb-[200px] 2xl:pt-[210px]"
      >
        <div className="container">
        <SectionTitle
            title="Market Overview"
            paragraph="This section will include cards which show an overview of markets and exchanges."
            center
            mb="0px"
          />
        </div>
      </section>
    </>
  );
};

export default Hero;
