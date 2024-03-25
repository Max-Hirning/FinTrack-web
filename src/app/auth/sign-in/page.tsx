import React from "react";
import Link from "next/link";
import {Metadata} from "next";
import {SignInForm} from "@/modules/authForm";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Log in to your account"
};

export default function Page() {
  return (
    <>
      <article className="max-w-[450px] w-full">
        <h1 className="text-text text-[28px] mb-[5px] font-semibold">Welcome back</h1>
        <p className="text-disabled text-[14px] font-normal">Welcome back! Please enter your details to log into your account.</p>
      </article>
      <SignInForm/>
      <article className="flex text-[14px]">
        <p>Don&lsquo;t have an account?</p>
        <Link 
          href="/auth/sign-up"
          aria-label="Sign up page"
          className="ml-[5px] text-main text-[14px]"
        >Sign up</Link>
      </article>
    </>
  );
}