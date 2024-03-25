import React, {ReactNode} from "react";
import CloseIcon from "@/UI/icons/close";
import {Header} from "@/components/Header";
import {getServerSession} from "next-auth";
import {appVersion} from "@/configs/appInfo";
import {IUserSession} from "@/modules/profile";
import {authOptions} from "@/configs/authOptions";
import {Navigation} from "@/components/Navigation";

interface IProps {
  children: ReactNode;
}

export default async function Layout({children}: IProps) {
  const session = await getServerSession(authOptions);

  return (
    <>
      <input 
        type="checkbox" 
        className="hidden"
        id="sidebarToggle"
      />
      <aside 
        id="sidebar"
        className="bg-white fixed h-full z-40 w-[250px] border-[#E6EFF5] border-r p-[25px] pt-[30px]"
      >
        <label 
          htmlFor="sidebarToggle"
          className="cursor-pointer absolute top-[30px] right-[25px]"
        >
          <CloseIcon width={25} height={25} color="#343C6A"/>
        </label>
        <h1 className='font-black text-text mt-[30px] title text-[25px] text-center'>FinTrack.</h1>
        <Navigation/>
        <p className="absolute bottom-[25px] left-1/2 transform -translate-x-2/3 -translate-y-0 text-secondary text-[14px]">V {appVersion}</p>
      </aside>
      <div
        id="sidebarBackdrop"
        className="fixed inset-0 bg-black bg-opacity-50 z-30"
      >
        <label 
          htmlFor="sidebarToggle"
          className="block w-full h-full"
        ></label>
      </div>
      <Header user={session?.user as IUserSession}/>
      <main className="relative w-full pt-[125px] p-[25px]">{children}</main>
    </>
  );
}
