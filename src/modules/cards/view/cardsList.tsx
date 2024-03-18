"use client";

import React from "react";
import Link from "next/link";
import AddIcon from "@/UI/icons/add";
import {useGetCards} from "../hooks/getCards";
import {IUserSession} from "@/modules/profile";
import {BankCard} from "@/components/BankCard";
import {BankCardLine} from "@/components/BankCardLine";
import {ICardResponse, ICardsFilters} from "../types/card";

interface IProps {
  session: IUserSession;
  elStyle: "card"|"line";
  filters: Pick<ICardsFilters, "ownerId">;
}

export function CardsList({elStyle, filters, session}: IProps) {
  const {data} = useGetCards(filters, session.jwt);

  if(elStyle === "card") {
    return (
      <>
        {
          (data?.data?.cards || []).map((card: ICardResponse) => {
            return (
              <BankCard 
                {...card}
                key={card._id}
              />
            );
          })
        }
        <Link 
          href="/cards#title"
          aria-label="Card form"
          className="bg-white border items-center justify-center border-[#DFEAF2] rounded-[25px] w-full min-w-[350px] h-[235px] p-[20px] flex flex-col relative"
        >
          <AddIcon width={50} height={50} color="#343C6A"/>
          <p className="text-text text-[20px] font-bold mt-[10px]">Add card</p>
        </Link>
      </>
    );
  }

  if(elStyle === "line") {
    return (
      <>
        {
          (data?.data?.cards || []).map((card: ICardResponse) => {
            return (
              <BankCardLine 
                {...card}
                key={card._id}
              />
            );
          })
        }
        <Link
          href="/cards#title"
          aria-label="Card form"
          className="bg-white border border-[#DFEAF2] rounded-[25px] items-center w-full min-w-[700px] h-[90px] p-[20px] flex justify-center relative"
        >
          <AddIcon width={50} height={50} color="#343C6A"/>
          <p className="text-text text-[20px] font-bold ml-[15px]">Add card</p>
        </Link>
      </>
    );
  }

  throw new Error("Provide elStyle prop: card or line");
}