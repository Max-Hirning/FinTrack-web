import React from "react";
import Link from "next/link";
import {Metadata} from "next";
import {SignUpForm} from "@/modules/authForm";

export const metadata: Metadata = {
  title: "Sign up",
  description: "Create your account in FinTrack"
};

export default function SignUp() {
  return (
    <>
      <article className="max-w-[450px] w-full">
        <h1 className="text-text text-[28px] mb-[5px] font-semibold">Create an account</h1>
        <p className="text-disabled text-[14px] font-normal">Create an account to get an easy access to your dream shopping</p>
      </article>
      <SignUpForm/>
      <article className="flex text-[14px]">
        <p>Already have an account?</p>
        <Link 
          href="/auth/sign-in"
          aria-label="Sign in page"
          className="ml-[5px] text-main text-[14px]"
        >Sign in</Link>
      </article>
    </>
  );
}