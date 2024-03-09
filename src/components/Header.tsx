"use client";

import React from "react";
import Link from "next/link";
import {IRoute} from "@/types/routes";
import {routes} from "@/configs/routes";
import {usePathname} from "next/navigation";
import SecurityIcon from "@/UI/icons/security";

export function Header() {
  const pathName = usePathname();

  return (
    <header className="bg-white z-10 h-[100px] border-[#E6EFF5] border-b lg:left-[250px] relative max-lg:w-full lg:w-[calc(100%-250px)] p-[25px] flex items-center justify-between">
      <h1 className="title text-text text-[28px] font-semibold">{routes.find(({href}: IRoute) => pathName === href)?.title || ((pathName === "/security") ? "Security" : "FinTrack")}</h1>
      <ul className="flex items-center gap-[20px] ml-[15px]">
        <li>
          <Link 
            href="/security"
            className="bg-[#F5F7FA] flex w-[50px] h-[50px] rounded-full items-center justify-center"
          >
            <SecurityIcon width={25} height={25} color="#343C6A"/>
          </Link>
        </li>
        <li>
          <label
            htmlFor="sidebar-toggle"
            className="bg-[#F5F7FA] lg:hidden flex w-[60px] h-[60px] rounded-full cursor-pointer"
          ></label>
          <Link 
            href="/accounts"
            className="bg-[#F5F7FA] max-lg:hidden flex w-[60px] h-[60px] rounded-full items-center justify-center"
          ></Link>
        </li>
      </ul>
    </header>
  );
}
