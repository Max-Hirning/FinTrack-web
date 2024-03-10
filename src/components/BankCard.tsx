import React from "react";
import {ICardsResponse} from "@/modules/cards";

interface IProps extends ICardsResponse {}

export function BankCard({id, title, currency, balance, owner}: IProps) {
  return (
    <div className="bg-white border border-[#DFEAF2] rounded-[25px] w-full min-w-[350px] h-[235px] p-[20px] flex flex-col justify-between relative">
      <article>
        <p className="text-[12px] font-normal text-secondary">Balance</p>
        <p className="text-[20px] font-semibold text-text">{currency} {balance}</p>
      </article>
      <article className="flex items-center justify-between">
        <article>
          <p className="text-[12px] font-normal text-secondary">CARD HOLDER</p>
          <p className="text-[20px] font-semibold text-text">{owner.firstName} {owner.lastName}</p>
        </article>
        <article>
          <p className="text-[12px] font-normal text-secondary">TITLE</p>
          <p className="text-[20px] font-semibold text-text">{title}</p>
        </article>
      </article>
      <hr className="absolute bottom-[60px] left-0 w-full"/>
      <p className="text-[20px] font-semibold text-text">{id.substring(0, 4)} **** **** {id.substring(id.length - 4)}</p>
    </div>
  );
}
