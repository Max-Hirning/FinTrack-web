"use client";

import React from "react";
import {ICardsResponse} from "../types/card";
import {useGetCards} from "../hooks/getCards";
import {IUserSession} from "@/modules/profile";
import {BankCard} from "@/components/BankCard";
import {BankCardLine} from "@/components/BankCardLine";

interface IProps {
  session: IUserSession;
  elStyle: "card"|"line";
}

export function CardsList({elStyle, session}: IProps) {
  const {data} = useGetCards(session);

  if(elStyle === "card") {
    return (
      <>
        {
          (data?.data || []).map((card: ICardsResponse) => {
            return (
              <BankCard 
                {...card}
                key={card.id}
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
          (data?.data || []).map((card: ICardsResponse) => {
            return (
              <BankCardLine 
                {...card}
                key={card.id}
              />
            );
          })
        }
      </>
    );
  }

  throw new Error("Provide elStyle prop: card or line");
  // if(elStyle === "card") {
  //   return (
  //     <>
  // {
  //   (data?.data?.cards || []).map((card: ICard, index: number) => {
  //     return (
  //       <BankCard 
  //         {...card}
  //         key={card._id}
  //         styles={`${(index !== 0) && "ml-[20px]"}`}
  //       />
  //     );
  //   })
  // }
  //       <Link href="/cards#title">
  //         <BlankBankCard styles={`${((data?.data?.cards || []).length > 0) && "ml-[20px]"}`}/>
  //       </Link>
  //     </>
  //   );
  // }

  // if(elStyle === "line") {
  //   return (
  //     <>
  //       {
  //         (data?.data?.cards || []).map(({_id, ...rest}: ICard) => {
  //           return (
  //             <BankCardLine
  //               key={_id}
  //               _id={_id}
  //               {...rest}
  //             />
  //           );
  //         })
  //       }
  //       <Link href="/cards#title">
  //         <BlankCardLine/>
  //       </Link>
  //     </>
  //   );
  // }
  // throw new Error("Provide elStyle prop: card or line");
}