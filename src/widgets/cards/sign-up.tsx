import Link from "next/link"
import { SignUpForm } from "features/forms/sign-up"
import { Card, CardContent, CardFooter, CardDescription, CardHeader, CardTitle } from "shared/ui"

interface IProps {
  styles?: string;
}

export function SignUpWidget({styles}: IProps) {
  return (
    <Card className={`w-full max-w-sm ${styles || ""}`}>
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
