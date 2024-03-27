import {Metadata} from "next";
import React, {ReactElement} from "react";
import {SecurityForm} from "@/modules/profile";

export const metadata: Metadata = {
  description: "Check you security settings"
};

export default function Page(): ReactElement {
  return (
    <>
      <section className="card max-w-[1110px] p-[25px] w-fit">
        <SecurityForm/>
      </section>
    </>
  );
}