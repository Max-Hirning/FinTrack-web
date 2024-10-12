import Link from "next/link"
import { ResetPasswordForm } from "features/index"
import { Card, CardContent, CardFooter, CardDescription, CardHeader, CardTitle } from "shared/ui"

interface IProps {
  styles?: string;
}

export function ResetPasswordWidget({styles}: IProps) {
  return (
    <Card className={`w-full max-w-sm ${styles || ""}`}>
      <CardHeader>
        <CardTitle className="text-2xl">Reset password</CardTitle>
        <CardDescription className="text-wrap">Password must contain at least 1 upper case, numeric, and special character.</CardDescription>
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
