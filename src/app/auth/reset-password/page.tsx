import Link from "next/link";
import {Metadata} from "next";
import {redirect} from "next/navigation";
import React, {ReactElement} from "react";
import {ResetPasswordForm} from "@/modules/authForm";

interface IProps {
  searchParams: {
    code: string;
  };
}

export const metadata: Metadata = {
  title: "Reset password",
  description: "Reset password for your account"
};

export default function Page({searchParams}: IProps): ReactElement {
  if(!searchParams.code || searchParams.code.length === 0) redirect("/auth/sign-in");

  return (
    <>
      <article className="max-w-[450px] w-full">
        <h1 className="text-text text-[28px] mb-[5px] font-semibold">Reset password</h1>
        <p className="text-disabled text-[14px] font-normal">Please create new password here</p>
      </article>
      <ResetPasswordForm code={searchParams.code}/>
      <Link 
        href="/auth/sign-in"
        aria-label="Sign in page"
        className="text-main text-[14px]"
      >Back to log in</Link>
    </>
  );
}