import Signup from "@/components/Signup";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Sign Up Page | Free Next.js Template for Startup and SaaS",
  description: "This is Sign Up Page for Startup Nextjs Template",
  // other metadata
};

const SignupPage = () => {
  return (
    <Signup />
  );
};

export default SignupPage;
