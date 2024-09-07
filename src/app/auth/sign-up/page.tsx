import { Metadata } from "next";
import { SignUpWidget } from "widgets/index";

export const metadata: Metadata = {
  title: "Sign up",
};

export default function Page() {
  return (
    <main className="flex items-center justify-center p-[20px] h-screen">
      <SignUpWidget/>
    </main>
  )
}
