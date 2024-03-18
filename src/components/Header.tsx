"use client";

import React from "react";
import Link from "next/link";
import {IRoute} from "@/types/routes";
import {AvatarUI} from "@/UI/AvatarUI";
import {routes} from "@/configs/routes";
import {useSession} from "next-auth/react";
import {usePathname} from "next/navigation";
import SecurityIcon from "@/UI/icons/security";
import {IUserSession} from "@/modules/profile";

interface IProps {
  user: IUserSession;
}

export function Header({user}: IProps) {
  const pathName = usePathname();
  const {data: session} = useSession();

  return (
    <header className="bg-white z-10 h-[100px] border-[#E6EFF5] border-b fixed w-full p-[25px] flex items-center justify-between">
      <h1 className="title text-text text-[28px] font-semibold">{routes.find(({href}: IRoute) => pathName === href)?.title || ((pathName === "/security") ? "Security" : "FinTrack")}</h1>
      <ul className="flex items-center gap-[20px] ml-[15px]">
        <li>
          <Link 
            href="/security"
            aria-label="Security settings"
            className="bg-[#F5F7FA] flex w-[50px] h-[50px] rounded-full items-center justify-center"
          >
            <SecurityIcon width={25} height={25} color="#343C6A"/>
          </Link>
        </li>
        <li>
          <label
            htmlFor="sidebarToggle"
            className="cursor-pointer"
          >
            <AvatarUI
              size={60}
              avatar={(session?.user as IUserSession)?.avatar || user.avatar}
            />
          </label>
        </li>
      </ul>
    </header>
  );
}
