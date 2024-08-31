import { Metadata } from "next";
import { ForgotPasswordWidget } from "widgets/cards/forgot-password";

export const metadata: Metadata = {
  title: "Forgot password",
};

export default function Page() {
  return (
    <main className="flex items-center justify-center p-[20px] h-screen">
      <ForgotPasswordWidget/>
    </main>
  )
}
