import Link from "next/link"
import { SignUpForm } from "features/forms/sign-up"
import { Card, CardContent, CardFooter, CardDescription, CardHeader, CardTitle } from "shared/ui"

export function SignUpWidget() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Sign Up</CardTitle>
        <CardDescription>Enter your email below to create your account.</CardDescription>
      </CardHeader>
      <CardContent>
        <SignUpForm/>
      </CardContent>
      <CardFooter>
        Already have an account?
        <Link 
          href="/auth/sign-in" 
          className="underline ml-[5px]"
        >Sign in</Link>
      </CardFooter>
    </Card>
  )
}
