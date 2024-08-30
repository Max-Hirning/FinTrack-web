import { Metadata } from "next";
import { SignInWidget } from "widgets/cards/sign-in"

export const metadata: Metadata = {
  title: "Sign in",
};

export default function Page() {
  return (
    <main className="flex items-center justify-center p-[20px] h-screen">
      <SignInWidget/>
    </main>
  )
}
