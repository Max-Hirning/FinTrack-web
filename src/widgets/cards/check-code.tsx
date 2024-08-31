import Link from "next/link"
import { CheckCodeForm } from "features/forms/check-code"
import { Card, CardContent, CardFooter, CardDescription, CardHeader, CardTitle } from "shared/ui/card"

export function CheckCodeWidget() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Check OTP</CardTitle>
        <CardDescription>We&apos;ll text a verification code to john.jacob@gmail.com whenever you log in to you account. Please check your email and enter authentication 6-digit code below.</CardDescription>
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