import Link from "next/link"
import { SignInForm } from "features/index"
import { Card, CardContent, CardFooter, CardDescription, CardHeader, CardTitle } from "shared/ui"

interface IProps {
  styles?: string;
}

export function SignInWidget({styles}: IProps) {
  return (
    <Card className={`w-full max-w-sm ${styles || ""}`}>
      <CardHeader>
        <CardTitle className="text-2xl">Sign In</CardTitle>
        <CardDescription className="text-wrap">Enter your email below to login to your account.</CardDescription>
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
