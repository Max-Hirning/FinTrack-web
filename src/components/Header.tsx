"use client";

import React from "react";
import Link from "next/link";
import {IRoute} from "@/types/routes";
import {routes} from "@/configs/routes";
import {usePathname} from "next/navigation";

export function Header() {
  const pathName = usePathname();

  return (
    <header className="bg-white h-[100px] border-[#E6EFF5] border-b left-[250px] relative w-[calc(100%-250px)] p-[25px] flex items-center justify-between">
      <h1 className="title text-text text-[28px] font-semibold">{routes.find(({href}: IRoute) => pathName === href)?.title || "FinTrack"}</h1>
      <ul className="flex items-center gap-[20px]">
        <li>
          <Link 
            href="/security"
            className="bg-[#F5F7FA] flex w-[50px] h-[50px] rounded-full"
          ></Link>
        </li>
        <li>
          <button className="bg-[#F5F7FA] w-[60px] h-[60px] rounded-full"></button>
        </li>
      </ul>
    </header>
  );
}
