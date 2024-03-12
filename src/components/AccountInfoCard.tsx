import React, {ReactNode} from "react";
import {hexToRgba} from "@/controllers/colors";

interface IProps {
  title: string;
  currency: string;
  iconColor: string;
  children: ReactNode;
  ammount: string|number;
}

export function AccountInfoCard({title, iconColor, ammount, currency, children}: IProps) {
  return (
    <div className="bg-white border border-[#DFEAF2] rounded-[25px] h-[120px] flex gap-[10px] p-[20px] items-center">
      <div
        style={{backgroundColor: hexToRgba(iconColor, 0.25)}}
        className="rounded-full w-[70px] min-w-[70px] h-[70px] items-center justify-center flex"
      >
        {children}
      </div>
      <article className="max-w-[200px]">
        <p className="text-[16px] font-normal text-secondary">{title}</p>
        <p className="title text-[25px] font-semibold text-text">{currency} {Math.abs(+ammount)}</p>
      </article>
    </div>
  );
}