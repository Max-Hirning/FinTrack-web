import React from "react";
import {Metadata} from "next";
import {getServerSession} from "next-auth";
import {authOptions} from "@/configs/authOptions";
import {IUserSession, SettingsForm} from "@/modules/profile";

export const metadata: Metadata = {
  description: "Check you profile settings"
};

export default async function Page() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <section className="card max-w-[1110px] p-[25px] w-fit relative">
        <SettingsForm session={session?.user as IUserSession}/>
      </section>
    </>
  );
}