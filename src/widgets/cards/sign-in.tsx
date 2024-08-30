import Link from "next/link"
import { SignInForm } from "features/forms/sign-in"
import { Card, CardContent, CardFooter, CardDescription, CardHeader, CardTitle } from "shared/ui/card"

export function SignInWidget() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Sign In</CardTitle>
        <CardDescription>Enter your email below to login to your account.</CardDescription>
      </CardHeader>
      <CardContent>
        <SignInForm/>
      </CardContent>
      <CardFooter>
        Don&apos;t have an account?
        <Link 
          href="/auth/sign-up" 
          className="underline ml-[5px]"
        >Sign up</Link>
      </CardFooter>
    </Card>
  )
}
