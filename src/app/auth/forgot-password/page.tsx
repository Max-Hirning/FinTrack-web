import Link from "next/link";
import {Metadata} from "next";
import React, {ReactElement} from "react";
import {ForgotPasswordForm} from "@/modules/authForm";

export const metadata: Metadata = {
  title: "Forgot password",
  description: "Make sending email request for password update"
};

export default function Page(): ReactElement {
  return (
    <>
      <article className="max-w-[450px] w-full">
        <h1 className="text-text text-[28px] mb-[5px] font-semibold">Forgot password?</h1>
        <p className="text-disabled text-[14px] font-normal">Don&lsquo;t worry, we&lsquo;ll send you reset instructions.</p>
      </article>
      <ForgotPasswordForm/>
      <Link 
        href="/auth/sign-in"
        aria-label="Sign in page"
        className="text-main text-[14px]"
      >Back to log in</Link>
    </>
  );
}