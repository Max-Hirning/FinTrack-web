import React, {ReactElement} from "react";
import {ICardResponse} from "@/modules/cards";

interface IProps extends ICardResponse {}

export function BankCard({_id, title, currency, balance, owner}: IProps): ReactElement {
  return (
    <div className="bg-white border border-[#DFEAF2] rounded-[25px] w-full min-w-[350px] h-[235px] p-[20px] flex flex-col justify-between relative">
      <article>
        <p className="text-[12px] font-normal text-secondary">Balance</p>
        <p className="title text-[20px] font-semibold text-text">{currency} {balance.toFixed(2)}</p>
      </article>
      <article className="flex items-center justify-between">
        <article className="w-[45%]">
          <p className="text-[12px] font-normal text-secondary">CARD HOLDER</p>
          <p className="title text-[20px] font-semibold text-text">{owner.firstName} {owner.lastName}</p>
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
