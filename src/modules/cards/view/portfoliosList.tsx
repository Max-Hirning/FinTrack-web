"use client";

import Link from "next/link";
import AddIcon from "@/UI/icons/add";
import React, {ReactElement} from "react";
import {ICardResponse} from "../types/card";
import {IUserSession} from "@/modules/profile";
import {BankCard} from "@/components/BankCard";
import {IPortfoliosFilters} from "../types/portfolio";
import {useGetPortfolios} from "../hooks/getPortfolios";
import {BankCardSkeleton} from "@/components/skeletons/BankCard";

interface IProps {
  session: IUserSession;
  filters: Pick<IPortfoliosFilters, "ownerId">;
}

export function PortfoliosList({filters, session}: IProps): ReactElement {
  const {data, isError, isLoading} = useGetPortfolios(filters, session.jwt);

  if(isLoading) {
    return (
      <>
        <BankCardSkeleton/>
        <BankCardSkeleton/>
        <BankCardSkeleton/>
      </>
    );
  }

  if(isError) {
    return (
      <Link 
        href="/cards#title"
        aria-label="Card form"
        className="bg-white border items-center justify-center border-[#DFEAF2] rounded-[25px] min-w-[350px] h-[235px] p-[20px] flex flex-col relative"
      >
        <AddIcon width={50} height={50} color="#343C6A"/>
        <p className="text-text text-[20px] font-bold mt-[10px]">Add card</p>
      </Link>
    );
  }

  return (
    <>
      {
        (data?.data?.portfolios || []).map(({currency, balance, owner, title, _id}: ICardResponse) => {
          return (
            <BankCard 
              _id={_id}
              key={_id}
              title={title}
              balance={balance}
              currency={currency}
              ownerLastName={owner.lastName}
              ownerFirstName={owner.firstName}
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

  throw new Error("Provide elStyle prop: card or line");
}