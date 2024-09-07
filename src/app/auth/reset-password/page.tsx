import { Metadata } from "next";
import { ResetPasswordWidget } from "widgets/index";

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
