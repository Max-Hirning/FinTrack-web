import React from "react";
import {SettingsFormWrappers} from "@/modules/profile";

export default function Settings() {
  return (
    <>
      <section className="card max-w-[1110px] p-[25px] w-fit">
        <SettingsFormWrappers/>
      </section>
    </>
  );
}