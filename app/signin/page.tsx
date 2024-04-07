import Link from "next/link";

import { Metadata } from "next";
import SignIn from "@/components/SignIn";

export const metadata: Metadata = {
  title: "Sign In Page | Lumière",
  description: "This is Sign In Page for Lumière",
};

const SigninPage = () => {
  return <SignIn />;
};

export default SigninPage;
