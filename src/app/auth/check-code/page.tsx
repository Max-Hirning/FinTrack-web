import { Metadata } from "next";
import { Suspense } from "react";
import { CheckCodeWidget } from "widgets/index";

export const metadata: Metadata = {
  title: "Check OTP",
};

export default function Page() {
  return (
    <main className="flex items-center justify-center p-[20px] h-screen">
      <Suspense>
        <CheckCodeWidget/>
      </Suspense>
    </main>
  )
}
