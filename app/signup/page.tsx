import Signup from "@/components/Signup";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up Page | Lumière",
  description: "This is Sign Up Page for Lumière",
};

const SignupPage = () => {
  return <Signup />;
};

export default SignupPage;
