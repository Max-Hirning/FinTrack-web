"use client";

import Link from "next/link"
import { CheckCodeForm } from "features/index"
import { useGetUrlQueries } from "shared/hooks";
import { Card, CardContent, CardFooter, CardDescription, CardHeader, CardTitle } from "shared/ui"

interface IProps {
  styles?: string;
}

export function CheckCodeWidget({styles}: IProps) {
  const {email} = useGetUrlQueries();

  return (
    <Card className={`w-full max-w-sm ${styles || ""}`}>
      <CardHeader>
        <CardTitle className="text-2xl">Check OTP</CardTitle>
        <CardDescription className="text-wrap">We&apos;ll text a verification code to {email || "john.jacob@gmail.com"} whenever you log in to you account. Please check your email and enter authentication 6-digit code below.</CardDescription>
      </CardHeader>
      <CardContent>
        <CheckCodeForm/>
      </CardContent>
      <CardFooter>
        <Link 
          href="/auth/sign-in" 
          className="underline m-auto"
        >Back to Sign in</Link>
      </CardFooter>
    </Card>
  )
}
