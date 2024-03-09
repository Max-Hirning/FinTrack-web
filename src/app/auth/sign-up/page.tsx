import React from "react";
import Link from "next/link";
import {SignUpForm} from "@/modules/authForm";

export default function SignUp() {
  return (
    <>
      <article className="max-w-[450px] w-full">
        <h1 className="text-text text-[28px] mb-[5px] font-semibold">Create an account</h1>
        <h5 className="text-disabled text-[14px] font-normal">Create an account to get an easy access to your dream shopping</h5>
      </article>
      <SignUpForm/>
      <article className="flex text-[14px]">
        <p>Already have an account?</p>
        <Link 
          href="/auth/sign-in"
          className="ml-[5px] text-main text-[14px]"
        >Sign in</Link>
      </article>
    </>
  );
}