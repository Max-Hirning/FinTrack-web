import React from "react";
import {Metadata} from "next";
import {SecurityForm} from "@/modules/profile";

export const metadata: Metadata = {
  description: "Check you security settings"
};

export default function Page() {
  return (
    <>
      <section className="card max-w-[1110px] p-[25px] w-fit">
        <SecurityForm/>
      </section>
    </>
  );
}