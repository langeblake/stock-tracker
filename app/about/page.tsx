import AboutSectionOne from "@/components/About/AboutSectionOne";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Page | Lumière",
  description: "This is About Page for Lumière",
};

const AboutPage = () => {
  return (
    <>
      <AboutSectionOne />
    </>
  );
};

export default AboutPage;
