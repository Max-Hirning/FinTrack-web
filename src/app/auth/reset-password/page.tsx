import { Metadata } from "next";
import { ResetPasswordWidget } from "widgets/cards/reset-password";

export const metadata: Metadata = {
  title: "Reset password",
};

export default function Page() {
  return (
    <main className="flex items-center justify-center p-[20px] h-screen">
      <ResetPasswordWidget/>
    </main>
  )
}
