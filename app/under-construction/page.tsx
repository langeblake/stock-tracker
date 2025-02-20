// pages/under-construction.js

import SectionTitle from "@/components/Common/SectionTitle";
import Image from "next/image";
import { IoIosStarOutline } from "react-icons/io";

const UnderConstruction = () => {
  const List = ({ text }) => (
    <p className="mb-5 flex items-center text-lg font-medium text-body-color">
      <span className="mr-4 flex h-[30px] w-[30px] items-center justify-center rounded-md bg-primary bg-opacity-10 text-primary">
        <IoIosStarOutline />
      </span>
      {text}
    </p>
  );

  return (
    <section id="under-construction" className="pt-32 xl:pl-20">
      <div className="container">
        <div className="border-b border-body-color/[.15] pb-16 dark:border-white/[.15] md:pb-20 lg:pb-28 flex justify-center xl:block">
          <div className="-mx-4 flex flex-wrap items-center">
            {/* Text Content */}
            <div className="w-full px-4 xl:w-1/2">
              <SectionTitle
                title="🚧 Under Construction 🚧"
                paragraph="We're diligently working to enhance our website. Stay tuned for an improved experience coming your way soon!"
                mb="44px"
                center
              />

              {/* <div
                className="mx-auto w-full max-w-[500px] pl-8 sm:pl-10"
                data-wow-delay=".15s"
              >
                <div className="mx-auto flex gap-x-3">
                  <div className="w-full">
                    <List text="Next.js" />
                    <List text="React" />
                    <List text="Tailwind CSS" />
                  </div>

                  <div className="w-full">
                    <List text="MongoDB" />
                    <List text="Prisma" />
                    <List text="Recharts" />
                  </div>
                </div>
              </div> */}
            </div>

            {/* Image */}
            <div className="hidden xl:block w-full px-4 pr-32 lg:w-1/2 shrink-0">
              <div
                className="wow fadeInUp relative mx-auto aspect-[25/24] max-w-[500px] lg:mr-0"
                data-wow-delay=".2s"
              >
                <Image
                  src="/images/about/About-image.png"
                  alt="about-image"
                  fill
                  priority
                  className="drop-shadow-three mx-auto max-w-full  dark:drop-shadow-none lg:mr-0"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UnderConstruction;
