import React, {ReactElement} from "react";
import CardIcon from "@/UI/icons/pages/card";
import {hexToRgba} from "@/controllers/colors";

interface IProps {
  _id: string;
  title: string;
  color: string;
  balance: number;
  currency: string;
  onClick?: () => void;
  ownerLastName: string;
  ownerFirstName: string;
}

export function BankCard({_id, onClick, color, title, currency, balance, ownerLastName, ownerFirstName}: IProps): ReactElement {
  return (
    <div 
      onClick={onClick}
      className="bg-white border cursor-pointer hover:bg-slate-100 active:bg-slate-200 border-[#DFEAF2] rounded-[25px] w-full min-w-[350px] h-[235px] p-[20px] flex flex-col justify-between relative"
    >
      <div className="flex flex-row items-center justify-between">
        <article>
          <p className="text-[12px] font-normal text-secondary">Balance</p>
          <p className="title text-[20px] font-semibold text-text">{currency} {balance.toFixed(2)}</p>
        </article>
        <div
          style={{backgroundColor: hexToRgba(color, 0.25)}}
          className="rounded-[10px] w-[40px] h-[40px] flex items-center justify-center"
        >
          <CardIcon width={26} height={26} color={color}/>
        </div>
      </div>
      <article className="flex items-center justify-between">
        <article className="w-[45%]">
          <p className="text-[12px] font-normal text-secondary">CARD HOLDER</p>
          <p className="title text-[20px] font-semibold text-text">{ownerFirstName} {ownerLastName}</p>
        </article>
        <article className="w-[45%]">
          <p className="text-[12px] font-normal text-secondary">TITLE</p>
          <p className="title text-[20px] font-semibold text-text">{title}</p>
        </article>
      </article>
      <hr className="absolute bottom-[60px] left-0 w-full"/>
      <p className="title text-[20px] font-semibold text-text">{_id.substring(0, 4)} **** **** {_id.substring(_id.length - 4)}</p>
    </div>
  );
}
