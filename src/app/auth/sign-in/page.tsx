import React from "react";
import Link from "next/link";
import {SignInForm} from "@/modules/authForm";

export default function SignIn() {
  return (
    <>
      <article className="max-w-[450px] w-full">
        <h1 className="text-text text-[28px] mb-[5px] font-semibold">Welcome back</h1>
        <h5 className="text-disabled text-[14px] font-normal">Welcome back! Please enter your details to log into your account.</h5>
      </article>
      <SignInForm/>
      <article className="flex text-[14px]">
        <p>Don&lsquo;t have an account?</p>
        <Link 
          href="/auth/sign-up"
          className="ml-[5px] text-main text-[14px]"
        >Sign up</Link>
      </article>
    </>
  );
}