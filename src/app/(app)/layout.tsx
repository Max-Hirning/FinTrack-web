import React, {ReactNode} from "react";
import CloseIcon from "@/UI/icons/close";
import {Header} from "@/components/Header";
import {Navigation} from "@/components/Navigation";

interface IProps {
  children: ReactNode;
}

export default function AppLayout({children}: IProps) {
  return (
    <>
      <aside className="bg-white h-full w-[250px] max-lg:hidden border-[#E6EFF5] border-r absolute p-[25px] pt-[30px]">
        <h1 className='font-black text-text title text-[25px] text-center'>FinTrack.</h1>
        <Navigation/>
      </aside>
      <input 
        type="checkbox" 
        className="hidden"
        id="sidebar-toggle"
      />
      <aside 
        id="sidebar"
        className="bg-white fixed h-full z-30 w-[250px] lg:hidden border-[#E6EFF5] border-r p-[25px] pt-[30px]"
      >
        <label 
          htmlFor="sidebar-toggle"
          className="cursor-pointer absolute top-[30px] right-[25px]"
        >
          <CloseIcon width={25} height={25} color="#343C6A"/>
        </label>
        <h1 className='font-black text-text mt-[30px] title text-[25px] text-center'>FinTrack.</h1>
        <Navigation/>
      </aside>
      <div
        id="sidebarBackdrop"
        className="fixed inset-0 bg-black bg-opacity-25 z-20"
      ></div>
      <Header/>
      <main className="lg:left-[250px] relative max-lg:w-full lg:w-[calc(100%-250px)] p-[25px]">{children}</main>
    </>
  );
}
