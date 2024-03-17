"use client";

import React from "react";
import Image from "next/image";
import {IUserSession} from "@/modules/profile";
import {hexToRgba} from "@/controllers/colors";
import {useGetTransactions} from "../hooks/getTransactions";
import {convertISODateToCustomFormat} from "@/controllers/dates";
import {ITransactionResponse, ITransactionsFilters} from "../types/transaction";

interface IProps {
  shrinked?: boolean;
  session: IUserSession;
  filters: Omit<ITransactionsFilters, "date">;
}

export function TransactionsList({filters, session, shrinked}: IProps) {
  const {data} = useGetTransactions(filters, session.jwt);

  const amountColor = (amount: number): string => {
    if(amount < 0) return "text-danger";
    if(amount > 0) return "text-success";
    return "text-secondary";
  };

  const amountSymbol = (amount: number): string => {
    if(amount < 0) return "-";
    if(amount > 0) return "+";
    return "";
  };

  return (
    <>
      {
        (data?.data?.data.data || []).map(({_id, category, card, description, date, amount}: ITransactionResponse) => {
          return (
            <div 
              key={_id}
              className={`flex items-center ${!shrinked && "md:w-[630px]"}`}
            >
              <div className="mr-[10px] flex items-center w-[220px]">
                <div
                  style={{backgroundColor: hexToRgba(category.color, 0.5)}}
                  className="flex rounded-[20px] h-[55px] w-[55px] justify-center items-center"
                >
                  <Image
                    width={35}
                    height={35}
                    alt={category.title}
                    src={category.image}
                  />
                </div>
                <article className="ml-[20px]">
                  <p className="text-text title text-[16px] font-medium">{description}</p>
                  <p className="text-secondary text-[15px] font-normal">{convertISODateToCustomFormat(date)}</p>
                </article>
              </div>
              <article className={`mr-[10px] w-[125px] max-md:hidden ${shrinked && "hidden"}`}>
                <p className="text-text title text-[16px] font-medium">{card.title}</p>
                <p className="text-secondary text-[15px] font-normal">{_id.substring(0, 4)} ****</p>
              </article>
              <p className={`text-secondary mr-[10px] max-md:hidden title text-[16px] ${shrinked && "hidden"} font-normal w-[150px]`}>{category.title}</p>
              <p className={`${amountColor(amount)} w-[100px] title text-[16px] font-normal`}>{amountSymbol(amount)}{Math.abs(amount)} {card.currency}</p>
            </div>
          );
        })
      }
    </>
  );
}