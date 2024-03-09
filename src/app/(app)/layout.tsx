import React, {ReactNode} from "react";
import {Header} from "@/components/Header";
import {Navigation} from "@/components/Navigation";

interface IProps {
  children: ReactNode;
}

export default function AppLayout({children}: IProps) {
  return (
    <>
      <aside className="bg-white h-full w-[250px] border-[#E6EFF5] border-r absolute p-[25px] pt-[30px]">
        <h1 className='font-black text-text title text-[25px] text-center'>FinTrack.</h1>
        <Navigation/>
      </aside>
      <Header/>
      <main className="left-[250px] relative w-[calc(100%-250px)] p-[25px]">{children}</main>
    </>
  );
}
