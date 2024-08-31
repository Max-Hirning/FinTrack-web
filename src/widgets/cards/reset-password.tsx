import Link from "next/link"
import { ResetPasswordForm } from "features/forms/reset-password"
import { Card, CardContent, CardFooter, CardDescription, CardHeader, CardTitle } from "shared/ui/card"

export function ResetPasswordWidget() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Reset password</CardTitle>
        <CardDescription>Password must contain at least 1 upper case, numeric, and special character.</CardDescription>
      </CardHeader>
      <CardContent>
        <ResetPasswordForm/>
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
