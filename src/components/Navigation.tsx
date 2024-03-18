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
        style={{transform: `translateY(${(-12.5 + (routes.findIndex(({href}: IRoute) => href === pathName) * 50))}px)`}} 
        className={`${(routes.findIndex(({href}: IRoute) => href === pathName) === -1) ? "hidden" : "flex"} rounded-tr-2xl rounded-br-2xl transition-all duration-500 ease-out delay-0 bg-main absolute h-[50px] w-[6px]`}
      ></div>
      {
        routes.map(({href, title, icon}: IRoute, index: number) => {
          return (
            <Link 
              key={index} 
              href={href}
              aria-label={`${title} page`}
              className={`h-[25px] ${(pathName === href) ? "text-main" : "text-disabled"} flex font-medium text-[18px] ml-[30px]`}
            >
              {icon({width: 25, height: 25, color: (pathName === href) ? "#2D60FF" : "#B1B1B1"})}
              <p className="ml-[15px]">{title}</p>
            </Link>
          );
        })
      }
    </nav>
  );
}
