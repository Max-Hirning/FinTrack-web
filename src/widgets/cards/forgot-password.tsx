import Link from "next/link"
import { SendCodeForm } from "features/forms/send-code"
import { Card, CardContent, CardFooter, CardDescription, CardHeader, CardTitle } from "shared/ui/card"

export function ForgotPasswordWidget() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Forgot Password?</CardTitle>
        <CardDescription>Enter your registered email address to reset the password</CardDescription>
      </CardHeader>
      <CardContent>
        <SendCodeForm/>
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