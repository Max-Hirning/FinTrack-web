"use client";

import React from "react";
import Link from "next/link";
import {IRoute} from "@/types/routes";
import {routes} from "@/configs/routes";
import {usePathname} from "next/navigation";

export function Navigation() {
  const pathName = usePathname();

  return (
    <nav className="gap-[25px] flex flex-col mt-[55px] relative left-[-25px]">
      <div
        style={{transform: `translateY(${(-10 + (routes.findIndex(({href}: IRoute) => href === pathName) * 50))}px)`}} 
        className={`${(routes.findIndex(({href}: IRoute) => href === pathName) === -1) ? "hidden" : "flex"} rounded-tr-2xl rounded-br-2xl transition-all duration-500 ease-out delay-0 bg-main absolute h-[48px] w-[6px]`}
      ></div>
      {
        routes.map(({href, title}: IRoute, index: number) => {
          return (
            <Link 
              key={index} 
              href={href}
              className={`h-[25px] ${(pathName === href) ? "text-main" : "text-disabled"} font-medium text-[18px] ml-[30px]`}
            >
              <p>{title}</p>
            </Link>
          );
        })
      }
    </nav>
  );
}
