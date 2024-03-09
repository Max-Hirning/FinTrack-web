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
      <input 
        type="checkbox" 
        className="hidden"
        id="sidebar-toggle"
      />
      <aside 
        id="sidebar"
        className="bg-white fixed h-full z-30 w-[250px] border-[#E6EFF5] border-r p-[25px] pt-[30px]"
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
      >
        <label 
          htmlFor="sidebar-toggle"
          className="block w-full h-full"
        ></label>
      </div>
      <Header/>
      <main className="relative w-full pt-[125px] p-[25px]">{children}</main>
    </>
  );
}
