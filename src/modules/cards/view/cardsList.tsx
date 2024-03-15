"use client";

import React from "react";
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
      </>
    );
  }

  throw new Error("Provide elStyle prop: card or line");
}