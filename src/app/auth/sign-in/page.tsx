import { Metadata } from "next";
import { SignInWidget } from "widgets/index"

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
