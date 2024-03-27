import {Metadata} from "next";
import React, {ReactElement} from "react";
import {getServerSession} from "next-auth";
import {authOptions} from "@/configs/authOptions";
import {currencyAPI} from "@/controllers/api/currency";
import {ContactUsForm, IUserSession, SettingsForm} from "@/modules/profile";

export const metadata: Metadata = {
  description: "Check you profile settings"
};

export default async function Page(): Promise<ReactElement> {
  const currencies = await currencyAPI.getAll();
  const session = await getServerSession(authOptions);

  return (
    <>
      <section className="card max-w-[720px] p-[25px] w-full relative">
        <SettingsForm 
          currencies={currencies.data || []}
          session={session?.user as IUserSession}
        />
      </section>
      <section className="card max-w-[720px] mt-[25px] p-[25px] w-full relative">
        <h3 className="text-[24px] text-text font-semibold mb-[20px]">Contact us</h3>
        <ContactUsForm/>
      </section>
    </>
  );
}