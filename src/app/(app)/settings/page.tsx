import React from "react";
import {Metadata} from "next";
import {SettingsFormWrappers} from "@/modules/profile";

export const metadata: Metadata = {
  description: "Check you profile settings"
};

export default function Settings() {
  return (
    <>
      <section className="card max-w-[1110px] p-[25px] w-fit relative">
        <SettingsFormWrappers/>
      </section>
    </>
  );
}